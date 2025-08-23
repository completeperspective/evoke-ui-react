/**
 * @evoke-ui/react
 * A themable React component library built on shadcn/ui with OKLCH color space
 */

export const VERSION = '0.1.0';

// Design Tokens removed - now using CSS variables only
// All tokens are defined in src/styles/ folder as CSS variables

// Utility functions
export { cn } from './utils/cn';

// Color utilities
export * from './utils/colors';

// Types
export * from './types';

// Component exports - Atomic Design Architecture
export * from './atoms';
// export * from './molecules';
// export * from './organisms';
// export * from './templates';

export default {
  VERSION,
};
