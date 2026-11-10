# Real-Time Team Chat

## What this source contains

Team chat (ClickUp Chat, Slack, Discord, Microsoft Teams, Mattermost) holds real-time deliberation, incident triage, and quick design tradeoffs that never reached a formal spec.

## How to search it

Check which chat MCP is available and inspect its tool schema first. If authentication fails, stop and report the gap.

1. **PR or ticket search.** Search for the PR number/URL or linked task ID. Chat channels frequently link PRs when reviewing or debating tradeoffs.
2. **Author- and time-bounded search.** Search messages from the PR author around the PR merge date.
3. **Error string or symbol search.** If the code handles a specific error or edge case, search for that string to surface incident threads or customer escalations.
4. **Always fetch thread replies.** A single top-level message rarely contains the conclusion; read the replies in the thread.

## Common pitfalls

- **Retention limits & private channels.** Old messages or private DMs may not be searchable. Report missing coverage as a gap.
- **Casual speculation vs. decisions.** Distinguish offhand suggestions from actual conclusions that match what shipped in the PR.

## What to return

For each relevant thread:
- Channel name, date/time, participants, and permalink/ID if available
- Verbatim quotes of the key tradeoff or motivation discussed
- How the thread connects to the target PR or ticket
