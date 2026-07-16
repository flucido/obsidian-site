---
title: "Day 13 — The Data Problem: 32 to 11,222 Real Warehouse Pairs"
created: 2026-06-23
type: linkedin-post
series: open-source-stack
day: 13
week: 4
status: draft
references:
  hf_dataset: "https://huggingface.co/datasets/build-small-hackathon/lfed-training-data"
---

Most failed fine-tuning projects are blamed on the model. Almost all of them are dataset problems. Here's the journey that taught me this, at a scale most teams never attempt.

Version 1: 32 hand-written seed examples against a 5-table synthetic schema. The model trained but covered almost nothing — chronic absenteeism and enrollment counts, end of list. The problem wasn't the model. The problem was the data didn't represent the real domain.

Version 2: I scaled to the real thing. Instead of five synthetic tables, I curated the actual education data warehouse: 19 tables, 492 columns, 25 million rows of CDE data. Three query paths — student-level joins across core tables, the OBT mart (mart_cde_school_accountability), and staging tables from CDE downloads. CDE reporting categories: TA, RA, RB, RH, SE, EL, SWD. Both year formats: Aeries 'YYYY-YYYY' and CDE 'YYYY-YY'.

Version 3 — the big leap: I used Qwen2.5-72B-Instruct (a model 5x larger than the target) running on a Modal A100-80GB to generate training pairs from the real schema. The 72B model understood context well enough to produce correct, schema-valid SQL. I fed it the compact schema format (comma-separated columns saved ~5K tokens per prompt) and validated every single generated query by executing it against the real DuckDB warehouse.

Result: 11,222 validated pairs at 88% validity. The 12% that failed were syntactically wrong and discarded. Table coverage: core 56%, analytics 30%, staging 14%. Total cost: about $20 for 8 hours of A100 time.

The lessons:

1. A larger model generates better training data. The 72B produced SQL that executed correctly 88% of the time against a real warehouse. A smaller model would have generated plausible-looking garbage.

2. Every pair was validated against the actual DuckDB warehouse. Every SQL statement was run. If it didn't execute, it didn't make the dataset. This is the step most teams skip — and it's the step that separates models that work from models that hallucinate your board reports.

3. Schema fidelity matters more than volume. 11K validated pairs against the real schema beat 100K synthetic pairs against a toy. The r=32 model trained on this data understood SQL structure but hallucinated table names — the adapter didn't have enough capacity. The r=64 version doubled the parameters and captured the schema.

The hard part of fine-tuning isn't the code. It's sitting with the data, designing the schema representation, running the validation loop, finding the 12% that fail. The model is a reflection of the data. Get the data right and the model follows.

Yesterday I wrote about framework selection. Today is the data pipeline — the part that actually determines whether your model works. Tomorrow: why you need both schema context and fine-tuning, and how they interact.

The same discipline applies everywhere. A nonprofit training a model on grant outcomes needs validated pairs against real grant data, not scraped text. The curation is the moat.
