---
title: K-12 Research Ontology — Sketch
created: 2026-07-14
updated: 2026-07-14 16:01
type: ontology-sketch
tags: [research, ontology, k12, edm-la, data-warehouse, fleshing-out]
status: SKETCH — fleshed out 7/14 16:01 PT. Not a formal specification. Decision: flesh out more / formalize / defer.
---

# K-12 Research Ontology — Sketch

> **The idea:** Formalize the implicit data model behind the
> local-data-stack project — the Aeries SIS → DuckDB warehouse → LFED
> pipeline, the California School Dashboard spec, the Phase 1 case
> study, the Phase 2 K12-Bench failure-mode analysis. Make the data
> semantics explicit so the LFED can ground NL→SQL queries correctly
> and the K12-Bench can test for ontology compliance.

## 0. Purpose

The K-12 Research Ontology is the formal specification of:
- The *entities* in California K-12 education data (District, School, Student, Enrollment, Assessment, etc.)
- The *properties* they have (gradelevel_code, reporting_category, status, change, color, etc.)
- The *relationships* between them (Student → has → Enrollment → in → School)
- The *vocabularies* (controlled lists — reporting category codes, statuses, changes, colors)
- The *derivations* (AccountabilityMetric computed from raw counts)
- The *mappings* to external standards (CEDS, CALPADS, Ed-Fi)

It serves as:
- **A documentation artifact** for the LFED data warehouse
- **A schema source** for the Python pipeline (Pydantic models)
- **A validation tool** for incoming Aeries extracts
- **A grounding layer** for the NL→SQL system (the LFED's schema encoding)
- **A benchmark target** for the Phase 2 K12-Bench (the failure modes are about ontology misalignments)
- **A teaching artifact** for co-authors, district data analysts, and case-study partners

## 1. Scope

**In scope:**
- The California K-12 education data domain
- The California School Dashboard accountability framework (5x5 grid, 4 indicators, reporting categories)
- The data flow: Aeries SIS → CDE → DuckDB warehouse → LFED → dashboards
- The semantic encoding that the LFED learns (the "what makes K-12 data hard" knowledge)
- The external standards the project maps to: CEDS, CALPADS, Ed-Fi

**Out of scope (v1):**
- The non-California US education data (other states have different accountability frameworks)
- The pre-K or higher-education data
- The non-public-school data (private, charter, homeschool — different data shapes)
- The full federal reporting requirements (only the California-specific subset is in scope)

## 2. Top-level classes

### 2.1 Organization
**Subclasses:**
- `District` (e.g., "North Bridge Academy" — though in CA it's a CDS code like "38678580000000")
- `School` (e.g., "North Bridge Lower School" — CDS code, separate from district)
- `CountyOfficeOfEducation` (e.g., "Marin County Office of Education" — the supervising entity for some districts)

**Properties (Organization):**
- `cds_code` (14-digit California Department of Education code, unique)
- `name`
- `district_type` ∈ {Elementary, High, Unified, CommunityCollege, CountyOffice}
- `charter_status` ∈ {Traditional, Charter, Dependent, IndependentStudy}
- `county` (e.g., "Marin", "Los Angeles")
- `active_year` (the school year this record is active for, e.g., "2023-24")
- `fiscal_year_start` (when the district's fiscal year starts)
- `enrollment_count` (derived — total students enrolled)

### 2.2 Student
**Properties (Student):**
- `student_id_hash` (PII-hashed, unique within the data warehouse)
- `enrollment_records` (list of Enrollment references)
- `assessment_records` (list of Assessment references)
- `attendance_records` (list of Attendance references)
- `reporting_categories` (list of category codes — e.g., ["EL", "SWD", "SED"])
- `active_year_grade` (current grade level: TK, K, 1-12, Adult)

**Privacy constraint:** `student_id_hash` is the only identifier. No names, no DOB, no SSN, no parent contact info in the warehouse.

### 2.3 Enrollment
A student's enrollment in a school for a specific year.

**Properties (Enrollment):**
- `enrollment_id` (unique)
- `student_id_hash`
- `cds_code` (the school)
- `academic_year` (e.g., "2023-24")
- `grade_level` ∈ {TK, K, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, Adult}
- `enrollment_start_date`, `enrollment_end_date`
- `enrollment_status` ∈ {Active, Transferred, Graduated, Withdrawn}
- `reporting_category_assignments` (e.g., {EL: true, SWD: false, SED: true, ...})

### 2.4 Attendance
A student's attendance record for a period.

**Properties (Attendance):**
- `attendance_id` (unique)
- `student_id_hash`
- `academic_year`
- `date` (the specific date)
- `period` (e.g., "All Day", "Period 1", "AM Session")
- `status` ∈ {Present, Absent_Excused, Absent_Unexcused, Tardy, InSuspension}
- `minutes_present` (numeric, for partial-day)

**Derived metric:** `chronic_absenteeism_rate` — % of students absent 10%+ of school days.

### 2.5 Assessment
A student's score on a standardized assessment.

**Properties (Assessment):**
- `assessment_id` (unique)
- `student_id_hash`
- `assessment_type` ∈ {SBAC_ELA, SBAC_Math, CAST_Science, ELPAC_Summative, ELPAC_Initial, CAASPP_Alt, LocalBenchmark, ...}
- `academic_year` (e.g., "2023-24")
- `test_date`
- `scale_score` (numeric, range varies by assessment)
- `achievement_level` ∈ {Standard_Exceeded, Standard_Met, Standard_Nearly_Met, Standard_Not_Met, NM}
- `reporting_category` (e.g., "All Students", "EL", "SWD", "SED", "AA", "AI", "AS", "FI", "HI", "PI", "WH", "TOM")
- `claimed` (Y/N — was the student claimed for accountability reporting)

### 2.6 AccountabilityMetric
A district/school's score on a California School Dashboard indicator.

**Subclasses (the 4 dashboard indicators):**
- `AcademicIndicator` (ELA + Math combined)
- `EnglishLearnerProgressIndicator` (ELPI)
- `ChronicAbsenteeismIndicator`
- `SuspensionRateIndicator`
- `GraduationRateIndicator` (high school only)

**Properties (AccountabilityMetric):**
- `metric_id` (unique)
- `cds_code` (the school or district)
- `indicator_type` (one of the 5 indicators above)
- `academic_year`
- `student_group` (e.g., "All Students", "EL", "SED", or any reporting category)
- `status` ∈ {VeryHigh, High, Medium, Low, VeryLow} (5 colors)
- `change` ∈ {Increased_Significantly, Increased, Maintained, Declined, Declined_Significantly} (5 arrows)
- `color` ∈ {Blue, Green, Yellow, Orange, Red} (5 colors)
- `performance_level` (numeric, the underlying rate/score)
- `change_numeric` (the underlying change value, e.g., +3.2% or -1.1%)
- `num_students` (the denominator for the metric)

### 2.7 ReportingCategory
A subgroup used in accountability reporting.

**Properties (ReportingCategory):**
- `code` ∈ {TA, RA, RB, RH, GM, GF, SE, EL, SWD, HOM, FOS}
- `description` (the human-readable name)
- `category_type` ∈ {Race_Ethnicity, Program_Status, Socioeconomic, Other}
- `ceds_mapping` (the federal CEDS code, where applicable)

**Vocabulary (the 11 standard CA reporting categories):**
- `TA` — All Students (Total)
- `RA` — American Indian / Alaska Native
- `RB` — Black / African American
- `RH` — Hispanic / Latino
- `GM` — Filipino
- `GF` — Female
- `SE` — Socioeconomically Disadvantaged
- `EL` — English Learner
- `SWD` — Students with Disabilities
- `HOM` — Homeless
- `FOS` — Foster Youth

### 2.8 IndicatorStatus
The 5-level status vocabulary for the dashboard.

**Vocabulary:**
- `VeryHigh` — top quintile
- `High` — 2nd quintile
- `Medium` — 3rd quintile
- `Low` — 4th quintile
- `VeryLow` — bottom quintile

### 2.9 IndicatorChange
The 5-level change vocabulary.

**Vocabulary:**
- `Increased_Significantly` — top arrow
- `Increased` — up arrow
- `Maintained` — flat
- `Declined` — down arrow
- `Declined_Significantly` — bottom arrow

### 2.10 IndicatorColor
The 5-level color vocabulary.

**Vocabulary:**
- `Blue` — top
- `Green` — high
- `Yellow` — medium
- `Orange` — low
- `Red` — very low

## 3. Key relationships

```
District ──contains──> School
School ──enrolls──> Student (via Enrollment)
Student ──takes──> Assessment
Student ──has──> Attendance
Student ──belongs_to──> ReportingCategory
District ──produces──> AccountabilityMetric
School ──produces──> AccountabilityMetric
AccountabilityMetric ──uses──> ReportingCategory (as student_group)
AccountabilityMetric ──is_one_of──> IndicatorType
AccountabilityMetric ──has──> IndicatorStatus
AccountabilityMetric ──has──> IndicatorChange
AccountabilityMetric ──has──> IndicatorColor
```

## 4. Vocabularies (controlled lists)

- **ReportingCategory.code:** {TA, RA, RB, RH, GM, GF, SE, EL, SWD, HOM, FOS}
- **IndicatorStatus:** {VeryHigh, High, Medium, Low, VeryLow}
- **IndicatorChange:** {Increased_Significantly, Increased, Maintained, Declined, Declined_Significantly}
- **IndicatorColor:** {Blue, Green, Yellow, Orange, Red}
- **IndicatorType:** {Academic, EnglishLearnerProgress, ChronicAbsenteeism, SuspensionRate, GraduationRate}
- **AssessmentType:** {SBAC_ELA, SBAC_Math, CAST_Science, ELPAC_Summative, ELPAC_Initial, CAASPP_Alt}
- **AchievementLevel:** {Standard_Exceeded, Standard_Met, Standard_Nearly_Met, Standard_Not_Met, NM}
- **YearFormat:** {CDE_2023-24, Aeries_2023-2024} — **important: this is one of the K12-Bench failure modes**
- **GradeLevel:** {TK, K, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, Adult}

## 5. Mappings to existing artifacts

| Ontology class | Today's artifact | Gap |
|----------------|-------------------|-----|
| `District`, `School` | Aeries SIS extracts | Need canonical CDS code → name mapping |
| `Student` | PII-hashed in `aeries_to_duckdb.duckdb` | Covered |
| `Enrollment` | Aeries enrollment tables | Need grade-level enumeration |
| `Assessment` | Aeries + CDE CAASPP files | Need achievement-level mapping |
| `AccountabilityMetric` | Computed in LFED pipeline | The 5x5 grid logic + suppression rules need to be explicit |
| `ReportingCategory` | Implicit in CDE extract | Need CEDS mapping + the 11-code list |
| `YearFormat` | Implicit — causes K12-Bench failure modes | **THIS IS THE KILLER FEATURE** — formalizing the year format mismatch |

## 6. Open design questions (K-12-specific)

1. **Suppression rules** — when does CDE suppress a metric for privacy? (e.g., < 11 students in a subgroup.) Where do these rules go in the ontology?
2. **YearFormat handling** — the CDE uses "2023-24" but Aeries uses "2023-2024". Is this a single `YearFormat` class with two instances, or a property of every class that has a year field?
3. **Reporting category combinations** — students can be in multiple reporting categories (e.g., EL + SED). How does the ontology model this — multi-valued property, or separate "StudentReportingCategoryAssignment" class?
4. **Change calculation** — how is "Increased_Significantly" determined? Is this a stored value, or a derived value from a formula? Where does the formula live?
5. **Color/Status/Change relationship** — is the color derived from the status, or are they independent fields? (Per CDE: they're paired. Status determines color. Change is separate.)
6. **Local benchmarks vs state assessments** — do `Assessment`s include local benchmarks, or only state-administered? The LFED might want both.
7. **The "ALL" student group** — when AccountabilityMetric.student_group = "All Students", does this mean "every enrolled student" or "every enrolled student with claimed assessment scores"? This is a real edge case the LFED needs to handle.

## 7. What a v1 implementation could look like

**Minimal viable ontology (1-2 weeks of Frank's time):**
- Pydantic models for each top-level class (10 files, ~50 lines each)
- One YAML file with all the controlled vocabularies
- A `mapping.md` doc showing which class maps to which table/column in the warehouse
- A `suppression-rules.md` doc with the CDE suppression logic
- A `year-format.md` doc with the two format conversions

**Stretch goal (optional):**
- The LFED training data uses the ontology as schema grounding
- The K12-Bench failure modes are categorized by ontology violation type
- A "schema diff" tool that compares the warehouse tables to the ontology

## 8. The killer feature: ontology-as-failure-mode-target

**This is what makes the K-12 ontology unique vs a typical data warehouse schema.** The K12-Bench is specifically about failure modes caused by ontology misalignment:

- LMs that don't know the year format mismatch fail the test
- LMs that don't know the 11 reporting categories fail the test
- LMs that don't know the suppression rules fail the test
- LMs that don't know the 5x5 grid logic fail the test

**The ontology is the test specification.** Every failure mode in K12-Bench is a violation of the ontology. Making the ontology explicit means the K12-Bench has a formal spec to test against.

This is also a publishable contribution — a paper titled "K-12-Bench: A Domain-Semantic NL→SQL Benchmark" with the ontology as the primary artifact. The K-12 paper plan in [[Work/LTC/weekly-plan]] could pivot to lead with the ontology.

*Last updated: 2026-07-14 16:01 PT*
