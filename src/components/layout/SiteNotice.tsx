import { company, contactLinks } from "@/content/company";
import { Icon } from "@/components/ui/Icon";
import { StoreStatus } from "@/components/ui/StoreStatus";

export function SiteNotice() {
  return (
    <div className="site-notice">
      <div className="container site-notice__row">
        <span>
          <Icon name="clock" />
          <StoreStatus compact />
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
