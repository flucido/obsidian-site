---
title: Escalation Rules
created: 2026-05-17
updated: 2026-05-17
type: system
tags: [runbook, governance, escalation]
---

# Escalation Rules

## When to Escalate

### Automatic Escalation (No Judgment Call)
- Missing data prevents action on a deadline-bound item
- Contradictory information between two canonical sources
- FERPA-sensitive data encountered without handling protocol
- Outbound communication would include pricing or legal terms

### Judgment Escalation (Assess First)
- Lead has been stale >7 days with no follow-up
- Project milestone missed by >3 days
- Client communication received with ambiguous intent
- Risk score on active project exceeds threshold

## Escalation Path

1. Flag item in daily note with `ESCALATION` tag
2. Document: what triggered it, what's needed, why now
3. Route to human review with clear ask
4. Record in [[issues-fixes-log]]
5. Do NOT proceed until resolved

## Non-Escalation
- Routine lead triage and pipeline updates
- Status note drafting (internal only)
- Content asset creation and template work
- Standard daily operations within SLA

## References
- [[escalation-rules]] (this file)
- [[incident-response]]
- [[governance-safety-controls]]
