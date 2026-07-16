---
title: Seed — Conversational → Structured Prompt Compiler
created: 2026-07-15
updated: 2026-07-15
type: seed
status: thinking
tags: [shared, ai-workflow, prompts, mavis, idea, prompt-engineering]
---

# Seed — Conversational → Structured Prompt Compiler

> Idea captured 2026-07-15. **Not a project plan.** Not worked on today.
> Surface for future exploration.

**See also:** [[agent-team-index]] · [[environment#Agent Team (Vault +
Mavis Hybrid)]] · [[Research/agent-observability-2026-07-13/PRD-outline]]

---

## The Problem

I (Frank) work with the Mavis agent conversationally. Stream-of-consciousness
is how I think out loud — partial sentences, "hmm", context switches, mood.
That's the **right** interface for thinking, exploring, brainstorming, and
deciding.

But when the work shifts to **actual instruction** — "edit the Squarespace
config", "build out the WFC service tiers page", "draft a SOW for Susan" —
conversational prose is the wrong shape. I need a structured prompt:
role, context, deliverable, constraints, format, success criteria.

Building that structure by hand every time is friction. Skipping it costs
quality. I want a way to **stay in conversational mode** with the agent
and have the agent hand me back a clean, well-formed prompt when the
work becomes concrete.

---

## What I Want The Compiler To Do

Given a slice of conversation (or a pointer to a recent thread), produce
a structured prompt that I can:

- Hand off to another agent (e.g., ltc-operator, wfc-operator)
- Drop into a worktree as a session task
- Use as the spec for a code change
- File as a project brief

The compiler is **not** the worker. It produces the spec. The spec then
goes to a different agent or session.

---

## Trigger Question

When does the compiler fire? Three candidates:

1. **On demand** — I say "compile that as a prompt" or "make this a brief
   for the ltc-operator" and the agent reformats.
2. **On a heuristic** — when the conversation crosses a threshold
   (e.g., user said "go" / "do it" / "now actually..." / commit
   language), the agent offers: "Want me to compile this as a prompt?"
3. **Implicit on handoff** — when the conversation transitions to a
   worker agent, the handoff spec is automatically compiled from the
   upstream thread.

I lean (3) as the cleanest. (1) is fine but adds a step. (2) is magic
and probably annoying.

---

## Open Design Questions

- **What goes in vs. what gets stripped?** Role + deliverable +
  constraints + format are core. Mood, "hmm", backstory, "I was
  thinking about this earlier because..." — strip or preserve?
- **How are implicit constraints surfaced?** Things like governance
  rule #1 (no outbound sends), the no-writes-to-code-repos rule, the
  LTC FERPA/AB 1584 language, the WFC aesthetic triad — these don't
  appear in conversation but must appear in the structured prompt.
  Does the compiler know about them (via agent-team-index, MEMORY,
  compliance matrix) and auto-include?
- **Granularity** — one prompt for the whole conversation, or
  per-task? A single client call might produce 2-3 distinct tasks
  worth prompting on. Do we get one big prompt or several small?
- **Where does the output live?** Stays in chat? Drops into the
  vault as a new file? Filed in `Work/Shared/Tasks/` or
  `leads/<org>/briefs/`? Gets handed off to a sub-session directly?
- **Tests** — does this work for: client coding work, SOW drafting,
  lead-research outreach, blog post authoring, paper scaffolding?
  Each domain has different defaults.

---

## Possible Shapes (for future sketching)

- **In-chat command** — a `/compile` slash-style command that the
  orchestrator interprets. Fastest to try; lowest commitment.
- **A reusable skill** — `prompt-compile-skill.md` in
  `Work/Shared/Ops/agents/` that any role can call on a conversation
  slice. Cleanest integration with the existing agent pattern.
- **A vault-resident brief template** — fixed structure, the skill
  fills it. Output lands in `Work/Shared/Tasks/brief-YYYY-MM-DD-<slug>.md`
  or similar. Best for audit trail.
- **A handoff pattern** — when a conversation transitions from
  "thinking with Mavis" to "work with ltc-operator", the orchestrator
  compiles the slice into a handoff spec automatically. Most powerful,
  most to build.

---

## Why This Might Not Work

- The conversational stream often doesn't have the structure the
  compiler needs. "Edit the Squarespace config" might be embedded
  in a 30-minute digression about Susan's feedback. The compiler
  needs to find the signal in the noise — and might miss it.
- Implicit constraints can be wrong. Auto-injecting "no outbound
  sends" when the work is actually internal-only is annoying.
- Conversation contains contradictions. The compiler needs to
  resolve them, not paper over them.
- I might just like writing prompts sometimes. Conversational-to-structured
  is a useful skill for me to *have*, not just for the agent to do.

---

## Examples (3 sketches, not yet tested)

**Example 1 — Client coding work**

Conversational slice: "yeah so susan wants the services section to be more
emotional, like, less list-y. she showed me a competitor site and it was
all cards. I think we should do cards but with the photo behind, not a
card on a card. the colors should come from our existing palette, the
creamy peach and the sage. and pull the team out of services, it's its
own section now. oh and the pricing — she didn't say anything about
pricing but I want it moved above the consultation form because right
now the form comes first and that's weird. can you do that? also the
form needs to validate email or something. ok do it."

Compiler output (sketch): structured prompt with role (WFC frontend
agent), context (Susan engagement, current single-page at `/`), deliverable
(edit `src/app/page.tsx` + relevant components), constraints (existing
palette only, no new components, preserve single-page), format
(diff + commit message), success criteria (services now uses cards
with background photo, pricing moved above form, form validates email).

**Example 2 — Outreach draft**

Conversational slice: "ok the tim rios thing — I think he's worth a
shot. district is small, like 4k kids. they moved off aeries to
powerSchool last year and from what I hear it's been rough. I want
to reach out but not like a vendor, more like a peer who built
something. maybe mention the LFED on HF, the open source angle.
and don't mention price, just ask if he wants to talk. draft
something."

Compiler output (sketch): governance-tagged draft with subject line
options, body in 2-3 short paragraphs, source references
([[leads/ltc-tim-rios/dossier]]), explicit "DO NOT SEND — Frank
reviews" footer, distribution channel blank.

**Example 3 — Research paper scaffolding**

Conversational slice: "so for the DESRIST paper I want to lean on
the practitioner-research framing. not journal-style, more like
white-paper-meets-academic. frank can speak to the operator lens.
the 'A Space for Being' case is the borrowed meaning layer.
three rqs, but the third one stays design-research, no clinical
lens. conference target DESRIST 2026-07-08. also need pdf for the
landing page download. four artifacts total, two docx two pdf."

Compiler output (sketch): project brief for a writer session with
explicit decision trace (locked decisions linked to vault),
deliverable list (4 artifacts), format (APA 7 + branded),
deadlines, and "go" criteria.

---

## Why This Note Exists (So I Don't Forget)

Captured 2026-07-15. The friction is real — I default to conversational
and then spend 5-10 minutes tightening up when the work shifts concrete.
The compiler idea might be a skill, might be a habit, might be a
non-starter. Worth revisiting next time that friction shows up.

**No execution today.** When this comes back up, the first decision is
*trigger question* (above) — on-demand vs. handoff. Pick that first.
