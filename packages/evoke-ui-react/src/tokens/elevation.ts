/**
 * Elevation Design Tokens
 * Box shadows and z-index values for depth hierarchy
 * Inspired by Material Design elevation system with modern refinements
 */

/**
 * Shadow System
 * Multi-layer shadows for realistic depth perception
 */
export const shadow = {
  /** No elevation - flat on surface */
  none: 'none',

  /** Subtle elevation - just lifted off surface */
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',

  /** Small elevation - buttons, cards */
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',

  /** Default elevation - most UI elements */
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',

  /** Medium-high elevation - dropdowns, popovers */
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',

  /** High elevation - modals, drawers */
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',

  /** Very high elevation - tooltips, notifications */
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',

  /** Maximum elevation - full-screen overlays */
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

/**
 * Colored Shadows
 * Brand-colored shadows for special emphasis
 */
export const coloredShadow = {
  primary: {
    sm: '0 1px 3px 0 rgb(59 130 246 / 0.15), 0 1px 2px -1px rgb(59 130 246 / 0.15)',
    md: '0 4px 6px -1px rgb(59 130 246 / 0.15), 0 2px 4px -2px rgb(59 130 246 / 0.15)',
    lg: '0 10px 15px -3px rgb(59 130 246 / 0.2), 0 4px 6px -4px rgb(59 130 246 / 0.15)',
  },

  success: {
    sm: '0 1px 3px 0 rgb(16 185 129 / 0.15), 0 1px 2px -1px rgb(16 185 129 / 0.15)',
    md: '0 4px 6px -1px rgb(16 185 129 / 0.15), 0 2px 4px -2px rgb(16 185 129 / 0.15)',
    lg: '0 10px 15px -3px rgb(16 185 129 / 0.2), 0 4px 6px -4px rgb(16 185 129 / 0.15)',
  },

  warning: {
    sm: '0 1px 3px 0 rgb(245 158 11 / 0.15), 0 1px 2px -1px rgb(245 158 11 / 0.15)',
    md: '0 4px 6px -1px rgb(245 158 11 / 0.15), 0 2px 4px -2px rgb(245 158 11 / 0.15)',
    lg: '0 10px 15px -3px rgb(245 158 11 / 0.2), 0 4px 6px -4px rgb(245 158 11 / 0.15)',
  },

  error: {
    sm: '0 1px 3px 0 rgb(239 68 68 / 0.15), 0 1px 2px -1px rgb(239 68 68 / 0.15)',
    md: '0 4px 6px -1px rgb(239 68 68 / 0.15), 0 2px 4px -2px rgb(239 68 68 / 0.15)',
    lg: '0 10px 15px -3px rgb(239 68 68 / 0.2), 0 4px 6px -4px rgb(239 68 68 / 0.15)',
  },
} as const;

/**
 * Z-Index Scale
 * Layering system for stacking context
 */
export const zIndex = {
  /** Behind normal content */
  behind: -1,

  /** Normal flow */
  base: 0,

  /** Slightly above normal content */
  docked: 10,

  /** Dropdowns and popovers */
  dropdown: 1000,

  /** Sticky headers and navigation */
  sticky: 1100,

  /** Floating elements like FABs */
  floating: 1200,

  /** Fixed position elements */
  fixed: 1300,

  /** Overlay backdrops */
  overlay: 1400,

  /** Modals and dialogs */
  modal: 1500,

  /** High priority notifications */
  notification: 1600,

  /** Tooltips */
  tooltip: 1700,

  /** Highest priority elements */
  maximum: 9999,
} as const;

/**
 * Component-Specific Elevation Mappings
 * Semantic elevation values for common components
 */
export const componentElevation = {
  button: {
    rest: shadow.none,
    hover: shadow.sm,
    active: shadow.xs,
    disabled: shadow.none,
  },

  card: {
    rest: shadow.sm,
    hover: shadow.md,
    active: shadow.xs,
  },

  dropdown: {
    shadow: shadow.lg,
    zIndex: zIndex.dropdown,
  },

  modal: {
    shadow: shadow['2xl'],
    zIndex: zIndex.modal,
    backdrop: zIndex.overlay,
  },

  popover: {
    shadow: shadow.lg,
    zIndex: zIndex.dropdown,
  },

  tooltip: {
    shadow: shadow.md,
    zIndex: zIndex.tooltip,
  },

  notification: {
    shadow: shadow.lg,
    zIndex: zIndex.notification,
  },

  fab: {
    rest: shadow.lg,
    hover: shadow.xl,
    active: shadow.md,
    zIndex: zIndex.floating,
  },

  appBar: {
    shadow: shadow.sm,
    zIndex: zIndex.sticky,
  },
} as const;

/**
 * CSS Custom Properties for Elevation
 * Ready-to-use CSS variables
 */
export const css = {
  shadow: {
    '--elevation-shadow-none': shadow.none,
    '--elevation-shadow-xs': shadow.xs,
    '--elevation-shadow-sm': shadow.sm,
    '--elevation-shadow-md': shadow.md,
    '--elevation-shadow-lg': shadow.lg,
    '--elevation-shadow-xl': shadow.xl,
    '--elevation-shadow-2xl': shadow['2xl'],
    '--elevation-shadow-inner': shadow.inner,
  },

  zIndex: {
    '--elevation-z-behind': zIndex.behind,
    '--elevation-z-base': zIndex.base,
    '--elevation-z-docked': zIndex.docked,
    '--elevation-z-dropdown': zIndex.dropdown,
    '--elevation-z-sticky': zIndex.sticky,
    '--elevation-z-floating': zIndex.floating,
    '--elevation-z-fixed': zIndex.fixed,
    '--elevation-z-overlay': zIndex.overlay,
    '--elevation-z-modal': zIndex.modal,
    '--elevation-z-notification': zIndex.notification,
    '--elevation-z-tooltip': zIndex.tooltip,
    '--elevation-z-maximum': zIndex.maximum,
  },
} as const;

/**
 * Dark Theme Shadow Variations
 * Adjusted shadows for dark backgrounds
 */
export const darkShadow = {
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.8)',
} as const;

/**
 * Complete elevation system export
 */
export const elevation = {
  shadow,
  coloredShadow,
  zIndex,
  componentElevation,
  css,
  darkShadow,
} as const;

export default elevation;
