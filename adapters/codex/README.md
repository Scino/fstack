# Codex

fstack is a Codex plugin at the repository root. The manifest is `.codex-plugin/plugin.json` (`skills: "./skills/"`).

## Install skills (CLI)

```bash
npx @scino/fstack install --target codex
```

That junctions each skill into `~/.codex/skills`. Fast path; no plugin picker metadata.

## Install as a Codex plugin (marketplace)

After the repo is on GitHub:

```bash
codex plugin marketplace add Scino/fstack
```

Codex reads `.agents/plugins/marketplace.json`, which points at the repo root where `.codex-plugin/plugin.json` lives. Install **fstack** from the Codex plugin picker.

Claude tool names, `claude-*` slugs, and Claude built-ins named in skills resolve through `skills/engineer-mode/references/codex-tools.md`. `/setup-fstack` writes `~/.codex/fstack-models.md`.
