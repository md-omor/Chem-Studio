import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useElementSelection } from "@/hooks/use-element-selection";
import { apiRequest } from "@/lib/queryClient";
import { ArrowRight, Beaker } from "lucide-react";
import { AiChatModal } from "@/components/ai-chat-modal";
import type { Reaction } from "@shared/schema";

export default function MixLab() {
  const { selectedElements, clearSelection } = useElementSelection();
  const [reactionResult, setReactionResult] = useState<Reaction | null>(null);
  const [showNoReaction, setShowNoReaction] = useState(false);
  const [noReactionExplanation, setNoReactionExplanation] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAiInquiry, setShowAiInquiry] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatContext, setChatContext] = useState<string>("");

  const findReactionMutation = useMutation({
    mutationFn: async (reactants: string[]) => {
      const response = await apiRequest("POST", "/api/reactions/find", { reactants });
      return response.json();
    },
    onSuccess: (data) => {
      setReactionResult(data);
      setShowNoReaction(false);
      setNoReactionExplanation("");
      setIsAnimating(false);
      setShowAiInquiry(true);
    },
    onError: (error: any) => {
      setReactionResult(null);
      setShowNoReaction(true);
      setIsAnimating(false);
      setShowAiInquiry(true);
      // Try to extract explanation from error response
      try {
        const errorData = error.response?.data;
        if (errorData?.explanation) {
          setNoReactionExplanation(errorData.explanation);
        }
      } catch (e) {
        setNoReactionExplanation("These elements cannot form a stable compound under normal conditions.");
      }
    },
  });

  const handleMixElements = () => {
    if (selectedElements.length >= 2) {
      setIsAnimating(true);
      setReactionResult(null);
      setShowNoReaction(false);
      setShowAiInquiry(false);
      
      // Add animation delay before API call
      setTimeout(() => {
        const reactants = selectedElements.map(el => el.symbol);
        findReactionMutation.mutate(reactants);
      }, 2000);
    }
  };

  const categoryColors: Record<string, string> = {
    "alkali-metal": "bg-red-500",
    "alkaline-earth": "bg-orange-500",
    "transition-metal": "bg-blue-500",
    "post-transition": "bg-purple-500",
    "metalloid": "bg-yellow-500",
    "nonmetal": "bg-green-500",
    "halogen": "bg-pink-500",
    "noble-gas": "bg-cyan-500",
    "lanthanide": "bg-orange-400",
    "actinide": "bg-pink-600",
  };

  // Auto-trigger mixing when elements are selected and we come to this page
  useEffect(() => {
    if (selectedElements.length >= 2 && !reactionResult && !showNoReaction) {
      handleMixElements();
    }
  }, [selectedElements]);

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
                          className={`text-white ${categoryColors[element.category] || 'bg-gray-500'}`}
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
                  {isAnimating || findReactionMutation.isPending ? (
                    <div className="flex flex-col items-center space-y-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <div className="text-sm text-blue-600">Mixing elements...</div>
                    </div>
                  ) : reactionResult ? (
                    <div className="text-green-600 font-semibold text-lg animate-pulse">
                      {reactionResult.product}
                    </div>
                  ) : showNoReaction ? (
                    <div className="text-red-600 font-semibold">
                      No stable compound possible
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

        {showNoReaction && noReactionExplanation && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-red-700">Why This Reaction Doesn't Work</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 rounded-lg p-4">
                <p className="text-red-800">{noReactionExplanation}</p>
              </div>
            </CardContent>
          </Card>
        )}

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
              
              {reactionResult.id === -1 && (
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-600 font-medium">🤖 AI Analysis</span>
                  </div>
                  <p className="text-amber-800 text-sm mt-1">
                    This reaction analysis was generated using artificial intelligence. The information is educational and based on chemistry principles.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* AI Inquiry Section */}
        {showAiInquiry && (reactionResult || showNoReaction) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🤖 AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                <p className="text-gray-700 mb-4">
                  Would you like me to explain more about this reaction, suggest related experiments, 
                  or answer any questions about the chemistry involved?
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setChatContext(reactionResult ? 
                        `Reaction: ${selectedElements.map(e => e.symbol).join(" + ")} → ${reactionResult.product}\nDescription: ${reactionResult.description}` :
                        `Elements: ${selectedElements.map(e => e.symbol).join(", ")}\nExplanation: ${noReactionExplanation}`
                      );
                      setShowChatModal(true);
                    }}
                  >
                    Explain the Chemistry
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setChatContext(`Please suggest similar reactions to: ${selectedElements.map(e => e.symbol).join(" + ")}`);
                      setShowChatModal(true);
                    }}
                  >
                    Similar Reactions
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setChatContext(reactionResult ? 
                        `I have questions about this reaction: ${selectedElements.map(e => e.symbol).join(" + ")} → ${reactionResult.product}` :
                        `I have questions about these elements: ${selectedElements.map(e => e.symbol).join(", ")}`
                      );
                      setShowChatModal(true);
                    }}
                  >
                    Ask a Question
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center gap-4">
          <Button
            onClick={handleMixElements}
            disabled={selectedElements.length < 2 || findReactionMutation.isPending || isAnimating}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isAnimating ? "Mixing..." : "Mix Elements"}
          </Button>
          <Button variant="outline" onClick={clearSelection}>
            Clear Selection
          </Button>
          <Link href="/periodic-table">
            <Button variant="outline">
              Back to Periodic Table
            </Button>
          </Link>
        </div>

        {/* AI Chat Modal */}
        <AiChatModal
          open={showChatModal}
          onOpenChange={setShowChatModal}
          initialContext={chatContext}
          reactionElements={selectedElements.map(e => e.symbol)}
        />
      </div>
    </div>
  );
}