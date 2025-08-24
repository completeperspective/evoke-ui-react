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
      expect(element).toHaveClass('text-xl', 'text-muted-foreground', 'leading-relaxed', 'tracking-tight');
      // Note: font-light is overridden by default font-normal variant unless weight prop is specified
    });

    it('renders large variant', () => {
      renderText({ variant: 'large' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('text-lg', 'text-foreground', 'leading-tight');
      // Note: font-semibold is overridden by default font-normal variant unless weight prop is specified
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
      expect(element).toHaveClass('font-mono', 'text-sm', 'bg-muted', 'text-muted-foreground', 'px-2', 'py-1', 'rounded-sm', 'border');
      // Note: font-medium and border-border/20 are overridden by defaults
    });

    it('renders quote variant', () => {
      renderText({ variant: 'quote' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('text-base', 'text-foreground', 'italic', 'border-l-4', 'border-primary/20', 'pl-4', 'leading-relaxed');
    });

    it('renders highlight variant', () => {
      renderText({ variant: 'highlight' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('text-base', 'text-foreground', 'bg-warning/20', 'px-1', 'py-0.5', 'rounded-sm');
      // Note: font-medium is overridden by default font-normal variant
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

  describe('Display Variants', () => {
    it('renders block display (default)', () => {
      renderText({ display: 'block' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('block');
    });

    it('renders inline display', () => {
      renderText({ display: 'inline' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('inline');
    });

    it('renders flex display with gap', () => {
      renderText({ display: 'flex' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('flex', 'items-baseline', 'gap-2');
    });

    it('renders inline-flex display with gap', () => {
      renderText({ display: 'inline-flex' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('inline-flex', 'items-baseline', 'gap-1');
    });
  });

  describe('Status Variants', () => {
    it('renders success status', () => {
      renderText({ status: 'success' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('text-success');
    });

    it('renders warning status', () => {
      renderText({ status: 'warning' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('text-warning');
    });

    it('renders error status', () => {
      renderText({ status: 'error' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('text-destructive');
    });

    it('renders info status', () => {
      renderText({ status: 'info' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('text-info');
    });

    it('renders muted status', () => {
      renderText({ status: 'muted' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('text-muted-foreground', 'opacity-60');
    });
  });

  describe('Selectability', () => {
    it('is selectable by default', () => {
      renderText({ selectable: true });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('select-text');
    });

    it('can be made unselectable', () => {
      renderText({ selectable: false });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('select-none', 'user-select-none');
    });
  });

  describe('Interactive Behavior', () => {
    it('renders non-interactive by default', () => {
      renderText({ interactive: false });
      const element = screen.getByText('Test text content');
      expect(element).not.toHaveClass('cursor-pointer');
    });

    it('renders interactive with hover effects', () => {
      renderText({ interactive: true });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('cursor-pointer', 'active:text-foreground/60', 'transition-colors');
      // Note: compound variants also add hover:text-primary and focus styles for body variant
    });

    it('applies enhanced focus styles for interactive body text', () => {
      renderText({ interactive: true, variant: 'body' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('hover:text-primary', 'focus:text-primary', 'focus:outline-none', 'focus:ring-2', 'focus:ring-ring', 'focus:ring-offset-2', 'rounded-sm');
    });
  });

  describe('Decoration Variants', () => {
    it('renders no decoration by default', () => {
      renderText({ decoration: 'none' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('no-underline');
    });

    it('renders underline decoration', () => {
      renderText({ decoration: 'underline' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('underline', 'decoration-2', 'underline-offset-2', 'decoration-primary/60', 'hover:decoration-primary');
    });

    it('renders line-through decoration', () => {
      renderText({ decoration: 'line-through' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('line-through');
    });
  });

  describe('Spacing Variants', () => {
    it('renders normal spacing by default', () => {
      renderText({ spacing: 'normal' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('tracking-normal');
    });

    it('renders tight spacing', () => {
      renderText({ spacing: 'tight' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('tracking-tight');
    });

    it('renders wide spacing', () => {
      renderText({ spacing: 'wide' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('tracking-wide');
    });
  });

  describe('Responsive Variants', () => {
    it('renders no responsive scaling by default', () => {
      renderText({ responsive: 'none' });
      const element = screen.getByText('Test text content');
      expect(element).not.toHaveClass('sm:text-base');
    });

    it('renders responsive medium scaling', () => {
      renderText({ responsive: 'md' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('md:text-lg');
    });

    it('applies enhanced responsive scaling for lead variant', () => {
      renderText({ variant: 'lead', responsive: 'md' });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('md:text-2xl', 'lg:text-3xl');
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

  describe('Utility Props', () => {
    it('applies monospace styling', () => {
      renderText({ monospace: true });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('monospace');
    });

    it('applies prose styling', () => {
      renderText({ prose: true });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('prose');
    });

    it('applies small caps styling', () => {
      renderText({ smallCaps: true });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('smallCaps');
    });

    it('applies tabular numbers styling', () => {
      renderText({ tabularNums: true });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('tabularNums');
    });

    it('applies multiple utility props', () => {
      renderText({ monospace: true, tabularNums: true });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('monospace', 'tabularNums');
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
        display: 'inline-block',
        status: 'success',
        interactive: true,
      });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass(
        'text-lg',
        'text-center',
        'font-bold',
        'uppercase',
        'truncate',
        'inline-block',
        'text-success',
        'cursor-pointer'
      );
      // Note: tracking-wider applies to uppercase, font-semibold is overridden by font-bold
    });

    it('applies compound variants correctly', () => {
      renderText({
        status: 'warning',
        weight: 'medium',
      });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass('text-warning', 'font-semibold');
      // Note: compound variant applies font-semibold when status + weight=medium
    });

    it('applies quote variant with justify alignment', () => {
      renderText({
        variant: 'quote',
        align: 'justify',
      });
      const element = screen.getByText('Test text content');
      expect(element).toHaveClass(
        'text-base',
        'text-foreground',
        'italic',
        'border-l-4',
        'border-primary/20',
        'pl-4',
        'leading-relaxed',
        'text-justify',
        'max-w-prose'
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
      // Check individual text nodes since they may be separated by elements
      expect(screen.getByText('Nested')).toBeInTheDocument();
      expect(screen.getByText('content')).toBeInTheDocument();
      expect(screen.getByText('here')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      const { container } = renderText({ children: '' });
      const element = container.querySelector('p');
      expect(element).toBeInTheDocument();
      expect(element?.textContent).toBe('');
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

    it('handles all new variant combinations without errors', () => {
      const complexProps = {
        variant: 'highlight' as const,
        align: 'center' as const,
        weight: 'black' as const,
        transform: 'uppercase' as const,
        truncate: 'line-clamp-6' as const,
        display: 'flex' as const,
        spacing: 'widest' as const,
        decoration: 'double-underline' as const,
        status: 'info' as const,
        selectable: false,
        interactive: true,
        responsive: 'xl' as const,
        prose: true,
        monospace: true,
        smallCaps: true,
        tabularNums: true,
      };
      
      expect(() => renderText(complexProps)).not.toThrow();
      const element = screen.getByText('Test text content');
      expect(element).toBeInTheDocument();
    });
  });
});