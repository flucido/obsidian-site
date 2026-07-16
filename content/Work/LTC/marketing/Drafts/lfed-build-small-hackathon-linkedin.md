---
date: 2026-06-14
draft: false
published_url: https://www.lucidotechnologyconsulting.com/blog/BuildingLFEDS
source: docs/LINKEDIN_POST.md
---
#   From Plain English to DuckDB SQL: Building LFEDS
🏫 I just shipped Local First Education Data Stack— a plain-English-to-SQL assistant for school district analytics — for the HF Build Small Hackathon.

The problem: school staff have useful data (attendance, grades, enrollment, discipline) but no fast, private way to ask questions. Most AI tools send that data to a cloud API. LFED doesn't.

What it does:
→ Type a question like "What's the average GPA for chronically absent students in 2023-2024?"
→ A fine-tuned Qwen2.5-Coder-14B model generates DuckDB SQL
→ A validation layer rejects anything that isn't a SELECT
→ Results come back as a summary, table, CSV download, and the SQL itself

Two flavors:
- Live Space demo: transformers + PEFT on HF ZeroGPU
- Local-first: llama.cpp + GGUF Q4_K_M on your own machine — no data leaves

The fine-tune:
- 27,859 synthetic NL→SQL pairs
- Unsloth QLoRA r=32 on Qwen2.5-Coder-14B
- Trained on Modal A10G

Hardest lessons were not model training:
1. Scope the model's job tightly — schema + few-shots + SELECT only.
2. Validate before executing. Always.
3. ZeroGPU is PyTorch-only; llama.cpp won't work there.
4. Gradio's scoped Svelte CSS beats generic selectors — inspect the live DOM.
5. `modal deploy` + `fn.spawn()` is fire-and-forget; `modal run` dies if your terminal drops.
6. Data artifacts matter as much as the model — Parquet seeds, dataset card, model card.

I also published the training dataset: 25,886 question→SQL pairs on the Hub.

Links:
- Live Space: https://huggingface.co/spaces/build-small-hackathon/Kasualdad_LFED
- LoRA adapter: https://huggingface.co/build-small-hackathon/lfed-qwen2.5-coder-14b-sql-lora
- GGUF: https://huggingface.co/build-small-hackathon/lfed-qwen2.5-coder-14b-sql-gguf
- Dataset: https://huggingface.co/datasets/build-small-hackathon/lfed-training-data

#BuildSmallHackathon #BackyardAI #HuggingFace #TextToSQL #DuckDB #LocalFirst #EdTech #Qwen #QLoRA #LLM
