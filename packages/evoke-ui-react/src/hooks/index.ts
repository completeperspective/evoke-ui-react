/**
 * Hooks - React hooks for theme management and system preferences
 * Centralized export of all custom hooks
 */

// Theme hooks
export {
  useTheme,
  useCurrentTheme,
  useThemeSwitcher,
  useThemeColors,
  useIsThemeActive,
  useThemeStatus,
  useComponentTheme,
  useThemeChange,
  useThemeMediaQueries,
  useThemeClassName,
  useThemeSafe,
  useIsInsideThemeProvider,
} from './useTheme';

// System preference hooks
export {
  useSystemPreference,
  useSystemPreferenceWithFallback,
  useReducedMotion,
  useHighContrast,
  getSystemPreferences,
  type SystemPreference,
} from './useSystemPreference';