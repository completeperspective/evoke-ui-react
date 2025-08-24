/**
 * Types - All TypeScript type definitions for Evoke UI
 * Centralized export of all type definitions
 */

// Global type definitions are not exported as they are ambient
// They remain available for development but don't interfere with DTS bundling

// Color-related types
export type {
  OklchColor,
  ColorTokenOverride,
} from './theme';

export { isValidOklchColor } from './theme';

// Token types removed - now using CSS variables only
// Types related to tokens have been removed to simplify the system