# SDLC Workflow Execution Guide

## How the System Works

The SDLC Workflow plugin coordinates 26 agents across 6 phases with real-time monitoring and dependency management.

### Architecture

```
Command (/sdlc-plan)
    ↓
Orchestrator (manages dependencies, tracks state)
    ↓
Agent Spawner (invokes agents as they become ready)
    ↓
Agents (execute in sequence, respecting dependencies)
    ↓
Collaboration Log (shared state, status updates)
    ↓
Dashboard (real-time monitoring)
```

## Quick Start

### 1. Start the Orchestrator

```bash
npm run orchestrator
```

Output:
```
✓ Orchestrator ready at http://127.0.0.1:4242
✓ Dashboard available at http://127.0.0.1:4242
```

Open browser to **http://127.0.0.1:4242** to see the live dashboard.

### 2. Run a Phase (in separate terminal)

```bash
# Phase 1: Planning
node scripts/spawn-phase-agents.js plan <run-id>

# Phase 2: Design  
node scripts/spawn-phase-agents.js design <run-id>

# Phase 3: Development
node scripts/spawn-phase-agents.js dev <run-id>

# Phase 4: Testing & Security
node scripts/spawn-phase-agents.js test <run-id>

# Phase 5: Deployment
node scripts/spawn-phase-agents.js deploy <run-id>

# Phase 6: Operations
node scripts/spawn-phase-agents.js ops <run-id>
```

### 3. Monitor on Dashboard

Dashboard shows in real-time:
- ✓ All agents in current phase
- ✓ Status (waiting → working → complete)
- ✓ Duration per agent
- ✓ Live metrics
- ✓ Artifact generation progress

---

## Full Execution Flow

### Phase 1: Planning

```bash
# Terminal 1: Start orchestrator
npm run orchestrator

# Terminal 2: Run planning phase
node scripts/spawn-phase-agents.js plan run-20260616T133615

# Expected output:
# ▶️  Spawned: product-manager
# ✅ Completed: product-manager
# ▶️  Spawned: business-analyst
# ✅ Completed: business-analyst
# ▶️  Spawned: software-architect
# ✅ Completed: software-architect
# ▶️  Spawned: security-architect
# ✅ Completed: security-architect

# Artifacts generated:
# .sdlc/run-20260616T133615/01-roadmap.md
# .sdlc/run-20260616T133615/01-requirements.md
# .sdlc/run-20260616T133615/01-architecture.md
# .sdlc/run-20260616T133615/01-threat-model.md
```

### Phase 2: Design

```bash
node scripts/spawn-phase-agents.js design run-20260616T133615

# Spawns 3 agents:
# ▶️  Spawned: ux-researcher
# ✅ Completed: ux-researcher
# ▶️  Spawned: ui-ux-designer
# ✅ Completed: ui-ux-designer
# ▶️  Spawned: accessibility-engineer
# ✅ Completed: accessibility-engineer

# Artifacts:
# .sdlc/run-20260616T133615/02-user-journeys.md
# .sdlc/run-20260616T133615/02-wireframes.md
```

### Phase 3: Development

```bash
node scripts/spawn-phase-agents.js dev run-20260616T133615

# Spawns 5 agents (can run in parallel):
# ▶️  Spawned: frontend-engineer
# ▶️  Spawned: backend-engineer
# ▶️  Spawned: database-engineer
# ▶️  Spawned: mobile-developer
# ▶️  Spawned: fullstack-engineer
# (all complete)

# Artifacts:
# .sdlc/run-20260616T133615/03-implementation.log
# (code changes, schema designs, etc.)
```

### Continue with Phases 4-6

```bash
node scripts/spawn-phase-agents.js test <run-id>
node scripts/spawn-phase-agents.js deploy <run-id>
node scripts/spawn-phase-agents.js ops <run-id>
```

---

## Real-Time Monitoring

### Dashboard Features

**http://127.0.0.1:4242** shows:

1. **Agent Status Table**
   - Running Agents: Shows working agents with duration
   - Available Agents: Shows waiting agents
   - Completed Agents: Shows finished agents with total time

2. **Metrics Dashboard**
   - Queued: Agents waiting for dependencies
   - Running: Agents currently executing
   - Completed: Agents finished
   - Failed: Agents with errors

3. **Real-Time Updates**
   - SSE push updates every 1 second
   - Polling fallback every 2 seconds
   - Live metrics refresh

4. **Artifact Browser**
   - View generated artifacts
   - Download files
   - Export data

---

## Dependency Management

Agents only spawn when their dependencies are satisfied:

```
product-manager (no deps, starts first)
  ↓
business-analyst (waits for product-manager)
  ↓
software-architect (waits for business-analyst)
  ↓
security-architect (waits for software-architect)
```

**Phase Gates**: Some agents have blocking gates (e.g., product-manager's `grill-complete`). Dependent agents won't spawn until gate is marked.

---

## Artifact Output

### Location
All artifacts are in: `.sdlc/run-<timestamp>/`

### Phase 1 Artifacts
- `01-roadmap.md` — Product vision, QUANTS metrics, milestones
- `01-requirements.md` — INVEST user stories, acceptance criteria
- `01-architecture.md` — ADR, tech stack, component design
- `01-threat-model.md` — STRIDE threats, security controls

### Phase 2 Artifacts
- `02-user-journeys.md` — Personas, journey maps, pain points
- `02-wireframes.md` — UI design, component specs, prototypes

### Phase 3 Artifacts
- `03-implementation.log` — Code changes, implementation details

### Phase 4 Artifacts
- `04-test-cases.md` — Test strategy, test cases, coverage
- `04-security.md` — OWASP audit, CVE scan, penetration test results

### Phase 5 Artifacts
- `05-pipeline.log` — CI/CD status, deployment logs

### Phase 6 Artifacts
- `06-slo.md` — SLOs, error budgets, runbooks
- `06-secops.md` — Security monitoring, incident response
- `06-data-pipelines.md` — Data ETL/ELT workflows

### Summary
- `SUMMARY.md` — Complete project summary across all phases

---

## Troubleshooting

### Problem: Orchestrator not accessible

```bash
# Check if running
ps aux | grep orchestrator

# If not running, start it
npm run orchestrator
```

### Problem: Agents not spawning

```bash
# Check orchestrator health
curl http://127.0.0.1:4242/api/health

# Check run status
curl http://127.0.0.1:4242/api/runs/<run-id>

# Verify spawner is running
# (should show agent status updates)
```

### Problem: Port 4242 in use

```bash
# Use different port
SDLC_PORT=5000 npm run orchestrator

# Then update spawner commands
SDLC_PORT=5000 node scripts/spawn-phase-agents.js plan <run-id>
```

### Problem: Artifacts not generating

```bash
# Check .sdlc/run-<id>/collaboration-log.json
cat .sdlc/run-*/collaboration-log.json | jq '.agents'

# Should show agent status: working, complete, blocked
```

---

## Advanced Usage

### Run Multiple Phases in Parallel

```bash
# Terminal 1: Orchestrator
npm run orchestrator

# Terminal 2: Phase 1
node scripts/spawn-phase-agents.js plan run-id

# Terminal 3: Phase 4 (independent of 1-3, so can run separately)
node scripts/spawn-phase-agents.js test run-id
```

### Monitor Specific Run

```bash
# Get run details
curl http://127.0.0.1:4242/api/runs/run-20260616T133615 | jq '.'

# Watch agent status
watch -n 1 'curl -s http://127.0.0.1:4242/api/runs/run-20260616T133615 | jq ".log.agents | keys"'
```

### List All Runs

```bash
curl http://127.0.0.1:4242/api/runs | jq '.'
```

### Download Artifacts

```bash
# List artifacts
curl http://127.0.0.1:4242/api/runs/<run-id>/artifacts

# Download specific artifact
curl http://127.0.0.1:4242/api/runs/<run-id>/artifacts/01-roadmap.md > roadmap.md
```

---

## Performance

- **Phase 1 (Planning)**: 4 agents sequentially (~30s simulation, depends on actual agent execution)
- **Phase 2 (Design)**: 3 agents sequentially (~20s)
- **Phase 3 (Development)**: 5 agents (can parallelize, ~25s)
- **Phase 4 (Testing)**: 4 agents sequentially (~20s)
- **Phase 5 (Deployment)**: 3 agents sequentially (~15s)
- **Phase 6 (Operations)**: 7 agents (can parallelize, ~35s)

**Total for full SDLC**: ~2-3 minutes (depending on parallelization)

---

## Production Deployment

For production use with actual Claude agent execution:

1. Update orchestrator.js to invoke agents via Agent() tool
2. Implement proper error handling and retries
3. Add persistence for long-running executions
4. Configure logging and monitoring
5. Set up CI/CD integration

See `CLAUDE.md` and `README.md` for integration details.

---

**Status**: System ready for orchestrated execution  
**Latest Commit**: Check git log  
**Dashboard**: http://127.0.0.1:4242
