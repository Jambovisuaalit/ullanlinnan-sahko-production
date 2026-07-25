# Vercel-julkaisu

## Projektiasetus

- Framework preset: Next.js
- Node.js: 22.x
- Install command: `npm install --no-fund`
- Build command: `npm run build`
- Output directory: Next.js default

## Preview

Vercel asettaa `VERCEL_ENV=preview` ja `VERCEL_URL` automaattisesti. Preview-build sallii puuttuvan hyväksytyn ikonikirjaston vain varoituksena. Logo- ja favicon-assetit ovat silti pakollisia.

## Production

Tuotantojulkaisu estetään, kun jokin seuraavista puuttuu:

- `NEXT_PUBLIC_SITE_URL`
- `CONTACT_FORM_WEBHOOK_URL`
- `public/brand/icons/USOY_ICON_SPRITE.svg`
- hyväksytyt V04 Header Compact- ja favicon-assetit

## Tuotannon ympäristömuuttujat

```text
NEXT_PUBLIC_SITE_URL=https://LOPULLINEN-DOMAIN
CONTACT_FORM_WEBHOOK_URL=https://VAHVISTETTU-VASTAANOTTAJA
NEXT_PUBLIC_ENABLE_FAQ_PAGE=false
NEXT_PUBLIC_LEGAL_CONTENT_APPROVED=false
```

FAQ-sivu ja lakisisältö otetaan käyttöön vasta erillisellä hyväksynnällä.
