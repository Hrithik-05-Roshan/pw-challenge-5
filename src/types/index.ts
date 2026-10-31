/**
 * @file index.ts
 * @description Core Domain Model type definitions for Gatherly AI Event Architect.
 *
 * Implements strict domain typing for celebration events (weddings, birthdays,
 * community gatherings, corporate events), budget allocations, backwards timelines,
 * vendor management, guest RSVP tracking, and explainable AI recommendations.
 */

/**
 * Supported celebration and gathering types.
 */
export type EventType = "wedding" | "birthday" | "community" | "corporate" | "other";

/**
 * Supported international and domestic currencies.
 */
export type Currency = "INR" | "USD" | "EUR" | "GBP";

/**
 * Economic classification tier for event cities.
 * 1: Metros (e.g. Mumbai, Delhi, Bengaluru) - Higher baseline venue & vendor costs.
 * 2: Major Emerging Cities (e.g. Pune, Jaipur, Kolkata) - Standard benchmark costs.
 * 3: Tier-3 & Regional Towns - Lower baseline costs, higher contingency recommended.
 */
export type CityTier = 1 | 2 | 3;

/**
 * Strategic priority focus areas that adjust automated budget weightings.
 */
export type Priority =
  | "venue"
  | "catering"
  | "decor"
  | "entertainment"
  | "photography"
  | "balanced";

/**
 * Canonical budget allocation categories.
 * The sum of planned amounts across all 10 categories must strictly equal 100% of total budget.
 */
export type BudgetCategory =
  | "venue"
  | "catering"
  | "decoration"
  | "photography"
  | "entertainment"
  | "transportation"
  | "invitations"
  | "attire"
  | "misc"
  | "contingency";

/**
 * Represents a single line item within the allocated event budget.
 */
export interface BudgetItem {
  /** Unique identifier for the budget item */
  id: string;
  /** Canonical category identifier */
  category: BudgetCategory;
  /** Human-readable display title */
  name: string;
  /** Proportionately planned budget amount (in event currency) */
  plannedAmount: number;
  /** Estimated real-world expenditure */
  estimatedAmount: number;
  /** Actual settled expenditure recorded by the organizer */
  actualAmount: number;
  /** Contextual notes or percentage breakdown explanation */
  notes?: string;
}

/**
 * Represents a milestone or scheduled action item on the backwards event timeline.
 */
export interface Task {
  /** Unique task identifier */
  id: string;
  /** Actionable title of the milestone */
  title: string;
  /** Associated budget category */
  category: BudgetCategory;
  /** Target completion date in ISO format (YYYY-MM-DD) */
  dueDate: string;
  /** Urgency priority level */
  priority: "high" | "medium" | "low";
  /** Completion status */
  completed: boolean;
  /** Additional instructions or supplier requirements */
  notes?: string;
  /** Computed flag indicating whether the task is past its due date */
  isOverdue?: boolean;
}

/**
 * Represents a vendor, supplier, or service partner.
 */
export interface Vendor {
  /** Unique vendor identifier */
  id: string;
  /** Service category */
  category: BudgetCategory;
  /** Business or supplier name */
  name: string;
  /** Primary contact person */
  contactPerson?: string;
  /** Direct contact telephone */
  phone?: string;
  /** Official email address */
  email?: string;
  /** Quoted or estimated contract cost */
  estimatedCost: number;
  /** Final negotiated settlement cost */
  actualCost?: number;
  /** Engagement workflow state */
  status: "to_contact" | "quoted" | "booked";
  /** Upfront advance deposit paid */
  advancePaid?: number;
  /** Service agreement notes and terms */
  notes?: string;
  /** Clearly distinguishes user-entered vendors from AI-suggested categories */
  isAISuggestion?: boolean;
}

/**
 * Represents an invited attendee with RSVP tracking and plus-ones.
 */
export interface Guest {
  /** Unique guest identifier */
  id: string;
  /** Guest full name */
  name: string;
  /** Guest relationship category */
  category: "family" | "friend" | "colleague" | "vip" | "general";
  /** Current RSVP confirmation state */
  rsvp: "attending" | "declined" | "tentative" | "invited";
  /** Number of accompanying guests */
  plusOnes: number;
  /** Dietary preferences or allergy restrictions */
  dietary?: string;
}

/**
 * Represents a proactively detected operational or financial risk.
 */
export interface RiskItem {
  /** Unique risk identifier */
  id: string;
  /** Domain area */
  category: "budget" | "vendor" | "weather" | "guest_count" | "schedule";
  /** Concise risk statement */
  title: string;
  /** Estimated probability of occurrence */
  likelihood: "low" | "medium" | "high";
  /** Potential consequence severity */
  severity: "low" | "medium" | "high";
  /** Actionable preventive countermeasure */
  preventiveAction: string;
  /** Contingency backup plan if triggered */
  backupPlan: string;
}

/**
 * Structured recommendation complying with Explainable AI (XAI) design standards.
 * Each recommendation must explain *why* it was made and provide alternatives.
 */
export interface ExplainableRecommendation {
  /** Unique recommendation identifier */
  id: string;
  /** Distinct headline of the strategic advice */
  title: string;
  /** Core recommendation action */
  recommendation: string;
  /** Transparent reasoning grounded in event context */
  reasoning: string;
  /** Concrete financial or operational payoff */
  expectedImpact: string;
  /** Alternative trade-off pathways considered */
  alternativeOptions: string[];
  /** Specific event variables that triggered this guidance */
  relevantEventContext: string;
  /** Flag indicating if the organizer accepted this recommendation */
  applied?: boolean;
}

/**
 * Curated creative inspiration ideas generated for the event.
 */
export interface EventIdeas {
  /** Theme concepts and aesthetic palettes */
  themes: string[];
  /** Curated culinary and beverage menu concepts */
  menus: string[];
  /** Engaging guest entertainment and activity ideas */
  activities: string[];
  /** Styling, lighting, and floral setup ideas */
  decor: string[];
  /** Curated music and playlist ambiance suggestions */
  playlists: string[];
}

/**
 * Aggregate Root representing a complete celebration event plan.
 */
export interface EventPlan {
  /** Unique plan identifier */
  id: string;
  /** Event title */
  title: string;
  /** Event type classification */
  eventType: EventType;
  /** Event celebration date in ISO format (YYYY-MM-DD) */
  date: string;
  /** City location */
  city: string;
  /** Economic tier of host city */
  cityTier: CityTier;
  /** Total anticipated attendee headcount */
  guests: number;
  /** Total approved budget */
  budget: number;
  /** Currency code */
  currency: Currency;
  /** Optional visual style theme */
  styleTheme?: string;
  /** Strategic priorities selected by organizer */
  priorities: Priority[];
  /** Catering dietary considerations */
  dietaryPreferences?: string[];
  /** Custom special requirements */
  specialRequirements?: string;
  /** Execution mode: dynamic AI or deterministic zero-key fallback */
  mode: "ai-enhanced" | "demo";
  /** ISO timestamp of creation */
  createdAt: string;
  /** ISO timestamp of last modification */
  updatedAt: string;
  /** Line-item budget allocations */
  budgetItems: BudgetItem[];
  /** Backwards milestone schedule */
  tasks: Task[];
  /** Vendor contacts and booking tracking */
  vendors: Vendor[];
  /** Guest list and RSVP confirmations */
  guestsList: Guest[];
  /** Contextual risk analysis matrix */
  risks: RiskItem[];
  /** Explainable AI recommendations */
  recommendations: ExplainableRecommendation[];
  /** Curated creative theme and menu ideas */
  ideas: EventIdeas;
}

/**
 * Line item diff between two budget allocations during reallocation.
 */
export interface BudgetDiffItem {
  /** Budget category being adjusted */
  category: BudgetCategory;
  /** Previous planned amount */
  previousPlanned: number;
  /** Newly planned amount */
  newPlanned: number;
  /** Transparent explanation of the adjustment rationale */
  adjustmentReason: string;
}

/**
 * Detailed transparency report produced when adjusting an event budget.
 */
export interface BudgetReallocationResult {
  /** Previous budget before adjustment */
  previousBudget: number;
  /** Target new budget after adjustment */
  newBudget: number;
  /** Net monetary difference (negative for cuts, positive for increases) */
  difference: number;
  /** Category-by-category transparent diff comparison */
  diffItems: BudgetDiffItem[];
  /** High-level executive summary of trade-offs made */
  explanation: string;
}

/**
 * Diagnostic feasibility assessment comparing headcount and budget against regional benchmarks.
 */
export interface FeasibilityReport {
  /** Whether the per-guest allocation meets minimum viable threshold */
  isFeasible: boolean;
  /** Computed allocation per attendee */
  budgetPerGuest: number;
  /** Recommended minimum expenditure per guest based on event type and city tier */
  recommendedMinimumPerGuest: number;
  /** Identified risks and realistic constraints */
  warnings: string[];
  /** Constructive operational trade-offs to restore viability */
  tradeOffs: string[];
}
