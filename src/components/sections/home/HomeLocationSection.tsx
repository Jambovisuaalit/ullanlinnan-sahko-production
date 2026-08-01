import { Icon } from "@/components/ui/Icon";
import { LocationCard } from "@/components/ui/LocationCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { company } from "@/content/company";
export function HomeLocationSection() { return <section className="section"><div className="container location-layout"><div><SectionHeader eyebrow="Sijainti" title="Pietarinkatu 21, Helsinki"/><div className="visit-grid"><article><Icon name="pin"/><strong>{company.address.street}</strong><small>{company.address.postalCode} {company.address.city}</small></article><article><Icon name="clock"/><strong>Keskiviikkoisin</strong><small>klo 10–17</small></article><article><Icon name="phone"/><strong>{company.phoneDisplay}</strong><small>Soita ennen käyntiä, kun etsit tiettyä tuotetta.</small></article></div></div><LocationCard /></div></section>; }
