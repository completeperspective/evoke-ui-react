import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { cardClasses } from '../../styles/classNames';

/**
 * Card container variants
 * Main card styling with shadow, border, and interaction states
 */
const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground transition-all duration-200 overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border border-border shadow-sm',
        outlined: 'border-2 border-border shadow-none',
        elevated: 'border-0 shadow-lg shadow-black/10',
        interactive: 'border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    compoundVariants: [
      {
        variant: 'elevated',
        className: 'hover:shadow-xl hover:shadow-black/15',
      },
      {
        variant: 'interactive',
        className: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      padding: 'none',
    },
  }
);

/**
 * Card header variants
 * Header section styling with title and description layout
 */
const cardHeaderVariants = cva(
  'flex flex-col space-y-1.5',
  {
    variants: {
      size: {
        sm: 'px-3 py-2 space-y-1',
        md: 'px-4 py-3 space-y-1.5',
        lg: 'px-6 py-4 space-y-2',
      },
      align: {
        start: 'text-left',
        center: 'text-center items-center',
        end: 'text-right items-end',
      },
      border: {
        true: 'border-b border-border',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      align: 'start',
      border: false,
    },
  }
);

/**
 * Card content variants
 * Main content area styling with responsive padding
 */
const cardContentVariants = cva(
  'text-card-foreground',
  {
    variants: {
      size: {
        sm: 'px-3 py-2',
        md: 'px-4 py-3',
        lg: 'px-6 py-4',
      },
      spacing: {
        none: 'p-0',
        tight: '',
        normal: '',
        relaxed: '',
      },
    },
    compoundVariants: [
      {
        size: 'sm',
        spacing: 'tight',
        className: 'px-3 py-1.5',
      },
      {
        size: 'sm',
        spacing: 'relaxed',
        className: 'px-3 py-3',
      },
      {
        size: 'md',
        spacing: 'tight',
        className: 'px-4 py-2',
      },
      {
        size: 'md',
        spacing: 'relaxed',
        className: 'px-4 py-4',
      },
      {
        size: 'lg',
        spacing: 'tight',
        className: 'px-6 py-3',
      },
      {
        size: 'lg',
        spacing: 'relaxed',
        className: 'px-6 py-6',
      },
    ],
    defaultVariants: {
      size: 'md',
      spacing: 'normal',
    },
  }
);

/**
 * Card footer variants
 * Footer section styling with action alignment
 */
const cardFooterVariants = cva(
  'flex items-center',
  {
    variants: {
      size: {
        sm: 'px-3 py-2 gap-2',
        md: 'px-4 py-3 gap-2',
        lg: 'px-6 py-4 gap-3',
      },
      align: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
      },
      border: {
        true: 'border-t border-border',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      align: 'start',
      border: false,
    },
  }
);

// Base Card component interface
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Whether the card is interactive (clickable) */
  interactive?: boolean;
  /** Click handler for interactive cards */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Whether the card is disabled */
  disabled?: boolean;
}

// Card Header component interface
export interface CardHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof cardHeaderVariants> {
  /** Card title */
  title?: React.ReactNode;
  /** Card description */
  description?: React.ReactNode;
}

// Card Content component interface
export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

// Card Footer component interface
export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

/**
 * Card - Main container component
 * Flexible container with optional header, content, and footer sections
 * 
 * @example
 * ```tsx
 * // Basic card
 * <Card>
 *   <CardContent>Simple card content</CardContent>
 * </Card>
 * 
 * // Interactive card with hover effects
 * <Card variant="interactive" onClick={handleClick}>
 *   <CardHeader title="Interactive Card" description="Click me!" />
 *   <CardContent>This card responds to clicks</CardContent>
 * </Card>
 * 
 * // Elevated card with structured content
 * <Card variant="elevated" size="lg">
 *   <CardHeader title="Featured Article" border />
 *   <CardContent spacing="relaxed">
 *     <p>Article content goes here...</p>
 *   </CardContent>
 *   <CardFooter align="between" border>
 *     <Button variant="ghost">Read More</Button>
 *     <Badge>Featured</Badge>
 *   </CardFooter>
 * </Card>
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      padding = 'none',
      interactive = false,
      onClick,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    // Auto-set interactive variant if onClick is provided
    const actualVariant = onClick && !interactive ? 'interactive' : variant;
    
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ 
            variant: actualVariant, 
            size, 
            padding 
          }),
          cardClasses.card,
          disabled && 'opacity-50 pointer-events-none',
          className
        )}
        onClick={!disabled ? onClick : undefined}
        role={onClick && !disabled ? 'button' : undefined}
        tabIndex={onClick && !disabled ? 0 : undefined}
        onKeyDown={onClick && !disabled ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(e as any);
          }
        } : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

/**
 * CardHeader - Header section with title and description
 * 
 * @example
 * ```tsx
 * <CardHeader 
 *   title="Card Title" 
 *   description="Optional description"
 *   border
 * />
 * ```
 */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  (
    {
      className,
      title,
      description,
      size = 'md',
      align = 'start',
      border = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardHeaderVariants({ size, align, border }),
          cardClasses.header,
          className
        )}
        {...props}
      >
        {title && (
          <h3 className={cn(
            'font-semibold leading-none tracking-tight',
            size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-lg'
          )}>
            {title}
          </h3>
        )}
        {description && (
          <p className={cn(
            'text-muted-foreground',
            size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'
          )}>
            {description}
          </p>
        )}
        {children}
      </div>
    );
  }
);

/**
 * CardContent - Main content area
 * 
 * @example
 * ```tsx
 * <CardContent spacing="relaxed">
 *   <p>Your content goes here</p>
 * </CardContent>
 * ```
 */
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  (
    {
      className,
      size = 'md',
      spacing = 'normal',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardContentVariants({ size, spacing }),
          cardClasses.content,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

/**
 * CardFooter - Footer section for actions
 * 
 * @example
 * ```tsx
 * <CardFooter align="between" border>
 *   <Button variant="ghost">Cancel</Button>
 *   <Button>Confirm</Button>
 * </CardFooter>
 * ```
 */
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  (
    {
      className,
      size = 'md',
      align = 'start',
      border = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardFooterVariants({ size, align, border }),
          cardClasses.footer,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// Display names
Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  cardVariants,
  cardHeaderVariants,
  cardContentVariants,
  cardFooterVariants,
};
