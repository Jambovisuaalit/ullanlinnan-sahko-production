import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeTrustBar } from "@/components/sections/home/HomeTrustBar";
import { HomeServicesSection } from "@/components/sections/home/HomeServicesSection";
import { HomeRepairSection } from "@/components/sections/home/HomeRepairSection";
import { HomeStoreSection } from "@/components/sections/home/HomeStoreSection";
import { HomeSubcontractorSection } from "@/components/sections/home/HomeSubcontractorSection";
import { HomeAboutSection } from "@/components/sections/home/HomeAboutSection";
import { HomeProcessSection } from "@/components/sections/home/HomeProcessSection";
import { HomeLocationSection } from "@/components/sections/home/HomeLocationSection";
import { HomeFinalCtaSection } from "@/components/sections/home/HomeFinalCtaSection";

export function HomePage() {
  return (
    <main id="main-content">
      <HomeHero />
      <HomeTrustBar />
      <HomeServicesSection />
      <HomeRepairSection />
      <HomeStoreSection />
      <HomeSubcontractorSection />
      <HomeAboutSection />
      <HomeProcessSection />
      <HomeLocationSection />
      <HomeFinalCtaSection />
    </main>
  );
}
