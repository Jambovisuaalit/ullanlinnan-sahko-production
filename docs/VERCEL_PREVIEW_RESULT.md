# Vercel-preview – 24.7.2026

## Uusi projekti

- Projekti: `ullanlinnan-sahko-production`
- Project ID: `prj_YXVCZuZnVJ4aNDQtWWAYoQeytZMt`
- Deployment ID: `dpl_3xd1fXGjkoS3UftBnTPtXdMKtT9G`
- Tila: `READY`

## Läpäistyt portit

- V04 Header Compact- ja favicon-assetit löytyvät
- sisältövalidointi: 13 tiedostoa
- frontend-rakennevalidointi: 70 lähdetiedostoa
- Next.js-käännös
- TypeScript-tyyppitarkistus
- 21 App Router -reittiä generoitu
- staattiset sivut ja dynaaminen `/api/contact` muodostettu

## Tuotantoportti

Preview on hyväksytty teknisesti, mutta production-julkaisu on tarkoituksellisesti estetty, kunnes seuraavat ovat valmiit:

1. hyväksytty `public/brand/icons/USOY_ICON_SPRITE.svg`
2. lopullinen HTTPS-domain `NEXT_PUBLIC_SITE_URL`
3. vahvistettu HTTPS-lomakevastaanottaja `CONTACT_FORM_WEBHOOK_URL`
4. lakisisältöjen ja FAQ-sivun julkaisupäätökset

Puuttuvaa ikonikirjastoa ei rekonstruoida eikä korvata toisella ikoniperheellä.
