import type { Metadata } from "next";
import { SubcontractorPage } from "@/components/pages/SubcontractorPage";
import { seoPages } from "@/content/seo";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(seoPages.subcontractor);

export default function Page() {
  return <SubcontractorPage />;
}
