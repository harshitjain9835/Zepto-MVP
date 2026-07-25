# Phase 3 Deliverable: Analytics Validation Report and Event Completeness

## 1. Objective
Validate telemetry integrity for Phase 3 before entering shadow mode and traffic launch.

## 2. Required Events
- c3_widget_impression
- c3_widget_click
- c3_widget_add_to_cart
- c3_widget_dismiss
- c3_order_conversion
- c3_latency_trace

## 3. Required Dimensions
- request_id
- session_id
- user_id_hashed nullable
- variant_id
- scenario_id nullable
- sku_id nullable
- city_id
- platform
- app_version
- event_ts

## 4. Validation Method
- Run staging replay with synthetic and sampled real-like sessions.
- Compare expected vs observed counts by variant and platform.
- Verify event order constraints where applicable.
- Verify payload schema conformance for every event type.

## 5. Event Completeness Criteria
Primary threshold:
- completeness >= 99% for each required event family.

Secondary thresholds:
- join-key null rate <= 0.5% for request_id, session_id, variant_id.
- event ingestion delay within defined pipeline SLO.

## 6. Report Template

### 6.1 Summary Table
| Metric | Target | Observed | Pass or Fail |
| --- | --- | --- | --- |
| Impression completeness | >= 99% | TBD | TBD |
| Click completeness | >= 99% | TBD | TBD |
| Add-to-cart completeness | >= 99% | TBD | TBD |
| Dismiss completeness | >= 99% | TBD | TBD |
| Order conversion completeness | >= 99% | TBD | TBD |
| Latency trace completeness | >= 99% | TBD | TBD |
| Join-key null rate | <= 0.5% | TBD | TBD |

### 6.2 Variant Distribution Check
| Variant | Expected Share | Observed Share | Delta | Pass or Fail |
| --- | --- | --- | --- | --- |
| A | TBD | TBD | TBD | TBD |
| B | TBD | TBD | TBD | TBD |
| C | TBD | TBD | TBD | TBD |

### 6.3 Platform Breakdown
| Platform | Event Family | Completeness | Pass or Fail |
| --- | --- | --- | --- |
| Android | all required events | TBD | TBD |
| iOS | all required events | TBD | TBD |

## 7. Common Failure Modes and Fixes
- Impression inflation:
  - cause: event fired before visible render
  - fix: emit only after visual render confirmation
- Click without impression:
  - cause: missing impression due to race
  - fix: ensure deterministic render callback instrumentation
- Variant mismatch across events:
  - cause: unstable variant assignment cache
  - fix: source variant from one authoritative session store
- Latency trace missing:
  - cause: backend logging not propagated
  - fix: enforce mandatory middleware emission

## 8. Sign-Off Block
- Data Lead: event integrity approved
- Mobile Lead: client instrumentation approved
- Backend Lead: server trace integrity approved
- Product Lead: experiment-readiness approved

## 9. Exit Criteria Mapping
- Deliverable met: analytics validation report template with explicit thresholds.
- Go or no-go check: event completeness at least 99% in staging replay.
