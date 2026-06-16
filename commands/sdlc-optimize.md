---
description: Performance optimization and profiling - identify bottlenecks, benchmark improvements
argument-hint: "[component] [metric]"
---

# /sdlc-optimize

Data-driven performance optimization with regression prevention.

## Usage

```
/sdlc-optimize "auth-service" "login-latency"
/sdlc-optimize "api" "memory-allocation"
```

## Process

1. **Performance Engineer** → Profile and find hotspots
2. **Analyze** → Flame graphs, call stacks, root cause
3. **Optimize** → Targeted changes (algorithmic, caching, parallelization)
4. **Benchmark** → Before/after comparison
5. **Verify** → Regression tests in CI

## Output

- Profiling results (hotspots identified)
- Optimization recommendation
- Benchmark results (% improvement)
- Regression test (prevents future slowdown)
- Implementation PR

See **skill-performance-optimization** for process details.
