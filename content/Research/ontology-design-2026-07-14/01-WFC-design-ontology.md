---
title: WFC Design Ontology — Sketch
created: 2026-07-14
updated: 2026-07-14 16:01
type: ontology-sketch
tags: [research, ontology, wfc, design-theory, fleshing-out]
status: SKETCH — fleshed out 7/14 16:01 PT. Not a formal specification. Decision: flesh out more / formalize / defer.
---

# WFC Design Ontology — Sketch

> **The idea:** Formalize the implicit model behind WFC's design language —
> Lauren's aesthetic triad (Sensory / Emotional / Meaning), the design
> tokens, the page archetypes, the service tiers, the OKF (Open
> Knowledge Format) content scaffold. Make it travel. Make it compound.
> Make it auditable.

## 0. Purpose

The WFC Design Ontology is the formal specification of:
- The design *vocabulary* (what design elements exist)
- The design *grammar* (how they relate)
- The design *logic* (why they work — the underlying psychological/clinical principles)
- The design *operations* (how to create, validate, and evolve a WFC design)

It serves as:
- **A documentation artifact** for the WFC design system
- **A schema source** for the WFC codebase (wellfullcollective.com)
- **A validation tool** for new design proposals
- **A teaching artifact** for onboarding Lauren, clients, or future hires
- **A grounding layer** for the WFC content engine (LLM prompt context)

## 1. Scope

**In scope:**
- The design *elements* that compose a WFC website
- The *aesthetic layers* (Sensory / Emotional / Meaning)
- The *service tiers* (Landing Page / CMS Site / Web Application)
- The *content scaffolds* (page archetypes, OKF blocks)
- The *brand attributes* (tagline, voice, audience)
- The *psychological / clinical principles* that connect design to outcomes

**Out of scope (v1):**
- The full Squarespace / Next.js implementation details
- The SEO / GEO tooling (separate ontology)
- The marketing / lead-gen pipeline (separate ontology)
- The client engagement workflow (separate ontology)

## 2. Top-level classes

These are the main entities. Each is a "thing that exists in the WFC design universe."

### 2.1 DesignElement
The atomic unit of design. Anything you can point to and say "this is part of the WFC design."

**Subclasses:**
- `Color` (e.g., peachy cream, espresso, sage green, warm blush)
- `Typography` (Cormorant Garamond, Atkinson Hyperlegible)
- `Spacing` (the spacing scale, e.g., 4/8/12/16/24/32/48/64 px)
- `Motion` (transition timings, easings)
- `Layout` (grid systems, breakpoints)
- `Component` (a reusable unit — button, card, hero, form, navigation)
- `Pattern` (a reusable composition of components — page archetype)
- `Copy` (text content)
- `Image` (visual content)

**Properties (DesignElement):**
- `id` (slug, unique)
- `name` (human-readable)
- `aesthetic_layer` ∈ {Sensory, Emotional, Meaning}
- `psychological_principle` (the "why it works" — e.g., processing fluency, PAD arousal)
- `evidence_ref` (link to evidence-ledger entry, if exists)
- `tier_availability` (which service tiers include it)
- `client_ownable` (Y/N — can the client edit without WFC involvement)

### 2.2 AestheticLayer
The three layers of Lauren's aesthetic triad.

**Instances (Sensory / Emotional / Meaning):**
- `Sensory` — what the user perceives (color, typography, motion, layout)
- `Emotional` — what the user feels (warmth, calm, trust, safety)
- `Meaning` — what the user understands (the brand's purpose, the value prop)

**Properties (AestheticLayer):**
- `id` ∈ {Sensory, Emotional, Meaning}
- `description` (what this layer is responsible for)
- `psychological_principles` (list — e.g., Sensory → processing fluency, contrast sensitivity)
- `measurement_signal` (how we know it's working — design review, A/B test, client feedback)

### 2.3 ServiceTier
The WFC engagement offering.

**Instances:**
- `LandingPage` ($1,500, single-page marketing site)
- `CMS_Site` ($3,500 + $100-250/mo, content-managed multi-page site)
- `WebApplication` (custom quote, app-like functionality)

**Properties (ServiceTier):**
- `id` ∈ {LandingPage, CMS_Site, WebApplication}
- `price_usd` (the published price)
- `recurring_monthly` (Y/N)
- `bundled_elements` (list of DesignElement IDs)
- `client_ownable_elements` (subset of bundled_elements that the client can edit)
- `build_time_weeks` (typical engagement duration)

### 2.4 PageArchetype
A reusable page structure (the WFC has 5+ archetypes).

**Instances (from `Work/WFC/studio/page-archetype-*.yaml`):**
- `Landing` — single scrollable page (Hero → Services → Team → Pricing → Consultation Form → Final CTA)
- `Conversion` — focused on a single action (book, buy, sign up)
- `Intake` — for new client onboarding
- `Follow-up` — for post-consultation nurture
- `Content` — for blog posts, resources, articles

**Properties (PageArchetype):**
- `id` (slug)
- `name`
- `sections` (ordered list of section references)
- `tier_availability` (which service tiers include this archetype)
- `goal` (the page's purpose — "convert visitor to lead", "establish credibility")
- `kpis` (what success looks like — conversion rate, time on page, etc.)

### 2.5 Section
A unit within a PageArchetype. E.g., "Hero", "Services grid", "Team", "Pricing table", "Consultation form", "Final CTA."

**Properties (Section):**
- `id` (slug)
- `name`
- `archetype_refs` (which archetypes include it)
- `components` (list of Component references)
- `copy_block_ref` (the canonical copy for this section)
- `goal` (the section's purpose)

### 2.6 Component
A reusable UI element. E.g., button, card, hero, form, navigation, footer.

**Properties (Component):**
- `id` (slug)
- `name`
- `variants` (size, color, state — primary/secondary/tertiary)
- `props` (the design tokens it consumes)
- `tier_availability` (which service tiers include it)
- `accessibility_notes` (keyboard nav, screen reader, color contrast)

### 2.7 ContentBlock
A canonical content unit. The OKF (Open Knowledge Format) scaffold defines these.

**Subclasses:**
- `Heading`
- `Paragraph`
- `List`
- `Image`
- `Quote`
- `CallToAction`
- `FAQ`
- `TeamBio`
- `ServiceCard`
- `Testimonial`

**Properties (ContentBlock):**
- `id` (slug)
- `type` (one of the subclasses)
- `template` (the canonical structure)
- `audience_signal` (which client persona this is for)
- `voice_guidelines` (the WFC voice principles)
- `client_ownable` (Y/N)

### 2.8 BrandAttribute
The brand's positioning — what makes WFC WFC.

**Instances:**
- `Tagline` ("Design that works for the most vulnerable works for everyone")
- `Voice` (the WFC voice principles)
- `Mission` (the WFC mission)
- `Audience` (therapists serving vulnerable populations)
- `Tone` (warm, professional, evidence-based, accessible)

**Properties (BrandAttribute):**
- `id` (slug)
- `name`
- `description`
- `evidence_ref` (link to evidence-ledger entry, if exists)
- `used_by` (which DesignElements / Components / ContentBlocks reference this)

### 2.9 PsychologicalPrinciple
The "why" layer. The science that connects a design element to a user outcome.

**Instances (seed list — to be expanded):**
- `ProcessingFluency` (Sensory layer — easy-to-process designs feel better)
- `PAD_Arousal` (Emotional layer — Pleasure-Arousal-Dominance model)
- `CognitiveLoad` (Sensory layer — minimize extraneous load)
- `UniversalDesign` (Meaning layer — design for the edges benefits the center)
- `VulnerabilitySafety` (Meaning layer — therapist-client trust requires psychological safety)
- `AccessibilityWCAG` (Sensory layer — WCAG conformance is the floor)

**Properties (PsychologicalPrinciple):**
- `id` (slug)
- `name`
- `description`
- `citations` (academic references — PAD, Redies, etc.)
- `maps_to_layers` (which AestheticLayers use this principle)

## 3. Key relationships

```
BrandAttribute ──informs──> DesignElement
AestheticLayer ──categorizes──> DesignElement
PsychologicalPrinciple ──explains──> DesignElement
PsychologicalPrinciple ──applies_to──> AestheticLayer
ServiceTier ──bundles──> DesignElement
ServiceTier ──includes──> PageArchetype
PageArchetype ──composed_of──> Section
Section ──composed_of──> Component
Section ──uses──> ContentBlock
Component ──consumes──> DesignElement (color, type, spacing tokens)
```

## 4. Vocabularies (controlled lists)

- **AestheticLayer:** {Sensory, Emotional, Meaning}
- **ServiceTier:** {LandingPage, CMS_Site, WebApplication}
- **PageArchetype:** {Landing, Conversion, Intake, Follow-up, Content}
- **AestheticLayer-Map:** {Sensory → ProcessingFluency + CognitiveLoad + AccessibilityWCAG, Emotional → PAD_Arousal, Meaning → UniversalDesign + VulnerabilitySafety}
- **VoicePrinciples:** {warm, professional, evidence-based, accessible, never-clinical-cold}
- **Tier-Price-Map:** {LandingPage: 1500, CMS_Site: 3500+100-250/mo, WebApplication: custom}

## 5. Mappings to existing artifacts

| Ontology class | Today's artifact | Gap |
|----------------|-------------------|-----|
| `DesignElement:Color` | `Work/WFC/studio/tokens-colors.yaml` | Mostly covered. Need canonical names. |
| `DesignElement:Typography` | Not explicit; appears in component files | Need a `tokens-typography.yaml` |
| `DesignElement:Spacing` | Implicit (Tailwind defaults) | Need explicit scale |
| `DesignElement:Motion` | `Work/WFC/studio/tokens-motion.yaml` | Mostly covered |
| `ServiceTier` | `Work/Shared/pricing-catalog.md` | Need bundled_elements property |
| `PageArchetype` | `Work/WFC/studio/page-archetype-*.yaml` | Mostly covered. Need goal + kpis. |
| `Component` | `wellfullcollective/src/components/` (code) | Need a manifest of components |
| `ContentBlock` | `Work/WFC/operations/okf-content-scaffold.md` (Susan's) | Need canonical templates |
| `BrandAttribute` | Scattered (tagline, voice, etc.) | Need a single source-of-truth file |
| `PsychologicalPrinciple` | `Work/WFC/studio/evidence-ledger.md` | Need a structured catalog |

## 6. Open design questions (WFC-specific)

1. **OKF — what is it, exactly?** The SOW mentioned "OKF (Open Knowledge Format)" as a Susan-maintainable content scaffold. Is this a real standard, or a WFC-internal name? If real, what version? If WFC-internal, where's the spec?
2. **Are PageArchetypes the right level of abstraction, or do we need a `Template` class between PageArchetype and Section?**
3. **Is `Component` the same as "design system component," or do we need to distinguish "code component" from "design component"?**
4. **What's the relationship between `Section.goal` and `PageArchetype.goal`?** Is a section's goal a refinement of the page's goal, or independent?
5. **How do we model the `EvidenceLedger` entries?** Are they references from PsychologicalPrinciple, or a separate class?
6. **How does Lauren's clinical lens (EMDR, organizational psychology) enter the ontology?** As a new class (`ClinicalPrinciple`)? Or as a sub-class of `PsychologicalPrinciple`?
7. **What's the canonical source-of-truth file format?** Markdown tables? YAML? JSON Schema? OWL?

## 7. What a v1 implementation could look like

**Minimal viable ontology (1-2 weeks of Frank's time):**
- One Markdown file per top-level class (9 files)
- One Markdown file with the relationship diagram
- One YAML file with the controlled vocabularies
- A cross-reference document mapping each class to existing artifacts
- A "fill-in-the-gaps" doc listing what's missing

**No tooling required.** Pure documentation. Readable by Lauren, Susan, future hires.

**Stretch goal (optional):**
- JSON Schema for the data model (machine-readable)
- A validator script (does the WFC codebase conform?)
- A "design linter" (does a new page proposal use only approved elements?)

## 8. Risk: scope creep

This could become a multi-month project if formalized too far. The minimum valuable artifact is the documentation. Everything else (tooling, validation, linter) is optional and can come later.

*Last updated: 2026-07-14 16:01 PT*
