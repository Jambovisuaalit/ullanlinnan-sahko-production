# Kehityskäytäntö

## Haarat

- `main` on julkaistava päähaara.
- Muutokset tehdään lyhytikäisillä `feat/`, `fix/`, `chore/` tai `docs/` -haaroilla.
- Muutokset yhdistetään pull requestilla squash-mergellä.

## Pakolliset tarkistukset

```bash
npm install
npm run check
npm run build:preview
```

## Sisältö

- Älä keksi hintoja, saatavuutta, vasteaikoja, arvioita tai arvosteluja.
- Käytä keskitettyjä `src/content/`-tiedostoja.
- Merkitse puuttuva tieto dokumentaatiossa `VAHVISTETTAVA`; älä julkaise sitä sivulla faktana.

## Brändiassetit

- Logo- ja favicon-tiedostoja ei muokata.
- Hyväksytty ikonikirjasto lisätään alkuperäisenä tiedostona.
- Assettien eheys tarkistetaan `npm run verify:assets` -komennolla.
