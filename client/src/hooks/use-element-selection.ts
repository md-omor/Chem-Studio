import { useState, useCallback } from "react";
import type { Element } from "@shared/schema";

export function useElementSelection() {
  const [selectedElements, setSelectedElements] = useState<Element[]>([]);

  const toggleElement = useCallback((element: Element) => {
    setSelectedElements(prev => {
      const isSelected = prev.some(el => el.symbol === element.symbol);
      if (isSelected) {
        return prev.filter(el => el.symbol !== element.symbol);
      } else {
        return [...prev, element];
      }
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedElements([]);
  }, []);

  const isSelected = useCallback((element: Element) => {
    return selectedElements.some(el => el.symbol === element.symbol);
  }, [selectedElements]);

  return {
    selectedElements,
    toggleElement,
    clearSelection,
    isSelected,
  };
}
