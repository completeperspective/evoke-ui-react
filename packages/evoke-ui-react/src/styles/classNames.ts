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

// SearchBar molecular component class names
export const searchBarClasses = {
  searchBar: 'evoke-search-bar',
} as const;

// Modal organism component class names
export const modalClasses = {
  modal: 'evoke-modal',
  overlay: 'evoke-modal-overlay',
  content: 'evoke-modal-content',
  header: 'evoke-modal-header',
  footer: 'evoke-modal-footer',
  title: 'evoke-modal-title',
  description: 'evoke-modal-description',
  close: 'evoke-modal-close',
} as const;

// Dialog organism component class names
export const dialogClasses = {
  dialog: 'evoke-dialog',
  content: 'evoke-dialog-content',
  actions: 'evoke-dialog-actions',
} as const;

// AlertDialog organism component class names
export const alertDialogClasses = {
  alertDialog: 'evoke-alert-dialog',
  overlay: 'evoke-alert-dialog-overlay',
  content: 'evoke-alert-dialog-content',
  header: 'evoke-alert-dialog-header',
  footer: 'evoke-alert-dialog-footer',
  title: 'evoke-alert-dialog-title',
  description: 'evoke-alert-dialog-description',
  action: 'evoke-alert-dialog-action',
  cancel: 'evoke-alert-dialog-cancel',
  actions: 'evoke-alert-dialog-actions',
} as const;

// Drawer organism component class names
export const drawerClasses = {
  drawer: 'evoke-drawer',
  content: 'evoke-drawer-content',
  header: 'evoke-drawer-header',
  footer: 'evoke-drawer-footer',
  title: 'evoke-drawer-title',
  description: 'evoke-drawer-description',
} as const;

// Sheet organism component class names
export const sheetClasses = {
  sheet: 'evoke-sheet',
  content: 'evoke-sheet-content',
  inner: 'evoke-sheet-inner',
  header: 'evoke-sheet-header',
  footer: 'evoke-sheet-footer',
  title: 'evoke-sheet-title',
  description: 'evoke-sheet-description',
} as const;

// Grid atomic component class names
export const gridClasses = {
  grid: 'evoke-grid',
  gridItem: 'evoke-grid-item',
} as const;

// Box atomic component class names
export const boxClasses = {
  box: 'evoke-box',
} as const;