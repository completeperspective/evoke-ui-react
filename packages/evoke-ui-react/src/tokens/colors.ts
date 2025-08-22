/**
 * Color Design Tokens - OKLCH Color Space
 * Using OKLCH for perceptually uniform color manipulation and better accessibility
 * Format: Lightness (0-1), Chroma (0-0.37+), Hue (0-360 degrees)
 */

export interface ColorToken {
  /** OKLCH space values as string: "lightness chroma hue" */
  value: string;
  /** Complete CSS oklch() function call */
  oklch: string;
  /** Fallback RGB value for older browsers */
  rgb?: string;
}

/**
 * Gray Scale Palette - OKLCH format for better perceptual uniformity
 * Based on neutral gray with slight blue undertone (hue 247.86)
 */
export const gray = {
  50: {
    value: '0.98 0.005 247.86',
    oklch: 'oklch(0.98 0.005 247.86)',
    rgb: '#fafafa',
  },
  100: {
    value: '0.96 0.006 247.86',
    oklch: 'oklch(0.96 0.006 247.86)',
    rgb: '#f4f4f5',
  },
  200: {
    value: '0.92 0.013 247.86',
    oklch: 'oklch(0.92 0.013 247.86)',
    rgb: '#e4e4e7',
  },
  300: {
    value: '0.87 0.015 247.86',
    oklch: 'oklch(0.87 0.015 247.86)',
    rgb: '#d4d4d8',
  },
  400: {
    value: '0.70 0.015 247.86',
    oklch: 'oklch(0.70 0.015 247.86)',
    rgb: '#a1a1aa',
  },
  500: {
    value: '0.55 0.016 247.86',
    oklch: 'oklch(0.55 0.016 247.86)',
    rgb: '#71717a',
  },
  600: {
    value: '0.44 0.017 247.86',
    oklch: 'oklch(0.44 0.017 247.86)',
    rgb: '#52525b',
  },
  700: {
    value: '0.36 0.013 247.86',
    oklch: 'oklch(0.36 0.013 247.86)',
    rgb: '#3f3f46',
  },
  800: {
    value: '0.27 0.015 247.86',
    oklch: 'oklch(0.27 0.015 247.86)',
    rgb: '#27272a',
  },
  900: {
    value: '0.19 0.015 247.86',
    oklch: 'oklch(0.19 0.015 247.86)',
    rgb: '#18181b',
  },
  950: {
    value: '0.13 0.013 247.86',
    oklch: 'oklch(0.13 0.013 247.86)',
    rgb: '#09090b',
  },
} as const;

/**
 * Brand Color Palette - OKLCH format for consistent chroma and lightness
 */
export const brand = {
  primary: {
    value: '0.65 0.19 255.5',
    oklch: 'oklch(0.65 0.19 255.5)',
    rgb: '#3b82f6',
  },
  secondary: {
    value: '0.70 0.16 310.1',
    oklch: 'oklch(0.70 0.16 310.1)',
    rgb: '#8b5cf6',
  },
  accent: {
    value: '0.70 0.17 200.1',
    oklch: 'oklch(0.70 0.17 200.1)',
    rgb: '#06b6d4',
  },
} as const;

/**
 * Status Color Palette - Semantic colors for UI states
 */
export const status = {
  success: {
    value: '0.68 0.17 142.5',
    oklch: 'oklch(0.68 0.17 142.5)',
    rgb: '#10b981',
  },
  warning: {
    value: '0.80 0.15 85.9',
    oklch: 'oklch(0.80 0.15 85.9)',
    rgb: '#f59e0b',
  },
  error: {
    value: '0.63 0.20 25.3',
    oklch: 'oklch(0.63 0.20 25.3)',
    rgb: '#ef4444',
  },
  info: {
    value: '0.70 0.15 220.4',
    oklch: 'oklch(0.70 0.15 220.4)',
    rgb: '#3b82f6',
  },
} as const;

/**
 * Semantic Color Mappings - Light Theme
 * Maps design intent to specific color tokens
 */
export const semantic = {
  light: {
    background: {
      value: '1 0 0',
      oklch: 'oklch(1 0 0)',
      rgb: '#ffffff',
    },
    foreground: gray[950],

    primary: brand.primary,
    primaryForeground: {
      value: '0.98 0.005 247.86',
      oklch: 'oklch(0.98 0.005 247.86)',
      rgb: '#fafafa',
    },

    secondary: gray[100],
    secondaryForeground: gray[900],

    muted: gray[100],
    mutedForeground: gray[500],

    accent: gray[100],
    accentForeground: gray[900],

    destructive: status.error,
    destructiveForeground: {
      value: '0.98 0.005 247.86',
      oklch: 'oklch(0.98 0.005 247.86)',
      rgb: '#fafafa',
    },

    border: gray[200],
    input: gray[200],
    ring: brand.primary,

    card: {
      value: '1 0 0',
      oklch: 'oklch(1 0 0)',
      rgb: '#ffffff',
    },
    cardForeground: gray[950],

    popover: {
      value: '1 0 0',
      oklch: 'oklch(1 0 0)',
      rgb: '#ffffff',
    },
    popoverForeground: gray[950],
  },

  dark: {
    background: gray[950],
    foreground: gray[50],

    primary: brand.primary,
    primaryForeground: gray[50],

    secondary: gray[800],
    secondaryForeground: gray[50],

    muted: gray[800],
    mutedForeground: gray[400],

    accent: gray[800],
    accentForeground: gray[50],

    destructive: status.error,
    destructiveForeground: gray[50],

    border: gray[800],
    input: gray[800],
    ring: brand.primary,

    card: gray[950],
    cardForeground: gray[50],

    popover: gray[950],
    popoverForeground: gray[50],
  },
} as const;

/**
 * Complete color system export
 */
export const colors = {
  gray,
  brand,
  status,
  semantic,
} as const;

export default colors;
