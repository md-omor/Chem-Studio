import { Button } from "@/components/ui/button";
import { Play, Monitor, Sparkles } from "lucide-react";

const DemoSection = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-secondary mb-6">
            <Monitor className="w-6 h-6" />
            <span className="text-sm font-medium uppercase tracking-wider">Live Demo</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
            See ChemStudio in
            <span className="block bg-gradient-secondary bg-clip-text text-transparent">
              action
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Experience the future of chemistry education with our interactive platform. 
            Watch molecules come to life, simulate reactions, and explore the molecular world like never before.
          </p>
        </div>

        {/* Demo Interface Mockup */}
        <div className="relative mb-16">
          {/* Main Demo Container */}
          <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-elegant">
            {/* Mock Browser Bar */}
            <div className="bg-muted/50 border-b border-border p-4 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 bg-background/50 rounded-lg px-4 py-2 text-sm text-muted-foreground">
                chemstudio.xyz/lab/molecular-dynamics
              </div>
            </div>

            {/* Demo Content Area */}
            <div className="relative aspect-video bg-gradient-dark p-8 flex items-center justify-center">
              {/* Demo Placeholder Content */}
              <div className="text-center space-y-6">
                {/* Animated Molecules */}
                <div className="flex justify-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-primary rounded-full shadow-glow-primary animate-float"></div>
                  <div className="w-12 h-12 bg-secondary rounded-full shadow-glow-secondary animate-float" style={{animationDelay: "1s"}}></div>
                  <div className="w-20 h-20 bg-accent rounded-full shadow-glow-accent animate-float" style={{animationDelay: "2s"}}></div>
                </div>

                {/* Mock Interface Elements */}
                <div className="space-y-4">
                  <div className="bg-muted/20 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
                    <div className="text-primary text-sm font-medium mb-2">H₂O Molecule Analysis</div>
                    <div className="flex gap-2">
                      <div className="h-2 bg-primary/30 rounded-full flex-1"></div>
                      <div className="h-2 bg-primary rounded-full w-20"></div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/20 backdrop-blur-sm rounded-lg p-4 border border-secondary/20">
                    <div className="text-secondary text-sm font-medium mb-2">Bond Energy: 463.5 kJ/mol</div>
                    <div className="flex gap-2">
                      <div className="h-2 bg-secondary/30 rounded-full flex-1"></div>
                      <div className="h-2 bg-secondary rounded-full w-32"></div>
                    </div>
                  </div>
                </div>

                {/* Play Button Overlay */}
                <div className="relative">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="text-lg px-8 py-6 h-auto group bg-background/10 backdrop-blur-sm hover:bg-background/20"
                  >
                    <Play className="mr-2 group-hover:scale-110 transition-transform" />
                    Watch Interactive Demo
                  </Button>
                </div>
              </div>

              {/* Floating UI Elements */}
              <div className="absolute top-6 left-6">
                <div className="bg-card/80 backdrop-blur-sm rounded-lg p-3 border border-border shadow-lg">
                  <div className="text-xs text-muted-foreground">Active Simulation</div>
                  <div className="text-sm font-medium text-primary">Benzene Ring Formation</div>
                </div>
              </div>

              <div className="absolute bottom-6 right-6">
                <div className="bg-card/80 backdrop-blur-sm rounded-lg p-3 border border-border shadow-lg">
                  <div className="text-xs text-muted-foreground">AI Analysis</div>
                  <div className="text-sm font-medium text-secondary flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Ready
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glowing Border Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-20 blur-xl -z-10 animate-glow-pulse"></div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button 
            variant="hero" 
            size="lg" 
            className="text-xl px-12 py-8 h-auto group"
          >
            Try the Beta Now
            <Sparkles className="ml-2 group-hover:scale-110 transition-transform" />
          </Button>
          
          <p className="text-muted-foreground mt-4">
            No signup required • Free for students • Available 24/7
          </p>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;