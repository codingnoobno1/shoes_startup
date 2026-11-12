# Luca Brasi International — Website Requirements

## 1. Purpose

Build a premium, mobile-first ecommerce storefront that takes visitors directly to products, supports frequent pricing and offer changes, collects business enquiries, and is ready for secure advance-payment integration.

## 2. Users and roles

| Role | Primary needs |
| --- | --- |
| Customer | Discover products, choose variants, review pricing, share products, and pay online. |
| Dealer customer | Apply an active dealer coupon during checkout. |
| Prospective distributor/associate | Submit a simple business enquiry. |
| Store administrator | Update MRP, selling price, discount, offer title, and dealer coupon status. |

## 3. Functional requirements

### FR-01 — Direct shopping entry

- `/` must open the shopping experience; no splash page or required intermediary click.
- The first viewport must expose products/categories and a clear shop action.

### FR-02 — Product categories

- Launch categories: Men’s Leather Shoes, Shirts, Blazers, Vests, and Innerwear.
- The data model and navigation must support at least 10 categories without redesign.

### FR-03 — Product catalog and detail

- Product list uses familiar marketplace patterns: product image, name, rating/status, MRP, selling price, discount, colour summary, size summary, and offer label.
- Product detail provides a 4–5 item gallery, description, sizes, colours, quantity, price, savings, delivery reassurance, and purchase CTA.
- Sold-out variants must be disable-able in the production catalog.

### FR-04 — Product sharing

- Product detail provides WhatsApp and Facebook share links.
- Shared content includes product name and canonical product URL.

### FR-05 — Pricing administration

- Authorized administrators can change MRP, selling price, and discount.
- Selling price must be positive and cannot exceed MRP.
- Discount displayed to customers is derived from MRP and selling price to prevent inconsistent values.

### FR-06 — Promotions

- Administrators can change the active offer title (for example Startup Offer, Launch Offer, or Limited Period Offer).
- Daily price/offer changes should publish without a code deployment once a production CMS/database is connected.

### FR-07 — Dealer coupons

- Seed 20 unique dealer coupon records.
- Each coupon has code, dealer name, discount percentage, active/inactive status, optional validity dates, and usage limits.
- Coupons are inactive until a dealer is appointed.

### FR-08 — Brand and responsive experience

- Premium royal/midnight-blue surfaces, white text, and restrained gold accents.
- Mobile-first responsive layout with keyboard-accessible controls, visible focus states, sufficient colour contrast, and reduced-motion support.

### FR-09 — Navigation

- Required destinations: About Us, Contact Us, Shop Now, Become a Distributor, and Work With Us.
- Header remains usable on small screens and includes a direct shop link.

### FR-10 — Business opportunities

- Distributor and business-associate enquiry form includes name, company, phone, email, city/state, interest, investment range (optional), and message.
- Production submission must validate, rate-limit, persist, and notify the business team.

### FR-11 — Contact information

- Luca Brasi International
- 218, Lakshmi Garden, Yamuna Nagar, Haryana
- lucabrasiinternational@gmail.com

### FR-12 — Advance payment

- Checkout supports UPI, Google Pay where provider/device supports it, debit cards, and credit cards.
- Payment creation and signature verification occur server-side through a PCI-compliant payment provider.
- Orders are confirmed only after a verified provider callback/webhook.
- Raw card details must never be stored or pass through Luca Brasi application servers.

### FR-13 — Administration security

- Production admin routes require authenticated role-based access.
- Pricing/coupon changes are auditable with actor, timestamp, old value, and new value.

### FR-14 — Pan-India delivery

- Present estimated dispatch and delivery bands from Yamuna Nagar, Haryana.
- Let customers enter a valid six-digit Indian PIN code for a preliminary regional estimate.
- Confirm exact PIN-code serviceability, courier, charge, and promised date through a production logistics API before order placement.
- Provide shipment milestones and a courier tracking link after dispatch.
- Notify customers through email and WhatsApp/SMS when order confirmation, dispatch, out-for-delivery, delivery, or exception events occur.
- Clearly explain remote-area delays, delivery attempts, address-change limitations, and visibly damaged parcel handling.

## 4. Non-functional requirements

- Next.js App Router with application source in `src/app`.
- Strict TypeScript and linting.
- Responsive target: 320 px through large desktop, including safe-area handling, touch-sized controls, horizontal table containment, and no iOS input zoom.
- Use optimized images, semantic HTML, and sensible metadata.
- Target Core Web Vitals: LCP under 2.5 s, INP under 200 ms, CLS under 0.1 at the 75th percentile after production optimization.
- Do not expose secrets to the browser or repository.
- CI is the source of truth for lint, type-check, and build because the local machine has limited disk.

## 5. MVP acceptance criteria

- Opening `/` shows a polished shopping catalog immediately.
- All five launch categories can be filtered.
- Every seeded product shows MRP, sale price, savings, available sizes, colours, and an offer.
- A product detail route includes gallery controls, variant selection, WhatsApp/Facebook sharing, and a checkout CTA.
- Distributor, careers, and contact routes contain usable enquiry forms.
- `/admin` provides a responsive hard-coded operations dashboard for products, orders, customers, enquiries, coupons, and settings, clearly labelled as demo data.
- `/admin/pricing` demonstrates price, offer, and 20-coupon management in browser storage and clearly labels itself as a prototype.
- `/shipping` explains Pan-India dispatch, indicative delivery bands, tracking milestones, and serviceability limitations.
- Theme Studio includes a marketplace-style homepage option with a large promotional tile, category cards, deal tiles, and mobile swipe discovery while retaining Luca Brasi branding.
- GitHub Actions runs lint, strict TypeScript checks, and a production build.

## 6. Explicit MVP boundaries

The scaffold includes realistic UI, browser-persisted administration for demonstration, and an inactive Razorpay server integration that can create and immediately verify provider orders after credentials are supplied. Before production launch, connect a database/CMS, authentication, email/CRM delivery, durable inventory/order services, idempotent webhook processing, legal policies, shipping/tax rules, and production analytics.

The MVP ships one original catalog image per launch product and presents five detailed gallery crops. The `gallery` field already accepts five distinct asset paths, which should replace the crop set when final front/side/back/detail photography is supplied.
