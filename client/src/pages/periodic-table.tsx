import { ElementModal } from "@/components/element-modal";
import { PeriodicTableGrid } from "@/components/periodic-table-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading periodic table...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Interactive Periodic Table
          </h1>
          <p className="text-gray-600">
            Click on any element to learn more about its properties and uses
          </p>
        </div>

        {/* Legend */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Element Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(categoryColors).map(([category, color]) => (
                <div key={category} className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded ${color}`}></div>
                  <span className="text-sm text-gray-600 capitalize">
                    {category.replace("-", " ")}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Elements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">
              Selected Elements for Mixing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 min-h-12 mb-4">
              {selectedElements.length === 0 ? (
                <div className="text-gray-500 text-sm flex items-center">
                  Select elements from the periodic table below
                </div>
              ) : (
                selectedElements.map((element) => (
                  <Badge
                    key={element.symbol}
                    variant="secondary"
                    className={`px-3 py-1 text-white cursor-pointer ${
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
                className="bg-blue-600 hover:bg-blue-700"
              >
                Mix Elements
              </Button>
              <Button variant="outline" onClick={clearSelection}>
                Clear Selection
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Periodic Table */}
        <Card>
          <CardContent className="p-6 bg-black">
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
    </div>
  );
}
