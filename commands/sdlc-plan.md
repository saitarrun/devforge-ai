---
description: Phase 1 planning — grill-me interview + 4 sequential agents (product-manager → business-analyst → software-architect → security-architect)
argument-hint: <feature-description>
tools: Agent, AskUserQuestion
model: sonnet
---

# /sdlc-plan — Phase 1: Planning

Conduct mandatory grill-me interview, then spawn 4 Phase 1 agents sequentially to produce roadmap, requirements, architecture, and threat model.

## How This Works

1. **Interview** — Ask 32 questions one-at-a-time across 8 sections
2. **Save** — Document all answers in `./projects/<feature-name>/docs/01-grill-summary.md`
3. **Spawn Agents** — Invoke 4 agents sequentially:
   - `product-manager` (uses grill answers → creates roadmap)
   - `business-analyst` (uses grill + roadmap → creates requirements)
   - `software-architect` (uses grill + requirements → creates architecture)
   - `security-architect` (uses grill + architecture → creates threat model)

---

## EXECUTION

### STEP 1: Grill-Me Interview

Ask **32 questions ONE AT A TIME** across these 8 sections. For each question, wait for user answer before proceeding to next.

**Section 1: Problem & Pain Points (4 questions)**
1. What is the core problem you're solving?
2. Who experiences this problem?
3. Why is this important NOW?
4. What's the business impact if unsolved?

**Section 2: Users & Personas (4 questions)**
5. Who are your primary users? (describe 2-3 personas)
6. What are their specific pain points?
7. How do they currently solve this (status quo)?
8. How would they measure success?

**Section 3: Scope & Constraints (5 questions)**
9. What's your timeline/deadline?
10. How many engineers can work on this?
11. What's your budget/resource constraints?
12. What's explicitly off-limits (what won't you do)?
13. What dependencies exist (other teams, APIs, infrastructure)?

**Section 4: Technical Landscape (4 questions)**
14. What's your existing tech stack?
15. What can you reuse vs. build new?
16. What are hard constraints? (compliance, security, legacy systems)
17. Are there preferred technologies or frameworks?

**Section 5: Performance & Scale (3 questions)**
18. How many users/requests per second?
19. What latency targets do you have?
20. What's the growth trajectory? (1 year, 5 years)

**Section 6: Security & Compliance (4 questions)**
21. What data will you handle? (PII, payment, health, etc.)
22. What compliance requirements apply? (GDPR, SOC2, PCI, HIPAA)
23. What security threats matter most?
24. Are there industry-specific standards?

**Section 7: Success Metrics - QUANTS (5 questions)**
25. **Quality**: How do you measure quality? (bugs, uptime %, test coverage)
26. **Attention**: How will success be measured? (DAU, adoption %, engagement)
27. **Toil**: How much manual work does this eliminate?
28. **Time**: What time-based metrics matter? (faster deployments, quicker response)
29. **Satisfaction**: How happy should users/team be? (NPS, CSAT, developer happiness)

**Section 8: Dependencies & Risks (3 questions)**
30. What needs to happen BEFORE you can start?
31. What are the biggest unknown risks?
32. What are your key assumptions? (What could be wrong?)

**After all 32 questions:** Summarize your understanding and ask: 
> "Based on your answers, here's what I understand: [summary]. Is this accurate and complete? Is there anything I misunderstood or anything critical missing?"

If user says no or wants clarification, drill deeper on those specific areas until they confirm.

### STEP 2: Save Grill Summary

Create file: `./projects/<feature-name>/docs/01-grill-summary.md`

Format:
```markdown
# Grill-Me Interview Summary

**Feature**: [feature description]
**Date**: [timestamp]

## Section 1: Problem & Pain Points
[Q1 answer]
[Q2 answer]
[Q3 answer]
[Q4 answer]

## Section 2: Users & Personas
[Q5 answer]
[Q6 answer]
[Q7 answer]
[Q8 answer]

## Section 3: Scope & Constraints
[Q9 answer]
[Q10 answer]
[Q11 answer]
[Q12 answer]
[Q13 answer]

## Section 4: Technical Landscape
[Q14 answer]
[Q15 answer]
[Q16 answer]
[Q17 answer]

## Section 5: Performance & Scale
[Q18 answer]
[Q19 answer]
[Q20 answer]

## Section 6: Security & Compliance
[Q21 answer]
[Q22 answer]
[Q23 answer]
[Q24 answer]

## Section 7: Success Metrics (QUANTS)
[Q25-Q29 answers]

## Section 8: Dependencies & Risks
[Q30 answer]
[Q31 answer]
[Q32 answer]

## Confirmation
✅ User confirmed this summary is accurate and complete.
```

### STEP 3: Spawn Phase 1 Agents (6 agents, 2 parallel groups)

**Sequential Order:**
1. product-manager (no deps)
2. business-analyst (needs product-manager)
3. software-architect (needs business-analyst)
4. security-architect (needs software-architect)
5. tech-lead (parallel with security-architect, needs software-architect)
6. engineering-manager (parallel with security-architect, needs business-analyst)

---

**Agent 1: product-manager** (FIRST — blocks business-analyst)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "Product Manager (Phase 1) — Define vision, roadmap, QUANTS metrics",
  prompt: "[Full grill-me summary]
  
  Skills: skill-grill-me, skill-requirements, skill-prd-synthesis
  
  Using grill-me answers as your single source of truth:
  1. Create 01-roadmap.md with:
     - Product vision (problem solved, target users)
     - Feature roadmap (MVP + phases)
     - QUANTS metrics (quality, attention, toil, time, satisfaction targets)
     - Milestones + timeline
  2. Save to: ./projects/<feature-name>/docs/01-roadmap.md"
})
```

**Wait for product-manager to complete.**

---

**Agent 2: business-analyst** (SECOND — needs product-manager)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "Business Analyst (Phase 1) — Decompose into INVEST user stories",
  prompt: "[Full grill-me summary + 01-roadmap.md]
  
  Skills: skill-requirements, skill-plan-breakdown, skill-issue-triage
  
  Using grill-me + roadmap as ground truth:
  1. Create 01-requirements.md with:
     - User personas (from grill-me)
     - User stories (INVEST format: Given/When/Then)
     - Acceptance criteria (testable, measurable)
     - Data flow diagrams
     - Business rules + edge cases
  2. Stories must reference personas + pain points from grill-me
  3. Save to: ./projects/<feature-name>/docs/01-requirements.md"
})
```

**Wait for business-analyst to complete.**

---

**Agent 3: software-architect** (THIRD — needs business-analyst)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "Software Architect (Phase 1) — Tech stack, ADR, component design",
  prompt: "[Full grill-me summary + 01-requirements.md]
  
  Skills: skill-architecture, skill-threat-modeling, skill-zoom-out
  
  Using grill-me constraints + requirements as ground truth:
  1. Create 01-architecture.md with:
     - ADR (Context/Decision/Consequences format)
     - Tech stack (respects grill-me constraints: timeline, team, budget)
     - Component design (services, databases, APIs)
     - Trade-off analysis (3 options per major decision)
     - Fitness functions (automated architecture compliance)
  2. Create ARCHITECTURE.mmd with Mermaid diagrams:
     - Component diagram (services + dependencies)
     - Deployment diagram (frontend, backend services, databases)
     - Data flow diagram
  3. Save to: ./projects/<feature-name>/docs/"
})
```

**Wait for software-architect to complete.**

---

**NOW SPAWN IN PARALLEL (both depend on architecture):**

**Agent 4: security-architect** (PARALLEL)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "Security Architect (Phase 1) — STRIDE threat modeling",
  prompt: "[Full grill-me summary + 01-architecture.md]
  
  Skills: skill-threat-modeling, skill-security-audit
  
  Using grill-me security requirements + architecture:
  1. Create 01-threat-model.md with:
     - STRIDE analysis (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)
     - Threat actors (from grill-me personas)
     - Attack surfaces (user inputs, API boundaries, data stores)
     - Security controls (authentication, authorization, encryption, logging)
     - Risk ranking (Critical/High/Medium/Low)
  2. Threat model must align with grill-me compliance requirements
  3. Save to: ./projects/<feature-name>/docs/01-threat-model.md"
})
```

**Agent 5: tech-lead** (PARALLEL with security-architect)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "Tech Lead (Phase 1) — Review architecture decisions",
  prompt: "[Full grill-me summary + 01-architecture.md + 01-requirements.md]
  
  Skills: skill-architecture, skill-knowledge-management, skill-api-design, skill-tech-debt, skill-code-review
  
  Using architecture as initial design:
  1. Review ADR for completeness + clarity
  2. Provide feedback on:
     - Tech stack choices (scalability, team familiarity)
     - Component boundaries (coupling/cohesion)
     - API contracts (design consistency)
  3. Identify technical debt risks early
  4. Create tech-lead-feedback.md with:
     - Architecture strengths
     - Risks to watch
     - Code review guidelines for Phase 3
  5. Save to: ./projects/<feature-name>/docs/tech-lead-feedback.md"
})
```

**Agent 6: engineering-manager** (PARALLEL with security-architect + tech-lead)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "Engineering Manager (Phase 1) — Team planning + skill gaps",
  prompt: "[Full grill-me summary + 01-requirements.md]
  
  Skills: skill-organizational-health, skill-knowledge-management, skill-tech-debt
  
  Using grill-me constraints + user stories:
  1. Create team-plan.md with:
     - Team composition (from grill-me: engineer count + timeline)
     - Skill gaps (identify specialists needed)
     - Parallel work streams (which teams work on what)
     - Risk mitigation (single points of failure)
     - Knowledge transfer plan
  2. Align with grill-me timeline + budget constraints
  3. Save to: ./projects/<feature-name>/docs/team-plan.md"
})
```

**Wait for all 3 parallel agents to complete (security-architect, tech-lead, engineering-manager).**

### STEP 4: Display Completion

Show:
```
✅ Phase 1 Complete! (6 agents invoked)

📁 Artifacts created:
  ./projects/<feature-name>/docs/
    ├── 01-grill-summary.md           (source of truth)
    ├── 01-roadmap.md                 (product-manager)
    ├── 01-requirements.md            (business-analyst)
    ├── 01-architecture.md            (software-architect)
    ├── ARCHITECTURE.mmd              (software-architect)
    ├── 01-threat-model.md            (security-architect)
    ├── tech-lead-feedback.md         (tech-lead)
    └── team-plan.md                  (engineering-manager)

✅ Agents completed:
  1. product-manager        → roadmap + vision
  2. business-analyst       → user stories + AC
  3. software-architect     → tech stack + ADR
  4. security-architect     → threat model + controls
  5. tech-lead             → architecture review
  6. engineering-manager   → team plan + skills

All artifacts in: ./projects/<feature-name>/docs/

Next: Run /sdlc-design for Phase 2 (Design & Prototyping)
```

---

## CRITICAL RULES

✅ **MANDATORY**: All 32 questions must be asked
✅ **MANDATORY**: Grill summary MUST be saved before agents start
✅ **MANDATORY**: Agents must be spawned SEQUENTIALLY (wait for each to complete)
✅ **MANDATORY**: Each agent reads grill-summary as first step
✅ **MANDATORY**: Use `fork` subagent_type to keep context

## Source of Truth

Grill-me answers are the **single source of truth** for all Phase 1 agents. Every artifact downstream must be grounded in customer input, not assumptions.
