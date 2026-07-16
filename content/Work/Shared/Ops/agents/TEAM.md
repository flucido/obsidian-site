---
title: Agent Team — Roster & Visibility
created: 2026-07-10
updated: 2026-07-10
type: reference
tags: [shared, agents, reference, visibility, roster]
sticker: lucide//users
---

# Agent Team — Roster & Visibility

> **Pin this in your Obsidian home.** Single-source reference for the team
> that manages the vault. Replaces the pre-2026-07-10 "Hermes" stack.
>
> For dispatch instructions, see [[agent-team-index]]. For role contracts,
> see `Work/Shared/Ops/agents/<role>.md`.

---

## The Six

| | Agent | Role | Vault Contract | Trigger Phrase |
|---|-------|------|----------------|----------------|
| 🧭 | **Mavis** (Orchestrator) | Daily synthesis, top-3 per org, MEMORY + MPQ steward, dispatches specialists | [[Work/Shared/Ops/agents/orchestrator\|orchestrator]] | "Run morning startup" / "Process pipeline" / "Run evening shutdown" |
| 🏫 | **`ltc-operator`** | LTC pipeline, lead triage, post-meeting notes, outreach drafts | [[Work/Shared/Ops/agents/ltc-pipeline\|ltc-pipeline]] | "Process LTC pipeline" / "Triage LTC leads" / "Capture NBA meeting notes" |
| 🌱 | **`wfc-operator`** | WFC pipeline, inbound triage, SOW drafts, post-call follow-ups | [[Work/Shared/Ops/agents/wfc-pipeline\|wfc-pipeline]] | "Process WFC pipeline" / "Triage WFC inbound" / "Draft Susan follow-up" |
| ✍️ | **`content-marketer`** | Blog, LinkedIn, WFC social, FAQ, content calendar | [[Work/Shared/Ops/agents/content-marketing\|content-marketing]] | "Draft LinkedIn Day NN" / "Draft blog post" / "Draft IG post" |
| 🔍 | **`compliance-qa`** | Outbound QA gate, contract gate, incident log | [[Work/Shared/Ops/agents/compliance-qa\|compliance-qa]] | "QA review on [file]" / "Run contract gate" |
| 🧹 | **`vault-hygienist`** | Wikilink audit, naming, frontmatter, orphan files (low-risk autonomous) | [[Work/Shared/Ops/agents/wikilink-audit-skill\|wikilink-audit-skill]] | "Audit vault hygiene" / "Find dead links" |

Plus the three built-in Mavis agents available to all sessions:
- **`coder`** — software engineering (use for code changes in repos, never for vault)
- **`verifier`** — adversarial verification (use to review deliverables before sending)
- **`general`** — flexible worker (fallback for tasks outside the specialist roles)

---

## Scheduled Routines (Cron)

The team runs three routines on a schedule, even when you're not in a session.

| Routine | Time (PT) | Days | Cron Name | What It Does |
|---------|-----------|------|-----------|--------------|
| ☀️ **Morning** | 7:30 AM | Mon–Fri | `morning-routine` | Reads state, generates today's `Daily/<date>.md`, populates `morning-standup.md`, bumps `MEMORY.md`, sends morning briefing |
| 🌤️ **Midday** | 12:30 PM | Mon–Fri | `midday-delivery-check` | Checks active engagements (NBA, Susan), surfaces overdue items, updates weekly plans, flags HIGH risks |
| 🌙 **Evening** | 6:00 PM | Mon–Fri | `evening-shutdown` | Reconciles day, populates EOD state transfer, updates `evening-reflection.md`, bumps `MEMORY.md`, sends wrap-up |

Active hours: 7:00 AM – 7:00 PM PT. Timezone: `America/Los_Angeles`.

### Adjust the schedule
```bash
mavis cron list mavis              # see all cron tasks
mavis cron info mavis morning-routine   # see current schedule
mavis cron update mavis morning-routine --schedule "0 8 * * 1-5"  # change to 8:00 AM
mavis cron disable mavis morning-routine   # pause a routine
mavis cron enable mavis morning-routine    # resume
mavis cron delete mavis morning-routine    # remove
mavis cron trigger mavis morning-routine   # fire once now (manual test)
```

---

## Hard Scope Rule (All Agents)

> **The team operates on the vault + LTC + WFC pipelines ONLY.**
> Code repos are human-in-the-loop. Agents PROPOSE; Frank commits.

| In Scope (agents touch) | Out of Scope (human-only) |
|--------------------------|----------------------------|
| `/Users/flucido/workspace/` (the vault) | `~/projects/wellfullcollective/` (WFC code) |
| `Work/LTC/`, `Work/WFC/`, `Work/Shared/` | `~/projects/frank-lucido-site/` (LTC website code) |
| `leads/ltc-*/`, `leads/wfc-*/` | `~/projects/nerodesign/` (design system) |
| `Daily/`, `Research/`, `People/`, `Personal/` | `~/projects/local-data-stack/` (LTC data project) |

---

## Six Governance Rules (Apply to Every Agent)

1. **No outbound sends** — drafts only. Frank sends.
2. **Pricing, contracts, legal = human-in-the-loop only.**
3. **QA gate on all external communications** — every outbound goes through `compliance-qa` first.
4. **Every decision links to a vault artifact** — `[[wikilink]]` or external URL.
5. **Drafts are not final** — only the Orchestrator (Mavis) commits canonical state.
6. **No writes to code repos** — see scope rule above.

---

## Visual HTML Version

A pinned visual HTML version of this team is at:
`Work/Shared/Ops/agents/TEAM.html`

Dark Bloomberg-dashboard aesthetic (matches your LTC site design system) so
you can pin it in Obsidian or open it in a browser tab.

---

## CLI Quick Reference

```bash
# List all agents (built-in + your team)
mavis agent list -H

# Show details for one agent
mavis agent info mavis
mavis agent info ltc-operator

# See what skills an agent can use
mavis skill list mavis
mavis skill list ltc-operator

# See agent's recent logs
mavis agent logs ltc-operator
```

---

*Maintained by the Orchestrator. Last updated 2026-07-10.*
