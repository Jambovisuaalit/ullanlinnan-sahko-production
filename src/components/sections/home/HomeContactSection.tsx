import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { company, contactLinks } from "@/content/company";
export function HomeContactSection() {
  const attachmentsEnabled = process.env.NEXT_PUBLIC_ENABLE_CONTACT_ATTACHMENTS === "true";
  return <section className="contact-section" id="yhteydenotto"><div className="container contact-layout"><div className="contact-copy"><SectionHeader eyebrow="Yhteydenotto" title="Kerro, millaista apua tarvitset"/><p>Anna riittävät lähtötiedot. Älä lähetä lomakkeella tarpeettomia henkilötietoja.</p>{!attachmentsEnabled ? <p>Jos kuvat auttavat asian arvioinnissa, voit lähettää ne erikseen sähköpostitse: <a href={contactLinks.email}>{company.email}</a>.</p> : null}<p><a href={contactLinks.phone}>{company.phoneDisplay}</a><br/><a href={contactLinks.email}>{company.email}</a></p></div><div className="contact-card"><ContactForm /></div></div></section>;
}
