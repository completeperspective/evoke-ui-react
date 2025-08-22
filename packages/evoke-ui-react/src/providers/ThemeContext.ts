import { createContext } from 'react';
import type { ThemeContextValue, ThemeSwitchOptions } from '../types';
import { defaultThemes } from '../types';

/**
 * Theme Context
 * React context for theme state management and provider pattern
 */

/**
 * Default theme context value
 * Provides safe fallbacks when context is used outside provider
 */
const defaultContextValue: ThemeContextValue = {
  theme: defaultThemes.light,
  themes: defaultThemes,
  setTheme: (_name: string, _options?: ThemeSwitchOptions) => {
    console.warn(
      'useTheme must be used within a ThemeProvider. ' +
      'Make sure your component is wrapped with <ThemeProvider>.'
    );
  },
  toggleTheme: () => {
    console.warn(
      'useTheme must be used within a ThemeProvider. ' +
      'Make sure your component is wrapped with <ThemeProvider>.'
    );
  },
  systemPreference: null,
  resolvedTheme: 'light',
  isDark: false,
};

/**
 * Theme context for providing theme state throughout the React tree
 */
export const ThemeContext = createContext<ThemeContextValue>(defaultContextValue);

/**
 * Display name for React DevTools
 */
ThemeContext.displayName = 'ThemeContext';