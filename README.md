# Ullanlinnan Sähkö Oy – tuotantofrontend

Next.js App Router-, React- ja TypeScript-toteutus Ullanlinnan Sähkö Oy:n hyväksytyn design- ja sisältöjärjestelmän pohjalta.

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

Tuotantobuild vaatii lopullisen canonical-domainin, lomakkeen HTTPS-vastaanottajan sekä hyväksytyn ikonikirjaston.

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

Avoin tuotantoportti:

```text
public/brand/icons/USOY_ICON_SPRITE.svg
```

Puuttuvaa ikonikirjastoa ei rekonstruoida tai korvata toisella ikoniperheellä.

## Dokumentaatio

- `CONTRIBUTING.md`
- `SECURITY.md`
- `docs/DEPLOYMENT.md`
- `docs/RELEASE_CHECKLIST.md`
- `docs/DESIGN_TO_CODE_MAPPING.md`
- `docs/FIGMA_UNDEFINED_BEHAVIOR.md`
- `docs/QA_CHECKLIST.md`
- `docs/VERCEL_PREVIEW_RESULT.md`
