import { render, screen } from '@testing-library/react';
import { Box } from './Box';

describe('Box Component', () => {
  describe('Rendering', () => {
    it('renders with children', () => {
      render(
        <Box data-testid="box">
          <div>Child 1</div>
          <div>Child 2</div>
        </Box>
      );
      
      const box = screen.getByTestId('box');
      expect(box).toBeInTheDocument();
      expect(box).toHaveTextContent('Child 1');
      expect(box).toHaveTextContent('Child 2');
    });

    it('applies default classes', () => {
      render(<Box data-testid="box" />);
      const box = screen.getByTestId('box');
      
      expect(box).toHaveClass('block', 'p-0', 'm-0', 'w-auto', 'h-auto', 'evoke-box');
    });

    it('applies custom className', () => {
      render(<Box className="custom-class" data-testid="box" />);
      const box = screen.getByTestId('box');
      
      expect(box).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = { current: null } as React.RefObject<HTMLElement>;
      render(<Box ref={ref} data-testid="box" />);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('block');
    });
  });

  describe('Semantic Elements', () => {
    it('renders as div by default', () => {
      render(<Box data-testid="box" />);
      expect(screen.getByTestId('box').tagName).toBe('DIV');
    });

    it('renders as section when specified', () => {
      render(<Box as="section" data-testid="box" />);
      expect(screen.getByTestId('box').tagName).toBe('SECTION');
    });

    it('renders as article when specified', () => {
      render(<Box as="article" data-testid="box" />);
      expect(screen.getByTestId('box').tagName).toBe('ARTICLE');
    });

    it('renders as main when specified', () => {
      render(<Box as="main" data-testid="box" />);
      expect(screen.getByTestId('box').tagName).toBe('MAIN');
    });

    it('renders as header when specified', () => {
      render(<Box as="header" data-testid="box" />);
      expect(screen.getByTestId('box').tagName).toBe('HEADER');
    });

    it('renders as footer when specified', () => {
      render(<Box as="footer" data-testid="box" />);
      expect(screen.getByTestId('box').tagName).toBe('FOOTER');
    });

    it('renders as nav when specified', () => {
      render(<Box as="nav" data-testid="box" />);
      expect(screen.getByTestId('box').tagName).toBe('NAV');
    });

    it('renders as aside when specified', () => {
      render(<Box as="aside" data-testid="box" />);
      expect(screen.getByTestId('box').tagName).toBe('ASIDE');
    });

    it('renders as span when specified', () => {
      render(<Box as="span" data-testid="box" />);
      expect(screen.getByTestId('box').tagName).toBe('SPAN');
    });
  });

  describe('Padding Variants', () => {
    it('applies no padding', () => {
      render(<Box padding="none" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('p-0');
    });

    it('applies xs padding', () => {
      render(<Box padding="xs" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('p-1');
    });

    it('applies sm padding', () => {
      render(<Box padding="sm" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('p-2');
    });

    it('applies md padding', () => {
      render(<Box padding="md" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('p-4');
    });

    it('applies lg padding', () => {
      render(<Box padding="lg" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('p-6');
    });

    it('applies xl padding', () => {
      render(<Box padding="xl" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('p-8');
    });

    it('applies 2xl padding', () => {
      render(<Box padding="2xl" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('p-12');
    });
  });

  describe('Margin Variants', () => {
    it('applies no margin', () => {
      render(<Box margin="none" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('m-0');
    });

    it('applies xs margin', () => {
      render(<Box margin="xs" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('m-1');
    });

    it('applies sm margin', () => {
      render(<Box margin="sm" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('m-2');
    });

    it('applies md margin', () => {
      render(<Box margin="md" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('m-4');
    });

    it('applies lg margin', () => {
      render(<Box margin="lg" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('m-6');
    });

    it('applies xl margin', () => {
      render(<Box margin="xl" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('m-8');
    });

    it('applies 2xl margin', () => {
      render(<Box margin="2xl" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('m-12');
    });

    it('applies auto margin', () => {
      render(<Box margin="auto" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('m-auto');
    });
  });

  describe('Padding Axis Override Variants', () => {
    it('applies paddingX override', () => {
      render(<Box paddingX="md" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('px-4');
    });

    it('applies paddingY override', () => {
      render(<Box paddingY="lg" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('py-6');
    });

    it('combines padding with axis overrides', () => {
      render(<Box padding="sm" paddingX="lg" data-testid="box" />);
      const box = screen.getByTestId('box');
      expect(box).toHaveClass('p-2', 'px-6');
    });
  });

  describe('Margin Axis Override Variants', () => {
    it('applies marginX override', () => {
      render(<Box marginX="md" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('mx-4');
    });

    it('applies marginY override', () => {
      render(<Box marginY="lg" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('my-6');
    });

    it('applies marginX auto', () => {
      render(<Box marginX="auto" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('mx-auto');
    });

    it('applies marginY auto', () => {
      render(<Box marginY="auto" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('my-auto');
    });

    it('combines margin with axis overrides', () => {
      render(<Box margin="sm" marginX="auto" data-testid="box" />);
      const box = screen.getByTestId('box');
      expect(box).toHaveClass('m-2', 'mx-auto');
    });
  });

  describe('Display Variants', () => {
    it('applies block display', () => {
      render(<Box display="block" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('block');
    });

    it('applies inline-block display', () => {
      render(<Box display="inline-block" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('inline-block');
    });

    it('applies flex display', () => {
      render(<Box display="flex" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('flex');
    });

    it('applies inline-flex display', () => {
      render(<Box display="inline-flex" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('inline-flex');
    });

    it('applies grid display', () => {
      render(<Box display="grid" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('grid');
    });

    it('applies inline-grid display', () => {
      render(<Box display="inline-grid" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('inline-grid');
    });

    it('applies hidden display', () => {
      render(<Box display="hidden" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('hidden');
    });
  });

  describe('Width Variants', () => {
    it('applies auto width', () => {
      render(<Box width="auto" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('w-auto');
    });

    it('applies full width', () => {
      render(<Box width="full" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('w-full');
    });

    it('applies screen width', () => {
      render(<Box width="screen" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('w-screen');
    });

    it('applies fit width', () => {
      render(<Box width="fit" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('w-fit');
    });

    it('applies min width', () => {
      render(<Box width="min" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('w-min');
    });

    it('applies max width', () => {
      render(<Box width="max" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('w-max');
    });

    it('applies xs width', () => {
      render(<Box width="xs" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('w-20');
    });

    it('applies sm width', () => {
      render(<Box width="sm" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('w-24');
    });

    it('applies md width', () => {
      render(<Box width="md" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('w-32');
    });

    it('applies lg width', () => {
      render(<Box width="lg" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('w-48');
    });

    it('applies xl width', () => {
      render(<Box width="xl" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('w-64');
    });

    it('applies 2xl width', () => {
      render(<Box width="2xl" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('w-80');
    });
  });

  describe('Height Variants', () => {
    it('applies auto height', () => {
      render(<Box height="auto" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('h-auto');
    });

    it('applies full height', () => {
      render(<Box height="full" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('h-full');
    });

    it('applies screen height', () => {
      render(<Box height="screen" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('h-screen');
    });

    it('applies fit height', () => {
      render(<Box height="fit" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('h-fit');
    });

    it('applies min height', () => {
      render(<Box height="min" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('h-min');
    });

    it('applies max height', () => {
      render(<Box height="max" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('h-max');
    });

    it('applies xs height', () => {
      render(<Box height="xs" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('h-20');
    });

    it('applies sm height', () => {
      render(<Box height="sm" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('h-24');
    });

    it('applies md height', () => {
      render(<Box height="md" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('h-32');
    });

    it('applies lg height', () => {
      render(<Box height="lg" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('h-48');
    });

    it('applies xl height', () => {
      render(<Box height="xl" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('h-64');
    });

    it('applies 2xl height', () => {
      render(<Box height="2xl" data-testid="box" />);
      expect(screen.getByTestId('box')).toHaveClass('h-80');
    });
  });

  describe('Responsive Behavior', () => {
    it('applies responsive display changes', () => {
      render(
        <Box 
          responsive={{
            sm: { display: 'flex' },
            md: { display: 'grid' },
            lg: { display: 'inline-block' }
          }}
          data-testid="box" 
        />
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveClass('sm:flex', 'md:grid', 'lg:inline-block');
    });

    it('applies responsive width changes', () => {
      render(
        <Box 
          responsive={{
            sm: { width: 'sm' },
            md: { width: 'md' },
            lg: { width: 'full' }
          }}
          data-testid="box" 
        />
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveClass('sm:w-24', 'md:w-32', 'lg:w-full');
    });

    it('applies responsive height changes', () => {
      render(
        <Box 
          responsive={{
            sm: { height: 'xs' },
            md: { height: 'md' },
            lg: { height: 'screen' }
          }}
          data-testid="box" 
        />
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveClass('sm:h-20', 'md:h-32', 'lg:h-screen');
    });

    it('applies responsive padding changes', () => {
      render(
        <Box 
          responsivePadding={{
            sm: 'sm',
            md: 'md',
            lg: 'lg'
          }}
          data-testid="box" 
        />
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveClass('sm:p-2', 'md:p-4', 'lg:p-6');
    });

    it('applies responsive margin changes', () => {
      render(
        <Box 
          responsiveMargin={{
            sm: 'sm',
            md: 'auto',
            lg: 'lg'
          }}
          data-testid="box" 
        />
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveClass('sm:m-2', 'md:m-auto', 'lg:m-6');
    });

    it('combines multiple responsive properties', () => {
      render(
        <Box 
          responsive={{
            sm: { display: 'flex', width: 'full' },
            lg: { display: 'grid', height: 'lg' }
          }}
          responsivePadding={{
            sm: 'sm',
            lg: 'xl'
          }}
          data-testid="box" 
        />
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveClass('sm:flex', 'sm:w-full', 'lg:grid', 'lg:h-48', 'sm:p-2', 'lg:p-8');
    });
  });

  describe('Complex Combinations', () => {
    it('combines all spacing variants correctly', () => {
      render(
        <Box 
          padding="md" 
          paddingX="lg"
          paddingY="sm"
          margin="sm" 
          marginX="auto"
          marginY="xl"
          data-testid="box" 
        />
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveClass('p-4', 'px-6', 'py-2', 'm-2', 'mx-auto', 'my-8');
    });

    it('combines display, sizing, and spacing variants', () => {
      render(
        <Box 
          display="flex"
          width="full"
          height="lg"
          padding="xl"
          margin="auto"
          data-testid="box" 
        />
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveClass('flex', 'w-full', 'h-48', 'p-8', 'm-auto');
    });

    it('combines semantic element with all variants', () => {
      render(
        <Box 
          as="section"
          display="grid"
          width="xl"
          height="md"
          padding="lg"
          margin="sm"
          responsive={{
            lg: { display: 'flex', width: 'full' }
          }}
          data-testid="box" 
        />
      );
      const box = screen.getByTestId('box');
      expect(box.tagName).toBe('SECTION');
      expect(box).toHaveClass('grid', 'w-64', 'h-32', 'p-6', 'm-2', 'lg:flex', 'lg:w-full');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards all HTML attributes correctly', () => {
      render(
        <Box 
          data-testid="box"
          id="custom-id"
          role="button"
          tabIndex={0}
          aria-label="Custom box"
          onClick={() => {}}
        />
      );
      const box = screen.getByTestId('box');
      
      expect(box).toHaveAttribute('id', 'custom-id');
      expect(box).toHaveAttribute('role', 'button');
      expect(box).toHaveAttribute('tabIndex', '0');
      expect(box).toHaveAttribute('aria-label', 'Custom box');
    });

    it('handles event handlers correctly', () => {
      const handleClick = vi.fn();
      const handleKeyDown = vi.fn();
      
      render(
        <Box 
          data-testid="box"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        />
      );
      const box = screen.getByTestId('box');
      
      box.click();
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined responsive properties gracefully', () => {
      render(
        <Box 
          responsive={{
            sm: undefined,
            md: { display: 'flex' },
            lg: undefined
          }}
          data-testid="box" 
        />
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveClass('md:flex');
      expect(box).not.toHaveClass('sm:');
      expect(box).not.toHaveClass('lg:');
    });

    it('handles empty responsive objects gracefully', () => {
      render(
        <Box 
          responsive={{}}
          responsivePadding={{}}
          responsiveMargin={{}}
          data-testid="box" 
        />
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveClass('block'); // Should still have default classes
    });

    it('handles null and undefined children gracefully', () => {
      render(
        <Box data-testid="box">
          {null}
          {undefined}
          <div>Valid child</div>
          {false && <div>Conditional child</div>}
        </Box>
      );
      const box = screen.getByTestId('box');
      expect(box).toBeInTheDocument();
      expect(box).toHaveTextContent('Valid child');
    });

    it('maintains accessibility with complex configurations', () => {
      render(
        <Box 
          as="button"
          display="flex"
          padding="md"
          margin="auto"
          width="full"
          role="button"
          tabIndex={0}
          aria-label="Complex interactive box"
          data-testid="box"
        >
          Interactive content
        </Box>
      );
      const box = screen.getByTestId('box');
      
      expect(box.tagName).toBe('BUTTON');
      expect(box).toHaveAttribute('role', 'button');
      expect(box).toHaveAttribute('aria-label', 'Complex interactive box');
      expect(box).toHaveClass('flex', 'p-4', 'm-auto', 'w-full');
    });
  });
});