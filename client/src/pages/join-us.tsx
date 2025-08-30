import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Check, Code, Palette, Users } from "lucide-react";
import { useState } from "react";

export default function JoinUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skill: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.skill || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Here you would normally send the data to your backend
    toast({
      title: "Thank you for your interest!",
      description: "We'll get back to you soon about joining the ChemVerse team.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      skill: "",
      message: "",
    });
  };

  const opportunities = [
    {
      title: "Frontend Developers",
      description: "Help us create beautiful, interactive user interfaces",
      icon: <Code className="h-6 w-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Chemistry Educators",
      description: "Contribute educational content and validate our chemistry concepts",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-green-500",
    },
    {
      title: "UX/UI Designers",
      description: "Design engaging experiences for young learners",
      icon: <Palette className="h-6 w-6" />,
      color: "bg-purple-500",
    },
    {
      title: "Content Creators",
      description: "Help create educational materials and interactive content",
      icon: <Users className="h-6 w-6" />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div
      className="dark relative min-h-screen flex flex-col overflow-hidden bg-background text-foreground"
      style={{ backgroundColor: "hsl(240 10% 3.9%)", color: "hsl(0 0% 98%)" }}
    >
      <div className="relative z-20 md:pt-40 pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-foreground animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-muted/50 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse"></div>
              <span className="text-muted-foreground font-montserrat font-bold">
                Join the Community
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gradient-hero text-transparent mb-6 pb-2 font-montserrat">
              Join the ChemVerse Community
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-montserrat">
              Help us build the future of chemistry education. We're looking for passionate volunteers to contribute to this educational initiative.
            </p>
          </div>

          <Card className="mb-10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="lg:flex">
                <div className="lg:w-1/2 p-6 lg:p-8">
                  <h2 className="text-xl font-semibold text-white mb-6 font-montserrat flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-primary-solid rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-background">👥</span>
                    </div>
                    We're Looking For
                  </h2>
                  <div className="space-y-3">
                    {opportunities.map((opportunity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                        <div className={`p-2.5 rounded-2xl ${opportunity.color} text-white shadow-lg`}>
                          {opportunity.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white font-montserrat text-sm">{opportunity.title}</h4>
                          <p className="text-slate-300 text-xs font-montserrat leading-relaxed">{opportunity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="lg:w-1/2 p-6 lg:p-8 bg-slate-800/50 backdrop-blur-sm">
                  <h2 className="text-xl font-semibold text-white mb-6 font-montserrat flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-secondary-solid rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-background">✨</span>
                    </div>
                    Get Involved
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-slate-200 font-montserrat font-semibold text-sm">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-2xl font-montserrat h-11"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-slate-200 font-montserrat font-semibold text-sm">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-2xl font-montserrat h-11"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="skill" className="text-slate-200 font-montserrat font-semibold text-sm">Skills & Interests</Label>
                      <Select value={formData.skill} onValueChange={(value) => setFormData({ ...formData, skill: value })}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white focus:border-blue-500/50 focus:ring-blue-500/20 rounded-2xl font-montserrat h-11">
                          <SelectValue placeholder="Select your primary skill" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 rounded-2xl">
                          <SelectItem value="frontend" className="text-white hover:bg-slate-700 font-montserrat rounded-xl">Frontend Development</SelectItem>
                          <SelectItem value="backend" className="text-white hover:bg-slate-700 font-montserrat rounded-xl">Backend Development</SelectItem>
                          <SelectItem value="design" className="text-white hover:bg-slate-700 font-montserrat rounded-xl">UX/UI Design</SelectItem>
                          <SelectItem value="education" className="text-white hover:bg-slate-700 font-montserrat rounded-xl">Chemistry Education</SelectItem>
                          <SelectItem value="content" className="text-white hover:bg-slate-700 font-montserrat rounded-xl">Content Creation</SelectItem>
                          <SelectItem value="other" className="text-white hover:bg-slate-700 font-montserrat rounded-xl">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-slate-200 font-montserrat font-semibold text-sm">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your interest in joining ChemVerse..."
                        rows={3}
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-2xl font-montserrat resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full h-11 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white border-0 rounded-2xl shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 font-montserrat font-bold"
                    >
                      Join Our Team
                    </Button>
                  </form>
                  
                  <p className="text-xs text-slate-400 mt-4 text-center font-montserrat">
                    Note: This is an unpaid voluntary collaboration for educational purposes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-slate-800/30 border-slate-700/50 backdrop-blur-sm shadow-2xl rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
            <CardContent className="relative pt-8 pb-8">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 font-montserrat">
                  Why Join ChemVerse?
                </h3>
                <div className="grid md:grid-cols-3 gap-6 mt-6 max-w-3xl mx-auto">
                  <div className="group">
                    <div className="relative overflow-hidden bg-slate-800/40 border border-slate-700/50 rounded-3xl p-5 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative text-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                          <Check className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-bold text-slate-100 mb-2 font-montserrat text-sm">Make an Impact</h4>
                        <p className="text-slate-300 text-xs leading-relaxed font-montserrat">Help students worldwide access quality chemistry education</p>
                      </div>
                    </div>
                  </div>
                  <div className="group">
                    <div className="relative overflow-hidden bg-slate-800/40 border border-slate-700/50 rounded-3xl p-5 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative text-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-bold text-slate-100 mb-2 font-montserrat text-sm">Build Community</h4>
                        <p className="text-slate-300 text-xs leading-relaxed font-montserrat">Connect with like-minded educators and developers</p>
                      </div>
                    </div>
                  </div>
                  <div className="group">
                    <div className="relative overflow-hidden bg-slate-800/40 border border-slate-700/50 rounded-3xl p-5 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative text-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                          <Code className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-bold text-slate-100 mb-2 font-montserrat text-sm">Gain Experience</h4>
                        <p className="text-slate-300 text-xs leading-relaxed font-montserrat">Contribute to an open-source educational project</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
