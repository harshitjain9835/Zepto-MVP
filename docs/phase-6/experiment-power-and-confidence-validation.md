# Phase 6: Experiment Power and Confidence Validation Plan

## 1. Objective
Validate that Phase 6 decisions are based on sufficiently powered data and statistically credible confidence intervals.

## 2. Inputs Required
- variant-level exposure counts
- MAC-level conversion outcomes
- session-level ATC and AOV outcomes
- guardrail outcomes by variant
- segmentation keys for city, platform, cohort, daypart

## 3. Power Check Workflow
1. compute accumulated sample per arm
2. compare against planned minimum detectable effect assumptions
3. estimate achieved power for primary metric
4. if underpowered, extend observation window before scale decisions

## 4. Confidence Interval and Significance Readout
For each primary and secondary metric, report:
- treatment estimate
- control estimate
- absolute and relative lift
- confidence interval
- p-value or equivalent significance indicator
- decision label: significant, directional, inconclusive

For guardrails, report:
- estimated delta vs control
- confidence interval
- non-inferiority or regression label

## 5. Segmentation Validation
Run confidence checks by:
- city
- platform
- user cohort
- surge bucket

Use segmentation to diagnose heterogeneity, not to overfit decisions.

## 6. Decision Rules
- proceed to Phase 7 readiness discussion only if:
  - primary metric shows credible lift
  - secondary metrics support directionality
  - no guardrail regression with statistical evidence

- if inconclusive:
  - extend run duration
  - avoid major tuning churn
  - preserve experiment integrity

## 7. Output Template
| Metric | Control | Treatment | Absolute Delta | Relative Lift | Confidence Interval | Statistical Status | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| New-category MAC adoption | TBD | TBD | TBD | TBD | TBD | TBD | TBD |

## 8. Phase 6 Exit Criteria Mapping
This artifact validates the implementation-plan requirement to confirm experiment power and confidence intervals before promotion to scale decisions.
