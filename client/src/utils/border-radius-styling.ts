import type { Element } from "@shared/schema";

export interface BorderRadiusStyle {
  borderRadius?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
}

export function getBorderRadiusStyle(element: Element): BorderRadiusStyle {
  // Default: no border-radius
  const defaultStyle: BorderRadiusStyle = {};

  // Exception elements that should never have border-radius
  const globalExceptions = ["Fr"];
  if (globalExceptions.includes(element.symbol)) {
    return defaultStyle;
  }

  // Category-specific styling with exceptions
  switch (element.category) {
    case "nonmetal":
    case "halogen":
      // Reactive nonmetals: bottom-right corner radius
      return { borderBottomRightRadius: "0.5rem" };

    case "alkali-metal":
      // Bottom-right corner radius (Fr already excluded above)
      return { borderBottomRightRadius: "0.5rem" };

    case "alkaline-earth":
      // Bottom-right corner radius (Fr already excluded above)
      return { borderBottomRightRadius: "0.5rem" };

    case "transition-metal":
      // Period 7 exceptions for specific elements
      const period7TransitionExceptions = ["Fr", "Db", "Sg", "Bh", "Hs"];
      if (
        element.period === 7 &&
        period7TransitionExceptions.includes(element.symbol)
      ) {
        return defaultStyle;
      }
      return { borderBottomRightRadius: "0.5rem" };

    case "post-transition":
      // Specific element exceptions
      const postTransitionExceptions = ["Po", "Cn"];
      if (postTransitionExceptions.includes(element.symbol)) {
        return defaultStyle;
      }

      // Period 6 group 16: square-type border-radius
      if (element.period === 6 && element.group === 16) {
        return { borderRadius: "0.25rem" };
      }

      // Period 7 group 12: no border-radius
      if (element.period === 7 && element.group === 12) {
        return defaultStyle;
      }

      return { borderBottomRightRadius: "0.5rem" };

    case "metalloid":
      // Astatine exception
      if (element.symbol === "At") {
        return defaultStyle;
      }

      // Period 6 group 17: square-type border-radius
      if (element.period === 6 && element.group === 17) {
        return { borderRadius: "0.25rem" };
      }

      return { borderBottomRightRadius: "0.5rem" };

    case "noble-gas":
      // Radon exception
      if (element.symbol === "Rn") {
        return defaultStyle;
      }

      // Period 6 group 18: square-type border-radius
      if (element.period === 6 && element.group === 18) {
        return { borderRadius: "0.25rem" };
      }

      return { borderBottomRightRadius: "0.5rem" };

    default:
      // Unknown categories get no special styling
      return defaultStyle;
  }
}
