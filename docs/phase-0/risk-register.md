# C3 Phase 0 Risk Register (with Mitigation Owners)

## 1. Purpose
Track top Phase 0 risks that can block safe launch readiness, with ownership and mitigation plans.

## 2. Risk Scoring
- Probability: Low, Medium, High
- Impact: Low, Medium, High
- Score guideline:
  - Critical: High impact with Medium or High probability
  - Major: Medium impact with Medium or High probability

## 3. Risk Register

| ID | Risk | Probability | Impact | Severity | Early Signal | Mitigation | Owner | Target Phase |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R-01 | Trust metadata coverage below launch threshold in target cities | Medium | High | Critical | Coverage dashboard below 95% | Launch allowlist, strict filtering, partner catalog backfill sprint | Catalog and Trust Lead | 1 |
| R-02 | P95 latency exceeds 1500 ms in integrated flow | Medium | High | Critical | Sustained tail latency alarms | Per-service timeout budgets, cache hot paths, fallback at 900 ms | Backend Lead + SRE Lead | 2 |
| R-03 | Checkout completion rate drops due to widget friction | Low | High | Critical | Variant guardrail dip beyond threshold | Non-blocking render, kill switch, UI simplification, rapid rollback | Mobile Lead + Product Lead | 3 to 5 |
| R-04 | Inconsistent policy text between badge and backend policy | Medium | High | Critical | Policy mismatch validator alerts | Policy versioning and single source of truth service | Catalog Lead + Backend Lead | 1 to 2 |
| R-05 | Experiment bucket instability across sessions or devices | Medium | Medium | Major | Variant flip-rate anomaly | Stable key hashing and assignment tests | Data Lead + Backend Lead | 0 |
| R-06 | Event loss or schema drift invalidates experiment readout | Medium | High | Critical | Event completeness below 99% | CI schema checks, replay validation, ingestion alerts | Data Engineering Lead | 0 to 3 |
| R-07 | Recommender quality poor for high buy-again users | Medium | Medium | Major | Low CTR and ATC in key cohort | Confidence thresholding, suppress low-confidence widget | ML Lead + Product Lead | 4 to 6 |
| R-08 | Surge fee plus recommendation causes abandonment | Medium | Medium | Major | Higher abandonment in high-surge bucket | Surge-aware friction penalty and category suppression policy | ML Lead + Product Lead | 6 |
| R-09 | Compliance-restricted item leaks into recommendations | Low | High | Critical | Compliance audit exception | Pre-rank compliance hard filter and audit gates | Backend Lead + Legal/Compliance Lead | 1 to 2 |
| R-10 | Missing on-call and runbook readiness during launch | Medium | Medium | Major | Slow incident response in drills | Launch readiness drills, roster sign-off, paging playbooks | SRE Lead | 4 to 5 |

## 4. Risk Review Cadence
- Weekly risk review during Phase 0 to 3.
- Daily review during 5% launch window.
- Re-score each risk after mitigation deployment.

## 5. Escalation Matrix
- Critical risk triggered:
  - Immediate incident bridge.
  - Apply kill switch or fallback policy.
  - Product, SRE, and Engineering leadership informed.
- Major risk triggered:
  - Assign incident owner within same day.
  - Mitigate before next traffic ramp.

## 6. Phase 0 Exit Risk Gates
Phase 0 cannot be marked complete unless:
- R-05 assignment stability is validated.
- R-06 event integrity controls are in place and tested.
- R-01 mitigation plan is approved with accountable owner and dates.
- R-02 timeout and fallback strategy is approved by SRE and Backend.

## 7. Sign-Off Table
- Product Lead: scope, guardrails, and risk tolerance accepted.
- Backend Lead: API and degradation controls accepted.
- Mobile Lead: rendering and UX fallback accepted.
- Data Lead: measurement validity and event controls accepted.
- SRE Lead: latency alerting and incident readiness accepted.
