---
description: Phase 4 — Testing & Security. Spawns qa-manual-tester, automation-qa-engineer, appsec-engineer, penetration-tester, performance-engineer.
argument-hint: "[--layer unit|integration|e2e|all] [--run] [--coverage-gap]"
tools: Agent
model: haiku
---

# /sdlc-test — Phase 4: Testing & Security Auditing

Comprehensive testing and security auditing: unit tests, integration tests, E2E tests, SAST scanning, penetration testing, and performance profiling.

## Agents Invoked (5 total)

**Execution order:**
1. qa-manual-tester (needs frontend + backend code)
2. automation-qa-engineer (needs qa-manual-tester test cases)
3. appsec-engineer (parallel with automation-qa, needs backend code)
4. penetration-tester (waits for automation + appsec)
5. performance-engineer (parallel with others, needs all code)

---

## Agent Invocation

### Read Phase 3 Artifacts First
- Implementation code (frontend, backend, mobile)
- `03-implementation.log` — what was built
- `01-requirements.md` — user stories + acceptance criteria

---

**Agent 1: qa-manual-tester** (FIRST)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "QA Manual Tester (Phase 4) — Manual test cases + exploratory testing",
  prompt: "[03-implementation.log + 01-requirements.md + frontend/backend code]
  
  Skills: skill-testing, skill-code-quality, skill-playwright
  
  Using requirements + implementation:
  1. Create manual test cases:
     - One test case per user story
     - Happy path (normal flow)
     - Error paths (invalid input, network errors)
     - Edge cases (boundary values, max inputs)
     - Cross-browser scenarios (Chrome, Safari, Firefox)
  
  2. Create ./projects/<feature-name>/docs/04-test-cases.md with:
     - Test case matrix (story, test case, steps, expected result)
     - Critical user paths (must test manually):
       - Login
       - Create account
       - Purchase flow
       - etc.
     - Known issues + limitations
  
  3. Execute exploratory testing:
     - Find edge cases not in requirements
     - Test on real devices (mobile testing)
  
  Output: ./projects/<feature-name>/docs/04-test-cases.md"
})
```

**Wait for qa-manual-tester to complete (BLOCKS automation-qa-engineer).**

---

**NOW SPAWN IN PARALLEL (Group 1: Automation + Security):**

**Agent 2: automation-qa-engineer** (PARALLEL — needs test cases)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "Automation QA Engineer (Phase 4) — Unit + integration + E2E tests",
  prompt: "[04-test-cases.md + implementation code + 01-requirements.md]
  
  Skills: skill-testing, skill-tdd, skill-code-quality, skill-playwright
  
  Using manual test cases + implementation:
  1. Implement Testing Pyramid (70% unit, 20% integration, 10% E2E):
  
  2. Unit tests (70%):
     - Jest for backend (controllers, services, models)
     - React Testing Library for frontend components
     - >80% code coverage (branches + lines)
     - Fast (<1s per test)
     - Independent (no test order dependency)
  
  3. Integration tests (20%):
     - Backend: API + database integration
       - Test endpoints with real DB
       - Test business logic workflows
     - Frontend: Components + API client
       - Mock API, test user interactions
  
  4. E2E tests (10%):
     - Playwright/Cypress for critical paths:
       - Login flow
       - Create resource flow
       - Delete resource flow
     - Test on real deployed app (if staging exists)
  
  5. Test reports:
     - Coverage report (>80%)
     - Flaky tests detected
     - Performance benchmarks
  
  Output: Tests in ./projects/<feature-name>/frontend/src and backend/services/"
})
```

**Agent 3: appsec-engineer** (PARALLEL with automation-qa)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "AppSec Engineer (Phase 4) — SAST security scanning + OWASP audit",
  prompt: "[implementation code + 01-architecture.md + 01-threat-model.md]
  
  Skills: skill-security-audit, skill-code-quality, skill-threat-modeling
  
  Using code + threat model:
  1. SAST (Static Analysis Security Testing):
     - Run Snyk / SonarQube on backend code
     - npm audit for dependencies
     - Check for hardcoded secrets (truffleHog)
  
  2. OWASP Top 10 audit:
     - A01:2021 – Broken Access Control (auth checks)
     - A02:2021 – Cryptographic Failures (encryption)
     - A03:2021 – Injection (SQL injection, command injection)
     - A04:2021 – Insecure Design (threat model gaps)
     - A05:2021 – Security Misconfiguration (env setup)
     - A06:2021 – Vulnerable Components (dependency versions)
     - A07:2021 – Authentication Failures (login security)
     - A08:2021 – Software + Data Integrity (build pipeline)
     - A09:2021 – Logging & Monitoring (security events)
     - A10:2021 – SSRF (external API calls)
  
  3. Create ./projects/<feature-name>/docs/04-security.md with:
     - Vulnerabilities found (severity: Critical, High, Medium, Low)
     - Root cause analysis
     - Remediation steps
     - Risk ranking (which to fix first)
  
  Output: ./projects/<feature-name>/docs/04-security.md"
})
```

**Wait for automation-qa-engineer AND appsec-engineer to complete.**

---

**Agent 4: penetration-tester** (WAITS for automation + appsec)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "Penetration Tester (Phase 4) — Attack simulation + exploit scenarios",
  prompt: "[04-security.md + implementation code + 01-threat-model.md + test suite results]
  
  Skills: skill-security-audit, skill-threat-modeling, skill-diagnose
  
  Using SAST findings + threat model:
  1. Attack simulation:
     - Authentication bypass (weak password, session fixation)
     - Authorization bypass (IDOR, privilege escalation)
     - Injection attacks (SQL, command, NoSQL)
     - XSS (stored, reflected, DOM)
     - CSRF (cross-site request forgery)
     - Deserialization attacks
     - Rate limiting bypass
  
  2. Create exploit scenarios:
     - Step-by-step instructions to reproduce each vulnerability
     - Proof of concept code
     - Business impact (what attacker can do)
  
  3. Append to ./projects/<feature-name>/docs/04-security.md:
     - Penetration test findings
     - Exploits demonstrated
     - Fix validation (test that fixes work)
  
  Output: Updates 04-security.md with pen test findings"
})
```

**Agent 5: performance-engineer** (PARALLEL with automation + appsec + penetration)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "Performance Engineer (Phase 4) — Profiling + optimization",
  prompt: "[implementation code + 01-architecture.md + grill-summary.md]
  
  Skills: skill-performance-optimization, skill-code-quality, skill-observability
  
  Using code + scale requirements:
  1. Profiling:
     - CPU profiling (bottleneck functions)
     - Memory profiling (memory leaks)
     - Startup time (bundle size, cold start)
     - Database query analysis (N+1 queries)
  
  2. Benchmarking:
     - Frontend: Core Web Vitals (LCP, FID, CLS)
     - Backend: Response time (p50, p95, p99 latency)
     - Database: Query execution times
     - Load testing (concurrent users per grill-summary scale)
  
  3. Optimization recommendations:
     - Code-level optimizations (algorithmic)
     - Infrastructure optimizations (caching, CDN)
     - Database optimizations (indexes, query rewrites)
  
  4. Create performance-report.md:
     - Current metrics
     - Targets (from grill-summary requirements)
     - Bottlenecks identified
     - Optimization roadmap
  
  Output: ./projects/<feature-name>/docs/performance-report.md"
})
```

**Wait for penetration-tester and performance-engineer to complete.**

---

## Display Completion

```
✅ Phase 4 Complete! (5 agents invoked)

📁 Testing & Security artifacts:
  ./projects/<feature-name>/docs/
    ├── 04-test-cases.md            (qa-manual-tester)
    ├── 04-security.md              (appsec + penetration-tester)
    └── performance-report.md       (performance-engineer)

📊 Test Results:
  ✅ Unit tests:        >80% coverage
  ✅ Integration tests: All passing
  ✅ E2E tests:         Critical paths verified
  ✅ SAST scan:         [n vulnerabilities found]
  ✅ Pen testing:       [n exploits found + fixed]
  ✅ Performance:       [metrics vs targets]

✅ Agents completed:
  1. qa-manual-tester         → manual test cases
  2. automation-qa-engineer   → unit + integration + E2E tests
  3. appsec-engineer          → SAST + OWASP audit
  4. penetration-tester       → Exploit scenarios + fixes validated
  5. performance-engineer     → Profiling + optimization plan

Quality Gates:
  ✅ No critical/high security findings unresolved
  ✅ >80% unit test coverage
  ✅ Performance within targets
  ✅ All user stories covered by tests

Next: Run /sdlc-deploy for Phase 5 (Infrastructure & Deployment)
```

---

## TESTING PYRAMID (70/20/10)

- **70% Unit Tests**: Fast, isolated, high coverage
- **20% Integration Tests**: Backend + database, frontend + API
- **10% E2E Tests**: Critical user paths only

## CRITICAL RULES

✅ qa-manual-tester MUST create test cases first (test spec)
✅ automation-qa-engineer MUST achieve >80% coverage
✅ appsec-engineer MUST audit all OWASP Top 10
✅ penetration-tester MUST demonstrate exploits (not just theoretical)
✅ All findings MUST be fixed before Phase 5
✅ No critical/high security findings allowed to pass
