import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import styles from './Badge.module.scss';

/**
 * Badge variants using class-variance-authority
 */
const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        success:
          'border-transparent bg-green-500 text-white shadow hover:bg-green-600',
        warning:
          'border-transparent bg-yellow-500 text-white shadow hover:bg-yellow-600',
        info:
          'border-transparent bg-blue-500 text-white shadow hover:bg-blue-600',
        outline: 'text-foreground border-border',
      },
      size: {
        sm: 'px-1.5 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
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
    ref
  ) => {
    const isClickable = interactive || onClick || removable;

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onRemove?.();
    };

    const content = (
      <>
        {startIcon && (
          <span className={cn(styles.icon, styles.startIcon)} aria-hidden="true">
            {startIcon}
          </span>
        )}
        {children}
        {endIcon && !removable && (
          <span className={cn(styles.icon, styles.endIcon)} aria-hidden="true">
            {endIcon}
          </span>
        )}
        {removable && (
          <button
            type="button"
            className={cn(styles.removeButton)}
            onClick={handleRemove}
            aria-label="Remove badge"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
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
            badgeVariants({ variant, size }),
            styles.badge,
            styles.interactive,
            className
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
        className={cn(badgeVariants({ variant, size }), styles.badge, className)}
        {...props}
      >
        {content}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };