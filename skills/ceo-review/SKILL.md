---
name: ceo-review
description: Founder/CEO strategic plan review. Calibrates scope across 4 modes (Scope Expansion, Selective Expansion, Hold Scope, Scope Reduction) to challenge premises, eliminate bloat, or discover the 10-star product experience. Use for /ceo-review, "review scope", or strategic plan review.
menu-description: strategic plan review with 4 scope calibration modes
---

# CEO Review (Strategic Scope Calibration)

Before committing weeks of engineering effort to an implementation plan, the founder must ask: **Are we building the right scope?**

Are we thinking too small and missing the breakthrough product experience? Or are we overcomplicating an MVP that should ship by Friday?

`ceo-review` evaluates an implementation plan or feature proposal across 4 distinct strategic postures.

---

## When to Invoke

- You have an engineering implementation plan or RFC ready to build.
- You feel unsure whether the scope is too broad or too conservative.
- You want to pressure-test the user experience before writing code.

---

## The 4 Scope Modes

When invoking `/ceo-review [mode]`, select one of the following postures:

### 1. `SCOPE_EXPANSION` (The 10-Star Product)
*Inspired by Brian Chesky's Airbnb product design framework.*
- **Question**: *"What would make a customer tell 10 friends about this?"*
- Ignores conventional constraints for a moment to imagine the magical version:
  - A 5-star experience: It works and doesn't crash.
  - A 7-star experience: It anticipates what the user needs before they click.
  - A 10-star experience: The problem is solved automatically with zero manual effort.
- Identifies which pieces of the 10-star vision can be built today with AI agent leverage.

### 2. `SELECTIVE_EXPANSION` (Hold the Core, Elevate the Key Detail)
- Holds 90% of the scope fixed to ensure speed.
- Cherry-picks the single high-leverage delight factor that turns a boring utility into a beloved product (e.g. instant keyboard shortcut, zero-latency optimistic update, beautiful CLI progress display).

### 3. `HOLD_SCOPE` (Maximum Execution Rigor)
- Freezes the boundaries.
- No new features, no scope creep.
- Focuses 100% on bulletproof edge cases, rock-solid tests, error boundaries, and unslop.

### 4. `SCOPE_REDUCTION` (The Friday Ship)
- **Question**: *"What can we cut so this ships by tomorrow afternoon?"*
- Identifies unnecessary tables, secondary settings, complex configuration options, and premature generalizations.
- Strips the plan to its irreducible core: 1 input, 1 action, 1 output.

---

## The Review Deliverable

```markdown
# 🏛️ CEO Strategic Review: [Project / Feature Name]
**Selected Posture**: [SCOPE_EXPANSION | SELECTIVE_EXPANSION | HOLD_SCOPE | SCOPE_REDUCTION]

### 🎯 Strategic Assessment
[2-3 sentences diagnosing whether the current plan is over-engineered or under-ambitious]

### ✂️ Scope Adjustments
- **Cut**: [Feature / complexity to remove immediately]
- **Keep**: [Core non-negotiables]
- **Add / Elevate**: [The single detail that makes it remarkable]

### ⚖️ Tradeoff Matrix
| Dimension | Current Plan | Recommended Plan | Business Impact |
|---|---|---|---|
| Time to Ship | 2 Weeks | 3 Days | 4x faster feedback loop |
| Complexity | 4 Models, 6 Tables | 1 File, 1 SQLite Table | Zero migration overhead |
| User Delight | 6/10 (Functional) | 9/10 (Magical) | High word-of-mouth potential |

### 🚀 Next Action
Hand the calibrated plan to `/engineer-mode` for flawless engineering execution.
```
