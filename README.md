# SDLC Workflow Plugin

[![npm version](https://img.shields.io/npm/v/sdlc-ai-workflow?style=flat-square&color=blue)](https://www.npmjs.com/package/sdlc-ai-workflow)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![SDLC Automation](https://img.shields.io/badge/SDLC-Automation-green?style=flat-square)](https://github.com/saitarrun/sdlc-ai-workflow)
[![Node.js](https://img.shields.io/badge/Node.js->=18.0.0-green?style=flat-square&logo=node.js)](https://nodejs.org/)

**AI-powered tracer bullet SDLC orchestration** — 10 agents across 5 phases with Ralph Loop self-correction, Linear issue integration, and handoff-bounded context windows.

**Built for**: Claude Code users who want end-to-end feature delivery from interview to production.

## Quick Start

```bash
# Full pipeline
/sdlc "build a login page"

# Phase by phase
/sdlc-plan "add OAuth login"        # Interview → scope.json → PRD → Linear issues
/sdlc-build                         # UX → slices → QA with Ralph Loop
/sdlc-verify                        # Security + performance audit
/sdlc-ship                          # CI/CD + cloud infra
/sdlc-operate                       # SLOs + runbooks + security monitoring

# Utilities
/sdlc-implement SAI-42              # Implement a single Linear issue
/to-prd "login-page"                # Re-synthesize PRD from existing grill-summary
/to-issues "login-page"             # (Re)create Linear issues from scope.json slices
/sdlc-review --pr 1                 # PR review with code-review-graph
```

## Installation

### Option A: Global NPM (Recommended)

```bash
sudo npm install -g sdlc-ai-workflow
sdlc-ai-workflow install
```

Restart Claude Code. Done!

### Option B: Install from Source

```bash
git clone https://github.com/saitarrun/sdlc-ai-workflow
cd sdlc-ai-workflow
npm install
npm run install-local
```

Restart Claude Code.

See [INSTALLATION.md](INSTALLATION.md) for update procedures, symlink mode, and uninstall.

---

## How it Works

### Tracer Bullet Slices

Every feature is decomposed into vertical slices — each slice delivers a thin end-to-end increment (schema + api + ui + tests). `scope.json` is the single source of truth:

```json
{
  "capability_flags": { "has_ui": true, "has_auth": true },
  "slices": [
    { "id": "slice-0", "name": "Project scaffold + health check", "type": "prefactor", "layers": ["schema", "api", "tests"], "linear_id": "SAI-52" },
    { "id": "slice-1", "name": "User can log in",                 "type": "feature",   "layers": ["schema", "api", "ui", "tests"], "linear_id": "SAI-53" }
  ]
}
```

### Ralph Loop

Every slice goes through a self-correcting loop before marking done:

- **Inner loop**: execute → verify (typecheck + slice tests) → pass: append to `implementation-log.md` → fail: retry with fresh context (max 2 retries) → circuit breaker
- **Outer loop**: qa-engineer E2E → flag failures → targeted slice retry (max 1) → circuit breaker
- **Sentinels**: context drift check + spec drift check before any gate

### Handoff Mechanism

Each phase gate writes a handoff document. The next phase reads it as its first action — keeping every phase's context window bounded regardless of how many slices or retries the Build phase produced.

```
plan-handoff.md → sdlc-build
build-handoff.md → sdlc-verify
verify-handoff.md → sdlc-ship
ship-handoff.md → sdlc-operate
```

---

## Phases

| Phase | Command | Agents | Output |
|-------|---------|--------|--------|
| **Plan** | `/sdlc-plan` | product-manager | `grill-summary.md`, `scope.json`, `01-prd.md`, Linear issues |
| **Build** | `/sdlc-build` | ux-designer¹, fullstack-engineer × slices, qa-engineer | `implementation-log.md`, `build-handoff.md` |
| **Verify** | `/sdlc-verify` | security-engineer, performance-engineer² | security findings, perf report, `verify-handoff.md` |
| **Ship** | `/sdlc-ship` | devops-engineer | CI/CD pipeline, Dockerfile, Terraform IaC, `ship-handoff.md` |
| **Operate** | `/sdlc-operate` | sre-engineer, data-engineer³ | `06-slo.md`, runbooks, monitoring setup |

¹ Only when `has_ui: true`  
² Only when `needs_performance_audit: true`  
³ Only when `has_data_pipeline: true`

---

## Agents (10)

**Plan**
- `product-manager` — Grill-me interview, slice decomposition, scope.json

**Build**
- `ux-designer` — UX design (merged ux-researcher + ui-ux-designer); conditional on `has_ui`
- `fullstack-engineer` — Tracer bullet slice implementation; reads/appends `implementation-log.md`
- `qa-engineer` — Post-slice E2E test run (merged qa-manual-tester + automation-qa-engineer)

**Verify**
- `security-engineer` — SAST + OWASP always-on, pentest conditional on `needs_pentest` (merged appsec-engineer + penetration-tester)
- `performance-engineer` — Profiling, benchmarking, perf budgets

**Ship**
- `devops-engineer` — CI/CD, Dockerfile, cloud IaC, semantic releases (merged cloud-engineer + release-manager)

**Operate**
- `sre-engineer` — SLOs, runbooks, security monitoring on `has_auth` (merged secops-analyst)
- `data-engineer` — ETL/ELT pipelines; conditional on `has_data_pipeline`

**Cross-cutting**
- `technical-writer` — API docs, SDK guides, developer experience

---

## Skills (34)

Skills inject methodology into agents — pure knowledge context, no tools, no model.

| Skill | Used by |
|-------|---------|
| `grill-me` | product-manager |
| `requirements` | product-manager |
| `prd-synthesis` | product-manager |
| `ralph-loop` | sdlc-build, sdlc-implement |
| `ux-design` | ux-designer |
| `prototype` | ux-designer |
| `code-standards` | fullstack-engineer |
| `architecture` | fullstack-engineer |
| `architecture-refactor` | fullstack-engineer |
| `zoom-out` | fullstack-engineer |
| `tdd` | fullstack-engineer, qa-engineer |
| `testing` | qa-engineer |
| `playwright` | qa-engineer |
| `code-quality` | qa-engineer, security-engineer, devops-engineer, sre-engineer |
| `security-audit` | security-engineer, sre-engineer |
| `threat-modeling` | security-engineer |
| `performance-optimization` | performance-engineer |
| `observability` | performance-engineer, sre-engineer |
| `cicd` | devops-engineer |
| `precommit-hooks` | devops-engineer |
| `cloud-infra` | devops-engineer |
| `git-safety` | devops-engineer |
| `ops-sre` | sre-engineer |
| `documentation` | technical-writer |
| `api-design` | technical-writer |
| `code-review` | sdlc-review |
| `pr-review` | sdlc-review |
| `handoff` | all phase gates |
| `plan-breakdown` | sdlc-plan |
| `issue-triage` | sdlc-plan |
| `diagnose` | debugging sessions |
| `dependency-management` | devops-engineer |
| `configuration-management` | devops-engineer |
| `write-skill` | skill authoring |

---

## Project Directory Structure

Every SDLC run creates an organized project directory:

```
./projects/<feature-name>/
├── grill-summary.md          ← Product Manager interview transcript
├── scope.json                ← Capability flags + tracer bullet slices (with linear_id)
├── docs/
│   ├── 01-prd.md             ← Product Requirements Document
│   ├── implementation-log.md ← Per-slice build log (appended by fullstack-engineer)
│   └── 06-slo.md             ← SLOs, error budgets, runbooks
└── handoffs/
    ├── plan-handoff.md
    ├── build-handoff.md
    ├── verify-handoff.md
    └── ship-handoff.md
```

---

## Extending

### New agent

Create `agents/new-agent-name.md` with frontmatter:

```yaml
---
name: new-agent-name
description: When to invoke this agent...
tools: Read, Bash, Write
model: haiku|sonnet|opus
skills: skill-a, skill-b
---
```

Wire into the relevant command or `/sdlc`.

### New skill

Create `skills/skill-name/SKILL.md`:

```yaml
---
name: skill-name
description: Brief description. Use when...
version: 1.0.0
---
```

Add to agent `skills:` frontmatter field.

### New command

Create `commands/sdlc-phase-name.md` or edit `commands/sdlc.md`. Wire into `/sdlc` orchestrator.

---

## Validate

```bash
make validate
```

## Uninstall

```bash
make uninstall
```

## Update

```bash
sudo npm install -g sdlc-ai-workflow@latest
sdlc-ai-workflow install
```

---

## Built on Best Practices

- **Pragmatic Programmer** — Tracer bullets, DRY, ETC, no broken windows
- **Clean Code** — Meaningful names, small functions, F.I.R.S.T. tests, SOLID
- **Architecture: The Hard Parts** — ADR, coupling/cohesion, fitness functions
- **Google SRE** — SLO/SLI, error budgets, blameless postmortems, toil elimination
- **OWASP** — SAST, CVE scanning, threat modeling (STRIDE/PASTA)

## Contributing

Follow the patterns in [CLAUDE.md](./CLAUDE.md).

## License

MIT
