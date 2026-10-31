import { z } from "zod";

export const EventTypeSchema = z.enum([
  "wedding",
  "birthday",
  "community",
  "corporate",
  "other",
]);

export const CurrencySchema = z.enum(["INR", "USD", "EUR", "GBP"]);

export const CityTierSchema = z.union([z.literal(1), z.literal(2), z.literal(3)]);

export const PrioritySchema = z.enum([
  "venue",
  "catering",
  "decor",
  "entertainment",
  "photography",
  "balanced",
]);

export const BudgetCategorySchema = z.enum([
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
]);

export const CreateEventInputSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(80, "Title cannot exceed 80 characters"),
  eventType: EventTypeSchema,
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Event date must be formatted YYYY-MM-DD"),
  city: z
    .string()
    .trim()
    .min(2, "City name must be at least 2 characters")
    .max(50, "City name cannot exceed 50 characters"),
  cityTier: CityTierSchema,
  guests: z
    .number()
    .int("Guest count must be an integer")
    .min(2, "At least 2 guests required")
    .max(10000, "Maximum guest limit is 10,000"),
  budget: z
    .number()
    .positive("Budget must be a positive amount")
    .min(1000, "Minimum budget is 1,000"),
  currency: CurrencySchema,
  styleTheme: z.string().trim().max(100).optional(),
  priorities: z.array(PrioritySchema).min(1, "Select at least 1 priority"),
  dietaryPreferences: z.array(z.string().trim()).optional(),
  specialRequirements: z.string().trim().max(500).optional(),
});

export type CreateEventInput = z.infer<typeof CreateEventInputSchema>;

export const ReallocateBudgetInputSchema = z.object({
  eventId: z.string().min(1),
  newBudget: z.number().positive().min(1000),
});

export const UpdateGuestCountInputSchema = z.object({
  eventId: z.string().min(1),
  newGuestCount: z.number().int().min(2).max(10000),
});

export const UpdateDateInputSchema = z.object({
  eventId: z.string().min(1),
  newDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

// API Plan Request Schema
export const PlanApiRequestSchema = z.object({
  eventType: EventTypeSchema,
  title: z.string().trim().min(3).max(80),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  city: z.string().trim().min(2).max(50),
  cityTier: CityTierSchema,
  guests: z.number().int().min(2).max(10000),
  budget: z.number().positive().min(1000),
  currency: CurrencySchema,
  styleTheme: z.string().trim().max(100).optional(),
  priorities: z.array(PrioritySchema).default(["balanced"]),
  specialRequirements: z.string().trim().max(500).optional(),
});

export type PlanApiRequest = z.infer<typeof PlanApiRequestSchema>;

// Strict Zod schema for Explainable AI output validation
export const ExplainableRecommendationSchema = z.object({
  id: z.string(),
  title: z.string(),
  recommendation: z.string(),
  reasoning: z.string(),
  expectedImpact: z.string(),
  alternativeOptions: z.array(z.string()),
  relevantEventContext: z.string(),
});

export const AIPlanResponseSchema = z.object({
  overview: z.string(),
  recommendations: z.array(ExplainableRecommendationSchema),
  ideas: z.object({
    themes: z.array(z.string()),
    menus: z.array(z.string()),
    activities: z.array(z.string()),
    decor: z.array(z.string()),
    playlists: z.array(z.string()),
  }),
  mode: z.enum(["ai-enhanced", "demo"]),
});

export type AIPlanResponse = z.infer<typeof AIPlanResponseSchema>;
