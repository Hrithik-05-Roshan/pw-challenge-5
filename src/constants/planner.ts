/**
 * @file planner.ts
 * @description Centralized, strongly typed configuration constants for Gatherly AI's
 * deterministic event planning engine.
 *
 * Implements the Single Source of Truth (SSOT) pattern to eliminate magic numbers,
 * ensure predictable mathematical invariants, and document industry heuristic baselines.
 */

import { BudgetCategory, CityTier, EventType } from "@/types";

/**
 * Contingency allocation bounds (percentage of total budget).
 * Mathematical Invariant: Always strictly bounded between 5% and 10%.
 */
export const CONTINGENCY_BOUNDS = {
  MIN_PERCENT: 5,
  MAX_PERCENT: 10,
  DEFAULT_COMMUNITY_PERCENT: 8,
  DEFAULT_CORPORATE_PERCENT: 7,
} as const;

/**
 * Headcount and scale thresholds for dynamic weight adjustments.
 */
export const SCALE_THRESHOLDS = {
  HIGH_SCALE_GUEST_THRESHOLD: 200,
  CRITICAL_GUEST_SURGE_THRESHOLD: 20,
  SURPLUS_GUEST_DROP_THRESHOLD: -15,
  MINIMUM_FEASIBLE_GUESTS: 2,
  MAXIMUM_ALLOWED_GUESTS: 10000,
} as const;

/**
 * Lead-time thresholds for timeline compression and urgent milestone alerts.
 */
export const LEAD_TIME_THRESHOLDS = {
  COMPRESSED_SCHEDULE_DAYS: 45,
  CRITICAL_URGENT_DAYS: 14,
  HIGH_URGENT_DAYS: 30,
  STANDARD_PLANNING_DAYS: 90,
} as const;

/**
 * City Tier economic cost multiplier heuristics.
 * Tier 1 (Metros): Premium venue & vendor rates (+35%).
 * Tier 2 (Emerging Metros): Standard baseline (1.0x).
 * Tier 3 (Tier-3 & Regional): Lower infrastructure rates (-20%), higher contingency needed.
 */
export const CITY_TIER_MULTIPLIERS: Readonly<Record<CityTier, number>> = {
  1: 1.35,
  2: 1.0,
  3: 0.8,
} as const;

/**
 * Realistic minimum expenditure benchmarks per guest (in INR).
 * Used by the Feasibility Engine to calculate minimum viable budget per guest.
 */
export const PER_GUEST_BUDGET_BENCHMARKS: Readonly<Record<EventType, number>> = {
  wedding: 2500,
  birthday: 600,
  community: 350,
  corporate: 1500,
  other: 700,
} as const;

/**
 * Default benchmark fallback when an unclassified event type is processed.
 */
export const DEFAULT_PER_GUEST_BENCHMARK = 800 as const;

/**
 * Feasibility viability threshold multiplier (75% of recommended minimum).
 */
export const FEASIBILITY_SAFETY_RATIO = 0.75 as const;

/**
 * Standard baseline category percentages by event type.
 * Each distribution is calibrated to sum to exactly 100%.
 */
export const BASE_PERCENTAGES: Readonly<Record<EventType, Readonly<Record<BudgetCategory, number>>>> = {
  wedding: {
    venue: 25,
    catering: 30,
    decoration: 12,
    photography: 10,
    entertainment: 8,
    attire: 5,
    transportation: 2,
    invitations: 1,
    misc: 2,
    contingency: 5,
  },
  birthday: {
    venue: 20,
    catering: 35,
    decoration: 15,
    photography: 5,
    entertainment: 12,
    attire: 2,
    transportation: 1,
    invitations: 2,
    misc: 3,
    contingency: 5,
  },
  community: {
    venue: 25,
    catering: 25,
    decoration: 10,
    photography: 4,
    entertainment: 15,
    transportation: 6,
    invitations: 2,
    attire: 0,
    misc: 5,
    contingency: 8,
  },
  corporate: {
    venue: 30,
    catering: 30,
    decoration: 8,
    photography: 7,
    entertainment: 10,
    transportation: 4,
    invitations: 1,
    attire: 0,
    misc: 3,
    contingency: 7,
  },
  other: {
    venue: 25,
    catering: 30,
    decoration: 10,
    photography: 8,
    entertainment: 10,
    attire: 2,
    transportation: 3,
    invitations: 2,
    misc: 3,
    contingency: 7,
  },
} as const;

/**
 * Semantic human-readable display titles for each budget category.
 */
export const CATEGORY_DISPLAY_TITLES: Readonly<Record<BudgetCategory, string>> = {
  venue: "Venue & Facility Rental",
  catering: "Catering, Drinks & Food Service",
  decoration: "Florals, Decor & Styling",
  photography: "Photography & Videography",
  entertainment: "Music, Sound & Live Acts",
  transportation: "Guest & Logistics Transit",
  invitations: "Stationery & Digital Invites",
  attire: "Attire, Hair & Grooming",
  misc: "Operational Sundries & Permits",
  contingency: "Safety Reserve & Overrun Buffer",
} as const;

/**
 * Priority weighting adjustments applied to baseline categories.
 */
export const PRIORITY_BOOST_PERCENTAGE = 5 as const;
export const PRIORITY_OFFSET_DECOR_DECREASE = 3 as const;
export const PRIORITY_OFFSET_MISC_DECREASE = 2 as const;
export const PRIORITY_OFFSET_TRANS_DECREASE = 3 as const;

/**
 * Standard milestone milestone offset schedules (in days before event).
 */
export const MILESTONE_SCHEDULES = {
  LONG_HORIZON: [90, 60, 45, 30, 14, 7, 2, 0],
  MEDIUM_HORIZON: [45, 30, 21, 14, 7, 2, 0],
} as const;

/**
 * Milestone template definitions for backwards timeline generation.
 */
export const MILESTONE_TEMPLATES: ReadonlyArray<{
  title: string;
  category: BudgetCategory;
  priority: "high" | "medium" | "low";
}> = [
  { title: "Finalize venue contract & deposit", category: "venue", priority: "high" },
  { title: "Book caterer and lock menu tasting", category: "catering", priority: "high" },
  { title: "Approve theme, lighting & decor blueprint", category: "decoration", priority: "medium" },
  { title: "Send formal invitations & open RSVP portal", category: "invitations", priority: "high" },
  { title: "Confirm photographer & day-of shot list", category: "photography", priority: "medium" },
  { title: "Freeze final headcount & dietary list", category: "catering", priority: "high" },
  { title: "Final vendor walkthrough & rehearsal", category: "misc", priority: "medium" },
  { title: "Day-of event celebration execution", category: "entertainment", priority: "high" },
] as const;
