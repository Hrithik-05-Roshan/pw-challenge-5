/**
 * Security Sanitization Utilities
 * Strips dangerous control characters, enforces length caps,
 * and defends against prompt injection.
 */

export function sanitizeText(input: string, maxLength: number = 500): string {
  if (!input || typeof input !== "string") return "";

  // 1. Strip null bytes and non-printable control characters (except common whitespace)
  let sanitized = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  // 2. Strip potential prompt injection delimiter mimics
  sanitized = sanitized.replace(/```/g, "'''");
  sanitized = sanitized.replace(/<\|im_start\|>|<\|im_end\|>|<\|system\|>/gi, "");

  // 3. Trim and enforce length limit
  sanitized = sanitized.trim().slice(0, maxLength);

  return sanitized;
}

/**
 * Wraps user-supplied content within unmistakable data boundaries
 * so LLMs treat it strictly as data, never instructions.
 */
export function wrapInBoundary(label: string, content: string): string {
  const safeContent = sanitizeText(content, 2000);
  return `--- BEGIN USER DATA: ${label} ---\n${safeContent}\n--- END USER DATA: ${label} ---`;
}
