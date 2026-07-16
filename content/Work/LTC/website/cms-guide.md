---
title: CMS Guide — frank-lucido-site
created: 2026-06-10
updated: 2026-06-10
type: reference
tags:
  - ltc
  - web-dev
  - cms
  - reference
sources:
  - AGENTS.md
  - src/payload.config.ts
---

# CMS Guide

> Working with Payload CMS, Outstatic CMS, and MDX content in frank-lucido-site.

## Payload CMS (Primary — Postgres-backed)

### Admin & API
- **Admin panel:** `/admin`
- **REST API:** `/api/*`
- **Database:** Neon Postgres (requires `DATABASE_URL`)

### Collections (`src/collections/`)
| Collection | File | Notes |
|-----------|------|-------|
| Pages | `Pages.ts` | Landing page content |
| Blog | `Blog.ts` | Rich-text posts with draft→publish hook |
| Testimonials | `Testimonials.ts` | Currently unused (section disabled) |
| CaseStudies | `CaseStudies.ts` | Portfolio/evidence |
| Users | `Users.ts` | Admin auth |
| Media | `Media.ts` | Image/file uploads |

### Globals (`src/globals/`)
| Global | File | Notes |
|--------|------|-------|
| SiteSettings | `SiteSettings.ts` | Site-wide configuration |

### After Editing Collections or Payload Config

```bash
pnpm generate:types && pnpm payload generate:importmap
```

Then restart `pnpm dev`. The import map fix resolves custom admin UI components; types fix typed accessors (e.g., `page.hero`).

### Blog Publish Hook

The `Blog` collection has a draft → publish hook that fires `src/utilities/generateLinkedInDraft.ts`. It's fire-and-forget — do not block publish on it.

### Reading Payload Data

**Always** use the helpers in `src/lib/fetchContent.ts`:
- Functions are `cache()`-wrapped
- Return `null`/`[]` when `DATABASE_URL` is unset
- **Do not call `getPayload({ config })` directly** from pages or components

### REST API Handlers — Critical Rule

`src/app/(payload)/api/[...slug]/route.ts` handlers **MUST** be function calls that receive config:
```ts
export const GET = REST_GET(config)   // ✓ Correct
```
Importing bare `REST_GET` and re-exporting silently breaks the admin panel:
```ts
export { REST_GET as GET }           // ✗ Broken
```

## Outstatic CMS (Git-backed)

- **Route:** `/outstatic`
- **Backend:** Git (no database)
- **Schema:** `src/content/collections.json`
- **Layout:** `src/app/(cms)/layout.tsx` — minimal `<html suppressHydrationWarning>`

Outstatic is used for blog content that doesn't need the full Payload CMS.

## MDX Files (Static)

- **Location:** `src/content/blog/*.mdx`
- **Processing:** `@next/mdx` + `next-mdx-remote`
- **Config:** `next.config.ts` adds `.md`/`.mdx` to `pageExtensions`

MDX files are rendered as static pages alongside CMS-managed blog posts.

## Seed Script

```bash
pnpm run seed    # pnpm exec payload run src/seed/seed.ts (requires DATABASE_URL)
```

Seeds the admin user (`admin@frank-lucido.com`) and existing content.

## Env Vars Required

| Var | Purpose |
|-----|---------|
| `DATABASE_URL` | Neon Postgres connection string |
| `PAYLOAD_SECRET` | JWT secret (`openssl rand -base64 32`) |
| `ADMIN_PASSWORD` | Password for `admin@frank-lucido.com` |

Without `DATABASE_URL`, all Payload reads return `null` — the site degrades gracefully.
