export type NavigationItem = { label: string; href: string; children?: readonly NavigationItem[] };

export const serviceNavigation = [
  { label: "Sähköasennukset ja vikakorjaukset", href: "/sahkoasennukset-ja-vikakorjaukset" },
  { label: "Valaistus ja valaisinasennukset", href: "/valaistus-ja-valaisinasennukset" },
  { label: "Valaisimien korjaus", href: "/valaisimien-korjaus" },
  { label: "Taloyhtiöille ja yrityksille", href: "/taloyhtioille-ja-yrityksille" }
] as const satisfies readonly NavigationItem[];

export const siteNavigation = [
  { label: "Etusivu", href: "/" },
  { label: "Sähkötyöt", href: "/sahkoasennukset-ja-vikakorjaukset" },
  { label: "Hälytys- ja vikatyöt", href: "/#vikatyot" },
  { label: "Verkkokauppa", href: "/verkkokauppa" },
  { label: "Valaisimien korjaus", href: "/valaisimien-korjaus" },
  { label: "Alihankkijaksi", href: "/alihankkijaksi" },
  { label: "Yhteystiedot", href: "/yhteystiedot" }
] as const satisfies readonly NavigationItem[];
