---
description: Phase 4 — Ship. Runs devops-engineer for CI/CD, cloud deploy, and release. Reads verify-handoff.md for clean context.
argument-hint: "[feature-name]"
tools: Agent
model: haiku
---

# /sdlc-ship — Phase 4: Ship

Deploy to production via CI/CD, provision cloud infrastructure, and execute the release plan.

## Execution

### STEP 1: Read Verify Handoff

Read `./projects/<feature-name>/handoffs/verify-handoff.md` to establish clean context — what was verified, findings resolved, and what is approved to ship.

### STEP 2: Spawn devops-engineer

```
Spawn: Agent({
  subagent_type: "fork",
  name: "devops-engineer",
  description: "DevOps Engineer (Ship phase) — CI/CD, cloud infra, release",
  prompt: "[verify-handoff.md + scope.json]

  Using the verified build context:

  1. CI/CD Pipeline
     - GitHub Actions workflow: lint → type-check → test → SAST → build → push
     - Presubmit gates block merge on any failure
     - Docker images built + pushed to registry (tagged with git SHA)

  2. Cloud Infrastructure (Terraform)
     - VPC + networking
     - EKS/ECS cluster
     - RDS with encryption + multi-AZ
     - IAM roles (least privilege)
     - Secrets Manager for credentials
     - CloudWatch / logging configured

  3. Kubernetes Manifests
     - Namespace, Deployments, Services, Ingress
     - ConfigMaps for env vars, HPA for auto-scaling
     - Resource limits set on all containers

  4. Release Execution
     - Semantic version tag applied
     - CHANGELOG.md updated
     - Canary rollout: 5% → 30 min monitor → 50% → 100%
     - Rollback procedure documented + tested in staging

  5. Write ./projects/<feature-name>/docs/05-pipeline.log summarising
     all CI checks, deploy steps, and release notes.

  Output: ./projects/<feature-name>/deployment/"
})
```

Wait for devops-engineer to complete.

### STEP 3: Display Completion

```
✅ Phase 4 — Ship Complete!

📁 Artifacts:
  deployment/
    .github/workflows/ci-cd.yml
    docker/docker-compose.yml + Dockerfiles/
    k8s/   (namespace, deployments, services, ingress, configmaps)
    terraform/   (VPC, EKS, RDS, IAM, Secrets Manager)
  docs/05-pipeline.log

✅ devops-engineer → CI/CD pipeline, cloud infra, release executed

Pipeline: ✅ green  |  Deploy: ✅ canary complete  |  Rollback: ✅ tested
```

### STEP 4: Gate — Advance to Operate?

Prompt the user:

> "Ship phase complete. Pipeline is green and canary deployed successfully.
> Ready to start Operate? (y/n)"

On confirm:
1. Run `/handoff` → write `./projects/<feature-name>/handoffs/ship-handoff.md`
2. Invoke `/sdlc-operate`

On decline: stop here. User can run `/sdlc-operate` manually later.

---

## Critical Rules

✅ Read verify-handoff.md FIRST — do not carry forward Verify phase conversation
✅ Only `devops-engineer` is invoked — no separate cloud-engineer or release-manager
✅ Secrets NEVER hardcoded — use Secrets Manager
✅ Rollback procedure must be documented before go-live
✅ Prompt before advancing to Operate — no silent auto-advance
