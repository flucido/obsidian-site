---
title: "From Plain English to DuckDB SQL: Building LFED"
date: 2026-06-14
draft: false
published_url: https://www.lucidotechnologyconsulting.com/blog/BuildingLFEDS
source: docs/BLOG_POST_WEBSITE.md
---

# From Plain English to DuckDB SQL: Building LFED

School administrators collect useful data — attendance, grades, discipline incidents, demographics, enrollment trends — but asking a quick question usually means a BI tool, a ticket, or a spreadsheet export. Most "AI" assistants route the question to a cloud API, which is a non-starter when the data includes student information.

I built **Local First Education Data (LFED)**, a Gradio assistant that lets school staff ask plain-English questions and get answers from a local DuckDB database. The live demo runs on Hugging Face ZeroGPU; the product itself can run offline with llama.cpp + GGUF. No data leaves the machine.

This is what I learned building it for the **HF Build Small Hackathon** "Backyard AI" chapter.

---

## What it does

A user types a question like:

> "What's the average GPA for chronically absent students versus non-chronic students in 2023-2024?"

LFED then sends the question plus a schema prompt to a fine-tuned Qwen2.5-Coder-14B model, streams the generated SQL into the UI, validates it against the schema, rejects any non-`SELECT` statement, executes it on an in-memory DuckDB seeded from deterministic Parquet files, and returns a plain-English summary, a table, an optional CSV download, and the generated SQL.

The UI is intentionally simple: a single input, three domain starter dropdowns, a first-time FAQ modal, and a result region with a "Show me how this was computed" disclosure.

---

## Two deployment flavors, one fine-tune

The Space demo uses **transformers + PEFT** on a bnb-4-bit base with the fine-tuned LoRA adapter. That is the only path that works on ZeroGPU, because ZeroGPU's CUDA abstraction is PyTorch-only — llama.cpp cannot use it.

The local-first flavor runs the same fine-tuned weights as a **GGUF Q4_K_M** model through llama.cpp + `llama-cpp-python` on Metal or CPU. Same model, same data, different inference engine.

| Flavor | Where | Inference | Model |
|---|---|---|---|
| Space demo | ZeroGPU | transformers + PEFT | `unsloth/qwen2.5-coder-14b-instruct-bnb-4bit` + `build-small-hackathon/lfed-qwen2.5-coder-14b-sql-lora` |
| Local-first | Your machine | llama.cpp + GGUF | `build-small-hackathon/lfed-qwen2.5-coder-14b-sql-gguf` |

Both use the same QLoRA fine-tune trained on 27,859 synthetic NL→SQL pairs.

---

## The training pipeline

I started with a 7B model and 1,289 hand-generated pairs, then scaled to **27,859 pairs** and a 14B base model. The data came from a small template-driven generator, augmented with Gretel, then rephrased for natural-language variety. After deduplication and validation, the final JSONL has **25,886 examples**.

Training used Unsloth QLoRA on a Modal A10G:

| Setting | Value |
|---|---|
| Base model | `unsloth/Qwen2.5-Coder-14B-Instruct` |
| Quantization | 4-bit (bnb NF4) |
| LoRA r / α | 32 / 32 |
| Epochs | 2 |
| Effective batch | 32 (2 × 16 gradient accumulation) |
| Learning rate | 1e-4 |
| Hardware | Modal A10G 24 GB |

Five `modal run` attempts crashed with `Received a cancellation signal` because the client gRPC connection dropped. The fix was `modal deploy` followed by `fn.spawn()` — a true fire-and-forget call.

Published artifacts:

- **LoRA adapter:** `build-small-hackathon/lfed-qwen2.5-coder-14b-sql-lora`
- **GGUF Q4_K_M:** `build-small-hackathon/lfed-qwen2.5-coder-14b-sql-gguf`
- **Training dataset:** `build-small-hackathon/lfed-training-data` (25,886 pairs)

---

## Six lessons I will reuse

1. **Scope the model's job tightly.** The prompt gives a schema, four few-shot examples, and one task: emit a `SELECT` query in a ` ```sql ``` ` block. No explanation, no formatting, no multi-turn reasoning. That narrow contract makes a 14B model reliable.

2. **Validate before executing.** The guard rejects `DROP`, `DELETE`, `INSERT`, `UPDATE`, `ALTER`, `TRUNCATE`, `CREATE`, `ATTACH`, `DETACH`, and `PRAGMA`, validates the query with `EXPLAIN`, and wraps it in `SELECT * FROM (<query>) AS _safe LIMIT 1000`. Each query runs in a fresh in-memory DuckDB connection.

3. **ZeroGPU is PyTorch-only.** I tried to keep llama.cpp on the Space because the local-first path used it. That failed cleanly. The fix was switching the Space to transformers + PEFT + bnb-4-bit while keeping llama.cpp on the `product` branch.

4. **Gradio's scoped CSS beats generic selectors.** A single rule — `.gradio-container * { border-width: 0 0 1px 0 !important; }` — applied a bottom border to every nested element and turned the UI into ruled paper. Fixing the dark wrappers, light dataframe, and unreadable labels required inspecting the live Space DOM. The real classes were `.form.svelte-d5xbca`, `.svelte-19djge9`, and `.block.explainer-content.svelte-1plpy97`.

5. **`modal deploy` + `fn.spawn()` is fire-and-forget.** `modal run` keeps a client connection; if it drops, the remote function is cancelled. `modal deploy` + `fn.spawn()` submits work without waiting.

6. **Data artifacts are part of the product.** Committing five Parquet seed files via git LFS, publishing the training dataset with a proper YAML-frontmatter dataset card, and keeping the model card current took as much effort as training — and matter as much for reproducibility.

---

## Mistakes and pivots

- **Border-line regression.** A too-broad CSS selector produced stacked horizontal lines. Fixed by scoping border removal to wrapper classes and restoring borders only on inputs, dropdowns, and the previous-answer ribbon.
- **Fighting the theme.** Overriding Gradio's dark defaults was a losing battle. Switching to `gr.themes.Soft` and applying small targeted overrides was faster.
- **Double-scaled percentages.** The CSV formatter multiplied every `_rate` column by 100, but the model sometimes returns percentages already. The fix: scale only values between 0 and 1.
- **Deprecated CLI instructions.** `huggingface-cli` is deprecated. I updated workflows to `hf` v1.17.0.
- **Dataset upload quirk.** `hf upload` with two file paths silently uploaded one file under a confused path. The safe pattern is to upload each file separately with `hf upload REPO_ID LOCAL_PATH PATH_IN_REPO --type dataset`.

---

## Evaluation and tests

I assembled **15 real-world-style evaluation queries** across attendance, grades, enrollment, discipline, and equity comparisons, scoring each on correctness, SQL quality, UX, and latency. The pytest suite has **81 tests** covering the execution guard, data engine isolation, seed integrity, and model inference prompt assembly / streaming. Model calls are mocked, so the suite runs in about a second.

---

## What's next

- Query history and saved comparisons
- Dashboard boards: standard + scratch
- Post-deploy smoke tests with the evaluation bank
- Continued local-first work on the `product` branch
- Cleaner write-ups of the dataset and model cards

---

## Takeaway

A small, focused fine-tune can outperform a much larger general model when the task is tightly bounded. The hard parts were not training — they were deployment, data hygiene, execution safety, and UI specificity. Local-first and cloud-demo can coexist if you keep the inference-engine choice separate from the model itself.

---

## Links

- **Live Space:** https://huggingface.co/spaces/build-small-hackathon/Kasualdad_LFED
- **LoRA adapter:** https://huggingface.co/build-small-hackathon/lfed-qwen2.5-coder-14b-sql-lora
- **GGUF model:** https://huggingface.co/build-small-hackathon/lfed-qwen2.5-coder-14b-sql-gguf
- **Training dataset:** https://huggingface.co/datasets/build-small-hackathon/lfed-training-data
