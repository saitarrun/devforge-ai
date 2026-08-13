---
description: Automated Root-Cause Analysis (RCA) and surgical fix engine for massive enterprise codebases (up to 1.5M+ files).
argument-hint: "<issue-description-or-error-trace> [--service <name>] [--auto-fix]"
---

# Automated Root Cause Analysis & Surgical Fix Command

This command conducts automated bisection, AST call-graph backtracking, and surgical remediation on massive, multi-million-file enterprise codebases without token bloat or blind file scans.

## Usage

```bash
/sdlc-diagnose "Claim deductible calculation failed on policy renewal"
/sdlc-diagnose "500 Internal Error on /claims/payout" --service claims-engine
/sdlc-diagnose "Underwriting rule timeout on high-risk auto policies" --auto-fix
```

## Process

1. **Domain & Subsystem Isolation**:
   - Isolates the responsible service/module out of 1.5M+ files using stack traces, logs, and package boundaries.
2. **AST & Call-Graph Traversal**:
   - Queries `code-review-graph` to build a structural execution chain from ingress controller down to the business calculation and database query.
3. **Reproducing Test Harness Construction**:
   - Synthesizes a deterministic failing test case matching the exact error conditions before any code is modified.
4. **Surgical Remediation (Ralph Loop)**:
   - Formulates ranked hypotheses, instruments the failure point, executes minimal patch updates, and verifies the fix against the regression suite.
5. **Blast-Radius Verification**:
   - Checks all dependent downstream modules to guarantee zero unintended side effects.

## Output Format

```markdown
### 🔍 Root Cause Analysis & Remediation Report

**Target Domain**: `apps/claims-engine/services/calculation.service.ts`
**Root Cause**: Precision truncation on line 142 during deductible calculation under high-deductible policy schema.

#### 🛠️ Surgical Remediation Applied
- **Test Harness**: `tests/unit/claims/deductible-calculation.spec.ts` (Reproduced & Passed)
- **Code Changes**: Modified `calculateNetPayout()` to use `BigNumber` decimal precision.
- **Blast-Radius Check**: Verified 6 dependent insurance services (Underwriting, Ledger, Billing).
- **Status**: ✅ All regression and contract tests passing.
```
