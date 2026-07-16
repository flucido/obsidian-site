---
title: Agent Team — Dispatch Reference
created: 2026-07-10
updated: 2026-07-10
type: reference
tags: [shared, agents, reference, dispatch]
---

# Agent Team — Dispatch Reference

> Single page for invoking the agent team. Keep this short and operational.
> Full role contracts live in `Work/Shared/Ops/agents/<role>.md`.

---

## Team Roster

| Agent | Role | Vault Contract | Mavis Path |
|-------|------|----------------|------------|
| **Orchestrator** (Mavis root) | Daily synthesis, top-3 per org, MEMORY + MPQ steward, dispatches specialists | `Work/Shared/Ops/agents/orchestrator.md` | (built-in) |
| `ltc-operator` | LTC pipeline, lead triage, post-meeting notes, outreach drafts | `Work/Shared/Ops/agents/ltc-pipeline.md` | `~/.mavis/agents/ltc-operator/` |
| `wfc-operator` | WFC pipeline, inbound triage, SOW drafts, post-call follow-ups | `Work/Shared/Ops/agents/wfc-pipeline.md` | `~/.mavis/agents/wfc-operator/` |
| `content-marketer` | Blog, LinkedIn, WFC social, FAQ, content calendar | `Work/Shared/Ops/agents/content-marketing.md` | `~/.mavis/agents/content-marketer/` |
| `compliance-qa` | Outbound QA gate, contract gate, compliance matrix validation | `Work/Shared/Ops/agents/compliance-qa.md` | `~/.mavis/agents/compliance-qa/` |
| `vault-hygienist` | Wikilink audit, naming, frontmatter, orphan files | `Work/Shared/Ops/agents/wikilink-audit-skill.md` | `~/.mavis/agents/vault-hygienist/` |

The **Delivery** role is built into the Orchestrator (multi-org delivery review).
The **Specialist** (delivery deep-dive per engagement) is dispatched via Orchestrator
with the matching dossier context.

---

## Common Invocations

### Daily Cadence

| What | Trigger Phrase | Dispatch |
|------|----------------|----------|
| Morning standup | "Run morning startup" | Orchestrator loads `morning-standup-skill` |
| Process LTC | "Process LTC pipeline" / "Triage LTC leads" | `ltc-operator` |
| Process WFC | "Process WFC pipeline" / "Triage WFC inbound" | `wfc-operator` |
| Evening shutdown | "Run evening shutdown" | Orchestrator loads `evening-reflection-skill` |
| MPQ rebuild | "Rebuild master priority queue" | Orchestrator loads `mpq-skill` |
| Weekly review | "Run weekly executive summary" | Orchestrator (Friday) |

### Content + Marketing

| What | Trigger Phrase | Dispatch |
|------|----------------|----------|
| LinkedIn post (LTC) | "Draft LinkedIn Day NN" | `content-marketer` |
| Blog post | "Draft blog post on [topic]" | `content-marketer` |
| WFC social post | "Draft IG/TikTok post on [topic]" | `content-marketer` |
| FAQ entry | "Add FAQ entry for [question]" | `content-marketer` |
| Voice audit | "Run voice audit on [draft]" | `content-marketer` |

### Outreach + QA

| What | Trigger Phrase | Dispatch |
|------|----------------|----------|
| Draft outreach | "Draft outreach for [Lead]" | org operator → `compliance-qa` |
| QA an artifact | "QA review on [file]" | `compliance-qa` |
| SOW draft | "Draft SOW for [Lead]" | org operator → `compliance-qa` |
| Contract gate | "Run contract gate on [engagement]" | `compliance-qa` |

### Vault Hygiene

| What | Trigger Phrase | Dispatch |
|------|----------------|----------|
| Wikilink audit | "Audit vault hygiene" / "Find dead links" | `vault-hygienist` |
| Naming check | "Check naming conventions" | `vault-hygienist` |
| Orphan files | "Find orphan files" | `vault-hygienist` |

---

## Dispatch Protocol (How Specialists Report Back)

Every specialist dispatch returns a 5-line report:

1. **What changed** — file paths + 1-line summary each
2. **What's open** — items needing Frank / Lauren / another agent
3. **What's blocked** — items needing external input (human reply, contact info, etc.)
4. **Risk escalations** — any new HIGH risk or stale item ≥ 14d (LTC) / 7d (WFC)
5. **Inbound status** (WFC only) — any new consult requests + 24h SLA status

---

## Governance (Non-Negotiable)

1. **No outbound sends** — drafts only. Frank sends.
2. **No pricing/contract commitments** — drafts only. Frank approves.
3. **No writes to code repos** — `wellfullcollective/`, `frank-lucido-site/`, `nerodesign/`, `local-data-stack/` are human-in-the-loop. Agents PROPOSE; Frank commits.
4. **No silent follow-ups** — flag stale items.
5. **No fabricated completion** — if uncertain, say "unknown — Frank to confirm."
6. **Every state change links to a vault artifact** — `[[wikilink]]` or external URL.
7. **QA gate before human review** — `compliance-qa` reviews every outbound before Frank sees it.

---

## Cross-Agent Coordination

- All specialist output is **DRAFT** until the Orchestrator commits it.
- The Orchestrator is the **only** role that writes to `MEMORY.md`, `MPQ`, `log.md`,
  pipeline files, and the daily note lifecycle.
- Specialists write to their domain artifacts: `leads/<slug>/`, `Work/<org>/marketing/`,
  audit reports, etc.
- When two specialists' outputs conflict, the Orchestrator arbitrates.

---

## When the Team Should NOT Operate

- During a compliance, legal, or client incident (Orchestrator pauses non-critical work).
- During Frank's vacation (unless Frank explicitly opts in to async ops).
- When MEMORY.md is corrupted or missing (rebuild from `log.md` first).
- When Gmail + Calendar + LinkedIn are all blocked for > 7 days (escalate workaround decision).

---

## Quick Test: "Is the team alive?"

If you can do all of these without any of the agents, the team isn't doing its job:

- [ ] A new consult form submission gets triaged within 24h.
- [ ] A meeting produces notes within 24h.
- [ ] MPQ is never more than 7d stale.
- [ ] Daily note EOD state transfer is always populated.
- [ ] Wikilinks don't rot.

If even one fails, the team needs attention.
