# Ullanlinnan Sähkö Oy — Frontend- ja UI/UX-auditointi V05

**Laajuus:** kanoninen Next.js-repository, nykyinen Vercel-tuotanto, mobiilinavigaatio, responsiivinen layout, typografia, komponenttityylit, sisältötiheys, lomakkeet ja julkaisuarkkitehtuuri.

## Yhteenveto

Kanonisessa Next.js-lähteessä on oikeat rakenteelliset perusteet, mutta julkinen V2-versio ei ole rakennettu tästä lähteestä. V2 toimii välityspalvelimena vanhempaan deploymentiin. Tästä seuraa kaksi estävää ongelmaa:

1. lähdekoodissa tehdyt korjaukset eivät siirry varmasti julkiseen versioon;
2. vanha CSS ja vanha placeholder-markup määrittävät edelleen mobiilikokemusta.

Tyylijärjestelmään on lisäksi kertynyt useita peräkkäisiä korjauskerroksia (`audit-v02`, `ux-v03`, `ux-v04`). Korjaukset ovat perusteltuja, mutta kaskadi on vaikeasti ennakoitava ja regressioriski kasvaa.

## Havainnot vakavuuden mukaan

### Estävät

- V2 on proxy, ei kanonisen frontendin build.
- Tuotanto ja repository eivät vastaa yksi yhteen toisiaan.
- Vanhan upstream-deploymentin sisäisiä kuvatuotannon merkintöjä näkyy edelleen julkisessa HTML:ssä.

### Merkittävät mobiiliongelmat

- Hero ja mediapinnat vievät liikaa pystysuuntaista tilaa ennen palveluja.
- Toistuvat keinotekoiset mediapaneelit pidentävät sivuja ja heikentävät luottamusta.
- Palvelukorteissa käytetään puhelimessa desktop-tyyppisiä vähimmäiskorkeuksia.
- Yläilmoitus, sticky-header ja kiinteä alapalkki kilpailevat samasta pienestä viewportista.
- Mobiilidrawer on rakenteellisesti saavutettava, mutta visuaalisesti liian suuri eikä sen vieritysalue ole riittävän selkeästi rajattu.
- Pitkät tekstit, lomakekentät ja tiedostolataus voivat ahtautua tai ylittää käytettävissä olevan leveyden.
- Otsikko- ja osiovälit ovat liian suuria suhteessa toistuvan sisällön määrään.

### Merkittävät visuaalisen järjestelmän ongelmat

- Pyöristetyt kortit, pyöreät ikonipinnat, suuret varjot ja hover-nostot muodostavat geneerisen SaaS-ilmeen.
- Hyväksytty brändisuunta on rauhallisempi, materiaalisempi, paikallisempi ja toimituksellisempi.
- Tokeneissa nimetään `Inter` ja `Libre Baskerville`, vaikka niiden latautumista ei taata. Lopputulos voi vaihdella laitteittain.
- Synteettiset fonttipainot 720 ja 750 käyttäytyvät epäjohdonmukaisesti tavallisilla fallback-fonteilla.

### Sisältö ja konversio

- Etusivu toistaa samoja palvelulupauksia ja CTA-rakenteita useissa peräkkäisissä osioissa.
- Mobiilikäyttäjä joutuu vierittämään useita placeholder-painotteisia osioita ennen yhteydenottoa.
- Lomake on rakenteellisesti oikea, mutta visuaalisesti raskas kapealla näytöllä.
- Myymälä-, sijainti- ja palvelusisällöt ovat hyödyllisiä, mutta vaativat tiiviimmän mobiiliryhmin.

## Korjaava design-linja

- Mobile-first, toimituksellinen hierarkia.
- H1 yleensä 36–44 px puhelimessa.
- Leipäteksti vähintään 16 px.
- Vähemmän kelluvia kortteja, varjoja ja koristeellisia pintoja.
- Lähes kulmikkaat pinnat, hillitty kultakorostus ja vahva musta–paperi-kontrasti.
- Yksi ensisijainen toiminto kussakin näkymän vaiheessa.
- Keinotekoiset mediapinnat piilotetaan puhelimessa, mutta aidot kuvat säilytetään.
- Saavutettava drawer, focus trap, Escape, scroll lock ja kiinteät Soita/Ota yhteyttä -toiminnot säilytetään.

## V05-toteutus

- kokoaa mobiilikorjaukset tiedostoon `src/styles/ux-v05.css`;
- pienentää mobiilin otsikko-, osio- ja mediakokoja;
- estää vaakasuuntaisen ylivuodon;
- tiivistää yläilmoituksen ja headerin;
- rajaa mobiilidrawerin vierityksen ja pitää CTA:n saavutettavana;
- parantaa heron lukujärjestystä ja CTA-mitoitusta;
- poistaa sisäiset kuvatuotannon tekstit näkyvästä fallbackista;
- piilottaa toistuvat keinotekoiset mediapinnat puhelimessa;
- poistaa palvelukorttien tarpeettomat vähimmäiskorkeudet ja liiallisen hover-liikkeen;
- parantaa prosessikortteja, FAQ:ta, lomakkeita, footeria ja mobiilin toimintopalkkia;
- säilyttää hyväksytyt värit, yritystiedot ja saavutettavuustoiminnot.

## Jäljellä olevat julkaisuportit

- Kanoninen repository pitää julkaista suoraan Verceliin proxy-ratkaisun sijasta.
- Tarvitaan ajantasaiset ja hyväksytyt yrityskuvat.
- Playwright-, axe- ja responsiiviset kuvavertailut pitää ajaa lopullista deploymentia vasten.
- Yhteydenottolomake pitää testata päästä päähän vahvistetulla vastaanottajalla.
- Väliaikainen Vercel-domain vaihdetaan lopulliseen domainiin vasta hyväksynnän jälkeen.
