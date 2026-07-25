# C3 Experiment Design with Sample-Size Assumptions (Phase 0)

## 1. Objective
Measure whether C3 increases monthly cross-category adoption while preserving checkout conversion and speed.

## 2. Experiment Structure
- Arm A: Holdout (no widget)
- Arm B: Control (static recommendation)
- Arm C: Treatment (contextual C3 + trust badge)

Assignment:
- Deterministic hashing on stable user key.
- Consistent variant across sessions and devices where account is shared.

## 3. Unit of Randomization and Analysis
- Randomization unit: user account (preferred), fallback to session where account absent.
- Primary analysis unit: unique monthly active customer (MAC).
- Secondary analysis unit: eligible checkout sessions.

## 4. Metrics

### Primary Metric
- New-category MAC adoption rate:
  - numerator: MACs purchasing at least one new non-FMCG category during test window
  - denominator: eligible MACs in variant

### Secondary Metrics
- Widget add-to-cart conversion rate.
- AOV lift.
- Margin per order lift.

### Guardrails
- Checkout completion rate.
- Checkout duration delta.
- C3 latency P95 and fallback rate.

## 5. Hypotheses
- H1: Arm C improves primary metric vs Arm B and Arm A.
- H2: Arm C increases AOV and margin/order vs Arm B.
- H3: Arm C does not reduce checkout completion vs Arm B beyond pre-set margin.

## 6. Statistical Design
- Type I error (alpha): 0.05.
- Power: 0.80.
- Two-sided tests for primary comparisons.
- Multiple comparison handling:
  - Primary: C vs B.
  - Secondary confirmatory: C vs A.

## 7. Sample-Size Assumptions (Planning)
These are planning assumptions to be validated with live baseline data before launch.

Assumed baseline:
- Baseline new-category MAC adoption in control: 10%.
- Minimum detectable absolute lift for treatment: +1.5 percentage points (to 11.5%).

Approximate per-arm sample size using two-proportion normal approximation:
- Around 6,900 MACs per arm for 80% power and alpha 0.05.

Practical recommendation:
- Target >= 8,000 MACs per arm to absorb variance, logging loss, and cohort noise.
- Total target across 3 arms: >= 24,000 MACs.

Session-level sanity target:
- Maintain enough eligible checkout sessions to estimate guardrails with narrow confidence intervals.

## 8. Duration Assumptions
- At 5% traffic, expected slower accumulation; use for directional validation.
- For significance on primary metric, likely require 2-4 weeks depending on active MAC volume in selected cities.
- If underpowered, extend window before decision.

## 9. Segmentation Plan
Mandatory cuts:
- City
- Platform (android or ios)
- New vs returning user
- High-frequency vs medium-frequency users
- Surge fee buckets

Use segmentation for diagnosis, not for p-hacking; define cuts before launch.

## 10. Decision Rules
- Promote from 5% to 25% only if:
  - No significant guardrail regressions.
  - P95 latency within SLO.
  - Directional or significant positive trend in C vs B for key metrics.

- Promote to 50%+ only if:
  - Significant primary metric lift in C vs B.
  - Checkout completion non-inferior to control.
  - Operational stability sustained.

## 11. Confounder Controls
- Freeze major promo mechanics during critical readout windows where possible.
- Track overlapping campaign intensity by variant and include covariate controls.
- Exclude known outage windows from final analysis.

## 12. Data Exclusion Rules
- Exclude bot-like abusive traffic.
- Exclude malformed sessions missing join keys.
- Exclude known instrumentation incident intervals after incident review.

## 13. Reporting Cadence
- Daily dashboards during 5% rollout.
- 48-hour deep reads during 25% ramp.
- Final readout at pre-defined sample threshold and minimum duration.

## 14. Sign-Off Checklist (Phase 0 Exit)
- Product approval on success and guardrail thresholds.
- Data Science approval on power and analysis plan.
- Engineering approval on randomization implementation.
- Leadership approval on go or no-go rules.
