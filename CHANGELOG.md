# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2026-06-19

### Breaking Changes

#### 26 → 10 Agent Consolidation
- Removed 19 agents; replaced with 3 merged agents and updated 6 existing
- `ux-designer` — merged ux-researcher + ui-ux-designer
- `qa-engineer` — merged qa-manual-tester + automation-qa-engineer
- `security-engineer` — merged appsec-engineer + penetration-tester
- `devops-engineer` — absorbed cloud-engineer + release-manager
- `sre-engineer` — absorbed secops-analyst

#### 6 → 5 Phase Pipeline
- Removed Design phase; UX now runs at start of Build phase (gated on `has_ui`)
- Phases: Plan → Build → Verify → Ship → Operate
- Commands: `/sdlc-build` (was `/sdlc-dev`), `/sdlc-verify` (was `/sdlc-test`), `/sdlc-ship` (was `/sdlc-deploy`), `/sdlc-operate` (was `/sdlc-ops`)
- Removed: `/sdlc-design`, `/sdlc-parallel`, `/sdlc-release`, `/sdlc-incident`, `/sdlc-retrospective`, `/sdlc-optimize`, `/sdlc-tech-debt`

#### Tracer Bullet SDLC
- `scope.json` is now the single source of truth: `capability_flags` + `slices` array
- Each slice is a vertical increment: schema + api + ui + tests
- `implementation-log.md` tracks all slice completions (appended by fullstack-engineer)
- Phase handoffs via `handoffs/<phase>-handoff.md` — no conversation context carries across phases

#### Ralph Loop
- Inner loop: execute slice → verify (typecheck + slice tests) → pass/fail with 2-retry circuit breaker
- Outer loop: qa-engineer E2E → targeted slice retry (max 1) → circuit breaker
- New skill: `ralph-loop` in `skills/ralph-loop/SKILL.md`

### New Commands
- `/sdlc-implement` — implement a single Linear issue or free-form spec with Ralph Loop + /review + commit
- `/to-prd` — synthesize PRD from existing `grill-summary.md` + `scope.json` without rerunning Plan
- `/to-issues` — create Linear issues from `scope.json` slices; falls back to `docs/issues.md`

### Skills
- Renamed 33 skill directories: `skill-*` prefix removed (e.g. `skill-architecture` → `architecture`)
- Fixed all `name:` frontmatter fields to match directory names
- Deleted 11 unused skills: skill-accessibility, skill-build-systems, skill-caveman, skill-developer-relations, skill-incident-management, skill-knowledge-management, skill-localization, skill-organizational-health, skill-teach, skill-tech-debt, skill-release-management
- New skill: `ralph-loop`

### Scripts
- Deleted 11 dead orchestrator/dashboard scripts: agent-executor.js, agent-init-hook.js, agent-reporter.js, collaboration-framework.js, orchestrator.js, process-manager.js, sdlc-menu.js, sdlc-orchestrator.js, skill-validator.js, spawn-agent-wrapper.sh, spawn-phase-agents.js
- Removed stale npm scripts: `menu`, `orchestrator`, `agent-init`, `report-agent`

### Documentation
- README.md — full rewrite to reflect 5-phase tracer bullet architecture
- CLAUDE.md — updated to 10 agents × 5 phases; removed deleted file references
- INSTALLATION.md — updated command names
- CHANGELOG.md — this entry
- Deleted: AGENT_PHASE_MAP.md, EXECUTION_GUIDE.md, MIGRATION.md, QUICK_REFERENCE.md, AGENT_COLLABORATION.md, AGENT_DEVELOPMENT_GUIDE.md, AGENT_SKILLS_MANIFEST.md, INSTALLATION.md (docs/), QUICKSTART.md, SKILL_ENFORCEMENT_GUIDE.md

---

## [1.3.3] - 2026-06-17

### ✨ Features

#### Organized Project Directory Structure (Production-Ready)
- **New**: Every SDLC run creates organized `./projects/<feature-name>/` with 4 subdirectories:
  - **`docs/`** — All artifacts (requirements, architecture, threat model, test cases, SLOs, security audit, etc.)
  - **`frontend/`** — Frontend application code with `src/components/`, `pages/`, `services/`
  - **`backend/services/`** — Microservices architecture (api-gateway + domain services, each with own package.json + Dockerfile)
  - **`deployment/`** — All DevOps artifacts (GitHub Actions, Docker, Kubernetes, Terraform/Helm)
- **Microservices by default**: Backend always structured as microservices, ready for scaling
- **No loose files**: Zero artifacts at project root — everything organized into subdirectories
- **Agent output paths updated**: All 26 agents now write to organized paths
  - Phase 1 agents write docs to `docs/`
  - Frontend engineer writes to `frontend/src/`
  - Backend engineer scaffolds and writes to `backend/services/`
  - DevOps engineer writes to `deployment/`

#### Node_modules Guard
- **Safety**: Added guard to prevent running SDLC commands from inside node_modules
- **Error message**: Clear guidance if user accidentally runs commands from wrong location

#### Script Improvements
- **sdlc-orchestrator.js**: Scaffolds full project directory structure on init
- **orchestrator.js**: Added node_modules guard
- **agent-executor.js**: Enhanced output to show both project artifacts and orchestration state

### 🔄 Migration

Upgrading from v1.3.0 → v1.3.3:
1. Update plugin: `sudo npm install -g sdlc-ai-workflow@latest`
2. No breaking changes — old `.projects/<feature-name>/` flat structure still works for legacy runs
3. New runs automatically use organized structure
4. To migrate old projects, manually organize files into `docs/`, `frontend/`, `backend/services/`, `deployment/` (optional)

## [1.3.0] - 2026-06-17

### ⚠️ BREAKING CHANGES

#### Dashboard Removed
- Removed: `npm run ui` - Web-based dashboard for agent monitoring
- Removed: `npm run init-dashboard` - Dashboard initialization script
- Removed: Dashboard UI server (`scripts/ui-server.js`)
- **Migration**: Use Claude Code terminal output instead. Agents report progress via console logs and artifacts.
- **Impact**: Any scripts or CI/CD pipelines that invoke `npm run ui` or `npm run init-dashboard` must be updated.

#### Phase 1 Workflow Changed - Mandatory Grill-Me Interview
- **BREAKING**: Phase 1 now REQUIRES mandatory grill-me interview before any agent work
- **BREAKING**: Product Manager cannot proceed without completing all 4 grill-me phases (blocking gate)
- **BREAKING**: All downstream agents (Business Analyst, Software Architect, Security Architect) MUST read `./projects/<feature-name>/01-grill-summary.md` as first step
- **Impact**: Automated Phase 1 workflows that don't conduct grill-me interview will fail
- **Migration**: See MIGRATION.md for upgrade instructions

### ✨ Features

#### Phase 1: User-First Data Flow
- Mandatory grill-me skill with 4-phase interview (problem, users, constraints, success)
- Grill-summary.md created as single source of truth for all Phase 1 agents
- All downstream agents ground work in customer input, not assumptions
- Product Manager applies: skill-grill-me, skill-requirements, skill-prd-synthesis
- Business Analyst applies: skill-requirements, skill-plan-breakdown, skill-issue-triage
- Software Architect applies: skill-architecture, skill-threat-modeling, skill-zoom-out
- Security Architect applies: skill-threat-modeling, skill-security-audit

#### Enhanced Business Analyst
- Step 0: MANDATORY read grill-summary.md first
- Every user story must reference:
  - Persona from grill-summary
  - Pain point addressed (direct quote from grill-summary)
  - Success metric impact
- Stories grounded in customer input, not assumptions
- Applies INVEST criteria to grill-me validated requirements

#### Enhanced Software Architect
- Step 0: MANDATORY read grill-summary.md first
- Tech stack decisions CONSTRAINED by grill-me (not by "best practices")
- Respects customer constraints: timeline, team size, compliance requirements
- Examples:
  - "2 weeks + 2 engineers" → monolith (not microservices)
  - "Unknown tech stack" → proven patterns (not experiments)
  - "GDPR compliance" → tech with privacy-first design
- Produces ADR grounded in grill-me context

#### Enhanced Security Architect
- Step 0: MANDATORY read grill-summary.md first
- Threat model SCOPED to customer's actual concerns from grill-summary
- Threats prioritized by customer mentions:
  - Customer mentioned "account hijacking" → prioritize Spoofing threats
  - Customer mentioned "GDPR compliance" → prioritize Information Disclosure
  - Customer didn't mention regulatory needs → don't over-engineer compliance controls
- Every control evaluated: "Can we ship this in the customer's timeline?"

### 🗑️ Removed

- `scripts/ui-server.js` - Dashboard Express server
- `scripts/init-dashboard.js` - Dashboard initialization
- `scripts/ui/` - Dashboard UI directory (HTML, CSS, JS)
- `docs/DASHBOARD.md` - Dashboard architecture guide
- `docs/AGENT_DASHBOARD_INTEGRATION.md` - Agent-dashboard integration guide
- `docs/DASHBOARD_SYNCHRONIZATION.md` - Dashboard sync documentation
- `docs/AGENT_REPORTER_GUIDE.md` - Agent reporter integration guide
- `docs/screenshots/dashboard-overview.png` - Dashboard screenshot
- npm scripts: `ui`, `init-dashboard`

### 📝 Changed

- `README.md` - Removed dashboard references, added Phase 1 grill-me documentation
- `EXECUTION_GUIDE.md` - Removed all dashboard monitoring sections
- `commands/sdlc-plan.md` - Added data flow diagram showing grill-me → all agents
- `commands/sdlc.md` - Removed "Dashboard-Synced" phase section
- `agents/product-manager.md` - Enhanced with mandatory grill-me blocking gate
- `agents/business-analyst.md` - Enhanced with mandatory grill-summary read-first
- `agents/software-architect.md` - Enhanced with grill-me constraint-driven decisions
- `agents/security-architect.md` - Enhanced with grill-me scoped threat modeling
- `package.json` - Version bump to 1.3.0, removed ui scripts

### 📊 Stats

- Files changed: 18
- Insertions: 231
- Deletions: 2,319
- Agents enhanced: 4 (product-manager, business-analyst, software-architect, security-architect)
- Skills auto-wired: 9 (skill-grill-me, skill-requirements, skill-prd-synthesis, skill-plan-breakdown, skill-issue-triage, skill-architecture, skill-threat-modeling, skill-zoom-out, skill-security-audit)

### 🔄 Migration Guide

See **MIGRATION.md** for detailed upgrade instructions from v1.2.x to v1.3.0.

**Key points:**
1. Dashboard functionality completely removed - use Claude Code terminal output instead
2. Phase 1 now requires interactive grill-me interview
3. All Phase 1 agents read grill-summary.md as first step
4. User input from grill-me becomes single source of truth

---

## [1.2.3] - 2026-06-16

### Features
- 26 specialized agents across 6 SDLC phases
- 43 knowledge skills with auto-wiring
- 14 commands for phase orchestration
- Real-time dashboard monitoring
- Parallel agent execution with dependency management
- Industry-standard best practices (QUANTS, INVEST, Testing Pyramid, OWASP)

### Known Issues
- Dashboard removed in v1.3.0 (use terminal output instead)

---

## [1.2.2] - 2026-06-16

### Features
- Dashboard integration with real-time agent monitoring
- Agent reporter CLI for status updates
- Multi-phase orchestration with dependency management

---

## [1.2.1] - 2026-06-16

### Initial Release
- 26 agents, 43 skills, 14 commands
- 6 SDLC phases with sequential execution
- Basic orchestration framework
