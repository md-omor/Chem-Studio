import { AiChatModal } from "@/components/ai-chat-modal";
import { ReactionJar } from "@/components/reaction-jar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useElementSelection } from "@/hooks/use-element-selection";
import { apiRequest } from "@/lib/queryClient";
import type { Reaction } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Beaker } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

export default function MixLab() {
  const { selectedElements, clearSelection } = useElementSelection();
  const [reactionResult, setReactionResult] = useState<Reaction | null>(null);
  const [showNoReaction, setShowNoReaction] = useState(false);
  const [noReactionExplanation, setNoReactionExplanation] =
    useState<string>("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAiInquiry, setShowAiInquiry] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatContext, setChatContext] = useState<string>("");

  const findReactionMutation = useMutation({
    mutationFn: async (reactants: string[]) => {
      const response = await apiRequest("POST", "/api/reactions/find", {
        reactants,
      });
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
        setNoReactionExplanation(
          "These elements cannot form a stable compound under normal conditions."
        );
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
        const reactants = selectedElements.map((el) => el.symbol);
        findReactionMutation.mutate(reactants);
      }, 2000);
    }
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

  // Auto-trigger mixing when elements are selected and we come to this page
  useEffect(() => {
    if (selectedElements.length >= 2 && !reactionResult && !showNoReaction) {
      handleMixElements();
    }
  }, [selectedElements]);

  return (
    <div className="relative py-20 min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Hero Gradient Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="hero-gradient-glow"></div>
      </div>

      <div className="relative z-20 py-16 md:py-20 fade-in">
        <div className="max-w-4xl mx-auto px-6 animate-fade-in-up">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-muted/50 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse"></div>
              <span className="text-muted-foreground font-montserrat font-bold">
                Chemical Reactions
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 text-gradient-hero">
              Mix Lab
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-montserrat font-normal">
              Combine elements to create compounds and learn about chemical
              reactions
            </p>
          </div>

          {/* Current Experiment Section */}
          <Card className="mb-8 backdrop-blur-md border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-montserrat font-bold text-white">
                <Beaker className="h-5 w-5" />
                Current Experiment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center justify-center space-x-4 flex-wrap">
                  <div className="flex items-center space-x-2">
                    {selectedElements.length === 0 ? (
                      <div className="text-white/70 font-montserrat font-medium">
                        No elements selected
                      </div>
                    ) : (
                      selectedElements.map((element, index) => (
                        <div key={element.symbol} className="flex items-center">
                          <Badge
                            className={`text-white font-montserrat font-semibold ${
                              categoryColors[element.category] || "bg-gray-500"
                            }`}
                          >
                            {element.symbol}
                          </Badge>
                          {index < selectedElements.length - 1 && (
                            <span className="mx-2 text-white/60 font-montserrat">
                              +
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  <ArrowRight className="h-6 w-6 text-white/60" />

                  <div className="text-center">
                    {isAnimating || findReactionMutation.isPending ? (
                      <ReactionJar
                        product="Mixing..."
                        productName="Reaction in Progress"
                        isAnimating={true}
                      />
                    ) : reactionResult ? (
                      <ReactionJar
                        product={reactionResult.product}
                        productName={
                          reactionResult.productName || reactionResult.product
                        }
                        isAnimating={false}
                      />
                    ) : showNoReaction ? (
                      <div className="text-red-400 font-montserrat font-semibold">
                        No stable compound possible
                      </div>
                    ) : (
                      <div className="text-white/70 font-montserrat font-medium">
                        Select elements to see the reaction
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {showNoReaction && noReactionExplanation && (
            <Card className="mb-8 backdrop-blur-md border-red-500/20">
              <CardHeader>
                <CardTitle className="text-red-400 font-montserrat font-bold">
                  Why This Reaction Doesn't Work
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-red-500/10 rounded-lg p-4">
                  <p className="text-red-300 font-montserrat">
                    {noReactionExplanation}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {reactionResult && (
            <Card className="mb-8 backdrop-blur-md border-primary/20">
              <CardHeader>
                <CardTitle className="text-center text-2xl font-montserrat font-bold text-white">
                  {selectedElements.map((e) => e.symbol).join(" + ")} →{" "}
                  {reactionResult.product}
                </CardTitle>
                <div className="text-center text-white/80 font-montserrat">
                  {reactionResult.productName || reactionResult.product}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30">
                    <h4 className="font-montserrat font-semibold text-blue-300 mb-3 flex items-center gap-2">
                      🔬 Compound Information
                    </h4>
                    <p className="text-blue-200 font-montserrat">
                      {reactionResult.description}
                    </p>
                  </div>

                  <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-4 border border-green-500/30">
                    <h4 className="font-montserrat font-semibold text-green-300 mb-3 flex items-center gap-2">
                      🏭 Real-World Uses
                    </h4>
                    <p className="text-green-200 font-montserrat">
                      {reactionResult.uses}
                    </p>
                  </div>
                </div>

                <div className="bg-purple-500/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
                  <h4 className="font-montserrat font-semibold text-purple-300 mb-3 flex items-center gap-2">
                    ⚡ Amazing Facts
                  </h4>
                  <p className="text-purple-200 font-montserrat">
                    {reactionResult.facts}
                  </p>
                </div>

                {reactionResult.id === -1 && (
                  <div className="bg-amber-500/20 backdrop-blur-sm rounded-lg p-4 border border-amber-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-amber-300 font-montserrat font-medium">
                        🤖 AI Analysis
                      </span>
                    </div>
                    <p className="text-amber-200 text-sm font-montserrat">
                      This reaction analysis was generated using artificial
                      intelligence. The information is educational and based on
                      chemistry principles.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* AI Inquiry Section */}
          {showAiInquiry && (reactionResult || showNoReaction) && (
            <Card className="mb-8 backdrop-blur-md border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-montserrat font-bold text-white">
                  🤖 AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm rounded-lg p-4 border border-primary/30">
                  <p className="text-white/90 mb-4 font-montserrat">
                    Would you like me to explain more about this reaction,
                    suggest related experiments, or answer any questions about
                    the chemistry involved?
                  </p>
                  <div className="flex gap-3 flex-wrap justify-center">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 font-montserrat font-semibold rounded-xl px-4 py-2.5 shadow-lg hover:shadow-blue-500/25 transition-all duration-200 flex items-center gap-2 group"
                      onClick={() => {
                        setChatContext(
                          reactionResult
                            ? `Reaction: ${selectedElements
                                .map((e) => e.symbol)
                                .join(" + ")} → ${
                                reactionResult.product
                              }\nDescription: ${reactionResult.description}`
                            : `Elements: ${selectedElements
                                .map((e) => e.symbol)
                                .join(
                                  ", "
                                )}\nExplanation: ${noReactionExplanation}`
                        );
                        setShowChatModal(true);
                      }}
                    >
                      <svg
                        className="w-4 h-4 group-hover:rotate-12 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Explain the Chemistry
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white border-0 font-montserrat font-semibold rounded-xl px-4 py-2.5 shadow-lg hover:shadow-green-500/25 transition-all duration-200 flex items-center gap-2 group"
                      onClick={() => {
                        setChatContext(
                          `Please suggest similar reactions to: ${selectedElements
                            .map((e) => e.symbol)
                            .join(" + ")}`
                        );
                        setShowChatModal(true);
                      }}
                    >
                      <svg
                        className="w-4 h-4 group-hover:scale-110 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Similar Reactions
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 font-montserrat font-semibold rounded-xl px-4 py-2.5 shadow-lg hover:shadow-purple-500/25 transition-all duration-200 flex items-center gap-2 group"
                      onClick={() => {
                        setChatContext(
                          reactionResult
                            ? `I have questions about this reaction: ${selectedElements
                                .map((e) => e.symbol)
                                .join(" + ")} → ${reactionResult.product}`
                            : `I have questions about these elements: ${selectedElements
                                .map((e) => e.symbol)
                                .join(", ")}`
                        );
                        setShowChatModal(true);
                      }}
                    >
                      <svg
                        className="w-4 h-4 group-hover:rotate-12 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Ask a Question
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              onClick={handleMixElements}
              disabled={
                selectedElements.length < 2 ||
                findReactionMutation.isPending ||
                isAnimating
              }
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 px-8 py-3.5 font-montserrat font-semibold transition-all duration-300 shadow-xl hover:shadow-indigo-500/25 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-300 rounded-xl flex items-center gap-3 group transform hover:scale-105"
            >
              <svg
                className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              {isAnimating ? "Mixing..." : "Mix Elements"}
            </Button>
            <Button
              onClick={clearSelection}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white border-0 font-montserrat font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-gray-500/25 transition-all duration-200 flex items-center gap-2 group"
            >
              <svg
                className="w-4 h-4 group-hover:rotate-90 transition-transform"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Clear Selection
            </Button>
            <Link href="/periodic-table">
              <Button className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white border-0 font-montserrat font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-slate-500/25 transition-all duration-200 flex items-center gap-2 group">
                <svg
                  className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Periodic Table
              </Button>
            </Link>
          </div>

          {/* AI Chat Modal */}
          <AiChatModal
            open={showChatModal}
            onOpenChange={setShowChatModal}
            initialContext={chatContext}
            reactionElements={selectedElements.map((e) => e.symbol)}
          />
        </div>
      </div>
    </div>
  );
}
