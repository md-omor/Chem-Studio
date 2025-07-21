import type { ElementOrigin } from "@shared/schema";

/**
 * Get border radius styles based on element origin
 * - Primordial: 10px border radius on bottom right corner
 * - From decay: Square-like cone shape on bottom right corner
 * - Synthetic: No border radius
 */
export function getOriginBorderRadius(
  origin: ElementOrigin
): React.CSSProperties {
  switch (origin) {
    case "primordial":
      return {
        borderBottomRightRadius: "10px",
      };

    case "from_decay":
      return {
        borderBottomRightRadius: "2px", // Small radius to create square-like cone effect
      };

    case "synthetic":
    default:
      return {}; // No border radius
  }
}

/**
 * Get additional visual indicator for origin type
 */
export function getOriginIndicator(origin: ElementOrigin): string | null {
  switch (origin) {
    case "primordial":
      return null; // No additional indicator needed

    case "from_decay":
      return "☢"; // Radioactive symbol

    case "synthetic":
      return "⚗"; // Laboratory flask symbol

    default:
      return null;
  }
}
