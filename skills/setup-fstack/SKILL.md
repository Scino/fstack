---
name: setup-fstack
description: Configure which models fstack uses per role. Detects available models and writes a per-harness override sheet. Use for /setup-fstack, "configure fstack models", or changing model choices.
menu-description: configure fstack per-role model choices
---

# Setup fstack

Write a per-harness override sheet so `/engineer-mode` delegations use the models you actually have. Repo-root `models.json` is the default map. The override sheet wins when present.

| Harness | Override file | How it loads |
|---|---|---|
| Cursor | `~/.cursor/rules/fstack-models.mdc` | `alwaysApply: true` rule |
| Claude Code | `~/.claude/fstack-models.md` | `@~/.claude/fstack-models.md` in `CLAUDE.md` |
| Codex | `~/.codex/fstack-models.md` | paste into `~/.codex/AGENTS.md` |

On Codex, slugs are Codex models (for example `gpt-5.5`), not `claude-*`. Detect them from `~/.codex/config.toml` plus what the user confirms. See [`codex-tools.md`](../engineer-mode/references/codex-tools.md).

## Steps

### 1. Detect available models

Enumerate the model slugs you can pass to a subagent in this session. That is the dependable source. Never write a real slug you have not confirmed is available. `inherit-parent` and `auto` are always valid. Both mean the role runs on the parent session's model (omit `model` on the subagent call).

### 2. Load current state

If the override file for this harness already exists, read it and treat its values as current. Otherwise start from `models.json` for this harness, falling back to `universal`.

### 3. Map and confirm

Show every role with its current model. Mark any real slug not in the detected set as needing a choice. Ask whether to accept as-is or change specific roles. Prefer a structured question over free text.

Panel roles (`how critics`, `arena runners`, `architect runners`, `interrogate reviewers`) are lists. One subagent runs per entry. `arena cross-judge pool` is also a list. Arena picks one value whose model family differs from the parent when possible. `swarm workers` is the default worker model unless a race assigns another model per arm.

### 4. Validate

Every real slug written must be in the detected set. `inherit-parent` and `auto` always pass. An override pointing at a model the user cannot use breaks every delegation that reads it.

### 5. Write the override

Overwrite the whole file so re-runs stay idempotent.

**Cursor** (`~/.cursor/rules/fstack-models.mdc`):

```markdown
---
description: fstack per-role model choices (overrides models.json)
alwaysApply: true
---
# fstack model configuration. One line per role. Delete a line to fall back to models.json.
# inherit-parent or auto: the role runs on the parent chat model (omit Task `model`).
feature, refactoring: composer-2.5
bug-fix: gpt-5.6-sol-high
perf-issue: gpt-5.6-sol-high
hillclimb: gpt-5.6-sol-high
judgment and prose: claude-opus-5-thinking-high
hardest tasks: gpt-5.6-sol-high
how explorer: composer-2.5-fast
how explainer: composer-2.5
how critics: composer-2.5, gpt-5.6-sol-high, cursor-grok-4.6-high
why investigators: composer-2.5-fast
why synthesizer: composer-2.5
reflect tooling: composer-2.5-fast
reflect judgment, divergent, synthesizer: gpt-5.6-sol-high
arena runners: composer-2.5, gpt-5.6-sol-high, cursor-grok-4.6-high
arena cross-judge pool: composer-2.5, gpt-5.6-sol-high, cursor-grok-4.6-high
swarm workers: composer-2.5-fast
architect runners: composer-2.5, gpt-5.6-sol-high, cursor-grok-4.6-high
interrogate reviewers: composer-2.5, gpt-5.6-sol-high, cursor-grok-4.6-high
```

**Claude Code / Codex** use the same role rows. Change only the slugs and the file path.

### 6. Wire it in

Cursor: the `.mdc` rule applies to new sessions automatically.

Claude Code: if `~/.claude/CLAUDE.md` does not already include `~/.claude/fstack-models.md`, append `@~/.claude/fstack-models.md`.

Codex: append the sheet's contents to `~/.codex/AGENTS.md`.

### 7. Confirm

Tell the user where the override was written and that re-running this skill updates it.
