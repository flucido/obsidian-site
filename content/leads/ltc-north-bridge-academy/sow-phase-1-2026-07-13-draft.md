---
title: "North Bridge Academy — Phase 1 Statement of Work (DRAFT 2026-07-13)"
created: 2026-07-13
status: DRAFT — ready for Frank review before send
type: sow-draft
tags: [ltc, north-bridge-academy, sow, phase-1, mosyle, apple-school-manager, mdm]
related:
  - "[[leads/ltc-north-bridge-academy/dossier]]"
  - "[[leads/ltc-north-bridge-academy/follow-up-email-2026-07-13-draft]]"
  - "[[leads/ltc-north-bridge-academy/inventory-2026-07-09]]"
client: "[[leads/ltc-north-bridge-academy/dossier|North Bridge Academy]]"
prepared_by: Frank Lucido, Lucido Technology Consulting
prepared_for: "Erin Minuth Terris (Lower School Head) + Annie Crowder (Head of School)"
---

# North Bridge Academy — Phase 1 Statement of Work

**IT Infrastructure & Device Management — Phase 1 (MDM + Apple School Manager)**

**Prepared by:** Frank Lucido, Lucido Technology Consulting
**Prepared for:** North Bridge Academy (Erin Minuth Terris, Lower School Head; Annie Crowder, Head of School)
**Effective date:** TBD on signature
**Period of performance:** ~3 weeks from kickoff

---

## 1. Background

North Bridge Academy is a 68-student, grades 2–8 private non-profit in Mill Valley serving dyslexic learners. The school has 148 Apple devices across iPads, Macs, and Apple TVs. The Board approved a 1:1 iPad program last summer, and the August 2026 rollout is the school's first opportunity to put a fully managed device environment in place.

Lucido Technology Consulting ("LTC") was engaged following a 6/17 green light from Annie Crowder covering Mosyle OneK12 MDM, Wi-Fi assessment, and an admin-team needs summary. The 7/7 on-site walkthrough with Erin Minuth Terris and the 7/13 Mosyle/ASM inventory reconciliation surfaced four concrete Phase 1 deliverables.

---

## 2. Phase 1 Deliverables

### Deliverable 1 — Mosyle organization: Lower School vs Middle School partition

- Reorganize the existing Mosyle device groups from the current per-cart structure into a **Lower School (grades 2–5) and Middle School (grades 6–8) partition**.
- Update device-group memberships to match current homeroom assignments.
- Convert app deployment from per-cart to per-band, with the option to override per-student in the future.
- Verify the partition with Erin against the actual homeroom structure.

### Deliverable 2 — Apple Classroom for middle school

- Stand up **Apple Classroom** for middle school teachers, paired with Mosyle for app deployment.
- Train Erin (and any other interested teachers) on the live-screen-view workflow.
- Document the workflow in a one-page reference for the MS team.

### Deliverable 3 — Filtering policy with YouTube gating

- Configure **selective YouTube access per class** (Mosyle OneK12 encrypted DNS filtering).
- Build a default policy that allows teachers to toggle YouTube per class / per app / per time.
- Document the policy + how to request changes.

### Deliverable 4 — Apple School Manager + Mosyle enrollment cleanup

- Enroll the **15 faculty MacBook Air M4 (2025) units** that are in Apple School Manager but not yet in Mosyle.
- Enroll the **27 Apple-purchased devices** that have no Mosyle enrollment at all.
- Assign the **6 devices currently with no MDM assignment** to NBA Mosyle.
- Verify all faculty Macs are in Mosyle post-cleanup (reconcile the 8 → 16 Mac delta noted in the 7/7 walkthrough).
- Document the post-cleanup state for handoff.

### Deliverable 5 (project management) — Coordination + handoff

- Weekly check-in with Erin (sync or async) during the 3-week engagement.
- Final handoff document with the post-Phase 1 state, including the device inventory, the filtering policy, the Apple Classroom setup, and the ASM/Mosyle reconciliation results.
- Available for one follow-up question from Annie / Dave / Erin within 14 days of completion.

---

## 3. Out of Scope (Phase 2 conversations)

- **Google Workspace / `northbridgeacademy.org` domain administration** — separate workstream, separate SOW.
- **Network improvements** (AT&T fiber, Starlink failover, UPS gaps, IP subnet reconfiguration) — Avram's existing workstream, with Frank available for consultation.
- **Logitech keyboard refresh** (sourcing + replacement research) — separate engagement.
- **Procreate + paid app licensing model** (per-student vs shared-cart) — closer to August; per-student vs shared-cart to be decided by North Bridge.
- **Ongoing retainer / device lifecycle management** — separate engagement after Phase 1.

---

## 4. Hours & Pricing

| Item | Deliverable | Hours | Rate | Subtotal |
|---|---|---:|---:|---:|
| 1 | Mosyle LS/MS partition | 5 | $125 | $625 |
| 2 | Apple Classroom for MS | 3 | $125 | $375 |
| 3 | Filtering policy + YouTube gating | 4 | $125 | $500 |
| 4 | ASM + Mosyle enrollment cleanup | 4 | $125 | $500 |
| 5 | PM, coordination, handoff doc | 4 | $125 | $500 |
| | **Estimated total** | **20** | | **$2,500** |

- **Rate:** $125/hour
- **Estimated total:** $2,500 (20 hours)
- **Not-to-exceed:** $3,000 (24 hours) — covers modest scope creep; explicit approval required beyond that
- **Time tracking:** Bi-weekly status update with hours-to-date
- **Invoicing:** Monthly, net-15

**Payment terms:**
- 50% deposit ($1,250) due on signature to start work
- 50% ($1,250) on completion of all 4 deliverables + handoff document

---

## 5. Assumptions

- Mosyle **OneK12 tier** subscription is active (green-lit 6/17 by Annie; Frank has admin access).
- **Apple School Manager** access is active (Frank has admin; verified 7/7).
- North Bridge IT (Avram) remains available for any infrastructure-side questions.
- North Bridge provides timely review of the partition, filtering policy, and handoff document (target ≤ 3 business days per review).
- The August iPad rollout is the **target completion deadline**; Phase 1 is sized to complete before then.
- All work performed remotely unless an on-site visit is mutually agreed; on-site time billed at the same rate, with travel billed at cost.

---

## 6. Sign-off

| Role | Name | Signature | Date |
|---|---|---|---|
| **Client (decision-maker)** | Annie Crowder, Head of School | | |
| **Client (coordination lead)** | Erin Minuth Terris, Lower School Head | | |
| **Consultant** | Frank Lucido, Lucido Technology Consulting | | |

---

## 7. Change Control

Any change to scope (additional deliverables, new workstreams, Phase 2 items) requires a written change order signed by both parties before the work begins. Change orders do not invalidate the rest of this SOW.

---

## 8. Termination

Either party may terminate this SOW with 7 days written notice. North Bridge Academy will be invoiced for all work performed to the date of termination, including a pro-rated share of any partially completed deliverables at the consultant's discretion.

---

*Prepared by Frank Lucido, Lucido Technology Consulting. Effective on signature by both parties. Questions: frank.lucido@gmail.com.*

---

## Process Notes (for Frank)

- **Why $125/hr.** Matches the rate locked for the Susan Allen / WFC engagement (Phase 1 floor of $1,000 for 8 hours).
- **Why 20 hours.** Sized for a 3-week remote engagement with a clear handoff. Not-to-exceed at 24 hours covers modest scope creep without needing a change order.
- **Why 50/50 payment.** Standard for small-project fixed-bid work. Deposit protects against scope drift; balance on completion keeps incentive aligned.
- **Why Phase 2 items are out of scope here.** Explicitly per the 7/7 walkthrough decision (do not bundle Google Workspace into Phase 1). Cleaner SOW, easier sign-off, easier Phase 2 add-on.
- **Why the Mac count delta is in the email, not the SOW.** It's a finding (good news — more capacity than we thought), not a scope item.
- **Not-to-exceed buffer.** 4 hours of buffer (20%) gives breathing room for Erin-side delays or surprise cleanup work without forcing a change order.
