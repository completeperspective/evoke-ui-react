# CVA-First Architecture Pattern

## Overview

The Evoke UI React library has adopted a **CVA-first architecture** that prioritizes class-variance-authority (CVA) over SCSS for component styling. This approach provides better type safety, performance, and maintainability while reducing code complexity.

## Architecture Principles

### 1. CVA Configuration Primary
- All component variants, sizes, and interactive states defined in TypeScript
- Type-safe variant APIs with full IntelliSense support
- Compound variants for complex styling combinations
- Default variants for consistent behavior

### 2. Minimal SCSS Usage
SCSS is reserved only for features that CVA cannot handle effectively:
- Accessibility enhancements (focus rings, screen reader support)
- Media queries (reduced motion, high contrast, print styles)
- Complex animations and transitions
- Browser-specific optimizations

### 3. Performance Benefits
- Reduced CSS bundle size through utility-first approach
- Better tree-shaking of unused variants
- Improved build performance with fewer SCSS compilations
- Runtime performance gains from utility classes

## Implementation Pattern

### Basic CVA Structure

```typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import styles from './Component.module.scss';

const componentVariants = cva(
  // Base classes - layout, typography, transitions
  'inline-flex items-center justify-center transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-9 px-4 text-sm', 
        lg: 'h-10 px-6 text-base',
      },
      loading: {
        true: 'cursor-wait',
        false: '',
      },
    },
    compoundVariants: [
      {
        loading: true,
        className: 'hover:transform-none hover:shadow-sm',
      },
      {
        variant: 'default',
        loading: false,
        className: 'hover:bg-primary/85 active:bg-primary',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      loading: false,
    },
  },
);

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  // Additional props...
}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, loading, ...props }, ref) => {
    return (
      <element
        className={cn(
          componentVariants({ variant, size, loading }),
          styles.component, // Minimal SCSS overrides
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
```

### Minimal SCSS Pattern

```scss
// Component.module.scss
@use '../../styles/abstracts' as *;

.component {
  // Enhanced accessibility for focus states
  @include enhanced-focus-ring;
  
  // Ensure text doesn't get selected during interaction
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  
  // Reduced motion preferences
  @media (prefers-reduced-motion: reduce) {
    transition: none !important;
    animation: none !important;
  }
  
  // High contrast mode enhancements
  @media (prefers-contrast: high) {
    border-width: 2px !important;
    font-weight: 600 !important;
  }
  
  // Touch device optimizations
  @media (hover: none) and (pointer: coarse) {
    min-height: 44px;
    min-width: 44px;
  }
}
```

## Real-World Examples

### Badge Component Migration

**Before (SCSS-heavy)**: 430 lines
**After (CVA-first)**: 77 lines (82% reduction)

#### CVA Configuration
```typescript
const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 user-select-none whitespace-nowrap relative overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90',
        destructive: 'border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        success: 'border-transparent bg-success text-white shadow-sm hover:bg-success/90',
        warning: 'border-transparent bg-warning text-foreground shadow-sm hover:bg-warning/90',
        info: 'border-transparent bg-info text-white shadow-sm hover:bg-info/90',
        outline: 'border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs gap-1 min-h-[20px]',
        md: 'px-2.5 py-1 text-xs gap-1.5 min-h-[24px]',
        lg: 'px-3 py-1.5 text-sm gap-2 min-h-[28px]',
      },
      interactive: {
        true: 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0',
        false: '',
      },
    },
    compoundVariants: [
      {
        interactive: true,
        variant: 'default',
        className: 'hover:bg-primary/85 active:bg-primary/90',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: false,
    },
  },
);
```

#### Separate Icon Variants
```typescript
const iconVariants = cva(
  'flex items-center justify-center flex-shrink-0 transition-transform duration-200',
  {
    variants: {
      size: {
        sm: 'w-3 h-3',
        md: 'w-3.5 h-3.5',
        lg: 'w-4 h-4',
      },
      position: {
        start: '-ml-0.5 mr-1',
        end: 'ml-1 -mr-0.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);
```

### Button Component Migration

**Before (SCSS-heavy)**: 290 lines  
**After (CVA-first)**: 90 lines (69% reduction)

### Skeleton Component Migration

**Before (SCSS-heavy)**: 315 lines
**After (CVA-first)**: 118 lines (63% reduction)

### Heading Component Migration

**Before (SCSS-heavy)**: 233 lines
**After (CVA-first)**: 157 lines (33% reduction)

#### Comprehensive CVA Structure
```typescript
const skeletonVariants = cva(
  'relative overflow-hidden bg-muted border border-border/30 transition-all duration-200 ease-out',
  {
    variants: {
      shape: {
        default: 'rounded-md',
        circle: 'rounded-full aspect-square min-w-[2.5rem] min-h-[2.5rem]',
        avatar: 'rounded-full aspect-square min-w-[2.5rem] min-h-[2.5rem] border-2 border-border/20',
        card: 'rounded-lg min-h-[8rem] shadow-sm',
        button: 'rounded-md min-w-[5rem] min-h-[2.5rem]',
        text: 'rounded-sm min-h-[1rem]',
      },
      size: {
        xs: 'min-w-[1.5rem] min-h-[0.75rem]',
        sm: 'min-w-[2rem] min-h-[1rem]',
        md: 'min-w-[3rem] min-h-[1.25rem]',
        lg: 'min-w-[4rem] min-h-[1.5rem]',
        xl: 'min-w-[6rem] min-h-[2rem]',
      },
      animation: {
        animated: 'animate-pulse',
        static: '',
        pulse: '',
        shimmer: '',
      },
      aspectRatio: {
        none: '',
        square: 'aspect-square',
        wide: 'aspect-[3/2]',
        tall: 'aspect-[2/3]',
      },
    },
    compoundVariants: [
      // Shape-specific sizing overrides
      {
        shape: 'circle',
        size: 'md',
        className: 'min-w-[2.5rem] min-h-[2.5rem] w-[2.5rem] h-[2.5rem]',
      },
      // Text shape with size-responsive heights
      {
        shape: 'text',
        size: 'md',
        className: 'h-5',
      },
      // Card enhanced styling
      {
        shape: 'card',
        className: 'min-h-[8rem] border border-border/20',
      },
      // Animation handling
      {
        animation: 'shimmer',
        className: 'animate-none', // Remove pulse, shimmer handled by SCSS
      },
    ],
    defaultVariants: {
      shape: 'default',
      size: 'md',
      animation: 'animated',
      aspectRatio: 'none',
    },
  }
);
```

#### Multi-line Support
```typescript
const multilineVariants = cva(
  'flex flex-col w-full space-y-2',
  {
    variants: {
      lines: {
        single: 'hidden',
        lines2: 'space-y-1',
        lines3: 'space-y-1.5',
        lines4: 'space-y-1.5', 
        lines5: 'space-y-2',
      },
    },
  }
);

const lineVariants = cva(
  'w-full',
  {
    variants: {
      isLast: {
        true: 'w-[60%] max-w-[75%]',
        false: 'w-full',
      },
      lineIndex: { 0: '', 1: '', 2: '', 3: '', 4: '' },
    },
    compoundVariants: [
      { lineIndex: 1, className: '[animation-delay:0.1s]' },
      { lineIndex: 2, className: '[animation-delay:0.2s]' },
      { lineIndex: 3, className: '[animation-delay:0.3s]' },
      { lineIndex: 4, className: '[animation-delay:0.4s]' },
    ],
  }
);
```

#### Loading Spinner Solution
```typescript
const buttonContent = (
  <>
    {loading ? (
      // Wrapper span for proper centering despite animate-spin transforms
      <span className={cn('inline-flex items-center justify-center')}>
        <div className={cn(spinnerVariants({ size, variant }))} aria-hidden="true" />
      </span>
    ) : (
      startIcon && (
        <span className={cn(iconVariants({ size, position: 'start' }))} aria-hidden="true">
          {startIcon}
        </span>
      )
    )}
    {children}
    {!loading && endIcon && (
      <span className={cn(iconVariants({ size, position: 'end' }))} aria-hidden="true">
        {endIcon}
      </span>
    )}
  </>
);
```

### Heading Component Enhanced CVA

**Typography-focused** with comprehensive responsive and utility variants:

```typescript
const headingVariants = cva(
  // Base typography fundamentals, accessibility, transitions
  'scroll-m-20 tracking-tight text-rendering-optimized antialiased font-display-swap break-words transition-colors duration-200 ease-out',
  {
    variants: {
      level: {
        h1: 'text-4xl font-extrabold lg:text-5xl xl:text-6xl leading-tight lg:leading-tight',
        h2: 'text-3xl font-semibold lg:text-4xl xl:text-5xl leading-tight first:mt-0',
        h3: 'text-2xl font-semibold lg:text-3xl xl:text-4xl leading-snug',
        h4: 'text-xl font-semibold lg:text-2xl xl:text-3xl leading-snug',
        h5: 'text-lg font-semibold lg:text-xl xl:text-2xl leading-normal',
        h6: 'text-base font-semibold lg:text-lg xl:text-xl leading-normal',
      },
      variant: {
        default: 'text-foreground',
        muted: 'text-muted-foreground opacity-80',
        accent: 'text-accent-foreground',
        primary: 'text-primary',
        destructive: 'text-destructive',
      },
      responsive: {
        none: '',
        scale: 'text-responsive',
        fluid: 'text-fluid-responsive',
      },
      decoration: {
        none: '',
        underline: 'underline decoration-2 underline-offset-4',
        gradient: 'bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent',
      },
      focus: {
        none: '',
        focusable: 'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm cursor-pointer',
      },
      status: {
        default: '',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-destructive',
        info: 'text-info',
      },
    },
    compoundVariants: [
      // H1 specific enhancements
      {
        level: 'h1',
        className: 'font-black tracking-tighter lg:tracking-tight scroll-m-16',
      },
      // H2 border enhancement for default variant
      {
        level: 'h2',
        variant: 'default',
        className: 'border-b border-border/20 pb-2',
      },
      // Responsive fluid typography
      {
        responsive: 'fluid',
        level: 'h1',
        className: 'text-[clamp(2.25rem,4vw,4rem)]',
      },
      {
        responsive: 'fluid',
        level: 'h2',
        className: 'text-[clamp(1.875rem,3.5vw,3.5rem)]',
      },
      // Gradient decoration with proper background setup
      {
        decoration: 'gradient',
        className: 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold',
      },
    ],
    defaultVariants: {
      level: 'h2',
      variant: 'default',
      responsive: 'none',
      decoration: 'none',
      focus: 'none',
      status: 'default',
    },
  },
);
```

#### Enhanced Features
- **Fluid Typography**: CSS `clamp()` for responsive text scaling
- **Semantic vs Visual**: Level prop for HTML semantics, visualLevel for styling
- **Gradient Text**: Background-clip text-transparent for gradient effects
- **Advanced Focus**: CVA-managed focusable states with proper accessibility
- **Status Colors**: Semantic color variants for messaging contexts
- **Balance Support**: Text-wrap balance for better typography

## Migration Checklist

When migrating a component to CVA-first architecture:

### 1. Analyze Current SCSS
- [ ] Identify variant-based styles that can move to CVA
- [ ] Separate accessibility/media query styles to keep in SCSS
- [ ] Note any complex animations or browser-specific code

### 2. Create CVA Configuration
- [ ] Define base classes for layout and typography
- [ ] Create variant objects for each styling dimension
- [ ] Add compound variants for complex combinations
- [ ] Set appropriate default variants

### 3. Refactor Component
- [ ] Update TypeScript interfaces to use `VariantProps`
- [ ] Replace manual class concatenation with CVA calls
- [ ] Maintain SCSS import for minimal overrides
- [ ] Test all variant combinations

### 4. Update SCSS Module
- [ ] Remove variant-specific styles moved to CVA
- [ ] Keep only accessibility and media query styles
- [ ] Ensure proper SCSS module scoping
- [ ] Test reduced motion and high contrast modes

### 5. Validate Migration
- [ ] TypeScript compilation passes
- [ ] All Storybook stories render correctly
- [ ] Accessibility features still work
- [ ] No visual regressions in any variant

## Benefits Achieved

### Code Reduction
- **Badge**: 82% reduction in SCSS (430 → 77 lines)
- **Button**: 69% reduction in SCSS (290 → 90 lines) 
- **Input**: 57% reduction in SCSS (375 → 162 lines)
- **Skeleton**: 63% reduction in SCSS (315 → 118 lines)
- **Separator**: 61% reduction in SCSS (251 → 99 lines)
- **Text**: 30% reduction in SCSS (239 → 167 lines)
- **Heading**: 33% reduction in SCSS (233 → 157 lines)
- **Total**: 1,000+ lines of SCSS eliminated across 7 components
- **Average**: 56% reduction in component SCSS code

### Performance Improvements
- Smaller CSS bundles through utility-first approach
- Better tree-shaking of unused variants
- Faster builds with less SCSS compilation
- Runtime performance gains from utility classes

### Developer Experience
- Full TypeScript support with IntelliSense
- Consistent variant API across components
- Better maintainability through declarative configuration
- Easier testing of variant combinations

### Architecture Benefits
- Clear separation of concerns (CVA for variants, SCSS for accessibility)
- Standardized component structure
- Future-proof foundation for additional components
- Improved collaboration between design and development teams

## Future Considerations

1. **Component Templates**: Create CVA templates for common component patterns
2. **Tooling**: Consider custom ESLint rules to enforce CVA-first patterns
3. **Documentation**: Automatically generate variant documentation from CVA configs
4. **Testing**: Create utilities for testing all variant combinations
5. **Migration**: Apply this pattern to remaining SCSS-heavy components

This CVA-first architecture establishes a solid foundation for scalable, maintainable, and performant component development in the Evoke UI React library.