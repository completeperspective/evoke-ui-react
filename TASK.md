# TASKS.md - Initial Implementation Tasks

## 📊 **CURRENT STATUS OVERVIEW** - _Updated: 2025-01-22_

### ✅ **COMPLETED WORK**

- **Project Infrastructure (90% Complete)**
  - ✅ Monorepo workspace setup with pnpm
  - ✅ TypeScript configuration (root & package level)
  - ✅ Build pipeline (Vite + tsup) configured and working
  - ✅ Package.json exports properly configured for library distribution
  - ✅ Tailwind CSS v4 integration with CSS-first @theme approach
  - ✅ Sass preprocessing setup and working
  - ✅ ESLint, Prettier, development tooling configured

- **Core Utilities**
  - ✅ `cn()` utility function implemented with full documentation
  - ✅ clsx + tailwind-merge integration working

- **Basic Styles Foundation**
  - ✅ Tailwind v4 @theme directive setup
  - ✅ Basic design tokens (typography, spacing, colors, animations)
  - ✅ Style compilation pipeline working

### ✅ **COMPLETED WORK**

- **Design Token System (100% Complete)** - _Updated: 2025-01-22_
  - ✅ Complete OKLCH color system implemented with RGB fallbacks
  - ✅ Full Sass 7-1 architecture with abstracts folder (variables, mixins, functions)
  - ✅ TypeScript token structure created (5 token files: colors, typography, spacing, motion, elevation)
  - ✅ CSS variable system with semantic mappings
  - ✅ Tailwind v4 @theme configuration updated
  - ✅ Legacy Tailwind v3 preset created for compatibility
  - ✅ Build configuration updated and working
  - ✅ All validation tests passing

### ✅ **COMPLETED WORK**

- **Phase One Theme Provider System (100% Complete)** - _Updated: 2025-08-22_
  - ✅ Complete React Context-based theme provider implementation
  - ✅ Runtime CSS variable injection system
  - ✅ OKLCH color space utilities with 19 manipulation functions
  - ✅ System preference integration (dark/light mode detection)
  - ✅ localStorage persistence with migration support
  - ✅ 11 specialized theme hooks for different use cases
  - ✅ Comprehensive TypeScript interfaces and validation
  - ✅ Full test suite (56 tests passing) with proper mocking
  - ✅ All validation passed: tests, type-checking, linting

### ❌ **NOT STARTED**

- Component implementation (atoms, molecules, organisms)
- Storybook setup
- Documentation site
- Example applications

### 🎯 **IMMEDIATE NEXT PRIORITIES**

1. Create first atomic component (Button) with proper testing
2. Implement remaining core atomic components (Input, Text, Heading)
3. Set up Storybook for component documentation
4. Create component-specific theming integration

## 🚀 Phase 1: Foundation (Week 1-2) - **STATUS: ✅ 100% COMPLETE**

### 1. Project Setup & Configuration - **✅ COMPLETED**

- [x] **Initialize monorepo structure** ✅
  - ✅ Set up pnpm workspace (`pnpm-workspace.yaml` configured)
  - ✅ Configure TypeScript paths (root `tsconfig.json` setup)
  - ✅ Set up shared configs (ESLint, Prettier, tsconfig all configured)

- [x] **Install core dependencies** ✅
  - ✅ All core dependencies installed and configured
  - ✅ Package structure properly set up with @evoke-ui/react

- [x] **Setup build pipeline** ✅
  - ✅ Configure Vite with Tailwind v4 plugin and Sass (working vite.config.ts)
  - ✅ Configure tsup for library builds with style bundling (working tsup.config.ts)
  - ✅ Setup package.json exports with styles (proper ESM/CJS exports)

- [x] **Configure Tailwind v4 with CSS-first approach** ✅

  ```typescript
  // vite.config.ts
  import tailwindcss from '@tailwindcss/vite';

  export default {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "src/styles/abstracts" as *;`,
        },
      },
    },
    plugins: [
      tailwindcss(),
      // other plugins
    ],
  };
  ```

### 2. Design Token System - **✅ COMPLETED**

- [x] **Create token structure** ✅ **(COMPLETED - 2025-01-22)**
  - ✅ Complete TypeScript token structure implemented
  - ✅ 5 individual token files created: colors.ts, typography.ts, spacing.ts, motion.ts, elevation.ts
  - ✅ All tokens properly typed with const assertions
  - ✅ Centralized export system with CSS variable generation

- [x] **Setup Sass architecture** ✅ **(COMPLETED - 2025-01-22)**
  - ✅ Complete Sass 7-1 architecture implemented
  - ✅ Abstracts folder with _variables.scss, _mixins.scss, _functions.scss, _index.scss
  - ✅ All abstracts properly forwarded and accessible
  - ✅ Modern Sass syntax with proper module imports

- [x] **Implement CSS variable system with Tailwind v4** ✅ **(COMPLETED - 2025-01-22)**
  - ✅ Complete OKLCH color system with RGB fallbacks implemented
  - ✅ @theme directive properly configured with all design tokens
  - ✅ Typography, spacing, color, motion, and elevation tokens fully integrated
  - ✅ CSS variables mapped to Tailwind utilities using OKLCH color space

  ```scss
  /* src/styles/tokens.scss */
  @import 'tailwindcss';
  @use 'abstracts' as *;

  /* Layer our design tokens */
  @layer base {
    :root {
      /* Color Palette - OKLCH format for better color manipulation */
      --ui-color-gray-50: 0.98 0 247.86;
      --ui-color-gray-100: 0.96 0 247.86;
      --ui-color-gray-200: 0.92 0.01 247.86;
      --ui-color-gray-300: 0.87 0.01 247.86;
      --ui-color-gray-400: 0.7 0.01 247.86;
      --ui-color-gray-500: 0.55 0.01 247.86;
      --ui-color-gray-600: 0.44 0.01 247.86;
      --ui-color-gray-700: 0.36 0.01 247.86;
      --ui-color-gray-800: 0.25 0.02 247.86;
      --ui-color-gray-900: 0.17 0.02 247.86;

      /* Semantic Colors */
      --ui-color-background: 1 0 0;
      --ui-color-foreground: 0.17 0.02 247.86;
      --ui-color-primary: 0.65 0.2 255;
      --ui-color-primary-foreground: 0.98 0 247.86;
      --ui-color-secondary: 0.75 0.18 310;
      --ui-color-secondary-foreground: 0.98 0 247.86;

      /* Component tokens */
      --ui-color-card: 1 0 0;
      --ui-color-card-foreground: 0.17 0.02 247.86;
      --ui-color-popover: 1 0 0;
      --ui-color-popover-foreground: 0.17 0.02 247.86;
      --ui-color-muted: 0.96 0 247.86;
      --ui-color-muted-foreground: 0.44 0.01 247.86;
      --ui-color-accent: 0.96 0 247.86;
      --ui-color-accent-foreground: 0.17 0.02 247.86;

      /* Status Colors */
      --ui-color-success: 0.75 0.18 145;
      --ui-color-warning: 0.82 0.17 85;
      --ui-color-error: 0.7 0.2 25;
      --ui-color-info: 0.7 0.18 220;

      /* Radius tokens */
      --ui-radius-sm: 0.125rem;
      --ui-radius-md: 0.375rem;
      --ui-radius-lg: 0.5rem;
    }

    .dark {
      --ui-color-background: 0.17 0.02 247.86;
      --ui-color-foreground: 0.98 0 247.86;
      --ui-color-card: 0.2 0.02 247.86;
      --ui-color-card-foreground: 0.98 0 247.86;
      --ui-color-popover: 0.17 0.02 247.86;
      --ui-color-popover-foreground: 0.98 0 247.86;
      --ui-color-muted: 0.25 0.02 247.86;
      --ui-color-muted-foreground: 0.7 0.01 247.86;
      --ui-color-accent: 0.25 0.02 247.86;
      --ui-color-accent-foreground: 0.98 0 247.86;
    }
  }

  /* Map to Tailwind's theme variables */
  @theme {
    --color-background: oklch(var(--ui-color-background));
    --color-foreground: oklch(var(--ui-color-foreground));
    --color-primary: oklch(var(--ui-color-primary));
    --color-primary-foreground: oklch(var(--ui-color-primary-foreground));
    --color-secondary: oklch(var(--ui-color-secondary));
    --color-secondary-foreground: oklch(var(--ui-color-secondary-foreground));
    --color-card: oklch(var(--ui-color-card));
    --color-card-foreground: oklch(var(--ui-color-card-foreground));
    --color-muted: oklch(var(--ui-color-muted));
    --color-muted-foreground: oklch(var(--ui-color-muted-foreground));
    --color-accent: oklch(var(--ui-color-accent));
    --color-accent-foreground: oklch(var(--ui-color-accent-foreground));

    --radius-sm: var(--ui-radius-sm);
    --radius-md: var(--ui-radius-md);
    --radius-lg: var(--ui-radius-lg);
  }
  ```

- [ ] **Create Tailwind v4 CSS configuration**

  ```scss
  /* src/styles/tailwind.scss */
  @import 'tailwindcss';

  @theme {
    /* Extend Tailwind with our design tokens */
    --color-background: oklch(var(--ui-color-background));
    --color-foreground: oklch(var(--ui-color-foreground));
    --color-primary: oklch(var(--ui-color-primary));
    --color-primary-foreground: oklch(var(--ui-color-primary-foreground));
    --color-secondary: oklch(var(--ui-color-secondary));
    --color-secondary-foreground: oklch(var(--ui-color-secondary-foreground));

    /* Component-specific tokens */
    --color-card: oklch(var(--ui-color-card));
    --color-card-foreground: oklch(var(--ui-color-card-foreground));
    --color-popover: oklch(var(--ui-color-popover));
    --color-popover-foreground: oklch(var(--ui-color-popover-foreground));
    --color-muted: oklch(var(--ui-color-muted));
    --color-muted-foreground: oklch(var(--ui-color-muted-foreground));

    /* Spacing scale extensions */
    --spacing-18: 4.5rem;
    --spacing-20: 5rem;

    /* Animation tokens */
    --animate-duration: var(--ui-duration-normal);
    --animate-timing: var(--ui-easing-default);
  }
  ```

- [ ] **Create main style entry point**

  ```scss
  /* src/styles/index.scss */
  // Core token system
  @use 'tokens';

  // Component styles
  @use 'components';

  // Utility classes
  @use 'utilities';
  ```

- [ ] **Setup Sass mixins for components**

  ```scss
  // src/styles/abstracts/_mixins.scss
  @mixin component-base {
    box-sizing: border-box;
    border: 0 solid currentColor;
  }

  @mixin focus-ring {
    &:focus-visible {
      outline: 2px solid oklch(var(--ui-color-primary));
      outline-offset: 2px;
    }
  }
  ```

- [ ] **Create legacy Tailwind preset for v3 compatibility**
  ```javascript
  // tailwind-preset-v3.js (for backwards compatibility)
  module.exports = {
    theme: {
      extend: {
        colors: {
          background: 'oklch(var(--ui-color-background) / <alpha-value>)',
          foreground: 'oklch(var(--ui-color-foreground) / <alpha-value>)',
          primary: {
            DEFAULT: 'oklch(var(--ui-color-primary) / <alpha-value>)',
            foreground: 'oklch(var(--ui-color-primary-foreground) / <alpha-value>)',
          },
        },
      },
    },
  };
  ```

### 3. Theme Provider Implementation - **✅ COMPLETED** *(Updated: 2025-08-22)*

- [x] **Create ThemeProvider component** ✅
  - ✅ Full React Context implementation with TypeScript
  - ✅ CSS variable injection with cssVarPrefix customization
  - ✅ Theme validation and fallback handling
  - ✅ Transition management for smooth theme switching

- [x] **Implement runtime CSS injection** ✅
  - ✅ Dynamic CSS variable updates via `injectThemeVariables`
  - ✅ Theme persistence (localStorage) with migration support
  - ✅ System preference detection with `useSystemPreference` hook
  - ✅ OKLCH color space manipulation utilities (19 functions)

- [x] **Create useTheme hook system** ✅
  - ✅ Core `useTheme` hook with context validation
  - ✅ `useThemeColors` for color-specific operations
  - ✅ `useThemeSwitcher` for theme management
  - ✅ `useComponentTheme` for component-specific tokens
  - ✅ `useThemeStatus`, `useThemeMediaQueries`, and 6 other specialized hooks

- [x] **Add OKLCH color utilities** ✅
  ```typescript
  // src/utils/colors.ts - 19 implemented functions including:
  export function parseOklch(oklchString: string): OklchColor;
  export function adjustLightness(oklch: string, amount: number): string;
  export function adjustChroma(oklch: string, amount: number): string;
  export function rotateHue(oklch: string, degrees: number): string;
  export function generateColorScale(baseColor: string): ColorScale;
  export function validateOklch(oklchString: string): string;
  // + 13 more utility functions
  ```

- [x] **Complete validation suite** ✅
  - ✅ 56 unit tests passing (46 color utils + 10 ThemeProvider tests)
  - ✅ TypeScript compilation with zero errors
  - ✅ Proper jsdom testing environment setup

## 🎨 Phase 2: Core Components (Week 2-3)

### 4. Utility Functions - **✅ PARTIALLY COMPLETE**

- [x] **Create cn() utility** ✅
  - ✅ `src/utils/cn.ts` implemented with comprehensive documentation
  - ✅ Proper TypeScript types and JSDoc comments
  - ✅ Exported from main index.ts

- [ ] **Create variant system**
  ```typescript
  // src/utils/variants.ts
  import { cva } from 'class-variance-authority';
  ```

### 5. Atomic Components (Atoms)

#### Button Component

- [ ] **Implement Button with CVA**

  ```typescript
  // src/atoms/Button/Button.tsx
  const buttonVariants = cva('inline-flex items-center justify-center', {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'border border-input',
        ghost: 'hover:bg-accent',
        link: 'underline-offset-4',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-4',
        lg: 'h-11 px-8',
      },
    },
  });
  ```

- [ ] **Create component-specific styles**

  ```scss
  // src/atoms/Button/Button.module.scss
  @use '../../styles/abstracts' as *;

  .button {
    @include component-base;
    @include focus-ring;

    transition: all var(--ui-duration-fast) var(--ui-easing-default);

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
  ```

- [ ] **Add loading and icon support**
- [ ] **Create Button.stories.tsx**
- [ ] **Write Button.test.tsx**

#### Input Component

- [ ] **Implement Input with forwardRef**
- [ ] **Add size and state variants**
- [ ] **Create Input stories and tests**

#### Typography Components

- [ ] **Create Text component**
- [ ] **Create Heading component**
- [ ] **Implement responsive sizing**

#### Additional Atoms

- [ ] **Badge component**
- [ ] **Label component**
- [ ] **Skeleton component**
- [ ] **Separator component**
- [ ] **Icon wrapper component**

### 6. Molecular Components

#### FormField Component

- [ ] **Combine Label + Input + Error**
- [ ] **Add validation states**
- [ ] **Implement helper text**

#### Card Component

- [ ] **Create Card container**
- [ ] **Add CardHeader, CardContent, CardFooter**
- [ ] **Support different variants**

#### SearchBar Component

- [ ] **Combine Input + Icon + Button**
- [ ] **Add search suggestions**
- [ ] **Implement keyboard navigation**

## 📚 Phase 3: Documentation & Tooling (Week 3-4)

### 7. Storybook Setup

- [ ] **Install and configure Storybook**

  ```bash
  pnpm dlx storybook@latest init
  ```

- [ ] **Configure Sass and Tailwind CSS v4 in Storybook**

  ```javascript
  // .storybook/preview.js
  import '../src/styles/index.scss';
  ```

- [ ] **Setup Storybook Sass loader**

  ```javascript
  // .storybook/main.js
  module.exports = {
    addons: ['@storybook/addon-styling-webpack'],
    webpackFinal: async (config) => {
      config.module.rules.push({
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      });
      return config;
    },
  };
  ```

- [ ] **Add theme switcher addon**
- [ ] **Create global decorators**
- [ ] **Set up component categories**

### 8. Testing Infrastructure

- [ ] **Setup Vitest**

  ```bash
  pnpm add -D vitest @testing-library/react @testing-library/jest-dom
  ```

- [ ] **Configure testing utilities**
- [ ] **Add accessibility testing (axe-core)**
- [ ] **Setup visual regression testing**

### 9. Documentation Site

- [ ] **Initialize Docusaurus/Nextra**
- [ ] **Create component documentation template**
- [ ] **Add token reference page**
- [ ] **Create theming guide**
- [ ] **Add migration guide from shadcn/ui**

## 📦 Phase 4: Package & Distribution (Week 4)

### 10. NPM Package Configuration

- [ ] **Configure package.json**

  ```json
  {
    "name": "@evoke-ui/react",
    "version": "0.1.0",
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
    "files": ["dist", "src/styles"]
  }
  ```

- [ ] **Setup build scripts**

  ```json
  {
    "scripts": {
      "build": "pnpm build:lib && pnpm build:styles",
      "build:lib": "tsup",
      "build:styles": "sass src/styles/index.scss dist/styles.css --style compressed",
      "build:watch": "concurrently \"pnpm build:lib --watch\" \"pnpm build:styles --watch\""
    }
  }
  ```

- [ ] **Configure tsup for bundling**

  ```typescript
  // tsup.config.ts
  import { defineConfig } from 'tsup';

  export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom'],
    onSuccess: 'pnpm build:styles',
  });
  ```

- [ ] **Configure tree-shaking**
- [ ] **Add peer dependencies**
- [ ] **Create compatibility layer for shadcn/ui components**
  - Test utility class resolution
  - Verify color opacity modifiers work
  - Ensure variant classes compile correctly

### 11. Example Applications

- [ ] **Create Next.js example**
  - App router integration
  - SSR compatibility
  - Theme switching
  - Import styles properly

  ```typescript
  // app/layout.tsx
  import '@evoke-ui/react/styles.css';
  // or for Sass users
  import '@evoke-ui/react/styles';
  ```

- [ ] **Create Vite example**
  - SPA configuration
  - Dynamic imports
  - Style loading setup

  ```typescript
  // main.tsx
  import '@evoke-ui/react/styles.css';
  ```

- [ ] **Create Remix example**
  - Loader/action patterns
  - Progressive enhancement
  - Style linking

  ```typescript
  // root.tsx
  import styles from '@evoke-ui/react/styles.css';

  export const links = () => [{ rel: 'stylesheet', href: styles }];
  ```

### 12. CI/CD Pipeline

- [ ] **Setup GitHub Actions**

  ```yaml
  # .github/workflows/ci.yml
  - Build and test
  - Linting
  - Type checking
  - Bundle size checks
  ```

- [ ] **Configure changesets**
- [ ] **Setup automated releases**
- [ ] **Add Chromatic for visual testing**

## 🔄 Phase 5: Organism Components (Week 5-6)

### 13. Complex Components

#### DataTable Component

- [ ] **Implement with @tanstack/react-table**
- [ ] **Add sorting, filtering, pagination**
- [ ] **Create column helpers**
- [ ] **Support row selection**

#### Modal/Dialog System

- [ ] **Build on Radix Dialog**
- [ ] **Add animation support**
- [ ] **Implement stacking context**
- [ ] **Create drawer variant**

#### Navigation Components

- [ ] **NavigationMenu (desktop)**
- [ ] **MobileNav (responsive)**
- [ ] **Breadcrumb component**
- [ ] **Tabs component**

### 14. Form System

- [ ] **Integrate with react-hook-form**
- [ ] **Create form field components**
- [ ] **Add validation displays**
- [ ] **Build multi-step form**

## 🎯 Phase 6: Polish & Launch (Week 6)

### 15. Performance Optimization

- [ ] **Analyze bundle size**
- [ ] **Implement code splitting**
- [ ] **Optimize CSS output**
- [ ] **Add lazy loading**

### 16. Accessibility Audit

- [ ] **Screen reader testing**
- [ ] **Keyboard navigation**
- [ ] **Focus management**
- [ ] **ARIA attributes**

### 17. Final Documentation

- [ ] **API reference generation**
- [ ] **Best practices guide**
- [ ] **Troubleshooting guide**
- [ ] **Changelog setup**

### 18. Launch Preparation

- [ ] **NPM package publication**
- [ ] **GitHub repository setup**
- [ ] **Documentation deployment**
- [ ] **Announcement blog post**

## 📊 Success Criteria Checklist

### Developer Experience

- [ ] TypeScript intellisense working
- [ ] Hot module replacement functional
- [ ] Tree-shaking verified
- [ ] Build time < 10 seconds

### Quality Metrics

- [ ] 100% TypeScript coverage
- [ ] > 80% test coverage
- [ ] Zero accessibility violations
- [ ] Lighthouse score > 95

### Documentation

- [ ] All components documented
- [ ] Interactive examples for each
- [ ] Theme customization guide
- [ ] Migration guide complete

### Performance

- [ ] Core bundle < 50KB gzipped
- [ ] CSS < 10KB for base styles
- [ ] No runtime errors
- [ ] Smooth 60fps animations

## 🔥 Quick Start Commands

```bash
# Clone and setup
git clone <repo>
cd evoke-ui-react
pnpm install

# Development
pnpm dev          # Start Storybook
pnpm build        # Build library
pnpm test         # Run tests
pnpm lint         # Lint code

# Documentation
pnpm docs:dev     # Start docs site
pnpm docs:build   # Build docs

# Release
pnpm changeset    # Create changeset
pnpm release      # Publish to NPM
```

## 📝 Notes

- **Package Scope**: Using `@evoke-ui/react` to allow for future framework variants (@evoke-ui/vue, @evoke-ui/svelte)
- **Sass Architecture**: Using SCSS for advanced features like mixins, functions, and better organization
- **Style Bundling**: Styles are compiled and bundled for easy consumption by applications
- **OKLCH Color Space**: Using OKLCH for perceptually uniform color manipulation and better accessibility
- **Tailwind v4 CSS-first approach**: We're using Tailwind CSS v4's new `@theme` directive for better performance and runtime theming
- **shadcn/ui compatibility**: Test each shadcn component with v4 setup, may need slight adjustments
- Start with the token system - it's the foundation everything builds on
- Test theme switching early and often
- Keep components pure and side-effect free
- Document as you build, not after
- Get feedback on the DX early from other developers
- Consider a beta release after Phase 3 for early feedback
- **Migration path**: Provide both v3 preset and v4 CSS config for gradual adoption
- **Style consumption options**:
  - Import compiled CSS: `@evoke-ui/react/styles.css`
  - Import Sass source: `@evoke-ui/react/styles` (for customization)
- **Color benefits with OKLCH**:
  - Perceptually uniform lightness adjustments
  - Predictable color mixing and interpolation
  - Better accessibility contrast calculations
  - Wide gamut support (P3 displays)
