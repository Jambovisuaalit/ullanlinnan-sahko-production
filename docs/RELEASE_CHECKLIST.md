# Julkaisun hyväksymislista

## Build ja laadunvarmistus

- [ ] `npm run check`
- [ ] `npm run build`
- [ ] GitHub Actions vihreä
- [ ] Vercel Preview hyväksytty

## Brändi

- [ ] V04 Header Compact byte-for-byte hyväksytty
- [ ] Faviconit byte-for-byte hyväksytty
- [ ] Hyväksytty `USOY_ICON_SPRITE.svg` lisätty
- [ ] Logon minimikoko ja suoja-alue tarkistettu

## Sisältö

- [ ] Ei `VAHVISTETTAVA`-tekstejä julkisessa käyttöliittymässä
- [ ] Yhteystiedot ja aukioloajat tarkistettu
- [ ] Tuotantokuvat ja alt-tekstit hyväksytty
- [ ] Lakisisällöt vastaavat todellisia integraatioita

## Domain ja sähköpostitoimitus

- [x] Lopullinen production-domain vahvistettu: `https://ullanlinnansahko.fi`
- [ ] Domain kytketty canonical Vercel -projektiin ja HTTPS/SSL aktiivinen
- [ ] `www` ohjautuu valittuun canonical-originiin
- [ ] Resend-domain `ullanlinnansahko.fi` DNS-verifioitu
- [ ] USOY:n domain-rajoitettu sending-only Resend API key luotu vasta verifioinnin jälkeen
- [ ] Lomakkeen production-vastaanottaja vahvistettu
- [ ] Oikea E2E-lomakelähetys näkyy vastaanottajan inboxissa ja Resendissä `delivered`

## Tekniikka

- [ ] Lomake vastaanotetaan ja virhetilat testattu
- [ ] Canonical-domain asetettu Vercelin production-ympäristöön
- [ ] `NEXT_PUBLIC_SITE_INDEXABLE=false` säilyy, kunnes kaikki release-portit ovat valmiit
- [ ] robots.txt ja sitemap.xml tarkistettu
- [ ] Redirectit testattu, mukaan lukien `/pienet-sahkotyot-helsinki` → `/sahkoasennukset-ja-vikakorjaukset`
- [ ] 404 palauttaa 404-statuksen
- [ ] Mobiili, tabletti ja desktop tarkistettu
- [ ] Näppäimistö, fokus, 200 % zoom ja reduced motion tarkistettu

## Lopullinen julkaisu

- [ ] Hinnat julkaistaan vain Hannan vahvistamilla euromäärillä
- [ ] Hannan kirjallinen lopullinen hyväksyntä saatu
- [ ] Vasta tämän jälkeen `NEXT_PUBLIC_SITE_INDEXABLE=true`
