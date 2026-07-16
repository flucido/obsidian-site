---
title: Open Design Questions — For Frank
created: 2026-07-14
updated: 2026-07-14 16:01
type: questions
tags: [research, ontology, questions, design-decisions]
status: PENDING Frank's answers before any further work.
---

# Open Design Questions — For Frank

> 10 design decisions that will determine what these ontologies actually
> become. Skim, pick the ones you have an opinion on, defer the rest.

## Meta questions

### Q1. Where does each ontology live?
Three options:
- **(a)** Inside the existing project (WFC ontology in `Work/WFC/ontology/`, K-12 ontology in `local-data-stack/ontology/`)
- **(b)** A new shared folder `Research/ontologies/` with subfolders per project
- **(c)** Separate repos (WFC ontology in `wellfullcollective/ontology/`, K-12 ontology in `local-data-stack/ontology/`)

**My recommendation:** (a) for v1 — both ontologies live with the work they support. The WFC ontology exists because of the WFC design system; the K-12 ontology exists because of the LFED pipeline. Co-locating makes the substrate-to-spec relationship clear.

### Q2. What format(s)?
Three options:
- **(a)** Markdown only (narrative + examples, no machine-readable spec)
- **(b)** Markdown + Pydantic (narrative + Python types, machine-checkable)
- **(c)** Markdown + Pydantic + OWL (full formal ontology, queryable with SPARQL)

**My recommendation:** (b) for v1. Markdown gets you 80% of the value (documentation, onboarding, audit). Pydantic gets the next 15% (validation, schema grounding for the LFED). OWL is overkill for both — adds tooling burden, doesn't enable anything the first two don't.

### Q3. Who is the audience?
- **(a)** Frank only (private, in the vault)
- **(b)** Frank + Lauren / Frank + research collaborators (shared, semi-public)
- **(c)** Public (WFC's design language, K-12 accountability framework — could be papers, public docs, OSS)

**My recommendation:** depends on the ontology. WFC is private (Frank + Lauren). K-12 could be public — the K12-Bench paper would publish the ontology as a contribution. Different audiences per ontology is fine.

## WFC-specific questions

### Q4. What is OKF (Open Knowledge Format)?
Susan's SOW § 3.1.8 referenced it. The vault has references to "OKF" in a few places. Is this:
- **(a)** A real standard (W3C / Google / etc.) — point me to the spec
- **(b)** A WFC-internal name for the content scaffold — show me where the spec lives
- **(c)** Aspirational — the scaffold exists in fragments but isn't fully specified yet

**My recommendation:** regardless of which, the ontology should formalize what OKF *is* in the WFC context. That's a v1 deliverable.

### Q5. Should Lauren's clinical lens (EMDR, organizational psychology) be a top-level class?
Right now `PsychologicalPrinciple` is a single class with 6 instances. Should it split?
- **(a)** Keep one `PsychologicalPrinciple` class, add `ClinicalPrinciple` as a sub-class for EMDR / OT-specific principles
- **(b)** Two top-level classes: `PsychologicalPrinciple` and `ClinicalPrinciple` (orthogonal)
- **(c)** One flat class with a `principle_type` property ∈ {psychology, clinical, accessibility, brand}

**My recommendation:** (a) — hierarchical, sub-classes. Cleaner; matches the WFC team's mental model (Lauren thinks in terms of "psychological + clinical layers").

### Q6. What about the "vulnerability → accessibility → universality" logic?
This is the WFC tagline. Is it:
- **(a)** A single `BrandAttribute:Tagline` (current default)
- **(b)** A `DesignPhilosophy` class that subsumes the tagline + the underlying logic
- **(c)** A `BrandNarrative` class with sub-elements (tagline, mission, audience, etc.)

**My recommendation:** (c) — `BrandNarrative` with sub-elements. The tagline is one part; the underlying logic is another; the audience is another. Separating them lets the ontology evolve without churn.

## K-12-specific questions

### Q7. Should the K-12 ontology include the LFED's schema encoding (the "what makes K-12 data hard" knowledge)?
The LFED learns things like "the year format mismatch" and "the 11 reporting categories" — these are domain semantics that the LM should know. Where do they live?
- **(a)** In the K-12 ontology (this project) — `YearFormat` class, `ReportingCategory` vocab
- **(b)** In the LFED training data (the existing approach) — examples that teach the LM
- **(c)** Both — ontology is the formal spec, training data is the practice

**My recommendation:** (c) — both. The ontology is the source of truth (machine-checkable, queryable). The training data is the application (teaches the LM through examples). They should stay in sync.

### Q8. What about non-California K-12 data?
The current scope is California-only. Should the ontology be:
- **(a)** California-only (matches the LFED + the case study + the research paper scope)
- **(b)** US-wide (generalizes to other states' accountability frameworks)
- **(c)** International (generalizes to OECD / UNESCO standards)

**My recommendation:** (a) for v1. Scope creep is the biggest risk. California is a complete enough domain; other states are different enough that they need their own ontologies.

### Q9. How does the suppression rule enter the ontology?
The CDE suppresses accountability metrics for subgroups with < 11 students. Where does this live?
- **(a)** As a `SuppressionRule` class with rule_type, threshold, source_authority properties
- **(b)** As a property of `AccountabilityMetric` (`is_suppressed: bool`, `suppression_reason: str`)
- **(c)** In a separate `PrivacyRules.md` doc, not in the ontology

**My recommendation:** (a) — formal class. The suppression rules are part of the data semantics. The LFED needs to know about them; the K12-Bench should test for them.

## Cross-ontology question

### Q10. Should the shared patterns (the 7 layers, 5 lifecycle phases, 4 audiences, 3 formats) be a third artifact?
There's a meta-ontology question: are the *patterns* themselves worth a third document?
- **(a)** Yes — write a `Research/ontologies/shared-patterns.md` that both WFC and K-12 ontologies inherit from
- **(b)** No — the patterns are documented in `03-shared-structure.md` (this project) and that's enough
- **(c)** No — but extract the patterns into a reusable `ontology-template/` if/when a third ontology is needed

**My recommendation:** (b) for now. The patterns are documented; if a third ontology emerges, then (a) or (c).

## Priority question

### Q11. Which one to flesh out further first?
You've sketched both. Two different domains. Limited time. Which one?
- **(a)** WFC — service Susan, serve the WFC build pipeline
- **(b)** K-12 — serves the LFED + K12-Bench paper, the co-author search
- **(c)** Both, in parallel — but this doubles the time
- **(d)** Neither — defer; this was an ideation exercise, come back to it later

**My recommendation:** depends on Q12 (your bandwidth). If you have the time, (a) is the higher-value-per-hour (WFC's design system is in active use; K-12 is research). If you're bandwidth-constrained, (d) — both can wait.

### Q12. How much time can you allocate this quarter?
The next 90 days have:
- Susan Phase 1 build (WFC, ~8 hrs/week for 4-6 weeks)
- NBA Phase 1 build (LTC, ~5-10 hrs/week for 3 weeks)
- K-12 outreach + blog series (~5 hrs/week for 3 weeks)
- WFC content load (campaign launch, ~5 hrs/week for 2-3 weeks)
- Agent observability MVP (4-6 weeks, optional, decision pending)
- This ontology work (optional)

**The question is not "is the ontology valuable" — it is. The question is "is this the right week to flesh it out further?"**

My read: probably not. Flesh out more in Q4 2026 (Oct-Dec) when Susan + NBA + K-12 outreach have landed. The sketches here are the seed; the formalization can wait.

*Last updated: 2026-07-14 16:01 PT*
