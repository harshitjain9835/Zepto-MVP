# C3 MVP Edge Case and Corner Scenario Catalogue

## 1. Purpose
This document enumerates edge and corner cases for C3 using the architecture and implementation plan, and defines clear handling so recommendation quality, trust, checkout conversion, and latency guardrails are protected.

## 2. Severity and Response Model
- Sev 0: User safety, legal, or systemic trust failure. Immediate kill switch.
- Sev 1: Checkout conversion or latency guardrail breach. Auto fallback plus incident response.
- Sev 2: Recommendation quality degradation with limited user impact. Monitor and tune.
- Sev 3: Cosmetic or analytics-only issue. Fix in regular sprint.

## 3. Global Runtime Protections
- Never block checkout CTA on C3 completion.
- If C3 times out or dependency fails, return static fallback within 900 ms.
- Never show non-FMCG recommendation without required trust metadata.
- Keep per-dependency timeout and circuit breaker policies.
- Keep experiment kill switch always on and tested weekly.

## 4. Edge Cases by Domain

## 4.1 Input and Context Edge Cases

| ID | Edge Case | Impact | Detection | Mitigation | Owner | Phase |
| --- | --- | --- | --- | --- | --- | --- |
| IN-01 | Empty cart reaches checkout (cart modified on another device) | No context, poor recommendation | Cart item count equals 0 at request time | Return no-widget payload and skip C3 | Backend | 2 |
| IN-02 | Cart mutates between request start and response render | Mismatch between suggestion and current basket | Request cart hash does not match render cart hash | Drop widget response if cart hash mismatch; request refresh only if non-blocking | Mobile + Backend | 3 |
| IN-03 | Missing user id due to guest session or privacy constraints | No personalization features | Null user id rate monitor | Use session-level features only; remove user-history features from scoring | Backend + Data | 2 |
| IN-04 | Incorrect timezone leading to wrong scenario classification | Irrelevant recommendation timing | Timezone null or city-time mismatch checks | Resolve timezone from city fallback; avoid time-sensitive scenarios when uncertain | ML + Backend | 2 |
| IN-05 | Buy-again heavy user with near-deterministic staple basket | Very low cross-category relevance | Low recommendation click-through in cohort | Enforce confidence threshold; suppress widget when confidence too low | ML | 6 |
| IN-06 | First order user with zero history | Cold start | Missing history features | Use context-only scenarios based on cart and daypart | ML | 2 |

## 4.2 Scenario Inference Edge Cases

| ID | Edge Case | Impact | Detection | Mitigation | Owner | Phase |
| --- | --- | --- | --- | --- | --- | --- |
| SC-01 | Scenario confidence is below threshold | Random or noisy recommendation | Confidence histogram drift | Suppress widget or show static control recommendation | ML + Product | 5 |
| SC-02 | Ambiguous context maps to multiple scenarios equally | Inconsistent UX | Top-2 confidence gap below margin | Deterministic tie-breaker by business priority and trust coverage | ML | 2 |
| SC-03 | Festival or event day behavior not represented in model | Systematic mismatch | Day-level drop in ATC with stable traffic | Add calendar feature and event override rules | ML + Data | 6 |
| SC-04 | Model drift after category expansion | Quality decay post ramp | Weekly model quality dashboard | Retrain cadence and rollback to rules-first mode if degradation persists | ML | 6 |

## 4.3 Candidate Generation and Catalog Edge Cases

| ID | Edge Case | Impact | Detection | Mitigation | Owner | Phase |
| --- | --- | --- | --- | --- | --- | --- |
| CG-01 | Candidate SKU out of stock at render moment | Broken add-to-cart experience | Add-to-cart inventory rejection logs | Revalidate availability just before response; keep backup candidate | Backend + Catalog | 2 |
| CG-02 | Serviceability mismatch by dark store | Unfulfillable item in checkout | Serviceability check fail rate | Apply serviceability filter before ranking | Backend | 2 |
| CG-03 | Duplicate or near-identical SKU variants flood candidates | Poor diversity, lower conversion | Candidate dedupe ratio | Canonical SKU deduping pre-rank | ML + Catalog | 2 |
| CG-04 | Price spikes in candidate category during peak surge | Sticker shock and abandonment | Surge delta monitor per item | Surge penalty in rank score; suppress high-elasticity categories | ML + Product | 6 |
| CG-05 | Recommended item already present in cart | Redundant recommendation | Candidate in-cart check | Filter in-cart SKUs before ranking | Backend | 2 |
| CG-06 | Age-restricted or compliance-limited item recommended | Legal and trust risk | Compliance filter misses in audits | Hard compliance gate before ranking and pre-launch audits | Catalog + Legal + Backend | 1 |

## 4.4 Trust Badge and Policy Edge Cases

| ID | Edge Case | Impact | Detection | Mitigation | Owner | Phase |
| --- | --- | --- | --- | --- | --- | --- |
| TR-01 | Warranty metadata missing for electronics | Trust breakdown and abandonment | Trust coverage dashboard | Filter out item; do not render recommendation | Catalog + Backend | 1 |
| TR-02 | Replacement policy text stale or inconsistent with backend policy | Misleading promise risk | Policy version mismatch monitor | Policy versioning and signed policy lookup at response time | Catalog + Backend | 1 |
| TR-03 | Expiry freshness metadata absent for beauty or pet care | Safety anxiety and drop | Missing freshness field checks | Block candidate and alert data quality pipeline | Catalog + Data | 1 |
| TR-04 | Badge copy too long causing UI truncation | User confusion | Client render truncation telemetry | Copy templates with strict length budget and fallback short text | Mobile + Product | 3 |
| TR-05 | Badge language mismatch for locale | Reduced clarity | Locale mismatch error logs | Locale-aware template fallback to default supported language | Mobile + Backend | 3 |
| TR-06 | Contradictory badge and item detail page policy | Trust damage | Text inconsistency validator | Single source policy service for both widget and PDP | Backend + Catalog | 2 |

## 4.5 Ranking and Economics Edge Cases

| ID | Edge Case | Impact | Detection | Mitigation | Owner | Phase |
| --- | --- | --- | --- | --- | --- | --- |
| RK-01 | Margin-only bias surfaces low-relevance items | CTR and ATC drop | Relevance score decoupling monitor | Keep hard minimum relevance score before margin boost | ML + Product | 2 |
| RK-02 | Over-penalizing friction suppresses all non-FMCG | No business lift | Recommendation suppression rate high | Dynamic threshold tuning by cohort | ML | 6 |
| RK-03 | Repeatedly recommending same SKU to user | Recommendation fatigue | Per-user repetition counter | Frequency cap and cooldown window | ML + Backend | 6 |
| RK-04 | Conflicting objectives across cities with different inventory depth | Inconsistent impact | City-level KPI divergence | City-specific rank calibration and rollout gates | ML + Data | 6 |

## 4.6 Latency, Reliability, and Failure Edge Cases

| ID | Edge Case | Impact | Detection | Mitigation | Owner | Phase |
| --- | --- | --- | --- | --- | --- | --- |
| LT-01 | Feature store latency spike | P95 breach | Per-dependency latency alert | Read-through cache and tighter timeout with fallback | Backend + SRE | 2 |
| LT-02 | Scenario inference service cold starts | Burst latency | Startup and p95 latency traces | Warm pools and autoscaling min instances | Backend + SRE | 2 |
| LT-03 | Trust metadata service partial outage | Empty badges or invalid output | Error rate and null badge monitor | Circuit breaker and safe fallback to static recs | Backend + SRE | 2 |
| LT-04 | Retry storm during transient network issues | Cascading failure | Request amplification metric | Bounded retries, jitter, and request coalescing | SRE + Backend | 2 |
| LT-05 | Thundering herd during city-level peak | Checkout degradation risk | QPS and tail latency alarm | Load shedding for C3 first, preserve checkout path | SRE | 5 |
| LT-06 | Clock skew across services corrupts latency tracing | Misleading observability | Trace timestamp skew monitor | Unified time sync policy and monotonic timers | SRE + Data | 2 |

## 4.7 Client and UX Edge Cases

| ID | Edge Case | Impact | Detection | Mitigation | Owner | Phase |
| --- | --- | --- | --- | --- | --- | --- |
| UX-01 | Low-end devices lag on widget render | Perceived checkout slowdown | Device-tier performance metrics | Lightweight component, async render, skeleton placeholder | Mobile | 3 |
| UX-02 | Screen readers cannot parse trust badge context | Accessibility failure | A11y test audits | Add accessible label and role mapping | Mobile + QA | 3 |
| UX-03 | Widget overlaps with payment CTA on small screens | Conversion risk | UI snapshot tests | Responsive layout constraints and safe spacing rules | Mobile + QA | 3 |
| UX-04 | User taps recommendation and returns with stale cart state | Confusing flow | Return-flow error logs | Revalidate cart and refresh pricing/serviceability | Mobile + Backend | 3 |
| UX-05 | Offline or flaky network after widget impression | Event drop and poor flow | Network error rates | Store-and-forward analytics queue on client | Mobile + Data | 3 |

## 4.8 Experimentation and Measurement Edge Cases

| ID | Edge Case | Impact | Detection | Mitigation | Owner | Phase |
| --- | --- | --- | --- | --- | --- | --- |
| EX-01 | Bucket assignment instability across sessions | Invalid experiment results | Variant flip rate monitor | Deterministic hashing on stable user key | Data + Backend | 0 |
| EX-02 | Event loss in one variant | Biased KPI conclusions | Variant-level event completeness checks | Alert and block analysis until parity restored | Data | 3 |
| EX-03 | Logging recommendation impression before actual render | Inflated denominator | Client render-confirmed impression event | Fire impression only after widget visible on screen | Mobile + Data | 3 |
| EX-04 | Cross-device contamination for same user | Treatment bleed | Multi-device variant consistency checks | Use account-level assignment where possible | Data + Backend | 0 |
| EX-05 | Simultaneous promos confound AOV lift | Attribution ambiguity | Promo overlap matrix in dashboards | Stratified analysis and exclusion windows | Data + Product | 5 |
| EX-06 | Small sample in city causes false negatives | Premature rollback | Power and confidence interval checks | Extend test window or pool comparable cohorts | Data + Product | 6 |

## 4.9 Security, Abuse, and Compliance Edge Cases

| ID | Edge Case | Impact | Detection | Mitigation | Owner | Phase |
| --- | --- | --- | --- | --- | --- | --- |
| SE-01 | Automated abuse triggers repeated expensive recommendations | Margin leakage | Suspicious session pattern alerts | Abuse scoring and recommendation suppression | Trust and Safety + Backend | 5 |
| SE-02 | PII leakage in telemetry payloads | Compliance breach | Schema lint and PII scanner | Hash user identifiers and block raw PII fields | Data + Security | 0 |
| SE-03 | Policy text shown without legal approval changes | Legal risk | Policy version audit logs | Legal-approved template registry with version lock | Legal + Catalog | 1 |
| SE-04 | Category restrictions differ by city but rules not updated | Compliance risk | City-rule mismatch audits | Centralized rules service and rollout checks | Legal + Backend | 1 |

## 5. Phase-Wise Edge Case Exit Checklist

## Phase 0 Exit Checklist
- Deterministic variant assignment verified.
- Event schema includes all required dimensions.
- PII controls approved.

## Phase 1 Exit Checklist
- Trust coverage and freshness thresholds met for launch cities.
- Category trust eligibility rules verified with sample audits.

## Phase 2 Exit Checklist
- Timeout budgets enforced per dependency.
- Fallback path verified under synthetic failures.
- Recommendation suppressed for all trust-missing candidates.

## Phase 3 Exit Checklist
- Widget remains non-blocking on all supported device tiers.
- Accessibility and small-screen layout tests pass.
- Impression event is render-confirmed.

## Phase 4 Exit Checklist
- Shadow mode latency and fallback rate meet SLO thresholds.
- Manual quality review shows acceptable recommendation relevance.

## Phase 5 and 6 Exit Checklist
- No significant checkout completion regression.
- No sustained p95 latency breach.
- No trust-policy inconsistency incidents.

## Phase 7 Exit Checklist
- Business lift remains significant at expanded scale.
- Incident rate stays within agreed operational threshold.

## 6. Runbook Triggers and Automated Actions
- Trigger: C3 p95 latency over threshold for sustained window.
  - Action: route to static recommendations and page on-call.
- Trigger: trust badge null rate above threshold.
  - Action: suppress affected categories and open data incident.
- Trigger: checkout completion drop beyond guardrail.
  - Action: disable treatment arm immediately and start incident review.
- Trigger: experiment event completeness below threshold.
  - Action: pause experiment readout and fix instrumentation first.

## 7. Test Matrix for Edge Cases
- Unit tests: scenario ties, trust rule enforcement, ranking thresholds, copy template limits.
- Integration tests: full chain from context build to payload generation with fallback.
- Contract tests: policy schema versioning and badge consistency across services.
- Load tests: peak traffic with dependency latency injection.
- Chaos tests: partial outage of feature, trust, and catalog dependencies.
- UX tests: low-end devices, small screens, locale rendering, accessibility.
- Analytics tests: event loss simulation and variant integrity checks.

## 8. Definition of Edge-Case Coverage Complete
Coverage is complete for MVP when all of the following hold:
- Every Sev 0 and Sev 1 case has automated detection and defined rollback action.
- Every trust-critical category has strict filter and fallback behavior validated.
- Every phase exit checklist item has objective evidence in launch reviews.
- Edge-case tests are included in release criteria before each traffic ramp.
