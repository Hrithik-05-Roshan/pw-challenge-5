/**
 * @file guards.ts
 * @description Runtime Type Guards and Assertion Functions for Gatherly AI Domain Models.
 *
 * Provides static TypeScript type narrowing and runtime contract verification
 * without introducing runtime overhead or third-party dependencies.
 */

import {
  EventPlan,
  BudgetItem,
  Task,
  Vendor,
  Guest,
  RiskItem,
  ExplainableRecommendation,
  EventType,
  BudgetCategory,
} from "@/types";

const VALID_EVENT_TYPES: ReadonlyArray<EventType> = [
  "wedding",
  "birthday",
  "community",
  "corporate",
  "other",
];

const VALID_BUDGET_CATEGORIES: ReadonlyArray<BudgetCategory> = [
  "venue",
  "catering",
  "decoration",
  "photography",
  "entertainment",
  "transportation",
  "invitations",
  "attire",
  "misc",
  "contingency",
];

/**
 * Type guard for EventType
 */
export function isEventType(value: unknown): value is EventType {
  return typeof value === "string" && VALID_EVENT_TYPES.includes(value as EventType);
}

/**
 * Type guard for BudgetCategory
 */
export function isBudgetCategory(value: unknown): value is BudgetCategory {
  return typeof value === "string" && VALID_BUDGET_CATEGORIES.includes(value as BudgetCategory);
}

/**
 * Type guard for BudgetItem
 */
export function isBudgetItem(item: unknown): item is BudgetItem {
  if (!item || typeof item !== "object") return false;
  const candidate = item as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    isBudgetCategory(candidate.category) &&
    typeof candidate.name === "string" &&
    typeof candidate.plannedAmount === "number" &&
    typeof candidate.estimatedAmount === "number" &&
    typeof candidate.actualAmount === "number"
  );
}

/**
 * Type guard for Task
 */
export function isTask(task: unknown): task is Task {
  if (!task || typeof task !== "object") return false;
  const candidate = task as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    isBudgetCategory(candidate.category) &&
    typeof candidate.dueDate === "string" &&
    ["high", "medium", "low"].includes(candidate.priority as string) &&
    typeof candidate.completed === "boolean"
  );
}

/**
 * Type guard for Vendor
 */
export function isVendor(vendor: unknown): vendor is Vendor {
  if (!vendor || typeof vendor !== "object") return false;
  const candidate = vendor as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    isBudgetCategory(candidate.category) &&
    typeof candidate.name === "string" &&
    typeof candidate.estimatedCost === "number" &&
    ["to_contact", "quoted", "booked"].includes(candidate.status as string)
  );
}

/**
 * Type guard for Guest
 */
export function isGuest(guest: unknown): guest is Guest {
  if (!guest || typeof guest !== "object") return false;
  const candidate = guest as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    ["family", "friend", "colleague", "vip", "general"].includes(candidate.category as string) &&
    ["attending", "declined", "tentative", "invited"].includes(candidate.rsvp as string) &&
    typeof candidate.plusOnes === "number"
  );
}

/**
 * Type guard for EventPlan
 */
export function isEventPlan(plan: unknown): plan is EventPlan {
  if (!plan || typeof plan !== "object") return false;
  const candidate = plan as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    isEventType(candidate.eventType) &&
    typeof candidate.date === "string" &&
    typeof candidate.city === "string" &&
    [1, 2, 3].includes(candidate.cityTier as number) &&
    typeof candidate.guests === "number" &&
    typeof candidate.budget === "number" &&
    ["INR", "USD", "EUR", "GBP"].includes(candidate.currency as string) &&
    Array.isArray(candidate.budgetItems) &&
    Array.isArray(candidate.tasks) &&
    Array.isArray(candidate.vendors) &&
    Array.isArray(candidate.guestsList)
  );
}

/**
 * Type guard for RiskItem
 */
export function isRiskItem(risk: unknown): risk is RiskItem {
  if (!risk || typeof risk !== "object") return false;
  const candidate = risk as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    ["budget", "vendor", "weather", "guest_count", "schedule"].includes(candidate.category as string) &&
    typeof candidate.title === "string" &&
    ["low", "medium", "high"].includes(candidate.likelihood as string) &&
    ["low", "medium", "high"].includes(candidate.severity as string) &&
    typeof candidate.preventiveAction === "string" &&
    typeof candidate.backupPlan === "string"
  );
}

/**
 * Type guard for ExplainableRecommendation
 */
export function isExplainableRecommendation(rec: unknown): rec is ExplainableRecommendation {
  if (!rec || typeof rec !== "object") return false;
  const candidate = rec as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.recommendation === "string" &&
    typeof candidate.reasoning === "string" &&
    typeof candidate.expectedImpact === "string" &&
    Array.isArray(candidate.alternativeOptions) &&
    typeof candidate.relevantEventContext === "string"
  );
}

/**
 * Asserts that a given plan matches the EventPlan contract, throwing if invalid.
 */
export function assertValidPlan(plan: unknown, context: string = "EventPlan validation"): asserts plan is EventPlan {
  if (!isEventPlan(plan)) {
    throw new Error(`[Assertion Failure] ${context}: Provided object is not a valid EventPlan.`);
  }
}

