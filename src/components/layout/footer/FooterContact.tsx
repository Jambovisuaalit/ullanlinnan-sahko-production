import { company, contactLinks } from "@/content/company";

export function FooterContact() {
  return (
    <div>
      <h2>Yhteystiedot</h2>
      <address>
        <a href={contactLinks.phone}>{company.phoneDisplay}</a>
        <a href={contactLinks.email}>{company.email}</a>
        <span>
          {company.address.street}
          <br />
          {company.address.postalCode} {company.address.city}
        </span>
        <span>{company.openingHours.display}</span>
      </address>
    </div>
  );
}
