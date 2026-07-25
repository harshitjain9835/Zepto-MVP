# Phase 1 Deliverable: Data Quality Dashboard and Alerting Spec

## 1. Objective
Define measurable dashboard and alerting requirements to guarantee trust and feature data quality before Phase 2 service rollout.

## 2. Dashboard Layers
- Executive layer: launch readiness summary by city.
- Operational layer: pipeline health and latency.
- Diagnostic layer: field-level nulls, freshness lag, policy mismatches.

## 3. Core Dashboard Panels

### 3.1 Launch Readiness by City
- Trust metadata completeness percent for launch-eligible SKUs.
- Trust freshness SLA compliance percent.
- Critical feature availability percent.
- Overall pass or fail badge for go or no-go.

### 3.2 Trust Field Integrity
- Null rate by field and category.
- Invalid enum count for policy fields.
- Policy version mismatch rate.
- Safety and expiry missing rates for pet care and beauty.

### 3.3 Feature Pipeline Health
- Upstream ingestion success rates.
- Processing latency percentile.
- Freshness lag histogram.
- Daily backfill reconciliation status.

### 3.4 Experiment Data Readiness
- Join key completeness for request_id, session_id, variant_id.
- Event completeness and delay distribution.
- Variant distribution sanity check.

## 4. Alert Rules
| Alert ID | Condition | Threshold | Severity | Initial Action | Owner |
| --- | --- | --- | --- | --- | --- |
| DQ-01 | Trust completeness by city drops | < 95% for 30 min | High | Freeze category or city rollout | Catalog and Trust |
| DQ-02 | Trust freshness lag breach | > SLA for 15 min | High | Mark stale records ineligible | Data Engineering |
| DQ-03 | Critical feature availability drop | < 99.5% for 15 min | High | Enable context-only fallback mode | Backend + Data |
| DQ-04 | Policy mismatch rate spike | > 0.5% for 15 min | Critical | Disable affected category recommendations | Catalog + Legal |
| DQ-05 | Ingestion job failure | 1 consecutive failure on critical feed | High | Trigger rerun and incident bridge | Data Engineering |
| DQ-06 | Duplicate SKU trust rows growth | > 0.1% daily | Medium | Run dedupe task and root-cause | Data Engineering |

## 5. Metric Definitions
- Trust completeness percent:
  - numerator: launch-eligible SKUs with all required trust fields present per category
  - denominator: launch-eligible SKUs in city
- Freshness compliance percent:
  - numerator: trust rows with updated_at within SLA
  - denominator: trust rows for launch-eligible SKUs
- Feature availability percent:
  - numerator: successful reads for critical features
  - denominator: total read attempts for critical features

## 6. Suggested Data Models

### Table: dq_trust_city_daily
- date
- city_id
- category_l1
- eligible_sku_count
- complete_sku_count
- completeness_pct
- freshness_compliant_sku_count
- freshness_compliance_pct

### Table: dq_feature_availability_hourly
- hour_ts
- feature_group
- total_reads
- successful_reads
- availability_pct
- p95_read_latency_ms

### Table: dq_policy_consistency_hourly
- hour_ts
- city_id
- compared_rows
- mismatched_rows
- mismatch_pct

## 7. Runbook Hooks
- If DQ-01 or DQ-04 triggers:
  - disable impacted category recommendation via config flag.
  - notify Product, Backend, Catalog, Legal, and SRE.
- If DQ-03 triggers:
  - switch to context-only scoring or static fallback depending on severity.

## 8. Ownership
- Data Engineering: dashboard implementation and alert plumbing.
- Catalog and Trust: trust data corrections and policy consistency.
- Backend: fallback behavior when DQ alerts fire.
- SRE: escalation and incident command.

## 9. Phase 1 Exit Criteria Mapping
- Deliverable met: data quality dashboard and alerting spec documented.
- Go or no-go check 1: trust completeness panel shows >= 95% for target cities.
- Go or no-go check 2: trust freshness compliance within SLA for target cities.

## 10. Acceptance Checklist
- Dashboard panels reviewed by Product, Data, and SRE.
- Alert thresholds agreed and configured in monitoring system.
- Test alerts fired in staging and incident routing verified.
