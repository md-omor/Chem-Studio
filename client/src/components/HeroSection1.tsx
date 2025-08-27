import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const HeroSection1 = () => {
  const scrollToNextSection = () => {
    const nextSection = document.querySelector("#problem-solution-section");
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Centered Gradient Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="hero-gradient-glow"></div>
      </div>

      {/* Background Image with Overlay */}

      {/* Floating Particles Animation */}
      <div className="absolute inset-0 z-10">
        <div className="animate-float absolute top-20 left-10 w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
        <div
          className="animate-float absolute top-40 right-20 w-4 h-4 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="animate-float absolute bottom-40 left-20 w-3 h-3 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="animate-float absolute bottom-20 right-10 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="animate-float absolute top-1/3 left-1/4 w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="animate-float absolute bottom-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"
          style={{ animationDelay: "5s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center max-w-5xl mx-auto px-6 animate-fade-in-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-muted/50 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-8 text-sm">
          <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse"></div>
          <span className="text-muted-foreground font-montserrat font-bold">
            Now in Beta
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-montserrat font-bold mb-10 text-gradient-hero">
          Your Curiosity,
          <br />
          <span className="bg-gradient-primary bg-clip-text text-transparent font-montserrat font-bold">
            Our Chemistry Lab
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-14 leading-relaxed font-montserrat font-normal">
          AI-powered chemistry simulations, 3D molecular visualizations, and
          virtual lab experiences that bring science to life.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 ">
          <Button
            variant="hero"
            size="lg"
            className="text-lg px-8 !rounded-[4px] py-4 h-auto group font-montserrat font-medium text-white"
            onClick={scrollToNextSection}
          >
            Explore Now
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            variant="heroSecondary"
            size="lg"
            className="text-lg px-8 !rounded-[4px] py-4 h-auto group font-montserrat font-medium"
          >
            <Play className="mr-2 group-hover:scale-110 transition-transform" />
            Join Beta
          </Button>
        </div>

        {/* Stats/Social Proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-muted-foreground mb-16 sm:mb-0 w-full">
          <div className="flex items-center gap-3 justify-center">
            <div className="w-8 h-8 bg-gradient-primary-solid rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-background">✓</span>
            </div>
            <span className="font-montserrat font-medium">
              Free for Students
            </span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <div className="w-8 h-8 bg-gradient-secondary-solid rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-background">AI</span>
            </div>
            <span className="font-montserrat font-medium">AI-Powered</span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <div className="w-8 h-8 bg-gradient-accent-solid rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-background">3D</span>
            </div>
            <span className="font-montserrat font-medium">
              3D Visualization
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block">
        <div
          className="animate-bounce cursor-pointer"
          onClick={scrollToNextSection}
        >
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center hover:border-primary transition-colors">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection1;
