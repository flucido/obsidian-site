---
title: "Day 14 — Schema Context + Fine-Tuning: Behavior Meets Facts"
created: 2026-06-23
type: linkedin-post
series: open-source-stack
day: 14
week: 4
status: draft
---

Fine-tuning teaches the model how to talk. The schema tells it what to talk about. Skip either one and you get a confident liar.

I see this confusion constantly. Teams fine-tune a model on their domain and expect it to know their data. It doesn't. Fine-tuning adjusts behavior — output format, tone, SQL structure, response patterns. It doesn't inject facts. A fine-tuned text-to-SQL model knows how to generate DuckDB syntax with proper JOIN patterns and aggregation. It doesn't magically memorize 492 column names across 19 tables.

The schema does that. The model receives the full warehouse schema — table names, column names, types, relationships, CDE category codes, year format conventions — as part of its context. Every query prompt includes the compact schema representation so the model never has to guess whether a column is called `chronic_absent_rate_pct` or `ca_chronic_absent_rate_pct`. It knows, because the schema is right there.

The end-to-end pipeline:
Question from user
→ Compact schema injected into prompt context (19 tables, 492 columns, three query paths)
→ Fine-tuned model generates SQL (behavior layer — knows DuckDB syntax, JOIN patterns, knows CDE reporting categories, knows SELECT-only constraint)
→ Validation guard checks the SQL (no DROP, no DELETE, EXPLAIN validates against schema)
→ DuckDB executes the SQL against the real warehouse (facts layer — actual enrollment, attendance, grades)
→ Result returns as a table and a plain-English summary

The fine-tune makes the SQL structurally correct. The schema context makes the column references accurate. DuckDB makes the answer real.

Now here's what the r=32 vs r=64 experiment taught me: at r=32, the model couldn't internalize enough schema from 11K pairs. It generated syntactically correct SQL that referenced made-up column names. At r=64 — double the adapter capacity, all linear layers — the model started generating queries against real warehouse tables. The schema context still matters (the model can't memorize 492 columns), but the adapter now knows enough to use the context correctly.

The mistake: building one without the other. Fine-tuning without schema context gives you a model that generates beautiful SQL for nonexistent columns. Schema context without fine-tuning gives you a model that retrieves the right table names but formats queries inconsistently or misses CDE-specific patterns.

Yesterday I wrote about the data problem — the hardest part of fine-tuning. Today is the architecture that makes fine-tuning actually useful. Tomorrow: the board-level questions I'd ask any vendor, after building one myself.

The same two-layer architecture works for any domain. A nonprofit fine-tunes for grant report formatting, provides schema context for actual grant data. A small business fine-tunes for invoice processing, provides schema context for actual vendor records. Behavior and context. You need both.
