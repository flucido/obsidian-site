---
title: Recommendations — LangChain Full vs Solo-Practitioner MVP
created: 2026-07-13
updated: 2026-07-13 10:45
type: recommendations
tags: [research, agents, observability, traces, recommendations, scoping]
---

# Recommendations — What LangChain Built vs What Frank Could Build

> Reframed 7/13 10:45 PT to match the standalone development idea scope.
> The original 7/13 10:06 PT version was Mavis-team-integration focused.
> This version compares the full LangChain scope to a scoped-down solo
> build. See [[PRD-outline]] for the canonical product requirements.

## TL;DR

LangChain built:
- **LangSmith** — a commercial observability platform with span trees, dashboards, eval framework, datasets, experiments, team features.
- **LangSmith Engine** — an agent that sits on top of LangSmith, finds recurring failures, proposes fixes.
- **Trace Judge** — a fine-tuned Qwen-7B (with Fireworks) that labels traces 100× cheaper than frontier models.

A solo practitioner can build a **scoped-down version** of all three in
4-6 weeks. The pattern is portable. The full commercial product is not.

## What LangChain has that the MVP does not

| Capability | LangChain | Solo MVP | Defer to |
|------------|-----------|----------|----------|
| Span tree capture | OTel GenAI exporter + SDK | Python decorator SDK | v2 |
| Multi-language SDK | Python + TypeScript + JS | Python only | v2 |
| Storage | Cloud (Postgres + S3) | Local (Parquet + SQLite) | v2 |
| UI | Full web app | CLI + Markdown | v2 |
| Eval signals | Many, configurable | 1 to start (`task_success`) | v2 |
| Judge model | Qwen fine-tune, 100× cheaper | Same, single signal | v2 |
| Mining | LLM pass for suggested_fix | Trajectory clustering only | v2 |
| Experiments | One-click A/B with stats | Manual CLI runner | v2 |
| Cost dashboard | Full per-team / per-model | Per-day roll-up | v2 |
| Real-time streaming | Yes | No (daily batch) | v2 |
| Multi-tenant | Yes | No (single user) | v3 |
| Team features | Yes | No | v3 |
| SOC 2 / compliance | Yes | No | Out of scope |

## What the MVP MUST have (the v1 bar)

1. **Span tree capture** — Python decorator SDK, OTel-compatible schema.
2. **Storage** — Parquet (traces) + SQLite (eval signals), local.
3. **Query CLI** — `trace list / show / stats / report / patterns / eval / compare`.
4. **Daily mining** — trajectory clustering + frequency × severity scoring, no LLM pass.
5. **One judge model** — fine-tuned Qwen-class for `task_success` signal.
6. **Daily report** — Markdown report in `reports/<date>-mining.md`.

If v1 can't deliver these six, the project is too ambitious. If it can, the
rest is incremental.

## What the MVP EXPLICITLY does not have (v1 scope cuts)

- No web UI. CLI + Markdown.
- No multi-language SDK. Python only.
- No real-time. Daily batch.
- No team features. Single user.
- No LLM pass in mining. (Save $5-20/day. Add in v2.)
- No multi-tenant.
- No compliance.
- No mobile.

## The 4-6 week build plan (solo, ~80 hours)

### Week 1 — SDK
- Python decorator library.
- Span tree assembly.
- Async flush with bounded buffer.
- Parquet writer.
- **Milestone:** `morning-routine` agent produces traces end-to-end.

### Week 2 — Storage + query CLI
- Parquet reader.
- SQLite schema for eval signals.
- `trace list / show / stats` CLI.
- Basic filtering and aggregation.
- **Milestone:** can answer "what did the agent do yesterday?" from the CLI.

### Week 3 — Mining
- Trajectory clustering (sequence of span_type + name + status).
- Frequency × severity scoring.
- Pattern cache.
- `trace patterns` CLI.
- **Milestone:** daily report surfaces top 3 patterns with sample trace IDs.

### Week 4 — Judge model
- Define `task_success` signal spec.
- Hand-label 200-500 morning-routine traces.
- Fine-tune Qwen-7B (or pick a base model).
- Validate on held-out set.
- **Milestone:** judge model runs on every new trace, agreement score reported.

### Week 5-6 — Polish + 4-week checkpoint
- Daily mining report generator.
- Cost tracking per trace.
- Documentation.
- 4-week checkpoint: is the loop paying off? Decide (a/b/c/d) on next phase.

## What the MVP proves (the validation criteria)

After 4 weeks, the MVP is paying off if:
- **V1:** Daily mining surfaces at least one pattern Frank would not have seen manually.
- **V2:** The judge model labels with 90%+ agreement vs Frank's hand-labels.
- **V3:** Frank can answer "is the agent better than last week?" with data.
- **V4:** Frank can run an A/B test (change prompt → measure eval signal → decide) in under 30 minutes.

If 3 of 4 are true: continue to v2.
If 2 of 4 are true: iterate, don't expand scope.
If 1 or 0 are true: drop to defer (option c).

## The skills Frank needs to ship v1

- **Python SDK development** — 5+ years experience equivalent. (Frank has this.)
- **DuckDB / Parquet / SQLite** — basic data engineering. (Frank has this via local-data-stack.)
- **LLM fine-tuning** — has done LoRA fine-tunes for the LFED project. (Frank has this.)
- **Async Python / decorators / context managers** — standard. (Frank has this.)
- **CLI design** — basic. (Frank has this via the Mavis team's CLI tools.)

**Frank has all the skills.** The MVP is buildable.

## What the MVP does NOT require

- Cloud infrastructure (local-first).
- Database admin (SQLite is a file).
- Frontend / UI work (CLI + Markdown).
- Multi-tenant security (single user).
- Compliance certifications.

## What v2 would add (3 months after MVP)

- Web UI for trace browser.
- OTel GenAI exporter (interoperate with LangChain / LangGraph / etc.).
- More eval signals (perceived_error, format_compliance, cost_ceiling).
- LLM pass in mining (suggested_fix).
- Experiment runner (one-click A/B).
- Cost dashboard.

## What v3 would add (6+ months, real product)

- Multi-tenant.
- Team features.
- RBAC.
- SOC 2 / compliance.
- Self-hostable Docker image.
- Real-time streaming.

## Risks specific to the MVP

- **R-MVP-1:** Span volume is low (~10-100/day). Mining won't have enough data to surface patterns. Mitigation: start with a more frequent agent, or backfill synthetic traces.
- **R-MVP-2:** Fine-tuned judge model doesn't reach 90% agreement. Mitigation: more labeled data, or accept lower threshold for v1.
- **R-MVP-3:** 4-6 weeks is realistic only if Frank has 10-15 hours/week. Mitigation: scope cuts further if needed.
- **R-MVP-4:** The mining clusters produce too many false patterns. Mitigation: tune thresholds, add a "dismiss" action, retire dismissed patterns.

## Comparison: Mavis team integration vs standalone

| | Mavis team integration | Standalone MVP |
|---|------------------------|-----------------|
| Trace schema | Tied to Mavis role contracts | OTel-compatible, agent-agnostic |
| Storage | Local vault files | Parquet + SQLite (separate from vault) |
| Observability | morning-standup.md | CLI + Markdown report |
| Mining | Manual, by Frank | Automated, by platform |
| Cost | $0 (uses existing vault) | $0-20/day (LLM pass + judge model) |
| Build time | 2-3 hours (recommendation 1 of original 03-recommendations) | 4-6 weeks |
| Value to Frank | Closes loop on existing team | Reusable tool across all his projects |

These are NOT mutually exclusive. Frank could ship both: the Mavis team
integration as a 2-hour quick win, and the standalone MVP as a 4-6 week
side project. But the standalone is the bigger bet.

## My recommendation (re-anchored to Frank's reframe)

**Read [[PRD-outline]] end to end (~20 min).** Then decide:

- **(a) Build full** — 6-12 months, multi-engineer, probably a real company. Not now.
- **(b) Build MVP** — 4-6 weeks, solo. Validates the pattern. **My recommendation if Frank has the time.**
- **(c) Defer** — bookmark, come back in Q4 2026 or 2027. **My recommendation if Frank is bandwidth-constrained this quarter.**
- **(d) Skip** — drop. **My recommendation only if MVP is impossible for skills / cost reasons, which it isn't.**

Default if no decision: **(c) defer.** The article is interesting but the
work is a lot. Defer = bookmark + revisit in 90 days.

*Last updated: 2026-07-13 10:45 PT*
