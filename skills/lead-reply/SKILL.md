---
name: lead-reply
description: Draft high-conversion, charming, consultative, and non-salesy replies to inbound leads and inquiries. Considers real product capabilities, persona, and next steps without AI slop. Use for /lead-reply, "draft reply to lead", or sales inquiries.
menu-description: draft human, consultative replies to inbound sales leads
---

# Lead Reply

Turn raw inbound lead inquiries, demo requests, and sales emails into authentic, high-converting replies that sound like a passionate, thoughtful founder—not a spammy SDR or automated AI robot.

---

## When to Invoke

Use whenever you need to reply to:
- A potential customer reaching out via contact form or email.
- A prospect asking whether your product supports specific features or integrations.
- An enterprise or SMB asking about pricing, security, or enterprise tiers.
- A warm introduction from an investor or mutual connection.

---

## Core Philosophy: The Anti-SDR Posture

1. **Be a Consultative Builder, Not a Pitch Machine**:
   - Talk founder-to-founder (or engineer-to-engineer).
   - Answer their direct question in the first 2 sentences. Never dodge with *"That's a great question, let's jump on a 30-minute discovery call to discuss your synergies."*
2. **Honesty on Capabilities**:
   - If the product does it: state how simply and clearly.
   - If the product doesn't do it yet: say so plainly (*"We don't support X today because we're focused on nailing Y. If X is a hard blocker for you, we might not be the best fit right now, but here's how some teams work around it..."*). Brutal honesty builds immediate trust.
3. **Zero Robotic Slop**:
   - No *"I hope this email finds you well"*.
   - No *"I would love to pick your brain"*.
   - No *"revolutionary," "game-changing," "seamlessly integrate"*.
   - Use short paragraphs (1-3 sentences max). Write like you type in Slack or Apple Mail on a phone.

---

## The Workflow

### Step 1: Analyze the Inbound
Extract and classify:
1. **Persona**: Are they a solo developer, technical founder, VP Engineering, or procurement manager?
2. **Specific Needs & Pain**: What problem are they trying to solve right now?
3. **Subtext & Urgency**: Are they evaluating 3 competitors? Do they have a deadline?

### Step 2: Cross-Reference Product Reality
Check the current project state (README, documentation, pricing, code):
- What is supported in production today?
- What requires custom enterprise setup?
- What is out of scope?

### Step 3: Draft the Response
Structure:
1. **Direct Greeting**: First name only (*"Hey Alex,"*).
2. **Direct Answer First**: Address their main question immediately.
3. **Context / Proof**: 1-2 sentences on how existing users or you personally use it.
4. **Low-Friction Next Step**:
   - Don't push a heavy calendar link if an async answer suffices.
   - Give an option: *"Happy to spin up a quick sandbox for you to test, or if you prefer a 15-min walkthrough, grab any slot here [link]."*
5. **Sign-off**: Warm, informal (*"Best, / Cheers, / Talk soon,"* + Founder Name).

### Step 4: Polish with `/unslop-email`
Pass the draft through the unslop email principles to remove any residual corporate stiffness.

---

## Example Output

```markdown
Hey Sarah,

Yes, we handle Webhook retries with exponential backoff out of the box. If your endpoint is down, we buffer events for up to 72 hours and alert you in Slack.

Regarding SOC2: we're currently Type I certified and our Type II audit finishes in Q3. I can share our security packet and bridge letter if you need them for compliance.

If you'd like to test it out on a staging project, here's a link to skip the waitlist [link]. Or if you prefer a quick 15-min technical walkthrough, feel free to grab a time that works for you: [link].

Best,
Fabio
```
