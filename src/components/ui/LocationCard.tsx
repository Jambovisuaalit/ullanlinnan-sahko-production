import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { company, contactLinks } from "@/content/company";

export function LocationCard() {
  return (
    <div className="location-card">
      <div className="location-card__map" aria-hidden="true">
        <span className="location-card__road location-card__road--one" />
        <span className="location-card__road location-card__road--two" />
        <span className="location-card__road location-card__road--three" />
        <span className="location-card__water" />
        <span className="location-card__pin"><Icon name="pin" /></span>
        <span className="location-card__label">Pietarinkatu</span>
      </div>
      <div className="location-card__content">
        <p className="eyebrow"><span aria-hidden="true" />Ullanlinna</p>
        <h3>{company.address.street}</h3>
        <p>{company.address.postalCode} {company.address.city}</p>
        <ButtonLink href={contactLinks.directions} external icon="arrow">Avaa reittiohje</ButtonLink>
      </div>
    </div>
  );
}
