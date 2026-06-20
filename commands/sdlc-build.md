---
description: Phase 2 — Build. Reads plan-handoff.md, optionally runs ux-designer (has_ui gate), then loops fullstack-engineer over each slice with ralph-loop self-correction, then runs qa-engineer for E2E tests.
argument-hint: "[feature-name]"
tools: Agent
model: sonnet
---

# /sdlc-build — Phase 2: Build

Implements the feature slice-by-slice using the tracer bullet pattern. Each slice is a vertical cut through all required layers (schema → API → UI → tests), verified before the next begins.

## Agents Invoked

- `ux-designer` — once before the slice loop (only when `has_ui: true`)
- `fullstack-engineer` — once per slice (Slice 0 + all feature slices)
- `qa-engineer` — once after all slices complete
- Ralph Loop skill applied at each fullstack-engineer invocation

---

## STEP 1: Read Handoff (Clean Context Window)

**Read `./projects/<feature>/handoffs/plan-handoff.md` before doing anything else.**

This document contains the distilled context from the Plan phase — grill-summary decisions, scope.json snapshot, and the slice decomposition. Loading it first ensures the Build phase starts with a bounded, fresh context window rather than carrying the entire Plan conversation forward.

---

## STEP 2: Read scope.json

Read `./projects/<feature>/scope.json` to extract:
- `capability_flags.has_ui` — controls whether ux-designer runs
- `capability_flags.has_auth`, `has_mobile`, `has_data_pipeline` — inform fullstack-engineer context
- `slices[]` — the ordered build plan: `[{id, name, type, layers, linear_id?}]`

The first slice is always `"type": "prefactor"`. All subsequent slices are `"type": "feature"`.

---

## STEP 3: UX Design (scope-gated on `has_ui`)

**If `has_ui: true`:**

Invoke `ux-designer` **once** before any slice begins:

```
Agent: ux-designer
Context:
  - ./projects/<feature>/grill-summary.md
  - ./projects/<feature>/scope.json (full slices list)
  - ./projects/<feature>/handoffs/plan-handoff.md

Output: ./projects/<feature>/docs/ux-design.md
  - Wireframes for all UI slices
  - Component specs and design tokens
  - User flow diagrams
  - Interaction states (loading, error, empty, success)
```

ux-designer runs exactly once — not per slice. All subsequent fullstack-engineer invocations reference `ux-design.md`.

**If `has_ui: false`:** Skip ux-designer entirely. No invocation, no artifact.

---

## STEP 4: Slice 0 — Prefactor (with Ralph Loop)

Slice 0 scaffolds the project so subsequent feature slices have a working foundation to build on.

**Context bundle for this invocation:**
```
- ./projects/<feature>/handoffs/plan-handoff.md   ← clean phase context
- ./projects/<feature>/grill-summary.md            ← feature context
- scope.json slice entry: { "id": "slice-0", "name": "...", "type": "prefactor", "layers": [...] }
- implementation-log.md: does not exist yet — agent creates it
- [ux-design.md if has_ui]
```

**Invoke `fullstack-engineer`** with the above bundle. The agent must:
1. Scaffold project structure based on declared `layers`
2. Write a health check endpoint (API) or equivalent
3. Write passing smoke tests
4. Create `./projects/<feature>/implementation-log.md` with the first entry:
   ```
   ## slice-0: <name>
   - Files created/modified: <list>
   - Endpoints added: <list>
   - Tables migrated: <list>
   - Tests written: <list>
   ```

### Ralph Loop — Inner Loop for Slice 0

Load the `ralph-loop` skill. Apply it:

**Sentinel checks (before verification gateway):**
- Spec drift: do the files created match the `layers` field? (e.g., if layers=["api","tests"] only, no UI files should exist)
- If sentinel fires: flag the drift to the user before proceeding

**Verification gateway:**
```bash
npm run typecheck   # or equivalent for the project stack
npm test            # slice-specific tests only
```

**If pass:** advance to user gate.

**If fail:** retry with fresh context (max 2 retries):
```
Fresh context bundle on retry:
  - handoffs/plan-handoff.md
  - grill-summary.md
  - slice-0 entry from scope.json
  - implementation-log.md (current state)
  - FAILURE OUTPUT pinned at the top of the prompt
  (does NOT include previous attempt's reasoning or conversation history)
```

**Circuit breaker:** If 2 retries exhausted and still failing → surface failure to user with:
```
⚠️ Ralph Loop circuit breaker fired on Slice 0
Failure: [test/typecheck output]
Next step: Review the failure and decide how to proceed.
```
Halt until user responds.

### Slice 0 Gate

After Slice 0 passes verification:

```
✅ Slice 0 complete: <slice name>

implementation-log.md created.
Files scaffolded: <count>
Tests passing: ✅

Review ./projects/<feature>/implementation-log.md
Ready to start feature slices? [y/N]
```

On confirm: proceed to Step 5.
On deny: halt.

---

## STEP 5: Feature Slice Loop (with Ralph Loop)

For each slice in `scope.json` where `"type": "feature"` (slice-1, slice-2, …), in order:

**Context bundle per invocation:**
```
- ./projects/<feature>/handoffs/plan-handoff.md   ← clean phase context
- ./projects/<feature>/grill-summary.md            ← feature context
- scope.json slice entry for slice-N               ← what to build (layers + linear_id)
- ./projects/<feature>/implementation-log.md       ← what prior slices already built
- [./projects/<feature>/docs/ux-design.md if has_ui]
```

**Invoke `fullstack-engineer`** with the above bundle. The agent must:
1. Read implementation-log.md first — do not duplicate what previous slices built
2. Implement only the layers declared in `layers` for this slice
3. Write tests for this slice's behavior
4. Append to implementation-log.md

Apply the same Ralph Loop inner loop:
- Sentinel checks (spec drift + context drift)
- Verification: typecheck + this slice's tests
- Max 2 retries on failure; circuit breaker fires after 2nd failure

Feature slices run **sequentially without intermediate user gates**.

If `linear_id` is set on the slice, the fullstack-engineer should note the issue reference in implementation-log.md.

---

## STEP 6: QA Engineer (Post-loop E2E)

After the **last feature slice** completes and before the Build gate:

**Invoke `qa-engineer`** once:

```
Agent: qa-engineer
Context:
  - ./projects/<feature>/implementation-log.md  ← full picture of everything built
  - ./projects/<feature>/grill-summary.md
  - ./projects/<feature>/scope.json
  - [./projects/<feature>/docs/ux-design.md if has_ui]

Task:
  - Write cross-slice E2E tests covering flows that span multiple slices
  - Cover the full user journeys described in grill-summary.md
  - Output: ./projects/<feature>/tests/e2e/
  - Write qa-failures.md IF any E2E flows fail (empty = all pass)
```

### Outer Loop (if E2E failures exist)

If `qa-failures.md` is non-empty:

1. Read `qa-failures.md` to identify which slice(s) caused the failures
2. Re-enter the Ralph Loop inner loop for ONLY the flagged slices:
   - Fresh context bundle + E2E failure output pinned at top
   - Max 1 outer retry per flagged slice
3. After retry, re-run qa-engineer
4. If still failing after 1 outer retry: surface to user:
   ```
   ⚠️ Outer loop circuit breaker fired
   Failing slices: [list]
   qa-failures.md: [contents]
   Escalating to user — manual intervention required.
   ```

---

## STEP 7: Build Complete Gate

Display:

```
✅ Build Phase Complete

Feature: <feature-name>
Slices built: N (1 prefactor + N-1 feature)
[ux-designer: ran / skipped]

Implementation log: ./projects/<feature>/implementation-log.md
E2E tests: ./projects/<feature>/tests/e2e/
QA result: ✅ all passing / ⚠️ see qa-failures.md

Agents invoked:
  [ux-designer × 1]  ← only if has_ui
  fullstack-engineer × N (with ralph-loop)
  qa-engineer × 1

Ready to start Verify? [y/N]
```

On confirm:
1. Run `/handoff` → write `./projects/<feature>/handoffs/build-handoff.md`
2. Invoke `/sdlc-verify`

On deny: halt.

---

## CRITICAL RULES

✅ Read `plan-handoff.md` BEFORE any agent is invoked — no exceptions
✅ ux-designer runs EXACTLY ONCE per `/sdlc-build` run (not per slice)
✅ Slice 0 (prefactor) ALWAYS runs first and requires explicit user approval before feature slices begin
✅ Feature slices run sequentially — each fullstack-engineer invocation reads the accumulated `implementation-log.md`
✅ Ralph Loop inner loop: max 2 retries per slice; circuit breaker fires on 3rd failure
✅ Ralph Loop outer loop: max 1 retry for flagged slices after qa-engineer E2E failures
✅ qa-engineer runs EXACTLY ONCE per `/sdlc-build` run (after all feature slices)
✅ On retry: fresh context only — no carry-over of previous attempt's reasoning
