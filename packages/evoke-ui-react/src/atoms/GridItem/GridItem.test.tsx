import { render, screen } from '@testing-library/react';
import { GridItem } from './GridItem';

describe('GridItem Component', () => {
  describe('Rendering', () => {
    it('renders with children', () => {
      render(
        <GridItem data-testid="grid-item">
          <div>Child content</div>
        </GridItem>
      );
      
      const gridItem = screen.getByTestId('grid-item');
      expect(gridItem).toBeInTheDocument();
      expect(gridItem).toHaveTextContent('Child content');
    });

    it('applies default classes', () => {
      render(<GridItem data-testid="grid-item" />);
      const gridItem = screen.getByTestId('grid-item');
      
      expect(gridItem).toHaveClass(
        'relative',
        'col-auto',
        'row-auto',
        'justify-self-auto',
        'align-self-auto',
        'evoke-grid-item'
      );
    });

    it('applies custom className', () => {
      render(<GridItem className="custom-item" data-testid="grid-item" />);
      const gridItem = screen.getByTestId('grid-item');
      
      expect(gridItem).toHaveClass('custom-item');
    });

    it('forwards ref correctly', () => {
      const ref = { current: null } as React.RefObject<HTMLDivElement>;
      render(<GridItem ref={ref} data-testid="grid-item" />);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('relative');
    });

    it('passes through HTML props', () => {
      render(
        <GridItem 
          id="test-item"
          title="Grid item"
          data-custom="value"
          data-testid="grid-item"
        />
      );
      
      const gridItem = screen.getByTestId('grid-item');
      expect(gridItem).toHaveAttribute('id', 'test-item');
      expect(gridItem).toHaveAttribute('title', 'Grid item');
      expect(gridItem).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('Column Span Variants', () => {
    it('applies col-span-1', () => {
      render(<GridItem colSpan={1} data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('col-span-1');
    });

    it('applies col-span-2', () => {
      render(<GridItem colSpan={2} data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('col-span-2');
    });

    it('applies col-span-3', () => {
      render(<GridItem colSpan={3} data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('col-span-3');
    });

    it('applies col-span-4', () => {
      render(<GridItem colSpan={4} data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('col-span-4');
    });

    it('applies col-span-5', () => {
      render(<GridItem colSpan={5} data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('col-span-5');
    });

    it('applies col-span-6', () => {
      render(<GridItem colSpan={6} data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('col-span-6');
    });

    it('applies col-span-7', () => {
      render(<GridItem colSpan={7} data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('col-span-7');
    });

    it('applies col-span-8', () => {
      render(<GridItem colSpan={8} data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('col-span-8');
    });

    it('applies col-span-9', () => {
      render(<GridItem colSpan={9} data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('col-span-9');
    });

    it('applies col-span-10', () => {
      render(<GridItem colSpan={10} data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('col-span-10');
    });

    it('applies col-span-11', () => {
      render(<GridItem colSpan={11} data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('col-span-11');
    });

    it('applies col-span-12', () => {
      render(<GridItem colSpan={12} data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('col-span-12');
    });

    it('applies col-span-full', () => {
      render(<GridItem colSpan="full" data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('col-span-full');
    });

    it('applies col-auto (default)', () => {
      render(<GridItem colSpan="auto" data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('col-auto');
    });
  });

  describe('Row Span Variants', () => {
    it('applies row-span-1', () => {
      render(<GridItem rowSpan={1} data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('row-span-1');
    });

    it('applies row-span-2', () => {
      render(<GridItem rowSpan={2} data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('row-span-2');
    });

    it('applies row-span-3', () => {
      render(<GridItem rowSpan={3} data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('row-span-3');
    });

    it('applies row-span-4', () => {
      render(<GridItem rowSpan={4} data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('row-span-4');
    });

    it('applies row-span-5', () => {
      render(<GridItem rowSpan={5} data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('row-span-5');
    });

    it('applies row-span-6', () => {
      render(<GridItem rowSpan={6} data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('row-span-6');
    });

    it('applies row-span-full', () => {
      render(<GridItem rowSpan="full" data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('row-span-full');
    });

    it('applies row-auto (default)', () => {
      render(<GridItem rowSpan="auto" data-testid="grid-item" />);
      expect(screen.getByTestId('grid-item')).toHaveClass('row-auto');
    });
  });

  describe('Positioning Tests', () => {
    describe('Column Start', () => {
      it('applies col-start-1', () => {
        render(<GridItem colStart={1} data-testid="grid-item" />);
        expect(screen.getByTestId('grid-item')).toHaveClass('col-start-1');
      });

      it('applies col-start-6', () => {
        render(<GridItem colStart={6} data-testid="grid-item" />);
        expect(screen.getByTestId('grid-item')).toHaveClass('col-start-6');
      });

      it('applies col-start-12', () => {
        render(<GridItem colStart={12} data-testid="grid-item" />);
        expect(screen.getByTestId('grid-item')).toHaveClass('col-start-12');
      });

      it('applies col-start-13', () => {
        render(<GridItem colStart={13} data-testid="grid-item" />);
        expect(screen.getByTestId('grid-item')).toHaveClass('col-start-13');
      });

      it('applies col-start-auto', () => {
        render(<GridItem colStart="auto" data-testid="grid-item" />);
        expect(screen.getByTestId('grid-item')).toHaveClass('col-start-auto');
      });
    });

    describe('Column End', () => {
      it('applies col-end-1', () => {
        render(<GridItem colEnd={1} data-testid="grid-item" />);
        expect(screen.getByTestId('grid-item')).toHaveClass('col-end-1');
      });

      it('applies col-end-6', () => {
        render(<GridItem colEnd={6} data-testid="grid-item" />);
        expect(screen.getByTestId('grid-item')).toHaveClass('col-end-6');
      });

      it('applies col-end-13', () => {
        render(<GridItem colEnd={13} data-testid="grid-item" />);
        expect(screen.getByTestId('grid-item')).toHaveClass('col-end-13');
      });

      it('applies col-end-auto', () => {
        render(<GridItem colEnd="auto" data-testid="grid-item" />);
        expect(screen.getByTestId('grid-item')).toHaveClass('col-end-auto');
      });
    });

    it('combines explicit positioning', () => {
      render(
        <GridItem 
          colStart={3} 
          colEnd={7} 
          colSpan={2} 
          data-testid="grid-item" 
        />
      );
      
      const gridItem = screen.getByTestId('grid-item');
      expect(gridItem).toHaveClass(
        'col-start-3',
        'col-end-7',
        'col-span-2'
      );
    });
  });

  describe('Alignment Tests', () => {
    it('applies auto alignment (default)', () => {
      render(<GridItem align="auto" data-testid="grid-item" />);
      const gridItem = screen.getByTestId('grid-item');
      expect(gridItem).toHaveClass('justify-self-auto', 'align-self-auto');
    });

    it('applies start alignment', () => {
      render(<GridItem align="start" data-testid="grid-item" />);
      const gridItem = screen.getByTestId('grid-item');
      expect(gridItem).toHaveClass('justify-self-start', 'align-self-start');
    });

    it('applies end alignment', () => {
      render(<GridItem align="end" data-testid="grid-item" />);
      const gridItem = screen.getByTestId('grid-item');
      expect(gridItem).toHaveClass('justify-self-end', 'align-self-end');
    });

    it('applies center alignment', () => {
      render(<GridItem align="center" data-testid="grid-item" />);
      const gridItem = screen.getByTestId('grid-item');
      expect(gridItem).toHaveClass('justify-self-center', 'align-self-center');
    });

    it('applies stretch alignment', () => {
      render(<GridItem align="stretch" data-testid="grid-item" />);
      const gridItem = screen.getByTestId('grid-item');
      expect(gridItem).toHaveClass('justify-self-stretch', 'align-self-stretch');
    });
  });

  describe('Responsive Tests', () => {
    it('applies responsive colSpan configuration', () => {
      render(
        <GridItem
          colSpan={12}
          responsive={{
            sm: { colSpan: 6 },
            md: { colSpan: 4 },
            lg: { colSpan: 3 },
            xl: { colSpan: 2 },
            '2xl': { colSpan: 1 }
          }}
          data-testid="grid-item"
        />
      );
      
      const gridItem = screen.getByTestId('grid-item');
      expect(gridItem).toHaveClass(
        'col-span-12',
        'sm:col-span-6',
        'md:col-span-4',
        'lg:col-span-3',
        'xl:col-span-2',
        '2xl:col-span-1'
      );
    });

    it('applies responsive rowSpan configuration', () => {
      render(
        <GridItem
          rowSpan={1}
          responsive={{
            md: { rowSpan: 2 },
            lg: { rowSpan: 3 }
          }}
          data-testid="grid-item"
        />
      );
      
      const gridItem = screen.getByTestId('grid-item');
      expect(gridItem).toHaveClass(
        'row-span-1',
        'md:row-span-2',
        'lg:row-span-3'
      );
    });

    it('applies responsive positioning', () => {
      render(
        <GridItem
          colStart={1}
          responsive={{
            md: { colStart: 2, colEnd: 6 },
            lg: { colStart: 3, colEnd: 9 }
          }}
          data-testid="grid-item"
        />
      );
      
      const gridItem = screen.getByTestId('grid-item');
      expect(gridItem).toHaveClass(
        'col-start-1',
        'md:col-start-2',
        'md:col-end-6',
        'lg:col-start-3',
        'lg:col-end-9'
      );
    });

    it('applies responsive alignment', () => {
      render(
        <GridItem
          align="start"
          responsive={{
            md: { align: 'center' },
            lg: { align: 'end' }
          }}
          data-testid="grid-item"
        />
      );
      
      const gridItem = screen.getByTestId('grid-item');
      expect(gridItem).toHaveClass(
        'justify-self-start',
        'align-self-start',
        'md:justify-self-center',
        'md:align-self-center',
        'lg:justify-self-end',
        'lg:align-self-end'
      );
    });

    it('applies complex responsive configuration', () => {
      render(
        <GridItem
          colSpan={12}
          rowSpan={1}
          align="start"
          responsive={{
            md: {
              colSpan: 6,
              rowSpan: 2,
              colStart: 4,
              align: 'center'
            },
            lg: {
              colSpan: 4,
              rowSpan: 3,
              colStart: 5,
              colEnd: 9,
              align: 'stretch'
            }
          }}
          data-testid="grid-item"
        />
      );
      
      const gridItem = screen.getByTestId('grid-item');
      expect(gridItem).toHaveClass(
        // Base configuration
        'col-span-12',
        'row-span-1',
        'justify-self-start',
        'align-self-start',
        
        // md breakpoint
        'md:col-span-6',
        'md:row-span-2',
        'md:col-start-4',
        'md:justify-self-center',
        'md:align-self-center',
        
        // lg breakpoint
        'lg:col-span-4',
        'lg:row-span-3',
        'lg:col-start-5',
        'lg:col-end-9',
        'lg:justify-self-stretch',
        'lg:align-self-stretch'
      );
    });

    it('handles special colSpan values in responsive configuration', () => {
      render(
        <GridItem
          colSpan={6}
          responsive={{
            md: { colSpan: 'full' },
            lg: { colSpan: 'auto' }
          }}
          data-testid="grid-item"
        />
      );
      
      const gridItem = screen.getByTestId('grid-item');
      expect(gridItem).toHaveClass(
        'col-span-6',
        'md:col-span-full',
        'lg:col-auto'
      );
    });

    it('handles special rowSpan values in responsive configuration', () => {
      render(
        <GridItem
          rowSpan={2}
          responsive={{
            md: { rowSpan: 'full' },
            lg: { rowSpan: 'auto' }
          }}
          data-testid="grid-item"
        />
      );
      
      const gridItem = screen.getByTestId('grid-item');
      expect(gridItem).toHaveClass(
        'row-span-2',
        'md:row-span-full',
        'lg:row-auto'
      );
    });
  });

  describe('Integration Tests', () => {
    it('combines all variant props correctly', () => {
      render(
        <GridItem
          colSpan={8}
          rowSpan={2}
          colStart={3}
          colEnd={11}
          align="center"
          responsive={{
            md: {
              colSpan: 6,
              rowSpan: 3,
              colStart: 4,
              align: 'stretch'
            }
          }}
          className="custom-item"
          data-testid="grid-item"
        />
      );
      
      const gridItem = screen.getByTestId('grid-item');
      expect(gridItem).toHaveClass(
        // Base classes
        'relative',
        'evoke-grid-item',
        
        // Variant classes
        'col-span-8',
        'row-span-2',
        'col-start-3',
        'col-end-11',
        'justify-self-center',
        'align-self-center',
        
        // Responsive classes
        'md:col-span-6',
        'md:row-span-3',
        'md:col-start-4',
        'md:justify-self-stretch',
        'md:align-self-stretch',
        
        // Custom class
        'custom-item'
      );
    });

    it('works well as featured content placeholder', () => {
      render(
        <GridItem 
          colSpan={4}
          rowSpan={2}
          colStart={5}
          align="center"
          data-testid="featured-item"
        >
          <div data-testid="featured-content">Featured Article</div>
        </GridItem>
      );
      
      const gridItem = screen.getByTestId('featured-item');
      expect(gridItem).toHaveClass(
        'col-span-4',
        'row-span-2',
        'col-start-5',
        'justify-self-center',
        'align-self-center'
      );
      
      expect(screen.getByTestId('featured-content')).toBeInTheDocument();
    });

    it('works as full-width header', () => {
      render(
        <GridItem colSpan="full" data-testid="header-item">
          <header data-testid="page-header">Page Header</header>
        </GridItem>
      );
      
      const gridItem = screen.getByTestId('header-item');
      expect(gridItem).toHaveClass('col-span-full');
      expect(screen.getByTestId('page-header')).toBeInTheDocument();
    });

    it('works as auto-sized sidebar', () => {
      render(
        <GridItem 
          colSpan="auto" 
          rowSpan="full" 
          data-testid="sidebar-item"
        >
          <nav data-testid="sidebar">Navigation</nav>
        </GridItem>
      );
      
      const gridItem = screen.getByTestId('sidebar-item');
      expect(gridItem).toHaveClass('col-auto', 'row-span-full');
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('supports ARIA attributes', () => {
      render(
        <GridItem
          role="gridcell"
          aria-label="Data cell"
          aria-describedby="cell-help"
          data-testid="grid-item"
        >
          Cell content
        </GridItem>
      );
      
      const gridItem = screen.getByTestId('grid-item');
      expect(gridItem).toHaveAttribute('role', 'gridcell');
      expect(gridItem).toHaveAttribute('aria-label', 'Data cell');
      expect(gridItem).toHaveAttribute('aria-describedby', 'cell-help');
    });

    it('supports tabIndex for focusable content', () => {
      render(
        <GridItem tabIndex={0} data-testid="grid-item">
          Focusable content
        </GridItem>
      );
      
      const gridItem = screen.getByTestId('grid-item');
      expect(gridItem).toHaveAttribute('tabindex', '0');
    });
  });
});
