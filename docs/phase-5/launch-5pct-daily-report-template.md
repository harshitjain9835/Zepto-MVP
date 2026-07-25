# Phase 5: 5% Launch Daily Report Template

## 1. Report Metadata
- Report date:
- Report owner:
- Coverage window (IST):
- Cities in scope:
- Variant rollout status:

## 2. Executive Summary
- Overall launch health: Green, Amber, Red
- Decision recommendation: Continue, Continue with constraints, Pause, Rollback
- Top 3 observations:
  1.
  2.
  3.

## 3. Guardrail Snapshot (Aligned to Phase 4)

| Guardrail Metric | Target | Today | 3-day Trend | Status |
| --- | --- | --- | --- | --- |
| Checkout completion rate delta vs control | No significant drop | TBD | TBD | TBD |
| Checkout duration delta vs control | Within agreed tolerance | TBD | TBD | TBD |
| End-to-end p95 latency (ms) | <= 1500 | TBD | TBD | TBD |
| Fallback rate | <= agreed threshold | TBD | TBD | TBD |
| Non-FMCG trust compliance violations | 0 | TBD | TBD | TBD |

## 4. Business Metric Snapshot

| Metric | Baseline or Control | Today | Trend | Status |
| --- | --- | --- | --- | --- |
| C3 widget ATC conversion rate | TBD | TBD | TBD | TBD |
| AOV delta vs control | TBD | TBD | TBD | TBD |
| Margin per order delta vs control | TBD | TBD | TBD | TBD |
| New-category purchase signal (directional) | TBD | TBD | TBD | TBD |

## 5. Operational Metrics

| Metric | Target | Today | Status |
| --- | --- | --- | --- |
| Timeout rate | <= agreed threshold | TBD | TBD |
| Service error rate | <= SLO threshold | TBD | TBD |
| Candidate non-empty rate | >= shadow baseline | TBD | TBD |
| Trust-eligible top1 rate | >= shadow baseline | TBD | TBD |

## 6. Fallback Reason Mix (From Phase 4 taxonomy)

| Fallback Reason | Count | Share | Day-over-day Delta |
| --- | ---: | ---: | ---: |
| timeout_dependency | TBD | TBD | TBD |
| trust_ineligible_candidates | TBD | TBD | TBD |
| empty_candidate_set | TBD | TBD | TBD |
| service_error | TBD | TBD | TBD |
| configuration_forced | TBD | TBD | TBD |

## 7. Segment Diagnostics
Mandatory cuts:
- City
- Platform
- Daypart
- Weekday vs weekend
- User behavior cohort

### 7.1 City Breakdown
| City | Checkout Guardrails | Latency | Fallback | Trust Compliance | Decision |
| --- | --- | --- | --- | --- | --- |
| BLR | TBD | TBD | TBD | TBD | TBD |
| MUM | TBD | TBD | TBD | TBD | TBD |

### 7.2 Platform Breakdown
| Platform | Guardrail Health | Event Health | Issues |
| --- | --- | --- | --- |
| Android | TBD | TBD | TBD |
| iOS | TBD | TBD | TBD |

## 8. Incident Summary (24h)
- Total incidents:
- Sev 0:
- Sev 1:
- Sev 2:
- Linked incident IDs:

## 9. Tuning Changes Applied Today
| Change ID | Component | Hypothesis | Expected Impact | Observed Early Signal | Keep or Revert |
| --- | --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | TBD | TBD |

## 10. Risk Watchlist
- Risk 1:
- Risk 2:
- Risk 3:

## 11. Decision and Action Plan for Next 24h
- Decision:
- Changes to rollout scope:
- Required mitigations:
- Owners and deadlines:

## 12. Sign-Off
- Product Lead:
- Backend Lead:
- Data Lead:
- SRE Lead:
- ML Lead:
- Catalog and Trust Lead:

## 13. Data Sources
Use data from:
- Phase 4 scorecard and daily metric structure
- Shadow query pack successors for launch tables
- Live dashboards for guardrails, latency, fallback, and trust checks
