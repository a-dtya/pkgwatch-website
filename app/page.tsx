import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSolution from "@/components/sections/ProblemSolution";
import FeaturesSection from "@/components/sections/FeaturesSection";
import EcosystemCarousel from "@/components/sections/EcosystemCarousel";
import PricingSection from "@/components/sections/PricingSection";
import RoadmapSection from "@/components/sections/RoadmapSection";

function Divider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  );
}

export default function Page() {
  return (
    <div className="bg-bg text-text font-body overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <Divider />
      <ProblemSolution />
      <Divider />
      <FeaturesSection />
      <Divider />
      <EcosystemCarousel />
      <Divider />
      <PricingSection />
      <RoadmapSection />
      <Divider />
      <Footer />
    </div>
  );
}
