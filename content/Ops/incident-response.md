---
title: Incident Response
created: 2026-05-17
updated: 2026-05-17
type: system
tags: [runbook, governance, incident]
---

# Incident Response Protocol

## Incident Classification

### Level 1 — Operational Anomaly
- Stale lead >10 days
- Missing daily note
- Incomplete pipeline update
- Response: Log and correct within same day

### Level 2 — Data Integrity Issue
- Conflicting information in canonical files
- Missing required backlinks
- Template field drift
- Response: Contain, correct source, verify all references within 24h

### Level 3 — Safety/Compliance
- FERPA exposure risk
- Pricing or contract misstatement
- Sensitive data in wrong location
- Response: Immediate stop, escalate to human, do not proceed

## Response Steps

1. **Detect**: Identify the incident (automated check or manual flag)
2. **Contain**: Stop affected workflow, prevent propagation
3. **Assess**: Classify level and impact scope
4. **Correct**: Fix root cause in source files
5. **Verify**: Confirm fix resolves all linked artifacts
6. **Log**: Full entry in [[issues-fixes-log]]
7. **Prevent**: Update relevant runbook or template

## Log Entry Format

```markdown
## [YYYY-MM-DD] Incident: [Level] [Summary]
- Detected: [how]
- Impact: [scope]
- Root cause: [what failed]
- Fix: [what changed]
- Prevention: [what runbook/template was updated]
```

## References
- [[incident-response]] (this file)
- [[escalation-rules]]
- [[issues-fixes-log]]
