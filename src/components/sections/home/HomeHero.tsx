import { QuickContactForm } from "@/components/forms/QuickContactForm";
import { Icon } from "@/components/ui/Icon";
import { company, contactLinks } from "@/content/company";

export function HomeHero() {
  return (
    <section className="conversion-hero">
      <div className="container conversion-hero__layout">
        <div className="conversion-hero__copy">
          <p className="eyebrow"><span aria-hidden="true" />Sähköpalvelut Helsingissä</p>
          <h1>Sähkötyöt nopeasti ja luotettavasti.</h1>
          <p className="conversion-hero__lead">
            Sähköasennukset, vikakorjaukset ja sähköalan palvelut koteihin, yrityksille ja taloyhtiöille Helsingissä ja lähialueilla.
          </p>
        </div>
        <aside id="yhteydenotto" className="quick-contact-card" aria-labelledby="home-contact-heading">
          <h2 id="home-contact-heading">Tarvitsetko sähköasentajaa?</h2>
          <p>Jätä yhteystietosi ja kerro lyhyesti, missä tarvitset apua. Palaamme asiaan.</p>
          <QuickContactForm defaultTopic="electrical" />
        </aside>
        <div className="conversion-hero__details">
          <ul className="conversion-hero__points">
            <li><Icon name="check" />Sähköasennukset ja korjaukset</li>
            <li><Icon name="check" />Sähkövikojen selvittäminen</li>
            <li><Icon name="check" />Kiireelliset sähkötyöt – saatavuus sovitaan puhelimitse</li>
          </ul>
          <div className="conversion-hero__links">
            <a href={contactLinks.phone}>Soita {company.phoneDisplay}</a>
            <a href={contactLinks.whatsapp} target="_blank" rel="noreferrer">Ota yhteyttä WhatsAppissa</a>
          </div>
        </div>
      </div>
    </section>
  );
}
