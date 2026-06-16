---
description: Release planning and rollout - versioning, staging, gradual deployment, rollback
argument-hint: "[version] [scope]"
---

# /sdlc-release

Safe, coordinated releases with canary-first rollout and instant rollback.

## Usage

```
/sdlc-release "v2.1.0" "feature-x, bug-fix-y"
/sdlc-release "v1.0.1" "security-patch"
```

## Process

1. **Release Manager** → Plan release (scope, timeline, risk)
2. **Validate** → All pre-release checks pass
3. **Canary** (5%, 30 min) → Monitor, proceed or rollback
4. **Gradual** (25% → 50% → 75%, each 1h) → Check metrics
5. **Full** (100%, 4h) → On-call watches

## Output

- Release plan (scope, timeline, risk)
- Pre-release checklist (all green)
- Release notes (features, breaking changes, migration)
- Rollout status (real-time)
- Rollback procedure (if needed)

See **skill-release-management** for rollout strategy details.
