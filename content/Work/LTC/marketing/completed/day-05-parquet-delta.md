---
title: "Day 05 — Parquet + Delta Lake: The Open Formats That Set You Free"
created: 2026-06-23
updated: 2026-06-25
type: linkedin-post
series: open-source-stack
day: 5
week: 1
status: ready-to-post
scheduled_for: 2026-06-26
references:
  github_repo: "https://github.com/flucido/local-data-stack"
---

# Parquet + Delta Lake: The Open Formats That Set You Free

Vendor lock-in isn't a contract problem. It's a file format problem. I learned this the hard way.

When I built local-data-stack, I needed seed data that was deterministic — the same tables, same schema, byte-for-byte identical every run. The fix: Parquet files in a staged landing zone, feeding into DuckDB through dbt transformations. Every file is open format. Every transformation is reproducible SQL.

Parquet is columnar storage. Compressed, open, language-agnostic. DuckDB, Pandas, Spark, BigQuery, and Snowflake all read it natively. But Parquet alone doesn't solve the operational problem: what happens when source data changes? How do you track versions? How do you roll back a bad load?

Delta Lake answers those. It adds ACID transactions, time travel, and schema enforcement on top of Parquet. When I ingest a new Aeries export, it lands in a Delta table. If the schema shifted, Delta catches it before corrupting downstream queries. If I need last quarter's data, time travel rewinds to that version. The audit trail is the file.

The practical effect: my pipeline data works with any tool in the stack. Swap DuckDB for anything that reads Parquet. Swap dbt for any transformation framework. The data doesn't care which engine queries it. Contrast with a proprietary SIS export format — the vendor controls the schema, the parser, and the deprecation timeline. When they change the format, the district pays for a migration it didn't choose.

I standardized on Parquet + Delta Lake in local-data-stack for the same reason I standardized on DuckDB and Ollama: once your files are open, your engine choices stay open. The format is the exit strategy.

Yesterday I wrote about inference engines — the runtime layer. Today is the storage layer that makes the whole stack portable. This closes week one. Next week: the hardware that runs all of it without a cloud bill.

The same logic applies anywhere data is trapped in a vendor's export format. A nonprofit migrating off a donor management platform. A small business outgrowing QuickBooks. Standardize on open formats, and the data follows you — not the vendor.

---

#LocalFirstAI #DataSovereignty #OpenFormats #Parquet #DeltaLake #EdTech #K12Education #AB1584 #FERPA

---

## First Comment (Postiz)

The repo: https://github.com/flucido/local-data-stack — Parquet + Delta tables, dbt transformations, DuckDB queries, Rill dashboards. Everything in the stack reads the same open files.
