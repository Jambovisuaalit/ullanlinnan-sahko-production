# V04-asset-integraation raportti

**Paketti:** `USOY_NEXTJS_PRODUCTION_FRONTEND_V02_BRAND_ASSETS_2026-07-24`  
**Integrointipäivä:** 24.7.2026  
**Lähde:** `USOY_LOGO_PACKAGE_V04_2026-07-22(1).zip`

## Tulos

Seuraavat hyväksytyt V04-exportit on kopioitu frontendin `public/brand/`-hakemistoon muuttamatta tiedostosisältöä, SVG-polkuja, värejä, viewBoxia, kuvasuhdetta tai tiedostonimeä:

| Asset | Lähde V04-paketissa | SHA-256 |
|---|---|---|
| `USOY_LOGO_HEADER_COMPACT_BLACK_RGB_SVG.svg` | `06_WEB/` | `85f907e30351680690ed6a88dda39ea4e92811657812ca89c95555fd21754ed0` |
| `USOY_LOGO_HEADER_COMPACT_PAPER_RGB_SVG.svg` | `06_WEB/` | `a782f5ce8ac77c4f6a8974f23e9d830590e9fd2c2b60203d7e45b8fa0be3bf34` |
| `USOY_LOGO_FAVICON_BLACK_ON_PAPER_RGB_SVG.svg` | `09_FAVICON/` | `a5ca94e85acf31302a2c65b0ef56b80bb9126664f0a6b127a05991f1a7920990` |
| `USOY_LOGO_FAVICON_BLACK_ON_PAPER_ICO_MULTI.ico` | `09_FAVICON/` | `8c9eb4ee4be8eaa45075c8aba6503871cca05c69d56d954ba75628e66f862423` |
| `USOY_LOGO_APPLE_TOUCH_BLACK_ON_PAPER_PNG_180X180.png` | `09_FAVICON/` | `50d397ca617f34ac4c232f757c69ecf7a6277d5fcffddec10f6df253a0b822c4` |
| `USOY_LOGO_FAVICON_BLACK_ON_PAPER_PNG_192X192.png` | `09_FAVICON/` | `0e767b9875690feb02b3f5a4fa41ee3624a990e3db4d980879ed4a53d19f4221` |

## Lähdepaketin eheys

- ZIP: 191 varsinaista tiedostoa
- V04-manifestin merkinnät: 190
- Puuttuvat manifestitiedostot: 0
- SHA-256-poikkeamat: 0
- Paketin oma manifesti ei luetteloi itseään, mikä selittää 191/190-erotuksen.

## Logo-ohjeen toteutus

- Header käyttää vain hyväksyttyä `HEADER_COMPACT`-versiota.
- React-komponentti viittaa ulkoiseen SVG-assetiin eikä piirrä tai rakenna logoa tekstinä.
- Tiedoston kuvasuhdetta ei muuteta.
- Käyttöliittymän tulee säilyttää Header Compact -version vähintään 160 px digitaalinen leveys ja 0,5x suoja-alue.

## Avoin tuotantoportti: ikonikirjasto

Ladattu V04-logopaketti ei sisällä tiedostoa:

`public/brand/icons/USOY_ICON_SPRITE.svg`

Frontend odottaa seuraavia hyväksytyn ikonikirjaston symboleita:

`arrow`, `bolt`, `bulb`, `wrench`, `store`, `building`, `home`, `check`, `phone`, `mail`, `pin`, `clock`, `image`, `menu`, `close`, `chevron`.

Spriteä ei ole generoitu prototyyppien inline-SVG:istä eikä puuttuvia ikoneita ole piirretty uudelleen. Tuotantobuild pysyy tarkoituksellisesti estettynä, kunnes hyväksytyn USOY Icon Libraryn alkuperäinen export toimitetaan.

## Julkaisuympäristöt

- GitHub-repository: `Jambovisuaalit/ullanlinnan-sahko-production`. Lähdekoodi ylläpidetään versionhallittuna tuotantorakenteena.
- Vercel-projekti: `ullanlinnan-sahko-production`. Git-kytkentä ja tuotantoympäristömuuttujat vahvistetaan ennen production-julkaisua.
- Supabasea ei käytetä näiden staattisten brändiassetien tallennukseen. Assetit kuuluvat versionhallittuun `public/brand/`-hakemistoon.
