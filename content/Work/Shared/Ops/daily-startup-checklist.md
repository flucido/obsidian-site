---
title: Daily Startup Checklist
created: 2026-05-17
updated: 2026-05-17
type: system
tags: [runbook, daily, startup]
---

# Daily Startup Checklist

> Run this at the start of every business day (approx. 30-45 min)

## Step 1: Load State (5 min)
- [ ] Read [[MEMORY]] — capture active priorities and open loops
- [ ] Read [[USER]] — refresh communication constraints
- [ ] Read yesterday's [[Daily/]] note — review state transfer
- [ ] Read [[master-priority-queue]] — capture cross-org priorities
- [ ] Read [[leads-dashboard]] — pipeline health snapshot

## Step 2: Pull Open Items (5 min)
- [ ] Extract open loops for LTC from [[LTC Pipeline]] and memory
- [ ] Extract open loops for WFC from [[WFC Pipeline]] and memory
- [ ] Check due dates and escalate overdue items

## Step 3: Run Morning Stand-up (5 min)
- [ ] Populate [[morning-standup]] dashboard
- [ ] Re-rank priorities using urgency-impact matrix
- [ ] Top 3 outcomes per organization
- [ ] Identify dependencies and blockers
- [ ] Set today's time blocks

## Step 4: Initialize Daily Note (5 min)
- [ ] Create [[Daily/YYYY-MM-DD]] from 5-question sprint template ([[Work/Shared/Ops/templates/daily-note]])
- [ ] Populate §1 (yesterday) + §2 (today) + §3 (still to do) + §4 (blockers) + §5 (additional notes)
- [ ] Cross-link to [[master-priority-queue]] and per-org follow-up queues for full loop detail — do NOT duplicate them
- [ ] EOD state transfer goes to [[evening-reflection]], NOT this file

## Step 5: Publish (5 min)
- [ ] Update [[MEMORY]] Today section
- [ ] Confirm all backlinks resolve
- [ ] Log startup completion in daily note

## Step 6: Email Morning Briefing (2 min)
- [ ] Send full daily note to frank.lucido@gmail.com via Gmail API
- [ ] Subject: "Morning Briefing — [WEEKDAY] [M/D]"
- [ ] Body: full daily note content (plain text)

## References
- [[daily-startup-checklist]] (this file)
- [[daily-shutdown-checklist]]
- [[escalation-rules]]
