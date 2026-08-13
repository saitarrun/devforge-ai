---
description: Build, launch, monetize, monitor, and scale a software startup end-to-end from the codebase.
argument-hint: "[--mvp <idea>] [--pricing stripe] [--analytics posthog] [--growth-loop] [--metrics]"
---

# Startup Founder & Growth Command

This command orchestrates the business, monetization, product analytics, and customer acquisition loops needed to build and operate a high-growth software startup.

## Usage

```bash
/sdlc-startup --mvp "AI claims copilot for insurance brokers" # Scaffold startup MVP, PRD, and landing page
/sdlc-startup --pricing stripe                                # Generate subscription tiers, customer portal & webhooks
/sdlc-startup --analytics posthog                             # Instrument North Star telemetry & activation funnels
/sdlc-startup --growth-loop                                   # Design viral loops, programmatic SEO, and referral engine
/sdlc-startup --metrics                                       # Generate live MRR, CAC, LTV, and churn tracker
```

## Process

1. **Ideation to Minimum Viable Product (MVP)**:
   - Identifies high-conviction problem statement, 3 critical tracer bullet slices, and landing page waitlist.
2. **SaaS Billing & Monetization Generation**:
   - Implements Stripe checkout, subscription webhooks, seat billing, and usage metering.
3. **Telemetry & Growth Loops**:
   - Instruments activation funnels, session tracking (PostHog/Mixpanel), and automated customer feedback loops.
4. **Investor & Unit Economics Reporting**:
   - Generates `docs/startup-metrics.md` tracking MRR, CAC, LTV, Churn, and Runway.

## Output Format

```markdown
### 🚀 Startup Launch & Operations Plan: [Startup Name]

**Value Proposition**: [Core customer benefit in one sentence]
**Target Persona**: [Ideal Customer Profile (ICP)]

#### 💳 Monetization Architecture
- **Pricing Strategy**: Tiered ($29/mo Starter, $99/mo Pro, Custom Enterprise)
- **Billing Provider**: Stripe Checkout + Customer Portal
- **Webhooks Configured**: `invoice.payment_succeeded`, `customer.subscription.deleted`

#### 📊 Growth Telemetry & Funnel
- **North Star Metric**: `claim_analysis_completed`
- **Activation Funnel**: Landing Page (100%) → Signup (18%) → First Analysis (12%) → Paid (4.2%)

#### 📈 Unit Economics & Traction Tracker
- **Current MRR**: $12,400
- **LTV / CAC**: 3.8x
- **Payback Period**: 6.2 Months
- **Artifact**: Generated live tracker in `./projects/<feature>/docs/startup-metrics.md`
```
