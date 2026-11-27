import { company, contactLinks } from "@/content/company";
import { Icon } from "@/components/ui/Icon";
export function MobileActionBar() {
  return <nav className="mobile-action-bar" aria-label="Nopeat yhteydenottotoiminnot">
    <a href={contactLinks.phone} aria-label={`Soita numeroon ${company.phoneDisplay}`}><Icon name="phone" /><span>Soita</span></a>
    <a href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Avaa WhatsApp-keskustelu"><span>WhatsApp</span></a>
    <a href="/yhteystiedot#yhteydenotto"><Icon name="mail" /><span>Ota yhteyttä</span></a>
  </nav>;
}
