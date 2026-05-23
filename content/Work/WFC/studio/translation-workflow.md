# Research-to-Design Translation Workflow

## Purpose
This workflow ensures every design rule in the NeroDesign system has a traceable chain from source evidence to interface decision. No design rule exists without a documented origin.

## The Translation Chain

```
Source Document
    ↓
Tier Classification (T1/T2/T3)
    ↓
Extracted Principle (what the evidence means)
    ↓
Design Implication (what it means for interfaces)
    ↓
UI/UX Rule (specific, actionable design directive)
```

## Worked Examples

### Example 1: Revisability Rule

**Source:** "Strategic Framework for AHDs" — "Revisability absent in 87.5% of reviewed prototypes"
**Tier:** T1 (quantitative finding from systematic review)
**Principle:** Users benefit from the ability to pause, reflect, and modify before committing to an action.
**Design Implication:** High-sensitivity interfaces should not force irreversible, high-velocity decisions.
**UI/UX Rule:** Every form, CTA, and navigation action in sensitive contexts must support at least one of: undo, draft state, preview before submit, or easy return path.

### Example 2: Processing Fluency Rule

**Source:** "Neuro-Static Design Framework" — "Users favor layouts the brain can decode with high efficiency"
**Tier:** T1 (established cognitive science finding)
**Principle:** Cognitive ease precedes aesthetic appreciation.
**Design Implication:** Complex or unfamiliar layouts increase cognitive load before emotional engagement can occur.
**UI/UX Rule:** Use recognizable layout patterns (standard nav positions, predictable content hierarchies) before introducing novel visual treatments. Novelty should be in content, not structure.

### Example 3: Dominance Preservation Rule

**Source:** "Neuro-Static Design Framework" — PAD model Dominance axis; "High D values reflect proactive, engaged interaction state"
**Tier:** T1 (validated psychological model)
**Principle:** Users in high-sensitivity contexts need to feel in control of their interaction pace and depth.
**Design Implication:** Interfaces that remove control (auto-advance, forced flows, hidden exits) increase anxiety and reduce trust.
**UI/UX Rule:** Never auto-advance between steps. Always show progress. Always provide an exit. Never hide pricing or commitment terms.

## Creating New Tier 3 Rules

When the studio identifies a design need not covered by existing rules:

1. Search the Evidence Ledger for relevant Tier 1 or Tier 2 findings
2. Apply the translation chain to derive a new rule
3. Classify the new rule as Tier 3
4. Cite the source tier(s) that justify it
5. Add to the Evidence Ledger under Tier 3

## Validating Existing Rules

Quarterly review:
- Does each Tier 3 rule still have valid source evidence?
- Has new research emerged that strengthens or weakens the chain?
- Has client work validated or contradicted the rule?
- Update, strengthen, or retire rules based on findings.
