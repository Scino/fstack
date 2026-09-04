---
name: customer-lens
description: Audits UI flows, onboarding funnels, error messages, and landing page copy from the perspective of a skeptical, distracted customer. Identifies cognitive friction, confusing jargon, and drop-off risks. Use for /customer-lens, "audit UX", or customer friction review.
menu-description: audit UI, copy, and onboarding through the eyes of a skeptical customer
---

# Customer Lens

Founders and engineers have "curse of knowledge": we know exactly how the app works, where to click, and why that cryptic error message appeared. Real customers have 10 browser tabs open, zero patience, and will bounce in 5 seconds if something is confusing.

`customer-lens` simulates a critical, distracted user inspecting your product to catch friction before customers bounce.

---

## When to Invoke

- Reviewing a new onboarding or signup flow before launching.
- Auditing a landing page hero section and pricing table.
- Reviewing error messages and empty states in your application.
- When an existing feature is seeing unexpected drop-off or confusion.

---

## The 4 Audit Lenses

### 1. The 5-Second Comprehension Test (Landing Page & Hero)
- Can a first-time visitor answer these 3 questions in under 5 seconds?
  1. *What is this?*
  2. *Who is it for?*
  3. *What do I do next?*
- Common fails: Abstract taglines like *"Redefining the frontier of intelligent workflows"* (tells the user nothing).

### 2. Time-to-Value (The Onboarding Funnel)
- How many steps/clicks between *"Sign up"* and the *"Aha! moment"*?
- Does the app force unnecessary onboarding steps (e.g. asking for phone number, team size, or company URL before showing any value)?
- Does the empty state explain what to do, or is it a barren white screen?

### 3. Jargon & Internal Language Check
- Are you using internal engineering terms on user-facing screens?
  - Bad: *"Synchronizing replica node 3..."*
  - Good: *"Saving changes..."*
  - Bad: *"Payload validation failed on schema #2"*
  - Good: *"Please enter a valid email address."*

### 4. Error State & Recovery Audit
- When things go wrong, does the app give the user a way out?
- Every error message must contain:
  1. Plain-English explanation of what happened.
  2. The exact single action to fix it (e.g. *"Try refreshing,"* *"Check your API key,"* *"Contact support"*).

---

## The Deliverable Report

```markdown
# 🔍 Customer Lens Audit: [Feature / Page Name]

## Overall Verdict: [Pass / High Friction / High Drop-off Risk]

### 🚨 Critical Friction Points (Fix Before Launch)
1. **Empty State on First Login**:
   - *Observation*: After signup, the user lands on an empty dashboard with no guidance.
   - *User Reaction*: "Is it broken? What am I supposed to do?"
   - *Fix*: Add a single primary button: *"Create your first project (+ template)"*.

2. **Hero Copy Ambiguity**:
   - *Current*: "The unified intelligence layer for enterprise operations."
   - *Customer Confusion*: Sounds like generic AI hype.
   - *Recommended*: "Automate database backups and restore testing in 1 click."

### 💡 High-ROI Polish Items
- Add tooltips to the 3 advanced export options in Settings.
- Replace technical 401 error with: *"Your session expired. Click here to sign back in."*
```
