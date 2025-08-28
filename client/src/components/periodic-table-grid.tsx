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
  selectedElements,
}: PeriodicTableGridProps) {
  const isSelected = (element: Element) => {
    return selectedElements.some(
      (selected) => selected.symbol === element.symbol
    );
  };

  const getGridPosition = (element: Element) => {
    const period = element.period;
    const group = element.group || 1;

    // Handle lanthanides (atomic numbers 57-71) - place in row 11, shift columns by 1
    if (element.atomicNumber >= 57 && element.atomicNumber <= 71) {
      return { gridColumn: element.atomicNumber - 56 + 1, gridRow: 11 };
    }

    // Handle actinides (atomic numbers 89-103) - place in row 12, shift columns by 1
    if (element.atomicNumber >= 89 && element.atomicNumber <= 103) {
      return { gridColumn: element.atomicNumber - 88 + 1, gridRow: 12 };
    }

    // Standard positioning: group determines column, period determines row
    // Add 1 to column for period number column, add 1 to row for header row
    return { gridColumn: group + 1, gridRow: period + 1 };
  };

  // Create interactive placeholder elements for Lanthanide and Actinide series
  const LanthanidePlaceholder = () => {
    // Find the first lanthanide element to show as preview
    const firstLanthanide = elements.find((el) => el.atomicNumber === 57); // Lanthanum

    return (
      <div
        className="group w-full flex justify-center items-center relative min-h-[60px] p-2 text-center cursor-pointer text-[#ff76a0] font-bold bg-[#331820] hover:bg-[#442028] transition-colors border border-[#ff76a0]/30 hover:border-[#ff76a0]/60"
        style={{
          gridColumn: 4, // Shifted by 1 to account for period number column
          gridRow: 7, // Period 6 + 1 for column header row
        }}
        onClick={() => firstLanthanide && onElementClick(firstLanthanide)}
        title="Click to explore Lanthanides (57-71)"
      >
        <div className="text-xs">
          <div>57-71</div>
          <div className="text-[10px] opacity-80">Lanthanides</div>
        </div>
      </div>
    );
  };

  const ActinidePlaceholder = () => {
    // Find the first actinide element to show as preview
    const firstActinide = elements.find((el) => el.atomicNumber === 89); // Actinium

    return (
      <div
        className="group w-full flex justify-center items-center relative min-h-[60px] p-2 text-center cursor-pointer text-[#a396e0] font-bold bg-[#242132] hover:bg-[#332442] transition-colors border border-[#a396e0]/30 hover:border-[#a396e0]/60"
        style={{
          gridColumn: 4, // Shifted by 1 to account for period number column
          gridRow: 8, // Period 7 + 1 for column header row
        }}
        onClick={() => firstActinide && onElementClick(firstActinide)}
        title="Click to explore Actinides (89-103)"
      >
        <div className="text-xs">
          <div>89-103</div>
          <div className="text-[10px] opacity-80">Actinides</div>
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto pb-10 periodic-table-scrollbar">
      <div className="periodic-table-container min-w-max">
        {/* Main periodic table grid */}
        <div className="periodic-table-grid w-full">
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

          {/* Column headers - show group numbers based on when they first appear */}
          {Array.from(
            new Set(elements.filter((el) => el.group).map((el) => el.group))
          )
            .sort((a, b) => a! - b!)
            .map((group) => {
              // Find the earliest period where this group appears
              const elementsInGroup = elements.filter(
                (el) => el.group === group
              );
              const earliestPeriod = Math.min(
                ...elementsInGroup.map((el) => el.period)
              );

              // Find an element in this group from the earliest period
              const elementInGroup = elementsInGroup.find(
                (el) => el.period === earliestPeriod
              );
              if (!elementInGroup) return null;

              // Use the same column positioning as the element, but position above the earliest period
              const position = getGridPosition(elementInGroup);

              return (
                <div
                  key={`group-${group}`}
                  className="flex items-center justify-center text-2xl font-bold text-white mt-5 opacity-90"
                  style={{
                    gridColumn: position.gridColumn, // Same column as element
                    gridRow: earliestPeriod, // Position above the earliest period where this group appears
                    height: "65px",
                  }}
                >
                  {group}
                </div>
              );
            })}

          {/* Period numbers from actual elements data */}
          {Array.from(new Set(elements.map((el) => el.period)))
            .sort((a, b) => a - b)
            .map((period) => (
              <div
                key={`period-${period}`}
                className="flex items-center justify-center text-2xl font-bold text-white opacity-90"
                style={{
                  gridColumn: 1,
                  gridRow: period + 1, // Shift down by 1 to account for column header row
                }}
              >
                {period}
              </div>
            ))}

          {/* Add placeholders for Lanthanide and Actinide series */}
          <LanthanidePlaceholder />
          <ActinidePlaceholder />

          {/* Labels for the f-block series */}
          <div
            className="flex items-center justify-center text-sm font-bold text-[#ff76a0] opacity-90"
            style={{
              gridColumn: 1,
              gridRow: 11, // Lanthanide row
            }}
          >
            6
          </div>
          <div
            className="flex items-center justify-center text-sm font-bold text-[#a396e0] opacity-90"
            style={{
              gridColumn: 1,
              gridRow: 12, // Actinide row
            }}
          >
            7
          </div>
        </div>
      </div>
    </div>
  );
}
