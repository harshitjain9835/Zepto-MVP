# C3 MVP Phase-Wise Implementation Plan

## 1) Document Purpose
This implementation plan translates [problemstatement.md](problemstatement.md) and [architecture.md](architecture.md) into an execution roadmap for delivering the Contextual Cart Companion (C3) MVP.

## 2) Guiding Principles
- Protect checkout speed and completion first.
- Ship the smallest testable version early.
- Treat trust metadata as a hard launch blocker for non-FMCG recommendations.
- Measure impact through controlled experiments, not anecdotal wins.

## 3) Team Structure and Ownership
- Product: Goals, scope control, rollout gates, experiment decisions.
- Backend Platform: Checkout orchestrator, APIs, reliability, fallbacks.
- Recommender and ML: Scenario inference, candidate generation, ranking.
- Catalog and Trust: Warranty, return or replacement, expiry metadata quality.
- Mobile App: Checkout widget integration, UX, instrumentation.
- Data and Analytics: Event pipelines, dashboards, experiment readouts.
- QA and SRE: Test strategy, latency and resilience, production readiness.

## 4) Timeline Summary (Indicative: 10 Weeks)
- Phase 0: Foundation and readiness (Week 1-2)
- Phase 1: Data and trust backbone (Week 2-4)
- Phase 2: Online services build (Week 3-6)
- Phase 3: Client integration and telemetry (Week 5-7)
- Phase 4: Shadow mode validation (Week 7-8)
- Phase 5: Controlled launch at 5% traffic (Week 8-9)
- Phase 6: Ramp to 25% and optimization (Week 9-10)
- Phase 7: Scale decision to 50-100% (post Week 10)

## 5) Phase-Wise Plan

## Phase 0: Foundation and Readiness (Week 1-2)
### Objectives
- Freeze MVP scope and technical interfaces.
- Confirm experiment design and metrics contract.

### Key Tasks
- Finalize API request and response schema for C3 widget.
- Define latency SLOs: P50, P95, timeout budgets, fallback thresholds.
- Lock experiment arms: Holdout, Control, Treatment.
- Approve event taxonomy and naming conventions.
- Confirm city and cohort for first launch.

### Deliverables
- API spec v1.
- Instrumentation spec.
- Experiment design doc with sample-size assumptions.
- Risk register with mitigation owners.

### Exit Criteria (Go/No-Go)
- All teams sign off on API and event contracts.
- SLO and fallback behavior approved by Product, Backend, and SRE.

## Phase 1: Data and Trust Backbone (Week 2-4)
### Objectives
- Build minimum required data and trust foundations for safe recommendations.

### Key Tasks
- Build or configure Feature Store keys for user and session features.
- Set up Trust Metadata Store ingestion from catalog and policy systems.
- Create trust eligibility rules by category:
  - Electronics: warranty required.
  - Beauty and personal care: expiry freshness required.
  - Pet care: variant and safety metadata required.
- Implement data-quality checks for null or stale trust fields.
- Backfill baseline features for target cohort.

### Deliverables
- Feature definitions and availability report.
- Trust metadata pipeline with freshness SLA.
- Data quality dashboard and alerting.

### Exit Criteria (Go/No-Go)
- At least 95% metadata coverage for launch-eligible SKUs in target cities.
- Data freshness within agreed SLA for trust-critical fields.

## Phase 2: Online Services Build (Week 3-6)
### Objectives
- Build server-side C3 flow from context to recommendation and trust badge.

### Key Tasks
- Implement Checkout Orchestrator API with strict timeout budget.
- Implement Context Builder using cart, time, day, and behavior features.
- Implement Scenario Inference Service (rules + lightweight classifier).
- Implement Candidate Generator with inventory and serviceability constraints.
- Implement Eligibility and Policy Filter with hard trust gates.
- Implement Ranking Service returning top-1 candidate only.
- Implement Trust Badge Service for deterministic copy generation.
- Add graceful fallback path to static recommendations under failure or timeout.

### Deliverables
- Deployed services in staging.
- Integration tests across the full request chain.
- Runbooks for failure modes and fallbacks.

### Exit Criteria (Go/No-Go)
- End-to-end staging P95 less than or equal to 1500 ms.
- Fallback path responds reliably under dependency failures.
- No recommendation is served without required trust metadata.

## Phase 3: Client Integration and Telemetry (Week 5-7)
### Objectives
- Integrate C3 widget in checkout without adding friction.

### Key Tasks
- Add checkout widget placement above checkout CTA.
- Ensure widget is non-blocking and does not delay checkout render.
- Integrate trust badge visual treatment and copy.
- Wire telemetry events:
  - c3_widget_impression
  - c3_widget_click
  - c3_widget_add_to_cart
  - c3_widget_dismiss
  - c3_order_conversion
  - c3_latency_trace
- Add variant tagging and trace propagation for experiment analysis.

### Deliverables
- Mobile app build with feature flag and kill switch.
- Analytics validation report with event completeness.

### Exit Criteria (Go/No-Go)
- No measurable regression in checkout flow time on test devices.
- Event completeness at least 99% in staging replay.

## Phase 4: Shadow Mode Validation (Week 7-8)
### Objectives
- Validate production behavior without exposing recommendations to users.

### Key Tasks
- Run inference, filtering, and ranking in production silently.
- Capture latency, coverage, fallback rates, and trust rule hit rates.
- Compare scenario stability by time-of-day and city cohorts.
- Validate top recommendations through manual quality review samples.

### Deliverables
- Shadow mode scorecard.
- Tuning changes for rules, thresholds, and ranking weights.

### Exit Criteria (Go/No-Go)
- Production P95 within SLO.
- Fallback rate below agreed threshold.
- Recommendation quality acceptable in manual audits.

## Phase 5: Controlled Launch at 5% Traffic (Week 8-9)
### Objectives
- Launch treatment safely to a small cohort.

### Key Tasks
- Enable experiment arms in selected cities and high-frequency users.
- Monitor primary and guardrail metrics daily.
- Trigger instant rollback on:
  - checkout completion drop beyond threshold
  - sustained latency breaches
  - trust badge generation failures
- Run root-cause analysis for outlier days.

### Deliverables
- Daily launch report and incident log.
- Mid-phase tuning decisions.

### Exit Criteria (Go/No-Go)
- Guardrails remain healthy for a minimum stability window.
- Early directional lift in ATC and AOV without checkout harm.

## Phase 6: Ramp to 25% and Optimization (Week 9-10)
### Objectives
- Increase confidence in impact and system stability.

### Key Tasks
- Expand to broader user cohorts and additional cities.
- Optimize ranking weights and scenario confidence thresholds.
- Add category-specific surge sensitivity penalties where needed.
- Tune trust copy clarity and ordering in widget UI.
- Validate experiment power and confidence intervals.

### Deliverables
- Optimization changelog with before-after impact snapshots.
- Updated performance and business metrics dashboard.

### Exit Criteria (Go/No-Go)
- Statistically credible lift on primary and secondary metrics.
- No statistically significant guardrail regression.

## Phase 7: Scale Decision to 50-100% (Post Week 10)
### Objectives
- Decide scale-up based on business lift and platform safety.

### Key Tasks
- Final decision review with Product, Engineering, Data, and Finance.
- Rollout by city waves with active monitoring.
- Keep kill switch active and tested weekly.
- Document learnings and backlog for V2 improvements.

### Deliverables
- Scale-up decision memo.
- Final experiment readout.
- V2 roadmap proposal.

### Exit Criteria (Go/No-Go)
- Significant lift in new-category MAC adoption.
- Sustained compliance with latency and checkout guardrails.

## 6) Dependencies and Critical Path
- Trust metadata coverage is the primary critical-path dependency.
- Event integrity is required for experiment validity.
- Mobile release timing controls when treatment can begin.
- Feature flag and kill switch are mandatory before any traffic exposure.

## 7) KPI and Guardrail Tracking Plan
### Business KPIs
- Primary: percent increase in MACs purchasing at least one new non-FMCG category.
- Secondary: C3 ATC conversion rate, AOV lift, margin per order lift.

### Guardrails
- Checkout completion rate.
- Checkout duration delta.
- C3 service P95 latency and fallback rate.

### Reporting Cadence
- Daily during 5% launch.
- Every 48 hours during 25% ramp.
- Weekly post scale-up.

## 8) Risk Register (MVP)
- Low trust coverage in launch cities.
  - Mitigation: strict filtering and city-level launch allowlist.
- Latency spikes from catalog or feature fetches.
  - Mitigation: cache hot keys, enforce dependency timeouts, circuit breakers.
- Irrelevant recommendations reducing user trust.
  - Mitigation: top-1 only, high confidence threshold, manual audit loop.
- Measurement bias due to broken instrumentation.
  - Mitigation: pre-launch replay validation and ongoing anomaly alerts.

## 9) Operational Readiness Checklist
- Feature flag and instant rollback verified in production.
- On-call roster and escalation paths documented.
- Dashboards and alerts active for latency, fallback, and guardrails.
- Runbook tested for dependency outages and partial degradation.

## 10) Definition of MVP Completion
MVP is considered complete when all conditions below are met:
- C3 widget serves top-1 contextual recommendation with trust badge in checkout.
- P95 end-to-end response remains within 1500 ms in launch geographies.
- No statistically significant drop in checkout completion.
- Statistically significant improvement in new-category MAC adoption vs control.
- Experiment readout and production hardening notes are documented and approved.
