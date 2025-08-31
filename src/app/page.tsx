import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { FeaturesGrid } from "@/components/features-grid";
import { DemoShowcase } from "@/components/demo-showcase";
import { HowItWorks } from "@/components/how-it-works";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <SocialProof />
      <FeaturesGrid />
      <DemoShowcase />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
