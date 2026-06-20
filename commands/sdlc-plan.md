---
description: Phase 1 — Plan. Runs product-manager grill-me interview + slice decomposition, then publishes PRD and creates issues. Invokes exactly 1 agent.
argument-hint: <feature-description>
tools: Agent, AskUserQuestion
model: sonnet
---

# /sdlc-plan — Phase 1: Plan

Conduct the grill-me interview, emit `grill-summary.md` + `scope.json`, publish a PRD, and create one issue per slice. Uses exactly **1 agent**: `product-manager`.

## Usage

```
/sdlc-plan "add a login page"
/sdlc-plan "build a reporting dashboard"
```

---

## EXECUTION

### STEP 1: Invoke product-manager

```
Spawn: Agent({
  name: "product-manager",
  description: "Product Manager — grill-me interview + slice decomposition",
  prompt: "Feature request: <user's feature description>

  Conduct the full grill-me interview (Phase A–D). Do not skip any phase.
  After the interview resolves:
  1. Write ./projects/<feature-name>/grill-summary.md with the full interview transcript
  2. Decompose the feature into tracer bullet slices
  3. Write ./projects/<feature-name>/scope.json with capability_flags + slices array

  The first slice must always be type: prefactor (project scaffold + health check).
  Subsequent slices are type: feature named from the user's perspective.
  layers are derived from grill-me answers (has_ui → include 'ui', etc.)."
})
```

Wait for product-manager to complete. Verify:
- `./projects/<feature-name>/grill-summary.md` exists
- `./projects/<feature-name>/scope.json` exists and is valid JSON

---

### STEP 2: Wait for product-manager to complete PRD + issues

The product-manager agent handles the PRD gate, synthesis, and issue creation directly (Steps 5–6 in its process). Wait for it to complete.

Verify on completion:
- `./projects/<feature-name>/docs/01-prd.md` exists
- `scope.json` has `linear_id` or `issue_ref` on every slice

---

### STEP 3: Prompt — Ready to start Build?

```
✅ PRD published! [N] issues created.

Ready to start Build?
→ This will run /handoff (creating handoffs/plan-handoff.md) then invoke /sdlc-build.
→ Reply "yes" to proceed or "no" to pause here.
```

On confirm:
1. Run `/handoff` — stores compressed context at `./projects/<feature-name>/handoffs/plan-handoff.md`
2. Invoke `/sdlc-build`

---

## CRITICAL RULES

✅ Exactly 1 agent invoked (product-manager) — no business-analyst, no software-architect
✅ product-manager owns the full Plan output: grill-summary → scope.json → PRD → issues
✅ First slice MUST be type: prefactor
✅ scope.json is rewritten after issue creation to add linear_id or issue_ref
✅ /handoff runs before /sdlc-build begins
✅ User is prompted at the PRD gate (inside product-manager) and again before advancing to Build
