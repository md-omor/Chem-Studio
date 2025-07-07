import { cn } from "@/lib/utils";
import type { Element } from "@shared/schema";

interface ElementCardProps {
  element: Element;
  onClick: () => void;
  onSelect: () => void;
  isSelected: boolean;
  style?: React.CSSProperties;
}

export function ElementCard({ element, onClick, onSelect, isSelected, style }: ElementCardProps) {
  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
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
    return colorMap[category] || "bg-gray-500";
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
        "group relative min-h-[60px] rounded-lg p-2 text-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 text-white font-medium border-2 border-transparent",
        getCategoryColor(element.category),
        isSelected && "ring-4 ring-yellow-400 ring-offset-2 border-yellow-400"
      )}
      style={style}
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
