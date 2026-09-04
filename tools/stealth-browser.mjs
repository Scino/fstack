#!/usr/bin/env node
/**
 * fstack Stealth Browser Engine
 * 
 * Provides anti-bot stealth countermeasures, Chrome CDP attach capabilities,
 * and L1 prompt-injection sanitization for AI agent browsing.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// --- Anti-Bot Stealth Init Script ---
export const STEALTH_SCRIPT = `
(function() {
  // 1. Mask navigator.webdriver
  try {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined,
      configurable: true
    });
  } catch (e) {}

  // 2. Emulate window.chrome properties (Checked by Cloudflare / DataDome)
  try {
    if (!window.chrome) {
      window.chrome = {};
    }
    window.chrome.runtime = window.chrome.runtime || {
      PlatformOs: { MAC: 'mac', WIN: 'win', ANDROID: 'android', CROS: 'cros', LINUX: 'linux', OPENBSD: 'openbsd' },
      PlatformArch: { ARM: 'arm', X86_32: 'x86-32', X86_64: 'x86-64', MIPS: 'mips', MIPS64: 'mips64' },
      PlatformNaclArch: { ARM: 'arm', X86_32: 'x86-32', X86_64: 'x86-64', MIPS: 'mips', MIPS64: 'mips64' },
      OnInstalledReason: { INSTALL: 'install', UPDATE: 'update', CHROME_UPDATE: 'chrome_update', SHARED_MODULE_UPDATE: 'shared_module_update' },
      OnRestartRequiredReason: { APP_UPDATE: 'app_update', OS_UPDATE: 'os_update', PERIODIC: 'periodic' }
    };
    window.chrome.app = window.chrome.app || { isInstalled: false, InstallState: { DISABLED: 'disabled', INSTALLED: 'installed', NOT_INSTALLED: 'not_installed' } };
    window.chrome.csi = window.chrome.csi || function() { return { startE: Date.now(), onloadT: Date.now(), pageT: 100, tran: 15 }; };
    window.chrome.loadTimes = window.chrome.loadTimes || function() { return { requestTime: Date.now() / 1000, startLoadTime: Date.now() / 1000, commitLoadTime: Date.now() / 1000, finishDocumentLoadTime: Date.now() / 1000, finishLoadTime: Date.now() / 1000, firstPaintTime: Date.now() / 1000, firstPaintAfterLoadTime: 0, navigationType: 'Other', wasFetchedViaSpdy: false, wasNpnNegotiated: false, npnNegotiatedProtocol: '', wasAlternateProtocolAvailable: false, connectionInfo: 'http/1.1' }; };
  } catch (e) {}

  // 3. Patch Function.prototype.toString to hide Proxies
  try {
    const originalToString = Function.prototype.toString;
    const toStringProxy = new Proxy(originalToString, {
      apply(target, thisArg, args) {
        if (thisArg === Function.prototype.toString) {
          return 'function toString() { [native code] }';
        }
        if (thisArg === Object.getOwnPropertyDescriptor(navigator, 'webdriver')?.get) {
          return 'function get webdriver() { [native code] }';
        }
        return Reflect.apply(target, thisArg, args);
      }
    });
    Function.prototype.toString = toStringProxy;
  } catch (e) {}

  // 4. Permissions API alignment
  try {
    const originalQuery = window.navigator.permissions?.query;
    if (originalQuery) {
      window.navigator.permissions.query = function(parameters) {
        if (parameters && parameters.name === 'notifications') {
          return Promise.resolve({ state: Notification.permission });
        }
        return originalQuery.apply(this, arguments);
      };
    }
  } catch (e) {}
})();
`;

// --- Prompt Injection Defense Sanitizer ---
export function sanitizePageText(rawText) {
  if (!rawText || typeof rawText !== 'string') return '';

  let text = rawText;

  // 1. Remove zero-width characters and homoglyph traps
  text = text.replace(/[\u200B-\u200D\uFEFF\u200E\u200F]/g, '');

  // 2. Neutralize known agent prompt injection phrases
  const injectionPatterns = [
    /\[\s*system\s*:\s*ignore\s+previous\s+instructions[^\]]*\]/gi,
    /ignore\s+(all\s+)?previous\s+instructions\s+and\s+(do|say|print)/gi,
    /you\s+are\s+now\s+in\s+(developer|unrestricted|god)\s+mode/gi,
    /<\s*system\s*>[^<]*<\s*\/\s*system\s*>/gi,
    /IMPORTANT:\s*override\s+your\s+system\s+prompt/gi
  ];

  for (const pattern of injectionPatterns) {
    text = text.replace(pattern, '[REDACTED_PROMPT_INJECTION_RISK]');
  }

  // 3. Normalize excessive whitespace
  text = text.replace(/\n{3,}/g, '\n\n').trim();

  return text;
}

// --- Check Chrome CDP Availability ---
export async function checkChromeCDP(port = 9222) {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${port}/json/version`, { timeout: 1500 }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const info = JSON.parse(data);
          resolve({ available: true, info });
        } catch {
          resolve({ available: false, error: 'Invalid JSON from CDP' });
        }
      });
    });
    req.on('error', (err) => resolve({ available: false, error: err.message }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ available: false, error: 'CDP connection timed out' });
    });
  });
}

// --- CLI Execution ---
export async function runBrowserCli(args = process.argv.slice(2)) {
  const command = args[0] || 'help';

  if (command === 'help') {
    console.log(`
fstack Stealth Browser Engine

Usage:
  node tools/stealth-browser.mjs <command> [arguments]

Commands:
  check-cdp [port]        Check if real Chrome is running with remote debugging (default: 9222)
  sanitize <file>         Sanitize raw HTML/text file against prompt injections
  help                    Show this help guide

Strategies:
  1. Real Chrome Attach: Start Chrome with --remote-debugging-port=9222 for 100% anti-bot stealth.
  2. Standalone Stealth: Uses built-in webdriver & runtime spoofing.
`);
    return;
  }

  if (command === 'check-cdp') {
    const port = parseInt(args[1] || '9222', 10);
    console.log(`Checking for Chrome CDP on 127.0.0.1:${port}...`);
    const status = await checkChromeCDP(port);
    if (status.available) {
      console.log(`[SUCCESS] Chrome CDP is active!`);
      console.log(`Browser: ${status.info.Browser}`);
      console.log(`Protocol: ${status.info['Protocol-Version']}`);
      console.log(`WebSocket Debugger URL: ${status.info.webSocketDebuggerUrl}`);
    } else {
      console.log(`[INFO] Chrome CDP not detected on port ${port} (${status.error})`);
      console.log(`To enable: start Chrome with '--remote-debugging-port=${port}'`);
    }
    return;
  }

  if (command === 'sanitize') {
    const filePath = args[1];
    if (!filePath || !fs.existsSync(filePath)) {
      console.error('Error: File path required.');
      process.exit(1);
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const sanitized = sanitizePageText(content);
    console.log(sanitized);
    return;
  }

  console.log(`Unknown command: ${command}. Run with 'help' for usage.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  runBrowserCli();
}
