---
title: "Day 09 — PEFT: Training 3.3% of a 14B Model"
created: 2026-06-23
type: linkedin-post
series: open-source-stack
day: 9
week: 3
status: draft
references:
  hf_adapter: "https://huggingface.co/KDDSTLC/lfed-qwen2.5-coder-14b-sql-lora-warehouse-r64"
  hackathon_article: "https://www.lucidotechnologyconsulting.com/blog/BuildingLFEDS"
---

I modified 3.3% of a 14-billion-parameter model's weights. It generates district-specific SQL from plain English against a real 19-table education warehouse. Total training cost: about $30 on a rented GPU.

PEFT — Parameter-Efficient Fine-Tuning — is the reason this is possible. Traditional fine-tuning updates every parameter in the model. For a 14B model, that means multiple high-end GPUs, weeks of training time, and an engineering team. Cost: $20K-$50K minimum. Not feasible for a school district. Not feasible for most organizations.

PEFT freezes the original model and injects a small set of trainable weights — a LoRA adapter — alongside the frozen layers. Only the adapter gets trained. The result: a 14B model fine-tunes on a single GPU in hours. The VRAM requirement drops from "enterprise cluster" to "one rented A10G."

I trained the latest version on Modal — a serverless GPU platform. QLoRA, rank 64, alpha 64, targeting all linear layers. Three epochs. Learning rate 3e-4. The adapter is about 1.1 GB — double the size of the earlier r=32 version, which is exactly the point. The first run at r=32 taught the model text-to-SQL structure but hallucinated table and column names. The r=64 version gives the model enough capacity to actually internalize the warehouse schema.

The model was trained on 11,222 validated question-to-SQL pairs — every one executed against the real DuckDB warehouse. Not a synthetic five-table demo schema. The full warehouse: dim_students, fact_attendance, fact_discipline, fact_academic_records, mart_cde_school_accountability, equity breakdowns by race, chronic absenteeism risk views. Real complexity.

What this means operationally: a district can fine-tune a model on its own CALPADS validation rules, its own attendance coding conventions, its own board report format. Not a generic model that "might" understand California education data. A model trained on the exact patterns its analysts work with every day.

I wrote about the full training pipeline — the config, the crashes, the fixes — in the build article. Link in the first comment.

This week: the intelligence layer. Yesterday's post closed week two with the generalization thesis. Today starts the deep dive into how local AI actually gets trained. Tomorrow: LoRA adapters and why they're the right architectural pattern for small orgs.

A nonprofit can fine-tune the same way. Grant application language, program outcome patterns, donor segmentation — all trainable on a 14B model for the cost of lunch. The technique doesn't care about the domain. The data does.
