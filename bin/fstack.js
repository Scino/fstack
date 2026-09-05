#!/usr/bin/env node
/**
 * fstack CLI
 */

import path from 'node:path';
import fs from 'node:fs';
import { runInstaller } from '../tools/installer.mjs';
import { validateAllSkills } from '../tools/validate-skills.mjs';
import { runBrowserCli } from '../tools/stealth-browser.mjs';
import { PACKAGE_ROOT, MODELS_PATH, SKILLS_DIR } from '../tools/package-root.mjs';
import { loadCatalog } from '../tools/catalog.mjs';

const args = process.argv.slice(2);
const command = args[0] || 'help';

function packageVersion() {
  return JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, 'package.json'), 'utf8')).version;
}

function showHelp() {
  const { totals } = loadCatalog();
  console.log(`
fstack — Founder's Stack (v${packageVersion()})  @scino/fstack
Harness-agnostic agent stack: founder operations plus engineer-mode.

Usage:
  fstack <command> [options]
  npx @scino/fstack <command> [options]

Commands:
  init                              Install into the current project (.agents/skills)
  install [--all|--target <name>]   Install into detected AI harnesses
  update [--all|--target <name>]    Same as install. Relink the current skills.
  status / doctor                   Detect harnesses and verify skill health
  validate                          Validate all skills against the Agent Skills RFC
  browse <args>                     Stealth browser engine (check-cdp / sanitize)
  help                              Show this documentation

Targets:
  cursor         Cursor plugin (~/.cursor/plugins/local/fstack)
  claude         Claude Code (~/.claude/skills)
  antigravity    Google Antigravity (~/.gemini/antigravity/skills)
  codex          OpenAI Codex (~/.codex/skills)
  opencode       OpenCode (~/.config/opencode/skills)
  agents         Project mode (.agents/skills)

Flagship modes:
  /fstack          Master orchestrator
  /founder-mode    End-to-end founder execution
  /engineer-mode   ${totals.playbooks} playbooks + ${totals.principles} principles
  /poteto-mode     Compatibility alias for /engineer-mode
  /stfu            Quiet execution
  /sudo            Root operator override
`);
}

function doctorCheck() {
  const { totals } = loadCatalog();
  console.log('\n=== fstack Doctor ===\n');
  console.log(`package: @scino/fstack@${packageVersion()}`);
  console.log(`Node.js: ${process.version}`);

  if (fs.existsSync(MODELS_PATH)) {
    console.log(`models.json: ${MODELS_PATH}`);
  } else {
    console.log('models.json: missing');
  }

  if (fs.existsSync(SKILLS_DIR)) {
    console.log(`skills: ${totals.skills} (${totals.userInvocable} user-facing, ${totals.principles} principles, ${totals.playbooks} playbooks)`);
    console.log(`path: ${SKILLS_DIR}`);
  } else {
    console.log('skills directory missing.');
  }

  console.log('\nDetected harnesses:');
  runInstaller(['--list']);
}

async function main() {
  switch (command) {
    case 'init':
      runInstaller(['--local']);
      break;
    case 'install':
    case 'update':
      runInstaller(args.slice(1));
      break;
    case 'status':
    case 'doctor':
      doctorCheck();
      break;
    case 'validate':
      validateAllSkills();
      break;
    case 'browse':
      await runBrowserCli(args.slice(1));
      break;
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
    default:
      showHelp();
      break;
  }
}

main();
