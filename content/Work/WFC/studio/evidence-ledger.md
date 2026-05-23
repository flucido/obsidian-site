# Studio Evidence Ledger

## Source Corpus
All findings below are sourced from the NeroDesign research repository: `Crossing Boundaries Toward a General Model of Neuroaesthetics-studio-2026-05-19/`

---

## Tier 1 — Strong Evidence

### T1-001: P2 Component Timing for Implicit Aesthetic Preference
**Source:** "The Digital Pulse: A Methodological Overview of Emotional Measurement"
**Finding:** P2 ERP component detected at 200-400ms post-stimulus, reflecting early cognitive processing and stimulus classification in frontal-central area.
**Design Implication:** Users form unconscious aesthetic judgments within 400ms of viewing a layout. First impression is neurologically determined before conscious appraisal.
**Design Rule:** Layout structure (grid, balance, symmetry) must be correct on first render. No progressive loading that changes layout after initial paint.

### T1-002: LPP Component for Deep Emotional Arousal
**Source:** "The Digital Pulse: A Methodological Overview of Emotional Measurement"
**Finding:** LPP (Late Positive Potential) observed at 400-600ms in frontal-central and parietal-occipital areas, signaling deep aesthetic preference and emotional arousal.
**Design Implication:** Sustained emotional engagement is measurable and design-influencable. Layouts that raise emotional arousal secure attention in free-browsing environments.
**Design Rule:** After initial layout stability (T1-001), use deliberate arousal triggers (meaningful imagery, purposeful color) to sustain engagement.

### T1-003: PAD Model Three-Dimensional Structure
**Source:** "Neuro-Static Design Framework: A Multi-Sensory Web System for Mental Health Practice"
**Finding:** Emotions map to three independent dimensions: Pleasure (positivity/negativity), Arousal (activation level), Dominance (control strength).
**Design Implication:** Every interface state can be characterized by its PAD coordinates. Design can target specific emotional states by manipulating these three axes.
**Design Rule:** Define target PAD coordinates for each page archetype before designing.

### T1-004: 14 Basic Emotions PAD Coordinates
**Source:** "Neuro-Static Design Framework"
**Finding:** 14 basic emotions have validated PAD coordinate mappings (e.g., Joy: P=2.77, A=1.21, D=1.42; Anxiety: P=-0.95, A=0.32, D=1.02).
**Design Implication:** Designers can target specific emotional states by referencing these coordinates and calibrating interface properties accordingly.
**Design Rule:** Use PAD coordinates as the emotional specification for page archetypes.

### T1-005: SVM Emotion Classification from EEG
**Source:** "The Digital Pulse: A Methodological Overview of Emotional Measurement"
**Finding:** Support Vector Machines achieve 72%+ success rate in classifying emotional tendencies from EEG signals in quasi-experimental (non-laboratory) environments.
**Design Implication:** Emotional measurement is viable outside controlled settings. Studio can reference this accuracy benchmark when discussing measurement feasibility with clients.
**Design Rule:** When proposing measurement-based design validation, cite 72%+ as the achievable accuracy floor for non-laboratory emotional classification.

### T1-006: Five EEG Frequency Bands
**Source:** "The Digital Pulse: A Methodological Overview of Emotional Measurement"
**Finding:** Delta (deep rest), Theta (internal focus), Alpha (relaxed alertness), Beta (active thinking), Gamma (peak processing) have distinct cognitive correlates.
**Design Implication:** Different interface states correlate with different neural activation patterns. High-Beta interfaces demand cognitive work; high-Alpha interfaces support relaxation.
**Design Rule:** Match interface cognitive demand to user context. High-sensitivity users often need Alpha-supporting states, not Beta-demanding states.

### T1-007: Processing Fluency and Aesthetic Preference
**Source:** "Neuro-Static Design Framework"
**Finding:** Users favor layouts the brain can decode with high efficiency (processing fluency). Physiological attraction driven by optimal neuro-physiological activation.
**Design Implication:** Cognitive ease is a prerequisite for aesthetic appreciation. Complex layouts increase cognitive load before emotional engagement can occur.
**Design Rule:** Prioritize processing fluency (clear hierarchy, predictable patterns) before aesthetic complexity.

### T1-008: Revisability and Reviewability Gaps in Affective Systems
**Source:** "Strategic Framework for the Design and Development of Affective Haptic Devices (AHDs)"
**Finding:** Revisability absent in 87.5% of reviewed prototypes. Reviewability absent in 92.0% of reviewed prototypes.
**Design Implication:** Most affective systems do not allow users to pause/reflect before sending (revisability) or store/replay received interactions (reviewability). This is an innovation gap and a user need.
**Design Rule:** High-sensitivity interfaces must support revisability (draft, preview, undo) and reviewability (save, return, reference).

---

## Tier 2 — Interpretive Frameworks

### T2-001: 17-Dimensional AHD Design Matrix
**Source:** "Strategic Framework for the Design and Development of Affective Haptic Devices (AHDs)"
**Finding:** Affective systems can be classified across 17 dimensions (bi-directionality, input type, portability, reach, reviewability, revisability, richness, synchronicity, symmetry, composition, wearability, actuation, body location, real-time responsivity, I/O mapping, local feedback, morphological congruency).
**Design Implication:** Digital interfaces can similarly be classified across interaction dimensions. Not all dimensions apply to web, but the systematic approach to design space mapping is transferable.
**Studio Adaptation:** Develop a web-specific design dimension matrix (fewer dimensions, web-relevant).

### T2-002: Neuro-Static User Archetypes
**Source:** "Neuro-Static Design Framework"
**Finding:** Three demographic archetypes identified with different emotional response patterns (High-Engagement Youth, Positive-Propensity Professional, Balanced Income User).
**Design Implication:** Different user segments have different baseline emotional tendencies and layout tolerance levels.
**Studio Adaptation:** Develop web-specific user archetypes for high-sensitivity sectors (e.g., "Crisis Navigator," "Information Seeker," "Trust Builder").

### T2-003: Sublimation Through Negative Emotional Engagement
**Source:** "The Digital Pulse: A Methodological Overview of Emotional Measurement"
**Finding:** "Negative" emotional tendencies (sadness, melancholia) can enhance experience quality through internal sublimation, particularly in educational and art contexts.
**Design Implication:** Not all negative PAD values indicate design failure. Context determines whether negative emotions serve the user journey.
**Studio Adaptation:** Define when negative emotional states are appropriate in client work (e.g., memorial pages, grief support, serious health information).

### T2-004: 9-17 Element Layout Constraint
**Source:** "Neuro-Static Design Framework"
**Finding:** Strict constraint of 9-17 elements per layout ensures usability for patients with diminished cognitive energy.
**Design Implication:** Cognitive load limits are quantifiable. Element count is a proxy for cognitive demand.
**Studio Adaptation:** Adopt as a guideline (not absolute rule) for high-sensitivity page designs. Validate through usability testing.

### T2-005: Three AHD Design Intentions
**Source:** "Strategic Framework for the Design and Development of Affective Haptic Devices (AHDs)"
**Finding:** Three distinct design intentions: Mediated Social Touch (realism), Symbolic Communication (abstract signals), Awareness Systems (passive background information).
**Design Implication:** Web interfaces similarly serve distinct interaction intentions. Clarifying intent before design prevents mismatched solutions.
**Studio Adaptation:** Define web-specific design intentions (e.g., "Direct Action," "Exploratory Discovery," "Passive Reassurance").

---

## Tier 3 — Studio Methodology (To Be Developed)

*Tier 3 entries will be created during Phase 2 (Translation Workflow) as the studio synthesizes Tier 1 and Tier 2 findings into original design rules.*
