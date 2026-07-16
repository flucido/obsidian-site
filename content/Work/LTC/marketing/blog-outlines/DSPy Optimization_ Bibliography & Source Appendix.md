# Bibliography & Source Appendix

## Blog: "DSPy Prompt Optimization for Text-to-SQL: Model Size Matters"

Last verified: 2026-06-30

---

## A. Primary sources (your own repos and artifacts)

### A1. DSPy experiment code and logs

**Repo:** `/Users/flucido/projects/build-small-hackathon/Kasualdad_LFED/dspy_experiment/`

| File | What it contains | Used in blog section |
|------|-----------------|---------------------|
| `dspy_text2sql.py` | Text2SQLSignature (question → schema_context → sql), Text2SQLModule (ChainOfThought), `duckdb_execution_metric`, `duckdb_execution_metric_gt` (column-set Jaccard), `compact_demos()`, `stratified_sample()` | §2 (Setting up the pipeline), §3 (Multi-round optimization) |
| `dspy_optimize.py` | BootstrapFewShot + MIPROv2 orchestrator, TelemetryLM subclass, multi-round teacher-student distillation, checkpoint architecture | §3, §5 (TelemetryLM) |
| `dspy_evaluate.py` | Dual-metric evaluation (DuckDB execution + LLM-as-judge), 15-query test bank | §4 (results) |
| `optimization.log` | Logged optimization runs: Round 1/2/3, call counts, timing, checkpoint saves | §5 (telemetry numbers) |
| `evaluation.log` | Logged eval runs: DeepSeek Predict 40.0%→66.7%, CoT 33.3%→46.7% | §4 (DeepSeek table) |
| `eval_summary.json` | Qwen2.5-Coder-14B: exec 50.67%→65.33%, LLM judge 35.56%→56.67% | §4 (Qwen table) |
| `run_metadata.json` | n_train=400, max_rounds=3, optimizer=bootstrap, stratify=true | §4 (Qwen run config) |
| `optimized_text2sql_round1.json` | Round 1 checkpoint (compiled demos) | §3 (checkpoint architecture) |
| `optimized_text2sql_round2.json` | Round 2 checkpoint | §3 |
| `optimized_text2sql.json` | Final optimized module | §3 |
| `traces.jsonl` | Per-call traces from local Ollama optimization | §5 |
| `dspy_traces.json` | Prediction traces (90 entries) from evaluation runs | §4 |
| `dspy_analysis/content*.txt` | Captured Modal run prediction traces (11 files with full reasoning + SQL outputs) | §4 |
| `dspy_analysis/content (9).txt` | Run metadata echoing eval results | §4 |
| `archived/20260621_111546/` | Earlier optimization and evaluation logs (pre-multi-round) | §4 (baseline runs) |

### A2. Modal orchestrator

**File:** `/Users/flucido/projects/build-small-hackathon/Kasualdad_LFED/modal_train/dspy_modal.py`

- Modal app `kasualdad-lfed-dspy` — runs vLLM with Qwen2.5-Coder-14B-Instruct-AWQ on A10G GPU
- Calls `run_optimization()` from `dspy_optimize.py` then `run_comparison()` from `dspy_evaluate.py`
- Persists results to Modal volume `lfed-training-data` at `/data/dspy_results/<timestamp>/`
- Used in: §4 (Qwen results), §5 (telemetry), §6 (full pipeline)

### A3. Session knowledge base

**File:** `/Users/flucido/projects/build-small-hackathon/SESSION_KNOWLEDGE_BASE.md`

- Documents the full 5-phase pipeline: DSPy optimization → schema curation → training data generation → LoRA training → evaluation
- Records: "3 rounds in 94.8s, 18 LM calls at ~5s each" (Modal Qwen run)
- Records: 11,222 validated training pairs at 88% validity rate, ~$20 cost on A100-80GB
- Records: r=32 (137M params, 1.7%) → r=64 (275M params, 3.3%)
- Records: hallucination problem and the fix (higher rank + real schema)
- Used in: §4, §5, §6 (LoRA section)

### A4. Eval and metadata artifacts (root level)

**Repo:** `/Users/flucido/projects/build-small-hackathon/`

| File | Contents | Used in |
|------|----------|---------|
| `eval_summary.json` | Qwen2.5-Coder-14B eval results (duplicate of dspy_experiment copy) | §4 |
| `run_metadata.json` | Run config (duplicate) | §4 |
| `pairs_warehouse.jsonl` | 3.9MB of generated NL→SQL training pairs | §6 |
| `adapter_config.json` | LoRA adapter configuration | §6 |
| `lora-adapter-warehouse/` | Local copy of r=64 adapter weights | §6 |
| `session_logs/dspy_eval_summary.json` | Another copy of eval results | §4 |

### A5. Production repo

**Repo:** `/Users/flucido/projects/local-data-stack/`

| File | What it contains | Used in blog section |
|------|-----------------|---------------------|
| `nl_query/eval.py` | Production eval harness — 20-question held-out test set, execution_match (result-set equality) + exact_match (normalized string), runs against real DuckDB warehouse | §6 (Phase 3) |
| `nl_query/model_inference.py` | Dual backend inference: TransformersLLM (transformers+PEFT, CUDA/MPS) and LlamaCppLLM (llama.cpp+GGUF, Metal/CPU) | §6 (Phase 3) |
| `nl_query/prompts.py` | 15 base + 20 gap-filler = 35 hand-written few-shot examples, schema documentation, system prompt | §1 (the problem) |
| `nl_query/eval_test_set.jsonl` | 20-question held-out eval set with gold SQL, difficulty labels, query paths | §6 |
| `training/modal_generate.py` | Modal app for synthetic pair generation using Qwen2.5-72B-Instruct-AWQ via vLLM on A100-80GB | §6 (Phase 2) |
| `training/generate_pairs.py` | Local generation script using DeepSeek-Coder-V2-Lite via Ollama (uses `dspy.LM` as LLM client) | §6 (Phase 2) |
| `training/training_schema.json` | Curated 19-table warehouse schema (492 columns) with CDE codes | §6 |
| `models/lora-warehouse-r64/` | Local copy of r=64 LoRA adapter | §6 |
| `models/lfed-qwen2.5-coder-14b-sql-warehouse-r64-Q4_K_M.gguf` | Merged GGUF for llama.cpp inference | §6 |

### A6. Modal volume (not downloaded locally)

**Volume:** `lfed-training-data`
**Path:** `/data/dspy_results/20260621_203343/`

Contains full Modal run artifacts (optimization_modal.log, traces_modal.jsonl, eval logs) from the Qwen2.5-Coder-14B DSPy optimization. Not downloaded locally; retrievable via:

```bash
modal volume get lfed-training-data /data/dspy_results/20260621_203343/
```

Referenced in: §4 (Qwen results), §5 (telemetry: 18 calls / 94.8s)

---

## B. External sources (verified URLs)

### B1. Models

| Source | URL | Used for | Verified |
|--------|-----|----------|----------|
| Qwen2.5-Coder-14B-Instruct model card | https://huggingface.co/Qwen/Qwen2.5-Coder-14B-Instruct | Model specs: 14.7B total, 13.1B non-embedding, 48 layers, GQA (40 Q / 8 KV heads), 131,072 context, RoPE, SwiGLU, RMSNorm, 5.5T training tokens | 2026-06-30 |
| KDDSTLC r=64 LoRA adapter | https://huggingface.co/KDDSTLC/lfed-qwen2.5-coder-14b-sql-lora-warehouse-r64 | r=32→r=64 progression, v1 vs v2 comparison, known hallucination limitation, training data (72B-generated synthetic pairs) | 2026-06-30 |
| DeepSeek-Coder-V2-Lite-Instruct | https://huggingface.co/deepseek-ai/DeepSeek-Coder-V2-Lite-Instruct | MoE architecture, ~2.4B active params, local Ollama deployment | 2026-06-30 |
| Qwen2.5-Coder Technical Report | https://arxiv.org/abs/2409.12186 | Architecture details, training data scale | 2026-06-30 |

### B2. Frameworks and tools

| Source | URL | Used for | Verified |
|--------|-----|----------|----------|
| DSPy (Stanford NLP) | https://github.com/stanfordnlp/dspy | Framework for programmatic prompt optimization, BootstrapFewShot, MIPROv2, Signatures, Modules | 2026-06-30 |
| DSPy docs | https://dspy.ai/ | MIPROv2 description, module reference | 2026-06-30 |
| vLLM | https://github.com/vllm-project/vllm | GPU inference server for Qwen models on Modal | 2026-06-30 |
| Modal | https://modal.com/ | Cloud GPU infrastructure (A10G for DSPy/14B, A100-80GB for 72B generation) | 2026-06-30 |
| Ollama | https://ollama.ai/ | Local LLM runtime for DeepSeek-Coder-V2-Lite | 2026-06-30 |
| DuckDB | https://duckdb.org/ | In-memory analytical database, execution engine for eval harness | 2026-06-30 |
| Dagster | https://dagster.io/ | Data orchestration in local-data-stack | 2026-06-30 |
| dbt | https://dbt.com/ | Dimensional modeling in local-data-stack | 2026-06-30 |

### B3. Infrastructure repos

| Source | URL | Used for | Verified |
|--------|-----|----------|----------|
| local-data-stack template | https://github.com/l-mds/local-data-stack | Dagster + dbt + DuckDB + Pixi stack, slow-data philosophy | 2026-06-30 |
| jjovalle99/DSPy-Text2SQL | https://github.com/jjovalle99/DSPy-Text2SQL | Adjacent prior art: DSPy + Text-to-SQL with Starling-7B (different model, different numbers — not the basis for this work) | 2026-06-30 |
| evalops/dspy-0to1-guide | https://github.com/evalops/dspy-0to1-guide | DSPy learning reference (Signatures, Modules, Optimizers patterns) | 2026-06-30 |

### B4. Research papers

| Source | URL | Used for | Verified |
|--------|-----|----------|----------|
| Text2SQL-Flow (arXiv 2511.10192) | https://arxiv.org/html/2511.10192v1 | SQL-aware data augmentation framework, CoT generation patterns — context for the synthetic pair generation approach | 2026-06-30 |
| Qwen2.5-Coder Technical Report (arXiv 2409.12186) | https://arxiv.org/abs/2409.12186 | Model architecture, training corpus, code reasoning capabilities | 2026-06-30 |
| Qwen2 Technical Report (arXiv 2407.10671) | https://arxiv.org/abs/2407.10671 | Base architecture details (GQA, RoPE, SwiGLU, RMSNorm) | 2026-06-30 |

### B5. Blog posts (context, not directly cited in the rewrite)

| Source | URL | Status |
|--------|-----|--------|
| Snowflake: "Smarter, Faster and Snowflake-Native: Real-Time Text2SQL Behind Snowflake Intelligence" | https://www.snowflake.com/en/blog/engineering/real-time-text-to-sql-snowflake-intelligence/ | Read for context on production Text2SQL approaches. Not cited in the rewrite (the original draft cited it decoratively). Published Nov 4, 2025. |
| AWS: "Generating value from enterprise data: Best practices for Text2SQL" | https://aws.amazon.com/blogs/machine-learning/generating-value-from-enterprise-data-best-practices-for-text2sql-and-generative-ai/ | Read for context. Not cited in the rewrite. |
| Georg Heiler: "Local data stack template" | https://georgheiler.com/2024/10/25/local-data-stack-template/ | Context for local-data-stack origin. Not cited in the rewrite. |
| FireBird Technologies: "Building a Reliable Text-to-SQL Pipeline" | https://www.firebird-technologies.com/blog/building-a-reliable-text-to-sql-pipeline-pt-1 | Read for context. Not cited in the rewrite. |
| HCL GUVI: "What is DSPy?" | https://www.guvi.in/blog/what-is-dspy/ | Read for context. Not cited in the rewrite. |

---

## C. Blog outline

**File:** `/Users/flucido/workspace/Work/LTC/marketing/blog-outlines/01-dspy-prompt-optimization-text-to-sql.md`

The verified outline with full source mapping. Updated 2026-06-30 with repo-grounded facts.

---

## D. Verification methodology

Every quantitative claim in the blog was verified against at least one of:

1. **A log file** (`evaluation.log`, `optimization.log`) — contains timestamped run output
2. **A JSON artifact** (`eval_summary.json`, `run_metadata.json`) — contains structured results
3. **The session knowledge base** (`SESSION_KNOWLEDGE_BASE.md`) — narrative record of the full pipeline
4. **The source code** (`dspy_text2sql.py`, `dspy_optimize.py`, `dspy_modal.py`) — confirms implementation matches claims
5. **An external model card** (HuggingFace) — confirms model specifications

Claims NOT verified and therefore NOT included in the rewrite:
- The "32 seed examples covered 5% of schema" claim from the original outline — not traceable to any artifact
- The `customer_lifetime_value` specific hallucination example from the original draft — plausible but not logged in available traces
- Any claim about the KDDSTLC repo being on GitHub (it's on HuggingFace)
- The original draft's "Works cited" list of 16+ sources — decorative, not actually referenced in the text

---

## E. Modal apps (cannot retrieve live logs)

The Modal CLI (`modal app list`) only shows running, deployed, or recently-stopped apps. Ephemeral `modal run` apps expire from the list after termination. The web dashboard at `https://modal.com/apps/flucido/main` requires authentication and could not be accessed programmatically.

Known Modal apps run (from `SESSION_KNOWLEDGE_BASE.md` and local artifacts):

| App name | Approx. date | GPU | Purpose | Local artifacts |
|----------|-------------|-----|---------|-----------------|
| `kasualdad-lfed-dspy` | 2026-06-21 | A10G | DSPy optimization + eval (Qwen2.5-Coder-14B-Instruct-AWQ) | `eval_summary.json`, `run_metadata.json`, `dspy_analysis/content*.txt` |
| `local-data-stack-generate` | 2026-06-21–22 | A100-80GB | Synthetic pair generation (Qwen2.5-72B-Instruct-AWQ) | `pairs_warehouse.jsonl` (3.9MB) |
| LoRA training (r=32) | 2026-06-21–22 | A10G/A100 | First LoRA training run | `SESSION_KNOWLEDGE_BASE.md` notes |
| LoRA training (r=64) | 2026-06-22–25 | A10G/A100 | Second LoRA training run | `adapter_config.json`, `lora-adapter-warehouse/` |

Full Modal volume results retrievable with:
```bash
modal volume get lfed-training-data /data/dspy_results/
modal volume get lfed-training-data /data/pairs_warehouse.jsonl
```