import { useState, useCallback, useEffect } from "react";
import type { Element } from "@shared/schema";

export function useElementSelection() {
  const [selectedElements, setSelectedElements] = useState<Element[]>(() => {
    // Load from localStorage on initial load
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('selectedElements');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  // Save to localStorage whenever selectedElements changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedElements', JSON.stringify(selectedElements));
    }
  }, [selectedElements]);

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
