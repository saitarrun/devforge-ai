---
description: Generate and run multi-tiered enterprise test suites (Unit, Integration, E2E, Contract, Load/k6, Chaos, and Fuzz testing).
argument-hint: "[--suite unit|integration|e2e|contract|perf|chaos|fuzz|all] [--target <path>]"
---

# Enterprise Test Suite Generation & Execution Command

This command allows developers and agents to scaffold, generate, and run specialized multi-tier test suites across every layer of the application.

## Usage

```bash
/sdlc-test --suite unit                  # Run fast unit test suite with coverage
/sdlc-test --suite integration           # Run Testcontainers database and queue integration tests
/sdlc-test --suite contract              # Validate Pact / OpenAPI consumer contracts
/sdlc-test --suite e2e                   # Execute Playwright browser workflows
/sdlc-test --suite perf                  # Run k6 load, spike, and latency benchmark tests
/sdlc-test --suite chaos                 # Execute fault injection and network latency tests
/sdlc-test --suite fuzz                  # Run property-based security fuzzing
/sdlc-test --suite all                   # Execute full enterprise verification matrix
/sdlc-test --suite perf --target claims  # Scaffold load test specifically for claims service
```

## Process

1. **Test Matrix Resolution**:
   - Identifies target layers (Database, HTTP API, Browser UI, Queue, or Distributed Cluster).
2. **Deterministic Harness Setup**:
   - Spins up ephemeral test dependencies via Testcontainers or mock servers (MSW).
3. **Execution & Metric Assertion**:
   - Evaluates test outcomes, code coverage (>80%), p95 latency thresholds, and circuit-breaker tripping.
4. **Comprehensive Reporting**:
   - Emits structured pass/fail reports with trace artifacts, flamegraphs, and coverage heatmaps.

## Output Format

```markdown
### 🧪 Enterprise Test Matrix Execution Report

| Suite | Runner | Tests | Status | Key Metric / SLA |
|---|---|---|---|---|
| **Unit** | Vitest | 142 | ✅ Passed | 88.4% Branch Coverage |
| **Integration** | Testcontainers (Postgres + Redis) | 38 | ✅ Passed | 0 Stale Connections |
| **Contract** | Pact Broker | 12 | ✅ Passed | 100% Schema Parity |
| **E2E** | Playwright | 15 | ✅ Passed | Zero UI Regressions |
| **Load (Perf)** | k6 | 5,000 reqs | ✅ Passed | p95 Latency: 42ms (Budget: <100ms) |
| **Chaos** | Fault Injection | 4 Scenarios | ✅ Passed | DB Failover Recovered in 1.2s |
| **Fuzzing** | Fast-Check | 10,000 runs | ✅ Passed | 0 Uncaught Exceptions |
```
