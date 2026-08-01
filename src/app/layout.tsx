import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/libre-baskerville/400.css";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { AnalyticsConsent } from "@/components/analytics/AnalyticsConsent";
import { JsonLdScript } from "@/components/ui/JsonLd";
import { company } from "@/content/company";
import { seoPages } from "@/content/seo";
import { brandAssets } from "@/content/brand-assets";
import { buildMetadata } from "@/lib/seo/metadata";
import { localBusinessSchema, websiteSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  ...buildMetadata(seoPages.home),
  applicationName: company.name,
  icons: {
    icon: [
      { url: brandAssets.faviconSvg, type: "image/svg+xml" },
      { url: brandAssets.faviconIco }
    ],
    apple: [
      {
        url: brandAssets.appleTouchIcon,
        sizes: "180x180",
        type: "image/png"
      }
    ]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF9F5" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const analyticsEnabled = process.env.NEXT_PUBLIC_ENABLE_GA4 === "true";
  const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim();

  return (
    <html lang="fi">
      <body>
        <a className="skip-link" href="#main-content">Siirry pääsisältöön</a>
        <Header />
        {children}
        <Footer />
        <MobileActionBar />
        {analyticsEnabled && measurementId ? <AnalyticsConsent measurementId={measurementId} /> : null}
        <JsonLdScript data={localBusinessSchema()} />
        <JsonLdScript data={websiteSchema()} />
      </body>
    </html>
  );
}
