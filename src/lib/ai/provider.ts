import { GoogleGenAI } from "@google/genai";
import { PlanApiRequest, AIPlanResponse, AIPlanResponseSchema } from "@/lib/validation/schemas";
import { generateExplainableRecommendations } from "@/lib/planner/rules";
import { wrapInBoundary } from "@/lib/security/sanitizer";

export interface AIProvider {
  generatePlan(request: PlanApiRequest): Promise<AIPlanResponse>;
}

// In-memory cache for identical requests
interface CacheEntry {
  data: AIPlanResponse;
  expiresAt: number;
}
const requestCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function getCacheKey(req: PlanApiRequest): string {
  return `${req.eventType}-${req.city}-${req.guests}-${req.budget}-${req.date}-${req.priorities.sort().join(",")}`;
}

export class GeminiPlannerService implements AIProvider {
  private apiKey: string | undefined;
  private modelName: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  }

  async generatePlan(request: PlanApiRequest): Promise<AIPlanResponse> {
    const cacheKey = getCacheKey(request);
    const cached = requestCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data;
    }

    // Fallback directly to deterministic rules mode if no key configured
    if (!this.apiKey || this.apiKey.trim() === "") {
      return this.generateDeterministicFallback(request);
    }

    try {
      const ai = new GoogleGenAI({ apiKey: this.apiKey });
      const prompt = this.buildPrompt(request);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

      const response = await ai.models.generateContent({
        model: this.modelName,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      clearTimeout(timeoutId);

      const text = response.text;
      if (!text) {
        throw new Error("Empty model response");
      }

      const parsed = JSON.parse(text);
      const validated = AIPlanResponseSchema.safeParse({
        ...parsed,
        mode: "ai-enhanced",
      });

      if (!validated.success) {
        console.warn("[GeminiPlanner] Model response schema mismatch, falling back to deterministic rules:", validated.error);
        return this.generateDeterministicFallback(request);
      }

      requestCache.set(cacheKey, {
        data: validated.data,
        expiresAt: Date.now() + CACHE_TTL_MS,
      });

      return validated.data;
    } catch (error) {
      console.warn("[GeminiPlanner] Upstream failure or timeout, gracefully falling back to deterministic rules:", error);
      return this.generateDeterministicFallback(request);
    }
  }

  private buildPrompt(request: PlanApiRequest): string {
    return `
You are the AI Event Architect for Gatherly AI.
Analyze the following event parameters and return a strictly valid JSON object matching the requested schema.

${wrapInBoundary("Event Title", request.title)}
${wrapInBoundary("Event Type", request.eventType)}
${wrapInBoundary("City & Tier", `${request.city} (Tier ${request.cityTier})`)}
${wrapInBoundary("Headcount", `${request.guests} guests`)}
${wrapInBoundary("Budget", `${request.budget} ${request.currency}`)}
${wrapInBoundary("Priorities", request.priorities.join(", "))}
${wrapInBoundary("Special Requirements", request.specialRequirements || "None")}

REQUIRED JSON OUTPUT FORMAT:
{
  "overview": "A concise 2-sentence summary of the event concept and core strategy.",
  "recommendations": [
    {
      "id": "rec-1",
      "title": "Title of recommendation",
      "recommendation": "Concrete recommendation",
      "reasoning": "Contextual justification based on guest count, city tier, and budget",
      "expectedImpact": "Quantifiable or operational impact",
      "alternativeOptions": ["Alternative A", "Alternative B"],
      "relevantEventContext": "Brief context summary"
    }
  ],
  "ideas": {
    "themes": ["Theme 1", "Theme 2", "Theme 3"],
    "menus": ["Dish/Counter 1", "Dish/Counter 2", "Dish/Counter 3"],
    "activities": ["Activity 1", "Activity 2", "Activity 3"],
    "decor": ["Decor element 1", "Decor element 2", "Decor element 3"],
    "playlists": ["Vibe/Track 1", "Vibe/Track 2", "Vibe/Track 3"]
  }
}
Do not include markdown code fences, comments, or extra keys.
`;
  }

  /**
   * Deterministic Demo Fallback
   * Guaranteed to succeed 100% offline without network or API key.
   */
  generateDeterministicFallback(request: PlanApiRequest): AIPlanResponse {
    const recommendations = generateExplainableRecommendations(
      request.eventType,
      request.budget,
      request.guests,
      request.cityTier,
      request.priorities,
      request.currency
    );

    const ideaMap: Record<string, { themes: string[]; menus: string[]; activities: string[]; decor: string[]; playlists: string[] }> = {
      wedding: {
        themes: ["Royal Heritage Marigold & Brass", "Minimalist Pastel Botanical", "Twilight Starlight Chic"],
        menus: ["Live Chaat & Kebab Bazaar", "Dum Biryani Deg", "Artisanal Kulfi & Mithai Bar"],
        activities: ["Sangeet Flashmob", "Interactive Photo Memory Tree", "Live Acoustic Shehnai & Sitar"],
        decor: ["Cascading Jasmine Canopy", "Warm Fairy Lights & Antique Lanterns", "Brass Urli Floating Candles"],
        playlists: ["Bolly-Acoustic Chill", "Royal Sangeet Anthems", "Sufi Sunset Melodies"],
      },
      birthday: {
        themes: ["Neon Cyber Glow", "Enchanted Forest Garden", "Retro 90s Throwback"],
        menus: ["Wood-fired Pizza & Slider Bar", "Custom Dessert Station", "Craft Mocktail Fountain"],
        activities: ["Live Karaoke Showdown", "Instant Polaroids Guestbook", "Trivia Quest & Pinata"],
        decor: ["Balloon Arches & Metallic Ribbons", "Personalized Neon Lettering Sign", "Fairy Light Tunnel"],
        playlists: ["High-Energy Pop Anthems", "Retro Disco Jams", "Tropical House Chill"],
      },
      community: {
        themes: ["Cultural Tapestry Fair", "Eco-Friendly Green Gathering", "Heritage Street Fiesta"],
        menus: ["Community Potluck Pavilions", "Local Street Food Stalls", "Chai & Snack Stations"],
        activities: ["Neighborhood Talent Stage", "Art & Craft Workshop Booth", "Community Raffle & Games"],
        decor: ["Handmade Fabric Bunting", "Bamboo Canopies & Clay Lamps", "Recycled Paper Pinwheels"],
        playlists: ["Folk & Regional Harmonies", "Upbeat Instrumental Beats", "Acoustic Sing-Alongs"],
      },
    };

    const fallbackIdeas = ideaMap[request.eventType] || ideaMap.birthday;

    return {
      overview: `A thoughtfully planned ${request.eventType} for ${request.guests} guests in ${request.city} with a balanced budget of ${request.budget.toLocaleString()} ${request.currency}. Designed with high-impact staging, smooth operations, and a 5-10% contingency safety margin.`,
      recommendations,
      ideas: fallbackIdeas,
      mode: "demo",
    };
  }
}
