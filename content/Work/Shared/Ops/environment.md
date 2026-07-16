# Environment

> Mavis runtime + vault infrastructure. Updated 2026-07-10 with the new agent team.

## Tooling
- **Mavis** (Mavis) — multi-agent orchestration platform. Replaces the pre-2026-07-10 "Hermes" stack.
- **Obsidian** — company brain, local-first, markdown-native
- **Turso (libSQL)** — preferred backend data store for lead/CRM records (per USER.md)
- **macOS** — host environment

## Vault Paths
- Root: `/Users/flucido/workspace/`
- Core: `MEMORY.md`, `USER.md`, `Work/Shared/Ops/environment.md`
- Organizations: `Work/LTC/pipeline.md`, `Work/WFC/pipeline.md`
- Priority Queue: `Work/Shared/master-priority-queue.md`
- Daily notes: `Daily/YYYY-MM-DD.md`
- Lead dossiers: `leads/<org>-<slug>/dossier.md`
- Agent team: `Work/Shared/Ops/agents/`, `Work/Shared/Ops/agent-team-index.md`

## Agent Team (Vault + Mavis Hybrid)

| Role | Vault Contract | Mavis Path | Function |
|------|----------------|------------|----------|
| **Orchestrator** | `Work/Shared/Ops/agents/orchestrator.md` | (Mavis root) | Daily synthesis, MEMORY + MPQ, dispatches specialists |
| LTC Pipeline | `Work/Shared/Ops/agents/ltc-pipeline.md` | `~/.mavis/agents/ltc-operator/` | LTC pipeline, lead triage, post-meeting notes |
| WFC Pipeline | `Work/Shared/Ops/agents/wfc-pipeline.md` | `~/.mavis/agents/wfc-operator/` | WFC pipeline, inbound triage, SOW drafts |
| Delivery | `Work/Shared/Ops/agents/delivery.md` | (Orchestrator) | Active engagements, project health, status drafts |
| Content + Marketing | `Work/Shared/Ops/agents/content-marketing.md` | `~/.mavis/agents/content-marketer/` | Blog, LinkedIn, WFC social, FAQ, content calendar |
| Compliance + QA | `Work/Shared/Ops/agents/compliance-qa.md` | `~/.mavis/agents/compliance-qa/` | Outbound QA gate, contract gate, incident log |
| Vault Hygienist | `Work/Shared/Ops/agents/wikilink-audit-skill.md` | `~/.mavis/agents/vault-hygienist/` | Wikilink audit, naming, orphan files |

**Reusable skills** (in `Work/Shared/Ops/agents/`):
- `morning-standup-skill.md` — generate today's daily note + morning briefing
- `evening-reflection-skill.md` — populate EOD state transfer
- `lead-dossier-skill.md` — create/maintain a lead dossier
- `outreach-draft-skill.md` — draft outreach (governance-gated)
- `mpq-skill.md` — rebuild master priority queue
- `wikilink-audit-skill.md` — find dead links, orphan files, naming drift

**Dispatch reference:** `Work/Shared/Ops/agent-team-index.md`

## Scope Boundary (Hard Rule)

The agent team operates on **the vault + LTC + WFC pipelines ONLY.**

The following code repos are **human-in-the-loop** — agents PROPOSE changes
(via drafts in the vault), Frank commits:
- `~/projects/wellfullcollective/`
- `~/projects/frank-lucido-site/`
- `~/projects/nerodesign/`
- `~/projects/local-data-stack/`

## Governance

1. No outbound sends without human approval — hard stop.
2. Pricing, contracts, legal = human-in-the-loop only.
3. QA gate on all external communications — source references required.
4. Every decision must link to a vault artifact — full traceability via `[[wikilinks]]`.
5. Drafts are not final — only the Orchestrator commits canonical state.
6. No writes to code repos — agents propose, humans commit.

## Automation Interfaces

- **Mavis CLI** for agent dispatch, session management, and skill loading
- **Cron jobs** for scheduled daily startup/shutdown loops (e.g., morning briefing at 7:30am)
- **Kanban board** for task tracking and delegation (Mavis-native)
- **Session search** for cross-session context recall

## External Service Status (2026-07-09)

| Service | Status | Notes |
|---------|--------|-------|
| Gmail API | ⚠ REVOKED | `invalid_grant` Day 16+. Browser re-consent needed at https://console.cloud.google.com (project: `hermes-workspace`) |
| Google Calendar | ⚠ REVOKED | Same OAuth dependency as Gmail |
| LinkedIn (via Gmail) | ⚠ REVOKED | Same OAuth dependency |
| Himalaya (WFC mailboxes) | ✅ Working | `info@`, `frank@wellfullcollective.com` reachable |
| Oracle Cloud (flucido-hermes-vm) | ✅ Running | 2 OCPU, 12GB, us-sanjose-1, public IP 163.192.52.35 |
| Tailscale | ✅ Working | Mac reachable (Frank home from vacation) |
| lucidotechnologyconsulting.com | ✅ Live | Vercel-hosted |
| wellfullcollective.com | ✅ Live | Vercel-hosted |
| Postiz | ⚠ State TBD | localhost:4007 — verify still running |
