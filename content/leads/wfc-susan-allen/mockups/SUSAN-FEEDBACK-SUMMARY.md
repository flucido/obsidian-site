---
title: Susan Allen — Post-Meeting Feedback Summary
created: 2026-07-15
type: feedback-summary
status: complete
client: Susan Allen, LMFT
sources:
  - "[[leads/wfc-susan-allen/kick-off-notes-2026-07-14]]"
  - "Otter transcript: /Users/flucido/Documents/susanAllenTranscript.txt"
  - "[[leads/wfc-susan-allen/audit/current-site-audit]]"
  - "[[leads/wfc-susan-allen/audit/template-audits]]"
  - "[[leads/wfc-susan-allen/audit/comparison]]"
tags: [wfc, susan-allen, feedback, post-meeting, design, neuroaesthetic]
related:
  - "[[leads/wfc-susan-allen/mockups/README]]"
  - "[[leads/wfc-susan-allen/design-system/README]]"
---

# Susan Allen — Post-Meeting Feedback Summary

> **Compiled 2026-07-15** from the kick-off meeting (Otter transcript 7/14 10:01–10:58 AM PT), the pre-prepared audit at [[leads/wfc-susan-allen/audit]], and post-meeting reflection. This is the **succinct list** for working through design decisions and template exploration.
> **Audience:** Frank + Lauren (working session) + a reference for Susan if questions come up.

## 1. Susan's Stated Goals (her own words, ranked)

1. **"Update, streamline."** Site is 8 years old, needs to work on mobile.
2. **Stop the bot spam** — "300% traffic jump, mostly bots from China/Iran/Afghanistan."
3. **Clean up the mess** — old + new code "jammed in there together."
4. **Reflect her aesthetic:** *"I just like really beautiful, minimal things, and I would like my site to reflect that."*
5. **Get found in generative search** — was top for "SF infertility therapists" → now nowhere. *Daughter searched ChatGPT and found her as one of three.*
6. **Honor the work's seriousness** — clinical, not breezy. B&W editorial pitched, but worried about colleague overlap. **Prefers cool colors over warm (orange/pink).**
7. *Daughter wants a dancing video on it. (Worth a laugh, not a deliverable.)*

## 2. Personal Context (shapes the tone of all work)

- **Mom + brother died in past 6 months.** Stated as the reason she's been unable to do site work herself: *"I don't have any emotional space to update my website."*
- **Solo practitioner** in a reproductive/perinatal specialty. This is therapeutic work, not "make it flashy."
- The engagement is partly a gift to herself — taking a project she couldn't tackle alone. **Tone matters more than flash.**

## 3. Sensory / Emotional / Meaning Audit Findings (the 6-gate pass, walked live)

### Sensory (the 200ms test)
- ❌ **200ms test fails** — header has placeholder text (street address, phone may already be fixed, not sure), old template residue.
- ❌ **Focal point competition** — hero text centered + large, but immediately below it sit two competing service links + a third CTA further down.
- 🟡 **Color/contrast** — palette is "calming but too low arousal." Doesn't pass WCAG AA on links/backgrounds. "Moving from recommendations to ADA compliance issues" — affects SEO + AI-bot pickup.
- ✅ Typography coherent overall (Source Sans Pro is fine, no need to change).
- ⚠ Arial fallback in some browsers (template default; can fix in template).
- ✅ Information density is fine.
- ❌ No micro-interactions or hover effects.

### Emotional
- 🟡 "Monochrome, falls a little bit flat." Can stay monochrome but improve how colors work together.
- 🟡 Font weights — minor work to give more emotional impact.

### Meaning
- ❌ **Contact page** says "my practice is currently full" — abrupt. Soften wording OR remove + keep email path.
- ❌ **Headshot** needs refresh. iPhone + daughter can DIY at home.
- ⚠ **Psychology Today badge** isn't integrated — bring into the aesthetic.
- ⚠ **Footer inconsistency** — licensing left-justified while rest is centered.
- ❌ **Photography doesn't connect to specialty** — sunset + tulips don't say "infertility / reproductive health counseling." Pick photography that feels comforting for fertility/pregnancy/postpartum and integrate (don't float above text).
- ❌ **Biophilic presentation** — current photos are "in a box" → blend into the aesthetic, integrate with text.

## 4. Compliance + Content Gaps (must address in Phase 1)

- **HIPAA-aware communications notice** — required because the site collects IP + browser info. Susan's site does this even with email-only intake.
- **Informed consent language** — Lauren writes, Susan reviews.
- **Crisis resources** — optional, since Susan's clientele isn't acute crisis.
- **Generated search positioning** — was top, now nowhere. The "infertility therapist San Francisco" ChatGPT result was one of three for Susan; that's a green light that the work is findable in new channels.

## 5. Susan's Template Reactions (verbatim)

- *"I played through the wellness, health and wellness section. I just looked at it. They all kind of look the same to me. Different colors, basically."*
- *"A lot of that orangish color that's really popular. It's like a pinkish orange. Reminds me of one of my niece's rooms. It's like all that color. I know it's really popular now with the younger."*
- **"Which is a nice color, but I will… definitely…"** (trailed off; cool-color preference implied)
- Wants **Lauren's curated take**, not all 4 candidates.

## 6. Template Decision (post-call inference from audit + Susan's input)

**Working set: Clove, Jenani, Clune** (3 of 4 in the audit shortlist).
- **Clove** — primary recommendation. Mental health collective. Team page with credentials (PSY.D/MD/PHD) is the exact pattern Susan needs for ASRM/PSI prominence.
- **Jenani** — backup. Solo-practitioner voice + FAQ block built in. Matches SOW's "FAQ block structured for AI citation" requirement.
- **Clune** — color palette match. "Light Gray, Light Pink, Sage Green" option is closest to WFC Calm Base. Spa-flavored copy needs translation.
- **Aurora** — NOT included. E-commerce / wellness retreat architecture. Susan's SOW explicitly removes online booking.

## 7. Design Direction (per Susan's stated aesthetic + WFC principles)

| Dimension | Direction | Source |
|---|---|---|
| **Aesthetic overall** | Minimal, beautiful, serious | Susan's stated goal |
| **Color** | Cool palette (blues/sages) over warm (orange/pink) | Susan's stated preference; WFC Calm Base (peachy cream + sage green) |
| **B&W editorial** | Possible; B&W pitch landed but Susan worried about colleague overlap | Lauren pitch + Susan's reaction |
| **Photography** | Specialty-relevant for reproductive/perinatal; biophilic integration | Audit + Lauren's feedback |
| **Motion** | Add micro-interactions; calm hover effects; respects `prefers-reduced-motion` | Audit Gate 2 (Arousal Calibration) |
| **Typography** | Source Sans Pro (current) is fine; refine weights for emotional impact | Audit + Lauren's feedback |
| **WCAG 2.1 AA** | Required. Currently fails. Hard fix priority. | Audit + Lauren's feedback |
| **OKF content scaffold** | Susan-maintainable knowledge scaffold. TBD on framework decision. | SOW § 3.1.8 |
| **Bilingual / generative-search optimized FAQ** | High-leverage; matches "AI findability" goal | SOW § 3.1.7 |

## 8. Frank (this person) — design system exploration themes to push on

- **WFC Calm Base** — peachy cream + sage green. Already in `Work/WFC/studio/tokens-colors.yaml`. Calibrated to low-arousal PAD (Pleasure 1.5, Arousal -0.5, Dominance 0.8). See if it works for Susan's reproductive/perinatal specialty.
- **Cool palette alternatives** — slate blue / dusty sage / warm cream. Susan prefers cool. WFC's blue-trust palette (Trust and Authority) is `background-primary #F4F2EE` + `accent-primary #5A7A8A` (cool slate blue) — worth a variant.
- **B&W editorial variant** — what does WFC's neuroaesthetic look like in monochrome? Susan's serious-tone preference + clinical work might map well to a curated B&W variant.
- **Typography refinement** — Cormorant Garamond (display serif) + Atkinson Hyperlegible (body) is the WFC default. Susan's current is Source Sans Pro (sans only). Worth showing her a serif+sans variant.
- **Biophilic imagery** — fertility/pregnancy imagery that's calm, not clinical. Need to source or generate.

## 9. Process Note (for today's plan)

- **HTML mockups** (per Frank's plan) for the 3 templates (Clove, Jenani, Clune) → in `leads/wfc-susan-allen/mockups/{template}/`.
- **Design system explorations** (WFC tokens + Susan-specific variants) → in `leads/wfc-susan-allen/design-system/`.
- **Web-based deliverable mechanism** (Cloudflare worker / Pages / similar) → research in `Work/WFC/studio/web-deliverables/`. Not for sale; just for client mockup delivery.
- **Will NOT go into Squarespace yet** — these are exploration, not deployment.
- **Susan's pick from the 3 happens by 7/18** (pre-WFC OOO) so config can start 8/3.

---

*Compiled by Mavis. Source: kick-off notes + Otter transcript review + 7/13 audit. Most content is from Susan's own words on the call.*
