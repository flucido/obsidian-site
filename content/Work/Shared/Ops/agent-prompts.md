---
title: Agent Prompts (Redirect)
created: 2026-05-17
updated: 2026-07-10
type: system
tags: [agents, prompts, reference, redirect]
status: deprecated-redirect
---

# Agent Prompts — REDIRECT

> **This file is deprecated as of 2026-07-10.** The agent team has been
> restructured. New role contracts live under `Work/Shared/Ops/agents/`.
>
> **See:**
> - [[agent-team-index]] — single dispatch reference
> - [[Work/Shared/Ops/agents/_index]] — full team index
> - `Work/Shared/Ops/agents/<role>.md` — per-role contracts (orchestrator, ltc-pipeline, wfc-pipeline, delivery, content-marketing, compliance-qa)
> - `Work/Shared/Ops/agents/<skill>.md` — reusable skills (morning-standup, evening-reflection, lead-dossier, outreach-draft, mpq, wikilink-audit)
>
> **This file is preserved for historical context only.** It referenced the
> pre-Mavis "Hermes" agent swarm and is no longer maintained.

---

## Historical Context (Pre-2026-07-10)

The original agent system was a 5-agent team designed for the Hermes
orchestration platform:

1. **Executive Orchestrator** — daily synthesis
2. **Revenue Ops Agent** — pipeline management
3. **Delivery Ops Agent** — project execution
4. **Content and Market Signal Agent** — content + thought leadership
5. **Compliance and QA Agent** — QA gate + governance

Plus an **Outbound Mobility Agent** (lead gen + 5-gate verification) that
was used for the 5/17-5/22 Marin CAMFT scrape and retired 6/1 with the
WFC inbound-only pivot.

The new team (see `agent-team-index`) is a Mavis-native refactor that:

- Adds a 6th specialist role: **vault-hygienist** (infrastructure health)
- Reorganizes the 5 original roles for clearer vault boundaries
- Splits Delivery from the Orchestrator into an explicit dispatch pattern
- Adds 6 reusable skills (morning-standup, evening-reflection, lead-dossier,
  outreach-draft, mpq, wikilink-audit)
- Codifies the **no-writes-to-code-repos** rule (human-in-the-loop)
- Replaces "Hermes" with the Mavis system throughout

---

## Mavis VM Reference (Historical)

> Section below preserved from the original file. Live state at
> `Work/Shared/Ops/flucido-hermes-vm-management.md` and
> `Work/Shared/Ops/howto-hermes-tailscale-access.md`.

```
Service        URL                              How it works
Workspace UI   http://hermes-vm                 Tailscale Serve :80 → Vite :3000
Dashboard      http://100.82.161.32:9120        Caddy proxy :9120 → Dashboard :9119 (loopback, no auth needed)
Gateway API    http://100.82.161.32:8642        Direct on Tailscale IP
```
