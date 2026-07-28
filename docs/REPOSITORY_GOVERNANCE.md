# Repository Governance

## Intended canonical repository

`Jambovisuaalit/ullanlinnan-sahko-production` is the intended private production and client-handoff repository after acceptance.

`Jambovisuaalit/ullanlinnan-sahko` currently contains the newest development history and must not be treated as a separate long-term production source of truth. Before final release, the approved code state must be reconciled into this private repository and verified by CI.

## Branch policy

- `main` contains only approved and releasable changes.
- All changes use pull requests.
- Required checks: content validation, frontend validation, typecheck, lint and production build.
- Direct production edits and direct pushes to `main` are prohibited operationally.
- A failed CI run blocks merge and release.

## Release policy

Every release must have:

- one release commit SHA
- one semantic version tag
- one matching Vercel deployment
- a completed release checklist
- rollback instructions
- client approval where the release changes visible content or brand assets

## Asset policy

Only approved V04 logo assets are accepted. Brand files are not reconstructed, recolored or replaced without approval. Real business images require documented usage rights and alt text.

## Content policy

Verified company data is centralized. `VAHVISTETTAVA`, `TBD`, `TODO` and placeholder content must not reach production. Prices, response times, availability and emergency-service claims require explicit confirmation.

## Client access

Client access is granted only after the ownership and maintenance model is agreed. Default client access is read-only until responsibilities for code, deployment, domain and secrets are documented.
