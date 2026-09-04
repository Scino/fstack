---
name: unslop-email
description: De-slop and humanize email drafts. Strips AI clichés, corporate buzzwords, robotic pleasantries, and forced enthusiasm. Injects authentic founder warmth, brevity, and conversational charm. Use for /unslop-email, "humanize this email", or cleaning up messages.
menu-description: remove AI tells and corporate buzzwords from email drafts
---

# Unslop Email

AI models write emails like a desperate corporate consultant trying to hit a word count. `unslop-email` strips away the robotic fluff and leaves behind the voice of a sharp, thoughtful human founder.

---

## The Banned Phrases & AI Tells

If any of these appear in an email draft, **delete or rewrite immediately**:

| The AI Slop | The Real Human Translation |
|---|---|
| *"I hope this email finds you well."* | Cut entirely. Start with the point. |
| *"I wanted to reach out because..."* | *"Saw your post about X..."* or just get to the point. |
| *"In today's fast-paced environment..."* | Cut entirely. |
| *"Delve into," "leverage," "seamlessly"* | *"Dig into," "use," "easily."* |
| *"Pivotal," "game-changing," "robust," "holistic"* | Name the concrete metric or feature instead. |
| *"I would love to pick your brain for 15 minutes."* | *"Curious what you think of X."* |
| *"Please let me know if you have any questions or concerns."* | *"Let me know what you think."* or *"Holler if anything breaks."* |
| *"Thrilled to announce / excited to share"* | *"Just shipped X."* |
| Em-dashes (`—`) in every paragraph | Use simple commas, periods, or parentheses. |
| Overuse of exclamation points (`!!`) | At most one `!` in the entire email, or none. |

---

## The 6 Rules of Authentic Founder Emails

1. **Rule of the Phone**:
   - Would you type this with your thumbs while walking down the street? If not, it's too formal. Shorten sentences.
2. **One Idea Per Paragraph**:
   - Break walls of text into 1-2 sentence bites. White space makes emails effortless to scan.
3. **Imperfect Authenticity over Glossy Polish**:
   - Clean, natural phrasing beats textbook grammar. Contractions (*don't*, *we're*, *can't*) are required.
4. **Concrete Over Abstract**:
   - Bad: *"Our platform enhances database performance significantly."*
   - Good: *"It dropped query latency from 80ms to 4ms for Acme's Postgres cluster."*
5. **Clear, Low-Friction Ask**:
   - Never end with a vague *"Let's connect soon."*
   - End with a binary or single-choice next step:
     - *"Does Thursday afternoon work for a 10-min screen share?"*
     - *"Want me to send over the 2-minute loom video?"*
     - *"Should I send you an invite to test it?"*
6. **No Fake Urgency**:
   - Don't invent fake deadlines or manufactured scarcity. Real founders win on product quality and genuine responsiveness.

---

## Before & After Transformation

### Before (AI Slop):
> Dear Michael,
>
> I hope this email finds you well. I am reaching out to introduce our cutting-edge developer tool, which seamlessly empowers engineering organizations to streamline their CI/CD pipelines and foster unparalleled productivity in today's fast-paced tech landscape.
>
> We would be thrilled to schedule a brief 15-minute introductory call at your earliest convenience to delve into how we can add immense value to your workflows.
>
> Best regards,  
> Fabio

### After (Unslopped):
> Hey Michael,
>
> Saw your tweet about GitHub Actions flaking on monorepo builds.
>
> We built a small caching tool that cut build times from 14 minutes to 90 seconds for teams running large TypeScript repos. Zero config—just one line in your workflow YAML.
>
> Want me to send over a 2-minute demo video to see if it's relevant for your setup?
>
> Best,  
> Fabio
