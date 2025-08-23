import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import styles from './Button.module.scss';

/**
 * Button variants using class-variance-authority
 * Integrates with Tailwind classes and custom CSS modules
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 rounded-md px-3 text-xs',
        md: 'h-9 px-4 py-2',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
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
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Generate additional CSS classes for enhanced styling
    const enhancedClasses = cn(
      styles.button,
      variant && styles[`variant-${variant}`],
      size && styles[`size-${size}`]
    );

    const buttonContent = (
      <>
        {loading && (
          <div className={cn(styles.spinner, 'mr-2 h-4 w-4')} aria-hidden="true" />
        )}
        {!loading && startIcon && (
          <span className={cn(styles.icon, 'mr-2')} aria-hidden="true">
            {startIcon}
          </span>
        )}
        {children}
        {!loading && endIcon && (
          <span className={cn(styles.icon, 'ml-2')} aria-hidden="true">
            {endIcon}
          </span>
        )}
      </>
    );

    if (asChild) {
      return (
        <span
          className={cn(buttonVariants({ variant, size }), enhancedClasses, className)}
          {...props}
        >
          {buttonContent}
        </span>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size }), enhancedClasses, className)}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };