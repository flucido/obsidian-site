---
title: Leads Dashboard
created: 2026-05-18
updated: 2026-05-19
type: dashboard
tags: [dashboard, leads, pipeline, wfc, ltc]
---

# Leads Dashboard

> Real-time view across all outbound and inbound leads.
> All tables auto-populate from dossier frontmatter. Add a new dossier and it appears here instantly.

---

## Pipeline Summary

```dataview
TABLE length(rows) AS "Leads"
FROM "leads"
WHERE type = "dossier"
GROUP BY status
SORT status
```

---

## All Active Leads — Auto-Ranked

```dataview
TABLE WITHOUT ID
  link(file.path, name) AS "Lead",
  org AS "Org",
  default(credential, default(district, "—")) AS "Identity",
  default(platform, "—") AS "Platform",
  default(score, "—") AS "Score",
  default(confidence, "—") AS "Confidence",
  status AS "Status"
FROM "leads"
WHERE type = "dossier"
SORT default(score, 0) DESC, confidence DESC
```

---

## Outreach-Ready (Approved)

```dataview
TABLE WITHOUT ID
  link(file.path, title) AS "Lead",
  org AS "Org",
  default(credential, district) AS "Identity",
  default(platform, "—") AS "Platform",
  default(score, "—") AS "Score"
FROM "leads"
WHERE type = "dossier" AND status = "approved"
SORT default(score, 0) DESC
```

---

## Platform Distribution (WFC Leads)

```dataview
TABLE
  length(rows) AS "Count",
  join(map(rows, (r) => link(r.file.path, r.title)), ", ") AS "Leads"
FROM "leads"
WHERE type = "dossier" AND org = "WFC"
GROUP BY platform
SORT length(rows) DESC
```

---

## Pipeline by Stage

```dataview
TABLE
  length(rows) AS "Count",
  join(map(rows, (r) => link(r.file.path, r.title)), ", ") AS "Leads"
FROM "leads"
WHERE type = "dossier"
GROUP BY status
SORT status
```

---

## WFC vs LTC Split

```dataview
TABLE
  length(rows) AS "Total",
  length(filter(rows, (r) => r.status = "approved")) AS "Approved",
  length(filter(rows, (r) => r.status = "review")) AS "Review",
  length(filter(rows, (r) => r.status = "verified")) AS "Verified"
FROM "leads"
WHERE type = "dossier"
GROUP BY org
```

---

## Verification Health

| Metric | Value |
|--------|-------|
| Total dossiers | $= dv.pages('"leads"').where(p => p.type === "dossier").length |
| Approved leads | $= dv.pages('"leads"').where(p => p.type === "dossier" && p.status === "approved").length |
| Under review | $= dv.pages('"leads"').where(p => p.type === "dossier" && p.status === "review").length |
| Verified (not yet reviewed) | $= dv.pages('"leads"').where(p => p.type === "dossier" && p.status === "verified").length |

---

## Gap Analysis

| Vertical             | Target | Current | Gap |
| -------------------- | ------ | ------- | --- |
| PsyD                 | 5      | $= dv.pages('"leads"').where(p => p.type === "dossier" && p.org === "WFC" && (p.credential?.includes("PsyD"))).length | — |
| MFT                  | 5      | $= dv.pages('"leads"').where(p => p.type === "dossier" && p.org === "WFC" && (p.credential?.includes("MFT") || p.credential?.includes("LMFT"))).length | — |
| LCSW                 | 5      | $= dv.pages('"leads"').where(p => p.type === "dossier" && p.org === "WFC" && p.credential?.includes("LCSW")).length | — |
| Learning Specialists | 5      | 0       | -5  |

---

## KPI Targets

| Metric | Current | Target |
|--------|---------|--------|
| Consult Requests (weekly) | 0 | >= 5 |
| Verified Leads (active) | $= dv.pages('"leads"').where(p => p.type === "dossier" && p.status != null).length | >= 10 |
| Consult-to-Proposal Ratio | N/A | >= 40% |
| Outreach Response Rate | N/A | >= 15% |
| Build Cycle Time (days) | N/A | <= 14 |
| Support Retention Rate | N/A | >= 85% |
