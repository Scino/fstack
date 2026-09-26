#!/usr/bin/env node
/**
 * Build the ChatGPT/Codex plugin zip the OpenAI portal accepts.
 * Root folder is fstack-codex/, containing .codex-plugin/, assets/, and skills/.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateRawSync } from 'node:zlib';
import { PACKAGE_ROOT } from './package-root.mjs';

const ROOT_NAME = 'fstack-codex';

function crc32(buf) {
  let c = 0xffffffff;
  for (const byte of buf) {
    c ^= byte;
    for (let i = 0; i < 8; i++) {
      c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
    }
  }
  return (~c) >>> 0;
}

function dosDateTime(date) {
  const time = (date.getHours() << 11) | (date.getMinutes() << 5) | (date.getSeconds() >> 1);
  const day = ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { time, day };
}

function u16(n) {
  const b = Buffer.alloc(2);
  b.writeUInt16LE(n & 0xffff);
  return b;
}

function u32(n) {
  const b = Buffer.alloc(4);
  b.writeUInt32LE(n >>> 0);
  return b;
}

function zipFiles(entries) {
  const now = dosDateTime(new Date());
  const locals = [];
  const centrals = [];
  let offset = 0;

  for (const entry of entries) {
    const name = Buffer.from(entry.name, 'utf8');
    const data = deflateRawSync(entry.bytes);
    const crc = crc32(entry.bytes);
    const local = Buffer.concat([
      u32(0x04034b50),
      u16(20),
      u16(0x0800),
      u16(8),
      u16(now.time),
      u16(now.day),
      u32(crc),
      u32(data.length),
      u32(entry.bytes.length),
      u16(name.length),
      u16(0),
      name,
      data
    ]);
    const central = Buffer.concat([
      u32(0x02014b50),
      u16(20),
      u16(20),
      u16(0x0800),
      u16(8),
      u16(now.time),
      u16(now.day),
      u32(crc),
      u32(data.length),
      u32(entry.bytes.length),
      u16(name.length),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(0),
      u32(offset),
      name
    ]);
    locals.push(local);
    centrals.push(central);
    offset += local.length;
  }

  const centralDir = Buffer.concat(centrals);
  const eocd = Buffer.concat([
    u32(0x06054b50),
    u16(0),
    u16(0),
    u16(entries.length),
    u16(entries.length),
    u32(centralDir.length),
    u32(offset),
    u16(0)
  ]);
  return Buffer.concat([...locals, centralDir, eocd]);
}

function walkFiles(dir, prefix) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const abs = path.join(dir, entry.name);
    const rel = `${prefix}${entry.name}`;
    if (entry.isDirectory()) {
      out.push(...walkFiles(abs, `${rel}/`));
    } else if (entry.isFile()) {
      out.push({ name: rel, bytes: fs.readFileSync(abs) });
    }
  }
  return out;
}

export function collectCodexEntries(root = PACKAGE_ROOT) {
  const manifest = path.join(root, '.codex-plugin', 'plugin.json');
  const assets = path.join(root, 'assets');
  const skills = path.join(root, 'skills');
  if (!fs.existsSync(manifest)) throw new Error('missing .codex-plugin/plugin.json');
  if (!fs.existsSync(assets)) throw new Error('missing assets/');
  if (!fs.existsSync(skills)) throw new Error('missing skills/');

  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const plugin = JSON.parse(fs.readFileSync(manifest, 'utf8'));
  if (plugin.version !== pkg.version) {
    throw new Error(`.codex-plugin version ${plugin.version} does not match package.json ${pkg.version}`);
  }

  return {
    version: pkg.version,
    entries: [
      { name: `${ROOT_NAME}/.codex-plugin/plugin.json`, bytes: fs.readFileSync(manifest) },
      ...walkFiles(assets, `${ROOT_NAME}/assets/`),
      ...walkFiles(skills, `${ROOT_NAME}/skills/`)
    ]
  };
}

export function packCodexZip({ root = PACKAGE_ROOT, outDir = path.join(PACKAGE_ROOT, 'dist') } = {}) {
  const { version, entries } = collectCodexEntries(root);
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `fstack-codex-${version}.zip`);
  fs.writeFileSync(outPath, zipFiles(entries));
  return { outPath, version, count: entries.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  const { outPath, version, count } = packCodexZip();
  console.log(`Wrote ${outPath} (${version}, ${count} files)`);
}
