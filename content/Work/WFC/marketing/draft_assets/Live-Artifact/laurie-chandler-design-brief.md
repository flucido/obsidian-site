---
title: Laurie Chandler — Design Brief
created: 2026-06-15
type: design-brief
tags: [wfc, design, lead, laurie-chandler, depth-psychology, jungian]
org: WFC
lead: "[[leads/wfc-laurie-chandler/dossier]]"
status: pre-call-concept
---

# Design Brief — Laurie Chandler, LMFT

**Project:** Chandler Depth Psychotherapy — practice website redesign  
**Client:** Laurie Chandler, MA, LMFT — depth/Jungian psychotherapist, Marin County  
**Brief author:** WFC Design Studio (pre-discovery concept work)  
**Status:** Concept exploration only — not yet client-reviewed. Call Weds 6/18.

---

## 1. Brand Extraction

What we know about Laurie before the discovery call:

| Dimension | Source | Implication |
|-----------|--------|-------------|
| **Approach** | Jungian, depth-psychological, mythological, AEDP | Visual language should evoke symbol, archetype, dream — not clinic |
| **Education** | Princeton BA → Pacifica MA Mythological Studies → Pacifica MA Counseling Psych | Intellectual depth is part of the brand. Not anti-intellectual. |
| **Voice** | "Tend soul," "inner landscape," "sacred space," "metabolize emotions" | Poetic, grounded, unafraid of weight. Not chirpy. |
| **Clients** | Adults + elders, life transitions, grief, existential issues | Audience is in midlife or later, seeking meaning, not quick fixes |
| **Location** | Larkspur, Marin County | Affluent, nature-adjacent, progressive. Redwoods, not beaches. |
| **Current site** | WordPress.com default theme, broken footer | She's been embarrassed by her web presence. Ready for change. |
| **Rate** | $220/session | Premium positioning. Website must match. |
| **Curation** | Resources page: Mary Oliver, Wendell Berry, crisis hotlines | Poetry as praxis. Literature as companion to therapy. |

### Brand Personality (proposed — validate on call)

- **Archetypal, not academic** — Symbolic depth without jargon
- **Grounded, not ethereal** — Earth and body, not just clouds and spirit
- **Warm, not clinical** — A consultation room with books and windows, not a lab
- **Quiet, not hushed** — Stillness that invites, not silence that intimidates

---

## 2. Design System Direction

### 2.1 Concept: "The Inner Landscape"

The core metaphor: therapy as exploration of interior terrain. The website should feel like stepping into a quiet, warm room — a consultation space where depth work happens. Books on shelves. Natural light. A window to trees. The feeling of being taken seriously.

### 2.2 Color Palette — "Earth & Indigo"

Distinct from the WFC house palette (warm terracotta + sage). This palette draws from Jungian imagery — earth tones, twilight, ink, shadow-work made warm.

| Token | Hex | Role |
|-------|-----|------|
| **Canvas** | `#f7f3ee` | Page background — warm parchment, not sterile white |
| **Surface** | `#ffffff` | Card/container surfaces — clean but soft |
| **Earth** | `#5c4a3a` | Primary text — dark umber, not black |
| **Stone** | `#8c7b6e` | Secondary text — muted warmth |
| **Indigo** | `#3a405a` | Deep contemplative accent — headings, pull quotes |
| **Amber** | `#c49a4a` | Warm accent — links, subtle highlights, hover states |
| **Sage** | `#8a9a7b` | Calm green accent — CTA buttons, trust signals |
| **Shadow** | `#2d2a35` | Deepest tone — very sparing, footer or dark mode base |
| **Border** | `#e0d9cf` | Subtle warm borders |

**Rationale:** Cool enough to feel contemplative (indigo, shadow), warm enough to feel human (amber, earth, parchment). No bright whites. No clinical blues. No "spa green."

### 2.3 Typography

| Role | Font | Character |
|------|------|-----------|
| **Display (hero, h1-h2)** | Cormorant Garamond (serif) | Literary, warm, substantial. Matches her quote-heavy sensibility. |
| **Body** | Atkinson Hyperlegible (sans) | Accessible, calm, legible under cognitive load. Same body font as WFC. |
| **Accent (pull quotes, poetry)** | Italic serif | For the Mary Oliver moments. |

**Scale:** Fluid via `clamp()`. Generous line-height (1.65) per WFC standard — activated readers need breathing room.

### 2.4 Imagery Direction

- **No stock photography of therapists with clipboards.** No serene women on beaches.
- **Abstract + natural:** Close-crop textures — tree bark, stone, water surface, handwritten ink, book spines, shadow patterns on walls.
- **Art direction:** If photography is used, it should be environmental — redwood light, fog over hills, the quality of Marin morning light.
- **Symbol over illustration:** A single archetypal image (horse, tree, vessel, threshold) is more powerful than decorative illustration.
- **Her existing horse image:** The cropped horse painting on her current site — ask if this has personal meaning. If so, it could anchor the visual identity.

### 2.5 Motion

- **Stillness-first.** No scroll-triggered reveals. No hovering parallax. No auto-playing anything.
- Transitions should be subtle fades — 300-400ms, gentle easing.
- The site should feel like turning a page, not navigating a UI.
- Respect `prefers-reduced-motion` everywhere.

### 2.6 Spacing

- Generous whitespace. This is a premium, contemplative experience.
- Section spacing: 6-8rem vertical. Breathing room between ideas.
- One idea per screen. Scroll depth is welcomed — this audience reads, they don't skim.

---

## 3. Page Architecture

### Home (Single scroll with anchors)

| Order | Section | Purpose |
|-------|---------|---------|
| 1 | **Hero** | Name + approach in one sentence. No tagline fluff. |
| 2 | **"Do you feel alive?"** | Her current opening question — keep it. It's good. |
| 3 | **Approach** | Depth/Jungian/AEDP — explained in plain language, not jargon |
| 4 | **Who This Is For** | Life transitions, grief, existential questions — concrete, not abstract |
| 5 | **How I Work** | Modalities, session format, in-person + telehealth |
| 6 | **About Laurie** | Education, Pacifica, Princeton, 16 years. Credibility without bragging. |
| 7 | **Practical Details** | Location (Larkspur), hours (Tue-Fri 9-3), fee ($220), insurance |
| 8 | **Contact / Consult** | Free 20-minute phone consult. Simple booking flow. |
| 9 | **Footer** | License #, address, email, phone, Psychology Today link, crisis resources |

### Secondary Pages
- **About** — fuller bio, education detail, approach philosophy
- **Specialties** — Life transitions, grief, existential, women's issues, pet loss
- **Resources** — Crisis hotlines (keep), poetry (keep), maybe a blog for depth psychology writing
- **FAQ** — Insurance, sliding scale, what to expect in first session

### What NOT to include
- No "Services" pricing table — this isn't a menu
- No testimonials (ethical gray area for therapists in CA)
- No "I provide a safe space" — she already says this more poetically
- No stock photo hero

---

## 4. Concept Directions (3 variants for Open Design)

### Variant A: "The Study" — Warm + Bookish

**Mood:** A scholar's consultation room. Wood, paper, lamplight, quiet.  
**Colors:** Canvas (#f7f3ee) dominant, Earth (#5c4a3a) text, Indigo (#3a405a) accents, Amber (#c49a4a) warmth.  
**Type:** Cormorant heavy on display. Body generous and calm.  
**Imagery:** Book spines, handwritten marginalia, close-crop textures.  
**Vibe:** Pacifica Graduate Institute meets Marin craftsman. Intellectual but not cold.  
**Risk:** Could read as academic or stuffy. Avoid: leather-bound everything, faux-antique.

### Variant B: "The Clearing" — Light + Natural

**Mood:** Morning light through redwoods. Stillness, clarity, the natural world as container.  
**Colors:** Canvas (#f7f3ee) base, white surfaces, Sage (#8a9a7b) as primary accent, Stone (#8c7b6e) text.  
**Type:** Lighter Cormorant weights. More air. Body generous.  
**Imagery:** Redwood light, fog, stone, water — Marin landscape as emotional register.  
**Vibe:** California depth psychology. Nature as mirror for psyche.  
**Risk:** Could drift toward generic "wellness." Avoid: yoga-studio aesthetic, stock nature photos.

### Variant C: "The Threshold" — Dark + Symbolic

**Mood:** Twilight, dream, the liminal space between conscious and unconscious.  
**Colors:** Shadow (#2d2a35) as primary surface (dark mode-first), warm cream text, Indigo (#3a405a) as mid-tone, Amber (#c49a4a) and Gold as accent light.  
**Type:** Cormorant in higher contrast. Body slightly looser tracking.  
**Imagery:** Abstract — shadow patterns, candlelight, threshold imagery (doors, windows, horizons), archetypal forms.  
**Vibe:** Jungian depth made visual. Dreams and symbols as interface.  
**Risk:** Could read as gothic or heavy. Avoid: black backgrounds, red accents, anything that feels like a horror aesthetic. This is twilight, not midnight.

---

## 5. Anti-Patterns — What This Site Must NOT Be

| ❌ Don't | ✅ Do Instead |
|----------|--------------|
| Calming blue + nature photos | Earth tones with literary texture |
| "I provide a safe, non-judgmental space" | Her actual voice: "Tend to your deepest self" |
| Stock photo of therapist smiling at camera | Abstract imagery, symbol, Marin landscape |
| Bullet-point list of modalities | Narrative description of how she works |
| "Book Now" button in generic green | Warm, calm CTA: "Schedule a consultation" |
| Five pages of SEO-stuffed service descriptions | One focused page per real need |
| Gradient backgrounds | Solid, warm, stable surfaces |
| Animated counters or stats | Stillness. Trust through substance. |

---

## 6. Open Questions (for Wednesday call)

These will refine the brief. Don't commit to a direction until answered.

1. **"Is there an image, symbol, or piece of art that feels like your practice?"** — This is the single most valuable design question. Her answer anchors the entire visual identity.
2. **"Who is your ideal client? Describe one person."** — Design for one real person, not a demographic.
3. **"What do you want someone to feel when they land on your site?"** — Emotional target, not feature list.
4. **"The horse image on your current site — does it have meaning for you?"** — If yes, it's a design anchor. If no, it's noise.
5. **"Are you comfortable with a darker, more contemplative site, or do you want it to feel light and open?"** — Variant A/B vs C. This is a taste question, not a design question.

---

## 7. Technical Notes

- **Platform:** Next.js (App Router) — consistent with WFC stack
- **CMS:** Content collections (markdown/MDX) for blog + resources
- **Hosting:** Vercel
- **Booking:** Cal.com embed (already in use at WFC)
- **SEO/GEO:** Local schema, Google Business Profile, Marin County + Larkspur + "Jungian therapist" keywords
- **Accessibility:** WCAG AA minimum. Atkinson Hyperlegible is already accessibility-forward.

---

## 8. Next Steps

1. [ ] **Review with Frank** — any direction preferences before Wednesday?
2. [ ] **Wednesday 6/18 call** — ask the open questions. Listen for emotional language.
3. [ ] **Post-call:** Refine brief into a concrete design spec based on Laurie's answers.
4. [ ] **Open Design:** Produce 3 HTML concept variants for client review.
