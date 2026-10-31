interface RateLimitRecord {
  timestamps: number[];
}

const memoryStore = new Map<string, RateLimitRecord>();

/**
 * In-memory sliding window rate limiter
 * Cleans up expired timestamps automatically.
 */
export function checkRateLimit(
  ip: string,
  limit: number = 20,
  windowMs: number = 60000
): {
  success: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
} {
  const now = Date.now();
  const windowStart = now - windowMs;

  const record = memoryStore.get(ip) || { timestamps: [] };

  // Filter timestamps within current window
  const activeTimestamps = record.timestamps.filter((t) => t > windowStart);

  if (activeTimestamps.length >= limit) {
    const oldest = activeTimestamps[0];
    const resetMs = oldest + windowMs - now;
    return {
      success: false,
      limit,
      remaining: 0,
      resetSeconds: Math.max(1, Math.ceil(resetMs / 1000)),
    };
  }

  activeTimestamps.push(now);
  memoryStore.set(ip, { timestamps: activeTimestamps });

  return {
    success: true,
    limit,
    remaining: limit - activeTimestamps.length,
    resetSeconds: Math.ceil(windowMs / 1000),
  };
}

/**
 * Resets the in-memory limiter (useful for unit tests)
 */
export function clearRateLimitStore(): void {
  memoryStore.clear();
}
