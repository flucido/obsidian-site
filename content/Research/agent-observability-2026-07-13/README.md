---
title: Agent Observability — Project README
created: 2026-07-13
updated: 2026-07-13 10:45
type: project
tags: [research, agents, observability, traces, data-mining, development-idea]
status: ACTIVE — scoped 7/13 10:45 PT as STANDALONE development idea (not a Mavis team integration). Output is a PRD outline for feasibility review.
---

# Agent Observability — Project

> **Goal:** Design a standalone Agent Observability Platform — a tool/system
> for capturing full LangChain-style span trees from agent runs, mining
> them for failure patterns, fine-tuning judge models on the mined
> signals, and closing the agent improvement loop. The platform is a
> **standalone development idea**, not a Mavis team integration. The
> Mavis team is a *reference use case*, not the only customer.

**Anchor article:** [LangChain — *Improving Agents is a Data Mining Problem*](https://www.langchain.com/blog/improving-agents-is-a-data-mining-problem) (Vivek Trivedy, 7/7/2026, 7 min). Companion articles: [The Agent Improvement Loop Starts with a Trace](https://www.langchain.com/blog/traces-start-agent-improvement-loop), [How We Built LangSmith Engine](https://www.langchain.com/blog/how-we-built-langsmith-engine-our-agent-for-improving-agents), [Building a 100x Cheaper Trace Judge with Fireworks](https://www.langchain.com/blog/building-a-100x-cheaper-trace-judge-with-fireworks).

**Project lead:** Frank. **Sub-articles in this folder:**

- `PRD-outline.md` — **primary deliverable.** The product requirements outline for the standalone platform. Read this first.
- `01-article-analysis.md` — what the LangChain article actually says, distilled.
- `02-current-state-audit.md` — where the Mavis team is on tracing today (reference use case, not the target).
- `03-recommendations.md` — what LangChain built vs what a solo-practitioner scoped-down version looks like.
- `04-implementation-log.md` — append-only project log.

---

## Why this project exists (re-scoped 7/13 10:45 PT)

Frank's words: "this isn't just for my work in here. This is more for when
I do a development idea so we don't need to think about putting it into my
obsidian workflow or into my work workflow yet."

**The original framing** (7/13 10:06 PT) was: "close the agent improvement
loop on the Mavis team." Frank has now reframed: this is a **standalone
development idea** for a new tool/product/concept. The Mavis team is one
reference use case, not the only customer. The platform could serve:

- Solo practitioners running personal agent stacks
- Small teams with custom agent workflows
- Internal observability for a company with 1-10 agents in production
- The K-12 research project's fine-tune-and-eval workflow
- WFC's marketing-agent experiments

**What "standalone" means:**
- Not tied to a specific obsidian vault
- Not tied to the Mavis team's role contracts
- Not tied to the LTC or WFC pipelines
- Self-hostable OR cloud-deployable
- Standards-based (OTel-compatible span format) so any agent can plug in

## The article's mental model (one-liner)

> Traces are the currency of long-horizon agent improvement. Mine them for
> failure patterns. Curate the patterns into evals (training data). Run
> experiments. Hill-climb on the evals. Repeat.

## What changed in the scope reframe

| Original (7/13 10:06) | Re-scoped (7/13 10:45) |
|------------------------|-------------------------|
| Trace schema tailored to Mavis team | Trace schema follows LangChain span tree (OTel-compatible) |
| Observability lives in morning-standup.md | Observability lives in the platform's UI (yet to be designed) |
| Mining done by orchestrator + Frank | Mining done by the platform (specialized agents + judge models) |
| Single user (Frank) | Multi-user (solo practitioners, small teams, K-12 research, etc.) |
| Tight scope (1 week) | Open scope (build / defer / skip decision) |
| Output: 5 recommendations for Mavis | Output: PRD outline for a standalone product |

## Frank's three answers (locked in 7/13 10:45 PT)

- **Q1 (what is a trace):** **C — full LangChain-style span tree.** Input → tool calls → outputs → evals → metadata. OTel-compatible.
- **Q2 (where does observability live):** **Not in current workflow.** Standalone product, external storage, custom UI. The platform *is* the home; current workflow integration is later.
- **Q3 (who does the mining):** **C — LLM-as-judge on every event.** Fine-tuned small model (Qwen-class) running at scale. 100× cheaper than frontier at the same task.

## Output format

**PRD outline, not code.** A scannable document Frank can review to decide:
- (a) build this as a serious project (multi-month, with collaborators)
- (b) build a stripped-down MVP (4-6 weeks, solo)
- (c) defer (interesting but wrong time)
- (d) skip (scope is too big for the value)

## Next steps

- [ ] Read `PRD-outline.md` (15-20 min) — the primary deliverable
- [ ] Read `01-article-analysis.md` (5 min) — what the article says
- [ ] Read `03-recommendations.md` (5 min) — LangChain full vs solo-MVP
- [ ] Frank decides: build / MVP / defer / skip
- [ ] If MVP: orchestrator + Frank scope the first 4-week sprint

*Last updated: 2026-07-13 10:45 PT*
