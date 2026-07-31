import { Icon } from "@/components/ui/Icon";

const trustItems = [
  { icon: "pin", title: "Paikallinen palvelu", text: "Pietarinkatu 21, Ullanlinna" },
  { icon: "bulb", title: "Yksi toimija", text: "Sähkötyöt, valaisinkorjaus ja myymälä" },
  { icon: "check", title: "Selkeä eteneminen", text: "Työn rajaus lähtötietojen perusteella" }
] as const;

export function HomeTrustBar() {
  return (
    <section className="trust-bar" aria-label="Ullanlinnan Sähkön palvelun perusteet">
      <div className="container trust-bar__grid">
        {trustItems.map((item) => (
          <div key={item.title} className="trust-bar__item">
            <Icon name={item.icon} />
            <span><strong>{item.title}</strong><small>{item.text}</small></span>
          </div>
        ))}
      </div>
    </section>
  );
}
