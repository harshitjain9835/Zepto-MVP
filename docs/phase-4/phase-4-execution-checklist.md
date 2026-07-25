# Phase 4 Execution Checklist

## 1. Objective
Operational checklist for Week 7 to Week 8 shadow validation.

## 2. Pre-Run Checklist
- Confirm shadow mode is enabled and user-facing widget is disabled.
- Confirm logging and tracing for full C3 chain are active.
- Confirm dashboards for latency, fallback, trust rules, and scenario distribution are live.
- Confirm incident runbook and on-call rotation are active.

## 3. Daily Execution Checklist
- Review p50 and p95 latency by city and platform.
- Review fallback rate and top fallback reasons.
- Review trust-rule hit rates and trust-ineligible rates by category.
- Review scenario distribution stability by daypart.
- Review dependency errors and partial outages.

## 4. Manual Audit Checklist
- Pull representative sample payloads by city and daypart.
- Score recommendation relevance and trust correctness.
- Flag recurring quality issues for tuning.
- Record approved or blocked categories if issues persist.

## 5. Tuning Checklist
- Log every tuning decision in tuning-changes-log.md.
- Apply one major tuning category at a time when possible.
- Compare pre and post metrics over stable windows.
- Roll back immediately on guardrail regression.

## 6. Exit Gate Checklist
Phase 4 is complete only if all are true:
- Production p95 is within SLO.
- Fallback rate remains below agreed threshold.
- Recommendation quality is acceptable in manual audits.
- No trust-compliance violations found.

## 7. Go or No-Go Meeting Inputs
- Filled shadow-mode-scorecard.md
- Filled tuning-changes-log.md
- Incident summary with resolved and open items
- Recommendation for Phase 5 traffic enablement
