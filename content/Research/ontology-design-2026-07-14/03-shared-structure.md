---
title: Shared Structure — Cross-Cutting Design Principles
created: 2026-07-14
updated: 2026-07-14 16:01
type: design-principles
tags: [research, ontology, shared, design-principles, fleshing-out]
status: SKETCH — fleshed out 7/14 16:01 PT. Cross-cutting patterns across both ontologies.
---

# Shared Structure — Cross-Cutting Design Principles

> Both the WFC Design Ontology and the K-12 Research Ontology should
> follow the same shape, the same lifecycle, and the same documentation
> conventions. This doc captures the patterns that apply to both.

## 1. The 7-layer ontology structure

Both ontologies use the same 7-layer structure. Each layer is a kind of
"thing" that exists in the domain.

| Layer | WFC example | K-12 example |
|-------|-------------|--------------|
| **Entity** (top-level class) | `DesignElement` | `Student` |
| **Property** (attribute) | `aesthetic_layer` | `grade_level` |
| **Relationship** (between entities) | `DesignElement —has—> AestheticLayer` | `Student —has—> Enrollment` |
| **Vocabulary** (controlled list) | `{Sensory, Emotional, Meaning}` | `{TA, RA, RB, RH, GM, GF, SE, EL, SWD, HOM, FOS}` |
| **Derivation** (computed value) | `engagement_score` (computed from interaction analytics) | `chronic_absenteeism_rate` (computed from Attendance) |
| **Mapping** (to external standard) | (none for WFC) | `ReportingCategory.code` → CEDS code |
| **Suppression** (privacy / business rule) | (none for WFC) | CDE 11-student suppression rule |

Not every ontology has all 7 layers. WFC lacks Mapping and Suppression (the domain is private, no external standards). K-12 has all 7.

## 2. The 5-lifecycle phases

Both ontologies have the same lifecycle. They evolve through these phases.

| Phase | What it means | WFC example | K-12 example |
|-------|---------------|-------------|--------------|
| **1. Implicit** | The model exists in someone's head, scattered in code/YAMLs | Lauren's aesthetic triad, Frank's mental model of WFC | LFED training data encodes California K-12 semantics |
| **2. Sketched** | A written exploration (this project!) | `01-WFC-design-ontology.md` | `02-K12-research-ontology.md` |
| **3. Formalized** | A machine-readable spec (JSON Schema, Pydantic, OWL) | Pydantic models for DesignElement, PageArchetype, etc. | Pydantic models for District, Student, AccountabilityMetric |
| **4. Operationalized** | A tool that uses the ontology | A design linter that checks WFC design proposals | A schema validator that checks Aeries extracts |
| **5. Published** | A paper / docs / API that external people consume | "The WFC Design System" public page | "K-12 Accountability Data: A Domain Ontology" paper |

This project is at **Phase 2 (Sketched)** for both. Formalization is optional and incremental.

## 3. The 4-audience principle

An ontology serves 4 audiences. Each audience consumes a different view.

| Audience | What they need | WFC view | K-12 view |
|----------|----------------|----------|-----------|
| **Theorist** | The abstract class hierarchy | Markdown documentation | Markdown documentation |
| **Builder** | The schema (Pydantic / TypeScript types) | Python models in `wfc_design_ontology/models.py` | Python models in `lfed/ontology.py` |
| **Validator** | The rules (constraints, suppression, mappings) | A linter that checks design proposals | A validator that checks Aeries extracts |
| **Storyteller** | The narrative (why this matters, what it connects) | "The WFC design system is grounded in neuroaesthetic research..." | "California's K-12 accountability framework has 5x5 grid logic that LMs systematically misalign with..." |

The WFC audience is internal (Frank + Lauren + future WFC hires). The K-12 audience is external (research collaborators, district partners, EDM/LA community). This difference matters for how much the ontology needs to be self-explanatory.

## 4. The 3-format principle

For each layer (entity, property, vocabulary, etc.), produce 3 formats:

1. **Narrative** (Markdown tables + prose) — for the theorist and storyteller
2. **Schema** (Pydantic / TypeScript / JSON Schema) — for the builder
3. **Examples** (real instances with values) — for the validator and newcomer

**Why 3 formats:** each format serves a different question. "What is a DesignElement?" → narrative. "What's the data type of `aesthetic_layer`?" → schema. "What does a real DesignElement look like?" → examples.

**Discipline:** the 3 formats must stay in sync. If you add a new value to a vocabulary in the schema, update the narrative and add an example. Drift is the failure mode.

## 5. The 5-question framework

When you add a new class, answer these 5 questions before committing:

1. **What is it?** (1-sentence definition)
2. **What is it NOT?** (the things people might confuse it with)
3. **Where does it come from?** (the source of the data — for K-12, this is "Aeries SIS extract 2024-Q3")
4. **What is it used for?** (the consumers — for K-12, this is "LFED NL→SQL queries")
5. **What can go wrong?** (the failure modes — for K-12, this is "year format mismatch, suppression rule violations, reporting category edge cases")

The 5 questions are the minimum viable documentation for a class. They prevent the "I'll add this later" trap.

## 6. The shared "vocabulary" pattern

Both ontologies have *the same shape* for controlled vocabularies:

- A `code` (machine-readable, stable, never renamed)
- A `description` (human-readable, can be updated)
- A `parent` (optional — for hierarchical vocabularies)
- A `deprecated_at` (optional — for retired values)
- A `replaced_by` (optional — for the new value when deprecated)

**WFC example:** AestheticLayer = {Sensory, Emotional, Meaning} — flat, no hierarchy.
**K-12 example:** ReportingCategory = {TA, RA, RB, RH, GM, GF, SE, EL, SWD, HOM, FOS} — flat, no hierarchy. But could become hierarchical (e.g., "EL" → "EL_AtRisk", "EL_LongTerm", "EL_Newcomer").

Same pattern, different domains. The pattern itself is the value.

## 7. The "from-substrate-to-spec" pattern

Both ontologies emerge from existing artifacts. They don't replace those artifacts; they describe them.

| WFC | K-12 |
|-----|------|
| `tokens-colors.yaml` → `DesignElement:Color` | Aeries extract → `District`, `School` |
| `page-archetype-landing.yaml` → `PageArchetype:Landing` | CDE extract → `Assessment`, `AccountabilityMetric` |
| Lauren's notes → `PsychologicalPrinciple` | CA School Dashboard spec → `IndicatorStatus`, `IndicatorColor` |
| WFC tagline → `BrandAttribute:Tagline` | LFED training data → `Vocabulary` semantics |

The pattern: find the artifact → identify the implicit class → write the formal spec. This is the "ontology extraction" workflow.

## 8. The cost-of-formalization spectrum

There's a spectrum from "implicit" to "fully formalized." Each step has a cost.

```
IMPLICIT     SKETCHED     FORMALIZED     OPERATIONALIZED     PUBLISHED
  (head)    (markdown)    (Pydantic)       (linter/tool)       (paper)
   |           |              |                 |                 |
   v           v              v                 v                 v
 "I know    "I wrote      "The code       "The tool runs    "Others can
  what a     down what     compiles         every CI run       cite the
  Student     a Student      and rejects      and catches        spec"
  is"         is"            bad data"        regressions"
   |           |              |                 |                 |
  free       1-2 wks        1-2 wks          1-2 wks           ongoing
  cost       Frank-time     Frank-time       Frank-time        maintenance
```

The WFC ontology is at SKETCHED (this project). To get to FORMALIZED is another 1-2 weeks of Frank's time. To get to OPERATIONALIZED is another 1-2 weeks. The K-12 ontology is the same — currently at SKETCHED, but the LFED + K12-Bench work could push it to FORMALIZED + OPERATIONALIZED organically.

## 9. The "two ontologies, one toolkit" insight

If both ontologies use the same structure (7 layers, 5 lifecycle phases, 4 audiences, 3 formats, 5 questions, vocabulary pattern, substrate-to-spec pattern), then the **tooling** can be shared.

A future v2 could ship:
- One Markdown template for the SKETCHED phase
- One Pydantic base class for FORMALIZED phase
- One validator framework for OPERATIONALIZED phase

This is the "schema-of-schemas" insight. Don't build two tools; build one tool that serves two domains.

## 10. The risk: ontology-itis

The biggest risk is spending more time on the ontology than on the work it's supposed to support. Symptoms:
- Adding classes that have no consumers
- Maintaining the ontology in 5 formats when 1 would do
- Letting the ontology drift from the substrate
- Treating the ontology as a deliverable rather than a tool

**Discipline:** an ontology is a means, not an end. The WFC ontology is in service of WFC's design system. The K-12 ontology is in service of the LFED + K12-Bench. If the ontology grows faster than its consumers, it's wrong.

**Pruning rule:** if a class has no consumers and no clear future consumer, delete it. Ontology minimalism > ontology completeness.

*Last updated: 2026-07-14 16:01 PT*
