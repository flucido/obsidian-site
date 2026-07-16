---
title: Skill — Wikilink Audit
created: 2026-07-10
updated: 2026-07-10
type: skill
tags: [shared, agents, skill, hygiene, wikilink, audit]
loads_by: vault-hygienist, orchestrator
---

# Skill: Wikilink Audit

> Find dead wikilinks, orphan files, naming drift, and stale frontmatter.
> The vault is the company brain — broken links are broken trust.

## When to Use

- Weekly cadence (Sunday/Monday morning recommended)
- After major content cleanup (deferred-leads archive, project completion)
- On demand ("audit vault hygiene")
- Before any major restructure (TOC.md, index rebuild)

## Inputs

- All `.md` files in `/Users/flucido/workspace/` (excluding `.obsidian/`, `.trash/`, `.git/`)
- The wikilink convention: `[[path/to/file|label]]` or `[[filename]]`
- File naming convention: lowercase-hyphenated (per `SCHEMA.md`)

## Output

- New `Work/Shared/Ops/vault-audit-YYYY-MM-DD.md` (audit report)
- Append entries to `log.md` for any fixes made
- Optional: fix-list as drafts for human approval (do NOT auto-fix HIGH-impact items)

## Process

### Step 1: Inventory (3 min)
- [ ] Walk all `.md` files in vault
- [ ] Build map: filename → file path → frontmatter
- [ ] Note total file count, total size, by-folder breakdown

### Step 2: Wikilink Extraction (5 min)
- [ ] For each `.md` file, extract all `[[...]]` patterns
- [ ] Strip the label part (after `|`)
- [ ] Strip the section anchor (after `#`)
- [ ] Resolve to target file path
- [ ] Categorize: resolved / broken / ambiguous (multiple matches)

### Step 3: Broken Link Triage (5 min)
For each broken wikilink, classify:
- **A. Retired lead** — the target was archived (e.g., 6/1 WFC pivot)
  - Action: replace with `[[leads/PIPELINE#retired-leads|retired lead]]` or remove
- **B. Missing dossier** — referenced but folder doesn't exist
  - Action: flag as missing dossier, create or escalate
- **C. Typo in target** — file exists at a slightly different name
  - Action: fix link (LOW risk, can auto-fix with audit log)
- **D. Convention drift** — wikilink uses old naming
  - Action: fix link (LOW risk)
- **E. Truly dead** — file was deleted, link still references
  - Action: remove link or update to point to a successor

### Step 4: Orphan File Detection (5 min)
For each `.md` file, check:
- Is it referenced by any other file? (count inbound wikilinks)
- If 0 inbound AND not in any index: **orphan candidate**
- Special exceptions (do NOT flag as orphans):
  - `MEMORY.md`, `USER.md`, `SCHEMA.md`, `AGENTS.md`, `TOC.md` (top-level)
  - Daily notes (each one is its own anchor)
  - Templates (referenced by name, not wikilink)
  - Frontmatter index files (`_index.md`)

### Step 5: Naming Convention Check (3 min)
- [ ] All filenames match `^[a-z0-9-]+\.md$` (lowercase, hyphens, no spaces)?
- [ ] Flag any with spaces, uppercase, or underscores
- [ ] Frontmatter `title` matches filename? (case-insensitive)

### Step 6: Stale Frontmatter (3 min)
- [ ] `updated` field matches last actual file modification? (within 7 days tolerance)
- [ ] `created` field is set and reasonable?
- [ ] `tags` field uses terms from the SCHEMA.md taxonomy?
- [ ] `type` field is one of: entity | concept | comparison | query | summary | system | operational | dashboard | lead-dossier | agent-contract | skill | daily | log

### Step 7: Index File Sync (2 min)
- [ ] `TOC.md` reflects the actual current structure?
- [ ] Each per-folder `_index.md` exists and is current?

### Step 8: Audit Report (5 min)
Build `vault-audit-YYYY-MM-DD.md`:

```markdown
# Vault Audit — YYYY-MM-DD

## Summary
- Total .md files: NNN
- Total wikilinks: NNN
- Broken wikilinks: NN (by category: A, B, C, D, E)
- Orphan files: NN
- Naming violations: NN
- Stale frontmatter: NN

## Broken Wikilinks
[Table: source file, line, broken target, category, recommended fix]

## Orphan Files
[Table: file path, last modified, recommended action]

## Naming Violations
[Table: file path, current name, recommended name]

## Stale Frontmatter
[Table: file path, field, current value, recommended]

## Fixes Applied (LOW risk, auto-fixed)
[Log of changes made]

## Fixes Queued (MEDIUM/HIGH, awaiting human)
[List of items requiring approval]
```

## Risk-Appropriate Auto-Fix

**Auto-fix OK (with audit log):**
- Typo in target (Category C)
- Convention drift (Category D)
- Naming violation → rename + log

**DO NOT auto-fix (queue for human):**
- Retired lead (Category A) — affects TOC + history
- Missing dossier (Category B) — needs creation or escalation
- Truly dead (Category E) — could be a still-relevant pointer

## Governance

- **NEVER delete** a file without moving to `.trash/` first.
- **NEVER rename** a file that has inbound links without updating them in the same pass.
- **NEVER modify** lead dossiers (different role).
- **NEVER modify** active daily notes (different role).
- **All fixes logged** in `log.md` with file path + before/after.

## Common Failures to Avoid

- **Auto-fixing too much** — if in doubt, queue for human.
- **Missing the special exceptions** — daily notes + templates + index files are NOT orphans.
- **Ignoring the "retired" category** — these need a thoughtful redirect, not just removal.
- **Skipping the audit log** — every change leaves a trace.
- **Forgetting the date** — `vault-audit-YYYY-MM-DD.md` naming is mandatory.

## Known Issues to Watch (As of 2026-07-09)

- `TOC.md` references 8 retired WFC leads (Categories A — likely)
- `leads/ltc-northridge/` missing — multiple wikilinks broken (Category B)
- `leads/wfc-leighna-harrison/` missing — 15d inbound, no dossier (Category B)
- `Work/LTC/pipeline.md` has double-backslash wikilink formatting artifact
- `Work/Shared/master-priority-queue.md` has Erin Lindheim as priority #1 (already called 6/19, settled)
