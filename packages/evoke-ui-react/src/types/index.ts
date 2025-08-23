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

// Token types removed - now using CSS variables only
// Types related to tokens have been removed to simplify the system