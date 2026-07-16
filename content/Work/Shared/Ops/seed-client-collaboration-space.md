---
title: Seed — Client Collaboration Space (Self-Hosted)
created: 2026-07-15
updated: 2026-07-15
type: seed
status: thinking
tags: [shared, client-workflow, hosting, self-hosted, hermes-vm, idea]
---

# Seed — Client Collaboration Space (Self-Hosted)

> Idea captured 2026-07-15 as part of a small batch of seed ideas.
> **Not a project plan.** Not worked on today. Surfaces the
> constraints and a short list of platform candidates for future
> exploration.

**See also:** [[hermes-vm-docker-host]] · [[docker-setups]] · [[howto-hermes-tailscale-access]]

---

## The Use Case

A place where I can:

- **Show clients things** — design comps, mockups, draft copy, video
  walk-throughs, status pages, anything visual.
- **Have clients review things** — leave comments, mark up, approve /
  request changes, sign off.
- **Stay open / low-friction** — clients don't want to install Tailscale
  or learn a new tool. Magic link or shared URL is the goal.
- **Stay per-client or per-project** — every engagement gets its own
  clean space that I can spin up / tear down without bleeding into
  other clients.

Phrasing I used in conversation: "open collaboration space" + "where
I can host a client collaboration space." That maps to the **client
portal / client review** category of tools.

---

## Constraints (these drive the platform pick)

1. **No payment.** Self-hosted, free, open-source, or free-tier SaaS
   only. Hard rule.
2. **Lives on `flucido-hermes-vm`** (Oracle Cloud Always Free, 2 OCPU /
   12 GB) — same Docker host as Twenty + n8n + Immich, same operational
   pattern ([[hermes-vm-docker-host]]). Or a **second Always Free shape**
   on the same tenancy if I want to keep client-facing work isolated
   from internal services. Not decided.
3. **Fits existing capacity.** Per the [[docker-setups]] snapshot:
   - RAM: 6.4 GiB free of 11 GiB total.
   - Disk: 16 GiB free of 45 GiB total.
   - Containers: 10 active, room for a few more.
   - Swap: not yet configured.
4. **Public access for clients.** Tailscale-only is too much friction
   for a client who just wants to look at a comp. The space must be
   reachable without a Tailscale install. This is the **biggest
   architectural question** — see Access Model below.
5. **No client accounts required.** Magic link, signed URL, or shared
   passphrase is the target. SSO / per-client sign-up is overkill
   for a 1-2 person studio workflow.

---

## Platform Candidates (shortlist, not ranked)

A rough first cut, grouped by what they're actually good at. Not
researched in depth today — these are the names to come back to.

### Document + feedback (Notion-alikes)

- **Outline** (`outlinewiki/outline`) — minimal, fast, clean. Good for
  shared docs with comments. Probably the lightest-weight option that
  still feels professional.
- **Docmost** (`docmost/docmost`) — newer Notion-alike, more features
  per resource. Heavier than Outline.
- **AppFlowy** (`AppFlowy-IO/AppFlowy`) — closest to Notion UX, has
  offline mode. Cloud version is free; self-host is newer.
- **Affine** (`toeverything/AFFiNE`) — docs + whiteboard + database in
  one. Good for design-y / visual work because of the whiteboard.
- **CryptPad** (`xwiki/cryptpad`) — encrypted collaborative office
  (docs, sheets, slides, kanban). Strong privacy story.

### Design review with comments

- **Penpot** (`penpot/penpot`) — open-source Figma. Real design tool,
  not just a viewer. Heavy (1+ GB RAM) but genuinely useful for
  design-stage review.

### Whiteboard / sketch

- **Excalidraw** (`excalidraw/excalidraw`) — hand-drawn feel,
  end-to-end encrypted, very lightweight. Good for quick visual
  conversations.
- **Affine whiteboard** — if I go with Affine anyway, this is included.

### Comment layer on top of static assets

- **Astro + Decap/Outstatic + Remark42 (or Commento)** — same stack
  as [[frank-lucido-site]]. A static per-project site with a
  comment widget. Most "studio-y" feel; less of a portal, more of
  a reviewable artifact. Lightest deployment.

### Decision to defer

- Don't pick a platform today. Pick the **access model** first — the
  public-internet question is the bigger lever.

---

## Access Model (the architectural question)

The VM is currently bound to Tailscale IP only ([[hermes-vm-docker-host#Tailscale
IP binding for app ports]]). To get clients in, I have to choose one
of these:

| Option | What it looks like | Pros | Cons |
|--------|---------------------|------|------|
| **A. Tailscale only** | Client installs Tailscale, joins my tailnet | Same security model, no public exposure | Friction; clients won't want to |
| **B. Public ports + Caddy + Let's Encrypt** | Open :80/:443 to internet, TLS via Let's Encrypt, public hostname | Standard, well-understood, works anywhere | Open port to the internet; need a domain + DNS |
| **C. Cloudflare Tunnel** | `cloudflared` on the VM, public hostname via Cloudflare, no open ports | No inbound firewall rules; free; integrates with Cloudflare Access for gating | Vendor dependency on Cloudflare; Cloudflare Access for auth adds complexity |
| **D. Tailscale Funnel** | Tailscale's own public ingress for a specific port | Same operational model, no new vendor | Tailscale-side rate limits on free tier; some clients' networks block Tailscale domains |
| **E. Public via long-secret URL** | Bind on public IP, no auth, 256-bit URL as the gate | Zero-config | One secret leak and the whole world has it; not auditable |

**Lean right now:** C for primary (Cloudflare Tunnel) with B as a
fallback if Cloudflare becomes a problem. C lets me keep the Oracle
security list closed and adds a free Cloudflare Access layer if I
want per-client gating later. Domain cost is the only real spend —
and that can be a $10-15/yr domain, not a SaaS subscription, so the
"no payment" rule is mostly preserved.

---

## Capacity Check (rough)

For a small client-collab workload, expected footprint per candidate:

| Platform | RAM estimate | Disk estimate | Comments |
|----------|--------------|---------------|----------|
| Outline | ~250-400 MB | ~500 MB | Lightest of the doc options |
| Docmost | ~500 MB - 1 GB | ~1 GB | Mid-weight |
| AppFlowy (self-host) | ~1-2 GB | ~1-2 GB | Heavier, more features |
| Affine | ~1-2 GB | ~2 GB | Doc + whiteboard together |
| CryptPad | ~500 MB | ~1 GB | Per-instance resource cost |
| Penpot | ~1.5-2 GB | ~2 GB | Real design tool weight |
| Excalidraw | ~50-100 MB | ~100 MB | Trivial |
| Astro + Remark42 | ~100-200 MB | ~500 MB | Static site + comment layer |

All fit in the 6.4 GiB free RAM / 16 GiB free disk headroom on the
current VM, with one bigger service (e.g., Penpot) probably wanting
the swapfile added first.

---

## Open Questions (not today)

1. **Per-client vs. shared workspace.** One persistent workspace with
   per-client folders, or one ephemeral workspace per engagement?
   Ephemeral is cleaner; persistent is less work to spin up.
2. **One service vs. two.** Doc tool + whiteboard together (Affine)
   or split across two stacks (Outline + Excalidraw)? Bundle is
   less to maintain; split is more flexible.
3. **Auth model.** Magic link (per-client email), shared secret
   (project-level), Cloudflare Access (per-client identity), or
   signed URL (per-asset). Each has different ergonomics for the
   client.
4. **Lifecycle.** Tear down after the project, or keep as a permanent
   client-facing "front door"? Permanent gives clients a stable URL
   to bookmark; ephemeral keeps capacity free.
5. **Domain.** Single shared domain (`review.wellfullcollective.com`)
   or per-client subdomain? Single is simpler; per-client is more
   professional but adds DNS work.
6. **Backup / archival.** When the engagement ends, do artifacts stay
   in the collab space, get exported to the vault, or both?

---

## Why This Note Exists (So I Don't Forget)

Captured 2026-07-15 alongside the prompt-compiler seed. The
"dumping ground" comment means these are deferred seeds, not active
work. When client-collab work actually comes up — likely on the
Susan engagement or a future Squarespace project — come back here
and **start with the access-model question**, not the platform pick.
Access model is the bigger lever; platform is downstream of it.
