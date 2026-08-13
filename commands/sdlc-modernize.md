---
description: Industrial legacy system modernization, Strangler Fig migrations, monolith decoupling, and zero-downtime schema evolution.
argument-hint: "<legacy-module-or-path> [--pattern strangler|acl|dual-write] [--snapshot-tests]"
---

# Industrial Legacy Modernization & Migration Command

This command enables safe extraction, characterization testing, and modern decoupling of legacy monoliths, stored procedures, and outdated frameworks without downtime or breaking changes.

## Usage

```bash
/sdlc-modernize "legacy_policy_engine.c" --snapshot-tests  # Create Golden Master characterization tests
/sdlc-modernize src/monolith/claims/ --pattern strangler   # Generate Strangler Fig proxy & microservice slice
/sdlc-modernize "StoredProc_CalculatePremium" --pattern acl # Extract SQL procedure into typed domain service
```

## Process

1. **Golden Master Characterization**:
   - Synthesizes automated snapshot tests recording inputs and outputs across all legacy edge cases.
2. **Anti-Corruption Layer (ACL) Generation**:
   - Wraps legacy types, raw SQL, and global state behind clean, typed interface seams.
3. **Strangler Fig Routing Setup**:
   - Creates dual-write and shadow-traffic proxy configs for incremental traffic migration.
4. **Expand & Contract Database Evolution**:
   - Generates zero-downtime migration scripts and backfill background workers.

## Output Format

```markdown
### 🏛️ Legacy Modernization Plan: [Target Module]

**Modernization Strategy**: Strangler Fig with Anti-Corruption Layer (ACL)

#### 🧪 Golden Master Characterization Suite
- Generated `tests/characterization/legacy_policy.spec.ts` (100% snapshot parity on 500 test scenarios)

#### 🔌 Anti-Corruption Layer (ACL)
- Created `src/domain/policy/policy.adapter.ts` (Translates legacy database records into domain models)

#### 🔄 Dual-Write & Shadow Traffic Configuration
- Proxy Route: `POST /api/v2/policies` (Shadow compares Legacy vs New Engine)
- Zero-Downtime Migration: Expand-Contract schema migration written to `migrations/20260813_policy_v2.sql`
```
