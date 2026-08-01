import Link from "next/link";
import { serviceNavigation } from "@/content/navigation";

const primarySiteLinks = [
  { href: "/myymala", label: "Myymälä" },
  { href: "/meista", label: "Meistä" },
  { href: "/yhteystiedot", label: "Yhteystiedot" }
] as const;

const legalSiteLinks = [
  { href: "/tietosuojaseloste", label: "Tietosuojaseloste" },
  { href: "/evastekaytanto", label: "Evästekäytäntö" },
  { href: "/saavutettavuusseloste", label: "Saavutettavuusseloste" }
] as const;

export function FooterNavigation() {
  const siteLinks = process.env.NEXT_PUBLIC_LEGAL_CONTENT_APPROVED === "true"
    ? [...primarySiteLinks, ...legalSiteLinks]
    : primarySiteLinks;

  return (
    <>
      <nav aria-label="Palvelut">
        <h2>Palvelut</h2>
        {serviceNavigation.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <nav aria-label="Sivuston tiedot">
        <h2>Sivusto</h2>
        {siteLinks.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
