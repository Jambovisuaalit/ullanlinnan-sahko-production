import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function PricingSection() {
  const enabled = process.env.NEXT_PUBLIC_ENABLE_PRICING === "true";
  const hourlyRate = process.env.ELECTRICIAN_HOURLY_RATE_DISPLAY?.trim();

  if (!enabled || !hourlyRate) return null;

  return (
    <section id="hinnasto" className="section section--secondary">
      <div className="container pricing-layout">
        <SectionHeader
          eyebrow="Hinnasto"
          title="Sähkömiehen tuntihinta"
          lead="Hinta näytetään vain Hannan vahvistamalla sanamuodolla. Työn lopullinen sisältö ja mahdolliset erikseen sovittavat kulut määritellään kohteen ja lähtötietojen perusteella."
        />
        <div className="pricing-card" aria-label="Sähkömiehen tuntihinta">
          <span className="pricing-card__label">Tuntihinta</span>
          <strong className="pricing-card__rate">{hourlyRate}</strong>
          <p>Tarvitsetko arvion omasta työstäsi? Kerro kohde ja työn tarve, niin asia voidaan rajata ennen tilaamista.</p>
          <ButtonLink href="/yhteystiedot#yhteydenotto">Kysy työstä</ButtonLink>
        </div>
      </div>
    </section>
  );
}
