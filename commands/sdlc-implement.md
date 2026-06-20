---
description: Standalone issue implementation with Ralph Loop — implements a single Linear issue or free-form spec using fullstack-engineer + self-correcting retry loop.
argument-hint: <LINEAR-ID or "free-form spec">
tools: Agent, Read, Bash
model: sonnet
---

# /sdlc-implement — Standalone Issue Implementation

Implements a single Linear issue or free-form spec using `fullstack-engineer` + the `ralph-loop` skill for self-correcting retry logic. Works independently of the full `/sdlc` pipeline.

## Usage

```bash
/sdlc-implement SAI-41                          # Linear mode: reads issue from Linear
/sdlc-implement "add JWT refresh token logic"   # Free-form mode: infers DoD from spec
```

---

## STEP 1: Detect Input Mode

Inspect the argument:

- If it matches the pattern `[A-Z]+-[0-9]+` (e.g. `SAI-41`, `LIN-123`) → **Linear mode**
- Otherwise → **Free-form mode**

---

## STEP 2: Read Spec + Extract DoD

### Linear Mode

Use the Linear MCP to fetch the issue:

```
mcp__linear-server__get_issue({ id: "<ARGUMENT>" })
```

Extract from the response:
- **Title** — used as the commit subject
- **Description** — full context for the engineer
- **Acceptance criteria** — the checklist under "## Acceptance criteria" or "## DoD" becomes the Definition of Done

If no explicit AC section exists, infer DoD from the description: turn each "should", "must", or imperative statement into a checkbox.

### Free-Form Mode

The argument string is the spec. Infer DoD by breaking the spec into verifiable outcomes:

- What file(s) should exist or change?
- What behaviour should be observable?
- What should typecheck + tests confirm?

Write the inferred DoD as a checklist (3–5 items minimum).

---

## STEP 3: Load Ralph Loop Skill

Read `skills/ralph-loop/SKILL.md` to load the self-correcting loop methodology into context before invoking the engineer.

---

## STEP 4: Invoke fullstack-engineer

Spawn the `fullstack-engineer` agent with the following context:

```
Spawn: Agent({
  name: "fullstack-engineer",
  description: "Implement: <title or spec summary>",
  prompt: "
    ## Spec
    <full issue description or free-form spec>

    ## Definition of Done
    <DoD checklist extracted in Step 2>

    ## Instructions
    Implement the spec above. Apply the ralph-loop skill:

    ### Inner Loop (apply per implementation attempt)
    1. Run sentinel checks before verifying:
       - Context drift: are you still addressing the full spec?
       - Spec drift: are you writing code outside the declared scope?
    2. Implement the changes.
    3. Verification gateway:
       - Run typecheck: `npm run typecheck` or `tsc --noEmit` (adapt to project)
       - Run relevant tests: `npm test` or equivalent
    4. If all checks pass → DoD satisfied, stop.
    5. If checks fail → retry with fresh context:
       - Re-read the spec + DoD
       - Pin the failure output at the top of your reasoning
       - Do NOT carry forward previous reasoning
       - Max 2 retries. If still failing after 2 retries → stop and surface failure.

    ### Circuit Breaker
    After 2 failed retries: report what failed, what you tried, and what the blocking error is.
    Do not attempt further changes — surface to the user.
  "
})
```

Wait for `fullstack-engineer` to complete.

---

## STEP 5: Evaluate DoD

After the engineer completes, check each DoD item:

- [ ] All acceptance criteria satisfied?
- [ ] Typecheck passes?
- [ ] Relevant tests pass?
- [ ] No unintended files modified outside the spec scope?

If the circuit breaker fired (2 retries exhausted), report the failure and stop — do not proceed to review or commit.

---

## STEP 6: Run /review

If DoD is satisfied, run `/review` scoped to the changed files:

```bash
# Identify changed files
git diff --name-only HEAD

# Review surfaces any correctness or quality issues
/review
```

If review surfaces blocking issues, surface them to the user before committing.

---

## STEP 7: Commit

Commit all changes to the current branch.

**Commit message format:**

- **Linear mode**: Use the issue title verbatim as the subject line, followed by the issue ID in the footer.
  ```
  <Issue title>

  Closes <ISSUE-ID>
  ```
- **Free-form mode**: Use a concise imperative summary of the spec as the subject line.
  ```
  <imperative summary of spec>
  ```

No "Co-Authored-By", "Generated with", or AI attribution lines.

```bash
git add <changed files>
git commit -m "<subject>"
```

---

## Completion Output

```
✅ /sdlc-implement complete

Mode: <Linear | Free-form>
Issue: <ID and title, or spec summary>

DoD satisfied:
  ✅ <criterion 1>
  ✅ <criterion 2>
  ...

Files changed:
  <list of modified/created files>

Commit: <short hash> — <subject>
```

---

## Error Output (Circuit Breaker)

```
❌ /sdlc-implement: circuit breaker fired after 2 retries

Spec: <title or summary>

Last failure:
  <typecheck / test failure output>

What was tried:
  Attempt 1: <brief description>
  Attempt 2: <brief description>

Action required: Review the failure above and either clarify the spec or fix the blocking issue manually.
```

---

## Rules

- Load `ralph-loop` skill before invoking the engineer — it is not optional
- Typecheck + tests must pass before DoD is declared satisfied
- Do not retry more than 2 times — surface failures, don't loop silently
- Do not commit if DoD is not satisfied
- Do not add AI attribution to commits
