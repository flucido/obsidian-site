---
title: Postiz Setup — All Connectors
created: 2026-06-23
type: operational
tags: [shared, postiz, social-media, setup]
---

# Postiz Setup — Social Media + Blog Connectors

> Postiz is the scheduling platform for WFC + LTC social content.
> Dashboard: http://localhost:4007 | Temporal: http://localhost:8080
> Account: frank.lucido@gmail.com

---

## Platform Accounts

| Platform | Account/Handle | Type | Status |
|----------|---------------|------|--------|
| **LinkedIn** | Frank Lucido (personal) + WFC Company Page | Personal + Company | Needs connector setup |
| **Instagram** | @wellfull_collective | Business/Creator | Needs connector setup |
| **TikTok** | @wellfullcollective | Business | Needs connector setup |
| **Blog** | lucidotechnologyconsulting.com/blog | RSS / API | Needs feed generation |

---

## 1. LinkedIn

### Account
- **Personal:** Frank Lucido — frank.lucido@gmail.com
- **WFC Company Page:** WellFull Collective
- **LTC Company Page:** Lucido Technology Consulting

### Postiz Setup
1. Go to http://localhost:4007 → Settings → Channels → Add Channel
2. Select **LinkedIn**
3. Authenticate via OAuth with Frank's LinkedIn account
4. Postiz will pull in both personal profile + company pages
5. Select which page to post to for each scheduled post

### Notes
- LinkedIn OAuth requires the account to have admin access to company pages
- Posts can include text, images, links, and documents
- LinkedIn open-source series (Days 01-16) — drafted, ready for rolling posting
- Day 01 (DuckDB) posted 6/17, Day 02 posted 6/19. Days 03-16 ready.

---

## 2. Instagram

### Account
- **Handle:** @wellfull_collective
- **Type:** Business or Creator account (required for API access)

### Postiz Setup
1. Instagram posting requires a **Facebook Page** connected to the Instagram account
2. Go to Facebook → Settings → Linked Accounts → Instagram
3. Ensure Instagram is a Business or Creator account (not personal)
4. In Postiz: Settings → Channels → Add Channel → **Instagram**
5. Authenticate via Facebook OAuth (this links both Facebook Page + Instagram)

### Prerequisites
- Instagram account MUST be Business or Creator (switch in Instagram Settings → Account)
- Facebook Page must be linked to Instagram account
- Frank must have admin access to the Facebook Page

### Notes
- Instagram limits: images, carousels, reels, stories
- First WFC content drafted 6/13 — IG post + IG story ready to go
- Content strategy: therapist tips, website pain points, before/after

---

## 3. TikTok

### Account
- **Handle:** @wellfullcollective
- **Followers:** 1 (organic — first follower 6/17)

### Postiz Setup
1. Go to Settings → Channels → Add Channel → **TikTok**
2. Authenticate via TikTok OAuth
3. Select @wellfullcollective account

### Notes
- TikTok content drafted 6/13 — short-form therapist tips
- First follower appeared 6/17 without any content posted — organic discoverability signal
- Postiz supports TikTok video scheduling

---

## 4. Blog — RSS Feed Connector

### Current State
- **Blog URL:** https://lucidotechnologyconsulting.com/blog
- **CMS:** Payload CMS (self-hosted on Vercel)
- **Published posts:** 4 (LFED, Data Privacy Stack, Data Sovereignty, Institutional Data Debt)
- **RSS feeds attempted:** `/blog/feed.xml`, `/blog/rss.xml`, `/blog/rss` — all return 404
- **Root cause:** Payload CMS v3 does not include built-in RSS feed generation. An RSS plugin or custom endpoint is needed.

### Option A — Add Payload RSS Plugin (Recommended)
Payload has a community RSS plugin (`@payloadcms/plugin-rss` or `payload-rss-plugin`):

```bash
cd /Users/flucido/projects/frank-lucido-site
pnpm add @payloadcms/plugin-rss
```

Then add to `payload.config.ts`:
```typescript
import { rssPlugin } from '@payloadcms/plugin-rss'
// ...
plugins: [
  rssPlugin({
    collections: ['blog'],
    title: 'Lucido Technology Consulting — Blog',
    description: 'Education data infrastructure, student privacy, and local-first analytics',
    siteURL: 'https://lucidotechnologyconsulting.com',
    feedPath: '/blog/feed.xml',  // or /rss.xml
  })
]
```

Deploy to Vercel and verify: `curl https://lucidotechnologyconsulting.com/blog/feed.xml`

### Option B — Custom RSS Endpoint
Create a Next.js route handler that generates RSS XML from Payload's REST API:

```typescript
// src/app/blog/feed.xml/route.ts
import { NextResponse } from 'next/server'
// Fetch blog posts from Payload REST API
// Generate RSS XML
// Return with content-type: application/rss+xml
```

### Postiz Blog Connector Setup
Once the feed is live:
1. Settings → Channels → Add Channel → **Blog** (or RSS)
2. Enter feed URL: `https://lucidotechnologyconsulting.com/blog/feed.xml`
3. Postiz will auto-detect new posts and queue them for social sharing

### Alternative: Manual Blog Sharing
If RSS is delayed, blog posts can be shared manually through Postiz:
1. Create post → select LinkedIn channel
2. Paste blog URL + custom caption
3. Schedule or publish immediately

---

## WFC Content Ready to Post

| Platform | Content | Status |
|----------|---------|--------|
| Instagram | Therapist website tips post | Drafted 6/13 |
| Instagram | Before/after story format | Drafted 6/13 |
| TikTok | Short-form therapist tips (Day 1) | Drafted 6/13 |
| TikTok | Website pain points | Drafted 6/13 |
| LinkedIn | Open-source series Day 01 (DuckDB) | ✅ Posted 6/17 |
| LinkedIn | Open-source series Day 02 (Polars + dbt) | ✅ Posted 6/19 |
| LinkedIn | Open-source series Days 03-16 | Drafted, ready |

### Content Strategy Docs
- Campaign: Work/WFC/marketing/social-media-campaign
- Content strategy: Work/WFC/marketing/content-strategy-social-seo
- Launch checklist: Work/WFC/marketing/launch-checklist

---

## Postiz Server Info

| Detail | Value |
|--------|-------|
| **Location** | /Users/flucido/workspace/postiz/ |
| **Dashboard** | http://localhost:4007 |
| **Temporal** | http://localhost:8080 |
| **Start** | `docker compose up` from `/Users/flucido/workspace/postiz/` |
| **Account** | frank.lucido@gmail.com |

---

## Quick Start Order

1. **Start Postiz** if not running: `cd /Users/flucido/workspace/postiz && docker compose up -d`
2. **Connect LinkedIn first** — fastest to set up, no prerequisites
3. **Connect Instagram** — needs Facebook Page link (5 min)
4. **Connect TikTok** — needs business account (2 min)
5. **Blog RSS** — needs RSS feed generated from Payload (20-30 min). Post manually until feed is live.
6. **Post first WFC content** — IG + TikTok. Content is drafted. Just needs to go live.
