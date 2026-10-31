export type EventType = "wedding" | "birthday" | "community" | "corporate" | "other";

export type Currency = "INR" | "USD" | "EUR" | "GBP";

export type CityTier = 1 | 2 | 3;

export type Priority =
  | "venue"
  | "catering"
  | "decor"
  | "entertainment"
  | "photography"
  | "balanced";

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

export interface BudgetItem {
  id: string;
  category: BudgetCategory;
  name: string;
  plannedAmount: number;
  estimatedAmount: number;
  actualAmount: number;
  notes?: string;
}

export interface Task {
  id: string;
  title: string;
  category: BudgetCategory;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  notes?: string;
  isOverdue?: boolean;
}

export interface Vendor {
  id: string;
  category: BudgetCategory;
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  estimatedCost: number;
  actualCost?: number;
  status: "to_contact" | "quoted" | "booked";
  advancePaid?: number;
  notes?: string;
  isAISuggestion?: boolean; // Clearly distinguishes user-entered vendors from AI-suggested types
}

export interface Guest {
  id: string;
  name: string;
  category: "family" | "friend" | "colleague" | "vip" | "general";
  rsvp: "attending" | "declined" | "tentative" | "invited";
  plusOnes: number;
  dietary?: string;
}

export interface RiskItem {
  id: string;
  category: "budget" | "vendor" | "weather" | "guest_count" | "schedule";
  title: string;
  likelihood: "low" | "medium" | "high";
  severity: "low" | "medium" | "high";
  preventiveAction: string;
  backupPlan: string;
}

export interface ExplainableRecommendation {
  id: string;
  title: string;
  recommendation: string;
  reasoning: string;
  expectedImpact: string;
  alternativeOptions: string[];
  relevantEventContext: string;
  applied?: boolean;
}

export interface EventIdeas {
  themes: string[];
  menus: string[];
  activities: string[];
  decor: string[];
  playlists: string[];
}

export interface EventPlan {
  id: string;
  title: string;
  eventType: EventType;
  date: string;
  city: string;
  cityTier: CityTier;
  guests: number;
  budget: number;
  currency: Currency;
  styleTheme?: string;
  priorities: Priority[];
  dietaryPreferences?: string[];
  specialRequirements?: string;
  mode: "ai-enhanced" | "demo";
  createdAt: string;
  updatedAt: string;
  budgetItems: BudgetItem[];
  tasks: Task[];
  vendors: Vendor[];
  guestsList: Guest[];
  risks: RiskItem[];
  recommendations: ExplainableRecommendation[];
  ideas: EventIdeas;
}

export interface BudgetReallocationResult {
  previousBudget: number;
  newBudget: number;
  difference: number;
  diffItems: {
    category: BudgetCategory;
    previousPlanned: number;
    newPlanned: number;
    adjustmentReason: string;
  }[];
  explanation: string;
}

export interface FeasibilityReport {
  isFeasible: boolean;
  budgetPerGuest: number;
  recommendedMinimumPerGuest: number;
  warnings: string[];
  tradeOffs: string[];
}
