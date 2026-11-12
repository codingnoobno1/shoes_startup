# Project Architecture

## 1. Overview

The project uses Next.js 16 App Router, React 19, strict TypeScript, server-rendered routes, and small client components only where interaction or browser persistence is required.

```text
Browser
  ├─ Server-rendered App Router pages
  ├─ Catalog/search/filter client island
  ├─ Product gallery + variant client island
  └─ Admin demo (localStorage, prototype only)
            │
            ▼ production evolution
Next.js server/API layer
  ├─ Authentication and admin authorization
  ├─ Catalog/pricing/order services
  ├─ Payment provider order + webhook verification
  └─ Enquiry validation, persistence, email/CRM
            │
            ▼
PostgreSQL/CMS + payment provider + mail/CRM
```

## 2. Source layout

```text
src/
  app/
    page.tsx                 direct-to-shop home
    product/[slug]/          product details
    checkout/                payment-method handoff
    admin/                   hard-coded operations command centre
    admin/pricing/           pricing/offers/coupons browser-storage prototype
    about/ contact/ become-a-distributor/ work-with-us/ shipping/
    globals.css              design system and responsive styles
  components/
    header, footer, shop, product, forms, UI primitives
  data/
    catalog.ts               typed seed catalog and coupon factory
  lib/
    money.ts                 INR and discount helpers
public/products/             original generated product imagery
docs/                        requirements, architecture, CI/CD
```

## 3. Rendering strategy

- Static/server components render brand, navigation, informational pages, metadata, and catalog seed data.
- Client components own search/filtering, gallery selection, variant selection, form feedback, and prototype admin persistence.
- Product routes are statically generated from catalog slugs.
- Production catalog updates should move to a database or headless CMS with tag-based cache revalidation.

## 4. Data model

### Product

`id`, `slug`, `name`, `category`, `description`, `mrp`, `price`, `offer`, `image`, `gallery`, `sizes`, `colours`, `badge`, `rating`, `reviewCount`, `material`, `care`.

### Dealer coupon (production)

`id`, `code`, `dealerId`, `discountPercent`, `isActive`, `validFrom`, `validUntil`, `maxUses`, `uses`, `createdBy`, `updatedAt`.

### Enquiry (production)

`id`, `type`, `name`, `company`, `email`, `phone`, `city`, `state`, `message`, `consent`, `status`, `createdAt`.

### Order/payment (production)

Separate `Order`, `OrderItem`, `Address`, `PaymentAttempt`, and `PaymentEvent` records. Money is stored as integer paise. Provider webhook event IDs are unique to guarantee idempotency.

## 5. Payment architecture

1. Browser submits cart, address, and coupon to a server endpoint.
2. Server recalculates authoritative prices and validates stock/coupon; the browser total is never trusted.
3. Server creates a pending order and a payment-provider order.
4. Provider-hosted checkout collects UPI/card details.
5. Server verifies the returned signature and independently processes signed webhooks.
6. Order becomes paid only after verified payment success; duplicate webhook events are ignored safely.

The scaffold uses provider-hosted Razorpay Checkout after commercial review. It includes server-side authoritative seed-catalog pricing, order creation, HMAC verification, and a captured-status check, but intentionally contains no live secret. Production launch still requires durable order records and an idempotent verified webhook consumer before fulfilment.

## 6. Administration evolution

The `/admin` command centre is a multi-view UI prototype with hard-coded products, orders, customers, enquiries, analytics, coupon summaries, and settings. `/admin/pricing` persists demo pricing and coupon changes in `localStorage`. Production replaces both adapters with authenticated server actions/API routes and a database/CMS. Use roles such as `catalog_editor`, `operations`, and `admin`, validate changes server-side, and record an audit log.

## 7. Security baseline

- Secrets only in deployment environment variables.
- CSP, secure cookies, CSRF protection for mutations, schema validation, rate limits, and bot protection on public forms.
- Server-side authorization on every admin mutation.
- Provider signature verification using constant-time comparison where applicable.
- No raw card data; use provider-hosted fields/checkout.
- Dependency and CodeQL scanning in CI/CD expansion.

## 8. Scaling path

The catalog is deliberately typed and centralized so moving from seed data to a repository/service interface does not require redesigning page components. Add categories as data, not routes. Images should move to object storage/CDN when the catalog grows.

## 9. Delivery integration path

The current PIN-code checker validates the Indian six-digit format and provides a broad regional estimate from a Haryana dispatch origin. It does not promise courier serviceability. Production should replace the estimator with a logistics aggregator API, store shipment and scan events against the order, subscribe to courier webhooks, and send tracking updates through email and WhatsApp/SMS. The checkout must use the provider response—not the browser estimate—for the final delivery promise and charge.
