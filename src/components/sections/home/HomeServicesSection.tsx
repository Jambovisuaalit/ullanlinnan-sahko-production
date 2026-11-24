import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";

const priorityServices = [
  {
    number: "01",
    icon: "bolt",
    title: "Sähköviat ja kiireelliset sähkötyöt",
    text: "Selvitämme sähkövian ja sovimme työn saatavuudesta tilanteen mukaan. Kiireellisessä tilanteessa soita suoraan.",
    cta: "Pyydä apua"
  },
  {
    number: "02",
    icon: "bulb",
    title: "Sähköasennukset",
    text: "Pistorasiat, valaistus, sähkökalusteet ja muut kodin sähköasennukset.",
    cta: "Pyydä tarjous"
  },
  {
    number: "03",
    icon: "building",
    title: "Yritysten ja taloyhtiöiden sähkötyöt",
    text: "Sovitut sähkötyöt kiinteistöihin, yhteisiin tiloihin ja toimitiloihin.",
    cta: "Kysy palvelusta"
  }
] as const;

export function HomeServicesSection() {
  return (
    <section id="vikatyot" className="section section--secondary conversion-services">
      <div className="container">
        <SectionHeader
          eyebrow="Sähkötyöt"
          title="Sähköpalvelut kaikkiin tarpeisiin"
          lead="Kerro työn tai vian lähtötiedot. Arvioimme sopivan seuraavan vaiheen ja sovimme toteutuksesta."
        />
        <div className="conversion-service-grid">
          {priorityServices.map((service) => (
            <article className="conversion-service-card" key={service.number}>
              <span className="conversion-service-card__number">{service.number}</span>
              <Icon name={service.icon} />
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <Link href="/#yhteydenotto">{service.cta} <Icon name="arrow" /></Link>
            </article>
          ))}
        </div>
        <div className="service-shortcuts">
          <Link href="/valaisimien-korjaus">
            <Icon name="wrench" />
            <span><strong>Valaisimien korjaus</strong><small>Vanhojen ja viallisten valaisimien korjattavuuden arviointi.</small></span>
            <Icon name="arrow" />
          </Link>
          <Link href="/valaistus-ja-valaisinasennukset">
            <Icon name="bulb" />
            <span><strong>Valaistus ja valaisinasennukset</strong><small>Valaisimien asennukset ja valaistukseen liittyvät sähkötyöt.</small></span>
            <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
