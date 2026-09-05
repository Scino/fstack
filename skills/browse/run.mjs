#!/usr/bin/env node
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

function findPackageRoot(start) {
  let dir = fs.realpathSync(start);
  while (true) {
    const pkgPath = path.join(dir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        if (pkg.name === '@scino/fstack') return dir;
      } catch {
        // keep walking
      }
    }
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

const skillDir = path.dirname(fileURLToPath(import.meta.url));
const root = findPackageRoot(skillDir);
const args = process.argv.slice(2);

if (root) {
  const { runBrowserCli } = await import(pathToFileURL(path.join(root, 'tools', 'stealth-browser.mjs')).href);
  await runBrowserCli(args);
} else {
  const npx = spawn('npx', ['@scino/fstack', 'browse', ...args], { stdio: 'inherit', shell: true });
  npx.on('exit', (code) => process.exit(code ?? 1));
}
