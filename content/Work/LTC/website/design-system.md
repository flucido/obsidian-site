---
title: Design System — frank-lucido-site
created: 2026-06-10
updated: 2026-06-10
type: reference
tags:
  - ltc
  - web-dev
  - design-system
  - reference
sources:
  - src/app/globals.css
---

# Design System

> Bloomberg-dashboard aesthetic. Dark canvas, cream panels, amber accent, zero-radius cards.
> **Source of truth:** `src/app/globals.css` under `@theme inline`. `STYLE_GUIDE.md` is stale — ignore it.

## Palette

### Canvas & Surfaces (Dark)

| Token | Hex | CSS Variable |
|-------|-----|-------------|
| Background | `#080d14` | `--background` |
| Surface | `#080d14` | `--color-surface` |
| Surface Container Low | `#0e1520` | `--color-surface-container-low` |
| Surface Container | `#131b26` | `--color-surface-container` |
| Surface Container Highest | `#1a2535` | `--color-surface-container-highest` |

### Panels (Cream)

| Token | Hex | CSS Variable |
|-------|-----|-------------|
| Panel | `#ede8d4` | `--color-panel` |
| Panel Dim | `#e4dcc8` | `--color-panel-dim` |
| Panel Border | `rgba(10,14,23,0.12)` | `--color-panel-border` |

### Accent (Amber)

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#f59e0b` | Buttons, links, highlights |
| Primary Dark | `#d97706` | Hover states |
| Amber Label | `#b45309` | Labels on cream panels |
| Amber 400 | `#fbbf24` | Lighter accent variant |

### Semantic

| Token | Hex | Usage |
|-------|-----|-------|
| Secondary | `#06b6d4` | Legacy alias |
| Tertiary | `#a3e635` | Legacy alias |

## Typography

| Token | Font | Usage |
|-------|------|-------|
| `--font-sans` | DM Sans | Body text |
| `--font-mono` | JetBrains Mono | Navigation, labels, code |
| `--font-display` | DM Sans | Headings |
| `--font-serif` | DM Sans | (unused, mapped to DM Sans) |

**Font loading:** `next/font/google` in `(site)/layout.tsx` → CSS variables `--font-dm-sans` / `--font-jetbrains` → consumed in `globals.css`. **Do not redefine these CSS vars elsewhere.**

## Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| On Surface | `#ede8d4` | Text on dark canvas |
| On Panel | `#0a0e17` | Text on cream panels |
| On Surface Muted | `rgba(237,232,212,0.55)` | Secondary text on dark |
| On Panel Muted | `rgba(10,14,23,0.45)` | Secondary text on cream |

## Borders & Outlines

| Token | Value |
|-------|-------|
| Outline | `rgba(245,158,11,0.2)` |
| Outline Variant | `rgba(237,232,212,0.08)` |
| Panel Border | `rgba(10,14,23,0.12)` |

## Shadows

```css
/* Primary card shadow — amber edge glow + depth */
--shadow-clay: 0 0 0 1px rgba(245,158,11,0.12), 0 8px 32px rgba(0,0,0,0.55);
--shadow-clay-hover: 0 0 0 1px rgba(245,158,11,0.28), 0 4px 16px rgba(0,0,0,0.4);
--shadow-clay-inner: inset 0 0 0 1px rgba(245,158,11,0.15);
--shadow-card: var(--shadow-clay);
--shadow-card-hover: var(--shadow-clay-hover);
```

## Radius

| Token | Value | Notes |
|-------|-------|-------|
| Card | `0px` | Sharp panels — no rounding |
| Card LG | `0px` | Same |
| Pill | `2px` | Minimal rounding for pills |

## Known Issues

### `rounded-full` Bug (Tailwind v4)
Tailwind v4 outputs `border-radius: 3.35544e+07px` for `rounded-full`. A global override in `globals.css` pins it to `9999px !important`. **Do not remove that line.**

### CSS Variable Collision
`next/font` and Tailwind v4 `@theme inline` can collide on CSS variable names. The font variables are wired through `--font-dm-sans` / `--font-jetbrains` in `(site)/layout.tsx` and consumed via `var(--font-*)` tokens in `globals.css`. Do not redefine these vars elsewhere.

## Usage in Components

```tsx
// Dark canvas background
<div className="bg-surface text-on-surface">

// Cream panel card
<div className="bg-panel text-on-panel shadow-card rounded-card">

// Amber accent button
<button className="bg-primary text-on-panel hover:bg-primary-dark">

// Muted text
<span className="text-on-surface-muted">

// Amber outline border
<div className="border border-outline">
```
