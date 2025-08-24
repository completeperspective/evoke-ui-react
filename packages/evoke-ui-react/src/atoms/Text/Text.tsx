import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import styles from './Text.module.scss';

/**
 * Text variants using class-variance-authority
 * Comprehensive typography styling with enhanced utility variants
 */
const textVariants = cva(
  // Base classes - typography fundamentals, transitions
  'text-rendering-optimized antialiased font-display-swap break-words hyphens-auto transition-colors duration-200 ease-out',
  {
    variants: {
      variant: {
        body: 'text-base text-foreground leading-relaxed',
        lead: 'text-xl text-muted-foreground leading-relaxed',
        large: 'text-lg font-semibold text-foreground leading-tight',
        small: 'text-sm text-muted-foreground leading-normal',
        muted: 'text-sm text-muted-foreground leading-normal opacity-70',
        caption: 'text-xs text-muted-foreground leading-tight tracking-wide',
        code: 'font-mono text-sm bg-muted text-muted-foreground px-2 py-1 rounded-sm border border-border/20 font-medium',
        quote: 'text-base text-foreground italic border-l-4 border-primary/20 pl-4 leading-relaxed',
        highlight: 'text-base text-foreground bg-warning/20 px-1 py-0.5 rounded-sm font-medium',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
        start: 'text-start',
        end: 'text-end',
      },
      weight: {
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        black: 'font-black',
      },
      transform: {
        none: 'normal-case',
        uppercase: 'uppercase tracking-wider',
        lowercase: 'lowercase',
        capitalize: 'capitalize',
      },
      truncate: {
        none: '',
        truncate: 'truncate',
        'line-clamp-2': 'line-clamp-2',
        'line-clamp-3': 'line-clamp-3',
        'line-clamp-4': 'line-clamp-4',
        'line-clamp-5': 'line-clamp-5',
        'line-clamp-6': 'line-clamp-6',
      },
      display: {
        block: 'block',
        inline: 'inline',
        'inline-block': 'inline-block',
        flex: 'flex items-baseline',
        'inline-flex': 'inline-flex items-baseline',
      },
      spacing: {
        none: '',
        tight: 'tracking-tight',
        normal: 'tracking-normal',
        wide: 'tracking-wide',
        wider: 'tracking-wider',
        widest: 'tracking-widest',
      },
      decoration: {
        none: 'no-underline',
        underline: 'underline decoration-2 underline-offset-2',
        overline: 'overline',
        'line-through': 'line-through',
        'double-underline': 'underline decoration-double',
      },
      status: {
        default: '',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-destructive',
        info: 'text-info',
        muted: 'text-muted-foreground opacity-60',
      },
      selectable: {
        true: 'select-text',
        false: 'select-none user-select-none',
      },
      interactive: {
        true: 'cursor-pointer hover:text-foreground/80 active:text-foreground/60 transition-colors',
        false: '',
      },
      responsive: {
        none: '',
        sm: 'sm:text-base',
        md: 'md:text-lg',
        lg: 'lg:text-xl',
        xl: 'xl:text-2xl',
      },
    },
    compoundVariants: [
      // Interactive text with enhanced hover states
      {
        interactive: true,
        variant: 'body',
        className: 'hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm',
      },
      {
        interactive: true,
        variant: 'lead',
        className: 'hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm',
      },
      // Code variant enhancements
      {
        variant: 'code',
        selectable: false,
        className: 'select-text', // Code should always be selectable
      },
      // Quote variant with proper spacing
      {
        variant: 'quote',
        align: 'justify',
        className: 'max-w-prose',
      },
      // Status color combinations
      {
        status: 'success',
        weight: 'medium',
        className: 'font-semibold',
      },
      {
        status: 'warning',
        weight: 'medium', 
        className: 'font-semibold',
      },
      {
        status: 'error',
        weight: 'medium',
        className: 'font-semibold',
      },
      // Responsive text scaling
      {
        variant: 'large',
        responsive: 'lg',
        className: 'lg:text-2xl',
      },
      {
        variant: 'lead',
        responsive: 'md',
        className: 'md:text-2xl lg:text-3xl',
      },
      // Decoration with proper spacing
      {
        decoration: 'underline',
        className: 'decoration-primary/60 hover:decoration-primary',
      },
      // Display flex with proper gap
      {
        display: 'flex',
        className: 'gap-2',
      },
      {
        display: 'inline-flex',
        className: 'gap-1',
      },
    ],
    defaultVariants: {
      variant: 'body',
      align: 'left',
      weight: 'normal',
      transform: 'none',
      truncate: 'none',
      display: 'block',
      spacing: 'normal',
      decoration: 'none',
      status: 'default',
      selectable: true,
      interactive: false,
      responsive: 'none',
    },
  },
);

type TextElement = 'p' | 'span' | 'div' | 'label' | 'legend' | 'time' | 'figcaption';

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  /** HTML element to render */
  as?: TextElement;
  /** Whether the text is monospaced (for tabular data) */
  monospace?: boolean;
  /** Whether the text should be rendered as prose (optimized for reading) */
  prose?: boolean;
  /** Whether to use small caps variant */
  smallCaps?: boolean;
  /** Whether to use tabular numbers for consistent number spacing */
  tabularNums?: boolean;
}

/**
 * Text component for displaying text content with semantic variants
 * 
 * @example
 * ```tsx
 * <Text variant="body">Regular body text</Text>
 * 
 * <Text variant="lead" as="p">
 *   Lead text for introductions
 * </Text>
 * 
 * <Text variant="small" weight="medium" align="center">
 *   Small centered text
 * </Text>
 * 
 * <Text variant="code">const code = 'example';</Text>
 * ```
 */
const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      className,
      variant,
      align,
      weight,
      transform,
      truncate,
      display,
      spacing,
      decoration,
      status,
      selectable,
      interactive,
      responsive,
      as: Component = 'p',
      monospace = false,
      prose = false,
      smallCaps = false,
      tabularNums = false,
      children,
      ...props
    },
    ref
  ) => {
    return React.createElement(
      Component,
      {
        className: cn(
          textVariants({ 
            variant, 
            align, 
            weight, 
            transform, 
            truncate,
            display,
            spacing,
            decoration,
            status,
            selectable,
            interactive,
            responsive,
          }),
          styles.text,
          {
            [styles.monospace]: monospace,
            [styles.prose]: prose,
            [styles.smallCaps]: smallCaps,
            [styles.tabularNums]: tabularNums,
          },
          className
        ),
        ref,
        ...props,
      },
      children
    );
  }
);

Text.displayName = 'Text';

export { Text, textVariants };