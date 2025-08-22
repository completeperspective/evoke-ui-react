# Phase One - Design Token System PRP - 🟡 **IN PROGRESS (60% Complete)**

## Purpose

Implement a comprehensive design token system using OKLCH color space, Sass 7-1 architecture, and Tailwind CSS v4's CSS-first configuration to enable runtime theming and consistent design language.

## Core Principles

1. **Context is King**: Include ALL necessary documentation, examples, and caveats
2. **Validation Loops**: Provide executable tests/lints the AI can run and fix
3. **Information Dense**: Use keywords and patterns from design system best practices
4. **Progressive Success**: Start simple, validate, then enhance
5. **Global rules**: Be sure to follow all rules in CLAUDE.md

---

## Goal

Create a scalable design token system with OKLCH color space, semantic token mapping, and Tailwind v4 integration that supports runtime theming and provides excellent developer experience through TypeScript definitions and Sass utilities.

## Why

- **Runtime Theming**: OKLCH color space enables perceptually uniform color manipulation for dynamic themes
- **Design Consistency**: Centralized token system ensures consistent spacing, typography, and colors across components
- **Developer Experience**: TypeScript definitions and Sass utilities provide excellent IntelliSense and validation
- **Future Scalability**: Token architecture supports component-specific overrides and theme variations
- **Accessibility**: OKLCH enables better contrast calculations and color perception uniformity

## What

Implement a complete design token system including:

- OKLCH-based color palette with semantic token mapping
- Typography scale with responsive sizing
- Spacing scale following 4px grid system
- Sass 7-1 architecture with mixins and functions
- Tailwind v4 @theme configuration integration
- TypeScript definitions for all tokens
- Legacy Tailwind v3 preset for compatibility

### Success Criteria - **STATUS: 🟡 60% COMPLETE**

- [ ] OKLCH color tokens defined with semantic mappings _(Hex colors implemented, OKLCH conversion pending)_
- [x] Typography and spacing scales implemented ✅
- [ ] Sass architecture follows 7-1 pattern _(Basic structure only, abstracts folder pending)_
- [x] Tailwind v4 @theme directive configured correctly ✅
- [ ] TypeScript definitions provide full IntelliSense _(Not implemented)_
- [x] CSS variables compile without errors ✅
- [ ] Legacy v3 preset works for backward compatibility _(Not implemented)_
- [ ] Sass mixins and functions are functional _(Not implemented)_

**NEXT STEPS**: Convert hex colors to OKLCH, create Sass abstracts, implement TypeScript token definitions.

- [ ] Token values are accessible via JavaScript and CSS

## All Needed Context

### Documentation & References

```yaml
# MUST READ - Include these in your context window
- url: https://tailwindcss.com/docs/functions-and-directives
  why: @theme directive usage and CSS variable integration with Tailwind v4

- url: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch
  why: OKLCH color space syntax and browser support requirements

- url: https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl
  why: OKLCH benefits, perceptual uniformity, and implementation patterns

- url: https://oklch.org/posts/ultimate-oklch-guide
  why: Comprehensive OKLCH implementation guide with CSS Color Level 5 features

- url: https://sass-guidelin.es/
  why: 7-1 Sass architecture pattern and best practices

- url: https://evilmartians.com/chronicles/better-dynamic-themes-in-tailwind-with-oklch-color-magic
  why: Dynamic theming implementation with OKLCH and CSS variables

- url: https://utilitybend.com/blog/oklchroma-an-oklch-color-pattern-generator-that-generates-css-variables
  why: CSS variable patterns for OKLCH color manipulation

- url: https://github.com/mimshins/react-design-tokens
  why: React design token implementation patterns and CSS variable generation

- file: /home/adam/code/evoke-ui/PLANNING.md
  why: OKLCH color space requirements and token architecture specifications

- file: /home/adam/code/evoke-ui/TASK.md
  why: Specific design token implementation requirements and code examples
```

### Current Codebase Tree (after Phase 1 Setup)

```bash
packages/evoke-ui-react/
├── src/
│   ├── index.ts
│   ├── styles/
│   │   ├── index.scss
│   │   └── tailwind.scss
│   └── utils/
│       └── cn.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tsup.config.ts
```

### Desired Codebase Tree

```bash
packages/evoke-ui-react/
├── src/
│   ├── tokens/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── motion.ts
│   │   ├── elevation.ts
│   │   └── index.ts
│   ├── styles/
│   │   ├── abstracts/
│   │   │   ├── _index.scss
│   │   │   ├── _variables.scss
│   │   │   ├── _mixins.scss
│   │   │   └── _functions.scss
│   │   ├── components/
│   │   │   └── _index.scss
│   │   ├── utilities/
│   │   │   └── _index.scss
│   │   ├── tokens.scss
│   │   ├── tailwind.scss
│   │   └── index.scss
│   ├── utils/
│   │   └── cn.ts
│   └── index.ts
├── dist/
│   └── tailwind-preset-v3.js
└── (other files...)
```

### Known Gotchas & Library Quirks

```typescript
// CRITICAL: OKLCH browser support requires fallback values
// Safari and older browsers need rgb() fallbacks for OKLCH colors
// Use @supports (color: oklch(0 0 0)) for progressive enhancement

// CRITICAL: Tailwind v4 @theme directive syntax is different from v3
// v4 uses CSS variables directly, not JavaScript configuration object
// CSS custom properties must be defined in CSS, not JS

// CRITICAL: Sass @use vs @import behavior differences
// @use provides namespace isolation and better dependency management
// Must use @forward to re-export from index files

// CRITICAL: TypeScript token definitions must match runtime values
// Use const assertions and literal types for IntelliSense accuracy
// Token values must be compile-time constants for tree-shaking

// CRITICAL: OKLCH values require specific numeric format
// Lightness: 0-1 (or 0-100%), Chroma: 0-0.37+, Hue: 0-360 degrees
// CSS variables store raw values, oklch() function applied in @theme
```

## Implementation Blueprint

### Data Models and Structure

```typescript
// Core token interfaces for TypeScript definitions
interface ColorToken {
  value: string; // OKLCH space values "0.65 0.2 255"
  oklch: string; // CSS oklch() function call
  rgb?: string; // Fallback RGB value for older browsers
}

interface TypographyToken {
  fontSize: string; // rem values
  lineHeight: string; // unitless ratios
  letterSpacing?: string;
  fontWeight?: number;
}

interface SpacingScale {
  [key: string]: string; // rem-based spacing values
}
```

### List of Tasks (in completion order)

```yaml
Task 1 - Create Token Structure:
  CREATE src/tokens/colors.ts:
    - OKLCH color palette with semantic mappings
    - Brand colors, grays, status colors
    - TypeScript definitions with const assertions

  CREATE src/tokens/typography.ts:
    - Font size scale following modular scale
    - Line height ratios for optimal readability
    - Font weight and letter spacing tokens

  CREATE src/tokens/spacing.ts:
    - 4px grid-based spacing scale
    - Component-specific spacing tokens
    - Responsive scaling considerations

  CREATE src/tokens/motion.ts:
    - Animation duration and easing tokens
    - Consistent motion language across components

  CREATE src/tokens/elevation.ts:
    - Box shadow tokens for depth hierarchy
    - Z-index scale for layering system

  CREATE src/tokens/index.ts:
    - Re-export all token modules
    - Provide unified token interface

Task 2 - Setup Sass 7-1 Architecture:
  CREATE src/styles/abstracts/_variables.scss:
    - CSS custom properties for all design tokens
    - OKLCH color definitions with fallbacks
    - Root-level token declarations

  CREATE src/styles/abstracts/_mixins.scss:
    - Component base mixin for consistent styling
    - Focus ring mixin for accessibility
    - Responsive breakpoint mixins

  CREATE src/styles/abstracts/_functions.scss:
    - OKLCH color manipulation functions
    - Spacing calculation utilities
    - Type scale calculation functions

  CREATE src/styles/abstracts/_index.scss:
    - Forward all abstracts for clean imports
    - Namespace management

Task 3 - Implement CSS Variable System:
  CREATE src/styles/tokens.scss:
    - Define all design tokens as CSS variables
    - OKLCH color palette with semantic names
    - Light and dark theme variations
    - Component-specific token overrides

  UPDATE src/styles/tailwind.scss:
    - Configure Tailwind v4 @theme directive
    - Map design tokens to Tailwind utilities
    - Ensure proper CSS variable integration

Task 4 - Create Main Style Entry:
  UPDATE src/styles/index.scss:
    - Import token system
    - Layer structure for proper cascade
    - Future component and utility imports

  CREATE src/styles/components/_index.scss:
    - Placeholder for component styles
    - Proper import structure

  CREATE src/styles/utilities/_index.scss:
    - Custom utility classes
    - Token-based utility generators

Task 5 - Create Legacy Compatibility:
  CREATE dist/tailwind-preset-v3.js:
    - Tailwind v3 preset for backward compatibility
    - Map OKLCH tokens to CSS variables
    - Maintain consistent naming conventions

Task 6 - Update Build Configuration:
  UPDATE vite.config.ts:
    - Ensure Sass preprocessing includes abstracts
    - Configure proper CSS variable handling
    - Optimize build output for token system
```

### Per Task Pseudocode

```typescript
// Task 1 - Color tokens with OKLCH
export const colors = {
  gray: {
    50: { value: '0.98 0 247.86', oklch: 'oklch(0.98 0 247.86)' },
    100: { value: '0.96 0 247.86', oklch: 'oklch(0.96 0 247.86)' },
    // ... full gray scale
  },
  primary: {
    value: '0.65 0.2 255',
    oklch: 'oklch(0.65 0.2 255)',
    rgb: '#3b82f6' // Fallback
  },
  secondary: {
    value: '0.75 0.18 310',
    oklch: 'oklch(0.75 0.18 310)'
  }
} as const;

// Task 2 - Sass abstracts structure
/* src/styles/abstracts/_variables.scss */
:root {
  /* Color Palette - OKLCH format for better color manipulation */
  --ui-color-gray-50: 0.98 0 247.86;
  --ui-color-gray-100: 0.96 0 247.86;
  /* ... */

  /* Semantic Colors */
  --ui-color-background: var(--ui-color-gray-50);
  --ui-color-foreground: var(--ui-color-gray-900);
  --ui-color-primary: 0.65 0.2 255;

  /* Typography Scale */
  --ui-font-size-xs: 0.75rem;
  --ui-font-size-sm: 0.875rem;
  --ui-font-size-base: 1rem;

  /* Spacing Scale - 4px grid */
  --ui-space-1: 0.25rem;
  --ui-space-2: 0.5rem;
  --ui-space-3: 0.75rem;
}

// Task 3 - Tailwind v4 @theme configuration
/* src/styles/tailwind.scss */
@import "tailwindcss";

@theme {
  --color-background: oklch(var(--ui-color-background));
  --color-foreground: oklch(var(--ui-color-foreground));
  --color-primary: oklch(var(--ui-color-primary));

  --font-size-xs: var(--ui-font-size-xs);
  --font-size-sm: var(--ui-font-size-sm);

  --spacing-1: var(--ui-space-1);
  --spacing-2: var(--ui-space-2);
}

// Task 5 - Legacy preset structure
module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'oklch(var(--ui-color-background) / <alpha-value>)',
        foreground: 'oklch(var(--ui-color-foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'oklch(var(--ui-color-primary) / <alpha-value>)',
          foreground: 'oklch(var(--ui-color-primary-foreground) / <alpha-value>)'
        }
      }
    }
  }
};
```

### Integration Points

```yaml
SASS_ARCHITECTURE:
  - pattern: '7-1 architecture with @use and @forward directives'
  - imports: 'All abstracts automatically available via @use imports'
  - namespacing: "Use 'ui-' prefix for all custom properties"

TAILWIND_INTEGRATION:
  - v4_config: '@theme directive maps tokens to Tailwind utilities'
  - variables: 'CSS custom properties drive utility classes'
  - compatibility: 'v3 preset enables gradual migration'

TYPESCRIPT_DEFINITIONS:
  - exports: 'All tokens available as TypeScript constants'
  - types: 'Strong typing for design token values'
  - intellisense: 'IDE completion for all token names'
```

## Validation Loop

### Level 1: Syntax & Style

```bash
# Run these FIRST - fix any errors before proceeding
pnpm lint                           # ESLint checking
pnpm prettier --check "src/**/*.{ts,scss}"  # Format checking
pnpm --filter evoke-ui-react type-check     # TypeScript compilation

# Sass compilation test
pnpm --filter evoke-ui-react build-styles  # Should compile SCSS without errors

# Expected: No syntax errors in TypeScript or Sass files
```

### Level 2: Token Validation

```typescript
// CREATE test/tokens.test.ts for token validation
import { colors, spacing, typography } from '../src/tokens';

describe('Design Tokens', () => {
  it('should have valid OKLCH color values', () => {
    expect(colors.primary.value).toMatch(/^\d+\.?\d* \d+\.?\d* \d+$/);
  });

  it('should have consistent spacing scale', () => {
    expect(spacing['1']).toBe('0.25rem');
    expect(spacing['2']).toBe('0.5rem');
  });

  it('should have proper typography ratios', () => {
    // Validate modular scale relationships
    expect(typography.base.lineHeight).toBe('1.5');
  });
});
```

```bash
# Run token validation
pnpm test tokens.test.ts

# Expected: All token structure tests pass
```

### Level 3: Integration Test

```bash
# Test CSS variable generation
pnpm --filter evoke-ui-react build
grep -r "oklch(" dist/styles.css   # Should find OKLCH color functions

# Test Tailwind integration
echo "Test that @theme directive compiles properly"
grep -r "--color-primary" dist/styles.css  # Should find mapped variables

# Test TypeScript exports
node -e "
  const tokens = require('./dist/index.js');
  console.log(tokens.colors.primary.value);
"  # Should output OKLCH value

# Expected: All integration points working correctly
```

## Final Validation Checklist

- [ ] All token TypeScript files compile: `pnpm type-check`
- [ ] Sass files compile without errors: `pnpm build-styles`
- [ ] CSS variables are properly generated in output
- [ ] OKLCH colors compile to valid CSS functions
- [ ] Tailwind v4 @theme directive processes correctly
- [ ] Token values are accessible via JavaScript imports
- [ ] Legacy v3 preset generates correct configuration
- [ ] All abstracts (mixins, functions) are importable
- [ ] Design token tests pass: `pnpm test tokens.test.ts`

---

## Anti-Patterns to Avoid

- ❌ Don't use HSL or RGB for base color definitions - OKLCH provides better perception
- ❌ Don't hardcode color values in components - use semantic tokens
- ❌ Don't skip browser fallbacks for OKLCH - provide RGB alternatives
- ❌ Don't use @import in Sass - use @use and @forward for better performance
- ❌ Don't create inconsistent naming - stick to ui-\* prefix throughout
- ❌ Don't skip TypeScript definitions - tokens need IntelliSense support
- ❌ Don't ignore the 7-1 architecture - proper organization is crucial
- ❌ Don't mix v3 and v4 Tailwind patterns in the same configuration

**Confidence Score: 9/10** - Comprehensive token system with modern best practices, OKLCH support, and excellent TypeScript integration. Well-researched implementation path with clear validation steps.
