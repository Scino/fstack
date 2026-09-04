---
name: teardown
description: Conducts deep competitor, product, and pricing teardowns using web browsing and market intelligence. Analyzes positioning, pricing packaging, customer friction, sentiment on Reddit/X, and architectural vulnerabilities. Use for /teardown, "analyze competitor", or competitor teardown.
menu-description: deep competitor, pricing, and product teardown analysis
---

# Teardown (Competitor & Market Intelligence)

Knowing your competitors' weaknesses is how a startup outmaneuvers incumbents. Big companies move slowly, paywall basic features, and leave painful UX gaps that customers hate.

`teardown` combines web browsing with strategic analysis to dissect a competitor’s product, pricing, onboarding, and customer sentiment.

---

## When to Invoke

- Analyzing a direct or indirect competitor before building a feature.
- Evaluating how competitors price and package their tiers (what's behind an "Enterprise - Contact Sales" wall).
- Investigating customer complaints on Reddit, Hacker News, X, or G2 to find underserved niches.
- Crafting your product's positioning and competitive comparison pages (`/geo-page`).

---

## The 5 Teardown Lenses

### 1. Positioning & Claims vs Reality
- What is their primary hero hook?
- What do they claim to do, and does the actual product live up to it?
- Is their copy clear or filled with corporate AI buzzwords?

### 2. Pricing & Packaging Architecture
- What is their pricing model? (Per-seat, usage-based, flat monthly, tiered)
- Where do they place the paywall? (e.g. SSO behind enterprise, audit logs locked to $50k tier)
- Where is the pricing trap that frustrates users?

### 3. User Friction & Onboarding Velocity
- Can a user self-serve sign up and see value in 2 minutes?
- Or do they force a *"Book a demo with our SDR team"* form?
- How much onboarding friction exists?

### 4. Real Customer Sentiment (The Complaint Mining Loop)
- Search Reddit, Hacker News, and X for: `"[CompetitorName] issue"`, `"[CompetitorName] alternative"`, `"[CompetitorName] slow"`.
- What are active users constantly complaining about? (Slow sync, terrible support, sudden price hikes, broken API)

### 5. The Vulnerability & Strategic Wedge
- **Their Architectural Flaw**: Are they burdened by 10 years of legacy infrastructure that prevents them from shipping modern features?
- **Our Wedge**: What is the single clean, fast, transparent capability we can offer that makes their solution look antiquated?

---

## The Teardown Report Template

```markdown
# 🔬 Teardown Report: [Competitor Name]
**URL**: [https://competitor.com] | **Market Category**: [Category]

### 💡 Executive Takeaway
[2 sentences summarizing their core position and their biggest commercial/product vulnerability]

---

### 💰 Pricing & Packaging Breakdown
| Tier | Price | Included | The Catch / Paywall Trap |
|---|---|---|---|
| Starter | Free | 1 User, 500 records | No export capability |
| Pro | $49/seat/mo | Team features | SSO, Webhooks locked out |
| Enterprise | Call Sales ($15k min) | SSO, Audit Logs | Long sales cycles, annual lock-in |

**The Strategic Opportunity**: Offer self-serve SSO and standard webhooks on a fair flat-rate tier.

---

### 🚨 What Customers Hate (Reddit / X Sentiment)
1. *"The sync latency takes 15 minutes and frequently times out on large batches."*
2. *"They quadrupled pricing last year and forced us onto an annual contract."*
3. *"Customer support takes 48 hours to reply to enterprise tickets."*

---

### 🎯 Our Winning Wedge
- Build a lightweight alternative with <200ms real-time sync.
- Transparent, self-serve pricing with no sales calls required.
- Publish a direct, factual comparison page highlighting local speed (`/geo-page`).
```
