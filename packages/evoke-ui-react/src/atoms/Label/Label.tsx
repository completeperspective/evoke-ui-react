import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import styles from './Label.module.scss';

/**
 * Label variants using class-variance-authority
 * Comprehensive styling with minimal SCSS dependencies
 */
const labelVariants = cva(
  // Base styles - layout, typography, accessibility, transitions
  'inline-flex items-center cursor-pointer user-select-none transition-colors duration-200 ease-out font-medium leading-none text-rendering-optimized antialiased peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      variant: {
        default: 'text-foreground hover:text-primary',
        muted: 'text-muted-foreground hover:text-foreground',
        error: 'text-destructive hover:text-destructive/80',
        success: 'text-success hover:text-success/80',
        warning: 'text-warning hover:text-warning/80',
        info: 'text-info hover:text-info/80',
      },
      size: {
        sm: 'text-xs gap-1',
        md: 'text-sm gap-1.5',
        lg: 'text-base gap-2',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      state: {
        default: '',
        disabled: 'opacity-70 cursor-not-allowed hover:text-current',
        focused: 'text-primary ring-2 ring-ring ring-offset-2 rounded-sm',
        error: 'text-destructive',
        success: 'text-success',
        warning: 'text-warning',
      },
      position: {
        default: 'justify-between',
        inline: 'justify-start',
        floating: 'absolute -top-2 left-2 bg-background px-1 text-xs',
      },
      styleVariant: {
        default: '',
        subtle: 'opacity-80',
        bold: 'font-semibold',
        underlined: 'underline decoration-1 underline-offset-2',
      },
    },
    compoundVariants: [
      // State-specific styling overrides
      {
        state: 'disabled',
        className: 'hover:text-current cursor-not-allowed',
      },
      {
        state: 'error',
        variant: 'default',
        className: 'text-destructive hover:text-destructive/80',
      },
      {
        state: 'success',
        variant: 'default',
        className: 'text-success hover:text-success/80',
      },
      {
        state: 'warning',
        variant: 'default',
        className: 'text-warning hover:text-warning/80',
      },
      // Position adjustments
      {
        position: 'floating',
        size: 'sm',
        className: 'text-[0.625rem] px-0.5 -top-1.5',
      },
      {
        position: 'floating',
        size: 'lg',
        className: 'text-sm px-2 -top-3',
      },
      // Style combinations
      {
        styleVariant: 'bold',
        weight: 'normal',
        className: 'font-semibold',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      weight: 'medium',
      state: 'default',
      position: 'default',
      styleVariant: 'default',
    },
  }
);

/**
 * Indicator variants for required/optional states
 */
const indicatorVariants = cva(
  'font-inherit transition-colors duration-200',
  {
    variants: {
      type: {
        none: 'hidden',
        required: 'text-destructive ml-1',
        optional: 'text-muted-foreground font-normal ml-2',
        info: 'text-info ml-1',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    compoundVariants: [
      {
        type: 'optional',
        size: 'sm',
        className: 'text-[0.7em]',
      },
      {
        type: 'optional',
        size: 'md',
        className: 'text-[0.875em]',
      },
      {
        type: 'optional',
        size: 'lg',
        className: 'text-[0.85em]',
      },
    ],
    defaultVariants: {
      type: 'none',
      size: 'md',
    },
  }
);

/**
 * Content wrapper variants for label text and indicators
 */
const contentVariants = cva(
  'inline-flex items-baseline',
  {
    variants: {
      alignment: {
        baseline: 'items-baseline',
        center: 'items-center',
        start: 'items-start',
      },
      gap: {
        none: 'gap-0',
        sm: 'gap-1',
        md: 'gap-1.5',
        lg: 'gap-2',
      },
    },
    defaultVariants: {
      alignment: 'baseline',
      gap: 'sm',
    },
  }
);

/**
 * Suffix variants for additional content positioning
 */
const suffixVariants = cva(
  'inline-flex items-center flex-shrink-0',
  {
    variants: {
      spacing: {
        sm: 'ml-2',
        md: 'ml-3',
        lg: 'ml-4',
      },
      alignment: {
        center: 'items-center',
        start: 'items-start',
        end: 'items-end',
      },
    },
    defaultVariants: {
      spacing: 'md',
      alignment: 'center',
    },
  }
);

export interface LabelProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'style'>,
    VariantProps<typeof labelVariants> {
  /** Whether the label indicates a required field */
  required?: boolean;
  /** Whether the label indicates an optional field */
  optional?: boolean;
  /** Indicator type override (overrides required/optional) */
  indicator?: 'none' | 'required' | 'optional' | 'info';
  /** Additional content to display after the label text */
  suffix?: React.ReactNode;
  /** Content alignment within the label */
  contentAlignment?: 'baseline' | 'center' | 'start';
  /** Gap size between content elements */
  contentGap?: 'none' | 'sm' | 'md' | 'lg';
  /** Suffix spacing and alignment */
  suffixSpacing?: 'sm' | 'md' | 'lg';
  suffixAlignment?: 'center' | 'start' | 'end';
  /** React style prop */
  style?: React.CSSProperties;
}

/**
 * Label component for form fields and inputs
 * Enhanced with CVA-first architecture for comprehensive styling options
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Label htmlFor="email">Email Address</Label>
 * 
 * // With states and variants
 * <Label required variant="error" state="error">
 *   Password
 * </Label>
 * 
 * // Size and styling variants
 * <Label optional size="sm" weight="normal" style="subtle">
 *   Nickname
 * </Label>
 * 
 * // Advanced positioning
 * <Label position="floating" size="sm">
 *   Floating Label
 * </Label>
 * 
 * // With suffix and custom styling
 * <Label 
 *   suffix={<Tooltip content="Help text">?</Tooltip>}
 *   suffixSpacing="lg"
 *   contentAlignment="center"
 * >
 *   Username
 * </Label>
 * 
 * // Custom indicator types
 * <Label indicator="info" variant="info">
 *   Information Field
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
      state,
      position,
      styleVariant,
      style,
      required = false,
      optional = false,
      indicator,
      suffix,
      children,
      contentAlignment,
      contentGap,
      suffixSpacing,
      suffixAlignment,
      ...props
    },
    ref
  ) => {
    // Determine indicator type based on props
    const indicatorType = indicator || 
      (required ? 'required' : optional ? 'optional' : 'none');

    // Determine indicator content and aria-label
    const getIndicatorContent = (type: string) => {
      switch (type) {
        case 'required':
          return { content: '*', ariaLabel: 'required' };
        case 'optional':
          return { content: '(optional)', ariaLabel: 'optional' };
        case 'info':
          return { content: 'ⓘ', ariaLabel: 'information' };
        default:
          return null;
      }
    };

    const indicatorInfo = getIndicatorContent(indicatorType);

    return (
      <label
        ref={ref}
        className={cn(
          labelVariants({ variant, size, weight, state, position, styleVariant }),
          styles.label,
          className
        )}
        {...props}
      >
        <span className={cn(
          contentVariants({ 
            alignment: contentAlignment, 
            gap: contentGap 
          }),
          styles.content
        )}>
          {children}
          {indicatorInfo && (
            <span 
              className={cn(
                indicatorVariants({ type: indicatorType as any, size }),
                styles.indicator,
                {
                  [styles.required]: indicatorType === 'required',
                  [styles.optional]: indicatorType === 'optional',
                  [styles.info]: indicatorType === 'info',
                }
              )} 
              aria-label={indicatorInfo.ariaLabel}
            >
              {indicatorInfo.content}
            </span>
          )}
        </span>
        {suffix && (
          <span 
            className={cn(
              suffixVariants({ 
                spacing: suffixSpacing, 
                alignment: suffixAlignment 
              }),
              styles.suffix
            )} 
            aria-hidden="true"
          >
            {suffix}
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';

export { Label, labelVariants, indicatorVariants, contentVariants, suffixVariants };