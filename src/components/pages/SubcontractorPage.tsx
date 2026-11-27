import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { SubcontractorForm } from "@/components/forms/SubcontractorForm";

export function SubcontractorPage() {
  return (
    <main id="main-content">
      <Breadcrumbs items={[{ name: "Etusivu", href: "/" }, { name: "Alihankkijaksi", href: "/alihankkijaksi" }]} />
      <section className="section subcontractor-page">
        <div className="container subcontractor-page__layout">
          <div className="subcontractor-page__copy">
            <p className="eyebrow"><span aria-hidden="true" />Yhteistyökumppaneille</p>
            <h1>Oletko sähköalan ammattilainen?</h1>
            <p className="hero-lead">Etsimme osaavia sähköalan ammattilaisia ja yrityksiä mahdolliseen yhteistyöhön Helsingissä ja lähialueilla.</p>
            <ul className="subcontractor-benefits">
              <li><Icon name="check" />Kerro yrityksesi osaamisesta ja palvelualueesta.</li>
              <li><Icon name="check" />Ilmoita luvat, pätevyydet ja vakuutukset.</li>
              <li><Icon name="check" />Kuvaa lyhyesti, millainen yhteistyö kiinnostaa.</li>
            </ul>
            <p className="subcontractor-page__note">Käymme hakemukset läpi tarpeen mukaan. Hakemuksen lähettäminen ei takaa toimeksiantoa tai yhteistyösopimusta.</p>
          </div>
          <aside className="subcontractor-form-card">
            <p className="eyebrow"><span aria-hidden="true" />Yhteistyöhakemus</p>
            <h2>Hae alihankkijaksi</h2>
            <p>Jätä yhteystiedot ja kuvaus yrityksestäsi. Hakemus toimitetaan erillisenä alihankkijaviestinä.</p>
            <SubcontractorForm />
          </aside>
        </div>
      </section>
    </main>
  );
}
