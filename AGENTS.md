# fstack

This repository is fstack (`@scino/fstack`). Canonical skills live in `skills/`.

After clone:

```bash
node bin/fstack.js install --target cursor
```

That links the repo as a Cursor plugin (`~/.cursor/plugins/local/fstack`). Do not run `init` inside this repo. `.agents/skills` here would duplicate the plugin in the slash picker.

For other projects:

```bash
npx @scino/fstack init
npx @scino/fstack install --all
```

`init` writes gitignored `.agents/skills` junctions. Do not commit those. The only committed `.agents/` file is `.agents/plugins/marketplace.json` for Codex marketplace discovery.

Re-run `node bin/fstack.js install --all` after `git pull` so other harnesses pick up new skills. `update` is an alias for `install`.

Use `/fstack` as the orchestrator. Engineering work goes through `/engineer-mode`. `/poteto-mode` is a compatibility alias. Configure models with `/setup-fstack`.
