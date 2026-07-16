---
title: Architecture — frank-lucido-site
created: 2026-06-10
updated: 2026-06-10
type: reference
tags:
  - ltc
  - web-dev
  - architecture
  - reference
sources:
  - AGENTS.md
  - src/app/globals.css
---

# Architecture

> Route groups, CMS architecture, data flow, and component tree for the frank-lucido-site.

## Route Groups (3 isolated `<html>` groups)

Each group ships its own `<html>` to prevent React nested-`<html>` hydration errors. **Do not move layouts across groups.**

### 1. `(site)` — Public Marketing Site
- **Layout:** `src/app/(site)/layout.tsx` — Loads DM_Sans + JetBrains_Mono via `next/font/google`, wraps in `<SiteShell>`
- **Routes:** `/` (homepage), blog routes
- **Fonts:** Wired via `--font-dm-sans` / `--font-jetbrains` CSS vars → consumed in `globals.css`

### 2. `(payload)` — Payload CMS
- **Layout:** `src/app/(payload)/layout.tsx` — Auto-generated. **Do not hand-edit.**
- **Admin:** `/admin`
- **API:** `/api/*`
- **REST handlers:** `src/app/(payload)/api/[...slug]/route.ts` — MUST be function calls that receive config: `export const GET = REST_GET(config)`. Importing bare `REST_GET` and re-exporting silently breaks the admin panel.

### 3. `(cms)` — Outstatic CMS
- **Layout:** `src/app/(cms)/layout.tsx` — Minimal `<html suppressHydrationWarning>`
- **Route:** `/outstatic`
- **Backend:** Git-backed (no database)

### Root Layout
- **File:** `src/app/layout.tsx`
- **Role:** Minimal pass-through (`return children` only). Do not add `<html>` or `<body>` here.

## CMS Architecture — Three Things Coexist

```
┌─────────────────────────────────────────────────────┐
│                  frank-lucido-site                    │
├─────────────────┬─────────────────┬─────────────────┤
│   Payload CMS   │  Outstatic CMS  │   MDX Files     │
│  (Postgres)     │  (Git-backed)   │  (Static)       │
│                 │                 │                 │
│  /admin         │  /outstatic     │  src/content/   │
│  /api/*         │                 │  blog/*.mdx     │
│                 │                 │                 │
│  Collections:   │  Collections:   │                 │
│  Pages, Blog,   │  (collections.  │                 │
│  Testimonials,  │   json)         │                 │
│  CaseStudies,   │                 │                 │
│  Users, Media   │                 │                 │
├─────────────────┴─────────────────┴─────────────────┤
│              src/lib/fetchContent.ts                  │
│         All Payload reads go through here             │
│         (cache()-wrapped, DATABASE_URL guard)         │
└─────────────────────────────────────────────────────┘
```

## Data Flow — Server-Side Fetchers

All Payload data reads **must** go through `src/lib/fetchContent.ts`:
- Every call returns `null`/`[]` when `DATABASE_URL` is missing → graceful degradation
- Functions are wrapped in React `cache()` for deduplication
- **Do not call `getPayload({ config })` directly from pages/components**

## Component Tree (Homepage)

```
src/app/(site)/page.tsx
├── Hero
├── ProblemAgitation
├── SolutionArchitecture
├── Authority
├── FAQ (accordion)
├── TCOCalculator (interactive)
├── ContactForm
└── [Testimonials] ← COMMENTED OUT — disabled pending real testimonials
```

## Key Files

| File | Role |
|------|------|
| `src/payload.config.ts` | Payload CMS config — collections, globals, plugins |
| `src/lib/fetchContent.ts` | Server-side data fetchers (cache-guarded) |
| `src/lib/email.ts` | Contact form email via Resend (logs + mock if unset) |
| `src/globals/SiteSettings.ts` | Site-wide settings (global) |
| `src/collections/` | Payload collection definitions |
| `next.config.ts` | serverExternalPackages, images.unoptimized, experimental.optimizeCss |

## Path Aliases (`tsconfig.json`)

| Alias | Resolves To |
|-------|-------------|
| `@/*` | `./src/*` |
| `@payload-config` | `./src/payload.config.ts` |

Use `@/components/...`, `@/lib/...`, etc. in all imports.
