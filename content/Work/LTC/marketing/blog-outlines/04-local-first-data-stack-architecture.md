---
title: "The Local-First Data Stack: DuckDB + dbt + dlt + Rill, From Ingestion to Dashboard"
created: 2026-06-23
type: blog-outline
series: local-data-stack-deep-dive
post: 4
status: outline
---

## Thesis
You can replace a $50K/year cloud data stack with four open-source tools that run on a laptop. DuckDB + dbt + dlt + Rill form a complete analytics pipeline — ingestion through dashboard — with zero cloud dependencies. Here's the architecture, annotated.

## Outline

### 1. The Architecture (Diagram)
```
Aeries API / CSV exports
         ↓
dlt ingestion → Delta Lake staging (stage1/)
         ↓
dbt transformations → DuckDB analytics warehouse (analytics.duckdb)
         ↓
dbt marts: main_core, main_analytics, main_staging
         ↓
Rill dashboards — California School Dashboard alignment
         ↓
nl_query layer — Gradio app with fine-tuned model
```

### 2. Layer 1: dlt Ingestion
- dlt replaces custom ETL scripts
- Schema inference from source data
- Incremental loading with merge keys
- Delta Lake as the staging format: ACID transactions, time travel, schema enforcement
- Why Delta on top of Parquet: versioning matters when source schemas shift

### 3. Layer 2: dbt Transformations
- dbt-duckdb adapter — SQL transforms compiled against DuckDB
- Staging models (1:1 with source), intermediate models, mart models
- main_core: student-level joins (dim_students, fact_attendance, fact_discipline, fact_academic_records)
- main_analytics: OBT mart for CDE accountability (mart_cde_school_accountability)
- main_staging: direct CDE download tables
- Privacy considerations: hashed student IDs, aggregation thresholds

### 4. Layer 3: DuckDB as the Query Engine
- Embedded in-process — no server, no connection string
- Reads Parquet/Delta natively, no import step
- 12M rows in <1s on a laptop
- The secret: DuckDB is the analytical engine, not the storage engine. It queries the files where they sit.
- No ETL to load data INTO DuckDB — dbt just references the staged Parquet files

### 5. Layer 4: Rill Dashboards
- Rill reads DuckDB directly — no export step
- Metrics views define measures: chronic absenteeism rate, suspension rate, ELA distance from standard, ELPI
- Explore dashboards with dimension slicing: by school, year, student group, race
- Aligned with California School Dashboard indicators
- The CDE pre-computes the 5×5 Status×Change grid — Rill surfaces it rather than re-deriving

### 6. Layer 5: NL→SQL Query Interface
- Gradio app wrapping the fine-tuned model
- Compact schema injection into prompts
- Validation guard: SELECT-only, EXPLAIN check
- Query logging for compliance
- Two inference modes: local llama.cpp (GGUF) or HF Spaces (transformers+PEFT)

### 7. Reproducibility: The Public Release
- Synthetic 5-row Parquet sample committed for schema exploration
- Full pipeline works with 'pip install local-data-stack'
- dbt and Rill resolve DuckDB paths from env vars, not hardcoded workstation paths
- No private data, no real credentials committed

### Key Takeaways
- Four tools replace a cloud data warehouse + ETL server + BI platform + AI layer
- The secret is that DuckDB queries files in place — no load step, no copy, no server
- Delta Lake adds the versioning that Parquet alone lacks
- The entire stack runs on a Mac Studio with zero network calls
