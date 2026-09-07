import { useLenis } from "@/hooks/useLenis";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/sections/HeroSection";
import { MissionSection } from "@/sections/MissionSection";
import { AboutSection } from "@/sections/AboutSection";
import { ProgramsSection } from "@/sections/ProgramsSection";
import { StorySection } from "@/sections/StorySection";
import { CTASection } from "@/sections/CTASection";
import { Footer } from "@/sections/Footer";
import { Routes, Route } from "react-router";
import DonationPreferences from "@/pages/DonationPreferences";

function HomePage() {
  useLenis();

  return (
    <div className="relative">
      <Navigation />
      <main>
        <HeroSection />
        <MissionSection />
        <AboutSection />
        <ProgramsSection />
        <StorySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/donate" element={<DonationPreferences />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default App;
