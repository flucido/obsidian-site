# Local First Education Data Framework — Evaluation Query Bank

A set of 15 real-world, moderately complex queries for manual evaluation.
Inspired by the California School Dashboard and common school-data analytics questions.
Each query exercises joins, filtering, aggregation, subgroup comparison, or ranking across one or more of the five domains:

- **Students** (demographics, program flags)
- **Enrollment** (school-year, grade-level, school assignments)
- **Attendance** (absence counts, chronic absenteeism)
- **Discipline** (incidents, types, dates)
- **Grades** (course grades, GPA, subject areas)

---

## Query 1: Chronic absenteeism by grade level

> For the 2023-2024 school year, what percent of students at Lincoln Elementary are chronically absent, broken down by grade level?

**Domains:** attendance + enrollment
**Expected shape:** one row per grade, with a rate/percentage.

---

## Query 2: Suspension gap by race/ethnicity

> At Washington Middle School in 2023-2024, what is the suspension rate for each race/ethnicity group? Order from highest to lowest.

**Domains:** discipline + students
**Expected shape:** grouped bar/table by subgroup, descending rate.

---

## Query 3: English learner attendance vs. non-English learner attendance

> Compare the number of chronic absenteeism students for English learners versus non-English learners district-wide during 2022-2023.

**Domains:** attendance + students
**Expected shape:** two rows (EL / not EL) with rates.

---

## Query 4: Grade trends for students with multiple discipline incidents

> For students at Roosevelt High School who had more than one discipline incident in 2023-2024, what was their average GPA that year?

**Domains:** discipline + grades + enrollment
**Expected shape:** single aggregate value or list of students.

---

## Query 5: Top 10 schools by chronic absenteeism rate

> Across all schools in 2023-2024, which 10 schools have the highest chronic absenteeism rates, and what are those rates?

**Domains:** attendance + enrollment
**Expected shape:** ranked table, top 10.

---

## Query 6: Grade-level math performance

> For the 2023-2024 school year, what is the average math grade and the percent of students earning a C or below in math at each middle school?

**Domains:** grades + enrollment
**Expected shape:** one row per school with avg and % below threshold.

---

## Query 7: Foster/homeless student discipline exposure

> In 2023-2024, how many foster or homeless students had at least one discipline incident, and what percent of all foster/homeless students is that?

**Domains:** discipline + students
**Expected shape:** count + rate.

---

## Query 8: Longitudinal attendance improvement

> For Lincoln Elementary, compare the chronic absenteeism rate in 2022-2023 to 2023-2024. Show both rates and the percentage-point change.

**Domains:** attendance + enrollment
**Expected shape:** two rows with delta column.

---

## Query 9: Course grade distribution

> For Roosevelt High School in 2023-2024, show the distribution of letter grades (A, B, C, D, F) across all courses.

**Domains:** grades + enrollment
**Expected shape:** grade counts table.

---

## Query 10: Discipline type breakdown

> At Washington Middle School in 2023-2024, what are the three most common discipline incident types, and how many of each occurred?

**Domains:** discipline + enrollment
**Expected shape:** top-3 table with counts.

---

## Query 11: Student group enrollment imbalance

> In 2023-2024, what is the percentage of socioeconomically disadvantaged students at each elementary school? Order by highest percentage.

**Domains:** students + enrollment
**Expected shape:** school list with percentages, sorted descending.

---

## Query 12: Attendance-GPA correlation cohort

> For 2023-2024, list students at Roosevelt High School with 10 or more absences and a GPA below 2.0. Include their race/ethnicity and grade level.

**Domains:** attendance + grades + enrollment + students
**Expected shape:** student-level cohort table.

---

## Query 13: Repeating discipline offenders

> How many students had three or more discipline incidents in 2023-2024, and which school had the most such students?

**Domains:** discipline + enrollment
**Expected shape:** count + school with highest count.

---

## Query 14: English learner progress proxy

> For English learners enrolled in 2023-2024, what is their average ELA grade compared to their average math grade? Break out by grade level.

**Domains:** grades + students + enrollment
**Expected shape:** rows by grade with ELA avg and math avg.

---

## Query 15: Equity gap in honors participation

> In 2023-2024, what percent of students at each high school earned at least one A in an honors-eligible course? Compare rates for students with and without IEPs.

**Domains:** grades + students + enrollment
**Expected shape:** school × IEP status table with participation rates.

---

## Evaluation notes

- **Good answers** should join the right tables, filter to the requested school year and school, and return a clear aggregate or ranked table.
- **Watch for** SQL that ignores the school-year filter, double-counts students enrolled in multiple grades, or drops the subgroup breakdown.
- Some queries are intentionally ambiguous (e.g., "honors-eligible course") to test how the model handles missing or inferred schema concepts.

---

## Suggested scoring rubric (per query)

| Criterion | Points | Notes |
|---|---|---|
| Correct tables joined | 2 | Uses the tables actually needed for the question. |
| Correct filters applied | 2 | School year, school name, program flags are respected. |
| Correct aggregation/grouping | 2 | Rates, averages, counts, or rankings are computed correctly. |
| Output is interpretable | 2 | Summary sentence and table make sense without extra explanation. |
| No forbidden operations | 1 | Query is read-only and uses allowed tables/columns. |

**Total: 9 points per query.**
