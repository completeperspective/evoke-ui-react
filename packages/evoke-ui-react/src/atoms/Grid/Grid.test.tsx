import { render, screen } from '@testing-library/react';
import { Grid } from './Grid';

describe('Grid Component', () => {
  describe('Rendering', () => {
    it('renders with children', () => {
      render(
        <Grid data-testid="grid">
          <div>Child 1</div>
          <div>Child 2</div>
        </Grid>
      );
      
      const grid = screen.getByTestId('grid');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveTextContent('Child 1');
      expect(grid).toHaveTextContent('Child 2');
    });

    it('applies default classes', () => {
      render(<Grid data-testid="grid" />);
      const grid = screen.getByTestId('grid');
      
      expect(grid).toHaveClass('grid', 'w-full', 'grid-cols-12', 'gap-4', 'grid-flow-row', 'evoke-grid');
    });

    it('applies custom className', () => {
      render(<Grid className="custom-class" data-testid="grid" />);
      const grid = screen.getByTestId('grid');
      
      expect(grid).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<Grid ref={ref} data-testid="grid" />);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('grid');
    });
  });

  describe('Column Variants', () => {
    it('applies 1-column layout', () => {
      render(<Grid columns={1} data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-1');
    });

    it('applies 2-column layout', () => {
      render(<Grid columns={2} data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-2');
    });

    it('applies 3-column layout', () => {
      render(<Grid columns={3} data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-3');
    });

    it('applies 4-column layout', () => {
      render(<Grid columns={4} data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-4');
    });

    it('applies 5-column layout', () => {
      render(<Grid columns={5} data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-5');
    });

    it('applies 6-column layout', () => {
      render(<Grid columns={6} data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-6');
    });

    it('applies 7-column layout', () => {
      render(<Grid columns={7} data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-7');
    });

    it('applies 8-column layout', () => {
      render(<Grid columns={8} data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-8');
    });

    it('applies 9-column layout', () => {
      render(<Grid columns={9} data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-9');
    });

    it('applies 10-column layout', () => {
      render(<Grid columns={10} data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-10');
    });

    it('applies 11-column layout', () => {
      render(<Grid columns={11} data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-11');
    });

    it('applies 12-column layout (default)', () => {
      render(<Grid columns={12} data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-12');
    });

    it('applies auto-fit columns', () => {
      render(<Grid columns="auto" data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-[repeat(auto-fit,minmax(250px,1fr))]');
    });

    it('applies auto-fill columns', () => {
      render(<Grid columns="auto-fill" data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('grid-cols-[repeat(auto-fill,minmax(250px,1fr))]');
    });
  });

  describe('Gap Variants', () => {
    it('applies no gap', () => {
      render(<Grid gap="none" data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('gap-0');
    });

    it('applies xs gap', () => {
      render(<Grid gap="xs" data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('gap-1');
    });

    it('applies sm gap', () => {
      render(<Grid gap="sm" data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('gap-2');
    });

    it('applies md gap (default)', () => {
      render(<Grid gap="md" data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('gap-4');
    });

    it('applies lg gap', () => {
      render(<Grid gap="lg" data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('gap-6');
    });

    it('applies xl gap', () => {
      render(<Grid gap="xl" data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('gap-8');
    });

    it('applies xxl gap', () => {
      render(<Grid gap="xxl" data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('gap-12');
    });

    it('applies gapX override', () => {
      render(<Grid gapX="lg" data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('gap-x-6');
    });

    it('applies gapY override', () => {
      render(<Grid gapY="xl" data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('gap-y-8');
    });
  });

  describe('Flow Variants', () => {
    it('applies row flow (default)', () => {
      render(<Grid flow="row" data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('grid-flow-row');
    });

    it('applies column flow', () => {
      render(<Grid flow="col" data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('grid-flow-col');
    });

    it('applies row-dense flow', () => {
      render(<Grid flow="row-dense" data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('grid-flow-row-dense');
    });

    it('applies col-dense flow', () => {
      render(<Grid flow="col-dense" data-testid="grid" />);
      expect(screen.getByTestId('grid')).toHaveClass('grid-flow-col-dense');
    });
  });

  describe('Responsive Behavior', () => {
    it('applies responsive columns configuration', () => {
      render(
        <Grid
          columns={1}
          responsive={{
            sm: 2,
            md: 4,
            lg: 6,
            xl: 8,
            '2xl': 12
          }}
          data-testid="grid"
        />
      );
      
      const grid = screen.getByTestId('grid');
      expect(grid).toHaveClass(
        'grid-cols-1',
        'sm:grid-cols-2',
        'md:grid-cols-4',
        'lg:grid-cols-6',
        'xl:grid-cols-8',
        '2xl:grid-cols-12'
      );
    });

    it('applies responsive auto columns', () => {
      render(
        <Grid
          columns={1}
          responsive={{
            md: 'auto',
            lg: 'auto-fill'
          }}
          data-testid="grid"
        />
      );
      
      const grid = screen.getByTestId('grid');
      expect(grid).toHaveClass(
        'grid-cols-1',
        'md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]',
        'lg:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]'
      );
    });

    it('applies responsive gap configuration', () => {
      render(
        <Grid
          gap="xs"
          responsiveGap={{
            sm: 'sm',
            md: 'md',
            lg: 'lg',
            xl: 'xl',
            '2xl': 'xxl'
          }}
          data-testid="grid"
        />
      );
      
      const grid = screen.getByTestId('grid');
      expect(grid).toHaveClass(
        'gap-1',
        'sm:gap-2',
        'md:gap-4',
        'lg:gap-6',
        'xl:gap-8',
        '2xl:gap-12'
      );
    });

    it('applies partial responsive configuration', () => {
      render(
        <Grid
          columns={1}
          responsive={{
            md: 2,
            xl: 4
          }}
          data-testid="grid"
        />
      );
      
      const grid = screen.getByTestId('grid');
      expect(grid).toHaveClass(
        'grid-cols-1',
        'md:grid-cols-2',
        'xl:grid-cols-4'
      );
      
      // Should not have other breakpoints
      expect(grid).not.toHaveClass(
        'sm:grid-cols-2',
        'lg:grid-cols-4',
        '2xl:grid-cols-4'
      );
    });
  });

  describe('Integration Tests', () => {
    it('works with multiple grid items', () => {
      render(
        <Grid columns={3} gap="md" data-testid="grid">
          <div data-testid="item-1">Item 1</div>
          <div data-testid="item-2">Item 2</div>
          <div data-testid="item-3">Item 3</div>
          <div data-testid="item-4">Item 4</div>
        </Grid>
      );
      
      const grid = screen.getByTestId('grid');
      expect(grid).toHaveClass('grid-cols-3', 'gap-4');
      
      // All items should be rendered
      expect(screen.getByTestId('item-1')).toBeInTheDocument();
      expect(screen.getByTestId('item-2')).toBeInTheDocument();
      expect(screen.getByTestId('item-3')).toBeInTheDocument();
      expect(screen.getByTestId('item-4')).toBeInTheDocument();
    });

    it('combines all variant props correctly', () => {
      render(
        <Grid
          columns={6}
          gap="lg"
          gapX="xl"
          gapY="sm"
          flow="col-dense"
          responsive={{ md: 8, lg: 12 }}
          responsiveGap={{ md: 'xl', lg: 'xxl' }}
          className="custom-grid"
          data-testid="grid"
        />
      );
      
      const grid = screen.getByTestId('grid');
      expect(grid).toHaveClass(
        // Base grid classes
        'grid',
        'w-full',
        'evoke-grid',
        
        // Column configuration
        'grid-cols-6',
        'md:grid-cols-8',
        'lg:grid-cols-12',
        
        // Gap configuration
        'gap-6',        // base gap lg
        'gap-x-8',      // gapX xl
        'gap-y-2',      // gapY sm
        'md:gap-8',     // responsive gap xl
        'lg:gap-12',    // responsive gap xxl
        
        // Flow configuration
        'grid-flow-col-dense',
        
        // Custom class
        'custom-grid'
      );
    });

    it('handles dashboard layout pattern', () => {
      render(
        <Grid 
          columns={12} 
          gap="lg"
          responsive={{
            sm: 1,
            lg: 12
          }}
          data-testid="dashboard-grid"
        >
          <div data-testid="sidebar">Sidebar</div>
          <div data-testid="main">Main Content</div>
          <div data-testid="widget">Widget</div>
        </Grid>
      );
      
      const grid = screen.getByTestId('dashboard-grid');
      expect(grid).toHaveClass(
        'grid-cols-12',
        'gap-6',
        'sm:grid-cols-1',
        'lg:grid-cols-12'
      );
      
      // Dashboard sections should be present
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('main')).toBeInTheDocument();
      expect(screen.getByTestId('widget')).toBeInTheDocument();
    });

    it('handles auto-fit responsive card layout', () => {
      render(
        <Grid 
          columns={1}
          responsive={{
            sm: 2,
            lg: 'auto'
          }}
          gap="md"
          data-testid="card-grid"
        >
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} data-testid={`card-${i}`}>
              Card {i + 1}
            </div>
          ))}
        </Grid>
      );
      
      const grid = screen.getByTestId('card-grid');
      expect(grid).toHaveClass(
        'grid-cols-1',
        'sm:grid-cols-2',
        'lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]',
        'gap-4'
      );
      
      // All cards should be rendered
      for (let i = 0; i < 6; i++) {
        expect(screen.getByTestId(`card-${i}`)).toBeInTheDocument();
      }
    });
  });

  describe('Performance Tests', () => {
    it('renders efficiently with many children', () => {
      const startTime = performance.now();
      
      render(
        <Grid columns={4} gap="md" data-testid="performance-grid">
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i} data-testid={`perf-item-${i}`}>
              Item {i + 1}
            </div>
          ))}
        </Grid>
      );
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render 100 items in reasonable time (< 50ms)
      expect(renderTime).toBeLessThan(50);
      
      // Grid should be rendered
      const grid = screen.getByTestId('performance-grid');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('grid-cols-4', 'gap-4');
      
      // First and last items should be present
      expect(screen.getByTestId('perf-item-0')).toBeInTheDocument();
      expect(screen.getByTestId('perf-item-99')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper semantics', () => {
      render(
        <Grid role="grid" aria-label="Dashboard layout" data-testid="grid">
          <div>Content</div>
        </Grid>
      );
      
      const grid = screen.getByTestId('grid');
      expect(grid).toHaveAttribute('role', 'grid');
      expect(grid).toHaveAttribute('aria-label', 'Dashboard layout');
    });

    it('supports custom ARIA attributes', () => {
      render(
        <Grid 
          aria-describedby="grid-help"
          aria-labelledby="grid-title"
          data-testid="grid"
        >
          <div>Content</div>
        </Grid>
      );
      
      const grid = screen.getByTestId('grid');
      expect(grid).toHaveAttribute('aria-describedby', 'grid-help');
      expect(grid).toHaveAttribute('aria-labelledby', 'grid-title');
    });
  });
});
