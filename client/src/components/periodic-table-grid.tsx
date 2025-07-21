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

  // Create placeholder elements for Lanthanide and Actinide series
  const LanthanidePlaceholder = () => (
    <div
      className="group w-full flex justify-center items-center relative min-h-[60px] p-2 text-center cursor-pointer text-[#ff76a0] font-bold bg-[#331820]"
      style={{
        gridColumn: 4, // Shifted by 1 to account for period number column
        gridRow: 7, // Period 6 + 1 for column header row
      }}
    >
      <div className="text-sm ">57-71</div>
    </div>
  );

  const ActinidePlaceholder = () => (
    <div
      className="group w-full flex justify-center items-center relative min-h-[60px] p-2 text-center cursor-pointer text-[#a396e0] font-bold bg-[#242132]"
      style={{
        gridColumn: 4, // Shifted by 1 to account for period number column
        gridRow: 8, // Period 7 + 1 for column header row
      }}
    >
      <div className="text-sm">89-103</div>
    </div>
  );

  return (
    <div className="overflow-x-auto pb-10">
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
        </div>
      </div>
    </div>
  );
}
