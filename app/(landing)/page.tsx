import { LandingContent } from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";
import { Footer } from "@/components/footer";

const LandingPage = () => {
  return (
    <div className="h-full">
        <LandingNavbar />
        <LandingHero />
        <LandingContent />
        <Footer />
    </div>
  )
}

export default LandingPage;