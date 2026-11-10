# Source playbooks

The why skill spawns one investigator per available evidence category, each reading the matching category playbook below and adapting it to the MCP server available in the environment.

| Category | Playbook | Example MCPs in this category |
|---|---|---|
| Source control history | [`code-archaeology.md`](./sources/code-archaeology.md) | git, `gh` |
| Issue / task tracker | [`issue-tracker.md`](./sources/issue-tracker.md) | ClickUp, Linear, Jira, GitHub Issues, Shortcut, Plane |
| Long-form documents | [`long-form-docs.md`](./sources/long-form-docs.md) | ClickUp Docs, Google Docs, Notion, Confluence, Coda |
| Real-time team chat | [`team-chat.md`](./sources/team-chat.md) | ClickUp Chat, Slack, Discord, Microsoft Teams, Mattermost |
| Infrastructure observability | [`observability.md`](./sources/observability.md) | Grafana, Honeycomb, CloudWatch, New Relic, Prometheus |
| Error / exception tracking | [`error-tracking.md`](./sources/error-tracking.md) | Sentry, Rollbar, Bugsnag, Airbrake |
| Product & growth analytics | [`product-analytics.md`](./sources/product-analytics.md) | OneLence, PostHog, BigQuery, ClickHouse, Snowflake, dbt |

Cross-cutting:

- [`incident-postmortem.md`](./sources/incident-postmortem.md). Add this if the target code looks defensive (null checks, retry, timeout, rate limit, feature flag, egress guard, OOM handler).
