---
title: PRD Outline — Agent Observability Platform
created: 2026-07-13
updated: 2026-07-13 10:45
type: prd-outline
tags: [research, agents, observability, traces, prd, development-idea]
status: OUTLINE — for feasibility review. Frank to decide build / MVP / defer / skip.
---

# PRD Outline — Agent Observability Platform

> **Working title:** *Project Trace* (placeholder, change as you like)
>
> **One-line:** A standalone platform for capturing, mining, and learning
> from agent traces — the substrate that turns agents from a craft into a
> data-driven engineering discipline.
>
> **Anchor:** LangChain's *Improving Agents is a Data Mining Problem* (7/7/2026)
> + companion articles on the trace-judge + Engine agent + improvement loop.
> The platform described here is the **pattern** LangChain productized as
> LangSmith + LangSmith Engine. Frank's platform is a scoped-down version
> for the solo-practitioner / small-team segment.

---

## 0. TL;DR (the one-page version)

- **What:** Capture every agent run as a structured span tree. Mine for failure patterns. Curate patterns into evals. Run a fine-tuned judge model on every new trace. Close the improvement loop.
- **Why:** The article's premise — agents are a data-mining problem. The substrate is traces. Without it, agent improvement is intuition. With it, it's an engineering loop.
- **For whom:** Solo practitioners + small teams running custom agent stacks. The Mavis team is one reference use case; the K-12 research project's fine-tune-and-eval workflow is another.
- **Scope of this outline:** Full LangChain-style design, then a scoped-down MVP for solo build. Frank decides which to ship.
- **Effort estimate (rough):** Full platform = 6-12 months, multi-engineer. MVP = 4-6 weeks, solo, with existing tools.
- **Decision needed:** Build / MVP / Defer / Skip.

---

## 1. Problem statement

### 1.1 The pain (from the article)
You ship a decent agent. It works. Then it doesn't. You tweak prompts. It gets better on some inputs and worse on others. You add a tool. The new failure mode is in a place you didn't predict. You have no way to know:
- Is the agent better or worse than last week?
- Which failure modes are most common?
- Are the changes you shipped actually helping, or just shifting the failure distribution?
- Where is the next bottleneck — model, prompt, tool, retrieval, state?

This is the **intuition loop**, and it doesn't compound.

### 1.2 The solution (from the article)
Treat the agent's runtime as a data source. Every run produces a *trace* — a structured record of inputs, decisions, tool calls, outputs, eval signals. The traces are projected into a data format you can mine. Mining produces:
- Failure patterns to fix
- Training data to fix them with
- A judge model to detect regressions at scale

Each cycle of the loop produces better data for the next cycle. **The loop compounds.**

### 1.3 The current state
LangChain productized this as **LangSmith** (the trace store + observability) + **LangSmith Engine** (the agent that mines traces and proposes improvements). The full platform took a team of engineers years to build. A solo practitioner can't replicate that.

But the **pattern** is portable. A scoped-down version that captures the *essence* of the loop — traces, mining, judge model, hill-climb — is buildable by one person in 4-6 weeks if scope is right.

---

## 2. Goals & non-goals

### 2.1 Goals (in order of priority)

**G1.** Capture every agent run as a structured span tree (OTel-compatible). Input, tool calls, intermediate state, outputs, eval signals, metadata, all in one queryable record.

**G2.** Mine traces for failure patterns automatically. Cluster by trajectory shape. Surface the top N patterns with frequency + severity + sample traces.

**G3.** Run an LLM-as-judge on every trace to label it (perceived-error, success, partial, custom signals). Judge runs cheaply — fine-tuned small model, not frontier.

**G4.** Support an improvement loop: review patterns → propose changes → run experiments → measure → ship or rollback.

**G5.** Make the data compound: every cycle produces better data for the next. New traces, new judge labels, new patterns, new experiments.

**G6.** Be hostable: cloud SaaS, self-hosted Docker, or local CLI. Standards-based so any agent can plug in.

### 2.2 Non-goals (explicit scope cuts)

**NG1.** Not competing with LangSmith on enterprise features. No SOC 2, no SSO, no RBAC, no team management. Solo / small team only.

**NG2.** Not building a UI in v1. CLI + JSON / Markdown output is enough. UI is a v2 question.

**NG3.** Not a managed model service. Use the user's own model endpoints. Don't compete with OpenAI / Anthropic.

**NG4.** Not a multi-tenant SaaS in v1. Single-tenant, single-user. Multi-tenant is a v2 question.

**NG5.** Not an agent framework. Don't compete with LangChain / LangGraph / CrewAI. *Integrate* with them via OTel, don't replace them.

**NG6.** Not a real-time streaming system. Daily batch is fine for v1. Real-time is a v2 question.

---

## 3. Users & use cases

### 3.1 Primary user: solo practitioner with custom agent stack
- **Profile:** Frank-shaped. Has a vault, a few agents, runs them on cron + manual. ~10-100 agent runs/day.
- **Pain:** Sees failures but can't tell if the agent is improving. Tweaks prompts blindly.
- **Use case:** "I want to know if my morning-routine agent got better after I updated the prompt yesterday."

### 3.2 Secondary user: small team with 1-5 production agents
- **Profile:** A 2-5 person team running agents in production. ~100-1,000 agent runs/day.
- **Pain:** Multiple agents, multiple failure modes, hard to triage what's broken.
- **Use case:** "We shipped a new tool to our customer-support agent. Did it help? What are the new failure modes?"

### 3.3 Tertiary user: research team doing fine-tuning on agent outputs
- **Profile:** People like the K-12 research project (LFED stack). They need labeled traces for fine-tuning.
- **Pain:** Hand-labeling is slow and expensive. Want automated labeling via a judge model.
- **Use case:** "I need 10,000 labeled traces of 'this agent run succeeded' / 'this run failed' to fine-tune a small judge model."

### 3.4 Anti-persona: enterprise customer with 100+ agents
- Out of scope. LangSmith exists for them. Frank's platform does not target this segment in v1.

---

## 4. Core concepts (the data model)

These are the first-class objects in the platform. Names follow OTel conventions where applicable.

### 4.1 Trace
The complete record of one agent run. Contains a tree of spans, plus metadata, plus eval signals.

```
Trace
├── trace_id (UUID)
├── started_at, ended_at
├── duration_ms
├── input (the initial prompt / state)
├── output (the final response / state)
├── metadata (env, model, agent_version, tags)
├── eval_signals (judge labels, human annotations)
├── spans (tree — see below)
└── artifacts (file paths, URLs, anything the agent touched)
```

### 4.2 Span
One unit of work inside a trace. Has a parent (or null for root), a type, an input, an output, a duration, a status. Tree structure.

```
Span
├── span_id (UUID)
├── parent_span_id (UUID | null)
├── trace_id (UUID)
├── span_type ∈ {llm_call, tool_call, retrieval, reasoning, code_exec, handoff, custom}
├── name (e.g., "raptor_synthesis", "tavily_search")
├── started_at, ended_at
├── duration_ms
├── input (the inputs to this span)
├── output (the outputs of this span)
├── status ∈ {ok, error, timeout, partial}
├── tokens_in, tokens_out, cost_usd (for llm_call spans)
├── model (for llm_call spans)
├── error (if status != ok)
└── metadata (anything else)
```

### 4.3 EvalSignal
A label attached to a trace or a specific span. Can come from a judge model, a human, or a rule.

```
EvalSignal
├── signal_id
├── target (trace_id or span_id)
├── signal_name (e.g., "perceived_error", "task_success", "format_compliance")
├── value (the label — bool, score, category, free text)
├── source ∈ {judge_model, human, rule, heuristic}
├── judge_model_id (if source = judge_model)
├── created_at
├── confidence (0-1, optional)
└── rationale (free text, especially from judge model)
```

### 4.4 Pattern
A mined failure pattern. The output of the mining pipeline.

```
Pattern
├── pattern_id
├── name (human-readable, e.g., "wrong_tool_on_refund_query")
├── description
├── frequency (how many traces match)
├── severity (how bad the failure is when it happens)
├── sample_trace_ids (5-10 examples for review)
├── trajectory_signature (a structural fingerprint)
├── suggested_fix (free text, from mining agent or human)
└── status ∈ {new, confirmed, in_progress, fixed, dismissed}
```

### 4.5 Dataset
A curated set of traces + eval signals, used for fine-tuning and offline evals.

```
Dataset
├── dataset_id
├── name
├── description
├── trace_ids (the traces)
├── split ∈ {train, val, test}
├── created_at
└── eval_signals_used (which signals are the labels)
```

### 4.6 Experiment
A run of the agent with a code/prompt/tool change, evaluated against a dataset.

```
Experiment
├── experiment_id
├── name
├── hypothesis (what we expected to happen)
├── code_version (the agent commit / config that was run)
├── dataset_id
├── baseline_experiment_id (for comparison)
├── results (per-eval-signal scores)
├── started_at, ended_at
└── conclusion ∈ {ship, rollback, inconclusive}
```

### 4.7 JudgeModel
A fine-tuned small model used to label traces.

```
JudgeModel
├── judge_id
├── name
├── base_model (e.g., Qwen-7B)
├── fine_tune_dataset_id (the data it was trained on)
├── eval_signals (the labels it outputs)
├── training_metrics (loss, accuracy on val)
├── deployed_at
└── cost_per_1k_traces
```

---

## 5. System architecture (high level)

Five components. v1 = CLI + local files. v2 = cloud. Both share the same data model.

```
┌─────────────────────────────────────────────────────────────────┐
│                      AGENT RUNTIME                              │
│   (any agent — Mavis, K-12 research pipeline, custom scripts)   │
└─────────────────────┬───────────────────────────────────────────┘
                      │ SDK / OTel exporter
                      │ emits spans in real time (or batched)
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    INGESTION LAYER                              │
│  • Receives spans, batches them, persists to storage            │
│  • Validates schema, normalizes timestamps                      │
│  • v1: CLI tool that takes JSON spans as input                 │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                     STORAGE LAYER                               │
│  • Trace store (parquet / SQLite / DuckDB for v1)              │
│  • Eval signal store (same DB)                                 │
│  • Pattern cache (JSON for v1)                                 │
│  • Dataset + experiment metadata (JSON / SQLite)                │
│  • v1: local file system, single user                          │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                  MINING + JUDGE PIPELINE                        │
│  • Daily batch: cluster traces by trajectory shape              │
│  • Surface top N patterns (frequency × severity)               │
│  • Run judge model on every trace → eval signals               │
│  • Surface patterns to user (CLI output, Markdown report)      │
│  • v1: nightly cron on user's machine                          │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                   IMPROVEMENT LOOP UI                           │
│  • v1: Markdown report (read by user, no UI)                   │
│  • v2: web UI (trace browser, pattern browser, eval dashboard) │
│  • v2: experiment runner (one-click A/B)                       │
└─────────────────────────────────────────────────────────────────┘
```

**v1 trade-off:** everything runs on the user's machine. No cloud, no multi-tenant. Single-user observability. Cloud is a v2 question.

---

## 6. Trace data model (concrete)

Following OpenTelemetry GenAI semantic conventions (the emerging standard). One trace, many spans, many eval signals.

```json
{
  "trace_id": "01HXY...",
  "started_at": "2026-07-13T08:45:32-07:00",
  "ended_at": "2026-07-13T08:46:18-07:00",
  "duration_ms": 46000,
  "input": { "messages": [...], "context": {...} },
  "output": { "response": "...", "final_state": {...} },
  "metadata": {
    "agent_name": "mavis-orchestrator",
    "agent_version": "0.7.0",
    "env": "production",
    "user_id": "frank",
    "tags": ["morning-routine", "week-29"]
  },
  "spans": [
    {
      "span_id": "01HXY...A",
      "parent_span_id": null,
      "span_type": "llm_call",
      "name": "load_mem_md",
      "started_at": "...",
      "duration_ms": 1200,
      "input": { "prompt": "..." },
      "output": { "completion": "..." },
      "status": "ok",
      "tokens_in": 8500,
      "tokens_out": 1200,
      "cost_usd": 0.034,
      "model": "claude-sonnet-4"
    },
    {
      "span_id": "01HXY...B",
      "parent_span_id": "01HXY...A",
      "span_type": "tool_call",
      "name": "write_file",
      "started_at": "...",
      "duration_ms": 80,
      "input": { "path": "Daily/2026-07-13.md", "content": "..." },
      "output": { "bytes_written": 12453 },
      "status": "ok"
    },
    {
      "span_id": "01HXY...C",
      "parent_span_id": "01HXY...A",
      "span_type": "llm_call",
      "name": "load_follow_up_queue",
      "started_at": "...",
      "duration_ms": 850,
      "input": { "prompt": "..." },
      "output": { "completion": "..." },
      "status": "ok",
      "tokens_in": 2100,
      "tokens_out": 400,
      "cost_usd": 0.012,
      "model": "claude-sonnet-4"
    }
  ],
  "eval_signals": [
    {
      "signal_name": "task_success",
      "value": true,
      "source": "judge_model",
      "judge_model_id": "qwen-judge-v0.3",
      "confidence": 0.92,
      "rationale": "Trace produced a complete daily note + state transfer; no errors."
    },
    {
      "signal_name": "perceived_error",
      "value": false,
      "source": "judge_model",
      "judge_model_id": "qwen-judge-v0.3",
      "confidence": 0.87
    }
  ],
  "artifacts": [
    "Daily/2026-07-13.md",
    "MEMORY.md",
    "Work/Shared/Ops/morning-standup.md"
  ]
}
```

**Key fields Frank has never had captured:** `tokens_in`, `tokens_out`, `cost_usd`, `model` per LLM call. The article's "100× cheaper" claim is invisible without these.

---

## 7. Capture & ingestion

### 7.1 SDK approach (v1)
A small Python library (and TypeScript) the user imports into their agent code. Decorator pattern:

```python
from trace_platform import trace, span

@trace(name="morning-routine", tags=["morning-routine", "week-29"])
def morning_routine():
    with span("llm_call", "load_mem_md", model="claude-sonnet-4"):
        content = llm.complete(prompt)
    with span("tool_call", "write_file"):
        write_file("Daily/2026-07-13.md", content)
```

The SDK handles span tree assembly, timestamp capture, error handling, and async flush.

### 7.2 OTel approach (v2)
A thin OTel GenAI exporter that sends spans to the platform's ingestion endpoint. Works with any OTel-instrumented agent. This is the *standards-based* path.

### 7.3 CLI approach (v1, no-code)
A CLI that takes a JSON file of spans and ingests them. For agents that can't easily integrate the SDK.

### 7.4 Ingestion guarantees (v1)
- **At-least-once delivery.** SDK buffers spans locally, retries on failure. If the platform is down, spans are persisted to a local file and uploaded when it's back.
- **Bounded buffer.** Default 10MB in-memory. After that, write to disk. Prevents the SDK from OOMing the agent.
- **Backpressure.** If the agent is producing spans faster than the platform can ingest, the SDK drops the lowest-priority spans (configurable).

---

## 8. Storage

### 8.1 v1: Local file system + SQLite
- **Trace store:** one Parquet file per day (`traces/2026-07-13.parquet`). Schema-versioned.
- **Eval signal store:** SQLite (`eval_signals.db`). Indexed on (trace_id, signal_name).
- **Pattern cache:** JSON (`patterns/active.json`).
- **Dataset store:** JSON manifest + trace IDs.
- **Experiment store:** JSON manifest + scores.

Why Parquet for traces: columnar, queryable with DuckDB or pandas, doesn't need a database server.

Why SQLite for eval signals: needs indexes, small, fast, single-file.

### 8.2 v2: Cloud object storage + Postgres
- Traces → S3 / GCS as Parquet
- Eval signals → Postgres
- Patterns → Postgres
- Datasets / experiments → Postgres

### 8.3 Query patterns (v1)
- "Show me all traces where the agent failed to write a file" → SQL on spans
- "What's the cost of last week's morning-routine?" → aggregation on cost_usd
- "How many traces hit the same pattern?" → group by trajectory_signature
- "What did the agent do on Tuesday at 8:47am?" → time-range query

---

## 9. Observability surface (v1 = CLI + Markdown, v2 = web UI)

### 9.1 v1 deliverables
- `trace` CLI command: list / show / filter / aggregate traces
- `trace stats` — daily / weekly stats (success rate, cost, latency, top patterns)
- `trace report` — generates a Markdown report (similar to the current Mavis daily note structure)
- `trace patterns` — shows the top N active failure patterns
- `trace eval` — shows the eval-signal distribution for a time range
- `trace compare` — compares two experiments (eval signal deltas, cost deltas, etc.)

### 9.2 v2: web UI
- Trace browser (tree view, like Jaeger)
- Pattern dashboard (frequency × severity heat map)
- Eval signal dashboard (distribution over time)
- Experiment dashboard (baseline vs treatment)
- Cost dashboard (per agent, per day, per model)

### 9.3 What v1 explicitly does NOT have
- No real-time streaming
- No team collaboration features
- No fine-grained access control
- No SSO / SAML
- No audit log

---

## 10. Mining pipeline

The heart of the platform. This is what turns traces into actionable insights.

### 10.1 Daily batch (v1)
Runs nightly via cron. Steps:

1. **Read** yesterday's traces from Parquet.
2. **Cluster** by trajectory signature (sequence of span_type + name + status).
3. **Score** clusters by frequency × severity (severity = average eval-signal "task_success" value).
4. **Sample** 5-10 traces per cluster for human review.
5. **LLM pass** (optional, expensive): a frontier model reads the cluster + sample traces and writes a "suggested_fix" for the pattern.
6. **Write** top N patterns to `patterns/active.json`.
7. **Generate** a Markdown report at `reports/2026-07-13-mining.md`.

### 10.2 Mining depth (v1)
- **Light mining:** trajectory clustering + frequency / severity scoring. Cost: near-zero.
- **Medium mining:** + eval-signal correlation (which patterns correlate with perceived_error?). Cost: one SQL query.
- **Heavy mining:** + LLM pass for suggested_fix. Cost: $0.50-2.00 per pattern (frontier model call). Budget: 10 patterns/day = $5-20/day.

### 10.3 What mining surfaces
- **Failure patterns** — clusters of traces with the same trajectory + low eval signals.
- **Latency patterns** — clusters of slow traces.
- **Cost patterns** — clusters of expensive traces (high token usage).
- **Coverage gaps** — clusters of inputs that produce no eval signal (need human labeling).
- **Drift** — clusters that didn't exist 30 days ago but are common now.

### 10.4 What mining does NOT do
- **Does not auto-fix.** Suggests fixes; human implements.
- **Does not auto-deploy.** Returns suggestions; human acts.
- **Does not auto-fine-tune.** Returns a "could this be a dataset?" hint; human curates.

---

## 11. Judge model

The most novel part of the platform. Fine-tuned small model that labels traces at scale.

### 11.1 Why a fine-tuned judge
Frontier models (GPT-4, Claude Opus) cost ~$0.01-0.05 per trace to label. A 10K-trace dataset = $100-500. A daily run on 100 traces = $1-5/day, $30-150/month, $360-1,800/year. Solvable but not free.

A fine-tuned Qwen-7B (or similar) running on a small GPU / inference endpoint costs ~$0.0001-0.001 per trace. **100× cheaper.** That's $3-30/month for the same volume. Solvable and cheap.

### 11.2 Judge workflow (v1)
1. **Define** a signal (e.g., "task_success"). Output: a label spec (what does success look like? what are the failure modes? examples?).
2. **Hand-label** ~200-500 traces for the signal.
3. **Fine-tune** Qwen-7B (or similar) on the labeled set.
4. **Validate** on a held-out test set (target: 90%+ agreement with human labels).
5. **Deploy** the judge. Run it on every new trace.
6. **Monitor** agreement over time. If it drifts, relabel and re-fine-tune.

### 11.3 v1 scope cuts
- v1 supports **one** judge model per signal. (LangSmith supports many.) That's enough for a first version.
- v1 fine-tunes **one** base model (Qwen-7B-class). User picks the base.
- v1 doesn't have a UI for label specification. Label specs are YAML files.
- v1 doesn't auto-trigger re-fine-tuning. Human watches the agreement score, decides when to relabel.

### 11.4 Open research question
How much labeled data do you need before the fine-tuned judge is reliable? Per the article + Madison's Morning Memo: it's an open question. The platform's v1 collects agreement metrics so the user can answer this for their own use case.

---

## 12. Improvement loop

The closed loop. The article's claim: this is the only sustainable way to improve an agent.

### 12.1 The loop (as a workflow)
1. **Daily mining report** lands in the user's inbox (or vault).
2. **Human review** — Frank reads the top 3 patterns. Picks one to address.
3. **Hypothesis** — Frank writes "I think changing X will fix this pattern."
4. **Experiment** — Frank runs the changed agent on the dataset curated for this pattern.
5. **Measure** — eval signal scores, cost, latency. Compare to baseline.
6. **Decide** — ship, rollback, or inconclusive.
7. **Update** — if ship, merge the change. If rollback, log why. If inconclusive, refine the hypothesis.
8. **Next** — back to step 1.

### 12.2 What the platform supports in v1
- **Step 1:** daily report (automated).
- **Step 5:** measurement is automated. Experiment runner takes (baseline_agent, treatment_agent, dataset) and produces a comparison report.
- **Step 6:** decision is human. Platform provides a "ship / rollback / inconclusive" prompt; user picks.
- **Step 7:** platform records the decision in `experiments/` so future-me knows what was tried.

### 12.3 What the platform does NOT do in v1
- Auto-merge changes.
- Auto-deploy.
- Auto-rollback.
- Recommend which pattern to address (mining surfaces them, but prioritization is human).

---

## 13. Eval framework

The eval framework is the *signals* the platform tracks. Three categories:

### 13.1 Online evals (run on every trace, in real time or daily)
- **perceived_error** — did the user perceive an error? (per the Fireworks article)
- **task_success** — did the agent accomplish the user's goal?
- **format_compliance** — did the agent's output match the expected format?
- **cost_ceiling** — was the trace's cost above the user's threshold?
- **latency_ceiling** — was the trace's latency above the user's threshold?

### 13.2 Offline evals (run on a dataset, ad hoc)
- **Regression checks** — does the new version still pass?
- **A/B comparisons** — does the treatment win on the metric?
- **Backfills** — apply a new eval signal to historical traces.

### 13.3 Annotations (human, ad hoc)
- Human can attach a label to any trace or span.
- Annotations feed back into the next fine-tune cycle.

### 13.4 Eval signal spec (v1)
YAML files in `eval_signals/`:

```yaml
# eval_signals/task_success.yaml
name: task_success
description: "Did the agent accomplish the user's stated goal?"
output_type: bool
labeling_instructions: |
  1. Read the trace's input (user's goal).
  2. Read the trace's output (agent's response).
  3. Read the eval_signals already on the trace (perceived_error, format_compliance).
  4. Output true if the user's goal was accomplished, false otherwise.
examples:
  - input: "Send the kick-off invite to Susan"
    output: true
    rationale: "Span 'write_file' shows invite was created with correct content."
  - input: "Send the kick-off invite to Susan"
    output: false
    rationale: "Span 'write_file' shows file was created but the calendar invite was never sent."
fine_tune_data: data/task_success_labeled.jsonl
```

---

## 14. Cost model

### 14.1 Cost of running the platform

**v1 (local, single user):**
- Storage: $0 (local disk)
- Compute for mining: $0 (runs on user's machine, nightly cron)
- LLM cost for heavy mining: $5-20/day (capped)
- Judge model inference: $0.10-1.00/day (small model on local GPU or cheap endpoint)
- **Total: $200-700/month** for an active user

**v2 (cloud, multi-tenant):**
- Storage: $50-200/month
- Compute: $100-500/month
- LLM cost: $200-1000/month
- **Total: $400-2000/month** for an active user

**Comparison: LangSmith Pro:** $39/seat/month, but enterprise-only on advanced features. LangSmith Enterprise: custom pricing, typically $50K+/year.

Frank's platform sits between "free, do it yourself" and "LangSmith Enterprise." It captures the *pattern* at solo-practitioner cost.

### 14.2 Cost of NOT running the platform
- Each failed agent run costs: tokens ($$), time (Frank's hours), and reputation with the user.
- Without observability, failures are detected by user complaints, not by the agent team.
- Estimated cost: 1-3 hours/week of Frank's time spent on manual triage of agent failures, plus the token cost of failed runs that should have been caught.

---

## 15. Build phases

### 15.1 Phase 0 — Decide (this week)
- Review this PRD outline.
- Decision: build / MVP / defer / skip.
- **Effort: 1 hour (decision only).**

### 15.2 Phase 1 — MVP (4-6 weeks, solo)
Scope cuts from the full design above. Concretely:
- SDK: Python only, decorator-based, 1-week build.
- Ingestion: CLI + JSON, no OTel, 1-week build.
- Storage: Parquet + SQLite, 2-day build.
- Query CLI: `trace list / show / stats / report`, 1-week build.
- Daily mining: trajectory clustering + frequency/severity scoring (no LLM pass for suggested_fix), 1-week build.
- Judge model: 1 fine-tuned Qwen-7B for `task_success` signal, 2-week build (includes data labeling, fine-tune, validation).
- Daily mining report: Markdown, 1-day build.
- **Total: ~6 weeks. One person. ~80 hours of build time.**

### 15.3 Phase 2 — Growth (3 months after MVP)
- Add OTel support (interop with LangChain / LangGraph / etc.).
- Add more eval signals (perceived_error, format_compliance, cost_ceiling).
- Add experiment runner (A/B test the agent against a dataset).
- Add cost dashboard.
- Add the LLM pass for mining (suggested_fix).
- **Total: ~12 weeks additional. Still solo-feasible.**

### 15.4 Phase 3 — Multi-tenant SaaS (6+ months after MVP)
- Web UI (React or similar).
- Postgres backend.
- Multi-tenant isolation.
- Team features (sharing, RBAC).
- **Total: months. Probably needs collaborators. Probably needs funding. This is a real company.**

### 15.5 What's NOT in any phase
- Real-time streaming.
- Fine-grained RBAC.
- SOC 2 / HIPAA / GDPR compliance.
- Mobile app.
- On-prem enterprise support.

---

## 16. Risks & open questions

### 16.1 Technical risks
- **R1:** Span data volume could explode. v1 assumes ~10-100 traces/day. At 10K+ traces/day, Parquet + SQLite breaks. Mitigation: phase 2 migration to Postgres + object storage.
- **R2:** LLM cost for heavy mining could spiral. Mitigation: budget cap, opt-in for heavy mining.
- **R3:** Fine-tuned judge could drift in quality. Mitigation: agreement-score monitoring, re-label trigger.
- **R4:** OTel GenAI conventions are still emerging. Risk that v1 schema needs a migration. Mitigation: versioned schema, migration tool.

### 16.2 Product risks
- **R5:** The solo-practitioner market may not be big enough to be a real product. v1 is fine for Frank's own use. v3 (SaaS) needs validation.
- **R6:** LangSmith may ship solo-practitioner features, killing the niche. Mitigation: focus on the parts LangSmith doesn't (mining, fine-tuning, custom signals).
- **R7:** Frank's time. v1 is 80 hours. That's a real commitment alongside WFC + LTC + K-12 research + Susan kick-off. Mitigation: scope cuts below.

### 16.3 Open research questions
- **Q1:** How much labeled data do you need before the fine-tuned judge is reliable? (Same question Madison's Morning Memo flagged.)
- **Q2:** What's the right eval signal design for a given agent? This is a research problem.
- **Q3:** How do you avoid mining producing false patterns (overfitting to noise)?

---

## 17. Decision matrix

| Option | What it means | Effort | Time-to-value | Strategic value |
|--------|---------------|--------|---------------|-----------------|
| **(a) Build full** | Phase 1 + 2 + 3 (SaaS) | 6-12 months, multi-engineer | 6+ months | High — could be a real company |
| **(b) Build MVP** | Phase 1 only, solo, for Frank's use | 4-6 weeks, solo | 4-6 weeks | Medium — Frank gets the loop, but no product |
| **(c) Defer** | Park it. Bookmark. Look at it in Q4 2026 or 2027. | 0 hours | 0 | Low now, optional later |
| **(d) Skip** | Article was interesting but not actionable for Frank. | 0 hours | 0 | None |

### My recommendation

**Start with (b), with explicit off-ramps to (c) or (a).**

- 4-6 weeks is bounded. If it's not paying off by week 4, pivot to (c).
- If the MVP shows clear value (mining surfaces patterns Frank would have missed; judge model labels with 90%+ agreement), then decide: is this Frank's personal tool forever, or is it a v3 SaaS?
- If MVP doesn't show value by week 4, drop it. Article was interesting; not every article is actionable.

**Don't start with (a).** Phase 3 needs a team, funding, and a real market. Frank has a real job (WFC + LTC + K-12 research + family). Phase 3 is a career change, not a project.

**Don't do (d).** The article's premise is sound and Frank has the substrate. Worth 4-6 weeks of validation.

---

## 18. What this outline does NOT answer

- What the UI looks like (v2 question; v1 is CLI + Markdown).
- How the OTel interop works in detail (v2).
- How the multi-tenant isolation works (v3).
- What pricing the SaaS would charge (v3).
- How to handle PHI / PII in traces (compliance question; v2 if needed).

These are deferred. Address when the corresponding phase starts.

---

## 19. Next actions (if you go with (b))

1. Approve the MVP scope in §15.2.
2. Pick the SDK language (Python first, per the Mavis team).
3. Pick the first eval signal to fine-tune the judge for. Recommendation: `task_success` on the morning-routine agent (Mavis's most frequent + most consequential agent).
4. Allocate 4-6 weeks of Frank's time. Realistically 10-15 hours/week alongside other work.
5. Set a 4-week checkpoint: if MVP isn't showing value by then, drop to (c).

---

*Last updated: 2026-07-13 10:45 PT*
*Frank's answers (locked): Q1=C, Q2=not for current workflow, Q3=C.*
*Output format: PRD outline for feasibility review. No code.*
