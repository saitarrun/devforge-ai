---
name: codebase-navigator
description: Deep structural codebase comprehension, AST dependency graph traversal, symbol caller/callee tracing, and monorepo navigation strategies for massive codebases.
version: 1.0.0
---

# Large-Scale Codebase Navigation & Comprehension Skill

This skill defines standard methodology for navigating, mapping, and understanding massive enterprise repositories, microservices, and monorepos (e.g., Turborepo, Nx, Lerna, Go workspaces, multi-package repositories).

---

## 1. Multi-Tier Exploration Strategy

When exploring an unfamiliar or massive codebase, never blindly read random files. Follow this 4-tier navigation sequence:

```
[Tier 1: Architectural Topography]
  → Package manifests (package.json, go.mod, Cargo.toml, pyproject.toml)
  → Workspaces / Monorepo layout
  → Domain Context (CONTEXT.md, README.md, docs/adr/)
          ↓
[Tier 2: Structural Knowledge Graph (code-review-graph)]
  → Submodule / Service boundary dependency map
  → Module coupling & circular dependency detection
          ↓
[Tier 3: Symbol & Call-Graph Tracing]
  → Entrypoints (routes, CLI commands, queue consumers, gRPC handlers)
  → Caller / Callee hierarchy for critical abstractions
          ↓
[Tier 4: Precision Target Inspection]
  → Focused file/function reading with bounded context
```

---

## 2. Structural Querying Priority

Always query code semantics rather than relying on noisy keyword matching:

| Priority | Tool / Mechanism | Best Used For |
|---|---|---|
| **1. Primary** | `code-review-graph` / LSP AST | Understanding symbol definitions, call hierarchies, cross-module couplings, and change impact |
| **2. Secondary** | Ripgrep / Structural Grep | Fast discovery of specific error strings, environment variables, config keys, or regex tokens |
| **3. Fallback** | Glob / Directory Traversal | Mapping tree hierarchy when building high-level system mental models |

---

## 3. High-Leverage Navigation Patterns

### Pattern A: Tracing Ingress-to-Egress Dataflows
When tracking an end-to-end user action in a complex repo:
1. **Locate Ingress**: Identify API route handler or message queue listener (`/api/v1/...`, `@Post()`, `def handle_event`).
2. **Trace Service Layer**: Inspect domain service orchestration logic and business validation rules.
3. **Trace Persistence Layer**: Examine database repository, ORM queries, and transaction boundaries.
4. **Inspect Egress Side-Effects**: Check emitted events (Kafka/RabbitMQ), outbound webhooks, or cache invalidation calls.

### Pattern B: Monorepo & Cross-Package Dependency Mapping
1. Map internal package aliases (e.g., `@enterprise/core`, `@enterprise/auth`, `packages/*`, `libs/*`).
2. Check dependency directions: Shared core libraries must never depend on consumer applications.

### Pattern C: Change Impact Analysis
Before modifying shared types or utility functions:
- Run impact query: `code_review_graph impact <file_path>` or trace all references.
- Verify whether the type is exported across public API contracts or RPC protocols.

---

## 4. Mental Model Synthesis Checklist
Before proposing changes in a massive codebase, confirm:
- [ ] What service / package owns this business domain?
- [ ] What is the exact execution entrypoint for this workflow?
- [ ] Where is state persisted and what transactions/locks are held?
- [ ] What downstream consumers or background workers rely on this output?
