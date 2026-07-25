# Phase 5: Incident Log Template

## 1. Incident Header
- Incident ID:
- Date:
- Start time (IST):
- End time (IST):
- Duration:
- Severity: Sev 0, Sev 1, Sev 2, Sev 3
- Incident commander:
- Communication channel:

## 2. Detection
- Trigger metric:
- Detection source: dashboard, alert, manual observation
- Threshold breached:
- Initial observed value:
- Scope: city, platform, category, variant

## 3. Impact Assessment
- User impact summary:
- Checkout impact:
- Trust or policy impact:
- Business impact estimate:
- Systems impacted:

## 4. Timeline
| Time (IST) | Event | Owner | Notes |
| --- | --- | --- | --- |
| TBD | Incident detected | TBD | TBD |
| TBD | Mitigation applied | TBD | TBD |
| TBD | Recovery confirmed | TBD | TBD |

## 5. Root Cause Tracking
- Primary suspected cause:
- Confirmed root cause:
- Contributing factors:
- Related recent tuning or config changes:

## 6. Mitigation Actions
| Action | Owner | Start | End | Result |
| --- | --- | --- | --- | --- |
| Enable fallback-only mode | TBD | TBD | TBD | TBD |
| Disable impacted category | TBD | TBD | TBD | TBD |
| Disable treatment arm | TBD | TBD | TBD | TBD |
| Rollback configuration | TBD | TBD | TBD | TBD |

## 7. Recovery Validation
- Guardrails normalized for 30 continuous minutes: Yes or No
- p95 latency back within threshold: Yes or No
- Fallback rate back within threshold: Yes or No
- Trust compliance violations at zero: Yes or No

## 8. Rollback Decision Record
- Rollback required: Yes or No
- Rollback scope: category, city, variant, global
- Decision maker:
- Time of decision:
- Rollback completion time:

## 9. Communication Log
- Stakeholders notified:
- Updates sent at:
- Final closure message timestamp:

## 10. Post-Incident Actions
| Action Item | Owner | Priority | Due Date | Status |
| --- | --- | --- | --- | --- |
| TBD | TBD | High | TBD | Open |

## 11. Learning Notes
- What worked well:
- What failed:
- Prevention steps before next traffic increase:

## 12. Attachment Checklist
- Relevant dashboard screenshots
- Alert logs
- Query outputs
- Config diffs
- Related report or ticket links
