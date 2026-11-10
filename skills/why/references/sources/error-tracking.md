# Error & Exception Tracking

## What this source contains

Error trackers (Sentry, Bugsnag, Rollbar, Airbrake, crash reporting MCPs) hold the specific exceptions, stack traces, and release regressions that motivated defensive or corrective code.

## How to search it

Use the available error-tracking MCP:

1. **Orient.** List organizations/projects if the project slug isn't already obvious from the repo.
2. **Search issues related to the target.** Build queries from the exception class names the target handles, its function/class name, error message strings, and file path.
3. **Narrow by release and time window.** Check **first seen** and **last seen** timestamps (does the issue stop right when the target PR ships?), affected releases, and event frequency before vs. after the change.
4. **Inspect a representative event.** Verify whether the stack trace passes through the target code and whether tags/breadcrumbs match the conditions the target defends against.

## What to return

For each relevant issue:
- Issue ID, title, project, and link
- First-seen / last-seen timestamps and event count
- Affected releases and correlation with the target PR's ship date
- A concise, verbatim stack trace excerpt showing relevance to the target
- Any resolution notes or linked tickets/PRs
