# SDLC Workflow Plugin

A complete Google Engineering Team in a Plugin: 26 agents across 9 phases, 43 knowledge skills, 14 commands. Covers planning → incident response → retrospectives, with industry-standard practices from Google, mattpocock, and SDLC best practices:

- **Software Engineering at Google** — QUANTS, INVEST, Critique/LGTM, Testing Pyramid, CI/CD
- **Architecture: The Hard Parts** — ADR, coupling/cohesion, fitness functions, service design
- **The Pragmatic Programmer** — DRY, ETC, tracer bullets, code generation
- **Clean Code** — naming, small functions, F.I.R.S.T. tests, SOLID

## Features

### 26 Specialized Agents + Auto-Skill Loading (Phase 1 & 2 Complete)

**All agents auto-load phase-specific skills** — agents automatically apply relevant methodologies to produce Google-standard outputs. 

**New agents in Phase 1 & 2**:
- Engineering Manager (team health, retrospectives, QUANTS)
- Tech Lead (architecture, RFC/ADR, mentoring)
- Release Manager (versioning, canary rollout, release notes)
- Technical Writer (API docs, SDKs, guides)
- Performance Engineer (profiling, benchmarking, optimization)
- Accessibility Engineer (WCAG 2.1 AA, screen readers, a11y)

**Phase 1 — Planning, Strategy & Requirements**
- Product Manager (roadmap, milestones) → skill-requirements, skill-prd-synthesis
- Business Analyst (user stories, acceptance criteria) → skill-requirements, skill-plan-breakdown, skill-issue-triage
- Software Architect (tech stack, ADR, system blueprint) → skill-architecture, skill-threat-modeling
- Security Architect (threat modeling, STRIDE) → skill-threat-modeling, skill-security-audit

**Phase 2 — Design & Prototyping**
- UX Researcher (user journeys, personas)
- UI/UX Designer (wireframes, design system)

**Phase 3 — Development & Coding**
- Frontend Engineer (UI, client-side)
- Backend Engineer (servers, APIs, business logic)
- Fullstack Engineer (end-to-end features)
- Database Engineer (schema, migrations, indexing)
- Mobile Developer (iOS/Android)

**Phase 4 — Testing & Security Auditing**
- QA Manual Tester (exploratory testing, user-perspective bugs)
- Automation QA Engineer (test suite generation, CI-wired execution)
- AppSec Engineer (SAST, CVE scanning, OWASP Top 10)
- Penetration Tester (attack simulation, injection testing, auth bypass)

**Phase 5 — Infrastructure & Deployment**
- DevOps Engineer (CI/CD, Dockerfile, presubmit gates)
- Cloud Engineer (IaC, VPC, IAM, storage)

**Phase 6 — Production, Maintenance & Monitoring**
- SRE Engineer (SLO/SLI definition, on-call runbooks)
- SecOps/SOC Analyst (security monitoring, incident response)
- Data Engineer (data pipelines, ETL/ELT, analytics)

### 9 Commands + Parallel Mode

| Command | Phase | Purpose |
|---------|-------|---------|
| `/sdlc` | All | Master orchestrator with 6-phase gates and shared state |
| `/sdlc --parallel` | All | Run all phases with agents working in parallel |
| `/sdlc-parallel` | Any | Run phase with agents collaborating in parallel |
| `/sdlc-plan` | 1 | Requirements gathering → PRD + stories + threat model |
| `/sdlc-design` | 2 | UX research → wireframes + component spec |
| `/sdlc-dev` | 3 | Full-stack implementation per architecture |
| `/sdlc-test` | 4 | Test suite + security audits (AppSec + pen test) |
| `/sdlc-deploy` | 5 | CI/CD pipeline + cloud IaC |
| `/sdlc-ops` | 6 | SLOs + security monitoring + data pipelines |
| `/sdlc-review` | Any | SE@Google Critique-style PR review with gh pr comments |

### 43 Knowledge Skills

Skills inject methodology into agents (no tools/model — pure knowledge context). Organized by phase + utilities:

**Phase 1 — Planning & Requirements**
- `skill-requirements` — INVEST criteria, QUANTS framework
- `skill-prd-synthesis` — Convert conversation context into PRD
- `skill-plan-breakdown` — Break plan into vertical-slice issues
- `skill-issue-triage` — Triage workflow for bugs/features

**Phase 2 — Design & Prototyping**
- `skill-ux-design` — User journeys, personas, wireframing
- `skill-prototype` — Throwaway code to validate design assumptions

**Phase 3 — Development & Coding**
- `skill-code-standards` — Clean Code, SOLID, DRY, naming
- `skill-architecture` — ADR format, coupling/cohesion, fitness functions
- `skill-architecture-refactor` — Find deepening opportunities, improve testability
- `skill-zoom-out` — Understand code at higher abstraction level

**Phase 4 — Testing & Security Auditing**
- `skill-code-quality` — Linting, testing pyramid, SAST/SCA, security standards, CI/CD gates
- `skill-code-review` — SE@Google Critique taxonomy, LGTM culture
- `skill-pr-review` — Multi-agent parallel PR review, CLAUDE.md compliance, git history, confidence scoring
- `skill-testing` — Testing Pyramid, F.I.R.S.T., test doubles
- `skill-tdd` — Test-driven development: red-green-refactor loop
- `skill-playwright` — Browser automation, E2E testing, visual regression, cross-browser validation
- `skill-diagnose` — Disciplined bug diagnosis, reproduce → hypothesise → instrument → fix
- `skill-threat-modeling` — STRIDE, PASTA, attack surface mapping
- `skill-security-audit` — OWASP Top 10, CWE taint analysis

**Phase 5 — Infrastructure & Deployment**
- `skill-cicd` — Hermetic builds, presubmit gates, trunk-based dev
- `skill-precommit-hooks` — Pre-commit enforcement for quality gates
- `skill-cloud-infra` — Terraform, IaC patterns, cloud services

**Phase 6 — Operations & Maintenance**
- `skill-ops-sre` — SLO/SLI, QUANTS, error budgets, toil measurement
- `skill-documentation` — Audience-first writing, docs-as-code

**Utilities & Meta**
- `skill-caveman` — Ultra-compressed communication, 75% token reduction
- `skill-grill-me` — Relentless design review, decision tree interrogation
- `skill-handoff` — Compact session for agent handoff
- `skill-teach` — Teach skill/concept over multiple sessions
- `skill-write-skill` — Create new agent skills
- `skill-git-safety` — Git destructive operation guards

## Installation

### Quick Install (1 minute)

```bash
npm install -g sdlc-workflow
sdlc-workflow install
```

**Or from source:**

```bash
git clone https://github.com/saitarrun/sdlc-workflow
cd sdlc-workflow
npm run install-local
```

**Or via Claude Code:**

```
/plugin install github:saitarrun/sdlc-workflow
```

See [INSTALLATION.md](./INSTALLATION.md) for detailed setup instructions.

## Usage

### Master Orchestrator

Run the full 6-phase SDLC pipeline end-to-end:

```
/sdlc "build a user authentication system"
```

The command will:
1. Parse the feature request
2. Initialize `.sdlc/run-<timestamp>/` for shared state
3. Spawn agents sequentially through all 6 phases with explicit user approval gates between phases
4. Produce comprehensive artifacts (PRD, ADR, threat model, wireframes, code, tests, security audit, SLOs, runbooks)
5. Offer to create a GitHub PR with all changes

### Individual Phase Commands

For faster iteration, run individual phases:

```bash
/sdlc-plan "add OAuth login"                    # Phase 1 only
/sdlc-design                                     # Phase 2 only
/sdlc-dev --stack backend,frontend               # Phase 3 (backend + frontend)
/sdlc-test --layer all --run                     # Phase 4 (full test + security)
/sdlc-deploy --trigger                           # Phase 5 (CI/CD + cloud)
/sdlc-ops --framework prometheus                 # Phase 6 (SRE + monitoring)
```

### Code Review

Perform SE@Google Critique-style review on any PR:

```bash
/sdlc-review --pr 1                              # Review PR #1 with 3 parallel agents
```

The command posts inline comments via `gh pr comment`, confidence-filtered to show only high-confidence issues.

## Multi-Agent Parallel Collaboration (NEW in v1.0.0)

All 20 agents work **in parallel** with **real-time communication** and **shared context**:

- **Parallel Execution**: Multiple agents work simultaneously on independent tasks
- **Shared Workspace**: `.sdlc/run-<timestamp>/` with `context.json` for shared state
- **Collaboration Log**: Real-time messages between agents (`collaboration-log.json`)
- **Dependency Management**: Agents automatically wait for blocking dependencies
- **Feedback Loops**: Peer review and validation run in parallel with development
- **Speedup**: 2-3x faster than sequential execution

### Example: Phase 3 Development (Parallel vs Sequential)

**Sequential (Old Way)**:
```
SoftwareArchitect ──► FrontendEngineer ──► BackendEngineer ──► DatabaseEngineer
    12m                   12m                   12m                 12m
                                                                   = 48 minutes total
```

**Parallel (New Way)**:
```
SoftwareArchitect (12m)
        │
    (publishes architecture)
        │
    ┌───┴────┬──────────┐
    ▼        ▼          ▼
   FE (12m) BE (12m)  DB (12m)  ◄── All run in parallel
    └────┬────┘
         ▼
   Integration (3m)
                                = 25 minutes total (2x speedup)
```

### Usage

```bash
# Run all phases with parallel agents
/sdlc "build a user auth system" --parallel

# Run specific phase with parallelization
/sdlc-parallel phase-3 --max-workers=4 --feedback-loops

# Show real-time collaboration log
/sdlc --show-collaboration-log --verbose
```

See [AGENT_COLLABORATION.md](./AGENT_COLLABORATION.md) for full documentation.

---

## Code Quality Standards (v1.0.0)

The plugin now enforces comprehensive code quality standards across 5 dimensions:

1. **Static Code Quality** — Linting, formatting, naming conventions, complexity control, DRY
2. **Testing & Coverage** — Unit/integration/E2E tests, 80%+ coverage threshold, F.I.R.S.T. principles
3. **Architecture** — SOLID principles, documentation, technical debt tracking, dependency hygiene
4. **Security (DevSecOps)** — SAST scanning, SCA audits, secret detection, input validation
5. **Review & CI/CD** — Peer reviews, automated quality gates, blocking on failures

### Ready-to-Use Configuration Templates

All agents come with working configurations:
- **ESLint** (.eslintrc.js) — Linting rules for naming, complexity, security
- **Jest** (jest.config.js) — Testing pyramid 70/20/10, coverage thresholds
- **Pre-commit hooks** (.husky/pre-commit) — Enforce standards before commit
- **GitHub Actions** (ci.yml) — Full CI/CD pipeline with quality gates
- **NPM scripts** (package.json) — Commands for all quality checks

See [skill-code-quality](./skills/skill-code-quality/) for complete documentation and implementation examples.

---

## Book Principles in Action

### Clean Code Principles

All development agents enforce:
- Meaningful names (no `d`, `info`, `data`)
- Small functions (≤20 lines)
- One level of abstraction per function
- Self-documenting code reduces comment burden

### SE@Google Practices

- **Critique/LGTM code review** — Blocking issues vs. nits; 24-hour SLA
- **Testing Pyramid** — Unit (cheap) ≫ Integration ≫ E2E (expensive)
- **Beyoncé Rule** — "If you care about it, test it"
- **Hermetic builds** — No network calls, reproducible artifacts, artifact-based caching
- **Trunk-based development** — Short-lived branches, feature flags preferred, no broken trunk
- **QUANTS framework** — Measure productivity via Quality, Attention, Toil, Time, Satisfaction

### Architecture: The Hard Parts

- **ADR (Architecture Decision Record)** — Context, Decision, Consequences + explicit trade-off table
- **Coupling spectrum** — Service granularity decisions justified by coupling analysis
- **Fitness functions** — Automated architecture compliance checks
- **One-Version Rule** — Minimize external dependency versions

### Pragmatic Programmer

- **DRY (Don't Repeat Yourself)** — Applied to code, schema, IaC, documentation
- **ETC (Easy To Change)** — Every design choice evaluated for changeability
- **Tracer bullets** — Build minimal end-to-end feature first, then iterate
- **No broken windows** — Fix technical debt immediately, don't let it accumulate
- **Code generation** — Generate repetitive code patterns, not written by hand

## Extending the Plugin

### Adding a New Agent

1. Create `agents/new-agent-name.md` with frontmatter:
   ```yaml
   ---
   name: new-agent-name
   description: When to invoke this agent...
   tools: Read, Bash, Write, etc.
   model: haiku|sonnet|opus
   color: optional-hex-or-name
   ---
   ```

2. Write the system prompt in the body with book principles embedded

3. Update `skills/` to reference relevant methodologies if needed

4. Integrate into a command or the master `/sdlc` orchestrator

### Adding a New Skill

1. Create `skills/skill-name/SKILL.md` with frontmatter:
   ```yaml
   ---
   name: skill-name
   description: This skill should be used when the user asks to "..."
   version: 1.0.0
   ---
   ```

2. Write methodology content that agents will load automatically

3. Add optional reference files in `skills/skill-name/references/`

## Development

### Validate Plugin Structure

```bash
make validate
```

### Remove Plugin

```bash
make uninstall
```

## Verification

Test the plugin with sample features:

1. **Phase 1 — Planning:** `/sdlc-plan "add user profile page"`
   - ✓ PRD generated
   - ✓ User stories + AC written
   - ✓ Threat model (STRIDE) produced
   - ✓ GitHub issues created

2. **Phase 2 — Design:** `/sdlc-design`
   - ✓ User journey maps written
   - ✓ ASCII wireframes produced

3. **Phase 3 — Development:** `/sdlc-dev --stack backend,frontend`
   - ✓ Backend code generated (APIs, business logic)
   - ✓ Frontend code generated (UI, client logic)

4. **Phase 4 — Testing:** `/sdlc-test --layer all --run`
   - ✓ Unit tests generated (70%)
   - ✓ Integration tests (20%)
   - ✓ E2E tests (10%)
   - ✓ OWASP/CWE audit performed
   - ✓ Pen test findings documented

5. **Phase 5 — Deployment:** `/sdlc-deploy --trigger`
   - ✓ GitHub Actions pipeline created
   - ✓ Dockerfile generated
   - ✓ Terraform IaC written
   - ✓ Pipeline runs green

6. **Phase 6 — Operations:** `/sdlc-ops --framework prometheus`
   - ✓ SLOs defined
   - ✓ Alerting rules written
   - ✓ Runbook stub created
   - ✓ QUANTS summary produced

7. **End-to-end:** `/sdlc "build a user authentication system"`
   - ✓ All 6 phases run sequentially with approval gates
   - ✓ Comprehensive artifacts produced
   - ✓ PR offered with auto-generated summary

## License

MIT (or as specified by the user)

## Contributing

To extend this plugin with new agents, skills, or commands, follow the patterns documented in [CLAUDE.md](./CLAUDE.md).
