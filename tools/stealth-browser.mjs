#!/usr/bin/env node
/**
 * fstack browse engine.
 * Attach to Chrome CDP when available; otherwise one-shot Playwright launch.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const BROWSE_COMMANDS = ['check-cdp', 'sanitize', 'goto', 'text', 'screenshot', 'eval', 'help'];

export const STEALTH_SCRIPT = `
(function() {
  try {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined,
      configurable: true
    });
  } catch (e) {}

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

export function sanitizePageText(rawText) {
  if (!rawText || typeof rawText !== 'string') return '';

  let text = rawText;
  text = text.replace(/[\u200B-\u200D\uFEFF\u200E\u200F]/g, '');

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

  return text.replace(/\n{3,}/g, '\n\n').trim();
}

export async function checkChromeCDP(port = 9222) {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${port}/json/version`, { timeout: 1500 }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const info = JSON.parse(data);
          resolve({ available: true, info, port });
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

function isHttpUrl(value) {
  return typeof value === 'string' && /^https?:\/\//i.test(value);
}

function takeUrl(args) {
  if (isHttpUrl(args[0])) {
    return { url: args[0], rest: args.slice(1) };
  }
  return { url: null, rest: args };
}

export function textWaitMs() {
  const parsed = parseInt(process.env.FSTACK_BROWSE_TEXT_WAIT_MS || '8000', 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 8000;
}

export function formatEmptyPageError({ url, title } = {}) {
  const lines = ['Empty page text.'];
  if (url) lines.push(`URL: ${url}`);
  if (title) lines.push(`Title: ${title}`);
  lines.push('This is often a search shell that needs a query, a bot wall, or JS that has not painted.');
  lines.push('If the page is interactive, attach Chrome CDP, complete the search or click in that window, then run: fstack browse text');
  return lines.join('\n');
}

export async function waitUntilBodyHasText(page, timeoutMs = textWaitMs()) {
  if (timeoutMs <= 0) return;
  await page.waitForFunction(
    () => (document.body?.innerText || '').trim().length > 0,
    undefined,
    { timeout: timeoutMs }
  ).catch(() => {});
}

export async function readSanitizedBodyText(page) {
  const raw = await page.innerText('body').catch(() => '');
  const text = sanitizePageText(raw);
  if (!text) {
    throw new Error(formatEmptyPageError({
      url: page.url(),
      title: await page.title().catch(() => '')
    }));
  }
  return text;
}

async function loadPlaywright() {
  try {
    return await import('playwright-core');
  } catch {
    throw new Error('Browse needs playwright-core. From the fstack repo: npm install. Or: npm install playwright-core');
  }
}

async function withPage(url, fn, { waitForText = false } = {}) {
  const { chromium } = await loadPlaywright();
  const cdp = await checkChromeCDP();
  const shouldWait = waitForText || Boolean(url);

  if (cdp.available) {
    const browser = await chromium.connectOverCDP(`http://127.0.0.1:${cdp.port}`);
    try {
      const context = browser.contexts()[0] || await browser.newContext();
      const page = context.pages()[0] || await context.newPage();
      if (url) {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      }
      if (shouldWait) await waitUntilBodyHasText(page);
      return await fn(page);
    } finally {
      await browser.close();
    }
  }

  if (!url) {
    throw new Error('No Chrome CDP on port 9222. Pass a URL, or start Chrome with --remote-debugging-port=9222 and try again.');
  }

  let browser;
  try {
    browser = await chromium.launch({
      channel: 'chrome',
      headless: true,
      args: ['--disable-blink-features=AutomationControlled']
    });
  } catch (chromeErr) {
    try {
      browser = await chromium.launch({
        headless: true,
        args: ['--disable-blink-features=AutomationControlled']
      });
    } catch {
      throw new Error(`Could not launch Chrome (${chromeErr.message}). Install Chrome, or run: npx playwright install chromium`);
    }
  }

  try {
    const context = await browser.newContext();
    await context.addInitScript(STEALTH_SCRIPT);
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    if (shouldWait) await waitUntilBodyHasText(page);
    return await fn(page);
  } finally {
    await browser.close();
  }
}

function printHelp() {
  console.log(`
fstack browse

Usage:
  fstack browse <command> [arguments]
  node tools/stealth-browser.mjs <command> [arguments]

Commands:
  goto <url>              Navigate. Stateful when Chrome CDP is up.
  text [url]              Sanitized visible text of the current or given page.
  screenshot [url] [path] PNG of the current or given page (default: browse.png).
  eval [url] <expr>       Evaluate JavaScript in the page.
  check-cdp [port]        Check Chrome remote debugging (default: 9222).
  sanitize <file>         Sanitize a local text file against prompt injection.
  help                    Show this help.

Login-walled sites (LinkedIn, X, and similar): start Chrome with
--remote-debugging-port=9222, then goto/text/screenshot reuse that session.

Public search UIs need CDP to type and click, not to log in.
Empty body text is an error. Do not retry the same URL.

Without CDP, pass a URL on text/screenshot/eval for a one-shot headless visit.
`);
}

export async function runBrowserCli(args = process.argv.slice(2)) {
  const command = args[0] || 'help';

  if (command === 'help' || command === '--help' || command === '-h') {
    printHelp();
    return;
  }

  if (command === 'check-cdp') {
    const port = parseInt(args[1] || '9222', 10);
    console.log(`Checking for Chrome CDP on 127.0.0.1:${port}...`);
    const status = await checkChromeCDP(port);
    if (status.available) {
      console.log('[SUCCESS] Chrome CDP is active.');
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
      process.exitCode = 1;
      return;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(sanitizePageText(content));
    return;
  }

  try {
    if (command === 'goto') {
      const url = args[1];
      if (!isHttpUrl(url)) {
        console.error('Error: goto needs an http(s) URL.');
        process.exitCode = 1;
        return;
      }
      const title = await withPage(url, (page) => page.title());
      console.log(`OK ${url}`);
      if (title) console.log(title);
      return;
    }

    if (command === 'text') {
      const { url } = takeUrl(args.slice(1));
      const text = await withPage(url, (page) => readSanitizedBodyText(page), { waitForText: true });
      console.log(text);
      return;
    }

    if (command === 'screenshot') {
      const { url, rest } = takeUrl(args.slice(1));
      const outPath = rest[0] || 'browse.png';
      await withPage(url, async (page) => {
        await page.screenshot({ path: outPath, fullPage: true });
      }, { waitForText: true });
      console.log(path.resolve(outPath));
      return;
    }

    if (command === 'eval') {
      const { url, rest } = takeUrl(args.slice(1));
      const expr = rest.join(' ').trim();
      if (!expr) {
        console.error('Error: eval needs a JavaScript expression.');
        process.exitCode = 1;
        return;
      }
      const result = await withPage(url, async (page) => page.evaluate(expr));
      console.log(typeof result === 'string' ? result : JSON.stringify(result, null, 2));
      return;
    }
  } catch (err) {
    console.error(err.message || String(err));
    process.exitCode = 1;
    return;
  }

  console.error(`Unknown command: ${command}. Run with 'help' for usage.`);
  process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  runBrowserCli();
}
