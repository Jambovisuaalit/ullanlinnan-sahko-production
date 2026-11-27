import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { productCategories } from "@/content/store";
import { company, contactLinks } from "@/content/company";

export function StorefrontPage() {
  return (
    <main id="main-content">
      <Breadcrumbs items={[{ name: "Etusivu", href: "/" }, { name: "Verkkokauppa", href: "/verkkokauppa" }]} />
      <section className="section storefront-page">
        <div className="container storefront-page__intro">
          <p className="eyebrow"><span aria-hidden="true" />Verkkokauppa</p>
          <h1>Valikoidut tuotteet Ullanlinnan Sähköltä</h1>
          <p className="hero-lead">Verkkokaupan valikoima rakennetaan myymälän todellisista tuotteista. Tuotteiden hinnat, saatavuus ja toimitustavat julkaistaan vasta, kun ne on vahvistettu.</p>
          <div className="storefront-status" role="status">
            <strong>Verkko-ostaminen ei ole vielä käytössä.</strong>
            <span>Voit tiedustella tuotetta ja varmistaa saatavuuden suoraan myymälästä.</span>
          </div>
          <div className="button-row">
            <ButtonLink href="/myymala" icon="arrow">Tutustu myymälään</ButtonLink>
            <ButtonLink href={contactLinks.phone} variant="secondary" icon="phone">Soita {company.phoneDisplay}</ButtonLink>
          </div>
        </div>
      </section>
      <section className="section section--secondary">
        <div className="container">
          <SectionHeader eyebrow="Tuoteryhmät" title="Mitä valikoimasta löytyy?" lead="Tuoteryhmät perustuvat myymälän nykyiseen palvelu- ja tuotekuvaukseen. Yksittäisiä tuotteita ei vielä näytetä verkkokaupassa." />
          <div className="shop-category-grid">
            {productCategories.map((category) => (
              <article key={category.id} id={category.id} className="shop-category-card">
                <Icon name={category.id === "varaosat" ? "wrench" : category.id === "second-hand-valaisimet" ? "store" : "bulb"} />
                <h2>{category.title}</h2>
                <p>{category.text}</p>
                <Link href={"/myymala#" + category.id}>Tiedustele myymälästä <Icon name="arrow" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
