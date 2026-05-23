---
title: Issues and Fixes Log
created: 2026-05-17
updated: 2026-05-17
type: system
tags: [log, issues, fixes]
---

# Issues and Fixes Log

> Append-only log of errors, bugs, prompt corrections, and incident reports.
> Format: `## [YYYY-MM-DD] [Severity] Summary`

## 2026-05-17 Info | Log initialized
- Initial vault setup complete. No issues to report.

## 2026-05-22 Level 2 | Greene + Patel deadline failure — human review gate blocked
- **Detected:** EOD shutdown cross-check. Greene + Patel outreach drafts drafted 5/16, were Day 6 as of EOD 5/22 with 5/23 deadline.
- **Impact:** 2 of 5 approved WFC leads cannot send on deadline. Drafts will be 7 days old by 5/23 — must re-audit target websites before any send, as website state may have changed since 5/16. Pipeline remains at zero sends. $87,500 WFC pipeline is entirely hypothetical until gate 1 clears.
- **Root cause:** Human review bottleneck. 29 items (9 drafts + 20 dossiers) are queued behind a single human gate that has not moved since 5/16. Escalation was posted in daily note + evening reflection but no action resulted.
- **Fix:** MEMORY.md escalated to CRITICAL. Re-audit rule codified: any draft > 7 days old before sending requires website re-audit and email confirmation. Tomorrow (5/23) is the trigger.
- **Prevention:** Draft staleness rule now in MEMORY under Latest Decisions. Evening reflection shutdown checklist now includes escalation verification as explicit step.

## 2026-05-22 Level 2 | Daily note open loops table had stale status for SCCOE + Alum Rock
- **Detected:** Delivery review block. Cross-referenced filesystem — draft files existed but daily note listed L3 and L4 as "new (template ready)."
- **Impact:** Pipeline status was misleading — made it look like LTC was further behind than it was. Risk of duplicated work.
- **Root cause:** Open loops table not updated after draft creation earlier in the same session. Drafts were created, then the daily note's open loops table was written before the status was advanced.
- **Fix:** Corrected L3 and L4 to DONE with wiki links in daily note. Also corrected LTC pipeline follow-up queue — both had been showing "pending" when drafts existed.
- **Prevention:** Added step to delivery review: cross-reference filesystem before marking status. Captured in learnings section of evening reflection.
