import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { gridClasses } from '../../styles/classNames';

/**
 * Grid variants using class-variance-authority
 * Responsive CSS Grid system with 12-column support and flexible gap controls
 */
const gridVariants = cva(
  // Base styles - display grid, responsive behavior
  'grid w-full',
  {
    variants: {
      // Column count variants (1-12 column system)
      columns: {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        7: 'grid-cols-7',
        8: 'grid-cols-8',
        9: 'grid-cols-9',
        10: 'grid-cols-10',
        11: 'grid-cols-11',
        12: 'grid-cols-12',
        auto: 'grid-cols-[repeat(auto-fit,minmax(250px,1fr))]',
        'auto-fill': 'grid-cols-[repeat(auto-fill,minmax(250px,1fr))]'
      },
      // Gap spacing variants using design tokens
      gap: {
        none: 'gap-0',
        xs: 'gap-1',     // 4px
        sm: 'gap-2',     // 8px
        md: 'gap-4',     // 16px
        lg: 'gap-6',     // 24px
        xl: 'gap-8',     // 32px
        xxl: 'gap-12',   // 48px
      },
      // Row gap override
      gapY: {
        none: 'gap-y-0',
        xs: 'gap-y-1',
        sm: 'gap-y-2',
        md: 'gap-y-4',
        lg: 'gap-y-6',
        xl: 'gap-y-8',
        xxl: 'gap-y-12',
      },
      // Column gap override
      gapX: {
        none: 'gap-x-0',
        xs: 'gap-x-1',
        sm: 'gap-x-2',
        md: 'gap-x-4',
        lg: 'gap-x-6',
        xl: 'gap-x-8',
        xxl: 'gap-x-12',
      },
      // Auto-flow behavior
      flow: {
        row: 'grid-flow-row',
        col: 'grid-flow-col',
        'row-dense': 'grid-flow-row-dense',
        'col-dense': 'grid-flow-col-dense',
      }
    },
    compoundVariants: [
      // Responsive breakpoint combinations will be handled via responsive props
    ],
    defaultVariants: {
      columns: 12,
      gap: 'md',
      flow: 'row'
    }
  }
);

/**
 * Gap value mapping to Tailwind classes
 */
const gapValueMap = {
  none: '0',
  xs: '1',
  sm: '2',
  md: '4',
  lg: '6',
  xl: '8',
  xxl: '12'
} as const;

/**
 * Responsive class generation utility
 * Generates responsive grid classes based on breakpoint configuration
 */
const generateResponsiveClasses = (
  responsive?: GridProps['responsive'],
  responsiveGap?: GridProps['responsiveGap']
): string => {
  const classes: string[] = [];
  
  if (responsive) {
    Object.entries(responsive).forEach(([breakpoint, columns]) => {
      if (columns) {
        if (columns === 'auto') {
          classes.push(`${breakpoint}:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]`);
        } else if (columns === 'auto-fill') {
          classes.push(`${breakpoint}:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]`);
        } else {
          classes.push(`${breakpoint}:grid-cols-${columns}`);
        }
      }
    });
  }
  
  if (responsiveGap) {
    Object.entries(responsiveGap).forEach(([breakpoint, gap]) => {
      if (gap && gap in gapValueMap) {
        const gapValue = gapValueMap[gap as keyof typeof gapValueMap];
        classes.push(`${breakpoint}:gap-${gapValue}`);
      }
    });
  }
  
  return classes.join(' ');
};

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  /** Responsive column configuration */
  responsive?: {
    sm?: VariantProps<typeof gridVariants>['columns'];
    md?: VariantProps<typeof gridVariants>['columns'];
    lg?: VariantProps<typeof gridVariants>['columns'];
    xl?: VariantProps<typeof gridVariants>['columns'];
    '2xl'?: VariantProps<typeof gridVariants>['columns'];
  };
  /** Responsive gap configuration */
  responsiveGap?: {
    sm?: VariantProps<typeof gridVariants>['gap'];
    md?: VariantProps<typeof gridVariants>['gap'];
    lg?: VariantProps<typeof gridVariants>['gap'];
    xl?: VariantProps<typeof gridVariants>['gap'];
    '2xl'?: VariantProps<typeof gridVariants>['gap'];
  };
}

/**
 * Grid - Responsive CSS Grid layout system
 * 
 * A powerful and flexible grid system built on CSS Grid with 12-column support,
 * responsive breakpoints, and dashboard-ready composition patterns.
 * 
 * @example
 * ```tsx
 * // Basic 12-column grid
 * <Grid columns={12} gap="md">
 *   <GridItem colSpan={6}>Left half</GridItem>
 *   <GridItem colSpan={6}>Right half</GridItem>
 * </Grid>
 * 
 * // Responsive dashboard layout
 * <Grid 
 *   columns={1}
 *   responsive={{
 *     sm: 2,
 *     lg: 4
 *   }}
 *   gap="lg"
 * >
 *   <GridItem>KPI Card 1</GridItem>
 *   <GridItem>KPI Card 2</GridItem>
 *   <GridItem>KPI Card 3</GridItem>
 *   <GridItem>KPI Card 4</GridItem>
 * </Grid>
 * 
 * // Auto-fit card layout
 * <Grid columns="auto" gap="md">
 *   {products.map(product => (
 *     <GridItem key={product.id}>
 *       <ProductCard {...product} />
 *     </GridItem>
 *   ))}
 * </Grid>
 * 
 * // Complex dashboard sections
 * <Grid columns={12} gap="lg">
 *   <GridItem colSpan={8}>
 *     <ChartSection />
 *   </GridItem>
 *   <GridItem colSpan={4} rowSpan={2}>
 *     <ActivityFeed />
 *   </GridItem>
 * </Grid>
 * ```
 */
const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      columns = 12,
      gap = 'md',
      gapX,
      gapY,
      flow = 'row',
      responsive,
      responsiveGap,
      children,
      ...props
    },
    ref
  ) => {
    const responsiveClasses = generateResponsiveClasses(responsive, responsiveGap);
    
    return (
      <div
        ref={ref}
        className={cn(
          gridVariants({ columns, gap, gapX, gapY, flow }),
          gridClasses.grid, // SCSS enhancements (following established pattern)
          responsiveClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

export { Grid, gridVariants, generateResponsiveClasses };
export default Grid;
