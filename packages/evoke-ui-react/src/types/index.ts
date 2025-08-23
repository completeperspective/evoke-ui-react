/**
 * Types - All TypeScript type definitions for Evoke UI
 * Centralized export of all type definitions
 */

// Global type definitions (CSS modules, etc.)
import './global.d';

// Color-related types
export type {
  OklchColor,
  ColorTokenOverride,
} from './theme';

export { isValidOklchColor } from './theme';

// Re-export token types from tokens for convenience (with explicit renaming to avoid conflicts)
export type { 
  ColorToken, 
  TypographyToken,
  ThemeConfig as BaseThemeConfigFromTokens 
} from '../tokens';