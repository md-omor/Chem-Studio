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
  const getCategoryClass = (category: string) => {
    return `element-${category}`;
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
        "relative min-h-[60px] rounded-lg p-2 text-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 text-white font-medium",
        getCategoryClass(element.category),
        isSelected && "ring-4 ring-yellow-400 ring-offset-2"
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
        className="absolute bottom-1 right-1 w-4 h-4 bg-black bg-opacity-20 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
      >
        <span className="text-xs text-white">+</span>
      </button>
    </div>
  );
}
