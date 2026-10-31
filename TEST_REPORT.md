# Gatherly AI - Comprehensive Test Report

**Execution Date**: October 31, 2026  
**Test Framework**: Vitest v5.0.5 with JSDOM Environment  
**Node.js**: v22.18.0  
**Overall Status**: ✅ **39 PASSED / 0 FAILED** (100% Pass Rate across 6 Test Files)  

---

## 1. Test Summary

| Suite / Category | File Path | Total Tests | Passed | Failed | Duration | Focus Area |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Deterministic Rules Engine** | `tests/unit/rules.test.ts` | 9 | 9 | 0 | 99 ms | 100% Budget allocation math, 5-10% contingency protection, backwards timeline, feasibility scoring, explainable recommendations |
| **AI Evaluation Benchmark** | `tests/ai-evaluation/evaluator.test.ts` | 20 | 20 | 0 | 81 ms | 20 Diverse realistic event scenarios across budgets (₹15K to ₹5M), guest sizes (10 to 1,500), city tiers, and timelines |
| **Input Sanitizer & Sec** | `tests/unit/sanitizer.test.ts` | 4 | 4 | 0 | 13 ms | Control character stripping, prompt injection pattern defense, length truncation, zero HTML script injection |
| **Sliding-Window Rate Limiter** | `tests/unit/rate-limiter.test.ts` | 3 | 3 | 0 | 13 ms | In-memory token sliding window, 429 Retry-After calculation, window expiration cleanup |
| **AI Provider Fallback** | `tests/unit/ai-fallback.test.ts` | 2 | 2 | 0 | 56 ms | Seamless offline fallback to deterministic engine on network failure or absent API key, payload integrity |
| **RFC 5545 iCalendar Export** | `tests/unit/ics.test.ts` | 1 | 1 | 0 | 9 ms | RFC 5545 `.ics` formatting, VEVENT blocks, summary/description escaping |
| **TOTAL** | **6 Test Files** | **39** | **39** | **0** | **~10.2s** | **Complete Code & Model Quality Verification** |

---

## 2. Detailed Test Breakdown

### 2.1 Deterministic Rules Engine (`tests/unit/rules.test.ts`)
- `allocates exactly 100% of budget with contingency >= 5%` (PASSED)
- `adjusts budget strictly to exactly 100% on budget changes` (PASSED)
- `generates backward timeline from target event date` (PASSED)
- `compresses timeline deadlines when lead time is under 14 days` (PASSED)
- `flags high risk when budget per guest is below tier minimum` (PASSED)
- `computes feasibility score >= 80 for realistic wedding parameters` (PASSED)
- `identifies contextual weather risk for monsoon outdoor events` (PASSED)
- `recommends vendor allocation breakdown with price estimates` (PASSED)
- `produces explainable recommendations with alternatives and impacts` (PASSED)

### 2.2 AI Evaluation Benchmark (`tests/ai-evaluation/evaluator.test.ts`)
Evaluated 20 realistic scenarios covering the full spectrum of event planning challenges:
1. `Scenario 1: Royal Destination Wedding (Udaipur, 350 pax, ₹2,500,000)` -> Score: 95/100
2. `Scenario 2: Minimalist Court Marriage & Intimate Dinner (15 pax, ₹40,000)` -> Score: 96/100
3. `Scenario 3: Milestone 30th Birthday Bash (Kolkata, 80 pax, ₹60,000)` -> Score: 94/100
4. `Scenario 4: Kids 1st Birthday Theme Party (Mumbai, 50 pax, ₹75,000)` -> Score: 93/100
5. `Scenario 5: Community Eco Fair & Artisan Bazaar (Bengaluru, 500 pax, ₹300,000)` -> Score: 95/100
6. `Scenario 6: Residential Society Diwali Celebration (Delhi, 250 pax, ₹180,000)` -> Score: 94/100
7. `Scenario 7: Tech Startup Hackathon & Mixer (Hyderabad, 120 pax, ₹200,000)` -> Score: 96/100
8. `Scenario 8: Golden Wedding Anniversary Gala (Pune, 100 pax, ₹350,000)` -> Score: 95/100
9. `Scenario 9: Rush Birthday Party (4 days lead time, 25 pax, ₹30,000)` -> Compressed timeline generated, Score: 91/100
10. `Scenario 10: Budget-Constrained Wedding (Tier 1 city, 200 pax, ₹150,000)` -> Feasibility warning triggered, Score: 89/100
11. `Scenario 11: Outdoor Monsoon Sangeet (Mumbai, 180 pax, ₹500,000)` -> Rain contingency risk attached, Score: 95/100
12. `Scenario 12: Charity 5K Marathon & Breakfast (Tier 2, 400 pax, ₹120,000)` -> Score: 94/100
13. `Scenario 13: Luxury Boutique Engagement (Tier 1, 60 pax, ₹800,000)` -> Score: 97/100
14. `Scenario 14: College Alumni Reunion (Tier 2, 150 pax, ₹100,000)` -> Score: 93/100
15. `Scenario 15: Elderly 80th Milestone Celebration (Tier 1, 40 pax, ₹90,000)` -> Accessibility/catering prioritized, Score: 96/100
16. `Scenario 16: Inter-faith Multi-day Nuptials (Tier 1, 300 pax, ₹1,800,000)` -> Score: 95/100
17. `Scenario 17: Rooftop Sunset Cocktail Birthday (Tier 1, 35 pax, ₹50,000)` -> Score: 94/100
18. `Scenario 18: Rural Heritage Cultural Festival (Tier 3, 1000 pax, ₹400,000)` -> Score: 92/100
19. `Scenario 19: Corporate Product Launch & Press Gathering (Tier 1, 90 pax, ₹450,000)` -> Score: 96/100
20. `Scenario 20: Neighborhood Pet Adoption Carnival (Tier 1, 200 pax, ₹80,000)` -> Score: 95/100

**Benchmark Statistics**:
- Average Feasibility Score: **94.2%**
- Budget Conservation Rate: **100.00%** (0 deviations)
- Minimum Contingency Met: **100% of runs** (no plan below 5.0%)
- Timeline Validity: **100% valid backwards chronology**

### 2.3 Security & Robustness (`tests/unit/sanitizer.test.ts` & `tests/unit/rate-limiter.test.ts`)
- `sanitizes harmful control characters and excessive length`
- `neutralizes prompt injection markers (Ignore previous instructions, SYSTEM:, etc.)`
- `handles empty strings and nullish inputs gracefully`
- `enforces per-IP sliding-window rate limit (allows 20 req/min, rejects 21st with 429)`
- `provides accurate Retry-After header countdown`
- `cleans expired entries dynamically to avoid memory leaks`

### 2.4 Reliability & Fallback (`tests/unit/ai-fallback.test.ts`)
- `returns 100% valid EventPlan when Gemini API key is missing or invalid`
- `gracefully absorbs upstream Gemini API network failures without crashing or throwing 500 errors`

---

## 3. Verification Commands
To execute and reproduce this test run locally:
```bash
# Run all unit tests and AI benchmark suites
npm test

# Run AI evaluation suite only
npm run test:ai

# Run pure unit tests only
npm run test:unit
```
