import type { 
  RuntimeThemeConfig, 
  CSSVariableConfig,
  ColorTokenOverride,
  ThemeSwitchOptions
} from '../types';
import { supportsOklch, toRGBFallback } from './colors';

/**
 * Theme Utilities
 * Functions for CSS variable injection, theme validation, and theme switching
 */

/**
 * Default CSS variable prefix
 */
export const DEFAULT_CSS_VAR_PREFIX = 'ui';

/**
 * Convert camelCase to kebab-case for CSS variables
 * @param str - camelCase string
 * @returns kebab-case string
 */
export function camelToKebab(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * Generate CSS variable name
 * @param key - Variable key
 * @param prefix - CSS variable prefix
 * @returns CSS variable name with --prefix-
 */
export function generateCSSVarName(key: string, prefix: string = DEFAULT_CSS_VAR_PREFIX): string {
  const kebabKey = camelToKebab(key);
  return `--${prefix}-color-${kebabKey}`;
}

/**
 * Create CSS variable configuration
 * @param key - Variable key  
 * @param token - Color token override
 * @param prefix - CSS variable prefix
 * @returns CSS variable configuration
 */
export function createCSSVariableConfig(
  key: string, 
  token: ColorTokenOverride, 
  prefix: string = DEFAULT_CSS_VAR_PREFIX
): CSSVariableConfig {
  const name = generateCSSVarName(key, prefix);
  const supportsOklchColor = supportsOklch();
  
  return {
    name,
    value: supportsOklchColor ? token.value : (token.rgb || toRGBFallback(token.value)),
    supportsOklch: supportsOklchColor,
    fallback: token.rgb || toRGBFallback(token.value),
  };
}

/**
 * Inject CSS variables into the document root
 * @param theme - Runtime theme configuration
 * @param prefix - CSS variable prefix
 * @param root - Root element (defaults to document.documentElement)
 */
export function injectThemeVariables(
  theme: RuntimeThemeConfig,
  prefix: string = DEFAULT_CSS_VAR_PREFIX,
  root: HTMLElement = document.documentElement
): void {
  if (!theme) {
    return;
  }

  // Inject color variables
  if (theme.colors) {
    Object.entries(theme.colors).forEach(([key, token]) => {
      if (token && token.value) {
        const config = createCSSVariableConfig(key, token, prefix);
        root.style.setProperty(config.name, config.value);
      }
    });
  }

  // Inject typography variables
  if (theme.typography) {
    if (theme.typography.fontFamily) {
      Object.entries(theme.typography.fontFamily).forEach(([key, value]) => {
        if (value) {
          const varName = `--${prefix}-font-family-${key}`;
          root.style.setProperty(varName, Array.isArray(value) ? value.join(', ') : value);
        }
      });
    }

    if (theme.typography.fontSize) {
      Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
        if (value) {
          const fontSizeVar = `--${prefix}-font-size-${camelToKebab(key)}`;
          const lineHeightVar = `--${prefix}-line-height-${camelToKebab(key)}`;
          
          root.style.setProperty(fontSizeVar, value.fontSize);
          root.style.setProperty(lineHeightVar, value.lineHeight);
          
          if (value.letterSpacing) {
            const letterSpacingVar = `--${prefix}-letter-spacing-${camelToKebab(key)}`;
            root.style.setProperty(letterSpacingVar, value.letterSpacing);
          }
        }
      });
    }

    if (theme.typography.fontWeight) {
      Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
        if (typeof value === 'number') {
          const varName = `--${prefix}-font-weight-${camelToKebab(key)}`;
          root.style.setProperty(varName, value.toString());
        }
      });
    }
  }

  // Inject spacing variables
  if (theme.spacing?.spacing) {
    Object.entries(theme.spacing.spacing).forEach(([key, value]) => {
      if (value) {
        const varName = `--${prefix}-space-${key}`;
        root.style.setProperty(varName, value);
      }
    });
  }

  // Inject motion variables
  if (theme.motion) {
    if (theme.motion.duration) {
      Object.entries(theme.motion.duration).forEach(([key, value]) => {
        if (value) {
          const varName = `--${prefix}-duration-${camelToKebab(key)}`;
          root.style.setProperty(varName, value);
        }
      });
    }

    if (theme.motion.easing) {
      Object.entries(theme.motion.easing).forEach(([key, value]) => {
        if (value) {
          const varName = `--${prefix}-easing-${camelToKebab(key)}`;
          root.style.setProperty(varName, value);
        }
      });
    }
  }

  // Inject component-specific variables
  if (theme.components) {
    Object.entries(theme.components).forEach(([componentName, componentTokens]) => {
      if (componentTokens) {
        Object.entries(componentTokens).forEach(([property, tokens]) => {
          if (tokens && typeof tokens === 'object') {
            Object.entries(tokens).forEach(([variant, value]) => {
              if (value) {
                const varName = `--${prefix}-${camelToKebab(componentName)}-${camelToKebab(property)}-${variant}`;
                root.style.setProperty(varName, value as string);
              }
            });
          } else if (typeof tokens === 'string') {
            const varName = `--${prefix}-${camelToKebab(componentName)}-${camelToKebab(property)}`;
            root.style.setProperty(varName, tokens);
          }
        });
      }
    });
  }

  // Add theme class to root for CSS cascade
  root.classList.remove('light', 'dark');
  root.classList.add(theme.isDark ? 'dark' : 'light');
  
  // Set data attribute for CSS selectors
  root.setAttribute('data-theme', theme.name);
}

/**
 * Remove theme variables from the document root
 * @param prefix - CSS variable prefix
 * @param root - Root element (defaults to document.documentElement)
 */
export function removeThemeVariables(
  prefix: string = DEFAULT_CSS_VAR_PREFIX,
  root: HTMLElement = document.documentElement
): void {
  // Get all style properties
  const styles = root.style;
  const propertiesToRemove: string[] = [];
  
  // Find all properties with our prefix
  for (let i = 0; i < styles.length; i++) {
    const property = styles.item(i);
    if (property.startsWith(`--${prefix}-`)) {
      propertiesToRemove.push(property);
    }
  }
  
  // Remove the properties
  propertiesToRemove.forEach((property) => {
    root.style.removeProperty(property);
  });

  // Remove theme classes and attributes
  root.classList.remove('light', 'dark');
  root.removeAttribute('data-theme');
}

/**
 * Generate CSS string for a theme
 * @param theme - Runtime theme configuration
 * @param prefix - CSS variable prefix
 * @returns CSS string with all theme variables
 */
export function generateThemeCSS(
  theme: RuntimeThemeConfig,
  prefix: string = DEFAULT_CSS_VAR_PREFIX
): string {
  const cssLines: string[] = [];
  const selector = theme.isDark ? ':root.dark' : ':root';
  
  cssLines.push(`${selector} {`);

  // Color variables
  if (theme.colors) {
    Object.entries(theme.colors).forEach(([key, token]) => {
      if (token && token.value) {
        const config = createCSSVariableConfig(key, token, prefix);
        cssLines.push(`  ${config.name}: ${config.value};`);
      }
    });
  }

  // Typography variables
  if (theme.typography) {
    if (theme.typography.fontFamily) {
      Object.entries(theme.typography.fontFamily).forEach(([key, value]) => {
        if (value) {
          const varName = `--${prefix}-font-family-${key}`;
          const fontValue = Array.isArray(value) ? value.join(', ') : value;
          cssLines.push(`  ${varName}: ${fontValue};`);
        }
      });
    }

    if (theme.typography.fontSize) {
      Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
        if (value) {
          const fontSizeVar = `--${prefix}-font-size-${camelToKebab(key)}`;
          const lineHeightVar = `--${prefix}-line-height-${camelToKebab(key)}`;
          
          cssLines.push(`  ${fontSizeVar}: ${value.fontSize};`);
          cssLines.push(`  ${lineHeightVar}: ${value.lineHeight};`);
          
          if (value.letterSpacing) {
            const letterSpacingVar = `--${prefix}-letter-spacing-${camelToKebab(key)}`;
            cssLines.push(`  ${letterSpacingVar}: ${value.letterSpacing};`);
          }
        }
      });
    }
  }

  cssLines.push('}');
  return cssLines.join('\n');
}

/**
 * Merge theme configurations
 * @param baseTheme - Base theme configuration
 * @param overrides - Theme overrides to apply
 * @returns Merged theme configuration
 */
export function mergeThemeConfig(
  baseTheme: RuntimeThemeConfig,
  overrides: Partial<RuntimeThemeConfig>
): RuntimeThemeConfig {
  return {
    ...baseTheme,
    ...overrides,
    colors: {
      ...baseTheme.colors,
      ...overrides.colors,
    },
    typography: {
      ...baseTheme.typography,
      ...overrides.typography,
    },
    spacing: {
      ...baseTheme.spacing,
      ...overrides.spacing,
    },
    motion: {
      ...baseTheme.motion,
      ...overrides.motion,
    },
    components: {
      ...baseTheme.components,
      ...overrides.components,
    },
  };
}

/**
 * Validate theme configuration
 * @param theme - Theme configuration to validate
 * @returns Array of validation errors (empty if valid)
 */
export function validateThemeConfig(theme: unknown): string[] {
  const errors: string[] = [];

  if (!theme) {
    errors.push('Theme configuration is required');
    return errors;
  }

  const themeRecord = theme as Record<string, unknown>;

  if (typeof themeRecord.name !== 'string' || (themeRecord.name as string).trim().length === 0) {
    errors.push('Theme must have a valid name');
  }

  // Validate colors if present
  if (themeRecord.colors) {
    if (typeof themeRecord.colors !== 'object') {
      errors.push('Theme colors must be an object');
    } else {
      Object.entries(themeRecord.colors as Record<string, unknown>).forEach(([key, token]) => {
        if (token && typeof token === 'object') {
          const colorToken = token as ColorTokenOverride;
          if (!colorToken.value) {
            errors.push(`Color token '${key}' is missing value`);
          }
          if (typeof colorToken.value !== 'string') {
            errors.push(`Color token '${key}' value must be a string`);
          }
        }
      });
    }
  }

  return errors;
}

/**
 * Create a theme switching function with options
 * @param onSwitch - Callback function when theme switches
 * @returns Theme switching function
 */
export function createThemeSwitcher(
  onSwitch?: (themeName: string, options?: ThemeSwitchOptions) => void
) {
  return (themeName: string, options: ThemeSwitchOptions = {}) => {
    const {
      animate = true,
      duration = 200,
    } = options;

    // Add transition if animation is enabled
    if (animate) {
      const root = document.documentElement;
      root.style.transition = `all ${duration}ms ease-in-out`;
      
      // Remove transition after animation completes
      setTimeout(() => {
        root.style.removeProperty('transition');
      }, duration);
    }

    // Call the switch callback
    if (onSwitch) {
      onSwitch(themeName, options);
    }
  };
}

/**
 * Get current theme from DOM attributes
 * @returns Current theme name or null if not set
 */
export function getCurrentTheme(): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  return document.documentElement.getAttribute('data-theme');
}

/**
 * Check if current theme is dark mode
 * @returns True if current theme is dark
 */
export function isDarkTheme(): boolean {
  if (typeof document === 'undefined') {
    return false;
  }

  return document.documentElement.classList.contains('dark');
}