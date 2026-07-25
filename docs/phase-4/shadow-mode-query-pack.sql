-- Phase 4: Shadow Mode Query Pack
-- Purpose: standard SQL templates for latency, fallback, trust, and scenario stability checks.
-- Note: replace table names and date filters with your warehouse conventions.

-- 1) Daily latency summary
SELECT
  date(event_ts) AS event_date,
  city_id,
  percentile_cont(0.50) WITHIN GROUP (ORDER BY total_latency_ms) AS p50_latency_ms,
  percentile_cont(0.95) WITHIN GROUP (ORDER BY total_latency_ms) AS p95_latency_ms,
  COUNT(*) AS requests
FROM c3_latency_trace
WHERE event_ts >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY 1,2
ORDER BY 1,2;

-- 2) Fallback rate and reason mix
SELECT
  date(event_ts) AS event_date,
  city_id,
  SUM(CASE WHEN fallback = true THEN 1 ELSE 0 END) * 1.0 / COUNT(*) AS fallback_rate,
  fallback_reason,
  COUNT(*) AS reason_count
FROM c3_latency_trace
WHERE event_ts >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY 1,2,4
ORDER BY 1,2,5 DESC;

-- 3) Trust compliance violations check
SELECT
  date(event_ts) AS event_date,
  city_id,
  COUNT(*) AS violation_count
FROM c3_shadow_decisions
WHERE event_ts >= CURRENT_DATE - INTERVAL '7 days'
  AND category_l1 <> 'fmcg'
  AND (trust_badge_text IS NULL OR trust_badge_text = '')
GROUP BY 1,2
ORDER BY 1,2;

-- 4) Scenario distribution stability by daypart
SELECT
  date(event_ts) AS event_date,
  city_id,
  daypart,
  scenario_id,
  COUNT(*) AS scenario_count,
  COUNT(*) * 1.0 / SUM(COUNT(*)) OVER (PARTITION BY date(event_ts), city_id, daypart) AS scenario_share
FROM c3_shadow_decisions
WHERE event_ts >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY 1,2,3,4
ORDER BY 1,2,3,5 DESC;

-- 5) Candidate coverage and trust-eligible coverage
SELECT
  date(event_ts) AS event_date,
  city_id,
  AVG(CASE WHEN candidate_count > 0 THEN 1 ELSE 0 END) AS non_empty_candidate_rate,
  AVG(CASE WHEN trust_eligible_top1 = true THEN 1 ELSE 0 END) AS trust_eligible_top1_rate
FROM c3_shadow_decisions
WHERE event_ts >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY 1,2
ORDER BY 1,2;

-- 6) Dependency error summary
SELECT
  date(event_ts) AS event_date,
  dependency_name,
  error_code,
  COUNT(*) AS error_count
FROM c3_dependency_errors
WHERE event_ts >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY 1,2,3
ORDER BY 1,4 DESC;
