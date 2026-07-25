# Phase 6 Deliverable: Updated Performance and Business Metrics Dashboard Spec

## 1. Objective
Define the dashboard package required to make Phase 6 ramp decisions with clear visibility on lift, stability, and risk.

## 2. Dashboard Architecture
Two top-level dashboard groups:
- Business Impact Dashboard
- Performance and Guardrail Dashboard

Cadence alignment:
- every 48 hours during 25 percent ramp
- daily deep dive when anomalies are detected

## 3. Business Impact Dashboard

### 3.1 KPI Tiles
- primary: percent increase in MACs buying at least one new non-FMCG category
- C3 ATC conversion rate
- AOV lift vs control
- margin per order lift vs control

### 3.2 Trend Panels
- 14-day trend for each KPI by variant
- city-level and cohort-level faceting
- confidence interval bands on key metrics

### 3.3 Cohort and City Expansion Panel
- expansion cohort volumes
- new city readiness vs observed performance
- cohort-level lift variance

## 4. Performance and Guardrail Dashboard

### 4.1 Guardrail Tiles
- checkout completion rate delta vs control
- checkout duration delta vs control
- end-to-end p95 latency
- fallback rate

### 4.2 Reliability Panels
- dependency error rates
- fallback reason distribution
- trust-compliance violation count
- category suppression events

### 4.3 Scenario and Quality Panels
- scenario distribution stability by daypart
- non-empty candidate rate
- trust-eligible top1 rate
- recommendation suppression rate

## 5. Required Filters
- date range
- city
- platform
- variant
- cohort type
- daypart
- surge bucket

## 6. Statistical Readout Requirements
For primary and secondary KPIs show:
- control and treatment rates
- absolute delta
- relative lift percent
- confidence interval
- significance status

For guardrails show:
- delta vs control
- confidence interval
- non-inferiority status where applicable

## 7. Alert Overlay Rules
Highlight panels when:
- p95 latency exceeds 1500 ms for sustained window
- fallback rate exceeds threshold
- trust violation count is greater than zero
- checkout completion delta breaches allowed threshold

## 8. Suggested Data Model Inputs
- c3_widget_impression
- c3_widget_click
- c3_widget_add_to_cart
- c3_order_conversion
- c3_latency_trace
- c3_shadow_decisions or launch decision stream
- incident and flag-change logs

## 9. Dashboard Ownership
- Data and Analytics: dashboard implementation and metric definitions
- Product: KPI interpretation and decision recommendation
- SRE: guardrail and reliability alerting
- Backend and ML: diagnostic drilldowns and tuning response

## 10. Phase 6 Exit Criteria Mapping
- deliverable satisfied: updated dashboard spec covering performance and business views
- go or no-go evidence:
  - statistically credible business lift
  - no statistically significant guardrail regression
