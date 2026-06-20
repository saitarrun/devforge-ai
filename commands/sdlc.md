---
description: Master orchestrator for the complete 5-phase SDLC pipeline. Runs all phases sequentially with approval gates and handoffs between each phase. Organizes artifacts into handoffs/, docs/, and projects/ directories.
argument-hint: <feature-description> [--from <phase>] [--to <phase>]
---

# Master SDLC Orchestrator

This command runs the complete Software Development Lifecycle end-to-end with 5 phases, explicit approval gates between each phase, and handoff documents to keep context windows bounded.

## Usage

```bash
/sdlc "build a user authentication system"
/sdlc "add OAuth login" --from Plan --to Build
/sdlc --phase Build  # Re-run Build phase in isolation
```

## Phases

The orchestrator runs agents sequentially across 5 phases:

1. **Plan** → `/sdlc-plan` (product-manager: grill interview + scope.json + PRD + issues)
2. **Build** → `/sdlc-build` (ux-designer [if has_ui] + fullstack-engineer × slices + qa-engineer)
3. **Verify** → `/sdlc-verify` (security-engineer + performance-engineer [if needs_performance_audit])
4. **Ship** → `/sdlc-ship` (devops-engineer)
5. **Operate** → `/sdlc-operate` (sre-engineer + data-engineer [if has_data_pipeline])

**9 agents total** (product-manager, ux-designer, fullstack-engineer, qa-engineer, security-engineer, performance-engineer, devops-engineer, sre-engineer, data-engineer)

## Process

1. Parse feature request
2. Create `./projects/<feature-name>/` with `docs/`, `handoffs/` subdirectories
3. Run Plan phase → product-manager interviews + produces scope.json + PRD
4. **GATE**: "Ready to start Build?" → on confirm: run /handoff → `handoffs/plan-handoff.md` → invoke `/sdlc-build`
5. Build phase completes → **GATE**: "Ready to start Verify?" → on confirm: run /handoff → `handoffs/build-handoff.md` → invoke `/sdlc-verify`
6. Verify phase completes → **GATE**: "Ready to Ship?" → on confirm: run /handoff → `handoffs/verify-handoff.md` → invoke `/sdlc-ship`
7. Ship phase completes → **GATE**: "Ready to Operate?" → on confirm: run /handoff → `handoffs/ship-handoff.md` → invoke `/sdlc-operate`
8. Compile final summary

## Phase Transition Flow

```
/sdlc-plan
  └─ [GATE: "Ready to start Build?"]
       └─ /handoff → handoffs/plan-handoff.md
            └─ /sdlc-build
                 └─ [GATE: "Ready to start Verify?"]
                      └─ /handoff → handoffs/build-handoff.md
                           └─ /sdlc-verify
                                └─ [GATE: "Ready to Ship?"]
                                     └─ /handoff → handoffs/verify-handoff.md
                                          └─ /sdlc-ship
                                               └─ [GATE: "Ready to Operate?"]
                                                    └─ /handoff → handoffs/ship-handoff.md
                                                         └─ /sdlc-operate
```

## Handoff Mechanism

Each phase gate writes a handoff document summarising what was decided and built. The next phase reads that document as its very first step, establishing a clean context window before any agents are spawned. This keeps each phase's token budget bounded regardless of how many slices or retries the Build phase produced.

**Pattern**: phase completes → user confirms gate → `/handoff` writes `<phase>-handoff.md` → next phase command reads it → spawns agents.

No phase command carries the prior conversation history forward — only the handoff doc.

## Handoff Storage

```
./projects/<feature-name>/handoffs/
  plan-handoff.md     ← written after Plan gate    | read by sdlc-build
  build-handoff.md    ← written after Build gate   | read by sdlc-verify
  verify-handoff.md   ← written after Verify gate  | read by sdlc-ship
  ship-handoff.md     ← written after Ship gate    | read by sdlc-operate
```

## Output

All artifacts are organized into `./projects/<feature-name>/`:

**`docs/`** — Documentation and artifacts
- `grill-summary.md` — Product Manager grill interview transcript
- `scope.json` — Capability flags + tracer bullet slices
- `01-prd.md` — Product Requirements Document
- `implementation-log.md` — Per-slice build log
- `06-slo.md` — SLOs, error budgets, runbooks (Operate phase)

**`handoffs/`** — Phase handoff documents (one per gate)

## Gates (Approval Points)

Each phase requires explicit user approval before proceeding. The gate prompt runs `/handoff` automatically on confirmation — no silent auto-advance.

- Plan → Build: "Ready to start Build?"
- Build → Verify: "Ready to start Verify?"
- Verify → Ship: "Ready to Ship?"
- Ship → Operate: "Ready to Operate?"

## Scope-Gating

Agents are invoked conditionally based on `scope.json` capability flags:

- `has_ui: true` → ux-designer runs in Build phase
- `needs_pentest: true` → security-engineer runs pentest section in Verify phase
- `needs_performance_audit: true` → performance-engineer runs in Verify phase
- `has_data_pipeline: true` → data-engineer runs in Operate phase

## Success Criteria

✓ All 5 phases execute successfully
✓ Every phase reads its handoff doc before spawning agents
✓ User approves at each gate — no silent auto-advance
✓ No phase skipped without explicit user request
✓ A `handoffs/` directory with one file per completed gate
