# WellFull Collective — Design System

Design tokens live in `src/design-tokens/` and are consumed via CSS custom properties (defined in `src/app/globals.css`) and Tailwind config aliases (`tailwind.config.ts`). Components reference tokens exclusively through Tailwind classes — never raw hex values.

---

## Colors

Active palette: **Deep Umber + Sage**

| Token | Class | Hex | Usage |
|---|---|---|---|
| `surface.base` | `bg-surface-base` | `#ead5c8` | Page background (warm terracotta) |
| `surface.alt` | `bg-surface-alt` | `#f2e4db` | Lighter warm tint — section contrast, scope-boundary lists |
| `surface.card` | `bg-surface-card` | `#dae8df` | Sage green — article and card backgrounds throughout |
| `text.primary` | `text-text-primary` | `#2e3d4a` | Dark slate — headings, high-emphasis body |
| `text.secondary` | `text-text-secondary` | `#5e7282` | Muted slate — supporting copy, labels |
| `action.primary` | `bg-action-primary` / `text-action-primary` | `#5a3e2e` | Dark espresso — primary CTA buttons, inverted highlight pills, trust signal list items |
| `action.hover` | `bg-action-hover` | `#483224` | Deeper umber — hover state for `action.primary` |
| `action.secondary` | `bg-action-secondary` | `#e8dad5` | Warm oat — secondary button background |
| `accent.warm` | `bg-accent-warm` | `#c49088` | Rose gold/blush — portrait placeholders, pricing panel, decorative accents |
| `border.subtle` | `border-border-subtle` | `#c8b8aa` | Warm taupe — card and section borders |
| `focus.ring` | `ring-focus-ring` | `#483224` | Keyboard focus indicator (matches `action.hover`) |
| `status.success` | `text-status-success` | `#4a6e64` | Muted teal green |
| `status.error` | `text-status-error` | `#a84238` | Muted brick red |

### Highlight pill pattern

Emphasis list items (trust signals, scope boundaries, design principles) use an inverted style:

```tsx
<li className="rounded-2xl bg-action-primary px-4 py-3 text-sm text-white">
  ...
</li>
```

### Accent panel pattern

Feature sub-cards (pricing anchor, portrait placeholder backing) use `accent.warm`:

```tsx
<div className="rounded-[1.75rem] bg-accent-warm p-6 shadow-soft">
  <p className="text-white/70 ...">Label</p>
  ...
</div>
```

---

## Typography

| Token | Value | Usage |
|---|---|---|
| `displayScale.hero` | `clamp(2.75rem, 8vw, 5.5rem)` | Page hero `<h1>` |
| `displayScale.feature` | `clamp(2.25rem, 6vw, 4rem)` | Feature section headings |
| `headingScale.h2` | `clamp(1.75rem, 4vw, 2.75rem)` | Section headings via `SectionHeading` |
| `headingScale.h3` | `clamp(1.375rem, 3vw, 1.875rem)` | Card titles |
| `bodyScale.lg` | `1.125rem` | Lead / intro paragraphs |
| `bodyScale.base` | `1rem` | Standard body copy |
| `lineHeights.body` | `1.65` | Generous — supports anxious or activated readers scanning on mobile |
| `maxReadingWidth` | `75ch` | Applied to `p`, `ul`, `ol` globally |

**Fonts:**
- **Display** — Cormorant Garamond (serif) via `--font-display`; headings, hero titles
- **Body** — Atkinson Hyperlegible (sans) via `--font-body`; all body copy, labels, UI

Label style (eyebrows, metadata, tags):
```tsx
<p className="text-sm font-normal uppercase tracking-[0.24em] text-text-secondary">
  Eyebrow label
</p>
```

---

## Spacing

Based on a 4px grid. Section vertical rhythm uses Tailwind directly (`py-12 sm:py-16`).

| Token | rem | px |
|---|---|---|
| `1` | `0.25rem` | 4px |
| `2` | `0.5rem` | 8px |
| `3` | `0.75rem` | 12px |
| `4` | `1rem` | 16px |
| `6` | `1.5rem` | 24px |
| `8` | `2rem` | 32px |
| `12` | `3rem` | 48px |
| `16` | `4rem` | 64px |
| `20` | `5rem` | 80px |

---

## Border Radius

All radii are generous — supports a calm, approachable feel.

| Token | Class | Value | Usage |
|---|---|---|---|
| `sm` | `rounded-sm` | `0.75rem` | Inputs, small inline elements |
| `md` | `rounded-md` | `1rem` | Small cards, compact list items (`rounded-[1rem]`) |
| `lg` | `rounded-lg` | `1.5rem` | Standard card containers (`rounded-[1.5rem]`) |
| `xl` | `rounded-xl` | `2rem` | Hero/feature cards, section wrappers (`rounded-[2rem]`) |
| `pill` | `rounded-pill` | `999px` | Fully rounded tags, badge spans |

> Note: components use Tailwind arbitrary values like `rounded-[1.75rem]` for intermediate sizes.

---

## Shadows

Shadow color is low-opacity cool slate in both cases — depth without harshness.

| Token | Class | Usage |
|---|---|---|
| `soft` | `shadow-soft` | Default card elevation — articles, list items, team bios |
| `lifted` | `shadow-lifted` | Elevated — hero wrappers, featured containers, hover states |

---

## Motion

All transitions respect `prefers-reduced-motion` (collapses durations to `0ms` globally via the `@media` block in `globals.css`).

| Token | Value | Usage |
|---|---|---|
| `duration.instant` | `120ms` | Focus rings, active/pressed states |
| `duration.gentle` | `300ms` | Hover transitions, card lifts |
| `duration.slow` | `400ms` | Larger layout or page-level transitions |
| `easing.standard` | `cubic-bezier(0.22, 1, 0.36, 1)` | Smooth deceleration — unhurried, intentional |

Tailwind aliases: `duration-calm`, `ease-calm` (mapped to `gentle` / `standard`).

---

## Component Patterns

### Standard card
```tsx
<article className="rounded-[1.75rem] border border-border-subtle bg-surface-card p-6 shadow-soft">
  ...
</article>
```

### Hero feature card (large)
```tsx
<div className="rounded-[2rem] border border-border-subtle bg-surface-card p-6 shadow-lifted sm:p-8 lg:p-12">
  ...
</div>
```

### Mock portrait placeholder
Used in `TeamBio` until real photos are available. Renders initials over a subtle SVG pattern on `accent.warm` background:
```tsx
<div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-[1.25rem] bg-accent-warm">
  {/* SVG pattern overlay */}
  <span className="relative z-10 text-3xl font-semibold tracking-tight text-white">LO</span>
</div>
```

### Section heading (eyebrow + title + description)
```tsx
<SectionHeading
  eyebrow="Short label"
  title="Main heading text"
  description="Supporting paragraph."
/>
```

---

## CSS Custom Properties

All tokens are also available as CSS variables (defined in `src/app/globals.css `:root`):

```css
--color-surface-base: #ead5c8;
--color-surface-alt:  #f2e4db;
--color-surface-card: #dae8df;
--color-text-primary: #2e3d4a;
--color-text-secondary: #5e7282;
--color-action-primary: #5a3e2e;
--color-action-hover:   #483224;
--color-action-secondary: #e8dad5;
--color-accent-warm:  #c49088;
--color-border-subtle: #c8b8aa;
--color-focus-ring:   #483224;
--color-status-success: #4a6e64;
--color-status-error:   #a84238;
```

To swap the entire palette, replace the `:root` block in `globals.css`. See the palette options commented at the top of that file.
