# Navigation Component Patterns

## Emotional Intent: Predictability
**Evidence:** T1-001 (P2 timing), T1-007 (Processing Fluency), Principle 1 (Sensory Safety)
**Target PAD:** { pleasure: 1.5, arousal: -0.3, dominance: 1.0 }
**Rationale:** Navigation is the user's mental map of the system. If the map is unstable, the user cannot explore safely.

## Core Rules
1. Navigation position must be consistent across all pages in a session
2. Maximum 7 navigation items (supports 9-17 element constraint)
3. Active state must be visually unambiguous
4. No hidden navigation that reveals on hover only (must be visible or clearly indicated)
5. Mobile navigation must not require more than 2 taps to reach any destination

## Component Specifications

### Primary Navigation (Desktop)
```html
<nav role="navigation" aria-label="Primary">
  <ul class="nav-primary">
    <li><a href="/" class="nav-item nav-item--active" aria-current="page">Home</a></li>
    <li><a href="/about" class="nav-item">About</a></li>
    <li><a href="/services" class="nav-item">Services</a></li>
    <li><a href="/resources" class="nav-item">Resources</a></li>
    <li><a href="/contact" class="nav-item">Contact</a></li>
  </ul>
</nav>
```

**Token usage:**
- Background: `background-primary`
- Text: `text-primary` (active), `text-secondary` (inactive)
- Active indicator: `accent-primary` left border, 3px
- Item gap: `space-3` (12px)
- Padding: `space-4` (16px) vertical, `space-5` (24px) horizontal

### Primary Navigation (Mobile)
```html
<nav role="navigation" aria-label="Primary">
  <button class="nav-toggle" aria-expanded="false" aria-controls="mobile-menu">
    <span class="nav-toggle__label">Menu</span>
    <span class="nav-toggle__icon" aria-hidden="true">☰</span>
  </button>
  <ul id="mobile-menu" class="nav-mobile" hidden>
    <li><a href="/" class="nav-item nav-item--active" aria-current="page">Home</a></li>
    <li><a href="/about" class="nav-item">About</a></li>
    <li><a href="/services" class="nav-item">Services</a></li>
    <li><a href="/resources" class="nav-item">Resources</a></li>
    <li><a href="/contact" class="nav-item">Contact</a></li>
  </ul>
</nav>
```

**Token usage:**
- Toggle button: `text-primary` with `border-medium`
- Menu background: `background-secondary`
- Item gap: `space-4` (16px)
- Full-width items with `space-5` (24px) padding

### Breadcrumb Navigation
```html
<nav role="navigation" aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li><a href="/">Home</a></li>
    <li><a href="/services">Services</a></li>
    <li aria-current="page">Individual Therapy</li>
  </ol>
</nav>
```

**Token usage:**
- Text: `text-tertiary` (links), `text-secondary` (current)
- Separator: `/` with `space-2` (8px) gap
- Font: `text-sm`

## Critique Checklist
- [ ] Navigation position is consistent across all pages?
- [ ] 7 or fewer items?
- [ ] Active state is visually unambiguous?
- [ ] Mobile nav reachable in 2 taps or fewer?
- [ ] No hover-only reveal patterns?
