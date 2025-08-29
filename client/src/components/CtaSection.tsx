import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Sparkles } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background with Gradient and Particles */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        <div className="animate-float absolute top-10 left-10 w-3 h-3 bg-primary rounded-full shadow-glow-primary"></div>
        <div
          className="animate-float absolute top-20 right-20 w-2 h-2 bg-secondary rounded-full shadow-glow-secondary"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="animate-float absolute bottom-20 left-20 w-4 h-4 bg-accent rounded-full shadow-glow-accent"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="animate-float absolute bottom-10 right-10 w-2 h-2 bg-primary-glow rounded-full"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Headline */}
        <div className="inline-flex items-center gap-2 bg-muted/50 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-8">
          <Sparkles className="w-5 h-5 text-primary animate-glow-pulse" />
          <span className="text-sm font-medium">
            Ready to Transform Your Chemistry Experience?
          </span>
        </div>

        <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
          The future of chemistry
          <span className="block bg-gradient-primary bg-clip-text text-transparent pb-3">
            learning is here.
          </span>
          <span className="block text-foreground">Are you ready?</span>
        </h2>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Join the revolution in chemistry education. Experience unlimited
          simulations, 3D molecular visualizations, and AI-powered learning—all
          in your browser.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button
            variant="hero"
            size="lg"
            className="text-xl px-12 py-8 h-auto group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Explore ChemStudio Beta Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </div>

        {/* Website URL Highlight */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-accent" />
            <span className="text-muted-foreground">Visit us at</span>
          </div>

          <div className="text-3xl md:text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent">
            www.chemstudio.xyz
          </div>

          <p className="text-muted-foreground mt-4">
            Free for students • No installation required • Works on any device
          </p>
        </div>

        {/* Additional Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 text-center">
          <div className="p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 bg-gradient-accent-solid rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-background font-bold">✓</span>
            </div>
            <h3 className="font-semibold mb-2">Instant Access</h3>
            <p className="text-muted-foreground text-sm">
              Start experimenting immediately, no downloads needed
            </p>
          </div>

          <div className="p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border hover:border-secondary/30 transition-colors">
            <div className="w-12 h-12 bg-gradient-secondary rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-background font-bold">AI</span>
            </div>
            <h3 className="font-semibold mb-2">AI-Powered</h3>
            <p className="text-muted-foreground text-sm">
              Get intelligent guidance and personalized learning
            </p>
          </div>

          <div className="p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border hover:border-accent/30 transition-colors">
            <div className="w-12 h-12 bg-gradient-accent rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-background font-bold">∞</span>
            </div>
            <h3 className="font-semibold mb-2">Unlimited</h3>
            <p className="text-muted-foreground text-sm">
              Endless experiments without material costs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
