---
name: social-post
description: Drafts authentic, high-signal social media posts from founder thoughts, engineering wins, or product updates. Generates tailored, distinct styles for X (punchy, witty, no fluff) and LinkedIn (tactical, story-driven, structured). Use for /social-post, "draft tweet", "draft linkedin post", or founder content.
menu-description: draft authentic, non-slop social posts for X and LinkedIn
---

# Social Post

AI-generated social media posts are infamous for generic engagement bait: robotic hooks, cringey LinkedIn storytelling, and hollow Twitter threads. `social-post` turns raw founder observations, code milestones, and startup realities into high-signal content people actually want to read.

---

## When to Invoke

- You just solved a gnarly bug or shipped a feature and want to share the technical lesson.
- You noticed an interesting pattern in customer behavior or AI workflows.
- You want to draft a release announcement or thought piece for X, LinkedIn, or both.

---

## Dual Platform Discipline

Every draft is tailored specifically for the target platform:

### 1. The X (Twitter) Stance: High-Signal & Punchy
- **Length**: 1 to 3 short sentences or a micro-thread (max 3 posts).
- **Tone**: Conversational, observant, candid, occasionally contrarian or dryly humorous.
- **Formatting**: Simple line breaks. No hashtag clouds (`#startup #ai #buildinpublic` are banned).
- **Hook**: Line 1 must contain the core observation or surprising insight.

### 2. The LinkedIn Stance: Tactical Storytelling
- **Length**: 150 to 300 words.
- **Tone**: Professional warmth, transparent, grounded in lessons learned.
- **Formatting**: Short 1-2 sentence paragraphs with generous line breaks. Easy to scan on mobile.
- **Structure**:
  1. *The Hook*: An unexpected problem or non-obvious realization.
  2. *The Friction*: What went wrong, what everyone assumed, or the difficult choice made.
  3. *The Breakthrough*: The concrete technical or operational solution.
  4. *The Takeaway*: A practical principle other builders can apply.

---

## The Workflow

1. **Input**: Ingest the founder's raw notes, a git commit/diff, or a topic idea.
2. **Context Check**: Read `~/.fstack/founder-voice.md` if available to match personal vocabulary.
3. **Filter Out Slop**:
   - Strip all banned words (*delve, game-changer, unlock, supercharge*).
   - Cut out rhetorical questions like *"Have you ever felt like X?"*
   - Cut out manufactured melodrama (*"I was sitting in my car crying when I realized..."*).
4. **Output**: Generate side-by-side variations (Option A: X Post, Option B: LinkedIn Post, Option C: Contrarian / Hot Take).

---

## Example Outputs

### Input: *"We migrated our background jobs from Redis/BullMQ to pure SQLite + WAL mode and our server costs dropped by 80% with zero dropped jobs."*

#### Variation 1: X (Twitter)
```text
We ripped out Redis and BullMQ for our background worker queues and replaced them with SQLite in WAL mode.

Server bill dropped 80%, zero dropped jobs across 4 million tasks, and our local dev setup is now just one file.

Sometimes the best architecture is the boring one you already have on disk.
```

#### Variation 2: LinkedIn
```text
Most architecture complexity isn't solving user problems. It’s solving the complexity we introduced last quarter.

Six months ago, our background worker queue was running on Redis and BullMQ. It worked, but keeping connection pools alive across serverless containers and debugging stalled jobs was eating hours every sprint.

Last week, we replaced the whole queue with SQLite in WAL mode.

Here is what happened:
• Server costs dropped by 80%.
• Local onboarding went from "install Docker and boot 3 services" to running `npm run dev`.
• Zero dropped jobs over 4,000,000 processed tasks.

The lesson: before adding another distributed system to your stack, ask if a single durable process on a modern NVMe drive can do the job instead.

Usually, it can.
```
