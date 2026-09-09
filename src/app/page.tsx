import { HeroSection } from "@/components/home/HeroSection";
import { StepsSection } from "@/components/home/StepsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ClassifiedsPreview } from "@/components/home/ClassifiedsPreview";
import { PricingPreview } from "@/components/home/PricingPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { QuickContactSection } from "@/components/home/QuickContactSection";

export const revalidate = 60; // ISR cada 60s

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StepsSection />
      <FeaturesSection />
      <ClassifiedsPreview />
      <PricingPreview />
      <TestimonialsSection />
      <QuickContactSection />
    </>
  );
}
