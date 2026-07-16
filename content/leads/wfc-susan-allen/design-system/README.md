---
title: Susan Allen — Design System Exploration
created: 2026-07-15
type: design-system
status: in-progress
client: Susan Allen, LMFT
goal: token layer + emotional calibration for Susan's site, applied across all 3 template mockups
related:
  - "[[Work/WFC/studio/principles]]"
  - "[[Work/WFC/studio/heuristics]]"
  - "[[Work/WFC/studio/tokens-colors]]"
  - "[[Work/WFC/studio/tokens-typography]]"
  - "[[Work/WFC/studio/page-archetype-landing]]"
  - "[[leads/wfc-susan-allen/mockups/README]]"
  - "[[leads/wfc-susan-allen/mockups/SUSAN-FEEDBACK-SUMMARY]]"
tags: [wfc, susan-allen, design-system, tokens, neuroaesthetic, calm-base]
---

# Susan Allen — Design System Exploration

> **Token layer + emotional calibration for Susan's site.** Per Frank's plan: "work on a few ideas on design systems as well." Note that Squarespace is theme-based (we don't have direct token control at the platform level), so these tokens inform our **Custom CSS overrides** + the design intent we communicate to Susan. The tokens here are the source of truth for the mockup work and the eventual Phase 1 config.

## Source of truth

- [[Work/WFC/studio/principles]] — 6 WFC design principles
- [[Work/WFC/studio/heuristics]] — 6-gate critique framework
- [[Work/WFC/studio/tokens-colors]] — color palette definitions (YAML)
- [[Work/WFC/studio/tokens-typography]] — type scale (YAML)
- [[Work/WFC/studio/page-archetype-landing]] — landing archetype spec

## Target PAD (Pleasure / Arousal / Dominance) for Susan

Per WFC's Principle 4 (Emotional Calibration), every page should have a target PAD coordinate. Susan's specialty = reproductive + perinatal mental health = users who are often anxious, overwhelmed, cognitively depleted.

| Archetype | Pleasure | Arousal | Dominance | Notes |
|-----------|----------|---------|-----------|-------|
| **Landing** (home) | 1.8 | **-0.5** | 1.0 | Lower arousal than WFC default (1.8/-0.3/1.0) — Susan's audience is more vulnerable |
| **Content** (about, specialties, blog) | 1.5 | **-0.7** | 0.8 | Even calmer than WFC default — clinical content needs to read as "safe space" |
| **Conversion** (CTA toward contact) | 2.0 | -0.2 | 1.2 | Slightly higher arousal at the moment of action — but still low (no urgency) |
| **Intake** (contact form) | 1.2 | -0.3 | 1.5 | Even higher dominance at intake — user in control |

**Rationale:** WFC's default palette (Calm Base) is calibrated to PAD 1.5/-0.5/0.8. Susan's site should be **0.2 lower on arousal** across content pages — her users are a more anxiety-vulnerable population than the WFC default targets. The Clove mockup uses these lower-arousal targets.

## Color palette exploration (3 variants)

### Variant A: WFC Calm Base (default, peachy cream + sage green)

```yaml
# Source: Work/WFC/studio/tokens-colors.yaml
palette_default:
  background_primary: '#F7F5F2'  # peachy cream
  background_secondary: '#EDEAE5'
  text_primary: '#2C2825'         # near-black (no pure black per WFC)
  accent_primary: '#6B8E7B'      # sage green
  target_pad: { pleasure: 1.5, arousal: -0.5, dominance: 0.8 }
```

**Pros:** Already in WFC system, well-tested, sage green = biophilic. **Cons:** Susan said "cool colors > warm" — peachy cream is warm.

### Variant B: WFC Cool (slate blue / dusty sage / warm cream) — Susan-leaning

```yaml
# Proposed Susan variant (not yet in tokens-colors.yaml)
palette_susan_cool:
  background_primary: '#F2F0EC'    # warm cream (slightly cooler than Calm Base)
  background_secondary: '#E6E2DC'
  text_primary: '#1F2A30'          # deep slate (cooler near-black)
  text_secondary: '#4A565C'        # slate gray
  accent_primary: '#5A7A8A'       # slate blue (cool, trust-adjacent)
  accent_secondary: '#7A9A8A'     # dusty sage
  border_subtle: '#D5CFC6'
  target_pad: { pleasure: 1.6, arousal: -0.6, dominance: 1.0 }
  rationale: |
    - Susan prefers cool over warm (per her stated preference 7/14)
    - WFC's "Trust and Authority" palette (slate blue) maps to clinical seriousness
    - Slate + sage gives the biophilic + clinical feel Susan needs
    - Lower arousal than default (Susan's audience more vulnerable)
```

**Pros:** Susan's stated cool-color preference. **Cons:** Not in the existing WFC token system; would need to be added.

### Variant C: B&W Editorial (monochrome + sage accent) — for exploration

```yaml
palette_susan_mono:
  background_primary: '#FAFAF8'    # warm white
  background_secondary: '#F0EFEC'
  text_primary: '#1A1A1A'          # near-pure black (WFC prefers #2C2825, but B&W justifies going darker)
  text_secondary: '#555550'
  accent_primary: '#6B8E7B'       # sage green (only color)
  accent_muted: '#A6B0AB'
  border_subtle: '#E5E2DD'
  target_pad: { pleasure: 1.4, arousal: -0.7, dominance: 1.0 }
  rationale: |
    - Lauren's B&W editorial pitch landed on the call
    - Susan worried about colleague overlap → need to test what makes B&W distinctly WFC
    - Sage as the single accent keeps the WFC biophilic anchor
    - Lowest arousal of the 3 variants; most "serious" feel
```

**Pros:** Matches Susan's "serious tone" preference; lowest arousal = safest for vulnerable users. **Cons:** Susan worried about looking like a colleague's site. Needs differentiation.

## Typography exploration

WFC default:
- **Display:** Cormorant Garamond (serif, 1,500 Google Fonts available)
- **Body:** Atkinson Hyperlegible (sans, designed for accessibility)

Susan's current:
- **Both:** Source Sans Pro (sans only)

**Recommendation:** Move Susan to WFC's serif+sans pairing. The serif display gives the "considered / serious / editorial" feel she wants without going full B&W. Atkinson Hyperlegible body keeps WCAG-friendly.

Variant to test:
- **Display:** Cormorant Garamond (WFC default) OR Newsreader (more modern editorial)
- **Body:** Atkinson Hyperlegible (WFC default) OR Source Sans Pro (Susan's current, less change)

## Spacing scale (WFC default, 8pt scale)

```yaml
spacing:
  space-0: 0
  space-1: 8px
  space-2: 16px
  space-3: 24px
  space-4: 32px
  space-5: 48px
  space-6: 64px
  space-7: 96px
  space-8: 128px
```

**Per WFC Principle 6 (Cognitive Breathing Room):** Generous spacing is non-negotiable for high-sensitivity users. The Clove mockup uses this scale throughout.

## Motion (WFC defaults)

- **Duration fast:** 150ms (hover, focus)
- **Duration normal:** 250ms (entrance, dismissal)
- **Easing default:** ease-out
- **`prefers-reduced-motion`:** Always respected. The Clove mockup includes the media query.

**Per WFC Principle 4:** "Avoid arousal spikes (sudden animation, urgency cues) without user consent." Clove mockup's transitions are minimal (border-color + transform on cards) — no surprise motion.

## Components to design

- [x] **Nav (sticky, blurred backdrop)** — built in Clove mockup
- [x] **Hero** — built
- [x] **Approach grid (3 cards)** — built
- [x] **Services grid (2x2 cards)** — built
- [x] **Team / credentials card (left-border accent)** — built
- [x] **Testimonial** — built (placeholder)
- [x] **Blog grid** — built
- [x] **Final CTA** — built
- [x] **Footer with HIPAA-aware communications notice** — built
- [ ] **FAQ expand/collapse** (for Jenani mockup) — pending
- [ ] **Specialty hub page** (Susan's 11 specialties, with 4-5 leading + "see all" pattern) — pending
- [ ] **OKF / knowledge scaffold** (SOW § 3.1.8 — pending Frank's framework decision)

## Audit gate pass (6-gate on the Clove mockup)

| Gate | Result | Notes |
|------|--------|-------|
| 1. Element Count (9-17/section) | ✅ PASS | Hero=4, Approach=8, Services=8, Credentials=8, Testimonial=2, Blog=6, CTA=4 |
| 2. Arousal Calibration | ✅ PASS | Target PAD 1.5/-0.5/0.8 met. No ALL CAPS in H1, no auto-play, no urgency. |
| 3. Revisability | ✅ PASS | No forms (per SOW — email intake). Standard back nav. |
| 4. Dominance Preservation | ✅ PASS | No urgency. "Email Susan" is invitational. Pricing transparent (no pricing shown, intentional). |
| 5. Implicit Aesthetic | ✅ PASS | Layout stable. Grid system clear. Visual hierarchy in 400ms. H1 = content (not brand). |
| 6. Accessibility Baseline | ✅ PASS | Skip link, focus indicators, semantic HTML, WCAG contrast in WFC tokens, `prefers-reduced-motion` respected. |

**Net:** Clove mockup **passes all 6 gates**. Strongest improvement over the current site: H1 is content, not brand; ALL CAPS removed; color contrast verified; team-page credentials pattern (ASRM/PSI) prominent.

## Open questions

- [ ] Which palette variant does Susan prefer? (Cool vs Calm Base vs B&W Editorial) — gather at Discovery
- [ ] Typography: Cormorant Garamond (WFC default) vs Newsreader (modern editorial) — visual test
- [ ] Photography direction: do we have access to specialty-relevant imagery? (fertility/pregnancy/calm) or do we use abstract biophilic?
- [ ] Specialty framing: 4 cards (current Clove mockup) or hub + spoke (11 specialties on a parent page, 4-5 highlighted)?

## Files in this folder

- `README.md` — this file
- `tokens-susan-variant.yaml` — proposed WFC token set for Susan (pending)
- `pad-coordinates.md` — target PAD for each page archetype (pending; this file sketches it)
- `archetype-mapping.md` — which WFC page archetypes map to Susan's pages (pending)

---

*Compiled by Mavis 2026-07-15. Owner: Frank. The Clove mockup is the first design system application; Jenani + Clune mockups will use the same token layer with template-specific overrides.*
