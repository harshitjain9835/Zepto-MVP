# Phase 4 Deliverable: Tuning Changes Log (Rules, Thresholds, Ranking Weights)

## 1. Objective
Capture all Phase 4 tuning decisions with rationale and measured impact before exposure to real users.

## 2. Tuning Governance
- Every tuning change must include:
  - change id
  - owner
  - hypothesis
  - expected impact
  - observed impact
  - rollback condition
- No undocumented changes allowed during shadow mode.

## 3. Change Log Template
| Change ID | Component | Previous Value | New Value | Reason | Expected Impact | Observed Impact | Decision | Owner | Date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TUN-001 | scenario_confidence_threshold | 0.55 | 0.62 | reduce low-confidence suggestions | better relevance, slight coverage drop | TBD | TBD | ML | TBD |

## 4. Tuning Categories

### 4.1 Rule Tuning
Examples:
- scenario mapping overrides by daypart
- category suppression under surge conditions
- trust hard-gate adjustments by category

### 4.2 Threshold Tuning
Examples:
- scenario confidence minimum
- trust eligibility confidence threshold
- fallback trigger threshold per dependency

### 4.3 Ranking Weight Tuning
Weighted score:
S = w1*Relevance + w2*AttachProb + w3*MarginLift - w4*FrictionRisk

Track updates to:
- w1 relevance weight
- w2 attach probability weight
- w3 margin weight
- w4 friction penalty weight

## 5. Required Impact Readout per Change
For each change, report deltas on:
- p95 latency
- fallback rate
- trust-ineligible reject rate
- shadow relevance audit score
- candidate coverage rate

## 6. Safe Tuning Guardrails
- Do not increase latency beyond p95 budget.
- Do not reduce trust-compliance guarantees.
- Do not deploy multiple major tuning changes simultaneously without isolation.

## 7. Rollback Rules
Immediate rollback if any of the following occur:
- p95 latency regression beyond threshold for sustained window
- fallback rate spike beyond threshold
- trust policy inconsistencies detected
- manual relevance audits fall below acceptable threshold

## 8. Approval Workflow
- ML proposes tuning change.
- Backend validates runtime impact.
- Data validates metric interpretation.
- Product approves rollout of tuned config.
- SRE signs off when risk to reliability exists.

## 9. Final Phase 4 Tuning Summary
Include final list:
- accepted changes
- rejected changes
- deferred changes for Phase 6 optimization
