---
name: browse
description: Anti-bot web browsing and extraction. Attaches to your real Chrome over CDP when it is running, otherwise one-shot headless Chrome. Use for /browse, "open URL", competitor pages, interactive search UIs, or a logged-in session.
menu-description: anti-bot browser automation and web extraction
---

# Browse

Drive a real browser. Prefer this over naive Playwright scripts. Extracted text is sanitized before it hits the model.

## How to invoke

From any harness:

```bash
npx @scino/fstack browse <command>
```

From this skill folder (works when the skill is a junction into the fstack package):

```bash
node run.mjs <command>
```

From a clone:

```bash
node bin/fstack.js browse <command>
```

## Commands

```bash
fstack browse goto https://example.com
fstack browse text
fstack browse text https://example.com
fstack browse screenshot
fstack browse screenshot https://example.com out.png
fstack browse eval "document.title"
fstack browse eval https://example.com "document.title"
fstack browse check-cdp
fstack browse sanitize ./raw.txt
```

`goto` / `text` / `screenshot` / `eval` without a URL need Chrome CDP (your session). With a URL they can run headless in one shot.

`text` waits for visible body text, then fails if the body is still empty. That is usually a search shell, a bot wall, or JS that never painted. Do not retry the same URL. Search or click, then `text` again.

## Strategy 1: One-shot headless

Public pages where the URL already has the content. Pass the URL on the command.

```bash
fstack browse text https://example.com
```

Uses installed Chrome when possible, with webdriver masking and chrome.runtime spoofing. Text is injection-sanitized.

## Strategy 2: Real Chrome (interaction and login-walled sites)

Use CDP when you need to type, click, or wait on a page, or when headless is blocked.

Empty extract is not a login problem by itself. Many public UIs start as a search shell. Attach CDP, complete the query or click in that window (or `goto` a URL that already encodes the query), wait until results exist, then `fstack browse text` with no URL.

Login-walled sites (LinkedIn, X, and similar) still need you to log in by hand in that Chrome.

Start Chrome once:

**Windows** (throwaway profile; does not fight an already-open Chrome):

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="$env:TEMP\chrome-fstack-cdp"
```

To reuse your real cookies, quit Chrome first, then point `--user-data-dir` at `$env:LOCALAPPDATA\Google\Chrome\User Data`.

**macOS:**

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
```

Confirm with `fstack browse check-cdp`.

## Strategy 3: Harness native browser

If the host agent already has a working browser tool (Cursor, Antigravity), use it for ordinary pages. Use this skill when you need CDP attach, sanitization, or a harness that has no browser.

## Needs

`playwright-core` (ships with `@scino/fstack`). Headless one-shot wants Chrome installed, or `npx playwright install chromium`.
