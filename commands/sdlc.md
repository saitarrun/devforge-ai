---
description: Master orchestrator for the complete 6-phase SDLC pipeline. Runs all phases sequentially with approval gates between each phase. Organizes artifacts into docs/, frontend/, backend/services/, and deployment/ directories.
argument-hint: <feature-description> [--from <phase>] [--to <phase>]
---

# Master SDLC Orchestrator

This command runs the complete Software Development Lifecycle end-to-end with 6 phases, explicit approval gates between each phase, and comprehensive artifact generation.

## Usage

```bash
/sdlc "build a user authentication system"
/sdlc "add OAuth login" --from Phase1 --to Phase3
/sdlc --phase Phase4  # Re-run Phase 4 in isolation
```

## Phases

The orchestrator runs agents sequentially across 6 phases:

1. **Phase 1 — Planning** (product-manager [grill → define] → business-analyst → software-architect → security-architect)
2. **Phase 2 — Design** (ux-researcher → ui-ux-designer)
3. **Phase 3 — Development** (frontend/backend/database/mobile engineers in parallel)
4. **Phase 4 — Testing & Security** (qa-manual-tester → automation-qa-engineer → appsec-engineer → penetration-tester)
5. **Phase 5 — Deployment** (devops-engineer → cloud-engineer)
6. **Phase 6 — Operations** (sre-engineer → secops-analyst → data-engineer)

## Process

1. Parse feature request (or load from GitHub issue)
2. Create `./projects/<feature-name>/` with organized subdirectories: `docs/`, `frontend/src/`, `backend/services/api-gateway/src/`, `deployment/docker/`, `deployment/k8s/`, `deployment/.github/workflows/`
3. Run Phase 1 (Product Manager grills customer to reach shared understanding) → **GATE**: User approves or requests changes
4. Run Phase 2 → present results → **GATE**: User approves or requests changes
5. ... repeat for all 6 phases ...
6. Compile final summary → offer `gh pr create`

## Output

All artifacts are organized into `./projects/<feature-name>/` with 4 subdirectories:

**`docs/`** — All documentation and artifacts
- `01-grill-summary.md` — Grill-me interview transcript and decisions
- `01-roadmap.md` — Product vision, roadmap, milestones
- `01-requirements.md` — User stories, acceptance criteria
- `01-architecture.md` — ADR, component design, trade-off tables
- `01-threat-model.md` — STRIDE analysis, security controls
- `02-user-journeys.md` — Personas, journey maps
- `02-wireframes.md` — UI design, component specs
- `03-implementation.log` — Code changes summary
- `04-test-cases.md` — Test suite, coverage report
- `04-security.md` — OWASP audit, CVE scan, penetration test findings
- `05-pipeline.log` — CI/CD status, deployment logs
- `06-slo.md` — Service Level Objectives, runbooks
- `06-secops.md` — Security monitoring configuration
- `06-data-pipelines.md` — ETL/ELT workflows
- `SUMMARY.md` — Final summary of all changes

**`frontend/`** — Frontend application
- `src/components/`, `src/pages/`, `src/services/` — React/Vue/Angular components and logic
- `public/` — Static assets
- `package.json` — Dependencies and scripts

**`backend/services/`** — Microservices architecture
- `api-gateway/src/` — API gateway service
- `<domain-service>/src/` — One directory per domain service (derived from grill-me answers)
- Each service: `package.json`, `Dockerfile`, `src/`

**`deployment/`** — Infrastructure and DevOps
- `docker/docker-compose.yml` — Local dev orchestration
- `docker/Dockerfiles/` — Service-specific Dockerfiles
- `k8s/` — Kubernetes manifests (deployments, services, ingress)
- `.github/workflows/` — GitHub Actions CI/CD pipeline

## Gates (Approval Points)

Each phase requires explicit user approval before proceeding:

- Phase 1 → Phase 2: "Approve PRD + requirements + architecture"
- Phase 2 → Phase 3: "Approve UX designs + wireframes"
- Phase 3 → Phase 4: "Review implementation diff"
- Phase 4 → Phase 5: "No blocking security findings"
- Phase 5 → Phase 6: "Pipeline green"
- Phase 6 → Summary: "SLOs approved"

## Success Criteria

✓ All 6 phases execute successfully
✓ Every phase has clear artifacts
✓ User approves at each gate
✓ No Phase skipped without explicit user request
✓ Final PR is created with comprehensive summary
