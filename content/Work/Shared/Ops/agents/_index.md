---
title: Agent Team — Index
created: 2026-07-10
updated: 2026-07-10
type: index
tags: [shared, agents, index, meta, orchestrator]
---

# Agent Team — Index

> The vault-resident agent team for Lucido Technology Consulting + WellFull Collective.
> Each role is a Markdown contract that defines inputs, outputs, validation, and governance.
> Specialist agents are registered in Mavis (`~/.mavis/agents/`) and load their matching
> vault contract as system context.

**Governance (applies to all roles):**
1. No outbound sends without human approval — hard stop.
2. Pricing, contracts, legal = human-in-the-loop only.
3. QA gate on all external communications — source references required.
4. Every decision must link to a vault artifact — full traceability via `[[wikilinks]]`.
5. Drafts are not final — only the orchestrator commits canonical state.
6. **Scope: vault + LTC + WFC pipelines only. The code repos (`wellfullcollective/`, `frank-lucido-site/`, `nerodesign/`, `local-data-stack/`) are human-in-the-loop. Agents PROPOSE changes, humans commit.**

---

## Role Contracts (in this folder)

| Role | Contract | Function |
|------|----------|----------|
| Orchestrator | [[orchestrator]] | Daily synthesis, top-3 per org, MEMORY + MPQ steward, dispatches specialists |
| LTC Pipeline | [[ltc-pipeline]] | LTC pipeline, lead triage, post-meeting note capture, outreach drafts |
| WFC Pipeline | [[wfc-pipeline]] | WFC pipeline, inbound consult triage, SOW drafts, post-call follow-ups |
| Delivery | [[delivery]] | Active engagements, project health, status drafts, milestone tracking |
| Content + Marketing | [[content-marketing]] | Blog, LinkedIn, WFC social, FAQ, objection handling, content calendar |
| Compliance + QA | [[compliance-qa]] | Outbound QA gate, contract gate, compliance matrix validation, incident log |

## Reusable Skills (in this folder)

| Skill | Purpose | Invoke When |
|-------|---------|-------------|
| [[morning-standup-skill]] | Generate today's daily note + morning briefing | Every business day, start of session |
| [[evening-reflection-skill]] | Populate EOD state transfer + evening reflection | End of every business day |
| [[lead-dossier-skill]] | Create or maintain a lead dossier | New lead, lead status change, contact enrichment |
| [[outreach-draft-skill]] | Draft outreach (governance-gated) | Lead ready for contact, follow-up due |
| [[mpq-skill]] | Rebuild master priority queue | MPQ stale ≥ 7 days, major stage movement |
| [[wikilink-audit-skill]] | Find dead links, orphan files, naming drift | Weekly or on demand |

## Specialist Agents (registered in Mavis)

| Agent | Role | Mavis Path | Loads |
|-------|------|------------|-------|
| `ltc-operator` | LTC Pipeline | `~/.mavis/agents/ltc-operator/` | `ltc-pipeline.md` |
| `wfc-operator` | WFC Pipeline | `~/.mavis/agents/wfc-operator/` | `wfc-pipeline.md` |
| `content-marketer` | Content + Marketing | `~/.mavis/agents/content-marketer/` | `content-marketing.md` |
| `vault-hygienist` | Vault infrastructure | `~/.mavis/agents/vault-hygienist/` | Vault hygiene rules + skill |
| `compliance-qa` | Compliance + QA | `~/.mavis/agents/compliance-qa/` | `compliance-qa.md` |

The **Orchestrator** is Mavis itself (root session). Loads `orchestrator.md` at the start of any vault-ops task and dispatches specialists as needed.

## How to Invoke

- **"Run morning startup"** → orchestrator loads `morning-standup-skill`
- **"Process LTC pipeline"** → orchestrator dispatches `ltc-operator`
- **"Triage new WFC inbound"** → orchestrator dispatches `wfc-operator`
- **"Draft outreach for [Lead]"** → orchestrator dispatches the org-specific operator, then `compliance-qa` for QA review
- **"Audit vault hygiene"** → orchestrator dispatches `vault-hygienist`
- **"Run evening shutdown"** → orchestrator loads `evening-reflection-skill`
- **"Rebuild MPQ"** → orchestrator loads `mpq-skill`

See [[agent-team-index]] for the full dispatch reference.
