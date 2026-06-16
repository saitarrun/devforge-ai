# Agent Skills Manifest

## Overview

This document specifies the **MANDATORY skills** that each agent MUST use during execution. Skills are not optional helpers—they are core methodologies that define how agents work.

**CRITICAL RULE**: Agent execution is invalid if it does not invoke and apply the assigned skills.

---

## Phase 1: Planning & Requirements

### product-manager
**Mandatory Skills:**
- **skill-grill-me** — Relentlessly interview customer to reach shared understanding
- **skill-requirements** — Define INVEST-compliant features with acceptance criteria
- **skill-prd-synthesis** — Synthesize PRD from customer interviews

**Enforcement:**
- ❌ FAIL if: Agent does not grill customer on problem/users/constraints/success
- ❌ FAIL if: Requirements lack INVEST criteria or QUANTS metrics
- ❌ FAIL if: PRD is not synthesized from grill findings
- ✅ PASS if: Customer signs off on understanding, PRD addresses all INVEST criteria

### business-analyst
**Mandatory Skills:**
- **skill-requirements** — INVEST criteria for user stories
- **skill-plan-breakdown** — Break features into estimable, small stories
- **skill-issue-triage** — Create and organize GitHub issues

**Enforcement:**
- ❌ FAIL if: User stories lack INVEST criteria
- ❌ FAIL if: Stories are not broken down small enough to estimate
- ❌ FAIL if: GitHub issues not created for each story
- ✅ PASS if: All stories are INVEST-compliant and triaged

### software-architect
**Mandatory Skills:**
- **skill-architecture** — ADR, component design, trade-offs
- **skill-threat-modeling** — Attack surface identification
- **skill-zoom-out** — System-level perspective

**Enforcement:**
- ❌ FAIL if: No ADR created
- ❌ FAIL if: Architecture lacks component diagrams
- ❌ FAIL if: Trade-offs not documented
- ✅ PASS if: ADR complete, components clear, trade-offs explicit

### security-architect
**Mandatory Skills:**
- **skill-threat-modeling** — STRIDE analysis, security controls
- **skill-security-audit** — OWASP Top 10 alignment, risk assessment

**Enforcement:**
- ❌ FAIL if: No STRIDE analysis performed
- ❌ FAIL if: Trust boundaries not identified
- ❌ FAIL if: Security controls not mapped to threats
- ✅ PASS if: STRIDE complete, controls designed, risks ranked

---

## Phase 2: Design & UX

### ux-researcher
**Mandatory Skills:**
- **skill-ux-design** — User journeys, personas, pain points
- **skill-prototype** — Interactive prototypes for user testing

**Enforcement:**
- ❌ FAIL if: No personas created with pain points
- ❌ FAIL if: User journeys not mapped
- ❌ FAIL if: No user research conducted
- ✅ PASS if: Personas validated, journeys documented, research done

### ui-ux-designer
**Mandatory Skills:**
- **skill-ux-design** — Component specs, design system
- **skill-prototype** — Wireframes and interactive prototypes
- **skill-accessibility** — WCAG 2.1 AA compliance

**Enforcement:**
- ❌ FAIL if: No wireframes or design specs
- ❌ FAIL if: Design system not documented
- ❌ FAIL if: No accessibility review
- ✅ PASS if: Wireframes complete, components specified, a11y verified

### accessibility-engineer
**Mandatory Skills:**
- **skill-accessibility** — WCAG 2.1 AA compliance, assistive tech testing
- **skill-ux-design** — Inclusive design patterns
- **skill-playwright** — Automated a11y testing

**Enforcement:**
- ❌ FAIL if: No WCAG audit performed
- ❌ FAIL if: No screen reader testing
- ❌ FAIL if: No color contrast analysis
- ✅ PASS if: WCAG AA compliance verified, a11y tests automated

---

## Phase 3: Development

### frontend-engineer
**Mandatory Skills:**
- **skill-code-standards** — Linting, formatting, conventions
- **skill-code-quality** — Unit testing, accessibility, performance
- **skill-architecture** — Component hierarchy, state management
- **skill-zoom-out** — System-level integration thinking

**Enforcement:**
- ❌ FAIL if: No linting or code standards applied
- ❌ FAIL if: Unit test coverage <80%
- ❌ FAIL if: Components not modular or reusable
- ✅ PASS if: Code passes linting, tests pass, components clear

### backend-engineer
**Mandatory Skills:**
- **skill-code-standards** — API contracts, error handling
- **skill-code-quality** — Unit and integration tests
- **skill-architecture** — DB schema, service design
- **skill-zoom-out** — System-level architecture impact

**Enforcement:**
- ❌ FAIL if: No API contracts documented
- ❌ FAIL if: Test coverage <80%
- ❌ FAIL if: No migrations for schema changes
- ✅ PASS if: API clear, tests pass, migrations tracked

### database-engineer
**Mandatory Skills:**
- **skill-code-standards** — Schema conventions, migrations
- **skill-architecture** — Indexing, normalization, partitioning
- **skill-code-quality** — Query performance testing

**Enforcement:**
- ❌ FAIL if: Schema not normalized or indexed
- ❌ FAIL if: No migration scripts
- ❌ FAIL if: No performance analysis
- ✅ PASS if: Schema correct, migrations tested, perf analyzed

### mobile-developer
**Mandatory Skills:**
- **skill-code-standards** — Platform conventions (iOS/Android)
- **skill-code-quality** — Unit testing, responsive design
- **skill-architecture** — Component hierarchy, offline support
- **skill-zoom-out** — System integration

**Enforcement:**
- ❌ FAIL if: No linting or conventions applied
- ❌ FAIL if: Unit tests missing
- ❌ FAIL if: Not responsive or accessible
- ✅ PASS if: Code follows platform standards, tests pass

### fullstack-engineer
**Mandatory Skills:**
- **skill-code-standards** — Full-stack conventions
- **skill-architecture** — Full system design, integration points
- **skill-code-quality** — Full-stack testing
- **skill-zoom-out** — System-level perspective

**Enforcement:**
- ❌ FAIL if: Frontend OR backend lacks standards
- ❌ FAIL if: Full-stack tests missing
- ❌ FAIL if: Integration points not clear
- ✅ PASS if: Full stack coherent, tests comprehensive

---

## Phase 4: Testing & Security

### qa-manual-tester
**Mandatory Skills:**
- **skill-testing** — Test case design, edge cases, exploratory testing
- **skill-code-quality** — Bug severity assessment
- **skill-playwright** — Automated test scripting

**Enforcement:**
- ❌ FAIL if: No test cases documented
- ❌ FAIL if: Edge cases not explored
- ❌ FAIL if: Bugs lack severity/priority
- ✅ PASS if: Comprehensive test cases, bugs triaged

### automation-qa-engineer
**Mandatory Skills:**
- **skill-testing** — Test architecture, coverage strategy
- **skill-tdd** — Test-Driven Development practices
- **skill-playwright** — E2E and integration test automation
- **skill-code-quality** — Code coverage analysis

**Enforcement:**
- ❌ FAIL if: No test strategy defined
- ❌ FAIL if: No automated tests
- ❌ FAIL if: Coverage <70%
- ✅ PASS if: Tests automated, coverage tracked, CI-wired

### appsec-engineer
**Mandatory Skills:**
- **skill-security-audit** — OWASP Top 10, SAST, SCA
- **skill-threat-modeling** — Attack surface analysis
- **skill-code-quality** — Code review for security

**Enforcement:**
- ❌ FAIL if: No OWASP audit performed
- ❌ FAIL if: No dependency scan run
- ❌ FAIL if: No code security review
- ✅ PASS if: Vulnerabilities identified and remediated

### penetration-tester
**Mandatory Skills:**
- **skill-threat-modeling** — Attack scenario development
- **skill-security-audit** — Exploitation and validation
- **skill-diagnose** — Root cause analysis of findings

**Enforcement:**
- ❌ FAIL if: No attack scenarios tested
- ❌ FAIL if: Findings lack proof of concept
- ❌ FAIL if: No remediation guidance
- ✅ PASS if: Vulnerabilities exploited, impact validated

---

## Phase 5: Deployment

### devops-engineer
**Mandatory Skills:**
- **skill-cicd** — CI/CD pipeline design and implementation
- **skill-git-safety** — Safe deployment practices
- **skill-precommit-hooks** — Pre-commit validation
- **skill-code-quality** — Quality gate enforcement

**Enforcement:**
- ❌ FAIL if: No CI/CD pipeline
- ❌ FAIL if: No pre-commit hooks
- ❌ FAIL if: No quality gates
- ✅ PASS if: Pipeline functional, deployments safe

### cloud-engineer
**Mandatory Skills:**
- **skill-cloud-infra** — Infrastructure as Code, VPC, IAM
- **skill-architecture** — Scalability, security, cost optimization
- **skill-code-quality** — Infrastructure testing

**Enforcement:**
- ❌ FAIL if: No IaC (Terraform/CDK)
- ❌ FAIL if: Security not configured (IAM, VPC)
- ❌ FAIL if: No autoscaling
- ✅ PASS if: IaC complete, secure, scalable

### sre-engineer
**Mandatory Skills:**
- **skill-ops-sre** — SLOs, runbooks, incident response
- **skill-observability** — Monitoring, logging, alerting
- **skill-code-quality** — Infrastructure reliability

**Enforcement:**
- ❌ FAIL if: No SLOs defined
- ❌ FAIL if: No monitoring/alerting
- ❌ FAIL if: No incident runbooks
- ✅ PASS if: SLOs met, monitoring active, runbooks ready

---

## Phase 6: Operations & Support

### secops-analyst
**Mandatory Skills:**
- **skill-ops-sre** — Security monitoring and incident response
- **skill-security-audit** — Continuous security assessment
- **skill-threat-modeling** — Threat intelligence integration

**Enforcement:**
- ❌ FAIL if: No security monitoring
- ❌ FAIL if: No incident response plan
- ❌ FAIL if: Security posture not assessed
- ✅ PASS if: Monitoring active, incidents handled, posture known

### data-engineer
**Mandatory Skills:**
- **skill-architecture** — Data pipeline design
- **skill-code-quality** — Data quality validation
- **skill-code-standards** — Data engineering standards

**Enforcement:**
- ❌ FAIL if: No ETL/ELT pipeline
- ❌ FAIL if: Data quality checks missing
- ❌ FAIL if: Schema not documented
- ✅ PASS if: Pipelines functional, quality validated

### tech-lead
**Mandatory Skills:**
- **skill-architecture** — System design decisions
- **skill-code-review** — Code review standards
- **skill-knowledge-management** — Documentation and onboarding
- **skill-api-design** — API contracts
- **skill-tech-debt** — Technical debt tracking

**Enforcement:**
- ❌ FAIL if: No architecture reviews
- ❌ FAIL if: Code review standards not enforced
- ❌ FAIL if: Team documentation lacking
- ✅ PASS if: Architecture clear, code reviewed, team aligned

### engineering-manager
**Mandatory Skills:**
- **skill-organizational-health** — Team health, velocity tracking
- **skill-knowledge-management** — Knowledge sharing
- **skill-tech-debt** — Sprint balance (features vs. debt)

**Enforcement:**
- ❌ FAIL if: No team metrics tracked
- ❌ FAIL if: Knowledge silos exist
- ❌ FAIL if: Tech debt backlog not groomed
- ✅ PASS if: Team healthy, knowledge shared, balanced velocity

### release-manager
**Mandatory Skills:**
- **skill-release-management** — Versioning, rollout, rollback
- **skill-configuration-management** — Environment management
- **skill-dependency-management** — Dependency tracking

**Enforcement:**
- ❌ FAIL if: No semver followed
- ❌ FAIL if: No rollout strategy
- ❌ FAIL if: No rollback plan
- ✅ PASS if: Release strategy clear, rollback tested

### performance-engineer
**Mandatory Skills:**
- **skill-performance-optimization** — Profiling, bottleneck analysis
- **skill-code-quality** — Performance test automation
- **skill-observability** — Performance monitoring

**Enforcement:**
- ❌ FAIL if: No baseline performance metrics
- ❌ FAIL if: No profiling conducted
- ❌ FAIL if: Performance tests missing
- ✅ PASS if: Bottlenecks identified, optimizations implemented

### technical-writer
**Mandatory Skills:**
- **skill-documentation** — Docs-as-code, examples
- **skill-developer-relations** — SDK guides, external communication
- **skill-api-design** — API documentation
- **skill-knowledge-management** — Knowledge organization

**Enforcement:**
- ❌ FAIL if: No API documentation
- ❌ FAIL if: Examples not tested
- ❌ FAIL if: Docs out of date
- ✅ PASS if: Docs complete, examples work, guides clear

---

## Mandatory Enforcement Rules

### Rule 1: Skills Declaration
Every agent MUST have a `skills:` field in frontmatter listing required skills.

### Rule 2: Skill Invocation
Agent execution MUST explicitly invoke assigned skills:
- Read skill documentation
- Apply skill methodology
- Document skill application
- Output must show skill was used

### Rule 3: No Skill Skipping
Agent CANNOT skip a skill because it seems "too heavy" or "obvious":
- If skill is assigned, it MUST be applied
- Exception: Only if explicitly documented why skill doesn't apply (rare)

### Rule 4: Skill Validation
During phase gate reviews, verify:
- ✓ Agent explicitly invoked all skills
- ✓ Skill methodology applied to outputs
- ✓ Skill output artifacts present
- ✗ Reject phase if skills not applied

### Rule 5: Orchestrator Enforcement
Orchestrator logs skill invocation:
- WARN if agent doesn't mention skill in execution
- FAIL phase gate if no evidence of skill application
- Track skill usage metrics per agent

---

## Examples of Skill Application

### Example 1: Product Manager MUST use skill-grill-me
```
❌ INVALID:
Agent: "Based on the feature request, I'll define the PRD"
→ Skipped grill-me phase

✅ VALID:
Agent: "Invoking skill-grill-me to understand requirements"
→ Phase A: Problem Understanding — Customer confirms problem statement
→ Phase B: User Understanding — Identified 3 personas with pain points
→ Phase C: Constraints — Timeline: 6 weeks, Budget: 2 engineers
→ Phase D: Success Criteria — 50% reduction in time to deploy
→ Grill-me complete: Customer signed off
→ Now proceeding with PRD synthesis
```

### Example 2: Backend Engineer MUST use skill-architecture
```
❌ INVALID:
Agent: "Implemented the API endpoints"
→ No mention of architecture skill

✅ VALID:
Agent: "Invoking skill-architecture for API design"
→ Decisions documented: REST vs GraphQL → chose REST
→ Component interactions: API → DB, API → Cache
→ Trade-offs: Consistency vs Availability → chose Strong Consistency
→ Schema design aligned with architecture
→ Output: ADR-style decision document
```

### Example 3: QA Engineer MUST use skill-testing
```
❌ INVALID:
Agent: "Ran some tests"
→ No test strategy, coverage unknown

✅ VALID:
Agent: "Invoking skill-testing for comprehensive testing"
→ Test strategy: 70% unit, 20% integration, 10% E2E
→ Test pyramid implemented
→ Coverage target: 80%
→ Edge cases identified and tested
→ Output: Test coverage report
```

---

## Validation Checklist

Use this checklist at each phase gate:

- [ ] Agent has `skills:` defined in frontmatter
- [ ] All assigned skills are present in skills/ folder
- [ ] Agent execution log shows skill invocation
- [ ] Skill output artifacts present in phase directory
- [ ] Skill methodology applied (not skipped)
- [ ] Phase gate approval depends on skill validation

---

## Non-Negotiable

This is NOT optional. Agents MUST use their skills. Skills are the foundation of quality output in this framework.

If an agent claims a skill doesn't apply, escalate to phase gate reviewer for decision—don't skip without documented justification.
