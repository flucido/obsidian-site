# Product Synthesis — Local-First Education Data Analytics

> **Purpose:** Map all existing work, ideas, and documents into a coherent product vision with a clear path from hackathon demo → production product.
> **Author:** Frank Lucido
> **Last updated:** 2026-06-22

---

## 1. What Is This Product?

A **local-first analytics platform** that lets California school district administrators ask plain-English questions about their data and get answers instantly — without sending student records to any cloud service.

Two pillars:

| Pillar | What It Does | Status |
|--------|-------------|--------|
| **NL→SQL Engine** | Natural language → validated DuckDB SQL → results table + chart. Runs entirely on the user's machine. | ✅ Demo working (hackathon) |
| **Analytics Pipeline** | DuckDB + dbt + Parquet staging. Pre-computes CDE accountability metrics (chronic absenteeism, EWS, suspension rates) into semantic layer. | 🟡 Framework built (local-data-stack), not yet integrated with NL→SQL |

The end goal is the **Hybrid Architecture Specification** (PDF): combine both pillars so that simple questions hit raw tables via NL2SQL, complex CDE compliance questions hit pre-computed semantic models, and dashboard-level questions get context-aware RAG responses — all through a single chat interface that routes intelligently.

---

## 2. Where Things Stand Today

### 2.1 The Hackathon Project — LFED (rebranded from Kasualdad LFED)

**Repo:** `/Users/flucido/projects/build-small-hackathon/Kasualdad_LFED`
**HF Space:** `build-small-hackathon/Kasualdad_LFED` (ZeroGPU — currently debugging runtime error from new training run)
**Submitted:** June 15, 2026 ✅ — 4 badges claimed (Off the Grid, Well-Tuned, Llama Champion, Off-Brand)
**Model:** Fine-tuned 14B with transformers + bnb-4bit + LoRA (upgraded from Qwen2.5-Coder-7B Q4_K_M)
**Training dataset:** Published on Hugging Face Hub
**Schema:** 5 tables (enrollment, attendance, grades, discipline, demographics) with deterministic Parquet seed
**Performance:** GPU inference ~30s (few-shot trimmed 7→4, streaming SQL)
**Blog:** lucidotechnologyconsulting.com/blog/BuildingLFEDS
**New training run:** Active as of 6/22 — **Warehouse Training Pipeline.** Qwen2.5-Coder-14B QLoRA fine-tuning on 11,222 NL→SQL pairs against 19-table CDE warehouse schema. Running on Modal A10G (ap-wsY5Qe0mmr3NyXv1uklm6k), ~7h ETA. HF repos: `build-small-hackathon/lfed-qwen2.5-coder-14b-sql-warehouse-lora` + `-gguf`. See [[local-data-stack/EXPANSION_PLAN#progress]].

**DSPy Experiments:** Initial DSPy prompt optimization run on 14B AWQ model (6/21). Results at `dspy_results/20260621_203343` on Modal volume. v2 optimization planned against retrained warehouse model.

This is the working NL→SQL engine. It demonstrates the core interaction:

```
User question → fine-tuned LLM generates SQL → validated + executed on DuckDB → table returned
```

**What's built:**
- Gradio app with 5-table education schema (enrollment, attendance, students, discipline, grades)
- Fine-tuned Qwen2.5-Coder-14B via QLoRA (r=32, 27,859 NL→SQL pairs)
- Two inference backends: transformers+LoRA (ZeroGPU Space) and llama.cpp+GGUF (local Mac)
- Streaming SQL generation, execution guard (forbidden tokens, schema validation, timeout)
- Deterministic seed data (Parquet, LFS, 2,900 students, 5 schools, 4 years)
- 81 pytest tests, 4 hackathon badges (Off the Grid, Well-Tuned, Llama Champion, Off-Brand)

**What's NOT yet built (spec drafted):**
- Query history + session persistence
- Comparison view (side-by-side saved results)
- Chart layer (auto-chart from result shape)
- Standard Dashboard (pre-authored recurring queries)
- Ephemeral Dashboard (push-to-board from ad-hoc queries)

**Branches:**
- `main` — Space demo (transformers+LoRA, ZeroGPU)
- `product` / `local-llamacpp-v1` — llama.cpp local-first base (the real product foundation)

### 2.2 The Analytics Framework — local-data-stack

**Repo:** `/Users/flucido/projects/local-data-stack`
**GitHub:** `github.com/flucido/local-data-stack`

An open-source, local-first analytics framework. Designed as the "backend" that the NL→SQL engine would query against when real data is present:

```
Aeries SIS / CSV exports
    ↓
Stage 1: Delta/Parquet landing zone
    ↓
Stage 2: DuckDB + dbt transformations (CDE metrics)
    ↓
Stage 3: Analytics marts (OBTs)
    ↓
Rill dashboards
```

**What's built:**
- Parquet staging with synthetic sample data
- dbt project for DuckDB transformations
- Rill dashboard project
- Public-release sanitization (no real data committed)
- MIT license

**Key gap:** The NL→SQL engine (Kasualdad LFED) and the analytics pipeline (local-data-stack) are two separate codebases that have never been connected. The hackathon project queries its own seed data, not data processed through the pipeline.

### 2.3 The Vision — Hybrid Architecture Specification (PDF)

The end-state architecture. Three layers:

1. **Data Layer:** DuckDB + dbt pre-compute CDE metrics into One Big Tables (OBTs) — denormalized marts like `mart_school_accountability` and `mart_student_composite_risk`
2. **LLM Router:** Classifies every user question into one of three paths:
   - **Path A (Simple NL2SQL):** "How many 8th graders?" → LLM generates SQL against staging tables
   - **Path B (Complex Metric):** "Which students have risk score > 4?" → Router bypasses calculation, generates simple SELECT against pre-computed OBT
   - **Path C (Dashboard RAG):** "What does this spike in suspensions mean?" → SQL bypassed entirely, dashboard JSON state sent to LLM for natural language analysis
3. **Front-End:** Context-aware UI that captures dashboard state and sends it alongside user queries

---

## 3. The Gap Between Demo and Product

| Dimension | Hackathon Demo (Today) | Product (Target) |
|-----------|----------------------|------------------|
| **Data** | Synthetic seed data (2,900 students, 5 tables) | Real Aeries SIS data via Parquet pipeline |
| **Schema** | 5 tables, flat | 11+ tables, staged + OBT marts |
| **Queries** | Single-shot NL→SQL, ephemeral | Session history, saved comparisons, dashboards |
| **Routing** | All queries go NL→SQL | 3-path router (simple / OBT / RAG) |
| **Charts** | None (tables only) | Auto-chart from result shape |
| **Persistence** | None (in-memory per query) | DuckDB history, saved boards |
| **Audience** | Hackathon judges | School district admins, principals, supts |
| **Deployment** | HF Space (ZeroGPU) | User's Mac / on-prem server |
| **Model** | Qwen2.5-Coder-14B (QLoRA) | Same architecture, potentially upgraded base model |

---

## 4. Model Strategy

### 4.1 Current Model

**Qwen2.5-Coder-14B** fine-tuned via QLoRA (r=32, 27,859 pairs). Deployed as:
- GGUF Q4_K_M (~9GB) for local llama.cpp inference (Mac Metal)
- LoRA adapter (551MB) + bnb-4bit base for Space demo (ZeroGPU/transformers)

### 4.2 Why This Model Works

- 14B is the sweet spot for 16GB Macs (M2) — ~8.5GB model + headroom for DuckDB + Gradio
- Coder variant pre-trained on code/SQL tasks — better baseline than general-purpose models
- QLoRA fine-tuning captures domain-specific SQL patterns (CDE-style joins, aggregations, CASE WHEN)

### 4.3 Upgrade Path: Gemma 4 27B?

If moving to a larger model (you mentioned "Java 4.26b" — likely **Gemma 4 27B**):

| Factor | Qwen2.5-Coder-14B (current) | Gemma 4 27B (candidate) |
|--------|---------------------------|------------------------|
| Parameters | 14B | 27B |
| GGUF Q4_K_M size | ~9GB | ~17GB |
| Fits 16GB Mac? | ✅ Yes (~7GB headroom) | ❌ No (would swap) |
| Fits 32GB Mac? | ✅ Yes | ✅ Yes (~15GB headroom) |
| Fits A10G (24GB) QLoRA? | ✅ Yes | ⚠️ Tight (27B + LoRA ~20GB in 4-bit) |
| Fits L4 (24GB)? | ✅ Yes | ⚠️ Same tight fit |
| SQL quality | Great (coder variant) | Unknown (general model, needs eval) |
| Apache 2.0 license? | ✅ Yes | ✅ Yes |

**Recommendation:** Gemma 4 27B would require different hardware than your current M2 Mac. Three paths:

1. **Stay on Qwen2.5-Coder-14B** — proven, fits M2, strong SQL performance. Lower risk.
2. **Gemma 4 12B** — step up from 14B? Actually smaller. Skip.
3. **Qwen3-Coder (future)** — if/when released, same architecture family, likely better. Wait and see.
4. **Gemma 4 27B** — only if you upgrade to a 32GB+ machine. The model quality ceiling is higher but the hardware gate is real.

**Bottom line for now:** Keep Qwen2.5-Coder-14B. It's the right model for the hardware you have. Revisit when you have a 32GB+ machine or if Qwen3-Coder ships.

---

## 5. Architecture Evolution — From Demo to Product

### Phase 1: Hackathon (what exists today)
```
User question → app.py → model_inference.py (NL→SQL via fine-tuned LLM)
                            → data_engine.py (validate + execute on DuckDB)
                            → table output
```
All data is synthetic seed data. No persistence. Single-shot queries.

### Phase 2: Query Experience (next feature set)
Built on the existing SPEC_query-history-dashboards.md:

```
User question → streaming SQL → validated → table + auto-chart
                                     ↓
                              HistoryEntry stored (SessionStore)
                                     ↓
                         ★ Save → Comparison tab (grid of saved cards)
                         📌 Push → Ephemeral Board (ad-hoc dashboard)
                         
Standard Dashboard: pre-authored SQL → refresh all → chart grid
```

New modules: `session_store.py`, `charting.py`, `dashboards.py`. All CPU-only (no GPU on history/refresh paths).

### Phase 3: Real Data Pipeline (local-data-stack integration)
```
Aeries SIS / CSV export
    ↓
Parquet staging (Stage 1)
    ↓
dbt transformations (CDE metrics) → OBT marts (Stage 2)
    ↓
NL→SQL engine now queries BOTH:
    - staging tables (simple questions)
    - OBT marts (complex CDE metrics)
```

The `prompts.py` schema context expands to include OBT schemas. The model learns to prefer OBTs for metric questions.

### Phase 4: LLM Router (full hybrid architecture)
```
User question → Router classifies intent:
    Path A (Simple) → NL2SQL against staging tables
    Path B (Metric) → SELECT against pre-computed OBT (no LLM needed)
    Path C (Context) → Dashboard JSON → LLM → natural language response
```

The Router is a lightweight classifier (could be rule-based initially, then a small fine-tuned model). Path B is the key cost saver: complex CDE calculations run once in dbt, not on every query.

### Phase 5: Production Features
- Multi-district support (configurable schemas per district)
- Scheduled dbt refreshes (nightly CDE metric recalculation)
- Export: PDF reports, CSV data, email digests
- Auth: simple API key for now (single-user local-first, but the app might run on a district server)

---

## 6. Open Design Decisions

These are decisions the synthesis surfaces that need to be made before writing a formal PRD:

| # | Decision | Context | Impact |
|---|----------|---------|--------|
| D1 | **One repo or two?** | Currently Kasualdad_LFED (Gradio app) and local-data-stack (pipeline) are separate repos. Merge into one product repo? | Affects CI, versioning, contributor onboarding |
| D2 | **Target model for v1 product?** | Qwen2.5-Coder-14B vs. wait for Qwen3-Coder vs. evaluate Gemma 4 12B. | Locks training pipeline, hardware requirements |
| D3 | **Python-only or add a frontend framework?** | Gradio is Python-native and works, but the SPEC envisions tabs, chart grids, and dashboard state capture. Gradio can do this but may get unwieldy. React/Next.js would be more flexible but adds a second language. | Developer experience, UI polish ceiling |
| D4 | **dbt or Python transformations?** | local-data-stack uses dbt. But dbt-duckdb adds a dependency. Could do transforms in pure Python/Polars. | Complexity vs. maintainability |
| D5 | **OBT design: one big table or multiple marts?** | The PDF says "One Big Table" but the expansion plan lists multiple marts (composite_risk, school_accountability, class_effectiveness). | Query simplicity vs. schema manageability |
| D6 | **Router: rule-based or fine-tuned classifier?** | A rule-based router (keyword matching + schema detection) works for launch. A fine-tuned classifier would be more robust but requires training data. | Implementation timeline |
| D7 | **Chart library: Gradio native or Plotly?** | SPEC says native Gradio plots for v1. Plotly would give more chart types (heatmap, dual-axis) but adds dependency. | Feature ceiling vs. simplicity |
| D8 | **Open-source license and community strategy?** | Hackathon is public. local-data-stack is MIT. The product could be open-core (core OSS + district-specific features as services) or fully open. | Business model, community growth |

---

## 7. Immediate Next Actions

### Hackathon (next 3 days — deadline June 14)
1. [ ] ~~Switch Space to T4 GPU~~ — **DONE (switched to transformers+LoRA on ZeroGPU instead)**
2. [ ] Smoke test all 6 example queries on the live Space
3. [ ] Record demo video / GIF
4. [ ] Submit to hackathon

### Post-Hackathon (week of June 15)
1. [ ] Decide D1 (one repo or two?)
2. [ ] Begin Phase 2 features on `product` branch (query history — P1 from SPEC)
3. [ ] Evaluate Gemma 4 27B on a rental GPU (Modal L4/L40S) — just inference quality check, no training yet

### Near-Term (June — July)
1. [ ] Integrate local-data-stack pipeline with Kasualdad LFED (Phase 3)
2. [ ] Expand schema: add the 6 tables from EXPANSION_PLAN.md
3. [ ] Re-train model on expanded schema (target: 30K+ pairs)
4. [ ] Build Standard Dashboard with 8 seed queries from SPEC

---

## 8. Document Map

| Document | Location | What It Is |
|----------|----------|------------|
| **Hybrid Architecture Spec** | `local-data-stack/Hybrid_Architecture_Specification.pdf` | End-goal vision: 3-path router + OBT semantic layer + context-aware UI |
| **PROJECT.md** (hackathon) | `hackathon/PROJECT.md` | Current state of the working demo — architecture, schema, inference, gotchas |
| **PROJECT.md** (local-data-stack) | `local-data-stack/PROJECT.md` | — (empty, content is in README) |
| **README** (hackathon) | `hackathon/README.md` | Public Space README: badges, architecture diagram, schema, run guide |
| **README** (local-data-stack) | `local-data-stack/README.md` | Framework overview: pipeline, quick start, validation commands |
| **SPEC: Query History + Dashboards** | `local-data-stack/SPEC_query-history-dashboards.md` | Next feature spec: history, comparison, charts, standard + ephemeral dashboards |
| **Hackathon Plan v2** | `local-data-stack/HACKATHON_PLAN_V2.md` | 7-day training plan: 72B data gen → augmentation → 14B training → eval |
| **Expansion Plan** | `local-data-stack/EXPANSION_PLAN.md` | Schema expansion: 6 new tables, 150+ templates, 10K+ pairs |
| **Training Playbook** | `local-data-stack/TRAINING_PLAYBOOK.md` | Bugs encountered + fixes from the training pipeline |
| **Data Research** | `local-data-stack/DATA_RESEARCH.md` | Deep research on existing text-to-SQL datasets, CDE data, synthesis approaches |
| **DEPLOY.md** (hackathon) | `hackathon/DEPLOY.md` | ZeroGPU deployment war story: 4 issues resolved |
| **HANDOFF.md** | `local-data-stack/HANDOFF.md` | Session handoff from early hackathon build (now outdated) |
| **PLAN.md** | `local-data-stack/PLAN.md` | Original 9-day plan (now mostly completed) |
| **Session Transcript** | `local-data-stack/session-ses_145f.md` | Live debugging session: ZeroGPU adapter loading, performance tuning |

---

## 9. The Pitch (for when this becomes a real thing)

**For school district IT directors:**

> "Your student data never leaves your server. An AI that speaks SQL sits on top of your existing Aeries database. Your principals type questions in plain English — 'Which English Learners are chronically absent and also failing math?' — and get answers in seconds, not in the two weeks it takes your data person to run the report."

**For the hackathon judges:**

> "A fine-tuned open-source 14B model runs entirely on a school's existing Mac or on-prem server. No API calls. No data exfiltration. No per-query costs. The same technology that powers ChatGPT, shrunk down and specialized for the one domain that can't use cloud AI: K-12 student data."

---

*To turn the decisions in §6 into a formal PRD: work through them one at a time, then structure the PRD as Problem → Users → Solution Architecture → Feature Map → Phases → Timeline → Risks.*
