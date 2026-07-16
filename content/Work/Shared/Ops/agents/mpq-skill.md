---
title: Skill — Master Priority Queue
created: 2026-07-10
updated: 2026-07-10
type: skill
tags: [shared, agents, skill, mpq, priorities]
loads_by: orchestrator
---

# Skill: Master Priority Queue (MPQ)

> Rebuild the cross-org Master Priority Queue. The MPQ ranks every active item
> across both orgs using urgency × impact, with explicit owner + due date.

## When to Use

- MPQ is ≥ 7 days stale (e.g., current state: 29d stale as of 7/9)
- Major stage movement (signed engagement, lost lead, new green-lit work)
- Weekly cadence (Friday rebuild recommended)
- Frank asks for a priority reset

## Inputs

- `Work/LTC/pipeline.md`, `Work/WFC/pipeline.md`
- `Work/LTC/follow-up-queue.md`, `Work/WFC/follow-up-queue.md`
- `Work/Shared/leads-dashboard.md`
- `MEMORY.md` (latest decisions, risk register)
- All `Work/Shared/Ops/morning-standup.md` (current week)

## Output

Rebuilt `Work/Shared/master-priority-queue.md` with:
- Top Priorities table (rank, org, item, urgency, impact, owner, due)
- In Progress table (started items with status + blocker)
- Upcoming (next 7 days) — table with dependencies
- Completed (since last rebuild) — table with notes
- Weekly Completion Rate — table with planned vs. done
- Revenue Triage Summary — per-org snapshot

## Ranking Method (Urgency × Impact)

```
        IMPACT →
        LOW           MEDIUM          HIGH
URGENCY
HIGH      Watch        Soon-now        Drop-everything
MEDIUM    Backlog      Soon            Top priority
LOW       Backlog      Watch           Soon-now
```

Mapping:
- **Drop-everything** → rank 1-2 (today)
- **Top priority** → rank 3-5 (this week)
- **Soon-now** → rank 6-10 (this week)
- **Soon** → rank 11+ (next week)
- **Watch** → not in MPQ top, carry in risk register
- **Backlog** → capture in a `backlog` section (no fixed date)

## Process

### Step 1: Inventory (5 min)
- [ ] Pull all open items from LTC pipeline + WFC pipeline
- [ ] Pull all open items from per-org follow-up queue
- [ ] Pull all open items from MPQ "Upcoming" not yet started
- [ ] Pull all open loops from latest daily note's EOD state transfer

### Step 2: Score (10 min)
- [ ] For each item: assign Urgency (LOW/MEDIUM/HIGH)
  - HIGH = overdue, blocking, or imminent deadline (≤ 3 days)
  - MEDIUM = this week, no blocker
  - LOW = this month or later
- [ ] For each item: assign Impact (LOW/MEDIUM/HIGH)
  - HIGH = revenue at risk, strategic positioning, client-blocking
  - MEDIUM = process improvement, content compounding
  - LOW = hygiene, nice-to-have
- [ ] Rank on combined score (urgency × impact)

### Step 3: Owner + Due Date (5 min)
- [ ] Every item gets explicit owner (Human, Orchestrator, Specialist, Lauren, etc.)
- [ ] Every item gets due date (concrete, not "soon")
- [ ] Every item gets blocker column (if any)

### Step 4: Tables (10 min)

Build the four MPQ tables + revenue summary. See Output section above.

### Step 5: Archive completed (3 min)
- [ ] Move completed items from last MPQ → Completed table
- [ ] Note outcome for each (1-line)
- [ ] Update Weekly Completion Rate (planned vs. done)

### Step 6: Frontmatter + Log (2 min)
- [ ] Update `master-priority-queue.md` frontmatter (`updated:`)
- [ ] Append to `log.md` ("rebuild master-priority-queue.md — N items, M completed")

## Validation Rules

1. **Every Top Priority has owner + due date** — no "TBD" in the top 10.
2. **Overdue items surface explicitly** — add a `STATUS: ⚠ OVERDUE` marker.
3. **Completed items have evidence** — file path or one-line outcome.
4. **No ghost items** — every item traces to a vault artifact (pipeline, dossier, follow-up queue, daily note).
5. **Stale items get a "carry" history** — if rebuilt and not advanced, note why.

## Revenue Triage Summary (Required Section)

For each org:
- Total leads
- Active / fresh / sent / hold / blocked / networking counts
- Pipeline value
- Revenue collected

For combined:
- Total leads
- Total active
- Total pipeline value
- Total collected

## Common Failures to Avoid

- **Stale items silently carried** — every "carried from last MPQ" item gets
  a note: "still blocked on X" or "moved to rank N because Y."
- **Missing owner** — "we" or "team" is not an owner. Use a name or role.
- **Indefinite due dates** — "soon" or "next week" without a calendar date.
- **Skipping the Revenue Triage Summary** — it's the executive snapshot.
- **No "completed" archive** — the rebuild must reflect what shipped.

## Example Output Skeleton

```markdown
# Master Priority Queue

> Last rebuilt: 2026-MM-DD (previous version frozen at 2026-MM-DD — Nd stale)

## Top Priorities (This Week — Week NN)

| Rank | Org | Item | Urgency | Impact | Owner | Due |
|------|-----|------|---------|--------|-------|-----|
| 1 | LTC | ... | HIGH | HIGH | Frank | 2026-MM-DD |
...

## In Progress
...

## Upcoming (Next 7 Days)
...

## Completed (Since Last Rebuild)
...

## Weekly Completion Rate
| Week | Planned | Completed | Rate |
|------|---------|-----------|------|
| 2026-W27 | 8 | 6 | 75% |
...

## Revenue Triage Summary
| Org | Total | Active | Pipeline Value | Collected |
|-----|-------|--------|----------------|-----------|
| LTC | 9 | 5 | $65–100K | $0 |
| WFC | 3 | 2 | $1,000 | $0 |
| **Combined** | **12** | **7** | **$66–104K** | **$0** |
```
