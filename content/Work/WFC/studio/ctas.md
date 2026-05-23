# CTA Component Patterns

## Emotional Intent: Dominance Preservation
**Evidence:** T1-003 (PAD Dominance), T1-008 (Revisability gaps), Principle 2 (Dominance Through Revisability)
**Target PAD:** { pleasure: 1.8, arousal: 0.3, dominance: 1.4 }
**Rationale:** CTAs should invite action, not demand it. High-sensitivity users need to feel they are choosing, not being pushed.

## Core Rules
1. Never use urgency language ("Act now!", "Only 2 left!", countdown timers)
2. Always show what happens after clicking (destination or outcome)
3. Primary CTA text describes the action, not the business goal ("Start your journey" not "Submit")
4. Secondary actions are always visible and clearly labeled
5. No dark patterns: no hidden opt-ins, no pre-checked boxes, no disguised ads

## Component Specifications

### Primary CTA
```html
<button type="submit" class="btn btn--primary">
  <span class="btn__text">Book a free consultation</span>
  <span class="btn__description">No commitment, 15 minutes</span>
</button>
```

**Token usage:**
- Background: `accent-primary`
- Hover: `accent-hover`
- Focus: `accent-focus` with focus ring
- Padding: `space-4` horizontal, `space-2` vertical
- Text: `#F0EDE8` (near-white on accent, does not violate pure-white prohibition), `text-base` weight 500
- Description: `text-sm`, 80% opacity
- Border radius: 6px (soft, not sharp)

### Secondary CTA
```html
<button type="button" class="btn btn--secondary">
  <span class="btn__text">Learn more about our approach</span>
</button>
```

**Token usage:**
- Background: transparent
- Border: `border-medium`, 1px
- Text: `text-primary`
- Hover: `background-secondary`
- Same padding as primary

### Tertiary CTA (Text Link)
```html
<a href="/faq" class="btn btn--text">
  <span class="btn__text">Read our FAQ</span>
</a>
```

**Token usage:**
- No background, no border
- Text: `accent-primary`
- Hover: `accent-hover` with underline
- Underline always visible (not hover-only)

## Prohibited Patterns
- Countdown timers or urgency indicators
- Pre-checked consent boxes
- "No thanks, I don't want help" (guilt-trip decline text)
- CTAs that look like secondary actions (reverse psychology)
- Hidden or hard-to-find cancel/decline options
- Pop-up CTAs that block content without user initiation

## Critique Checklist
- [ ] No urgency language or timers?
- [ ] CTA text describes user action, not business goal?
- [ ] Secondary/exit action clearly visible?
- [ ] No dark patterns (hidden opt-ins, guilt-trip text)?
- [ ] Outcome of clicking CTA is clear?
