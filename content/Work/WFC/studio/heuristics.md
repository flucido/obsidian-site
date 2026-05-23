# NeroDesign Critique Heuristics

## Purpose
This framework provides a founder-facing checklist to evaluate any design against the NeroDesign system's evidence-based standards. Every design must pass these gates before client delivery.

## How to Use
1. Open the design (Figma, code, or prototype)
2. Work through each section below
3. Mark each check as Pass, Fail, or N/A
4. Any Fail must be resolved before delivery
5. Document any N/A decisions with rationale

---

## Gate 1: Element Count Check
**Evidence:** T2-004 (9-17 element constraint), Principle 1 (Sensory Safety)

- [ ] Each visible screen state has between 9 and 17 distinct elements
- [ ] Elements are counted as: headings, paragraphs, images, buttons, inputs, nav items, cards, icons with labels
- [ ] If a screen exceeds 17 elements, progressive disclosure has been applied
- [ ] If a screen has fewer than 9 elements, it is intentional (e.g., confirmation page)

**Fail resolution:** Reduce visible elements through progressive disclosure, or document why the count is appropriate for this context.

---

## Gate 2: Arousal Calibration
**Evidence:** T1-002 (LPP), T1-004 (PAD coordinates), Principle 4 (Emotional Calibration)

- [ ] Target PAD coordinates are defined for this page archetype
- [ ] Color palette matches the target PAD (calm palettes for low-arousal targets)
- [ ] No surprise motion or auto-playing media
- [ ] Typography scale does not create visual urgency (no all-caps headings, no aggressive size jumps)
- [ ] Images support the emotional intent (calm imagery for calm targets)

**Fail resolution:** Adjust colors, motion, typography, or imagery to match the target PAD coordinates.

---

## Gate 3: Revisability Audit
**Evidence:** T1-008 (Revisability gaps), Principle 2 (Dominance Through Revisability)

- [ ] Every form has a draft state or auto-save
- [ ] Every CTA has a clear outcome description
- [ ] Every action has an undo or return path
- [ ] No irreversible actions without explicit confirmation
- [ ] Multi-step processes show progress and allow back-navigation

**Fail resolution:** Add draft state, outcome descriptions, undo paths, or confirmation steps.

---

## Gate 4: Dominance Preservation
**Evidence:** T1-003 (PAD Dominance), Principle 2 (Dominance Through Revisability)

- [ ] No urgency language or timers
- [ ] No dark patterns (hidden opt-ins, guilt-trip text, disguised ads)
- [ ] Exit options are equally visible to primary actions
- [ ] User controls the pace (no auto-advance, no forced flows)
- [ ] Pricing and terms are transparent and complete

**Fail resolution:** Remove urgency cues, dark patterns, and hidden exits. Make pricing transparent.

---

## Gate 5: Implicit Aesthetic Scan (P2/LPP Proxy)
**Evidence:** T1-001 (P2), T1-002 (LPP), Principle 3 (Implicit Aesthetic First)

- [ ] Layout is stable on first render (no layout shift)
- [ ] Grid system provides clear structure
- [ ] Balance and symmetry are intentional (not accidental)
- [ ] Visual hierarchy is clear within 400ms of viewing
- [ ] Cohesion: all elements feel part of a unified system
- [ ] Order: the arrangement is predictable and scannable
- [ ] Complexity: information density matches the target audience's cognitive capacity
- [ ] Simplicity: unnecessary visual noise has been removed

**Fail resolution:** Stabilize layout, strengthen grid, clarify hierarchy, remove visual noise.

---

## Gate 6: Accessibility Baseline
**Evidence:** Token specifications (colors.yaml, typography.yaml, motion.yaml)

- [ ] All text meets WCAG AA contrast minimum (4.5:1)
- [ ] Focus indicators are visible on all interactive elements
- [ ] All images have descriptive alt text
- [ ] All forms have associated labels
- [ ] prefers-reduced-motion is respected
- [ ] Page is navigable by keyboard
- [ ] Screen reader announces key state changes

**Fail resolution:** Fix contrast, add labels, implement reduced motion support, ensure keyboard navigation.

---

## Critique Report Template

```
Design: [Page name or component]
Date: [YYYY-MM-DD]
Reviewer: [Name]

Gate 1 — Element Count: [Pass/Fail/N/A] — Notes:
Gate 2 — Arousal Calibration: [Pass/Fail/N/A] — Notes:
Gate 3 — Revisability Audit: [Pass/Fail/N/A] — Notes:
Gate 4 — Dominance Preservation: [Pass/Fail/N/A] — Notes:
Gate 5 — Implicit Aesthetic: [Pass/Fail/N/A] — Notes:
Gate 6 — Accessibility: [Pass/Fail/N/A] — Notes:

Overall: [Ready for delivery / Requires revision]
Required changes: [List any Fail items that need resolution]
```
