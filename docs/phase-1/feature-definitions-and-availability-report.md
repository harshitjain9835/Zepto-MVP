# Phase 1 Deliverable: Feature Definitions and Availability Report

## 1. Objective
Define MVP-ready feature keys for C3 and establish measurable availability standards for online inference.

## 2. Scope
Covers feature sets required by:
- Context Builder
- Scenario Inference Service
- Ranking Service
- Eligibility and Policy Filter

## 3. Feature Groups

### 3.1 Request-Time Cart Features
| Feature Key | Type | Source | Freshness | Required | Notes |
| --- | --- | --- | --- | --- | --- |
| cart.item_count | int | checkout request | real-time | Yes | Empty cart should short-circuit C3 |
| cart.subtotal_inr | float | checkout request | real-time | Yes | Used for surge sensitivity |
| cart.fmcg_ratio | float | derived | real-time | Yes | FMCG share in cart |
| cart.has_breakfast_staples | bool | derived | real-time | No | Scenario hint |
| cart.has_snacks | bool | derived | real-time | No | Scenario hint |

### 3.2 Session Features
| Feature Key | Type | Source | Freshness | Required | Notes |
| --- | --- | --- | --- | --- | --- |
| session.used_buy_again | bool | app telemetry | <= 5 min | Yes | Tunnel-vision indicator |
| session.search_query_last | string | app telemetry | <= 5 min | No | Optional intent signal |
| session.daypart | enum | derived | real-time | Yes | morning, afternoon, evening, late_night |
| session.day_of_week | enum | derived | real-time | Yes | weekday or weekend behavior |

### 3.3 User Behavioral Features (Hashed User)
| Feature Key | Type | Source | Freshness | Required | Notes |
| --- | --- | --- | --- | --- | --- |
| user.orders_30d | int | order history aggregate | <= 24 h | Yes | Activity level |
| user.non_fmcg_orders_30d | int | order history aggregate | <= 24 h | Yes | Cross-category baseline |
| user.last_non_fmcg_days_ago | int | order history aggregate | <= 24 h | No | Recency prior |
| user.avg_basket_30d_inr | float | order history aggregate | <= 24 h | No | Affordability proxy |
| user.city_id | string | profile | <= 24 h | Yes | Join with inventory and policy |

### 3.4 Catalog and Inventory Features
| Feature Key | Type | Source | Freshness | Required | Notes |
| --- | --- | --- | --- | --- | --- |
| sku.in_stock | bool | inventory service | <= 2 min | Yes | Hard eligibility gate |
| sku.serviceable_darkstore | bool | serviceability service | <= 2 min | Yes | Hard eligibility gate |
| sku.price_inr | float | catalog | <= 1 h | Yes | Ranking and UI |
| sku.margin_band | enum | catalog finance feed | <= 24 h | No | Rank weighting |
| sku.category_l1 | enum | catalog | <= 24 h | Yes | Trust policy routing |

### 3.5 Trust Features (Mandatory for Non-FMCG)
| Feature Key | Type | Source | Freshness | Required | Notes |
| --- | --- | --- | --- | --- | --- |
| trust.warranty_available | bool | trust metadata store | <= 24 h | Required for electronics | Hard filter |
| trust.warranty_term_months | int | trust metadata store | <= 24 h | No | Badge detail |
| trust.return_or_replacement_policy | enum | policy service | <= 24 h | Required for electronics and beauty | Hard filter where configured |
| trust.expiry_freshness_days_min | int | trust metadata store | <= 24 h | Required for beauty and pet care | Hard filter |
| trust.safety_variant_verified | bool | trust metadata store | <= 24 h | Required for pet care | Hard filter |
| trust.policy_version | string | policy service | <= 24 h | Yes | Consistency auditing |

## 4. Feature Store Keys

### Primary Keys
- user scope: user_id_hashed, city_id
- session scope: session_id
- catalog scope: sku_id, city_id, darkstore_id

### Online Read Pattern
- Priority 1: request-derived features
- Priority 2: session cache
- Priority 3: user aggregate features
- Priority 4: trust and catalog joins for candidates

## 5. Availability SLA and SLO

### Availability Targets
- Critical feature read success rate: >= 99.5%
- End-to-end feature assembly success rate: >= 99.0%

### Freshness Targets
- Inventory and serviceability: <= 2 minutes staleness
- Session behavior features: <= 5 minutes staleness
- Trust and policy fields: <= 24 hours staleness
- User aggregates: <= 24 hours staleness

## 6. Missing Data Strategy
- Missing critical trust fields for non-FMCG candidate: drop candidate.
- Missing user history: run context-only mode.
- Missing session intent fields: continue with deterministic defaults.
- Missing inventory or serviceability: treat as ineligible.

## 7. Availability Baseline Report Template
Use this table for Phase 1 readiness reporting by city.

| City | Critical Features Availability | Trust Coverage for Launch-Eligible SKUs | Freshness SLA Compliance | Status |
| --- | ---: | ---: | ---: | --- |
| BLR | TBD | TBD | TBD | Pending |
| MUM | TBD | TBD | TBD | Pending |
| DEL | TBD | TBD | TBD | Pending |

## 8. Backfill Plan
- Window: previous 30 days rolling user behavior aggregates.
- Frequency: one-time backfill + daily incremental batch.
- Validation: row count parity, null rate checks, and city-level distribution checks.

## 9. Ownership
- Data Engineering: feature pipelines and availability reporting.
- ML Engineering: feature definitions and model compatibility.
- Backend: online read path and fallback behavior.
- Catalog and Trust: trust fields integrity.

## 10. Phase 1 Exit Criteria Mapping
- Deliverable met: Feature definitions and availability report.
- Go or no-go check 1: trust coverage >= 95% for launch-eligible SKUs by target city.
- Go or no-go check 2: trust-critical freshness SLA compliance within agreed thresholds.
