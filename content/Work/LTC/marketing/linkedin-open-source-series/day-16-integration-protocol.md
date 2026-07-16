---
title: "Day 16 — Start With One DuckDB Query"
created: 2026-06-23
type: linkedin-post
series: open-source-stack
day: 16
week: 4
status: draft
references:
  github_repo: "https://github.com/flucido/local-data-stack"
  hackathon_article: "https://www.lucidotechnologyconsulting.com/blog/BuildingLFEDS"
  hf_space: "https://huggingface.co/spaces/build-small-hackathon/Kasualdad_LFED"
---

Data sovereignty isn't a procurement event. It's five small operational decisions made quarter by quarter, until one day the vendor calls and you realize you don't need them anymore.

I built this entire stack — DuckDB, dbt, dlt, Delta Lake, Rill dashboards, local inference, fine-tuned model — starting from one DuckDB query against one Parquet file. Here's the path, scaled down to what any school district can start this quarter.

Step 1: Export one report to Parquet.
Take the most painful recurring report — the one that costs analyst hours every cycle. Export the source data to a Parquet file. One file. Open format. You now own the data in a format every tool can read.

Step 2: Point DuckDB at it.
Install DuckDB — it's free, it's one binary, no server. Write one SELECT statement against the Parquet file. You now have sub-second analytics on data you control. No vendor ticket. No export wait.

Step 3: Pipe a second data source through dlt.
The script that used to take an analyst four hours to merge two exports? dlt ingests both into Delta Lake staging tables, schema enforcement catches column drift, and dbt transforms them into analytics-ready tables. The analyst gets their Wednesday night back.

Step 4: Add local logging.
Every query, every access, every result — logged to a local file. When the auditor asks "who accessed this record and why," you produce the log. Not a dashboard. A log.

Step 5: Pilot local AI on one workflow.
Fine-tune a model on one task — CALPADS validation, schema normalization, board packet drafting. One LoRA adapter. One workflow. Measure the result. Let the success carry the argument for the next one.

I started with a DuckDB schema and a Parquet export. That became a fine-tuned 14B model trained on 11K validated pairs against a real 19-table warehouse, a published training dataset, a live demo, and an open-source repo. The code is at github.com/flucido/local-data-stack. The build story is in the article linked in the first comment.

Start with one spreadsheet. End with an institution that owns its own intelligence.

This was day 16 — the final post in the series. The full arc: from DuckDB to fine-tuning to the boardroom. Every post drew from a real build, a real deployment, a real set of engineering decisions. The tools are open. The models are open. The data is yours. The architecture isn't school-specific. It's for any organization that has data it cares about and a budget that can't sustain a forever subscription.
