---
name: dynamic-routing
description: Autonomous intent detection, dynamic agent spawning, capability-flag auto-resolution, and contextual skill injection based on task requirements.
version: 1.0.0
---

# Autonomous Intent Routing & Dynamic Agent Invocation Skill

This skill allows the system to autonomously analyze user requests, map them to the exact agents, commands, and skills needed, and dynamically invoke specialized workflows without requiring the user to memorize command syntax.

---

## 1. Autonomous Request Routing Matrix

When a user submits any natural language request, the system detects the primary intent and automatically routes execution:

| User Trigger Phrasing / Goal | Auto-Inferred Phase | Primary Agent | Automatically Injected Skills & Commands |
|---|---|---|---|
| *"I have a new idea..."*, *"Build a SaaS..."*, *"Let's make an app..."* | **Plan & Founder** | `product-manager` | `intent-clarification`, `grill-me`, `requirements`, `startup-lifecycle`, `/sdlc-plan`, `/sdlc-startup` |
| *"Implement feature..."*, *"Code this slice..."*, *"Add database model..."* | **Build** | `fullstack-engineer` | `enterprise-architecture`, `token-efficiency`, `ralph-loop`, `contract-testing`, `llm-evals`, `/sdlc-build` |
| *"How does this codebase work?"*, *"Find symbol in 1.5M files..."*, *"Explain architecture..."* | **Navigate** | `fullstack-engineer` | `codebase-navigator`, `zoom-out`, `code-review-graph`, `/sdlc-navigate` |
| *"Debug this 500 error"*, *"Why did calculation fail?"*, *"Fix bug in policy engine"* | **Diagnose & RCA** | `qa-engineer` / `fullstack-engineer` | `root-cause-analysis`, `diagnose`, `token-efficiency`, `/sdlc-diagnose` |
| *"Audit security"*, *"Patch CVEs"*, *"Harden headers"*, *"Implement Zero-Trust"* | **Security** | `security-engineer` | `security-patching`, `security-audit`, `threat-modeling`, `/sdlc-security` |
| *"Migrate legacy code"*, *"Decouple monolith"*, *"Extract stored procedure"* | **Modernize** | `fullstack-engineer` / `devops-engineer` | `legacy-modernization`, `architecture-refactor`, `/sdlc-modernize` |
| *"Run tests"*, *"Write E2E test"*, *"Load test this API"*, *"Chaos test DB"* | **Test Matrix** | `qa-engineer` | `enterprise-test-suites`, `playwright`, `tdd`, `/sdlc-test` |
| *"Deploy to AWS/K8s"*, *"Setup CI/CD"*, *"Create Dockerfile"*, *"Terraform infra"* | **Ship** | `devops-engineer` | `cicd`, `cloud-infra`, `precommit-hooks`, `/sdlc-ship` |
| *"Set up SLOs"*, *"Configure alerts"*, *"Track MRR & Churn"*, *"Write runbook"* | **Operate** | `sre-engineer` | `ops-sre`, `observability`, `startup-lifecycle`, `/sdlc-operate` |

---

## 2. Autonomous Invocation & Chaining Protocol

Agents should autonomously trigger downstream skills and commands when the context requires it:

1. **Context-Aware Triggering**:
   - If an agent encounters an untested API boundary → Automatically invoke `contract-testing` or `enterprise-test-suites`.
   - If a build step introduces a new third-party dependency → Automatically trigger `security-patching` to scan for CVEs.
   - If an error occurs during vertical slice implementation → Automatically engage `root-cause-analysis` and `ralph-loop`.
   - If context window exceeds token thresholds → Automatically invoke `token-efficiency` and trigger `/handoff` compaction.

2. **Zero-Friction User Experience**:
   - The user can type free-form natural language (e.g. *"Fix the billing webhook bug and deploy a hotfix"*), and the orchestrator will chain `/sdlc-diagnose` → `/sdlc-implement` → `/sdlc-test` → `/sdlc-ship` autonomously with approval checkpoints.
