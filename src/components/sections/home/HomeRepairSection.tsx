import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { company, contactLinks } from "@/content/company";

export function HomeRepairSection() {
  const attachmentsEnabled = process.env.NEXT_PUBLIC_ENABLE_CONTACT_ATTACHMENTS === "true";
  return <section className="section section--olive"><div className="container split-layout"><div className="feature-copy"><SectionHeader eyebrow="Valaisimien korjaus" title="Kannattaako valaisin korjata?"/><p>Kaikkia valaisimia ei voida korjata. Alustavaa arviota varten tarvitaan kuva valaisimesta, viasta ja näkyvistä merkinnöistä.</p>{!attachmentsEnabled ? <p className="caption">Kuvat voi toimittaa erikseen sähköpostitse: <a href={contactLinks.email}>{company.email}</a>.</p> : null}<ul className="check-list"><li><Icon name="check"/>Rakenne ja sähköosien kunto</li><li><Icon name="check"/>Varaosien saatavuus ja yhteensopivuus</li><li><Icon name="check"/>Turvallinen ja tarkoituksenmukainen toteutus</li></ul><ButtonLink href="/valaisimien-korjaus" variant="inverse" icon="arrow">Kysy korjauksesta</ButtonLink></div><MediaFrame tone="dark" requirement="Aito valaisin korjauspisteellä." fallbackTitle="Valaisimien korjaus Helsingissä" icon="wrench" ratio="4/3"/></div></section>;
}
