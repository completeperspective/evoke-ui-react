import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import styles from './Text.module.scss';

/**
 * Text variants using class-variance-authority
 */
const textVariants = cva('', {
  variants: {
    variant: {
      body: 'text-base text-foreground',
      lead: 'text-xl text-muted-foreground font-light',
      large: 'text-lg font-semibold text-foreground',
      small: 'text-sm text-muted-foreground',
      muted: 'text-sm text-muted-foreground',
      caption: 'text-xs text-muted-foreground',
      code: 'font-mono text-sm bg-muted px-1 py-0.5 rounded',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    transform: {
      none: 'normal-case',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
    },
    truncate: {
      none: '',
      truncate: 'truncate',
      'line-clamp-2': 'line-clamp-2',
      'line-clamp-3': 'line-clamp-3',
      'line-clamp-4': 'line-clamp-4',
    },
  },
  defaultVariants: {
    variant: 'body',
    align: 'left',
    weight: 'normal',
    transform: 'none',
    truncate: 'none',
  },
});

type TextElement = 'p' | 'span' | 'div' | 'label' | 'legend' | 'time' | 'figcaption';

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  /** HTML element to render */
  as?: TextElement;
  /** Whether the text is selectable */
  selectable?: boolean;
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
      as: Component = 'p',
      selectable = true,
      children,
      ...props
    },
    ref
  ) => {
    return React.createElement(
      Component,
      {
        className: cn(
          textVariants({ variant, align, weight, transform, truncate }),
          styles.text,
          {
            [styles.unselectable]: !selectable,
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