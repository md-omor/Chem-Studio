import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Atom, Zap, Microscope, FlaskConical } from "lucide-react";

export default function KnowledgeCenter() {
  const lessons = [
    {
      id: 1,
      title: "Atomic Structure",
      description: "Understanding protons, neutrons, and electrons. Learn how atoms are built and how they interact.",
      duration: "5 min read",
      icon: <Atom className="h-6 w-6" />,
      color: "bg-blue-500",
      content: "Atoms are the fundamental building blocks of matter. Every atom consists of a nucleus containing protons and neutrons, surrounded by electrons in orbital shells."
    },
    {
      id: 2,
      title: "Chemical Reactions",
      description: "Explore different types of chemical reactions and learn how elements combine to form compounds.",
      duration: "8 min read",
      icon: <Zap className="h-6 w-6" />,
      color: "bg-green-500",
      content: "Chemical reactions involve the breaking and forming of chemical bonds between atoms, resulting in new substances with different properties."
    },
    {
      id: 3,
      title: "Periodic Trends",
      description: "Discover patterns in the periodic table and understand how element properties change across periods and groups.",
      duration: "6 min read",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-purple-500",
      content: "The periodic table is organized to show recurring patterns in element properties such as atomic radius, ionization energy, and electronegativity."
    },
    {
      id: 4,
      title: "Chemical Bonding",
      description: "Learn about ionic, covalent, and metallic bonds, and how they determine compound properties.",
      duration: "7 min read",
      icon: <Microscope className="h-6 w-6" />,
      color: "bg-red-500",
      content: "Chemical bonds form when atoms share or transfer electrons to achieve stable electron configurations, creating molecules and compounds."
    },
    {
      id: 5,
      title: "Acids and Bases",
      description: "Understand pH, acid-base reactions, and their importance in everyday life and industry.",
      duration: "9 min read",
      icon: <FlaskConical className="h-6 w-6" />,
      color: "bg-orange-500",
      content: "Acids and bases are substances that donate or accept protons (hydrogen ions), and their reactions are fundamental to many biological and industrial processes."
    },
    {
      id: 6,
      title: "Organic Chemistry",
      description: "Introduction to carbon-based compounds and their role in living organisms and synthetic materials.",
      duration: "10 min read",
      icon: <Atom className="h-6 w-6" />,
      color: "bg-teal-500",
      content: "Organic chemistry studies carbon-containing compounds, which form the basis of all living organisms and many synthetic materials."
    },
  ];

  return (
    <div className="py-8 fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Knowledge Center</h1>
          <p className="text-gray-600">Learn the fundamentals of chemistry through interactive lessons</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-xl transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${lesson.color} text-white`}>
                    {lesson.icon}
                  </div>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {lesson.duration}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                  {lesson.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{lesson.description}</p>
                <p className="text-sm text-gray-500 mb-4">{lesson.content}</p>
                <div className="flex items-center justify-between">
                  <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                    Learn More →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-none">
            <CardContent className="pt-8">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Experimenting?</h3>
                <p className="text-gray-600 mb-6">
                  Put your knowledge to the test with our interactive periodic table and mix lab. 
                  Discover how elements combine to create amazing compounds!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/periodic-table" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Explore Periodic Table
                  </a>
                  <a 
                    href="/mix-lab" 
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Try Mix Lab
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
