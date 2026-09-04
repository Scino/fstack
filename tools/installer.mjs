#!/usr/bin/env node
/**
 * fstack installer. Detects harnesses and links skills, or installs Cursor as a plugin.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { PACKAGE_ROOT, SKILLS_DIR } from './package-root.mjs';

const HOME = os.homedir();
const IS_WINDOWS = process.platform === 'win32';

export function getHarnessDefinitions(customHome = HOME) {
  return [
    {
      id: 'cursor',
      name: 'Cursor',
      mode: 'plugin',
      path: path.join(customHome, '.cursor', 'plugins', 'local', 'fstack'),
      legacySkillsPath: path.join(customHome, '.cursor', 'skills'),
      detectDir: path.join(customHome, '.cursor'),
      description: 'Cursor plugin (~/.cursor/plugins/local/fstack)'
    },
    {
      id: 'claude',
      name: 'Claude Code',
      mode: 'skills',
      path: path.join(customHome, '.claude', 'skills'),
      detectDir: path.join(customHome, '.claude'),
      description: 'Anthropic Claude Code CLI skills'
    },
    {
      id: 'antigravity',
      name: 'Antigravity',
      mode: 'skills',
      path: path.join(customHome, '.gemini', 'antigravity', 'skills'),
      detectDir: path.join(customHome, '.gemini', 'antigravity'),
      description: 'Google Antigravity agent skills'
    },
    {
      id: 'codex',
      name: 'OpenAI Codex',
      mode: 'skills',
      path: path.join(process.env.CODEX_HOME || path.join(customHome, '.codex'), 'skills'),
      detectDir: process.env.CODEX_HOME || path.join(customHome, '.codex'),
      description: 'OpenAI Codex CLI skills'
    },
    {
      id: 'opencode',
      name: 'OpenCode',
      mode: 'skills',
      path: path.join(customHome, '.config', 'opencode', 'skills'),
      detectDir: path.join(customHome, '.config', 'opencode'),
      description: 'OpenCode terminal agent skills'
    },
    {
      id: 'agents',
      name: 'Universal Agent Skills (Hermes, OpenClaw, Project Teams)',
      mode: 'skills',
      path: path.join(process.cwd(), '.agents', 'skills'),
      detectDir: process.cwd(),
      description: 'Project-level discovery for Hermes, OpenClaw, and repository teams'
    }
  ];
}

export function detectInstalledHarnesses(customHome = HOME) {
  return getHarnessDefinitions(customHome).map((h) => ({
    ...h,
    installed: fs.existsSync(h.detectDir)
  }));
}

function listSkillNames() {
  return fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function linkOrCopy(src, dest, useCopy) {
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  if (!useCopy) {
    try {
      fs.symlinkSync(src, dest, IS_WINDOWS ? 'junction' : 'dir');
      return;
    } catch {
      // fall through to copy
    }
  }
  fs.cpSync(src, dest, { recursive: true });
}

function removeLegacyCursorSkills(legacySkillsPath) {
  if (!legacySkillsPath || !fs.existsSync(legacySkillsPath)) return 0;
  let removed = 0;
  for (const name of listSkillNames()) {
    const dest = path.join(legacySkillsPath, name);
    if (fs.existsSync(dest)) {
      fs.rmSync(dest, { recursive: true, force: true });
      removed++;
    }
  }
  return removed;
}

function installPlugin(targetDef, options = {}) {
  const { dryRun = false, useCopy = false } = options;
  console.log(`\nInstalling to ${targetDef.name}:`);
  console.log(`  Destination: ${targetDef.path}`);

  if (dryRun) {
    console.log('  [DRY-RUN] Would install fstack as a Cursor plugin.');
    return { success: true, dryRun: true };
  }

  try {
    const destParent = path.dirname(targetDef.path);
    if (!fs.existsSync(destParent)) {
      fs.mkdirSync(destParent, { recursive: true });
    }
    linkOrCopy(PACKAGE_ROOT, targetDef.path, useCopy);
    const removed = removeLegacyCursorSkills(targetDef.legacySkillsPath);
    if (removed > 0) {
      console.log(`  Removed ${removed} legacy copies from ${targetDef.legacySkillsPath}`);
    }
    console.log(`  Installed fstack plugin into ${targetDef.name}.`);
    return { success: true, count: 1 };
  } catch (err) {
    console.error(`  Failed to install into ${targetDef.name}: ${err.message}`);
    return { success: false, error: err.message };
  }
}

export function installToTarget(targetDef, options = {}) {
  if (targetDef.mode === 'plugin') {
    return installPlugin(targetDef, options);
  }

  const { dryRun = false, useCopy = false } = options;
  const targetSkillsDir = targetDef.path;

  console.log(`\nInstalling to ${targetDef.name}:`);
  console.log(`  Destination: ${targetSkillsDir}`);

  if (dryRun) {
    console.log('  [DRY-RUN] Would create directory and install skills.');
    return { success: true, dryRun: true };
  }

  try {
    if (!fs.existsSync(targetSkillsDir)) {
      fs.mkdirSync(targetSkillsDir, { recursive: true });
    }

    const skills = listSkillNames();
    let installedCount = 0;
    for (const skillName of skills) {
      linkOrCopy(
        path.join(SKILLS_DIR, skillName),
        path.join(targetSkillsDir, skillName),
        useCopy
      );
      installedCount++;
    }

    console.log(`  Installed ${installedCount} skills into ${targetDef.name}.`);
    return { success: true, count: installedCount };
  } catch (err) {
    console.error(`  Failed to install into ${targetDef.name}: ${err.message}`);
    return { success: false, error: err.message };
  }
}

export function installLocalProject(options = {}) {
  const cwd = process.cwd();
  console.log(`\nInitializing fstack locally in project: ${cwd}`);

  const targets = [
    {
      id: 'local-agents',
      name: 'Project Agent Skills (.agents/skills)',
      mode: 'skills',
      path: path.join(cwd, '.agents', 'skills')
    }
  ];

  for (const t of targets) {
    installToTarget(t, options);
  }

  const rulesSrc = path.join(PACKAGE_ROOT, 'adapters', 'cursor', '.cursorrules');
  const rulesDest = path.join(cwd, '.cursorrules');
  if (fs.existsSync(rulesSrc) && !fs.existsSync(rulesDest)) {
    fs.copyFileSync(rulesSrc, rulesDest);
    console.log('  Added .cursorrules to project root.');
  }

  console.log('\nProject initialization complete.');
  console.log('Commit .agents/ only if teammates cannot run `npx @scino/fstack init`. Prefer gitignoring it and documenting the init step.');
}

export function runInstaller(args = process.argv.slice(2)) {
  const options = {
    all: args.includes('--all') || args.includes('--global'),
    local: args.includes('--local') || args.includes('--project') || args.includes('init'),
    dryRun: args.includes('--dry-run'),
    useCopy: args.includes('--copy'),
    list: args.includes('--list') || args.includes('status'),
    target: null
  };

  if (options.local) {
    installLocalProject(options);
    return;
  }

  const targetIdx = args.indexOf('--target');
  if (targetIdx !== -1 && args[targetIdx + 1]) {
    options.target = args[targetIdx + 1].toLowerCase();
  }

  const detected = detectInstalledHarnesses();

  if (options.list) {
    console.log('\n=== fstack Harness Detection Status ===\n');
    for (const h of detected) {
      const status = h.installed ? 'detected' : 'not found';
      console.log(`${status.padEnd(12)} | ${h.name.padEnd(20)} | ${h.path}`);
    }
    console.log('\nRun `fstack install --target <id>` for one harness.');
    console.log('Run `fstack install --all` for every detected harness.');
    console.log('Run `fstack init` to install into the current project (.agents/skills).');
    return;
  }

  console.log('=== fstack Universal Agent Installer ===');

  if (options.target) {
    const found = detected.find((d) => d.id === options.target);
    if (!found) {
      console.error(`Unknown target: ${options.target}. Available: ${detected.map((d) => d.id).join(', ')}`);
      process.exit(1);
    }
    installToTarget(found, options);
    return;
  }

  let activeTargets = detected.filter((d) => d.installed);
  if (activeTargets.length === 0) {
    console.log('No global harnesses detected. Installing to Project Mode (.agents/skills/).');
    const agentsTarget = detected.find((d) => d.id === 'agents');
    installToTarget(agentsTarget, options);
    return;
  }

  console.log(`Found ${activeTargets.length} detected harnesses.`);
  for (const t of activeTargets) {
    installToTarget(t, options);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  runInstaller();
}
