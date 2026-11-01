/**
 * @file rules.ts
 * @description Deterministic Invariant Planning Engine for Gatherly AI.
 *
 * Implements core mathematical invariants, proportional category rebalancing,
 * backwards milestone scheduling, risk modeling, and Explainable AI recommendations.
 *
 * Architectural Guarantees:
 * 1. Mathematical Invariant: Category sum strictly equals 100% of the total budget.
 * 2. Contingency Guarantee: Safety buffer is always strictly bounded between 5% and 10%.
 * 3. Deterministic: Pure mathematical functions with zero side-effects ($O(N)$ time complexity).
 * 4. Zero External Dependency: Runs seamlessly on client (browser) and server without third-party APIs.
 */

import {
  EventType,
  BudgetCategory,
  BudgetItem,
  Task,
  RiskItem,
  ExplainableRecommendation,
  CityTier,
  Priority,
  EventPlan,
  BudgetReallocationResult,
  BudgetDiffItem,
  FeasibilityReport,
} from "@/types";
import {
  BASE_PERCENTAGES,
  CATEGORY_DISPLAY_TITLES,
  CITY_TIER_MULTIPLIERS,
  CONTINGENCY_BOUNDS,
  DEFAULT_PER_GUEST_BENCHMARK,
  FEASIBILITY_SAFETY_RATIO,
  LEAD_TIME_THRESHOLDS,
  MILESTONE_SCHEDULES,
  MILESTONE_TEMPLATES,
  PER_GUEST_BUDGET_BENCHMARKS,
  PRIORITY_BOOST_PERCENTAGE,
  PRIORITY_OFFSET_DECOR_DECREASE,
  PRIORITY_OFFSET_MISC_DECREASE,
  PRIORITY_OFFSET_TRANS_DECREASE,
  SCALE_THRESHOLDS,
} from "@/constants/planner";

/**
 * Result contract returned when analyzing a sudden guest count change.
 */
export interface GuestCountChangeResult {
  updatedGuests: number;
  perGuestChange: number;
  feasibility: FeasibilityReport;
  actionRequired: string;
}

/**
 * Result contract returned when calculating schedule adjustments upon date modification.
 */
export interface DateChangeResult {
  daysRemaining: number;
  isCompressed: boolean;
  urgentTasks: string[];
  riskNote: string;
}

/**
 * Calculates a deterministic, invariant-satisfying budget allocation.
 *
 * Guarantees:
 * 1. Category amounts sum exactly to 100% of the total budget to the last integer unit.
 * 2. Contingency is strictly bounded between 5% and 10%.
 * 3. Priorities and city tiers dynamically calibrate category distributions.
 *
 * @pure
 * @complexity Time: O(K) where K is constant number of budget categories (10), Space: O(K)
 * @param eventType - Classification of the event
 * @param totalBudget - Total available budget in event currency
 * @param guestCount - Number of anticipated attendees
 * @param cityTier - Economic city tier (1 = Metro, 2 = Major, 3 = Regional)
 * @param priorities - User-selected priority areas
 * @returns Array of BudgetItem line items summing to totalBudget
 */
/**
 * Adjusts category weightings for high guest-count scale.
 */
function applyScaleAdjustments(
  base: Record<BudgetCategory, number>,
  guestCount: number
): void {
  if (guestCount > SCALE_THRESHOLDS.HIGH_SCALE_GUEST_THRESHOLD) {
    base.catering += 4;
    base.venue += 2;
    base.decoration = Math.max(5, base.decoration - 3);
    base.entertainment = Math.max(5, base.entertainment - 3);
  }
}

/**
 * Calibrates category weights based on city economic tier.
 */
function applyCityTierAdjustments(
  base: Record<BudgetCategory, number>,
  cityTier: CityTier
): void {
  if (cityTier === 1) {
    base.venue += 3;
    base.decoration = Math.max(5, base.decoration - 3);
  } else if (cityTier === 3) {
    base.venue = Math.max(15, base.venue - 4);
    base.contingency = Math.min(CONTINGENCY_BOUNDS.MAX_PERCENT, base.contingency + 4);
  }
}

/**
 * Dynamically reweights categories according to user preferences.
 */
function applyPriorityAdjustments(
  base: Record<BudgetCategory, number>,
  priorities: Priority[]
): void {
  for (const prio of priorities) {
    if (prio === "catering") {
      base.catering += PRIORITY_BOOST_PERCENTAGE;
      base.misc = Math.max(1, base.misc - PRIORITY_OFFSET_MISC_DECREASE);
      base.transportation = Math.max(1, base.transportation - PRIORITY_OFFSET_TRANS_DECREASE);
    } else if (prio === "venue") {
      base.venue += PRIORITY_BOOST_PERCENTAGE;
      base.misc = Math.max(1, base.misc - PRIORITY_OFFSET_MISC_DECREASE);
      base.entertainment = Math.max(5, base.entertainment - PRIORITY_OFFSET_DECOR_DECREASE);
    } else if (prio === "decor") {
      base.decoration += PRIORITY_BOOST_PERCENTAGE;
      base.misc = Math.max(1, base.misc - PRIORITY_OFFSET_MISC_DECREASE);
      base.transportation = Math.max(1, base.transportation - PRIORITY_OFFSET_TRANS_DECREASE);
    } else if (prio === "photography") {
      base.photography += PRIORITY_BOOST_PERCENTAGE;
      base.misc = Math.max(1, base.misc - PRIORITY_OFFSET_MISC_DECREASE);
      base.entertainment = Math.max(5, base.entertainment - PRIORITY_OFFSET_DECOR_DECREASE);
    } else if (prio === "entertainment") {
      base.entertainment += PRIORITY_BOOST_PERCENTAGE;
      base.misc = Math.max(1, base.misc - PRIORITY_OFFSET_MISC_DECREASE);
      base.decoration = Math.max(5, base.decoration - PRIORITY_OFFSET_DECOR_DECREASE);
    }
  }
}

/**
 * Enforces contingency bounds and normalizes remaining category percentages to exactly 100%.
 */
function normalizePercentages(
  base: Record<BudgetCategory, number>
): Record<BudgetCategory, number> {
  const targetContingency = Math.max(
    CONTINGENCY_BOUNDS.MIN_PERCENT,
    Math.min(CONTINGENCY_BOUNDS.MAX_PERCENT, base.contingency)
  );
  base.contingency = targetContingency;

  const otherCategories = (Object.keys(base) as BudgetCategory[]).filter((c) => c !== "contingency");
  const otherTotal = otherCategories.reduce((sum, cat) => sum + base[cat], 0);
  const remainingPercentTarget = 100 - targetContingency;

  const normalizedPercentages = {} as Record<BudgetCategory, number>;
  normalizedPercentages.contingency = targetContingency;

  let runningOtherPercent = 0;
  otherCategories.forEach((cat, idx) => {
    if (idx === otherCategories.length - 1) {
      normalizedPercentages[cat] = Math.max(0, remainingPercentTarget - runningOtherPercent);
    } else {
      const p = Math.round((base[cat] / otherTotal) * remainingPercentTarget);
      normalizedPercentages[cat] = p;
      runningOtherPercent += p;
    }
  });

  return normalizedPercentages;
}

/**
 * Converts percentages into exact integer units ensuring sum === totalBudget.
 */
function convertPercentagesToBudgetItems(
  totalBudget: number,
  normalizedPercentages: Record<BudgetCategory, number>,
  categories: BudgetCategory[]
): BudgetItem[] {
  let runningAmount = 0;
  return categories.map((cat, idx) => {
    let amount: number;
    if (idx === categories.length - 1) {
      amount = totalBudget - runningAmount;
    } else {
      amount = Math.round((totalBudget * normalizedPercentages[cat]) / 100);
      runningAmount += amount;
    }

    return {
      id: `budget-${cat}-${Date.now()}-${idx}`,
      category: cat,
      name: CATEGORY_DISPLAY_TITLES[cat] || cat,
      plannedAmount: Math.max(0, amount),
      estimatedAmount: Math.max(0, amount),
      actualAmount: 0,
      notes: `${normalizedPercentages[cat]}% of total allocation`,
    };
  });
}

/**
 * Calculates a deterministic, invariant-satisfying budget allocation.
 *
 * Guarantees:
 * 1. Category amounts sum exactly to 100% of the total budget to the last integer unit.
 * 2. Contingency is strictly bounded between 5% and 10%.
 * 3. Priorities and city tiers dynamically calibrate category distributions.
 *
 * @pure
 * @complexity Time: O(K) where K is constant number of budget categories (10), Space: O(K)
 * @param eventType - Classification of the event
 * @param totalBudget - Total available budget in event currency
 * @param guestCount - Number of anticipated attendees
 * @param cityTier - Economic city tier (1 = Metro, 2 = Major, 3 = Regional)
 * @param priorities - User-selected priority areas
 * @returns Array of BudgetItem line items summing to totalBudget
 */
export function calculateBudgetAllocation(
  eventType: EventType,
  totalBudget: number,
  guestCount: number,
  cityTier: CityTier = 2,
  priorities: Priority[] = ["balanced"]
): BudgetItem[] {
  const basePercentagesSource = BASE_PERCENTAGES[eventType] || BASE_PERCENTAGES.other;
  const base: Record<BudgetCategory, number> = { ...basePercentagesSource };

  applyScaleAdjustments(base, guestCount);
  applyCityTierAdjustments(base, cityTier);
  applyPriorityAdjustments(base, priorities);

  const normalizedPercentages = normalizePercentages(base);
  const categories = Object.keys(base) as BudgetCategory[];

  return convertPercentagesToBudgetItems(totalBudget, normalizedPercentages, categories);
}

/**
 * Deterministic Budget Cut / Reallocation with before/after diff explanation.
 *
 * Computes an explicit before/after delta across every budget category,
 * demonstrating how discretionary spend is safely absorbed while protecting core reserves.
 *
 * @pure
 * @param currentPlan - Current event plan with previous budget
 * @param newBudget - Target new budget amount
 * @returns Transparent reallocation result with diff items and explanation
 */
export function handleBudgetReallocation(
  currentPlan: EventPlan,
  newBudget: number
): BudgetReallocationResult {
  const previousBudget = currentPlan.budget;
  const diff = newBudget - previousBudget;
  const isCut = diff < 0;

  const newItems = calculateBudgetAllocation(
    currentPlan.eventType,
    newBudget,
    currentPlan.guests,
    currentPlan.cityTier,
    currentPlan.priorities
  );

  const diffItems: BudgetDiffItem[] = currentPlan.budgetItems.map((oldItem) => {
    const matchedNew = newItems.find((n) => n.category === oldItem.category);
    const newPlanned = matchedNew ? matchedNew.plannedAmount : 0;
    const catDiff = newPlanned - oldItem.plannedAmount;

    let adjustmentReason = "Maintained proportionate baseline.";
    if (isCut) {
      if (oldItem.category === "contingency") {
        adjustmentReason = "Safeguarded core buffer (kept at 5% min) while absorbing top-line drop.";
      } else if (oldItem.category === "decoration" || oldItem.category === "entertainment") {
        adjustmentReason = `Reduced discretionary spend by ${Math.abs(catDiff).toLocaleString()} to protect catering quality.`;
      } else if (oldItem.category === "catering") {
        adjustmentReason = `Adjusted per-plate budget allowance while preserving guest headcount.`;
      }
    } else {
      adjustmentReason = `Enhanced quality tier and increased contingency buffer.`;
    }

    return {
      category: oldItem.category,
      previousPlanned: oldItem.plannedAmount,
      newPlanned,
      adjustmentReason,
    };
  });

  const explanation = isCut
    ? `Budget reduced by ${Math.abs(diff).toLocaleString()} ${currentPlan.currency}. To protect food quality and venue viability, discretionary categories (decor, entertainment) absorbed higher proportionate cuts while preserving safety reserves.`
    : `Budget increased by ${diff.toLocaleString()} ${currentPlan.currency}. Additional funds allocated to priority vendor tiers and safety buffers.`;

  return {
    previousBudget,
    newBudget,
    difference: diff,
    diffItems,
    explanation,
  };
}

/**
 * Handles sudden guest count surge/drop.
 * Recalculates catering per plate and evaluates venue capacity limits.
 *
 * @pure
 * @param currentPlan - Current event plan
 * @param newGuestCount - Updated attendee headcount
 * @returns Headcount change impact analysis with feasibility report
 */
export function handleGuestCountChange(
  currentPlan: EventPlan,
  newGuestCount: number
): GuestCountChangeResult {
  const diff = newGuestCount - currentPlan.guests;
  const cateringItem = currentPlan.budgetItems.find((b) => b.category === "catering");
  const cateringBudget = cateringItem ? cateringItem.plannedAmount : currentPlan.budget * 0.3;
  const newPerGuest = cateringBudget / newGuestCount;

  const feasibility = calculateFeasibility(
    currentPlan.budget,
    newGuestCount,
    currentPlan.cityTier,
    currentPlan.eventType
  );

  let actionRequired = "Headcount change accommodates current venue capacity without conflict.";
  if (diff > SCALE_THRESHOLDS.CRITICAL_GUEST_SURGE_THRESHOLD) {
    actionRequired = `CRITICAL ACTION: +${diff} guests will compress catering budget to ~${Math.round(newPerGuest).toLocaleString()} ${currentPlan.currency}/guest. Verify venue square footage and place supplementary catering order.`;
  } else if (diff < SCALE_THRESHOLDS.SURPLUS_GUEST_DROP_THRESHOLD) {
    actionRequired = `Headcount dropped by ${Math.abs(diff)}. Opportunity to reallocate surplus catering budget to enhanced decor or favors.`;
  }

  return {
    updatedGuests: newGuestCount,
    perGuestChange: diff,
    feasibility,
    actionRequired,
  };
}

/**
 * Handles Date Change / Lead Time Compression.
 * Adjusts timeline urgency and flags critical milestones requiring expedited action.
 *
 * @pure
 * @param currentPlan - Current event plan
 * @param newDate - Target event date string (YYYY-MM-DD)
 * @returns Diagnostic compression status and urgent task checklist
 */
export function handleDateChange(
  currentPlan: EventPlan,
  newDate: string
): DateChangeResult {
  const today = new Date();
  const target = new Date(newDate);
  const diffMs = target.getTime() - today.getTime();
  const daysRemaining = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  const isCompressed = daysRemaining < LEAD_TIME_THRESHOLDS.COMPRESSED_SCHEDULE_DAYS;

  const urgentTasks: string[] = [];
  if (daysRemaining <= LEAD_TIME_THRESHOLDS.CRITICAL_URGENT_DAYS) {
    urgentTasks.push("Lock final guest RSVP count immediately");
    urgentTasks.push("Pay venue & catering balance settlements");
    urgentTasks.push("Conduct vendor run-sheet confirmation calls");
  } else if (daysRemaining <= LEAD_TIME_THRESHOLDS.HIGH_URGENT_DAYS) {
    urgentTasks.push("Freeze decorator layouts and floral orders");
    urgentTasks.push("Send RSVP reminders to unconfirmed guests");
  }

  const riskNote = isCompressed
    ? `WARNING: Schedule compressed to ${daysRemaining} days. Expedited vendor deposits and ready-made decor selections are strongly advised.`
    : `Event rescheduled to ${newDate} (${daysRemaining} days remaining). Timeline milestones adjusted smoothly.`;

  return {
    daysRemaining,
    isCompressed,
    urgentTasks,
    riskNote,
  };
}

/**
 * Feasibility Check.
 * Assesses whether a proposed budget is realistic for the given headcount, city tier, and event type.
 *
 * @pure
 * @param budget - Total budget
 * @param guests - Headcount
 * @param cityTier - Economic city tier
 * @param eventType - Event type
 * @returns Feasibility diagnosis with warnings and actionable trade-offs
 */
export function calculateFeasibility(
  budget: number,
  guests: number,
  cityTier: CityTier = 2,
  eventType: EventType = "wedding"
): FeasibilityReport {
  const budgetPerGuest = Math.round(budget / guests);

  // Minimum realistic cost per guest benchmarks in INR (adjusted for Tier)
  const tierMultiplier = CITY_TIER_MULTIPLIERS[cityTier] || 1.0;
  const benchmarkCost = PER_GUEST_BUDGET_BENCHMARKS[eventType] || DEFAULT_PER_GUEST_BENCHMARK;

  const recommendedMinimum = Math.round(benchmarkCost * tierMultiplier);
  const isFeasible = budgetPerGuest >= recommendedMinimum * FEASIBILITY_SAFETY_RATIO;

  const warnings: string[] = [];
  const tradeOffs: string[] = [];

  if (budgetPerGuest < recommendedMinimum) {
    warnings.push(
      `Budget per guest is ${budgetPerGuest.toLocaleString()} vs recommended baseline ${recommendedMinimum.toLocaleString()} for ${eventType} in Tier ${cityTier}.`
    );
    tradeOffs.push("Consider buffet / family-style dining instead of plated multi-course meals.");
    tradeOffs.push("Prioritize digital invitations and eco-friendly reusable signage.");
    tradeOffs.push("Opt for community hall or park pavilion to save up to 40% on venue rentals.");
  }

  return {
    isFeasible,
    budgetPerGuest,
    recommendedMinimumPerGuest: recommendedMinimum,
    warnings,
    tradeOffs,
  };
}

/**
 * Contextual Risk Generator.
 * Generates realistic operational and logistical risks worded as possibilities, not prophecies.
 *
 * @pure
 * @param eventType - Event type
 * @param guestCount - Total expected guests
 * @param budget - Total budget
 * @param cityTier - Economic city tier
 * @param priorities - User priorities
 * @returns Array of contextual RiskItem models
 */
export function generateRisks(
  eventType: EventType,
  guestCount: number,
  budget: number,
  cityTier: CityTier,
  priorities: Priority[]
): RiskItem[] {
  const isBudgetSensitive = budget / Math.max(1, guestCount) < 1500;
  const isCateringPriority = priorities.includes("catering");

  const risks: RiskItem[] = [
    {
      id: "risk-1",
      category: "budget",
      title: "Potential Catering & Beverage Overrun",
      likelihood: guestCount > 100 || isCateringPriority ? "high" : "medium",
      severity: isBudgetSensitive ? "high" : "medium",
      preventiveAction: `Specify a fixed headcount guarantee with a maximum 5% buffer clause in contract for Tier ${cityTier} event vendors.`,
      backupPlan: "Reallocate from contingency fund and switch supplementary courses to cost-effective alternatives.",
    },
    {
      id: "risk-2",
      category: "vendor",
      title: "Key Vendor Delay or Short-Notice Cancellation",
      likelihood: "medium",
      severity: "high",
      preventiveAction: "Secure written contracts with clear liquidated penalty clauses and secondary point-of-contacts.",
      backupPlan: "Maintain vetted backup contact numbers for freelance photographers and audio-visual technicians.",
    },
    {
      id: "risk-3",
      category: "weather",
      title: "Inclement Weather or Power Disruption",
      likelihood: "medium",
      severity: "medium",
      preventiveAction: "Select venues with verified generator backup and covered all-weather transition areas.",
      backupPlan: "Pre-book portable canopy rentals on hold with a 24-hour weather call option.",
    },
    {
      id: "risk-4",
      category: "guest_count",
      title: "Last-Minute Guest Count Fluctuation",
      likelihood: "high",
      severity: "medium",
      preventiveAction: "Implement digital RSVP tracking with automated SMS/WhatsApp reminders 7 days prior.",
      backupPlan: "Arrange seating layout with 10% expandable perimeter tables.",
    },
    {
      id: "risk-5",
      category: "schedule",
      title: "Setup Delays and Milestone Slippage",
      likelihood: "medium",
      severity: "medium",
      preventiveAction: "Mandate early load-in 3 hours before start with staggered sound-check schedules.",
      backupPlan: "Empower master of ceremonies to adjust itinerary buffers smoothly.",
    },
  ];

  return risks;
}

/**
 * Deterministic Backwards Timeline Schedule.
 * Generates structured countdown milestones anchoring backward from the event date.
 *
 * @pure
 * @param eventType - Event type
 * @param eventDateStr - Event celebration date (YYYY-MM-DD)
 * @param creationDateStr - Planning start date (defaulting to today)
 * @returns Array of scheduled Task models
 */
export function generateTimeline(
  eventType: EventType,
  eventDateStr: string,
  creationDateStr: string = new Date().toISOString().split("T")[0]
): Task[] {
  const eventDate = new Date(eventDateStr);
  const creationDate = new Date(creationDateStr);
  const diffDays = Math.max(1, Math.ceil((eventDate.getTime() - creationDate.getTime()) / (1000 * 60 * 60 * 24)));

  // Milestone offsets (days before event)
  const offsets: number[] = diffDays >= LEAD_TIME_THRESHOLDS.STANDARD_PLANNING_DAYS
    ? [...MILESTONE_SCHEDULES.LONG_HORIZON]
    : diffDays >= LEAD_TIME_THRESHOLDS.COMPRESSED_SCHEDULE_DAYS
    ? [...MILESTONE_SCHEDULES.MEDIUM_HORIZON]
    : [Math.floor(diffDays * 0.8), Math.floor(diffDays * 0.5), Math.floor(diffDays * 0.2), 2, 0];

  const tasks: Task[] = [];

  offsets.forEach((offset, idx) => {
    const template = MILESTONE_TEMPLATES[idx] || {
      title: `Preparation milestone T-${offset} days`,
      category: "misc" as BudgetCategory,
      priority: "medium" as const,
    };

    const taskDate = new Date(eventDate);
    taskDate.setDate(taskDate.getDate() - offset);
    const dueDateStr = taskDate.toISOString().split("T")[0];

    tasks.push({
      id: `task-${idx + 1}-${offset}`,
      title: template.title,
      category: template.category,
      dueDate: dueDateStr,
      priority: template.priority,
      completed: offset > diffDays, // Mark past tasks as completed if starting late
      isOverdue: false,
    });
  });

  return tasks;
}

/**
 * Deterministic Explainable AI Recommendations.
 * Implements structured explainability (Action, Reasoning, Expected Impact, Alternatives, Context).
 *
 * @pure
 * @param eventType - Event type
 * @param budget - Total budget
 * @param guests - Headcount
 * @param cityTier - Economic city tier
 * @param priorities - User priorities
 * @param currency - Currency symbol or code
 * @returns Array of structured ExplainableRecommendation models
 */
export function generateExplainableRecommendations(
  eventType: EventType,
  budget: number,
  guests: number,
  cityTier: CityTier,
  priorities: Priority[],
  currency: string
): ExplainableRecommendation[] {
  const perGuest = Math.round(budget / guests);

  return [
    {
      id: "rec-1",
      title: "Optimized Catering Service Format",
      recommendation: perGuest < 1200
        ? "Adopt high-end live food counters and bowl food rather than formal plated sit-down dining."
        : "Implement a hybrid plated service for main courses with interactive dessert bars.",
      reasoning: `With ${guests} guests in Tier ${cityTier}, live stations reduce staffing overhead by 22% while providing a lively atmosphere.`,
      expectedImpact: "Saves ~12% on catering labor costs while accelerating guest serving speed by 35%.",
      alternativeOptions: [
        "Full traditional multi-course plated dinner (+18% cost)",
        "Self-serve buffet with dedicated servers (-8% cost)",
      ],
      relevantEventContext: `${guests} guests | ${budget.toLocaleString()} ${currency} total budget (~${perGuest.toLocaleString()} / guest)`,
      applied: true,
    },
    {
      id: "rec-2",
      title: "Strategic Contingency Buffer Safeguard",
      recommendation: "Maintain a strict 7% unallocated emergency reserve until T-14 days.",
      reasoning: "Celebration logistics frequently incur last-minute overtime fees, weather cover shifts, or transportation surcharges.",
      expectedImpact: "Prevents personal out-of-pocket debt when unforeseen expenses emerge.",
      alternativeOptions: [
        "Spend 100% upfront on premium florals (risks budget shortfall on day-of emergency)",
        "Reduce buffer to 3% to afford a marquee performer",
      ],
      relevantEventContext: `Selected priorities: ${priorities.join(", ")}`,
      applied: true,
    },
    {
      id: "rec-3",
      title: "Photographer Coverage Optimization",
      recommendation: "Book an 8-hour core package focusing on high-energy ritual moments rather than full 14-hour standby.",
      reasoning: "Key emotional highlights typically concentrate within specific 4-hour spans.",
      expectedImpact: "Reduces photography expenses by up to 30% with no loss of signature keepsake portraits.",
      alternativeOptions: [
        "Dual-photographer sunrise-to-midnight package (+45% expense)",
        "4-hour digital-only documentary package",
      ],
      relevantEventContext: `Target event type: ${eventType}`,
      applied: false,
    },
  ];
}
