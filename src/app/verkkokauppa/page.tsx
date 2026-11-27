import type { Metadata } from "next";
import { StorefrontPage } from "@/components/pages/StorefrontPage";
import { seoPages } from "@/content/seo";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(seoPages.shop);

export default function Page() {
  return <StorefrontPage />;
}
