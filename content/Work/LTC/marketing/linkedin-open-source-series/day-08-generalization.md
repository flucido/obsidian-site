---
title: "Day 08 — Why This Isn't Just for Schools"
created: 2026-06-23
type: linkedin-post
series: open-source-stack
day: 8
week: 2
status: draft
---

Every post this week ended with a line about how the pattern extends beyond schools. Here's why I believe that, and why I'm writing about schools first.

I built LFED for a hackathon. The constraint was "Backyard AI" — local-first, offline-capable, no cloud dependencies. I chose education data because it's the hardest compliance case I know. Student records touch FERPA, SOPIPA, AB 1584, AB 2273, COPPA, PPRA, CCPA. Seven overlapping regimes. If the architecture works under that pressure, it works anywhere.

DuckDB doesn't know it's running education data. dlt doesn't know it's ingesting Aeries exports. The fine-tuned model doesn't know the schema belongs to a school district — it just knows tables, columns, and SQL syntax. The stack is domain-agnostic. The compliance posture is not — but that's the point. If you can keep student data inside a firewall and still run AI-assisted analytics, you can keep any sensitive data inside a firewall and do the same.

The pattern I see: small organizations — schools, nonprofits, small businesses — get sold enterprise infrastructure they don't need at prices they can't sustain. The "enterprise" label is a procurement tax. The actual workload fits on a laptop. The actual data fits in RAM. The actual intelligence fits in a fine-tuned model on a desk.

Now the stack runs against a real 19-table warehouse with 492 columns — 25 million rows of actual CDE data. Not a demo. Not a synthetic five-table schema. Real complexity, real scale, still local.

I'm writing about schools because that's where I've built and where I have the deepest context. But every architectural decision I've made — local-first, open formats, open weights, no per-token billing — applies identically to a community clinic, a food bank, a five-store retailer.

If your organization has data it cares about and a budget that can't absorb a $50K/year cloud contract, the stack I just described is for you. The code is public. The models are open. The hardware is a one-time purchase.

Next week: the intelligence layer. How to fine-tune a model for your specific domain without a data science team.
