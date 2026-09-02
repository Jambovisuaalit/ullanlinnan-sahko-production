import Image from "next/image";
import type { CSSProperties } from "react";
import type { IconName } from "@/components/ui/Icon";

type MediaFrameProps = {
  src?: string;
  alt?: string;
  requirement: string;
  ratio?: "4/3" | "16/10" | "4/5";
  priority?: boolean;
  tone?: "warm" | "olive" | "dark";
  fallbackTitle?: string;
  icon?: IconName;
};

const illustrationByIcon: Partial<Record<IconName, string>> = {
  bolt: "/images/usoy-visual-electrical.svg",
  bulb: "/images/usoy-visual-lighting.svg",
  wrench: "/images/usoy-visual-repair.svg",
  store: "/images/usoy-visual-store.svg",
  home: "/images/usoy-visual-local.svg",
  building: "/images/usoy-visual-local.svg"
};

export function MediaFrame({
  src,
  alt,
  ratio = "4/3",
  priority = false,
  tone = "warm",
  fallbackTitle = "Sähkö- ja valaisinpalvelut Helsingissä",
  icon = "bulb"
}: MediaFrameProps) {
  const fallbackSrc = illustrationByIcon[icon] ?? "/images/usoy-visual-lighting.svg";

  return (
    <figure
      className={`media-frame media-frame--${tone}`}
      style={{ "--media-ratio": ratio.replace("/", " / ") } as CSSProperties}
      data-media-source={src && alt ? "photography" : "brand-illustration"}
    >
      {src && alt ? (
        <Image src={src} alt={alt} fill sizes="(min-width: 64rem) 50vw, 100vw" preload={priority} />
      ) : (
        <>
          <div className="media-illustration" aria-hidden="true">
            <Image
              src={fallbackSrc}
              alt=""
              fill
              sizes="(min-width: 64rem) 50vw, 100vw"
              preload={priority}
            />
          </div>
          <figcaption className="sr-only">
            Brändikuvitus: {fallbackTitle}. Kuvitus ei esitä yksittäistä asiakaskohdetta.
          </figcaption>
        </>
      )}
    </figure>
  );
}
