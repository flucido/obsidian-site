---
title: "LFED Video Overview Script"
date: 2026-06-14
draft: true
source: blog: lfed-build-small-hackathon-blog.md
target_runtime: "90–120 seconds"
---

# LFED Demo Video — Short Overview Script

_Target: 90–120 seconds. One take, live on the Space. Tight cuts._

---

## Hook — The Problem (0:00–0:15)

**[Screen: LFED Space — https://huggingface.co/spaces/build-small-hackathon/Kasualdad_LFED]**

School administrators sit on mountains of data — attendance, grades, discipline, enrollment — but asking a simple question like "how many students were chronically absent this year?" means a spreadsheet export, a BI tool, or a ticket to the data team that takes three days.

Now — what if you could just type the question?

---

## What It Is + Why Local-First (0:15–0:55)

**[Screen: LFED interface with a question typed in]**

This is LFED — Local First Education Data. You ask a question in plain English. A fine-tuned model writes the SQL, streams it live, validates it, and runs it on a local DuckDB database. You get a plain-English summary, a data table, a CSV download, and — critically — a "Show me how this was computed" button so the answer is fully auditable.

But the real reason this exists is privacy. Most AI tools send your question to a cloud API. That's a non-starter for student data.

FERPA protects student education records at the federal level. Here in California, AB 1584 specifically requires contracts with any third party that touches pupil data — limiting what they can do with it, how long they keep it, and what happens after the contract ends. Most AI API providers don't offer those agreements. And even if they did, districts shouldn't have to negotiate data-processing addenda just to ask a question about attendance.

LFED runs entirely on your machine. llama.cpp + a GGUF model. No internet required. No data ever leaves.

---

## Demo (0:55–1:20)

**[Screen: Type a question, show streaming SQL, results, SQL disclosure]**

Let me show you. "What's the average GPA for chronically absent students versus non-chronic students?"

SQL streams in token by token. Validated. Executed. Results — plain-English summary, table, CSV download. Click "Show me how this was computed" and you can inspect the exact DuckDB query. No black box.

**[Optional: type a second quick question if time allows]**

---

## Close (1:20–1:30-1:45)

Everything is open-source under Apache 2.0 — the model, the training data, the code. Try it at the Hugging Face Space linked below, or grab the GGUF and run it locally on your own machine.

If you work in K-12 education and you've ever wished you could just ask your data a question — this is the direction things are heading.

**[End card: Space URL + repo links]**

---

## Production Notes

- One take, screen capture the live Space. No mockups. Real streaming, real results.
- Show at least one starter question AND one custom-typed question.
- Show the "Show me how this was computed" disclosure.
- Voiceover can be recorded separately for clean audio, but a live spoken take works too.
- End card with links for 5 seconds.

### Description Links
- Live Space: https://huggingface.co/spaces/build-small-hackathon/Kasualdad_LFED
- LoRA: https://huggingface.co/build-small-hackathon/lfed-qwen2.5-coder-14b-sql-lora
- GGUF: https://huggingface.co/build-small-hackathon/lfed-qwen2.5-coder-14b-sql-gguf
- Dataset: https://huggingface.co/datasets/build-small-hackathon/lfed-training-data
