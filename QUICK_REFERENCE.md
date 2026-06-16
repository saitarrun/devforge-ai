# Quick Reference — Commands at a Glance

## Most Common (Copy-Paste Ready)

### Build Everything End-to-End
```bash
/sdlc "your feature description here"
```
→ Runs all 6 phases with approval gates between each

### Build with Parallel Agents (2-3x faster)
```bash
/sdlc "your feature description here" --parallel
```
→ All agents in each phase run simultaneously

---

## Phase-by-Phase (Individual Phases)

### Phase 1: Planning
```bash
/sdlc-plan "add OAuth login"
```
→ PRD, user stories, threat model

### Phase 2: Design
```bash
/sdlc-design
```
→ Wireframes, design system

### Phase 3: Development
```bash
/sdlc-dev
```
→ Code + tests (frontend + backend + database)

### Phase 4: Testing & Security
```bash
/sdlc-test
```
→ Test suite, security audit, pen test

### Phase 5: Deployment & CI/CD
```bash
/sdlc-deploy
```
→ GitHub Actions, Docker, Terraform

### Phase 6: Operations & Monitoring
```bash
/sdlc-ops
```
→ SLOs, alerts, runbooks

---

## Special Operations (Anytime)

### Code Review (with dependency analysis)
```bash
/sdlc-review --pr 1
```
→ Review PR #1 with parallel reviewers + code-review-graph

### Incident Response
```bash
/sdlc-incident SEV1 "api service down"
```
→ Incident timeline, RCA, postmortem

### Retrospective / Postmortem
```bash
/sdlc-retrospective
```
→ Blameless postmortem, QUANTS metrics, action items

### Performance Optimization
```bash
/sdlc-optimize
```
→ Profiling, benchmarks, optimization recommendations

### Tech Debt Management
```bash
/sdlc-tech-debt
```
→ Debt inventory, paydown plan, ROI analysis

### Release Planning
```bash
/sdlc-release
```
→ Semantic versioning, canary rollout, release notes

---

## Parallel Execution Shortcuts

### Run Any Phase with Parallel Agents
```bash
/sdlc-parallel phase-3 --max-workers=4
/sdlc-parallel phase-4 --feedback-loops
```

### Code Review with 3 Parallel Reviewers
```bash
/sdlc-review --pr 1 --parallel --with-graph
```

### Development with Parallel Agents
```bash
/sdlc-dev --parallel
```

---

## Options Cheat Sheet

| Option | What It Does | Example |
|--------|-------------|---------|
| `--parallel` | Run agents simultaneously (2-3x faster) | `/sdlc "feature" --parallel` |
| `--with-graph` | Include code-review-graph analysis | `/sdlc-review --pr 1 --with-graph` |
| `--max-workers=N` | Limit parallel agents to N | `/sdlc-dev --parallel --max-workers=2` |
| `--feedback-loops` | Agents respond to each other in real-time | `/sdlc-test --parallel --feedback-loops` |
| `--show-collaboration-log` | View agent conversations | `/sdlc --parallel --show-collaboration-log` |

---

## Decision Tree: Which Command?

```
What do you want to do?

├─ Build a new feature end-to-end
│  └─ /sdlc "description" [--parallel]
│
├─ Just planning (PRD, stories, threat model)
│  └─ /sdlc-plan "description"
│
├─ Just code (already have design)
│  └─ /sdlc-dev
│
├─ Just test (already have code)
│  └─ /sdlc-test
│
├─ Just deployment (already have everything)
│  └─ /sdlc-deploy
│
├─ Review a PR
│  └─ /sdlc-review --pr 1 [--with-graph]
│
├─ Handle production incident
│  └─ /sdlc-incident SEV1 "description"
│
├─ Learn from what happened
│  └─ /sdlc-retrospective
│
├─ Optimize performance
│  └─ /sdlc-optimize
│
├─ Manage technical debt
│  └─ /sdlc-tech-debt
│
└─ Plan a release
   └─ /sdlc-release
```

---

## Copy-Paste Examples

### New Authentication Feature (Full Workflow)
```bash
# Option 1: Let me review at each phase
/sdlc "add OAuth 2.0 authentication with MFA"

# Option 2: Fast mode (all agents in parallel)
/sdlc "add OAuth 2.0 authentication with MFA" --parallel
```

### Review PR #42 with Dependency Analysis
```bash
/sdlc-review --pr 42 --with-graph
```

### SEV1 Incident: Database Down
```bash
/sdlc-incident SEV1 "database connection pool exhausted"
```

### Learn from Release (Blameless Retrospective)
```bash
/sdlc-retrospective
```

### Optimize Slow API (Profiling + Benchmarks)
```bash
/sdlc-optimize
```

### Release v2.1.0 (Semantic Versioning + Canary)
```bash
/sdlc-release
```

---

## Approval Gates

After each phase, you'll see:
```
Phase 1 complete! Review artifacts?
[✓] Proceed to Phase 2
[Edit] Make changes
[Skip] Go back
```

Just type the option and press Enter.

---

## Time Estimates

| Workflow | Sequential | Parallel |
|----------|-----------|----------|
| Full 6-phase | 120 min | 45 min |
| Phase 1 (Planning) | 12 min | 8 min |
| Phase 3 (Dev) | 48 min | 15 min |
| Code Review | 15 min | 10 min |
| Incident Response | 30 min | 20 min |

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Accept current output |
| `^C` | Cancel current phase |
| `^Z` | Suspend (resume with `fg`) |
| Arrow Keys | Navigate approval options |

---

## Need Help?

```bash
/sdlc --help                # Master orchestrator help
/sdlc-plan --help          # Phase 1 help
/sdlc-review --help        # Code review help
/sdlc-incident --help      # Incident response help
```

---

**Most Useful Commands to Bookmark**:
1. `/sdlc "feature" --parallel` — Build fast
2. `/sdlc-review --pr 1 --with-graph` — Review smart
3. `/sdlc-incident SEV1 "issue"` — Respond fast
4. `/sdlc-retrospective` — Learn fast

---

**Last Updated**: 2026-06-16
