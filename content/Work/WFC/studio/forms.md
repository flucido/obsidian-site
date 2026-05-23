# Form Component Patterns

## Emotional Intent: Revisability
**Evidence:** T1-008 (Revisability gaps), T1-003 (PAD Dominance), Principle 2 (Dominance Through Revisability)
**Target PAD:** { pleasure: 1.2, arousal: -0.2, dominance: 1.3 }
**Rationale:** Forms are commitment devices. High-sensitivity users experience anxiety around irreversible actions. Every form must support draft, preview, undo, and return.

## Core Rules
1. No form submits without a preview or confirmation step
2. All form data persists across page navigation (draft state)
3. Every field has a clear label (never placeholder-only labels)
4. Error messages are specific, actionable, and non-judgmental
5. Maximum 5 fields per form page (progressive disclosure for longer forms)

## Component Specifications

### Text Input
```html
<div class="form-field">
  <label for="email" class="form-label">Email address</label>
  <span class="form-hint" id="email-hint">We'll never share your email</span>
  <input
    type="email"
    id="email"
    name="email"
    class="form-input"
    aria-describedby="email-hint"
    autocomplete="email"
    required
  >
  <div class="form-error" role="alert" hidden>
    <span class="form-error__icon" aria-hidden="true">!</span>
    <span class="form-error__message">Please enter a valid email address</span>
  </div>
</div>
```

**Token usage:**
- Input padding: `space-3` (12px)
- Input border: `border-subtle` (default), `border-medium` (focus)
- Focus ring: `accent-focus`, 2px, 2px offset
- Label: `text-primary`, `text-sm`, weight 500
- Hint: `text-tertiary`, `text-sm`
- Error: `error` color, `text-sm`
- Field gap: `space-4` (16px)

### Multi-Step Form Container
```html
<form class="form-multi-step" data-current-step="1" data-total-steps="3">
  <div class="form-progress" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="3">
    <div class="form-progress__bar" style="width: 33%"></div>
    <span class="form-progress__label">Step 1 of 3</span>
  </div>

  <fieldset class="form-step" data-step="1">
    <legend class="form-step__title">Your information</legend>
    <!-- fields -->
  </fieldset>

  <div class="form-actions">
    <button type="button" class="btn btn--secondary" disabled>Previous</button>
    <button type="button" class="btn btn--primary">Next: Review</button>
  </div>

  <div class="form-draft-notice">
    <span>Your progress is saved automatically. You can return later.</span>
    <button type="button" class="btn btn--text">Save and exit</button>
  </div>
</form>
```

**Token usage:**
- Progress bar: `accent-primary` fill, `background-secondary` track
- Step gap: `space-6` (32px)
- Action gap: `space-4` (16px) between buttons
- Draft notice: `background-secondary`, `space-4` padding, `text-secondary`

## Critique Checklist
- [ ] Preview or confirmation step before submission?
- [ ] Draft state persists across navigation?
- [ ] All fields have visible labels?
- [ ] Error messages are specific and non-judgmental?
- [ ] 5 or fewer fields per form page?
- [ ] Progress indicator for multi-step forms?
- [ ] Save and exit option available?
