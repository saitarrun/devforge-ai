---
description: Incident response and management - triage, mitigation, communication, action items
argument-hint: "[severity] [service]"
---

# /sdlc-incident

Rapid incident response with automatic escalation and postmortem facilitation.

## Usage

```
/sdlc-incident SEV1 "auth-service: login endpoint down"
```

## Process

1. **Incident Commander** → Declare SEV level, initiate response
2. **Service Owner + On-Call** → Investigate root cause, mitigate
3. **SRE Engineer** → Monitor rollout, validate fix
4. **Incident Commander** → Update stakeholders every 5-10 min
5. **Engineering Manager** → Schedule postmortem (24-48h later)

## Output

- Incident timeline (what happened when?)
- Root cause analysis (why?)
- Mitigation steps (what we did)
- Action items (prevent recurrence)
- Postmortem report (lessons learned)

See **skill-incident-management** for process details.
