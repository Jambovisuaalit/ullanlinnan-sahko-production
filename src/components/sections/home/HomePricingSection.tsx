import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function HomePricingSection() {
  return (
    <section className="section section--warm" id="hinnasto">
      <div className="container split-layout">
        <div className="feature-copy">
          <SectionHeader eyebrow="Hinnasto" title="Sähkötöiden hinnat" />
          <p>
            Työn lopullinen hinta määräytyy työn sisällön, kohteen ja tarvittavien materiaalien perusteella.
            Sähkömiehen tuntihinta julkaistaan tähän heti, kun hinnasto on vahvistettu.
          </p>
          <ButtonLink href="/yhteystiedot#yhteydenotto" icon="arrow">Kysy työn hinta-arviota</ButtonLink>
        </div>
        <div className="notice-card">
          <strong>Tuntihinta vahvistetaan ennen julkaisua</strong>
          <p>Emme näytä arvausta tai vanhaa hintaa. Hanna vahvistaa ajantasaisen hinnaston.</p>
        </div>
      </div>
    </section>
  );
}
