# Issue & Task Trackers

## What this source contains

- Tasks and issues describing features, bugs, and their business or customer motivation
- Project docs or specs attached to tasks/lists
- Parent/subtask relationships (broader initiative → specific implementation task)
- Comments and threads on tasks (clarifications, scope changes, "why we're doing this" rationale)
- Tags, labels, and custom fields (e.g., `customer-request`, `compliance`, `perf`, `bug`) that signal the motivation
- Linked GitHub PRs and commits

Task trackers (ClickUp, Linear, Jira, GitHub Issues, Shortcut, Plane) are where the product and customer context lives: "we're doing this because customer X hit Y" or "this is for Q3 compliance."

## How to search it

Use the available issue/task tracker MCP:

1. **Start with linked task IDs.** If the seed commits or PRs reference task IDs, fetch those first and read the full description plus comments/threaded replies.
2. **Search tasks by keyword.** Search for the feature name, key symbol, user-facing error message, or business term. Try multiple phrasings.
3. **Walk the hierarchy.** If you land on a subtask, fetch its parent task, list, or folder. Subtasks are tactical; parent tasks and lists carry the "why."
4. **Check attached or linked docs.** If the workspace stores specs or briefs in linked documents or list descriptions, read those too.
5. **Check tags, status history, and assignees.** Tags hint at motivation (`customer-request`, `incident-followup`, `perf-regression`), and timestamps tie work to specific launches or incidents.

## What good evidence looks like here

- A task description stating the user or business problem ("Customer Acme needs X because...")
- A comment recording a design tradeoff ("We went with approach B because approach A would require touching billing")
- A parent task or list naming the broader initiative
- An attached spec or customer bug report

## Common pitfalls

- **Scope drift.** The task referenced by a PR may have evolved before or after merge. Read the comment thread in chronological order.
- **Boilerplate templates.** Generic text ("improve UX") is not real rationale; look for specific constraints or customer examples.
- **Duplicate chains.** Follow `duplicate of` or merged-task links back to the original report.

## What to return

For each relevant task:
- Task ID, title, and link
- The problem/motivation quoted verbatim from the description or comments
- Tags/labels, parent task/list, author, and created/closed dates
