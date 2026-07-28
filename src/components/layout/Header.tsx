import Link from "next/link";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { SiteNavigation } from "@/components/layout/SiteNavigation";
import { SiteNotice } from "@/components/layout/SiteNotice";

export function Header() {
  return (
    <>
      <SiteNotice />
      <header className="site-header">
        <div className="container site-header__row">
          <Link className="brand-link" href="/" aria-label="Ullanlinnan Sähkö Oy, etusivu">
            <BrandLogo priority />
          </Link>
          <SiteNavigation />
        </div>
      </header>
    </>
  );
}
