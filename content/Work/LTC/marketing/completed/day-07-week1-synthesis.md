---
title: "Day 07 — Week 1 Synthesis: The Stack, As Built"
created: 2026-06-23
type: linkedin-post
series: open-source-stack
day: 7
week: 2
status: draft
references:
  hackathon_article: "https://www.lucidotechnologyconsulting.com/blog/BuildingLFEDS"
  hackathon_linkedin: "https://www.linkedin.com/posts/franklucido_ugcPost-7472391906967060480-xWqc/"
  github_repo: "https://github.com/flucido/local-data-stack"
  hf_space: "https://huggingface.co/spaces/build-small-hackathon/Kasualdad_LFED"
---

# Week 1 Synthesis: The Stack, As Built

This week I walked through the components of a local-first data stack. Here's what makes it different from every architecture deck you've seen: I built it. It runs. The code is public.

DuckDB — embedded analytical SQL, 12 million rows in under a second on a laptop. With dbt for transformations, 50 lines of Python replaces a $30K ETL tool. I pointed a fine-tuned 14B model at it and it handles text-to-SQL queries against a real 19-table education warehouse — not a demo schema with five synthetic tables. Open-sourced at github.com/flucido/local-data-stack.

dlt — the ingestion framework that pulls Aeries exports into Delta Lake staging tables. Schema enforcement catches column drift before it corrupts downstream queries. Time travel lets you audit what changed and when.

Parquet + Delta Lake — open file formats that make the whole stack portable. Ingest once, transform with dbt, query with DuckDB, visualize with Rill. Vendor lock-in is a format problem, not a contract problem.

Ollama + llama.cpp — two inference engines, same fine-tuned model. Deploy the r=64 warehouse-trained LoRA adapter on a cloud GPU via transformers+PEFT, or merge and convert to GGUF for local Mac inference via Metal. The model travels, the runtime adapts.

Mac Studio — $12K of hardware runs the full stack. Five-year TCO: $12K vs. $375K for a comparable cloud contract.

Total cost to build and deploy: roughly $50 in GPU rentals for training data generation and fine-tuning, a Mac Studio for inference, and zero ongoing vendor fees. The code is MIT-licensed. The models are on Hugging Face. The training data is published.

I wrote about the full build process — the fine-tuning pipeline, the deployment flavors, the engineering lessons — in the article linked in the first comment. The live demo is also linked there.

Next week: the intelligence layer. Fine-tuning, LoRA adapters, DSPy prompt optimization, and why the data problem is harder than the model problem.

The architecture isn't school-specific. A nonprofit tracking program outcomes, a small business building a customer analytics tool — the same stack, the same economics, the same ownership. The tools don't know what domain they're serving. That's the point.
