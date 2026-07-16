---
title: Runbook — frank-lucido-site
created: 2026-06-10
updated: 2026-06-10
type: reference
tags:
  - ltc
  - web-dev
  - sop
  - reference
sources:
  - AGENTS.md
  - package.json
---

# Runbook

> Common dev commands, troubleshooting, and gotchas for frank-lucido-site.

## Commands

```bash
pnpm dev                # next dev (Turbopack) — port 3000, falls back to 3001
pnpm build              # next build
pnpm start              # next start
pnpm lint               # eslint (eslint-config-next core-web-vitals + typescript)
pnpm test:e2e           # playwright — auto-starts dev server on PLAYWRIGHT_PORT (default 3101)
pnpm test:e2e:ui        # playwright --ui
pnpm generate:types     # payload generate:types → src/payload-types.ts
pnpm payload generate:importmap  # regenerate admin UI import map
pnpm run seed           # pnpm exec payload run src/seed/seed.ts (requires DATABASE_URL)
```

No `typecheck` script — use `tsc --noEmit`. Lint and typecheck run separately.

## After Editing CMS Schema

```bash
pnpm generate:types && pnpm payload generate:importmap
pnpm dev                # restart
```

This must be done after any change to `src/collections/` or `src/payload.config.ts`.

## Gotchas (High-Signal)

### 1. Port 3000 Often Occupied
`next dev` falls back to 3001. Check `server.log` or try `http://localhost:3001` first.

### 2. Payload REST Handlers
Handlers in `src/app/(payload)/api/[...slug]/route.ts` must call `REST_GET(config)`, not just re-export. Wrong pattern silently breaks admin.

### 3. Tailwind `rounded-full` Bug
Outputs `border-radius: 3.35544e+07px`. Fixed via `!important` override in `globals.css`. Do not remove.

### 4. CSS Variable Collision
`next/font` and Tailwind `@theme inline` collide. Fonts wired through `--font-dm-sans` / `--font-jetbrains` in `(site)/layout.tsx`. Do not redefine.

### 5. `next.config.ts` Dependencies
- `serverExternalPackages: ['esbuild', 'esbuild-register', 'drizzle-kit']`
- `images: { unoptimized: true }`
- `experimental.optimizeCss: true`
- `.md`/`.mdx` in `pageExtensions`

Don't remove without verifying Payload + MDX still build.

### 6. Route Group Isolation
Three route groups each ship their own `<html>`. Never move layouts between them.

### 7. Testimonials Disabled
`src/app/(site)/page.tsx` has commented-out Testimonials import + data prep. Re-enable only after real testimonials are collected.

### 8. Do Not Hand-Edit `(payload)/layout.tsx`
Has "GENERATED AUTOMATICALLY" header. Edits will be lost.

### 9. Do Not Call `getPayload` Directly
Use `src/lib/fetchContent.ts` helpers instead. They handle null `DATABASE_URL` gracefully.

## Troubleshooting Flow

### Site Won't Start
```bash
# Check port
lsof -i :3000
lsof -i :3001

# Check env
cat .env.local | grep DATABASE_URL

# Check build errors
pnpm build 2>&1 | head -50
```

### Payload Admin Blank/Errors
```bash
# Regenerate types and import map
pnpm generate:types && pnpm payload generate:importmap
# Verify REST handler pattern in route.ts
grep "REST_GET" src/app/\(payload\)/api/\[...slug\]/route.ts
# Should show: export const GET = REST_GET(config)
```

### Styles Broken
- Check that `--font-dm-sans` / `--font-jetbrains` are not redefined
- Verify the `rounded-full` override is still in `globals.css` line 73-75
- Check that Tailwind v4 `@theme inline` block is intact

### Build Fails in CI
- Verify `DATABASE_URL`, `PAYLOAD_SECRET`, `ADMIN_PASSWORD` are set
- Check `next.config.ts` for missing `serverExternalPackages`
