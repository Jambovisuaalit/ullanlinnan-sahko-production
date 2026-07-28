import { company } from "@/content/company";

export function FooterBottom() {
  return (
    <div className="container footer-bottom">
      <span>
        © {new Date().getFullYear()} {company.name}
      </span>
      <span>Y-tunnus {company.businessId}</span>
    </div>
  );
}
