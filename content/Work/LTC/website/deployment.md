---
title: Deployment — frank-lucido-site
created: 2026-06-10
updated: 2026-06-10
type: reference
tags:
  - ltc
  - web-dev
  - devops
  - reference
sources:
  - AGENTS.md
  - .env.local
---

# Deployment

> Vercel deployment, environment variables, secrets, and build configuration for frank-lucido-site.

## Hosting

- **Platform:** Vercel
- **Domain:** lucidotechnologyconsulting.com
- **Framework:** Next.js 16 (App Router)
- **Build:** `pnpm build` → `next build`

## Environment Variables

### Required

| Var | Purpose | How to Generate |
|-----|---------|----------------|
| `DATABASE_URL` | Neon Postgres connection string | From Neon dashboard |
| `PAYLOAD_SECRET` | JWT secret for Payload CMS | `openssl rand -base64 32` |
| `ADMIN_PASSWORD` | Password for `admin@frank-lucido.com` | Choose a strong password |

### Optional

| Var | Purpose | Behavior if Unset |
|-----|---------|-------------------|
| `RESEND_API_KEY` | Contact form email delivery | Logs + returns mock ID |
| `OBSIDIAN_VAULT_PATH` | Path to local Obsidian vault | Content tools unavailable |

### Secret Management

- `.env.local` is gitignored but was previously committed in some prior commits
- **Do not commit new secrets**
- For Vercel, set all env vars in the Vercel dashboard (Settings → Environment Variables)

## Build Configuration (`next.config.ts`)

```ts
// Critical settings — do not remove without verifying
serverExternalPackages: ['esbuild', 'esbuild-register', 'drizzle-kit']
images: { unoptimized: true }
experimental: { optimizeCss: true }
pageExtensions: ['ts', 'tsx', 'md', 'mdx']
```

- `serverExternalPackages` — Required for Payload CMS runtime
- `images.unoptimized` — No Next.js image optimization proxy
- `experimental.optimizeCss` — Tailwind v4 CSS optimization
- `pageExtensions` — Enables MDX pages alongside TSX

## Post-Deploy Verification

After deploy:
1. Hit `https://lucidotechnologyconsulting.com` — homepage loads
2. Hit `https://lucidotechnologyconsulting.com/admin` — Payload admin login appears
3. Hit `https://lucidotechnologyconsulting.com/api/pages` — REST API responds (may require auth)
4. Check `/outstatic` — Outstatic CMS loads
5. Run `pnpm test:e2e` locally against production or preview URL

## Preview Deployments

Vercel auto-deploys preview URLs for every PR. Set env vars in Vercel dashboard for preview environments too, or use `vercel env pull` locally.

## Database Migrations

Payload CMS manages its own schema in Postgres. On first deploy with a fresh database:
1. Set `DATABASE_URL` in Vercel
2. Deploy — Payload auto-creates tables on first admin access
3. Run seed: `pnpm run seed` (requires `DATABASE_URL` and `PAYLOAD_SECRET`)

## Rollback

Vercel provides instant rollback to any previous deployment. Use the Vercel dashboard or:
```bash
vercel rollback
```
