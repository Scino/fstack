---
name: changelog-to-post
description: Converts git commits, PR diffs, or engineering release notes into clean, user-facing changelogs, customer update emails, and launch tweets. Translates internal code changes into customer value. Use for /changelog-to-post, "draft release notes", or announcing new features.
menu-description: translate code changes into user changelogs and launch announcements
---

# Changelog to Post

Engineers write commits for git history: *"fix(auth): handle null session in token refresh hook"*. Customers and prospects don't care about the hook—they care that they won't get logged out mid-workflow.

`changelog-to-post` reads your recent git commits, PR descriptions, or release tags, translates them into clear customer value, and produces a complete launch communication bundle.

---

## When to Invoke

- You just merged a batch of PRs or tagged a new version.
- You want to update your product's public changelog or `CHANGELOG.md`.
- You want to send a quick email to active users announcing new capabilities.
- You want to draft an announcement post for X/LinkedIn.

---

## The Launch Bundle Output

When invoked, `changelog-to-post` generates 3 linked deliverables:

### 1. The Customer-Facing Changelog (For Website / In-App Modal)
- Grouped into: **✨ New Capabilities**, **⚡ Performance & Improvements**, and **🐛 Bug Fixes**.
- Each item leads with what the user can now do, not the internal code change.

### 2. The Founder Release Email (For Active Users & Newsletter)
- 150-250 words max.
- High-level narrative of why this release matters.
- Link to documentation or live demo.

### 3. The Social Announcement (For X and LinkedIn)
- Visual-ready hook highlighting the single biggest improvement.
- Clean bullet list of secondary improvements.

---

## Example Walkthrough

### Raw Input (Git Log):
- `feat: add parallel test execution with --workers flag`
- `fix: prevent memory leak in child process fork`
- `feat: export results to JUnit XML and GitHub Actions annotations`
- `perf: cache AST parses across warm test runs`

### Generated Deliverables:

#### Deliverable 1: Public Changelog Entry
```markdown
## v1.4.0 — 5x Faster Test Runs & CI Annotations

### ✨ New
- **Parallel Test Execution**: Run test suites across multiple CPU cores with `--workers`. Large suites finish up to 5x faster.
- **GitHub Actions Annotations**: Test failures now show inline on your GitHub PR diffs with file and line references.
- **JUnit XML Export**: Export test results formatted for Datadog, CircleCI, and standard CI reporting dashboards.

### ⚡ Improvements
- **Warm AST Caching**: Tests with unchanged dependencies skip re-parsing, saving ~400ms per run during local TDD loops.

### 🐛 Fixes
- Fixed a memory leak where orphaned child processes remained in memory after aborted test runs.
```

#### Deliverable 2: Founder Update Email
```markdown
Subject: v1.4.0: 5x faster test runs and inline PR annotations

Hey everyone,

One of the most common complaints we heard last month was that test suites were taking too long on large monorepos.

Today we're releasing v1.4.0, which introduces native parallel test execution. You can now pass `--workers auto` to distribute test suites across all CPU cores. In our internal benchmarks on a 2,000-test repo, runtime dropped from 4 minutes 12 seconds to 48 seconds.

We also added inline GitHub PR annotations so you can see exactly which line broke without scrolling through raw terminal logs.

Update to v1.4.0 today:
`npm install -g fstack@latest`

Full release notes and documentation are live here: [link].

Let us know what you think!

Best,
Fabio
```

#### Deliverable 3: X Announcement
```text
fstack v1.4.0 is live.

Tests now run in parallel across CPU cores with `--workers auto`.

Benchmark on our monorepo:
• Before: 4m 12s
• Now: 48s

Also shipped:
- Inline GitHub Actions annotations on PR diffs
- JUnit XML export for CI dashboards
- AST caching for instant local re-runs

`npm i -g fstack@latest`
```
