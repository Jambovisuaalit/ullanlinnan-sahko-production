import { company, contactLinks } from "@/content/company";
import { Icon } from "@/components/ui/Icon";

export function SiteNotice() {
  return (
    <div className="site-notice">
      <div className="container site-notice__row">
        <span>
          <Icon name="clock" />
          <span className="site-notice__mobile-copy">Avoinna ke 10–17</span>
          <span className="site-notice__desktop-copy">
            Myymälä avoinna {company.openingHours.display.toLowerCase()}
          </span>
        </span>
        <span>
          <Icon name="pin" />
          {company.address.street}, {company.address.postalCode} {company.address.city}
        </span>
        <a href={contactLinks.phone}>
          <Icon name="phone" />
          {company.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
