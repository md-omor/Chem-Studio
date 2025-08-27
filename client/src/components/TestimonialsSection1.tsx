import { Quote, Globe, Users, Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "ChemStudio has revolutionized how I teach molecular chemistry. My students are more engaged than ever before.",
      author: "Dr. Sarah Chen",
      role: "Professor of Chemistry",
      institution: "MIT",
      avatar: "SC"
    },
    {
      quote: "The 3D visualizations help me understand complex reactions in ways textbooks never could. It's like having a superpower.",
      author: "Alex Rodriguez",
      role: "Graduate Student",
      institution: "Stanford University", 
      avatar: "AR"
    },
    {
      quote: "Finally, a platform that makes chemistry accessible without compromising on scientific accuracy. Brilliant work!",
      author: "Prof. Michael Thompson",
      role: "Research Director",
      institution: "Oxford University",
      avatar: "MT"
    }
  ];

  return (
    <section className="py-24 px-6 bg-muted/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-secondary/5 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-accent mb-6">
            <Users className="w-6 h-6" />
            <span className="text-sm font-medium uppercase tracking-wider">Community</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
            Trusted by curious minds
            <span className="block bg-gradient-accent bg-clip-text text-transparent">
              around the world
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Join thousands of students, researchers, and educators who are already transforming their chemistry experience with ChemStudio Beta.
          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Countries</div>
            </div>
            
            <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border">
              <div className="text-3xl font-bold text-secondary mb-2">1,000+</div>
              <div className="text-muted-foreground">Early Users</div>
            </div>
            
            <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border">
              <div className="text-3xl font-bold text-accent mb-2">15+</div>
              <div className="text-muted-foreground">Universities</div>
            </div>
            
            <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border">
              <div className="flex items-center justify-center gap-1 text-3xl font-bold text-yellow-500 mb-2">
                4.9
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div className="text-muted-foreground">Rating</div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 hover:shadow-lg animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/20">
                <Quote className="w-8 h-8" />
              </div>

              {/* Quote Text */}
              <p className="text-foreground leading-relaxed mb-6 text-lg">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-background font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-sm text-primary">{testimonial.institution}</div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Global Reach Message */}
        <div className="text-center bg-card/50 backdrop-blur-sm rounded-2xl p-12 border border-border">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center shadow-glow-accent">
              <Globe className="w-8 h-8 text-background" />
            </div>
          </div>
          
          <h3 className="text-2xl font-display font-bold mb-4 text-foreground">
            Trusted by curious learners from <span className="text-accent">50+ countries</span>
          </h3>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From high school students discovering chemistry for the first time to PhD researchers pushing the boundaries of science, 
            ChemStudio Beta is empowering the next generation of chemical innovation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;