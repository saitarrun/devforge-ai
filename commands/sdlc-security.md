---
description: Automatically audit, patch vulnerabilities, upgrade dependencies, and implement enterprise security protocols (Zero-Trust, mTLS, OWASP fixes).
argument-hint: "[--audit-only] [--fix-cves] [--harden-headers] [--protocol <name>]"
---

# Security Patching & Hardening Command

This command conducts automated security scans, updates vulnerable dependencies, resolves OWASP Top 10 vulnerabilities, and applies enterprise cryptographic and network security hardening.

## Usage

```bash
/sdlc-security --audit-only                 # Full security & CVE audit report
/sdlc-security --fix-cves                   # Automatically patch known CVEs and update dependencies
/sdlc-security --harden-headers             # Inject enterprise HTTP security headers
/sdlc-security --protocol zero-trust        # Implement mTLS and JWT authorization checks
/sdlc-security "Fix IDOR in claim endpoint" # Surgically fix specific reported vulnerability
```

## Process

1. **Vulnerability & CVE Discovery**:
   - Executes SAST scans, `npm audit` / `snyk`, and OWASP rule evaluations across all service layers.
2. **Surgical In-Place Remediation**:
   - Updates vulnerable dependencies or overrides transitive package versions.
   - Refactors insecure code patterns (SQL injection, XSS, insecure deserialization, IDOR).
3. **Protocol & Security Header Hardening**:
   - Injects HSTS, CSP, rate-limiting middleware, and TLS 1.3/AES-256 encryption standards.
4. **Regression & Safety Verification**:
   - Verifies the application build, tests, and API contracts against breaking changes.

## Output Format

```markdown
### 🛡️ Security Patching & Hardening Report

**Action**: Dependency CVE Remediation & Security Header Hardening

#### 🔒 Vulnerabilities Patched
- **CVE-2024-XXXX**: Upgraded `jsonwebtoken` from `8.5.1` -> `9.0.2` (High Severity)
- **OWASP A01 (Broken Access Control)**: Added tenant ownership validation to `/api/v1/claims/:id`
- **Security Headers**: Configured HSTS, CSP, and X-Content-Type-Options middleware

#### ✅ Verification
- Unit & Regression Tests: 142/142 Passed
- Typecheck: 0 errors
- Security Audit: 0 Critical / 0 High vulnerabilities remaining
```
