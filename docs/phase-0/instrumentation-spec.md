# C3 Instrumentation Spec (Phase 0)

## 1. Objective
Define a reliable, analysis-ready telemetry contract for C3 experiments and guardrail monitoring.

## 2. Event Principles
- Emit only after real UI or user action state change.
- Use shared identifiers to join backend and client events.
- Keep schema stable; use additive evolution.
- Reject events containing raw PII.

## 3. Required Common Fields
All events must include:
- `event_name`
- `event_ts`
- `request_id`
- `session_id`
- `user_id_hashed` (nullable)
- `order_id` (nullable until checkout complete)
- `city_id`
- `platform` (`android` or `ios`)
- `app_version`
- `variant_id` (`A`, `B`, `C`)
- `fallback` (bool)
- `scenario_id` (nullable)
- `sku_id` (nullable)

## 4. Event Catalog

### 4.1 `c3_widget_impression`
Emit condition:
- Widget is actually rendered and visible to user viewport.

Fields:
- `placement`
- `widget_type` (`contextual`, `static_fallback`, `none`)
- `confidence` (nullable)
- `trust_badge_type` (nullable)
- `latency_ms`

### 4.2 `c3_widget_click`
Emit condition:
- User taps widget card.

Fields:
- `target` (`card`, `cta`, `badge_info`)
- `position_index` (always `1` for MVP)

### 4.3 `c3_widget_add_to_cart`
Emit condition:
- Recommended SKU add-to-cart succeeds.

Fields:
- `recommended_qty`
- `recommended_price_inr`
- `cart_subtotal_before_inr`
- `cart_subtotal_after_inr`

### 4.4 `c3_widget_dismiss`
Emit condition:
- User dismisses widget explicitly.

Fields:
- `dismiss_reason` (`manual_close`, `auto_refresh`, `cart_changed`)

### 4.5 `c3_order_conversion`
Emit condition:
- Checkout order successfully placed for session where C3 was eligible.

Fields:
- `order_id`
- `order_total_inr`
- `contains_recommended_sku` (bool)
- `contains_new_non_fmcg_category` (bool)

### 4.6 `c3_latency_trace`
Emit condition:
- Every request, sampled at 100% during launch phases.

Fields:
- `total_latency_ms`
- `context_build_ms`
- `inference_ms`
- `candidate_ms`
- `rank_ms`
- `trust_ms`
- `fallback_reason` (nullable)

## 5. Data Quality Rules
- Event completeness threshold: >= 99% for required events.
- Null field threshold for critical fields: < 0.5%.
- Variant distribution check daily to catch bucketing drift.
- Impression-to-click funnel cannot exceed logical bounds.

## 6. Guardrail Dashboards
Create live dashboards for:
- Checkout completion rate by variant.
- Checkout duration delta by variant.
- P50 and P95 C3 latency.
- Fallback rate and fallback reason breakdown.
- Trust badge null or mismatch rate.

## 7. Alerting Thresholds
- P95 latency > 1500 ms for 15 min.
- Fallback rate > agreed threshold for 15 min.
- Impression event loss > 2% over 1 hour.
- Variant skew > 3 percentage points vs expected split.

## 8. Event Ownership
- Mobile: impression, click, dismiss, client-side add-to-cart instrumentation.
- Backend: latency trace, decision metadata, fallback reasons.
- Data: schema governance, ETL validation, dashboard and alert maintenance.

## 9. Validation Plan
- Staging replay with synthetic traffic.
- Schema conformance checks in CI for event producers.
- Production canary validation during shadow mode.

## 10. Sign-Off Checklist (Phase 0 Exit)
- Event names and fields approved by Product and Data.
- Join keys (`request_id`, `session_id`, `variant_id`) verified end-to-end.
- Alert rules approved by SRE.
- PII scanner integrated for event payloads.
