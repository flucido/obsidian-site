---
title: Skill — Lead Dossier
created: 2026-07-10
updated: 2026-07-10
type: skill
tags: [shared, agents, skill, lead, dossier]
loads_by: ltc-operator, wfc-operator, orchestrator
---

# Skill: Lead Dossier

> Create or maintain a lead dossier. The dossier is the single source of truth
> for a lead — every interaction, contact, decision, and follow-up lives there.

## When to Use

- **New lead:** inbound consult, network connection, warm intro, or discovered prospect.
- **Stage change:** lead moves through the pipeline (Sent → Replied → Meeting → Proposal).
- **Contact enrichment:** new email, new phone, new stakeholder discovered.
- **Meeting capture:** post-meeting notes within 24h.
- **Risk surfacing:** new risk flag, escalation, or signal change.

## Folder Structure (Standard)

```
leads/<org>-<slug>/
├── dossier.md                    # canonical lead record
├── email-draft.md                # current draft outreach
├── email-*.md                    # sent/received emails
├── meeting-*.md                  # meeting notes
├── meeting-prep-*.md             # pre-meeting briefs
├── SOW-*.md                      # SOW drafts (rev. numbered)
├── follow-up-email-*.md          # follow-up drafts
├── inventory-*.md                # engagement-specific artifacts
└── attachments/                  # PDFs, screenshots, etc.
```

`<org>` is `ltc` or `wfc`. `<slug>` is lowercase-hyphenated name (e.g., `wfc-susan-allen`).

## dossier.md Schema

```yaml
---
title: <Lead Name> — Lead Dossier
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: lead-dossier
tags: [org, lead, ...domain tags]
org: LTC | WFC
status: <stage>          # see pipeline stage definitions
source: <how lead arrived>
inquiry_date: YYYY-MM-DD  # if applicable
---
```

### Required Sections

1. **Contact** — name, role, organization, email, phone, website (table)
2. **Professional Profile** — for individuals (LCSW/LMFT/PsyD etc.)
3. **Practice Context** (WFC) or **Org Context** (LTC)
4. **Key People** — table: name, role, email, notes
5. **Origin** — how the lead arrived, intro source, first contact date
6. **<Org> Fit Analysis** — discovery findings, needs, scope signals
7. **Engagement Model** — proposed path (project, retainer, hybrid)
8. **Timeline** — key dates (meeting, SOW, kickoff, milestones)
9. **Risk Flags** — table: flag, severity, notes
10. **Next Actions** — current step + owner + due date
11. **History** — append-only log of every interaction (dossier updates)

### Optional Sections (use when relevant)

- **Decisions** — explicit decisions made (in-session, not implied)
- **Pricing** — only if a specific number has been discussed
- **Compliance Notes** — FERPA/AB 1584 (LTC) or HIPAA-adj (WFC) calls
- **Attachments** — links to PDF, screenshots, contracts

## Validation Rules

1. **Every lead has a dossier** before entering the pipeline. No exceptions.
2. **Frontmatter is complete** — title, created, updated, type, tags, status.
3. **Contact section has at least email + name** (phone nice-to-have).
4. **Next Actions section is never empty** — always has owner + due date.
5. **History section is append-only** — never edit past entries, always append.
6. **Stage in dossier matches the pipeline file** — both are truth, must align.

## History Entry Format

```
### YYYY-MM-DD — <event type> by <agent or human>
- <one-line summary>
- <artifact path if any>
```

Event types: `discovery`, `meeting`, `email-sent`, `email-received`, `note-capture`,
`stage-change`, `risk-escalation`, `sow-revision`, `deposit`, `close`.

## Common Tasks

| Task | Steps |
|------|-------|
| **New lead** | Create folder → write dossier from template → add to pipeline → write history entry |
| **Post-meeting** | Read live notes → clean → save as `meeting-YYYY-MM-DD.md` → update dossier (people, decisions, next actions) → draft follow-up email if needed |
| **Contact enrichment** | Find new contact (LinkedIn, web, public records) → update Contact table → add history entry |
| **Stage change** | Update dossier status → update pipeline file → write history entry |
| **SOW revision** | Create new SOW file (rev. N) → diff against rev. N-1 → update dossier Pricing section → notify Orchestrator for QA review |

## Governance

- **NEVER fabricate** a person's role, email, or phone. If unknown, mark TBD.
- **NEVER invent** meeting outcomes. If notes are missing, say so explicitly.
- **NEVER amend a closed lead** without creating a new history entry.
- **No "smoking gun" claims** — every empirical claim needs a source citation.

## Common Failures to Avoid

- **Folder without dossier.md** — always create the dossier first.
- **Dossier without frontmatter** — pipelines rely on frontmatter for queries.
- **Stale updated date** — bump on every change.
- **Missing wikilinks** — every other lead, project, or concept should be a `[[wikilink]]`.
- **Empty Next Actions** — if there's no next action, the lead is dead. Either close it or move it.
