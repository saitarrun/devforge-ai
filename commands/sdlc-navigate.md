---
description: Navigate, map, and explore large codebases, complex directory hierarchies, symbol dependencies, and call chains.
argument-hint: "<query-or-symbol-or-path> [--deep] [--impact]"
---

# Codebase Map & Navigation Command

This command enables rapid structural exploration and architectural understanding of large codebases, monorepos, and multi-service repositories.

## Usage

```bash
/sdlc-navigate "AuthService"            # Trace callers, callees, and dependencies
/sdlc-navigate src/billing/ --deep      # Map module boundaries and coupling
/sdlc-navigate "processPayment" --impact # Show what breaks if this function is modified
/sdlc-navigate "architecture"           # High-level domain topology & service map
```

## Process

1. **Load Structural Knowledge Graph**:
   - Query `code-review-graph` (or AST analyzer) for symbol relationships, call hierarchies, and coupling metrics.
2. **Trace Ingress to Egress**:
   - Map entrypoint controllers/routes down to service abstractions, database queries, and emitted events.
3. **Analyze Module Boundaries**:
   - Identify circular dependencies, layered architecture violations, and shared package imports.
4. **Synthesize Clean Visual Map**:
   - Produce a concise summary of symbols, caller chains, data flows, and architectural constraints.

## Output Format

```markdown
### 🗺️ Codebase Map: [Target Symbol / Module]

**Domain Context**: [Service/Package responsible for this logic]
**Location**: `path/to/definition.ts`

#### 🔗 Dependency & Call Chain
- **Ingress Entrypoints**:
  - `GET /api/v1/resource` -> `Controller.handleRequest()`
- **Core Orchestrator**:
  - `Service.executeBusinessLogic()`
- **Persistence & Egress**:
  - `Repository.save()` -> PostgreSQL Table: `resources`
  - Event Bus: Emits `ResourceCreatedEvent` -> Kafka Topic: `events.resource`

#### ⚠️ Impact & Coupling Analysis
- **Direct Consumers**: 4 services / 12 callers
- **Risk Level**: Low / Moderate / High (Shared Public API)
```
