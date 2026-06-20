---
name: ralph-loop
description: Self-diagnosing, self-correcting agent loop for Build phase. Defines DoD checking, inner/outer loop retry logic, circuit breakers, and sentinel health checks.
version: 1.0.0
---

# Ralph Loop Skill

A reusable self-diagnosing, self-correcting execution loop for the Build phase. Loaded by `sdlc-build.md` and `sdlc-implement.md`. Keeps token windows bounded by pinning only essential context on retries and routing targeted re-work rather than re-running everything.

---

## Concepts

| Term | Definition |
|------|-----------|
| **DoD** | Definition of Done — the acceptance criteria for a slice, taken from its `scope.json` entry |
| **Slice** | One independently verifiable unit of work (a row in `scope.json.slices[]`) |
| **Inner loop** | Per-slice retry logic; runs inside the Build phase for each slice |
| **Outer loop** | Per-phase retry logic; runs once after qa-engineer's E2E pass |
| **Sentinel** | Lightweight health check that runs *before* the verification gateway to catch drift early |
| **Circuit breaker** | Hard limit on retries; surfaces failure to user rather than looping forever |
| **Fresh context** | Stripped-down context bundle assembled for each retry — no prior attempt reasoning |

---

## Inner Loop (per-slice)

Runs for every slice in `scope.json.slices[]`, in order.

```
┌─────────────────────────────────────────────────────┐
│  SLICE N  ─  inner loop                             │
│                                                     │
│  1. Load DoD from scope.json slice entry            │
│  2. Assemble context bundle (see below)             │
│  3. SENTINEL CHECK ──► drift? → flag user, abort    │
│  4. fullstack-engineer executes slice               │
│  5. VERIFICATION GATEWAY                            │
│       run: typecheck + slice-scoped tests           │
│       PASS ──► append to implementation-log.md      │
│               advance to next slice                 │
│       FAIL ──► retry_count += 1                     │
│               retry_count ≤ 2? ──► reassemble       │
│                                     fresh context   │
│                                     goto step 3     │
│               retry_count > 2? ──► CIRCUIT BREAKER  │
│                                     surface to user │
└─────────────────────────────────────────────────────┘
```

### Context Bundle (normal invocation)

Assembled once at the start of each slice:

- `handoffs/plan-handoff.md` — clean phase context (written at Plan gate)
- `grill-summary.md` — feature context and personas
- The slice's own entry from `scope.json` (id, name, type, layers, linear_id)
- `implementation-log.md` — what all previous slices built (read-only here)

### Fresh Context Bundle (retry)

Assembled fresh for each retry attempt — **no prior attempt reasoning, no prior conversation history**:

- `handoffs/plan-handoff.md`
- `grill-summary.md`
- The slice's own entry from `scope.json`
- `implementation-log.md` (updated through the previous slice, not this one)
- **Failure output pinned at the top** — exact typecheck / test failure message from the last attempt

### Circuit Breaker (inner)

After 2 retries exhausted and verification still failing:

1. Stop the loop immediately
2. Report to user:
   - Which slice failed (`id`, `name`)
   - The exact failure output from the last attempt
   - What was attempted (retry count, context used)
3. Await user decision — do not advance to the next slice

---

## Sentinel (health check)

Runs **before** the verification gateway on every attempt (first run and retries). Checks for two forms of drift before wasting a full test run.

### Context Drift

**Signal**: The `implementation-log.md` entry written for this slice is significantly shorter or vaguer than the entries written by previous slices.

**Detection heuristic**: If the new entry is <50% the word count of the median of all previous entries, or contains no file paths, no test counts, and no endpoint names — flag as context drift.

**Action**: Flag to user before retrying. Include the new entry and the median previous entry for comparison. Do not auto-retry on context drift — it usually means the agent lost the plot.

### Spec Drift

**Signal**: Code written during execution does not match the `layers` declared in the slice entry.

**Examples**:
- Slice declares `"layers": ["schema", "api"]` but UI components were created
- Slice declares `"layers": ["ui", "tests"]` but migrations were written
- Slice declares `"layers": ["tests"]` but new business logic was introduced

**Detection**: After execution but before running tests, diff newly created/modified files against the declared `layers`:
- `schema` → expects changes in `migrations/`, `models/`, schema files only
- `api` → expects changes in `controllers/`, `routes/`, `services/` only
- `ui` → expects changes in `components/`, `pages/`, frontend `src/` only
- `tests` → expects changes in `*.test.*`, `*.spec.*`, `e2e/` only

**Action**: Flag spec drift to user with a summary of what layers were touched vs. declared. Allow user to confirm before running tests (false positives are possible on scaffold slices).

---

## Outer Loop (per-phase)

Runs **once**, after all feature slices complete and qa-engineer finishes its E2E pass.

```
┌─────────────────────────────────────────────────────┐
│  OUTER LOOP  ─  post-qa                             │
│                                                     │
│  1. qa-engineer runs E2E tests across all slices    │
│  2. All pass? ──► advance to Build gate             │
│  3. Some fail? ──► qa-engineer flags failing slices │
│  4. Targeted retry: only flagged slices re-enter    │
│       inner loop with E2E failure as feedback       │
│       (outer_retry_count = 1)                       │
│  5. After targeted retry, qa-engineer re-runs E2E   │
│  6. All pass? ──► advance to Build gate             │
│     Still failing? ──► CIRCUIT BREAKER              │
│                        surface to user              │
└─────────────────────────────────────────────────────┘
```

### Targeted Retry Context

For each flagged slice in the outer loop retry, the fullstack-engineer receives fresh context (same bundle as inner loop fresh context) with the E2E failure output for that slice's flows pinned at the top. Slices not flagged by qa-engineer are not re-run.

### Circuit Breaker (outer)

After 1 outer retry still failing:

1. Stop the outer loop
2. Report to user:
   - Which slices still have failing E2E tests
   - The exact E2E failure output
   - Which flows are broken (qa-engineer's summary)
3. Await user decision — do not proceed to Verify phase

---

## implementation-log.md Format

Each slice appends one entry after passing the verification gateway:

```markdown
## slice-N: <name>

- Files created/modified: path/to/file.ts, path/to/other.ts
- Endpoints added: POST /api/resource, GET /api/resource/:id
- Tables migrated: users, sessions
- Tests written: 12 unit tests, 3 integration tests
- Layers touched: schema, api
```

Slice 0 (prefactor) creates the file with its entry. All subsequent slices append. The file is read-only during a slice's execution and writable only after its verification gateway passes.

---

## Applying This Skill — Checklist

When loading ralph-loop into a command or agent, verify:

- [ ] `scope.json` is present and `slices` array is non-empty
- [ ] `grill-summary.md` exists (Plan phase artifact)
- [ ] `handoffs/plan-handoff.md` exists (written at Plan gate)
- [ ] Inner loop is applied per-slice in `slices[]` order
- [ ] Sentinel runs before verification gateway on every attempt
- [ ] implementation-log.md is initialized by Slice 0 before feature slices begin
- [ ] Each slice receives only its own `scope.json` entry, not the full array
- [ ] Retry context is assembled fresh — no prior attempt reasoning
- [ ] Circuit breaker fires after 2 inner retries (not 3, not unlimited)
- [ ] Outer loop runs exactly once after qa-engineer's E2E pass
- [ ] Outer loop circuit breaker fires after 1 outer retry
- [ ] User is surfaced control at every circuit breaker — never auto-escalate or auto-skip

---

## Integration Points

| Command | How ralph-loop is used |
|---------|----------------------|
| `sdlc-build.md` | Wraps the fullstack-engineer invocation for each slice in the inner loop; runs outer loop after qa-engineer |
| `sdlc-implement.md` | Runs inner loop only (single slice / single spec); no outer loop (no qa-engineer phase) |
