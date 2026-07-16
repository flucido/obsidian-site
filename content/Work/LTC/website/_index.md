---
title: Frank Lucido Website — Project Hub
created: 2026-06-10
updated: 2026-06-10
type: index
tags:
  - ltc
  - web-dev
  - index
  - dashboard
  - reference
sticker: lucide//globe
color: var(--mk-color-amber)
---

# Frank Lucido Website — Project Hub

> Public marketing site + Payload CMS admin + Outstatic CMS for Lucido Technology Consulting.
> Repo: `/Users/flucido/projects/frank-lucido-site/`
> Deployed: Vercel (lucidotechnologyconsulting.com)
> Stack: Next.js 16 · React 19 · TypeScript 5 · Tailwind v4 · Payload CMS 3 · Neon Postgres

## Quick Links

- [[Work/LTC/website/architecture|Architecture]] — Route groups, CMS layout, data flow
- [[Work/LTC/website/design-system|Design System]] — Tokens, palette, typography, shadows
- [[Work/LTC/website/cms-guide|CMS Guide]] — Payload + Outstatic + MDX workflows
- [[Work/LTC/website/runbook|Runbook]] — Dev commands, troubleshooting, gotchas
- [[Work/LTC/website/content-pipeline|Content Pipeline]] — Blog workflow, LinkedIn cross-posting
- [[Work/LTC/website/deployment|Deployment]] — Vercel, env vars, build, secrets
- [[Work/LTC/website/roadmap|Roadmap]] — Current phase, upcoming work, .planning/ links
- [[Work/LTC/website/ai-visibility-middleware|AI Visibility Audit]] — Generative search audit implementation tracker
- [[Work/LTC/website/ai-visibility-audit|AI Visibility Audit (Baseline)]] — Original audit findings

## Repo Map

| Directory | Purpose |
|-----------|---------|
| `src/app/(site)/` | Public marketing site (DM Sans + JetBrains Mono) |
| `src/app/(payload)/` | Payload CMS admin + REST API |
| `src/app/(cms)/` | Outstatic CMS at `/outstatic` |
| `src/collections/` | Payload collections (Pages, Blog, Testimonials, CaseStudies, Users, Media) |
| `src/globals/` | Payload globals (SiteSettings) |
| `src/lib/` | Shared utilities (fetchContent, email) |
| `src/components/` | React components + JsonLd |
| `src/content/blog/` | MDX blog posts |
| `src/seed/` | Database seed script |
| `conductor/` | Project guidelines, tracks, workflow |
| `.planning/` | Phase plans, STATE.md, ROADMAP.md |
| `.sisyphus/` | Plan runner state + content strategy notepads |
| `tests/` | Playwright E2E (pages/, seo/, analytics/) |

## Current Status

- **Phase:** 01-landing-page-update (3 plans, 7 tasks completed)
- **Last deploy:** `820f7ec` — hide testimonials section
- **Recent work:** Payload CMS v3 installed with Neon Postgres, content collections built, seed script, SiteSettings global
- **Testimonials:** Intentionally disabled — commented out in `src/app/(site)/page.tsx`
- **Content strategy:** Sisyphus notepads at `.sisyphus/notepads/content-strategy/`

## Design Snapshot

Bloomberg-dashboard aesthetic:
- Canvas: `#080d14` (near-black)
- Panels: `#ede8d4` (cream)
- Accent: `#f59e0b` (amber)
- Radius: 0px on cards (sharp)
- Fonts: DM Sans (body/display), JetBrains Mono (nav/labels)

See [[Work/LTC/website/design-system|Design System]] for full token reference.
