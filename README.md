# Ullanlinnan Sähkö Oy – kanoninen verkkosivusto

Tämä repository on Ullanlinnan Sähkö Oy:n **ainoa aktiivinen frontend-lähdetotuus**.

- Aktiivinen haara: `main`
- Preview-lähdetotuus: `main`
- Teknologia: Next.js App Router + React + TypeScript
- Vercel-preview: `ullanlinnan-sahko-client-preview`
- Vanhoja `ullanlinnan-sahko` / `ullanlinnan-sahko-v2` -repoja ei käytetä jatkokehitykseen tai deployhin.

## Preview-status 1.8.2026

`main` sisältää asiakkaalle kokeiltavan preview-version:

- responsiivinen desktop- ja mobiilinavigaatio
- kevennetty päävalikko: Sähkötyöt / Valaisimet / Myymälä / Meistä / Yhteystiedot
- sähkö-, valaistus-, valaisinkorjaus-, myymälä- ja B2B-polut
- preview-turvallinen yhteydenottolomake
- hyväksytty V04-logo ja faviconit
- brändätyt mediapinnat ilman sisäisiä tuotantopaikkamerkintöjä
- vanha `/pienet-sahkotyot-helsinki` ohjataan sähköasennukset-sivulle eikä sitä sisällytetä sitemap-indeksointiin

Vahvistamattomia tuntihintoja tai keksittyjä yrityskuvia ei näytetä previewssä.

## Teknologia

- Next.js App Router
- React
- TypeScript
- React Hook Form + Zod
- CSS-design tokenit
- Vercel

## Käynnistys

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Tarkistukset

```bash
npm run check
npm run build:preview
```

Tuotantobuild:

```bash
npm run build
```

## Rakenne

```text
src/
├── app/                 # Reitit, metadata, API ja tekniset tiedostot
├── components/          # Uudelleenkäytettävä käyttöliittymä
├── content/             # Vahvistettu typed content
├── lib/                 # Validointi ja SEO-logiikka
└── styles/              # Design tokenit ja jaetut tyylit
```

## Brändiassetit

V04 Header Compact- ja favicon-exportit sijaitsevat muuttamattomina `public/brand/`-hakemistossa. Niiden eheys on dokumentoitu tiedostossa `docs/V04_INTEGRATED_ASSETS_SHA256.txt`.

## Julkaisuportti lopulliseen tuotantoon

Preview ei tarkoita vielä lopullista handoffia. Ennen tuotantodomainia lisätään:

1. Hannan vahvistamat tuntihinnat
2. Hannan aidot yritys- ja myymäläkuvat
3. lopullinen mobiili- ja desktop-QA
4. lopullinen domain + canonicalit
5. lomakkeen tuotantolähetys
6. kirjallinen asiakashyväksyntä

## Dokumentaatio

- `CONTRIBUTING.md`
- `SECURITY.md`
- `docs/DEPLOYMENT.md`
- `docs/RELEASE_CHECKLIST.md`
- `docs/DESIGN_TO_CODE_MAPPING.md`
- `docs/FIGMA_UNDEFINED_BEHAVIOR.md`
- `docs/QA_CHECKLIST.md`
- `docs/VERCEL_PREVIEW_RESULT.md`
