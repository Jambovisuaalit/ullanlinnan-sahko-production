export type NavigationItem = { label: string; href: string; children?: readonly NavigationItem[] };

export const electricalNavigation = [
  { label: "Sähköasennukset ja vikakorjaukset", href: "/sahkoasennukset-ja-vikakorjaukset" },
  { label: "Valaistus ja valaisinasennukset", href: "/valaistus-ja-valaisinasennukset" },
  { label: "Taloyhtiöille ja yrityksille", href: "/taloyhtioille-ja-yrityksille" }
] as const satisfies readonly NavigationItem[];

export const lightingNavigation = [
  { label: "Valaisimien korjaus", href: "/valaisimien-korjaus" },
  { label: "Vanhan valaisimen sähköistys", href: "/vanhan-valaisimen-sahkoistys" },
  { label: "Valaisimen johdon vaihto", href: "/valaisimen-johdon-vaihto" },
  { label: "Vanhan valaisimen maadoitus", href: "/vanhan-valaisimen-maadoitus" }
] as const satisfies readonly NavigationItem[];

export const serviceNavigation = [...electricalNavigation, ...lightingNavigation] as const;

export const siteNavigation = [
  { label: "Sähkötyöt", href: "/sahkoasennukset-ja-vikakorjaukset", children: electricalNavigation },
  { label: "Valaisimet", href: "/valaisimien-korjaus", children: lightingNavigation },
  { label: "Myymälä", href: "/myymala" },
  { label: "Meistä", href: "/meista" },
  { label: "Yhteystiedot", href: "/yhteystiedot" }
] as const satisfies readonly NavigationItem[];
