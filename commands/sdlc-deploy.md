---
description: Phase 5 — Infrastructure & Deployment. Spawns devops-engineer and cloud-engineer to design CI/CD, containerization, and cloud infrastructure.
argument-hint: "[--stack github-actions,docker,k8s,terraform] [--parallel]"
tools: Agent
model: haiku
---

# /sdlc-deploy — Phase 5: Infrastructure & Deployment

Design and implement CI/CD pipelines, containerization, Kubernetes manifests, and cloud infrastructure.

## Execution

Spawn agents sequentially:
1. `devops-engineer` — CI/CD pipelines, Docker, Kubernetes
2. `cloud-engineer` — Cloud infrastructure (Terraform/Helm)

---

## Agent Invocation

### STEP 1: Read Architecture & Code

- Read `./projects/<feature-name>/docs/01-architecture.md` (tech stack)
- Read `./projects/<feature-name>/backend/services/` (list of services)
- Read `./projects/<feature-name>/docs/03-implementation.log` (what was built)

### STEP 2: Spawn DevOps Engineer (FIRST — blocks cloud-engineer)

```
Spawn: Agent({
  subagent_type: "fork",
  name: "devops-engineer",
  description: "DevOps Engineer (Phase 5) — CI/CD pipeline, Docker, Kubernetes",
  prompt: "Using architecture and backend services:
  
  1. Create GitHub Actions CI/CD pipeline:
     - Trigger: every push and PR
     - Lint check (ESLint, Prettier)
     - Type check (TypeScript strict mode)
     - Unit tests (Jest with >80% coverage)
     - Integration tests (test database + APIs)
     - SAST security scan (Snyk/SonarJS)
     - Dependency audit (npm audit)
     - Docker build (all services)
     - Push to container registry (if main branch)
  
  2. Create Dockerfiles for each service:
     - Multi-stage builds (build → runtime)
     - Minimal runtime images (Node Alpine)
     - No hardcoded secrets
  
  3. Create docker-compose.yml for local dev:
     - All services + database
     - Environment variables configured
     - Health checks
  
  4. Create Kubernetes manifests:
     - Namespace
     - Deployments (one per service)
     - Services (internal + external)
     - Ingress (api-gateway exposed)
     - ConfigMaps (environment variables)
     - Secrets (if needed)
     - HPA (horizontal pod autoscaling)
  
  Output location: ./projects/<feature-name>/deployment/"
})
```

Wait for completion.

**Wait for devops-engineer to complete.**

---

### STEP 3: Spawn Cloud Engineer (SECOND — waits for devops)

```
Spawn: Agent({
  subagent_type: "fork",
  name: "cloud-engineer",
  description: "Cloud Engineer (Phase 5) — Cloud infrastructure (Terraform/CDK/Helm)",
  prompt: "Using architecture and Kubernetes manifests:
  
  1. Create Infrastructure as Code (Terraform or CDK):
     - VPC + subnets
     - EKS cluster (or equivalent)
     - RDS databases (one per service if needed)
     - Load balancer (managed)
     - IAM roles + policies
     - Security groups
     - Monitoring + logging (CloudWatch/Stackdriver)
  
  2. Configure auto-scaling:
     - Horizontal (pod autoscaling)
     - Vertical (compute instance sizing)
  
  3. Set up secrets management:
     - AWS Secrets Manager / GCP Secret Manager
     - Rotate credentials policy
  
  4. Create deployment runbooks:
     - How to deploy to staging
     - How to deploy to production
     - How to rollback if issues
  
  Output location: ./projects/<feature-name>/deployment/terraform/ or helm/"
})
```

Wait for completion.

### STEP 4: Document Deployment

Create `./projects/<feature-name>/docs/05-pipeline.log`:

```markdown
# Deployment & Infrastructure Summary

## CI/CD Pipeline
- [ ] GitHub Actions workflow configured
- [ ] Lint, type-check, tests run on every PR
- [ ] SAST + dependency scans integrated
- [ ] Docker images build successfully
- [ ] Images pushed to registry (on main)

## Containerization
- [ ] All services have Dockerfiles
- [ ] Multi-stage builds optimized
- [ ] Images scanned for CVEs
- [ ] docker-compose.yml works locally
- [ ] Health checks configured

## Kubernetes
- [ ] Namespace created
- [ ] All services deployed as Deployments
- [ ] Services + Ingress configured
- [ ] ConfigMaps for environment
- [ ] HPA configured for auto-scaling
- [ ] Resource limits set

## Cloud Infrastructure
- [ ] VPC + networking configured
- [ ] EKS/GKE/AKS cluster running
- [ ] Databases provisioned (RDS/Cloud SQL)
- [ ] IAM roles + policies applied
- [ ] Security groups / network policies
- [ ] Monitoring + alerting configured
- [ ] Secrets management integrated

## Deployment Readiness
- [ ] Pipeline is green (all checks passing)
- [ ] Staging environment deployed successfully
- [ ] Smoke tests passing on staging
- [ ] Rollback procedure documented
- [ ] On-call runbooks written
```

**Wait for cloud-engineer to complete.**

---

### STEP 4: Display Completion

```
✅ Phase 5 Complete! (2 agents invoked)

📁 Deployment artifacts created:
  ./projects/<feature-name>/deployment/
    ├── .github/workflows/
    │   └── ci-cd.yml                 (devops-engineer)
    ├── docker/
    │   ├── docker-compose.yml        (devops-engineer)
    │   └── Dockerfiles/              (devops-engineer)
    ├── k8s/
    │   ├── deployments/              (devops-engineer)
    │   ├── services/
    │   ├── ingress/
    │   └── configmaps/
    ├── terraform/ or helm/           (cloud-engineer)
    └── ./projects/<feature-name>/docs/05-pipeline.log

✅ Agents completed:
  1. devops-engineer  → CI/CD pipeline, Docker, Kubernetes manifests
  2. cloud-engineer   → Cloud infrastructure as code (Terraform/CDK/Helm)

Deployment Readiness:
  ✅ CI/CD pipeline configured (runs on every push)
  ✅ Docker images building successfully
  ✅ Kubernetes manifests created + validated
  ✅ Cloud infrastructure defined as code
  ✅ Staging environment ready
  ✅ Smoke tests passing

Next: Run /sdlc-ops for Phase 6 (Operations & Monitoring)
```

---

## CRITICAL RULES

✅ devops-engineer MUST create CI/CD first (blocks merge if failing)
✅ All services must have Dockerfiles (multi-stage builds)
✅ Kubernetes manifests must include resource limits + HPA
✅ Cloud infrastructure must include monitoring + alerting
✅ Secrets NEVER hardcoded; use cloud secret management


---

## MICROSERVICES DEPLOYMENT

Each service deploys independently:
- Separate Docker image per service
- Separate Kubernetes Deployment per service
- api-gateway fronts all services
- Canary deployments possible (blue-green, rolling)

## CRITICAL RULES

✅ DevOps engineer creates CI/CD FIRST (blocks merge if failing)
✅ All services must have Dockerfiles
✅ Kubernetes manifests must include resource limits + HPA
✅ Cloud infrastructure must include monitoring + alerting
✅ Secrets NEVER hardcoded; use secret management service
