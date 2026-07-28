import Image from "next/image";
import { brandAssets } from "@/content/brand-assets";

type BrandLogoProps = {
  inverse?: boolean;
  priority?: boolean;
};

export function BrandLogo({ inverse = false, priority = false }: BrandLogoProps) {
  const src = inverse ? brandAssets.headerLogoInverse : brandAssets.headerLogo;

  return (
    <Image
      className="brand-logo"
      src={src}
      alt="Ullanlinnan Sähkö Oy"
      width={307}
      height={56}
      priority={priority}
    />
  );
}
