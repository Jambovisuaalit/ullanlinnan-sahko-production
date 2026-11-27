import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export function HomeSubcontractorSection() {
  return (
    <section className="section subcontractor-promo">
      <div className="container subcontractor-promo__layout">
        <div>
          <p className="eyebrow"><span aria-hidden="true" />Yhteistyökumppaneille</p>
          <h2>Oletko sähköalan ammattilainen?</h2>
          <p>Etsimme osaavia sähköalan ammattilaisia ja yrityksiä mahdolliseen alihankintayhteistyöhön.</p>
        </div>
        <Link className="button button--inverse" href="/alihankkijaksi">Hae alihankkijaksi <Icon name="arrow" /></Link>
      </div>
    </section>
  );
}
