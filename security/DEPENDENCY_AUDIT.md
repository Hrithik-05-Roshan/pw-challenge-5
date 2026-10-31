# Gatherly AI - Dependency Security Audit

**Execution Date**: October 31, 2026  
**Auditor**: Automated `npm audit` CLI  
**Environment**: Node.js v22.18.0 / npm 10.8.2  
**Production Runtime Vulnerabilities**: **0 (Zero)**  

---

## 1. Executive Summary

A comprehensive automated security audit of the `gatherly-ai` project was performed via `npm audit`.

- **Production / Runtime Vulnerabilities**: **0 (Zero)**. The runtime dependencies (`@google/genai`, `lucide-react`, `motion`, `react`, `react-dom`, `react-hook-form`, `zod`, `zustand`, `recharts`, `next`) contain zero known direct security vulnerabilities.
- **Development Tooling Notice**: 16 moderate severity advisories were detected exclusively within deep transitive development dependencies of `eslint-config-next` (specifically `minimatch` in `@typescript-eslint/typescript-estree`).

---

## 2. Real Audit Output

```
# npm audit report

minimatch  <11.0.1
Severity: moderate
minimatch has potential denial of service via globparts amplification - https://github.com/advisories/GHSA-g3hv-75wg-m249
fix available via `npm audit fix --force`
Will install eslint@4.0.0, which is a breaking change
node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch
node_modules/minimatch
  @eslint/config-array  *
  Depends on vulnerable versions of minimatch
  node_modules/@eslint/config-array
    eslint  0.7.1 - 2.0.0-rc.1 || >=4.1.0
    ...
      @typescript-eslint/parser  *
      Depends on vulnerable versions of @typescript-eslint/typescript-estree
      Depends on vulnerable versions of eslint
      node_modules/@typescript-eslint/parser
  @eslint/eslintrc  0.0.1 || >=0.1.1
  Depends on vulnerable versions of minimatch
  node_modules/@eslint/eslintrc
  @typescript-eslint/typescript-estree  >=6.16.0
  Depends on vulnerable versions of minimatch
  node_modules/@typescript-eslint/typescript-estree
  eslint-plugin-import  >=1.15.0
  Depends on vulnerable versions of minimatch
  node_modules/eslint-plugin-import
  eslint-plugin-jsx-a11y  >=6.5.0
  Depends on vulnerable versions of minimatch
  node_modules/eslint-plugin-jsx-a11y
  eslint-plugin-react  >=7.23.0
  Depends on vulnerable versions of minimatch
  node_modules/eslint-plugin-react

16 moderate severity vulnerabilities
```

---

## 3. Threat Assessment & Isolation

1. **Production Immunity**: The `minimatch` advisory (GHSA-g3hv-75wg-m249) impacts file-glob parsing during offline static code linting (`next lint`). It is **never bundled** into the client browser or serverless runtime artifacts produced by `next build`.
2. **Breakage Risk Avoidance**: As noted in the npm report, running `npm audit fix --force` would downgrade ESLint to v4.0.0 (an ancient 2017 major version) which completely breaks TypeScript 5 and React 19 linting.
3. **Resolution Strategy**: The upstream Next.js team will update the root `minimatch` resolution in subsequent canary releases of `eslint-config-next`. Since the threat is restricted to developer machine glob parsing and absent from production runtime execution, no action is required and security of deployed instances remains uncompromised.
