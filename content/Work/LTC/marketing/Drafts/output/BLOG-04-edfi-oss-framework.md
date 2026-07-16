# Ed-Fi 6.0 Without the Enterprise Price Tag: The OSS Framework

**Source:** "Strategic Alignment: Harmonizing the OSS Framework with Ed-Fi Data Standard 6.0" — Source Doc #2
**Type:** Blog Post (Technical Architecture)
**Funnel:** Consideration → Decision
**Target:** District Data Analysts, CTOs, IT Directors evaluating Ed-Fi migration

---

Small-to-medium California districts face a false choice: adopt the rigorous, interoperable Ed-Fi Data Standard 6.0 at an enterprise price point they can't sustain, or remain in siloed, proprietary environments that stifle innovation.

The OSS Framework — built on a "DuckLake" architecture — breaks this cycle. It pairs Ed-Fi's global interoperability with an in-process analytical engine that runs on a single local server. The result: standard-compliant, high-performance analytics at a fraction of the cost.

---

## The DuckLake Architecture

Traditional Ed-Fi implementations rely on cloud-hosted relational databases (SQL Server, Azure SQL) with enterprise licensing costs that compound with every integration. The OSS Framework takes a different approach — **DuckDB-first, in-process analytics.**

**DuckDB** is an embedded, columnar SQL engine that executes analytical workloads directly in the calling process. No client-server overhead. No network latency. No per-query cloud compute charges.

Paired with **Delta Lake** for storage, this architecture provides:

- **ACID-compliant transactions** on local storage — the same guarantees as a cloud data warehouse
- **Time Travel** — query the data estate as it existed on any specific date, an essential capability for defending data during state audits
- **Schema enforcement** — data must conform to defined contracts before it reaches a decision-maker's dashboard

This combination delivers query speeds up to 10x faster than traditional relational databases for analytical workloads — while running on hardware that costs a fraction of a cloud instance.

---

## The Ed-Fi Medallion Model

The framework organizes data refinement into three stages — a **Medallion Architecture** — that progressively increases quality and Ed-Fi alignment:

### Stage 1: Raw / Landing

Source system data — Skyward SIS exports, Canvas LMS extracts, state reporting files — ingested in native format. This layer is immutable and append-only, preserving the original audit trail. Nothing is transformed. Nothing is lost.

### Stage 2: Refined / Ed-Fi Alignment

Here, the **Schema Contract** is enforced. Data is normalized and mapped to Ed-Fi 6.0 entities: Student, Course, Attendance, Assessment, Behavior. Personally identifiable information is hashed at this stage using one-way cryptographic functions, creating a privacy-first environment before data reaches any analyst's query.

### Stage 3: Published / Analytics Marts

Final aggregation into curated, analytics-ready views. These marts power district KPIs and are optimized for sub-second query performance in tools like Metabase. Every field is documented, traceable, and version-controlled.

---

## Metadata: The Barrier Against the Data Swamp

A high-performance data lake without documentation is a **Data Swamp** waiting to happen. In small districts, the traditional lack of metadata is a systemic risk — mapping logic often exists only in the mind of a single departing contractor.

The OSS Framework uses **dbt (data build tool)** as a "Living Data Dictionary." The dbt code *is* the documentation. Every field — from `student_id_hash` to `attendance_rate_30d` — is defined, traceable, and version-controlled. When the data analyst who built the pipeline leaves, the logic remains.

The metadata specification covers three domains:

**Technical Metadata:** Source origin, data lineage from raw SIS to final KPI, execution logs from Dagster pipeline runs.

**Business Metadata:** Human-readable definitions for calculated fields, standardized formulas for district KPIs (e.g., the threshold defining "Chronic Absenteeism"), explicit links between internal tables and Ed-Fi 6.0 domains.

**Governance Metadata:** Pseudonymization rules, PII classification tags, role-based access policies defining who can access each data tier.

---

## Operational Views: From Entities to Action

The framework distills complex Ed-Fi domains into five core operational views designed for maximum classroom impact:

| Operational View | Ed-Fi 6.0 Domain | District Impact |
|-----------------|------------------|-----------------|
| `v_chronic_absenteeism_risk` | Attendance / Student | Identifies students at 5% absence risk rather than 20%, enabling proactive barrier removal. |
| `v_wellbeing_risk_profiles` | Student / Behavior / Assessment | Holistic view of academic and emotional health to flag students for counselor outreach. |
| `v_equity_outcomes` | Student / Demographic | Identifies achievement gaps by race or program (SPED/ELL) to drive equitable resource allocation. |
| `v_class_section_comparison` | Course / Staff | Evaluates class-level effectiveness to identify where teachers need additional instructional coaching. |
| `v_performance_correlations` | Student / Assessment | Correlates engagement metrics to GPA success, targeting graduation rate improvement. |

These aren't static reports — they're operational tools that shift the paradigm from "historical autopsies of failure" to **predictive operations.** The district intervenes when a student's risk score deviates, not when they've already failed.

---

## Deployment: High-Detail, Low-Overhead

The primary driver for OSS adoption is the reduction in setup complexity. Traditional cloud-based Ed-Fi implementations require a Cloud Engineer — a role most districts cannot fill or afford. The OSS Framework requires a Data Analyst with SQL knowledge.

Using **Docker Compose**, the entire stack — DuckDB, dbt, Dagster, and Metabase — is orchestrated on a single server. No cloud IAM configurations. No networking complexity. No unpredictable billing.

### Hardware Recommendation Tiers

| Student Population | RAM | CPU | Storage |
|-------------------|-----|-----|---------|
| 100 – 1,000 | 16GB | 4 Cores | 250GB |
| 1,000 – 3,000 | 32GB | 8 Cores | 500GB |
| 3,000 – 5,000 | 64GB | 16 Cores | 1TB |

---

## Governance: Security in an Open Environment

Open-source doesn't mean open-access. The OSS Framework implements a **Two-Tier Pseudonymization Model** that hashes PII at the point of ingestion. Analysts work with granular data to identify student risks without ever seeing an actual student identity. Re-identification is restricted to authorized data stewards using controlled lookup tables.

The access control matrix ensures that every role — Data Engineer, Data Analyst, Principal, Teacher — sees only the data tier appropriate to their function, with Row-Level Security (RLS) in Metabase limiting teachers to students within their specific class sections.

---

## The Economics

For a district of 1,700 students, the traditional cloud analytics stack — licensing, storage, compute — runs approximately $90,000 per year. The OSS Framework, deployed on a single local server, reduces that to under $18,000.

That's an 84% cost reduction. But the more important metric is what happens to analyst time: no more vendor ticket queues for data extracts. No more manual CSV reconciliation. No more waiting for a vendor's product team to prioritize a CALPADS format change.

Ed-Fi 6.0 compliance doesn't require an enterprise budget. It requires an architectural decision — and the willingness to own your infrastructure.
