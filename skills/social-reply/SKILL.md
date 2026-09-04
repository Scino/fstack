---
name: social-reply
description: Crafts high-leverage, non-slop replies to trending and viral posts on X and LinkedIn. The #1 growth strategy for founders and early accounts to build presence and earn authentic followers without being spammy. Use for /social-reply, "draft reply to tweet", or commenting on posts.
menu-description: craft high-leverage, insightful replies to trending posts on X/LinkedIn
---

# Social Reply (Founder Growth Engine)

For an early-stage founder or small social account, posting standalone content into the void rarely gets reach. **The highest ROI growth strategy on X and LinkedIn is leaving insightful, early replies on high-reach posts in your domain.**

`social-reply` analyzes the target post and drafts 3 high-value, non-spammy reply angles that position you as a knowledgeable peer.

---

## When to Invoke

- You see an influential founder, investor, or engineer post about something in your space.
- You want to chime in on a trending technical debate.
- You paste the post text or URL and say: `/social-reply`.

---

## The 3 Pillars of a High-Converting Reply

1. **Be Additive, Never Flattering**:
   - Terrible: *"Great post! 100% agree! 🚀"* (Invisible, spam).
   - Terrible: *"Check out my tool at link.com!"* (Instant mute/block).
   - **Great**: Add a concrete data point, an edge case, or a counter-intuitive observation the original author missed.
2. **Speed & Clarity**:
   - The best replies are 1-3 lines. People scan comment sections rapidly.
3. **Sound Like a Peer, Not a Fan**:
   - Speak from direct builder experience. Use phrases like *"We noticed this when..."*, *"The edge case we hit was..."*, *"One exception to this is..."*

---

## The 3 Reply Angles Generated

When you provide a target post, `social-reply` drafts 3 distinct options:

### Angle 1: The Additive Data Point (Elevates the Original Post)
- Validates the author's point with a concrete, real-world measurement or tactical trick.
- Author will likely like or retweet your reply because it makes their original thesis look smarter.

### Angle 2: The Nuanced Counter-Perspective (Thoughtful Debate)
- Respectfully points out the boundary condition or edge case where the author's advice doesn't apply.
- Triggers high engagement because other readers will jump into the thread.

### Angle 3: The War Story / Builder Anecdote
- Shares a 2-sentence experience from shipping production software or running your company.

---

## Example Walkthrough

### Target Post by High-Reach Engineer:
> *"Never use microservices until you hit at least 50 engineers. A modular monolith will take you much further with 1/10th the operational overhead."*

### Generated Options:

#### Option 1 (Additive Data Point):
> "The turning point for us wasn't team size, but database locks. A monolith scaled fine until 3 background workers started contending for the same write lock on the events table. Splitting just that one async worker out bought us another 2 years of monolith simplicity."

#### Option 2 (Nuanced Counter):
> "Mostly true, with one exception: third-party compliance boundaries. Having isolated services for HIPAA or PCI data is often 10x cheaper than trying to put a whole monolith through SOC2 / FedRAMP audits."

#### Option 3 (War Story):
> "Ran a 6-person team that spent 3 months debugging distributed tracing across 14 microservices instead of shipping user features. Migrated back to a single Rails container over a weekend and velocity tripled immediately."
