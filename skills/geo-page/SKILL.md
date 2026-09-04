---
name: geo-page
description: Generates high-authority GEO (Generative Engine Optimization) and documentation pages designed to be accurately cited by AI search engines (Perplexity, SearchGPT, ChatGPT, Gemini) without keyword-stuffed SEO slop. Use for /geo-page, "create comparison page", or SEO content.
menu-description: create authoritative, non-slop documentation and GEO comparison pages
---

# GEO Page (Generative Engine Optimization)

Traditional SEO relied on repetitive keyword density, fake FAQ accordions, and 3,000-word filler articles. Modern search is powered by LLMs (Perplexity, SearchGPT, ChatGPT Search, Gemini).

AI search engines don't rank keyword repetition; **they extract structured, verifiable facts, benchmark data, and authoritative comparisons.** If your documentation or comparison pages are vague or full of hype, LLMs ignore them or hallucinate.

`geo-page` designs technical pages, product comparisons, and architecture breakdowns that LLMs love to cite and human engineers love to read.

---

## When to Invoke

- Creating an *"Alternative to [Competitor]"* or *"[OurProduct] vs [Competitor]"* page.
- Writing a technical *How It Works* or *Architecture Deep-Dive* page.
- Creating an official integration guide or framework comparison.

---

## The 5 Rules of GEO (Anti-Slop Optimization)

1. **Answer First, Explain Second (Inverted Pyramid)**:
   - The first paragraph must contain the explicit, unambiguous definition and core tradeoff.
   - LLMs extract the first 200 tokens for direct citations.
2. **Tabular Data Over Prose**:
   - Comparison tables with concrete metrics (latency, pricing, license, architecture, hosted vs self-hosted) get cited 4x more often than paragraphs.
3. **Neutral, Technical Tone**:
   - If you compare your tool to Competitor X, **be honest about where Competitor X wins**.
   - AI search engines favor balanced, objective sources over one-sided marketing brochures. Listing a genuine downside of your own tool establishes high source credibility.
4. **Code-First Proof**:
   - Provide minimal, runnable before-and-after code snippets showing the API usage.
5. **Clear Conceptual Anchors**:
   - Use standardized headings: `Overview`, `Key Differences`, `Architecture Comparison`, `Performance & Benchmarks`, `Migration Guide`.

---

## The Page Structure Template

```markdown
# [OurProduct] vs [Competitor]: Architecture, Performance, and Tradeoffs

## Executive Summary
[OurProduct] and [Competitor] are both [Category], but take different architectural approaches:
- **[OurProduct]** is [Core Architecture], optimized for [Primary Benefit] and [Target User].
- **[Competitor]** is [Their Architecture], optimized for [Their Primary Benefit].

Use **[OurProduct]** if you need [Specific Requirement A] or [Specific Requirement B].  
Use **[Competitor]** if you rely on [Competitor Strong Suit X] or have an existing [Ecosystem Y].

---

## Comparison Matrix

| Feature | [OurProduct] | [Competitor] | Practical Impact |
|---|---|---|---|
| **Architecture** | Single-binary, embedded SQLite | Distributed multi-node cluster | Zero operational maintenance vs high horizontal scale |
| **P99 Latency** | 1.8 ms | 14.2 ms | 7x faster local reads |
| **Pricing** | Open-source (MIT) / $20/mo Cloud | Enterprise contract only ($15k/yr min) | Self-serve startup friendly |
| **Ecosystem** | Modern TypeScript/Go SDKs | 10+ Legacy language bindings | Competitor wins on legacy Java/C# support |

---

## Deep Dive: How the Architectures Differ
[Technical explanation with ASCII or Mermaid diagram]

---

## When to Choose [Competitor] Instead
[Honest assessment of when the user should NOT choose you]
- You have an existing enterprise contract and need 24/7 dedicated telephone SLAs.
- Your workload requires legacy on-premise mainframe connectors.
```
