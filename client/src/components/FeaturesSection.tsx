import { Atom, Brain, FlaskConical, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Simulations",
      description:
        "Advanced machine learning algorithms predict molecular behavior and chemical reactions with unprecedented accuracy.",
      gradient: "bg-gradient-primary-solid",
      shadowClass: "shadow-glow-primary",
    },
    {
      icon: Atom,
      title: "3D Molecular Visualizations",
      description:
        "Immersive 3D models that let you explore molecular structures, bonds, and interactions in stunning detail.",
      gradient: "bg-gradient-secondary",
      shadowClass: "shadow-glow-secondary",
    },
    {
      icon: FlaskConical,
      title: "Virtual Lab Experience",
      description:
        "Access a complete digital laboratory with unlimited reagents, equipment, and safety - available 24/7.",
      gradient: "bg-gradient-accent",
      shadowClass: "shadow-glow-accent",
    },
    {
      icon: Users,
      title: "Easy Access for Everyone",
      description:
        "Designed for students, researchers, and curious minds - no expensive equipment or dangerous chemicals required.",
      gradient: "bg-gradient-primary-solid",
      shadowClass: "shadow-elegant",
    },
  ];

  return (
    <section className="py-24 px-6 bg-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-primary mb-6">
            <Atom className="w-6 h-6 animate-float" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Core Features
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
            Everything you need for
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              modern chemistry education
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful tools that transform how you learn, teach, and discover
            chemistry through cutting-edge technology.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 hover:shadow-lg animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Feature Icon */}
              <div
                className={`w-16 h-16 ${feature.gradient} rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${feature.shadowClass} group-hover:animate-glow-pulse`}
              >
                <feature.icon className="w-8 h-8 text-background" />
              </div>

              {/* Feature Content */}
              <h3 className="text-2xl font-display font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed text-lg">
                {feature.description}
              </p>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Additional Features List */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border">
            <div className="text-2xl font-bold text-primary mb-2">1000+</div>
            <div className="text-muted-foreground">Chemical Compounds</div>
          </div>

          <div className="p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border">
            <div className="text-2xl font-bold text-secondary mb-2">
              Real-time
            </div>
            <div className="text-muted-foreground">Reaction Simulation</div>
          </div>

          <div className="p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border">
            <div className="text-2xl font-bold text-accent mb-2">24/7</div>
            <div className="text-muted-foreground">Lab Access</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
