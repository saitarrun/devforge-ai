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

### STEP 2: Prompt — Publish PRD and create issues?

Display the scope.json content to the user:

```
✅ Plan phase complete!

Capability flags: [list from scope.json]
Slices decomposed: [count] slices
  • slice-0: [name] (prefactor)
  • slice-1: [name] (feature)
  • ...

Ready to publish PRD and create issues?
→ This will synthesize 01-prd.md and create one issue per slice.
→ Reply "yes" to proceed or provide feedback to revise the scope.
```

If user wants revisions, feed their feedback back to product-manager for a revised scope.json.

---

### STEP 3: On confirm — Synthesize PRD

Create `./projects/<feature-name>/docs/01-prd.md` from `grill-summary.md` + `scope.json`:

```markdown
# PRD — [Feature Name]

**Date**: [date]
**Status**: Draft

## Problem Statement
[From grill-summary: problem, urgency, prior attempts]

## Users & Personas
[From grill-summary: personas, pain points]

## Constraints
[From grill-summary: timeline, budget, technical constraints]

## Success Criteria (QUANTS)
[From grill-summary: measurable targets]

## Capability Flags
| Flag | Value |
|------|-------|
| has_ui | [true/false] |
| has_auth | [true/false] |
| has_mobile | [true/false] |
| needs_pentest | [true/false] |
| has_data_pipeline | [true/false] |
| needs_performance_audit | [true/false] |

## Slices

| ID | Name | Type | Layers |
|----|------|------|--------|
| slice-0 | [name] | prefactor | [layers] |
| slice-1 | [name] | feature | [layers] |
```

---

### STEP 4: Create issues (Linear MCP or fallback)

**If Linear MCP is available:**
1. Publish `01-prd.md` content as a Linear document
2. For each slice in `scope.json`, create a Linear issue:
   - Title: slice name
   - Description: slice layers + acceptance criteria derived from grill-summary
   - Label: `slice-0` → `prefactor`, others → `feature`
3. Rewrite `scope.json` — add `"linear_id": "SAI-XX"` to each slice entry

**If Linear MCP is unavailable:**
1. Write `./projects/<feature-name>/docs/issues.md`:
   ```markdown
   # Issues

   | id | name | type | status |
   |----|------|------|--------|
   | slice-0 | Project scaffold + health check | prefactor | todo |
   | slice-1 | [name] | feature | todo |
   ```
2. Rewrite `scope.json` — add `"issue_ref": "docs/issues.md#slice-N"` to each slice entry
3. Note in completion output: "Linear unavailable — issues written to docs/issues.md"

---

### STEP 5: Prompt — Ready to start Build?

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
✅ grill-summary.md MUST exist before PRD synthesis
✅ scope.json MUST be valid JSON before issue creation
✅ First slice MUST be type: prefactor
✅ scope.json is rewritten after issue creation to add linear_id or issue_ref
✅ /handoff runs before /sdlc-build begins
✅ User is prompted twice: before publishing PRD/issues, and before advancing to Build
