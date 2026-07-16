---
title: WFC Email + Calendar + Scheduling Setup
created: 2026-06-12
updated: 2026-06-12
type: infrastructure
tags: [shared, wfc, email, calendar, scheduling, infrastructure]
status: draft — awaiting review
---

# WFC Email, Calendar & Scheduling — Recommended Stack

> Decision: Keep existing MailAfiniti email hosting ($1.50/user/mo). No Google Workspace.
> Add shared Google Calendar (free) + Cal.com scheduling (free).

---

## Current State

- **Domain:** wellfullcollective.com — GoDaddy registrar, `domaincontrol.com` nameservers
- **Email hosting:** MailAfiniti (`mx.mailafiniti.io`), SPF configured
- **Site:** Vercel, consult form → Resend for transactional email
- **No shared calendar, no scheduling page, no meeting booking system**

---

## Recommended Stack ($0/mo additional)

| Need | Solution | Cost | Setup Time |
|------|----------|------|------------|
| info@wellfullcollective.com | MailAfiniti alias or forwarding → Frank | $0 extra | 5 min |
| lauren@wellfullcollective.com | MailAfiniti mailbox or forwarding → Lauren | Already paid | 5 min |
| Shared business calendar | Google Calendar (free) — shared between personal accounts | $0 | 10 min |
| Public booking page | Cal.com — `cal.com/wellfullcollective` — 1 event type, unlimited bookings | $0 (free tier) | 20 min |
| Meeting video links | Google Meet (free) or Cal.com built-in conferencing | $0 | — |

---

## Why Not Google Workspace

| Factor | Google Workspace | This Stack |
|--------|-----------------|------------|
| Cost | $6/user/mo × 2 = $144/yr minimum | $0/mo (MailAfiniti already paid) |
| Email | Built-in | Already on MailAfiniti |
| Calendar | Built-in, company-wide | Shared Google Calendar (free) |
| Scheduling | Appointment slots only | Cal.com — better UX |
| Admin overhead | Domain verification, MX migration | No migration needed |

---

## Implementation Steps

### 1. Email Addresses (MailAfiniti)
- [ ] Log into MailAfiniti admin panel
- [ ] Create `info@wellfullcollective.com` — forwarding alias to Frank's inbox
- [ ] Create `lauren@wellfullcollective.com` — mailbox or forward to Lauren's personal email
- [ ] Verify: send test emails to both addresses

### 2. Shared Calendar (Google Calendar)
- [ ] Frank: create new calendar "WellFull Collective" in personal Google Calendar
- [ ] Share with Lauren's Google account (Make changes and manage sharing)
- [ ] Set calendar color/timezone (Pacific)
- [ ] Add to both mobile devices
- [ ] Test: create event, verify Lauren sees it

### 3. Scheduling Page (Cal.com)
- [ ] Sign up at cal.com (free tier) — use info@wellfullcollective.com
- [ ] Claim `cal.com/wellfullcollective` as username
- [ ] Create one event type: "Consultation Call" — 15 min, Google Meet
- [ ] Connect Google Calendar for availability
- [ ] Brand: add WFC logo, warm palette
- [ ] Add booking link to: website consult section, email signature, Instagram bio link-in-bio options

### 4. Resend Sender Identity
- [ ] Verify info@wellfullcollective.com in Resend (DNS TXT or email verification)
- [ ] Update consult form → Resend to send FROM info@ (currently may be using Resend default)

---

## Notes

- MailAfiniti was already purchased before this analysis. No reason to migrate away.
- If MailAfiniti ever becomes problematic: Zoho Mail (free up to 5 users) is the fallback.
- Cal.com free tier allows 1 event type — sufficient for "Consultation Call." If you later need multiple event types (e.g., "Client Check-in" + "New Consult"), upgrade is $12/mo — still cheaper than Workspace.
- If Cal.com free tier is too limiting: Google Calendar appointment slots are free and get the job done with less polish.

---

## References
- [[Work/WFC/marketing/social-media-campaign]] — IG: @wellfull_collective, TT: @wellfullcollective
- [[Work/WFC/marketing/launch-checklist]] — accounts section (LinkedIn checked off)
- GitHub: `/Users/flucido/projects/wellfullcollective` — site repo
