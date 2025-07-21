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

  // Get border radius style based on element origin
  const getBorderRadiusStyle = () => {
    switch (element.origin?.toLowerCase()) {
      case "primordial":
        // Square with bottom-right corner rounded
        return { borderRadius: "0px 0px 30px 0px" };
      case "synthetic":
      default:
        // Perfect square for synthetic elements
        return { borderRadius: "0px" };
    }
  };

  const categoryColor = getCategoryColor(element.category);
  const borderRadiusStyle = getBorderRadiusStyle();

  const isFromDecay = element.origin?.toLowerCase() === "from_decay";

  return (
    <div
      className={cn(
        "group relative h-[85px] w-[95px] cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 font-medium p-2",
        isSelected && "ring-4 ring-yellow-400 ring-offset-2"
      )}
      style={{
        ...style,
        color: categoryColor,
      }}
      onClick={handleClick}
    >
      {/* Background with border effect */}
      {isFromDecay ? (
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 1.5 90 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 4 L86 4 L86 55 L60 81 L4 81 Z"
            fill="transparent"
            stroke={isSelected ? "#facc15" : categoryColor}
            strokeWidth="4"
          />
        </svg>
      ) : (
        <div
          className="absolute inset-0 border-[4px] "
          style={{
            borderColor: isSelected ? "#facc15" : categoryColor,
            ...borderRadiusStyle,
          }}
        />
      )}

      {/* Content container */}
      <div className="relative z-10  h-full">
        {/* Top row: Atomic number (left) and Element name (right) */}
        <div className="flex justify-between items-start mb-1">
          <div className="text-[10px] font-bold">{element.atomicNumber}</div>
          <div className="text-[8px] font-semibold truncate ">
            {element.name}
          </div>
        </div>

        {/* Center: Element symbol (large) */}
        <div className="flex justify-center items-center flex-1 my-1">
          <div className="text-2xl font-bold">{element.symbol}</div>
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
    </div>
  );
}
