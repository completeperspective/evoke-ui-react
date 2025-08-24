import { create } from '@storybook/theming/create';

// OKLCH to RGB conversion for dark theme - polished compatibility
// These RGB values are converted from the original OKLCH values to maintain visual consistency
const darkColors = {
  // --ui-color-primary: oklch(0.6533 0.2684 354.75) → RGB equivalent (same as light)
  primary: '#ff0069',
  // --ui-color-secondary: oklch(0.27 0.015 247.86) → RGB equivalent for dark
  secondary: '#334155',
  // Dark background: oklch(0.13 0.013 247.86) → RGB equivalent
  background: '#161616',
  // Dark content background
  contentBackground: '#1e293b',
  // Dark foreground: oklch(0.98 0.005 247.86) → RGB equivalent
  foreground: '#f8fafc',
  // Dark muted foreground: oklch(0.7 0.015 247.86) → RGB equivalent
  mutedForeground: '#94a3b8',
  // Dark border: oklch(0.27 0.015 247.86) → RGB equivalent
  border: '#334155',
};

export default create({
  base: 'dark',

  // Brand identity
  brandTitle: 'Evoke UI Design System',
  brandUrl: 'https://github.com/completeperspective/evoke-ui-react',
  brandImage: './evoke-ui-logo-dark.svg',
  brandTarget: '_self',

  // Dark theme colors (RGB conversions for polished compatibility)
  colorPrimary: darkColors.primary,
  colorSecondary: darkColors.secondary,

  // UI colors for dark theme
  appBg: darkColors.background,
  appContentBg: darkColors.background,
  appPreviewBg: darkColors.background,
  appBorderColor: darkColors.border,
  appBorderRadius: 6,

  // Dark theme text
  textColor: darkColors.foreground,
  textInverseColor: darkColors.background,
  textMutedColor: darkColors.mutedForeground,

  // Dark toolbar
  barTextColor: darkColors.mutedForeground,
  barSelectedColor: darkColors.primary,
  barHoverColor: darkColors.primary,
  barBg: darkColors.background,

  // Dark form elements
  inputBg: darkColors.background,
  inputBorder: darkColors.border,
  inputTextColor: darkColors.foreground,
  inputBorderRadius: 6,

  // Typography
  fontBase: '"Inter", system-ui, -apple-system, sans-serif',
  fontCode: '"Fira Code", "SF Mono", Monaco, monospace',
});
