---
title: "Serving Fine-Tuned Models Locally: From LoRA Adapter to GGUF on Apple Silicon"
created: 2026-06-23
type: blog-outline
series: local-data-stack-deep-dive
post: 5
status: outline
---

## Thesis
The gap between a trained LoRA adapter and a deployable local model is six steps that nobody documents end-to-end. Here's the exact pipeline — including the Unsloth pitfall, the CPU offloading trick, and the GGUF conversion — that takes a fine-tuned 14B model from Modal GPU to Mac Studio.

## Outline

### 1. The Two Deployment Paths
- Path A: transformers + PEFT + 4-bit base (for GPU/HF Spaces)
- Path B: merged FP16 → GGUF → llama.cpp (for local Mac inference)
- Why you need both: development happens on cloud GPU, deployment happens on desk

### 2. Path A: Direct PEFT Loading
- Base model: unsloth/qwen2.5-coder-14b-instruct-bnb-4bit (4-bit pre-quantized)
- Load with BitsAndBytesConfig (required for transformers 5.x)
- Load LoRA adapter with PeftModel.from_pretrained()
- device_map="auto" for GPU, torch_device="cpu" for Mac
- This is what the HF Spaces demo uses
- Pro: no merge step, fast iteration. Con: requires CUDA for 4-bit inference

### 3. Path B Step 1: Merge LoRA with Base
- Problem: Unsloth's save_pretrained is BROKEN with transformers 5.12
- The official pattern fails silently — no error, just a corrupt save
- Solution: use plain transformers + PEFT, NOT Unsloth
- ```python
  from transformers import AutoModelForCausalLM
  from peft import PeftModel
  base = AutoModelForCausalLM.from_pretrained(base_model, quantization_config=bnb_config)
  model = PeftModel.from_pretrained(base, adapter_path)
  model = model.merge_and_unload()
  model.save_pretrained(output_path, safe_serialization=True)
  ```

### 4. Path B Step 2: The VRAM Problem
- 14B FP16 merged model = ~28GB
- Modal A10G = 24GB VRAM
- Solution: CPU offloading during merge
- device_map with "cpu" for the merge step
- Slow (minutes) but works. You're merging once, not inferencing.

### 5. Path B Step 3: Convert to GGUF
- ```bash
  python llama.cpp/convert_hf_to_gguf.py merged_dir --outfile model-fp16.gguf --outtype f16
  ```
- Then quantize:
- ```bash
  llama.cpp/build/bin/llama-quantize model-fp16.gguf model-q4_k_m.gguf Q4_K_M
  ```
- Q4_K_M is the sweet spot for 14B on Apple Silicon: 30-50 tokens/sec, fits in unified memory
- Final GGUF size: ~9 GB

### 6. Path B Step 4: Local Inference
- Ollama Modelfile pointing at the GGUF
- Or raw llama.cpp with Metal acceleration
- ```bash
  llama-cli -m model-q4_k_m.gguf -p "..." -ngl 99
  ```
- -ngl 99 = offload all layers to Metal GPU
- Tokens/sec in 30-50 range — faster than reading

### 7. The Adapter Resolution Pattern
- env var LFED_ADAPTER_REPO → local path → HF Hub fallback
- Why three levels: development (local adapter), CI (HF Hub), production (env override)
- This is how the local-data-stack Gradio app stays portable

### 8. What Breaks in Production
- Tokenizer mismatch between training and inference
- BitsAndBytesConfig required in transformers 5.x but was optional before
- LoRA adapter config must match loading code (r, alpha, target_modules)
- HF Hub token needs write access to upload, read access to download
- These are the failures that don't show up in tutorials

### Key Takeaways
- Unsloth for training, transformers+PEFT for export — know the boundary
- CPU offloading is the escape hatch when merged model > GPU VRAM
- Q4_K_M is the right quant for 14B on Apple Silicon
- Three-level adapter resolution (env → local → HF) makes the app portable
- The merge→convert→quantize pipeline is six steps that should be a script
