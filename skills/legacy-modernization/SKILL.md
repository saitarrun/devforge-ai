---
name: legacy-modernization
description: Industrial legacy code modernization, strangler fig migration, monolith decoupling, schema evolution without downtime, and reverse-engineering undocumented codebases.
version: 1.0.0
---

# Industrial Legacy Code Modernization & Migration Skill

This skill defines the strategy for safely refactoring, decoupling, and migrating mission-critical legacy systems (e.g., COBOL backends, 15-year-old monoliths, stored-procedure-heavy databases, PHP/Java EE stacks, and undocumented C++/C# engines) without production outages.

---

## 1. The Strangler Fig Modernization Pattern

Never attempt a "Big Bang" rewrite of an industrial legacy application. Always use the **Strangler Fig Pattern**:

```
[Phase 1: Ingress Interception & Routing Proxy]
  ↳ Direct traffic through an API gateway / reverse proxy (Envoy / Cloudflare / Nginx).
          ↓
[Phase 2: Shadow Traffic & Dark Launching]
  ↳ Duplicate live production requests to both the Legacy System and the Modern Microservice.
  ↳ Compare responses; assert 100% data equality (diff assertions) without returning modern output to clients yet.
          ↓
[Phase 3: Incremental Traffic Shifting]
  ↳ Route 1% → 10% → 50% → 100% of read traffic to the new service.
          ↓
[Phase 4: Legacy Strangling & Decommissioning]
  ↳ Decommission the legacy code path once all mutations and reads are fully migrated.
```

---

## 2. Reverse-Engineering Undocumented Legacy Code

When dealing with 100k+ lines of undocumented legacy spaghetti code:

1. **Golden Master Characterization Testing**:
   - Before editing a single line, record input/output snapshots of the legacy system across hundreds of real-world scenarios.
   - Lock down behavior with automated characterization test suites.
2. **Extract Seams & Anti-Corruption Layers (ACL)**:
   - Introduce an **Anti-Corruption Layer (ACL)** between legacy data structures and modern domain models to prevent legacy naming/type pollution.
3. **Database Stored-Procedure Extraction**:
   - Extract raw SQL triggers, cursors, and stored procedures into explicit, version-controlled domain services.

---

## 3. Zero-Downtime Database Migration (Expand & Contract)

When modifying legacy schemas touching millions of production records:

```
[Step 1: Expand]
  ↳ Add new column/table in parallel; do NOT drop or alter existing legacy columns.
          ↓
[Step 2: Dual Write]
  ↳ Application writes to BOTH legacy and new schemas simultaneously; reads still from legacy.
          ↓
[Step 3: Backfill]
  ↳ Run background batch migration job to sync historical records into the new schema.
          ↓
[Step 4: Switch Reads]
  ↳ Switch application reads to the new schema.
          ↓
[Step 5: Contract]
  ↳ Stop writing to the old schema; safely drop deprecated columns/tables after 30 days.
```

---

## 4. Legacy Migration Checklist
- [ ] Characterization snapshot tests written before refactoring
- [ ] Anti-Corruption Layer (ACL) isolates legacy models from new code
- [ ] Database migration uses Expand/Contract (zero table locking)
- [ ] Shadow traffic diff comparison passes with 0 discrepancy
- [ ] Rollback switch/feature flag active in API Gateway
