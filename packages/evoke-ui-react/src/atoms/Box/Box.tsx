import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { boxClasses } from '../../styles/classNames';

/**
 * Box variants using class-variance-authority
 * Layout primitive with flexible container, spacing, and sizing controls
 */
const boxVariants = cva(
  // Base styles - flexible container with proper display
  'block',
  {
    variants: {
      // Padding variants using design tokens
      padding: {
        none: 'p-0',
        xs: 'p-1',     // 4px
        sm: 'p-2',     // 8px
        md: 'p-4',     // 16px
        lg: 'p-6',     // 24px
        xl: 'p-8',     // 32px
        '2xl': 'p-12', // 48px
      },
      // Margin variants using design tokens
      margin: {
        none: 'm-0',
        xs: 'm-1',     // 4px
        sm: 'm-2',     // 8px
        md: 'm-4',     // 16px
        lg: 'm-6',     // 24px
        xl: 'm-8',     // 32px
        '2xl': 'm-12', // 48px
        auto: 'm-auto',
      },
      // Padding X-axis override
      paddingX: {
        none: 'px-0',
        xs: 'px-1',
        sm: 'px-2',
        md: 'px-4',
        lg: 'px-6',
        xl: 'px-8',
        '2xl': 'px-12',
      },
      // Padding Y-axis override
      paddingY: {
        none: 'py-0',
        xs: 'py-1',
        sm: 'py-2',
        md: 'py-4',
        lg: 'py-6',
        xl: 'py-8',
        '2xl': 'py-12',
      },
      // Margin X-axis override
      marginX: {
        none: 'mx-0',
        xs: 'mx-1',
        sm: 'mx-2',
        md: 'mx-4',
        lg: 'mx-6',
        xl: 'mx-8',
        '2xl': 'mx-12',
        auto: 'mx-auto',
      },
      // Margin Y-axis override
      marginY: {
        none: 'my-0',
        xs: 'my-1',
        sm: 'my-2',
        md: 'my-4',
        lg: 'my-6',
        xl: 'my-8',
        '2xl': 'my-12',
        auto: 'my-auto',
      },
      // Display variants
      display: {
        block: 'block',
        'inline-block': 'inline-block',
        flex: 'flex',
        'inline-flex': 'inline-flex',
        grid: 'grid',
        'inline-grid': 'inline-grid',
        hidden: 'hidden',
      },
      // Width variants
      width: {
        auto: 'w-auto',
        full: 'w-full',
        screen: 'w-screen',
        fit: 'w-fit',
        min: 'w-min',
        max: 'w-max',
        xs: 'w-20',    // 5rem / 80px
        sm: 'w-24',    // 6rem / 96px
        md: 'w-32',    // 8rem / 128px
        lg: 'w-48',    // 12rem / 192px
        xl: 'w-64',    // 16rem / 256px
        '2xl': 'w-80', // 20rem / 320px
      },
      // Height variants
      height: {
        auto: 'h-auto',
        full: 'h-full',
        screen: 'h-screen',
        fit: 'h-fit',
        min: 'h-min',
        max: 'h-max',
        xs: 'h-20',    // 5rem / 80px
        sm: 'h-24',    // 6rem / 96px
        md: 'h-32',    // 8rem / 128px
        lg: 'h-48',    // 12rem / 192px
        xl: 'h-64',    // 16rem / 256px
        '2xl': 'h-80', // 20rem / 320px
      },
    },
    compoundVariants: [
      // Responsive combinations can be handled via responsive props
    ],
    defaultVariants: {
      padding: 'none',
      margin: 'none',
      display: 'block',
      width: 'auto',
      height: 'auto'
    }
  }
);

/**
 * Spacing value mapping to Tailwind classes
 */
const spacingValueMap = {
  none: '0',
  xs: '1',
  sm: '2',
  md: '4',
  lg: '6',
  xl: '8',
  '2xl': '12'
} as const;

/**
 * Width and height value mapping to Tailwind classes
 */
const sizeValueMap = {
  auto: 'auto',
  full: 'full',
  screen: 'screen',
  fit: 'fit',
  min: 'min',
  max: 'max',
  xs: '20',    // 5rem / 80px
  sm: '24',    // 6rem / 96px
  md: '32',    // 8rem / 128px
  lg: '48',    // 12rem / 192px
  xl: '64',    // 16rem / 256px
  '2xl': '80', // 20rem / 320px
} as const;

/**
 * Responsive class generation utility for Box component
 * Generates responsive spacing, sizing, and display classes based on breakpoint configuration
 */
const generateBoxResponsiveClasses = (
  responsive?: BoxProps['responsive'],
  responsivePadding?: BoxProps['responsivePadding'],
  responsiveMargin?: BoxProps['responsiveMargin']
): string => {
  const classes: string[] = [];
  
  if (responsive) {
    Object.entries(responsive).forEach(([breakpoint, config]) => {
      if (config) {
        Object.entries(config).forEach(([property, value]) => {
          if (value) {
            switch (property) {
              case 'display':
                classes.push(`${breakpoint}:${value}`);
                break;
              case 'width':
                if (value in sizeValueMap) {
                  const widthValue = sizeValueMap[value as keyof typeof sizeValueMap];
                  classes.push(`${breakpoint}:w-${widthValue}`);
                }
                break;
              case 'height':
                if (value in sizeValueMap) {
                  const heightValue = sizeValueMap[value as keyof typeof sizeValueMap];
                  classes.push(`${breakpoint}:h-${heightValue}`);
                }
                break;
            }
          }
        });
      }
    });
  }
  
  if (responsivePadding) {
    Object.entries(responsivePadding).forEach(([breakpoint, padding]) => {
      if (padding && padding in spacingValueMap) {
        const paddingValue = spacingValueMap[padding as keyof typeof spacingValueMap];
        classes.push(`${breakpoint}:p-${paddingValue}`);
      }
    });
  }
  
  if (responsiveMargin) {
    Object.entries(responsiveMargin).forEach(([breakpoint, margin]) => {
      if (margin && margin in spacingValueMap) {
        const marginValue = spacingValueMap[margin as keyof typeof spacingValueMap];
        classes.push(`${breakpoint}:m-${marginValue}`);
      } else if (margin === 'auto') {
        classes.push(`${breakpoint}:m-auto`);
      }
    });
  }
  
  return classes.join(' ');
};

export interface BoxProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof boxVariants> {
  /** HTML element to render (semantic flexibility) */
  as?: 'div' | 'section' | 'article' | 'aside' | 'nav' | 'main' | 'header' | 'footer' | 'span';
  /** Responsive configuration */
  responsive?: {
    sm?: {
      display?: VariantProps<typeof boxVariants>['display'];
      width?: VariantProps<typeof boxVariants>['width'];
      height?: VariantProps<typeof boxVariants>['height'];
    };
    md?: {
      display?: VariantProps<typeof boxVariants>['display'];
      width?: VariantProps<typeof boxVariants>['width'];
      height?: VariantProps<typeof boxVariants>['height'];
    };
    lg?: {
      display?: VariantProps<typeof boxVariants>['display'];
      width?: VariantProps<typeof boxVariants>['width'];
      height?: VariantProps<typeof boxVariants>['height'];
    };
    xl?: {
      display?: VariantProps<typeof boxVariants>['display'];
      width?: VariantProps<typeof boxVariants>['width'];
      height?: VariantProps<typeof boxVariants>['height'];
    };
    '2xl'?: {
      display?: VariantProps<typeof boxVariants>['display'];
      width?: VariantProps<typeof boxVariants>['width'];
      height?: VariantProps<typeof boxVariants>['height'];
    };
  };
  /** Responsive padding configuration */
  responsivePadding?: {
    sm?: VariantProps<typeof boxVariants>['padding'];
    md?: VariantProps<typeof boxVariants>['padding'];
    lg?: VariantProps<typeof boxVariants>['padding'];
    xl?: VariantProps<typeof boxVariants>['padding'];
    '2xl'?: VariantProps<typeof boxVariants>['padding'];
  };
  /** Responsive margin configuration */
  responsiveMargin?: {
    sm?: VariantProps<typeof boxVariants>['margin'];
    md?: VariantProps<typeof boxVariants>['margin'];
    lg?: VariantProps<typeof boxVariants>['margin'];
    xl?: VariantProps<typeof boxVariants>['margin'];
    '2xl'?: VariantProps<typeof boxVariants>['margin'];
  };
}

/**
 * Box - Flexible layout primitive with comprehensive spacing and sizing
 * 
 * A versatile container component that serves as a layout foundation with
 * comprehensive padding, margin, display, and sizing controls. Perfect for
 * dashboard layouts, content sections, and flexible compositions.
 * 
 * @example
 * ```tsx
 * // Basic container with padding
 * <Box padding="md">
 *   Dashboard content here
 * </Box>
 * 
 * // Centered layout with responsive sizing
 * <Box 
 *   display="flex"
 *   width="full"
 *   margin="auto"
 *   padding="lg"
 *   responsive={{
 *     sm: { width: 'md' },
 *     lg: { width: 'lg' }
 *   }}
 * >
 *   Responsive content
 * </Box>
 * 
 * // Semantic article container
 * <Box 
 *   as="article"
 *   padding="xl"
 *   marginY="lg"
 *   display="grid"
 * >
 *   <h2>Article Title</h2>
 *   <p>Article content...</p>
 * </Box>
 * 
 * // Dashboard widget container
 * <Box
 *   padding="md"
 *   margin="sm"
 *   width="full"
 *   height="md"
 *   display="flex"
 *   responsive={{
 *     sm: { width: 'sm', height: 'xs' },
 *     lg: { width: 'lg', height: 'lg' }
 *   }}
 * >
 *   <KPIWidget />
 * </Box>
 * ```
 */
const Box = React.forwardRef<HTMLElement, BoxProps>(
  (
    {
      as = 'div',
      className,
      padding = 'none',
      margin = 'none',
      paddingX,
      paddingY,
      marginX,
      marginY,
      display = 'block',
      width = 'auto',
      height = 'auto',
      responsive,
      responsivePadding,
      responsiveMargin,
      children,
      ...props
    },
    ref
  ) => {
    const responsiveClasses = generateBoxResponsiveClasses(responsive, responsivePadding, responsiveMargin);
    
    const Component = as;
    
    return (
      <Component
        ref={ref as any}
        className={cn(
          boxVariants({ padding, margin, paddingX, paddingY, marginX, marginY, display, width, height }),
          boxClasses.box, // SCSS enhancements (following established pattern)
          responsiveClasses,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';

export { Box, boxVariants, generateBoxResponsiveClasses, sizeValueMap };
export default Box;