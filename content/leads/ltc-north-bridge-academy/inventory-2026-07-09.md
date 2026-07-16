---
title: North Bridge Academy — Initial Device Inventory (engagement-ready)
created: 2026-07-13
updated: 2026-07-13 15:50
type: deliverable
status: SCAFFOLD — Frank to refine with Erin data
tags: [ltc, north-bridge-academy, inventory, mosyle, apple-school-manager, phase-1]
dossier: "[[leads/ltc-north-bridge-academy/dossier]]"
related:
  - "[[leads/ltc-north-bridge-academy/meeting-2026-07-07-erin-mosyle]]"
  - "[[leads/ltc-north-bridge-academy/Mosyle MDM for Education — Comprehensive Research Summary]]"
---

# North Bridge Academy — Initial Device Inventory (engagement-ready)

> **Purpose.** Convert Erin's day-prior-to-7/7 walkthrough counts into the
> working device inventory Frank can act on for Phase 1. Source of truth for
> Mosyle admin + ASM organization work; updated as the engagement produces
> more accurate counts.

> **SCAFFOLD 2026-07-13:** This file was created as the highest-value LTC
> artifact not yet on disk (overdue from 7/9). First-pass table is filled in
> from the [[leads/ltc-north-bridge-academy/meeting-2026-07-07-erin-mosyle|7/7
> walkthrough notes]]. **Frank to refine with Erin** — particularly the
> per-cart and per-generation breakdowns.

## Headline Counts (per Erin's walkthrough, 7/7)

| Metric                 | Count | Source                                | Status            |
| ---------------------- | ----- | ------------------------------------- | ----------------- |
| **iPads total**        | 121   | Walkthrough 7/7 + ASM check           | ✅ Erin confirmed |
| **Macs in ASM**        | 8     | Walkthrough 7/7                       | ⚠️ Gap — should be higher; ASM cleanup task |
| **Apple TVs**          | 8     | Walkthrough 7/7                       | ⚠️ Classroom assignment unverified |
| **Carts (per-homeroom)**| ~10   | Walkthrough 7/7 (12 iPads per cart)   | ✅ Erin confirmed |
| **Faculty laptops**    | TBD   | Per-homeroom: all faculty get laptops | ❓ Total count + Apple/non-Apple split TBD |
| **Faculty iPads**      | TBD   | "Some have, not policy"               | ❓ Ad-hoc; Phase 1 decision |

## iPads (121 total)

> Per-homeroom cart structure: 12 iPads per cart, ~10 carts. Students
> identify iPads by **name label** (not profile). Cart-level app deployment
> today; **Lower School vs Middle School partition** is the August Phase 1
> path. Per-student personalization is a Phase 2 conversation.

| Cart / Group         | # iPads | Generation | ASM-enrolled | Mosyle-enrolled | Current assignment         | Accessories               | Notes                          |
| -------------------- | ------- | ---------- | ------------ | --------------- | -------------------------- | ------------------------- | ------------------------------ |
| Hamlin-used gen 8/9  | TBD     | Gen 8 / 9  | Likely       | Likely          | TBD — need per-cart count  | Logitech (aged)           | Older units, some aging out    |
| New 1:1 iPads        | TBD     | Newer gen  | Likely       | Likely          | TBD — need per-cart count  | Logitech (newer)          | 2025 Board-approved 1:1 buy    |
| Faculty iPads        | TBD     | Mixed      | Mixed        | Mixed           | Ad-hoc                     | Mixed                     | Not policy — Frank's Phase 1 call |
| **Subtotal**         | **121** | Mixed      | —            | —               | —                          | —                         | 12/cart × ~10 carts            |

### Per-cart detail (target shape — to fill from Mosyle admin export)

| Cart ID | Homeroom | Grade band    | # iPads | Generation mix | Logitech keyboard model | Issues |
| ------- | -------- | ------------- | ------- | -------------- | ----------------------- | ------ |
| (TBD)   | (TBD)    | LS or MS      | 12      | (TBD)          | (TBD)                   | (TBD)  |

## Macs (8 confirmed in ASM; gap to reconcile)

| Total Macs at NBA | In ASM | Not in ASM | Notes                                               |
| ----------------- | ------ | ---------- | --------------------------------------------------- |
| ❓                | 8      | ❓         | Erin noticed "only 8" — ASM cleanup is a Phase 1 task |

- **Apple model split** (MacBook Air / MacBook Pro / iMac / Mac mini): ❓ TBD
- **Faculty vs staff split:** ❓ TBD
- **Phase 1 action:** Reconcile ASM enrollment; enroll any missing faculty Macs.

## Apple TVs (8)

| Total Apple TVs | Classroom-mounted | Standalone / office | Managed?  | Notes                |
| --------------- | ----------------- | ------------------- | --------- | -------------------- |
| 8               | ❓                 | ❓                   | ❓         | Verify per-classroom assignment during Phase 1 |

## Phase 1 Action Surface (derived from inventory)

| # | Action                                              | Owner | Source              | Notes                                |
| - | --------------------------------------------------- | ----- | ------------------- | ------------------------------------ |
| 1 | Reconcile ASM Mac enrollment (8 → full count)        | Frank | 7/7 walkthrough     | Erin flagged this as a gap           |
| 2 | Define Lower School vs Middle School app partition  | Frank | Erin's ideal state  | Cart-based push → role-based push    |
| 3 | Stand up Apple Classroom for middle-school teachers | Frank | Filtering + live    | Mosyle-managed                       |
| 4 | Configure selective YouTube + per-class filtering   | Frank | Filtering priority  | Mosyle OneK12 encrypted DNS          |
| 5 | Faculty iPad policy: make policy-driven, not ad-hoc  | Frank | Phase 1 decision    | Frank to recommend                   |
| 6 | Logitech keyboard refresh research                  | Frank | Phase 2 (not 1)     | Track separately; not Phase 1 scope  |

## Open Inventory Questions (Frank to resolve with Erin)

- [ ] Total **Mac** count at NBA — how many faculty + staff laptops exist?
- [ ] Per-cart iPad generation breakdown (Hamlin used vs new 1:1 by cart)
- [ ] Logitech keyboard models currently in use (Combo Touch / Crayon / Rugged Folio / other)
- [ ] Apple TV classroom assignment
- [ ] Per-student personalization roadmap (Phase 1 vs Phase 2)
- [ ] Procreate + other paid-app licensing model (per-student vs shared-cart)

## Source-of-Truth Links

- [[leads/ltc-north-bridge-academy/meeting-2026-07-07-erin-mosyle|7/7 walkthrough notes]] — device counts, Mosyle history, Erin's "what NBA needs"
- [[leads/ltc-north-bridge-academy/Mosyle MDM for Education — Comprehensive Research Summary|Mosyle research]] — OneK12 features, filtering, Apple Classroom integration
- [[leads/ltc-north-bridge-academy/dossier|NBA dossier]] — overall engagement state
- [[leads/ltc-north-bridge-academy/follow-up-email-2026-07-09-draft|7/9 follow-up email draft]] — on HOLD per Frank 7/10

## What Changed

- **2026-07-13 15:50 PT — SCAFFOLD created** by Hermes morning-standup. Highest-value LTC artifact not yet on disk. First-pass table from 7/7 walkthrough counts. Frank to refine per-cart detail + Mac reconciliation + Apple TV assignment with Erin.