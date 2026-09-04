import fs from 'node:fs';
import path from 'node:path';
import { SKILLS_DIR } from './package-root.mjs';

export function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const metadata = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let val = line.slice(colonIndex + 1).trim();
    if (key.startsWith('#')) continue;
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    metadata[key] = val;
  }
  return metadata;
}

export function loadCatalog(skillsDir = SKILLS_DIR) {
  const names = fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const skills = names.map((name) => {
    const skillMdPath = path.join(skillsDir, name, 'SKILL.md');
    const content = fs.existsSync(skillMdPath) ? fs.readFileSync(skillMdPath, 'utf8') : '';
    const frontmatter = content ? parseFrontmatter(content) : null;
    const userInvocable = frontmatter?.['user-invocable'] !== 'false';
    const principle = name.startsWith('principle-');
    return {
      name,
      frontmatter,
      userInvocable,
      principle,
      description: frontmatter?.description || ''
    };
  });

  const playbooksDir = path.join(skillsDir, 'engineer-mode', 'playbooks');
  const playbooks = fs.existsSync(playbooksDir)
    ? fs.readdirSync(playbooksDir).filter((f) => f.endsWith('.md')).sort()
    : [];

  return {
    skills,
    names,
    userInvocable: skills.filter((s) => s.userInvocable && !s.principle).map((s) => s.name),
    principles: skills.filter((s) => s.principle).map((s) => s.name),
    playbooks,
    totals: {
      skills: skills.length,
      userInvocable: skills.filter((s) => s.userInvocable && !s.principle).length,
      principles: skills.filter((s) => s.principle).length,
      playbooks: playbooks.length
    }
  };
}
