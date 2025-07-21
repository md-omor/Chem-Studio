import type { ElementOrigin } from "@shared/schema";

// Origin classification constants
export const ORIGIN_TYPES = {
  PRIMORDIAL: "primordial" as const,
  FROM_DECAY: "from_decay" as const,
  SYNTHETIC: "synthetic" as const,
} as const;

// Origin descriptions for tooltips
export const ORIGIN_DESCRIPTIONS = {
  [ORIGIN_TYPES.PRIMORDIAL]: "Naturally occurring since Earth's formation",
  [ORIGIN_TYPES.FROM_DECAY]: "Occurs naturally through radioactive decay",
  [ORIGIN_TYPES.SYNTHETIC]: "Artificially created in laboratories",
} as const;

// Origin display names
export const ORIGIN_DISPLAY_NAMES = {
  [ORIGIN_TYPES.PRIMORDIAL]: "Primordial",
  [ORIGIN_TYPES.FROM_DECAY]: "From Decay",
  [ORIGIN_TYPES.SYNTHETIC]: "Synthetic",
} as const;

// Utility function to get origin description
export function getOriginDescription(origin: ElementOrigin): string {
  return ORIGIN_DESCRIPTIONS[origin] || "Unknown origin";
}

// Utility function to get origin display name
export function getOriginDisplayName(origin: ElementOrigin): string {
  return ORIGIN_DISPLAY_NAMES[origin] || "Unknown";
}

// Utility function to check if element is primordial
export function isPrimordial(origin: ElementOrigin): boolean {
  return origin === ORIGIN_TYPES.PRIMORDIAL;
}

// Utility function to check if element is from decay
export function isFromDecay(origin: ElementOrigin): boolean {
  return origin === ORIGIN_TYPES.FROM_DECAY;
}

// Utility function to check if element is synthetic
export function isSynthetic(origin: ElementOrigin): boolean {
  return origin === ORIGIN_TYPES.SYNTHETIC;
}
