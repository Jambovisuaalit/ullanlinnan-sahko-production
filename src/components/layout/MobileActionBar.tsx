import Link from "next/link";
import { company, contactLinks } from "@/content/company";
import { Icon } from "@/components/ui/Icon";

export function MobileActionBar() {
  return (
    <nav className="mobile-action-bar" aria-label="Nopeat yhteydenottotoiminnot">
      <a href={contactLinks.phone} aria-label={"Soita numeroon " + company.phoneDisplay}>
        <Icon name="phone" />
        <span>Soita</span>
      </a>
      <a href={contactLinks.whatsapp} target="_blank" rel="noreferrer" aria-label="Avaa WhatsApp-keskustelu">
        <span>WhatsApp</span>
      </a>
      <Link href="/#yhteydenotto" aria-label="Pyydä yhteydenottoa">
        <Icon name="arrow" />
        <span>Pyydä apua</span>
      </Link>
    </nav>
  );
}
