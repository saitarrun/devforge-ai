---
description: Interactive user guide and command navigator to help you pick the right tool, agent, and phase with zero confusion.
argument-hint: "[--workflow startup|enterprise|debugging|security|all]"
---

# DevForge AI Interactive Guide & Command Navigator

Welcome to **DevForge AI**! This command helps you navigate the entire toolkit with zero confusion.

## 🧭 What are you trying to accomplish?

Select the scenario that matches your goal:

---

### 1. 🚀 Build a New Startup or SaaS Feature (0 to 1)
```bash
/sdlc-startup "Idea description"     # Scaffold MVP, Stripe monetization, PostHog telemetry & metrics
/sdlc-plan "Feature description"       # Structured interview (grill-me) -> PRD -> Tracer slices -> Linear issues
/sdlc "Feature description"            # Run the complete 5-Phase SDLC pipeline end-to-end
```

---

### 2. 🗺️ Explore & Navigate a Large Codebase (Up to 1.5M Files)
```bash
/sdlc-navigate "AuthService"           # Trace symbol callers, callees, and dependencies
/sdlc-navigate src/billing/ --deep     # Map module boundaries, imports, and coupling
/sdlc-navigate "payInvoice" --impact   # Show what breaks if you modify this function
```

---

### 3. 🔍 Debug & Fix Complex Bugs (Root Cause Analysis)
```bash
/sdlc-diagnose "500 error on checkout" # Funnel 1.5M files -> find root cause -> surgical fix
/sdlc-implement "Fix issue #42"        # Implement fix with self-correcting Ralph Loop
```

---

### 4. 🛡️ Security, CVEs, & Hardening
```bash
/sdlc-security --audit-only            # SAST, dependency CVE scan & OWASP Top 10 report
/sdlc-security --fix-cves              # Automatically patch vulnerable dependencies
/sdlc-security --protocol zero-trust   # Implement mTLS and strict auth policies
```

---

### 5. 🏛️ Modernize Legacy Code & Monoliths
```bash
/sdlc-modernize "legacy_engine.c" --snapshot-tests # Golden Master characterization test suite
/sdlc-modernize src/monolith/ --pattern strangler  # Strangler Fig proxy & microservice slice
```

---

### 6. 🧪 Run Multi-Tier Test Suites
```bash
/sdlc-test --suite unit                # Fast pure business logic tests
/sdlc-test --suite integration         # Testcontainers (Postgres, Redis, Kafka)
/sdlc-test --suite contract            # Pact / OpenAPI consumer contracts
/sdlc-test --suite e2e                 # Playwright browser journeys
/sdlc-test --suite perf                # k6 load & concurrency benchmarks
/sdlc-test --suite chaos               # Fault-injection & resilience simulations
/sdlc-test --suite all                 # Full enterprise verification matrix
```

---

### 7. 🚢 Deploy, Operate, & Monitor
```bash
/sdlc-ship                             # Generate CI/CD, Docker, Kubernetes, Terraform IaC
/sdlc-operate                          # Generate SLOs, runbooks, and telemetry dashboards
/sdlc-review --pr 1                    # Autonomous 3-perspective code review
```

---

> 💡 **Tip**: You can also type natural language in plain English! DevForge AI uses **Autonomous Dynamic Routing** to auto-select the right agents and skills for your request.
