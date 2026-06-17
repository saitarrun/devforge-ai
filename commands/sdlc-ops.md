---
description: Phase 6 — Operations & Monitoring. Spawns sre-engineer, secops-analyst, data-engineer, release-manager (all in parallel).
argument-hint: "[--service <name>] [--framework prometheus]"
tools: Agent
model: haiku
---

# /sdlc-ops — Phase 6: Operations, Monitoring & Release

Define Service Level Objectives, security monitoring, data pipelines, and release procedures.

## Agents Invoked (4 total — all parallel)

All 4 agents can run in parallel (all depend on cloud-engineer completing Phase 5):
- sre-engineer (SLOs, runbooks, monitoring)
- secops-analyst (security monitoring, alerts)
- data-engineer (data pipelines, ETL/ELT)
- release-manager (release planning, rollout strategy)

---

## Agent Invocation

### Read Phase 1-5 Artifacts First
- `01-architecture.md` — system design, components
- `01-threat-model.md` — security risks, controls
- `03-implementation.log` — what was built
- `04-security.md` — security findings + fixes
- `deployment/` — infrastructure as code

---

**Agent 1: sre-engineer** (PARALLEL)
```
Spawn: Agent({
  subagent_type: "fork",
  name: "sre-engineer",
  description: "SRE Engineer (Phase 6) — SLOs, error budgets, runbooks",
  prompt: "[01-architecture.md + 04-security.md + deployment/]
  
  Skills: skill-ops-sre, skill-observability, skill-code-quality
  
  Using architecture + deployment infrastructure:
  1. Define Service Level Objectives (SLOs):
     - Availability: 99.9% uptime (4.38 hours downtime/month)
     - Latency: P99 <500ms (user-facing endpoints)
     - Error rate: <0.1% of requests fail
     - Per-service SLOs (api-gateway, user-service, order-service, etc.)
  
  2. Calculate Error Budget:
     - How much downtime is allowed before SLO breach?
     - Monthly budget (e.g., 4.38 hours = 0.38%)
     - Weekly allocation
     - Use for release decisions
  
  3. Create runbooks for on-call:
     - CPU spike (what to check, how to scale)
     - High latency (identify bottleneck, remediate)
     - API errors (check logs, rollback if needed)
     - Database connection pool exhaustion
     - Memory leaks (restart, investigate)
  
  4. Monitoring setup:
     - Key metrics to track (response time, error rate, CPU, memory)
     - Dashboards for each service
     - Alert thresholds (when to page on-call)
  
  5. Create ./projects/<feature-name>/docs/06-slo.md with:
     - SLO definitions (availability, latency, error rate)
     - Error budget calculation
     - Runbooks (troubleshooting procedures)
     - Escalation policy (who to call)
  
  Output: ./projects/<feature-name>/docs/06-slo.md"
})
```

**Agent 2: secops-analyst** (PARALLEL with sre-engineer)
```
Spawn: Agent({
  subagent_type: "fork",
  name: "secops-analyst",
  description: "SecOps Analyst (Phase 6) — Security monitoring + alerts",
  prompt: "[01-threat-model.md + 04-security.md + deployment/]
  
  Skills: skill-ops-sre, skill-security-audit, skill-threat-modeling
  
  Using threat model + security findings:
  1. Design security monitoring:
     - Log suspicious events (failed auth attempts, privilege escalation)
     - Monitor for known attack patterns
     - Track security findings + remediation
  
  2. Create alert rules:
     - Failed login attempts (throttle after 5 failures)
     - Privilege escalation attempts
     - Unauthorized API calls
     - Data access anomalies
     - Dependency vulnerabilities (alerts when new CVEs found)
  
  3. Incident response procedures:
     - How to detect + triage security incidents
     - Incident log procedures
     - Escalation (notify security team, affected users)
     - Remediation steps
     - Post-incident review
  
  4. Compliance monitoring:
     - From grill-me: GDPR, SOC2, PCI-DSS, HIPAA, etc.
     - Audit logs (who accessed what, when)
     - Data retention policies
     - Privacy impact assessments
  
  5. Create ./projects/<feature-name>/docs/06-secops.md with:
     - Security monitoring setup
     - Alert rules + thresholds
     - Incident response procedures
     - Compliance checklist
  
  Output: ./projects/<feature-name>/docs/06-secops.md"
})
```

**Agent 3: data-engineer** (PARALLEL with sre + secops)
```
Spawn: Agent({
  subagent_type: "fork",
  name: "data-engineer",
  description: "Data Engineer (Phase 6) — Data pipelines + analytics",
  prompt: "[03-implementation.log + 01-architecture.md + deployment/]
  
  Skills: skill-architecture, skill-code-quality, skill-code-standards
  
  Using database schema + backend services:
  1. Design data pipelines (ETL/ELT):
     - Extract: Which data to pull from production databases?
     - Transform: Data cleaning, aggregation, normalization
     - Load: Where to load (data warehouse, analytics DB, data lake)?
  
  2. Data schema for analytics:
     - Fact tables (events: user_logins, orders, errors)
     - Dimension tables (users, products, time)
     - Slowly Changing Dimensions (handle updates)
  
  3. Scheduling + orchestration:
     - Daily/hourly/real-time pipelines
     - Error handling + retries
     - Monitoring (pipeline health)
  
  4. Data quality checks:
     - Row counts (is data missing?)
     - Null values (unexpected nulls)
     - Freshness (is data up-to-date?)
     - Consistency (do dimensions match facts?)
  
  5. Analytics + reporting:
     - Key metrics to track (DAU, revenue, churn)
     - BI tool setup (Tableau, Looker, Metabase)
     - Dashboards for different stakeholders
  
  6. Create ./projects/<feature-name>/docs/06-data-pipelines.md with:
     - Pipeline architecture (extract → transform → load)
     - Data schema (ER diagram, table descriptions)
     - Scheduling (frequency, SLAs)
     - Quality checks + monitoring
     - Key metrics + dashboards
  
  Output: ./projects/<feature-name>/docs/06-data-pipelines.md"
})
```

**Agent 4: release-manager** (PARALLEL with all above)
```
Spawn: Agent({
  subagent_type: "fork",
  name: "release-manager",
  description: "Release Manager (Phase 6) — Release planning + rollout strategy",
  prompt: "[03-implementation.log + 04-security.md + deployment/]
  
  Skills: skill-release-management, skill-configuration-management, skill-dependency-management
  
  Using implementation + deployment setup:
  1. Release planning:
     - Version numbering (semantic versioning: 1.0.0)
     - Release notes (features, bug fixes, breaking changes)
     - Release schedule (weekly, monthly, as-needed)
     - Rollout strategy (canary, blue-green, rolling)
  
  2. Pre-release checklist:
     - All tests passing (unit, integration, E2E)
     - Security findings fixed
     - Performance within targets
     - Documentation updated
     - Database migrations ready
     - Configuration (env vars) documented
  
  3. Deployment strategy:
     - Canary: Deploy to 5% of users first
       - Monitor metrics for 30 minutes
       - If healthy, increase to 25% → 50% → 100%
       - If unhealthy, rollback
     - Blue-green: Two production environments (blue + green)
       - Deploy to green while blue is live
       - Switch traffic to green (instant rollback if needed)
     - Rolling: Replace instances gradually (Kubernetes default)
  
  4. Rollback procedure:
     - How to detect rollback needed (SLO breach)
     - Automated rollback (if SLO breached)
     - Manual rollback (customer requests)
     - Data consistency (database rollback)
  
  5. Post-release:
     - Monitor metrics for 1 hour
     - Triage any issues
     - Release retrospective (what went well, what to improve)
  
  6. Create release-plan.md with:
     - Release checklist (pre-release, deployment, post-release)
     - Rollout strategy (canary percentages + timing)
     - Rollback procedure + testing
     - Communication plan (notify users/customers)
  
  Output: ./projects/<feature-name>/docs/release-plan.md"
})
```

**Wait for all 4 agents to complete.**

---

## Display Completion

```
✅ Phase 6 Complete! (4 agents invoked in parallel)

📁 Operations & Monitoring artifacts:
  ./projects/<feature-name>/docs/
    ├── 06-slo.md                   (sre-engineer)
    ├── 06-secops.md                (secops-analyst)
    ├── 06-data-pipelines.md        (data-engineer)
    └── release-plan.md             (release-manager)

✅ Agents completed:
  1. sre-engineer       → SLOs, error budgets, runbooks
  2. secops-analyst     → Security monitoring, alert rules
  3. data-engineer      → Data pipelines, analytics schema
  4. release-manager    → Release plan, rollout strategy

Operations Ready:
  ✅ SLOs defined (availability, latency, error rate)
  ✅ Error budget calculated
  ✅ Runbooks for on-call engineers
  ✅ Security monitoring + alerts configured
  ✅ Data pipelines ready
  ✅ Release strategy documented
  ✅ Rollback procedures tested

---

🎉 ALL 6 PHASES COMPLETE! (26 agents invoked)

Full project structure created:
  ./projects/<feature-name>/
    ├── docs/               [all documentation]
    ├── frontend/src/       [frontend code + tests]
    ├── backend/services/   [microservices + tests]
    ├── mobile/src/         [mobile app + tests]
    └── deployment/         [CI/CD, Docker, K8s, IaC]

Ready for production deployment!
```

---

## CRITICAL RULES

✅ sre-engineer MUST define SLOs BEFORE deployment
✅ secops-analyst MUST monitor all threats from threat-model
✅ data-engineer MUST ensure data quality checks
✅ release-manager MUST test rollback procedure before first release
✅ Error budget must be respected (no releases if budget exhausted)
