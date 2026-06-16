---
name: skill-enforcement-guide
description: Mandatory skill enforcement for agents in each phase
version: 1.0.0
---

# Skill Enforcement Guide

## Executive Summary

**MANDATORY RULE**: Agents MUST invoke and apply their assigned skills. There are NO exceptions—no optional skills, no "this is obvious so I'll skip it", no shortcuts.

## Why Mandatory Skills?

Skills embody industry best practices and proven methodologies:
- **INVEST criteria** for user story definition
- **STRIDE modeling** for threat analysis
- **Testing Pyramid** for QA strategy
- **ADR patterns** for architectural decisions
- **WCAG standards** for accessibility

Skipping a skill = skipping proven best practices.

## How It Works

### 1. Skill Declaration (In Agent Frontmatter)

Every agent declares required skills:

```markdown
---
name: product-manager
skills: skill-grill-me, skill-requirements, skill-prd-synthesis
---
```

### 2. Skill Invocation (In Agent Execution)

During execution, agent MUST:

```
1. Read skill documentation from skills/ folder
2. Explicitly state: "Invoking skill-X to..."
3. Apply skill methodology step-by-step
4. Document skill application in output
5. Produce skill-defined artifacts
```

**Example - Product Manager**:
```
Invoking skill-grill-me for customer interview:
  → Phase A: Problem Understanding
     Q: What problem are you solving?
     A: {customer answer documented}
  → Phase B: User Understanding
     Q: Who are your primary users?
     A: {personas identified with pain points}
  → Phase C: Constraints
     Q: What constraints exist?
     A: {timeline, budget, dependencies documented}
  → Phase D: Success Criteria
     Q: How will you measure success?
     A: {QUANTS metrics defined}

✓ Grill-me complete: Customer confirms shared understanding

Now invoking skill-requirements to define user stories...
[INVEST criteria applied, acceptance criteria documented]
```

### 3. Phase Gate Validation

At phase completion, gate reviewer checks:

```
Checklist:
□ Agent explicitly invoked all skills (in log/output)
□ Each skill methodology was applied
□ Skill-specific artifacts created (e.g., ADR for architect)
□ Output shows skill applied, not just "done"
□ Quality reflects skill rigor

FAIL if: ANY skill was skipped without documented justification
PASS if: ALL skills were invoked and applied
```

### 4. Orchestrator Validation

Orchestrator tracks skill usage:

```javascript
const validator = new SkillValidator();
const result = validator.validateAgentSkillUsage(
  'product-manager',
  agentExecutionOutput
);

if (result.status === 'FAIL') {
  console.error(`Agent missing skills: ${result.missingSkills.join(', ')}`);
  phaseGate.reject(`Skills not applied: ${result.missingSkills}`);
} else {
  console.log(`✓ Agent used all ${result.requiredSkills.length} skills`);
  phaseGate.approve();
}
```

## Skill Usage By Phase

### Phase 1: Planning

**product-manager**: skill-grill-me (MANDATORY)
- What: Relentless customer interview with decision tree walk
- How: 4 phases (Problem → Users → Constraints → Success)
- Output: grill-summary.md with customer sign-off
- Validation: All 4 phases documented, customer confirmed

**business-analyst**: skill-requirements (MANDATORY)
- What: INVEST criteria applied to all user stories
- How: Independent, Negotiable, Valuable, Estimable, Small, Testable
- Output: User stories with AC, ranked, estimated
- Validation: All stories INVEST-compliant

**software-architect**: skill-architecture (MANDATORY)
- What: ADR (Architecture Decision Record) with trade-offs
- How: Document context, decision, consequences, alternatives
- Output: ADR file, component diagrams, trade-off matrix
- Validation: ADR complete, rationale clear

### Phase 2: Design

**ux-researcher**: skill-ux-design (MANDATORY)
- What: User journeys, personas, pain points
- How: User research, journey mapping, scenario testing
- Output: Personas with pain points, journey maps
- Validation: Research documented, personas validated

**ui-ux-designer**: skill-ux-design (MANDATORY)
- What: Component specs, design system, wireframes
- How: Design tokens, component library, interaction specs
- Output: Wireframes, design spec, component guide
- Validation: All components specified, reusable

### Phase 3: Development

**backend-engineer**: skill-architecture (MANDATORY)
- What: System design with service interactions
- How: Component diagrams, data flows, integration points
- Output: Architecture clear in code organization
- Validation: Services loosely coupled, clear contracts

**frontend-engineer**: skill-code-standards (MANDATORY)
- What: Linting, formatting, style enforcement
- How: ESLint, Prettier, code review for conventions
- Output: Code passes lint, consistent formatting
- Validation: No lint errors, consistent style

**database-engineer**: skill-architecture (MANDATORY)
- What: Schema normalization, indexing strategy
- How: Normal form analysis, index design, partitioning
- Output: Well-designed schema with indexes
- Validation: Normalized, performant queries

### Phase 4: Testing

**qa-manual-tester**: skill-testing (MANDATORY)
- What: Test case design with edge cases
- How: Scenario-based testing, boundary analysis
- Output: Test cases documenting scenarios
- Validation: Edge cases explored, bugs ranked

**automation-qa-engineer**: skill-tdd (MANDATORY)
- What: Test-Driven Development
- How: Write tests first, implement to pass
- Output: Tests before code, high coverage
- Validation: Coverage >70%, tests passing

**appsec-engineer**: skill-security-audit (MANDATORY)
- What: OWASP Top 10 compliance check
- How: Code review, SAST tools, manual testing
- Output: Vulnerability list with severity, remediation
- Validation: Critical issues fixed, OWASP aligned

### Phase 5: Deployment

**devops-engineer**: skill-cicd (MANDATORY)
- What: CI/CD pipeline with quality gates
- How: GitHub Actions, pre-commit hooks, automated testing
- Output: Pipeline code, gate definitions
- Validation: Pipeline passes all checks, deployments safe

**cloud-engineer**: skill-cloud-infra (MANDATORY)
- What: Infrastructure as Code with security/scaling
- How: Terraform/CDK, VPC design, IAM roles
- Output: IaC code, infrastructure documented
- Validation: IaC deployable, secure, scalable

### Phase 6: Operations

**sre-engineer**: skill-ops-sre (MANDATORY)
- What: SLOs with monitoring and runbooks
- How: Define targets, implement alerts, test runbooks
- Output: SLO document, monitoring dashboards, runbooks
- Validation: SLOs measurable, runbooks tested

**tech-lead**: skill-code-review (MANDATORY)
- What: Code review standards enforcement
- How: Define review criteria, enforce in PRs
- Output: Review checklist, enforced standards
- Validation: Code reviews mandatory, standards followed

## Enforcement Mechanisms

### Mechanism 1: Skill Declaration Validation

✓ At agent load time:
- Verify agent has `skills:` field
- Verify each skill exists in skills/ folder
- Warn if skill missing (will cause gate failure)

### Mechanism 2: Execution Logging

✓ During agent execution:
- Agent logs skill invocations explicitly
- Orchestrator captures logs
- Dashboard shows skill usage timeline

### Mechanism 3: Output Artifacts

✓ Agent produces skill-specific artifacts:
- ADR files for architects
- Test cases for QA
- STRIDE analysis for security
- Design system for UX
- Runbooks for ops

### Mechanism 4: Phase Gate Validation

✓ Before allowing phase progression:
- Run SkillValidator on agent output
- Check all skills mentioned
- Verify artifacts present
- Block phase if skills missing

### Mechanism 5: Dashboard Reporting

✓ Dashboard shows:
- Skill invocations per agent
- Skills completed vs. missing
- Phase gate skill status
- Remediation needed if failed

## Example: Phase 1 Gate Validation

```
PHASE GATE: Planning Completion Check

Agent: product-manager
├─ Required Skills: skill-grill-me, skill-requirements, skill-prd-synthesis
├─ Execution Log Analysis:
│  ├─ skill-grill-me: FOUND ✓ (Phase A-D documented)
│  ├─ skill-requirements: FOUND ✓ (INVEST applied)
│  └─ skill-prd-synthesis: FOUND ✓ (PRD synthesized)
├─ Artifacts Check:
│  ├─ .sdlc/01-grill-summary.md: EXISTS ✓
│  ├─ .sdlc/01-requirements.md: EXISTS ✓
│  └─ .sdlc/01-roadmap.md: EXISTS ✓
└─ Gate Status: ✅ PASS → Proceed to Phase 2

Agent: business-analyst
├─ Required Skills: skill-requirements, skill-plan-breakdown, skill-issue-triage
├─ Execution Log Analysis:
│  ├─ skill-requirements: FOUND ✓ (INVEST criteria applied)
│  ├─ skill-plan-breakdown: FOUND ✓ (Stories estimable and small)
│  └─ skill-issue-triage: FOUND ✓ (GitHub issues created)
├─ Artifacts Check:
│  ├─ .sdlc/01-requirements.md: EXISTS ✓
│  └─ GitHub Issues: 15 created ✓
└─ Gate Status: ✅ PASS → Proceed to Phase 2

PHASE GATE RESULT: ✅ PASS
All agents invoked all required skills.
Proceeding to Phase 2: Design & Prototyping
```

## What Happens If Skills Are Skipped?

### Scenario: Backend Engineer Skips skill-architecture

```
Agent: backend-engineer
├─ Required Skills: skill-code-standards, skill-code-quality, skill-architecture
├─ Execution Log Analysis:
│  ├─ skill-code-standards: FOUND ✓
│  ├─ skill-code-quality: FOUND ✓
│  └─ skill-architecture: NOT FOUND ✗
│
└─ Gate Status: ❌ FAIL
   Reason: skill-architecture not invoked
   
REJECTION: 
"Agent backend-engineer did not invoke required skill-architecture.
Architecture decisions must be documented with trade-offs.
Re-run agent with architecture methodology applied."

Action Required:
→ Backend engineer must re-execute with skill-architecture
→ Document system design, component interactions, trade-offs
→ Provide architecture diagram or decision log
→ Re-submit to phase gate
```

## Non-Negotiable Cases

These cases DO NOT allow skipping:

```
1. "This skill is too obvious"
   → NO. Obvious things still need documentation.

2. "This skill doesn't apply to our project"
   → Escalate to phase gate reviewer with justification.
   → Reviewer must approve deviation from MANDATE.

3. "I ran out of time"
   → Phase does not complete until skills applied.
   → Better late with skills than early without.

4. "We already did this before the phase"
   → Re-apply it formally within this phase.
   → Each phase applies skills independently.
```

## Validation Commands

```bash
# Check agent skills declaration
node scripts/skill-validator.js product-manager

# Validate phase output
node scripts/skill-validator.js backend-engineer "$(cat .sdlc/run-*/03-implementation.log)"

# Write validation report
node scripts/skill-validator.js \
  product-manager \
  "Invoking skill-grill-me... Phases A-D complete... PRD synthesized"
```

## Troubleshooting

**Problem**: "Agent missing skills X, Y, Z"

**Solution**:
1. Check agent frontmatter has `skills:` field
2. Verify skill exists in skills/ folder
3. Verify agent execution log mentions skill
4. Check artifact produced by skill exists

**Problem**: "Skill validation fails but I applied the skill"

**Solution**:
- Validator looks for explicit mentions in logs:
  - "Invoking skill-X"
  - "Using skill-X"
  - "Applying skill-X"
- Make sure agent output explicitly states skill invocation
- Don't just apply it silently—announce it

## Summary

**Mandatory Skills = Industry Standards in Practice**

Every agent's assigned skills are MANDATORY, non-negotiable requirements that ensure output quality aligns with proven best practices. Phases do not complete without skill application.

This is a hard gate. There are no exceptions.
