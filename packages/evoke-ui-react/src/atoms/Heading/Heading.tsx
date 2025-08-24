import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { headingClasses } from '../../styles/classNames';

/**
 * Heading variants using class-variance-authority
 * Enhanced CVA-first architecture with comprehensive variant system
 */
const headingVariants = cva(
  // Base classes - typography fundamentals, accessibility, transitions
  'scroll-m-20 tracking-tight text-rendering-optimized antialiased font-display-swap break-words transition-colors duration-200 ease-out',
  {
    variants: {
      level: {
        h1: 'text-4xl font-extrabold lg:text-5xl xl:text-6xl leading-tight lg:leading-tight',
        h2: 'text-3xl font-semibold lg:text-4xl xl:text-5xl leading-tight first:mt-0',
        h3: 'text-2xl font-semibold lg:text-3xl xl:text-4xl leading-snug',
        h4: 'text-xl font-semibold lg:text-2xl xl:text-3xl leading-snug',
        h5: 'text-lg font-semibold lg:text-xl xl:text-2xl leading-normal',
        h6: 'text-base font-semibold lg:text-lg xl:text-xl leading-normal',
      },
      variant: {
        default: 'text-foreground',
        muted: 'text-muted-foreground opacity-80',
        accent: 'text-accent-foreground',
        primary: 'text-primary',
        destructive: 'text-destructive',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
        start: 'text-start',
        end: 'text-end',
      },
      spacing: {
        none: '',
        tight: 'mb-2',
        normal: 'mb-4',
        loose: 'mb-6',
        xlarge: 'mb-8',
      },
      focus: {
        none: '',
        focusable: 'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm cursor-pointer',
      },
      responsive: {
        none: '',
        scale: 'text-responsive',
        fluid: 'text-fluid-responsive',
      },
      weight: {
        inherit: '',
        light: 'font-light',
        normal: 'font-normal', 
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        extrabold: 'font-extrabold',
        black: 'font-black',
      },
      decoration: {
        none: '',
        underline: 'underline decoration-2 underline-offset-4',
        gradient: 'bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent',
      },
      transform: {
        none: 'normal-case',
        uppercase: 'uppercase tracking-wider',
        lowercase: 'lowercase',
        capitalize: 'capitalize',
      },
      status: {
        default: '',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-destructive',
        info: 'text-info',
      },
    },
    compoundVariants: [
      // H1 specific enhancements
      {
        level: 'h1',
        className: 'font-black tracking-tighter lg:tracking-tight scroll-m-16',
      },
      // H2 border enhancement for default variant
      {
        level: 'h2',
        variant: 'default',
        className: 'border-b border-border/20 pb-2',
      },
      // Focusable headings accessibility
      {
        focus: 'focusable',
        className: 'hover:text-primary/90 active:text-primary/80',
      },
      // Responsive text scaling enhancements
      {
        responsive: 'scale', 
        level: 'h1',
        className: 'sm:text-5xl md:text-6xl lg:text-7xl',
      },
      {
        responsive: 'scale',
        level: 'h2', 
        className: 'sm:text-4xl md:text-5xl lg:text-6xl',
      },
      {
        responsive: 'scale',
        level: 'h3',
        className: 'sm:text-3xl md:text-4xl lg:text-5xl',
      },
      // Fluid responsive text
      {
        responsive: 'fluid',
        level: 'h1',
        className: 'text-[clamp(2.25rem,4vw,4rem)]',
      },
      {
        responsive: 'fluid',
        level: 'h2',
        className: 'text-[clamp(1.875rem,3.5vw,3.5rem)]',
      },
      {
        responsive: 'fluid', 
        level: 'h3',
        className: 'text-[clamp(1.5rem,3vw,3rem)]',
      },
      // Status color with weight enhancement
      {
        status: 'success',
        className: 'font-semibold',
      },
      {
        status: 'warning',
        className: 'font-semibold',
      },
      {
        status: 'error', 
        className: 'font-semibold',
      },
      // Gradient decoration requires specific background setup
      {
        decoration: 'gradient',
        className: 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold',
      },
      // Center alignment with better spacing
      {
        align: 'center',
        className: 'mx-auto text-balance',
      },
      // Justify alignment optimized for readability
      {
        align: 'justify',
        className: 'text-balance max-w-prose',
      },
    ],
    defaultVariants: {
      level: 'h2',
      variant: 'default',
      align: 'left',
      spacing: 'normal',
      focus: 'none',
      responsive: 'none',
      weight: 'inherit',
      decoration: 'none',
      transform: 'none',
      status: 'default',
    },
  },
);

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    Omit<VariantProps<typeof headingVariants>, 'level' | 'focus'> {
  /** Heading level (h1-h6) - determines both semantic meaning and visual appearance */
  level?: HeadingLevel;
  /** Override the visual appearance while keeping semantic level */
  visualLevel?: HeadingLevel;
  /** Whether the heading should be focusable */
  focusable?: boolean;
  /** Enhanced visual emphasis with gradient text */
  gradient?: boolean;
  /** Enable balanced text wrapping for better typography */
  balance?: boolean;
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
      responsive,
      weight,
      decoration,
      transform,
      status,
      focusable = false,
      gradient = false,
      balance = false,
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
          headingVariants({ 
            level: styleLevel, 
            variant, 
            align, 
            spacing,
            focus: focusable ? 'focusable' : 'none',
            responsive,
            weight,
            decoration: gradient ? 'gradient' : decoration,
            transform,
            status,
          }),
          headingClasses.heading,
          {
            [headingClasses.focusable]: focusable,
            [headingClasses.balance]: balance,
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