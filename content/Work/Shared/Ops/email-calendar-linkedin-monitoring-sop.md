---
title: Email, Calendar & LinkedIn Monitoring SOP
created: 2026-06-16
updated: 2026-06-16
type: sop
tags: [shared, ops, email, calendar, linkedin, infrastructure, sop]
status: planned — awaiting Google OAuth setup
---

# Email, Calendar & LinkedIn Monitoring SOP

> Step-by-step workflow for integrating email, calendaring, and LinkedIn
> notification monitoring into the daily cadence. Covers API access, setup,
> daily check process, and calendaring from vault context.
>
> **Status:** Planned. Not yet implemented. Google OAuth setup is the
> prerequisite. See Phase 1 below.

---

## Overview

Three problems to solve:

1. **Email** — Need daily visibility into mailbox without manual checking. As clients pick up, missing an email costs momentum.
2. **LinkedIn** — Recruiters and contacts reach out via LinkedIn. Missed one by a day already. Need a reliable monitor without API risk.
3. **Calendaring** — When meetings get scheduled in vault context (lead calls, follow-ups, client sessions), want them in Google Calendar automatically. No manual double-entry.

All three are solvable with one Google OAuth setup. LinkedIn is handled indirectly through email notifications — no LinkedIn API needed.

---

## API Landscape Summary

### Email — Gmail API

| Aspect | Detail |
|--------|--------|
| Access | RESTful API, OAuth 2.0 |
| Capabilities | Read threads, search, send, reply, manage labels, push notifications via Pub/Sub |
| Limits | Generous daily quotas for read/write |
| Setup | Google Cloud project + OAuth client + one-time browser auth |
| Hermes support | `google-workspace` skill (already installed). `himalaya` CLI as fallback (IMAP, app password only) |

### Calendar — Google Calendar API

| Aspect | Detail |
|--------|--------|
| Access | RESTful API, same OAuth as Gmail |
| Capabilities | Create/list/delete events, add attendees, push notifications via Pub/Sub |
| Setup | Same OAuth flow as Gmail — enable Calendar API scope |
| Hermes support | `google-workspace` skill — `calendar list`, `calendar create`, `calendar delete` |

### LinkedIn — Official API is Walled Off

| Aspect | Detail |
|--------|--------|
| Reading messages | Requires partner approval (3-6 months, <10% approval rate) |
| Connections | Blocked |
| Conversation history | Blocked |
| Enterprise pricing | $10,000–50,000/year |
| Third-party (Unipile, ConnectSafely) | Risk of account flagging. Not recommended. |

**Workaround:** LinkedIn sends email notifications for every message, connection request, and recruiter outreach. If we monitor Gmail for `from:linkedin.com` or `from:notifications@linkedin.com`, we catch every LinkedIn interaction without touching the LinkedIn API. Zero API risk, zero cost.

---

## Phase 1: Google OAuth Setup (One-Time, ~10 Minutes)

> Do this when ready to activate the workflow. Not needed yet — this SOP is
> the plan.

### Step 1: Create Google Cloud OAuth Client

1. Go to https://console.cloud.google.com/projectselector2/home/dashboard
2. Create or select a project (name: "Hermes Workspace" or similar)
3. Enable APIs from the API Library (https://console.cloud.google.com/apis/library):
   - Gmail API
   - Google Calendar API
   - (Optional: Google Drive API, Google Sheets API, People API — useful later)
4. Create OAuth credentials: https://console.cloud.google.com/apis/credentials
   - Credentials → Create Credentials → OAuth 2.0 Client ID
   - Application type: Desktop app → Create
5. If app is in Testing, add your Google account as a test user:
   - https://console.cloud.google.com/auth/audience → Test users → Add users
6. Download the JSON file. Note the file path.

### Step 2: Authorize Hermes

```bash
GSETUP="python ${HERMES_HOME:-$HOME/.hermes}/skills/productivity/google-workspace/scripts/setup.py"

# Check if already set up
$GSETUP --check

# Load credentials
$GSETUP --client-secret /path/to/client_secret.json

# Get auth URL (email + calendar scopes)
$GSETUP --auth-url --services email,calendar --format json

# User opens URL in browser, authorizes, pastes back redirect URL
$GSETUP --auth-code "THE_URL_OR_CODE_FROM_BROWSER"

# Verify
$GSETUP --check
```

Token stored at `~/.hermes/google_token.json`. Auto-refreshes. Done.

### Step 3: Verify Access

```bash
GAPI="python ${HERMES_HOME:-$HOME/.hermes}/skills/productivity/google-workspace/scripts/google_api.py"

# Test Gmail
$GAPI gmail search "is:unread" --max 5

# Test Calendar
$GAPI calendar list
```

---

## Phase 2: Daily Email Check (Morning Cadence)

> After OAuth setup, this becomes part of the morning startup. The daily
> note already references email/calendar — this SOP makes it operational.

### What to Check

Run this at startup, before generating the daily note:

```
GAPI="python ${HERMES_HOME:-$HOME/.hermes}/skills/productivity/google-workspace/scripts/google_api.py"

# 1. Unread emails from last 24 hours
$GAPI gmail search "is:unread newer_than:1d" --max 20

# 2. LinkedIn notifications specifically
$GAPI gmail search "from:linkedin.com is:unread newer_than:3d" --max 10

# 3. Calendar events today
$GAPI calendar list --start $(date -u +%Y-%m-%dT00:00:00Z) --end $(date -u +%Y-%m-%dT23:59:59Z)
```

### How It Surfaces in the Daily Note

Add a new section to the daily note template (between Executive Snapshot and Top 3 Outcomes):

```markdown
## Inbox & Calendar Check

### Email (Unread, Last 24h)
- [Count] unread messages. Key items:
  - [Sender] — [Subject] — [Action needed?]
  - ...

### LinkedIn Notifications (Last 3 Days)
- [Count] notifications.
  - [Type: message/connection/recruiter] from [Name] — [Action needed?]
  - ...

### Calendar Today
| Time | Event | With | Notes |
|------|-------|------|-------|
```

### Rules
- Only surface action-required emails. Newsletters and noreply get filtered.
- LinkedIn notifications are the priority — that's where recruiters and contacts reach out.
- Calendar events go straight into the daily note so there's no second check.
- If an email needs a reply, add it to the to-do table with the sender name and subject.

---

## Phase 3: LinkedIn Monitoring (Via Email)

No LinkedIn API. No third-party service. LinkedIn sends email notifications for:

- Direct messages
- Connection requests
- Recruiter messages (InMail)
- Profile views (if LinkedIn Premium)
- Comments on your posts
- Mentions

### How to Filter

LinkedIn notification emails come from:
- `notifications@linkedin.com`
- `messages-noreply@linkedin.com`
- `invite@linkedin.com`
- ` recruiter@linkedin.com` (recruiter messages)

### Daily Check

```
$GAPI gmail search "from:linkedin.com is:unread newer_than:3d" --max 15
```

Sort by type:
- **Message/InMail** → read full email, identify sender, action if response needed
- **Connection request** → note who, decide whether to accept
- **Recruiter outreach** → highest priority — these are time-sensitive
- **Post engagement** → informational, no action unless you want to engage

### What This Solves

Frank missed a recruiter message by a day. With this check running at morning startup, any LinkedIn notification from the last 3 days surfaces immediately. No more "I didn't see it in time."

---

## Phase 4: Calendaring From Vault Context

When a meeting gets scheduled — lead call, follow-up, client session — create a Google Calendar event directly. No manual double-entry.

### When to Create Events

| Trigger | Event Type | Attendees |
|---------|------------|-----------|
| Lead discovery call scheduled | "Discovery Call — [Lead Name]" | Lead email + Frank |
| Client content strategy session | "WFC Content Strategy — [Client]" | Client + Lauren |
| Client design review | "WFC Design Review — [Client]" | Client + Frank |
| Client build review | "WFC Build Review — [Client]" | Client + Frank + Lauren |
| Client launch handoff | "WFC Launch — [Client]" | Client + Frank + Lauren |
| LTC follow-up call | "Follow-up — [Lead/Org]" | Lead + Frank |
| Peer meeting (Pauline Nagle, etc.) | "Peer Meeting — [Name]" | Contact + Frank |

### How to Create

```bash
GAPI="python ${HERMES_HOME:-$HOME/.hermes}/skills/productivity/google-workspace/scripts/google_api.py"

# Example: Laurie Chandler discovery call
$GAPI calendar create \
  --summary "Discovery Call — Laurie Chandler, LMFT" \
  --start 2026-06-18T10:00:00-07:00 \
  --end 2026-06-18T10:30:00-07:00 \
  --attendees "chandlerdepthpsych@gmail.com"
```

### Rules
- Always include timezone offset (Pacific = `-07:00` in summer, `-08:00` in winter).
- Confirm with Frank before creating any event — governance rule.
- After creation, note the event ID in the lead's dossier or daily note.
- Morning startup calendar check (Phase 2) surfaces upcoming events so nothing gets missed.

---

## Phase 5: Weekly Email Triage

Beyond the daily check, do a weekly sweep for anything that slipped:

```
# All unread from last 7 days
$GAPI gmail search "is:unread newer_than:7d" --max 50

# LinkedIn from last 7 days
$GAPI gmail search "from:linkedin.com newer_than:7d" --max 30

# Calendar for next 7 days
$GAPI calendar list --start $(date -u +%Y-%m-%dT00:00:00Z) --end $(date -u -v+7d +%Y-%m-%dT23:59:59Z)
```

This catches anything missed during daily checks and gives a forward-looking calendar view for the weekly plan.

---

## Implementation Checklist

### One-Time Setup
- [ ] Create Google Cloud OAuth client (enable Gmail API + Calendar API)
- [ ] Download client secret JSON
- [ ] Run `$GSETUP --client-secret /path/to/json`
- [ ] Run `$GSETUP --auth-url --services email,calendar`
- [ ] Authorize in browser, paste back code
- [ ] Run `$GSETUP --auth-code "code"`
- [ ] Verify: `$GSETUP --check` → AUTHENTICATED
- [ ] Test: `$GAPI gmail search "is:unread" --max 5`
- [ ] Test: `$GAPI calendar list`

### Daily Cadence Integration
- [ ] Add "Inbox & Calendar Check" section to daily note template
- [ ] Add email/calendar check to morning startup skill
- [ ] Add LinkedIn notification filter to morning check
- [ ] Add calendar event creation to lead scheduling workflow

### Calendaring
- [ ] Create Google Calendar event for Laurie Chandler call (Weds 6/18)
- [ ] Create Google Calendar event for Pauline Nagle meeting (6/17 or 6/18)
- [ ] Add "create calendar event" step to lead dossier workflow

### Weekly
- [ ] Add weekly email triage to Friday audit
- [ ] Add 7-day calendar look-ahead to weekly plan

---

## Fallback: Himalaya CLI (If Google OAuth Not Available)

If Google Cloud setup is blocked or undesired, the `himalaya` CLI provides
IMAP-based email access with a Gmail app password (no Google Cloud project).

```bash
# Install
brew install himalaya

# Configure (needs ~/.config/himalaya/config.toml)
himalaya account configure  # interactive wizard, use pty=true

# Use
himalaya envelope list                    # list inbox
himalaya envelope list --folder "Sent"   # list sent
himalaya envelope list from:linkedin.com  # search by sender
himalaya message read 42                  # read by ID
```

No calendar access with Himalaya — that requires the Google API path above.
Himalaya is email-only, terminal-based, and uses an app password instead of OAuth.

### When to Use Himalaya vs Google Workspace Skill

| Need | Tool |
|------|------|
| Just email, no calendar, no Google Cloud | Himalaya (app password, 2 min) |
| Email + calendar + Drive + Sheets | google-workspace skill (OAuth, 10 min) |
| Calendar events from vault context | google-workspace skill (required) |
| LinkedIn monitoring via email | Either works — Google is easier for search/filter |

---

## Dependencies

- `google-workspace` skill — already installed, needs OAuth setup
- `himalaya` skill — already installed as fallback
- No new packages required
- No LinkedIn API access needed
- No third-party services (Unipile, ConnectSafely) needed

---

## References

- [[Work/Shared/Ops/daily-startup-checklist]] — where the email check integrates
- [[Work/Shared/Ops/morning-standup]] — where LinkedIn notifications surface
- [[Work/Shared/Ops/daily-shutdown-checklist]] — where calendar look-ahead integrates
- [[Work/Shared/wfc-email-calendar-setup]] — WFC-specific email/calendar decisions
- Google Workspace skill: `~/.hermes/skills/productivity/google-workspace/`
- Gmail search syntax: `references/gmail-search-syntax.md` (in skill dir)

---

## Notes

- Research conducted 6/16. Gmail API and Google Calendar API confirmed accessible via OAuth.
- LinkedIn official API confirmed blocked for messaging/connections without partner approval.
- Third-party LinkedIn APIs (Unipile, ConnectSafely) reviewed — risk of account flagging outweighs benefit.
- Email-notification monitoring is the safest, zero-cost path for LinkedIn.
- This SOP is the plan. Activation gated on Google OAuth setup (10 min, one-time).
- Per USER.md governance: no autonomous outbound sends without human approval. Email reading is passive — no governance gate needed. Calendar event creation requires Frank's confirmation.
