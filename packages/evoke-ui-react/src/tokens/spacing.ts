/**
 * Spacing Design Tokens
 * Based on 4px grid system for consistent and harmonious layouts
 * All values in rem units for scalability with user font size preferences
 */

/**
 * Base Spacing Scale - 4px grid (0.25rem increments)
 * Provides consistent rhythm and visual hierarchy
 */
export const spacing = {
  /** 0px - No space */
  0: '0rem',

  /** 1px - Hairline borders and fine details */
  px: '0.0625rem',

  /** 2px - Very fine spacing */
  0.5: '0.125rem',

  /** 4px - Base grid unit */
  1: '0.25rem',

  /** 6px - Small gaps */
  1.5: '0.375rem',

  /** 8px - Standard small spacing */
  2: '0.5rem',

  /** 10px - Small-medium spacing */
  2.5: '0.625rem',

  /** 12px - Standard medium spacing */
  3: '0.75rem',

  /** 14px - Medium spacing */
  3.5: '0.875rem',

  /** 16px - Base spacing unit */
  4: '1rem',

  /** 20px - Medium-large spacing */
  5: '1.25rem',

  /** 24px - Large spacing */
  6: '1.5rem',

  /** 28px - Extra large spacing */
  7: '1.75rem',

  /** 32px - 2x base unit */
  8: '2rem',

  /** 36px - Large section spacing */
  9: '2.25rem',

  /** 40px - Extra large spacing */
  10: '2.5rem',

  /** 44px - Component spacing */
  11: '2.75rem',

  /** 48px - 3x base unit */
  12: '3rem',

  /** 56px - Large component spacing */
  14: '3.5rem',

  /** 64px - 4x base unit */
  16: '4rem',

  /** 72px - Extra large sections */
  18: '4.5rem',

  /** 80px - 5x base unit */
  20: '5rem',

  /** 96px - 6x base unit */
  24: '6rem',

  /** 112px - Large section breaks */
  28: '7rem',

  /** 128px - 8x base unit */
  32: '8rem',

  /** 144px - Extra large breaks */
  36: '9rem',

  /** 160px - 10x base unit */
  40: '10rem',

  /** 176px - Huge spacing */
  44: '11rem',

  /** 192px - 12x base unit */
  48: '12rem',

  /** 224px - Extra huge spacing */
  56: '14rem',

  /** 256px - 16x base unit */
  64: '16rem',

  /** 320px - Massive spacing */
  80: '20rem',

  /** 384px - Huge sections */
  96: '24rem',
} as const;

/**
 * Component-Specific Spacing
 * Semantic spacing values for common component patterns
 */
export const componentSpacing = {
  /** Button internal padding */
  button: {
    sm: { x: spacing[3], y: spacing[1.5] }, // 12px x 6px
    md: { x: spacing[4], y: spacing[2] }, // 16px x 8px
    lg: { x: spacing[6], y: spacing[3] }, // 24px x 12px
    xl: { x: spacing[8], y: spacing[4] }, // 32px x 16px
  },

  /** Input field padding */
  input: {
    sm: { x: spacing[2.5], y: spacing[1.5] }, // 10px x 6px
    md: { x: spacing[3], y: spacing[2] }, // 12px x 8px
    lg: { x: spacing[4], y: spacing[3] }, // 16px x 12px
  },

  /** Card padding */
  card: {
    sm: spacing[3], // 12px
    md: spacing[4], // 16px
    lg: spacing[6], // 24px
    xl: spacing[8], // 32px
  },

  /** Modal/Dialog spacing */
  modal: {
    padding: spacing[6], // 24px
    gap: spacing[4], // 16px
    headerGap: spacing[2], // 8px
  },

  /** Navigation spacing */
  nav: {
    itemGap: spacing[1], // 4px
    groupGap: spacing[4], // 16px
    padding: spacing[2], // 8px
  },

  /** Form spacing */
  form: {
    fieldGap: spacing[4], // 16px
    sectionGap: spacing[8], // 32px
    labelGap: spacing[1.5], // 6px
  },
} as const;

/**
 * Layout Spacing
 * Page and section level spacing patterns
 */
export const layout = {
  /** Container padding */
  container: {
    sm: spacing[4], // 16px
    md: spacing[6], // 24px
    lg: spacing[8], // 32px
    xl: spacing[12], // 48px
  },

  /** Section spacing */
  section: {
    sm: spacing[8], // 32px
    md: spacing[12], // 48px
    lg: spacing[16], // 64px
    xl: spacing[20], // 80px
    '2xl': spacing[24], // 96px
  },

  /** Header heights */
  header: {
    sm: spacing[12], // 48px
    md: spacing[14], // 56px
    lg: spacing[16], // 64px
  },

  /** Sidebar widths */
  sidebar: {
    sm: spacing[64], // 256px
    md: spacing[80], // 320px
    lg: spacing[96], // 384px
  },
} as const;

/**
 * Responsive Spacing Multipliers
 * Scale spacing based on screen size
 */
export const responsive = {
  mobile: {
    multiplier: 0.75, // 25% smaller on mobile
    maxSpacing: spacing[16], // Cap large spacing on small screens
  },
  tablet: {
    multiplier: 0.875, // 12.5% smaller on tablet
    maxSpacing: spacing[24],
  },
  desktop: {
    multiplier: 1, // Base scale
    maxSpacing: spacing[96],
  },
} as const;

/**
 * Complete spacing system export
 */
export const spacingSystem = {
  spacing,
  componentSpacing,
  layout,
  responsive,
} as const;

export { spacing as default };
