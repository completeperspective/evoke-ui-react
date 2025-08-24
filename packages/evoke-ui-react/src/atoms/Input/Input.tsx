import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { inputClasses } from '../../styles/classNames';

/**
 * Container variants for input wrapper
 */
const containerVariants = cva('flex flex-col w-full', {
  variants: {
    hasIcons: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    hasIcons: false,
  },
});

/**
 * Input wrapper variants for icon positioning
 */
const inputWrapperVariants = cva('relative flex items-center w-full', {
  variants: {
    hasIcons: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    hasIcons: false,
  },
});

/**
 * Input variants using class-variance-authority
 * Comprehensive styling with minimal SCSS dependencies
 */
const inputVariants = cva(
  // Base styles - layout, typography, accessibility, transitions
  'flex w-full rounded-md border border-input bg-background text-sm shadow-sm transition-all duration-200 ease-out file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 relative z-10',
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-xs py-1',
        md: 'h-9 px-3 text-sm py-1.5',
        lg: 'h-10 px-4 text-base py-2',
      },
      state: {
        default: 'border-input hover:border-primary/30 focus-visible:border-ring',
        error:
          'border-destructive bg-destructive/5 hover:border-destructive/80 focus-visible:ring-destructive focus-visible:border-destructive',
        success:
          'border-success bg-success/5 hover:border-success/80 focus-visible:ring-success focus-visible:border-success',
        warning:
          'border-warning bg-warning/5 hover:border-warning/80 focus-visible:ring-warning focus-visible:border-warning',
        disabled: 'bg-muted/50 border-border/50 cursor-not-allowed opacity-70',
      },
      inputType: {
        text: '',
        password: '',
        email: '',
        number: '',
        search: '',
        file: 'py-1 cursor-pointer',
        tel: '',
        url: '',
      },
      hasStartIcon: {
        true: '',
        false: '',
      },
      hasEndIcon: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Icon padding adjustments
      {
        size: 'sm',
        hasStartIcon: true,
        className: 'pl-7',
      },
      {
        size: 'md',
        hasStartIcon: true,
        className: 'pl-9',
      },
      {
        size: 'lg',
        hasStartIcon: true,
        className: 'pl-10',
      },
      {
        size: 'sm',
        hasEndIcon: true,
        className: 'pr-7',
      },
      {
        size: 'md',
        hasEndIcon: true,
        className: 'pr-9',
      },
      {
        size: 'lg',
        hasEndIcon: true,
        className: 'pr-10',
      },
      // File input specific styling
      {
        inputType: 'file',
        className:
          'file:mr-2 file:px-3 file:py-1 file:rounded-sm file:bg-muted file:text-muted-foreground file:hover:bg-accent file:transition-colors file:cursor-pointer',
      },
      // Search input styling
      {
        inputType: 'search',
        className:
          '[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:w-4 [&::-webkit-search-cancel-button]:h-4 [&::-webkit-search-cancel-button]:bg-muted-foreground [&::-webkit-search-cancel-button]:rounded-full [&::-webkit-search-cancel-button]:cursor-pointer [&::-webkit-search-cancel-button]:hover:bg-destructive',
      },
      // Number input styling
      {
        inputType: 'number',
        className:
          '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]',
      },
      // Focus placeholder enhancement
      {
        state: 'default',
        className:
          'focus:placeholder:opacity-50 focus:placeholder:transform focus:placeholder:translate-y-[-1px]',
      },
    ],
    defaultVariants: {
      size: 'md',
      state: 'default',
      inputType: 'text',
      hasStartIcon: false,
      hasEndIcon: false,
    },
  },
);

/**
 * Icon container variants
 */
const iconVariants = cva(
  'absolute flex items-center justify-center pointer-events-none text-muted-foreground transition-all duration-200 z-20',
  {
    variants: {
      position: {
        start: 'left-0',
        end: 'right-0',
      },
      size: {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-4.5 h-4.5',
      },
      spacing: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    compoundVariants: [
      // Start icon positioning
      {
        position: 'start',
        spacing: 'sm',
        className: 'left-2',
      },
      {
        position: 'start',
        spacing: 'md',
        className: 'left-3',
      },
      {
        position: 'start',
        spacing: 'lg',
        className: 'left-3.5',
      },
      // End icon positioning
      {
        position: 'end',
        spacing: 'sm',
        className: 'right-2',
      },
      {
        position: 'end',
        spacing: 'md',
        className: 'right-3',
      },
      {
        position: 'end',
        spacing: 'lg',
        className: 'right-3.5',
      },
    ],
    defaultVariants: {
      size: 'md',
      spacing: 'md',
    },
  },
);

/**
 * Feedback text variants for error/helper text
 */
const feedbackTextVariants = cva(
  'block text-xs font-medium transition-all duration-200 ease-out animate-in slide-in-from-top-1',
  {
    variants: {
      type: {
        error: 'text-destructive font-semibold',
        helper: 'text-muted-foreground font-normal',
        success: 'text-success font-medium',
        warning: 'text-warning font-medium',
      },
      size: {
        sm: 'text-xs leading-4',
        md: 'text-xs leading-4',
        lg: 'text-sm leading-5',
      },
    },
    defaultVariants: {
      type: 'helper',
      size: 'md',
    },
  },
);

/**
 * Feedback container variants
 */
const feedbackVariants = cva('mt-1.5 transition-all duration-200', {
  variants: {
    hasContent: {
      true: 'opacity-100 translate-y-0',
      false: 'opacity-0 translate-y-[-4px] pointer-events-none',
    },
  },
  defaultVariants: {
    hasContent: true,
  },
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Input state for validation feedback */
  state?: 'default' | 'error' | 'success' | 'warning' | 'disabled';
  /** Icon to display at the start of the input */
  startIcon?: React.ReactNode;
  /** Icon to display at the end of the input */
  endIcon?: React.ReactNode;
  /** Error message to display */
  error?: string;
  /** Helper text to display below the input */
  helperText?: string;
  /** Input type for specialized styling */
  inputType?: 'text' | 'password' | 'email' | 'number' | 'search' | 'file' | 'tel' | 'url';
}

/**
 * Input component for collecting user input with CVA-first architecture
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
 *
 * <Input
 *   type="file"
 *   inputType="file"
 *   helperText="Upload your document"
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      size = 'md',
      state,
      startIcon,
      endIcon,
      error,
      helperText,
      disabled,
      inputType,
      ...props
    },
    ref,
  ) => {
    // Determine the actual state based on error and disabled props
    const actualState = disabled ? 'disabled' : error ? 'error' : state || 'default';

    // Determine input type for styling variants
    const actualInputType = inputType || type || 'text';

    const hasIcons = Boolean(startIcon || endIcon);
    const hasFeedback = Boolean(error || helperText);
    const feedbackId = props.id || 'input';

    // Helper function to get feedback type
    const getFeedbackType = () => {
      if (error) return 'error';
      if (actualState === 'success') return 'success';
      if (actualState === 'warning') return 'warning';
      return 'helper';
    };

    const inputElement = (
      <input
        type={type}
        className={cn(
          inputVariants({
            size,
            state: actualState,
            inputType: actualInputType as any,
            hasStartIcon: Boolean(startIcon),
            hasEndIcon: Boolean(endIcon),
          }),
          inputClasses.input, // Enhanced accessibility and gradient effects
          className,
        )}
        ref={ref}
        disabled={disabled}
        aria-invalid={actualState === 'error'}
        aria-describedby={
          hasFeedback ? (error ? `${feedbackId}-error` : `${feedbackId}-helper`) : undefined
        }
        {...props}
      />
    );

    const iconSpacing = size;

    return (
      <div className={cn(containerVariants({ hasIcons }), inputClasses.container)}>
        {hasIcons ? (
          <div className={cn(inputWrapperVariants({ hasIcons }))}>
            {startIcon && (
              <div
                className={cn(
                  iconVariants({
                    position: 'start',
                    size,
                    spacing: iconSpacing,
                  }),
                )}
                aria-hidden="true"
              >
                {startIcon}
              </div>
            )}
            {inputElement}
            {endIcon && (
              <div
                className={cn(
                  iconVariants({
                    position: 'end',
                    size,
                    spacing: iconSpacing,
                  }),
                )}
                aria-hidden="true"
              >
                {endIcon}
              </div>
            )}
          </div>
        ) : (
          inputElement
        )}

        {hasFeedback && (
          <div className={cn(feedbackVariants({ hasContent: true }))}>
            {error ? (
              <span
                id={`${feedbackId}-error`}
                className={cn(
                  feedbackTextVariants({
                    type: 'error',
                    size,
                  }),
                )}
                role="alert"
              >
                {error}
              </span>
            ) : (
              helperText && (
                <span
                  id={`${feedbackId}-helper`}
                  className={cn(
                    feedbackTextVariants({
                      type: getFeedbackType(),
                      size,
                    }),
                  )}
                >
                  {helperText}
                </span>
              )
            )}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export {
  Input,
  inputVariants,
  containerVariants,
  inputWrapperVariants,
  iconVariants,
  feedbackTextVariants,
  feedbackVariants,
};
