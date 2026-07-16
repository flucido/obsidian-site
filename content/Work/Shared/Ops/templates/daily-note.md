---
title: Daily Note Template (5-Question Sprint)
created: 2026-05-17
updated: 2026-07-16
type: template
tags: [template, daily, sprint]
sprint_format: 5-question
replaces: 6-section format (Executive Snapshot / Inbox / Top 3 / LTC Ops / WFC Ops / Shared Admin)
---

# Daily Sprint — {{date}} ({{WEEKDAY}})

> **State source:** `Work/Shared/Ops/evening-reflection.md` (yesterday's entry) + `MEMORY.md` (active state) + `log.md` (yesterday's file changes).
>
> **EOD state transfer lives in `Work/Shared/Ops/evening-reflection.md`, NOT in this file.** This file is the morning sprint only (~50 lines target). Full loop detail lives in [[master-priority-queue]] + per-org follow-up queues + lead dossiers.

## 1. What did we do yesterday?

5-7 bullets max. Pull from yesterday's `evening-reflection.md` "What Shipped" + "Key Decisions". New project threads opened. State changes (resolutions, drops, sign-offs). Cron recovery notes. **If yesterday's reflection was empty, backfill from `log.md` and any verbal briefs before generating today's.**

## 2. What's on tap for today?

Priority-ordered list with severity emoji. Time block inline (or "evening" / "this week" if non-urgent).

- 🔴 CRITICAL / blocking
- 🟡 MEDIUM / important
- 🟢 LOW / nice-to-have
- ⚪ Back-burner / when-time-allows

**This section IS the priority list.** Do not duplicate it in a separate "Recommended Actions" block.

## 3. What do we still have to do?

Compact list of carrying-forward items, grouped by org. Cross-link to [[master-priority-queue]] for full detail (owner / due / status / age). Do NOT duplicate the 30+ row open-loops table here.

Format: 2-4 lines per org. Owner + due date inline. **Compact by design.**

## 4. What are the blockers?

HIGH + CRITICAL only. One line per item. Each item names: (a) what's blocked, (b) the single move that unblocks, (c) the consequence of not unblocking.

## 5. Additional notes

Catch-all for non-blocking context: state corrections, Frank-only decisions in flight, new project threads, observation patterns, anything Frank should know but that doesn't fit §1-§4. 5-10 bullets max.

---

## Notes on Format

- **Target: 50 lines per daily note.** If you're at 100+, you're duplicating state that lives in MPQ / pipelines / follow-up queues / lead dossiers.
- **Severity emojis are mandatory** in §2 and §4 — they're how Frank scans for what matters.
- **No EOD section.** EOD state transfer goes to `Work/Shared/Ops/evening-reflection.md` per the [[evening-reflection-skill]] process. Tomorrow's §1 pulls from there.
- **Daily note is the sprint view**, not the task database. The task database is [[master-priority-queue]] + [[Work/LTC/follow-up-queue]] + [[Work/WFC/follow-up-queue]] + per-lead dossiers.
- **Mid-day updates** (if Frank gives a verbal mid-day) append to the relevant section, not as a separate block. Use strikethrough for resolved items.
