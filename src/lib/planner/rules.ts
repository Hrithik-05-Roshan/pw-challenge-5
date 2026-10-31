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
  FeasibilityReport,
} from "@/types";

// Base category weights per event type (sum must equal 100)
const BASE_PERCENTAGES: Record<EventType, Record<BudgetCategory, number>> = {
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
    contingency: 5, // minimum 5%
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
};

/**
 * Calculates deterministic budget allocation.
 * Guarantees:
 * 1. Category amounts sum exactly to 100% of the total budget.
 * 2. Contingency is always between 5% and 10%.
 * 3. Priorities and city tiers adjust weightings dynamically.
 */
export function calculateBudgetAllocation(
  eventType: EventType,
  totalBudget: number,
  guestCount: number,
  cityTier: CityTier = 2,
  priorities: Priority[] = ["balanced"]
): BudgetItem[] {
  const base = { ...BASE_PERCENTAGES[eventType] || BASE_PERCENTAGES.other };

  // Adjust for high guest-count scale (scale catering & venue, decrease attire/decor slightly)
  if (guestCount > 200) {
    base.catering += 4;
    base.venue += 2;
    base.decoration = Math.max(5, base.decoration - 3);
    base.entertainment = Math.max(5, base.entertainment - 3);
  }

  // Adjust for City Tier: Tier 1 (Metros) have higher venue & catering baseline
  if (cityTier === 1) {
    base.venue += 3;
    base.decoration = Math.max(5, base.decoration - 3);
  } else if (cityTier === 3) {
    base.venue = Math.max(15, base.venue - 4);
    base.contingency = Math.min(10, base.contingency + 4);
  }

  // Adjust for user priorities
  for (const prio of priorities) {
    if (prio === "catering") {
      base.catering += 5;
      base.misc = Math.max(1, base.misc - 2);
      base.transportation = Math.max(1, base.transportation - 3);
    } else if (prio === "venue") {
      base.venue += 5;
      base.misc = Math.max(1, base.misc - 2);
      base.entertainment = Math.max(5, base.entertainment - 3);
    } else if (prio === "decor") {
      base.decoration += 5;
      base.misc = Math.max(1, base.misc - 2);
      base.transportation = Math.max(1, base.transportation - 3);
    } else if (prio === "photography") {
      base.photography += 5;
      base.misc = Math.max(1, base.misc - 2);
      base.entertainment = Math.max(5, base.entertainment - 3);
    } else if (prio === "entertainment") {
      base.entertainment += 5;
      base.misc = Math.max(1, base.misc - 2);
      base.decoration = Math.max(5, base.decoration - 3);
    }
  }

  // Enforce contingency between 5% and 10%
  const targetContingency = Math.max(5, Math.min(10, base.contingency));
  base.contingency = targetContingency;

  // Normalize other categories so that (sum of others) equals (100 - targetContingency)
  const otherCategories = (Object.keys(base) as BudgetCategory[]).filter((c) => c !== "contingency");
  const otherTotal = otherCategories.reduce((sum, cat) => sum + base[cat], 0);
  const remainingPercentTarget = 100 - targetContingency;

  const normalizedPercentages: Record<BudgetCategory, number> = {} as Record<BudgetCategory, number>;
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

  const categories = Object.keys(base) as BudgetCategory[];

  // Convert percentages into actual amounts, ensuring the sum of amounts === totalBudget exactly
  let runningAmount = 0;
  const items: BudgetItem[] = categories.map((cat, idx) => {
    let amount: number;
    if (idx === categories.length - 1) {
      amount = totalBudget - runningAmount;
    } else {
      amount = Math.round((totalBudget * normalizedPercentages[cat]) / 100);
      runningAmount += amount;
    }

    const titleMap: Record<BudgetCategory, string> = {
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
    };

    return {
      id: `budget-${cat}-${Date.now()}-${idx}`,
      category: cat,
      name: titleMap[cat],
      plannedAmount: Math.max(0, amount),
      estimatedAmount: Math.max(0, amount),
      actualAmount: 0,
      notes: `${normalizedPercentages[cat]}% of total allocation`,
    };
  });

  return items;
}

/**
 * Deterministic Budget Cut / Reallocation with before/after diff explanation
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

  const diffItems = currentPlan.budgetItems.map((oldItem) => {
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
 */
export function handleGuestCountChange(
  currentPlan: EventPlan,
  newGuestCount: number
): {
  updatedGuests: number;
  perGuestChange: number;
  feasibility: FeasibilityReport;
  actionRequired: string;
} {
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
  if (diff > 20) {
    actionRequired = `CRITICAL ACTION: +${diff} guests will compress catering budget to ~${Math.round(newPerGuest).toLocaleString()} ${currentPlan.currency}/guest. Verify venue square footage and place supplementary catering order.`;
  } else if (diff < -15) {
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
 * Handles Date Change / Lead Time Compression
 */
export function handleDateChange(
  currentPlan: EventPlan,
  newDate: string
): {
  daysRemaining: number;
  isCompressed: boolean;
  urgentTasks: string[];
  riskNote: string;
} {
  const today = new Date();
  const target = new Date(newDate);
  const diffMs = target.getTime() - today.getTime();
  const daysRemaining = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  const isCompressed = daysRemaining < 45;

  const urgentTasks: string[] = [];
  if (daysRemaining <= 14) {
    urgentTasks.push("Lock final guest RSVP count immediately");
    urgentTasks.push("Pay venue & catering balance settlements");
    urgentTasks.push("Conduct vendor run-sheet confirmation calls");
  } else if (daysRemaining <= 30) {
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
 * Feasibility Check
 */
export function calculateFeasibility(
  budget: number,
  guests: number,
  cityTier: CityTier = 2,
  eventType: EventType = "wedding"
): FeasibilityReport {
  const budgetPerGuest = Math.round(budget / guests);

  // Minimum realistic cost per guest benchmarks in INR (adjusted for Tier)
  const tierMultiplier = cityTier === 1 ? 1.35 : cityTier === 2 ? 1.0 : 0.8;
  const baseBenchmarks: Record<EventType, number> = {
    wedding: 2500,
    birthday: 600,
    community: 350,
    corporate: 1500,
    other: 700,
  };

  const recommendedMinimum = Math.round((baseBenchmarks[eventType] || 800) * tierMultiplier);
  const isFeasible = budgetPerGuest >= recommendedMinimum * 0.75;

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
 * Contextual Risk Generator
 * Generates realistic risks worded as possibilities, not prophecies.
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
 * Deterministic Backwards Timeline Schedule
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
  const offsets = diffDays >= 90
    ? [90, 60, 45, 30, 14, 7, 2, 0]
    : diffDays >= 45
    ? [45, 30, 21, 14, 7, 2, 0]
    : [Math.floor(diffDays * 0.8), Math.floor(diffDays * 0.5), Math.floor(diffDays * 0.2), 2, 0];

  const tasks: Task[] = [];
  const milestoneLabels = [
    { title: "Finalize venue contract & deposit", category: "venue" as BudgetCategory, prio: "high" as const },
    { title: "Book caterer and lock menu tasting", category: "catering" as BudgetCategory, prio: "high" as const },
    { title: "Approve theme, lighting & decor blueprint", category: "decoration" as BudgetCategory, prio: "medium" as const },
    { title: "Send formal invitations & open RSVP portal", category: "invitations" as BudgetCategory, prio: "high" as const },
    { title: "Confirm photographer & day-of shot list", category: "photography" as BudgetCategory, prio: "medium" as const },
    { title: "Freeze final headcount & dietary list", category: "catering" as BudgetCategory, prio: "high" as const },
    { title: "Final vendor walkthrough & rehearsal", category: "misc" as BudgetCategory, prio: "medium" as const },
    { title: "Day-of event celebration execution", category: "entertainment" as BudgetCategory, prio: "high" as const },
  ];

  offsets.forEach((offset, idx) => {
    const template = milestoneLabels[idx] || {
      title: `Preparation milestone T-${offset} days`,
      category: "misc" as BudgetCategory,
      prio: "medium" as const,
    };

    const taskDate = new Date(eventDate);
    taskDate.setDate(taskDate.getDate() - offset);
    const dueDateStr = taskDate.toISOString().split("T")[0];

    tasks.push({
      id: `task-${idx + 1}-${offset}`,
      title: template.title,
      category: template.category,
      dueDate: dueDateStr,
      priority: template.prio,
      completed: offset > diffDays, // Mark past tasks as completed if starting late
      isOverdue: false,
    });
  });

  return tasks;
}

/**
 * Deterministic Explainable AI Recommendations
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
