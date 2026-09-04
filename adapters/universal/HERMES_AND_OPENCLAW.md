# Hermes & OpenClaw

fstack uses the Agent Skills format. Each skill is a directory with `SKILL.md` and YAML frontmatter.

Canonical tree: `skills/`. Project discovery: `.agents/skills/` (generated, gitignored).

```bash
npx @scino/fstack init
```

That junctions every skill from `skills/` into `.agents/skills/`. Hermes and OpenClaw pick it up. Do not commit `.agents/`. Teammates run init once.

Prompt examples:
- "Load fstack. Run /support-loop on this customer complaint."
- "Load fstack. Run /engineer-mode to fix this with a failing test."
