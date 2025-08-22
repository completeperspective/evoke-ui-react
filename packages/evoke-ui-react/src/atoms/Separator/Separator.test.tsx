import React from 'react';
import { render, screen } from '@testing-library/react';
import { Separator, type SeparatorProps } from './Separator';

// Helper function to render Separator with default props
const renderSeparator = (props: Partial<SeparatorProps> = {}) => {
  return render(<Separator {...props} />);
};

describe('Separator Component', () => {
  describe('Rendering', () => {
    it('renders separator element', () => {
      renderSeparator();
      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      renderSeparator({ className: 'custom-class' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('custom-class');
    });
  });

  describe('Orientation', () => {
    it('renders horizontal orientation by default', () => {
      renderSeparator();
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('h-[1px]', 'w-full');
      // Decorative separators should not have aria-orientation
      expect(separator).not.toHaveAttribute('aria-orientation');
    });

    it('renders horizontal orientation explicitly', () => {
      renderSeparator({ orientation: 'horizontal' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('h-[1px]', 'w-full');
      // Decorative separators should not have aria-orientation
      expect(separator).not.toHaveAttribute('aria-orientation');
    });

    it('renders vertical orientation', () => {
      renderSeparator({ orientation: 'vertical' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('h-full', 'w-[1px]');
      // Decorative separators should not have aria-orientation
      expect(separator).not.toHaveAttribute('aria-orientation');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      renderSeparator({ variant: 'default' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('bg-border');
    });

    it('renders muted variant', () => {
      renderSeparator({ variant: 'muted' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('bg-muted');
    });

    it('renders accent variant', () => {
      renderSeparator({ variant: 'accent' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('bg-accent');
    });

    it('renders primary variant', () => {
      renderSeparator({ variant: 'primary' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('bg-primary');
    });
  });

  describe('Sizes', () => {
    it('renders medium size by default (horizontal)', () => {
      renderSeparator({ orientation: 'horizontal' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('h-[1px]');
    });

    it('renders small size (horizontal)', () => {
      renderSeparator({ orientation: 'horizontal', size: 'sm' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('h-px');
    });

    it('renders large size (horizontal)', () => {
      renderSeparator({ orientation: 'horizontal', size: 'lg' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('h-[2px]');
    });

    it('renders medium size by default (vertical)', () => {
      renderSeparator({ orientation: 'vertical' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('w-[1px]');
    });

    it('renders small size (vertical)', () => {
      renderSeparator({ orientation: 'vertical', size: 'sm' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('w-px');
    });

    it('renders large size (vertical)', () => {
      renderSeparator({ orientation: 'vertical', size: 'lg' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('w-[2px]');
    });
  });

  describe('Decorative Property', () => {
    it('is decorative by default', () => {
      renderSeparator();
      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('renders as presentation when decorative is true', () => {
      renderSeparator({ decorative: true });
      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('renders as separator when decorative is false', () => {
      renderSeparator({ decorative: false });
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });
  });

  describe('Label', () => {
    it('renders without label by default', () => {
      renderSeparator();
      expect(screen.queryByText('OR')).not.toBeInTheDocument();
    });

    it('renders with text label', () => {
      renderSeparator({ label: 'OR' });
      expect(screen.getByText('OR')).toBeInTheDocument();
    });

    it('renders with JSX label', () => {
      const label = <span data-testid="custom-label">Custom</span>;
      renderSeparator({ label });
      expect(screen.getByTestId('custom-label')).toBeInTheDocument();
    });

    it('applies horizontal layout for labeled separator', () => {
      renderSeparator({ label: 'OR', orientation: 'horizontal' });
      const container = screen.getByRole('presentation');
      expect(container.className).toMatch(/.*horizontal.*/);
    });

    it('applies vertical layout for labeled separator', () => {
      renderSeparator({ label: 'OR', orientation: 'vertical' });
      const container = screen.getByRole('presentation');
      expect(container.className).toMatch(/.*vertical.*/);
    });

    it('hides label from screen readers when decorative', () => {
      renderSeparator({ label: 'OR', decorative: true });
      const label = screen.getByText('OR');
      expect(label).toHaveAttribute('aria-hidden', 'true');
    });

    it('shows label to screen readers when not decorative', () => {
      renderSeparator({ label: 'OR', decorative: false });
      const label = screen.getByText('OR');
      expect(label).toHaveAttribute('aria-hidden', 'false');
    });

    it('renders two separator lines with label', () => {
      renderSeparator({ label: 'OR' });
      const container = screen.getByRole('presentation');
      const separatorLines = container.querySelectorAll('[class*="bg-border"]');
      expect(separatorLines).toHaveLength(2);
    });
  });

  describe('Combined Props', () => {
    it('handles multiple props correctly', () => {
      renderSeparator({
        orientation: 'vertical',
        variant: 'primary',
        size: 'lg',
        decorative: false,
        className: 'custom-separator',
      });
      
      const separator = screen.getByRole('separator');
      expect(separator).toHaveClass(
        'h-full',
        'w-[2px]',
        'bg-primary',
        'custom-separator'
      );
      expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('handles labeled separator with all props', () => {
      renderSeparator({
        label: 'DIVIDER',
        orientation: 'horizontal',
        variant: 'accent',
        size: 'sm',
        decorative: false,
        className: 'labeled-separator',
      });
      
      const container = screen.getByRole('separator');
      expect(container.className).toMatch(/.*horizontal.*/);
      expect(container).toHaveClass('labeled-separator');
      expect(container).toHaveAttribute('aria-orientation', 'horizontal');
      
      const label = screen.getByText('DIVIDER');
      expect(label).toHaveAttribute('aria-hidden', 'false');
      
      const separatorLines = container.querySelectorAll('[class*="bg-accent"]');
      expect(separatorLines).toHaveLength(2);
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-orientation attribute', () => {
      renderSeparator({ orientation: 'vertical', decorative: false });
      const separator = screen.getByRole('separator');
      expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('supports custom aria attributes', () => {
      renderSeparator({ 'aria-label': 'Section divider' });
      const separator = screen.getByLabelText('Section divider');
      expect(separator).toBeInTheDocument();
    });

    it('maintains semantic meaning when not decorative', () => {
      renderSeparator({ decorative: false });
      expect(screen.getByRole('separator')).toBeInTheDocument();
      expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });

    it('removes semantic meaning when decorative', () => {
      renderSeparator({ decorative: true });
      expect(screen.getByRole('presentation')).toBeInTheDocument();
      expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to separator element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Separator ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toBe(screen.getByRole('presentation'));
    });

    it('forwards ref to labeled separator container', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Separator ref={ref} label="OR" />);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toBe(screen.getByRole('presentation'));
    });
  });

  describe('Style Classes', () => {
    it('includes base classes', () => {
      renderSeparator();
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('shrink-0', 'bg-border');
    });

    it('applies orientation-specific classes', () => {
      renderSeparator({ orientation: 'horizontal' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('h-[1px]', 'w-full');
    });

    it('applies variant-specific classes', () => {
      renderSeparator({ variant: 'muted' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('bg-muted');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty label', () => {
      renderSeparator({ label: '' });
      // Empty label should render as unlabeled separator
      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('handles null label', () => {
      renderSeparator({ label: null });
      // Should render as unlabeled separator
      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('handles undefined orientation gracefully', () => {
      renderSeparator({ orientation: undefined });
      const separator = screen.getByRole('presentation');
      // Decorative separators should not have aria-orientation
      expect(separator).not.toHaveAttribute('aria-orientation');
    });
  });
});