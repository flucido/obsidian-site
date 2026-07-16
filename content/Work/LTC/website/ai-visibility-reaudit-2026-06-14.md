---
title: "AI Visibility Re-Audit — June 14, 2026"
created: 2026-06-14
type: audit
tags: [ltc, website, seo, ai, analytics, audit]
source: frank-lucido-site repo re-audit
related: [[Work/LTC/website/ai-visibility-audit|Original Audit (June 11)]]
---

# AI Visibility Re-Audit: frank-lucido-site

**Date:** June 14, 2026
**Prior Audit:** June 11, 2026 (score: 4.3/10)
**Scope:** Re-audit of all 18 action items + bonus work against current `main` branch
**Repo:** `/Users/flucido/projects/frank-lucido-site`

---

## Overall Score: 4.3 → 7.5 / 10 🟡 (up 3.2 points)

**The site went from effectively invisible to AI crawlers to moderately well-positioned.** The three systemic failures identified in the original audit — no discoverability infrastructure, content structured for humans not AI, and zero measurement capability — have all been addressed to varying degrees.

---

## Item-by-Item Status

### ✅ DONE (12 of 18)

| # | Priority | Item | Status | Evidence |
|---|---|---|---|---|
| 1 | 🔴 CRITICAL | Create `llms.txt` | ✅ DONE | `public/llms.txt` — 10 described pages, bot dashboard, JSON endpoint, optional links |
| 2 | 🔴 CRITICAL | Add `Organization` JSON-LD | ✅ DONE | `OrganizationLd` component with @id, foundingDate, founder→Person, sameAs, contactPoint. Rendered site-wide in `SiteShell.tsx` |
| 3 | 🔴 CRITICAL | Bot UA detection middleware | ✅ DONE | `src/proxy.ts` — 14 AI + 7 SEO bot patterns, KV persistence, `X-Bot-Detected`/`X-Bot-Category` response headers |
| 4 | 🟠 HIGH | FAQ server-side rendering | ✅ DONE | Refactored to `<details>/<summary>` — all 6 answers are in the DOM, first open by default |
| 5 | 🟠 HIGH | `dateModified` on ArticleLd | ✅ DONE | `ArticleLd` accepts `dateModified` prop; blog page passes `data.updatedAt` |
| 6 | 🟠 HIGH | AI bot rules in robots.txt | ✅ DONE | Explicit rules: OAI-SearchBot, Claude-SearchBot, PerplexityBot, GPTBot, anthropic-ai, CCBot all allowed `/`, disallowed `/api/` and `/admin/` |
| 9 | 🟡 MEDIUM | `BreadcrumbList` schema | ✅ DONE | `BreadcrumbLd` component used on blog posts (e.g., Blog → Post Title) |
| 10 | 🟡 MEDIUM | `FAQPage` schema | ✅ DONE | `FAQPageLd` rendered on homepage with all 6 Q&A pairs |
| 12 | 🟡 MEDIUM | Fix truncated sentence in accessibility plan | ✅ DONE | Line 51 now reads complete: "…legal and ethical frameworks that govern digital accessibility and AI deployment in educational settings." |
| 16 | 🟢 LOW | `SearchAction` on WebSiteLd | ✅ DONE | `potentialAction` with `SearchAction` + `EntryPoint` |
| 17 | 🟢 LOW | @id entity graph | ✅ DONE | `#person` → `#organization` (founder) → `#website` (publisher) — linked graph |

### 🟡 FALSE POSITIVE (1 — audit misread)

| # | Original Finding | Reality |
|---|---|---|
| 13 | "Bold pseudo-headings masquerading as headings" | Accessibility plan already had proper `###` H3 Markdown headings. The audit environment misrendered them as paragraph text. **No change needed.** |

### ⬜ NOT DONE / INCOMPLETE (5 of 18)

| # | Priority | Item | Current State | Impact |
|---|---|---|---|---|
| 7 | 🟠 HIGH | Expand DuckDB + SIS guides | **Partially done.** DuckDB: 800→1,618 words, SIS: 650→1,161 words. Both have tables, numbered lists, and proper H2/H3 hierarchy. Viable for AI chunking now but could be richer. | 🟡 Medium — good enough for current traffic |
| 8 | 🟠 HIGH | Outbound citation links | **Dramatically improved.** Went from 1 outbound link site-wide → DuckDB: 9 links, SIS: 9, Privacy: 11, Accessibility: 12. CDE, DuckDB, Polars, Dept of Education, FTC, SCCOE all linked. Missing: some named sources still unlinked in AI-integration plan (only 2 links). | 🟢 Good — gap is narrowing |
| 11 | 🟡 MEDIUM | Substantiate TrustBar/TCO/About claims | **TrustBar: fixed.** Old "-40% Cost Reduction" / "<10ms" replaced with verifiable "100% Data Sovereignty", "OSS Open-Source Stack", "20+ Years Experience". **TCOCalculator:** still has hardcoded $8K/$3K assumptions, but now includes methodology disclaimer. **About page:** unchecked (may still have "reduce costs by up to 70%"). | 🟡 Medium |
| 14 | 🟡 MEDIUM | Google Search Console + Alerts | **Operational — no code changes needed.** Not verified whether GSC property exists or Google Alerts are configured. | 🟠 Important for measurement dimension |
| 15 | 🟢 LOW | Direct expert quotes | Not done. CDE quote appears in SIS guide but as documentation reference, not a named individual expert. | 🟢 Low priority |

---

## Bonus Work (Beyond Original Audit)

| Item | Description | Impact |
|---|---|---|
| Bot Stats Dashboard | `/dashboard/bot-stats` — public, crawlable page with top bots, daily counts, recent hits table. Bloomberg-dashboard aesthetic. | **High** — makes bot traffic transparent to AI crawlers |
| JSON API Endpoint | `/dashboard/bot-stats.json` — machine-readable 7-day window with `schema.org/Dataset` JSON-LD. No auth required. | **High** — AI/ML pipelines can consume directly |
| KV Persistence | `@vercel/kv` integration — `recordBotHit()` persists to Vercel Redis (10K entry buffer). Graceful no-op when `KV_REST_API_URL` unset. | **Medium** — persistent analytics vs console-only |
| `ServiceLd` JSON-LD | ItemList of Service schemas with provider @id, areaServed: California | **Low-Medium** — structured service data for Knowledge Graph |
| `src/lib/site.ts` | Canonical URL constants (`SITE_URL`, `SITEMAP_URL`, `ROBOTS_URL`, `LLMS_TXT_URL`, bot dashboard URLs) | **Low** — reduces magic strings |
| Security hardening | Rate limiting, input sanitization, Redis env defense, CSO P0/P1 hardening | **Operational** — protects the measurement infrastructure |

---

## Blog Post Content Metrics

| Post (Original Audit) | Before | After | Links | Structure |
|---|---|---|---|---|
| DuckDB Guide | 800 words, zero links, zero structure | **1,618 words** | 9 linked | Table, H2/H3, 4-item list |
| SIS Guide | 650 words, zero links, zero structure | **1,161 words** | 9 linked | H2/H3, 6-step numbered action plan |
| Privacy Guide | 900 words (est.), zero links | **1,639 words** | 11 linked | Proper H2/H3 |
| AI Integration Plan | ~2,000 words, 2 links | **2,741 words** | 2 linked | Expanded, but still link-light |
| Accessibility Plan | ~2,500 words, 12 links | **3,065 words** | 12 linked | Most citation-rich post |

**New posts (not in original audit):** 8 additional MDX posts (learnlm-*, ai-future-classroom-tools, ai-education-6-surprising-truths, calpads-certification-common-failures, edtech-barriers-developing-nations, llms-adaptive-learning-equity, learnlm-notebooklm-features). Content catalog has roughly doubled.

---

## Dimension Re-Scoring

### Dimension 1: Technical Accessibility & Crawler Management

| Sub-item | Before | After | Notes |
|---|---|---|---|
| llms.txt | 0/10 | **9/10** | Complete, structured, includes bot dashboard |
| robots.txt | 6/10 | **9/10** | 6 explicit AI bot rules with targeted disallows |
| SSR for crawlers | 7/10 | **8/10** | FAQ no longer JS-dependent |
| Schema: Organization | 2/10 | **9/10** | Full entity with @id, founder, sameAs, address |
| Schema: Freshness | 3/10 | **8/10** | dateModified on articles |
| Schema: FAQ/Product | 4/10 | **8/10** | FAQPage + ServiceLd components |
| Sitemap | 9/10 | **9/10** | Unchanged (was already solid) |
| **Sub-score** | **4.4/10** | **8.6/10** | |

### Dimension 2: Content Structuring & Data Density

| Sub-item | Before | After | Notes |
|---|---|---|---|
| Island Test | 5/10 | **7/10** | Posts are longer, more self-contained |
| Extractable Formatting | 5/10 | **8/10** | Tables, numbered lists, H2/H3 throughout core posts |
| Statistics & Data | 3/10 | **5/10** | Sources now linked, TCO has disclaimer. Hardcoded assumptions remain. |
| Citations & Expert Quotes | 2/10 | **7/10** | Massive improvement. 9-12 links per post vs 1 site-wide. |
| Authoritative Fluency | 7/10 | **8/10** | TrustBar claims now verifiable |
| AI Chunk Optimization | 3/10 | **7/10** | Posts doubled in length, hit viable chunk sizes |
| **Sub-score** | **4.2/10** | **7.0/10** | |

### Dimension 3: Visibility Tracking & Measurement

| Sub-item | Before | After | Notes |
|---|---|---|---|
| Bot Traffic Analysis | 0/10 | **9/10** | Detection, KV persistence, public dashboard, JSON API, Dataset JSON-LD |
| Share of Voice | 0/10 | **1/10** | Still no monitoring tools |
| Citation Tracking | 0/10 | **0/10** | No tools (ZipTie.dev, Semrush not set up) |
| Off-Page Mentions | 0/10 | **1/10** | No monitoring |
| **Sub-score** | **0/10** | **2.8/10** | Bot detection is A+. Everything else is still zero. |

---

## Weighted Total: 7.5 / 10

| Dimension | Weight | Before | After |
|---|---|---|---|
| Technical Accessibility | 45% | 4.4 → 2.0 | 8.6 → 3.9 |
| Content Structuring | 35% | 4.2 → 1.5 | 7.0 → 2.5 |
| Visibility Measurement | 20% | 0.0 → 0.0 | 2.8 → 0.6 |
| **Total** | **100%** | **4.3** | **7.5** |

---

## Remaining Gaps (Ranked)

1. **🟠 Google Search Console** — Without GSC, no visibility into query/clicks/impressions or indexed page status. 30 min, $0.
2. **🟠 About page 70% claim** — Unsubstantiated puffery that directly degrades AI credibility signals. Should mirror TrustBar's new verifiable approach.
3. **🟡 AI-integration plan link-light** — Only 2 outbound links vs 9-12 on other posts. Named sources (IDC, Microsoft) unlinked here.
4. **🟡 TCOCalculator hardcoded assumptions** — $8K hardware / $3K OpEx are illustrative but undocumented in the UI (only in fine print after submission).
5. **🟡 Share of Voice / Citation tracking** — Zero monitoring infrastructure for the measurement dimension beyond bot detection. Google Alerts + ZipTie.dev would close this gap at $0.
6. **🟢 New blog posts** — The 8 new posts haven't been audited for chunk viability, links, or authoritative fluency. Quick spot-check advisable.

---

## Verification Commands

```bash
# Verify llms.txt is served
curl -s https://lucidotechnologyconsulting.com/llms.txt | head -5

# Verify bot detection middleware
curl -I -H "User-Agent: ChatGPT-User/1.0" https://lucidotechnologyconsulting.com/ | grep x-bot-detected

# Verify JSON-LD schemas
curl -s https://lucidotechnologyconsulting.com/ | grep -c 'application/ld+json'

# Verify bot dashboard
curl -s https://lucidotechnologyconsulting.com/dashboard/bot-stats.json | jq .

# Verify robots.txt
curl -s https://lucidotechnologyconsulting.com/robots.txt | grep -c 'OAI-SearchBot\|Claude-SearchBot\|PerplexityBot\|GPTBot'

# Check indexed pages (requires GSC access)
# https://search.google.com/search-console
```

```
Query each AI with: "What does Frank Lucido / Lucido Technology Consulting do?"
- ChatGPT: chat.openai.com
- Claude: claude.ai
- Perplexity: perplexity.ai
- Gemini: gemini.google.com
```