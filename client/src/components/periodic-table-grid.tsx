import { ElementCard } from "@/components/element-card";
import type { Element } from "@shared/schema";

interface PeriodicTableGridProps {
  elements: Element[];
  onElementClick: (element: Element) => void;
  onElementSelect: (element: Element) => void;
  selectedElements: Element[];
}

export function PeriodicTableGrid({ 
  elements, 
  onElementClick, 
  onElementSelect, 
  selectedElements 
}: PeriodicTableGridProps) {
  const isSelected = (element: Element) => {
    return selectedElements.some(selected => selected.symbol === element.symbol);
  };

  const getGridPosition = (element: Element) => {
    // Calculate grid position based on period and group
    const period = element.period;
    const group = element.group || 1;
    
    // Handle lanthanides and actinides (periods 8 and 9)
    if (period === 8) {
      return { gridColumn: group, gridRow: 8 };
    }
    if (period === 9) {
      return { gridColumn: group, gridRow: 9 };
    }
    
    return { gridColumn: group, gridRow: period };
  };

  return (
    <div className="overflow-x-auto">
      <div className="periodic-table-grid min-w-max">
        {elements.map((element) => {
          const position = getGridPosition(element);
          return (
            <ElementCard
              key={element.symbol}
              element={element}
              onClick={() => onElementClick(element)}
              onSelect={() => onElementSelect(element)}
              isSelected={isSelected(element)}
              style={{
                gridColumn: position.gridColumn,
                gridRow: position.gridRow,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
