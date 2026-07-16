---
title: "Day 15 — Three Questions I'd Ask Any AI Vendor"
created: 2026-06-23
type: linkedin-post
series: open-source-stack
day: 15
week: 4
status: draft
---

I built a local AI system for school district analytics. I fine-tuned the model, published the weights, published the training data, deployed it on hardware that fits on a desk. Now here's what I'd ask any vendor selling "AI" to a school — because I know what the answers should look like when the system is real.

Question 1: Model Weight Ownership
If your district's data is used to fine-tune the vendor's model, who owns the resulting weights? If the vendor says "we do — it's our base model," fine. But then the district shouldn't be paying for the fine-tuning or contributing data that increases the vendor's asset value without compensation or perpetual license rights.

When I built the warehouse model, I published the LoRA adapter on Hugging Face under my org. The district owns it. The adapter is about 1.1 GB at rank 64 — sufficient capacity to internalize the real warehouse schema. It's a software artifact — version it, share it, audit it. If a vendor can't point to a specific artifact and say "this is yours," the model isn't yours.

Question 2: Data Erasure Pipeline
When the contract ends, what is the verifiable technical pipeline for full data destruction? Not "we follow industry best practices." The actual steps. What stores are purged? What backups? What logs?

In my system, all warehouse data is in DuckDB — it ceases to exist when the process stops. The source files are Parquet and Delta tables on local disk. Deletion is `rm`. There is no cloud store, no vendor-side cache, no third-party log. If a vendor can't describe the pipeline in engineering terms, it doesn't exist.

Question 3: Compliance Logging
Can the vendor produce code-level access logs — deterministic query tracking showing exactly which system accessed which student record, when, and why? Or is the answer a dashboard with green checkmarks?

In the local-data-stack, every query runs through a validation guard that logs the SQL, the timestamp, and the result. The code is in the repo. The logs are reproducible. A dashboard is a marketing artifact. Access logs are a compliance artifact. Auditors know the difference.

Which of these three questions has your current AI vendor answered in writing — with engineering documentation, not marketing slides?

Yesterday I wrote about schema context plus fine-tuning. Today is the procurement gate. Tomorrow: the integration protocol — where to start on Monday.

These questions apply to any small org buying AI tools. A nonprofit evaluating a donor analytics platform, a small business considering a CRM with AI features — ask the same three. If the answers aren't engineering-grade, the product isn't either.
