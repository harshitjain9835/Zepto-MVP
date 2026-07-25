# Phase 2 Deliverable: Integration Tests Across Full Request Chain

## 1. Objective
Define full-chain integration tests to validate functional correctness, trust enforcement, latency, and fallback reliability in staging.

## 2. System Under Test
Path under test:
- Checkout Orchestrator -> Context Builder -> Scenario Inference -> Candidate Generator -> Eligibility and Policy Filter -> Ranking -> Trust Badge -> Response

## 3. Test Data Setup
- Cities: BLR, MUM
- Users:
  - high-frequency FMCG-only user
  - mixed-category user
  - cold-start user
- Catalog slices:
  - in-stock and out-of-stock variants
  - complete and incomplete trust metadata variants
  - serviceable and non-serviceable SKUs

## 4. Core Test Scenarios

### Group A: Happy Path
- A1: high-confidence scenario with valid trust metadata
  - expected: top-1 contextual recommendation with valid badge
- A2: cold-start user with context-only inference
  - expected: recommendation returned without user-history dependency

### Group B: Trust Enforcement
- B1: electronics candidate missing warranty
  - expected: candidate rejected, alternate candidate selected or fallback
- B2: beauty candidate missing freshness metadata
  - expected: candidate rejected
- B3: pet care candidate missing safety variant verification
  - expected: candidate rejected
- B4: all candidates trust-ineligible
  - expected: fallback payload

### Group C: Inventory and Serviceability
- C1: selected candidate becomes out-of-stock during request
  - expected: reselect candidate or fallback
- C2: non-serviceable dark store candidate
  - expected: filtered before ranking

### Group D: Latency and Resilience
- D1: feature store latency spike
  - expected: bounded timeout and fallback, no checkout blocking
- D2: trust service timeout
  - expected: fallback with timeout reason
- D3: scenario inference timeout
  - expected: fallback path response under 900 ms target

### Group E: Contract and Integrity
- E1: response contains top-1 only
- E2: non-FMCG recommendation always contains trust badge
- E3: fallback response includes fallback flag and reason
- E4: required telemetry keys are propagated

## 5. Test Matrix
| Scenario ID | Functional Pass | Trust Pass | Latency Pass | Fallback Pass | Owner |
| --- | --- | --- | --- | --- | --- |
| A1 | Yes | Yes | Yes | NA | Backend |
| A2 | Yes | Yes | Yes | NA | Backend |
| B1 | Yes | Yes | Yes | Optional | Backend + Catalog |
| B2 | Yes | Yes | Yes | Optional | Backend + Catalog |
| B3 | Yes | Yes | Yes | Optional | Backend + Catalog |
| B4 | Yes | Yes | Yes | Yes | Backend |
| C1 | Yes | Yes | Yes | Optional | Backend + Inventory |
| C2 | Yes | Yes | Yes | Optional | Backend |
| D1 | Yes | Yes | Yes | Yes | Backend + SRE |
| D2 | Yes | Yes | Yes | Yes | Backend + SRE |
| D3 | Yes | Yes | Yes | Yes | Backend + SRE |
| E1 | Yes | NA | Yes | NA | QA |
| E2 | Yes | Yes | Yes | NA | QA |
| E3 | Yes | NA | Yes | Yes | QA |
| E4 | Yes | NA | Yes | NA | Data |

## 6. Performance Test Requirements
- Baseline load: representative staging QPS equivalent to 5 percent launch traffic
- Spike load: 2x baseline for 10 minutes
- Soak load: 2 hours at baseline

Success thresholds:
- end-to-end p95 <= 1500 ms
- no sustained error rate above agreed SLO
- fallback path stable under injected dependency failures

## 7. Failure Injection Tests
- disable trust metadata service for 5 minutes
- add 400 ms latency to feature store reads
- return partial catalog responses

Expected outcomes:
- bounded latency and controlled fallback
- no non-trust-compliant recommendation output
- no checkout-blocking behavior

## 8. Automation Strategy
- run core suite on each staging deploy
- run resilience suite nightly
- run performance suite before go or no-go review

## 9. Evidence Required for Phase 2 Exit
- test report with pass or fail per scenario
- latency report with p50 and p95 by scenario type
- failure injection report proving fallback reliability
- trust enforcement report showing zero violations

## 10. Exit Criteria Mapping
- Integration tests across full chain: satisfied by this suite and evidence package.
- Fallback reliability under dependency failure: validated in Group D and failure injection.
- No recommendation without required trust metadata: validated in Group B and trust enforcement report.
