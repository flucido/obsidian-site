---
title: "Day 02 — DuckDB + dbt: The Pipeline That Feeds It"
created: 2026-06-17
updated: 2026-06-23
type: linkedin-post
series: open-source-stack
day: 2
week: 1
status: draft
references:
  github_repo: "https://github.com/flucido/local-data-stack"
---

The "enterprise ETL platform" your district is evaluating can be replaced by a Python pipeline and a dbt project. I know because I built one.

The stack: Aeries SIS exports hit a Delta/Parquet landing zone with ZSTD compression and year-based partitioning — 7 domains across 6 academic years. dbt models the staging and mart layers inside DuckDB, no separate database server needed. Rill serves the dashboards. The whole thing runs on a laptop.

Python orchestrates the ingestion — 500+ lines for the Aeries pipeline alone, another 900+ for California Department of Education data. dbt handles the transformation logic: staging models, core marts, analytics marts, feature engineering, privacy controls, and scoring. Six model layers, all targeting a single local DuckDB file.

Zero cluster configuration. Zero per-seat licensing. No cloud dependency.

The "big data" rationale for enterprise ETL tools collapsed years ago. Most district data — attendance, enrollment, grades, discipline — fits in RAM on a single machine. A pipeline that took an enterprise tool 8 minutes completes in 11 seconds on a five-year-old laptop.

I open-sourced the full architecture. github.com/flucido/local-data-stack — MIT licensed, with a synthetic sample so anyone can explore the schema without touching real student data.

Yesterday I wrote about DuckDB as the query engine. Today's the pipeline that feeds it. Tomorrow: what happens when you add local AI retrieval without sending data to the cloud.

The same pipeline works for any org with a data source and a laptop. A nonprofit pulling data from Salesforce exports, a small business stitching together QuickBooks and inventory spreadsheets — both can replace a $30K ETL tool with a Python script and a dbt project running on DuckDB.