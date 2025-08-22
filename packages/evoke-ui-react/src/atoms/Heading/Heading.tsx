import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import styles from './Heading.module.scss';

/**
 * Heading variants using class-variance-authority
 */
const headingVariants = cva('scroll-m-20 tracking-tight', {
  variants: {
    level: {
      h1: 'text-4xl font-extrabold lg:text-5xl',
      h2: 'text-3xl font-semibold first:mt-0',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-semibold',
      h5: 'text-lg font-semibold',
      h6: 'text-base font-semibold',
    },
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      accent: 'text-accent-foreground',
      destructive: 'text-destructive',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    spacing: {
      none: '',
      tight: 'mb-2',
      normal: 'mb-4',
      loose: 'mb-6',
    },
  },
  defaultVariants: {
    level: 'h2',
    variant: 'default',
    align: 'left',
    spacing: 'normal',
  },
});

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    Omit<VariantProps<typeof headingVariants>, 'level'> {
  /** Heading level (h1-h6) - determines both semantic meaning and visual appearance */
  level?: HeadingLevel;
  /** Override the visual appearance while keeping semantic level */
  visualLevel?: HeadingLevel;
  /** Whether the heading should be focusable */
  focusable?: boolean;
}

/**
 * Heading component for section headers with responsive sizing
 * 
 * @example
 * ```tsx
 * <Heading level="h1">Main Page Title</Heading>
 * 
 * <Heading level="h2" variant="muted">
 *   Section Header
 * </Heading>
 * 
 * <Heading level="h3" visualLevel="h1" align="center">
 *   Visually large but semantically h3
 * </Heading>
 * 
 * <Heading level="h4" spacing="tight">
 *   Compact Header
 * </Heading>
 * ```
 */
const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      className,
      level = 'h2',
      visualLevel,
      variant,
      align,
      spacing,
      focusable = false,
      children,
      ...props
    },
    ref
  ) => {
    // Use visualLevel for styling, but level for semantic meaning
    const styleLevel = visualLevel || level;
    
    return React.createElement(
      level,
      {
        className: cn(
          headingVariants({ level: styleLevel, variant, align, spacing }),
          styles.heading,
          {
            [styles.focusable]: focusable,
          },
          className
        ),
        ref,
        tabIndex: focusable ? 0 : undefined,
        ...props,
      },
      children
    );
  }
);

Heading.displayName = 'Heading';

export { Heading, headingVariants };