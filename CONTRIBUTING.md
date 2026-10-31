# Contributing to Gatherly AI

Thank you for your interest in contributing to **Gatherly AI** ("Every celebration, beautifully planned.")!

## Development Setup

1. Clone repository:
   ```bash
   git clone <repo-url>
   cd "Challenge 5"
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Start local development server:
   ```bash
   npm run dev
   ```

## Commit Message Convention

We enforce [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Formatting, whitespace, missing semi-colons
- `refactor:` Code changes that neither fix a bug nor add a feature
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Changes to build process or auxiliary tools

## Validation Checks

Run the full validation suite before opening a pull request:
```bash
npm run validate
```
This runs ESLint, TypeScript check, unit and AI evaluation tests, and git repository size verification.
