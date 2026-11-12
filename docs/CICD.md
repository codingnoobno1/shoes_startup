# CI/CD Plan

## Goals

- Keep the local workstation lean: no local install or build is required.
- Make GitHub Actions the quality gate for linting, strict types, and production compilation.
- Keep secrets out of source and use protected deployment environments.

## Current workflow

`.github/workflows/quality.yml` runs on pushes and pull requests to `main`, plus manual dispatch.

1. Check out source.
2. Set up Node.js 22 (compatible with Next.js minimum Node 20.9).
3. Install dependencies on the disposable runner with audit/funding network calls disabled.
4. Run ESLint with zero warnings.
5. Run `tsc --noEmit`.
6. Run `next build`.

Concurrency cancels superseded runs on the same branch, reducing runner time.

## Low-disk developer workflow

1. Edit and commit source without running `npm install` locally.
2. Push a feature branch and open a pull request.
3. Let the Quality checks workflow report lint, type, and build errors.
4. Fix from GitHub logs and push again.
5. Merge only after the required check passes.

No dependency cache is enabled in the current workflow, avoiding repository assumptions about a lockfile and keeping configuration simple. All dependency versions are exact in `package.json`. When storage permits, generate and commit `package-lock.json`, change the install step to `npm ci`, and optionally enable npm caching.

## Recommended branch protection

- Require pull requests before merging to `main`.
- Require the `validate` job to pass.
- Require one approval for production changes.
- Dismiss stale approvals after new commits.
- Block force-pushes and branch deletion.

## Deployment stage (add after hosting is chosen)

- Preview: deploy each pull request to an isolated preview URL.
- Production: deploy only from protected `main` after the quality job passes.
- Use a GitHub `production` Environment with reviewer approval for payment/configuration changes.
- Store hosting, database, email, and payment secrets in the hosting platform/GitHub environment, never in repository files.
- Run database migrations as a separate, observable step before application promotion.
- Verify a health endpoint and perform a checkout smoke test after deployment; roll back automatically on failure.

## Further checks before production

- Unit tests for price, coupon, and order-total rules.
- Playwright smoke tests for browse → product → checkout and all enquiry forms.
- Accessibility checks with axe.
- CodeQL and dependency review.
- Secret scanning and Dependabot.
- Lighthouse budget for mobile performance.

## Payment release controls

Use test credentials in preview and production credentials only in the protected production environment. Verify webhook signatures, idempotency, reconciliation, refunds, and failure paths before enabling live capture.
