# Ullanlinnan Sähkö Oy — release checklist

**Status:** `CODE COMPLETE / RELEASE BLOCKED`  
**Päivitetty:** 3.8.2026  
**Canonical repository:** `Jambovisuaalit/ullanlinnan-sahko-production`  
**Canonical branch:** `main`  
**Canonical Vercel project:** `ullanlinnan-sahko-preview-clean`

Tätä listaa käytetään release-porttina. Production-julkaisua ei tehdä ennen kuin kaikki pakolliset kohdat on todistettu konkreettisella evidenssillä.

## 1. Repository ja build

- [x] Yksi canonical GitHub-repository määritetty
- [x] `main` on frontendin lähdetotuus
- [x] PR #29 yhdistetty — configurable production gates
- [x] PR #30 yhdistetty — production feature gate -ohjeistus
- [x] Frontend-lock CI läpäissyt tarkistukset
- [x] Preview-build onnistuu
- [x] 27/27 App Router -reittiä generoitu uusimmassa canonical preview-buildissa
- [ ] Lopullinen production-build onnistuu production-arvoilla

### Evidenssi

- Frontend lock: `088e9059712cda5a2ea092d4e30ffd0199b3304d`
- Deployment docs: `5539b103e6d94276445d86a4365f7dde661c0059`
- Uusin onnistunut canonical preview-build: `dpl_6ta5qjTffGaxnJM1qhGhGEXX4BCe`

## 2. Vercel preview ja canonical deployment

- [x] Vercel-projekti `ullanlinnan-sahko-preview-clean` tunnistettu canonical-projektiksi
- [x] Stable client-preview `https://ullanlinnan-sahko-preview-clean.vercel.app` palauttaa HTTP 200
- [ ] Stable client-preview palvelee uusinta canonical `main` -versiota
- [ ] Uusin canonical preview on asiakkaan avattavissa ilman väärää 404-tulkintaa
- [ ] Stable aliasin deployment ID kirjattu tähän dokumenttiin julkaisun jälkeen
- [ ] Vanhoja Ullanlinnan Sähkö -Vercel-projekteja ei käytetä canonical-, sitemap- tai asiakaslinkkeinä

### Nykyinen poikkeus

Stable alias osoittaa tällä hetkellä deploymentiin:

`dpl_BysQSSg4DRxYpQbZvqYo3cVSW86W`

Uusin onnistunut canonical `main` -preview on:

`dpl_6ta5qjTffGaxnJM1qhGhGEXX4BCe`

Uusin deployment on suojattu eikä sitä ole vielä nostettu stable client-preview -aliasin taakse. Tätä seurataan GitHub issue #32:ssa.

## 3. Preview QA

Kun stable alias on päivitetty uusimpaan canonical previewhin, varmista:

- [ ] `/` → HTTP 200
- [ ] `/sahkoasennukset-ja-vikakorjaukset` → HTTP 200
- [ ] `/valaisimien-korjaus` → HTTP 200
- [ ] `/myymala` → HTTP 200
- [ ] `/yhteystiedot` → HTTP 200
- [ ] `/robots.txt` → HTTP 200
- [ ] `/sitemap.xml` → HTTP 200
- [ ] `/pienet-sahkotyot-helsinki` → HTTP 301 → `/sahkoasennukset-ja-vikakorjaukset`
- [ ] Preview käyttää `noindex,nofollow`
- [ ] Runtime errorit = 0 hyväksyntähetkellä

## 4. Brändi ja sisältö

- [x] V04-logo on hyväksytty tuotantostandardi
- [x] Header Compact on verkkosivun navigaatioversio
- [x] Päävärit lukittu: `#1A1A1A`, `#FBF9F5`, `#D4A359`, `#4A554A`
- [x] Navigaatio lukittu: Sähkötyöt / Valaisimet / Myymälä / Meistä / Yhteystiedot
- [x] `pienet sähkötyöt` poistettu näkyvästä positioinnista
- [x] Vanha SEO-URL toteutettu 301-ohjauksena
- [ ] Hannan vahvistamat hinnat lisätty
- [ ] Tuotantokuvat ja alt-tekstit hyväksytty
- [ ] Ei `VAHVISTETTAVA`-tekstejä julkisessa käyttöliittymässä
- [ ] Yhteystiedot ja aukioloajat tarkistettu lopullisessa productionissa

## 5. Domain ja SEO

Production-build on tarkoituksella fail-closed ilman lopullista domainia.

- [ ] Lopullinen HTTPS-domain vahvistettu
- [ ] DNS-omistajuus hallinnassa
- [ ] `NEXT_PUBLIC_SITE_URL` asetettu täsmälleen lopulliseen origin-osoitteeseen
- [ ] Canonicalit osoittavat lopulliseen domainiin
- [ ] Open Graph -URL:t osoittavat lopulliseen domainiin
- [ ] Structured data käyttää lopullista domainia
- [ ] `sitemap.xml` käyttää lopullista domainia
- [ ] `robots.txt` tarkistettu production-ympäristössä
- [ ] Search Console / muu hakukoneomistus kytketty tarvittaessa

## 6. Lomaketoimitus

Production vaatii yhden oikean toimitustavan:

### Vaihtoehto A — Resend

- [ ] `RESEND_API_KEY` asetettu
- [ ] `CONTACT_FORM_FROM` vahvistettu
- [ ] `CONTACT_FORM_RECIPIENT` vahvistettu
- [ ] Lähettäjädomain vahvistettu Resendissä
- [ ] Oikea end-to-end testiviesti vastaanotettu

### Vaihtoehto B — HTTPS webhook

- [ ] `CONTACT_FORM_WEBHOOK_URL` asetettu vahvistettuun HTTPS-endpointiin
- [ ] Endpoint hyväksyy production-payloadin
- [ ] Oikea end-to-end testiviesti vastaanotettu

### Yhteiset lomakeportit

- [ ] Virhetila testattu
- [ ] Loading-tila testattu
- [ ] Kaksoislähetyksen esto testattu
- [ ] Henkilötietoja ei lähetetä analytiikkaan
- [ ] Kuvaliitteet joko hyväksytty tuotantoon tai feature gate `false`

## 7. Hinnoittelu

- [ ] Sähkömiehen tarkka tuntihinta vahvistettu
- [ ] ALV-esitystapa vahvistettu
- [ ] Mahdollinen minimiveloitus vahvistettu tai jätetty julkaisematta
- [ ] Mahdollinen käynti-/matkaveloitus vahvistettu tai jätetty julkaisematta
- [ ] Materiaalien veloitusperiaate vahvistettu tai jätetty julkaisematta
- [ ] `NEXT_PUBLIC_ENABLE_PRICING=true` vasta kun julkaistavat hinnat ovat hyväksyttyjä
- [ ] `ELECTRICIAN_HOURLY_RATE_DISPLAY` vastaa täsmälleen Hannan hyväksymää tekstiä

## 8. Kuvat

- [ ] Oikea työtilannekuva
- [ ] Valaisimen korjauskuva
- [ ] Valmis sähkö-/valaisinasennus
- [ ] Ajantasainen myymäläkuva
- [ ] Pietarinkadun julkisivu / sisäänkäynti
- [ ] Kaikilla julkaistavilla kuvilla tarkoituksenmukainen alt-teksti
- [ ] Ei geneerisiä stock-kuvia tai generoituja yrityskuvia

## 9. Analytiikka ja lakisisällöt

- [ ] GA4-päätös tehty
- [ ] Jos GA4 ei tule launchiin: `NEXT_PUBLIC_ENABLE_GA4=false`
- [ ] Jos GA4 tulee launchiin: Measurement ID vahvistettu ja suostumuspolku testattu
- [ ] Tietosuojaseloste vastaa todellista production-stäkkiä
- [ ] Evästekäytäntö vastaa todellista production-stäkkiä
- [ ] Lakisisällöissä ei mainita integraatioita tai käsittelyä, joita ei oikeasti käytetä

## 10. Responsiivisuus ja saavutettavuus

- [ ] 390 px mobiili QA
- [ ] 768 px tablet QA
- [ ] 1024 px tablet QA
- [ ] 1440 px desktop QA
- [ ] Ei vaakasuuntaista overflow'ta
- [ ] Mobiilidrawer, focus trap, Escape ja fokuspalautus testattu
- [ ] `tel:`-linkit testattu
- [ ] Kartta-/reittiohjelinkit testattu
- [ ] Näppäimistökäyttö testattu
- [ ] 200 % zoom testattu
- [ ] Reduced motion testattu
- [ ] 404 palauttaa oikean 404-statuksen

## 11. Hyväksyntä ja production

- [ ] Hanna saanut uusimman stable preview -linkin
- [ ] Hanna hyväksynyt hinnat
- [ ] Hanna hyväksynyt lopulliset kuvat
- [ ] Hanna antanut yhden kirjallisen lopullisen hyväksynnän
- [ ] Production deployment ID kirjattu
- [ ] Production domain kirjattu
- [ ] Rollback-kelpoinen edellinen deployment tunnistettu
- [ ] Lomakkeen oikea toimitus todistettu
- [ ] Production runtime errorit = 0 hyväksyntähetkellä

## CLOSED-kriteeri

Vasta kaikkien pakollisten porttien täytyttyä:

`Website status: DELIVERED / CLOSED`

Lopullinen production-versio lukitaan lähdetotuudeksi. Vanhoja Vercel-preview- tai production-URL-osoitteita ei käytetä asiakkaalle, canonicaleissa tai sitemapissa.
