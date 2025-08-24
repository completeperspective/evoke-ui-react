/**
 * CSS Class Name Constants
 * 
 * Replaces CSS module imports with simple class name constants.
 * These correspond to classes defined in src/styles/components/_atoms.scss
 */

// Button component class names
export const buttonClasses = {
  button: 'evoke-button',
} as const;

// Input component class names  
export const inputClasses = {
  container: 'evoke-input-container',
  input: 'evoke-input',
} as const;

// Text component class names
export const textClasses = {
  text: 'evoke-text',
  monospace: 'evoke-text-monospace',
  prose: 'evoke-text-prose',
  smallCaps: 'evoke-text-small-caps',
  tabularNums: 'evoke-text-tabular-nums',
} as const;

// Heading component class names
export const headingClasses = {
  heading: 'evoke-heading',
  focusable: 'evoke-heading-focusable',
  balance: 'evoke-heading-balance',
} as const;

// Label component class names
export const labelClasses = {
  label: 'evoke-label',
  content: 'evoke-label-content',
  indicator: 'evoke-label-indicator',
  required: 'evoke-label-required',
  optional: 'evoke-label-optional',
  info: 'evoke-label-info',
  suffix: 'evoke-label-suffix',
} as const;

// Badge component class names
export const badgeClasses = {
  badge: 'evoke-badge',
} as const;

// Skeleton component class names
export const skeletonClasses = {
  skeleton: 'evoke-skeleton',
  static: 'evoke-skeleton-static',
  shimmer: 'evoke-skeleton-shimmer',
  textLines: 'evoke-skeleton-text-lines',
} as const;

// Separator component class names
export const separatorClasses = {
  separator: 'evoke-separator',
} as const;

// FormField molecular component class names
export const formFieldClasses = {
  formField: 'evoke-form-field',
  description: 'evoke-form-field-description',
} as const;

// Card molecular component class names
export const cardClasses = {
  card: 'evoke-card',
  header: 'evoke-card-header',
  content: 'evoke-card-content',
  footer: 'evoke-card-footer',
} as const;