# mosaic.resin catalogue

A UI-first catalogue showcase for a handmade resin arts business. The current phase uses local mock data and placeholder visuals so the customer experience can be refined before real product images and backend services are connected.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful checks:

```bash
npm run lint
npm run build
npm run test
```

## Product experience

The catalogue supports five core product areas: Jewellery, Preservation, Decorative Arts, Fridge Magnets, and For Pooja. Occasion pages curate products from those canonical categories, so a Diwali pooja thali can appear in both the Pooja category and the Diwali collection without duplicating product records.

Replace the placeholder product visuals in `public/images` and the mock records in `src/data/mock-catalog.ts` when real images and product details are ready. The public brand name, wording, and WhatsApp number are intentionally easy to replace.

## Inquiry configuration

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` in a local `.env.local` file using international digits only. This app does not implement checkout, payments, orders, inventory synchronization, real OTP, phone storage, or the WhatsApp Business API. Inquiry links are frontend-only click-to-chat links.

## Future AWS seams

The mock data layer is kept in `src/data`, with domain types in `src/types` and inquiry URL construction in `src/lib`. Future adapters can replace these seams with API Gateway/Lambda repositories, DynamoDB persistence, S3/CloudFront image URLs, Cognito OTP, and CloudWatch observability without changing the main customer-facing route structure.

A future protected `/admin` workspace can add category CRUD, product CRUD, variant management, image uploads, lead lists, inquiry events, role-based access, and audit logs. The current `/admin` route is only a placeholder.

## Scope boundary

Phase 1 creates no AWS resources and stores no production customer information. All content is mock/demo content until the business data and service contracts are approved.
