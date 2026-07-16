---
title: Ontology Design — Project README
created: 2026-07-14
updated: 2026-07-14 16:01
type: project
tags: [research, ontology, design-theory, k12-data, fleshing-out]
status: IDEATION — fleshed out 7/14 16:01 PT per Frank verbal. Not a build, not a PRD. Concept exploration only.
---

# Ontology Design — WFC + K-12 Research

> **The idea (Frank's words, 7/14 16:01 PT):** "designing an ontology for the
> Wellfull Collective design theory and also one for the local data stack.
> K through 12 research should have their own kind of ontological
> architecture that the data models fit into."

> **Goal of this project:** Flesh out the idea. Capture the high-level
> structure of each ontology. Surface the design decisions. Don't build
> anything yet. Frank decides if/when to formalize.

## Why this matters

Both WFC and the local-data-stack have implicit ontologies — the
shared mental model of "what entities exist, what properties they
have, how they relate." WFC's is buried in Lauren's aesthetic triad,
the design tokens, the page archetypes, and Frank's SEO/GEO expertise.
The K-12 research project's is buried in the LFED pipeline, the
California School Dashboard spec, and the two-paper plan.

**Making the ontology explicit does three things:**

1. **It travels.** New people (Lauren, Susan, a new client, a co-author, a
   future hire) can read the ontology and understand the domain. Today
   the model lives in Frank's head + scattered YAMLs.

2. **It compounds.** Once you have a formal ontology, you can build tools
   that *use* it — design system validators, content scaffolds, NL→SQL
   schema grounding, dashboard generators. Without the ontology, each
   tool reinvents the model from scratch.

3. **It exposes gaps.** The act of formalizing surfaces inconsistencies.
   "Is a 'reporting category' an attribute of a student or a property
   of a metric?" — questions like this only emerge when you try to
   write it down.

## Two ontologies, similar shape, different domains

| Ontology | Domain | Substrate (today) | Owner |
|----------|--------|-------------------|-------|
| **WFC Design Ontology** | Therapist website design, design system, brand | `Work/WFC/studio/*.yaml`, Lauren's aesthetic triad, OKF (Open Knowledge Format) | Frank + Lauren |
| **K-12 Research Ontology** | California K-12 education data, accountability metrics, NL→SQL | `local-data-stack/models/`, LFED training data, CEDS / CALPADS / Ed-Fi standards | Frank (research) |

Both ontologies should:
- Define top-level **classes** (the entities)
- Define **properties** (the attributes) with types + cardinalities
- Define **relationships** between classes
- Define **vocabularies** (controlled lists / enumerated values)
- **Map to existing artifacts** in the codebase
- Be **narratable** to a non-technical reader (Markdown + diagram)

## Sub-articles in this folder

- `01-WFC-design-ontology.md` — the WFC design theory ontology sketch
- `02-K12-research-ontology.md` — the K-12 data ontology sketch
- `03-shared-structure.md` — cross-cutting design principles for both
- `04-questions-for-frank.md` — open design questions
- `05-implementation-log.md` — append-only log

## What this is NOT

- **Not a build.** No OWL files, no RDF triples, no TypeScript types yet.
- **Not a PRD.** A PRD is "build this." This is "here's the shape of the idea, do you want to build it?"
- **Not a replacement for existing artifacts.** The current YAMLs, the LFED model, the design tokens are all good. The ontology *describes* them, doesn't replace them.

## What this could become (if Frank wants to formalize)

- **A documentation artifact.** Read by humans to understand the domain.
- **A schema source.** Generates TypeScript types, Pydantic models, Zod schemas, JSON Schema.
- **A validation tool.** Checks that a WFC design system, or a K-12 dataset, conforms to the ontology.
- **A NL grounding layer.** For the WFC content engine (LLM prompt context) or the K-12 NL→SQL system (the LFED's schema encoding).
- **A teaching artifact.** For onboarding Lauren to a new WFC client, or a co-author to the EDM/LA research project.

## Open questions (full list in `04-questions-for-frank.md`)

1. **Where does the ontology live?** Markdown files in `Research/`? A separate repo? A tool like Protégé / WebProtégé?
2. **What format?** OWL / RDF (formal), JSON Schema / TypeScript (engineering), plain Markdown (narrative), or all three layered?
3. **Who is the audience?** Frank-only, Frank + Lauren, Frank + research collaborators, or public?
4. **Build now / flesh out more / defer?** The agent observability project and the K-12 outreach are competing for Frank's time.

## Read order

1. This README (2 min)
2. `01-WFC-design-ontology.md` (10 min) — the WFC side
3. `02-K12-research-ontology.md` (10 min) — the K-12 side
4. `03-shared-structure.md` (5 min) — the common patterns
5. `04-questions-for-frank.md` (5 min) — the design decisions

Total: ~30 min for the full read. Or just skim the WFC or K-12 sketch if that's the one you care about most.

*Last updated: 2026-07-14 16:01 PT*
