import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function HomePricingSection() {
  const hourlyRate = process.env.ELECTRICIAN_HOURLY_RATE_DISPLAY?.trim();

  if (!hourlyRate) return null;

  return (
    <section className="section section--warm" id="hinnasto">
      <div className="container split-layout">
        <div className="feature-copy">
          <SectionHeader eyebrow="Hinnasto" title="Sähkötöiden hinnat" />
          <p>
            Työn lopullinen hinta määräytyy työn sisällön, kohteen ja tarvittavien materiaalien perusteella.
            Mahdolliset materiaalit, matkakulut ja muut erilliset kustannukset sovitaan työn rajauksen yhteydessä.
          </p>
          <ButtonLink href="/yhteystiedot#yhteydenotto" icon="arrow">Kysy työn hinta-arviota</ButtonLink>
        </div>
        <div className="notice-card" aria-label="Sähkömiehen tuntihinta">
          <span>Sähkömiehen tuntihinta</span>
          <strong>{hourlyRate}</strong>
          <p>Ajantasainen vahvistettu tuntihinta. Työn kokonaiskustannus riippuu toimeksiannon todellisesta laajuudesta.</p>
        </div>
      </div>
    </section>
  );
}
