import { ButtonLink } from "@/components/ui/ButtonLink";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { SectionHeader } from "@/components/ui/SectionHeader";

const reasons = [
  { title: "Paikallinen toimija", text: "Palvelua Helsingissä, Ullanlinnasta käsin." },
  { title: "Monipuolinen osaaminen", text: "Sähkötyöt, asennukset ja valaisimien korjaus." },
  { title: "Helppo yhteydenotto", text: "Puhelin, WhatsApp ja verkkolomake." },
  { title: "Myymälä ja valikoima", text: "Valaisimet, polttimot, varaosat ja tarvikkeet Pietarinkadulla." }
] as const;

export function HomeAboutSection() {
  return (
    <section className="section">
      <div className="container split-layout split-layout--media-first">
        <div className="feature-copy">
          <SectionHeader eyebrow="Miksi Ullanlinnan Sähkö?" title="Sähkötyöt, valaisinkorjaus ja myymälä saman toimijan kautta" />
          <p>Ullanlinnan Sähkö Oy yhdistää sähköalan palvelut, valaisimien korjaamisen ja paikallisen myymäläasioinnin.</p>
          <div className="why-us-grid">
            {reasons.map((reason) => (
              <article key={reason.title}>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            ))}
          </div>
          <ButtonLink href="/meista" variant="secondary" icon="arrow">Lue yrityksestä</ButtonLink>
        </div>
        <MediaFrame requirement="Nykyinen ja todenmukainen kuva yrityksestä tai työympäristöstä." fallbackTitle="Paikallinen sähkö- ja valaisinliike Helsingissä" icon="home" ratio="4/3" />
      </div>
    </section>
  );
}
