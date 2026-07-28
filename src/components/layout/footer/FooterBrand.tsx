import { BrandLogo } from "@/components/layout/BrandLogo";

export function FooterBrand() {
  return (
    <div className="footer-brand">
      <BrandLogo inverse />
      <p>Paikallinen sähkö- ja valaistusalan yritys Helsingissä.</p>
    </div>
  );
}
