---
title: Web-Based Deliverable Mechanism — Research + Decision
created: 2026-07-15
type: infrastructure-research
status: research-phase
owner: Frank
goal: simple, web-based way to present client deliverables (mockups, design systems, reports) without emailing documents back and forth
constraint: NOT for sale; just for client-facing deliverable hosting
tags: [wfc, infrastructure, web-deliverables, cloudflare, vercel, hosting, design]
related:
  - "[[leads/wfc-susan-allen/mockups/README]]"
  - "[[leads/wfc-susan-allen/mockups/SUSAN-FEEDBACK-SUMMARY]]"
---

# Web-Based Deliverable Mechanism — Research + Decision

> **Frank's question (2026-07-15):** "A way on the web to be able to stand up and give people things that are web-based. I don't have to email back and forth documents that are visual. I don't really want to do it for sale. I'm wondering if it's as simple as standing up just a Cloudflare worker page with this kind of information."
>
> **Reusable infrastructure** — applies to all WFC client work, not Susan-specific. Susan's 3 mockups will be the first deployment.

## Requirements (Frank's actual needs, not what I think is best)

1. **Web-based delivery** — clients see deliverables in a browser, not as PDF attachments
2. **No email back-and-forth** — single URL per client/project, all deliverables in one place
3. **Visual content** — mockups, screenshots, design systems, annotations
4. **NOT for sale** — this is a working tool for client engagement, not a SaaS product
5. **Reusable** — same pattern across all WFC clients (Susan, North Bridge Academy, future)
6. **Custom domain** ideally (lucido.studio or similar) so URLs are professional

## Candidate platforms (with research notes)

### Cloudflare Pages (static site)

**What:** Static site hosting on Cloudflare's global CDN. Free tier is generous. Pull from a Git repo, build, deploy.

**Pros:**
- Free tier: unlimited static sites, unlimited bandwidth
- Custom domain support (free)
- HTTPS automatic
- Fast global CDN
- Git-based deploys (familiar workflow)
- Cloudflare ecosystem (Workers if we need serverless later)

**Cons:**
- No server-side code on Pages itself (need Workers for that)
- Free tier has reasonable limits but no SLA

**Frank's instinct ("Cloudflare worker page") is close to this** — Workers are for dynamic code; Pages is for static sites. For mockups + design system displays, Pages is the right fit.

### Cloudflare Workers (serverless functions)

**What:** Serverless functions on Cloudflare's edge network. Free tier: 100K requests/day.

**Pros:**
- Dynamic content possible
- Edge-fast (low latency globally)
- Free tier generous
- Cloudflare ecosystem

**Cons:**
- Overkill for static mockup delivery
- More complex than Pages
- No static file hosting by default (need Workers Static Assets for that)

**Verdict:** Not needed for this use case. Stick with Pages.

### Vercel (Next.js / static)

**What:** Hosting platform for Next.js / static sites. Free tier for personal projects.

**Pros:**
- Free tier for personal projects
- Fast deploys from Git
- Custom domain support
- Great DX (developer experience)
- Built-in preview deployments per branch
- Excellent for Next.js if we go that route

**Cons:**
- Free tier is for personal/non-commercial — commercial use requires payment
- Vendor lock-in to Vercel's build/deploy model

### Netlify

**What:** Hosting platform. Free tier.

**Pros:**
- Free tier for personal projects
- Git-based deploys
- Custom domain support
- Form handling built-in
- Good DX

**Cons:**
- Free tier for personal/non-commercial
- Less performant than Cloudflare's edge for static sites

### GitHub Pages

**What:** Static site hosting on GitHub. Free for public repos.

**Pros:**
- Completely free for public repos
- Git-based deploys
- Custom domain support
- Simple

**Cons:**
- Public only (or GitHub Pro for private)
- Slower CDN than Cloudflare
- No preview deployments per branch (without Actions setup)

### Notion public page

**What:** Notion page made public.

**Pros:**
- Zero code
- Easy to update

**Cons:**
- Limited design control
- Notion branding
- Not a "real" web presence

### Self-hosted on existing VM

**What:** Run a small static site server (nginx / caddy) on the Hermes VM (100.82.161.32).

**Pros:**
- Full control
- No external dependencies
- Already have infrastructure (Nginx, Cloudflare tunnel possible)

**Cons:**
- Need to maintain the server
- Need to set up deployment pipeline
- Less "professional" URL (tailscale IP, not custom domain)
- Self-managed certificates

## Decision matrix (Frank's actual criteria)

| Criterion | Cloudflare Pages | Vercel | Netlify | GitHub Pages | Self-hosted |
|-----------|-----------------|--------|---------|--------------|-------------|
| Free for commercial use | ✅ | ❌ (paid) | ❌ (paid) | ⚠️ (public only) | ✅ (just infra cost) |
| Custom domain | ✅ Free | ✅ Free | ✅ Free | ✅ Free | ✅ (need to set up) |
| Fast / global CDN | ✅ Edge | ✅ Edge | ⚠️ Decent | ❌ Slower | ⚠️ (depends) |
| Git-based deploys | ✅ | ✅ | ✅ | ✅ | ⚠️ (need setup) |
| Preview deployments | ⚠️ (via branches + Pages) | ✅ Excellent | ✅ Good | ❌ (need Actions) | ❌ |
| Maintenance burden | ✅ Zero | ✅ Zero | ✅ Zero | ✅ Zero | ❌ Ongoing |
| Already have account | ⚠️ Need to set up | ⚠️ | ⚠️ | ✅ (GitHub) | ✅ (VM) |
| Custom HTML/CSS/JS | ✅ | ✅ | ✅ | ✅ | ✅ |

## Recommendation: Cloudflare Pages

**Why:**
1. Free for commercial use (Frank's hard requirement)
2. Edge CDN = fast globally
3. Git-based deploys match the rest of the workspace workflow
4. Cloudflare ecosystem (Pages + Workers + R2 if needed) — can grow
5. No maintenance burden
6. Custom domain support on free tier

**Why not the others:**
- Vercel/Netlify: free tier is personal/non-commercial — Frank wants to use this for clients
- GitHub Pages: requires public repos, slower CDN
- Self-hosted: ongoing maintenance + URL issues
- Notion: not a real web presence

## Plan

### Phase 1 (this week)
- [ ] Set up `Work/WFC/studio/web-deliverables/site/` with a minimal HTML+CSS template
- [ ] Create reusable layout: WFC header, client/project nav, mockup embed slot, notes/annotations panel
- [ ] First deployment: Susan's 3 mockups at `susan.lucido.studio` (or similar)
- [ ] Test that it works end-to-end (URL resolves, mockups render, navigation works)

### Phase 2 (next week)
- [ ] Add client-side interactivity: tabbed mockup views, side-by-side compare
- [ ] Add notes/annotations layer: hover for design rationale, click for detailed critique
- [ ] Document the deployment process so it can be repeated

### Phase 3 (later)
- [ ] Decide on custom domain (lucido.studio? wellfull.co? something else?)
- [ ] Consider client-side authentication (Cloudflare Access) for draft reviews vs. public delivery
- [ ] Template the layout for re-use across all WFC clients

## Reusable layout (sketch)

```
┌─────────────────────────────────────────────────┐
│ [WFC] lucido.studio / susan-allen              │  ← WFC header
├─────────────────────────────────────────────────┤
│ Susan Allen, LMFT — Template Exploration         │  ← Project title
│ Three approaches. Pick by 7/18.                 │  ← Project subtitle
├─────────────────────────────────────────────────┤
│ [T1: Clove] [T2: Jenani] [T3: Clune]            │  ← Tab nav
├─────────────────────────────────────────────────┤
│                                                 │
│         [Active mockup embed]                   │  ← Iframe or static render
│                                                 │
│         e.g. Clove structure + Susan's content  │
│         + WFC Calm Base palette                  │
│         + HIPAA-aware footer                    │
│                                                 │
├─────────────────────────────────────────────────┤
│ Design notes for this template:                 │  ← Annotations panel
│ - WFC audit gate 1-6 results                   │
│ - Token layer applied                            │
│ - Content swaps made                             │
│ - Open questions for Susan                       │
└─────────────────────────────────────────────────┘
```

## Open questions for Frank

- [ ] Custom domain: lucido.studio? wellfull.co? lucidotech.com? (or just use cloudflare pages default)
- [ ] Auth model: public URLs (simple) vs. Cloudflare Access (per-client)?
- [ ] Iframe embed vs. screenshot + link? (Iframe lets the mockup be interactive)
- [ ] Build tool: plain HTML (simplest) vs. 11ty/Astro (more features, slight complexity)?

## Cost

- Cloudflare Pages: **$0/mo** (free tier)
- Cloudflare Workers: **$0/mo** (free tier 100K req/day)
- Custom domain: **~$10-15/yr** (registrar cost)
- Total ongoing: **~$10-15/yr** + the time to set it up

## Open question for Frank

**Should I set this up this week, or is this a "decide this week, build next week" thing?** The Susan mockups are the natural first deployment, but they don't strictly need it (the HTML files work fine locally + via file://). The web deliverable mechanism is a strategic investment for all WFC client work.

---

*Compiled by Mavis 2026-07-15. Owner: Frank. Decision pending: Cloudflare Pages confirmed as recommendation; specific deployment timing TBD with Frank.*
