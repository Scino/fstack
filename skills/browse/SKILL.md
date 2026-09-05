---
name: browse
description: Anti-bot web browsing and extraction. Attaches to your real Chrome over CDP when it is running, otherwise one-shot headless Chrome. Use for /browse, "open URL", competitor pages, or scraping a logged-in session.
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

## Strategy 1: Real Chrome (logged-in sites)

LinkedIn, X, Facebook Ads Library, Cloudflare-gated apps. Start Chrome once:

**Windows:**

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="$env:LOCALAPPDATA\Google\Chrome\User Data"
```

**macOS:**

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
```

Log in by hand. Then `goto` / `text` / `screenshot` reuse that Chrome (cookies, IP, GPU). Confirm with `fstack browse check-cdp`.

## Strategy 2: One-shot headless

Public pages with no login. Pass the URL on the command. Uses installed Chrome when possible, with webdriver masking and chrome.runtime spoofing. Text is injection-sanitized.

## Strategy 3: Harness native browser

If the host agent already has a working browser tool (Cursor, Antigravity), use it for ordinary pages. Use this skill when you need CDP attach, sanitization, or a harness that has no browser.

## Needs

`playwright-core` (ships with `@scino/fstack`). Headless one-shot wants Chrome installed, or `npx playwright install chromium`.
