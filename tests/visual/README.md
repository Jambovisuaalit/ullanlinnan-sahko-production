# Visuaaliset regressiotestit

Playwright ottaa hyväksytyt kuvavertailut kolmessa näkymässä:

- `mobile-320`: 320 × 740 px
- `tablet-768`: 768 × 1024 px
- `desktop-1440`: 1440 × 1000 px

Testattavat sivut ovat etusivu, valaisinkorjaus ja myymälä. Lisäksi testit varmistavat, ettei sivu ylitä viewportin leveyttä, Palvelut-valikko on suljettu ensilatauksessa ja oikea navigaatiotila avautuu aktiivisessa breakpointissa.

## Ensimmäinen hyväksytty baseline

Asenna Chromium ja generoi kuvapohjat samassa Linux-ympäristössä, jossa vertailut ajetaan:

```bash
npm install
npm run test:visual:install
npm run test:visual:update
```

Tarkista generoidut PNG-kuvat hakemistosta `tests/visual/__snapshots__` ja committaa vain hyväksytyt baselinet.

## Vertailu

```bash
npm run test:visual
```

Playwright tallentaa poikkeamat `test-results`-hakemistoon ja HTML-raportin `playwright-report`-hakemistoon. Kuvavertailut kannattaa ajaa vakioidussa Linux-kontissa, koska fontti- ja selainrenderöinti voi poiketa käyttöjärjestelmien välillä.
