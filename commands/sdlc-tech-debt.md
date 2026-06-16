---
description: Tech debt paydown and strategic refactoring - prioritize improvements
argument-hint: "[service] [impact]"
---

# /sdlc-tech-debt

Systematic tech debt management and strategic paydown.

## Usage

```
/sdlc-tech-debt "auth-service" "remove-python-2-support"
/sdlc-tech-debt "api" "refactor-shared-utilities"
```

## Process

1. **Tech Lead** → Audit tech debt
2. **Prioritize** → Effort × Impact matrix
3. **Plan** → Schedule into sprint (10% capacity)
4. **Execute** → Track paydown
5. **Measure** → ROI (velocity unblocked, bugs prevented)

## Output

- Tech debt inventory (critical/high/medium/low)
- Prioritized paydown plan
- ROI analysis (unblocks what?)
- Deprecation timeline (if applicable)
- Implementation plan

See **skill-tech-debt** for prioritization details.
