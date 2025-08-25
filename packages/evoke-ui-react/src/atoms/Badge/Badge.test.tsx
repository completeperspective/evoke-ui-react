import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Badge, type BadgeProps } from './Badge';

// Helper function to render Badge with default props
const renderBadge = (props: Partial<BadgeProps> = {}) => {
  const defaultProps: BadgeProps = {
    children: 'Test Badge',
    ...props,
  };
  return render(<Badge {...defaultProps} />);
};

describe('Badge Component', () => {
  describe('Rendering', () => {
    it('renders badge content', () => {
      renderBadge({ children: 'New Feature' });
      expect(screen.getByText('New Feature')).toBeInTheDocument();
    });

    it('renders as div by default', () => {
      const { container } = renderBadge();
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      renderBadge({ className: 'custom-class' });
      const badge = screen.getByText('Test Badge');
      expect(badge).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      renderBadge({ variant: 'default' });
      const badge = screen.getByText('Test Badge');
      expect(badge).toHaveClass('bg-primary', 'text-primary-foreground');
    });

    it('renders secondary variant', () => {
      renderBadge({ variant: 'secondary' });
      const badge = screen.getByText('Test Badge');
      expect(badge).toHaveClass('bg-secondary', 'text-secondary-foreground');
    });

    it('renders destructive variant', () => {
      renderBadge({ variant: 'destructive' });
      const badge = screen.getByText('Test Badge');
      expect(badge).toHaveClass('bg-destructive', 'text-destructive-foreground');
    });

    it('renders success variant', () => {
      renderBadge({ variant: 'success' });
      const badge = screen.getByText('Test Badge');
      expect(badge).toHaveClass('bg-success', 'text-white');
    });

    it('renders warning variant', () => {
      renderBadge({ variant: 'warning' });
      const badge = screen.getByText('Test Badge');
      expect(badge).toHaveClass('bg-warning', 'text-foreground');
    });

    it('renders info variant', () => {
      renderBadge({ variant: 'info' });
      const badge = screen.getByText('Test Badge');
      expect(badge).toHaveClass('bg-info', 'text-white');
    });

    it('renders outline variant', () => {
      renderBadge({ variant: 'outline' });
      const badge = screen.getByText('Test Badge');
      expect(badge).toHaveClass('text-foreground', 'border-border');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      renderBadge({ size: 'sm' });
      const badge = screen.getByText('Test Badge');
      expect(badge).toHaveClass('px-2', 'py-0.5', 'text-xs');
    });

    it('renders medium size (default)', () => {
      renderBadge({ size: 'md' });
      const badge = screen.getByText('Test Badge');
      expect(badge).toHaveClass('px-2.5', 'py-1', 'text-xs');
    });

    it('renders large size', () => {
      renderBadge({ size: 'lg' });
      const badge = screen.getByText('Test Badge');
      expect(badge).toHaveClass('px-3', 'py-1.5', 'text-sm');
    });
  });

  describe('Icons', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;

    it('renders start icon', () => {
      renderBadge({ startIcon: <TestIcon /> });
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders end icon when not removable', () => {
      renderBadge({ endIcon: <TestIcon /> });
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('does not render end icon when removable', () => {
      renderBadge({ endIcon: <TestIcon />, removable: true });
      expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
    });

    it('hides icons from screen readers', () => {
      renderBadge({ startIcon: <TestIcon /> });
      const iconContainer = screen.getByTestId('test-icon').parentElement;
      expect(iconContainer).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Removable Badge', () => {
    it('renders remove button when removable', () => {
      renderBadge({ removable: true });
      const removeButton = screen.getByRole('button', { name: 'Remove badge' });
      expect(removeButton).toBeInTheDocument();
    });

    it('calls onRemove when remove button is clicked', async () => {
      const handleRemove = vi.fn();
      renderBadge({ removable: true, onRemove: handleRemove });
      
      const removeButton = screen.getByRole('button', { name: 'Remove badge' });
      await userEvent.click(removeButton);
      
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it('stops propagation when remove button is clicked', async () => {
      const handleClick = vi.fn();
      const handleRemove = vi.fn();
      
      renderBadge({ 
        removable: true, 
        onRemove: handleRemove,
        onClick: handleClick,
        interactive: true 
      });
      
      const removeButton = screen.getByRole('button', { name: 'Remove badge' });
      await userEvent.click(removeButton);
      
      expect(handleRemove).toHaveBeenCalledTimes(1);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Interactive Badge', () => {
    it('renders as button when interactive', () => {
      renderBadge({ interactive: true });
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(1); // Only the main badge button
      expect(buttons[0]).toBeInTheDocument();
    });

    it('renders as button when onClick is provided', () => {
      const handleClick = vi.fn();
      renderBadge({ onClick: handleClick });
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(1); // Only the main badge button
      expect(buttons[0]).toBeInTheDocument();
    });

    it('renders as div with remove button when removable', () => {
      renderBadge({ removable: true });
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(1); // Only remove button
      expect(screen.getByRole('button', { name: 'Remove badge' })).toBeInTheDocument();
    });

    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn();
      renderBadge({ onClick: handleClick });
      
      const buttons = screen.getAllByRole('button');
      await userEvent.click(buttons[0]); // Click the main badge button
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies interactive class when interactive', () => {
      renderBadge({ interactive: true });
      const buttons = screen.getAllByRole('button');
      expect(buttons[0]).toHaveClass('cursor-pointer');
    });
  });

  describe('Non-Interactive Badge', () => {
    it('renders as div when not interactive', () => {
      const { container } = renderBadge();
      expect(container.querySelector('div')).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('does not have interactive class when not interactive', () => {
      renderBadge();
      const badge = screen.getByText('Test Badge');
      expect(badge).not.toHaveClass('cursor-pointer');
    });
  });

  describe('Accessibility', () => {
    it('has proper button role when interactive', () => {
      renderBadge({ interactive: true });
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('supports aria attributes', () => {
      renderBadge({ 'aria-label': 'Custom badge label' });
      const badge = screen.getByLabelText('Custom badge label');
      expect(badge).toBeInTheDocument();
    });

    it('has proper remove button accessibility', () => {
      renderBadge({ removable: true });
      const removeButton = screen.getByRole('button', { name: 'Remove badge' });
      expect(removeButton).toHaveAttribute('aria-label', 'Remove badge');
      expect(removeButton.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    });

    it('supports keyboard navigation for interactive badges', async () => {
      const handleClick = vi.fn();
      renderBadge({ onClick: handleClick });
      
      const buttons = screen.getAllByRole('button');
      const badge = buttons[0]; // Get the main badge button
      badge.focus();
      
      // Test Enter key navigation
      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      // Test that the button is properly focusable
      expect(badge).toHaveFocus();
    });
  });

  describe('Combined Props', () => {
    it('handles multiple props correctly', () => {
      const TestIcon = () => <span data-testid="start-icon">Start</span>;
      const handleClick = vi.fn();
      
      renderBadge({
        variant: 'success',
        size: 'lg',
        startIcon: <TestIcon />,
        onClick: handleClick,
        className: 'custom-class',
      });
      
      const buttons = screen.getAllByRole('button');
      const badge = buttons[0]; // Get the main badge button
      expect(badge).toHaveClass(
        'bg-success',
        'text-white',
        'px-3',
        'py-1.5',
        'text-sm',
        'cursor-pointer',
        'custom-class'
      );
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    });

    it('handles removable with other props', () => {
      const TestIcon = () => <span data-testid="start-icon">Start</span>;
      const handleRemove = vi.fn();
      
      renderBadge({
        variant: 'destructive',
        size: 'sm',
        startIcon: <TestIcon />,
        removable: true,
        onRemove: handleRemove,
      });
      
      const badgeContainer = screen.getByText('Test Badge').closest('div');
      expect(badgeContainer).toHaveClass(
        'bg-destructive',
        'text-destructive-foreground',
        'px-2',
        'py-0.5'
      );
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Remove badge' })).toBeInTheDocument();
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to div when not interactive', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Badge ref={ref}>Test</Badge>);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to button when interactive', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Badge ref={ref} interactive>Test</Badge>);
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      const { container } = renderBadge({ children: '' });
      // Check that the badge container exists even with empty content
      expect(container.querySelector('[class*="evoke-badge"]')).toBeInTheDocument();
    });

    it('handles complex children', () => {
      renderBadge({
        children: (
          <span>
            Complex <strong>content</strong>
          </span>
        ),
      });
      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('content')).toBeInTheDocument();
    });

    it('handles onRemove without removable prop', () => {
      const handleRemove = vi.fn();
      renderBadge({ onRemove: handleRemove });
      
      // Should not crash and should not show remove button
      expect(screen.queryByRole('button', { name: 'Remove badge' })).not.toBeInTheDocument();
    });

    it('handles removable without onRemove', () => {
      renderBadge({ removable: true });
      
      // Should show remove button but not crash when clicked
      const removeButton = screen.getByRole('button', { name: 'Remove badge' });
      expect(removeButton).toBeInTheDocument();
      
      // Should not throw when clicked
      expect(() => fireEvent.click(removeButton)).not.toThrow();
    });
  });
});