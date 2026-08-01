export type SeoPageKey =
  | "home"
  | "electrical"
  | "smallElectrical"
  | "electricianUllanlinna"
  | "lighting"
  | "lampRepair"
  | "oldLampRewiring"
  | "lampCordReplacement"
  | "business"
  | "housingCompanyElectrical"
  | "oldLampGrounding"
  | "store"
  | "about"
  | "contact"
  | "faq"
  | "privacy"
  | "cookies"
  | "accessibility"
  | "thankYou";

export type SeoPage = {
  key: SeoPageKey;
  path: `/${string}` | "/";
  title: string;
  description: string;
  breadcrumbLabel: string;
  indexable: boolean;
  includeInSitemap: boolean;
};

const faqEnabled = process.env.NEXT_PUBLIC_ENABLE_FAQ_PAGE === "true";
const legalApproved = process.env.NEXT_PUBLIC_LEGAL_CONTENT_APPROVED === "true";

export const seoPages: Record<SeoPageKey, SeoPage> = {
  home: { key: "home", path: "/", title: "Ullanlinnan Sähkö Oy | Sähkö- ja valaisinpalvelut Helsingissä", description: "Sähköasennukset, sähkövikojen selvitys, valaisinasennukset, valaisimien korjaus ja myymäläpalvelu Helsingissä.", breadcrumbLabel: "Etusivu", indexable: true, includeInSitemap: true },
  electrical: { key: "electrical", path: "/sahkoasennukset-ja-vikakorjaukset", title: "Sähköasennukset ja vikakorjaukset Helsingissä | Ullanlinnan Sähkö", description: "Sähköasennuksia sekä sähkövikojen selvitystä ja korjausta Helsingissä. Kerro työn tai vian lähtötiedot ja ota yhteyttä.", breadcrumbLabel: "Sähköasennukset ja vikakorjaukset", indexable: true, includeInSitemap: true },
  smallElectrical: { key: "smallElectrical", path: "/pienet-sahkotyot-helsinki", title: "Sähköasennukset Helsingissä | Ullanlinnan Sähkö", description: "Sähköasennuksia ja sähkövikojen selvitystä Helsingissä. Kerro työn tai vian lähtötiedot ja ota yhteyttä.", breadcrumbLabel: "Sähköasennukset Helsingissä", indexable: false, includeInSitemap: false },
  electricianUllanlinna: { key: "electricianUllanlinna", path: "/sahkomies-ullanlinna", title: "Sähkömies Ullanlinna | Ullanlinnan Sähkö", description: "Paikallinen sähkö- ja valaisinpalvelu Ullanlinnassa. Sähkötyöt, vikojen arviointi, valaisinasennukset, korjaukset ja myymälä Pietarinkadulla.", breadcrumbLabel: "Sähkömies Ullanlinnassa", indexable: true, includeInSitemap: true },
  lighting: { key: "lighting", path: "/valaistus-ja-valaisinasennukset", title: "Valaistus ja valaisinasennukset Helsingissä | Ullanlinnan Sähkö", description: "Valaisinasennuksia ja valaistukseen liittyviä sähkötöitä Helsingissä kotitalouksille, taloyhtiöille ja yrityksille.", breadcrumbLabel: "Valaistus ja valaisinasennukset", indexable: true, includeInSitemap: true },
  lampRepair: { key: "lampRepair", path: "/valaisimien-korjaus", title: "Valaisimen korjaus Helsinki | Ullanlinnan Sähkö", description: "Valaisimen korjaus Helsingissä. Korjattavuus arvioidaan rakenteen, kunnon, turvallisuuden ja varaosien saatavuuden perusteella.", breadcrumbLabel: "Valaisimen korjaus Helsingissä", indexable: true, includeInSitemap: true },
  oldLampRewiring: { key: "oldLampRewiring", path: "/vanhan-valaisimen-sahkoistys", title: "Vanhan valaisimen sähköistys | Ullanlinnan Sähkö", description: "Vanhan valaisimen johdotuksen, liitäntöjen ja sähköosien tarkastus sekä sovittu uusiminen turvallisen käytön mahdollistamiseksi.", breadcrumbLabel: "Vanhan valaisimen sähköistys", indexable: true, includeInSitemap: true },
  lampCordReplacement: { key: "lampCordReplacement", path: "/valaisimen-johdon-vaihto", title: "Valaisimen johdon vaihto | Ullanlinnan Sähkö", description: "Valaisimen vaurioituneen tai vanhan johdon tarkastus ja vaihto soveltuvilla osilla. Lähetä kuvat valaisimesta, johdosta ja liitännöistä.", breadcrumbLabel: "Valaisimen johdon vaihto", indexable: true, includeInSitemap: true },
  business: { key: "business", path: "/taloyhtioille-ja-yrityksille", title: "Sähkötyöt taloyhtiöille ja yrityksille | Ullanlinnan Sähkö", description: "Sähkö- ja valaistustöitä taloyhtiöille, kiinteistöjen vastuuhenkilöille ja yrityksille sovitun tarpeen mukaan.", breadcrumbLabel: "Taloyhtiöille ja yrityksille", indexable: true, includeInSitemap: true },
  housingCompanyElectrical: { key: "housingCompanyElectrical", path: "/taloyhtioiden-sahkotyot-helsinki", title: "Taloyhtiöiden sähkötyöt Helsinki | Ullanlinnan Sähkö", description: "Taloyhtiöiden rajatut sähkö- ja valaistustyöt Helsingissä. Kerro kohde, yhteyshenkilö, työn tarve ja käytännön järjestelyt.", breadcrumbLabel: "Taloyhtiöiden sähkötyöt Helsingissä", indexable: true, includeInSitemap: true },
  oldLampGrounding: { key: "oldLampGrounding", path: "/vanhan-valaisimen-maadoitus", title: "Vanhan valaisimen maadoitus: opas ja tarkastus | Ullanlinnan Sähkö", description: "Opas vanhan valaisimen maadoituksen arviointiin ja tarkastuspalvelu. Suojaustapa ratkaistaan rakenteen, eristyksen ja sähköosien perusteella.", breadcrumbLabel: "Vanhan valaisimen maadoitus", indexable: true, includeInSitemap: true },
  store: { key: "store", path: "/myymala", title: "Sähkö- ja valaisintarvikkeet Ullanlinna | Ullanlinnan Sähkö", description: "Pietarinkadun sähkö- ja valaisintarvikemyymälä Ullanlinnassa. Tiedustele valaisimia, valonlähteitä, varaosia, johtoja ja sähkötarvikkeita.", breadcrumbLabel: "Myymälä", indexable: true, includeInSitemap: true },
  about: { key: "about", path: "/meista", title: "Ullanlinnan Sähkö Oy | Paikallinen sähkö- ja valaistusalan yritys", description: "Ullanlinnan Sähkö Oy yhdistää sähkötyöt, valaisimien korjauksen ja paikallisen myymäläpalvelun Helsingissä.", breadcrumbLabel: "Meistä", indexable: true, includeInSitemap: true },
  contact: { key: "contact", path: "/yhteystiedot", title: "Yhteystiedot | Ullanlinnan Sähkö Oy", description: "Ullanlinnan Sähkö Oy, Pietarinkatu 21, 00150 Helsinki. Puhelin 040 574 3094. Myymälä avoinna keskiviikkoisin klo 10–17.", breadcrumbLabel: "Yhteystiedot", indexable: true, includeInSitemap: true },
  faq: { key: "faq", path: "/usein-kysytyt-kysymykset", title: "Usein kysytyt kysymykset | Ullanlinnan Sähkö Oy", description: "Vastauksia sähkö-, valaisin-, korjaus- ja myymäläasiointia koskeviin kysymyksiin.", breadcrumbLabel: "Usein kysytyt kysymykset", indexable: faqEnabled, includeInSitemap: faqEnabled },
  privacy: { key: "privacy", path: "/tietosuojaseloste", title: "Tietosuojaseloste | Ullanlinnan Sähkö Oy", description: "Tietoa Ullanlinnan Sähkö Oy:n henkilötietojen käsittelystä.", breadcrumbLabel: "Tietosuojaseloste", indexable: legalApproved, includeInSitemap: legalApproved },
  cookies: { key: "cookies", path: "/evastekaytanto", title: "Evästekäytäntö | Ullanlinnan Sähkö Oy", description: "Tietoa Ullanlinnan Sähkö Oy:n verkkosivuston evästeistä ja evästevalinnoista.", breadcrumbLabel: "Evästekäytäntö", indexable: legalApproved, includeInSitemap: legalApproved },
  accessibility: { key: "accessibility", path: "/saavutettavuusseloste", title: "Saavutettavuusseloste | Ullanlinnan Sähkö Oy", description: "Ullanlinnan Sähkö Oy:n verkkosivuston saavutettavuuden tila ja palautekanava.", breadcrumbLabel: "Saavutettavuusseloste", indexable: legalApproved, includeInSitemap: legalApproved },
  thankYou: { key: "thankYou", path: "/kiitos", title: "Kiitos yhteydenotosta | Ullanlinnan Sähkö Oy", description: "Yhteydenotto on vastaanotettu.", breadcrumbLabel: "Kiitos yhteydenotosta", indexable: false, includeInSitemap: false }
};

export const seoPageList = Object.values(seoPages);
