import { ElementModal } from "@/components/element-modal";
import { PeriodicTableGrid } from "@/components/periodic-table-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { elementsData } from "@/data/elements";
import { useElementSelection } from "@/hooks/use-element-selection";
import type { Element } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "wouter";

export default function PeriodicTable() {
  const [, setLocation] = useLocation();
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { selectedElements, toggleElement, clearSelection } =
    useElementSelection();

  const { data: elements, isLoading } = useQuery<Element[]>({
    queryKey: ["/api/elements"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/elements");
        if (!response.ok) {
          throw new Error("API not available");
        }
        return response.json();
      } catch (error) {
        // Fallback to static data if API is not available
        console.log("Using static element data as fallback");
        return elementsData as Element[];
      }
    },
  });

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
    setShowModal(true);
  };

  const handleElementSelect = (element: Element) => {
    toggleElement(element);
  };

  const handleMixElements = () => {
    setLocation("/mix-lab");
  };

  const categoryColors: Record<string, string> = {
    "alkali-metal": "bg-red-500",
    "alkaline-earth": "bg-orange-500",
    "transition-metal": "bg-blue-500",
    "post-transition": "bg-purple-500",
    metalloid: "bg-yellow-500",
    nonmetal: "bg-green-500",
    halogen: "bg-pink-500",
    "noble-gas": "bg-cyan-500",
    lanthanide: "bg-orange-400",
    actinide: "bg-pink-600",
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-white/80 font-montserrat font-semibold">
                Loading periodic table...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground py-16 md:py-40 fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:leading-0 leading-[70px] md:text-6xl font-montserrat font-bold mb-5 sm:mb-8 block bg-gradient-secondary bg-clip-text text-transparent">
            Interactive Periodic Table
          </h1>
          <p className="text-sm md:text-lg text-white/80 font-montserrat font-semibold">
            Click on any element to learn more about its properties and uses
          </p>
        </div>

        {/* Legend */}
        <Card className="mb-8 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="text-lg text-white font-montserrat font-semibold">
              Element Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(categoryColors).map(([category, color]) => (
                <div key={category} className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded ${color}`}></div>
                  <span className="text-sm text-white/80 capitalize font-montserrat font-semibold">
                    {category.replace("-", " ")}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Origin Legend */}
        <Card className="mb-8 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="text-lg text-white font-montserrat font-semibold">
              Element Origins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Primordial */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div
                    className="w-12 h-10 border-[3px] border-blue-500"
                    style={{ borderRadius: "0px 0px 8px 0px" }}
                  />
                </div>
                <div>
                  <div className="font-semibold text-sm text-white font-montserrat">
                    Primordial
                  </div>
                  <div className="text-xs text-white/70 font-montserrat font-semibold">
                    Existed since Earth's formation
                  </div>
                </div>
              </div>

              {/* From Decay */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <svg
                    className="w-12 h-10"
                    viewBox="0 0 48 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 3 L45 3 L45 28 L32 37 L3 37 Z"
                      fill="transparent"
                      stroke="#10b981"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-sm text-white font-montserrat">
                    From Decay
                  </div>
                  <div className="text-xs text-white/70 font-montserrat font-semibold">
                    Formed from radioactive decay
                  </div>
                </div>
              </div>

              {/* Synthetic */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div
                    className="w-12 h-10 border-[3px] border-purple-500"
                    style={{ borderRadius: "0px" }}
                  />
                </div>
                <div>
                  <div className="font-semibold text-sm text-white font-montserrat">
                    Synthetic
                  </div>
                  <div className="text-xs text-white/70 font-montserrat font-semibold">
                    Artificially created in labs
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Elements */}
        <Card className="mb-8 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="text-lg text-white font-montserrat font-semibold">
              Selected Elements for Mixing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 min-h-12 mb-4">
              {selectedElements.length === 0 ? (
                <div className="text-white/70 text-sm flex items-center font-montserrat font-semibold">
                  Select elements from the periodic table below
                </div>
              ) : (
                selectedElements.map((element) => (
                  <Badge
                    key={element.symbol}
                    variant="secondary"
                    className={`px-3 py-1 text-white cursor-pointer font-montserrat font-semibold ${
                      categoryColors[element.category] || "bg-gray-500"
                    }`}
                    onClick={() => handleElementSelect(element)}
                  >
                    {element.symbol} ×
                  </Badge>
                ))
              )}
            </div>
            <div className="flex gap-4">
              <Button
                onClick={handleMixElements}
                disabled={selectedElements.length < 2}
                className="bg-gradient-to-r from-primary to-secondary text-white rounded-full hover:from-primary/90 hover:to-secondary/90 px-6 py-2 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl font-montserrat"
              >
                Mix Elements
              </Button>
              <Button
                variant="outline"
                onClick={clearSelection}
                className="border-white/20 text-white hover:bg-white/10 font-montserrat font-semibold"
              >
                Clear Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Periodic Table */}
      <Card className=" backdrop-blur-md  border-none">
        <CardContent className="p-6">
          <PeriodicTableGrid
            elements={elements || []}
            onElementClick={handleElementClick}
            onElementSelect={handleElementSelect}
            selectedElements={selectedElements}
          />
        </CardContent>
      </Card>

      {/* Element Modal */}
      <ElementModal
        element={selectedElement}
        open={showModal}
        onOpenChange={setShowModal}
      />
    </div>
  );
}
