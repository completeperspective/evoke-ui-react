import { ReactNode } from 'react';
import {
  colors,
  type ThemeConfig as BaseThemeConfig,
} from '../tokens';

/**
 * OKLCH Color Component Values
 */
export interface OklchColor {
  /** Lightness value (0-1) */
  l: number;
  /** Chroma value (0+, typically 0-0.37) */
  c: number;
  /** Hue value (0-360 degrees) */
  h: number;
}

/**
 * Extended theme configuration for runtime theming
 * Builds on the base ThemeConfig from tokens
 */
export interface ThemeConfig extends BaseThemeConfig {
  /** Theme name identifier */
  name: string;
  /** Theme display label */
  label?: string;
  /** Whether this is a dark theme */
  isDark?: boolean;
}

/**
 * Individual color token override for theming
 */
export interface ColorTokenOverride {
  /** OKLCH space values as string: "lightness chroma hue" */
  value: string;
  /** Complete CSS oklch() function call */
  oklch?: string;
  /** Fallback RGB value for older browsers */
  rgb?: string;
}

/**
 * Color tokens that can be overridden at runtime
 */
export interface ColorTokens {
  // Semantic colors
  background?: ColorTokenOverride;
  foreground?: ColorTokenOverride;
  primary?: ColorTokenOverride;
  primaryForeground?: ColorTokenOverride;
  secondary?: ColorTokenOverride;
  secondaryForeground?: ColorTokenOverride;
  muted?: ColorTokenOverride;
  mutedForeground?: ColorTokenOverride;
  accent?: ColorTokenOverride;
  accentForeground?: ColorTokenOverride;
  destructive?: ColorTokenOverride;
  destructiveForeground?: ColorTokenOverride;
  border?: ColorTokenOverride;
  input?: ColorTokenOverride;
  ring?: ColorTokenOverride;
  card?: ColorTokenOverride;
  cardForeground?: ColorTokenOverride;
  popover?: ColorTokenOverride;
  popoverForeground?: ColorTokenOverride;

  // Brand colors
  brandPrimary?: ColorTokenOverride;
  brandSecondary?: ColorTokenOverride;
  brandAccent?: ColorTokenOverride;

  // Status colors
  success?: ColorTokenOverride;
  warning?: ColorTokenOverride;
  error?: ColorTokenOverride;
  info?: ColorTokenOverride;
}

/**
 * Typography tokens that can be overridden at runtime
 */
export interface TypographyTokens {
  fontFamily?: {
    sans?: string[];
    serif?: string[];
    mono?: string[];
  };
  fontSize?: Record<string, { fontSize: string; lineHeight: string; letterSpacing?: string }>;
  fontWeight?: Record<string, number>;
  letterSpacing?: Record<string, string>;
  lineHeight?: Record<string, string>;
}

/**
 * Spacing tokens that can be overridden at runtime
 */
export interface SpacingTokens {
  spacing?: Record<string, string>;
  componentSpacing?: Record<string, Record<string, string>>;
}

/**
 * Motion tokens that can be overridden at runtime
 */
export interface MotionTokens {
  duration?: Record<string, string>;
  easing?: Record<string, string>;
}

/**
 * Component-specific token overrides
 */
export interface ComponentTokens {
  button?: {
    height?: Record<string, string>;
    padding?: Record<string, string>;
    borderRadius?: Record<string, string>;
    fontSize?: Record<string, string>;
  };
  input?: {
    height?: Record<string, string>;
    padding?: Record<string, string>;
    borderRadius?: string;
  };
  card?: {
    padding?: string;
    borderRadius?: string;
  };
  [key: string]: Record<string, string | Record<string, string>> | undefined;
}

/**
 * Runtime theme configuration with specific token overrides
 */
export interface RuntimeThemeConfig {
  name: string;
  label?: string;
  isDark?: boolean;
  colors?: Partial<ColorTokens>;
  typography?: Partial<TypographyTokens>;
  spacing?: Partial<SpacingTokens>;
  motion?: Partial<MotionTokens>;
  components?: Partial<ComponentTokens>;
}

/**
 * Theme context value interface
 */
export interface ThemeContextValue {
  /** Current theme configuration */
  theme: RuntimeThemeConfig;
  /** All available themes */
  themes: Record<string, RuntimeThemeConfig>;
  /** Set theme by name */
  setTheme: (name: string, options?: ThemeSwitchOptions) => void;
  /** Toggle between themes (cycles through available themes) */
  toggleTheme: () => void;
  /** System color scheme preference */
  systemPreference: 'light' | 'dark' | null;
  /** Resolved theme name (accounts for system preference) */
  resolvedTheme: string;
  /** Whether the current theme is dark */
  isDark: boolean;
}

/**
 * Theme Provider component props
 */
export interface ThemeProviderProps {
  /** Child components */
  children: ReactNode;
  /** Available themes */
  themes?: Record<string, RuntimeThemeConfig>;
  /** Default theme name */
  defaultTheme?: string;
  /** Whether to respect system preference */
  enableSystem?: boolean;
  /** Storage key for persistence */
  storageKey?: string;
  /** Custom CSS variable prefix */
  cssVarPrefix?: string;
  /** Disable theme transitions */
  disableTransitions?: boolean;
}

/**
 * CSS Variable injection configuration
 */
export interface CSSVariableConfig {
  /** CSS variable name */
  name: string;
  /** CSS variable value */
  value: string;
  /** Whether this variable supports OKLCH */
  supportsOklch?: boolean;
  /** RGB fallback value */
  fallback?: string;
}

/**
 * Storage theme preference
 */
export interface StoredThemePreference {
  /** Theme name */
  theme: string;
  /** Timestamp when stored */
  timestamp: number;
  /** System preference at time of storage */
  systemPreference?: 'light' | 'dark';
}

/**
 * Theme switching options
 */
export interface ThemeSwitchOptions {
  /** Whether to animate the transition */
  animate?: boolean;
  /** Transition duration in milliseconds */
  duration?: number;
  /** Whether to save to storage */
  persist?: boolean;
}

/**
 * Default themes using existing token system
 */
export const defaultThemes: Record<string, RuntimeThemeConfig> = {
  light: {
    name: 'light',
    label: 'Light',
    isDark: false,
    colors: {
      background: { value: colors.semantic.light.background.value },
      foreground: { value: colors.semantic.light.foreground.value },
      primary: { value: colors.semantic.light.primary.value },
      primaryForeground: { value: colors.semantic.light.primaryForeground.value },
      secondary: { value: colors.semantic.light.secondary.value },
      secondaryForeground: { value: colors.semantic.light.secondaryForeground.value },
      muted: { value: colors.semantic.light.muted.value },
      mutedForeground: { value: colors.semantic.light.mutedForeground.value },
      accent: { value: colors.semantic.light.accent.value },
      accentForeground: { value: colors.semantic.light.accentForeground.value },
      destructive: { value: colors.semantic.light.destructive.value },
      destructiveForeground: { value: colors.semantic.light.destructiveForeground.value },
      border: { value: colors.semantic.light.border.value },
      input: { value: colors.semantic.light.input.value },
      ring: { value: colors.semantic.light.ring.value },
      card: { value: colors.semantic.light.card.value },
      cardForeground: { value: colors.semantic.light.cardForeground.value },
      popover: { value: colors.semantic.light.popover.value },
      popoverForeground: { value: colors.semantic.light.popoverForeground.value },
    },
  },
  dark: {
    name: 'dark',
    label: 'Dark',
    isDark: true,
    colors: {
      background: { value: colors.semantic.dark.background.value },
      foreground: { value: colors.semantic.dark.foreground.value },
      primary: { value: colors.semantic.dark.primary.value },
      primaryForeground: { value: colors.semantic.dark.primaryForeground.value },
      secondary: { value: colors.semantic.dark.secondary.value },
      secondaryForeground: { value: colors.semantic.dark.secondaryForeground.value },
      muted: { value: colors.semantic.dark.muted.value },
      mutedForeground: { value: colors.semantic.dark.mutedForeground.value },
      accent: { value: colors.semantic.dark.accent.value },
      accentForeground: { value: colors.semantic.dark.accentForeground.value },
      destructive: { value: colors.semantic.dark.destructive.value },
      destructiveForeground: { value: colors.semantic.dark.destructiveForeground.value },
      border: { value: colors.semantic.dark.border.value },
      input: { value: colors.semantic.dark.input.value },
      ring: { value: colors.semantic.dark.ring.value },
      card: { value: colors.semantic.dark.card.value },
      cardForeground: { value: colors.semantic.dark.cardForeground.value },
      popover: { value: colors.semantic.dark.popover.value },
      popoverForeground: { value: colors.semantic.dark.popoverForeground.value },
    },
  },
} as const;

/**
 * Type guards for theme validation
 */
export function isValidThemeConfig(config: unknown): config is RuntimeThemeConfig {
  return (
    typeof config === 'object' &&
    config !== null &&
    typeof (config as Record<string, unknown>).name === 'string' &&
    ((config as Record<string, unknown>).name as string).length > 0
  );
}

export function isValidOklchColor(color: unknown): color is OklchColor {
  const colorRecord = color as Record<string, unknown>;
  return (
    typeof color === 'object' &&
    color !== null &&
    typeof colorRecord.l === 'number' &&
    typeof colorRecord.c === 'number' &&
    typeof colorRecord.h === 'number' &&
    colorRecord.l >= 0 &&
    colorRecord.l <= 1 &&
    colorRecord.c >= 0 &&
    colorRecord.h >= 0 &&
    colorRecord.h <= 360
  );
}