import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Label, type LabelProps } from '../../atoms/Label';
import { Input, type InputProps } from '../../atoms/Input';
import { formFieldClasses } from '../../styles/classNames';

/**
 * FormField container variants
 * Controls overall layout and spacing of the form field
 */
const formFieldVariants = cva(
  'flex flex-col w-full space-y-1.5',
  {
    variants: {
      layout: {
        vertical: 'flex-col space-y-1.5 space-x-0',
        horizontal: 'flex-row items-start space-y-0 space-x-3',
        inline: 'flex-row items-center space-y-0 space-x-2',
      },
      size: {
        sm: 'gap-1',
        md: 'gap-1.5', 
        lg: 'gap-2',
      },
      state: {
        default: '',
        error: 'animate-shake-subtle',
        success: '',
        warning: '',
        disabled: 'opacity-70',
      },
      required: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        layout: 'horizontal',
        size: 'sm',
        className: 'space-x-2',
      },
      {
        layout: 'horizontal', 
        size: 'lg',
        className: 'space-x-4',
      },
      {
        layout: 'inline',
        size: 'lg',
        className: 'space-x-3',
      },
    ],
    defaultVariants: {
      layout: 'vertical',
      size: 'md',
      state: 'default',
      required: false,
    },
  }
);

/**
 * Label wrapper variants for different layouts
 */
const labelWrapperVariants = cva(
  'flex-shrink-0',
  {
    variants: {
      layout: {
        vertical: 'w-full',
        horizontal: 'w-32 pt-2',
        inline: 'whitespace-nowrap',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    compoundVariants: [
      {
        layout: 'horizontal',
        size: 'sm',
        className: 'w-24 pt-1.5',
      },
      {
        layout: 'horizontal',
        size: 'lg',
        className: 'w-40 pt-2.5',
      },
    ],
    defaultVariants: {
      layout: 'vertical',
      size: 'md',
    },
  }
);

/**
 * Input wrapper variants for controlling input container
 */
const inputWrapperVariants = cva(
  'flex-1 min-w-0',
  {
    variants: {
      layout: {
        vertical: 'w-full',
        horizontal: 'flex-1',
        inline: 'flex-1',
      },
    },
    defaultVariants: {
      layout: 'vertical',
    },
  }
);

/**
 * Description text variants for helper text and descriptions
 */
const descriptionVariants = cva(
  'text-sm text-muted-foreground transition-all duration-200',
  {
    variants: {
      position: {
        below: 'mt-1',
        above: 'mb-1 order-first',
      },
      state: {
        default: 'text-muted-foreground',
        error: 'text-destructive',
        success: 'text-success',
        warning: 'text-warning',
        disabled: 'opacity-70',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-sm',
      },
    },
    defaultVariants: {
      position: 'below',
      state: 'default',
      size: 'md',
    },
  }
);

export interface FormFieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof formFieldVariants> {
  /** Label text or content */
  label?: React.ReactNode;
  /** Field description or helper text */
  description?: React.ReactNode;
  /** Position of the description text */
  descriptionPosition?: 'above' | 'below';
  /** Error message to display */
  error?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is optional */
  optional?: boolean;
  /** Field size that affects spacing and typography */
  size?: 'sm' | 'md' | 'lg';
  /** Field layout arrangement */
  layout?: 'vertical' | 'horizontal' | 'inline';
  /** Field state for validation feedback */
  state?: 'default' | 'error' | 'success' | 'warning' | 'disabled';
  /** Unique identifier for the field */
  id?: string;
  /** Name for the field (passed to input) */
  name?: string;
  
  // Label-specific props (subset of LabelProps)
  /** Label props to pass through */
  labelProps?: Omit<LabelProps, 'htmlFor' | 'required' | 'optional' | 'children'>;
  
  // Input-specific props (subset of InputProps)
  /** Input props to pass through */
  inputProps?: Omit<InputProps, 'id' | 'name' | 'error' | 'state' | 'size'>;
  
  /** Input placeholder text */
  placeholder?: string;
  /** Input type */
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  /** Input value for controlled components */
  value?: string | number;
  /** Input default value for uncontrolled components */
  defaultValue?: string | number;
  /** Change handler for controlled components */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Blur handler */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Focus handler */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is readonly */
  readOnly?: boolean;
  /** Input autoComplete attribute */
  autoComplete?: string;
  /** Input autoFocus attribute */
  autoFocus?: boolean;
  
  // Icon support
  /** Icon to display at the start of the input */
  startIcon?: React.ReactNode;
  /** Icon to display at the end of the input */
  endIcon?: React.ReactNode;
}

/**
 * FormField molecular component that combines Label, Input, and validation feedback
 * Built using CVA-first architecture with comprehensive form integration support
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <FormField
 *   label="Email Address"
 *   placeholder="Enter your email"
 *   type="email"
 *   required
 * />
 * 
 * // With validation state
 * <FormField
 *   label="Password"
 *   type="password"
 *   state="error"
 *   error="Password must be at least 8 characters"
 *   required
 * />
 * 
 * // With description and helper text
 * <FormField
 *   label="Username"
 *   description="Choose a unique username for your account"
 *   placeholder="Enter username"
 *   optional
 * />
 * 
 * // Horizontal layout
 * <FormField
 *   layout="horizontal"
 *   label="Notification Preferences"
 *   type="checkbox"
 *   size="lg"
 * />
 * 
 * // With icons and advanced styling
 * <FormField
 *   label="Search"
 *   placeholder="Search for items..."
 *   startIcon={<SearchIcon />}
 *   endIcon={<ClearIcon />}
 *   size="lg"
 * />
 * 
 * // react-hook-form integration
 * <FormField
 *   label="First Name"
 *   {...register('firstName', { required: 'First name is required' })}
 *   error={errors.firstName?.message}
 *   state={errors.firstName ? 'error' : 'default'}
 * />
 * ```
 */
const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      className,
      label,
      description,
      descriptionPosition = 'below',
      error,
      required = false,
      optional = false,
      size = 'md',
      layout = 'vertical',
      state,
      id,
      name,
      labelProps = {},
      inputProps = {},
      placeholder,
      type = 'text',
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      disabled = false,
      readOnly = false,
      autoComplete,
      autoFocus = false,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const fieldId = id || React.useId();
    
    // Determine the actual state based on error and disabled props
    const actualState = disabled
      ? 'disabled'
      : error
      ? 'error'
      : state || 'default';
    
    // Create description IDs for accessibility
    const descriptionId = description ? `${fieldId}-description` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;
    
    // Combine aria-describedby attributes
    const ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
    
    return (
      <div
        className={cn(
          formFieldVariants({ layout, size, state: actualState, required }),
          formFieldClasses.formField,
          className
        )}
        {...props}
      >
        {/* Description above label when position is 'above' */}
        {description && descriptionPosition === 'above' && (
          <div
            id={descriptionId}
            className={cn(
              descriptionVariants({
                position: 'above',
                state: actualState,
                size,
              }),
              formFieldClasses.description
            )}
          >
            {description}
          </div>
        )}
        
        {/* Label wrapper for layout control */}
        {label && (
          <div className={cn(labelWrapperVariants({ layout, size }))}>
            <Label
              htmlFor={fieldId}
              required={required}
              optional={optional}
              size={size}
              state={actualState}
              {...labelProps}
            >
              {label}
            </Label>
          </div>
        )}
        
        {/* Input wrapper for layout control */}
        <div className={cn(inputWrapperVariants({ layout }))}>
          <Input
            ref={ref}
            id={fieldId}
            name={name}
            type={type}
            size={size}
            state={actualState}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            disabled={disabled}
            readOnly={readOnly}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            startIcon={startIcon}
            endIcon={endIcon}
            error={error}
            aria-describedby={ariaDescribedBy}
            {...inputProps}
          />
        </div>
        
        {/* Description below input when position is 'below' */}
        {description && descriptionPosition === 'below' && (
          <div
            id={descriptionId}
            className={cn(
              descriptionVariants({
                position: 'below',
                state: actualState,
                size,
              }),
              formFieldClasses.description
            )}
          >
            {description}
          </div>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export {
  FormField,
  formFieldVariants,
  labelWrapperVariants,
  inputWrapperVariants,
  descriptionVariants,
};