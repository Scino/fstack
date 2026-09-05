# fstack Architecture

`fstack` (`@scino/fstack`) is a dual-engine agent skill tree. Canonical skills live in `skills/`. `.agents/` is a generated, gitignored install target.

## Pillars

1. **Dual-engine.** Founder operations and `/engineer-mode` stay separate. `/support-loop` is the bridge.
2. **One skill format.** Every skill is a `SKILL.md` with Agent Skills frontmatter. Harness manifests at repo root point at `./skills/`.
3. **Browsing with a spine.** `/browse` attaches to Chrome over CDP when it is running, otherwise one-shot headless Chrome. Extracted text is sanitized. Engine: `tools/stealth-browser.mjs`.

## Layout

```text
fstack/
├── bin/fstack.js
├── tools/                  installer, validator, catalog, stealth-browser
├── skills/                 canonical tree
│   ├── fstack/
│   ├── founder-mode/
│   ├── engineer-mode/      23 playbooks, agent defs, licenses
│   ├── poteto-mode/        alias SKILL.md only
│   └── principle-*/        22 model-only leaves (user-invocable: false)
├── models.json             symbolic roles per harness
├── assets/logo.svg
├── .cursor-plugin/         Cursor plugin manifest
├── .codex-plugin/          Codex plugin manifest
├── .claude-plugin/         Claude Code plugin manifest
├── adapters/               .cursorrules template, Hermes notes
├── LICENSE
├── README.md
├── ARCHITECTURE.md
├── GUIDE.md
└── AGENTS.md
```

Counts are enforced by `tools/validate-skills.mjs` against disk via `tools/catalog.mjs`. Do not hardcode skill totals in prose.

## Models

Skills refer to roles in `models.json` (`FastMechanical`, `DeepReasoning`, `StrongestJudgment`, `ProseUnslop`, `DivergentPanel`). `/setup-fstack` writes a per-harness override:

- Cursor: `~/.cursor/rules/fstack-models.mdc`
- Claude Code: `~/.claude/fstack-models.md`
- Codex: `~/.codex/fstack-models.md`

## Cursor plugin vs repository skills

Cursor marketplace plugins from `cursor/plugins` show Cursor's publisher badge. fstack sets `logo` and `author` in `.cursor-plugin/plugin.json`. Install via `fstack install --target cursor` so the package is linked at `~/.cursor/plugins/local/fstack`. Skills dumped into `~/.cursor/skills` without a plugin manifest show as repository skills and get no logo.

## Codex

Repo-root `.codex-plugin/plugin.json` makes a clone a Codex plugin. `fstack install --target codex` also junctions skills into `~/.codex/skills`. Tool-name mapping: `skills/engineer-mode/references/codex-tools.md`.
