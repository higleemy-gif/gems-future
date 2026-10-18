import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/home/Hero";
import { TrustStats } from "@/components/home/TrustStats";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyUs } from "@/components/home/WhyUs";
import { CareerPaths } from "@/components/home/CareerPaths";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <TrustStats />
        <HowItWorks />
        <WhyUs />
        <CareerPaths />
        <Testimonials />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
