import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Element } from "@shared/schema";

interface ElementModalProps {
  element: Element | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ElementModal({ element, open, onOpenChange }: ElementModalProps) {
  const [showAiExplanation, setShowAiExplanation] = useState(false);
  
  if (!element) return null;

  const { data: aiExplanation, isLoading: isLoadingExplanation } = useQuery({
    queryKey: ['element-explanation', element.symbol],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/elements/${element.symbol}/explain`);
      return response.json();
    },
    enabled: showAiExplanation && open,
  });

  const getCategoryClass = (category: string) => {
    return `element-${category}`;
  };

  const formatCategory = (category: string) => {
    return category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <div
              className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center text-white ${getCategoryClass(element.category)}`}
            >
              <div className="text-xs">{element.atomicNumber}</div>
              <div className="text-lg font-bold">{element.symbol}</div>
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold">{element.name}</DialogTitle>
              <Badge variant="secondary" className="mt-1">
                {formatCategory(element.category)}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Physical Properties</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Atomic Number:</span>
                <span>{element.atomicNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Atomic Mass:</span>
                <span>{element.atomicMass}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Period:</span>
                <span>{element.period}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Group:</span>
                <span>{element.group || "N/A"}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-medium">Melting Point:</span>
                <span>{element.meltingPoint || "Unknown"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Boiling Point:</span>
                <span>{element.boilingPoint || "Unknown"}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Electronic Configuration</h4>
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <code className="text-sm font-mono">{element.electronConfiguration}</code>
            </div>

            <h4 className="font-semibold text-gray-900 mb-3">Applications & Facts</h4>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Common Uses:</span>
                <p className="text-gray-600 mt-1">{element.uses || "Various applications"}</p>
              </div>
              <div>
                <span className="font-medium">Interesting Fact:</span>
                <p className="text-gray-600 mt-1">{element.fact || "A fascinating element with unique properties."}</p>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">AI-Powered Insights:</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowAiExplanation(!showAiExplanation)}
                    disabled={isLoadingExplanation}
                  >
                    {showAiExplanation ? 'Hide' : 'Get AI Explanation'}
                  </Button>
                </div>
                
                {showAiExplanation && (
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    {isLoadingExplanation ? (
                      <div className="text-blue-600 text-sm">🤖 AI is analyzing this element...</div>
                    ) : aiExplanation ? (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-blue-600 font-medium text-sm">🤖 AI Insights</span>
                        </div>
                        <p className="text-blue-800 text-sm">{aiExplanation.explanation}</p>
                      </div>
                    ) : (
                      <div className="text-blue-600 text-sm">Unable to get AI explanation at the moment.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
