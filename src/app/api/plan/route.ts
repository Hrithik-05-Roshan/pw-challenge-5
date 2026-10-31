/**
 * @file route.ts
 * @description API route handler for POST /api/plan.
 *
 * Implements defensive HTTP boundary verification:
 * 1. Content-Type verification (application/json)
 * 2. Sliding window rate limiting (20 req / minute per IP)
 * 3. Payload size caps (64 KB)
 * 4. Zod schema validation
 * 5. Gemini AI integration with automatic deterministic offline fallback
 */

import { NextRequest, NextResponse } from "next/server";
import { PlanApiRequestSchema } from "@/lib/validation/schemas";
import { GeminiPlannerService } from "@/lib/ai/provider";
import { checkRateLimit } from "@/lib/security/rate-limiter";

const plannerService = new GeminiPlannerService();
const MAX_BODY_BYTES = 64 * 1024; // 64 KB

/**
 * Handles incoming plan generation requests.
 *
 * @param request - NextRequest instance
 * @returns JSON response containing generated or deterministic fallback plan
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  // 1. Content-Type check
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type must be application/json" },
      { status: 415 }
    );
  }

  // 2. IP-based sliding window rate limiter
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  const rateCheck = checkRateLimit(ip, 20, 60000);
  if (!rateCheck.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": rateCheck.resetSeconds.toString(),
          "X-RateLimit-Limit": rateCheck.limit.toString(),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  // 3. Payload size check
  let bodyText: string;
  try {
    bodyText = await request.text();
    if (Buffer.byteLength(bodyText, "utf8") > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Payload exceeds 64KB limit" },
        { status: 413 }
      );
    }
  } catch {
    return NextResponse.json({ error: "Failed to read request body" }, { status: 400 });
  }

  // 4. JSON parse & Zod validation
  let json: unknown;
  try {
    json = JSON.parse(bodyText);
  } catch {
    return NextResponse.json({ error: "Invalid JSON syntax" }, { status: 400 });
  }

  const parsed = PlanApiRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.issues.map((i) => i.message) },
      { status: 422 }
    );
  }

  // 5. Generate plan via AI provider with fallback
  try {
    const result = await plannerService.generatePlan(parsed.data);
    return NextResponse.json(result, {
      status: 200,
      headers: {
        "X-RateLimit-Remaining": rateCheck.remaining.toString(),
      },
    });
  } catch {
    // Ultimate defensive fallback
    const fallback = plannerService.generateDeterministicFallback(parsed.data);
    return NextResponse.json(fallback, { status: 200 });
  }
}

/**
 * Handles unsupported HTTP GET requests.
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
