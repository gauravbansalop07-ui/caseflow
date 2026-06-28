"use client";

import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { CTASection } from "@/components/landing/cta-section";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <div id="features">
        <FeaturesSection />
      </div>
      <HowItWorksSection />
      <CTASection />
    </>
  );
}
