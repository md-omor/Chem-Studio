import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ReactionJarProps {
  product: string;
  productName: string;
  isAnimating: boolean;
  className?: string;
}

export function ReactionJar({
  product,
  productName,
  isAnimating,
  className,
}: ReactionJarProps) {
  const [showBubbles, setShowBubbles] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      setShowBubbles(true);
      const timer = setTimeout(() => setShowBubbles(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Get simple color and state based on product
  const getProductAppearance = (prod: string) => {
    const productLower = prod.toLowerCase();

    // Common compounds with simple solid colors
    if (productLower.includes("water") || productLower.includes("h2o")) {
      return { color: "#3b82f6", state: "Liquid", type: "Pure" };
    }
    if (
      productLower.includes("salt") ||
      productLower.includes("nacl") ||
      productLower.includes("chloride")
    ) {
      return { color: "#f8fafc", state: "Solid", type: "Crystalline" };
    }
    if (productLower.includes("oxide") || productLower.includes("rust")) {
      return { color: "#f97316", state: "Solid", type: "Powder" };
    }
    if (productLower.includes("acid") || productLower.includes("hcl")) {
      return { color: "#eab308", state: "Liquid", type: "Corrosive" };
    }
    if (
      productLower.includes("gas") ||
      productLower.includes("co2") ||
      productLower.includes("h2")
    ) {
      return { color: "#9ca3af", state: "Gas", type: "Vapor" };
    }
    if (productLower.includes("hydroxide") || productLower.includes("base")) {
      return { color: "#22c55e", state: "Liquid", type: "Basic" };
    }
    if (productLower.includes("sulfate") || productLower.includes("so4")) {
      return { color: "#a855f7", state: "Solid", type: "Crystalline" };
    }

    // Default appearance
    return { color: "#06b6d4", state: "Solution", type: "Mixed" };
  };

  const appearance = getProductAppearance(product);

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      {/* Simple Reaction Jar */}
      <div className="relative">
        <svg
          width="100"
          height="140"
          viewBox="0 0 100 140"
          className="filter drop-shadow-sm"
        >
          {/* Simple Jar Body */}
          <path
            d="M20 35 L20 120 Q20 125 25 125 L75 125 Q80 125 80 120 L80 35 Z"
            fill="rgba(255, 255, 255, 0.1)"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1"
          />

          {/* Simple Jar Neck */}
          <rect
            x="35"
            y="20"
            width="30"
            height="20"
            fill="rgba(255, 255, 255, 0.1)"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1"
            rx="3"
          />

          {/* Simple Jar Lid */}
          <rect x="32" y="15" width="36" height="8" fill="#64748b" rx="4" />

          {/* Product Solution - Simple Solid Color */}
          <path
            d="M22 38 L22 120 Q22 123 25 123 L75 123 Q78 123 78 120 L78 38 Z"
            fill={appearance.color}
            opacity={isAnimating ? "0.9" : "0.7"}
            className={cn(isAnimating && "animate-pulse")}
          />

          {/* Simple Bubbles */}
          {showBubbles && (
            <>
              <circle cx="35" cy="100" r="2" fill="rgba(255, 255, 255, 0.6)">
                <animate
                  attributeName="cy"
                  values="100;50;100"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="50" cy="95" r="1.5" fill="rgba(255, 255, 255, 0.6)">
                <animate
                  attributeName="cy"
                  values="95;45;95"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="65" cy="105" r="2" fill="rgba(255, 255, 255, 0.6)">
                <animate
                  attributeName="cy"
                  values="105;55;105"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}
        </svg>

        {/* Simple Reaction Status */}
        {isAnimating && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="bg-white/10 text-white text-xs px-3 py-1 rounded border border-white/20">
              Mixing...
            </div>
          </div>
        )}
      </div>

      {/* Simple Product Information */}
      <div className="text-center space-y-3 max-w-xs">
        <div className="space-y-1">
          <h3 className="font-semibold text-xl text-white font-sans">
            {product}
          </h3>
          <p className="text-sm text-white/80 font-sans">{productName}</p>
        </div>

        {/* Simple Property Tags */}
        <div className="flex items-center justify-center gap-2 text-xs">
          <span className="bg-white/10 text-white px-3 py-1 rounded border border-white/20">
            {appearance.state}
          </span>
          <span className="bg-white/10 text-white px-3 py-1 rounded border border-white/20">
            {appearance.type}
          </span>
        </div>
      </div>
    </div>
  );
}
