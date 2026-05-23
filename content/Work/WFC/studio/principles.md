# NeroDesign Design Principles

## Purpose
These principles are the bridge between research evidence and concrete design decisions. Each principle is derived from the Evidence Ledger (Tier 1 or Tier 2) and governs all downstream token, component, and page archetype decisions.

---

## Principle 1: Sensory Safety Before Exploration
**Evidence:** T1-001 (P2 timing), T1-007 (Processing Fluency), T2-004 (9-17 element constraint)
**Statement:** Users must feel cognitively safe before they can engage with content. Layout stability, predictable patterns, and manageable complexity are prerequisites for any deeper interaction.
**Design Directives:**
- Layout structure must be correct on first render (no shifting)
- Use recognizable patterns before novel treatments
- Limit visible elements to reduce cognitive load
- Provide clear visual hierarchy within 400ms of perception

## Principle 2: Dominance Through Revisability
**Evidence:** T1-008 (Revisability gaps), T1-003 (PAD Dominance axis)
**Statement:** Users in high-sensitivity contexts need control over their interaction pace. Every action should be reversible, every commitment previewable, every path returnable.
**Design Directives:**
- No irreversible actions without explicit confirmation and preview
- Draft states for all form inputs
- Undo capability for all navigational actions
- Clear exit paths from every flow

## Principle 3: Implicit Aesthetic First
**Evidence:** T1-001 (P2), T1-002 (LPP), T1-007 (Processing Fluency)
**Statement:** The brain judges layout before the mind processes content. Aesthetic decisions happen at the neurological level before conscious awareness.
**Design Directives:**
- Balance, symmetry, and cohesion are not decorative — they are functional
- Grid systems provide the "vital arrangement" the brain evaluates
- Aesthetic threshold: if the layout causes cognitive friction, content will not be reached
- Test designs with the question: "Does this feel stable before it feels beautiful?"

## Principle 4: Emotional Calibration
**Evidence:** T1-003 (PAD model), T1-004 (14 emotions coordinates), T2-003 (Sublimation)
**Statement:** Every interface state has an emotional coordinate. Design should intentionally target specific PAD values for each user journey stage, not leave emotion to chance.
**Design Directives:**
- Define target PAD coordinates for each page archetype
- Calibrate color, spacing, typography, and motion to match target PAD
- Recognize that "negative" emotions can be appropriate in context (sublimation)
- Avoid arousal spikes (sudden animation, urgency cues) without user consent

## Principle 5: Bi-Directional Care
**Evidence:** T1-008 (Reviewability gap), T2-001 (17-dimensional matrix — bi-directionality)
**Statement:** High-sensitivity interfaces should feel like a conversation, not a broadcast. The system should acknowledge user state, respond appropriately, and provide feedback that confirms the user is heard.
**Design Directives:**
- Acknowledge user actions with calm, proportional feedback
- Provide system state visibility (loading, saving, processing)
- Offer supportive content at decision points
- Design for return visits (reviewability of past interactions)

## Principle 6: Cognitive Breathing Room
**Evidence:** T2-004 (9-17 element constraint), T1-006 (EEG bands — Alpha states), T1-007 (Processing Fluency)
**Statement:** High-sensitivity users often operate with reduced cognitive energy. Interfaces must provide space — visual, temporal, and decisional — for processing.
**Design Directives:**
- Generous spacing between interactive elements
- One primary action per screen state
- Progressive disclosure over information density
- Time-based respect: no aggressive timeouts, no urgency manipulation
