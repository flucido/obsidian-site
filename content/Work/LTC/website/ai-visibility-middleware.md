---
title: AI Visibility — Generative Search Audit Implementation
created: 2026-06-12
updated: 2026-06-12
type: implementation
tags:
  - ltc
  - website
  - seo
  - ai
  - analytics
  - middleware
sticker: lucide//scan-eye
color: "linear-gradient(45deg, #f59e0b 0%, #fbbf24 50%, #fcd34d 100%)"
---

# AI Visibility — Generative Search Audit Implementation

> Implementation tracker for the [[Work/LTC/website/ai-visibility-audit|AI Visibility Audit]] on frank-lucido-site.
> Repo: `/Users/flucido/projects/frank-lucido-site/`
> Active branch: `geo_updates`
> Hub: [[Work/LTC/website/_index|Website Project Hub]]

## Status Overview

| Priority | Item | Status | Branch / Notes |
|---|---|---|---|
| 🔴 P1 | Edge Middleware (bot detection) | 🟡 Code written | `geo_updates` — NOT merged to main |
| 🟠 P2 | Google Search Console + Alerts | ⬛ Not started | Needs GSC verification + Google/Talkwalker alerts |
| 🟡 P3 | Persist Bot Logs (KV or Axiom) | ⬛ Not started | Vercel KV or Log Drain → Axiom free tier |
| 🟡 P4 | Admin Dashboard `/admin/bot-stats` | ⬛ Not started | Query KV for bot traffic breakdown |
| 🟡 P5 | Weekly AI Brand Audit | ⬛ Not started | Cron job: query ChatGPT/Claude/Perplexity/Gemini |
| 🟢 P6 | Competitive AI Citation Check | ⬛ Not started | ZipTie.dev + Semrush + Ahrefs |

## Priority 1 — Edge Middleware (Current State)

**File:** `src/middleware.ts` (committed: `d07e7cc`)
**Branch:** `geo_updates` (pushed to origin)
**What it does:** Detects 13 AI bot UAs + 5 SEO crawler UAs, logs to `console.log`, sets `X-Bot-Detected` and `X-Bot-Category` response headers.

**Remaining work:**
- [ ] Merge `geo_updates` → `main`
- [ ] Deploy to Vercel (auto-deploys from main)
- [ ] Verify: `curl -H "User-Agent: ChatGPT-User/1.0" https://lucidotechnologyconsulting.com/` then `vercel logs --follow | grep '\[BOT\]'`

## Priority 2 — Google Search Console + Alerts

- [ ] Verify GSC property ownership for lucidotechnologyconsulting.com
- [ ] Set up Google Alerts: `"Frank Lucido"`, `"Lucido Technology Consulting"`
- [ ] Set up Talkwalker Alerts (free) as backup

## Priority 3 — Persist Bot Logs

**Option A — Vercel Log Drain → Axiom:**
- [ ] Create Axiom account (free tier: 500K events/month)
- [ ] Add Log Drain in Vercel dashboard → Axiom
- [ ] Build Axiom dashboard for bot traffic

**Option B — Vercel KV (in-code):**
- [ ] Enable Vercel KV (free tier: 256MB)
- [ ] Upgrade middleware to `await kv.lpush('bot-hits', logEntry)`

## Priority 4 — Admin Dashboard

- [ ] Create hidden route at `/admin/bot-stats` (in Payload admin or standalone)
- [ ] Query KV or Axiom for daily/weekly bot counts by bot name
- [ ] Display table + sparkline of bot traffic

## Priority 5 — Weekly AI Brand Audit

- [ ] Write prompt template for branded queries across ChatGPT, Claude, Perplexity, Gemini
- [ ] Create cron job to run weekly
- [ ] Log results to vault for trend tracking

## Priority 6 — Competitive Citation Check

- [ ] Sign up for ZipTie.dev (free beta)
- [ ] Sign up for Semrush free trial (AI Overview tracking)
- [ ] Sign up for Ahrefs Webmaster Tools (free backlink monitoring)
- [ ] Run first competitive audit

## Quick Commands

```bash
# Switch to the middleware branch
cd /Users/flucido/projects/frank-lucido-site
git checkout geo_updates

# Dev server
pnpm dev

# Test bot detection
curl -H "User-Agent: ChatGPT-User/1.0" http://localhost:3001/
# Check server console for: [BOT] ai-crawler/ChatGPT-User → /
```

## Verification Checklist (from audit)

- [ ] `src/middleware.ts` created and deployed ← 🟡 code written, not deployed
- [ ] `vercel logs --follow` shows `[BOT]` entries on AI UA requests
- [ ] Google Search Console property verified
- [ ] Google Alerts configured for brand keywords
- [ ] Talkwalker Alerts configured as backup
- [ ] Weekly AI brand audit routine scheduled (recurring task)
- [ ] First bot traffic report generated (baseline established)
