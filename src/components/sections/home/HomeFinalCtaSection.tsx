import { ButtonLink } from "@/components/ui/ButtonLink";
import { company, contactLinks } from "@/content/company";

export function HomeFinalCtaSection() {
  return (
    <section className="section home-final-cta">
      <div className="container home-final-cta__layout">
        <div>
          <p className="eyebrow"><span aria-hidden="true" />Ullanlinnan Sähkö Oy</p>
          <h2>Tarvitsetko apua sähköasioissa?</h2>
          <p>Ota yhteyttä ja kerro, mitä tarvitset. Sovitaan seuraava vaihe tilanteen mukaan.</p>
        </div>
        <div className="home-final-cta__actions">
          <ButtonLink href={contactLinks.phone} variant="inverse" icon="phone">Soita {company.phoneDisplay}</ButtonLink>
          <a className="button button--secondary" href={contactLinks.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          <ButtonLink href="/#yhteydenotto" variant="secondary">Pyydä yhteydenottoa</ButtonLink>
        </div>
      </div>
    </section>
  );
}
