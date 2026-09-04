#!/usr/bin/env node
/**
 * fstack skill validator.
 * Frontmatter, local links, name/folder match, catalog drift against README.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SKILLS_DIR, PACKAGE_ROOT } from './package-root.mjs';
import { loadCatalog, parseFrontmatter } from './catalog.mjs';

function extractMarkdownLinks(content) {
  const links = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const target = match[2].trim();
    if (!target.startsWith('http://') && !target.startsWith('https://') && !target.startsWith('#') && !target.startsWith('mailto:')) {
      links.push(target);
    }
  }
  return links;
}

function validateSkill(skillName, skillDir) {
  const skillMdPath = path.join(skillDir, 'SKILL.md');
  const errors = [];
  const warnings = [];

  if (!fs.existsSync(skillMdPath)) {
    errors.push('Missing SKILL.md');
    return { name: skillName, valid: false, errors, warnings };
  }

  const content = fs.readFileSync(skillMdPath, 'utf8');
  const frontmatter = parseFrontmatter(content);

  if (!frontmatter) {
    errors.push('Missing or invalid YAML frontmatter (must start with ---)');
  } else {
    if (!frontmatter.name) {
      errors.push('Frontmatter missing required "name" field');
    } else if (frontmatter.name !== skillName) {
      errors.push(`Frontmatter name "${frontmatter.name}" does not match folder "${skillName}"`);
    }
    if (!frontmatter.description) {
      errors.push('Frontmatter missing required "description" field');
    }
    if (skillName.startsWith('principle-') && frontmatter['user-invocable'] !== 'false') {
      errors.push('Principle skills must set user-invocable: false');
    }
  }

  const links = extractMarkdownLinks(content);
  for (const link of links) {
    const cleanLink = link.split('#')[0].split('?')[0];
    if (!cleanLink) continue;
    const resolvedTarget = path.resolve(skillDir, cleanLink);
    if (!fs.existsSync(resolvedTarget)) {
      warnings.push(`Broken local link: "${link}" -> "${cleanLink}" not found`);
    }
  }

  return {
    name: skillName,
    valid: errors.length === 0,
    errors,
    warnings,
    description: frontmatter?.description || ''
  };
}

function assertDocCounts(catalog) {
  const errors = [];
  const files = ['README.md', 'ARCHITECTURE.md', 'GUIDE.md'].map((f) => ({
    name: f,
    text: fs.readFileSync(path.join(PACKAGE_ROOT, f), 'utf8')
  }));

  for (const { name, text } of files) {
    if (name === 'README.md') {
      const skillClaim = text.match(/(\d+) skills/i);
      if (skillClaim && Number(skillClaim[1]) !== catalog.totals.skills) {
        errors.push(`${name} claims ${skillClaim[1]} skills, disk has ${catalog.totals.skills}`);
      }
      const playbookClaim = text.match(/(\d+) engineering playbooks/i) || text.match(/(\d+) playbooks/i);
      if (playbookClaim && Number(playbookClaim[1]) !== catalog.totals.playbooks) {
        errors.push(`${name} claims ${playbookClaim[1]} playbooks, disk has ${catalog.totals.playbooks}`);
      }
      const principleClaim = text.match(/(\d+) design principles/i) || text.match(/(\d+) principles/i);
      if (principleClaim && Number(principleClaim[1]) !== catalog.totals.principles) {
        errors.push(`${name} claims ${principleClaim[1]} principles, disk has ${catalog.totals.principles}`);
      }
      for (const skillName of catalog.userInvocable) {
        if (!text.includes(`/${skillName}`) && !text.includes(`\`${skillName}\``)) {
          errors.push(`${name} catalog missing user-facing skill /${skillName}`);
        }
      }
    }
    if (name === 'ARCHITECTURE.md') {
      if (/\b68\b/.test(text) && catalog.totals.skills !== 68) {
        errors.push(`${name} still mentions 68 skills`);
      }
    }
  }
  return errors;
}

export function validateAllSkills() {
  if (!fs.existsSync(SKILLS_DIR)) {
    console.error(`Skills directory not found at: ${SKILLS_DIR}`);
    process.exit(1);
  }

  const catalog = loadCatalog();
  console.log(`Validating ${catalog.totals.skills} skills in ${SKILLS_DIR}...\n`);

  let validCount = 0;
  let errorCount = 0;
  let totalWarnings = 0;

  for (const skill of catalog.skills) {
    const result = validateSkill(skill.name, path.join(SKILLS_DIR, skill.name));
    if (result.valid) {
      validCount++;
      if (result.warnings.length > 0) {
        totalWarnings += result.warnings.length;
        console.log(`[PASS with warnings] ${skill.name}`);
        for (const w of result.warnings) console.log(`    ${w}`);
      }
    } else {
      errorCount++;
      console.log(`[FAIL] ${skill.name}`);
      for (const err of result.errors) console.log(`    ${err}`);
    }
  }

  const docErrors = assertDocCounts(catalog);
  if (docErrors.length > 0) {
    errorCount += docErrors.length;
    console.log('\n[FAIL] catalog drift');
    for (const err of docErrors) console.log(`    ${err}`);
  }

  console.log('\n========================================');
  console.log(`Total Skills: ${catalog.totals.skills}`);
  console.log(`User-facing:  ${catalog.totals.userInvocable}`);
  console.log(`Principles:   ${catalog.totals.principles} (user-invocable: false)`);
  console.log(`Playbooks:    ${catalog.totals.playbooks}`);
  console.log(`Valid:        ${validCount}`);
  console.log(`Errors:       ${errorCount}`);
  console.log(`Warnings:     ${totalWarnings}`);
  console.log('========================================');

  if (errorCount > 0) process.exit(1);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  validateAllSkills();
}
