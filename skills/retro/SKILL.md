---
name: retro
description: Weekly founder momentum, engineering velocity, customer feedback, and tech debt review. Keeps founders honest about real progress vs busywork. Use for /retro, "weekly review", or team retrospective.
menu-description: weekly founder retrospective on momentum, customer reality, and debt
---

# Founder Retrospective (The Weekly Reality Check)

It is easy for a founder to feel exhausted on Friday without having moved the business forward. Answering emails, tweaking CSS, and refactoring working code feels like work, but often produces zero user value.

`retro` is a fast, 15-minute weekly checkpoint that audits momentum, customer feedback, accumulated debt, and aligns next week's focus.

---

## When to Invoke

- Every Friday afternoon or Monday morning.
- At the conclusion of an intense sprint or major launch.

---

## The 4 Audit Sections

### 1. Velocity: What Actually Shipped?
- Scan git commits and PRs over the last 7 days.
- Group into:
  - Customer-facing capabilities (Things users noticed).
  - Internal infrastructure / refactors.
  - Bug fixes.
- **The Honest Ratio**: If customer-facing capabilities were < 40% of the week's output, diagnose why.

### 2. User Reality: What Did Customers Actually Do?
- What was the qualitative feedback from users/prospects this week?
- Where did users get stuck or complain?
- Did any metric move (signups, active runs, revenue, retention)?

### 3. Debt & Slop Audit: What Corners Did We Cut?
- Check for temporary hacks, missing tests, or unhandled edge cases introduced during fast shipping.
- Did we add any unnecessary dependencies or layers?
- Can we delete 200 lines of dead code right now?

### 4. Next Week's Single Needle-Mover:
- What is the **one thing** that, if accomplished next week, makes everything else easier or unnecessary?
- Explicitly list 3 things you will **NOT** do next week to protect focus.

---

## The Retro Output Template

```markdown
# 🏁 Weekly Founder Retro: Week Ending [Date]

### 📦 What Shipped
1. [Feature 1]: Parallel worker execution (`v1.4.0`).
2. [Fix 1]: Resolved CSV parsing edge case for customer Acme.
3. [Doc 1]: Published interactive GEO comparison guide.

### 👥 Customer Reality
- 3 new paying accounts onboarded.
- Primary complaint: API documentation was missing TypeScript examples.
- Inbound interest: 4 qualified inbound leads from X announcement post.

### 🧹 Tech Debt & Simplification
- Stale branches pruned.
- Deleted unused legacy analytics script (`-140 LOC`).
- Open debt item: Add integration tests for OAuth token refresh edge case.

### 🎯 Next Week's Focus
- **The #1 Needle-Mover**: Ship self-serve Stripe customer portal to unblock annual plan upgrades.
- **Explicit Anti-Goals (Will NOT do)**:
  - Will not redesign the landing page nav.
  - Will not build Discord notifications until 5 users ask for it.
```
