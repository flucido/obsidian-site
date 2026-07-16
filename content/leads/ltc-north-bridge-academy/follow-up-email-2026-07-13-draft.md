---
title: "Frank → NBA (Erin + Annie) — 7/7 walkthrough + reconciled inventory + Phase 1 plan (DRAFT 2026-07-13)"
created: 2026-07-13
status: DRAFT — ready for Frank review before send
type: email-draft
tags: [ltc, north-bridge-academy, email-draft, follow-up, post-walkthrough, mosyle, apple-school-manager, phase-1, inventory]
related:
  - "[[leads/ltc-north-bridge-academy/meeting-2026-07-07-erin-mosyle]]"
  - "[[leads/ltc-north-bridge-academy/dossier]]"
  - "[[leads/ltc-north-bridge-academy/inventory-2026-07-09]]"
intent: "Send the post-7/7 walkthrough follow-up to Erin (Lower School Head) and Annie (Head of School) — share the reconciled Mosyle/ASM inventory, propose the 4-step Phase 1 plan, signal that the Phase 1 SOW is forthcoming. Replaces the 7/9 draft that was PARKED per Frank 7/10."
audience:
  - "Erin Minuth Terris (Lower School Head, coordination lead)"
  - "Annie Crowder (Head of School, decision-maker)"
---

# Frank → NBA (Erin + Annie) — Post-7/7 walkthrough follow-up (DRAFT)

## Send channel

- **From:** Frank Lucido <frank.lucido@gmail.com>
- **To:** Erin Minuth Terris <erin@northbridgeacademy.org>
- **Cc:** Annie Crowder <annie@northbridgeacademy.org>
- **Subject:** Following up on Tuesday — reconciled inventory + Phase 1 plan
- **Send via:** Gmail web compose (Google OAuth still revoked; workaround standing)

> **NOTE for Frank before you hit send:**
> 1. Google OAuth still revoked (Day 19+). Send via Gmail web compose in browser, not the API.
> 2. **No Dave CC** — Dave's email is still unknown (his full name + email is a separate open item). Erin and Annie are the right recipients right now; we can add Dave to the thread once we have his address.
> 3. The Phase 1 SOW follows as a separate attachment (also in this drop, drafted at `leads/ltc-north-bridge-academy/sow-phase-1-2026-07-13-draft.md`).
> 4. **Do NOT raise Google Workspace** in this email — explicitly held for Phase 2 per 7/7 decision.
> 5. **Do NOT raise Logitech keyboards** in this email — Phase 2 research, separate thread.

---

## Email body

Hi Erin and Annie,

Thanks again for the time on Tuesday — walking the building with Erin, sitting down at the Mosyle console, and pulling Apple School Manager up alongside it was really helpful. I've had a chance to reconcile the Mosyle inventory against the Apple School Manager device list, and I wanted to share the picture I now have so we can move cleanly into August.

**The reconciled picture**

Pulling Mosyle + Apple School Manager together gives us 148 Apple devices across the school, with the 7/7 walkthrough numbers confirmed and a few new items I want to surface. Here's the breakdown by device type:

| Device | Count | Specs |
|---|---:|---|
| **iPad (9th Generation)** | 62 | 64GB, Space Gray, WiFi-only |
| **iPad (A16)** | 40 | 128GB, Blue, WiFi-only |
| **iPad (older, Hamlin-vintage)** | 20 | 128GB, Gold, WiFi-only (manually added via Apple Configurator) |
| **iPad Air 11-inch (M3)** | 1 | 128GB, Starlight, WiFi-only |
| **MacBook Air 13" (M4, 2025)** | 15 | 256GB, Starlight |
| **MacBook Air (older)** | 1 | 256GB, Silver |
| **Apple TV 4K (3rd gen)** | 9 | 64GB, Black (one is 128GB) |
| **TOTAL** | **148** | |

By family: 123 iPads, 16 Macs, 9 Apple TVs.

**Two things worth flagging now**

- **The Mac count is higher than what we saw Tuesday.** On Tuesday Erin mentioned only 8 Macs in Apple School Manager. The reconciled list now shows 16 — the new MacBook Air M4 (2025) units from the August and November 2025 purchase orders are in the Apple side, but not all of them are showing in Mosyle yet. That's a small cleanup task, but I want it on our radar before the August rollout.
- **27 Apple-purchased devices are not in Mosyle**, and 6 more have no MDM assignment at all. None of these are blocking — they're all working as standalone devices — but for zero-touch deployment to work cleanly for next year, they all need to be in the same MDM.

**Where I'd suggest we focus Phase 1**

Based on what you both shared Tuesday, here's the 4-step path I'd recommend we lock in for Phase 1, in this order:

1. **Reorganize Mosyle by Lower School and Middle School.** Every teacher gets a sensible default for which apps land on which iPads, with the option to personalize later for individual students. Erin — this is the partition you had in mind; I think it's the right one.
2. **Turn on Apple Classroom for middle school.** The live-screen-view piece middle school teachers have been asking for. Pairs with Mosyle for app deployment; gives teachers a single workflow.
3. **Set up a filtering policy that lets teachers control YouTube access per class.** Selective YouTube is genuinely useful in some lessons and genuinely distracting in others. We'd build the policy in Mosyle and let teachers toggle it themselves.
4. **Clean up Apple School Manager so all faculty Macs are enrolled** (and the 27 Apple-purchased-but-not-in-Mosyle devices get enrolled). Small task, big payoff — once it's clean, the August iPad rollout can run on autopilot, and any new device for next school year is zero-touch.

I'd plan to do (1) and (4) in the next couple of weeks. (2) and (3) I'd schedule for week of 7/27 once Erin is back on campus, so we can test the classroom piece in a real classroom with real students before the August push.

**The SOW**

A separate Statement of Work for Phase 1 is attached. Quick summary: 4 deliverables as above, ~20 hours estimated, $125/hr, 50% deposit to start, 50% on completion. Happy to walk through it on a call or trade edits over email — whichever is easier on your end.

**Two small follow-ups I want to flag for later (not this email)**

- The Logitech keyboards — I want to capture which models are currently in use so I can do a quick compatibility check. No purchase commitment; research on my side.
- The Procreate app deployment — whether you'd want it per-student licenses through Apple School Manager, or shared-cart. Closer to August.

Let me know if anything here reads off, or if there's something I should be prioritizing that I'm not seeing yet. I'm also happy to jump on a quick call this week or next to walk through any of it.

Thanks again — looking forward to it.

Frank

---

Frank Lucido
Lucido Technology Consulting
frank.lucido@gmail.com

---

## What this email does

- ✅ **Acknowledges Erin directly** (Lower School Head who set up Mosyle originally from her Hamlin experience) — opens with thanks for her time, not with credentials
- ✅ **Names the reconciled inventory** with counts + specs per device type (concise, one spec per type per Frank's preference)
- ✅ **Surfaces the Mac-count delta** (8 → 16) proactively — the new M4 units are recent purchases, not a fault-finding exercise
- ✅ **Surfaces the 27 Apple-only + 6 NONE-MDM devices** as Phase 1 cleanup, not blockers
- ✅ **Locks Phase 1 in 4 numbered steps** — concrete, sequenced, defensible
- ✅ **References the Phase 1 SOW as a separate attachment** — doesn't bury scope in this email
- ✅ **Acknowledges Erin's on-campus window** (7/27) for the classroom-testing step
- ✅ **Two soft follow-ups** (Logitech keyboards, Procreate deployment) — held to later, not in this email
- ✅ **Peer/consultative tone** — partnership, not pitch
- ✅ **Does NOT raise Google Workspace** — explicitly held for Phase 2 per 7/7 decision
- ✅ **Does NOT raise Logitech keyboards** — held to compatibility research, separate thread

## What still needs Frank's input before send

| Item                                  | Current value                                  | Action |
|---------------------------------------|------------------------------------------------|--------|
| Phase 1 SOW review                    | ~20 hrs × $125 = $2,500. Draft at `sow-phase-1-2026-07-13-draft.md` | Frank to review hours + scope + payment terms before send |
| Subject line                          | "Following up on Tuesday — reconciled inventory + Phase 1 plan" | Confirm or rewrite |
| Mac-count delta framing               | "new M4 units from Aug + Nov 2025 purchases" — accurate, not accusatory | Confirm OK |

## Process items surfaced (no action needed today)

- **Dave's email** — separate open item; once Frank has it, Dave gets added to the thread
- **6/25 Annie meeting notes** — still in Frank's personal notes; not blocking this email
- **Phase 1 SOW** — see `leads/ltc-north-bridge-academy/sow-phase-1-2026-07-13-draft.md`
- **Lead → Contact promotion** — back-burner design item; triggers on Phase 1 SOW send
