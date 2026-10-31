# Security Policy - Gatherly AI

## Commitment
At **Gatherly AI**, user privacy, deterministic guarantees, and defense-in-depth security are central to our design.

## Threat Model Summary
| Threat Vector | Risk Level | Mitigation Architecture |
|---|---|---|
| **Prompt Injection** | High | User text delimited as raw data, control characters stripped, strict Zod schema validation on output with unknown keys stripped, plain text rendering (no `dangerouslySetInnerHTML`). |
| **Guest PII Exposure** | High | **Zero Guest PII to AI**: Guest names, dietary details, phone numbers, and addresses are strictly client-side local storage only and NEVER sent over the wire to any LLM. |
| **API Denial of Service** | Medium | IP-keyed sliding window rate limiter (20 req/min) returning HTTP 429 with `Retry-After`. Body size cap (64KB), strict JSON `Content-Type` validation, and origin checking. |
| **Information Leakage** | Medium | Generic sanitized error responses returned to clients; server-side stack traces suppressed in API routes; no secrets exposed in client bundles. |
| **Data Storage Isolation** | Low | Client-side `localStorage` used for zero-account privacy. Plainly documented: `localStorage` is scoped to origin, not an enterprise multi-tenant server boundary. Full data wipe available via "Delete all data" button. |
| **Supply Chain Vulnerability** | Low | Pinned package dependencies, GitHub Actions CI security audit (`npm audit`), automated Dependabot updates, Gitleaks secret scanning. |

## Reporting a Vulnerability
Please do not file public issues for security vulnerabilities. Report disclosures responsibly to `security@gatherly-ai.local`. We acknowledge reports within 24 hours and patch high-severity issues within 72 hours.
