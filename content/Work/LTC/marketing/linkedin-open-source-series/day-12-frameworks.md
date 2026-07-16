---
title: "Day 12 — Unsloth, MLX, Axolotl: Pick the One on Your Desk"
created: 2026-06-23
type: linkedin-post
series: open-source-stack
day: 12
week: 3
status: draft
---

The "best" fine-tuning framework depends on what's already on your desk. Not what a blog post recommends. Not what a vendor sells. What hardware you already own.

I used Unsloth. It's the single-GPU speed champion — optimized for NVIDIA GPUs, 2-5x faster than vanilla transformers for QLoRA. My Modal A10G rental trained the warehouse model in about 10 hours. Unsloth handles the quantization, the gradient accumulation, the memory optimization.

But here's the decision matrix for a school district or small org. And I'm going to give you the real version — including where each framework will bite you.

Running Macs (which most California districts do)? MLX. Apple's native ML framework. Built for unified memory architecture. No NVIDIA GPU required. Free. The M2 Mac Studio on someone's desk can fine-tune a 7B-14B model with MLX. Slower than Unsloth on an A100, but the hardware cost is zero because you already own it.

Running NVIDIA GPUs or renting cloud? Unsloth. Fastest path from config to trained adapter. Single GPU. Minimal setup. BUT — and this cost me a day — Unsloth's merge-and-save is broken with transformers 5.x. If you're exporting to GGUF for local inference, use plain transformers + PEFT for the merge step. Train with Unsloth, export with vanilla PEFT.

Building a production pipeline with multiple GPUs and YAML configs? Axolotl. Production-grade, multi-GPU, reproducible configs. Overkill for most districts. Right for a dedicated ML team.

I chose Unsloth because I rented an NVIDIA A10G on Modal for $2/hour. If I'd been training on my own Mac, I would have used MLX. Same model, same data, same QLoRA config — different framework matched to different hardware.

The mistake is buying hardware to match a framework. The right move is matching the framework to the hardware you already own.

Yesterday I wrote about QLoRA's three pillars. Today is which tool to run them in. Tomorrow: the data problem — the part that's actually hard.

The same guidance applies to any small org. Don't buy an A100 to run Unsloth if you have a Mac. Use MLX. Don't buy a Mac if you already have an NVIDIA GPU. Use Unsloth. Match the tool to the desk, not the desk to the tool.
