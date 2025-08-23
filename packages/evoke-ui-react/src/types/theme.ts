/**
 * OKLCH Color Component Values
 */
export interface OklchColor {
  /** Lightness value (0-1) */
  l: number;
  /** Chroma value (0+, typically 0-0.37) */
  c: number;
  /** Hue value (0-360 degrees) */
  h: number;
}

/**
 * Individual color token override for theming
 */
export interface ColorTokenOverride {
  /** OKLCH space values as string: "lightness chroma hue" */
  value: string;
  /** Complete CSS oklch() function call */
  oklch?: string;
  /** Fallback RGB value for older browsers */
  rgb?: string;
}

/**
 * Type guard for OKLCH color validation
 */
export function isValidOklchColor(color: unknown): color is OklchColor {
  const colorRecord = color as Record<string, unknown>;
  return (
    typeof color === 'object' &&
    color !== null &&
    typeof colorRecord.l === 'number' &&
    typeof colorRecord.c === 'number' &&
    typeof colorRecord.h === 'number' &&
    colorRecord.l >= 0 &&
    colorRecord.l <= 1 &&
    colorRecord.c >= 0 &&
    colorRecord.h >= 0 &&
    colorRecord.h <= 360
  );
}