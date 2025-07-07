import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Clock, BookOpen, Atom, Zap, Microscope, FlaskConical, Search, ChevronRight, Play, FileText, Calculator } from "lucide-react";

export default function KnowledgeCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const lessons = [
    {
      id: 1,
      title: "Atomic Structure",
      description: "Understanding protons, neutrons, and electrons. Learn how atoms are built and how they interact.",
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
        "Compare the atomic structure of hydrogen and helium"
      ]
    },
    {
      id: 2,
      title: "Chemical Reactions",
      description: "Explore different types of chemical reactions and learn how elements combine to form compounds.",
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
        "Predict products: Mg + HCl → ?"
      ]
    },
    {
      id: 3,
      title: "Periodic Trends",
      description: "Discover patterns in the periodic table and understand how element properties change across periods and groups.",
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
        "Explain why noble gases are unreactive"
      ]
    },
    {
      id: 4,
      title: "Chemical Bonding",
      description: "Learn about ionic, covalent, and metallic bonds, and how they determine compound properties.",
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
        "Explain why oil doesn't mix with water"
      ]
    },
    {
      id: 5,
      title: "Acids and Bases",
      description: "Understand pH, acid-base reactions, and their importance in everyday life and industry.",
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
        "Explain why stomach needs acid"
      ]
    },
    {
      id: 6,
      title: "Organic Chemistry",
      description: "Introduction to carbon-based compounds and their role in living organisms and synthetic materials.",
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
        "Explain why oil is hydrophobic"
      ]
    },
  ];

  const filteredLessons = lessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLessonClick = (lesson: any) => {
    setSelectedLesson(lesson);
    setDialogOpen(true);
  };

  const categories = ["All", "Fundamentals", "Reactions", "Periodic Table", "Bonding", "Organic"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryFilteredLessons = filteredLessons.filter(lesson => 
    selectedCategory === "All" || lesson.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Knowledge Center
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master chemistry concepts with our comprehensive lessons designed for high school students
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categoryFilteredLessons.map((lesson) => (
            <Card 
              key={lesson.id} 
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105"
              onClick={() => handleLessonClick(lesson)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${lesson.color} text-white shadow-lg`}>
                    {lesson.icon}
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {lesson.duration}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        lesson.level === 'Beginner' ? 'border-green-300 text-green-700' :
                        lesson.level === 'Intermediate' ? 'border-yellow-300 text-yellow-700' :
                        'border-red-300 text-red-700'
                      }`}
                    >
                      {lesson.level}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                  {lesson.title}
                </CardTitle>
                <Badge variant="secondary" className="w-fit">
                  {lesson.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{lesson.description}</p>
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 p-0">
                    Start Learning <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <FileText className="h-3 w-3" />
                    <span>{lesson.exercises.length} exercises</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 border-none shadow-xl">
            <CardContent className="pt-8 pb-8">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Experimenting?</h3>
                <p className="text-lg text-gray-600 mb-8">
                  Apply your knowledge with our interactive tools! Explore elements, mix compounds, 
                  and get AI-powered explanations for any chemistry questions.
                </p>
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <Button asChild className="h-12">
                    <a href="/periodic-table" className="bg-blue-600 hover:bg-blue-700">
                      <Atom className="h-4 w-4 mr-2" />
                      Periodic Table
                    </a>
                  </Button>
                  <Button asChild className="h-12">
                    <a href="/mix-lab" className="bg-green-600 hover:bg-green-700">
                      <FlaskConical className="h-4 w-4 mr-2" />
                      Mix Lab
                    </a>
                  </Button>
                  <Button asChild className="h-12">
                    <a href="/ai-assistant" className="bg-purple-600 hover:bg-purple-700">
                      <Calculator className="h-4 w-4 mr-2" />
                      AI Assistant
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lesson Detail Modal */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle className="flex items-center gap-3">
                {selectedLesson && (
                  <>
                    <div className={`p-2 rounded-lg ${selectedLesson.color} text-white`}>
                      {selectedLesson.icon}
                    </div>
                    <div>
                      <div className="text-xl">{selectedLesson.title}</div>
                      <div className="text-sm text-gray-500 font-normal">
                        {selectedLesson.category} • {selectedLesson.level} • {selectedLesson.duration}
                      </div>
                    </div>
                  </>
                )}
              </DialogTitle>
            </DialogHeader>
            
            {selectedLesson && (
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full w-full">
                  <div className="p-6 space-y-6">
                    {/* Content */}
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                        {selectedLesson.content}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Exercises */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-blue-600" />
                        Practice Exercises
                      </h3>
                      <div className="space-y-3">
                        {selectedLesson.exercises.map((exercise: string, index: number) => (
                          <Card key={index} className="bg-blue-50 border-blue-200">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                                  {index + 1}
                                </Badge>
                                <p className="text-sm text-gray-700 flex-1">{exercise}</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button asChild>
                        <a href="/ai-assistant" className="bg-purple-600 hover:bg-purple-700">
                          Ask AI Assistant
                        </a>
                      </Button>
                      <Button asChild variant="outline">
                        <a href="/mix-lab">
                          Try in Mix Lab
                        </a>
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
