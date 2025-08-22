import type { OklchColor, ColorTokenOverride } from '../types';

/**
 * OKLCH Color Utilities
 * Functions for parsing, manipulating, and generating OKLCH color values
 * Provides programmatic color manipulation with perceptual uniformity
 */

/**
 * Parse OKLCH string to component values
 * @param oklchString - OKLCH values as string: "lightness chroma hue"
 * @returns Parsed OKLCH color object
 * @example parseOklch("0.65 0.2 255") => { l: 0.65, c: 0.2, h: 255 }
 */
export function parseOklch(oklchString: string): OklchColor {
  // Handle CSS oklch() function format
  const cleanString = oklchString.replace(/oklch\(|\)/g, '').trim();
  
  const values = cleanString.split(/\s+/).map(Number);
  
  if (values.length < 3 || values.some(isNaN)) {
    throw new Error(`Invalid OKLCH string: ${oklchString}`);
  }

  const [l, c, h] = values;
  
  // Validate ranges
  if (l < 0 || l > 1) {
    throw new Error(`Lightness must be between 0 and 1, got: ${l}`);
  }
  if (c < 0) {
    throw new Error(`Chroma must be positive, got: ${c}`);
  }
  if (h < 0 || h > 360) {
    console.warn(`Hue typically ranges 0-360 degrees, got: ${h}`);
  }

  return { l, c, h };
}

/**
 * Convert OKLCH color object to CSS oklch() function string
 * @param color - OKLCH color object or string
 * @returns CSS oklch() function string
 */
export function toCSS(color: OklchColor | string): string {
  if (typeof color === 'string') {
    // If already a valid oklch() string, return as-is
    if (color.trim().startsWith('oklch(')) {
      return color;
    }
    // Parse and convert
    const parsed = parseOklch(color);
    return `oklch(${parsed.l} ${parsed.c} ${parsed.h})`;
  }
  
  return `oklch(${color.l} ${color.c} ${color.h})`;
}

/**
 * Convert OKLCH color to space-separated string format
 * @param color - OKLCH color object
 * @returns Space-separated OKLCH string
 */
export function toSpaceSeparated(color: OklchColor): string {
  return `${color.l} ${color.c} ${color.h}`;
}

/**
 * Adjust lightness of an OKLCH color
 * @param oklchString - Original OKLCH color string
 * @param amount - Amount to adjust (-1 to 1, negative darkens, positive lightens)
 * @returns New OKLCH color string with adjusted lightness
 * @example adjustLightness("0.5 0.2 255", 0.2) => "0.7 0.2 255"
 */
export function adjustLightness(oklchString: string, amount: number): string {
  const { l, c, h } = parseOklch(oklchString);
  const newL = Math.max(0, Math.min(1, l + amount));
  return `${newL} ${c} ${h}`;
}

/**
 * Adjust chroma (saturation) of an OKLCH color
 * @param oklchString - Original OKLCH color string
 * @param amount - Amount to adjust (can be negative to desaturate)
 * @returns New OKLCH color string with adjusted chroma
 * @example adjustChroma("0.65 0.2 255", 0.1) => "0.65 0.3 255"
 */
export function adjustChroma(oklchString: string, amount: number): string {
  const { l, c, h } = parseOklch(oklchString);
  const newC = Math.max(0, c + amount);
  return `${l} ${newC} ${h}`;
}

/**
 * Rotate hue of an OKLCH color
 * @param oklchString - Original OKLCH color string
 * @param degrees - Degrees to rotate (positive or negative)
 * @returns New OKLCH color string with rotated hue
 * @example rotateHue("0.65 0.2 180", 90) => "0.65 0.2 270"
 */
export function rotateHue(oklchString: string, degrees: number): string {
  const { l, c, h } = parseOklch(oklchString);
  let newH = h + degrees;
  
  // Normalize hue to 0-360 range
  newH = ((newH % 360) + 360) % 360;
  
  return `${l} ${c} ${newH}`;
}

/**
 * Create a lighter variant of a color
 * @param oklchString - Original OKLCH color string
 * @param factor - Lightening factor (0-1, default 0.1)
 * @returns Lighter color variant
 */
export function lighten(oklchString: string, factor: number = 0.1): string {
  return adjustLightness(oklchString, factor);
}

/**
 * Create a darker variant of a color
 * @param oklchString - Original OKLCH color string
 * @param factor - Darkening factor (0-1, default 0.1)
 * @returns Darker color variant
 */
export function darken(oklchString: string, factor: number = 0.1): string {
  return adjustLightness(oklchString, -factor);
}

/**
 * Create a more saturated variant of a color
 * @param oklchString - Original OKLCH color string
 * @param factor - Saturation increase factor (default 0.05)
 * @returns More saturated color variant
 */
export function saturate(oklchString: string, factor: number = 0.05): string {
  return adjustChroma(oklchString, factor);
}

/**
 * Create a less saturated variant of a color
 * @param oklchString - Original OKLCH color string
 * @param factor - Desaturation factor (default 0.05)
 * @returns Less saturated color variant
 */
export function desaturate(oklchString: string, factor: number = 0.05): string {
  return adjustChroma(oklchString, -factor);
}

/**
 * Generate color variants for theming (50-950 scale like Tailwind)
 * @param baseOklch - Base OKLCH color string
 * @returns Object with color variants
 */
export function generateColorScale(baseOklch: string): Record<string, string> {
  const base = parseOklch(baseOklch);
  
  return {
    50: toSpaceSeparated({ ...base, l: 0.95, c: base.c * 0.1 }),
    100: toSpaceSeparated({ ...base, l: 0.9, c: base.c * 0.2 }),
    200: toSpaceSeparated({ ...base, l: 0.8, c: base.c * 0.4 }),
    300: toSpaceSeparated({ ...base, l: 0.7, c: base.c * 0.6 }),
    400: toSpaceSeparated({ ...base, l: 0.6, c: base.c * 0.8 }),
    500: toSpaceSeparated(base), // Base color
    600: toSpaceSeparated({ ...base, l: Math.max(0.1, base.l - 0.1), c: base.c * 1.1 }),
    700: toSpaceSeparated({ ...base, l: Math.max(0.1, base.l - 0.2), c: base.c * 1.2 }),
    800: toSpaceSeparated({ ...base, l: Math.max(0.1, base.l - 0.3), c: base.c * 1.1 }),
    900: toSpaceSeparated({ ...base, l: Math.max(0.1, base.l - 0.4), c: base.c * 0.9 }),
    950: toSpaceSeparated({ ...base, l: Math.max(0.05, base.l - 0.5), c: base.c * 0.7 }),
  };
}

/**
 * Check if the current browser supports OKLCH color space
 * @returns True if OKLCH is supported
 */
export function supportsOklch(): boolean {
  if (typeof window === 'undefined' || typeof CSS === 'undefined') {
    return false;
  }

  try {
    // Check if CSS.supports is available
    if (typeof CSS.supports === 'function') {
      return CSS.supports('color', 'oklch(0.5 0.2 180)');
    }
    
    // Fallback: Try to create a test element
    const testElement = document.createElement('div');
    testElement.style.color = 'oklch(0.5 0.2 180)';
    return testElement.style.color !== '';
  } catch {
    return false;
  }
}

/**
 * Convert OKLCH to RGB fallback (approximation)
 * Note: This is a simplified conversion for fallback purposes
 * @param oklchString - OKLCH color string
 * @returns RGB color string
 */
export function toRGBFallback(oklchString: string): string {
  // This is a simplified approximation
  // In production, you might want to use a proper color space conversion library
  const { l, c, h } = parseOklch(oklchString);
  
  // Simplified conversion (not color-accurate, but functional)
  const hueRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hueRad);
  const b = c * Math.sin(hueRad);
  
  // Convert to approximate RGB
  let r = l + 0.3963377774 * a + 0.2158037573 * b;
  let g = l - 0.1055613458 * a - 0.0638541728 * b;
  let bl = l - 0.0894841775 * a - 1.2914855480 * b;
  
  // Clamp and convert to 0-255 range
  r = Math.max(0, Math.min(1, r)) * 255;
  g = Math.max(0, Math.min(1, g)) * 255;
  bl = Math.max(0, Math.min(1, bl)) * 255;
  
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(bl)})`;
}

/**
 * Create a ColorTokenOverride with OKLCH and RGB fallback
 * @param oklchValue - OKLCH color string
 * @returns ColorTokenOverride object with both formats
 */
export function createColorToken(oklchValue: string): ColorTokenOverride {
  return {
    value: oklchValue,
    oklch: toCSS(oklchValue),
    rgb: toRGBFallback(oklchValue),
  };
}

/**
 * Get accessible foreground color for a given background
 * @param backgroundOklch - Background OKLCH color string
 * @param lightForeground - Light foreground color (default: white equivalent)
 * @param darkForeground - Dark foreground color (default: black equivalent)
 * @returns Appropriate foreground color
 */
export function getAccessibleForeground(
  backgroundOklch: string,
  lightForeground: string = '0.98 0.005 247.86',
  darkForeground: string = '0.13 0.013 247.86'
): string {
  const { l } = parseOklch(backgroundOklch);
  
  // Use light foreground on dark backgrounds and vice versa
  return l < 0.5 ? lightForeground : darkForeground;
}

/**
 * Generate theme-appropriate colors based on a base color
 * @param baseColor - Base OKLCH color string
 * @param isDark - Whether to generate for dark theme
 * @returns Object with primary and foreground colors
 */
export function generateThemeColors(baseColor: string, isDark: boolean = false) {
  const base = parseOklch(baseColor);
  
  if (isDark) {
    return {
      primary: toSpaceSeparated({ ...base, l: Math.min(0.8, base.l + 0.1) }),
      primaryForeground: getAccessibleForeground(baseColor),
    };
  }
  
  return {
    primary: toSpaceSeparated(base),
    primaryForeground: getAccessibleForeground(baseColor),
  };
}

/**
 * Utility to ensure OKLCH values are valid
 * @param oklchString - OKLCH color string to validate
 * @returns Valid OKLCH color string
 */
export function validateOklch(oklchString: string): string {
  try {
    // Handle CSS oklch() function format
    const cleanString = oklchString.replace(/oklch\(|\)/g, '').trim();
    
    const values = cleanString.split(/\s+/).map(Number);
    
    if (values.length < 3 || values.some(isNaN)) {
      throw new Error(`Invalid OKLCH string: ${oklchString}`);
    }

    const [l, c, h] = values;
    
    // Clamp values to valid ranges instead of throwing errors
    const validL = Math.max(0, Math.min(1, l));
    const validC = Math.max(0, c);
    const validH = ((h % 360) + 360) % 360;
    
    // Warn about unusual hue values like parseOklch does
    if (h < 0 || h > 360) {
      console.warn(`Hue typically ranges 0-360 degrees, got: ${h}`);
    }
    
    return `${validL} ${validC} ${validH}`;
  } catch {
    // Return a safe default if validation fails
    console.warn(`Invalid OKLCH color: ${oklchString}, using default`);
    return '0.5 0.1 250'; // Safe gray-blue default
  }
}