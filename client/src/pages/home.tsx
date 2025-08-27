import CtaSection from "@/components/CtaSection";
import DemoSection from "@/components/DemoSection";
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection1 from "@/components/HeroSection1";
import ProblemSolutionSection from "@/components/ProblemSolutionSection1";
import TestimonialsSection from "@/components/TestimonialsSection1";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection1 />
      <ProblemSolutionSection />
      <FeaturesSection />
      <DemoSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
};

export default Index;
