# Vercel-julkaisu

## Projektiasetus

- Framework preset: Next.js
- Node.js: 22.x
- Install command: `npm install --no-fund`
- Build command: `npm run build`
- Output directory: Next.js default

## Preview

Vercel asettaa `VERCEL_ENV=preview` ja `VERCEL_URL` automaattisesti. Preview käyttää demolomaketta eikä vaadi lopullista domainia tai tuotannon viestinvälitystä. Vahvistamattomat production-ominaisuudet pidetään oletuksena pois päältä.

## Production-portti

Tuotantobuild estetään, jos pakollinen julkaisutieto puuttuu tai feature gate aktivoidaan ilman sille vaadittua vahvistettua arvoa.

Pakolliset production-arvot:

- `NEXT_PUBLIC_SITE_URL`
- täydellinen Resend-konfiguraatio (`RESEND_API_KEY`, `CONTACT_FORM_FROM`, `CONTACT_FORM_RECIPIENT`) **tai** vahvistettu HTTPS `CONTACT_FORM_WEBHOOK_URL`
- hyväksytyt V04-logo- ja favicon-assetit
- vaaditut brändi-ikonit

## Production-ympäristömuuttujat

```text
# Lopullinen domain
NEXT_PUBLIC_SITE_URL=https://LOPULLINEN-DOMAIN

# Hinnasto: pidä false, kunnes Hanna vahvistaa tarkan hinnan ja esitystavan
NEXT_PUBLIC_ENABLE_PRICING=false
ELECTRICIAN_HOURLY_RATE_DISPLAY=

# Lomakkeen kuvaliitteet: pidä false, kunnes käsittely- ja tietosuojamalli on hyväksytty
NEXT_PUBLIC_ENABLE_CONTACT_ATTACHMENTS=false

# Ensisijainen tuotannon sähköpostikuljetus
RESEND_API_KEY=
CONTACT_FORM_FROM=
CONTACT_FORM_RECIPIENT=

# Vaihtoehtoinen legacy-kuljetus vain tarvittaessa
CONTACT_FORM_WEBHOOK_URL=

# Ei koskaan true productionissa
CONTACT_FORM_DEMO_MODE=false

# GA4: pidä false, kunnes käyttöönotto on hyväksytty
NEXT_PUBLIC_ENABLE_GA4=false
NEXT_PUBLIC_GA4_MEASUREMENT_ID=

# Julkaistaan vain hyväksytyn sisällön perusteella
NEXT_PUBLIC_ENABLE_FAQ_PAGE=false
NEXT_PUBLIC_LEGAL_CONTENT_APPROVED=false
```

## Feature gate -säännöt

### Hinnasto

Hinnasto renderöidään vain, kun:

1. `NEXT_PUBLIC_ENABLE_PRICING=true`
2. `ELECTRICIAN_HOURLY_RATE_DISPLAY` sisältää Hannan hyväksymän tarkan esitysmuodon.

Arvoon voidaan sisällyttää esimerkiksi ALV- tai yksikköteksti vain, jos se on erikseen vahvistettu. Koodi ei muodosta tai päättele hintaa.

### Lomakkeen kuvaliitteet

Kuvaliitekenttä ja tiedostojen server-käsittely aktivoituvat vain, kun:

`NEXT_PUBLIC_ENABLE_CONTACT_ATTACHMENTS=true`

Kun gate on `false`, selain ei näytä liitekenttää ja API hylkää mahdolliset väkisin lähetetyt liitteet.

### GA4

GA4 aktivoituu vain, kun kaikki seuraavat täyttyvät:

1. `NEXT_PUBLIC_ENABLE_GA4=true`
2. `NEXT_PUBLIC_GA4_MEASUREMENT_ID` on kelvollinen `G-...`-tunnus
3. `NEXT_PUBLIC_LEGAL_CONTENT_APPROVED=true`
4. käyttäjä antaa analytiikkasuostumuksen käyttöliittymässä.

GA4-skriptiä ei ladata ennen suostumusta. Lomakkeen nimeä, sähköpostia, puhelinnumeroa tai viestisisältöä ei lähetetä analytiikkaan.

## Vanha sähkötyö-URL

`/pienet-sahkotyot-helsinki` on poistettu varsinaisesta sivurakenteesta ja palauttaa eksplisiittisen HTTP **301** -uudelleenohjauksen osoitteeseen:

`/sahkoasennukset-ja-vikakorjaukset`

Reittiä ei lisätä navigaatioon tai sitemapiin.

## Julkaisematta jätettävät arvot ennen Hannan vahvistusta

- sähkömiehen tarkka tuntihinta ja mahdolliset muut veloitukset
- lopullinen domain
- tuotantolomakkeen vastaanottaja
- lomakkeen kuvaliitteiden käyttöönotto
- GA4:n käyttöönotto ja Measurement ID

FAQ- ja lakisisällöt aktivoidaan vain hyväksytyn sisällön perusteella.
