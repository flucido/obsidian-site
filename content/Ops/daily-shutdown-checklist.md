---
title: Daily Shutdown Checklist
created: 2026-05-17
updated: 2026-05-17
type: system
tags: [runbook, daily, shutdown]
---

# Daily Shutdown Checklist

> Run this at the end of every business day (approx. 20-30 min)

## Step 1: Reconcile (5 min)
- [ ] Compare completed vs. planned actions from today's daily note
- [ ] Mark completed items
- [ ] Note items started but not finished

## Step 2: Run Evening Reflection (5 min)
- [ ] Populate [[evening-reflection]] dashboard
- [ ] Log what shipped, what slipped
- [ ] Record wins and learnings
- [ ] Update pipeline movement

## Step 3: Roll Forward (5 min)
- [ ] For every incomplete item: assign explicit owner and next action
- [ ] Set or update due dates
- [ ] Add to tomorrow's priority candidate list
- [ ] Set tomorrow's first attention items in evening reflection

## Step 4: Write State Transfer (10 min)
- [ ] Summarize key decisions made today
- [ ] List critical open loops with context
- [ ] Flag anything requiring next-day first attention
- [ ] Note any corrections to agent prompts or behavior

## Step 5: Sync State (5 min)
- [ ] Update [[MEMORY]] with current open loops
- [ ] Append to [[issues-fixes-log]] if any errors encountered
- [ ] Verify all daily note sections complete
- [ ] Confirm End-of-Day State Transfer section is populated

## Step 6: Close (2 min)
- [ ] Log shutdown completion
- [ ] Preview tomorrow's top 3 outcomes

## References
- [[daily-shutdown-checklist]] (this file)
- [[daily-startup-checklist]]
- [[incident-response]]
