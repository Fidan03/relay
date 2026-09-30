import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { FeaturesGrid } from "@/components/features-grid";
import { Pricing } from "@/components/pricing";
import { IntegrationShowcase } from "@/components/integration-showcase";
import { SocialProof } from "@/components/social-proof";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturesGrid />
      <Pricing />
      <IntegrationShowcase />
      <SocialProof />
      <Faq />
      <FinalCta />
    </>
  );
}
