---
description: Phase 5 — Operate. Runs sre-engineer always + data-engineer when has_data_pipeline is true. Reads ship-handoff.md for clean context.
argument-hint: "[feature-name]"
tools: Agent
model: sonnet
---

# /sdlc-operate — Phase 5: Operate

Define SLOs, monitoring, runbooks, and (when applicable) data pipelines for the deployed system.

## Execution

### STEP 1: Read Ship Handoff + Scope

1. Read `./projects/<feature-name>/handoffs/ship-handoff.md` — clean context from Ship phase
2. Read `./projects/<feature-name>/scope.json` — check `has_data_pipeline` and `has_auth` flags

### STEP 2: Spawn sre-engineer (always)

```
Spawn: Agent({
  subagent_type: "fork",
  name: "sre-engineer",
  description: "SRE Engineer (Operate phase) — SLOs, monitoring, runbooks, security ops",
  prompt: "[ship-handoff.md + scope.json]

  Using the shipped system context:

  1. Define SLOs per service:
     - Availability SLO (e.g., 99.5%)
     - Latency SLO (P99 < 500ms)
     - Error rate SLO (< 0.1%)
     - Calculate error budget for each

  2. Monitoring & Alerting:
     - Key metrics per service (request rate, error rate, latency, saturation)
     - Alert thresholds matching error budget burn rate
     - Dashboard definition (Grafana/CloudWatch)
     - Notification channels (PagerDuty, Slack)

  3. On-Call Runbooks (top 5 scenarios):
     - CPU spike
     - High latency
     - API error spike
     - Database connection exhaustion
     - Memory leak / OOM

  4. If scope.json has_auth is true:
     - Security event monitoring (failed logins, privilege escalation)
     - SOC alert rules + incident response playbook
     - Compliance audit log verification

  5. Write ./projects/<feature-name>/docs/06-slo.md

  Output: docs/06-slo.md"
})
```

Wait for sre-engineer to complete.

### STEP 3: Spawn data-engineer (only when `has_data_pipeline: true`)

Check scope.json. If `has_data_pipeline` is false, skip this step entirely.

```
Spawn: Agent({
  subagent_type: "fork",
  name: "data-engineer",
  description: "Data Engineer (Operate phase) — ETL pipelines + analytics",
  prompt: "[ship-handoff.md + scope.json]

  Using the shipped system context:

  1. Design ETL/ELT pipelines:
     - Extract from production databases
     - Transform (clean, aggregate, normalise)
     - Load to data warehouse / analytics DB

  2. Data schema for analytics:
     - Fact tables (user_logins, orders, events)
     - Dimension tables (users, products, time)
     - Slowly Changing Dimensions

  3. Scheduling + orchestration:
     - Daily / hourly / real-time pipeline frequency
     - Error handling + retries
     - Pipeline health monitoring

  4. Data quality checks:
     - Row count validation
     - Null value checks
     - Freshness SLA (data must be no older than N hours)
     - Consistency checks (dimension-fact joins)

  5. Write ./projects/<feature-name>/docs/06-data-pipelines.md

  Output: docs/06-data-pipelines.md"
})
```

Wait for data-engineer to complete (if invoked).

### STEP 4: Display Completion

```
✅ Phase 5 — Operate Complete!

📁 Artifacts:
  docs/06-slo.md        (sre-engineer — always)
  docs/06-data-pipelines.md  (data-engineer — if has_data_pipeline)

✅ Agents completed:
  sre-engineer  → SLOs, error budgets, runbooks [+ security monitoring if has_auth]
  data-engineer → ETL pipelines, analytics schema  [only if has_data_pipeline]

🎉 All 5 phases complete!
```

---

## Critical Rules

✅ Read ship-handoff.md FIRST — do not carry forward Ship phase conversation
✅ `sre-engineer` always runs — no scope condition
✅ `data-engineer` runs ONLY when `has_data_pipeline: true` in scope.json
✅ Security monitoring section in sre-engineer is conditional on `has_auth: true`
