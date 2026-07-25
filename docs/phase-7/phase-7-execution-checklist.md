# Phase 7 Execution Checklist

## 1. Objective
Operational checklist for post-Week 10 scale decision and progressive rollout to 50 to 100 percent traffic.

## 2. Preconditions from Phase 6
- Confirm Phase 6 exit criteria are met and signed off.
- Confirm experiment power and confidence validation is complete.
- Confirm latest optimization changelog and impact snapshots are approved.
- Confirm no unresolved Sev 0 or Sev 1 incidents related to C3.

## 3. Scale Decision Review Checklist
- Conduct cross-functional decision review with Product, Engineering, Data, Finance, SRE, and Catalog and Trust.
- Use final decision memo with explicit recommendation: Scale, Delay, or Rollback.
- Verify primary KPI lift is significant and stable across required cohorts.
- Verify no statistically significant regression in guardrails.
- Verify trust-compliance remains zero-violation for launch-eligible non-FMCG categories.

## 4. Rollout-by-City Wave Checklist
- Define city waves with target traffic percentages and planned start dates.
- Start each wave with controlled increase windows and hold periods.
- Validate kill switch and rollback controls before each new city wave.
- Monitor city-level latency, fallback, conversion, and trust indicators for every wave.
- Pause progression if any guardrail breach is sustained beyond agreed threshold window.

## 5. Weekly Kill Switch Drill Checklist
- Execute scheduled kill switch drill once per week during ramp.
- Validate activation, traffic cutback behavior, and recovery timeline.
- Record drill duration, observed issues, and remediation actions.
- Confirm on-call awareness and escalation ownership for next week.

## 6. Active Monitoring Checklist
- Review launch dashboard during the first 24 hours of each wave at least every 4 hours.
- Review business and guardrail scorecards daily once wave stabilizes.
- Validate instrumentation health and variant integrity daily.
- Track incident count, MTTR, and recurring dependency failures.

## 7. Communication and Governance Checklist
- Publish daily scale-up note to stakeholders while expanding traffic.
- Hold checkpoint review after each wave before approving next step.
- Maintain a single source of truth for decisions, incidents, and tuning constraints.

## 8. Exit Gate Checklist
Phase 7 is complete only if all are true:
- significant lift in new-category MAC adoption is sustained at scaled traffic
- latency and checkout guardrails remain within agreed limits
- trust-compliance remains consistently healthy
- kill switch has passed weekly drills during the scale period
- final readout and production hardening recommendations are approved

## 9. Required Deliverables
- scale-up-decision-memo.md
- final-experiment-readout.md
- v2-roadmap-proposal.md
