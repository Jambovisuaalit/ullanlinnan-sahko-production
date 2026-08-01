# Ullanlinnan Sähkö Oy – kanoninen verkkosivusto

Tämä repository on Ullanlinnan Sähkö Oy:n **ainoa aktiivinen frontend-lähdetotuus**.

- Aktiivinen haara: `main`
- Preview-lähdetotuus: `main`
- Teknologia: Next.js App Router + React + TypeScript
- Asiakkaalle jaettava preview: `https://ullanlinnan-sahko-preview-clean.vercel.app`
- Vercel-preview-projekti: `ullanlinnan-sahko-preview-clean`
- Vanhoja `ullanlinnan-sahko` / `ullanlinnan-sahko-v2` -repoja ei käytetä jatkokehitykseen tai deployhin.
- Vanhoja Ullanlinnan Sähkö -Vercel-projekteja ei pidetä lähdetotuutena eikä niiden URL-osoitteita jaeta asiakkaalle.

## Preview-status 1.8.2026

`main` sisältää asiakkaalle kokeiltavan preview-version ja siitä on julkaistu erillinen noindex-client-preview.

Preview sisältää:

- responsiivisen desktop- ja mobiilinavigaation
- kevennetyn päävalikon: Sähkötyöt / Valaisimet / Myymälä / Meistä / Yhteystiedot
- sähkö-, valaistus-, valaisinkorjaus-, myymälä- ja B2B-polut
- preview-turvallisen yhteydenottolomakkeen, joka ei lähetä henkilötietoja
- hyväksytyn V04 Header Compact -logon
- brändätyt mediapinnat ilman sisäisiä tuotantopaikkamerkintöjä
- `noindex, nofollow` -suojauksen koko previewlle
- vanhan `/pienet-sahkotyot-helsinki`-osoitteen ohjauksen sähköasennukset-sivulle

Vahvistamattomia tuntihintoja tai keksittyjä yrityskuvia ei näytetä previewssä.

## Preview QA

Tarkistettu 1.8.2026:

- Vercel deployment `READY`
- `/` → HTTP 200
- `/sahkoasennukset-ja-vikakorjaukset` → HTTP 200
- `/yhteystiedot` → HTTP 200
- `/app.js` → HTTP 200
- V04 Header Compact -SVG → HTTP 200
- `/pienet-sahkotyot-helsinki` ohjautuu sähköasennukset-sisältöön
- `X-Robots-Tag: noindex, nofollow`
- runtime-virheitä: 0 tarkistushetkellä

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
