import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useElementSelection } from "@/hooks/use-element-selection";
import { apiRequest } from "@/lib/queryClient";
import { ArrowRight, Beaker } from "lucide-react";
import type { Reaction } from "@shared/schema";

export default function MixLab() {
  const { selectedElements, clearSelection } = useElementSelection();
  const [reactionResult, setReactionResult] = useState<Reaction | null>(null);
  const [showNoReaction, setShowNoReaction] = useState(false);

  const findReactionMutation = useMutation({
    mutationFn: async (reactants: string[]) => {
      const response = await apiRequest("POST", "/api/reactions/find", { reactants });
      return response.json();
    },
    onSuccess: (data) => {
      setReactionResult(data);
      setShowNoReaction(false);
    },
    onError: () => {
      setReactionResult(null);
      setShowNoReaction(true);
    },
  });

  const handleMixElements = () => {
    if (selectedElements.length >= 2) {
      const reactants = selectedElements.map(el => el.symbol);
      findReactionMutation.mutate(reactants);
    }
  };

  useEffect(() => {
    if (selectedElements.length >= 2) {
      handleMixElements();
    }
  }, [selectedElements]);

  const categoryColors: Record<string, string> = {
    "alkali-metal": "bg-red-500",
    "alkaline-earth": "bg-orange-500",
    "transition-metal": "bg-purple-500",
    "post-transition": "bg-purple-500",
    "metalloid": "bg-cyan-500",
    "nonmetal": "bg-green-500",
    "halogen": "bg-green-500",
    "noble-gas": "bg-orange-500",
    "lanthanide": "bg-pink-500",
    "actinide": "bg-indigo-500",
  };

  return (
    <div className="py-8 fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Mix Lab</h1>
          <p className="text-gray-600">Combine elements to create compounds and learn about chemical reactions</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Beaker className="h-5 w-5" />
              Current Experiment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-center space-x-4 flex-wrap">
                <div className="flex items-center space-x-2">
                  {selectedElements.length === 0 ? (
                    <div className="text-gray-500">No elements selected</div>
                  ) : (
                    selectedElements.map((element, index) => (
                      <div key={element.symbol} className="flex items-center">
                        <Badge
                          className="text-white"
                          style={{ backgroundColor: categoryColors[element.category] || '#6b7280' }}
                        >
                          {element.symbol}
                        </Badge>
                        {index < selectedElements.length - 1 && (
                          <span className="mx-2 text-gray-400">+</span>
                        )}
                      </div>
                    ))
                  )}
                </div>
                
                <ArrowRight className="h-6 w-6 text-gray-400" />
                
                <div className="text-center">
                  {findReactionMutation.isPending ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  ) : reactionResult ? (
                    <div className="text-green-600 font-semibold text-lg">
                      {reactionResult.product}
                    </div>
                  ) : showNoReaction ? (
                    <div className="text-red-600 font-semibold">
                      No known stable compound
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      Select elements to see the reaction
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {reactionResult && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Reaction Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Compound Information</h4>
                <p className="text-blue-800">{reactionResult.description}</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Real-World Uses</h4>
                <p className="text-green-800">{reactionResult.uses}</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2">Fun Facts</h4>
                <p className="text-purple-800">{reactionResult.facts}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center space-y-4">
          <Link href="/periodic-table">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Select Elements from Periodic Table
            </Button>
          </Link>
          
          {selectedElements.length > 0 && (
            <Button variant="outline" onClick={clearSelection}>
              Clear Selection
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
