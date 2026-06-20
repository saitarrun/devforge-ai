---
name: observability
description: Metrics, logging, distributed tracing, dashboards, alerting, SLO-driven observability, post-incident analysis. Use when designing monitoring, setting up dashboards, creating alert rules, or analyzing production data.
version: 1.0.0
---

# Skill: Observability (Metrics, Logs, Traces)

Three pillars: Metrics (what), Logs (why), Traces (how). Use all three.

## Metrics (Time-Series Data)

**Key metrics**:
- Request latency (p50, p95, p99)
- Error rate (%)
- Throughput (req/s)
- Resource (CPU, memory, disk)

**Collection**: Prometheus, StatsD, CloudWatch

```
api_latency_seconds{service="auth", endpoint="/login"} = 0.042
error_rate{service="api"} = 0.001
db_connections{pool="default"} = 42
```

## Logging (Structured)

**Format**: JSON for parsing

```json
{
  "timestamp": "2024-01-15T10:30:45Z",
  "level": "ERROR",
  "service": "user-service",
  "message": "Failed to create user",
  "error": "database_error",
  "user_id": "user-123",
  "duration_ms": 150
}
```

**Sampling**: Log 100% errors, 1% normal (reduce volume)

## Distributed Tracing

**Trace request end-to-end**:
```
Request: POST /api/users
├─ Auth span (5ms)
├─ Validate span (2ms)
├─ DB insert span (45ms)
│  ├─ Connection span (1ms)
│  └─ Query span (44ms)
└─ Cache update span (3ms)
Total: 55ms
```

**Tools**: Jaeger, Zipkin, Datadog

## Dashboards (SLO-Focused)

**What to display**:
- SLO % (100% target, 99% actual)
- Error budget consumed (%)
- Latency (p95, p99)
- Errors per minute
- Active requests
- Alert status

**Tools**: Grafana, CloudWatch, Datadog

## Alerting

**Good alert** (actionable):
```
Alert: DB connection pool > 80%
Severity: CRITICAL
Action: Increase pool size or check for connection leaks
Runbook: https://wiki.example.com/alerts/db-pool-high
```

**Bad alert** (not actionable):
```
Alert: Disk usage > 50%
(What should I do?)
```

## SLO-Driven Alerting

```
SLO: 99.9% uptime
Error budget: 8.64 hours/month

Alert: If burn rate > 1% → 30 days to fail budget
Alert: If burn rate > 10% → 3 days to fail budget
```

## Monitoring Checklist

- [ ] Latency metrics (p50, p95, p99)
- [ ] Error rate (%)
- [ ] Saturation (CPU, memory, disk)
- [ ] Dependencies (external API uptime)
- [ ] Custom business metrics
- [ ] SLO dashboard
- [ ] Alert rules (with runbooks)

---

**Status**: Ready for observability work  
**Best for**: Metrics, logging, alerting, SLO monitoring
