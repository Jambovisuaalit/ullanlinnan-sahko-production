import Link from "next/link";
import { homeContent } from "@/content/home";
import { company, contactLinks } from "@/content/company";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { StoreStatus } from "@/components/ui/StoreStatus";

export function HomeHero() {
  return <section className="hero-section"><div className="container hero-layout"><div className="hero-copy"><p className="eyebrow"><span aria-hidden="true" />{homeContent.hero.eyebrow}</p><h1>{homeContent.hero.title}</h1><p className="hero-lead">{homeContent.hero.lead}</p><div className="button-row"><ButtonLink href="#yhteydenotto">Kerro tarpeestasi</ButtonLink><ButtonLink href={contactLinks.phone} variant="secondary" icon="phone">Soita {company.phoneDisplay}</ButtonLink></div><nav className="hero-paths" aria-label="Nopeat palvelupolut"><Link href="/sahkoasennukset-ja-vikakorjaukset"><Icon name="bolt" /> Tarvitsen sähköasentajan <Icon name="arrow" /></Link><Link href="/valaisimien-korjaus"><Icon name="wrench" /> Haluan korjauttaa valaisimen <Icon name="arrow" /></Link><Link href="/myymala"><Icon name="store" /> Olen tulossa myymälään <Icon name="arrow" /></Link></nav></div><div className="hero-media"><MediaFrame priority requirement="Aito kuva sähköasentajasta tai valaisimen asennustilanteesta." fallbackTitle="Sähkö- ja valaisinosaamista Helsingissä" icon="bulb" ratio="4/3"/><aside className="hero-info-card"><StoreStatus /><strong>{company.address.street}</strong><span>{company.address.postalCode} {company.address.city}</span><a href={contactLinks.directions} target="_blank" rel="noreferrer">Avaa reittiohje <Icon name="arrow" /></a></aside></div></div></section>;
}
