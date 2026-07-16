---
title: Susan Allen — Site Audit + Template Comparison (WFC 6-Gate Framework)
created: 2026-07-13
type: audit
status: in-progress
client: Susan Allen, LMFT
phase: pre-kick-off-prep
engagement: hybrid (Squarespace template + SEO/GEO + content)
kick_off_date: 2026-07-14
tags: [wfc, susan-allen, audit, design-system, neuroaesthetic, template-comparison, phase-1]
related:
  - "[[leads/wfc-susan-allen/dossier]]"
  - "[[leads/wfc-susan-allen/SOW-2026-07-07]]"
  - "[[leads/wfc-susan-allen/kick-off-agenda-2026-07-14]]"
  - "[[Work/WFC/studio/heuristics]]"
  - "[[Work/WFC/studio/principles]]"
  - "[[Work/WFC/studio/thesis]]"
  - "[[Work/WFC/studio/tokens-colors]]"
  - "[[Work/WFC/studio/page-archetype-landing]]"
  - "[[Work/WFC/studio/page-archetype-content]]"
  - "[[Work/WFC/studio/page-archetype-conversion]]"
---

# Susan Allen — Site Audit + Squarespace Template Comparison

> **Purpose:** Apply the WFC 6-gate Critique Heuristics framework to (a) Susan's current site and (b) candidate Squarespace templates, so the kick-off conversation on Tue 7/14 is grounded in evidence, not opinion. Per WFC's [[Work/WFC/studio/thesis]]: "Design should work for the most vulnerable — because what works for them works for everyone."

## Framework — the 6 critique gates

| # | Gate | Source | What it measures |
|---|------|--------|------------------|
| 1 | **Element Count** | T2-004, Principle 1 | 9–17 elements per visible screen state |
| 2 | **Arousal Calibration** | T1-002, T1-004, Principle 4 | Target PAD, no surprise motion, no urgency typography |
| 3 | **Revisability Audit** | T1-008, Principle 2 | Draft states, undo paths, outcome descriptions |
| 4 | **Dominance Preservation** | T1-003, Principle 2 | No urgency, no dark patterns, transparent pricing/terms |
| 5 | **Implicit Aesthetic** | T1-001, T1-002, Principle 3 | Layout stability, grid, balance, hierarchy, cohesion, order |
| 6 | **Accessibility Baseline** | Token specs (colors/typography/motion) | WCAG AA, focus indicators, alt text, labels, reduced motion, keyboard nav |

Full gates + check items: [[Work/WFC/studio/heuristics]]. Report template at the bottom of that file.

## Target PAD (Pleasure / Arousal / Dominance) for this engagement

Per the WFC archetype system, Susan's site is mostly **content + landing + intake** archetypes. PAD targets:

| Archetype | Pleasure | Arousal | Dominance | Where it applies |
|-----------|----------|---------|-----------|------------------|
| **Landing** (home) | 1.8 | -0.3 | 1.0 | Home page — calm orientation |
| **Content** (about, specialties, blog) | 1.5 | -0.5 | 0.8 | About, specialties (replacing 404), blog posts |
| **Conversion** (CTA toward contact) | 2.0 | 0.5 | 1.2 | "Get in touch" sections |
| **Intake** (contact form) | 1.2 | -0.2 | 1.5 | Contact page |
| **Follow-up** (post-email confirmation) | 2.0 | -0.3 | 0.8 | After form submission |

**Specialty note for Susan:** Reproductive + perinatal mental health = users who are often anxious, overwhelmed, cognitively depleted. Target PAD is on the **low-arousal, high-dominance** end of the spectrum. Templates that lean "spa/wellness/calm" are a closer fit than templates that lean "medical/clinical" or "modern/conversion-optimized."

## Color palette guidance (from [[Work/WFC/studio/tokens-colors]])

WFC has 3 calibrated palettes:
- **Calm Base** (default, low-arousal) — peachy cream backgrounds (#F7F5F2), sage green accent (#6B8E7B), warm near-black text (#2C2825)
- **Focused Engagement** (task-completion, conversion) — slightly higher arousal, deeper greens
- **Trust and Authority** (credibility-critical) — cool blue-grey accent for credibility

For Susan's specialty (reproductive/perinatal), **Calm Base** is the strongest match. Trust signals should layer in via ASRM/PSI credentials, not via visual authority cues. The peachy cream + sage green palette already in WFC's system is on-brand for the warmth Susan wants.

---

## Sections

1. **[Susan's current site audit](current-site-audit.md)** — 6-gate evaluation of susanallentherapy.com
2. **[Squarespace template shortlist](template-shortlist.md)** — 3–4 templates that fit "warm/specialty health practices"
3. **[Template audits](template-audits.md)** — 6-gate evaluation per template
4. **[Comparison matrix + recommendation](comparison.md)** — side-by-side, scored, ranked

## Screenshots

All captured screenshots land in `./screenshots/`. Naming convention:

```
screenshots/
├── current/
│   ├── 01-home-desktop.png
│   ├── 01-home-mobile.png
│   ├── 02-about-desktop.png
│   ├── 03-contact-desktop.png
│   ├── 04-blog-desktop.png
│   ├── 05-services-404.png
│   └── ...
└── templates/
    ├── t1-fairfield-desktop.png
    ├── t1-fairfield-mobile.png
    ├── ...
```

## Outputs

After this audit completes, the deliverables are:
- **Critique Report per page** (Susan's current site) — [[Work/WFC/studio/deliverables]] says this is a WFC standard deliverable
- **Template scoring matrix** — gated by the 6 frameworks
- **Recommendation** — which template to shortlist for Susan's Milestone 2 (template selection) in the kick-off agenda

## Linked files in the dossier

This audit is referenced from [[leads/wfc-susan-allen/dossier#Post-Discovery-Timeline]] and the kick-off agenda as **pre-meeting reference** for Milestone 1 (audit) and Milestone 2 (template selection).

## Squarespace development reference

For the technical context on what we can and can't do with Squarespace templates, see [[Work/WFC/studio/squarespace-development-reference]]. That doc covers the 7.1 + Fluid Engine architecture, the customization ladder, plan-tier gating, hard limits, and the recommended approach for WFC client work. The recommendation for Susan specifically: stay on 7.1, work in Tiers 1-4 (Site Editor → Custom CSS → Code Injection → Code Blocks), and avoid the 7.0 Developer Platform entirely.
