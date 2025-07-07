import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FlaskConical, Atom, Users, Bot, Brain, Calculator } from "lucide-react";

export default function Home() {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full mr-4">
                <Atom className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-0">
                ChemVerse
              </h1>
            </div>
            <h2 className="text-2xl md:text-4xl font-semibold text-blue-200 mb-6">
              Your Digital Chemistry Laboratory
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-4xl mx-auto leading-relaxed">
              Explore the fascinating world of chemistry with interactive experiments, AI-powered learning, 
              and comprehensive tools designed for modern students. No physical lab required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/periodic-table">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
                >
                  <FlaskConical className="mr-2 h-5 w-5" />
                  Start Experimenting
                </Button>
              </Link>
              <Link href="/ai-assistant">
                <Button 
                  variant="outline"
                  size="lg" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                >
                  <Bot className="mr-2 h-5 w-5" />
                  Try AI Assistant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
              Revolutionary Chemistry Learning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience chemistry like never before with cutting-edge technology and interactive learning tools
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-8 pb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <FlaskConical className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Experiments</h3>
                <p className="text-gray-600 leading-relaxed">
                  Mix elements safely in our virtual lab and see real-time reactions with detailed explanations and visual feedback.
                </p>
              </CardContent>
            </Card>

            <Card className="group text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-8 pb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Atom className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Visual Learning</h3>
                <p className="text-gray-600 leading-relaxed">
                  Understand complex concepts through beautiful visualizations and an interactive periodic table with comprehensive element details.
                </p>
              </CardContent>
            </Card>

            <Card className="group text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-8 pb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Learning</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get instant help with chemistry concepts, problem solving, and explanations from your personal AI chemistry tutor.
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
