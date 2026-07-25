# Phase 4 Deliverable: Shadow Mode Scorecard

## 1. Objective
Validate C3 in production shadow mode without exposing recommendations to users, and produce objective go or no-go evidence for Phase 5.

## 2. Shadow Mode Scope
- Inference, filtering, ranking, and trust checks run live.
- No user-visible C3 widget in checkout.
- Full telemetry captured for latency, coverage, fallback behavior, and quality diagnostics.

## 3. Observation Window
- Minimum duration: 7 days.
- Includes weekday and weekend behavior.
- Coverage across launch cities and key traffic bands.

## 4. Scorecard Metrics

### 4.1 Performance Metrics
| Metric | Target | Observed | Pass or Fail |
| --- | --- | --- | --- |
| End-to-end p50 latency (ms) | <= 400 | TBD | TBD |
| End-to-end p95 latency (ms) | <= 1500 | TBD | TBD |
| Timeout rate | <= agreed threshold | TBD | TBD |
| Fallback rate | <= agreed threshold | TBD | TBD |

### 4.2 Coverage and Eligibility Metrics
| Metric | Target | Observed | Pass or Fail |
| --- | --- | --- | --- |
| Requests with non-empty candidate set | >= 90% | TBD | TBD |
| Requests with trust-compliant top candidate | >= 85% | TBD | TBD |
| Category-level trust gate pass rate | >= city target | TBD | TBD |
| No-trust recommendation violations | 0 | TBD | TBD |

### 4.3 Stability Metrics
| Metric | Target | Observed | Pass or Fail |
| --- | --- | --- | --- |
| Scenario distribution drift day-over-day | within control limits | TBD | TBD |
| Service error rate | <= SLO threshold | TBD | TBD |
| Dependency degradation incidents | tracked with mitigations | TBD | TBD |

### 4.4 Quality Signals (Shadow)
| Metric | Target | Observed | Pass or Fail |
| --- | --- | --- | --- |
| Manual audit relevance score | acceptable threshold | TBD | TBD |
| Trust badge correctness in sampled payloads | 100% | TBD | TBD |
| Scenario consistency by cohort and daypart | acceptable variance | TBD | TBD |

## 5. Segment Breakdowns
Mandatory cuts:
- City
- Platform
- Daypart
- Weekday vs weekend
- User behavior cohort (buy-again heavy vs mixed)

## 6. Fallback Reason Distribution
Track fallback reasons with percentages:
- timeout_dependency
- trust_ineligible_candidates
- empty_candidate_set
- service_error
- configuration_forced

## 7. Manual Quality Review Protocol
- Sample size: minimum 200 shadow payloads per city.
- Review dimensions:
  - relevance to cart context
  - trust marker correctness
  - risk of user confusion if exposed
- Reviewer mix: Product, ML, and Catalog.

## 8. Decision Rules for Phase 5 Readiness
Go to Phase 5 only if all are true:
- production p95 <= 1500 ms
- fallback rate below agreed threshold for continuous stability window
- no trust-compliance violations
- manual quality review marked acceptable

## 9. Issues and Actions Log
| Date | Issue | Impact | Action Taken | Owner | Status |
| --- | --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | TBD | Open |

## 10. Sign-Off Block
- Product Lead
- Backend Lead
- ML Lead
- Data Lead
- SRE Lead
- Catalog and Trust Lead
