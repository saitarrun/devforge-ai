# Agent Phase Mapping — All 26 Agents

Complete mapping of all 26 agents across 6 SDLC phases with skills and dependencies.

---

## PHASE 1 — Planning (6 agents)

### Sequential Order
1. **product-manager** (0 deps)
   - Skills: skill-grill-me, skill-requirements, skill-prd-synthesis
   - Input: Grill-me interview answers
   - Output: 01-roadmap.md
   - Gate: `grill-complete`

2. **business-analyst** (deps: product-manager:grill-complete)
   - Skills: skill-requirements, skill-plan-breakdown, skill-issue-triage
   - Input: Grill answers + roadmap
   - Output: 01-requirements.md

3. **software-architect** (deps: business-analyst)
   - Skills: skill-architecture, skill-threat-modeling, skill-zoom-out
   - Input: Grill + requirements
   - Output: 01-architecture.md + ARCHITECTURE.mmd

4. **security-architect** (deps: software-architect)
   - Skills: skill-threat-modeling, skill-security-audit
   - Input: Grill + architecture
   - Output: 01-threat-model.md

5. **tech-lead** (deps: software-architect)
   - Skills: skill-architecture, skill-knowledge-management, skill-api-design, skill-tech-debt, skill-code-review
   - Input: Architecture (initial review)
   - Output: ADR feedback, code review guidelines
   - Note: Can run parallel with security-architect

6. **engineering-manager** (deps: business-analyst)
   - Skills: skill-organizational-health, skill-knowledge-management, skill-tech-debt
   - Input: Requirements (team sizing)
   - Output: Team allocation plan, skill gaps
   - Note: Can run parallel with software-architect

---

## PHASE 2 — Design (4 agents)

### Sequential Order
1. **ux-researcher** (deps: business-analyst)
   - Skills: skill-ux-design, skill-prototype
   - Input: Requirements + personas
   - Output: 02-user-journeys.md

2. **ui-ux-designer** (deps: ux-researcher)
   - Skills: skill-ux-design, skill-prototype, skill-accessibility
   - Input: User journeys + wireframe specs
   - Output: 02-wireframes.md

3. **accessibility-engineer** (deps: ui-ux-designer)
   - Skills: skill-accessibility, skill-ux-design, skill-playwright
   - Input: Wireframes (accessibility audit)
   - Output: Accessibility report + WCAG compliance checklist
   - Note: Runs in parallel with next agent

4. **technical-writer** (deps: ui-ux-designer)
   - Skills: skill-documentation, skill-developer-relations, skill-api-design, skill-knowledge-management
   - Input: Architecture + design (API docs outline)
   - Output: API documentation outline (filled in Phase 3)
   - Note: Prepares docs structure

---

## PHASE 3 — Development (9 agents)

### Dependency Groups (can run in parallel)
**Group 1: Backend Scaffold** (blocks other groups)
1. **backend-engineer** (deps: software-architect)
   - Skills: skill-code-standards, skill-code-quality, skill-architecture, skill-zoom-out
   - Input: Architecture (microservices design)
   - Output: Scaffold api-gateway + domain services
   - **BLOCKS**: database-engineer, fullstack-engineer

**Group 2: Frontend & Mobile** (parallel, dep: ui-ux-designer)
2. **frontend-engineer** (deps: ui-ux-designer)
   - Skills: skill-code-standards, skill-code-quality, skill-architecture, skill-zoom-out
   - Input: Wireframes + API spec
   - Output: Component library + pages
   - Parallel with: mobile-developer, database-engineer (after backend scaffold)

3. **mobile-developer** (deps: ui-ux-designer)
   - Skills: skill-code-standards, skill-code-quality, skill-architecture, skill-zoom-out
   - Input: Wireframes (adapted for mobile)
   - Output: Mobile app code
   - Parallel with: frontend-engineer

**Group 3: Database** (waits for backend)
4. **database-engineer** (deps: backend-engineer, software-architect)
   - Skills: skill-code-standards, skill-code-quality, skill-architecture
   - Input: Microservices schema design
   - Output: Migrations per service
   - Parallel with: frontend-engineer, mobile-developer

**Group 4: Integration & Fullstack** (waits for backend + frontend)
5. **fullstack-engineer** (deps: backend-engineer, frontend-engineer)
   - Skills: skill-code-standards, skill-code-quality, skill-architecture, skill-zoom-out
   - Input: Backend + frontend (integration points)
   - Output: Integration layer, end-to-end tests
   - Note: Bridges frontend-backend communication

---

## PHASE 4 — Testing & Security (5 agents)

### Sequential/Parallel Order
1. **qa-manual-tester** (deps: frontend-engineer, backend-engineer)
   - Skills: skill-testing, skill-code-quality, skill-playwright
   - Input: Frontend + backend code
   - Output: 04-test-cases.md (manual test scenarios)

2. **automation-qa-engineer** (deps: qa-manual-tester)
   - Skills: skill-testing, skill-tdd, skill-code-quality, skill-playwright
   - Input: Test cases (automation strategy)
   - Output: Unit + integration + E2E test suite
   - Parallel with: appsec-engineer

3. **appsec-engineer** (deps: backend-engineer)
   - Skills: skill-security-audit, skill-code-quality, skill-threat-modeling
   - Input: Backend code (SAST scan)
   - Output: OWASP audit findings
   - Parallel with: automation-qa-engineer

4. **penetration-tester** (deps: automation-qa-engineer, appsec-engineer)
   - Skills: skill-security-audit, skill-threat-modeling, skill-diagnose
   - Input: SAST findings + test suite
   - Output: Penetration test findings + exploit scenarios

5. **performance-engineer** (deps: frontend-engineer, backend-engineer)
   - Skills: skill-performance-optimization, skill-code-quality, skill-observability
   - Input: Code + test results
   - Output: Performance profile + optimization recommendations
   - Parallel with: automation-qa-engineer, appsec-engineer

---

## PHASE 5 — Deployment (2 agents)

### Sequential Order
1. **devops-engineer** (deps: backend-engineer, database-engineer)
   - Skills: skill-cicd, skill-precommit-hooks, skill-code-quality, skill-git-safety
   - Input: Microservices code + DB migrations
   - Output: CI/CD pipeline, Dockerfiles, docker-compose.yml, K8s manifests

2. **cloud-engineer** (deps: devops-engineer)
   - Skills: skill-cloud-infra, skill-architecture, skill-code-quality
   - Input: K8s manifests + infrastructure requirements
   - Output: Terraform/Helm IaC + deployment scripts

---

## PHASE 6 — Operations (4 agents)

### Parallel Order (all have single dependency: cloud-engineer)
1. **sre-engineer** (deps: cloud-engineer)
   - Skills: skill-ops-sre, skill-observability, skill-code-quality
   - Input: Infrastructure + services (SLO design)
   - Output: 06-slo.md + runbooks
   - Parallel with: others below

2. **secops-analyst** (deps: cloud-engineer)
   - Skills: skill-ops-sre, skill-security-audit, skill-threat-modeling
   - Input: Infrastructure + threat model (monitoring)
   - Output: 06-secops.md + alert rules
   - Parallel with: sre-engineer, data-engineer

3. **data-engineer** (deps: cloud-engineer)
   - Skills: skill-architecture, skill-code-quality, skill-code-standards
   - Input: Database schema + scale requirements
   - Output: 06-data-pipelines.md + ETL/ELT workflows
   - Parallel with: sre-engineer, secops-analyst

4. **release-manager** (deps: devops-engineer)
   - Skills: skill-release-management, skill-configuration-management, skill-dependency-management
   - Input: Pipeline + infrastructure
   - Output: Release plan + rollout strategy
   - Parallel with: sre-engineer, secops-analyst, data-engineer

---

## Summary: Agent Invocation by Phase

| Phase | Agents | Parallelizable | Sequential Order |
|-------|--------|----------------|-----------------|
| **1** | 6 | 2 parallel groups | product-mgr → analyst → architect → security + (tech-lead, eng-mgr parallel) |
| **2** | 4 | 1 parallel pair | ux-researcher → ui-designer → (accessibility + tech-writer parallel) |
| **3** | 9 | 4 parallel groups | backend → (frontend, mobile, database parallel) → fullstack |
| **4** | 5 | 2 parallel groups | QA-manual → (automation + appsec + perf parallel) → penetration |
| **5** | 2 | Sequential | devops → cloud |
| **6** | 4 | 4 parallel | All parallel (release-mgr, sre, secops, data-engineer) |
| **Total** | **26** | **15 in parallel** | **11 sequential bottlenecks** |

---

## Key Principles

✅ **Each agent has explicit skills** — loaded when agent invokes
✅ **Dependencies enforced** — agent waits for dependencies to complete
✅ **Parallel where possible** — 15 agents can run in parallel, reducing total time
✅ **Skills passed to agents** — agents read skills from frontmatter + context
✅ **Context sharing** — artifacts from earlier agents available to later ones
✅ **All 26 agents invoked** — no agent skipped, all contribute to final output
