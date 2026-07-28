"use client";

import Image from "next/image";
import { useState } from "react";
import { brandAssets } from "@/content/brand-assets";

export function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  const [failed, setFailed] = useState(false);
  const src = inverse ? brandAssets.headerLogoInverse : brandAssets.headerLogo;

  if (failed) {
    return (
      <span className="brand-logo__missing" role="img" aria-label="Ullanlinnan Sähkö Oy">
        <strong>Ullanlinnan Sähkö Oy</strong>
      </span>
    );
  }

  return (
    <Image
      className="brand-logo"
      src={src}
      alt="Ullanlinnan Sähkö Oy"
      width={307}
      height={56}
      priority
      onError={() => setFailed(true)}
    />
  );
}
