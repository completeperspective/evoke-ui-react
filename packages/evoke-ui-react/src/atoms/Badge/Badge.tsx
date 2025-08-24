import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { badgeClasses } from '../../styles/classNames';

/**
 * Badge variants using class-variance-authority
 * Comprehensive styling with minimal SCSS dependencies
 */
const badgeVariants = cva(
  // Base styles - layout, typography, accessibility
  'inline-flex items-center justify-center rounded-md border font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 user-select-none whitespace-nowrap relative overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md active:bg-primary/95 active:shadow-sm',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-md active:bg-secondary/95 active:shadow-sm',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md active:bg-destructive/95 active:shadow-sm',
        success:
          'border-transparent bg-success text-white shadow-sm hover:bg-success/90 hover:shadow-md active:bg-success/95 active:shadow-sm',
        warning:
          'border-transparent bg-warning text-foreground shadow-sm hover:bg-warning/90 hover:shadow-md active:bg-warning/95 active:shadow-sm',
        info: 'border-transparent bg-info text-white shadow-sm hover:bg-info/90 hover:shadow-md active:bg-info/95 active:shadow-sm',
        outline:
          'border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-sm active:bg-accent/90',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs gap-1 min-h-[20px]',
        md: 'px-2.5 py-1 text-xs gap-1.5 min-h-[24px]',
        lg: 'px-3 py-1.5 text-sm gap-2 min-h-[28px]',
      },
      interactive: {
        true: 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-md',
        false: '',
      },
    },
    compoundVariants: [
      // Interactive state enhancements
      {
        interactive: true,
        variant: 'default',
        className: 'hover:bg-primary/85 active:bg-primary/90',
      },
      {
        interactive: true,
        variant: 'destructive',
        className: 'hover:bg-destructive/85 active:bg-destructive/90',
      },
      {
        interactive: true,
        variant: 'outline',
        className: 'hover:bg-accent/80 active:bg-accent/90',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      interactive: false,
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

/**
 * Remove button variants
 */
const removeButtonVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-ring ml-1.5 -mr-0.5',
  {
    variants: {
      size: {
        sm: 'w-3 h-3 p-0.5',
        md: 'w-3.5 h-3.5 p-0.5',
        lg: 'w-4 h-4 p-1',
      },
      variant: {
        default: 'bg-white/20 hover:bg-white/30 text-current opacity-70 hover:opacity-100',
        light: 'bg-black/10 hover:bg-black/20 text-current opacity-70 hover:opacity-100',
        outline: 'bg-muted/50 hover:bg-muted text-current opacity-70 hover:opacity-100',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Icon to display before the badge text */
  startIcon?: React.ReactNode;
  /** Icon to display after the badge text */
  endIcon?: React.ReactNode;
  /** Whether the badge is removable */
  removable?: boolean;
  /** Callback for when badge is removed */
  onRemove?: () => void;
  /** Whether the badge should be interactive (clickable) */
  interactive?: boolean;
}

/**
 * Badge component for displaying status, tags, or small pieces of information
 *
 * @example
 * ```tsx
 * <Badge variant="default">New</Badge>
 *
 * <Badge variant="destructive" size="sm">
 *   Error
 * </Badge>
 *
 * <Badge variant="outline" startIcon={<Icon />}>
 *   With Icon
 * </Badge>
 *
 * <Badge removable onRemove={() => console.log('removed')}>
 *   Removable
 * </Badge>
 * ```
 */
const Badge = React.forwardRef<HTMLDivElement | HTMLButtonElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      startIcon,
      endIcon,
      removable = false,
      onRemove,
      interactive = false,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const isClickable = interactive || onClick || removable;

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onRemove?.();
    };

    // Determine remove button variant based on badge variant
    const getRemoveButtonVariant = () => {
      if (variant === 'warning') return 'light';
      if (variant === 'outline') return 'outline';
      return 'default';
    };

    const content = (
      <>
        {startIcon && (
          <span className={cn(iconVariants({ size, position: 'start' }))} aria-hidden="true">
            {startIcon}
          </span>
        )}
        {children}
        {endIcon && !removable && (
          <span className={cn(iconVariants({ size, position: 'end' }))} aria-hidden="true">
            {endIcon}
          </span>
        )}
        {removable && (
          <button
            type="button"
            className={cn(
              removeButtonVariants({
                size,
                variant: getRemoveButtonVariant(),
              }),
            )}
            onClick={handleRemove}
            aria-label="Remove badge"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              className="w-full h-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </>
    );

    if (isClickable) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={cn(
            badgeVariants({
              variant,
              size,
              interactive: true,
            }),
            badgeClasses.badge, // Enhanced accessibility and animation support
            className,
          )}
          onClick={onClick ? (e) => onClick(e as any) : undefined}
          type="button"
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {content}
        </button>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(
          badgeVariants({
            variant,
            size,
            interactive: false,
          }),
          badgeClasses.badge, // Enhanced accessibility and animation support
          className,
        )}
        {...props}
      >
        {content}
      </div>
    );
  },
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
