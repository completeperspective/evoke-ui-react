import React from 'react';
import { render, screen } from '@testing-library/react';
import { Text, type TextProps } from './Text';

// Helper function to render Text with default props
const renderText = (props: Partial<TextProps> = {}) => {
  const defaultProps: TextProps = {
    children: 'Test text content',
    ...props,
  };
  return render(<Text {...defaultProps} />);
};

describe('Text Component', () => {
  describe('Rendering', () => {
    it('renders text content', () => {
      renderText({ children: 'Hello World' });
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders as paragraph by default', () => {
      const { container } = renderText();
      expect(container.querySelector('p')).toBeInTheDocument();
    });

    it('renders with custom element', () => {
      const { container } = renderText({ as: 'span' });
      expect(container.querySelector('span')).toBeInTheDocument();
      expect(container.querySelector('p')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      renderText({ className: 'custom-class' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('renders body variant (default)', () => {
      renderText({ variant: 'body' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('text-base', 'text-foreground');
    });

    it('renders lead variant', () => {
      renderText({ variant: 'lead' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('text-xl', 'text-muted-foreground', 'font-light');
    });

    it('renders large variant', () => {
      renderText({ variant: 'large' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('text-lg', 'font-semibold', 'text-foreground');
    });

    it('renders small variant', () => {
      renderText({ variant: 'small' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('text-sm', 'text-muted-foreground');
    });

    it('renders muted variant', () => {
      renderText({ variant: 'muted' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('text-sm', 'text-muted-foreground');
    });

    it('renders caption variant', () => {
      renderText({ variant: 'caption' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('text-xs', 'text-muted-foreground');
    });

    it('renders code variant', () => {
      renderText({ variant: 'code' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('font-mono', 'text-sm', 'bg-muted', 'px-1', 'py-0.5', 'rounded');
    });
  });

  describe('Alignment', () => {
    it('renders left alignment (default)', () => {
      renderText({ align: 'left' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('text-left');
    });

    it('renders center alignment', () => {
      renderText({ align: 'center' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('text-center');
    });

    it('renders right alignment', () => {
      renderText({ align: 'right' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('text-right');
    });

    it('renders justify alignment', () => {
      renderText({ align: 'justify' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('text-justify');
    });
  });

  describe('Font Weight', () => {
    it('renders normal weight (default)', () => {
      renderText({ weight: 'normal' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('font-normal');
    });

    it('renders light weight', () => {
      renderText({ weight: 'light' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('font-light');
    });

    it('renders medium weight', () => {
      renderText({ weight: 'medium' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('font-medium');
    });

    it('renders semibold weight', () => {
      renderText({ weight: 'semibold' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('font-semibold');
    });

    it('renders bold weight', () => {
      renderText({ weight: 'bold' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('font-bold');
    });
  });

  describe('Text Transform', () => {
    it('renders no transform (default)', () => {
      renderText({ transform: 'none' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('normal-case');
    });

    it('renders uppercase transform', () => {
      renderText({ transform: 'uppercase' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('uppercase');
    });

    it('renders lowercase transform', () => {
      renderText({ transform: 'lowercase' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('lowercase');
    });

    it('renders capitalize transform', () => {
      renderText({ transform: 'capitalize' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('capitalize');
    });
  });

  describe('Text Truncation', () => {
    it('renders no truncation (default)', () => {
      renderText({ truncate: 'none' });
      const element = screen.getByText('Test text content');
      expect(element).not.toHaveClass('truncate');
    });

    it('renders single line truncation', () => {
      renderText({ truncate: 'truncate' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('truncate');
    });

    it('renders line clamp 2', () => {
      renderText({ truncate: 'line-clamp-2' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('line-clamp-2');
    });

    it('renders line clamp 3', () => {
      renderText({ truncate: 'line-clamp-3' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('line-clamp-3');
    });

    it('renders line clamp 4', () => {
      renderText({ truncate: 'line-clamp-4' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('line-clamp-4');
    });
  });

  describe('Selectability', () => {
    it('is selectable by default', () => {
      renderText();
      const element = screen.getByText('Test text content');
      expect(element).not.toHaveClass('unselectable');
    });

    it('can be made unselectable', () => {
      renderText({ selectable: false });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('unselectable');
    });
  });

  describe('Element Types', () => {
    it('renders as span', () => {
      const { container } = renderText({ as: 'span' });
      expect(container.querySelector('span')).toBeInTheDocument();
    });

    it('renders as div', () => {
      const { container } = renderText({ as: 'div' });
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('renders as label', () => {
      const { container } = renderText({ as: 'label' });
      expect(container.querySelector('label')).toBeInTheDocument();
    });

    it('renders as legend', () => {
      const { container } = renderText({ as: 'legend' });
      expect(container.querySelector('legend')).toBeInTheDocument();
    });

    it('renders as time', () => {
      const { container } = renderText({ as: 'time' });
      expect(container.querySelector('time')).toBeInTheDocument();
    });

    it('renders as figcaption', () => {
      const { container } = renderText({ as: 'figcaption' });
      expect(container.querySelector('figcaption')).toBeInTheDocument();
    });
  });

  describe('Combined Variants', () => {
    it('applies multiple variants correctly', () => {
      renderText({
        variant: 'large',
        align: 'center',
        weight: 'bold',
        transform: 'uppercase',
        truncate: 'truncate',
      });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass(
        'text-lg',
        'font-semibold',
        'text-foreground',
        'text-center',
        'font-bold',
        'uppercase',
        'truncate'
      );
    });
  });

  describe('Accessibility', () => {
    it('supports aria attributes', () => {
      renderText({ 'aria-label': 'Custom label' });
      const element = screen.getByLabelText('Custom label');
      expect(element).toBeInTheDocument();
    });

    it('supports role attribute', () => {
      renderText({ role: 'status' });
      const element = screen.getByRole('status');
      expect(element).toBeInTheDocument();
    });

    it('supports id attribute', () => {
      renderText({ id: 'custom-id' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveAttribute('id', 'custom-id');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to text element', () => {
      const ref = React.createRef<HTMLElement>();
      render(<Text ref={ref}>Test</Text>);
      
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });

    it('forwards ref to custom element', () => {
      const ref = React.createRef<HTMLElement>();
      render(<Text ref={ref} as="span">Test</Text>);
      
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('Complex Content', () => {
    it('handles JSX children', () => {
      renderText({
        children: (
          <>
            Hello <strong>World</strong>
          </>
        ),
      });
      expect(screen.getByText('Hello')).toBeInTheDocument();
      expect(screen.getByText('World')).toBeInTheDocument();
    });

    it('handles nested elements', () => {
      renderText({
        children: (
          <span>
            Nested <em>content</em> here
          </span>
        ),
      });
      expect(screen.getByText(/Nested.*content.*here/)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      renderText({ children: '' });
      const element = screen.getByText('');
      expect(element).toBeInTheDocument();
    });

    it('handles number children', () => {
      renderText({ children: 42 });
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderText({ children: null });
      const { container } = render(<Text>{null}</Text>);
      expect(container.querySelector('p')).toBeInTheDocument();
    });
  });
});