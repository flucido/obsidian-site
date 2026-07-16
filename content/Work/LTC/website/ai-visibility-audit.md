---
title: AI Visibility Tracking & Measurement Audit
created: 2026-06-11
updated: 2026-06-11
type: audit
tags: [ltc, website, seo, ai, analytics, audit]
source: frank-lucido-site repo audit
---

# AI Visibility Tracking & Measurement Baseline Audit

**Date:** 2026-06-11
**Scope:** frank-lucido-site — AI visibility lens (Share of Voice, Citations, Bot Traffic, Off-Page)
**Repo:** `/Users/flucido/projects/frank-lucido-site`
**Status:** All 4 capabilities FAIL. Only basic Vercel Analytics pageview tracking present.

---

## Assessment Matrix

| Capability | Status | Evidence |
|---|---|---|
| Share of Voice / AI Mention Rate | 🔴 FAIL | No tools, no code |
| Citation Tracking & Competitive Rank | 🔴 FAIL | No tools, no code |
| Bot Traffic Analysis (AI UAs) | 🔴 FAIL | No Cloudflare, no middleware, no UA logging |
| Off-Page Mentions | 🔴 FAIL | No tools, no alerts |
| Basic Pageview Analytics | 🟢 PASS | `@vercel/analytics` integrated in `SiteShell.tsx` |

---

## 1. Share of Voice / Mention Rate — FAIL

**Finding:** Zero instrumentation to detect when "Frank Lucido" / "Lucido Technology Consulting" appears in AI responses, search results, or social platforms.

- No Brand24, Mention, Talkwalker, or Google Alerts configured
- No `package.json` dependencies for monitoring

---

## 2. Citation Tracking & Competitive Rank — FAIL

**Finding:** No tracking of which URLs AI models cite or where the brand ranks vs competitors.

- No Semrush, Ahrefs, ZipTie.dev, or Profound setup
- No competitive benchmarking code
- No SERP position tracking

---

## 3. Bot Traffic Analysis — FAIL

**Finding:** No detection of AI bot user agents. Only `@vercel/analytics` for anonymous pageviews.

**Files checked:**
- `vercel.json` — 3-line build config only (no headers, rewrites, edge config)
- `next.config.ts` — MDX + image config only
- No `middleware.ts` exists anywhere
- No Cloudflare integration (lockfile refs are transitive deps)
- `robots.ts` — `userAgent: '*'` allows all crawlers
- `SiteShell.tsx` — only `<Analytics />` component

**Detected AI bot UAs would include:** GPTBot, ChatGPT-User, OAI-SearchBot, Claude-Web, ClaudeBot, Google-Gemini, PerplexityBot, Meta-AI, MistralBot, Cohere

---

## 4. Off-Page Mentions — FAIL

**Finding:** Zero tooling for third-party reviews, editorial citations, or brand mentions.

- No backlink monitoring
- No PR/media tracking
- Google Search Console status unknown (needs verification)

---

## What's Possible with Existing Vercel Infrastructure

The site runs on Vercel free tier with Next.js 16. Edge Middleware runs on every request:

| Capability | Free Tier Limit | Feasibility |
|---|---|---|
| Edge Middleware | 1M invocations/month | ✅ More than enough |
| Vercel Analytics | Included | ✅ Already using |
| Vercel KV | 256 MB free | ✅ Can store bot hit logs |
| Log Drains (Axiom free) | 500K events/month | ✅ Structured bot analytics |

---

## Priority-Ranked Action Items

### 🔴 Priority 1: Edge Middleware for AI Bot Detection (30 min, $0)

Create `src/middleware.ts` to detect and log every AI bot visit. Code provided below.

### 🟠 Priority 2: Google Search Console + Alerts (35 min, $0)

- Set up Google Search Console (verify ownership)
- Google Alerts for `"Frank Lucido"` and `"Lucido Technology Consulting"`
- Talkwalker Alerts as backup

### 🟡 Priority 3: Persist Bot Logs (1 hr, $0)

- Vercel Log Drain → Axiom (free tier) for structured bot analytics
- Or upgrade middleware to write to Vercel KV

### 🟡 Priority 4: Admin Dashboard for Bot Stats (2 hrs, $0)

- Build `/admin/bot-stats` querying KV for daily/weekly bot traffic breakdown

### 🟡 Priority 5: Weekly Manual AI Brand Audit (30 min/wk, $0)

- Query ChatGPT, Claude, Perplexity, Gemini with branded prompts
- Log results to track brand presence over time

### 🟢 Priority 6: Competitive AI Citation Check (1 hr/mo, $0-129)

- Try ZipTie.dev (free beta) for AI citation tracking
- Semrush trial for AI Overview tracking
- Ahrefs Webmaster Tools (free) for backlink monitoring

---

## Implementation: Edge Middleware Code

Create `src/middleware.ts`:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ── AI Bot User-Agent Signatures ──────────────────────────────────────
const AI_BOT_PATTERNS: Record<string, RegExp> = {
  'GPTBot':           /GPTBot/i,
  'ChatGPT-User':     /ChatGPT-User/i,
  'OAI-SearchBot':    /OAI-SearchBot/i,
  'Claude-Web':       /Claude-Web|ClaudeBot|anthropic-ai/i,
  'ClaudeBot':        /ClaudeBot/i,
  'Gemini':           /Google-Gemini|Gemini/i,
  'Google-Extended':  /Google-Extended/i,
  'PerplexityBot':    /PerplexityBot/i,
  'Meta-AI':          /meta-externalagent|FacebookBot.*AI/i,
  'Cohere':           /cohere-ai/i,
  'Mistral':          /MistralBot/i,
  'Amazonbot':        /Amazonbot/i,
  'AI-Bot':           /\bAI[-\s]?Bot\b/i,
};

const SEO_BOT_PATTERNS: Record<string, RegExp> = {
  'Googlebot':    /Googlebot/i,
  'Bingbot':      /Bingbot/i,
  'DuckDuckBot':  /DuckDuckBot/i,
  'Slurp':        /Slurp/i,
  'Baiduspider':  /Baiduspider/i,
};

function classifyBot(userAgent: string): {
  isAI: boolean;
  isSEO: boolean;
  botName: string | null;
} {
  for (const [name, pattern] of Object.entries(AI_BOT_PATTERNS)) {
    if (pattern.test(userAgent)) return { isAI: true, isSEO: false, botName: name };
  }
  for (const [name, pattern] of Object.entries(SEO_BOT_PATTERNS)) {
    if (pattern.test(userAgent)) return { isAI: true, isSEO: true, botName: name };
  }
  return { isAI: false, isSEO: false, botName: null };
}

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') ?? '';
  const { isAI, isSEO, botName } = classifyBot(userAgent);

  // Early-exit for humans, admin, and static assets (no perf impact)
  const isPayloadAdmin = request.nextUrl.pathname.startsWith('/admin');
  const isStaticAsset = request.nextUrl.pathname.match(
    /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot)$/i
  );

  if (!isAI || isPayloadAdmin || isStaticAsset) {
    return NextResponse.next();
  }

  // ── Log AI bot visit ────────────────────────────────────────────────
  const logEntry = {
    timestamp: new Date().toISOString(),
    bot: botName ?? 'unknown',
    category: isSEO ? 'seo-crawler' : 'ai-crawler',
    path: request.nextUrl.pathname,
    userAgent: userAgent.slice(0, 256),
    method: request.method,
    ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown',
  };

  console.log(`[BOT] ${logEntry.category}/${logEntry.bot} → ${logEntry.path}`);

  const response = NextResponse.next();
  response.headers.set('X-Bot-Detected', botName ?? 'unknown');
  response.headers.set('X-Bot-Category', isSEO ? 'seo' : 'ai');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

**To verify after deploy:**
```bash
curl -H "User-Agent: ChatGPT-User/1.0" https://lucidotechnologyconsulting.com/
# Then check: vercel logs --follow | grep '\[BOT\]'
```

---

## Recommended Free Tools

| Tool | Purpose | Cost |
|---|---|---|
| Google Alerts | Brand mention email alerts | Free |
| Talkwalker Alerts | Web + social mention monitoring | Free |
| Google Search Console | Query/click/impression tracking | Free |
| Ahrefs Webmaster Tools | Backlink monitoring | Free |
| ZipTie.dev | AI citation tracking (beta) | Free |
| Axiom | Structured log drain (bot analytics) | Free tier |
| Vercel KV | Persistent bot hit storage | Free tier (256MB) |

---

## Verification Checklist

- [ ] `src/middleware.ts` created and deployed
- [ ] `vercel logs --follow` shows `[BOT]` entries on AI UA requests
- [ ] Google Search Console property verified
- [ ] Google Alerts configured for brand keywords
- [ ] Talkwalker Alerts configured as backup
- [ ] Weekly AI brand audit routine scheduled (recurring task)
- [ ] First bot traffic report generated (baseline established)
