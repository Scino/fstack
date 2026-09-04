---
name: inbox-triage
description: Ingests pasted email threads or inbox batches, ranks by business and customer urgency, surfaces top priorities, and generates concise notes and 1-click draft responses. Use for /inbox-triage, "triage inbox", or sorting customer/sales messages.
menu-description: prioritize inbound inbox threads and generate draft answers
---

# Inbox Triage

Founders spend hours drowning in email: inbound leads, active deal questions, user bugs, partner inquiries, and cold noise. `inbox-triage` digests a batch of incoming messages, cuts the noise, surfaces what matters, and gives you instant response drafts.

---

## When to Invoke

- You open your inbox in the morning and have 15-30 unread messages.
- You paste a raw export, thread snippets, or CRM inquiries into the chat.
- You need a fast overview: *"What requires my attention right now vs what can wait?"*

---

## The Triage Tiers

Each message is classified into one of 4 priority tiers:

1. **🔴 P0: Active Deal & Customer Blockers (Act in < 2 Hours)**:
   - High-value prospect blocked on a question or contract.
   - Paying customer experiencing an outage or critical workflow failure.
2. **🟡 P1: Hot Inbound Leads & Warm Intros (Act Today)**:
   - Qualified prospect asking for pricing, demo, or access.
   - Intro from an investor, advisor, or trusted founder.
3. **🟢 P2: Non-Critical Questions & Feedback (Batch This Week)**:
   - Feature requests, general questions, candidate applications.
4. **⚪ P3: Noise & Low-Priority (Archive / No-Op)**:
   - Cold pitches from vendors, automated newsletters, spam.

---

## The Deliverable Structure

When invoked on a batch of messages, `inbox-triage` outputs:

```markdown
### 📬 Inbox Executive Summary (N Threads Triaged)
- **Urgent Action Items**: X threads
- **Warm Pipeline**: Y threads
- **Routine / Noise**: Z threads

---

### 🔴 High-Priority Action Items (P0 / P1)

#### 1. [Alex Rivera @ FinTech Co] — Enterprise SSO blocker
- **Context**: Evaluating Team plan, needs to know if Okta SAML is supported before procurement deadline on Friday.
- **Urgency**: Deal-critical ($24k ARR pipeline).
- **Suggested Action**: Reply immediately confirming SAML support and offer setup assistance.
- **Draft Reply**:
  > Hey Alex,
  > 
  > Yes, Okta SAML 2.0 is fully supported on the Team plan. You can configure it directly under Settings → Security → SSO in about 5 minutes.
  > 
  > Here's our setup guide: [link]. Let me know if you hit any snags or want my team to jump on a quick call with your IT admin to verify the claims.
  > 
  > Best,
  > Fabio

#### 2. [Elena Rostova] — Intro from Marc
- **Context**: Founder of fast-growing e-commerce brand looking to switch from Competitor X.
- **Urgency**: Warm introduction, high buyer intent.
- **Suggested Action**: Acknowledge intro, offer concise pitch + calendar link.
- **Draft Reply**:
  > Hey Elena,
  > 
  > Great to connect (thanks Marc!).
  > 
  > We built fstack specifically to solve the sync latency problems you're seeing on Competitor X. Our webhooks trigger in <200ms with 99.99% uptime.
  > 
  > Would love to show you how it works—feel free to grab any open slot here: [link].
  > 
  > Cheers,
  > Fabio

---

### 🟡 Routine Queue (P2)
- **Thread 3**: [Feature Request] Add dark mode export (Log to product board, reply with standard appreciation).
- **Thread 4**: [Candidate] Senior Backend Engineer resume (Review portfolio).

---

### ⚪ Noise Filtered (P3)
- 4 vendor outreach emails (Outsourced SEO agency, offshore dev shop, lead list sellers) → Ignored.
```
