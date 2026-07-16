---
title: "Day 04 — Ollama + llama.cpp: Two Engines, One Model"
created: 2026-06-23
type: linkedin-post
series: open-source-stack
day: 4
week: 1
status: draft
references:
  hf_space: "https://huggingface.co/spaces/build-small-hackathon/Kasualdad_LFED"
  hf_adapter: "https://huggingface.co/KDDSTLC/lfed-qwen2.5-coder-14b-sql-lora-warehouse-r64"
---

# Ollama + llama.cpp: Two Engines, One Model

Same fine-tuned model. Two inference engines. Two deployment contexts. Here's why that matters.

I fine-tuned Qwen2.5-Coder-14B for text-to-SQL on a real 19-table education warehouse schema. The model needed to run in two places: on Hugging Face ZeroGPU for a public demo, and locally on a Mac for the actual product.

ZeroGPU runs PyTorch-only CUDA. llama.cpp — the local inference engine — can't use it. I spent a day trying to make it work before accepting the constraint.

The fix: two flavors of the same model. The Space demo runs transformers + PEFT with a 4-bit quantized base and the LoRA adapter loaded on top. The local version takes those same fine-tuned weights, merges them into the base model, and converts to GGUF format for llama.cpp with Metal acceleration. Same training. Same data. Same LoRA adapter. Different engine.

This time around I learned something painful: Unsloth's merge-and-save is broken with transformers 5.x. The fix was plain transformers + PEFT — load the base 4-bit model, load the LoRA adapter, merge_and_unload(), save, then convert to GGUF. One extra step. Same result.

The insight I want to pass on: inference engine choice is separate from model choice. You don't marry your model to your runtime. You fine-tune once, then deploy wherever the hardware lives — a cloud GPU, a Mac Studio, a laptop.

The Space demo is live. The local version runs offline. Neither sends data anywhere.

Yesterday I wrote about DuckDB as the embedded analytical engine. Today is the inference layer that makes the AI side work locally. Tomorrow: the file formats that keep you from getting trapped.

The same principle applies everywhere. A small business prototypes on a laptop with Ollama, then deploys to a server with vLLM for concurrent users. Same model, same adapter, different engine. The model travels; the runtime adapts.
