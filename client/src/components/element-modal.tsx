import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { apiRequest } from "@/lib/queryClient";
import type { Element } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Atom, Beaker, Lightbulb, Sparkles, X } from "lucide-react";
import { useState } from "react";

interface ElementModalProps {
  element: Element | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ElementModal({
  element,
  open,
  onOpenChange,
}: ElementModalProps) {
  const [showAiExplanation, setShowAiExplanation] = useState(false);

  const { data: aiExplanation, isLoading: isLoadingExplanation } = useQuery({
    queryKey: ["element-explanation", element?.symbol],
    queryFn: async () => {
      if (!element) return null;
      const response = await apiRequest(
        "GET",
        `/api/elements/${element.symbol}/explain`
      );
      return response.json();
    },
    enabled: showAiExplanation && open && !!element,
  });

  if (!element) return null;

  const getCategoryClass = (category: string) => {
    return `element-${category}`;
  };

  const formatCategory = (category: string) => {
    return category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getCategoryGlow = (category: string) => {
    const glowColors: Record<string, string> = {
      "alkali-metal": "rgba(239, 68, 68, 0.4)",
      "alkaline-earth": "rgba(251, 146, 60, 0.4)",
      "transition-metal": "rgba(59, 130, 246, 0.4)",
      "post-transition": "rgba(168, 85, 247, 0.4)",
      metalloid: "rgba(234, 179, 8, 0.4)",
      nonmetal: "rgba(34, 197, 94, 0.4)",
      halogen: "rgba(236, 72, 153, 0.4)",
      "noble-gas": "rgba(6, 182, 212, 0.4)",
      lanthanide: "rgba(251, 146, 60, 0.4)",
      actinide: "rgba(236, 72, 153, 0.4)",
    };
    return glowColors[category] || "rgba(59, 130, 246, 0.4)";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-hidden p-0 bg-transparent border-none shadow-none sm:w-full [&>button]:hidden">
        {/* Glass Morphism Container */}
        <div className="element-modal relative bg-card/50 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden element-modal-enter">
          {/* Custom Close Button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-red-500/20 hover:border-red-400/40 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-200 group"
          >
            <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Floating Particles Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="animate-float absolute top-10 left-10 w-2 h-2 bg-primary rounded-full shadow-glow-primary opacity-60 animate-glow-pulse"></div>
            <div
              className="animate-float absolute top-20 right-20 w-3 h-3 bg-secondary rounded-full shadow-glow-secondary opacity-40"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="animate-float absolute bottom-20 left-20 w-2 h-2 bg-accent rounded-full shadow-glow-accent opacity-50"
              style={{ animationDelay: "4s" }}
            ></div>
            <div
              className="animate-float absolute bottom-10 right-10 w-1 h-1 bg-primary-glow rounded-full opacity-30"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="animate-float absolute top-1/2 left-1/4 w-1 h-1 bg-accent rounded-full opacity-20"
              style={{ animationDelay: "3s" }}
            ></div>
            <div
              className="animate-float absolute bottom-1/3 right-1/3 w-2 h-2 bg-primary rounded-full opacity-25"
              style={{ animationDelay: "5s" }}
            ></div>
          </div>

          {/* Hero Section */}
          <div className="relative z-10 p-4 sm:p-8 pb-4 sm:pb-6 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Large Element Icon */}
              <div className="relative">
                <div
                  className={`w-20 h-20 rounded-full flex flex-col items-center justify-center text-white shadow-lg animate-float ${getCategoryClass(
                    element.category
                  )}`}
                  style={{
                    boxShadow: `0 0 30px ${getCategoryGlow(element.category)}`,
                    animationDelay: "0.5s",
                  }}
                >
                  <div className="text-xs font-sans font-medium opacity-90">
                    {element.atomicNumber}
                  </div>
                  <div className="text-2xl font-sans font-bold">
                    {element.symbol}
                  </div>
                </div>
              </div>

              {/* Element Title */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-4xl font-sans font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                  {element.name}
                </h1>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                  <Badge className="bg-gradient-secondary-solid text-white border-none px-3 py-1 font-sans font-medium">
                    {formatCategory(element.category)}
                  </Badge>
                  <span className="text-muted-foreground font-sans font-medium text-sm sm:text-base">
                    Atomic Mass: {element.atomicMass}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="relative z-10 max-h-[60vh] overflow-y-auto p-4 sm:p-8 pt-4 space-y-4 sm:space-y-6 element-modal-scrollbar">
            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Physical Properties Card */}
              <div className="bg-card/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-2 mb-4">
                  <Atom className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-sans font-semibold text-white">
                    Physical Properties
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/10 hover:bg-white/5 transition-colors rounded px-2">
                    <span className="font-sans font-medium text-muted-foreground">
                      Atomic Number:
                    </span>
                    <span className="font-sans font-semibold text-white">
                      {element.atomicNumber}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10 hover:bg-white/5 transition-colors rounded px-2">
                    <span className="font-sans font-medium text-muted-foreground">
                      Atomic Mass:
                    </span>
                    <span className="font-sans font-semibold text-white">
                      {element.atomicMass}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10 hover:bg-white/5 transition-colors rounded px-2">
                    <span className="font-sans font-medium text-muted-foreground">
                      Period:
                    </span>
                    <span className="font-sans font-semibold text-white">
                      {element.period}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10 hover:bg-white/5 transition-colors rounded px-2">
                    <span className="font-sans font-medium text-muted-foreground">
                      Group:
                    </span>
                    <span className="font-sans font-semibold text-white">
                      {element.group || "N/A"}
                    </span>
                  </div>
                  <div className="my-4 border-t border-white/20"></div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10 hover:bg-white/5 transition-colors rounded px-2">
                    <span className="font-sans font-medium text-muted-foreground">
                      Melting Point:
                    </span>
                    <span className="font-sans font-semibold text-white">
                      {element.meltingPoint || "Unknown"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 hover:bg-white/5 transition-colors rounded px-2">
                    <span className="font-sans font-medium text-muted-foreground">
                      Boiling Point:
                    </span>
                    <span className="font-sans font-semibold text-white">
                      {element.boilingPoint || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Electronic Configuration Card */}
              <div className="bg-card/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 hover:border-secondary/30 transition-colors">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <h3 className="text-lg font-sans font-semibold text-white">
                    Electronic Configuration
                  </h3>
                </div>
                <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 mb-6 border border-white/10 hover:border-secondary/30 transition-colors">
                  <code className="text-sm font-mono text-accent font-medium break-all leading-relaxed">
                    {element.electronConfiguration}
                  </code>
                </div>

                {/* Additional Properties */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Beaker className="w-4 h-4 text-accent" />
                    <h4 className="font-sans font-semibold text-white text-sm">
                      Additional Info
                    </h4>
                  </div>
                  {element.origin && (
                    <div className="flex justify-between items-center py-2 border-b border-white/10 hover:bg-white/5 transition-colors rounded px-2">
                      <span className="font-sans font-medium text-muted-foreground text-sm">
                        Origin:
                      </span>
                      <span className="font-sans font-semibold text-white text-sm">
                        {element.origin
                          .replace("_", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </div>
                  )}
                  {element.colorHex && (
                    <div className="flex justify-between items-center py-2 hover:bg-white/5 transition-colors rounded px-2">
                      <span className="font-sans font-medium text-muted-foreground text-sm">
                        Color:
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: element.colorHex }}
                        ></div>
                        <span className="font-sans font-semibold text-white text-sm">
                          {element.colorHex}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Applications Section */}
            <div className="bg-card/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 hover:border-accent/30 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <Beaker className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-sans font-semibold text-white">
                  Applications & Uses
                </h3>
              </div>
              <p className="text-muted-foreground font-sans leading-relaxed">
                {element.uses ||
                  "This element has various applications in industry, research, and technology."}
              </p>
            </div>

            {/* Interesting Facts Section */}
            <div className="bg-gradient-to-br from-accent/10 to-primary/10 backdrop-blur-sm border border-accent/20 rounded-xl p-4 sm:p-6 hover:border-accent/40 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-sans font-semibold text-white">
                  Interesting Fact
                </h3>
              </div>
              <p className="text-white/90 font-sans leading-relaxed">
                {element.fact ||
                  "This element has fascinating properties that make it unique in the periodic table."}
              </p>
            </div>

            {/* AI Insights Section */}
            <div className="bg-card/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary animate-glow-pulse" />
                  <h3 className="text-lg font-sans font-semibold text-white">
                    AI-Powered Insights
                  </h3>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAiExplanation(!showAiExplanation)}
                  disabled={isLoadingExplanation}
                  className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 font-sans font-medium"
                >
                  {showAiExplanation ? "Hide Analysis" : "Get AI Analysis"}
                </Button>
              </div>

              {showAiExplanation && (
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-lg p-4 border border-primary/20 animate-fade-in-up transition-all duration-300 ease-out">
                  {isLoadingExplanation ? (
                    <div className="flex items-center gap-3 text-primary">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span className="font-sans font-medium text-sm">
                        🤖 AI is analyzing this element...
                      </span>
                    </div>
                  ) : aiExplanation ? (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-primary font-sans font-semibold text-sm">
                          AI Analysis
                        </span>
                      </div>
                      <p className="text-white/90 font-sans leading-relaxed text-sm">
                        {aiExplanation.explanation}
                      </p>
                    </div>
                  ) : (
                    <div className="text-primary font-sans text-sm">
                      Unable to get AI explanation at the moment. Please try
                      again.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
