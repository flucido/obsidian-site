---
title: Roadmap — frank-lucido-site
created: 2026-06-10
updated: 2026-06-10
type: reference
tags:
  - ltc
  - web-dev
  - timeline
  - reference
sources:
  - .planning/STATE.md
  - .planning/ROADMAP.md
  - .sisyphus/plans/content-strategy.md
---

# Roadmap

> Current phase, completed work, upcoming plans for frank-lucido-site.

## Current Phase: 01-landing-page-update

**Status:** In Progress (3 plans, 7 tasks completed as of 2026-03-21)

### Plan 01 — Navigation Cleanup + Hero Section
- **File:** `.planning/phases/01-landing-page-update/01-01-PLAN.md`
- **Summary:** Removed global navigation and distracting footer links; rewrote Hero with high-urgency Local-First AI proposition
- **Status:** Complete

### Plan 02 — Core Content Sections
- **File:** `.planning/phases/01-landing-page-update/01-02-PLAN.md`
- **Summary:** Built Problem Agitation, Solution Architecture, Authority, FAQ (accordion) sections
- **Status:** Complete

### Plan 03 — Interactive TCO Calculator
- **File:** `.planning/phases/01-landing-page-update/01-03-PLAN.md`
- **Summary:** Interactive TCO Calculator lead magnet + contact form
- **Status:** Complete

## Recent Work (Post-Phase 01)

| Commit | Description |
|--------|-------------|
| `f34a458` | Install Payload CMS v3 with Neon Postgres adapter |
| `84751de` | Add Users and Media collections |
| `c53f6ac` | Add all content collections (Pages, Blog, Testimonials, Case Studies) |
| `1962a31` | Fix code quality review for content collections |
| `390b056` | Add SiteSettings global |
| `e30219e` | Add seed script with all existing content |
| `f5ff4d1` | Add Payload client and content fetch helpers |
| `2f17978` | Fix critical quality issues in seed script and client helpers |
| `198c8fd` | Fix Payload migration build issues |
| `f488480` | Fix — await payload seed script |
| `820f7ec` | Hide testimonials section pending real testimonials |

## Pending / Future Work

### Content Strategy
- **Sisyphus plan:** `.sisyphus/plans/content-strategy.md`
- **Notepads:** `.sisyphus/notepads/content-strategy/` (decisions, issues, learnings, problems)
- Blog content pipeline needs to be activated
- LinkedIn cross-posting automation (generateLinkedInDraft hook)

### Design System
- Current design (Bloomberg-dashboard) is live
- `STYLE_GUIDE.md` is stale — needs update or removal
- Testimonials section: re-enable when real testimonials are collected

### Testing
- Playwright E2E tests exist for `pages/` and `seo/`
- `tests/analytics/` is empty — needs specs
- No unit test framework configured

### CMS
- Outstatic CMS at `/outstatic` — evaluate vs Payload for blog content
- Payload admin UI custom components may need import map regeneration after changes

## Conductor Tracks

Active tracks at `conductor/tracks/`:
- `landing_page_enhancement_20260321/` — Completed, archived copy at `conductor/archive/`

Reference docs at `conductor/` in the project repo:
- `conductor/product-guidelines.md` — Product positioning
- `conductor/tech-stack.md` — Tech stack documentation
- `conductor/workflow.md` — Development workflow
