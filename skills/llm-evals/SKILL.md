---
name: llm-evals
description: Architecture standards, evaluation metrics, cost budget controls, and security guardrails for LLM, RAG, and Agentic features.
version: 1.0.0
---

# LLM & RAG Application Engineering Skill

This skill defines industry standards for developing, evaluating, and operating LLM, RAG, and AI Agent features cleanly.

## Core Architectural Pillars

### 1. Evaluation & Benchmarking (Evals)
- **Deterministic Evals**: Assert output schema validity (Zod/Pydantic validation).
- **Model-Graded Evals**: Evaluate accuracy, grounding (faithfulness), hallucination rate, and context relevance using LLM-as-a-Judge.
- **RAG Triad**:
  - Context Relevance (Retrieval quality)
  - Groundedness (LLM stays within retrieved context)
  - Answer Relevance (Output addresses user prompt directly)

### 2. Token & Cost Budget Guardrails
- **Max Token Limits**: Hard limit max response tokens per prompt.
- **Circuit Breakers**: Halt downstream requests if daily/hourly token expenditure exceeds set threshold.
- **Semantic Caching**: Store prompt/embedding responses in Redis/pgvector to eliminate redundant LLM calls.

### 3. AI Security & Safety
- **Prompt Injection Defense**: Sanitize user inputs; separate system instructions from untrusted user content.
- **PII Scrubbing**: Redact secrets, emails, SSNs, and credit card numbers before sending payloads to LLM APIs.
- **OWASP Top 10 for LLMs**: Guard against Insecure Output Handling, Excessive Agency, and Data Poisoning.

## Checklist for Feature Slices with `has_llm: true`
- [ ] Schema validation for structured output (JSON mode / Tool Call response parsing)
- [ ] Fallback model strategy (e.g., fallback from primary model to secondary model on rate limit)
- [ ] OpenTelemetry LLM tracing (LangSmith / Helicone / Phoenix / OTel instrumentation)
- [ ] Token usage logging and latency tracking
- [ ] Eval dataset created with at least 10 gold-standard ground truth examples
