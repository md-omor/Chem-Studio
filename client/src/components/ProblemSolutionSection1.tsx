import { AlertTriangle, CheckCircle, Zap } from "lucide-react";

const ProblemSolutionSection = () => {
  return (
    <section
      id="problem-solution-section"
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Problem Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-destructive mb-6">
            <AlertTriangle className="w-6 h-6" />
            <span className="text-sm font-medium uppercase tracking-wider">
              The Challenge
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 text-foreground leading-tight">
            Chemistry shouldn't be limited by
            <span className="block bg-gradient-to-r from-destructive to-orange-400 bg-clip-text text-transparent">
              expensive labs and static textbooks
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Students and researchers struggle with limited access to advanced
            laboratory equipment, outdated learning materials, and the gap
            between theoretical knowledge and hands-on experience.
            <span className="text-foreground font-medium">
              {" "}
              Curiosity demands more.
            </span>
          </p>
        </div>

        {/* Transition Arrow */}
        <div className="flex justify-center mb-20">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-primary-solid rounded-full flex items-center justify-center shadow-glow-primary animate-glow-pulse">
              <Zap className="w-8 h-8 text-background" />
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-primary to-transparent"></div>
          </div>
        </div>

        {/* Solution Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-primary mb-6">
            <CheckCircle className="w-6 h-6" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Our Solution
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 text-foreground leading-tight">
            ChemStudio Beta brings the future of
            <span className="block bg-gradient-primary bg-clip-text text-transparent pb-3">
              chemistry learning to your fingertips
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
            Experience unlimited virtual simulations, interact with 3D molecular
            models, and explore chemical reactions with AI-powered guidance.
            <span className="text-foreground font-medium">
              {" "}
              Science without boundaries.
            </span>
          </p>

          {/* Solution Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow-primary/20">
              <div className="w-12 h-12 bg-gradient-primary-solid rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Virtual Simulations
              </h3>
              <p className="text-muted-foreground">
                Unlimited access to chemical reactions and experiments
              </p>
            </div>

            <div className="group p-6 rounded-xl bg-card border border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-glow-secondary/20">
              <div className="w-12 h-12 bg-gradient-secondary-solid rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-6 h-6 text-background font-bold">3D</div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Molecular Models</h3>
              <p className="text-muted-foreground">
                Interactive 3D visualizations of complex structures
              </p>
            </div>

            <div className="group p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-glow-accent/20">
              <div className="w-12 h-12 bg-gradient-accent-solid rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-background font-bold text-sm">AI</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Guidance</h3>
              <p className="text-muted-foreground">
                Intelligent assistance for learning and discovery
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
