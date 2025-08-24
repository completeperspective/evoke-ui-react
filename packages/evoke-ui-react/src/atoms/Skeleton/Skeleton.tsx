import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import styles from './Skeleton.module.scss';

/**
 * Main skeleton variants using CVA-first architecture
 * Comprehensive styling with minimal SCSS dependencies
 */
const skeletonVariants = cva(
  // Base styles - layout, positioning, overflow, transitions
  'relative overflow-hidden bg-muted border border-border/30 transition-all duration-200 ease-out',
  {
    variants: {
      shape: {
        default: 'rounded-md',
        circle: 'rounded-full aspect-square min-w-[2.5rem] min-h-[2.5rem]',
        avatar: 'rounded-full aspect-square min-w-[2.5rem] min-h-[2.5rem] border-2 border-border/20',
        card: 'rounded-lg min-h-[8rem] shadow-sm',
        button: 'rounded-md min-w-[5rem] min-h-[2.5rem]',
        text: 'rounded-sm min-h-[1rem]',
      },
      size: {
        xs: 'min-w-[1.5rem] min-h-[0.75rem]',
        sm: 'min-w-[2rem] min-h-[1rem]',
        md: 'min-w-[3rem] min-h-[1.25rem]',
        lg: 'min-w-[4rem] min-h-[1.5rem]',
        xl: 'min-w-[6rem] min-h-[2rem]',
      },
      animation: {
        animated: 'animate-pulse',
        static: '',
        pulse: '',
        shimmer: '',
      },
      lines: {
        single: '',
        lines2: '',
        lines3: '',
        lines4: '',
        lines5: '',
      },
      aspectRatio: {
        none: '',
        square: 'aspect-square',
        wide: 'aspect-[3/2]',
        tall: 'aspect-[2/3]',
      },
    },
    compoundVariants: [
      // Circle and avatar shapes enforce square aspect ratio
      {
        shape: 'circle',
        aspectRatio: 'none',
        className: 'aspect-square',
      },
      {
        shape: 'avatar',
        aspectRatio: 'none', 
        className: 'aspect-square',
      },
      // Card shape with aspect ratio combinations
      {
        shape: 'card',
        aspectRatio: 'wide',
        className: 'aspect-[3/2]',
      },
      {
        shape: 'card',
        aspectRatio: 'square',
        className: 'aspect-square',
      },
      // Button shape with aspect ratio
      {
        shape: 'button',
        aspectRatio: 'wide',
        className: 'aspect-[3/1] min-w-[8rem]',
      },
      // Size overrides for specific shapes
      {
        shape: 'circle',
        size: 'xs',
        className: 'min-w-[1.5rem] min-h-[1.5rem] w-[1.5rem] h-[1.5rem]',
      },
      {
        shape: 'circle',
        size: 'sm',
        className: 'min-w-[2rem] min-h-[2rem] w-[2rem] h-[2rem]',
      },
      {
        shape: 'circle',
        size: 'md',
        className: 'min-w-[2.5rem] min-h-[2.5rem] w-[2.5rem] h-[2.5rem]',
      },
      {
        shape: 'circle',
        size: 'lg',
        className: 'min-w-[3rem] min-h-[3rem] w-[3rem] h-[3rem]',
      },
      {
        shape: 'circle',
        size: 'xl',
        className: 'min-w-[4rem] min-h-[4rem] w-[4rem] h-[4rem]',
      },
      // Avatar size variants
      {
        shape: 'avatar',
        size: 'xs',
        className: 'min-w-[1.5rem] min-h-[1.5rem] w-[1.5rem] h-[1.5rem]',
      },
      {
        shape: 'avatar',
        size: 'sm',
        className: 'min-w-[2rem] min-h-[2rem] w-[2rem] h-[2rem]',
      },
      {
        shape: 'avatar',
        size: 'md',
        className: 'min-w-[2.5rem] min-h-[2.5rem] w-[2.5rem] h-[2.5rem]',
      },
      {
        shape: 'avatar',
        size: 'lg',
        className: 'min-w-[3rem] min-h-[3rem] w-[3rem] h-[3rem]',
      },
      {
        shape: 'avatar',
        size: 'xl',
        className: 'min-w-[4rem] min-h-[4rem] w-[4rem] h-[4rem]',
      },
      // Text size variants
      {
        shape: 'text',
        size: 'xs',
        className: 'h-3',
      },
      {
        shape: 'text',
        size: 'sm',
        className: 'h-4',
      },
      {
        shape: 'text',
        size: 'md',
        className: 'h-5',
      },
      {
        shape: 'text',
        size: 'lg',
        className: 'h-6',
      },
      {
        shape: 'text',
        size: 'xl',
        className: 'h-7',
      },
      // Card shape gets min-height override and enhanced styling
      {
        shape: 'card',
        className: 'min-h-[8rem] border border-border/20',
      },
      {
        shape: 'button',
        className: 'min-w-[5rem] min-h-[2.5rem]',
      },
      {
        shape: 'text',
        className: 'min-h-[1rem]',
      },
      // Shimmer animation overrides
      {
        animation: 'shimmer',
        className: 'animate-none', // Remove pulse, shimmer handled by SCSS
      },
      // Static state removes all animations
      {
        animation: 'static',
        className: 'animate-none',
      },
    ],
    defaultVariants: {
      shape: 'default',
      size: 'md',
      animation: 'animated',
      lines: 'single',
      aspectRatio: 'none',
    },
  }
);

/**
 * Multi-line container variants for text skeletons
 */
const multilineVariants = cva(
  'flex flex-col w-full space-y-2',
  {
    variants: {
      lines: {
        single: 'hidden', // Hide container for single line
        lines2: 'space-y-1',
        lines3: 'space-y-1.5',
        lines4: 'space-y-1.5',
        lines5: 'space-y-2',
      },
      size: {
        xs: 'space-y-1',
        sm: 'space-y-1',
        md: 'space-y-1.5',
        lg: 'space-y-2',
        xl: 'space-y-2.5',
      },
    },
    compoundVariants: [
      {
        lines: 'lines2',
        size: 'xs',
        className: 'space-y-0.5',
      },
      {
        lines: 'lines2',
        size: 'sm',
        className: 'space-y-0.5',
      },
    ],
    defaultVariants: {
      lines: 'single',
      size: 'md',
    },
  }
);

/**
 * Individual line variants for multi-line text
 */
const lineVariants = cva(
  'w-full',
  {
    variants: {
      isLast: {
        true: 'w-[60%] max-w-[75%]', // Last line is shorter
        false: 'w-full',
      },
      lineIndex: {
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
      },
    },
    compoundVariants: [
      // Staggered animation delays
      {
        lineIndex: 1,
        className: '[animation-delay:0.1s]',
      },
      {
        lineIndex: 2,
        className: '[animation-delay:0.2s]',
      },
      {
        lineIndex: 3,
        className: '[animation-delay:0.3s]',
      },
      {
        lineIndex: 4,
        className: '[animation-delay:0.4s]',
      },
    ],
    defaultVariants: {
      isLast: false,
      lineIndex: 0,
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof skeletonVariants>, 'lines'> {
  /** Width of the skeleton (CSS value) */
  width?: string | number;
  /** Height of the skeleton (CSS value) */
  height?: string | number;
  /** Shape variant - replaces old 'variant' prop */
  shape?: 'default' | 'circle' | 'avatar' | 'card' | 'button' | 'text';
  /** Animation type */
  animation?: 'animated' | 'static' | 'pulse' | 'shimmer';
  /** Number of lines for text skeleton (2-5) */
  lines?: 'single' | 'lines2' | 'lines3' | 'lines4' | 'lines5' | number;
  /** Aspect ratio for card/button shapes */
  aspectRatio?: 'none' | 'square' | 'wide' | 'tall';
  /** Whether animation should be disabled (deprecated - use animation="static") */
  static?: boolean;
  // Legacy props for backward compatibility
  /** @deprecated Use 'shape' instead */
  variant?: 'default' | 'card' | 'text' | 'circle' | 'button' | 'avatar';
}

/**
 * Skeleton component for loading placeholders with CVA-first architecture
 * 
 * @example
 * ```tsx
 * // Basic skeleton
 * <Skeleton className="w-[100px] h-[20px]" />
 * 
 * // Circle avatar skeleton
 * <Skeleton shape="circle" size="lg" />
 * 
 * // Multi-line text skeleton
 * <Skeleton shape="text" lines="lines3" />
 * 
 * // Card skeleton with aspect ratio
 * <Skeleton shape="card" aspectRatio="wide" width={300} />
 * 
 * // Custom shimmer animation
 * <Skeleton shape="button" animation="shimmer" />
 * 
 * // Static skeleton (no animation)
 * <Skeleton animation="static" width={200} height={100} />
 * ```
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      shape,
      variant, // Legacy prop
      size = 'md',
      width,
      height,
      animation,
      lines = 'single',
      aspectRatio = 'none',
      static: isStatic = false,
      style,
      ...props
    },
    ref
  ) => {
    // Handle legacy props and new props
    const actualShape = shape || variant || 'default';
    const actualAnimation = isStatic ? 'static' : (animation || 'animated');
    
    // Convert numeric lines to string format
    const actualLines = typeof lines === 'number' 
      ? lines <= 1 ? 'single' 
      : lines === 2 ? 'lines2'
      : lines === 3 ? 'lines3' 
      : lines === 4 ? 'lines4'
      : 'lines5'
      : lines;
    
    // Parse lines number for iteration
    const linesCount = actualLines === 'single' ? 1 
      : actualLines === 'lines2' ? 2
      : actualLines === 'lines3' ? 3
      : actualLines === 'lines4' ? 4
      : actualLines === 'lines5' ? 5
      : 1;

    const skeletonStyle = {
      ...style,
      ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
      ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
    };

    // For text shape with multiple lines
    if (actualShape === 'text' && linesCount > 1) {
      return (
        <div
          ref={ref}
          className={cn(
            multilineVariants({ lines: actualLines, size }),
            styles.textLines,
            className
          )}
          {...props}
        >
          {Array.from({ length: linesCount }, (_, index) => (
            <div
              key={index}
              className={cn(
                skeletonVariants({
                  shape: actualShape,
                  size,
                  animation: actualAnimation,
                  lines: actualLines,
                  aspectRatio,
                }),
                lineVariants({
                  isLast: index === linesCount - 1,
                  lineIndex: Math.min(index, 4) as 0 | 1 | 2 | 3 | 4,
                }),
                styles.skeleton,
                {
                  [styles.static]: actualAnimation === 'static',
                  [styles.shimmer]: actualAnimation === 'shimmer',
                }
              )}
              style={skeletonStyle}
              role="status"
              aria-label="Loading..."
            />
          ))}
        </div>
      );
    }

    // Single skeleton element
    return (
      <div
        ref={ref}
        className={cn(
          skeletonVariants({
            shape: actualShape,
            size,
            animation: actualAnimation,
            lines: actualLines,
            aspectRatio,
          }),
          styles.skeleton,
          {
            [styles.static]: actualAnimation === 'static',
            [styles.shimmer]: actualAnimation === 'shimmer',
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

export { 
  Skeleton, 
  skeletonVariants, 
  multilineVariants, 
  lineVariants 
};