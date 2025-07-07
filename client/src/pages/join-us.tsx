import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Check, Code, Users, Palette, BookOpen } from "lucide-react";

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
    <div className="py-16 fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Join the ChemVerse Community</h1>
          <p className="text-gray-600 text-lg">
            Help us build the future of chemistry education. We're looking for passionate volunteers to contribute to this educational initiative.
          </p>
        </div>

        <Card className="mb-12">
          <CardContent className="p-0">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">We're Looking For</h2>
                <div className="space-y-4">
                  {opportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${opportunity.color} text-white`}>
                        {opportunity.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{opportunity.title}</h4>
                        <p className="text-gray-600 text-sm">{opportunity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:w-1/2 p-8 bg-gray-50">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get Involved</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="skill">Skills & Interests</Label>
                    <Select value={formData.skill} onValueChange={(value) => setFormData({ ...formData, skill: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your primary skill" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend Development</SelectItem>
                        <SelectItem value="backend">Backend Development</SelectItem>
                        <SelectItem value="design">UX/UI Design</SelectItem>
                        <SelectItem value="education">Chemistry Education</SelectItem>
                        <SelectItem value="content">Content Creation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your interest in joining ChemVerse..."
                      rows={4}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  >
                    Join Our Team
                  </Button>
                </form>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Note: This is an unpaid voluntary collaboration for educational purposes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-none">
          <CardContent className="pt-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Join ChemVerse?</h3>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Make an Impact</h4>
                  <p className="text-gray-600 text-sm">Help students worldwide access quality chemistry education</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Build Community</h4>
                  <p className="text-gray-600 text-sm">Connect with like-minded educators and developers</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Gain Experience</h4>
                  <p className="text-gray-600 text-sm">Contribute to an open-source educational project</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
