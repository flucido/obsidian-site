---
title: Hermes VM — Docker Host & Hermes Web Dashboard Sunset
created: 2026-07-15
updated: 2026-07-15
type: operational
status: active
tags: [shared, infrastructure, hermes-vm, docker, oracle-cloud, twenty, n8n, immich]
---

# Hermes VM — Docker Host & Hermes Web Dashboard Sunset

> Captured 2026-07-15. Original draft framed this as "remote Hermes
> sunset" — that frame was wrong. The VM is **not** a Hermes platform;
> it's a **general-purpose Docker host** with the Hermes web-dashboard
> bit being the one thing being deprecated. The instance name
> `flucido-hermes-vm` is legacy naming and is preserved for now.

**See also:** [[howto-hermes-tailscale-access]] · [[flucido-hermes-vm-management]] · [[docker-setups]] · [[n8n-how-to]] · [[twenty-crm-how-to]] · [[environment]] · [[agent-team-index]]

---

## TL;DR

- The VM (`flucido-hermes-vm`, Oracle Cloud Always Free, 2 OCPU / 12 GB,
  Tailscale IP `100.82.161.32`) is **staying**. It runs a healthy Docker
  stack — Twenty CRM, n8n, Immich — and is the standing self-hosted
  Docker host for new services as they come up.
- The Hermes web-dashboard piece is the **one** thing being sunsetted.
  Mavis replaced Hermes on 2026-07-10; the Hermes web UI is a constant
  fight and not worth the time.
- Tailscale + per-app Tailscale-IP binding + the inventory-doc pattern
  are the proven operational pattern. Reuse verbatim for any new
  Docker service added to the box.

---

## What's Running on the VM (current state, 2026-07-15)

Inventory: 10 active containers, 4 local volumes. ~5.2 GiB / 11 GiB RAM
used, ~16 GiB free disk. Source of truth: [[docker-setups]].

| Service | Stack | Containers | Access (Tailscale only) |
|---------|-------|------------|--------------------------|
| **Twenty CRM** | `twentycrm/twenty:v2.20.0` + Postgres + Redis | `twenty-server-1`, `twenty-worker-1`, `twenty-db-1`, `twenty-redis-1` | `http://100.82.161.32:3020` |
| **n8n** | `docker.n8n.io/n8nio/n8n:2.29.10` + external runner + Postgres | `n8n`, `n8n-runner`, `n8n-postgres` | `http://100.82.161.32:5678` |
| **Immich** | `ghcr.io/imagegenius/immich:3.0.1` + Postgres + Valkey | `immich`, `immich-postgres`, `immich-valkey` | `http://100.82.161.32:2283` |

All three stacks are **business-active** (Twenty CRM is the CRM-of-record
for WFC + LTC leads; n8n is the workflow/automation platform; Immich is
the photo library). Tearing any of these down would be a real loss.

---

## The Sunset Decision (Hermes Web Dashboard Only)

**Stop trying to use the Hermes web dashboard as a daily-driver interface.**

- Hermes-as-agent-platform was replaced by Mavis on 2026-07-10 (see
  [[agent-team-index]] and [[agent-prompts#Historical Context (Pre-2026-07-10)]]).
- The web dashboard bind incantation is fragile
  (`--host <TAILNET_IP> --port 9119 --no-open --insecure`) and the
  build-on-boot behavior breaks persistence.
- TUI-over-SSH still works if ever needed, but is not the daily path
  anymore — Mavis is.
- **The VM is unaffected.** The Hermes web-dashboard process was
  running on the VM; killing it leaves CRM + n8n + Immich untouched.

What this is **not**:
- Not a decision to remove the Hermes-named `flucido-hermes-vm` instance.
  The instance name is legacy and renaming is a separate, low-priority
  cleanup.
- Not a decision to remove the `hermes-*` paths in docs. Those are
  honest historical names; renaming them would lose the link to the
  `flucido-hermes-vm` instance identifier.

---

## Direction: This Becomes the General-Purpose Docker Host

Frank's working mental model (captured 2026-07-15): the VM is the place
where self-hosted Docker services go. Current inventory is Twenty + n8n
+ Immich. New services (when warranted) default to the same VM with the
same pattern unless the workload doesn't fit (e.g., GPU work, very large
storage, external-user scale).

When a new self-hosted service is needed, follow the established pattern
(see Operational pattern below). The decision tree is roughly:

- Single container, < 2 GB RAM, no GPU? → VM, follows current pattern.
- Multi-container stateful stack? → VM, follows current pattern.
- Big-data, GPU, or external user scale? → different host, not the VM.

---

## Operational Pattern (the established recipe)

Each app gets the same shape on the VM:

```
/home/ubuntu/<app-slug>/
  docker-compose.yml    # the stack
  .env                  # secrets (mode 600, never committed)
  backups/              # DB + volume backups land here
  local-files/          # optional: bind-mounted data the app reads/writes
```

Plus a per-app how-to doc under `/home/ubuntu/<AppSlug>HowTo.md` that
is mirrored into the vault at `Work/Shared/Ops/<app>-how-to.md`. The
top-level inventory doc `/home/ubuntu/DockerSetups.md` is mirrored to
`Work/Shared/Ops/docker-setups.md` and is the source of truth for
container states, ports, image versions.

**Why this pattern works:**
- One app per dir, named after the app, no clever grouping.
- `.env` next to compose for the same reason Docker Compose expects it.
- Tailscale IP binding is enforced at compose time, not via firewall —
  firewall is the failure mode, not the safety belt.
- Inventory doc is regenerated when anything changes; vault mirror keeps
  the canonical state observable from the laptop.

**Suggested start/stop order** (per [[docker-setups#Global operations]]):
- Start: Twenty → Immich → n8n (core business apps first).
- Stop: n8n → Immich → Twenty.

---

## Knowledge Harvest (reusable patterns)

The Tailscale-on-Oracle + Docker pattern is well-proven. These are the
bits worth keeping verbatim for any future expansion:

### Tailscale IP binding for app ports

All app HTTP ports are bound to the VM's Tailscale IP `100.82.161.32`,
not `0.0.0.0`. Effect: the public internet cannot reach the apps even
if Oracle's security list drifts open. The Tailscale tunnel is the only
path. Tailscale IPs are 100.x.y.z — they're effectively private, so
binding there is "private by construction."

### Per-app port allocation

Current allocation: 3020 (Twenty), 5678 (n8n), 2283 (Immich). No
collisions yet. When picking a new port, add a row to the inventory
doc so the next person sees it. Free high ports are wide; collisions
shouldn't happen for a long time.

### `.env` hygiene

`.env` files contain real secrets. Mode `600`. Never committed. Never
copied into Obsidian. The vault mirror docs (docker-setups,
twenty-crm-how-to, n8n-how-to) explicitly say "do not disclose / copy
secrets from this file" — that's the standing rule. Backups are
local-only and never sent off-host.

### Tailscale-on-Oracle-Cloud baseline

`VM.Standard.A1.Flex`, 2 OCPU / 12 GB in `us-sanjose-1`, Always Free
tier, 45 GiB boot volume. Confirmed-working baseline; reuse for any
second Always Free shape if we ever spin one up. Runbook: [[howto-hermes-tailscale-access]].

### Inventory-doc-as-source-of-truth

Single file (`/home/ubuntu/DockerSetups.md` on the VM, mirrored to
[[docker-setups]] in the vault) lists every container, image, port,
volume, restart policy, and verified state. Updates are committed
when a container is added/changed. Don't let this file drift.

### Capacity headroom (as of 2026-07-10 snapshot)

- RAM: 5.2 GiB used / 11 GiB total / 6.4 GiB free.
- Disk: 29 GiB used / 45 GiB total / 16 GiB free.
- Docker images: 10.67 GB.
- Swap: none configured (recommended next infra work per [[docker-setups]]).
- Block volume: not yet attached (planned for Immich photo library).

Each new container eats into this. If we add a heavier service (e.g.,
self-hosted LLM), revisit the snapshot.

---

## Open Followups (deferred, not today)

1. **Swapfile + OCI block volume** — already flagged in [[docker-setups]]
   as "recommended next infra work." Add 4 GiB swap as OOM safety;
   attach a block volume for Immich photo storage before importing the
   real library.
2. **`environment.md` update** — the current line
   `Oracle Cloud (flucido-hermes-vm) | ✅ Running | 2 OCPU, 12 GB…`
   is true but uninformative. Could be expanded to point to [[docker-setups]]
   as the source of truth for what's actually running.
3. **Hermes-instance rename** — `flucido-hermes-vm` is now legacy naming.
   Renaming the Oracle instance and updating every doc reference is a
   real exercise; not worth it for clarity alone, but worth doing the
   next time we touch the VM for an unrelated reason.
4. **Postiz relocation** — per [[postiz-setup-guide]] Postiz is on
   localhost:4007 (Mac), not the VM. If we ever want a 24/7 Postiz
   instance, it goes on this VM with the same pattern.
5. **MEMORY.md cleanup** — the line "Oracle Cloud — flucido-hermes-vm:
   RUNNING…" can move to "see also: [[hermes-vm-docker-host]]" once
   the rename/refactor is done. Low priority.
