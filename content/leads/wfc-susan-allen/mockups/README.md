---
title: Susan Allen — Design Mockups To-Do Plan (3 Templates)
created: 2026-07-15
type: work-plan
status: in-progress
client: Susan Allen, LMFT
owner: Frank (with Lauren on clinical copy)
goal: HTML mockups for the 3 agreed templates + design system explorations, presented via web-based deliverable
related:
  - "[[leads/wfc-susan-allen/mockups/SUSAN-FEEDBACK-SUMMARY]]"
  - "[[leads/wfc-susan-allen/audit/comparison]]"
  - "[[leads/wfc-susan-allen/audit/template-audits]]"
  - "[[leads/wfc-susan-allen/design-system/README]]"
  - "[[Work/WFC/studio/web-deliverables/README]]"
tags: [wfc, susan-allen, to-do, design, mockups, html, design-system]
---

# Susan Allen — Design Mockups To-Do Plan

> **Working plan for the 3-template mockup work + design system + web-deliverable mechanism.** Owned by Frank (with Lauren on clinical copy). HTML mockups → not going into Squarespace yet → presented via web for Susan's review.

## The 3 Templates (working set)

1. **Clove** — primary recommendation. Mental health collective. Team page with credentials pattern. *Best structural match for Susan's specialty.*
2. **Jenani** — backup. Solo-practitioner voice. FAQ block built in.
3. **Clune** — color palette match (sage green + light pink + light gray). Spa-flavored copy needs translation.

**Not in working set:** Aurora (e-commerce / wellness retreat architecture, not Susan's specialty).

## Per-Template To-Do

### T1 — Clove (mental health collective) mockup

**Goal:** HTML mockup showing how Susan's content + ASRM/PSI credentials + specialties + WFC Calm Base palette would look in Clove's structure.

**Per-template work:**
- [ ] Capture full-page screenshots of Clove live demo (clove-fluid-demo.squarespace.com) at desktop + mobile breakpoints — done 7/13
- [ ] Identify the sections to mock: Hero, "Our approach", Services, Team (4 providers → swap for Susan solo), Testimonial, Blog, "Get started"
- [ ] Map Susan's content onto Clove's structure:
  - [ ] Hero H2 swap: "Introducing Clove, a mental health collective" → "Reproductive + perinatal mental health. Solo private practice."
  - [ ] Services: 4 cards (Therapy/Psychiatry/Coaching/Acupuncture) → 4 of Susan's 11 specialty cards (Infertility, Pregnancy/Postpartum, Donor Conception, Mid-Life)
  - [ ] Team: 4 providers (PSY.D/MD/PHD/ND LAc) → Susan solo with credential prominence (ASRM Mental Health Professional Group, PSI Professional Provider, Donor Conceived Community)
  - [ ] Testimonial: swap Clove client quote → Susan placeholder (or remove)
  - [ ] CTA: "BOOK A CONSULTATION" → "Email Susan" per SOW
- [ ] Apply WFC Calm Base palette to Clove's default → peachy cream background + sage green accent
- [ ] Mock in HTML using WFC tokens from `Work/WFC/studio/tokens-colors.yaml`
- [ ] Test against 6-gate framework (the audit's Gate 1-6 checklist)
- [ ] Capture screenshot → save to `mockups/clove/`

### T2 — Jenani (holistic healer) mockup

**Goal:** HTML mockup showing Susan's content in Jenani's solo-practitioner structure with FAQ block.

**Per-template work:**
- [ ] Capture full-page screenshots of Jenani live demo — done 7/13
- [ ] Identify the sections: Hero ("Holistic healer"), "About me", "My services", "Pillars of care", FAQ, "Still have questions? Reach out!"
- [ ] Map Susan's content:
  - [ ] H1 swap: "Holistic healer" → "Susan Allen, LMFT" (or specialty-led)
  - [ ] About me: rewrite in Susan's voice (clinical, not "healer")
  - [ ] My services: "Healing is for everyone" → Susan's specialty framing
  - [ ] Service areas (Psychological, Physical, Immunity, Urinary & reproductive, Recovery) → Susan's 11 specialty areas (or 4-5 grouped)
  - [ ] Pillars of care (Intentional / Affirming / Generative) → WFC's 6 principles or Susan's clinical values
  - [ ] FAQ: built-in expand/collapse → populate with Susan's actual FAQs (need to gather at Discovery)
  - [ ] Schedule/booking: REMOVE per SOW (email-only intake); replace with email link
  - [ ] Pricing: REMOVE per SOW
- [ ] Apply WFC Calm Base palette (or cool variant)
- [ ] Mock in HTML using WFC tokens
- [ ] Test against 6-gate framework
- [ ] Capture screenshot → save to `mockups/jenani/`

### T3 — Clune (boutique spa) mockup

**Goal:** HTML mockup showing Susan's content adapted to Clune's clean structure with the closest WFC palette match.

**Per-template work:**
- [ ] Capture full-page screenshots of Clune live demo — done 7/13
- [ ] Identify the sections: Services ("Facials ⟶", "Body Treatments ⟶"), big H1 statement, "Our Story", newsletter
- [ ] Map Susan's content:
  - [ ] Replace ALL spa-flavored copy:
    - "Pamper your skin with products that are safe enough to eat" → "Therapy grounded in evidence, responsive to what you need"
    - "Facials ⟶" → "Infertility & Family Building ⟶" or "Reproductive Mental Health ⟶"
    - "Body Treatments ⟶" → "Pregnancy & Postpartum ⟶"
  - [ ] Services → Susan's specialty areas
  - [ ] "Book Appointment" → "Email Susan" (per SOW)
  - [ ] "Our Story" → Susan's bio (rewrite clinical, not spa)
- [ ] Apply the **"Light Gray, Light Pink, Sage Green"** color palette option (Clune's built-in) — closest to WFC Calm Base
- [ ] Mock in HTML
- [ ] Test against 6-gate framework (especially Gate 2 — Arousal Calibration; the spa copy fails this)
- [ ] Capture screenshot → save to `mockups/clune/`

## Design System Explorations

> Per Frank's plan: "work a little bit on a few ideas on design systems as well." Not the Squarespace theme system (we don't have direct control), but the **token layer** that informs our Custom CSS overrides.

### Token variants to mock up

- [ ] **WFC Calm Base (default)** — peachy cream + sage green. Already tokenized. See how it looks for Susan.
- [ ] **WFC Cool variant** — slate blue / dusty sage / warm cream. Susan prefers cool. Customize `tokens-colors.yaml` or build a "Susan variant."
- [ ] **B&W editorial variant** — what does WFC's neuroaesthetic look like in monochrome? Susan liked the idea but worried about overlap. Test the limits.
- [ ] **Typography variants:**
  - [ ] Sans-only (Susan's current — Source Sans Pro)
  - [ ] Cormorant Garamond (display serif, WFC default) + Atkinson Hyperlegible (body) — WFC standard
  - [ ] Other serif options to consider
- [ ] **Spacing scale exploration** — does WFC's 8-pt scale work for Susan's content density?

### Deliverables in `leads/wfc-susan-allen/design-system/`

- [ ] `tokens-susan-variant.yaml` — proposed WFC token set for Susan (palette + typography)
- [ ] `pad-coordinates.md` — target Pleasure/Arousal/Dominance for Susan's site (per WFC's emotional calibration principle)
- [ ] `archetype-mapping.md` — which WFC page archetypes (landing/content/intake/etc.) map to Susan's pages

## Web-Based Deliverable Mechanism (the broader question)

> Frank: "a way to present things to clients... web-based... not for sale... Cloudflare worker page or similar." This is reusable infrastructure, not Susan-specific. Goes in `Work/WFC/studio/web-deliverables/`.

### Research to do

- [ ] **Cloudflare Pages** — static site hosting, free tier, custom domain support
- [ ] **Cloudflare Workers** — serverless, more flexible but overkill for static mockups
- [ ] **Vercel** — free tier, fast, easy deploys from Git
- [ ] **Netlify** — similar to Vercel
- [ ] **GitHub Pages** — simplest, but less control
- [ ] **Notion public page** — zero code, but limited design control
- [ ] **Self-hosted static on the existing VM** — already have infrastructure

### Decision criteria
- Free or near-free (not for sale)
- Custom domain (lucido.studio or similar)
- Easy to update (HTML/CSS/JS only, no build step required)
- Decent performance (mockups are visual; needs to feel professional)
- Authentication option for client-only access (nice-to-have)

### Plan to design

- [ ] Pick a platform by end of week
- [ ] Create reusable layout: header (WFC branding), client/project nav, mockup embed, notes/annotations panel
- [ ] First deployment: Susan's 3 mockups
- [ ] Template: drop in new client name + 3 mockups → live in 30 min

## Sequencing (today)

1. [ ] Build this to-do list (done)
2. [ ] Pull Clove live demo at desktop + mobile for visual reference
3. [ ] Build Clove HTML mockup (start with hero + approach sections)
4. [ ] Pull Jenani live demo for visual reference
5. [ ] Build Jenani HTML mockup (start with hero + about + FAQ)
6. [ ] Pull Clune live demo for visual reference
7. [ ] Build Clune HTML mockup (start with hero + services)
8. [ ] Decision point: web-based deliverable platform (research)
9. [ ] Set up `Work/WFC/studio/web-deliverables/` with chosen platform
10. [ ] Deploy the 3 mockups (or first iteration)

## Out of Scope (today)

- Squarespace config (waits for Susan's template pick by 7/18, then config starts 8/3 post-WFC OOO)
- Actual site copy rewrites (Lauren's clinical copy work)
- HIPAA-aware communications notice draft (Lauren)
- WCAG 2.1 AA pass (WFC post-Japan)
- Bilingual / SEO content strategy (Phase 2 territory)

## Open Questions (for Susan via Lauren)

- [ ] B&W vs color final decision (at Discovery 7/16-7/17)
- [ ] Specific specialty framing (which 4-5 of her 11 specialties lead the site?)
- [ ] FAQ content (need 4-6 questions for the FAQ block — gather at Discovery)
- [ ] Photography: can she provide 2-3 specialty-relevant images? Or do we source?
- [ ] "Feeling question" answer — "What do you want someone to feel when they visit your site?" (Lauren to gather at Discovery)

---

*Plan compiled by Mavis 2026-07-15. Owner: Frank. Per-template work may delegate to specialists; design system + web-deliverable work may need Frank's direct attention.*
