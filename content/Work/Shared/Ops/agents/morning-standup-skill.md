---
title: Skill — Morning Stand-up
created: 2026-07-10
updated: 2026-07-10
type: skill
tags: [shared, agents, skill, daily, morning]
loads_by: orchestrator
---

# Skill: Morning Stand-up

> Generate today's daily note, populate the morning-standup dashboard, and produce
> a morning briefing email (or in-session summary if email is unavailable).

## When to Use

Every business day, at the start of the session.

## Inputs (Read in Order)

1. `MEMORY.md` — active state, latest decisions, risk register
2. `USER.md` — communication preferences + constraints
3. **Yesterday's daily note** — most recent `Daily/YYYY-MM-DD.md` (check for backfill)
4. `Work/Shared/master-priority-queue.md` — cross-org priorities
5. `Work/Shared/leads-dashboard.md` — pipeline health snapshot
6. `Work/LTC/pipeline.md`, `Work/WFC/pipeline.md` — per-org truth
7. `Work/Shared/Ops/evening-reflection.md` (last entry) — yesterday's state transfer

## Outputs

- New `Daily/YYYY-MM-DD.md` (from `Work/Shared/Ops/templates/daily-note.md` template)
- Updated `Work/Shared/Ops/morning-standup.md` (today's priorities table)
- Morning briefing (in-session summary; email if Gmail available)

## Process

### Step 1: State carry (5 min)
- [ ] Read MEMORY.md → capture active priorities and open loops
- [ ] Read yesterday's EOD state transfer → capture carry-forward
- [ ] Read MPQ → capture cross-org priority
- [ ] Read both pipelines → capture stage movement since last note

### Step 2: Pull open items (5 min)
- [ ] Extract open loops for LTC from pipeline + memory
- [ ] Extract open loops for WFC from pipeline + memory
- [ ] Check due dates and flag anything ≥ 7d stale as MEDIUM, ≥ 14d as HIGH

### Step 3: Run standup (5 min)
- [ ] Populate `morning-standup.md` (top 3 per org, time blocks, calendar)
- [ ] Re-rank using urgency-impact matrix
- [ ] Identify dependencies and blockers
- [ ] Set today's time blocks

### Step 4: Initialize daily note (5 min)
- [ ] Create `Daily/YYYY-MM-DD.md` from `Work/Shared/Ops/templates/daily-note.md` (5-question sprint)
- [ ] Populate §1 "What did we do yesterday?" — 5-7 bullets from `evening-reflection.md` + `log.md`
- [ ] Populate §2 "What's on tap for today?" — priority-ordered list with severity emojis (🔴/🟡/🟢/⚪)
- [ ] Populate §3 "What do we still have to do?" — compact list, cross-link to MPQ for full loop detail
- [ ] Populate §4 "What are the blockers?" — HIGH + CRITICAL only
- [ ] Populate §5 "Additional notes" — catch-all, 5-10 bullets max
- [ ] Target: ~50 lines. Do NOT duplicate MPQ, pipelines, or follow-up queues in the daily note.

### Step 5: Sync state (2 min)
- [ ] Update MEMORY.md (bump date, refresh "Current State" if anything moved)
- [ ] Append to `log.md` ("create Daily/YYYY-MM-DD.md" + brief summary)

### Step 6: Publish briefing (2 min)
- [ ] If Gmail API available: send morning briefing to frank.lucido@gmail.com
  - Subject: `Morning Briefing — [WEEKDAY] [M/D]`
  - Body: full daily note (plain text)
- [ ] If Gmail blocked (OAuth revoked, etc.): present in-session, note the block
  in `Daily/YYYY-MM-DD.md` §5 Additional notes

## Validation

- [ ] Daily note has all 5 question sections populated (§1 yesterday / §2 today / §3 still to do / §4 blockers / §5 additional notes)
- [ ] All open loops have owner + due date
- [ ] All risk flags have severity + first-seen
- [ ] `MEMORY.md` date bumped
- [ ] `log.md` updated

## Voice

Concise. Action-first. KPI-aware. Lead with decisions and outcomes. No filler.
If something is stale and Frank hasn't asked, surface it as a risk flag — don't
silently carry it forward.

## Common Failures to Avoid

- **Silent staleness** — if MPQ is 29d stale (current state!), flag in daily note.
- **Re-generating from yesterday** — copy structure but update state. Never copy text.
- **Skipping the backfill protocol** — if yesterday's note is empty, backfill from
  Frank's verbal brief before generating today's.
- **Forgetting where EOD lives** — EOD state transfer goes to `evening-reflection.md`, NOT the daily note. The daily note is a morning sprint, full stop.
