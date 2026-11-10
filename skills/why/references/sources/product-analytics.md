# Product, Growth & Warehouse Analytics

## What this source contains

Product, funnel, and warehouse analytics hold the user-behavior and business-performance record (what users did, which channels or experiments drove conversions, how feature usage evolved, and where a threshold constant came from):

- **Product & conversion events.** User actions, funnel steps, feature invocations, conversion events, and client-reported errors.
- **Channel, campaign & attribution telemetry.** Traffic sources, campaign contexts, funnel drop-offs, and spend/conversion performance that motivate onboarding, attribution, tracking, or growth-related code changes.
- **Usage & billing events.** Plan limits, quota consumption, and unit-cost events for cost- or volume-driven decisions.
- **Experiment / feature-flag data.** Exposure and outcome records showing when a flag ramped or concluded.
- **Data lineage & warehouse query history.** Upstream schema changes or expensive queries that motivated a migration, backfill, or performance rewrite.

## How to search it

Inspect the available analytics or warehouse MCP server's tool schema first:

1. **Growth, attribution & customer-journey MCPs (e.g., OneLence).**
   - Pull recorded site/campaign changes and decisions (`list_changes`, `list_decisions`, `list_signals`) around the target PR's ship date—these often capture the exact growth, funnel, or tracking hypothesis behind a code change.
   - Check funnel steps, conversions, and channel performance (`get_funnel`, `get_performance`, `compare_sources`, `list_conversions`) before and after the change to see whether a drop-off, tracking gap (`verify_tracking`, `list_events`), or channel shift motivated the code.
2. **Orient before querying SQL warehouses.** List available tables, events, funnels, or metrics first rather than guessing schema or event names.
3. **Time-bound every query.** Bracket the target PR's merge date (typically ±30 days) so queries stay fast and relevant to the decision window.
4. **Check event or conversion trajectories.** Compare daily counts or conversion rates across the window around the PR merge:
   - A step function from zero to steady volume right after merge is strong circumstantial evidence the PR launched the feature or tracking event.
   - A drop in failure/drop-off events right after merge supports that the PR fixed a user-facing friction point.
5. **Check distributions for threshold constants.** When investigating why code clamps or branches at a specific number (batch size, timeout, payload limit, budget threshold), check the pre-PR distribution (median / p95 / p99 / max) of the corresponding property.
6. **Check experiment, campaign, or flag history.** Look up feature-flag rollouts or campaign/funnel changes around the ship date.

## Common pitfalls

- **Instrumented != caused.** An event's existence means someone cared enough to track it, not that the target code exists *because* of it. Pair with a PR/commit citation from the git investigator before claiming causation.
- **Silent tracking changes.** A step function in event volume may mean tracking changed, not user behavior. Check for tracking/instrumentation PRs in the same window.
- **Schema drift & retention cliffs.** Event properties evolve and historical windows may predate retention. If the relevant window predates available data, report a *gap*, not a null result.

## What to return

For each relevant finding:
- Type (product event / funnel metric / experiment or campaign record / usage event / warehouse table)
- Metric, event, or table name and the query or tool call used
- Time window queried
- Compact numeric summary (counts, conversion rates, percentiles, first/last-seen timestamps). **Don't dump raw rows.**
- Temporal correlation with the target's ship date
- Relevance + strength: direct / circumstantial / weak
