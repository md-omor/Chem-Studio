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
  const getCategoryBorderColor = (category: string) => {
    const colorMap: Record<string, string> = {
      "alkali-metal": "#F95F5F",
      "alkaline-earth": "#F4C669",
      "transition-metal": "#F7AA97",
      "post-transition": "#4ADDDD",
      metalloid: "#FF8B6C",
      nonmetal: "#C5E99B",
      halogen: "#C5E99B", // Reactive nonmetal
      "noble-gas": "#80D4F6",
      lanthanide: "#FF76A0",
      actinide: "#B5A7F9",
    };
    return colorMap[category] || "#D8E9EF";
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <div
      className={cn(
        "group relative min-h-[60px] rounded-lg p-2 text-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 text-white font-medium border-2 bg-transparent",
        isSelected && "ring-4 ring-yellow-400 ring-offset-2"
      )}
      style={{
        ...style,
        borderColor: isSelected
          ? "#facc15"
          : getCategoryBorderColor(element.category),
      }}
      onClick={handleClick}
    >
      <div className="text-xs opacity-80">{element.atomicNumber}</div>
      <div className="text-lg font-bold">{element.symbol}</div>
      <div className="text-xs opacity-80 truncate">{element.name}</div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-xs text-black font-bold">✓</span>
        </div>
      )}

      {/* Selection button */}
      <button
        onClick={handleSelect}
        className="absolute bottom-1 right-1 w-5 h-5 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity hover:bg-opacity-50"
      >
        <span className="text-xs text-white font-bold">+</span>
      </button>
    </div>
  );
}
