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
      expect(separator).toHaveClass('shadow-sm');
    });

    it('renders muted variant', () => {
      renderSeparator({ variant: 'muted' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('bg-muted');
    });

    it('renders accent variant', () => {
      renderSeparator({ variant: 'accent' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('bg-accent', 'shadow-sm');
    });

    it('renders primary variant', () => {
      renderSeparator({ variant: 'primary' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('bg-primary', 'shadow-sm');
    });
  });

  describe('Sizes and Thickness', () => {
    it('renders normal thickness by default (horizontal)', () => {
      renderSeparator({ orientation: 'horizontal' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('h-[1px]');
    });

    it('renders thin thickness (horizontal)', () => {
      renderSeparator({ orientation: 'horizontal', thickness: 'thin' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('h-px');
    });

    it('renders thick thickness (horizontal)', () => {
      renderSeparator({ orientation: 'horizontal', thickness: 'thick' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('h-[2px]');
    });

    // Legacy size prop support
    it('renders small size (horizontal) - legacy prop', () => {
      renderSeparator({ orientation: 'horizontal', size: 'sm' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('h-px');
    });

    it('renders large size (horizontal) - legacy prop', () => {
      renderSeparator({ orientation: 'horizontal', size: 'lg' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('h-[2px]');
    });

    it('renders normal thickness by default (vertical)', () => {
      renderSeparator({ orientation: 'vertical' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('w-[1px]');
    });

    it('renders thin thickness (vertical)', () => {
      renderSeparator({ orientation: 'vertical', thickness: 'thin' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('w-px');
    });

    it('renders thick thickness (vertical)', () => {
      renderSeparator({ orientation: 'vertical', thickness: 'thick' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('w-[2px]');
    });

    it('prioritizes thickness prop over size prop', () => {
      renderSeparator({ orientation: 'horizontal', size: 'lg', thickness: 'thin' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('h-px');
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
      expect(container).toHaveClass('flex-row', 'w-full');
    });

    it('applies vertical layout for labeled separator', () => {
      renderSeparator({ label: 'OR', orientation: 'vertical' });
      const container = screen.getByRole('presentation');
      expect(container).toHaveClass('flex-col', 'h-full');
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
      const separatorLines = container.querySelectorAll('[class*="flex-1"]');
      expect(separatorLines).toHaveLength(2);
    });

    it('applies label variant classes', () => {
      renderSeparator({ label: 'OR', labelVariant: 'centered' });
      const label = screen.getByText('OR');
      expect(label).toHaveClass('px-4', 'whitespace-nowrap');
    });
  });

  describe('Combined Props', () => {
    it('handles multiple props correctly', () => {
      renderSeparator({
        orientation: 'vertical',
        variant: 'primary',
        thickness: 'thick',
        pattern: 'dashed',
        animation: 'expand',
        decorative: false,
        className: 'custom-separator',
      });
      
      const separator = screen.getByRole('separator');
      expect(separator).toHaveClass(
        'h-full',
        'w-[2px]',
        'bg-primary',
        'shadow-sm',
        'custom-separator'
      );
      expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('handles labeled separator with all props', () => {
      renderSeparator({
        label: 'DIVIDER',
        orientation: 'horizontal',
        variant: 'accent',
        thickness: 'thick',
        pattern: 'gradient',
        labelVariant: 'centered',
        decorative: false,
        className: 'labeled-separator',
      });
      
      const container = screen.getByRole('separator');
      expect(container).toHaveClass('flex-row', 'w-full', 'labeled-separator');
      expect(container).toHaveAttribute('aria-orientation', 'horizontal');
      
      const label = screen.getByText('DIVIDER');
      expect(label).toHaveAttribute('aria-hidden', 'false');
      expect(label).toHaveClass('px-4', 'whitespace-nowrap');
      
      const separatorLines = container.querySelectorAll('[class*="flex-1"]');
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
      expect(separator).toHaveClass('flex-shrink-0', 'relative', 'transition-all', 'duration-200', 'ease-out');
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

    it('applies pattern-specific classes', () => {
      renderSeparator({ pattern: 'dotted' });
      const separator = screen.getByRole('presentation');
      expect(separator.className).toContain('bg-none');
    });

    it('applies animation-specific classes', () => {
      renderSeparator({ animation: 'expand' });
      const separator = screen.getByRole('presentation');
      expect(separator).toHaveClass('origin-center', 'animate-none');
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

    it('handles all pattern variants', () => {
      const patterns = ['solid', 'dotted', 'dashed', 'gradient'] as const;
      patterns.forEach(pattern => {
        const { unmount } = renderSeparator({ pattern });
        const separator = screen.getByRole('presentation');
        expect(separator).toBeInTheDocument();
        unmount();
      });
    });

    it('handles all animation variants', () => {
      const animations = ['static', 'expand', 'fade-in'] as const;
      animations.forEach(animation => {
        const { unmount } = renderSeparator({ animation });
        const separator = screen.getByRole('presentation');
        expect(separator).toBeInTheDocument();
        unmount();
      });
    });

    it('handles all thickness variants', () => {
      const thicknesses = ['thin', 'normal', 'thick'] as const;
      thicknesses.forEach(thickness => {
        const { unmount } = renderSeparator({ thickness });
        const separator = screen.getByRole('presentation');
        expect(separator).toBeInTheDocument();
        unmount();
      });
    });

    it('handles all labelVariant types', () => {
      const labelVariants = ['none', 'inline', 'centered'] as const;
      labelVariants.forEach(labelVariant => {
        const { unmount } = renderSeparator({ label: 'Test', labelVariant });
        const container = screen.getByRole('presentation');
        expect(container).toBeInTheDocument();
        unmount();
      });
    });
  });
});