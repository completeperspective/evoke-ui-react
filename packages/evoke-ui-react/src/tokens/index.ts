/**
 * Design Tokens - Complete Token System
 * Centralized export of all design tokens for the Evoke UI library
 */

// Individual token imports
export { colors, gray, brand, status, semantic, type ColorToken } from './colors';
export {
  typography,
  fontFamily,
  fontWeight,
  fontSize,
  headings,
  body,
  code,
  type TypographyToken,
} from './typography';
export { spacingSystem, spacing, componentSpacing, layout, responsive } from './spacing';
export { motion, duration, easing, presets, keyframes, reducedMotion } from './motion';
export {
  elevation,
  shadow,
  coloredShadow,
  zIndex,
  componentElevation,
  darkShadow,
} from './elevation';

// Re-export for convenience
import { colors } from './colors';
import { typography } from './typography';
import { spacingSystem } from './spacing';
import { motion } from './motion';
import { elevation } from './elevation';

/**
 * Complete design token system
 * All tokens in one centralized object
 */
export const tokens = {
  colors,
  typography,
  spacing: spacingSystem,
  motion,
  elevation,
} as const;

/**
 * CSS Custom Properties Generator
 * Generates all CSS variables for the design system
 */
export function generateCSSVariables() {
  const cssVars: Record<string, string> = {};

  // Color variables
  Object.entries(colors.gray).forEach(([key, value]) => {
    cssVars[`--ui-color-gray-${key}`] = value.value;
  });

  Object.entries(colors.brand).forEach(([key, value]) => {
    cssVars[`--ui-color-brand-${key}`] = value.value;
  });

  Object.entries(colors.status).forEach(([key, value]) => {
    cssVars[`--ui-color-status-${key}`] = value.value;
  });

  // Semantic color variables (light theme)
  Object.entries(colors.semantic.light).forEach(([key, value]) => {
    cssVars[`--ui-color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = value.value;
  });

  // Typography variables
  Object.entries(typography.fontSize).forEach(([key, value]) => {
    cssVars[`--ui-font-size-${key}`] = value.fontSize;
    cssVars[`--ui-line-height-${key}`] = value.lineHeight;
    if (value.letterSpacing) {
      cssVars[`--ui-letter-spacing-${key}`] = value.letterSpacing;
    }
  });

  Object.entries(typography.fontWeight).forEach(([key, value]) => {
    cssVars[`--ui-font-weight-${key}`] = value.toString();
  });

  // Spacing variables
  Object.entries(spacingSystem.spacing).forEach(([key, value]) => {
    cssVars[`--ui-space-${key}`] = value;
  });

  // Motion variables
  Object.entries(motion.duration).forEach(([key, value]) => {
    cssVars[`--ui-duration-${key}`] = value;
  });

  Object.entries(motion.easing).forEach(([key, value]) => {
    cssVars[`--ui-easing-${key}`] = value;
  });

  // Elevation variables
  Object.entries(elevation.shadow).forEach(([key, value]) => {
    cssVars[`--ui-shadow-${key}`] = value;
  });

  Object.entries(elevation.zIndex).forEach(([key, value]) => {
    cssVars[`--ui-z-index-${key}`] = value.toString();
  });

  return cssVars;
}

/**
 * Dark theme CSS variables
 */
export function generateDarkCSSVariables() {
  const cssVars: Record<string, string> = {};

  // Dark semantic color variables
  Object.entries(colors.semantic.dark).forEach(([key, value]) => {
    cssVars[`--ui-color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = value.value;
  });

  // Dark shadows
  Object.entries(elevation.darkShadow).forEach(([key, value]) => {
    cssVars[`--ui-shadow-${key}`] = value;
  });

  return cssVars;
}

/**
 * TypeScript type for all available tokens
 */
export type DesignTokens = typeof tokens;

/**
 * Theme configuration interface
 * For runtime theme customization
 */
export interface ThemeConfig {
  colors?: Partial<typeof colors>;
  typography?: Partial<typeof typography>;
  spacing?: Partial<typeof spacingSystem>;
  motion?: Partial<typeof motion>;
  elevation?: Partial<typeof elevation>;
}

// Default export
export default tokens;
