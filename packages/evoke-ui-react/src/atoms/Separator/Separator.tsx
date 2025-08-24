import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import styles from './Separator.module.scss';

/**
 * Separator variants using class-variance-authority
 * Enhanced CVA-first architecture with comprehensive pattern support
 */
const separatorVariants = cva(
  'flex-shrink-0 relative transition-all duration-200 ease-out',
  {
    variants: {
      orientation: {
        horizontal: 'h-[1px] w-full',
        vertical: 'h-full w-[1px]',
      },
      variant: {
        default: 'bg-border shadow-sm',
        muted: 'bg-muted',
        accent: 'bg-accent shadow-sm',
        primary: 'bg-primary shadow-sm',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        thin: '',
        normal: '',
        thick: '',
      },
      pattern: {
        solid: '',
        dotted: '',
        dashed: '',
        gradient: '',
      },
      animation: {
        static: '',
        expand: '',
        'fade-in': 'opacity-0',
      },
    },
    compoundVariants: [
      // Size variants for horizontal orientation (new thickness props)
      {
        orientation: 'horizontal',
        size: 'thin',
        className: 'h-px',
      },
      {
        orientation: 'horizontal',
        size: 'normal',
        className: 'h-[1px]',
      },
      {
        orientation: 'horizontal',
        size: 'thick',
        className: 'h-[2px]',
      },
      // Legacy size variants for horizontal orientation
      {
        orientation: 'horizontal',
        size: 'sm',
        className: 'h-px',
      },
      {
        orientation: 'horizontal',
        size: 'md',
        className: 'h-[1px]',
      },
      {
        orientation: 'horizontal',
        size: 'lg',
        className: 'h-[2px]',
      },
      // Size variants for vertical orientation (new thickness props)
      {
        orientation: 'vertical',
        size: 'thin',
        className: 'w-px',
      },
      {
        orientation: 'vertical',
        size: 'normal',
        className: 'w-[1px]',
      },
      {
        orientation: 'vertical',
        size: 'thick',
        className: 'w-[2px]',
      },
      // Legacy size variants for vertical orientation
      {
        orientation: 'vertical',
        size: 'sm',
        className: 'w-px',
      },
      {
        orientation: 'vertical',
        size: 'md',
        className: 'w-[1px]',
      },
      {
        orientation: 'vertical',
        size: 'lg',
        className: 'w-[2px]',
      },
      // Pattern variants for horizontal orientation
      {
        orientation: 'horizontal',
        pattern: 'dotted',
        className: 'bg-none [background-image:repeating-linear-gradient(to_right,oklch(var(--ui-color-border))_0px,oklch(var(--ui-color-border))_2px,transparent_2px,transparent_4px)]',
      },
      {
        orientation: 'horizontal',
        pattern: 'dashed',
        className: 'bg-none [background-image:repeating-linear-gradient(to_right,oklch(var(--ui-color-border))_0px,oklch(var(--ui-color-border))_4px,transparent_4px,transparent_8px)]',
      },
      {
        orientation: 'horizontal',
        pattern: 'gradient',
        className: 'bg-none [background-image:linear-gradient(to_right,transparent_0%,oklch(var(--ui-color-border))_50%,transparent_100%)]',
      },
      // Pattern variants for vertical orientation
      {
        orientation: 'vertical',
        pattern: 'dotted',
        className: 'bg-none [background-image:repeating-linear-gradient(to_bottom,oklch(var(--ui-color-border))_0px,oklch(var(--ui-color-border))_2px,transparent_2px,transparent_4px)]',
      },
      {
        orientation: 'vertical',
        pattern: 'dashed',
        className: 'bg-none [background-image:repeating-linear-gradient(to_bottom,oklch(var(--ui-color-border))_0px,oklch(var(--ui-color-border))_4px,transparent_4px,transparent_8px)]',
      },
      {
        orientation: 'vertical',
        pattern: 'gradient',
        className: 'bg-none [background-image:linear-gradient(to_bottom,transparent_0%,oklch(var(--ui-color-border))_50%,transparent_100%)]',
      },
      // Enhanced default styling with subtle gradient when solid
      {
        pattern: 'solid',
        variant: 'default',
        className: '[background-image:linear-gradient(135deg,oklch(var(--ui-color-border)/0.8)_0%,oklch(var(--ui-color-border)/0.4)_50%,oklch(var(--ui-color-border)/0.8)_100%)] [box-shadow:0_0_1px_oklch(var(--ui-color-border)/0.3)]',
      },
      // Animation variants
      {
        animation: 'expand',
        orientation: 'horizontal',
        className: 'origin-center animate-none [animation:separatorExpand_var(--ui-duration-normal)_var(--ui-easing-out)]',
      },
      {
        animation: 'expand',
        orientation: 'vertical',
        className: 'origin-center animate-none [animation:separatorExpandVertical_var(--ui-duration-normal)_var(--ui-easing-out)]',
      },
      {
        animation: 'fade-in',
        className: 'animate-none [animation:fadeIn_var(--ui-duration-normal)_var(--ui-easing-out)_forwards]',
      },
      // Pattern-specific variant color overrides
      {
        pattern: 'dotted',
        variant: 'primary',
        className: '[background-image:repeating-linear-gradient(to_right,oklch(var(--ui-color-primary))_0px,oklch(var(--ui-color-primary))_2px,transparent_2px,transparent_4px)]',
      },
      {
        pattern: 'dashed',
        variant: 'primary',
        className: '[background-image:repeating-linear-gradient(to_right,oklch(var(--ui-color-primary))_0px,oklch(var(--ui-color-primary))_4px,transparent_4px,transparent_8px)]',
      },
      {
        pattern: 'gradient',
        variant: 'primary',
        className: '[background-image:linear-gradient(to_right,transparent_0%,oklch(var(--ui-color-primary))_50%,transparent_100%)]',
      },
      // Accent pattern colors
      {
        pattern: 'dotted',
        variant: 'accent',
        className: '[background-image:repeating-linear-gradient(to_right,oklch(var(--ui-color-accent-foreground))_0px,oklch(var(--ui-color-accent-foreground))_2px,transparent_2px,transparent_4px)]',
      },
      {
        pattern: 'dashed',
        variant: 'accent',
        className: '[background-image:repeating-linear-gradient(to_right,oklch(var(--ui-color-accent-foreground))_0px,oklch(var(--ui-color-accent-foreground))_4px,transparent_4px,transparent_8px)]',
      },
      {
        pattern: 'gradient',
        variant: 'accent',
        className: '[background-image:linear-gradient(to_right,transparent_0%,oklch(var(--ui-color-accent-foreground))_50%,transparent_100%)]',
      },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'default',
      size: 'md',
      pattern: 'solid',
      animation: 'static',
    },
  }
);

/**
 * Labeled separator container variants
 */
const labeledSeparatorVariants = cva(
  'flex items-center relative',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row w-full',
        vertical: 'flex-col h-full',
      },
      labelVariant: {
        none: 'hidden',
        inline: '',
        centered: '',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      labelVariant: 'centered',
    },
  }
);

/**
 * Label content variants
 */
const labelVariants = cva(
  'font-medium text-muted-foreground bg-background text-rendering-optimizeLegibility antialiased select-none transition-colors duration-200 ease-out',
  {
    variants: {
      orientation: {
        horizontal: 'px-4 whitespace-nowrap',
        vertical: 'py-4 [writing-mode:vertical-rl] [text-orientation:mixed]',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-sm font-semibold',
        thin: 'text-xs',
        normal: 'text-sm',
        thick: 'text-sm font-semibold',
      },
      labelVariant: {
        none: 'hidden',
        inline: '',
        centered: '',
      },
    },
    compoundVariants: [
      // Responsive adjustments for thickness variants
      {
        orientation: 'horizontal',
        size: 'thin',
        className: 'px-2 text-xs',
      },
      {
        orientation: 'vertical',
        size: 'thin',
        className: 'py-2 text-xs',
      },
      // Responsive adjustments for legacy size variants
      {
        orientation: 'horizontal',
        size: 'sm',
        className: 'px-2 text-xs',
      },
      {
        orientation: 'vertical',
        size: 'sm',
        className: 'py-2 text-xs',
      },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      size: 'md',
      labelVariant: 'centered',
    },
  }
);

/**
 * Individual separator line variants for labeled separators
 */
const separatorLineVariants = cva(
  'flex-1',
  {
    variants: {
      orientation: {
        horizontal: 'min-w-0',
        vertical: 'min-h-0',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {
  /** Decorative separator (no semantic meaning) */
  decorative?: boolean;
  /** Label to display in the center of the separator */
  label?: React.ReactNode;
  /** Style of the label positioning */
  labelVariant?: 'none' | 'inline' | 'centered';
  /** Visual pattern of the separator line */
  pattern?: 'solid' | 'dotted' | 'dashed' | 'gradient';
  /** Animation style for the separator */
  animation?: 'static' | 'expand' | 'fade-in';
  /** Thickness of the separator line */
  thickness?: 'thin' | 'normal' | 'thick';
}

/**
 * Separator component for dividing content sections with enhanced CVA-first architecture
 * 
 * @example
 * ```tsx
 * // Basic separator
 * <Separator />
 * 
 * // Vertical separator with custom styling
 * <Separator orientation="vertical" className="mx-2" />
 * 
 * // Enhanced separator with pattern and animation
 * <Separator 
 *   variant="primary" 
 *   thickness="thick" 
 *   pattern="dashed"
 *   animation="expand"
 * />
 * 
 * // Labeled separator with custom positioning
 * <Separator 
 *   label="OR" 
 *   labelVariant="centered"
 *   pattern="gradient"
 * />
 * 
 * // Semantic separator for screen readers
 * <Separator decorative={false} orientation="horizontal" />
 * ```
 */
const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = 'horizontal',
      variant = 'default',
      size,
      thickness,
      pattern = 'solid',
      animation = 'static',
      labelVariant = 'centered',
      decorative = true,
      label,
      ...props
    },
    ref
  ) => {
    // Use thickness prop if provided, otherwise fall back to size for backward compatibility
    const finalSize = thickness || size || 'md';
    // If there's a label, render labeled separator structure
    if (label) {
      return (
        <div
          ref={ref}
          className={cn(
            labeledSeparatorVariants({ 
              orientation, 
              labelVariant: labelVariant || 'centered' 
            }),
            styles.separator, // Minimal SCSS overrides
            className
          )}
          role={decorative ? 'presentation' : 'separator'}
          aria-orientation={decorative ? undefined : (orientation as "horizontal" | "vertical")}
          {...props}
        >
          <div
            className={cn(
              separatorLineVariants({ orientation }),
              separatorVariants({ 
                orientation, 
                variant, 
                size: finalSize, 
                pattern, 
                animation 
              })
            )}
          />
          <span 
            className={cn(
              labelVariants({ 
                orientation, 
                size: finalSize, 
                labelVariant: labelVariant || 'centered' 
              })
            )}
            aria-hidden={decorative ? 'true' : 'false'}
          >
            {label}
          </span>
          <div
            className={cn(
              separatorLineVariants({ orientation }),
              separatorVariants({ 
                orientation, 
                variant, 
                size: finalSize, 
                pattern, 
                animation 
              })
            )}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          separatorVariants({ 
            orientation, 
            variant, 
            size: finalSize, 
            pattern, 
            animation 
          }),
          styles.separator, // Minimal SCSS overrides
          className
        )}
        role={decorative ? 'presentation' : 'separator'}
        aria-orientation={decorative ? undefined : (orientation as "horizontal" | "vertical")}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

export { Separator, separatorVariants, labeledSeparatorVariants, labelVariants, separatorLineVariants };