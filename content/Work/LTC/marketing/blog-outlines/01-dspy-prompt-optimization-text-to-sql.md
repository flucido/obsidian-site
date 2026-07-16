---
title: "DSPy Prompt Optimization for Text-to-SQL: BootstrapFewShot, ChainOfThought, and Why r=32 Wasn't Enough"
created: 2026-06-23
updated: 2026-06-29
type: blog-outline
series: local-data-stack-deep-dive
post: 1
status: outline-verified
---

## Thesis
DSPy's programmatic prompt optimization beats hand-written few-shot examples for Text-to-SQL — but the optimization strategy must match the model size. ChainOfThought hurts small quantized models; Predict wins under ~10B active parameters. And when it comes to teaching a model a new schema, prompt optimization alone hits a wall — LoRA adapter capacity (rank) is what actually embeds proprietary table relationships.

## Two projects, two phases

This work spans two repos. Being clear about which is which prevents the conflation that plagued the first draft:

- **`build-small-hackathon/Kasualdad_LFED/`** — hackathon project where the DSPy prompt optimization experiments ran. Uses a 5-table synthetic seed schema (enrollment, attendance, students, discipline, grades) loaded from Parquet into in-memory DuckDB.
- **`local-data-stack/`** — production project with the real CDE warehouse (~30 tables, 492 columns, 25M rows) and the NL query engine, LoRA training pipeline, and eval harness.

Phase 1 (DSPy optimization) ran on the synthetic 5-table schema. Phase 2 (LoRA fine-tuning) ran on the real warehouse. The blog must distinguish these.

## Outline

### 1. The Problem: Hand-Written Prompts Don't Scale
- Context: building a Text-to-SQL interface for K-12 education data (California CDE data — attendance, discipline, enrollment, assessments)
- Started with 15 hand-written few-shot examples in `prompts.py` (later expanded to 35 with gap-fillers)
- The real warehouse has ~30 tables across three schemas (main_core, main_analytics, main_staging) with 492 columns
- Hand-written examples cover a tiny fraction; every new analytical pattern needed a new example
- The model got good at what you taught it, blind to everything else
- DSPy's promise: let an optimizer find the best few-shot examples algorithmically, not by hand

### 2. DSPy Architecture for Text-to-SQL
- **Signature**: `question → schema_context → sql` (typed contract, replaces free-text prompts)
- **Module topologies**: `dspy.Predict` (direct, single-step) vs `dspy.ChainOfThought` (adds reasoning step before SQL)
- **Custom metric** (`duckdb_execution_metric_gt`): execution score (does SQL compile and run in DuckDB?) + column-set Jaccard similarity with ground truth + result-shape proximity
- **`compact_demos()`**: post-processing that strips repeated schema_context from saved demonstrations — each demo carried the full ~1500-char schema, wasting context window
- **Stratified sampling**: buckets training examples by which tables they reference, ensures balanced coverage instead of over-representing single-table SELECTs
- All implemented in `dspy_text2sql.py`

### 3. BootstrapFewShot with Multi-Round Optimization
- **Round 1**: zero-shot bootstrapping (`teacher=None`) — model tries training set cold, successful traces saved as demos
- **Round 2**: Round 1 output becomes the teacher; fresh student compiled against harder examples the teacher can now solve
- **Round 3** (when run): MIPROv2 instruction optimization — Bayesian search over system prompt phrasing
- Checkpoint saves between rounds (`optimized_text2sql_round1.json`, `optimized_text2sql_round2.json`)
- Implemented in `dspy_optimize.py` with `TelemetryLM` (custom `dspy.LM` subclass that counts calls and times them)

### 4. The Size Mattered: Two Models, Opposite Results

Ran the full pipeline on two models. Results from logged eval runs (`evaluation.log`, `eval_summary.json`):

**DeepSeek-Coder-V2-Lite (local Ollama, quantized MoE ~2.4B active params)**

| Module | Baseline | Optimized | Gain |
|--------|----------|-----------|------|
| Predict (direct) | 40.0% | 66.7% | +26.7% |
| ChainOfThought | 33.3% | 46.7% | +13.4% |

Finding: ChainOfThought **hurts** the small model. The reasoning step acts as a distractor — by the time the model finishes writing English reasoning, it's drifted from SQL syntax. Predict's direct mapping is better.

**Qwen2.5-Coder-14B-Instruct-AWQ (Modal A10G cloud GPU)**

| Module | Baseline (exec) | Optimized (exec) | Baseline (judge) | Optimized (judge) |
|--------|-----------------|------------------|------------------|-------------------|
| ChainOfThought | 50.7% | 65.3% | 35.6% | 56.7% |

Finding: ChainOfThought **works** on 14B. The model has enough attention capacity to hold English reasoning and SQL syntax simultaneously. The optimized CoT pipeline drove a +14.6% execution gain and +21.1% LLM-judge gain.

**The crossover**: somewhere between ~2.4B active params and 14.7B dense params, ChainOfThought flips from harmful to helpful. This is the most actionable finding for anyone deploying Text-to-SQL locally.

### 5. TelemetryLM: Making DSPy Observable
- Problem: DSPy optimization is a black box — you kick off BootstrapFewShot and wait
- Solution: `TelemetryLM` subclasses `dspy.LM`, overrides `__call__`, logs every call with timing
- Local Ollama run: 16 LM calls, ~35.9s avg, 579.8s total (9.7m)
- Modal Qwen run: 18 LM calls, ~5.0s avg, 94.8s total (from session knowledge base)
- This data tells you optimization belongs in CI/CD (async, nightly), not at query runtime
- Implemented in `dspy_optimize.py`

### 6. What DSPy Can't Fix: The LoRA Capacity Wall
- DSPy optimization ran on the 5-table synthetic schema — it improved prompt selection and instruction-following
- But the real warehouse has ~30 tables with proprietary column names and CDE-specific reporting categories
- Fine-tuned Qwen2.5-Coder-14B with LoRA on 11,222 synthetic NL→SQL pairs generated by Qwen2.5-72B via vLLM on Modal A100-80GB
- **r=32 adapter**: model generated coherent reasoning but hallucinated column names (e.g., inventing `customer_lifetime_value` because it seemed plausible) — the adapter didn't have enough rank capacity to override the base model's pre-training biases
- **r=64 adapter** (`KDDSTLC/lfed-qwen2.5-coder-14b-sql-lora-warehouse-r64` on HuggingFace): doubled trainable params (137M → 275M), trained on the real ~30-table warehouse schema instead of 5 synthetic tables
- Prompt optimization improves **how** the model applies what it knows; adapter capacity teaches it **new** schema ontology. These are complementary levers, not substitutes.
- Training data generation: `local-data-stack/training/modal_generate.py` and `generate_pairs.py`

### 7. The Pipeline (Code Walkthrough)
- `dspy_text2sql.py` — Signature, Module, dual-metric, compact_demos, stratified_sample
- `dspy_optimize.py` — BootstrapFewShot + MIPROv2 orchestrator with TelemetryLM and multi-round
- `dspy_evaluate.py` — execution metric + LLM-as-judge evaluation
- `modal_train/dspy_modal.py` — running the optimization on Modal with vLLM
- `modal_train/train_warehouse.py` + `modal_train_warehouse.py` — LoRA training (r=32 and r=64)
- `nl_query/eval.py` — production eval harness against real DuckDB warehouse (execution_match + exact_match)
- `nl_query/model_inference.py` — dual backend (transformers+PEFT on GPU, llama.cpp+GGUF on Mac)

### Key Takeaways
1. **Match the DSPy module to model size**: Predict for <10B active params, ChainOfThought for 14B+
2. **Multi-round bootstrapping compounds**: Round 1 teacher feeds Round 2 student, pushing into harder queries
3. **Token economics matter**: `compact_demos()` stripping repeated schema context is essential when each demo carries 1500+ chars of DDL
4. **Prompt optimization ≠ parameter capacity**: DSPy improves instruction-following; LoRA rank teaches new schema. You need both.
5. **Observability is non-negotiable**: TelemetryLM transforms DSPy from a black-box script into a measurable engineering process
6. **Two repos, two phases**: DSPy optimization proved the concept on a synthetic schema; LoRA fine-tuning made it production-ready on the real warehouse

## Sources (all verified against repos)
- DSPy experiment code: `build-small-hackathon/Kasualdad_LFED/dspy_experiment/`
- Eval logs: `dspy_experiment/evaluation.log`, `dspy_experiment/optimization.log`
- Eval summary: `build-small-hackathon/eval_summary.json`, `run_metadata.json`
- Session knowledge base: `build-small-hackathon/SESSION_KNOWLEDGE_BASE.md`
- LoRA model card: `https://huggingface.co/KDDSTLC/lfed-qwen2.5-coder-14b-sql-lora-warehouse-r64`
- Production eval harness: `local-data-stack/nl_query/eval.py`
- Training data generation: `local-data-stack/training/modal_generate.py`
- Qwen2.5-Coder-14B specs: `https://huggingface.co/Qwen/Qwen2.5-Coder-14B-Instruct`
- DSPy framework: `https://github.com/stanfordnlp/dspy`
- Local data stack: `https://github.com/l-mds/local-data-stack`