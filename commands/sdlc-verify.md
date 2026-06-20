---
description: Phase 3 — Verify. Runs security-engineer always + performance-engineer when needs_performance_audit is true. Reads build-handoff.md for clean context.
argument-hint: "[feature-name]"
tools: Agent
model: sonnet
---

# /sdlc-verify — Phase 3: Verify

Security audit and performance validation. Reads the build handoff for a clean context window, then invokes security-engineer (always) and performance-engineer (scope-gated).

## Step 1: Load Handoff (Clean Context)

Read `./projects/<feature>/handoffs/build-handoff.md` as the FIRST step. This is the sole context source — do not carry forward the Build phase conversation history.

## Step 2: Read Scope

Read `./projects/<feature>/scope.json`:
- `needs_pentest` — whether security-engineer should run pentest section
- `needs_performance_audit` — whether to invoke performance-engineer

## Step 3: Invoke Agents

### Agent 1: security-engineer (ALWAYS)

```
Invoke: security-engineer
Context provided:
  - ./projects/<feature>/handoffs/build-handoff.md
  - ./projects/<feature>/implementation-log.md
  - ./projects/<feature>/scope.json (for needs_pentest flag)

The agent runs SAST, OWASP Top 10, dependency scan, and security headers check.
If needs_pentest: true — also runs DAST and penetration testing scenarios.
Output: ./projects/<feature>/docs/security-report.md
```

Wait for security-engineer to complete.

### Agent 2: performance-engineer (only when `needs_performance_audit: true`)

```
Invoke: performance-engineer
Context provided:
  - ./projects/<feature>/handoffs/build-handoff.md
  - ./projects/<feature>/implementation-log.md
  - ./projects/<feature>/grill-summary.md (for scale targets)

The agent runs profiling, benchmarking, and produces optimization recommendations.
Output: ./projects/<feature>/docs/performance-report.md
```

If `needs_performance_audit: false` — skip this agent entirely.

Wait for performance-engineer to complete (if invoked).

## Step 4: Display Completion

```
✅ Verify Phase Complete!

Agents invoked:
  1. security-engineer        → security-report.md  [always]
  2. performance-engineer     → performance-report.md  [if needs_performance_audit]

Artifacts:
  ./projects/<feature>/docs/
    ├── security-report.md
    └── performance-report.md  (if applicable)

Quality Gates:
  ✅ No Critical/High security findings unresolved
  ✅ OWASP Top 10 fully reviewed
  ✅ Dependency CVEs patched or accepted
  [✅ Performance within targets]  (if applicable)
```

## Step 5: Phase Gate

Prompt: **"Ready to Ship?"**

On confirm:
1. Run `/handoff` → store output at `./projects/<feature>/handoffs/verify-handoff.md`
2. Invoke `/sdlc-ship`

## Critical Rules

✅ Read `build-handoff.md` BEFORE spawning any agents — this is the only context source
✅ security-engineer ALWAYS runs — never skip
✅ performance-engineer ONLY runs when `needs_performance_audit: true`
✅ No reference to deleted agents: appsec-engineer, penetration-tester, qa-manual-tester, automation-qa-engineer
✅ All Critical/High findings must be resolved before advancing to Ship
