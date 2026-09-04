# fstack — The Practical Founder Guide

This guide walks you through using `fstack` across common day-to-day founder workflows.

---

## 1. Morning Routine: Triage & Sales Inbound

### Scenario A: Triaging 15 Overnight Messages
Paste your unread inquiries or customer notes into the chat:
```text
/inbox-triage
[paste batch of 10-15 messages]
```
**What happens**: `fstack` categorizes them by urgency (P0 deal blockers, P1 hot leads, P2 questions, P3 noise) and gives you 1-click draft replies.

### Scenario B: Replying to an Inbound Lead
```text
/lead-reply
From: alex@bigcorp.com
"Hey, saw your product on Twitter. Does fstack support multi-workspace isolation and custom SSO? Also what is your enterprise pricing?"
```
**What happens**: The agent analyzes what your product actually supports, drafts an honest, consultative response without fake corporate jargon, and offers a low-friction next step.

---

## 2. Customer Support & Bug Fixing (`/support-loop`)

### Scenario: Customer reports a production defect
```text
/support-loop
Customer message: "Whenever I export our report to CSV, rows with commas in the notes field are split into separate columns. This broke our billing import."
```

**The automated execution loop**:
1. **Inspection**: The agent searches your repo for CSV export logic (e.g. `export.ts` or `csv-formatter.js`).
2. **Reproduction**: Triggers `engineer-mode` (Bug-fix playbook) to write an automated test that fails with commas.
3. **Fix & Verification**: Solves the root cause (proper RFC 4180 CSV quoting), runs the test to green, and checks for regressions.
4. **Draft Reply**: Outputs an empathetic, non-defensive email for the customer explaining what happened and confirming the fix is live.

---

## 3. Social Media & Audience Growth (X vs LinkedIn)

### Scenario A: Drafting an original post from a real insight
```text
/social-post
"We spent two weeks trying to optimize our vector database before realizing our average customer only searches through 300 documents. A simple in-memory BM25 index was 100x faster and zero cost."
```
**What happens**: The agent reads your `~/.fstack/founder-voice.md` and generates:
- **X Version**: Short, punchy hook, zero hashtags, focused on the counter-intuitive realization.
- **LinkedIn Version**: Narrative story, tactical breakdown, and a practical takeaway for other founders.

### Scenario B: Leaving a high-leverage reply to a trending post
```text
/social-reply
[Paste URL or text of high-reach post in your niche]
```
**What happens**: Generates 3 distinct reply angles (Additive data point, nuanced counter-perspective, builder war story) designed to attract authentic followers without being spammy.

---

## 4. Product Launches & Changelogs

### Scenario: Merging a batch of PRs
```text
/changelog-to-post
[Paste git commit log or PR list]
```
**What happens**: Translates raw code commits into:
1. Public `CHANGELOG.md` entry grouped by capabilities and fixes.
2. Short, personal founder release email for active customers.
3. Announcement tweet for X.

---

## 5. Engineering Rigor (`/engineer-mode`)

When it's time to build:
```text
/engineer-mode Build an endpoint that imports customer contacts from HubSpot via OAuth
```
**What happens**:
- Opens a todolist with principles review.
- Classifies as the **Feature playbook**.
- Defers logic until data shape is modeled (`principle-model-the-domain`).
- Runs `/architect` if crossing module boundaries.
- Executes test-driven development (`/tdd`).
- Strips slop and comments before commit (`/deslop`, `/no-comments`).
- Writes verified PR and summary.
