import Link from "next/link";
import { homeContent } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";

const priorityServices = [
  { label: "Sähkömies Ullanlinna", href: "/sahkomies-ullanlinna" },
  { label: "Vanhan valaisimen sähköistys", href: "/vanhan-valaisimen-sahkoistys" },
  { label: "Valaisimen johdon vaihto", href: "/valaisimen-johdon-vaihto" },
  { label: "Taloyhtiöiden sähkötyöt Helsinki", href: "/taloyhtioiden-sahkotyot-helsinki" },
  { label: "Vanhan valaisimen maadoitus – opas", href: "/vanhan-valaisimen-maadoitus" }
] as const;

export function HomeServicesSection() {
  return <section id="palvelut" className="section section--secondary">
    <div className="container">
      <SectionHeader {...homeContent.serviceIntro}/>
      <div className="service-grid">
        <ServiceCard number="01" icon="bolt" title="Sähköasennukset ja vikakorjaukset" text="Sähkötyön tai vian tarve arvioidaan kohteen ja annettujen lähtötietojen perusteella." href="/sahkoasennukset-ja-vikakorjaukset"/>
        <ServiceCard number="02" icon="bulb" title="Valaistus ja valaisinasennukset" text="Valaisinasennuksia ja valaistukseen liittyviä sähkötöitä sovitun tarpeen mukaan." href="/valaistus-ja-valaisinasennukset"/>
        <ServiceCard number="03" icon="wrench" title="Valaisimien korjaus" text="Korjattavuus arvioidaan rakenteen, kunnon, turvallisuuden ja varaosien saatavuuden perusteella." href="/valaisimien-korjaus"/>
      </div>
      <div className="service-shortcuts">
        <Link href="/myymala"><Icon name="store"/><span><strong>Myymälä ja valikoima</strong><small>Valaisimet, varaosat, valonlähteet ja muut sähkötarvikkeet.</small></span><Icon name="arrow"/></Link>
        <Link href="/taloyhtioille-ja-yrityksille"><Icon name="building"/><span><strong>Taloyhtiöille ja yrityksille</strong><small>Sovitut sähkö- ja valaistustyöt nimetyn yhteyshenkilön kanssa.</small></span><Icon name="arrow"/></Link>
      </div>
      <nav className="priority-service-links" aria-label="Suositut paikalliset palvelut">
        <h3>Suositut palvelut Helsingissä</h3>
        <div className="priority-service-links__grid">
          {priorityServices.map((item) => <Link key={item.href} href={item.href}><span>{item.label}</span><Icon name="arrow"/></Link>)}
        </div>
      </nav>
    </div>
  </section>;
}
