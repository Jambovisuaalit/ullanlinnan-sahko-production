import { productCategories } from "@/content/store";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function HomeStoreSection() {
  return (
    <section className="section shop-teaser">
      <div className="container">
        <SectionHeader
          eyebrow="Verkkokauppa"
          title="Valikoidut tuotteet Ullanlinnan Sähköltä"
          lead="Myymälän tuotevalikoimaa tuodaan verkkoon vaiheittain. Tällä hetkellä voit tutustua tuoteryhmiin ja tiedustella yksittäisten tuotteiden saatavuutta."
        />
        <div className="shop-teaser__notice">
          <strong>Verkkotilaus ja verkkomaksaminen eivät ole vielä käytössä.</strong>
          <span>Tuotteiden nimet, hinnat, varastosaatavuus ja toimitustavat julkaistaan vasta, kun ne on vahvistettu.</span>
        </div>
        <div className="shop-category-grid">
          {productCategories.slice(0, 4).map((category) => (
            <article className="shop-category-card" key={category.id}>
              <Icon name={category.id === "varaosat" ? "wrench" : "bulb"} />
              <h2>{category.title}</h2>
              <p>{category.text}</p>
            </article>
          ))}
        </div>
        <div className="button-row">
          <ButtonLink href="/verkkokauppa" icon="arrow">Tutustu verkkokauppaan</ButtonLink>
          <ButtonLink href="/myymala" variant="secondary">Myymälän tiedot</ButtonLink>
        </div>
      </div>
    </section>
  );
}
