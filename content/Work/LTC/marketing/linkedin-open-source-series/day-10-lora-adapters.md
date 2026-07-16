---
title: "Day 10 — LoRA: One Model, Many Behaviors"
created: 2026-06-23
type: linkedin-post
series: open-source-stack
day: 10
week: 3
status: draft
---

One base model. Multiple swappable adapters. Each adapter teaches the model a different behavior. This is the pattern that makes local AI practical for small organizations.

LoRA — Low-Rank Adaptation — injects small trainable matrices alongside the frozen weights of a pre-trained model. The base model stays unchanged. The adapter is a separate file — 1.1 GB for the warehouse-trained version — that gets loaded on top.

Think of it as policies, not engines. The base model is the engine. Each LoRA adapter is a policy that tells the engine how to behave in a specific context.

For the warehouse model, I trained one adapter: text-to-SQL for school district analytics against 19 real tables. But the architecture supports more:

One base model — Qwen2.5-Coder-14B, open weights, free to download.
Adapter 1 — CALPADS validation rules. The model learns your district's specific reporting conventions.
Adapter 2 — Board packet summarization. The model learns your board's format, sections, tone.
Adapter 3 — Schema normalization. The model learns to map legacy SIS field names to your canonical schema.

Same model. Three behaviors. Three adapter files. Swap them like you'd swap a config file. No retraining the base. No buying a new model.

The first run at rank 32 taught me something important: lower ranks capture behavior patterns (SQL structure, query style, output format) but not enough schema specifics to avoid hallucinating table names. The r=64 version doubled the capacity — 275M trainable parameters across all linear layers — and that made the difference. The model now generates queries that reference real warehouse tables.

The district owns every adapter. The adapters are software artifacts — version them, share them, audit them. When the vendor would charge $50K for a "custom AI model," the district trains an adapter for the cost of a GPU rental.

Yesterday I wrote about PEFT — the technique that makes this affordable. Today is the architectural pattern it enables. Tomorrow: the three engineering decisions inside QLoRA that collapsed the cost by 10x.

The same pattern works for any domain. A nonprofit trains one adapter for grant writing, another for outcome reporting. A small business trains one for customer email classification, another for invoice extraction. One model, many jobs, zero vendor lock-in.
