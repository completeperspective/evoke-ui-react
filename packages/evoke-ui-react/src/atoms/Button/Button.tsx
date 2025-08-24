import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import styles from './Button.module.scss';

/**
 * Button variants using class-variance-authority
 * Comprehensive styling with minimal SCSS dependencies
 */
const buttonVariants = cva(
  // Base styles - layout, typography, accessibility, transitions
  'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5 active:bg-primary/95 active:translate-y-0 active:shadow-sm',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md hover:-translate-y-0.5 active:bg-destructive/95 active:translate-y-0 active:shadow-sm',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:shadow-md hover:-translate-y-0.5 active:bg-accent/90 active:translate-y-0',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-md hover:-translate-y-0.5 active:bg-secondary/90 active:translate-y-0',
        ghost: 'hover:bg-accent hover:text-accent-foreground hover:shadow-sm active:bg-accent/80',
        link: 'text-primary underline-offset-4 hover:underline hover:text-primary/80 active:text-primary/90 px-0 h-auto',
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded-md gap-1.5',
        md: 'h-9 px-4 text-sm rounded-md gap-2',
        lg: 'h-10 px-6 text-base rounded-md gap-2.5',
        icon: 'h-9 w-9 p-0',
      },
      loading: {
        true: 'cursor-wait',
        false: '',
      },
    },
    compoundVariants: [
      // Loading state disables hover effects
      {
        loading: true,
        className: 'hover:transform-none hover:shadow-sm',
      },
      // Icon size adjustments
      {
        size: 'icon',
        className: 'rounded-md justify-center',
      },
      // Link variant doesn't need padding/height from size
      {
        variant: 'link',
        size: 'sm',
        className: 'h-auto px-0',
      },
      {
        variant: 'link',
        size: 'md',
        className: 'h-auto px-0',
      },
      {
        variant: 'link',
        size: 'lg',
        className: 'h-auto px-0',
      },
      // Enhanced interaction states for primary variant
      {
        variant: 'default',
        loading: false,
        className: 'hover:bg-primary/85 active:bg-primary',
      },
      // Enhanced interaction states for destructive variant
      {
        variant: 'destructive',
        loading: false,
        className: 'hover:bg-destructive/85 active:bg-destructive',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      loading: false,
    },
  },
);

/**
 * Loading spinner variants
 */
const spinnerVariants = cva(
  'rounded-full border-2 border-current border-t-transparent animate-spin',
  {
    variants: {
      size: {
        sm: 'h-3 w-3 border',
        md: 'h-3.5 w-3.5',
        lg: 'h-4 w-4',
        icon: 'h-3.5 w-3.5',
      },
      variant: {
        default: 'border-primary-foreground/70 border-t-primary-foreground',
        destructive: 'border-destructive-foreground/70 border-t-destructive-foreground',
        outline: 'border-foreground/70 border-t-foreground',
        secondary: 'border-secondary-foreground/70 border-t-secondary-foreground',
        ghost: 'border-accent-foreground/70 border-t-accent-foreground',
        link: 'border-primary/70 border-t-primary',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);

/**
 * Icon variants for start/end icons
 */
const iconVariants = cva(
  'flex items-center justify-center flex-shrink-0 transition-transform duration-200',
  {
    variants: {
      size: {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-4.5 h-4.5',
        icon: 'w-4 h-4',
      },
      position: {
        start: '',
        end: '',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Icon to display before the button text */
  startIcon?: React.ReactNode;
  /** Icon to display after the button text */
  endIcon?: React.ReactNode;
  /** Render button as a child element (for custom styling) */
  asChild?: boolean;
}

/**
 * Primary UI component for user interaction
 *
 * @example
 * ```tsx
 * <Button variant="default" size="md">
 *   Click me
 * </Button>
 *
 * <Button variant="outline" loading>
 *   Loading...
 * </Button>
 *
 * <Button variant="ghost" startIcon={<Icon />}>
 *   With Icon
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      startIcon,
      endIcon,
      children,
      disabled,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    const buttonContent = (
      <>
        {loading ? (
          // When loading, show spinner in a wrapper to handle centering
          <span className={cn('inline-flex items-center justify-center')}>
            <div className={cn(spinnerVariants({ size, variant }))} aria-hidden="true" />
          </span>
        ) : (
          // When not loading, show startIcon if provided
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

    if (asChild) {
      return (
        <span
          className={cn(
            buttonVariants({ variant, size, loading }),
            styles.button, // Only for minimal SCSS overrides
            className,
          )}
          {...props}
        >
          {buttonContent}
        </span>
      );
    }

    return (
      <button
        className={cn(
          buttonVariants({ variant, size, loading }),
          styles.button, // Only for minimal SCSS overrides
          className,
        )}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {buttonContent}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
