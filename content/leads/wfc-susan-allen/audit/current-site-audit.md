---
title: Susan Allen — Current Site Audit (susanallentherapy.com)
created: 2026-07-13
type: audit
status: complete
client: Susan Allen, LMFT
audit_date: 2026-07-13
auditor: Mavis (WFC 6-gate framework)
target_kickoff: 2026-07-14
tags: [wfc, susan-allen, audit, current-site, neuroaesthetic, 6-gate]
framework: "[[Work/WFC/studio/heuristics]]"
related:
  - "[[leads/wfc-susan-allen/audit/README]]"
  - "[[leads/wfc-susan-allen/dossier]]"
  - "[[leads/wfc-susan-allen/audit/screenshots/current]]"
---

# Susan Allen — Current Site Audit (susanallentherapy.com)

> Audit conducted 2026-07-13 against the WFC 6-gate Critique Heuristics framework. For pre-kick-off reference (Tue 7/14 10:00 AM Zoom with Susan — Milestone 1 of the 8-hr Phase 1 plan).

## Summary

| Gate | Result | Severity |
|------|--------|----------|
| **1. Element Count** | ⚠️ FAIL (about page) | HIGH |
| **2. Arousal Calibration** | ⚠️ MIXED (H1 ALL CAPS, hierarchy chaos) | MEDIUM |
| **3. Revisability** | ✅ N/A (no forms) | — |
| **4. Dominance Preservation** | ✅ PASS | — |
| **5. Implicit Aesthetic** | ❌ FAIL (H1 = brand, not content) | HIGH |
| **6. Accessibility** | 🟡 LIKELY PASS (needs deeper WCAG pass) | LOW |

**Overall: 2 HIGH fails, 1 MEDIUM flag. Site is functional but does not pass the WFC audit. Phase 1 is justified.**

## Quick reference — what I observed

- **Platform:** Squarespace (footer credits "POWERED BY SQUARESPACE")
- **Pages actually present:** HOME, ABOUT, FOCUS, THERAPY, CONTACT, RESOURCES (= /blog, 3 posts)
- **Pages referenced in dossier but NOT present:** `/services` — **silently redirects to home** (not a 404 as the dossier said; arguably worse because users don't know they didn't get the page)
- **ASRM/PSI credentials** are real and accurate but buried in body text on About
- **Photography:** Single professional headshot (about page)
- **Color palette:** Predominantly white/cream with dark text. Neutral. Not particularly warm or specialty-tuned.
- **Typography:** Display sans-serif for H1/H2 (caps), body sans-serif. Hierarchy is inconsistent.
- **No CTA buttons visible** — "Schedule a Consultation" is an H2, with the actual CTA as plain links ("Consultation", "contact me")
- **No FAQ, no resources page, no booking** (consistent with SOW out-of-scope items)

---

## Gate 1 — Element Count Check (9–17 per visible screen state)

**Evidence:** T2-004, Principle 1 (Sensory Safety)
**Threshold:** 9–17 elements per visible screen state. Beyond 17, cognitive load exceeds WFC's target.

### Home page (counted from snapshot)
- 1 H1 ("SUSAN ALLEN LMFT | PSYCHOTHERAPY")
- 6 nav items
- 2 H3 ("Therapy for Infertility...", "Therapy for Postpartum...")
- 1 H2 ("Schedule a Consultation")
- 1 CTA link ("Consultation")
- 1 secondary link ("contact me")
- 1 H3 ("Recent Articles")
- 3 article links
- 1 footer + 1 footer link
- **Total: ~17 elements — at the upper limit, BORDERLINE PASS**

### About page
- 1 H1, 6 nav, 1 image, 1 H3 ("My Practice")
- ~8 body paragraphs
- 4 H3 sections (Education, Affiliations, Media, Training)
- 2 outbound links (Huffington Post articles)
- Psychology Today badge
- Footer
- **Total: 25+ elements — FAIL. Progressive disclosure needed.**

### Focus page
- 1 H1, 6 nav
- 1 image (IRH logo)
- 1 H3 + 8+ bulleted items per specialty section
- Multiple specialty sections (Infertility, Pregnancy/Postpartum, Donor Conception, Parenting, Mid-Life, Loss/Grief)
- **Total: 30+ elements — FAIL. Information density far exceeds the 9–17 threshold.**

### Therapy / Contact / Resources
- Not counted in detail; Resources page is the blog (3 posts).
- Contact page snapshot to be added.

**Resolution per heuristics.md:** Reduce visible elements through progressive disclosure. Focus page is the worst offender — needs to break into multiple pages (one per specialty, or a "specialties hub" with progressive disclosure).

---

## Gate 2 — Arousal Calibration

**Evidence:** T1-002 (LPP), T1-004 (PAD coordinates), Principle 4 (Emotional Calibration)
**Target PAD for therapist home page:** Pleasure 1.8, Arousal -0.3, Dominance 1.0 (per [[Work/WFC/studio/page-archetype-landing]])

### Findings

| Check | Result | Note |
|-------|--------|------|
| Target PAD defined for archetype? | ❌ NOT DOCUMENTED | No PAD mapping in the site itself |
| Color palette matches low-arousal target? | 🟡 PARTIAL | Neutral palette; not warm; not anxiety-triggering |
| No surprise motion or auto-playing media? | ✅ PASS | None observed |
| Typography does not create visual urgency? | ❌ FAIL | **H1 is ALL CAPS ("SUSAN ALLEN LMFT \| PSYCHOTHERAPY")** — uppercase at this size reads as institutional/formal, not calm |
| Images support emotional intent? | 🟡 NEUTRAL | Professional headshot, no clinical/spa imagery |
| Hierarchy chaos | ⚠️ FLAG | About page uses H3 as top heading; H1 reserved for brand. Inconsistent. |

**Key issue:** The ALL-CAPS H1 ("SUSAN ALLEN LMFT | PSYCHOTHERAPY") reads as **institutional, not warm**. For reproductive + perinatal mental health (where users are often anxious, overwhelmed, cognitively depleted), an institutional voice increases arousal at the worst possible moment.

**Resolution:** Move H1 to be the page-specific content, not the brand. Brand goes in the header/nav. Use mixed case. See WFC's [[Work/WFC/studio/tokens-typography]] for serif display recommendations.

---

## Gate 3 — Revisability Audit

**Evidence:** T1-008, Principle 2 (Dominance Through Revisability)

### Findings

| Check | Result | Note |
|-------|--------|------|
| Every form has draft state | N/A | No forms on site (consult intake is email-only per SOW — by design) |
| Every CTA has outcome description | 🟡 PARTIAL | "Schedule a Consultation" describes action; "contact me" does not |
| Every action has undo or return path | ✅ PASS | Standard back button / nav |
| No irreversible actions without confirmation | ✅ PASS | None |
| Multi-step processes show progress | N/A | None |

**Resolution:** For Phase 1, low priority. Revisability is mostly a future concern if Susan adds online intake later. Worth noting the "contact me" link text could be more descriptive ("email Susan to schedule a consultation").

---

## Gate 4 — Dominance Preservation

**Evidence:** T1-003, Principle 2 (Dominance Through Revisability)

### Findings

| Check | Result | Note |
|-------|--------|------|
| No urgency language or timers | ✅ PASS | None observed |
| No dark patterns | ✅ PASS | None observed |
| Exit options equally visible | ✅ PASS | Nav always present |
| User controls pace | ✅ PASS | No auto-advance |
| Pricing transparent | N/A | No pricing on site (intentional for therapy intake) |

**Resolution:** None. This is the cleanest gate on Susan's current site.

---

## Gate 5 — Implicit Aesthetic Scan (P2/LPP proxy)

**Evidence:** T1-001, T1-002, Principle 3 (Implicit Aesthetic First)

### Findings

| Check | Result | Note |
|-------|--------|------|
| Layout stable on first render | ✅ PASS | No shifts observed |
| Grid system provides clear structure | 🟡 PARTIAL | Simple 2-column on home; single column on About |
| Balance and symmetry intentional | 🟡 PARTIAL | Centered layout, but H1+nav eats vertical real estate |
| Visual hierarchy clear within 400ms | ❌ FAIL | H1 is the brand, not the content — users scan past the brand looking for the actual content |
| Cohesion (unified system) | 🟡 PARTIAL | Looks like a single Squarespace template, but customizations feel ad-hoc |
| Order (predictable, scannable) | 🟡 PARTIAL | Nav is consistent; section ordering varies by page |
| Complexity (matches audience capacity) | ❌ FAIL | Focus page overshoots significantly |
| Simplicity (unnecessary noise removed) | 🟡 PARTIAL | Some decorative elements (logo bar, Psychology Today badge) compete with content |

**Key issue: H1 = brand, not content.** This is a significant hierarchy failure. Users who land on a page and see the brand as the largest text element don't know what the page is about. The visual hierarchy should prioritize page content over site identity.

**Resolution:** Move brand to header (already there). Use H1 for the actual page topic. This is one of the highest-impact changes for Phase 1.

---

## Gate 6 — Accessibility Baseline

**Evidence:** WFC token specs, WCAG AA standards

### Findings (initial, not full audit)

| Check | Result | Note |
|-------|--------|------|
| WCAG AA contrast (4.5:1) | 🟡 LIKELY PASS | Dark text on light background — likely meets threshold |
| Focus indicators visible | ❓ UNKNOWN | Needs keyboard nav test |
| All images have descriptive alt text | 🟡 PARTIAL | Snapshot shows some images with alt, some without |
| All forms have labels | N/A | No forms |
| `prefers-reduced-motion` respected | ❓ UNKNOWN | No motion observed; Squarespace defaults generally OK |
| Page navigable by keyboard | ❓ UNKNOWN | Needs test |
| Screen reader announces state changes | N/A | No dynamic states |

**Resolution:** Add a full WCAG pass to Phase 1 Milestone 5 (on-page SEO + QA, ~0.75 hr). Flagged in agenda already.

---

## Top 3 issues to call out at kick-off (in priority order)

1. **The "Services" 404 isn't a 404 — it's a silent redirect to home.** Users who type `/services` (or follow an old link) get dumped to home with no indication. They probably leave. → Phase 1 fix: build the Specialties page.

2. **H1 is the brand on every page, not the content.** Users landing on the About page see "SUSAN ALLEN LMFT | PSYCHOTHERAPY" as the largest text — they don't know they're on the About page until they scroll. → Phase 1 fix: H1 = page content, brand stays in header.

3. **ALL CAPS H1 reads as institutional, not warm.** Susan's specialty (reproductive + perinatal mental health) calls for a calm, nurturing aesthetic. The caps H1 fights that. → Phase 1 fix: Mixed case + WFC Calm Base palette (peachy cream background, sage green accent).

## Secondary issues (not in scope for Phase 1 unless low-cost)

- About page: 25+ elements (Gate 1 fail)
- Focus page: 30+ elements per specialty area (Gate 1 fail)
- Hierarchy inconsistency: H1 brand on most pages, H1 content on Focus; H3 as top heading on About
- Credentials buried in body text: ASRM + PSI should be visually prominent (this is Susan's biggest differentiator per [[leads/wfc-susan-allen/dossier#WFC-Fit-Analysis]])
- Color palette: neutral but not warm — misses an opportunity to communicate specialty depth

## What works (don't break in Phase 1)

- Squarespace platform — staying per SOW
- Clean nav structure (6 items, all functional)
- Professional headshot
- Psychology Today verification badge — keep this
- Clear contact path (even if just email)
- Real credentials (ASRM, PSI, Donor Conceived Community) — surface them more in Phase 1
- Tone of About/Focus copy — clinical but warm in voice. Don't replace; restructure.

---

## Screenshots

All captures in `./screenshots/current/`:
- `01-home-desktop.png`
- `02-about-desktop.png`
- `03-focus-desktop.png`
- `04-therapy-desktop.png`
- `05-contact-desktop.png`
- `06-resources-desktop.png` (the blog at /resources)
- `07-services-404.png` (shows the silent redirect to home)

## Audit outputs feeding into kick-off conversation

- This audit fills Milestone 1 (Audit) in the [[leads/wfc-susan-allen/kick-off-agenda-2026-07-14]] agenda
- Pair with [[leads/wfc-susan-allen/audit/template-shortlist]] to walk Susan through what a Squarespace template refresh could look like
- The top 3 issues above are concrete, evidence-grounded starting points for the conversation
