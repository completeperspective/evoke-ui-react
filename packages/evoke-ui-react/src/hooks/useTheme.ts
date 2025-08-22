import { useContext, useMemo } from 'react';
import { ThemeContext } from '../providers/ThemeContext';
import type { ThemeContextValue } from '../types';

/**
 * Theme Hook
 * Primary hook for consuming theme context and managing theme state
 */

/**
 * Hook to consume theme context
 * @returns Theme context value with theme state and switching functions
 * @throws Error if used outside ThemeProvider
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
      'Make sure your component is wrapped with <ThemeProvider>.'
    );
  }

  return context;
}

/**
 * Hook to get only the current theme configuration
 * @returns Current theme configuration
 */
export function useCurrentTheme() {
  const { theme } = useTheme();
  return theme;
}

/**
 * Hook to get theme switching functions
 * @returns Object with theme switching utilities
 */
export function useThemeSwitcher() {
  const { setTheme, toggleTheme, themes, resolvedTheme } = useTheme();

  return useMemo(() => ({
    setTheme,
    toggleTheme,
    availableThemes: Object.keys(themes),
    currentTheme: resolvedTheme,
  }), [setTheme, toggleTheme, themes, resolvedTheme]);
}

/**
 * Hook to get theme-aware color utilities
 * @returns Object with color values and utilities
 */
export function useThemeColors() {
  const { theme, isDark } = useTheme();
  
  return useMemo(() => ({
    colors: theme.colors || {},
    isDark,
    // Helper to get color value
    getColor: (colorKey: string) => {
      const color = theme.colors?.[colorKey as keyof typeof theme.colors];
      return color?.value || null;
    },
    // Helper to get CSS variable name
    getCSSVar: (colorKey: string, prefix: string = 'ui') => {
      const kebabKey = colorKey.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `var(--${prefix}-color-${kebabKey})`;
    },
  }), [theme, isDark]);
}

/**
 * Hook to check if a specific theme is active
 * @param themeName - Name of the theme to check
 * @returns True if the specified theme is active
 */
export function useIsThemeActive(themeName: string): boolean {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === themeName;
}

/**
 * Hook to get theme status and preferences
 * @returns Object with theme status information
 */
export function useThemeStatus() {
  const { 
    resolvedTheme, 
    systemPreference, 
    isDark, 
    theme 
  } = useTheme();

  return useMemo(() => ({
    currentTheme: resolvedTheme,
    systemPreference,
    isDark,
    isLight: !isDark,
    isSystemTheme: resolvedTheme === systemPreference,
    themeName: theme.name,
    themeLabel: theme.label || theme.name,
  }), [resolvedTheme, systemPreference, isDark, theme]);
}

/**
 * Hook for component-specific theme tokens
 * @param componentName - Name of the component
 * @returns Component-specific theme tokens
 */
export function useComponentTheme(componentName: string) {
  const { theme } = useTheme();
  
  return useMemo(() => {
    const componentTokens = theme.components?.[componentName];
    return {
      tokens: componentTokens || {},
      hasTokens: Boolean(componentTokens),
      // Helper to get component CSS variable
      getCSSVar: (property: string, variant?: string, prefix: string = 'ui') => {
        const kebabComponent = componentName.replace(/([A-Z])/g, '-$1').toLowerCase();
        const kebabProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
        
        if (variant) {
          return `var(--${prefix}-${kebabComponent}-${kebabProperty}-${variant})`;
        }
        
        return `var(--${prefix}-${kebabComponent}-${kebabProperty})`;
      },
    };
  }, [theme.components, componentName]);
}

/**
 * Hook to watch for theme changes
 * @param callback - Function to call when theme changes
 * @param deps - Dependencies for the callback
 */
export function useThemeChange(
  callback: (themeName: string, isDark: boolean) => void,
  deps: React.DependencyList = []
) {
  const { resolvedTheme, isDark } = useTheme();

  // Use useMemo to trigger callback on theme changes
  useMemo(() => {
    callback(resolvedTheme, isDark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedTheme, isDark, ...deps]);
}

/**
 * Hook to get theme-aware media queries
 * @returns Object with theme-aware media query helpers
 */
export function useThemeMediaQueries() {
  const { isDark } = useTheme();

  return useMemo(() => ({
    isDark,
    isLight: !isDark,
    // CSS media query for current theme
    getCurrentThemeQuery: () => 
      isDark ? '(prefers-color-scheme: dark)' : '(prefers-color-scheme: light)',
    // Helper for conditional styles based on theme
    when: (condition: 'dark' | 'light', styles: string) => 
      (condition === 'dark' && isDark) || (condition === 'light' && !isDark) ? styles : '',
  }), [isDark]);
}

/**
 * Hook for theme-aware CSS class names
 * @param baseClass - Base CSS class name
 * @param options - Theme-specific class options
 * @returns Theme-appropriate class name
 */
export function useThemeClassName(
  baseClass: string,
  options: {
    dark?: string;
    light?: string;
    append?: boolean;
  } = {}
) {
  const { isDark } = useTheme();
  const { dark, light, append = true } = options;

  return useMemo(() => {
    const themeClass = isDark ? dark : light;
    
    if (!themeClass) {
      return baseClass;
    }

    return append ? `${baseClass} ${themeClass}` : themeClass;
  }, [baseClass, dark, light, append, isDark]);
}

/**
 * Hook to get safe theme context (doesn't throw if outside provider)
 * @returns Theme context value or null if outside provider
 */
export function useThemeSafe(): ThemeContextValue | null {
  const context = useContext(ThemeContext);
  return context || null;
}

/**
 * Hook to check if component is inside ThemeProvider
 * @returns True if inside ThemeProvider
 */
export function useIsInsideThemeProvider(): boolean {
  const context = useThemeSafe();
  return context !== null;
}