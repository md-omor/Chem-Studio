import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FlaskConical, Atom, Users, Bot, Brain, Calculator } from "lucide-react";

export default function Home() {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Explore Chemistry, <span className="text-blue-600">Anywhere</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover the wonders of chemistry through interactive experiments, mix elements, and learn with AI-powered insights. 
              Perfect for students without access to physical labs.
            </p>
            <Link href="/periodic-table">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Start Experimenting
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why ChemVerse Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Why ChemVerse?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FlaskConical className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Experiments</h3>
                <p className="text-gray-600">
                  Mix elements safely in our virtual lab and see real-time reactions with detailed explanations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Atom className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Visual Learning</h3>
                <p className="text-gray-600">
                  Understand complex concepts through beautiful visualizations and interactive periodic table.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessible Learning</h3>
                <p className="text-gray-600">
                  Learn chemistry anywhere, anytime. No physical lab required, just curiosity and imagination.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Assistant Feature Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white">
                <Bot className="h-8 w-8" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Chemistry Assistant
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your personal chemistry tutor powered by advanced AI. Get instant help with any chemistry question, 
              from basic concepts to complex problem solving.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105 enhanced-card">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Concept Explainer</h3>
                <p className="text-gray-600 text-sm">
                  Get clear explanations of any chemistry concept with examples
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105 enhanced-card">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Equation Balancer</h3>
                <p className="text-gray-600 text-sm">
                  Balance chemical equations with step-by-step explanations
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105 enhanced-card">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FlaskConical className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Problem Solver</h3>
                <p className="text-gray-600 text-sm">
                  Solve complex chemistry problems with detailed guidance
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105 enhanced-card">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Atom className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety Guide</h3>
                <p className="text-gray-600 text-sm">
                  Learn about chemical safety and lab procedures
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/ai-assistant">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Try AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Start Learning Now</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/periodic-table">
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer enhanced-card">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Atom className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Periodic Table</h3>
                  <p className="text-gray-600 mb-4">
                    Explore all 118 elements interactively
                  </p>
                  <Button variant="outline" className="w-full">
                    Explore Elements
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/mix-lab">
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer enhanced-card">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <FlaskConical className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Mix Lab</h3>
                  <p className="text-gray-600 mb-4">
                    Combine elements and see reactions
                  </p>
                  <Button variant="outline" className="w-full">
                    Start Mixing
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/knowledge-center">
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer enhanced-card">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Knowledge Center</h3>
                  <p className="text-gray-600 mb-4">
                    Learn with comprehensive lessons
                  </p>
                  <Button variant="outline" className="w-full">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
