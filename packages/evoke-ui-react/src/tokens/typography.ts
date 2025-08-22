/**
 * Typography Design Tokens
 * Based on modular scale and optimal readability ratios
 */

export interface TypographyToken {
  /** Font size in rem units */
  fontSize: string;
  /** Line height as unitless ratio for optimal readability */
  lineHeight: string;
  /** Letter spacing in em units (optional) */
  letterSpacing?: string;
  /** Font weight as numeric value (optional) */
  fontWeight?: number;
}

/**
 * Font Family Stack
 * System fonts with fallbacks for optimal performance and readability
 */
export const fontFamily = {
  sans: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    '"Noto Sans"',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"',
  ].join(', '),

  mono: [
    '"SF Mono"',
    'Monaco',
    'Inconsolata',
    '"Liberation Mono"',
    '"Fira Code"',
    '"Fira Mono"',
    '"DejaVu Sans Mono"',
    '"Courier New"',
    'monospace',
  ].join(', '),

  serif: ['"New York"', 'Georgia', '"Times New Roman"', 'Times', 'serif'].join(', '),
} as const;

/**
 * Font Weight Scale
 * Standard weight values for consistent typography
 */
export const fontWeight = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

/**
 * Font Size Scale - Modular Scale (1.25 ratio)
 * Base size: 1rem (16px), Minor Third scale
 */
export const fontSize = {
  xs: {
    fontSize: '0.75rem', // 12px
    lineHeight: '1.33', // ~16px line height
    letterSpacing: '0.05em',
  },
  sm: {
    fontSize: '0.875rem', // 14px
    lineHeight: '1.43', // ~20px line height
    letterSpacing: '0.025em',
  },
  base: {
    fontSize: '1rem', // 16px
    lineHeight: '1.5', // 24px line height
    letterSpacing: '0em',
  },
  lg: {
    fontSize: '1.125rem', // 18px
    lineHeight: '1.56', // ~28px line height
    letterSpacing: '-0.025em',
  },
  xl: {
    fontSize: '1.25rem', // 20px
    lineHeight: '1.6', // 32px line height
    letterSpacing: '-0.025em',
  },
  '2xl': {
    fontSize: '1.5rem', // 24px
    lineHeight: '1.33', // 32px line height
    letterSpacing: '-0.05em',
  },
  '3xl': {
    fontSize: '1.875rem', // 30px
    lineHeight: '1.27', // 38px line height
    letterSpacing: '-0.05em',
  },
  '4xl': {
    fontSize: '2.25rem', // 36px
    lineHeight: '1.22', // 44px line height
    letterSpacing: '-0.05em',
  },
  '5xl': {
    fontSize: '3rem', // 48px
    lineHeight: '1.17', // 56px line height
    letterSpacing: '-0.075em',
  },
  '6xl': {
    fontSize: '3.75rem', // 60px
    lineHeight: '1.13', // 68px line height
    letterSpacing: '-0.075em',
  },
  '7xl': {
    fontSize: '4.5rem', // 72px
    lineHeight: '1.11', // 80px line height
    letterSpacing: '-0.1em',
  },
  '8xl': {
    fontSize: '6rem', // 96px
    lineHeight: '1.08', // 104px line height
    letterSpacing: '-0.1em',
  },
  '9xl': {
    fontSize: '8rem', // 128px
    lineHeight: '1.06', // 136px line height
    letterSpacing: '-0.1em',
  },
} as const;

/**
 * Semantic Typography Mappings
 * Maps typography intent to specific size and weight combinations
 */
export const headings = {
  h1: {
    ...fontSize['4xl'],
    fontWeight: fontWeight.bold,
  },
  h2: {
    ...fontSize['3xl'],
    fontWeight: fontWeight.semibold,
  },
  h3: {
    ...fontSize['2xl'],
    fontWeight: fontWeight.semibold,
  },
  h4: {
    ...fontSize['xl'],
    fontWeight: fontWeight.semibold,
  },
  h5: {
    ...fontSize['lg'],
    fontWeight: fontWeight.medium,
  },
  h6: {
    ...fontSize['base'],
    fontWeight: fontWeight.medium,
  },
} as const;

/**
 * Body Text Variations
 */
export const body = {
  large: {
    ...fontSize['lg'],
    fontWeight: fontWeight.normal,
  },
  base: {
    ...fontSize['base'],
    fontWeight: fontWeight.normal,
  },
  small: {
    ...fontSize['sm'],
    fontWeight: fontWeight.normal,
  },
  xs: {
    ...fontSize['xs'],
    fontWeight: fontWeight.normal,
  },
} as const;

/**
 * Code Typography
 */
export const code = {
  inline: {
    fontSize: '0.875rem', // Slightly smaller than base
    lineHeight: '1.43',
    letterSpacing: '0em',
    fontWeight: fontWeight.medium,
  },
  block: {
    fontSize: '0.875rem',
    lineHeight: '1.71', // More relaxed for code blocks
    letterSpacing: '0em',
    fontWeight: fontWeight.normal,
  },
} as const;

/**
 * Complete typography system export
 */
export const typography = {
  fontFamily,
  fontWeight,
  fontSize,
  headings,
  body,
  code,
} as const;

export default typography;
