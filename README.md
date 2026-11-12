# Luca Brasi International storefront

A mobile-first Next.js App Router storefront for Luca Brasi International. The root URL opens directly to the shop and includes category filtering, rich product cards, product detail galleries, WhatsApp/Facebook sharing, enquiry journeys, a checkout handoff, and a full hard-coded administration command centre at `/admin`.

## Project status

- Source is under `src/app` as requested.
- No dependencies were installed locally and no `node_modules` directory was created.
- GitHub Actions installs dependencies on its temporary runner and performs lint, TypeScript, and production-build checks.
- The `/admin` dashboard uses clearly labelled hard-coded demo records and is ready for later database/service integration.
- Razorpay Checkout order creation and immediate server verification are scaffolded, but live fulfilment requires merchant credentials, durable order storage, and idempotent verified webhooks.

## Local development (optional)

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. For low-disk development, rely on the GitHub Actions workflow instead of installing locally.

## Documentation

- [Requirements](docs/REQUIREMENTS.md)
- [Project architecture](docs/PROJECT_ARCHITECTURE.md)
- [CI/CD plan](docs/CICD.md)
