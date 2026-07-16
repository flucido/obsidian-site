---
title: Skills Review — LinkedIn and Email Campaign Tooling
created: 2026-05-20
updated: 2026-05-20
type: asset
tags: [wfc, marketing, skills, tooling, linkedin, email]
---

# Skills Review: LinkedIn + Email Campaign Capabilities

## What Exists in the Workspace

### LinkedIn Content Operations (from frank-lucido-site)

The vault already has a LinkedIn content operation for Frank Lucido's LTC positioning:

- **7 reviewed posts** in `/Users/flucido/projects/frank-lucido-site/linkedin-content/reviewed/`
- **Content calendar** integrated into Obsidian
- **Post format:** Title + Post body + Image specs + Hashtags
- **Cadence:** Weekly (Mondays), LTC-focused (FERPA, data infrastructure, school IT)

This operation can be extended with a WFC track.

### Email Infrastructure (from wellfullcollective)

The production website already has:

- **Resend** integration for transactional email (consultation form → notification)
- **API route:** `/api/consultation` (POST handler)
- **Next.js + Bun** stack ready for additional email routes

For bulk campaign sends, Resend works but consider dedicated campaign tooling (see below).

---

## Recommended Skills / Tools to Add

### 1. LinkedIn Post Scheduling & Tracking

The current operation creates content but has no scheduling or analytics.

**Options:**
- **Buffer / Hootsuite** — Schedule posts, track engagement, multi-profile management. Buffer's free tier supports 3 channels.
- **Shield Analytics** — LinkedIn-specific analytics. Tracks post performance, follower growth, content themes.
- **Taplio** — AI-assisted LinkedIn content + scheduling + CRM-lite. Expensive ($65/mo) but strong for LinkedIn-first marketing.

**What to add to the vault:** A System runbook for LinkedIn post workflow (create → review → schedule → track). Would live at `System/runbooks/linkedin-post-workflow.md`.

### 2. Email Campaign Management

Resend handles transactional email but is not a campaign tool. For list management, sequences, and analytics:

**Options:**
- **Resend + custom sequence** — Build a lightweight campaign sequencer in the Next.js app using Resend's batch API. Low cost, full control, but requires build work.
- **ConvertKit** — Creator-focused, good for small lists, free up to 1,000 subscribers. Sequences, tagging, landing pages.
- **MailerLite** — Similar to ConvertKit, slightly better deliverability. Free up to 1,000 subscribers.
- **Loops** — Modern, clean UX, good API. Free up to 1,000 contacts. Strong for SaaS/product-led but works for services too.

**Recommendation:** Start with Resend batch sends (no new tool, minimum lift) for the Marin CAMFT campaign. Graduate to ConvertKit or Loops when list exceeds 50 contacts or you need automated sequences (welcome series, nurture, re-engagement).

### 3. CRM / Pipeline Tracking

The vault already has a pipeline, but it is manual. For scaling:

**Options:**
- **Obsidian + Dataview** — Keep it in-vault. Dataview plugin can generate pipeline views from frontmatter. Zero cost, full control.
- **Notion** — If Obsidian pipeline becomes unwieldy. Better sharing with Dr. Ogren.
- **Folk** — Lightweight CRM, good for small teams. Contact enrichment, sequences, pipeline views.
- **Attio** — More powerful but expensive. Overkill at current scale.

**Recommendation:** The Obsidian pipeline is sufficient at 25 leads. Add Dataview for auto-generated views. Revisit at 50+ leads.

### 4. Lead Enrichment

For verifying emails before sending and enriching therapist profiles:

**Options:**
- **Hunter.io** — Email verification and finding. Free tier: 25 searches/month.
- **Clearbit** — Company/person enrichment (API). Free tier available.
- **Apollo.io** — Sales intelligence + sequences. Generous free tier.
- **NeverBounce** — Email list cleaning before campaign sends. Pay-as-you-go.

**Recommendation:** Use Hunter.io for email verification before the Marin CAMFT send. A single bounced email on a cold list hurts deliverability for the whole batch.

### 5. LinkedIn Company Page Management

Creating a LinkedIn company page requires:

- A personal LinkedIn account to create it (Frank's existing account)
- Company email domain (frank@wellfullcollective.com — set up in Resend or Google Workspace)
- Logo/banner assets (TBD — current site uses text treatment)

**Action items:**
1. Set up `frank@wellfullcollective.com` email (Resend domain or Google Workspace)
2. Create LinkedIn company page from Frank's account
3. Upload banner and logo
4. Post opening announcement (pin to page)
5. Invite connections to follow the page

---

## Skills Not Available in Hermes (Current Toolset)

Hermes as an AI agent can:

- ✅ Draft LinkedIn posts (text generation)
- ✅ Draft email templates (text generation)
- ✅ Research leads and compile lists
- ✅ Create content calendars and runbooks

Hermes cannot:

- ❌ Post to LinkedIn directly (no LinkedIn API integration)
- ❌ Send email campaigns (no SMTP/Resend integration in agent tools)
- ❌ Verify emails in real-time (needs external API)
- ❌ Track opens/clicks (needs campaign tool integration)

**Workflow:** Hermes drafts → Human reviews → Human sends (via LinkedIn UI, Resend dashboard, or campaign tool).

---

## Priority Actions (This Week)

| Priority | Action | Tool | Effort |
|----------|--------|------|--------|
| P0 | Verify Marin CAMFT lead emails | Hunter.io (free tier) | 30 min |
| P0 | Set up frank@wellfullcollective.com | Resend or Google Workspace | 1 hour |
| P1 | Create LinkedIn company page | LinkedIn (Frank's account) | 30 min |
| P1 | Post opening announcement | LinkedIn | 15 min |
| P1 | Send batch 1 (5 emails) from Marin CAMFT campaign | Resend batch API or manual | 30 min |
| P2 | Add Dataview pipeline views to Obsidian | Obsidian Dataview plugin | 1 hour |
| P2 | Create LinkedIn post runbook | Obsidian | 30 min |
| P3 | Set up WFC LinkedIn content calendar | Obsidian | 1 hour |
| P3 | Evaluate ConvertKit vs Loops for campaigns | Research | 1 hour |
