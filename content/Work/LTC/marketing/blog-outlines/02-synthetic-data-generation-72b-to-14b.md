---
title: "Synthetic Data Generation at Scale: Using a 72B Model to Train a 14B Model"
created: 2026-06-23
type: blog-outline
series: local-data-stack-deep-dive
post: 2
status: outline
---

## Thesis
The best way to train a small model for a specialized domain is to have a much larger model generate validated training data. Qwen2.5-72B on A100-80GB produced 11,222 NL→SQL pairs at 88% validity for $20. Here's how.

## Outline

### 1. Why Generate Instead of Curate?
- 19 tables, 492 columns — hand-writing pairs would take months
- Synthetic data from the real schema: the model learns the actual column names, not generic ones
- The validation loop is the moat: every generated SQL executed against the real DuckDB warehouse
- 12% rejection rate means 12% of generated SQL was syntactically wrong — and caught

### 2. The Schema Representation Problem
- Full DDL for 19 tables = ~15K tokens per prompt → too expensive at scale
- Compact format: table_name(column1, column2, ...) with types → ~5K tokens saved
- Three query paths encoded: student-level joins, OBT mart, staging tables
- CDE categories and year format conventions included
- This is the prompt engineering that nobody talks about

### 3. Generation Infrastructure on Modal
- vLLM serving Qwen2.5-72B-Instruct-AWQ on A100-80GB
- Batch size 12, max_tokens 4K — sweet spot found through trial and error
- Modal --detach with .spawn() pattern to survive client disconnect
- Volume-mounted persistence: /data/pairs_warehouse.jsonl

### 4. The Validation Pipeline
- In-memory DuckDB with full warehouse schema
- Every generated SQL executed; parse errors → reject, runtime errors → reject
- 88% pass rate across 12.5K generated queries
- Table coverage: main_core 56%, main_analytics 30%, main_staging 14%
- Stratified: make sure all three query paths and all CDE categories are represented

### 5. Cost Breakdown
- A100-80GB: ~$2.50/hour on Modal
- 8 hours of generation time
- ~$20 total
- Compare: hiring a SQL expert to write 11K pairs at 5 min/pair = 916 hours

### 6. What the 72B Got Wrong (the 12%)
- Duplicate queries with different phrasings (dedup caught these)
- Column name hallucinations — the 72B isn't infallible
- Syntax errors in complex JOIN conditions
- Missing table qualifiers in multi-table queries
- These failures were the most valuable: they showed where the schema was ambiguous

### 7. From Generated Data to Training Data
- Deduplication pass
- Stratified sampling to ensure table coverage balance
- Final validated set: 11,222 pairs
- Published on Hugging Face for reproducibility

### Key Takeaways
- Larger model → better training data. 72B understood the schema well enough to generate correct SQL
- Validation against real database is non-negotiable. 12% of pairs were wrong.
- Compact schema format matters at scale. Token savings compound across 12K+ generations.
- The 12% failure rate is a feature, not a bug — it reveals schema ambiguity
