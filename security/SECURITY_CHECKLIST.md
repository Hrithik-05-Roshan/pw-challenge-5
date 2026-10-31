# Security Checklist & Verification

- [x] **No Secrets Committed**: `.env*` excluded in `.gitignore`, except `.env.example`.
- [x] **Zero-Key Deterministic Mode**: App works 100% offline and keyless via deterministic rules engine.
- [x] **Content-Security-Policy**: Enforced via `src/middleware.ts` with frame-ancestors 'none'.
- [x] **Secure Headers**: HSTS, X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Referrer-Policy, Permissions-Policy in `next.config.ts`.
- [x] **Client-Side Isolation**: No Guest PII transmitted to Gemini API.
- [x] **Rate Limiting**: Sliding-window IP rate limiter on `/api/plan` with 429 Retry-After.
- [x] **Input Sanitization**: Control character stripping and prompt boundary demarcation in `lib/security/sanitizer.ts`.
- [x] **Response Validation**: All AI outputs validated against Zod schema with `.passthrough()` forbidden.
- [x] **No Dangerous HTML Rendering**: Zero usages of `dangerouslySetInnerHTML`. Plain-text React DOM interpolation only.
- [x] **Request Guard**: Method verification (POST only), Content-Type verification (`application/json`), 64KB body cap.
- [x] **Gitleaks Scan**: Configured via `.github/workflows/secret-scan.yml`.
- [x] **CI Dependency Audit**: Configured via GitHub Actions CI workflow.
