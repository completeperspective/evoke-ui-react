import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import styles from './Input.module.scss';

/**
 * Input variants using class-variance-authority
 */
const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-9 px-3 text-sm',
        lg: 'h-10 px-4 text-base',
      },
      state: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-green-500 focus-visible:ring-green-500',
        warning: 'border-yellow-500 focus-visible:ring-yellow-500',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Input state for validation feedback */
  state?: 'default' | 'error' | 'success' | 'warning';
  /** Icon to display at the start of the input */
  startIcon?: React.ReactNode;
  /** Icon to display at the end of the input */
  endIcon?: React.ReactNode;
  /** Error message to display */
  error?: string;
  /** Helper text to display below the input */
  helperText?: string;
}

/**
 * Input component for collecting user input
 * 
 * @example
 * ```tsx
 * <Input placeholder="Enter your email" />
 * 
 * <Input 
 *   type="password" 
 *   state="error" 
 *   error="Password is required" 
 * />
 * 
 * <Input 
 *   size="lg" 
 *   startIcon={<SearchIcon />} 
 *   placeholder="Search..." 
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      size,
      state,
      startIcon,
      endIcon,
      error,
      helperText,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputState = error ? 'error' : state;
    const hasIcons = startIcon || endIcon;

    const inputElement = (
      <input
        type={type}
        className={cn(
          inputVariants({ size, state: inputState }),
          styles.input,
          {
            [styles.withStartIcon]: startIcon,
            [styles.withEndIcon]: endIcon,
          },
          className
        )}
        ref={ref}
        disabled={disabled}
        aria-invalid={inputState === 'error'}
        aria-describedby={
          error
            ? `${props.id || 'input'}-error`
            : helperText
            ? `${props.id || 'input'}-helper`
            : undefined
        }
        {...props}
      />
    );

    if (hasIcons) {
      return (
        <div className={styles.container}>
          <div className={styles.inputWrapper}>
            {startIcon && (
              <div className={cn(styles.icon, styles.startIcon)} aria-hidden="true">
                {startIcon}
              </div>
            )}
            {inputElement}
            {endIcon && (
              <div className={cn(styles.icon, styles.endIcon)} aria-hidden="true">
                {endIcon}
              </div>
            )}
          </div>
          {(error || helperText) && (
            <div className={styles.feedback}>
              {error && (
                <span
                  id={`${props.id || 'input'}-error`}
                  className={cn(styles.feedbackText, styles.error)}
                  role="alert"
                >
                  {error}
                </span>
              )}
              {!error && helperText && (
                <span
                  id={`${props.id || 'input'}-helper`}
                  className={cn(styles.feedbackText, styles.helper)}
                >
                  {helperText}
                </span>
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className={styles.container}>
        {inputElement}
        {(error || helperText) && (
          <div className={styles.feedback}>
            {error && (
              <span
                id={`${props.id || 'input'}-error`}
                className={cn(styles.feedbackText, styles.error)}
                role="alert"
              >
                {error}
              </span>
            )}
            {!error && helperText && (
              <span
                id={`${props.id || 'input'}-helper`}
                className={cn(styles.feedbackText, styles.helper)}
              >
                {helperText}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };