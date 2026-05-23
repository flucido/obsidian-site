---
title: LTC Invoice Template
created: 2026-05-19
updated: 2026-05-19
type: template
tags: [ltc, finance, invoice, template]
---

# LTC Invoice Template

> Invoices generated per milestone schedule (Net-30 terms for districts).
> All invoices are DRAFTS until human review.

---

## Invoice Workflow

1. **Trigger:** Milestone delivered + accepted OR monthly retainer cycle
2. **Generate:** Populate from this template with PO reference
3. **Review:** Human reviews
4. **Send:** Human sends to district AP contact (requires PO #)
5. **Track:** Record in [[Work/Shared/revenue-dashboard\\|Revenue Dashboard]]

---

## Invoice Document

```
Lucido Technology Consulting
Invoice #[LTC-YYYY-XXX]
Date: [YYYY-MM-DD]
Due: [YYYY-MM-DD + 30 days Net-30]
PO #: [District Purchase Order Number]

Bill To:
[District Name]
Attn: Accounts Payable
[Address]
[Email]

───────────────────────────────────

Description                          Amount
───────────────────────────────────
[Project Phase / Milestone]          $[amount]
  Per proposal [date], Exhibit A
  PO #[number]
[Line item detail]                   $[amount]
───────────────────────────────────
Subtotal                             $[amount]
───────────────────────────────────
Total Due                            $[amount]

Payment Terms: Net-30
Remit To: Lucido Technology Consulting
[payment instructions]

Tax ID / W-9: [provided separately]
```

---

## Invoice Types

| Type | Trigger | Timing |
|------|---------|--------|
| Project Start | PO issued + contract signed | 30% |
| Mid-Project | Milestone accepted | 40% |
| Completion | Final delivery accepted | 30% |
| Monthly Retainer | 1st of month | $2,500–5,000/month |
| Scope Change | Approved scope change | $200/hr × hours |

---

## Invoice Numbering
- Format: `LTC-YYYY-NNN`
- Sequential within year, starting at 001
- Example: `LTC-2026-001`

---

## District-Specific Notes
- PO number is REQUIRED before invoice can be sent — districts don't pay without it
- Net-30 is standard; some large districts are Net-45 or Net-60
- Vendor registration may be required before first invoice — verify during contracting
- W-9 must be on file with district before first payment
