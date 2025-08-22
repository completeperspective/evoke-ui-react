/**
 * @evoke-ui/react
 * A themable React component library built on shadcn/ui with OKLCH color space
 */

export const VERSION = '0.1.0';

// Design Tokens - Complete token system with OKLCH colors  
export {
  colors,
  gray,
  brand,
  status,
  semantic,
  typography,
  fontFamily,
  fontWeight,
  fontSize,
  headings,
  body,
  code,
  spacingSystem,
  spacing,
  componentSpacing,
  layout,
  responsive,
  motion,
  duration,
  easing,
  presets,
  keyframes,
  reducedMotion,
  elevation,
  shadow,
  coloredShadow,
  zIndex,
  componentElevation,
  darkShadow,
  tokens,
  generateCSSVariables,
  generateDarkCSSVariables,
  type ColorToken,
  type TypographyToken,
  type DesignTokens,
} from './tokens';

// Utility functions
export { cn } from './utils/cn';

// Theme utilities
export * from './utils/colors';
export * from './utils/theme';
export * from './utils/storage';

// Theme system
export * from './providers';
export * from './hooks';
export * from './types';

// Future component exports will be added here:
// export * from './atoms';
// export * from './molecules';
// export * from './organisms';
// export * from './templates';

export default {
  VERSION,
};
