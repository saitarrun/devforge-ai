---
name: enterprise-architecture
description: Enterprise architecture patterns, multi-tenancy isolation, disaster recovery (RTO/RPO), data residency, and audit logging standards.
version: 1.0.0
---

# Enterprise Architecture & Compliance Standards Skill

This skill defines the technical criteria for mission-critical, enterprise-grade cloud applications.

## 1. Multi-Tenancy & Data Isolation
- **Tenant Isolation Models**:
  - *Silo Model*: Dedicated database/schema per tenant for high compliance (SOC2/HIPAA/FedRAMP).
  - *Pool Model*: Shared database with row-level security (RLS) enforcement on all queries using `tenant_id`.
- **Tenant Context Propagation**: Mandatory middleware injecting verified `tenant_id` and `org_id` into request contexts, background jobs, and audit events.

## 2. Enterprise Authentication & Authorization
- **SSO & Federation**: SAML 2.0 and OIDC (Okta, Azure AD / Microsoft Entra, Google Workspace).
- **SCIM 2.0**: Automated user provisioning and deprovisioning.
- **Fine-Grained RBAC & ABAC**: Role-based and attribute-based access control with explicit policy engines (e.g. OPA, Casbin, Cerbos).
- **Session Security**: Step-up MFA for sensitive mutations, device posture checks, IP allowlisting.

## 3. Audit Trails & Compliance Logging
- **Immutable Audit Trail**: Append-only log of all data access, export, authentication, and mutation events.
- **Required Audit Fields**: `timestamp_utc`, `event_id`, `actor_id`, `actor_ip`, `tenant_id`, `resource_type`, `action`, `previous_state`, `new_state`.
- **Retention & Immutability**: Write-once-read-many (WORM) storage (AWS S3 Object Lock, GCP Bucket Retention) for 1 to 7 years depending on regulation (SOC2, HIPAA, FINRA).

## 4. Disaster Recovery & High Availability
- **RTO (Recovery Time Objective)**: Target < 15 minutes for critical Tier 1 services.
- **RPO (Recovery Point Objective)**: Target < 1 minute (continuous replication, point-in-time recovery).
- **Active-Active / Active-Passive Multi-Region**: Cross-region database replication, health probes, automated DNS failover (Route53/Cloudflare).
- **Zero-Downtime Releases**: Blue/Green or Canary deployments with automated rollback on health/SLO anomalies.

## 5. Enterprise Checklist for Feature Delivery
- [ ] Row-Level Security (RLS) or tenant isolation verified
- [ ] SAML/OIDC and SCIM compatibility designed
- [ ] Immutable audit logs emitted on all mutations
- [ ] Data encryption in transit (TLS 1.3) and at rest (AES-256 / KMS-managed keys)
- [ ] Automated database migrations support zero-downtime forward/backward compatibility
