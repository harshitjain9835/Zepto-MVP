# C3 API Spec v1 (Phase 0 Baseline)

## 1. Objective
Define the Phase 0 contract for the checkout-facing C3 API so Backend, Mobile, ML, and Data can integrate against one stable interface.

## 2. Endpoint Definition
- Method: `POST`
- Path: `/v1/c3/widget`
- Auth: service-to-service token for checkout backend calls
- Idempotency: supported via `request_id`
- SLA target:
  - P50 <= 400 ms
  - P95 <= 1500 ms
- Hard timeout:
  - Orchestrator response timeout at 900 ms for fallback return

## 3. Request Contract

### Headers
- `Content-Type: application/json`
- `X-Request-Id: <uuid>`
- `X-Client-Version: <semver>`
- `X-City-Id: <city_code>`

### Body Schema (JSON)
```json
{
  "request_id": "4e7346d8-5c4f-4f75-9ecb-8d0bc64b8f4a",
  "user": {
    "user_id_hashed": "u_4f...",
    "is_guest": false
  },
  "session": {
    "session_id": "s_8a...",
    "platform": "android",
    "app_version": "9.12.0"
  },
  "context": {
    "city_id": "blr",
    "timezone": "Asia/Kolkata",
    "request_ts": "2026-07-25T09:10:11Z",
    "surge_fee_inr": 30
  },
  "cart": {
    "cart_id": "c_1122",
    "cart_hash": "h_a93c5",
    "items": [
      {
        "sku_id": "milk_1l",
        "qty": 1,
        "unit_price_inr": 64,
        "category_l1": "fmcg"
      }
    ],
    "subtotal_inr": 412
  },
  "signals": {
    "search_query": "",
    "used_buy_again": true,
    "recent_non_fmcg_orders_30d": 0
  }
}
```

### Validation Rules
- `request_id`, `session_id`, `cart_id`, `city_id`, and `cart.items` are required.
- If `user_id_hashed` missing, request remains valid as session-only context.
- `cart.items` must be non-empty. If empty, return no-widget fallback.
- Unknown fields are ignored but logged under schema drift telemetry.

## 4. Response Contract

### Success Response (Contextual Recommendation)
```json
{
  "request_id": "4e7346d8-5c4f-4f75-9ecb-8d0bc64b8f4a",
  "variant_id": "C",
  "scenario": {
    "id": "wfh_rush",
    "confidence": 0.82
  },
  "recommendation": {
    "sku_id": "usb_c_charger_30w",
    "title": "30W USB-C Fast Charger",
    "category_l1": "electronics",
    "price_inr": 499,
    "inventory_state": "in_stock"
  },
  "trust_badge": {
    "type": "warranty",
    "text": "1-year official brand warranty",
    "policy_version": "2026-07-01"
  },
  "widget": {
    "placement": "checkout_above_cta",
    "dismissible": true
  },
  "fallback": false,
  "latency_ms": 612,
  "debug": {
    "model_version": "scenario-v0.3",
    "ranker_version": "ranker-v0.2"
  }
}
```

### Fallback Response (Static or No Widget)
```json
{
  "request_id": "4e7346d8-5c4f-4f75-9ecb-8d0bc64b8f4a",
  "variant_id": "B",
  "scenario": null,
  "recommendation": null,
  "trust_badge": null,
  "widget": {
    "placement": "checkout_above_cta",
    "dismissible": true,
    "type": "static_fallback"
  },
  "fallback": true,
  "fallback_reason": "timeout_dependency",
  "latency_ms": 301
}
```

## 5. Error Contract
- 4xx: malformed input (schema, auth, missing required fields)
- 5xx: server/internal errors
- Even on dependency failure, prefer 200 + `fallback=true` to preserve checkout UX.

Error shape:
```json
{
  "request_id": "4e7346d8-5c4f-4f75-9ecb-8d0bc64b8f4a",
  "error": {
    "code": "INVALID_REQUEST",
    "message": "cart.items cannot be empty"
  }
}
```

## 6. Business Rules in API Layer
- Never return non-FMCG recommendation without trust badge.
- If trust metadata missing, filter candidate before response.
- Return top-1 recommendation only.
- Do not block checkout rendering waiting for C3.

## 7. Timeout and Fallback Budget
- Total max runtime target: 1500 ms.
- Fallback trigger at dependency timeout threshold.
- Target fallback response by 900 ms from orchestrator start.

## 8. Compatibility and Versioning
- Backward compatibility: additive fields only within v1.
- Breaking changes require `/v2/c3/widget`.
- `variant_id` values locked for experiment continuity: `A`, `B`, `C`.

## 9. Security and Privacy
- User identifier must be hashed before request.
- No raw PII allowed in request, response, or telemetry.
- Access restricted to checkout service clients.

## 10. Sign-Off Checklist (Phase 0 Exit)
- Product sign-off: placement, fallback UX, variant semantics.
- Backend sign-off: schema, timeout behavior, status handling.
- Mobile sign-off: rendering compatibility, non-blocking behavior.
- Data sign-off: required dimensions and event linkage IDs.
- SRE sign-off: SLOs, alerts, and degradation policy.
