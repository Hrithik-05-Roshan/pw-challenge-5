import { describe, it, expect, beforeEach } from "vitest";
import { checkRateLimit, clearRateLimitStore } from "@/lib/security/rate-limiter";

describe("Sliding Window Rate Limiter", () => {
  beforeEach(() => {
    clearRateLimitStore();
  });

  it("permits requests within the defined threshold", () => {
    const res1 = checkRateLimit("192.168.1.1", 3, 60000);
    expect(res1.success).toBe(true);
    expect(res1.remaining).toBe(2);

    const res2 = checkRateLimit("192.168.1.1", 3, 60000);
    expect(res2.success).toBe(true);
    expect(res2.remaining).toBe(1);

    const res3 = checkRateLimit("192.168.1.1", 3, 60000);
    expect(res3.success).toBe(true);
    expect(res3.remaining).toBe(0);
  });

  it("blocks requests that exceed the limit with 429 semantics", () => {
    checkRateLimit("10.0.0.1", 2, 60000);
    checkRateLimit("10.0.0.1", 2, 60000);

    const blocked = checkRateLimit("10.0.0.1", 2, 60000);
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetSeconds).toBeGreaterThan(0);
  });

  it("tracks different IP addresses separately", () => {
    checkRateLimit("1.1.1.1", 1, 60000);
    const blockedA = checkRateLimit("1.1.1.1", 1, 60000);
    expect(blockedA.success).toBe(false);

    const allowedB = checkRateLimit("2.2.2.2", 1, 60000);
    expect(allowedB.success).toBe(true);
  });
});
