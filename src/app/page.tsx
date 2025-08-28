import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { WhoWeAre } from "@/components/who-we-are";
import { HowItWorks } from "@/components/how-it-works";
import { MissionPromise } from "@/components/mission-promise";
import { Testimonials } from "@/components/testimonials";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <WhoWeAre />
      <HowItWorks />
      <MissionPromise />
      <Testimonials />
      <Footer />
    </main>
  );
}
