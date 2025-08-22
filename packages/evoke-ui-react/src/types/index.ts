/**
 * Types - All TypeScript type definitions for Evoke UI
 * Centralized export of all type definitions
 */

// Theme-related types
export type {
  OklchColor,
  ThemeConfig,
  ColorTokenOverride,
  ColorTokens,
  TypographyTokens,
  SpacingTokens,
  MotionTokens,
  ComponentTokens,
  RuntimeThemeConfig,
  ThemeContextValue,
  ThemeProviderProps,
  CSSVariableConfig,
  StoredThemePreference,
  ThemeSwitchOptions,
} from './theme';

export { defaultThemes, isValidThemeConfig, isValidOklchColor } from './theme';

// Re-export token types from tokens for convenience (with explicit renaming to avoid conflicts)
export type { 
  ColorToken, 
  TypographyToken,
  ThemeConfig as BaseThemeConfigFromTokens 
} from '../tokens';