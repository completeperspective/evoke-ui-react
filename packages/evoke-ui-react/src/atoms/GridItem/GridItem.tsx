import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { gridClasses } from '../../styles/classNames';

/**
 * GridItem variants using class-variance-authority
 * Positioning, spanning, and alignment controls for grid items
 */
const gridItemVariants = cva(
  // Base styles - positioning and sizing
  'relative',
  {
    variants: {
      // Column span variants
      colSpan: {
        1: 'col-span-1',
        2: 'col-span-2',
        3: 'col-span-3',
        4: 'col-span-4',
        5: 'col-span-5',
        6: 'col-span-6',
        7: 'col-span-7',
        8: 'col-span-8',
        9: 'col-span-9',
        10: 'col-span-10',
        11: 'col-span-11',
        12: 'col-span-12',
        full: 'col-span-full',
        auto: 'col-auto'
      },
      // Row span variants
      rowSpan: {
        1: 'row-span-1',
        2: 'row-span-2',
        3: 'row-span-3',
        4: 'row-span-4',
        5: 'row-span-5',
        6: 'row-span-6',
        full: 'row-span-full',
        auto: 'row-auto'
      },
      // Column start position
      colStart: {
        1: 'col-start-1',
        2: 'col-start-2',
        3: 'col-start-3',
        4: 'col-start-4',
        5: 'col-start-5',
        6: 'col-start-6',
        7: 'col-start-7',
        8: 'col-start-8',
        9: 'col-start-9',
        10: 'col-start-10',
        11: 'col-start-11',
        12: 'col-start-12',
        13: 'col-start-13',
        auto: 'col-start-auto'
      },
      // Column end position
      colEnd: {
        1: 'col-end-1',
        2: 'col-end-2',
        3: 'col-end-3',
        4: 'col-end-4',
        5: 'col-end-5',
        6: 'col-end-6',
        7: 'col-end-7',
        8: 'col-end-8',
        9: 'col-end-9',
        10: 'col-end-10',
        11: 'col-end-11',
        12: 'col-end-12',
        13: 'col-end-13',
        auto: 'col-end-auto'
      },
      // Alignment within grid cell
      align: {
        auto: 'justify-self-auto align-self-auto',
        start: 'justify-self-start align-self-start',
        end: 'justify-self-end align-self-end',
        center: 'justify-self-center align-self-center',
        stretch: 'justify-self-stretch align-self-stretch'
      }
    },
    defaultVariants: {
      colSpan: 'auto',
      rowSpan: 'auto',
      align: 'auto'
    }
  }
);

/**
 * Responsive class generation utility for GridItem
 * Generates responsive grid item classes based on breakpoint configuration
 */
const generateGridItemResponsiveClasses = (
  responsive?: GridItemProps['responsive']
): string => {
  const classes: string[] = [];
  
  if (responsive) {
    Object.entries(responsive).forEach(([breakpoint, config]) => {
      if (config) {
        if (config.colSpan) {
          if (config.colSpan === 'full') {
            classes.push(`${breakpoint}:col-span-full`);
          } else if (config.colSpan === 'auto') {
            classes.push(`${breakpoint}:col-auto`);
          } else {
            classes.push(`${breakpoint}:col-span-${config.colSpan}`);
          }
        }
        if (config.rowSpan) {
          if (config.rowSpan === 'full') {
            classes.push(`${breakpoint}:row-span-full`);
          } else if (config.rowSpan === 'auto') {
            classes.push(`${breakpoint}:row-auto`);
          } else {
            classes.push(`${breakpoint}:row-span-${config.rowSpan}`);
          }
        }
        if (config.colStart) {
          classes.push(`${breakpoint}:col-start-${config.colStart}`);
        }
        if (config.colEnd) {
          classes.push(`${breakpoint}:col-end-${config.colEnd}`);
        }
        if (config.align) {
          const alignClasses = {
            auto: `${breakpoint}:justify-self-auto ${breakpoint}:align-self-auto`,
            start: `${breakpoint}:justify-self-start ${breakpoint}:align-self-start`,
            end: `${breakpoint}:justify-self-end ${breakpoint}:align-self-end`,
            center: `${breakpoint}:justify-self-center ${breakpoint}:align-self-center`,
            stretch: `${breakpoint}:justify-self-stretch ${breakpoint}:align-self-stretch`
          };
          classes.push(alignClasses[config.align]);
        }
      }
    });
  }
  
  return classes.join(' ');
};

export interface GridItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridItemVariants> {
  /** Responsive configuration for different breakpoints */
  responsive?: {
    sm?: {
      colSpan?: VariantProps<typeof gridItemVariants>['colSpan'];
      rowSpan?: VariantProps<typeof gridItemVariants>['rowSpan'];
      colStart?: VariantProps<typeof gridItemVariants>['colStart'];
      colEnd?: VariantProps<typeof gridItemVariants>['colEnd'];
      align?: VariantProps<typeof gridItemVariants>['align'];
    };
    md?: {
      colSpan?: VariantProps<typeof gridItemVariants>['colSpan'];
      rowSpan?: VariantProps<typeof gridItemVariants>['rowSpan'];
      colStart?: VariantProps<typeof gridItemVariants>['colStart'];
      colEnd?: VariantProps<typeof gridItemVariants>['colEnd'];
      align?: VariantProps<typeof gridItemVariants>['align'];
    };
    lg?: {
      colSpan?: VariantProps<typeof gridItemVariants>['colSpan'];
      rowSpan?: VariantProps<typeof gridItemVariants>['rowSpan'];
      colStart?: VariantProps<typeof gridItemVariants>['colStart'];
      colEnd?: VariantProps<typeof gridItemVariants>['colEnd'];
      align?: VariantProps<typeof gridItemVariants>['align'];
    };
    xl?: {
      colSpan?: VariantProps<typeof gridItemVariants>['colSpan'];
      rowSpan?: VariantProps<typeof gridItemVariants>['rowSpan'];
      colStart?: VariantProps<typeof gridItemVariants>['colStart'];
      colEnd?: VariantProps<typeof gridItemVariants>['colEnd'];
      align?: VariantProps<typeof gridItemVariants>['align'];
    };
    '2xl'?: {
      colSpan?: VariantProps<typeof gridItemVariants>['colSpan'];
      rowSpan?: VariantProps<typeof gridItemVariants>['rowSpan'];
      colStart?: VariantProps<typeof gridItemVariants>['colStart'];
      colEnd?: VariantProps<typeof gridItemVariants>['colEnd'];
      align?: VariantProps<typeof gridItemVariants>['align'];
    };
  };
}

/**
 * GridItem - Grid item with positioning and alignment controls
 * 
 * A flexible grid item component that provides precise control over positioning,
 * spanning, and alignment within CSS Grid layouts. Includes responsive support
 * for dashboard composition patterns.
 * 
 * @example
 * ```tsx
 * // Basic grid item spanning 6 columns
 * <GridItem colSpan={6}>
 *   <Card>Half-width content</Card>
 * </GridItem>
 * 
 * // Responsive grid item
 * <GridItem 
 *   colSpan={12}
 *   responsive={{
 *     md: { colSpan: 6 },
 *     lg: { colSpan: 4 }
 *   }}
 * >
 *   <StatCard title="Revenue" />
 * </GridItem>
 * 
 * // Positioned grid item
 * <GridItem 
 *   colSpan={4} 
 *   colStart={3}
 *   rowSpan={2}
 *   align="center"
 * >
 *   <FeaturedContent />
 * </GridItem>
 * 
 * // Full-width header
 * <GridItem colSpan="full">
 *   <Header />
 * </GridItem>
 * 
 * // Auto-sized sidebar
 * <GridItem colSpan="auto" rowSpan="full">
 *   <Sidebar />
 * </GridItem>
 * ```
 */
const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      className,
      colSpan = 'auto',
      rowSpan = 'auto',
      colStart,
      colEnd,
      align = 'auto',
      responsive,
      children,
      ...props
    },
    ref
  ) => {
    const responsiveClasses = generateGridItemResponsiveClasses(responsive);
    
    return (
      <div
        ref={ref}
        className={cn(
          gridItemVariants({ colSpan, rowSpan, colStart, colEnd, align }),
          gridClasses.gridItem, // SCSS enhancements
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

GridItem.displayName = 'GridItem';

export { GridItem, gridItemVariants, generateGridItemResponsiveClasses };
export default GridItem;
