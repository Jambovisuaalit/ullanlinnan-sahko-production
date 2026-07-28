import { FooterBottom } from "@/components/layout/footer/FooterBottom";
import { FooterBrand } from "@/components/layout/footer/FooterBrand";
import { FooterContact } from "@/components/layout/footer/FooterContact";
import { FooterNavigation } from "@/components/layout/footer/FooterNavigation";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <FooterBrand />
        <FooterNavigation />
        <FooterContact />
      </div>
      <FooterBottom />
    </footer>
  );
}
