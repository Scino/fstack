# Codex

fstack is a Codex plugin when you clone the repo. The manifest is `.codex-plugin/plugin.json` at the repository root (`skills: "./skills/"`).

Global CLI install:

```bash
npx @scino/fstack install --target codex
```

That junctions each skill into `~/.codex/skills`.

Claude tool names, `claude-*` slugs, and Claude built-ins named in skills resolve through `skills/engineer-mode/references/codex-tools.md`. `/setup-fstack` writes `~/.codex/fstack-models.md`.
