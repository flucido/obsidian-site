---
title: WFC Invoice Template
created: 2026-05-19
updated: 2026-05-19
type: template
tags: [wfc, finance, invoice, template]
---

# WFC Invoice Template

> Invoices generated at deposit, launch, and monthly for support retainers.
> All invoices are DRAFTS until human review.

---

## Invoice Workflow

1. **Trigger:** Contract signed (deposit invoice) OR launch complete (balance invoice) OR 1st of month (retainer)
2. **Generate:** Populate from this template
3. **Review:** Human reviews
4. **Send:** Human sends to client
5. **Track:** Record in [[Work/Shared/revenue-dashboard\\|Revenue Dashboard]]

---

## Invoice Document

```
WellFull Collective
Invoice #[WFC-YYYY-XXX]
Date: [YYYY-MM-DD]
Due: [YYYY-MM-DD + 14 days]

Bill To:
[Client Name]
[Practice Name]
[Email]

───────────────────────────────────

Description                          Amount
───────────────────────────────────
[Offer tier name]                    $[amount]
  - [detail]
[Add-on if applicable]               $[amount]
───────────────────────────────────
Subtotal                             $[amount]
───────────────────────────────────
Total Due                            $[amount]

Payment: [payment method / instructions]

WellFull Collective
hello@wellfullcollective.com
```

---

## Invoice Types

| Type | Trigger | Timing |
|------|---------|--------|
| Deposit | Contract signed | 50% of project total |
| Balance | Launch day | Remaining 50% |
| Monthly Retainer | 1st of month | $100–250/month |
| Add-On / Scope Change | Approved scope change | $150/hr × hours |

---

## Invoice Numbering
- Format: `WFC-YYYY-NNN`
- Sequential within year, starting at 001
- Example: `WFC-2026-001`
