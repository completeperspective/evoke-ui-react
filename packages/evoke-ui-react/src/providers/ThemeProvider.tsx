import React, { useState, useLayoutEffect, useCallback, useMemo } from 'react';
import { ThemeContext } from './ThemeContext';
import type { ThemeProviderProps, RuntimeThemeConfig, ThemeSwitchOptions } from '../types';
import { defaultThemes } from '../types';
import { useSystemPreference } from '../hooks/useSystemPreference';
import { 
  getStoredTheme, 
  setStoredTheme, 
  migrateStoredTheme,
  DEFAULT_STORAGE_KEY 
} from '../utils/storage';
import { 
  injectThemeVariables, 
  validateThemeConfig,
  DEFAULT_CSS_VAR_PREFIX
} from '../utils/theme';

/**
 * Theme Provider Component
 * Manages theme state, CSS variable injection, and provides theme context
 */
export function ThemeProvider({
  children,
  themes = defaultThemes,
  defaultTheme = 'light',
  enableSystem = true,
  storageKey = DEFAULT_STORAGE_KEY,
  cssVarPrefix = DEFAULT_CSS_VAR_PREFIX,
  disableTransitions = false,
}: ThemeProviderProps) {
  // Get system preference
  const systemPreference = useSystemPreference();

  // Initialize theme state
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    // Server-side rendering safe initialization
    if (typeof window === 'undefined') {
      return defaultTheme;
    }

    // Migrate any old theme storage format
    migrateStoredTheme(storageKey);

    // Try to get stored theme preference
    const storedPreference = getStoredTheme(storageKey);
    if (storedPreference && themes[storedPreference.theme]) {
      return storedPreference.theme;
    }

    // Fall back to system preference if enabled
    if (enableSystem && systemPreference) {
      const systemTheme = systemPreference;
      if (themes[systemTheme]) {
        return systemTheme;
      }
    }

    // Use default theme
    return defaultTheme;
  });

  // Resolve the actual theme configuration and resolved theme name
  const { resolvedThemeConfig, resolvedThemeName } = useMemo(() => {
    const themeConfig = themes[currentTheme];
    if (!themeConfig) {
      console.warn(`Theme '${currentTheme}' not found, falling back to '${defaultTheme}'`);
      const fallbackConfig = themes[defaultTheme] || defaultThemes.light;
      const fallbackName = themes[defaultTheme] ? defaultTheme : 'light';
      return {
        resolvedThemeConfig: fallbackConfig,
        resolvedThemeName: fallbackName,
      };
    }
    return {
      resolvedThemeConfig: themeConfig,
      resolvedThemeName: currentTheme,
    };
  }, [currentTheme, themes, defaultTheme]);

  // Determine if current theme is dark
  const isDark = useMemo(() => {
    return resolvedThemeConfig.isDark || false;
  }, [resolvedThemeConfig]);

  // CSS variable injection effect
  useLayoutEffect(() => {
    // Validate theme configuration
    const validationErrors = validateThemeConfig(resolvedThemeConfig);
    if (validationErrors.length > 0) {
      console.error('Theme validation errors:', validationErrors);
      return;
    }

    try {
      // Add transition class before theme change if not disabled
      if (!disableTransitions) {
        document.documentElement.classList.add('theme-transitioning');
      }

      // Inject CSS variables
      injectThemeVariables(resolvedThemeConfig, cssVarPrefix);

      // Remove transition class after a brief delay
      if (!disableTransitions) {
        const timeoutId = setTimeout(() => {
          document.documentElement.classList.remove('theme-transitioning');
        }, 200);

        return () => clearTimeout(timeoutId);
      }
    } catch (error) {
      console.error('Failed to inject theme variables:', error);
    }

    // Return empty cleanup function for all other paths
    return () => {};
  }, [resolvedThemeConfig, cssVarPrefix, disableTransitions]);

  // System preference effect - auto-switch when system preference changes
  useLayoutEffect(() => {
    if (!enableSystem || !systemPreference) {
      return;
    }

    // Only auto-switch if user hasn't explicitly set a preference
    const storedPreference = getStoredTheme(storageKey);
    const hasExplicitPreference = storedPreference !== null;

    if (!hasExplicitPreference && themes[systemPreference]) {
      setCurrentTheme(systemPreference);
    }
  }, [systemPreference, enableSystem, themes, storageKey]);

  // Theme switching function
  const setTheme = useCallback((themeName: string, options: ThemeSwitchOptions = {}) => {
    const { persist = true } = options;

    if (!themes[themeName]) {
      console.warn(`Theme '${themeName}' does not exist`);
      return;
    }

    // Update current theme
    setCurrentTheme(themeName);

    // Persist to storage if requested
    if (persist) {
      setStoredTheme(themeName, storageKey, systemPreference || undefined);
    }
  }, [themes, storageKey, systemPreference]);

  // Theme toggle function
  const toggleTheme = useCallback(() => {
    const themeNames = Object.keys(themes);
    const currentIndex = themeNames.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeNames.length;
    const nextTheme = themeNames[nextIndex];

    setTheme(nextTheme);
  }, [themes, currentTheme, setTheme]);

  // Context value
  const contextValue = useMemo(() => ({
    theme: resolvedThemeConfig,
    themes,
    setTheme,
    toggleTheme,
    systemPreference,
    resolvedTheme: resolvedThemeName,
    isDark,
  }), [
    resolvedThemeConfig,
    themes,
    setTheme,
    toggleTheme,
    systemPreference,
    resolvedThemeName,
    isDark,
  ]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Display name for React DevTools
 */
ThemeProvider.displayName = 'ThemeProvider';;

/**
 * Higher-order component for theme provider
 * @param themes - Available themes
 * @param options - Provider options
 * @returns HOC that wraps components with ThemeProvider
 */
export function withThemeProvider(
  themes: Record<string, RuntimeThemeConfig> = defaultThemes,
  options: Omit<ThemeProviderProps, 'children' | 'themes'> = {}
) {
  return function ThemeProviderHOC<T extends object>(Component: React.ComponentType<T>) {
    const WrappedComponent = (props: T) => (
      <ThemeProvider themes={themes} {...options}>
        <Component {...props} />
      </ThemeProvider>
    );

    WrappedComponent.displayName = `withThemeProvider(${Component.displayName || Component.name})`;
    
    return WrappedComponent;
  };
}