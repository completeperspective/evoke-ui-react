import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import styles from './Skeleton.module.scss';

/**
 * Skeleton variants using class-variance-authority
 */
const skeletonVariants = cva(
  'animate-pulse rounded-md bg-muted',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        card: 'bg-muted rounded-lg',
        text: 'bg-muted rounded',
        circle: 'bg-muted rounded-full',
        button: 'bg-muted rounded-md',
        avatar: 'bg-muted rounded-full',
      },
      size: {
        sm: 'h-4',
        md: 'h-6',
        lg: 'h-8',
        xl: 'h-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /** Width of the skeleton (CSS value) */
  width?: string | number;
  /** Height of the skeleton (CSS value) */
  height?: string | number;
  /** Whether animation should be disabled */
  static?: boolean;
  /** Number of lines for text skeleton */
  lines?: number;
}

/**
 * Skeleton component for loading placeholders
 * 
 * @example
 * ```tsx
 * <Skeleton className="w-[100px] h-[20px] rounded-full" />
 * 
 * <Skeleton variant="circle" className="w-12 h-12" />
 * 
 * <Skeleton variant="text" lines={3} />
 * 
 * <Skeleton variant="card" width={300} height={200} />
 * ```
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant,
      size,
      width,
      height,
      static: isStatic = false,
      lines = 1,
      style,
      ...props
    },
    ref
  ) => {
    const skeletonStyle = {
      ...style,
      ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
      ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
    };

    // For text variant with multiple lines
    if (variant === 'text' && lines > 1) {
      return (
        <div
          ref={ref}
          className={cn(styles.textLines, className)}
          {...props}
        >
          {Array.from({ length: lines }, (_, index) => (
            <div
              key={index}
              className={cn(
                skeletonVariants({ variant, size }),
                styles.skeleton,
                {
                  [styles.static]: isStatic,
                  [styles.lastLine]: index === lines - 1 && lines > 1,
                }
              )}
              style={{
                ...skeletonStyle,
                width: index === lines - 1 ? '60%' : '100%',
              }}
              role="status"
              aria-label="Loading..."
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          skeletonVariants({ variant, size }),
          styles.skeleton,
          {
            [styles.static]: isStatic,
          },
          className
        )}
        style={skeletonStyle}
        role="status"
        aria-label="Loading..."
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton, skeletonVariants };