import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Atom,
  BookOpen,
  Calculator,
  ChevronRight,
  Clock,
  FileText,
  FlaskConical,
  Microscope,
  Search,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function KnowledgeCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const lessons = [
    {
      id: 1,
      title: "Atomic Structure",
      description:
        "Understanding protons, neutrons, and electrons. Learn how atoms are built and how they interact.",
      duration: "5 min read",
      icon: <Atom className="h-6 w-6" />,
      color: "bg-blue-500",
      category: "Fundamentals",
      level: "Beginner",
      content: `# Atomic Structure

## What is an Atom?
Atoms are the fundamental building blocks of matter. Every atom consists of:
- **Nucleus**: Contains protons (positive charge) and neutrons (no charge)
- **Electron shells**: Electrons (negative charge) orbit around the nucleus

## Key Components:
### Protons
- Found in the nucleus
- Determine the element's identity
- Equal to atomic number

### Neutrons
- Also in the nucleus
- Add mass but no charge
- Can vary in number (isotopes)

### Electrons
- Orbit the nucleus in shells
- Determine chemical behavior
- Equal to protons in neutral atoms

## Electron Configuration
Electrons fill shells in order of energy levels:
1. First shell: 2 electrons maximum
2. Second shell: 8 electrons maximum  
3. Third shell: 18 electrons maximum

Understanding atomic structure helps explain why elements behave the way they do in chemical reactions!`,
      exercises: [
        "Draw the atomic structure of carbon (6 protons, 6 neutrons, 6 electrons)",
        "Explain why sodium easily loses an electron",
        "Compare the atomic structure of hydrogen and helium",
      ],
    },
    {
      id: 2,
      title: "Chemical Reactions",
      description:
        "Explore different types of chemical reactions and learn how elements combine to form compounds.",
      duration: "8 min read",
      icon: <Zap className="h-6 w-6" />,
      color: "bg-green-500",
      category: "Reactions",
      level: "Intermediate",
      content: `# Chemical Reactions

## What Happens in a Chemical Reaction?
Chemical reactions involve the breaking and forming of chemical bonds between atoms, resulting in new substances with different properties.

## Types of Chemical Reactions:

### 1. Synthesis (Combination)
Two or more substances combine to form a new compound
**Example**: 2H₂ + O₂ → 2H₂O

### 2. Decomposition
A compound breaks down into simpler substances
**Example**: 2H₂O → 2H₂ + O₂

### 3. Single Replacement
One element replaces another in a compound
**Example**: Zn + CuSO₄ → ZnSO₄ + Cu

### 4. Double Replacement
Two compounds exchange ions
**Example**: AgNO₃ + NaCl → AgCl + NaNO₃

### 5. Combustion
A substance combines with oxygen, releasing energy
**Example**: CH₄ + 2O₂ → CO₂ + 2H₂O + energy

## Signs of Chemical Reactions:
- Color change
- Gas formation (bubbling)
- Temperature change
- Precipitate formation
- Light emission`,
      exercises: [
        "Classify the reaction: 2Na + Cl₂ → 2NaCl",
        "Balance the equation: H₂ + O₂ → H₂O",
        "Predict products: Mg + HCl → ?",
      ],
    },
    {
      id: 3,
      title: "Periodic Trends",
      description:
        "Discover patterns in the periodic table and understand how element properties change across periods and groups.",
      duration: "6 min read",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-purple-500",
      category: "Periodic Table",
      level: "Intermediate",
      content: `# Periodic Trends

## Understanding the Periodic Table
The periodic table is organized to show recurring patterns in element properties such as atomic radius, ionization energy, and electronegativity.

## Major Periodic Trends:

### 1. Atomic Radius
- **Across a period**: Decreases (left to right)
- **Down a group**: Increases (top to bottom)
- **Reason**: More protons pull electrons closer; more shells increase size

### 2. Ionization Energy
Energy needed to remove an electron
- **Across a period**: Increases (left to right)
- **Down a group**: Decreases (top to bottom)
- **Reason**: Closer electrons are harder to remove

### 3. Electronegativity
Ability to attract electrons in a bond
- **Across a period**: Increases (left to right)
- **Down a group**: Decreases (top to bottom)
- **Most electronegative**: Fluorine (F)

### 4. Metallic Character
- **Across a period**: Decreases (left to right)
- **Down a group**: Increases (top to bottom)
- **Metals**: Left side of periodic table
- **Nonmetals**: Right side of periodic table

## Groups with Special Properties:
- **Group 1**: Alkali metals (very reactive)
- **Group 2**: Alkaline earth metals
- **Group 17**: Halogens (very reactive nonmetals)
- **Group 18**: Noble gases (unreactive)`,
      exercises: [
        "Compare atomic radius: Li vs F vs Ne",
        "Predict which has higher ionization energy: Na or Mg",
        "Explain why noble gases are unreactive",
      ],
    },
    {
      id: 4,
      title: "Chemical Bonding",
      description:
        "Learn about ionic, covalent, and metallic bonds, and how they determine compound properties.",
      duration: "7 min read",
      icon: <Microscope className="h-6 w-6" />,
      color: "bg-red-500",
      category: "Bonding",
      level: "Intermediate",
      content: `# Chemical Bonding

## Why Do Atoms Bond?
Chemical bonds form when atoms share or transfer electrons to achieve stable electron configurations (usually 8 electrons in outer shell - octet rule).

## Types of Chemical Bonds:

### 1. Ionic Bonds
- **Formation**: Transfer of electrons from metal to nonmetal
- **Result**: Positive and negative ions attract each other
- **Properties**: High melting point, conduct electricity when dissolved
- **Example**: NaCl (table salt)

### 2. Covalent Bonds
- **Formation**: Sharing of electrons between nonmetals
- **Types**: 
  - Single bond (H-H)
  - Double bond (O=O)
  - Triple bond (N≡N)
- **Properties**: Lower melting points, don't conduct electricity
- **Example**: H₂O (water), CO₂ (carbon dioxide)

### 3. Metallic Bonds
- **Formation**: Electrons move freely among metal atoms
- **Properties**: Good conductors, malleable, ductile
- **Example**: Copper wire, aluminum foil

## Polarity in Covalent Bonds:
- **Nonpolar**: Equal sharing (H₂, Cl₂)
- **Polar**: Unequal sharing (H₂O, HCl)
- **Determines**: Solubility, intermolecular forces

## Intermolecular Forces:
- **Van der Waals forces**: Weak attractions
- **Hydrogen bonds**: Special case with H-O, H-N, H-F
- **Dipole interactions**: Between polar molecules`,
      exercises: [
        "Predict bond type: K + Br, C + O, Al + Al",
        "Draw electron dot structure for H₂O",
        "Explain why oil doesn't mix with water",
      ],
    },
    {
      id: 5,
      title: "Acids and Bases",
      description:
        "Understand pH, acid-base reactions, and their importance in everyday life and industry.",
      duration: "9 min read",
      icon: <FlaskConical className="h-6 w-6" />,
      color: "bg-orange-500",
      category: "Reactions",
      level: "Advanced",
      content: `# Acids and Bases

## Definitions
Acids and bases are substances that donate or accept protons (hydrogen ions), and their reactions are fundamental to many biological and industrial processes.

### Acids
- **Arrhenius**: Release H⁺ ions in water
- **Brønsted-Lowry**: Proton (H⁺) donors
- **Examples**: HCl, H₂SO₄, citric acid

### Bases
- **Arrhenius**: Release OH⁻ ions in water
- **Brønsted-Lowry**: Proton (H⁺) acceptors
- **Examples**: NaOH, NH₃, Mg(OH)₂

## pH Scale
Measures hydrogen ion concentration
- **Range**: 0-14
- **pH < 7**: Acidic
- **pH = 7**: Neutral (pure water)
- **pH > 7**: Basic (alkaline)
- **Each unit**: 10x difference in acidity

## Common pH Values:
- Battery acid: pH ~0
- Lemon juice: pH ~2
- Coffee: pH ~5
- Pure water: pH 7
- Baking soda: pH ~9
- Household ammonia: pH ~11
- Bleach: pH ~13

## Acid-Base Reactions
Neutralization: Acid + Base → Salt + Water
**Example**: HCl + NaOH → NaCl + H₂O

## Indicators
Substances that change color based on pH:
- **Litmus paper**: Red in acid, blue in base
- **Phenolphthalein**: Colorless in acid, pink in base
- **Universal indicator**: Shows pH range with colors

## Applications:
- **Food preservation**: Acidic conditions prevent bacteria
- **Medicine**: Antacids neutralize stomach acid
- **Industry**: pH control in manufacturing
- **Environment**: Acid rain effects, soil pH`,
      exercises: [
        "Calculate pH if [H⁺] = 1 × 10⁻³ M",
        "Predict products: H₂SO₄ + Ca(OH)₂ → ?",
        "Explain why stomach needs acid",
      ],
    },
    {
      id: 6,
      title: "Organic Chemistry",
      description:
        "Introduction to carbon-based compounds and their role in living organisms and synthetic materials.",
      duration: "10 min read",
      icon: <Atom className="h-6 w-6" />,
      color: "bg-teal-500",
      category: "Organic",
      level: "Advanced",
      content: `# Organic Chemistry

## What Makes Carbon Special?
Organic chemistry studies carbon-containing compounds, which form the basis of all living organisms and many synthetic materials.

### Carbon's Unique Properties:
- **Four bonds**: Can form 4 covalent bonds
- **Versatile bonding**: Single, double, triple bonds
- **Chain formation**: Long chains and rings
- **Stable bonds**: With other carbons and many elements

## Major Organic Compound Types:

### 1. Hydrocarbons
Contains only carbon and hydrogen
- **Alkanes**: Single bonds (CH₄, C₂H₆)
- **Alkenes**: Double bonds (C₂H₄)
- **Alkynes**: Triple bonds (C₂H₂)
- **Aromatics**: Ring structures (benzene)

### 2. Functional Groups
Special arrangements of atoms that determine properties:
- **Alcohols**: -OH (ethanol)
- **Carboxylic acids**: -COOH (acetic acid)
- **Aldehydes**: -CHO (formaldehyde)
- **Ketones**: C=O (acetone)
- **Esters**: -COO- (fats, oils)
- **Amines**: -NH₂ (proteins)

## Biological Molecules:

### Carbohydrates
- **Function**: Energy storage, structure
- **Examples**: Glucose, starch, cellulose
- **Structure**: C, H, O in 1:2:1 ratio

### Proteins
- **Function**: Enzymes, structure, transport
- **Building blocks**: Amino acids
- **Structure**: Complex 3D shapes

### Lipids
- **Function**: Energy storage, cell membranes
- **Examples**: Fats, oils, cholesterol
- **Structure**: Long hydrocarbon chains

### Nucleic Acids
- **Function**: Store genetic information
- **Examples**: DNA, RNA
- **Building blocks**: Nucleotides

## Applications:
- **Plastics**: Polyethylene, PVC
- **Pharmaceuticals**: Aspirin, antibiotics
- **Fuels**: Gasoline, natural gas
- **Food**: Preservatives, flavoring`,
      exercises: [
        "Draw structure of methane (CH₄)",
        "Identify functional groups in aspirin",
        "Explain why oil is hydrophobic",
      ],
    },
  ];

  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLessonClick = (lesson: any) => {
    setSelectedLesson(lesson);
    setDialogOpen(true);
  };

  const categories = [
    "All",
    "Fundamentals",
    "Reactions",
    "Periodic Table",
    "Bonding",
    "Organic",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryFilteredLessons = filteredLessons.filter(
    (lesson) =>
      selectedCategory === "All" || lesson.category === selectedCategory
  );

  return (
    <div
      className="dark relative min-h-screen flex flex-col overflow-hidden bg-background text-foreground"
      style={{ backgroundColor: "hsl(240 10% 3.9%)", color: "hsl(0 0% 98%)" }}
    >
      <div className="relative z-20 md:pt-40 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-foreground animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-muted/50 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse"></div>
              <span className="text-muted-foreground font-montserrat font-bold">
                Knowledge Hub
              </span>
            </div>

            <h1 className="text-5xl font-bold text-gradient-hero text-transparent mb-6 pb-2 font-montserrat">
              Knowledge Center
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-montserrat">
              Master chemistry concepts with our comprehensive lessons designed
              for high school students. Explore interactive content and build
              your understanding step by step.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search chemistry lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-xl px-4 py-2 font-montserrat font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                      : "bg-slate-800/50 hover:bg-slate-700/70 text-slate-200 hover:text-white border-slate-600/50 hover:border-blue-500/50 rounded-xl px-4 py-2 font-montserrat transition-all duration-200"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {categoryFilteredLessons.map((lesson) => (
              <Card
                key={lesson.id}
                className="relative overflow-hidden bg-slate-800/50 border-slate-700/50 hover:border-blue-500/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer group hover:scale-105 hover:-translate-y-2"
                onClick={() => handleLessonClick(lesson)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-4 rounded-xl ${lesson.color} text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      {lesson.icon}
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className="bg-slate-700/50 text-slate-300 border-slate-600/50 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {lesson.duration}
                      </Badge>
                      <Badge
                        className={`text-xs border ${
                          lesson.level === "Beginner"
                            ? "bg-green-500/10 border-green-500/30 text-green-400"
                            : lesson.level === "Intermediate"
                            ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                            : "bg-red-500/10 border-red-500/30 text-red-400"
                        }`}
                      >
                        {lesson.level}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-slate-100 group-hover:text-blue-400 transition-colors font-montserrat font-bold">
                    {lesson.title}
                  </CardTitle>
                  <Badge className="w-fit bg-slate-700/50 text-slate-300 border-slate-600/50">
                    {lesson.category}
                  </Badge>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-slate-300 mb-6 text-sm leading-relaxed">
                    {lesson.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 p-0 font-montserrat font-semibold"
                    >
                      Start Learning{" "}
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <FileText className="h-3 w-3" />
                      <span>{lesson.exercises.length} exercises</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Interactive Features Section */}
          <div className="mb-16">
            <div className="relative overflow-hidden bg-slate-800/20 border border-slate-700/30 rounded-3xl backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
              <div className="relative p-8 md:p-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 font-montserrat">
                    Why Choose Our Knowledge Center?
                  </h2>
                  <p className="text-slate-300 max-w-2xl mx-auto font-montserrat">
                    Comprehensive chemistry education designed for modern
                    learners
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="group">
                    <div className="relative overflow-hidden bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-100 mb-2 font-montserrat">
                          Interactive Lessons
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          Engaging content with real-world examples and
                          step-by-step explanations
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="relative overflow-hidden bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Zap className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-100 mb-2 font-montserrat">
                          Practice Exercises
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          Hands-on problems to reinforce learning and build
                          confidence
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="relative overflow-hidden bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Calculator className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-100 mb-2 font-montserrat">
                          AI-Powered Help
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          Get instant answers and explanations from our
                          chemistry AI assistant
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="relative overflow-hidden bg-slate-800/30 border-slate-700/50 backdrop-blur-sm shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
              <CardContent className="relative pt-12 pb-12">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 font-montserrat">
                    Ready to Start Experimenting?
                  </h3>
                  <p className="text-xl text-slate-300 mb-10 leading-relaxed font-montserrat">
                    Apply your knowledge with our interactive tools! Explore
                    elements, mix compounds, and get AI-powered explanations for
                    any chemistry questions.
                  </p>
                  <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                    <Button
                      asChild
                      className="h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 rounded-xl shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 group"
                    >
                      <Link
                        href="/periodic-table"
                        className="flex items-center justify-center gap-3 font-montserrat font-bold text-lg"
                      >
                        <Atom className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                        Periodic Table
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="h-16 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white border-0 rounded-xl shadow-xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 group"
                    >
                      <Link
                        href="/mix-lab"
                        className="flex items-center justify-center gap-3 font-montserrat font-bold text-lg"
                      >
                        <FlaskConical className="h-6 w-6 group-hover:scale-110 transition-transform" />
                        Mix Lab
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-xl shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 group"
                    >
                      <Link
                        href="/ai-assistant"
                        className="flex items-center justify-center gap-3 font-montserrat font-bold text-lg"
                      >
                        <Calculator className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                        AI Assistant
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Lesson Detail Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col bg-slate-900 border-slate-700">
          <DialogHeader className="flex-shrink-0 border-b border-slate-700/50 pb-4">
            <DialogTitle className="flex items-center gap-4">
              {selectedLesson && (
                <>
                  <div
                    className={`p-3 rounded-xl ${selectedLesson.color} text-white shadow-lg`}
                  >
                    {selectedLesson.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-100 font-montserrat">
                      {selectedLesson.title}
                    </div>
                    <div className="text-sm text-slate-400 font-normal mt-1">
                      {selectedLesson.category} • {selectedLesson.level} •{" "}
                      {selectedLesson.duration}
                    </div>
                  </div>
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedLesson && (
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full w-full">
                <div className="p-6 space-y-8">
                  {/* Content */}
                  <div className="prose prose-invert prose-lg max-w-none">
                    <div className="whitespace-pre-wrap text-slate-200 leading-relaxed font-montserrat">
                      {selectedLesson.content}
                    </div>
                  </div>

                  <Separator className="bg-slate-700/50" />

                  {/* Exercises */}
                  <div>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-100 font-montserrat">
                      <Calculator className="h-6 w-6 text-blue-400" />
                      Practice Exercises
                    </h3>
                    <div className="space-y-4">
                      {selectedLesson.exercises.map(
                        (exercise: string, index: number) => (
                          <Card
                            key={index}
                            className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm"
                          >
                            <CardContent className="p-5">
                              <div className="flex items-start gap-4">
                                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 font-bold text-sm px-3 py-1">
                                  {index + 1}
                                </Badge>
                                <p className="text-slate-200 flex-1 leading-relaxed font-montserrat">
                                  {exercise}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      )}
                    </div>
                  </div>

                  <Separator className="bg-slate-700/50" />

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      asChild
                      className="h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-200 font-montserrat font-bold"
                    >
                      <Link
                        href="/ai-assistant"
                        className="flex items-center gap-2"
                      >
                        <Calculator className="h-5 w-5" />
                        Ask AI Assistant
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="h-12 bg-slate-700/50 hover:bg-slate-600/70 text-slate-200 hover:text-white border-slate-600/50 hover:border-blue-500/50 rounded-xl transition-all duration-200 font-montserrat font-bold"
                    >
                      <Link href="/mix-lab" className="flex items-center gap-2">
                        <FlaskConical className="h-5 w-5" />
                        Try in Mix Lab
                      </Link>
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
