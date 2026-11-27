import { homeContent } from "@/content/home";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { company, contactLinks } from "@/content/company";
export function HomeProcessSection() {
  const attachmentsEnabled = process.env.NEXT_PUBLIC_ENABLE_CONTACT_ATTACHMENTS === "true";
  return <section className="section section--black"><div className="container"><SectionHeader eyebrow="Toimintatapa" title="Kolme vaihetta yhteydenotosta eteenpäin" align="center"/><div className="process-grid process-grid--three">{homeContent.process.map((step, index) => <article key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>{!attachmentsEnabled ? <p className="caption">Jos kuvat auttavat asian arvioinnissa, voit lähettää ne erikseen sähköpostitse: <a href={contactLinks.email}>{company.email}</a>.</p> : null}</div></section>;
}
