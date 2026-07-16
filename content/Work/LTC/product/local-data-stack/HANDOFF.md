# Session Handoff — Kasualdad LFED → Local First Education Data Framework (LFED)

> **Last updated:** 2026-06-22 (Post-submission — Space rebranded, model switched to ZeroGPU, new training run in progress)
> **Submitted:** 2026-06-15 (HF Build Small Hackathon — "Backyard AI" chapter)
> **Space:** https://huggingface.co/spaces/build-small-hackathon/Kasualdad_LFED
> **Project root:** `/Users/flucido/projects/build-small-hackathon/Kasualdad_LFED`
> **Reference project:** `/Users/flucido/projects/local-data-stack` (education data stack patterns)

---

## TL;DR — How to Resume in 30 Seconds

```bash
cd /Users/flucido/projects/build-small-hackathon/Kasualdad_LFED
source .venv/bin/activate
python -c "import gradio, duckdb, llama_cpp, huggingface_hub; print('env OK')"

# Run the app
python app.py

# Run tests
pytest tests/ -v

# Kick off Modal fine-tuning (after setting HF_TOKEN secret)
modal run modal_train/modal_app.py
```

Full plan is in [`docs/PLAN.md`](./PLAN.md).

---

## Project Summary

**Kasualdad LFED** = a Hugging Face Space that turns natural-language questions from school district admins (principals, superintendents, department heads) into safe DuckDB SQL via a small local LLM (llama.cpp, GGUF format). Targets HF "Build Small" Hackathon badges:

- **Off the Grid** — all inference local, no API calls
- **Well-Tuned** — Modal fine-tune of a small text-to-SQL model pushed to Hub
- **Llama Champion** — llama.cpp as inference backend
- **Off-Brand** — custom CSS targeting cognitive-load reduction (added in second iteration)

User's success criteria: **win the hackathon** + have a **demoable slice for clients/employers**.

---

## Decisions Locked (do not re-litigate)

| Decision | Value | Source |
|---|---|---|
| Project location | `~/projects/build-small-hackathon/Kasualdad_LFED` | User: "this is where the hackathon is happening" |
| Source of truth | Copy of `~/projects/Kasualdad_LFED` | User choice (Recommended) |
| Python version | 3.12 (local + Space) | User: "ok to recreate" |
| Base model | `Qwen2.5-Coder-7B-Instruct` Q4_K_M | Plan, **7/7 sanity check passed** |
| Alt model (fallback) | `Llama-3.1-8B-Instruct` Q4_K_M | Plan (only if Qwen fails sanity) |
| Quantization | Q4_K_M (~4.4 GB) | Plan: speed/accuracy tradeoff for free Space |
| Code layout | Modular: `app.py` / `data_engine.py` / `model_inference.py` / `prompts.py` | User choice (Recommended) |
| Data source | Seed tables only for hackathon | User choice (Recommended) |
| Aesthetic | Linear / Vercel style, minimal monochrome + teal accent | User choice (Recommended) |
| Accent color | `#14b8a6` (teal) | User choice (Recommended) |
| Modal timing | Start fine-tune ASAP, end-to-end | User choice (Recommended) |
| Modal account | `flucido` | User |
| Modal credits | Hackathon-provided, confirmed | User |
| Custom CSS | **Yes** (reinstated after user feedback) | User: "i wnat the design to llook good" |

---

### Current State (as of 2026-06-22 — Post-Submission)

### ✅ Completed (Pre-Submission)
- **Phase 0-8 complete** — Bootstrap, model sanity, refactor, robustness, seed data, UI polish, tests (81 tests, 0 failures), Modal pipeline, README
- **Submitted 6/15** — 4 badges claimed: Off the Grid, Well-Tuned, Llama Champion, Off-Brand
- **LFED blog post published:** lucidotechnologyconsulting.com/blog/BuildingLFEDS

### ✅ Completed (Post-Submission)
- **Space rebranded:** Kasualdad LFED → **Local First Education Data Framework (LFED)**
- **Inference stack switched:** llama.cpp (Qwen2.5-Coder-7B Q4_K_M) → **transformers + bitsandbytes 4-bit + LoRA** for ZeroGPU compatibility
- **Model upgraded:** 7B → **fine-tuned 14B model** (trained on Modal, deployed to HF Space)
- **Training dataset published** on Hugging Face Hub
- **Performance:** GPU inference ~30s (achieved by streaming SQL to UI, reducing few-shot examples 7→4)
- **Schema expanded:** 5 tables (enrollment, attendance, grades, discipline, demographics) with deterministic Parquet seed data via Git LFS
- **Author section added** with LinkedIn, GitHub, HF links
- **Data engine expanded:** `data_engine.py` handles 5-table schema, queries execute against deterministic seed
- **Few-shot optimization:** `prompts.py` trimmed from 7 to 4 examples for faster inference

### ✅ Completed (6/21-22 — Warehouse Training Pipeline)
- **NL→SQL Generation Pipeline:** `training/modal_generate.py` — uses Qwen2.5-72B-Instruct-AWQ via vLLM on A100-80GB to generate validated NL→SQL pairs against real CDE warehouse schema
- **Schema expansion (warehouse):** 19 tables, 492 columns including `main_core.*`, `main_analytics.*`, `main_staging.*` schemas — real dbt models from local-data-stack
- **Training data generated:** 11,222 validated NL→SQL pairs at `pairs_warehouse.jsonl` on Modal `lfed-training-data` volume (exceeded 10K target, ~55% validation pass rate)
- **Warehouse Training Pipeline:** `modal_train/modal_train_warehouse.py` — Qwen2.5-Coder-14B-Instruct, 4-bit QLoRA (r=32, alpha=32), 2 epochs, 702 steps on A10G
- **Cancellation fix:** Switched from `.remote()` → `.spawn()` pattern to prevent Modal from killing training when local client disconnects
- **DSPy Optimization (initial):** `modal_train/dspy_modal.py` — DSPy prompt optimization run on 14B AWQ model. Results in `dspy_results/20260621_203343` on Modal volume
- **Key fixes:** DuckDB schema creation (`CREATE SCHEMA IF NOT EXISTS`), vLLM API error handling (`KeyError: 'choices'`), reduced epochs 3→2, extended timeout to 10 hours

### 🟡 In Progress (as of 6/22)
- **New training run active** — user reports a new model training process is running in the build-small-hackathon Space
- Space currently shows **runtime error** (`hf-mount` init step failed) — likely related to new model weights or adapter loading

### ⏳ Pending
- Debug Space runtime error — check `app.py` adapter loading path, verify model weights on HF Hub
- Validate new training run results against evaluation queries (`evaluation_queries.md`)
- Apply expansion plan: expand from 2→8 tables, 1,289→10,000+ training pairs
- Port local-data-stack analytics patterns (chronic absenteeism risk, wellbeing profiles, equity outcomes)
- Update local-data-stack repo (`/Users/flucido/projects/local-data-stack`) with post-hackathon improvements
- Consider ZeroGPU cold-start optimization (adapter pre-loading)

---

## File Tree (Current — post Phase 8)

```
~/projects/build-small-hackathon/Kasualdad_LFED/
├── .venv/                              # Python 3.12.8
├── app.py                              # Gradio UI + Off-Brand CSS (354 lines)
├── data_engine.py                      # DuckDB lifecycle, execution guard, timeout (310 lines)
├── model_inference.py                  # llama.cpp wrapper, streaming (211 lines)
├── prompts.py                          # System prompt, schema docs, few-shot (131 lines)
├── data/
│   └── generate_seed.py                # 5 schools × 4 years seed generator
├── tests/
│   ├── conftest.py                     # Shared fixtures
│   ├── test_execution_guard.py         # 24 tests — SQL injection, validation
│   ├── test_data_engine.py             # 23 tests — schema, isolation, integrity
│   └── test_model_inference.py         # 24 tests — prompt assembly, mock LLM
├── modal_train/
│   ├── generate_synthetic.py           # 1,289 NL→SQL training pairs
│   ├── train.py                        # Unsloth QLoRA recipe
│   ├── export_gguf.py                  # Merge → GGUF → HF Hub
│   ├── modal_app.py                    # Modal orchestration
│   └── train.jsonl                     # Training data (1,289 pairs)
├── docs/
│   ├── HANDOFF.md                      # this file
│   └── PLAN.md                         # full plan
├── requirements.txt                    # PINNED (4 deps)
├── packages.txt                        # System deps for HF Space
└── README.md                           # Expanded (badges, mermaid, schema, run guide)

# External artifacts:
/tmp/lfed-models/qwen/Qwen2.5-Coder-7B-Instruct.Q4_K_M.gguf   # 4.4 GB, ready
```

---

## Quick-Reference: Commands to Know

### Activate environment
```bash
cd /Users/flucido/projects/build-small-hackathon/Kasualdad_LFED
source .venv/bin/activate
```

### Test all imports
```bash
python -c "import gradio, duckdb, llama_cpp, huggingface_hub; print('env OK')"
```

### Run the app locally
```bash
python app.py
# → http://localhost:7860
```

### Run pytest (Phase 6+)
```bash
pytest tests/ -v
```

### Modal CLI (Phase 7+)
```bash
modal --version                           # verify install
modal secret list                         # list secrets
modal run modal_train/modal_app.py        # kick off training
```

---

## Outstanding Dependencies

| When | Dependency | Status |
|---|---|---|
| Now | `modal secret create huggingface HF_TOKEN=<token>` | ⏳ User action |
| After training | Swap `REPO_ID` in `model_inference.py` to the fine-tuned GGUF repo | ⏳ After Phase 7c |

---

## Submission Timeline (Pre-6/15)

| Day | Date | Phases | Status |
|---|---|---|---|
| 1 | Jun 6 | 0 · 1 · 2 · 3 · 4 · 5 · 6 · 7 · 8 | ✅ **Done** (all 8 phases in one session) |
| 3 | Jun 8 | 7b: Modal training (3-6 hrs overnight on A10G) | ✅ Complete |
| 4 | Jun 9 | 7c: merge → GGUF → push → swap REPO_ID | ✅ Complete |
| 5–6 | Jun 10–11 | 9: Deploy to HF Space + smoke test | ✅ Complete |
| 7–8 | Jun 12–13 | Buffer: polish, re-iterate | ✅ Complete |
| 9 | Jun 14 | Final verify + submit | ✅ **Submitted 6/15** |

## Post-Submission Timeline (Post-6/15)

| Date | Change | Status |
|---|---|---|
| Jun 15 | 4 badges claimed | ✅ |
| Jun 16-17 | Inference switch: llama.cpp → transformers + bnb-4bit + LoRA | ✅ |
| Jun 17 | Model upgrade: 7B → 14B (fine-tuned, deployed) | ✅ |
| Jun 17-18 | Rebrand: Kasualdad LFED → LFED | ✅ |
| Jun 18 | Training dataset published on HF Hub | ✅ |
| Jun 19 | Schema expanded: 5 tables, Parquet seed data via LFS | ✅ |
| Jun 19 | Few-shot optimization: 7→4 examples, GPU 30s | ✅ |
| Jun 22 | **New training run active** — debugging runtime error | 🟡 In Progress |
| TBD | Apply EXPANSION_PLAN.md: 8 tables, 10K+ training pairs | ⏳ |
| TBD | Port local-data-stack analytics patterns | ⏳ |
| TBD | Judge assessment / winner announcement | ⏳ |

---

## Reference

- Full plan: [`docs/PLAN.md`](./PLAN.md)
- HF Build Small Hackathon (track: Backyard AI): submission deadline 2026-06-15
- Modal: https://modal.com/apps/flucido/main (credits: hackathon-provided)
- HF Hub: fine-tuned GGUF repo (TBD — see Modal export script)
