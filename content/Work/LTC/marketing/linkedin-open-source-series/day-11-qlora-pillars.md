---
title: "Day 11 — QLoRA's Three Pillars: The 10x Cost Collapse"
created: 2026-06-23
type: linkedin-post
series: open-source-stack
day: 11
week: 3
status: draft
references:
  hf_dataset: "https://huggingface.co/datasets/build-small-hackathon/lfed-training-data"
---

Three engineering decisions collapsed the cost of fine-tuning a 14B model by roughly 10x. Most district IT teams have never heard of any of them.

I used QLoRA to train the warehouse model. QLoRA is PEFT plus three specific optimizations that make large-model fine-tuning feasible on consumer hardware. Here's what each one does and why it mattered in my training run.

NF4 — 4-bit NormalFloat. A data type designed for the actual distribution of pre-trained neural network weights. Instead of storing each weight in 16 bits (the standard), NF4 uses 4 bits that are informatively spaced. The model barely loses precision. VRAM drops by 75%.

Double Quantization. The quantization process itself produces constants. Double quantization compresses those constants too — saving about 0.37 bits per parameter. Sounds small. On a 14B model, it's the difference between fitting in 24 GB of VRAM and not.

Paged Optimizers. During training, optimizer states can spike beyond GPU memory. Paged optimizers overflow to CPU RAM automatically, preventing the OOM crashes that kill long training runs. I never once lost a training run to an OOM. Paged optimizers are why.

My actual config: QLoRA on a Modal A10G with 24 GB VRAM. Base model: Qwen2.5-Coder-14B-Instruct, pre-quantized to 4-bit. LoRA rank 64, alpha 64, all linear layers. Three epochs. Learning rate 3e-4. Total training time: roughly 10 hours. Total cost: about $30.

One hard-learned lesson: Unsloth's merge-and-save is broken with transformers 5.x. When I tried to export the merged model for GGUF conversion, it failed silently. The fix was plain transformers + PEFT — load the 4-bit base, load the LoRA adapter, merge_and_unload(), save. One extra step. The same result.

The training data — 11,222 validated question-to-SQL pairs against the real warehouse — is published on Hugging Face. Anyone can reproduce the training run.

Yesterday I wrote about LoRA adapters as swappable behaviors. Today is the engineering inside the training process. Tomorrow: which framework to use and why it depends on what's already on your desk.

The same optimizations work for any fine-tuning task. A nonprofit training a model on grant success patterns, a small business training on support ticket classification — both get the 10x cost collapse. The math doesn't care about the domain.
