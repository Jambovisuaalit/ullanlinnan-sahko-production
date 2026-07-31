import Image from "next/image";
import type { CSSProperties } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

type MediaFrameProps = {
  src?: string;
  alt?: string;
  requirement: string;
  ratio?: "4/3" | "16/10" | "4/5";
  priority?: boolean;
  tone?: "warm" | "olive" | "dark";
  fallbackTitle?: string;
  fallbackEyebrow?: string;
  icon?: IconName;
};

export function MediaFrame({
  src,
  alt,
  ratio = "4/3",
  priority = false,
  tone = "warm",
  fallbackTitle = "Sähkö- ja valaisinpalvelut Helsingissä",
  fallbackEyebrow = "Ullanlinnan Sähkö Oy",
  icon = "bulb"
}: MediaFrameProps) {
  return <figure className={`media-frame media-frame--${tone}`} style={{ "--media-ratio": ratio.replace("/", " / ") } as CSSProperties}>
    {src && alt ? <Image src={src} alt={alt} fill sizes="(min-width: 64rem) 50vw, 100vw" preload={priority} /> : <>
      <div className={`media-brand-panel media-brand-panel--${icon}`} aria-hidden="true">
        <span className="media-brand-panel__eyebrow">{fallbackEyebrow}</span>
        <span className="media-brand-panel__watermark"><Icon name={icon} /></span>
        <span className="media-brand-panel__icon"><Icon name={icon} /></span>
        <strong>{fallbackTitle}</strong>
        <span className="media-brand-panel__location">Pietarinkatu 21 · Helsinki</span>
      </div>
      <figcaption className="sr-only">{fallbackTitle}. Ullanlinnan Sähkö Oy, Pietarinkatu 21, Helsinki.</figcaption>
    </>}
  </figure>;
}
