import type { FaqItem } from "@/content/faq";

export type ServiceContent = {
  slug: string;
  title: string;
  eyebrow: string;
  introduction: string;
  situationsTitle: string;
  situations: readonly string[];
  includedTitle: string;
  included: readonly string[];
  process: readonly { title: string; text: string }[];
  requiredInformation: readonly string[];
  safetyNotice: string;
  primaryCta: string;
  mediaRequirement: string;
  mediaRatio: "4/3" | "16/10";
  faq: readonly FaqItem[];
  related: readonly { label: string; href: string }[];
};

export const services = {
  electrical: {
    slug: "sahkoasennukset-ja-vikakorjaukset",
    title: "Sähköasennukset ja vikakorjaukset",
    eyebrow: "Sähkötyöt",
    introduction: "Kerro asennustarpeesta tai havaitsemastasi sähköviasta. Arvioimme lähtötietojen perusteella, kuuluuko työ palveluihimme ja mitä tietoja asian eteneminen edellyttää.",
    situationsTitle: "Milloin ottaa yhteyttä?",
    situations: [
      "Tarvitset sovitun sähköasennuksen kotiin, kiinteistöön tai toimitilaan.",
      "Sähkökaluste, valaisin tai osa tilan sähköistä ei toimi odotetusti.",
      "Aiemman asennuksen toiminta tai turvallisuus vaatii ammattilaisen arviota."
    ],
    includedTitle: "Palvelu voi sisältää",
    included: [
      "lähtötietojen ja asiakkaan havaintojen läpikäynnin",
      "kohteen tai vian tutkimisen sovitussa laajuudessa",
      "toteutus- tai korjausvaihtoehdon arvioinnin",
      "sovitun sähkötyön ja toiminnan tarkistamisen"
    ],
    process: [
      { title: "Kuvaile tarve", text: "Kerro kohde, havainto ja työn tarkoitus. Liitä kuvat, jos ne auttavat tilanteen hahmottamista." },
      { title: "Arvioimme lähtötiedot", text: "Selvitämme, kuuluuko työ palveluihimme ja tarvitaanko lisätietoja tai kohdekäynti." },
      { title: "Sovitaan rajaus", text: "Työn sisältö, toteutustapa, aikataulu ja hinnoitteluperuste sovitaan tapauskohtaisesti." },
      { title: "Työ ja tarkistus", text: "Sovittu työ toteutetaan ja olennaiset jatko-ohjeet käydään läpi." }
    ],
    requiredInformation: ["kohteen osoite", "tilan tai rakennuksen tyyppi", "kuvaus asennuksesta tai viasta", "mahdolliset kuvat ja näkyvät merkinnät"],
    safetyNotice: "Jos tilanteeseen liittyy savua, palaneen hajua, kipinöintiä tai muuta välitöntä vaaraa, katkaise virta vain turvallisesti tehtävissä olevalla tavalla ja noudata viranomaisten hätäohjeita.",
    primaryCta: "Kerro sähkötyön tarpeesta",
    mediaRequirement: "Aito sähköasennus- tai vianetsintätilanne. Työtavan ja suojainten tulee vastata todellista tilannetta.",
    mediaRatio: "4/3",
    faq: [
      { id: "electrical-scope", question: "Millaisia sähköasennuksia teette?", answer: "Tarjottavat työt arvioidaan tapauskohtaisesti. Lähetä kuvaus ja mahdolliset kuvat, jotta työn soveltuvuus voidaan selvittää." },
      { id: "same-visit", question: "Korjataanko sähkövika aina samalla käynnillä?", answer: "Ei välttämättä. Vian selvitys ja varsinainen korjaus voivat olla eri työvaiheita." }
    ],
    related: [
      { label: "Pienet sähkötyöt Helsingissä", href: "/pienet-sahkotyot-helsinki" },
      { label: "Sähkömies Ullanlinnassa", href: "/sahkomies-ullanlinna" },
      { label: "Valaistus ja valaisinasennukset", href: "/valaistus-ja-valaisinasennukset" }
    ]
  },
  smallElectrical: {
    slug: "pienet-sahkotyot-helsinki",
    title: "Pienet sähkötyöt Helsingissä",
    eyebrow: "Rajatut sähkötyöt",
    introduction: "Kun tarve on yksittäinen tai selkeästi rajattu, yhteydenoton ei tarvitse alkaa suuresta urakkapyynnöstä. Kerro kohde, työn tavoite ja nykyinen tilanne, niin arvioimme sopivan etenemistavan.",
    situationsTitle: "Tyypillinen pieni sähkötyö",
    situations: [
      "Tarve koskee yhtä valaisinta, sähkökalustetta tai muuta rajattua kohdetta.",
      "Olemassa olevan asennuksen toiminta tai turvallisuus halutaan tarkistaa.",
      "Kotiin, liiketilaan tai yhteiseen tilaan tarvitaan yksittäinen sähköalan työ."
    ],
    includedTitle: "Palvelu voi sisältää",
    included: [
      "työn tavoitteen ja nykytilan läpikäynnin",
      "asennuksen tai vian alustavan arvioinnin",
      "sovitun rajatun sähkötyön",
      "toiminnan tarkistamisen ja olennaiset jatko-ohjeet"
    ],
    process: [
      { title: "Kerro yksi selkeä tarve", text: "Kuvaile, mitä pitäisi asentaa, vaihtaa, korjata tai tarkistaa." },
      { title: "Lähetä kuvat", text: "Kuva kohteesta, liitännästä ja mahdollisista merkinnöistä vähentää epäselvyyttä." },
      { title: "Rajaus vahvistetaan", text: "Työn toteutettavuus, tarvittavat materiaalit ja hinnoitteluperuste sovitaan tapauskohtaisesti." },
      { title: "Työ toteutetaan", text: "Sovittu rajattu työ tehdään kohteen todellisten olosuhteiden perusteella." }
    ],
    requiredInformation: ["kohteen osoite", "lyhyt kuvaus yhdestä työstä", "kuvat kohteesta ja liitännöistä", "toivottu ajankohta"],
    safetyNotice: "Pieni työ ei tarkoita, että sähkötyön turvallisuusvaatimukset olisivat kevyemmät. Toteutustapa arvioidaan aina kohteen ja työn perusteella.",
    primaryCta: "Kysy pienestä sähkötyöstä",
    mediaRequirement: "Aito rajattu sähkötyö asunnossa, myymälässä tai toimitilassa. Kuvassa ei esitetä vahvistamatonta työtyyppiä.",
    mediaRatio: "4/3",
    faq: [
      { id: "small-job-definition", question: "Mitä pieni sähkötyö tarkoittaa?", answer: "Sillä tarkoitetaan tässä yksittäistä tai selkeästi rajattua tarvetta. Työn kuuluminen palveluun arvioidaan silti aina tapauskohtaisesti." },
      { id: "small-job-photos", question: "Voiko työn arvioida kuvien perusteella?", answer: "Kuvat auttavat alustavassa arvioinnissa, mutta lopullinen työlaajuus voi selvitä vasta kohteessa." }
    ],
    related: [
      { label: "Sähkömies Ullanlinnassa", href: "/sahkomies-ullanlinna" },
      { label: "Sähköasennukset ja vikakorjaukset", href: "/sahkoasennukset-ja-vikakorjaukset" },
      { label: "Valaisimen johdon vaihto", href: "/valaisimen-johdon-vaihto" }
    ]
  },
  electricianUllanlinna: {
    slug: "sahkomies-ullanlinna",
    title: "Sähkömies Ullanlinnassa",
    eyebrow: "Paikallinen sähköpalvelu",
    introduction: "Ullanlinnan Sähkö palvelee Pietarinkadulta käsin sähköön, valaistukseen ja valaisimiin liittyvissä tarpeissa. Kerro työn kohde ja tarve, jotta voimme arvioida sopivan palvelun.",
    situationsTitle: "Kun tarvitset sähköalan apua Ullanlinnassa",
    situations: [
      "Kodissa tai kiinteistössä on rajattu sähkötyö tai selvitettävä vika.",
      "Valaisin täytyy asentaa, tarkistaa tai korjata.",
      "Haluat asioida paikallisen sähkö- ja valaisinliikkeen kanssa."
    ],
    includedTitle: "Paikallinen palvelupolku",
    included: [
      "sähköasennusten ja vikojen lähtötietojen arviointi",
      "valaistukseen ja valaisimiin liittyvän tarpeen ohjaus",
      "sopivan palvelun ja seuraavan vaiheen määrittely",
      "myymäläasiointi Pietarinkatu 21:ssä vahvistettuina aukioloaikoina"
    ],
    process: [
      { title: "Kerro osoite ja tarve", text: "Kuvaile kohde, havainto ja työn tavoite." },
      { title: "Valitse sopiva polku", text: "Tarve ohjataan sähkötyöhön, valaisinasennukseen, korjaukseen tai myymäläasiointiin." },
      { title: "Rajaus sovitaan", text: "Työn sisältö, toteutustapa ja tarvittavat lisätiedot vahvistetaan tapauskohtaisesti." },
      { title: "Asia etenee", text: "Sovittu palvelu toteutetaan tai asiakas saa selkeän ohjeen seuraavasta vaiheesta." }
    ],
    requiredInformation: ["kohteen osoite Ullanlinnassa tai lähialueella", "kuvaus tarpeesta", "mahdolliset kuvat", "yhteystiedot"],
    safetyNotice: "Sivulla ei luvata päivystystä, tiettyä vasteaikaa tai kaikkien sähköalan töiden toteuttamista. Palvelun soveltuvuus arvioidaan lähtötietojen perusteella.",
    primaryCta: "Kerro tarpeestasi",
    mediaRequirement: "Ajantasainen kuva Ullanlinnan alueelta, Pietarinkadun myymälästä tai aidosta työkohteesta ilman vanhoja yhteystietoja.",
    mediaRatio: "16/10",
    faq: [
      { id: "ullanlinna-area", question: "Palveletteko vain Ullanlinnassa?", answer: "Yritys palvelee Helsingissä ja tapauskohtaisesti muualla pääkaupunkiseudulla. Työn sijainti ja soveltuvuus arvioidaan yhteydenotossa." },
      { id: "ullanlinna-store", question: "Missä myymälä sijaitsee?", answer: "Myymälä sijaitsee osoitteessa Pietarinkatu 21, 00150 Helsinki." }
    ],
    related: [
      { label: "Pienet sähkötyöt Helsingissä", href: "/pienet-sahkotyot-helsinki" },
      { label: "Valaisimen korjaus Helsingissä", href: "/valaisimien-korjaus" },
      { label: "Myymälä Ullanlinnassa", href: "/myymala" }
    ]
  },
  lighting: {
    slug: "valaistus-ja-valaisinasennukset",
    title: "Valaistus ja valaisinasennukset",
    eyebrow: "Valaistus",
    introduction: "Autamme valaisimien asennuksissa ja valaistukseen liittyvissä sähkötöissä sovitun tarpeen perusteella.",
    situationsTitle: "Tyypillinen tarve",
    situations: [
      "Valaisin täytyy asentaa tai vaihtaa.",
      "Valaistuksen toiminta vaatii sähköalan arviota.",
      "Valaisimen, liitännän ja kohteen yhteensopivuus on epäselvä."
    ],
    includedTitle: "Palvelu voi sisältää",
    included: [
      "valaisimen ja asennuskohteen lähtötietojen tarkistamisen",
      "asennustavan arvioinnin",
      "sovitun valaisinasennuksen",
      "valaistukseen liittyvän sähkötyön sovitussa laajuudessa"
    ],
    process: [
      { title: "Lähetä lähtötiedot", text: "Kerro tila, valaisin, kiinnityspaikka ja mahdolliset nykyiset liitännät." },
      { title: "Yhteensopivuus arvioidaan", text: "Arvioimme, mitä asennus edellyttää ja tarvitaanko kohdekäynti." },
      { title: "Toteutus sovitaan", text: "Työn rajaus, tarvittavat materiaalit ja aikataulu sovitaan ennen toteutusta." },
      { title: "Asennus tarkistetaan", text: "Sovitun työn toiminta tarkistetaan asianmukaisella tavalla." }
    ],
    requiredInformation: ["valaisimen kuva ja mahdolliset merkinnät", "kuva asennuspaikasta", "tila ja käyttötarkoitus", "tieto olemassa olevasta liitännästä"],
    safetyNotice: "Valaisimen ja asennuskohteen yhteensopivuus sekä turvallinen asennustapa arvioidaan aina ennen toteutusta.",
    primaryCta: "Kysy valaisimen asennuksesta",
    mediaRequirement: "Aito valaisimen asennustilanne tai valmis valaistus ilman kuvapankkimaista lavastusta.",
    mediaRatio: "16/10",
    faq: [
      { id: "own-luminaire", question: "Voiko asiakkaan hankkiman valaisimen asentaa?", answer: "Soveltuvuus arvioidaan valaisimen, kohteen ja asennustavan perusteella." },
      { id: "lighting-design", question: "Sisältyykö palveluun erillinen valaistussuunnittelu?", answer: "Erillistä valaistussuunnittelua ei ole vahvistettu palveluksi. Yhteydenotossa arvioidaan, millaista apua tarpeeseen voidaan tarjota." }
    ],
    related: [
      { label: "Valaisimen korjaus", href: "/valaisimien-korjaus" },
      { label: "Vanhan valaisimen sähköistys", href: "/vanhan-valaisimen-sahkoistys" },
      { label: "Myymälä", href: "/myymala" }
    ]
  },
  lampRepair: {
    slug: "valaisimien-korjaus",
    title: "Valaisimen korjaus Helsingissä",
    eyebrow: "Valaisinkorjaus",
    introduction: "Valaisimen vika ei aina tarkoita, että valaisin täytyy vaihtaa. Korjattavuus arvioidaan rakenteen, kunnon, turvallisen toteutuksen ja varaosien saatavuuden perusteella.",
    situationsTitle: "Korjausarvio kannattaa pyytää, kun",
    situations: [
      "valaisin ei syty tai toimii ajoittain",
      "johto, kytkin, kanta tai muu osa vaikuttaa vaurioituneelta",
      "vanhan tai tärkeän valaisimen käyttöikää halutaan jatkaa turvallisesti"
    ],
    includedTitle: "Arvioinnissa huomioidaan",
    included: [
      "valaisimen rakenne ja yleinen kunto",
      "havaittu vika ja sähköosien tila",
      "varaosien saatavuus ja yhteensopivuus",
      "korjauksen turvallinen ja tarkoituksenmukainen toteutus"
    ],
    process: [
      { title: "Lähetä kuvat", text: "Lähetä yleiskuva valaisimesta, kuva viasta ja näkyvistä merkinnöistä." },
      { title: "Alustava arvio", text: "Kerrottujen tietojen perusteella arvioidaan, kannattaako valaisin tuoda tarkasteltavaksi." },
      { title: "Valaisin tutkitaan", text: "Korjattavuus ja tarvittavat toimenpiteet selvitetään valaisimen todellisen kunnon perusteella." },
      { title: "Jatkosta sovitaan", text: "Korjaus tehdään vain sovitun rajauksen ja turvallisen toteutustavan mukaisesti." }
    ],
    requiredInformation: ["yleiskuva valaisimesta", "kuva havaitusta viasta", "kuvat merkinnöistä ja liitännöistä", "lyhyt kuvaus siitä, miten vika ilmenee"],
    safetyNotice: "Älä käytä valaisinta, jos sen johto, liitäntä tai sähköosat ovat vaurioituneet tai niiden turvallisuus on epäselvä.",
    primaryCta: "Kysy valaisimen korjauksesta",
    mediaRequirement: "Aito valaisin korjauspisteellä; työkalut, kädet ja valaisimen osa voivat näkyä. Ei lavastettua ennen–jälkeen-väitettä.",
    mediaRatio: "4/3",
    faq: [
      { id: "all-repairable", question: "Voidaanko kaikki valaisimet korjata?", answer: "Ei. Korjattavuus arvioidaan aina tapauskohtaisesti." },
      { id: "bring-store", question: "Voiko valaisimen tuoda suoraan myymälään?", answer: "Vastaanottokäytäntö kannattaa varmistaa etukäteen puhelimitse tai yhteydenottolomakkeella." }
    ],
    related: [
      { label: "Vanhan valaisimen sähköistys", href: "/vanhan-valaisimen-sahkoistys" },
      { label: "Valaisimen johdon vaihto", href: "/valaisimen-johdon-vaihto" },
      { label: "Vanhan valaisimen maadoitus", href: "/vanhan-valaisimen-maadoitus" }
    ]
  },
  oldLampRewiring: {
    slug: "vanhan-valaisimen-sahkoistys",
    title: "Vanhan valaisimen sähköistys",
    eyebrow: "Vanha valaisin",
    introduction: "Vanhan valaisimen sähköosat, johdotus ja liitännät voivat vaatia tarkastuksen tai uusimisen ennen turvallista käyttöä. Toteutustapa määritetään valaisimen rakenteen ja todellisen kunnon perusteella.",
    situationsTitle: "Sähköistys kannattaa tarkistaa, kun",
    situations: [
      "valaisimen johdotus tai liitäntä on vanha, haurastunut tai epäselvä",
      "valaisin on peritty, ostettu käytettynä tai ollut pitkään käyttämättä",
      "valaisin halutaan ottaa käyttöön nykyisessä asennusympäristössä"
    ],
    includedTitle: "Tarkastus ja sähköistys voivat sisältää",
    included: [
      "rakenteen, johdotuksen ja liitäntöjen kunnon arvioinnin",
      "turvallisen toteutustavan ja tarvittavien osien määrittelyn",
      "sovittujen sähköosien tai johdotuksen uusimisen",
      "toiminnan tarkistamisen korjauksen jälkeen"
    ],
    process: [
      { title: "Kuvaa valaisin", text: "Lähetä yleiskuva, kuvat johdosta, kannasta, liitännästä ja näkyvistä merkinnöistä." },
      { title: "Valaisin tarkastetaan", text: "Todellinen rakenne ja sähköosien kunto selvitetään ennen korjauspäätöstä." },
      { title: "Toteutus sovitaan", text: "Tarvittavat osat, muutokset ja työn rajaus vahvistetaan tapauskohtaisesti." },
      { title: "Sähköistys tarkistetaan", text: "Sovittu työ tehdään ja valaisimen toiminta tarkistetaan asianmukaisesti." }
    ],
    requiredInformation: ["valaisimen yleiskuva", "kuvat johdosta, kannasta ja liitännöistä", "valaisimen materiaali ja näkyvät merkinnät", "tieto aiemmista muutoksista, jos tiedossa"],
    safetyNotice: "Vanhaa valaisinta ei tule kytkeä käyttöön, jos johdotuksen, liitännän tai rakenteen turvallisuus on epäselvä.",
    primaryCta: "Kysy vanhan valaisimen sähköistyksestä",
    mediaRequirement: "Aito vanha valaisin tarkastuspisteellä. Kuvissa näytetään rakenne ja sähköosat ilman perusteetonta entisöintilupausta.",
    mediaRatio: "4/3",
    faq: [
      { id: "rewiring-appearance", question: "Muuttuuko valaisimen ulkonäkö sähköistyksessä?", answer: "Mahdolliset näkyvät muutokset riippuvat valaisimen rakenteesta ja tarvittavista osista. Ne sovitaan ennen toteutusta." },
      { id: "rewiring-all", question: "Voidaanko jokainen vanha valaisin sähköistää?", answer: "Ei välttämättä. Toteutuskelpoisuus arvioidaan rakenteen, kunnon ja turvallisen lopputuloksen perusteella." }
    ],
    related: [
      { label: "Valaisimen johdon vaihto", href: "/valaisimen-johdon-vaihto" },
      { label: "Vanhan valaisimen maadoitus", href: "/vanhan-valaisimen-maadoitus" },
      { label: "Valaisimen korjaus Helsingissä", href: "/valaisimien-korjaus" }
    ]
  },
  lampCordReplacement: {
    slug: "valaisimen-johdon-vaihto",
    title: "Valaisimen johdon vaihto",
    eyebrow: "Valaisinkorjaus",
    introduction: "Kulunut, vaurioitunut tai käyttötarkoitukseen sopimaton johto voi estää valaisimen turvallisen käytön. Johdon vaihto tehdään vasta valaisimen rakenteen, liitäntöjen ja muun kunnon arvioinnin jälkeen.",
    situationsTitle: "Johdon vaihto kannattaa arvioida, kun",
    situations: [
      "johto on halkeillut, kovettunut, puristunut tai muuten vaurioitunut",
      "pistotulppa, vedonpoisto tai liitäntä vaikuttaa epävarmalta",
      "valaisimen johdon pituutta tai toteutusta halutaan muuttaa turvallisesti"
    ],
    includedTitle: "Palvelu voi sisältää",
    included: [
      "johdon, liitäntöjen ja vedonpoiston tarkastuksen",
      "valaisimeen soveltuvan johdon ja osien määrittelyn",
      "sovitun johdon ja tarvittavien liitäntäosien vaihdon",
      "valaisimen toiminnan tarkistamisen"
    ],
    process: [
      { title: "Lähetä kuvat", text: "Kuvaa koko valaisin, johto, pistotulppa, liitäntä ja mahdolliset vauriot." },
      { title: "Soveltuvuus arvioidaan", text: "Valaisimen rakenne ja tarvittavat osat tarkistetaan ennen työn vahvistamista." },
      { title: "Vaihto sovitaan", text: "Johdon tyyppi, mahdolliset näkyvät muutokset ja työn rajaus käydään läpi." },
      { title: "Toiminta tarkistetaan", text: "Sovittu vaihto tehdään ja valaisimen toiminta tarkistetaan." }
    ],
    requiredInformation: ["valaisimen yleiskuva", "kuva koko johdosta ja vauriosta", "kuvat liitännästä, pistotulpasta ja merkinnöistä", "toivottu johdon pituus, jos muutosta haetaan"],
    safetyNotice: "Vaurioitunutta johtoa tai epävarmaa liitäntää ei tule teipata tilapäiseksi korjaukseksi eikä valaisinta tule käyttää ennen turvallisuuden arviointia.",
    primaryCta: "Kysy johdon vaihdosta",
    mediaRequirement: "Aito valaisin ja sen johto korjauspisteellä. Vaurio ja liitäntä näkyvät selkeästi ilman lavastettua turvallisuusväitettä.",
    mediaRatio: "4/3",
    faq: [
      { id: "cord-only", question: "Riittääkö aina pelkkä johdon vaihto?", answer: "Ei. Samalla voidaan havaita muita korjausta vaativia osia, ja työn rajaus vahvistetaan tarkastuksen perusteella." },
      { id: "cord-color", question: "Voiko uuden johdon värin tai pituuden valita?", answer: "Vaihtoehdot riippuvat valaisimen rakenteesta, teknisistä vaatimuksista ja osien saatavuudesta." }
    ],
    related: [
      { label: "Vanhan valaisimen sähköistys", href: "/vanhan-valaisimen-sahkoistys" },
      { label: "Vanhan valaisimen maadoitus", href: "/vanhan-valaisimen-maadoitus" },
      { label: "Valaisimen korjaus Helsingissä", href: "/valaisimien-korjaus" }
    ]
  },
  business: {
    slug: "taloyhtioille-ja-yrityksille",
    title: "Sähkötyöt taloyhtiöille ja yrityksille",
    eyebrow: "B2B-palvelut",
    introduction: "Palvelemme taloyhtiöitä, kiinteistöjen vastuuhenkilöitä ja yrityksiä sovituissa sähkö- ja valaistustöissä.",
    situationsTitle: "Palvelu sopii, kun",
    situations: [
      "taloyhtiössä tai toimitilassa tarvitaan rajattu sähkötyö",
      "sähkövika tai valaistuksen toimintahäiriö vaatii selvitystä",
      "työ edellyttää selkeää yhteyshenkilöä ja käytännön järjestelyjen sopimista"
    ],
    includedTitle: "Yhteistyössä sovitaan",
    included: [
      "työn tavoite ja rajaus",
      "kohteen lähtötiedot ja vastuuhenkilö",
      "aikataulu ja tilojen käyttöön liittyvät järjestelyt",
      "tarvittava yhteydenpito ja työn jälkeiset tiedot"
    ],
    process: [
      { title: "Tarve ja kohde", text: "Kerro kohde, yhteyshenkilö ja työn tai vian kuvaus." },
      { title: "Laajuus arvioidaan", text: "Selvitämme, kuuluuko työ palveluihimme ja mitä lisätietoja tarvitaan." },
      { title: "Järjestelyt sovitaan", text: "Rajaus, aikataulu, kulku ja mahdolliset käyttöjärjestelyt sovitaan nimetyn yhteyshenkilön kanssa." },
      { title: "Työ toteutetaan", text: "Sovittu työ tehdään kohteen todellisten olosuhteiden perusteella." }
    ],
    requiredInformation: ["kohteen osoite ja tilatyyppi", "yhteyshenkilö ja rooli", "kuvaus työstä tai viasta", "toivottu ajankohta ja käyttöjärjestelyt"],
    safetyNotice: "Työn tarkka sisältö, dokumentointi ja mahdolliset käyttökatkot vahvistetaan tapauskohtaisesti ennen toteutusta.",
    primaryCta: "Kerro kohteen tarpeesta",
    mediaRequirement: "Aito taloyhtiön yhteinen tila tai yrityksen toimitila, jossa sähkö- tai valaistustyö on selvästi tunnistettavissa.",
    mediaRatio: "16/10",
    faq: [
      { id: "b2b-contact", question: "Mitä tietoja ensimmäiseen yhteydenottoon tarvitaan?", answer: "Kohteen osoite, tilan tyyppi, työn tai vian kuvaus, yhteyshenkilö ja mahdolliset kuvat auttavat asian arvioinnissa." },
      { id: "b2b-scope", question: "Soveltuuko palvelu laajoihin sähköurakoihin?", answer: "Palvelun laajuus arvioidaan tapauskohtaisesti. Laajaa urakkaa ei luvata ilman erillistä vahvistusta." }
    ],
    related: [
      { label: "Taloyhtiöiden sähkötyöt Helsingissä", href: "/taloyhtioiden-sahkotyot-helsinki" },
      { label: "Sähköasennukset ja vikakorjaukset", href: "/sahkoasennukset-ja-vikakorjaukset" },
      { label: "Valaistus ja valaisinasennukset", href: "/valaistus-ja-valaisinasennukset" }
    ]
  },
  housingCompanyElectrical: {
    slug: "taloyhtioiden-sahkotyot-helsinki",
    title: "Taloyhtiöiden sähkötyöt Helsingissä",
    eyebrow: "Taloyhtiöt",
    introduction: "Taloyhtiön sähkötyössä tarvitaan selkeä rajaus, nimetty yhteyshenkilö ja käytännön järjestelyt. Palvelemme sovituissa sähkö- ja valaistustöissä Helsingissä.",
    situationsTitle: "Taloyhtiö tarvitsee apua, kun",
    situations: [
      "yhteisessä tilassa on rajattu sähkötyö tai valaistuksen toimintahäiriö",
      "havaittu sähkövika vaatii tutkimista ja jatkotoimien arviointia",
      "työ edellyttää kulun, tiedottamisen tai käyttöjärjestelyjen sopimista"
    ],
    includedTitle: "Palvelussa voidaan sopia",
    included: [
      "kohteen ja ongelman lähtötietojen läpikäynti",
      "sähkövian tai rajatun työn arviointi",
      "sovitun sähkö- tai valaistustyön toteutus",
      "yhteyshenkilölle annettavat olennaiset työn jälkeiset tiedot"
    ],
    process: [
      { title: "Nimeä yhteyshenkilö", text: "Ilmoita yhteyshenkilön rooli, kohde ja yhteystiedot." },
      { title: "Kuvaile tarve", text: "Kerro tila, havaittu ongelma, aiemmat toimenpiteet ja mahdolliset käyttörajoitteet." },
      { title: "Sovitaan järjestelyt", text: "Työn rajaus, kulku, ajankohta ja tarvittava viestintä vahvistetaan." },
      { title: "Työ ja raportointi", text: "Sovittu työ tehdään ja olennaiset havainnot välitetään nimetylle yhteyshenkilölle." }
    ],
    requiredInformation: ["taloyhtiön ja kohteen osoite", "yhteyshenkilön nimi ja rooli", "tila ja ongelman kuvaus", "kuvat, aiemmat havainnot ja käyttöjärjestelyt"],
    safetyNotice: "Laajoja urakoita, tiettyä dokumentointitasoa, vasteaikaa tai käyttökatkon pituutta ei luvata ennen työn tapauskohtaista rajausta.",
    primaryCta: "Kerro taloyhtiön tarpeesta",
    mediaRequirement: "Aito porrashuone, kellari, piha-alue tai muu yhteinen tila, jossa toteutettava sähkö- tai valaistustyö on todennettavissa.",
    mediaRatio: "16/10",
    faq: [
      { id: "housing-contact-person", question: "Kuka voi tehdä yhteydenoton taloyhtiön puolesta?", answer: "Yhteydenottajan rooli ja tilausvaltuus kannattaa ilmoittaa. Työn jatkosta sovitaan nimetyn vastuuhenkilön kanssa." },
      { id: "housing-documentation", question: "Mitä dokumentteja työstä toimitetaan?", answer: "Tarvittava dokumentointi määritellään työn sisällön ja sovitun toimituksen perusteella." }
    ],
    related: [
      { label: "Taloyhtiöille ja yrityksille", href: "/taloyhtioille-ja-yrityksille" },
      { label: "Pienet sähkötyöt Helsingissä", href: "/pienet-sahkotyot-helsinki" },
      { label: "Valaistus ja valaisinasennukset", href: "/valaistus-ja-valaisinasennukset" }
    ]
  },
  oldLampGrounding: {
    slug: "vanhan-valaisimen-maadoitus",
    title: "Vanhan valaisimen maadoitus",
    eyebrow: "Opas ja tarkastuspalvelu",
    introduction: "Vanhan valaisimen maadoitustarvetta ei voi päätellä luotettavasti pelkän iän, ulkonäön tai metallirungon perusteella. Ratkaisu edellyttää valaisimen rakenteen, sähköosien ja käyttötavan ammattilaisarviota.",
    situationsTitle: "Tarkastus on aiheellinen, kun",
    situations: [
      "vanhassa valaisimessa on metalliosia ja liitäntätapa on epäselvä",
      "valaisin on sähköistetty aiemmin, mutta muutosten toteutuksesta ei ole tietoa",
      "valaisin halutaan asentaa tai ottaa käyttöön uudessa kohteessa"
    ],
    includedTitle: "Oppaan tärkeimmät periaatteet",
    included: [
      "maadoitusta ei lisätä pelkän oletuksen tai ulkonäön perusteella",
      "suojausratkaisu riippuu valaisimen rakenteesta, eristyksestä ja sähköosista",
      "vanha johdotus ja liitännät tarkastetaan osana kokonaisuutta",
      "mahdollinen korjaus tai muutos sovitaan vasta tarkastuksen jälkeen"
    ],
    process: [
      { title: "Älä tee oletusta", text: "Valaisimen metallirunko tai ikä ei yksin ratkaise, mikä suojaustapa on oikea." },
      { title: "Lähetä tarkat kuvat", text: "Kuvaa koko valaisin, johto, pistotulppa tai kattoliitäntä, kanta ja kaikki merkinnät." },
      { title: "Valaisin tarkastetaan", text: "Rakenne, eristys, liitännät ja sähköosien kunto arvioidaan kokonaisuutena." },
      { title: "Turvallinen ratkaisu sovitaan", text: "Mahdollinen maadoitus, muu suojausratkaisu tai sähköistys toteutetaan vain teknisesti perustellulla tavalla." }
    ],
    requiredInformation: ["valaisimen yleiskuva", "kuvat metalliosista, johdosta ja liitännästä", "kuvat kannasta ja kaikista merkinnöistä", "tieto suunnitellusta käyttökohteesta"],
    safetyNotice: "Älä lisää suojamaadoitusjohdinta, muuta liitäntää tai ota epävarmaa valaisinta käyttöön itse. Virheellinen muutos voi heikentää turvallisuutta.",
    primaryCta: "Pyydä valaisimen tarkastus",
    mediaRequirement: "Aito vanha valaisin ja sen liitäntä yksityiskohtakuvissa. Kuvitus ei saa toimia tee-se-itse-ohjeena.",
    mediaRatio: "4/3",
    faq: [
      { id: "grounding-metal", question: "Pitääkö metallinen vanha valaisin aina maadoittaa?", answer: "Ei voida päätellä pelkän materiaalin perusteella. Oikea suojaustapa riippuu valaisimen rakenteesta, eristyksestä ja sähköosista." },
      { id: "grounding-diy", question: "Voiko maadoituksen lisätä itse?", answer: "Epävarmaa liitäntää tai suojaustapaa ei pidä muuttaa itse. Valaisin tulee arvioida ammattilaisen toimesta." },
      { id: "grounding-inspection", question: "Mitä tarkastuksessa katsotaan?", answer: "Tarkastuksessa arvioidaan valaisimen rakenne, johdotus, liitännät, eristys, näkyvät vauriot ja käyttökohteen vaikutus turvalliseen ratkaisuun." }
    ],
    related: [
      { label: "Vanhan valaisimen sähköistys", href: "/vanhan-valaisimen-sahkoistys" },
      { label: "Valaisimen johdon vaihto", href: "/valaisimen-johdon-vaihto" },
      { label: "Valaisimen korjaus Helsingissä", href: "/valaisimien-korjaus" }
    ]
  }
} as const satisfies Record<string, ServiceContent>;

export const serviceList = Object.values(services);
