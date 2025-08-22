# PLANNING.md - Evoke UI React Library Strategy

## Executive Summary

Building a production-ready, themable React component library on top of shadcn/ui that follows atomic design principles. The library will prioritize runtime theming through CSS variables using OKLCH color space, enabling consuming applications to dynamically customize brand colors, typography, spacing, and other design tokens without rebuilding. The library leverages Sass for advanced styling capabilities and Tailwind CSS v4's CSS-first configuration for optimal performance.

## Core Architecture Principles

### 1. **Layered Approach**

- **Foundation Layer**: shadcn/ui components (leveraging Radix UI primitives)
- **Token Layer**: CSS variables and design tokens for theming
- **Composition Layer**: Atomic design patterns (atoms → molecules → organisms)
- **Export Layer**: Tree-shakeable NPM package with TypeScript support

### 2. **Design Token Architecture**

```
┌─────────────────────────────────────┐
│         Application Theme           │
│      (Runtime CSS Variables)        │
└──────────────┬──────────────────────┘
               │ Overrides
┌──────────────▼──────────────────────┐
│        Library Defaults             │
│    (CSS Custom Properties)          │
├─────────────────────────────────────┤
│ • Colors (semantic + palette)      │
│ • Typography (scale + families)    │
│ • Spacing (scale + components)     │
│ • Motion (timing + easing)         │
│ • Elevation (shadows + z-index)    │
│ • Radii (borders + components)     │
└─────────────────────────────────────┘
```

## Technical Stack

### Core Dependencies

- **React 18+** - Component framework
- **TypeScript 5+** - Type safety and developer experience
- **Tailwind CSS v4** - CSS-first configuration with native theme variables
- **Sass** - Advanced styling features (mixins, functions, nesting)
- **shadcn/ui** - Base component library
- **Radix UI** - Accessible primitives
- **class-variance-authority (CVA)** - Component variants
- **tailwind-merge** - Intelligent class merging

### Build & Development

- **Vite** - Fast build tool with HMR and Tailwind v4 plugin
- **tsup** - TypeScript bundler for library builds
- **Sass compiler** - For style preprocessing and bundling
- **Storybook 8** - Component documentation and testing
- **Changesets** - Version management and changelogs
- **Vitest** - Unit testing framework
- **Playwright** - E2E testing for components

### Documentation & Quality

- **Docusaurus** or **Nextra** - Documentation site
- **ESLint + Prettier** - Code quality
- **Husky + lint-staged** - Pre-commit hooks
- **GitHub Actions** - CI/CD pipeline

## Component Architecture

### Atomic Design Hierarchy

#### **Atoms** (Foundation Elements)

- Button, Input, Label, Badge
- Typography components (Text, Heading)
- Icon wrapper with icon library integration
- Skeleton, Spinner, Divider
- Base layout primitives (Box, Flex, Grid)

#### **Molecules** (Composite Components)

- FormField (Label + Input + Error)
- SearchBar (Input + Icon + Button)
- Card (Container + Header + Content)
- ListItem (Icon + Text + Action)
- Stat (Label + Value + Change)

#### **Organisms** (Complex Patterns)

- DataTable with sorting/filtering
- NavigationMenu with mobile responsive
- Modal/Dialog systems
- Forms with validation
- Dashboard widgets
- Command palette

#### **Templates** (Layout Patterns)

- Page layouts (sidebar, header, content)
- Grid systems
- Authentication flows
- Dashboard templates

## Theming System

### CSS Variable Structure (OKLCH Color Space)

```scss
:root {
  /* Semantic Tokens (Application Level) - OKLCH format */
  --ui-color-primary: 0.65 0.2 255;
  --ui-color-secondary: 0.75 0.18 310;
  --ui-color-success: 0.75 0.18 145;
  --ui-color-warning: 0.82 0.17 85;
  --ui-color-danger: 0.7 0.2 25;

  /* Component Tokens */
  --ui-button-height: 2.5rem;
  --ui-button-padding-x: 1rem;
  --ui-button-border-radius: var(--ui-radius-md);

  /* Typography Scale */
  --ui-font-family-sans: system-ui, -apple-system, sans-serif;
  --ui-font-size-xs: 0.75rem;
  --ui-font-size-sm: 0.875rem;
  --ui-font-size-base: 1rem;

  /* Spacing Scale */
  --ui-space-1: 0.25rem;
  --ui-space-2: 0.5rem;
  --ui-space-3: 0.75rem;

  /* Motion Tokens */
  --ui-duration-fast: 150ms;
  --ui-duration-normal: 250ms;
  --ui-easing-default: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Tailwind v4 CSS-First Configuration

```scss
@import "tailwindcss";

@theme {
  --color-primary: oklch(var(--ui-color-primary));
  --color-secondary: oklch(var(--ui-color-secondary));
  --color-success: oklch(var(--ui-color-success));
  /* ... additional token mappings */
}
```

### OKLCH Color Benefits

- **Perceptually uniform** lightness and chroma adjustments
- **Wide gamut support** for P3 displays
- **Better accessibility** contrast calculations
- **Predictable color mixing** and interpolation

### Theme Provider Architecture

```typescript
interface ThemeConfig {
  colors?: Partial<ColorTokens>;
  typography?: Partial<TypographyTokens>;
  spacing?: Partial<SpacingTokens>;
  components?: Partial<ComponentTokens>;
}

// Runtime theme injection
<ThemeProvider config={customTheme}>
  <App />
</ThemeProvider>;
```

## Package Structure

```
evoke-ui-react/
├── src/
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.scss
│   │   │   ├── Button.stories.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   └── ...
│   ├── molecules/
│   ├── organisms/
│   ├── templates/
│   ├── styles/
│   │   ├── abstracts/
│   │   │   ├── _variables.scss
│   │   │   ├── _mixins.scss
│   │   │   ├── _functions.scss
│   │   │   └── _index.scss
│   │   ├── components/
│   │   ├── utilities/
│   │   ├── tokens.scss
│   │   ├── tailwind.scss
│   │   └── index.scss
│   ├── tokens/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   ├── hooks/
│   ├── utils/
│   └── index.ts
├── dist/
│   ├── index.mjs
│   ├── index.js
│   ├── index.d.ts
│   └── styles.css
├── .storybook/
├── docs/
├── examples/
│   ├── next-app/
│   ├── vite-app/
│   └── remix-app/
└── packages/
    ├── core/
    ├── themes/
    └── icons/
```

## Distribution Strategy

### NPM Package Exports

```json
{
  "name": "@evoke-ui/react",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": {
      "sass": "./src/styles/index.scss",
      "css": "./dist/styles.css"
    },
    "./styles.css": "./dist/styles.css",
    "./tailwind-v3": "./dist/tailwind-preset-v3.js"
  },
  "sideEffects": ["*.css", "*.scss"]
}
```

### Consumption Patterns

```typescript
// 1. Full import (not recommended)
import { Button, Card, Input } from "@evoke-ui/react";

// 2. Tree-shakeable imports (preferred)
import Button from "@evoke-ui/react/Button";

// 3. Style imports
import "@evoke-ui/react/styles.css"; // Compiled CSS
// or
import "@evoke-ui/react/styles"; // Sass source for customization

// 4. With custom theme
import { ThemeProvider } from "@evoke-ui/react";
import customTheme from "./theme.config";

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>;
```

### Style Distribution Options

- **Compiled CSS**: Pre-built, optimized styles for immediate use
- **Sass Source**: Raw SCSS files for advanced customization
- **Modular Imports**: Component-specific styles for optimal bundle size

## Quality Assurance

### Testing Strategy

- **Unit Tests**: Component logic and utilities
- **Visual Regression**: Chromatic + Storybook
- **Accessibility**: axe-core integration
- **Performance**: Bundle size monitoring
- **Theme Testing**: Multi-theme snapshot tests

### Documentation Requirements

- **Component Docs**: Props, examples, best practices
- **Theme Docs**: Token reference, customization guide
- **Migration Guide**: From vanilla shadcn/ui
- **Design Guidelines**: When/how to use components
- **API Reference**: Hooks, utilities, types

## Performance Targets

- **Bundle Size**: < 50KB gzipped for core components
- **Tree Shaking**: Zero dead code in production
- **CSS**: Purged Tailwind classes, < 10KB base styles (compressed)
- **Runtime**: No layout shifts, 60fps animations
- **SSR**: Full Next.js/Remix compatibility
- **Build Performance**:
  - Tailwind v4: 3.5x faster full builds
  - 8x faster incremental builds
  - Sass compilation optimized with caching

## Governance & Maintenance

### Versioning Strategy

- Semantic versioning (MAJOR.MINOR.PATCH)
- Automated changelogs via changesets
- Beta channel for experimental features
- LTS versions for enterprise users

### Contribution Model

- Component RFC process
- Design token proposals
- Community theme marketplace
- Plugin architecture for extensions

## Success Metrics

1. **Developer Experience**

   - TypeScript coverage: 100%
   - Storybook stories: 100% component coverage
   - Documentation completeness

2. **Performance**

   - Lighthouse score > 95
   - Bundle size under targets
   - Zero runtime errors

3. **Adoption**
   - NPM weekly downloads
   - GitHub stars/issues
   - Community contributions

## Key Technical Decisions

### 1. **Tailwind CSS v4 with CSS-First Configuration**

- Using `@theme` directive instead of JavaScript config
- Native CSS variables for all design tokens
- Significant performance improvements over v3
- Better alignment with runtime theming goals

### 2. **OKLCH Color Space**

- Perceptually uniform color adjustments
- Better accessibility through accurate contrast calculations
- Wide gamut support for modern displays
- Predictable color interpolation for gradients

### 3. **Sass Architecture**

- Advanced features: mixins, functions, nesting
- Modular file organization with partials
- Component-specific `.module.scss` files
- Dual distribution: compiled CSS and raw Sass

### 4. **Package Naming Convention**

- Scoped as `@evoke-ui/react` for framework clarity
- Allows future expansion to other frameworks
- Professional organization structure
- Clear import paths for consumers

## Phase 1 Deliverables (MVP)

1. Core token system with runtime theming
2. 10-15 atomic components
3. 5-7 molecular components
4. 2-3 organism examples
5. Basic Storybook setup
6. NPM package configuration
7. Next.js example app
8. Basic documentation site
