import { HeroSection } from "@/components/hero-section"
import { ValueBlocks } from "@/components/value-blocks"
import { Navigation } from "@/components/navigation"
import { PlatformSection } from "@/components/platform-section"
import { ESGSection } from "@/components/esg-section"
import { RWAMarketSection } from "@/components/rwa-market-section"
import { AIArchitectureSection } from "@/components/ai-architecture-section"
import { AIROIFactorsSection } from "@/components/ai-roi-factors-section"
import { ROICalculatorSection } from "@/components/roi-calculator-section"
import { PartnersSection } from "@/components/partners-section"
import { AboutSection } from "@/components/about-section"
import { TeamSection } from "@/components/team-section"
import { ContactSection } from "@/components/contact-section"
import { ResourcesSection } from "@/components/resources-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <PlatformSection />
      <ValueBlocks />
      <ESGSection />
      <RWAMarketSection />
      <AIArchitectureSection />
      <AIROIFactorsSection />
      <ROICalculatorSection />
      <PartnersSection />
      <AboutSection />
      <TeamSection />
      <ContactSection />
      <ResourcesSection />
      <Footer />
    </main>
  )
}
