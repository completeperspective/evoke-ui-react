# Storybook Logo Customization Plan: "Evoke UI" Wordmark

## Executive Summary

This document provides a comprehensive implementation plan for customizing the Storybook logo with a custom "evoke ui" wordmark using Google Lobster font. The implementation leverages Storybook's theming system and aligns with the existing Evoke UI design system's OKLCH color space and modern design principles.

## Current Project Context

### Existing Design System

- **Color Space**: OKLCH format for perceptually uniform color manipulation
- **Primary Brand Color**: `--ui-color-primary: 0.6533 0.2684 354.75` (Vibrant magenta/pink)
- **Theme Support**: Automatic dark/light mode switching via media queries
- **Typography**: System font stack with comprehensive scale
- **Design Philosophy**: Modern, accessible, gaming industry-inspired UI patterns

### Current Storybook Setup

- **Version**: Storybook 9.1.3 with React Vite framework
- **Configuration**: `/.storybook/main.ts` and `/.storybook/preview.ts`
- **Addons**: docs, a11y (accessibility)
- **Build System**: Vite with Tailwind CSS v4 and Sass preprocessing

## Implementation Plan

### Phase 1: Font Integration and Asset Creation

#### 1.1 Google Lobster Font Setup

** CSS Import in Storybook **

```scss
/* .storybook/preview-head.html */
<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
```

#### 1.2 Logo Asset Creation

**File Structure:**

```
packages/evoke-ui-react/.storybook/
├── assets/
│   ├── evoke-ui-logo.svg          # Primary vector logo
│   ├── evoke-ui-logo-dark.svg     # Dark theme variant
│   ├── evoke-ui-logo-light.svg    # Light theme variant
│   ├── evoke-ui-logo.png          # Fallback raster (350x150px)
│   └── evoke-ui-favicon.ico       # Browser favicon
```

**SVG Logo Specifications:**

- **Dimensions**: 280x80px (3.5:1 ratio for optimal Storybook display)
- **Font**: Google Lobster for "evoke ui" text
- **Format**: SVG for scalability and theming support
- **Colors**: Use CSS custom properties for theme-aware colors

#### 1.3 Logo Design Specifications

**Typography:**

- **Font Family**: 'Lobster', cursive
- **Text**: "evoke ui" (lowercase for modern tech aesthetic)
- **Font Size**: 32px base size in SVG
- **Letter Spacing**: -0.02em for tighter, more branded appearance

**Color Recommendations:**

**Option 1: Primary Brand Color (Recommended)**

```css
/* Matches existing primary brand color */
color: oklch(var(--ui-color-primary)); /* Vibrant magenta/pink */
```

**Option 2: Gradient Treatment**

```css
/* Primary to secondary gradient for sophisticated look */
background: linear-gradient(
  135deg,
  oklch(var(--ui-color-primary)),
  oklch(var(--ui-color-secondary))
);
```

**Option 3: Gaming-Inspired Accent**

```css
/* Use accent color for gaming industry appeal */
color: oklch(var(--ui-color-accent));
```

### Phase 2: Storybook Theme Configuration

#### 2.1 Create Custom Theme File

**File**: `.storybook/evoke-theme.ts`

```typescript
import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  // Brand identity
  brandTitle: 'Evoke UI Design System',
  brandUrl: 'https://github.com/completeperspective/evoke-ui-react',
  brandImage: './assets/evoke-ui-logo.svg',
  brandTarget: '_self',

  // Colors aligned with Evoke UI design tokens
  colorPrimary: 'oklch(0.6533 0.2684 354.75)', // --ui-color-primary
  colorSecondary: 'oklch(0.96 0.006 247.86)', // --ui-color-secondary

  // UI colors
  appBg: 'oklch(1 0 0)', // --ui-color-background
  appContentBg: 'oklch(1 0 0)', // --ui-color-card
  appPreviewBg: 'oklch(1 0 0)',
  appBorderColor: 'oklch(0.92 0.013 247.86)', // --ui-color-border
  appBorderRadius: 6, // --ui-radius-md equivalent

  // Text colors
  textColor: 'oklch(0.19 0.015 247.86)', // --ui-color-foreground
  textInverseColor: 'oklch(0.98 0.005 247.86)', // --ui-color-background
  textMutedColor: 'oklch(0.55 0.016 247.86)', // --ui-color-muted-foreground

  // Toolbar
  barTextColor: 'oklch(0.55 0.016 247.86)',
  barSelectedColor: 'oklch(0.6533 0.2684 354.75)',
  barHoverColor: 'oklch(0.6533 0.2684 354.75)',
  barBg: 'oklch(1 0 0)',

  // Form colors
  inputBg: 'oklch(1 0 0)',
  inputBorder: 'oklch(0.92 0.013 247.86)',
  inputTextColor: 'oklch(0.19 0.015 247.86)',
  inputBorderRadius: 6,

  // Typography
  fontBase: '"Inter", system-ui, -apple-system, sans-serif',
  fontCode: '"Fira Code", "SF Mono", Monaco, monospace',
});
```

#### 2.2 Dark Theme Variant

**File**: `.storybook/evoke-theme-dark.ts`

```typescript
import { create } from '@storybook/theming/create';

export default create({
  base: 'dark',

  // Brand identity
  brandTitle: 'Evoke UI Design System',
  brandUrl: 'https://github.com/your-org/evoke-ui',
  brandImage: './assets/evoke-ui-logo-dark.svg',
  brandTarget: '_self',

  // Dark theme colors
  colorPrimary: 'oklch(0.6533 0.2684 354.75)',
  colorSecondary: 'oklch(0.27 0.015 247.86)',

  // UI colors for dark theme
  appBg: 'oklch(0.13 0.013 247.86)', // Dark background
  appContentBg: 'oklch(0.13 0.013 247.86)',
  appPreviewBg: 'oklch(0.13 0.013 247.86)',
  appBorderColor: 'oklch(0.27 0.015 247.86)',
  appBorderRadius: 6,

  // Dark theme text
  textColor: 'oklch(0.98 0.005 247.86)',
  textInverseColor: 'oklch(0.13 0.013 247.86)',
  textMutedColor: 'oklch(0.7 0.015 247.86)',

  // Dark toolbar
  barTextColor: 'oklch(0.7 0.015 247.86)',
  barSelectedColor: 'oklch(0.6533 0.2684 354.75)',
  barHoverColor: 'oklch(0.6533 0.2684 354.75)',
  barBg: 'oklch(0.13 0.013 247.86)',

  // Dark form elements
  inputBg: 'oklch(0.13 0.013 247.86)',
  inputBorder: 'oklch(0.27 0.015 247.86)',
  inputTextColor: 'oklch(0.98 0.005 247.86)',
  inputBorderRadius: 6,

  // Typography
  fontBase: '"Inter", system-ui, -apple-system, sans-serif',
  fontCode: '"Fira Code", "SF Mono", Monaco, monospace',
});
```

#### 2.3 Manager Configuration

**File**: `.storybook/manager.ts`

```typescript
import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';
import evokeTheme from './evoke-theme';
import evokeThemeDark from './evoke-theme-dark';

// Detect system theme preference
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

addons.setConfig({
  theme: isDark ? evokeThemeDark : evokeTheme,

  // Additional Storybook UI configuration
  sidebar: {
    showRoots: false,
    collapsedRoots: ['example'],
  },

  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },

  // Panel configuration
  panel: {
    collapsedPanels: ['storybook/docs/panel'],
  },
});

// Dynamic theme switching based on system preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  addons.setConfig({
    theme: e.matches ? evokeThemeDark : evokeTheme,
  });
});
```

### Phase 3: Advanced Logo Implementation

#### 3.1 Responsive Logo with HTML Img Tag Method

For enhanced control over logo sizing:

```typescript
// Alternative brandTitle approach for precise sizing control
brandTitle: `<img src="./assets/evoke-ui-logo.svg" width="160px" height="40px" alt="Evoke UI" style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));" />`,
```

#### 3.2 CSS-Based Logo Styling

**File**: `.storybook/manager-head.html`

```html
<style>
  /* Custom logo styling */
  .sidebar-header [title] {
    font-family: 'Lobster', cursive !important;
    font-size: 24px !important;
    background: linear-gradient(
      135deg,
      oklch(0.6533 0.2684 354.75),
      oklch(0.75 0.18 310)
    ) !important;
    -webkit-background-clip: text !important;
    background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    letter-spacing: -0.02em !important;
    font-weight: normal !important;
  }

  /* Logo image enhancements */
  .sidebar-header img {
    transition: all 0.2s ease !important;
    border-radius: 4px !important;
  }

  .sidebar-header img:hover {
    transform: scale(1.02) !important;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15)) !important;
  }

  /* Dark theme adjustments */
  @media (prefers-color-scheme: dark) {
    .sidebar-header img {
      filter: brightness(0.9) !important;
    }
  }
</style>
```

### Phase 4: Logo Asset Creation Guide

#### 4.1 SVG Logo Template

**File**: `.storybook/assets/evoke-ui-logo.svg`

```svg
<svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .logo-text {
        font-family: 'Lobster', cursive;
        font-size: 32px;
        font-weight: 400;
        letter-spacing: -0.02em;
        fill: oklch(var(--ui-color-primary, 0.6533 0.2684 354.75));
      }
      .logo-accent {
        fill: oklch(var(--ui-color-accent, 0.75 0.18 310));
      }
    </style>
  </defs>

  <!-- Logo background (optional subtle accent) -->
  <rect x="0" y="0" width="280" height="80" fill="none" />

  <!-- Main wordmark -->
  <text x="20" y="50" class="logo-text">evoke ui</text>

  <!-- Optional accent dot after "ui" -->
  <circle cx="250" cy="45" r="4" class="logo-accent" />
</svg>
```

#### 4.2 Dark Theme Logo Variant

**File**: `.storybook/assets/evoke-ui-logo-dark.svg`

```svg
<svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .logo-text-dark {
        font-family: 'Lobster', cursive;
        font-size: 32px;
        font-weight: 400;
        letter-spacing: -0.02em;
        fill: oklch(0.98 0.005 247.86);
      }
      .logo-accent-dark {
        fill: oklch(0.6533 0.2684 354.75);
      }
    </style>
  </defs>

  <!-- Dark theme wordmark -->
  <text x="20" y="50" class="logo-text-dark">evoke ui</text>
  <circle cx="250" cy="45" r="4" class="logo-accent-dark" />
</svg>
```

#### 4.3 PNG Fallback Creation

For PNG fallback (350x150px as recommended by Storybook):

- Create in design tool (Figma, Sketch, etc.)
- Use transparent background
- Export at 2x resolution for retina displays
- Optimize file size while maintaining quality

### Phase 5: Configuration Updates

#### 5.1 Update Main Storybook Config

**File**: `.storybook/main.ts` (additions)

```typescript
const config: StorybookConfig = {
  // ... existing configuration

  // Add static directories for assets
  staticDirs: ['./assets'],

  // ... rest of configuration
};
```

#### 5.2 Preview Configuration Updates

**File**: `.storybook/preview.ts` (additions)

```typescript
import type { Preview } from '@storybook/react';

const preview: Preview = {
  // ... existing configuration

  parameters: {
    // ... existing parameters

    // Brand configuration in docs
    docs: {
      theme: themes.light, // Will be overridden by manager theme
      brand: {
        title: 'Evoke UI',
        url: 'https://github.com/your-org/evoke-ui',
      },
    },
  },
};
```

### Phase 6: Testing and Responsive Considerations

#### 6.1 Responsive Logo Behavior

Test logo across different viewport sizes:

- **Desktop (1200px+)**: Full logo with wordmark
- **Tablet (768px-1199px)**: Slightly smaller but readable
- **Mobile (< 768px)**: Consider abbreviated version or icon

#### 6.2 Accessibility Considerations

**Alt Text and ARIA Labels:**

```typescript
brandImage: './assets/evoke-ui-logo.svg',
brandTitle: 'Evoke UI Design System', // Used as alt text
```

**High Contrast Support:**

```css
@media (prefers-contrast: high) {
  .logo-text {
    fill: oklch(0.19 0.015 247.86) !important;
  }
}
```

#### 6.3 Performance Optimization

**SVG Optimization:**

- Remove unnecessary metadata
- Optimize path data
- Use CSS custom properties for colors
- Minimize file size while maintaining quality

**Loading Strategy:**

- Use `font-display: swap` for Lobster font
- Preload critical assets in preview-head.html
- Consider font subsetting for performance

### Phase 7: Quality Assurance Checklist

#### 7.1 Visual Testing

- [ ] Logo displays correctly in light theme
- [ ] Logo displays correctly in dark theme
- [ ] Logo scales appropriately across viewport sizes
- [ ] Font loads correctly (Lobster)
- [ ] Colors match design system tokens
- [ ] Hover effects work as expected

#### 7.2 Functionality Testing

- [ ] Logo links to correct URL when clicked
- [ ] Theme switching updates logo appropriately
- [ ] Logo doesn't break Storybook navigation
- [ ] Static assets load from correct paths
- [ ] Fallback PNG works when SVG unavailable

#### 7.3 Accessibility Testing

- [ ] Logo has appropriate alt text
- [ ] Contrast ratios meet WCAG 2.1 AA standards
- [ ] Logo remains visible in high contrast mode
- [ ] Logo doesn't interfere with keyboard navigation

### Phase 8: Documentation and Maintenance

#### 8.1 Team Documentation

Create documentation for:

- How to update logo assets
- Theme configuration maintenance
- Brand guidelines for logo usage
- Troubleshooting common issues

#### 8.2 Version Control Considerations

**Git LFS for Assets:**
Consider using Git LFS for larger image assets:

```
# .gitattributes
*.png filter=lfs diff=lfs merge=lfs -text
*.svg filter=lfs diff=lfs merge=lfs -text
```

## Implementation Timeline

### Week 1: Asset Creation and Theme Setup

- Day 1-2: Create SVG logos with Lobster font
- Day 3-4: Set up theme configuration files
- Day 5: Test basic logo display and theme switching

### Week 2: Advanced Features and Testing

- Day 1-2: Implement responsive logo behavior
- Day 3-4: Add accessibility enhancements
- Day 5: Comprehensive testing across browsers and devices

### Week 3: Polish and Documentation

- Day 1-2: Performance optimization
- Day 3-4: Create team documentation
- Day 5: Final quality assurance and deployment

## Color Scheme Recommendations

Based on the existing Evoke UI design system:

### Option 1: Primary Brand Focus (Recommended)

- **Main Color**: `oklch(0.6533 0.2684 354.75)` - Vibrant magenta/pink
- **Supporting**: Neutral grays from existing palette
- **Rationale**: Maintains brand consistency with existing components

### Option 2: Gradient Treatment

- **Primary**: `oklch(0.6533 0.2684 354.75)` → `oklch(0.75 0.18 310)`
- **Effect**: Modern gradient from primary to secondary
- **Rationale**: Adds sophistication while maintaining brand identity

### Option 3: Gaming-Inspired

- **Primary**: `oklch(0.6533 0.2684 354.75)` with subtle glow effect
- **Accent**: `oklch(0.7 0.15 220.4)` for highlights
- **Rationale**: Appeals to gaming industry target audience

## Conclusion

This comprehensive plan provides a robust foundation for implementing a custom "evoke ui" wordmark in Storybook using Google Lobster font. The implementation aligns with the existing OKLCH-based design system, supports responsive design principles, and maintains accessibility standards while creating a distinctive brand presence in the component documentation.

The modular approach allows for iterative implementation and easy maintenance, while the detailed specifications ensure consistent execution across different team members and future updates.
