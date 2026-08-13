---
name: root-cause-analysis
description: Hyper-scale root cause analysis (RCA), bisection, call-tree backtracking, and automated surgical remediation across massive million-file enterprise repositories.
version: 1.0.0
---

# Hyper-Scale Root Cause Analysis & Automated Remediation Skill

This skill defines the methodology for pinpointing bugs, subtle edge cases, data corruptions, and performance degradations across massive (1,000,000+ files) enterprise codebases (such as Insurance, Banking, HealthTech, and ERP systems).

---

## 1. The Hyper-Scale Funnel Strategy (1.5M Files -> 1 File)

In a 1,500,000-file repository, full text search or naive scans will freeze and consume millions of tokens. Follow the **Hyper-Scale Funnel**:

```
[Level 1: Domain & Service Isolation] (1.5M files → ~500 files)
  ↳ Match error logs, stack traces, tenant IDs, or insurance claim IDs to the specific Domain Module (e.g. `apps/claims-engine`, `libs/underwriting-rules`)
          ↓
[Level 2: AST Knowledge Graph Traversal] (~500 files → ~20 files)
  ↳ Query `code-review-graph` / LSP for the exact Execution Seam & Call Stack (e.g., `calculateClaimDeductible()`)
          ↓
[Level 3: Delta & State Flow Backtracking] (~20 files → 1-3 files)
  ↳ Trace inputs, mutations, and database transaction queries to isolate the failing logic line
          ↓
[Level 4: Surgical Automated Remediation] (Exact lines modified)
  ↳ Run Ralph Loop: Generate test harness -> Verify repro -> Apply fix -> Run regression suite
```

---

## 2. Deep Root-Cause Backtracking (5-Whys for Enterprise Code)

When a complex failure occurs (e.g., *"Insurance claim calculation is off by $124.50 on policy renewal"*):

1. **Symptom Isolation**: Capture exact inputs (Policy schema, Claim items, State regulations) and actual vs expected output.
2. **Backtrack Execution Flow**:
   - Ingress API: What endpoint accepted the payload?
   - Validation & Middleware: Did any claim sanitization alter the numbers?
   - Domain Calculation Engine: Where does the deductible formula execute?
   - Persistence & Database State: Is a stale exchange rate or cached tier rule being queried?
3. **Isolate Root Cause**: Determine if the defect is:
   - *Code Logic Error* (e.g., rounding formula, boundary condition `<=` vs `<`).
   - *State Drift / Stale Cache* (e.g., Redis cache invalidation missing after policy update).
   - *Schema / Migration Inconsistency* (e.g., integer vs float precision mismatch).
   - *Race Condition / Concurrency Lock* (e.g., double claim submission without distributed lock).

---

## 3. Surgical Remediation & Safety Protocol

1. **Construct Minimal Reproducing Harness**:
   - Write an isolated unit or integration test recreating the exact claim payload before touching the production code.
2. **Impact & Blast Radius Query**:
   - Run `code_review_graph impact <target_file>` to verify all other dependent insurance services (underwriting, billing, payout ledger).
3. **Execute Minimal Targeted Fix**:
   - Modify only the offending code block. Preserve backwards compatibility for active policies.
4. **End-to-End Regression Verification**:
   - Run the dedicated regression test suite, typechecks, and contract tests to ensure no secondary breakages across the enterprise system.
