---
name: token-efficiency
description: Token conservation economics, bounded context-window pruning, AST structural query optimization, and high-precision prompt budget discipline.
version: 1.0.0
---

# Token Efficiency & Precision Engineering Skill

This skill enforces strict token conservation, prevents context-window bloat, and optimizes model invocation costs while maximizing code generation and diagnostic accuracy.

---

## 1. Token Conservation Hierarchy

When analyzing large codebases or executing multi-agent pipelines, follow the **Token Conservation Hierarchy**:

```
[Level 1: Semantic AST Query (Lowest Token Cost: ~50-200 Tokens)]
  ↳ Query code-review-graph or symbol definitions; avoid loading full files.
          ↓
[Level 2: Targeted Line-Range Slice (Minimal Cost: ~200-500 Tokens)]
  ↳ Read only the specific target function / interface lines (StartLine to EndLine).
          ↓
[Level 3: Compact Handoff Artifacts (Bounded Cost: ~500-1,500 Tokens)]
  ↳ Never pass entire conversation logs forward; distill decisions into clean markdown handoffs.
          ↓
[Level 4: Full File Reads (Cautious / Restricted: >2,000 Tokens)]
  ↳ Read entire files only when strictly required for syntax validation. Never read binary or vendor files.
```

---

## 2. The 5 Rules of High-Precision Token Economy

### Rule 1: Zero Redundant File Dumps
- Never re-read files already present in memory or referenced by previous steps.
- Prefer targeted inspection: fetch only the exact 30–50 lines of an implementation seam rather than the entire 2,000-line module.

### Rule 2: Handoff State Compaction
- At every phase boundary (`Plan -> Build -> Verify -> Ship -> Operate`), write a structured summary to `handoffs/<phase>-handoff.md`.
- Downstream agents **only read the handoff file**, resetting conversation token depth back to zero and avoiding exponential context degradation.

### Rule 3: Structural Search Over Greedy Grep
- Do not run unconstrained recursive text searches that dump thousands of matched lines into the context window.
- Filter queries with file extensions and directory boundaries (e.g. `apps/claims-engine/src/**/*.ts`).

### Rule 4: Compact Diff Chunks on Edits
- When modifying code, use targeted line replacements rather than rewriting entire files.

### Rule 5: Token-Aware Ralph Loop Circuit Breaker
- In the self-correction build loop, if a test fails:
  1. Extract only the specific failure stack trace (not the full 10,000-line test log).
  2. If an error persists after 3 focused attempts, trip the circuit breaker and request targeted user guidance rather than burning tokens in endless loops.

---

## 3. Token Efficiency Metric Checklist
- [ ] Context window initialized using distilled `handoff.md` instead of full chat transcript
- [ ] Codebase explored via AST call-graphs instead of bulk file reads
- [ ] Test failure outputs pruned to relevant assertion diffs
- [ ] Edits applied via surgical replacement chunks
