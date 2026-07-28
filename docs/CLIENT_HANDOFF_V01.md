# Ullanlinnan Sähkö Oy – Client Handoff V01

**Date:** 2026-07-28  
**Repository:** `Jambovisuaalit/ullanlinnan-sahko-production`  
**Status:** Client review package; not yet final production acceptance.

## Delivered scope

- Next.js App Router + React + TypeScript frontend
- responsive MVP pages and reusable service-page structure
- centralized content and design tokens
- accessible desktop and mobile navigation
- React Hook Form + Zod validation
- metadata, canonical URLs, Open Graph, robots, sitemap and JSON-LD
- approved V04 brand assets
- deployment, QA and release documentation

## Client review material

The client-facing Drive package is the authoritative review surface for brand, content and approval decisions. Internal notes, rejected versions, secrets and unfinished experiments are excluded from the package.

## Open release gates

1. Approved current business and service photography with alt text.
2. Final production domain and DNS plan.
3. Confirmed production contact-form receiver and end-to-end test.
4. Final privacy, cookie and accessibility texts based on the actual production configuration.
5. Green CI and production build for the final release commit.
6. Written client approval.

## Final release evidence

The final handoff must record:

- release commit SHA
- Git tag and version
- Vercel deployment ID
- production domain
- CI/build result
- environment-variable inventory without secret values
- rollback procedure
- repository access or ownership-transfer decision
- signed acceptance record

## Security boundary

Do not commit or deliver `.env` files, API keys, passwords, customer form submissions or other personal data. Client access is granted only after the repository and production ownership model has been approved.
