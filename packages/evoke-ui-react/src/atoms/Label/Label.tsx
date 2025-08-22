import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import styles from './Label.module.scss';

/**
 * Label variants using class-variance-authority
 */
const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        error: 'text-destructive',
        success: 'text-green-600',
        warning: 'text-yellow-600',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      weight: 'medium',
    },
  }
);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  /** Whether the label indicates a required field */
  required?: boolean;
  /** Whether the label indicates an optional field */
  optional?: boolean;
  /** Additional content to display after the label text */
  suffix?: React.ReactNode;
}

/**
 * Label component for form fields and inputs
 * 
 * @example
 * ```tsx
 * <Label htmlFor="email">Email Address</Label>
 * 
 * <Label required variant="error">
 *   Password
 * </Label>
 * 
 * <Label optional size="sm" weight="normal">
 *   Nickname
 * </Label>
 * 
 * <Label suffix={<Tooltip content="Help text">?</Tooltip>}>
 *   Username
 * </Label>
 * ```
 */
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      className,
      variant,
      size,
      weight,
      required = false,
      optional = false,
      suffix,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <label
        ref={ref}
        className={cn(
          labelVariants({ variant, size, weight }),
          styles.label,
          className
        )}
        {...props}
      >
        <span className={styles.content}>
          {children}
          {required && (
            <span className={cn(styles.indicator, styles.required)} aria-label="required">
              *
            </span>
          )}
          {optional && !required && (
            <span className={cn(styles.indicator, styles.optional)} aria-label="optional">
              (optional)
            </span>
          )}
        </span>
        {suffix && (
          <span className={styles.suffix} aria-hidden="true">
            {suffix}
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';

export { Label, labelVariants };