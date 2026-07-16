---
title: "LoRA Rank Selection: What r=32 vs r=64 Taught Me About Adapter Capacity"
created: 2026-06-23
type: blog-outline
series: local-data-stack-deep-dive
post: 3
status: outline
---

## Thesis
LoRA rank is not a hyperparameter you tune with a grid search. It's a capacity decision that determines whether your model memorizes behavior patterns or internalizes domain knowledge. r=32 taught SQL structure. r=64 taught the warehouse schema. Here's the data behind both runs.

## Outline

### 1. The Two Runs, Side by Side
| Parameter | Run 1 | Run 2 |
|-----------|-------|-------|
| Rank | 32 | 64 |
| Alpha | 32 | 64 |
| Trainable params | 137M (1.7%) | 275M (3.3%) |
| Epochs | 2 | 3 |
| LR | 2e-4 | 3e-4 |
| Steps | 702 | 1,053 |
| Time | ~7 hours | ~10-12 hours |
| Adapter size | ~551 MB | ~1.1 GB |

### 2. Run 1 (r=32): The Behavioral Model
- Generated syntactically correct DuckDB SQL
- Used proper JOIN patterns, aggregation, GROUP BY
- Knew CDE categories conceptually (RH, SE, EL, SWD)
- BUT — hallucinated column names. `chronic_absent_rate` instead of `ca_chronic_absent_rate_pct`. `student_enrollment_count` that doesn't exist.
- The model learned how to write SQL. It didn't learn the actual columns.

### 3. Why r=32 Wasn't Enough
- 11,222 training pairs × 492 columns = the adapter needs to encode column identities
- At r=32, the adapter has 137M parameters — but the vocabulary of column names alone is ~5K tokens
- The adapter learned the distribution (what SQL looks like) but not the specifics (which columns exist)
- This is the difference between "knows the genre" and "knows the book"

### 4. Run 2 (r=64): The Schema Model
- Doubled adapter capacity: 275M parameters
- All linear layers targeted (not just attention), 3 epochs, higher LR
- Result: model references real warehouse columns significantly more often
- Still not perfect — 492 columns is a lot — but the improvement is measurable
- Schema context in prompts fills the remaining gap

### 5. The Export Hell: Unsloth vs Transformers 5.x
- Run 1 trained fine, but exporting the merged model for GGUF conversion failed
- Unsloth's save_pretrained is incompatible with transformers 5.12
- The fix: load with plain transformers + PEFT, merge_and_unload(), save
- 14B FP16 (28GB) doesn't fit A10G (24GB) — needed CPU offloading for merge
- This cost me a day. It would have cost a junior engineer a week.

### 6. How to Choose Your Rank
- r=8-16: behavior patterns only (tone, format, output structure)
- r=32: moderate domain adaptation (SQL patterns, code style, response templates)
- r=64+: heavy domain knowledge (schema memorization, entity names, specific rules)
- The heuristic: if your training data contains facts (column names, product IDs, legal codes), go higher. If it's about style (tone, format), lower is fine.

### 7. The GGUF Conversion Pipeline
- Merge LoRA → save FP16 → convert_hf_to_gguf.py → llama-quantize Q4_K_M
- The full pipeline from training to deployable artifact

### Key Takeaways
- Rank selection is a capacity decision, not a tuning parameter
- r=32 taught behavior; r=64 is teaching schema
- Unsloth's export is broken with transformers 5.x — know the workaround
- When in doubt about rank: higher is safer if you can afford the adapter size and training time
