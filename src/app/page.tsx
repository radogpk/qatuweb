import { getFeaturedBusinesses } from "@/lib/data/businesses.repo";
import { HeroSection } from "@/components/home/HeroSection";
import { StepsSection } from "@/components/home/StepsSection";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { ClassifiedsPreview } from "@/components/home/ClassifiedsPreview";
import { PricingPreview } from "@/components/home/PricingPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { QuickContactSection } from "@/components/home/QuickContactSection";

export const revalidate = 60; // ISR cada 60s

export default async function HomePage() {
  const featuredBusinesses = await getFeaturedBusinesses();

  return (
    <>
      <HeroSection />
      <StepsSection />
      <FeaturedGrid businesses={featuredBusinesses} />
      <ClassifiedsPreview />
      <PricingPreview />
      <TestimonialsSection />
      <QuickContactSection />
    </>
  );
}
