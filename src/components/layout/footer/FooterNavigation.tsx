import Link from "next/link";
import { serviceNavigation } from "@/content/navigation";

const siteLinks = [
  { href: "/myymala", label: "Myymälä" },
  { href: "/meista", label: "Meistä" },
  { href: "/yhteystiedot", label: "Yhteystiedot" },
  { href: "/tietosuojaseloste", label: "Tietosuojaseloste" },
  { href: "/evastekaytanto", label: "Evästekäytäntö" },
  { href: "/saavutettavuusseloste", label: "Saavutettavuusseloste" }
] as const;

export function FooterNavigation() {
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
