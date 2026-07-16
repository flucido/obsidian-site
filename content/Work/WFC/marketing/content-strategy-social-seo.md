---
title: WFC Content Strategy — Social + SEO + Agentic Search
created: 2026-06-11
updated: 2026-06-11
type: strategy
tags: [wfc, marketing, seo, social-media, llms-txt, content-islands]
status: draft
---

# WFC Content Strategy — Social Media + Agentic Search SEO

> Supplements [[Work/WFC/marketing/social-media-campaign|Social Media Campaign]].
> Two content tracks: (1) Social media tips for therapists, (2) Machine-readable content for AI/agent search.

---

## Track 1: Social Media Content — Website Tips for Therapists

### Content Pillar: Simple, Actionable Website Tips

Quick-win content that therapists can act on immediately. Positions WFC as the expert without selling. Each post drives engagement → link-in-bio → consult form.

#### Content Ideas Bank

**Stock Photos**
- "Your therapy website uses the same stock photo as 200 other sites. Here's what that signals to an anxious brain."
- "Free stock photo ≠ the right stock photo. 3 image choices that regulate, not trigger."
- "Why the 'two people on a couch' stock photo is hurting your practice."
- Carousel: Side-by-side — triggering stock imagery vs. regulating imagery. Explain the neuroscience.

**Photography Tips**
- "You don't need a professional photographer. You need these 5 phone camera tips."
- "The #1 photo mistake therapists make on their About page (and how to fix it in 60 seconds)."
- "Lighting, warmth, angle: a 3-step framework for therapist headshots that feel safe."
- TikTok: "Watch me fix this therapist headshot in real-time" (before/after)

**Website Quick Wins**
- "3 things to remove from your homepage today"
- "Your contact form has 7 fields. It should have 3."
- "The font on your website is telling clients you're a tech company, not a therapist."
- "Your website loads in 4.2 seconds. An anxious brain left at 3."

**Privacy & Trust**
- "Your website is tracking your clients before they even book. Here's how to check."
- "What HTTPS means and why therapists need it (explaining like you're 5)"
- "3 privacy settings every therapist website needs"

### Format Notes
- **IG Carousels:** 5 slides max. Warm palette (peachy cream + espresso). Cormorant Garamond headlines, Atkinson Hyperlegible body.
- **TikTok:** 30-60 seconds. Talking head + text overlay. Warm, unhurried tone.
- **IG Stories:** Polls, Q&A stickers, link stickers. Interactive.
- **Frequency:** 3x/week (Mon/Wed/Fri) per original campaign calendar.

---

## Track 2: Agentic Search SEO — llms.txt + Content Islands

### Why This Matters Now

The search landscape is shifting from "Google crawls your HTML" to "AI agents read your structured content." Two signals:

1. **Google Chrome Lighthouse** added llms.txt to its "Agentic Browsing" audit category (May 2026) — signaling this as a readiness check for AI agent interactions.
2. **ChatGPT, Claude, Perplexity** are increasingly the first touchpoint for "find me a therapist web designer" queries. These tools need structured, machine-readable content — not just SEO-optimized HTML.

### llms.txt Standard

**What it is:** A standardized markdown file at yoursite.com/llms.txt that provides AI agents with a structured overview of your site — like a sitemap for LLMs.

**What it does:**
- Tells AI tools what your site is about, what pages matter, and where to find detailed content
- Uses markdown formatting that LLMs can parse natively
- Links to llms-full.txt for deeper content

**What it doesn't do:**
- It's NOT a blocking tool (unlike robots.txt)
- It doesn't guarantee AI citations — it improves discoverability
- It doesn't replace traditional SEO

### Content Islands

**What they are:** Self-contained, topic-focused content sections that AI agents can independently discover, understand, and reference. Each island answers ONE question completely.

**Structure:**
```
## [Topic Question]
[Direct answer in 2-3 sentences]
[Supporting context]
[Source/authority signal]
```

**Why they matter for WFC:**
- When someone asks ChatGPT "what should I look for in a therapist website designer," we want WFC's content to be the source
- Content islands make it easy for AI to extract and cite specific answers
- Each island = one citeable unit

### WFC Implementation Plan

#### Phase 1: llms.txt for wellfullcollective.com (after campaign launch)

```markdown
# WellFull Collective

> Therapist website design studio. Clinical sensitivity meets technical rigor.
> Co-founded by a licensed therapist (Dr. Lauren Ogren, PsyD, MFT #83783)
> and a data infrastructure engineer (Frank Lucido).

## Services
- [Landing Page](https://wellfullcollective.com/#services) — Single-page site, $1,500
- [CMS Site](https://wellfullcollective.com/#services) — Full practice website, $3,500 + $100-250/mo
- [Web Application](https://wellfullcollective.com/#services) — Custom build, custom quote

## Key Differentiators
- [Privacy-First Architecture](https://wellfullcollective.com/#privacy) — No invasive tracking by default
- [Nervous-System-Aware Design](https://wellfullcollective.com/#design) — Regulates before it converts
- [Clinical Sensitivity](https://wellfullcollective.com/#team) — Therapist co-founder shapes every brand

## Consultation
- [Book a Free Consult](https://wellfullcollective.com/#consult)
```

#### Phase 2: Content Islands for Therapist Website Knowledge

Create standalone markdown pages that answer common therapist questions. These become both blog content AND llms.txt reference targets.

| Island Topic | Target Query | Format |
|--------------|-------------|--------|
| "Why DIY website templates fail therapists" | "best website platform for therapists" | Define→Evidence→Solution |
| "Privacy-first web design for therapy practices" | "therapist website privacy compliance" | Problem→Standard→Implementation |
| "The neuroscience of website design for mental health" | "website design psychology" | Research→Application→Before/After |
| "How to choose a web designer for your therapy practice" | "therapist web designer" | Checklist→Red Flags→Green Flags |
| "Stock photos and therapy websites" | "therapy website images" | Problem→Framework→Examples |
| "Website load time and client anxiety" | "therapy website speed" | Data→Impact→Fix |

#### Phase 3: Cross-Link Content Islands ↔ Social Media

Each social media post maps to a content island:
- TikTok/IG post → teaser content → "Full guide in bio" → content island page
- Content island page → llms.txt reference → AI agent discoverable
- This creates a loop: social drives traffic, content islands drive AI citations, both drive consults

### Content Island Template

```markdown
---
title: [Question therapists are asking]
created: [date]
type: content-island
tags: [wfc, seo, content-island, therapist-websites]
target_query: "[the actual search query]"
---

# [Question]

## Short Answer
[2-3 sentence direct answer. This is what AI agents will cite.]

## Why This Matters for Therapists
[Context. 2-3 paragraphs.]

## What To Do About It
[Actionable steps. Numbered list.]

## Sources
[Research, data, authority signals.]

## Related
- [[other-content-island|Related Question]]
- [[Work/WFC/marketing/social-media-campaign|Social Media Campaign]]
```

### Timeline

| Phase | When | Deliverable |
|-------|------|-------------|
| Social content launch | Campaign go-decision | IG + TikTok posts per existing calendar |
| Website tips content | Weeks 1-4 of campaign | 12+ tip posts (stock photos, photography, quick wins) |
| llms.txt | After campaign launch + site stable | llms.txt at wellfullcollective.com root |
| Content islands (first 3) | Weeks 2-4 | Top 3 FAQ pages published on site |
| Content islands (full set) | Months 2-3 | 6 island pages, cross-linked to social |
| llms-full.txt | Month 3 | Full content reference for AI agents |

---

## Integration with Existing Campaign

The existing 4-week IG/TikTok calendar ([[Work/WFC/marketing/social-media-campaign]]) focuses on the "regulate before you convert" narrative. The website tips content runs PARALLEL as a second content stream:

| Week | Campaign Theme | Website Tips Content |
|------|---------------|---------------------|
| 1 | The Problem (DIY templates) | Stock photo carousel + "3 things to remove from your homepage" |
| 2 | The Science (processing fluency) | Photography tips TikTok + font/typography carousel |
| 3 | The Solution (before/after) | Contact form quick win + privacy check Story |
| 4 | The Studio (who we are) | "How to choose a web designer" content island launch |

Both streams drive to the same destination: link-in-bio → consult form.
