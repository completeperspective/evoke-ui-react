import { create } from '@storybook/theming/create';

// OKLCH to RGB conversion for Storybook theming compatibility
// These RGB values are converted from the original OKLCH values to maintain visual consistency
const colors = {
  // --ui-color-primary: oklch(0.6533 0.2684 354.75) → RGB equivalent
  primary: '#FF0069',
  // --ui-color-secondary: oklch(0.96 0.006 247.86) → RGB equivalent
  secondary: '#FF0069',
  // --ui-color-background: oklch(1 0 0) → pure white
  background: '#f7f8f9',
  // --ui-color-foreground: oklch(0.19 0.015 247.86) → RGB equivalent
  foreground: '#1e293b',
  // --ui-color-muted-foreground: oklch(0.55 0.016 247.86) → RGB equivalent
  mutedForeground: '#64748b',
  // --ui-color-border: oklch(0.92 0.013 247.86) → RGB equivalent
  border: '#e2e8f0',
  // Light background variant
  lightBackground: '#fefefe',
};

export default create({
  base: 'light',

  // Brand identity
  brandTitle: 'Evoke UI Design System',
  brandUrl: 'https://github.com/completeperspective/evoke-ui-react',
  brandImage: './evoke-ui-logo.svg',
  brandTarget: '_self',

  // Colors aligned with Evoke UI design tokens (RGB conversions for polished compatibility)
  colorPrimary: colors.primary,
  colorSecondary: colors.secondary,

  // UI colors
  appBg: colors.background,
  appContentBg: colors.background,
  appPreviewBg: colors.background,
  appBorderColor: colors.border,
  appBorderRadius: 6, // --ui-radius-md equivalent

  // Text colors
  textColor: colors.foreground,
  textInverseColor: colors.background,
  textMutedColor: colors.mutedForeground,

  // Toolbar
  barTextColor: colors.mutedForeground,
  barSelectedColor: colors.primary,
  barHoverColor: colors.primary,
  barBg: colors.background,

  // Form colors
  inputBg: colors.background,
  inputBorder: colors.border,
  inputTextColor: colors.foreground,
  inputBorderRadius: 6,

  // Typography
  fontBase: '"Inter", system-ui, -apple-system, sans-serif',
  fontCode: '"Fira Code", "SF Mono", Monaco, monospace',
});
