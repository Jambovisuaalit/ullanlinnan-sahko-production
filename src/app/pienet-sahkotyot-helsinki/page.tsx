import type { Metadata } from "next";
import { ServicePage } from "@/components/pages/ServicePage";
import { services } from "@/content/services";
import { seoPages } from "@/content/seo";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(seoPages.smallElectrical);

export default function Page() {
  return <ServicePage content={services.smallElectrical} seo={seoPages.smallElectrical} serviceType="Pienet sähkötyöt" />;
}
