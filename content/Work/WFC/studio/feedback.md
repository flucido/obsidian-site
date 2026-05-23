# Feedback Component Patterns

## Emotional Intent: Calm Confirmation
**Evidence:** T1-006 (EEG bands — Alpha states), Principle 5 (Bi-Directional Care), Principle 4 (Emotional Calibration)
**Target PAD:** { pleasure: 2.0, arousal: -0.3, dominance: 0.8 }
**Rationale:** Feedback should confirm, not startle. High-sensitivity users are easily overwhelmed by aggressive system responses.

## Core Rules
1. Feedback duration respects P2/LPP windows (150-400ms for appearance, 250-400ms for dismissal)
2. Success feedback is calm and proportional (no confetti for form submission)
3. Error feedback is specific, actionable, and non-blaming
4. Loading states show progress, not infinite spinners
5. System state is always visible (saving, processing, complete)

## Component Specifications

### Success Toast
```html
<div class="toast toast--success" role="status" aria-live="polite">
  <span class="toast__icon" aria-hidden="true">✓</span>
  <span class="toast__message">Your message has been sent. We'll respond within 24 hours.</span>
  <button class="toast__dismiss" aria-label="Dismiss notification">×</button>
</div>
```

**Token usage:**
- Background: `success` with 10% opacity on `background-primary`
- Border: `success`, 1px left
- Text: `text-primary`
- Duration: `normal` (250ms) entrance, auto-dismiss after 5 seconds
- Position: bottom-right (not top, which blocks content)

### Error Inline
```html
<div class="form-error" role="alert">
  <span class="form-error__icon" aria-hidden="true">!</span>
  <span class="form-error__message">We couldn't process your payment. Please check your card details and try again.</span>
  <a href="/help/payment" class="form-error__help">Get help with payment</a>
</div>
```

**Token usage:**
- Background: `error` with 8% opacity
- Border: `error`, 1px left
- Text: `text-primary`
- Help link: `accent-primary`
- No animation — appears in place (no surprise motion)

### Loading State
```html
<div class="loading" role="status" aria-live="polite">
  <div class="loading__spinner" aria-hidden="true"></div>
  <span class="loading__message">Saving your progress...</span>
  <span class="loading__estimate">This will take a moment</span>
</div>
```

**Token usage:**
- Spinner: `accent-primary`, slow rotation (2s per rotation, not fast)
- Text: `text-secondary`, `text-sm`
- Estimate: `text-tertiary`, `text-xs`
- No fullscreen overlay — loading should not block the entire view

## Critique Checklist
- [ ] Feedback duration within 150-400ms range?
- [ ] Success feedback is calm (no aggressive celebration)?
- [ ] Error messages are specific and include a help path?
- [ ] Loading states show progress estimate?
- [ ] System state always visible?
- [ ] No fullscreen blocking overlays?
