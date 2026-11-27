# Toiminnallinen julkaisuportti – 27.11.2026

Tila: NO-GO. Visuaalinen toteutus hyväksytty commitissa 5ddc20e. Tämä dokumentti ei ole tietosuojan hyväksyntä eikä julkaisulupa.

## Tuotannon edellytykset

- Resend: send.ullanlinnansahko.fi verified, lähetys käytössä. Vercel Production: RESEND_API_KEY puuttuu. Lisää lähetykseen rajattu avain suoraan Verceliin, ei lähdekoodiin tai keskusteluun.
- CONTACT_FORM_FROM ja CONTACT_FORM_RECIPIENT ovat olemassa. Vastaanottaja on vahvistettava yrityksen hallinnassa olevaksi ja sen käyttöoikeudet tarkistettava.
- Julkaise valmis tietosuojaseloste ja lisää linkki kaikkiin kolmeen lomakkeeseen ennen oikeiden henkilötietojen keräämistä. Älä aktivoi NEXT_PUBLIC_LEGAL_CONTENT_APPROVED -lippua pelkän luonnoksen perusteella.
- Säilytä CONTACT_FORM_DEMO_MODE=false tuotannossa; preview ei saa lähettää oikeita viestejä. Lomakkeet, liitteet, analytiikka ja indeksointi avataan vasta omien hyväksyntöjensä jälkeen.
- Verkkokauppa pysyy tuotekategoriapohjana ja noindex-tilassa. Ei maksuja tai tilausten vastaanottoa.

## Tietosuojaselosteen luonnos (EI JULKAISTAVAKSI)

Rekisterinpitäjä: Ullanlinnan Sähkö Oy, Y-tunnus 0106899-8, Pietarinkatu 21, 00150 Helsinki. Yhteydenotot tietosuoja-asioissa: hanna.haapalainen1@gmail.com (vahvistettava tietosuojayhteydeksi).

Käsittelyn tarkoitukset: asiakaspyyntöjen käsittely, tarjousten ja mahdollisen sopimuksen valmistelu sekä alihankintayhteistyön arviointi. Asiakaslomakkeella kerätään nimi, sähköposti, puhelinnumero, yhteydenoton aihe sekä laajassa lomakkeessa kuvaus ja tarvittaessa kohteen osoite. Alihankkijalomakkeella kerätään yritys, Y-tunnus, yhteyshenkilö ja yhteystiedot, osaamisalue, toiminta-alue, pätevyys- ja vakuutustiedot sekä yhteistyökuvaus. Tiedot saadaan lähettäjältä. Liitteet eivät kuulu ensimmäisen julkaisun hyväksyntään.

Ehdotettu oikeusperuste: rekisteröidyn pyynnöstä tehtävät sopimusta edeltävät toimenpiteet (GDPR 6(1)(b), kun soveltuu) ja yritysten yhteyshenkilöiden sekä alihankintakyselyjen käsittelyssä oikeutettu etu (6(1)(f), tasapainotesti dokumentoitava). Lomakkeen nykyinen hyväksyntäruutu on tarkennettava valittuun oikeusperusteeseen sopivaksi; sitä ei pidä automaattisesti tulkita GDPR-suostumukseksi. Ei suoramarkkinointia näiden tietojen perusteella ilman erillistä perustetta.

Tekninen käsittelyketju: verkkosivusto Vercelissä, viestien toimitus Resendin kautta yrityksen Gmail-osoitteeseen. Erillistä lomaketietokantaa ei ole näissä API-reiteissä. Palveluntarjoajien käsittelysopimukset, todelliset säilytysajat, mahdolliset siirrot ETA:n ulkopuolelle ja siirtoperusteet sekä pääsynhallinta vahvistettava. Resendin lähetysalue eu-west-1 ei yksin osoita koko käsittelyketjun sijaintia.

Säilytysehdotus (ei päätetty): toteutumattomat asiakaskyselyt 12 kk viimeisestä yhteydenotosta; hylätyt alihankkijahakemukset 6 kk päätöksestä. Toteutuneisiin sopimuksiin liittyvät tiedot erikseen lakisääteisten ja sopimusperusteisten tarpeiden mukaan. Vahvista poistokäytäntö myös sähköpostissa, varmuuskopioissa ja palveluntarjoajien lokeissa.

Rekisteröidyn oikeudet: pääsy tietoihin, oikaisu, poistaminen, käsittelyn rajoittaminen, vastustaminen ja tietojen siirrettävyys soveltuvin osin sekä oikeus tehdä valitus tietosuojavaltuutetulle. Vahvista pyyntöjen vastaanotto- ja käsittelyprosessi.

## Hyväksymistestit

1. Preview: etusivun lyhyt lomake, yhteystietosivun laaja lomake ja alihankkijalomake palauttavat demo-tilan; mitään ei toimiteta.
2. Tuotantoa vastaava suojattu testi: hyväksytty seloste, oikea avain, demo pois, synteettiset testitiedot. Jokainen kolmesta lomakkeesta palauttaa live-viitteen; Resendin toimitustapahtuma ja vastaanottajan postilaatikko vahvistetaan.
3. Virhetilanteet: puuttuva avain, hylätty validointi, puuttuva hyväksyntä, liian nopea lähetys, roskapostikenttä, virheellinen palvelinvastaus ja uudelleenlähetys. Ei väärää onnistumisilmoitusta.
4. Honeypot ja aikaraja ovat vain perustason roskapostisuojaus. Arvioi palvelinpuolen nopeusrajoitus ennen avointa julkaisua.
5. SEO: tarkista canonical, robots, sitemap, noindex-poikkeukset, 404 ja uudelleenohjaukset. Älä lupaa Googlen indeksointia ennen havaittua tulosta.
6. GA4 erillinen vaihe: hyväksytty evästekäytäntö, mittaustunnus, suostumus ja tapahtumat ilman henkilötietoja.
7. Julkaisu: vasta hyväksytyn tuotantobuildin ja testitulosten jälkeen; varmista toimiva puhelin-/WhatsApp-/sähköpostivaihtoehto myös virhetilanteissa.
