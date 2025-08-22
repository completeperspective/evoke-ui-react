import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import styles from './Separator.module.scss';

/**
 * Separator variants using class-variance-authority
 */
const separatorVariants = cva(
  'shrink-0 bg-border',
  {
    variants: {
      orientation: {
        horizontal: 'h-[1px] w-full',
        vertical: 'h-full w-[1px]',
      },
      variant: {
        default: 'bg-border',
        muted: 'bg-muted',
        accent: 'bg-accent',
        primary: 'bg-primary',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    compoundVariants: [
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
    ],
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'default',
      size: 'md',
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
}

/**
 * Separator component for dividing content sections
 * 
 * @example
 * ```tsx
 * <Separator />
 * 
 * <Separator orientation="vertical" className="mx-2" />
 * 
 * <Separator variant="primary" size="lg" />
 * 
 * <Separator label="OR" />
 * 
 * <Separator decorative orientation="horizontal" />
 * ```
 */
const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = 'horizontal',
      variant,
      size,
      decorative = true,
      label,
      ...props
    },
    ref
  ) => {
    // If there's a label, render a different structure
    if (label) {
      return (
        <div
          ref={ref}
          className={cn(
            styles.labeledSeparator,
            {
              [styles.horizontal]: orientation === 'horizontal',
              [styles.vertical]: orientation === 'vertical',
            },
            className
          )}
          role={decorative ? 'presentation' : 'separator'}
          aria-orientation={decorative ? undefined : (orientation as "horizontal" | "vertical")}
          {...props}
        >
          <div
            className={cn(
              separatorVariants({ orientation, variant, size }),
              styles.separator
            )}
          />
          <span className={styles.label} aria-hidden={decorative}>
            {label}
          </span>
          <div
            className={cn(
              separatorVariants({ orientation, variant, size }),
              styles.separator
            )}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          separatorVariants({ orientation, variant, size }),
          styles.separator,
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

export { Separator, separatorVariants };