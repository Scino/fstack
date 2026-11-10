# Long-Form Documents & Specs

## What this source contains

- PRDs (product requirement documents), technical specs, and RFCs
- Architectural decision records (ADRs)
- Design review and meeting notes
- Incident postmortems and runbooks
- Strategy and roadmap documents

Long-form document tools (ClickUp Docs, Notion, Google Docs, Confluence, Coda) hold the design rationale written out before it became code.

## How to search it

Use the available document MCP:

1. **Search by keyword.** Try the feature name, key symbols/class names from the target code, author names, and user-visible terms.
2. **Read full candidate pages.** Fetch the full document or page content rather than relying on titles or snippets; rationale and rejected alternatives are usually mid-document.
3. **Follow subpages and linked docs.** Design docs often keep alternatives considered, edge cases, or rollout notes in child pages.

## What good evidence looks like here

- A spec with a "Problem", "Motivation", or "Context" section matching the target code's purpose
- An "Alternatives considered" or "Rejected approaches" section
- A postmortem naming the target code as the fix for a specific incident
- Meeting notes recording "we decided X because Y" in the same date window as the PR

## Common pitfalls

- **Spec vs. implementation drift.** Specs are often written before code and not updated when implementation reality changes. Flag any divergence between the doc and the merged PR so the synthesizer can surface it.
- **Multiple drafts.** Check last-updated dates and status to distinguish superseded drafts from the final decision.

## What to return

For each relevant document:
- Title, identifier/URL, authors, and last-updated date
- Verbatim quote of the motivation or tradeoff text, with section location
- Whether the document reflects the final design or an earlier draft
