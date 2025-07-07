import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ReactionJarProps {
  product: string;
  productName: string;
  isAnimating: boolean;
  className?: string;
}

export function ReactionJar({ product, productName, isAnimating, className }: ReactionJarProps) {
  const [showBubbles, setShowBubbles] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      setShowBubbles(true);
      const timer = setTimeout(() => setShowBubbles(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Get color and state based on product
  const getProductAppearance = (prod: string) => {
    const productLower = prod.toLowerCase();
    
    // Common compounds and their appearances
    if (productLower.includes('water') || productLower.includes('h2o')) {
      return { color: 'bg-blue-100', state: 'Liquid', density: 'light' };
    }
    if (productLower.includes('salt') || productLower.includes('nacl') || productLower.includes('chloride')) {
      return { color: 'bg-white', state: 'Solid (dissolved)', density: 'crystalline' };
    }
    if (productLower.includes('oxide') || productLower.includes('rust')) {
      return { color: 'bg-orange-200', state: 'Solid', density: 'powder' };
    }
    if (productLower.includes('acid') || productLower.includes('hcl')) {
      return { color: 'bg-yellow-100', state: 'Liquid', density: 'corrosive' };
    }
    if (productLower.includes('gas') || productLower.includes('co2') || productLower.includes('h2')) {
      return { color: 'bg-gray-100', state: 'Gas', density: 'vapor' };
    }
    if (productLower.includes('hydroxide') || productLower.includes('base')) {
      return { color: 'bg-green-100', state: 'Liquid', density: 'basic' };
    }
    if (productLower.includes('sulfate') || productLower.includes('so4')) {
      return { color: 'bg-purple-100', state: 'Solid', density: 'crystalline' };
    }
    
    // Default appearance
    return { color: 'bg-blue-200', state: 'Solution', density: 'mixed' };
  };

  const appearance = getProductAppearance(product);

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      {/* Reaction Jar */}
      <div className="relative">
        {/* Jar Container */}
        <svg width="120" height="160" viewBox="0 0 120 160" className="drop-shadow-lg">
          {/* Jar Body */}
          <path
            d="M20 40 L20 140 Q20 150 30 150 L90 150 Q100 150 100 140 L100 40 Z"
            fill="rgba(255, 255, 255, 0.9)"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          
          {/* Jar Neck */}
          <rect x="35" y="20" width="50" height="25" fill="rgba(255, 255, 255, 0.9)" stroke="#94a3b8" strokeWidth="2" rx="5"/>
          
          {/* Jar Lid */}
          <rect x="30" y="15" width="60" height="10" fill="#64748b" rx="5"/>
          
          {/* Product Solution */}
          <path
            d="M25 45 L25 140 Q25 145 30 145 L90 145 Q95 145 95 140 L95 45 Z"
            className={cn(appearance.color, isAnimating && "animate-pulse")}
            opacity="0.8"
          />
          
          {/* Bubbles Animation */}
          {showBubbles && (
            <>
              <circle cx="40" cy="120" r="3" fill="rgba(255, 255, 255, 0.7)" className="animate-bounce">
                <animate attributeName="cy" values="120;60;120" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="60" cy="110" r="2" fill="rgba(255, 255, 255, 0.7)" className="animate-bounce" style={{animationDelay: '0.5s'}}>
                <animate attributeName="cy" values="110;50;110" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="80" cy="130" r="2.5" fill="rgba(255, 255, 255, 0.7)" className="animate-bounce" style={{animationDelay: '1s'}}>
                <animate attributeName="cy" values="130;70;130" dur="3s" repeatCount="indefinite" />
              </circle>
            </>
          )}
          
          {/* Measurement Lines */}
          <g stroke="#94a3b8" strokeWidth="1" opacity="0.5">
            <line x1="15" y1="60" x2="20" y2="60" />
            <line x1="15" y1="80" x2="20" y2="80" />
            <line x1="15" y1="100" x2="20" y2="100" />
            <line x1="15" y1="120" x2="20" y2="120" />
          </g>
        </svg>
        
        {/* Reaction Status */}
        {isAnimating && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
              Reacting...
            </div>
          </div>
        )}
      </div>
      
      {/* Product Information */}
      <div className="text-center space-y-2">
        <div className="font-bold text-lg text-gray-900">{product}</div>
        <div className="text-sm text-gray-600">{productName}</div>
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
          <span className="bg-gray-100 px-2 py-1 rounded">State: {appearance.state}</span>
          <span className="bg-gray-100 px-2 py-1 rounded">Type: {appearance.density}</span>
        </div>
      </div>
    </div>
  );
}