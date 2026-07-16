---
title: Current State Audit — Mavis Team Tracing
created: 2026-07-13
updated: 2026-07-13 10:06
type: audit
tags: [research, agents, observability, traces, mavis, current-state]
---

# Current State Audit — How the Mavis Team Captures Traces Today

> Honest gap analysis: where the Mavis team actually is on tracing,
> observability, and mining. Anchored to the article's framework.

## TL;DR

The Mavis team captures ~80% of the *content* of traces (file paths, file
deltas, decisions made, items opened/closed) but captures ~10% of the
*structure* (no machine-parseable schema, no time-series, no per-action
attribution beyond free text). Observability is zero. Mining is fully
manual, run by Frank + orchestrator at morning startup. The improvement
loop is "open" — feedback from yesterday doesn't systematically feed
back into today's role contracts.

## The trace substrate that exists today

| Substrate | Path | Format | Auto-gen? | Mineable? |
|-----------|------|--------|-----------|-----------|
| **Wiki log** | `log.md` | Append-only markdown | Yes (by orchestrator) | ❌ Prose; needs parsing |
| **Issues-fixes log** | `Work/Shared/Ops/issues-fixes-log.md` | Append-only markdown | Mixed | ❌ Prose |
| **Daily notes** | `Daily/<date>.md` | Template (template.md) | Yes (cron + manual) | ⚠️ Structured sections, prose body |
| **MEMORY.md** | `MEMORY.md` | Curation; updated by orchestrator | Yes | ⚠️ Top-level structured, body prose |
| **Follow-up queues** | `Work/LTC/follow-up-queue.md`, `Work/WFC/follow-up-queue.md` | Table | Yes | ✅ Tables, easily mined |
| **Weekly plans** | `Work/LTC/weekly-plan.md`, `Work/WFC/weekly-plan.md` | Template + table | Yes | ✅ Tables |
| **Morning-standup dashboard** | `Work/Shared/Ops/morning-standup.md` | Tables | Yes (cron) | ✅ Tables |
| **Evening reflection** | `Work/Shared/Ops/evening-reflection.md` | Long-form sections | Yes (cron) | ⚠️ Structured sections, prose body |
| **State transfer (EOD)** | In daily note, "End-of-Day State Transfer" section | Template | Yes (cron) | ⚠️ Structured |
| **Agent team docs** | `Work/Shared/Ops/agents/*.md` | Free-form role contracts + skills | Manual (orchestrator writes) | ✅ Static reference |

## What the Mavis team captures WELL (the 80%)

- **Decisions and their rationale** — every daily note EOD has a "Key Decisions" section with context, options considered, rationale. Excellent.
- **File paths touched** — log.md entries are path-centric. Every action records what files changed.
- **Open loops** — every daily note + weekly plan has an Open Loops table. These are essentially the "stale work" signal.
- **Stale item signal** — duration of staleness is tracked (e.g., "30+ days stale"). This is a real failure-pattern signal.
- **Human-in-the-loop blocking** — items awaiting Frank's review / disambiguation / sign-off are tracked. This is the "bottleneck" signal.
- **Governance violations** — incidents get logged to issues-fixes-log with severity, cause, prevention. (E.g., I-2026-07-10-A: cron missed, I-2026-07-10-C: 3-copies-of-email.)

## What the Mavis team is BLIND to (the 20% that's missing)

### 1. Per-action attribution
Today, every entry in log.md says "the orchestrator did X" or just describes the action. There's no per-agent breakdown of:
- Which specialist did what
- How long each action took
- Which actions succeeded vs failed vs needed Frank's review
- Token cost per action (zero tracking)

### 2. Time-series data
Daily notes are point-in-time snapshots. There's no time-series view of:
- "How many follow-up items has the WFC pipeline moved this week?"
- "How long is the average open-loop lifetime, by org?"
- "What's the trend on overdue items over the last 30 days?"

The data is captured in tables but not aggregated. A 45-min "stats roll-up" by the orchestrator at EOD could expose trends that are currently invisible.

### 3. Failure-pattern clustering
The Mavis team has 2 documented incidents in 4 days (7/10 cron miss, 7/10 3-copies email). Both were logged. Neither was *analyzed* for pattern. Are these two of two, or two of twenty? Without a frequency view, we can't tell.

### 4. Eval signals per agent run
The role contracts say "every outbound goes through compliance-qa" (rule 3) but the actual compliance-qa output is not stored as a trace alongside the originating agent's action. So the *trajectory* of a draft → review → Frank-approval is captured in 3 separate log entries, not as one structured event.

### 5. Cost & latency
Token cost: not tracked. Latency: not tracked. The article's premise — "open small models are 100× cheaper than frontier" — is invisible because we don't measure cost in the first place.

### 6. Continual learning feedback
Role contracts (`ltc-pipeline.md`, `wfc-pipeline.md`, etc.) evolve over time. But the *reason* for each change is buried in the diff or in a footnote. There's no "what was the failure pattern that motivated this skill update?" trail.

## The current state, mapped to the article's framework

| Article's component | Mavis team equivalent | Status |
|---------------------|----------------------|--------|
| **Traces** | log.md + daily notes + queues + plans | ⚠️ Exists, but free-text; 80% content, 20% structure |
| **Observability** | morning-standup.md (today's snapshot only) | ❌ Zero time-series; zero aggregate metrics |
| **Enrichment with evals** | compliance-qa review of outbound drafts | ⚠️ Exists for outbound, not for all actions |
| **Human feedback loop** | Frank's verbal corrections, EOD review | ⚠️ Happens, not stored as trace data |
| **Mining** | Orchestrator + Frank read log.md at morning startup | ❌ Manual; no frequency analysis, no clustering |
| **Judge model** | compliance-qa (a role, not a fine-tuned model) | ❌ No fine-tune; uses frontier LLM |
| **Hill-climbing** | Ad hoc role-contract updates | ❌ No before/after eval signal |
| **Continual learning** | MEMORY.md + role contracts evolve slowly | ⚠️ Exists but no signal-to-update mechanism |

## The 4 failure patterns visible in the last 4 days (no mining required)

I'm just looking at the 7/10 → 7/13 window. Four patterns jump out:

1. **Cron slot misses** — 7/10 7:30 AM slot missed (reg at 11:50 AM); 7/13 7:30 AM slot missed (manual recovery). 2 misses in 4 days. **Pattern: cron registration race condition.** The fix is "register crons in a separate session with a 24-hour buffer before first fire" — but this is a hypothesis, not a measured finding. Mining over 30+ days would confirm or refute.

2. **Dual-agent collisions** — 7/13 08:45 (Mavis) and 08:47 (Hermes) ran parallel morning routines; Mavis's version of Daily/2026-07-13.md was overwritten by Hermes's. **Pattern: no single-writer enforcement on shared artifacts.** The fix is "Orchestrator is the only writer to daily note + MEMORY.md" — but is this a one-time collision or a structural problem?

3. **Manual recovery is the standing pattern** — 7/10 and 7/13 both fell back to manual cron recovery. **Pattern: cron infrastructure is unreliable, so the team has a hidden dependency on Frank to be available at 7:30 AM and 12:30 PM and 6:00 PM.** The fix is "either fix the cron or move the team to event-driven triggers" — but is this acceptable as the steady state?

4. **Vault is the source of truth, but no one is auditing it for staleness** — 7/10 noted "MPQ 29 days stale" as a risk. 7/13 noted "MPQ 30+ days stale" as a risk. **Pattern: the risk is being flagged but not resolved.** The fix is "make MPQ refresh a hard daily action" — but is this worth the 45-min slot?

## The implicit 5th pattern: the dual-agent event

The 7/13 morning-routine collision is the *single most informative event* in the Mavis team's recent history. Two agents ran the same job in parallel; one overwrote the other's work; a third (me) had to merge the diffs by hand. The article's framework would say: **this is exactly the kind of failure pattern mining surfaces**. The current vault treats it as an incident. The right treatment is: "make it impossible for two agents to write to the same artifact in the same minute."

## What the article's framework would do for the Mavis team

If we ran LangChain-style trace mining on the Mavis team for 30 days, we would likely find:

- **Top failure pattern: cron slot misses** (high frequency, low severity)
- **Second: stale items that get flagged but not closed** (medium frequency, high severity — the MPQ problem)
- **Third: human-review bottlenecks** (Frank's queue has X items open; which specialist is producing them?)
- **Fourth: agent conflicts on shared writes** (the dual-routine event)
- **Fifth: role-contract drift** (each role contract has evolved N times in 30 days; what's the trajectory?)

Each of these has a tractable fix. None of them require a 6-month rebuild. They require structured traces + a 30-min weekly mining pass.

## What this audit is NOT saying

- It's not saying the Mavis team is broken. The team is doing real, valuable work every day. The vault is healthy. The pipelines are active. Susan is signed. NBA is moving forward.
- It's not saying we need a LangSmith-equivalent. We don't. We have the substrate — we just need to structure it.
- It's not saying every action needs an eval signal. The article's "judge model" is for *high-volume* trace evaluation. The Mavis team is low-volume. A manual mining pass is sufficient for now.

## Recommendation (high-level)

The minimal viable observability project for the Mavis team is:
1. Add a structured event schema to log.md (or a parallel JSONL stream)
2. Have the orchestrator emit one structured event per agent action
3. Add a weekly mining skill that produces 3 failure patterns + 1 recommended change
4. Track which changes ship and which don't, with before/after metrics

Total estimated build: 4-6 hours. Total estimated maintenance: 30 min/week.

See `03-recommendations.md` for the detailed proposal.

*Last updated: 2026-07-13 10:06 PT*
