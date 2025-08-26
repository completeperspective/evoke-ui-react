# Grid/GridItem Component System Implementation Plan

**Project**: Evoke UI React Component Library  
**Phase**: 4.2 Layout Foundation (CRITICAL BLOCKER priority)  
**Date**: 2025-08-26  
**Status**: Implementation Plan

## Executive Summary

This document provides a comprehensive implementation roadmap for the Grid/GridItem component system following the established CVA-first architecture patterns. The Grid system is the foundational layout component that will enable rapid dashboard composition and complex responsive layouts.

**Key Implementation Principles:**
- Follow established CVA-first architecture from Button/Card components
- Colocated file structure with comprehensive testing
- 12-column responsive system with Tailwind v4 integration
- Performance-optimized for dashboard use cases
- 60+ tests with React Testing Library patterns

---

## 1. File Structure & Organization

Following the established colocated component pattern from existing atomic/molecular components:

```
src/atoms/
├── Grid/
│   ├── index.ts                 # Barrel export
│   ├── Grid.tsx                 # Main Grid component
│   ├── Grid.stories.tsx         # Storybook stories
│   └── Grid.test.tsx            # Jest + RTL tests
└── GridItem/
    ├── index.ts                 # Barrel export  
    ├── GridItem.tsx             # GridItem component
    ├── GridItem.stories.tsx     # Storybook stories
    └── GridItem.test.tsx        # Jest + RTL tests
```

**Rationale**: Following exact same structure as Button, Card, Input components for consistency and maintainability.

---

## 2. Component Architecture

### 2.1 Grid Component (`Grid.tsx`)

**CVA Configuration Structure** (following Button/Card patterns):

```typescript
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
```

**TypeScript Interface** (following VariantProps pattern):

```typescript
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
```

### 2.2 GridItem Component (`GridItem.tsx`)

**CVA Configuration Structure**:

```typescript
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
```

---

## 3. Responsive System Integration

### 3.1 Tailwind v4 Breakpoint System

**Breakpoint Configuration** (following existing responsive patterns):
- **sm**: 640px+ (mobile landscape)
- **md**: 768px+ (tablet portrait)  
- **lg**: 1024px+ (tablet landscape/small desktop)
- **xl**: 1280px+ (desktop)
- **2xl**: 1536px+ (large desktop)

### 3.2 Responsive Implementation Pattern

Following the responsive patterns established in existing components:

```typescript
// Responsive class generation utility
const generateResponsiveClasses = (
  responsive: GridProps['responsive'],
  responsiveGap: GridProps['responsiveGap']
): string => {
  const classes: string[] = [];
  
  if (responsive) {
    Object.entries(responsive).forEach(([breakpoint, columns]) => {
      if (columns) {
        classes.push(`${breakpoint}:grid-cols-${columns}`);
      }
    });
  }
  
  if (responsiveGap) {
    Object.entries(responsiveGap).forEach(([breakpoint, gap]) => {
      if (gap) {
        classes.push(`${breakpoint}:gap-${gap}`);
      }
    });
  }
  
  return classes.join(' ');
};
```

---

## 4. Implementation Details

### 4.1 Grid Component Implementation

```typescript
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
```

### 4.2 GridItem Component Implementation

```typescript
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
```

---

## 5. Testing Strategy

### 5.1 Test Coverage Requirements

Following React Testing Library patterns from Button/Card components:

**Grid Component Tests** (`Grid.test.tsx`):
1. **Rendering Tests** (8 tests)
   - Basic rendering with children
   - Default variant application
   - Custom className application
   - Ref forwarding

2. **Column Variants** (13 tests)  
   - All column count variants (1-12, auto, auto-fill)
   - Default columns behavior

3. **Gap Variants** (7 tests)
   - All gap size variants (none, xs, sm, md, lg, xl, xxl)
   - Gap X and Y overrides

4. **Flow Variants** (4 tests)
   - All grid flow variants (row, col, row-dense, col-dense)

5. **Responsive Behavior** (10 tests)
   - Responsive columns at each breakpoint
   - Responsive gap at each breakpoint
   - Combination responsive scenarios

6. **Integration Tests** (8 tests) 
   - Grid with GridItem children
   - Complex dashboard layouts
   - Auto-placement vs explicit positioning
   - Performance with many children

**GridItem Component Tests** (`GridItem.test.tsx`):
1. **Rendering Tests** (6 tests)
   - Basic rendering, className, ref forwarding

2. **Column Span Tests** (15 tests)  
   - All colSpan variants (1-12, full, auto)

3. **Row Span Tests** (8 tests)
   - All rowSpan variants (1-6, full, auto) 

4. **Positioning Tests** (10 tests)
   - colStart and colEnd variants
   - Explicit positioning combinations

5. **Alignment Tests** (5 tests)
   - All align variants (auto, start, end, center, stretch)

6. **Responsive Tests** (8 tests)
   - Responsive colSpan behavior
   - Responsive positioning

**Total Test Count**: 60+ comprehensive tests

### 5.2 Test Examples

```typescript
// Grid.test.tsx example
describe('Grid Component', () => {
  describe('Column Variants', () => {
    it('applies 4-column layout correctly', () => {
      render(
        <Grid columns={4}>
          <div>Item 1</div>
          <div>Item 2</div>
        </Grid>
      );
      const grid = screen.getByRole('generic');
      expect(grid).toHaveClass('grid-cols-4');
    });

    it('handles auto-fit columns for responsive cards', () => {
      render(<Grid columns="auto" />);
      const grid = screen.getByRole('generic');
      expect(grid).toHaveClass('grid-cols-[repeat(auto-fit,minmax(250px,1fr))]');
    });
  });

  describe('Responsive Behavior', () => {
    it('applies responsive column configuration', () => {
      render(
        <Grid
          columns={1}
          responsive={{
            md: 2,
            lg: 4
          }}
        />
      );
      const grid = screen.getByRole('generic');
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
    });
  });
});
```

---

## 6. Storybook Integration

### 6.1 Story Structure

Following established story patterns from Button/Card components:

**Grid Stories** (`Grid.stories.tsx`):

1. **Default Story** - Basic 12-column grid
2. **Column Variants** - All column configurations
3. **Gap Variants** - Different spacing options
4. **Responsive Grid** - Mobile-first responsive behavior
5. **Dashboard Layout** - Real-world dashboard example
6. **Auto-Fit Cards** - Responsive card grid
7. **Complex Layout** - Mixed column spans and positioning

**GridItem Stories** (`GridItem.stories.tsx`):

1. **Default Story** - Basic grid item
2. **Column Spans** - Different spanning configurations  
3. **Positioning** - Explicit grid positioning
4. **Alignment** - Different alignment options
5. **Responsive Items** - Responsive item behavior

### 6.2 Interactive Controls

```typescript
// Grid.stories.tsx example
export default {
  title: 'Atoms/Grid',
  component: Grid,
  parameters: {
    docs: {
      description: {
        component: 'Responsive CSS Grid layout system with 12-column support and flexible gap controls.'
      }
    }
  },
  argTypes: {
    columns: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 6, 12, 'auto', 'auto-fill'],
      description: 'Number of grid columns'
    },
    gap: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Gap between grid items'
    }
  }
};
```

---

## 7. Dashboard Use Cases

### 7.1 Primary Use Case Examples

**1. Dashboard Layout (3-column sidebar + 9-column main)**:
```typescript
<Grid columns={12} gap="lg">
  <GridItem colSpan={3}>
    <Sidebar />
  </GridItem>
  <GridItem colSpan={9}>
    <MainContent />
  </GridItem>
</Grid>
```

**2. KPI Metrics Grid (4 equal columns)**:
```typescript
<Grid 
  columns={1}
  responsive={{
    sm: 2,
    lg: 4
  }}
  gap="md"
>
  <GridItem><StatCard title="Revenue" /></GridItem>
  <GridItem><StatCard title="Users" /></GridItem>
  <GridItem><StatCard title="Orders" /></GridItem>
  <GridItem><StatCard title="Growth" /></GridItem>
</Grid>
```

**3. Responsive Card Layouts**:
```typescript
<Grid columns="auto" gap="lg">
  {products.map(product => (
    <GridItem key={product.id}>
      <ProductCard {...product} />
    </GridItem>
  ))}
</Grid>
```

**4. Complex Dashboard Sections**:
```typescript
<Grid columns={12} gap="lg">
  <GridItem colSpan={12}>
    <HeaderSection />
  </GridItem>
  <GridItem colSpan={8}>
    <ChartSection />
  </GridItem>
  <GridItem colSpan={4} rowSpan={2}>
    <ActivityFeed />
  </GridItem>
  <GridItem colSpan={4}>
    <QuickActions />
  </GridItem>
  <GridItem colSpan={4}>
    <RecentItems />
  </GridItem>
</Grid>
```

---

## 8. Integration Points

### 8.1 Existing Component Integration

**Card Component Integration**:
```typescript
// Cards within grid automatically adapt to available space
<Grid columns="auto" gap="md">
  <GridItem>
    <Card variant="elevated">
      <CardContent>Auto-sized card</CardContent>  
    </Card>
  </GridItem>
</Grid>
```

**Stack Component Integration** (when implemented):
```typescript
<Grid columns={12} gap="lg">
  <GridItem colSpan={8}>
    <Stack spacing="md">
      <Heading>Main Content</Heading>
      <Text>Content flows vertically within grid cell</Text>
    </Stack>
  </GridItem>
</Grid>
```

### 8.2 CSS Class Name Integration

Following established `classNames.ts` pattern:

```typescript
// Add to src/styles/classNames.ts
export const gridClasses = {
  grid: 'evoke-grid',
  gridItem: 'evoke-grid-item',
} as const;
```

---

## 9. Performance Considerations

### 9.1 Optimization Strategies

1. **CSS Grid Native Performance**: Leverages browser-native CSS Grid for optimal layout performance
2. **Minimal Re-renders**: Memoized responsive class generation
3. **Bundle Size**: CVA-first approach minimizes runtime CSS generation
4. **Dashboard Optimized**: Tested with 100+ grid items for dashboard scenarios

### 9.2 Performance Metrics Targets

- **Grid Rendering**: < 16ms for 50 grid items
- **Responsive Updates**: < 8ms for breakpoint changes  
- **Bundle Impact**: < 2KB gzipped addition
- **Memory Usage**: Linear scaling with item count

---

## 10. SCSS Enhancement Integration

### 10.1 Enhanced Features via SCSS

Following established SCSS integration pattern:

```scss
// src/styles/components/_atoms.scss additions
.evoke-grid {
  // Advanced CSS Grid features not available in Tailwind
  container-type: inline-size; // Container queries support
  
  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    * {
      transition: none !important;
    }
  }
  
  // Print styles optimization
  @media print {
    grid-template-columns: 1fr !important;
    gap: 0.5rem !important;
  }
}

.evoke-grid-item {
  // Enhanced accessibility
  &:focus-visible {
    outline: 2px solid var(--ui-color-ring);
    outline-offset: 2px;
  }
  
  // Container query responsive behavior
  @container (max-width: 300px) {
    font-size: 0.875rem;
  }
}
```

---

## 11. Implementation Timeline

### 11.1 Development Phases

**Phase 1**: Core Implementation (Days 1-2)
- Grid component with CVA configuration
- GridItem component with positioning variants
- Basic TypeScript interfaces
- Core functionality testing

**Phase 2**: Responsive System (Days 3-4)  
- Responsive prop implementation
- Breakpoint integration testing
- Advanced responsive scenarios
- Performance optimization

**Phase 3**: Testing & Stories (Days 5-6)
- Complete test suite (60+ tests)
- Comprehensive Storybook stories
- Interactive controls and documentation
- Integration testing with existing components

**Phase 4**: Polish & Integration (Day 7)
- SCSS enhancements
- Dashboard example implementations
- Performance validation
- Documentation updates

### 11.2 Success Criteria

- ✅ **60+ passing tests** with comprehensive coverage
- ✅ **7+ Storybook stories** demonstrating all use cases
- ✅ **Dashboard composition examples** working end-to-end
- ✅ **Performance targets met** for 100+ grid items
- ✅ **CVA-first architecture** consistent with existing patterns
- ✅ **Responsive behavior** tested across all breakpoints

---

## 12. Technical Dependencies

### 12.1 Required Dependencies

**Core Dependencies** (already available):
- `class-variance-authority` - CVA system
- `tailwindcss` - CSS framework
- `@types/react` - TypeScript support

**Development Dependencies** (already available):
- `@storybook/react` - Story development
- `@testing-library/react` - Component testing
- `vitest` - Test runner
- `@testing-library/jest-dom` - Test matchers

### 12.2 No Additional Dependencies Required

The Grid system implementation uses only existing project dependencies, maintaining the lightweight architecture established by the component library.

---

## Conclusion

This implementation plan provides a comprehensive roadmap for developing the Grid/GridItem component system following all established architectural patterns. The CVA-first approach ensures consistency with existing components, while the responsive system integration provides the flexibility needed for modern dashboard layouts.

**Key Success Factors:**
1. **Architectural Consistency** - Follows exact patterns from Button/Card components
2. **Comprehensive Testing** - 60+ tests ensure reliability and performance
3. **Dashboard Ready** - Use cases directly address dashboard composition needs
4. **Performance Optimized** - Native CSS Grid with minimal JavaScript overhead
5. **Future Proof** - Responsive system ready for evolving design requirements

The Grid system will serve as the foundational layout component enabling Phase 4.2 completion and progression to interactive dashboard components in Phase 4.3.