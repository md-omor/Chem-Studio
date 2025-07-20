import { cn } from "@/lib/utils";
import type { Element } from "@shared/schema";

interface ElementCardProps {
  element: Element;
  onClick: () => void;
  onSelect: () => void;
  isSelected: boolean;
  style?: React.CSSProperties;
}

export function ElementCard({
  element,
  onClick,
  onSelect,
  isSelected,
  style,
}: ElementCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  const getCategoryColor = (category: string): string => {
    const categoryColors: Record<string, string> = {
      "alkali-metal": "#F95F5F",
      "alkaline-earth": "#F4C669",
      lanthanide: "#FF76A0",
      actinide: "#B5A7F9",
      "transition-metal": "#F7AA97",
      "post-transition": "#4ADDDD",
      nonmetal: "#C5E99B", // Reactive nonmetal
      halogen: "#C5E99B", // Reactive nonmetal
      "noble-gas": "#80D4F6",
      metalloid: "#FF8B6C",
      unknown: "#D8E9EF",
    };
    
    return element.colorHex || categoryColors[element.category] || "#D8E9EF";
  };
  
  const categoryColor = getCategoryColor(element.category);

  console.log(element.colorHex);

  return (
    <div
      className={cn(
        "group relative h-[80px] w-[90px] rounded-lg p-1 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 font-medium border-2 bg-transparent",
        isSelected && "ring-4 ring-yellow-400 ring-offset-2"
      )}
      style={{
        ...style,
        borderColor: isSelected ? "#facc15" : categoryColor,
        color: categoryColor,
      }}
      onClick={handleClick}
    >
      {/* Top row: Atomic number (left) and Element name (right) */}
      <div className="flex justify-between items-start mb-1">
        <div className="text-[11px] font-bold">{element.atomicNumber}</div>
        <div className="text-[11px] font-medium truncate ">{element.name}</div>
      </div>

      {/* Center: Element symbol (large) */}
      <div className="flex justify-center items-center flex-1 my-1">
        <div className="text-xl font-bold">{element.symbol}</div>
      </div>

      {/* Bottom left: Atomic mass */}
      <div className="flex justify-start">
        <div className="text-[10px] font-medium">{element.atomicMass}</div>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-xs text-black font-bold">✓</span>
        </div>
      )}

      {/* Selection button */}
      <button
        onClick={handleSelect}
        className="absolute bottom-1 right-1 w-4 h-4 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity hover:bg-opacity-50"
      >
        <span className="text-[10px] text-white font-bold">+</span>
      </button>
    </div>
  );
}
