---
title: Skill — Outreach Draft
created: 2026-07-10
updated: 2026-07-10
type: skill
tags: [shared, agents, skill, outreach, draft, governance]
loads_by: ltc-operator, wfc-operator, content-marketer
---

# Skill: Outreach Draft

> Draft outbound communications (email, InMail, follow-up, SOW cover note).
> Governance-gated: drafts only. NEVER sends. Compliance-QA reviews every draft
> before it goes to a human for final approval.

## When to Use

- Cold outreach (LTC only — WFC retired cold outreach 6/1, inbound-only)
- Warm follow-up (LTC or WFC)
- Reply to inbound (WFC consult acknowledgment, LTC district question)
- SOW cover note (sent with the SOW PDF)
- Nurture sequence (long-cycle lead staying warm)

## Hard Rule

> **Drafts ONLY. No exceptions. No "send later" flags. No auto-send after review.**
> The human (Frank) is the only entity that hits send.
> Any code path that suggests autonomous send is a bug — flag immediately.

## Inputs

- `leads/<slug>/dossier.md` (lead context, prior contact history)
- The lead's last message (if a reply)
- `Work/Shared/compliance-matrix.md` (regulatory gates)
- Per-org voice contract (`content-marketing.md` or role docs)
- The previous email in the thread (for continuity)

## Output

A markdown file: `leads/<slug>/<artifact-name>-YYYY-MM-DD-draft.md`

Naming conventions:
- `email-draft.md` — initial cold outreach (LTC)
- `email-YYYY-MM-DD-<topic>.md` — sent/received emails (with date prefix)
- `follow-up-email-YYYY-MM-DD-draft.md` — follow-up drafts
- `reply-draft-YYYY-MM-DD.md` — drafts of reply to inbound
- `SOW-cover-note-YYYY-MM-DD-draft.md` — note that goes with SOW

The `-draft` suffix is mandatory. Once Frank sends, rename to drop `-draft` and
add a `sent` or `sent-YYYY-MM-DD` suffix.

## Email Draft Schema

```yaml
---
title: <Subject Line>
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: email-draft
to: <name> <<email>>
cc: <name> <<email>>  # optional
from: frank@lucidotechnologyconsulting.com  # or frank@wellfullcollective.com
subject: <subject line>
status: draft
---
```

Then:
- **Greeting**
- **Opening** (1-2 sentences, reference the relationship or warm intro)
- **Context** (why you're reaching out, in their language)
- **Value** (what you can do, framed as their problem — not your service)
- **CTA** (specific next step: 15-min call, site audit, kick-off, etc.)
- **Sign-off**
- **P.S.** (optional — re-state CTA or add a social proof)
- **Compliance footer** (LTC: FERPA-aware; WFC: opt-out + privacy policy link)

## Voice (Per Org)

### LTC Voice (district/peer register)
- Practitioner, confident, technical-but-accessible.
- Spell out acronyms on first reference.
- Numbers, milestones, source links. No vendor-speak.
- Soft consultative: "here's what I'm seeing" not "you should."

### WFC Voice (warm, clinician-aware)
- Warm, professional, anti-jargon.
- Acknowledge the vulnerability of the audience.
- Always tie back to the practice's differentiation.
- HIPAA-aware — no PHI, no client health info.

## Validation Rules (Hard)

1. **Subject line + preview text** — both work in Gmail web + Outlook.
2. **No fabricated facts** — names, dates, prices, metrics must be real.
3. **Every empirical claim cited** — vault file or external URL.
4. **Per-org voice match** — no vendor-speak (LTC), no jargon (WFC).
5. **Compliance gates passed:**
   - LTC: FERPA/AB 1584 framing where relevant
   - WFC: opt-out/unsubscribe in any bulk send, privacy policy link
6. **CTA matches next-step stage** — don't ask for a meeting if the lead is
   in pre-discovery; don't send a cold email to a warm intro source.
7. **No client identifying details** without explicit consent.
8. **Draft marker visible** — `-draft` suffix in filename + `status: draft` in frontmatter.

## Compliance-QA Pre-Flight

Before the draft goes to Frank for review, run `compliance-qa` agent:
- [ ] Pass/fail per gate (see `compliance-qa.md` → Outreach Email section)
- [ ] Inline review appended to the draft file
- [ ] MEDIUM/HIGH findings logged in `Work/Shared/Ops/issues-fixes-log.md`

## Common Outreach Patterns

### LTC Cold Outreach (district IT leader)
1. **Warm angle** (intro source, mutual connection, recent event)
2. **Problem statement** (their pain, in their language — SIS migration, CALPADS, etc.)
3. **One-sentence credibility** (relevant prior work, anonymized if needed)
4. **Specific CTA** ("15 min to see if this maps to your situation")

### WFC Inbound Reply (consult form acknowledgment)
1. **Acknowledge within 24h** — never make them wait
2. **Warm opener** — reference what they wrote
3. **One clarifying question** (only one, to keep momentum)
4. **CTA**: 30-min discovery call, two time options

### LTC Follow-Up (after no reply)
1. **Brief, low-pressure** — respect their time
2. **Add value** (link to a relevant article, observation, or resource)
3. **Restate CTA** (different phrasing)
4. **No passive-aggressive urgency**

### WFC SOW Cover Note
1. **Recap the engagement** (one paragraph)
2. **Reference the SOW** (key terms, pricing, milestones)
3. **Specific next step** (sign + return, kick-off scheduling)
4. **Tone** — warm, not legalistic

## Governance

- **NEVER send** — drafts only.
- **NEVER copy** real client email content into a generic template without
  scrubbing identifying details.
- **NEVER use** an old draft's recipient for a new outreach.
- **NEVER suggest** auto-send after Frank's review — every send is explicit.
- **No "Dear Sir/Madam"** — always use the contact's name.

## Common Failures to Avoid

- **Subject line that sounds like spam** — avoid all caps, multiple exclamation marks, "FREE", etc.
- **Long opening that buries the CTA** — front-load the value.
- **Template-y feel** — every draft should reference the specific lead's context.
- **Missing compliance footer** — WFC always needs opt-out; LTC always needs
  appropriate disclaimers.
- **Draft without QA review** — always run through `compliance-qa` before Frank sees it.
