import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, type ButtonProps } from './Button';

// Helper function to render Button with default props
const renderButton = (props: Partial<ButtonProps> = {}) => {
  const defaultProps: ButtonProps = {
    children: 'Test Button',
    ...props,
  };
  return render(<Button {...defaultProps} />);
};

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders button with text', () => {
      renderButton({ children: 'Click me' });
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('renders button with default variant and size', () => {
      renderButton();
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary', 'text-primary-foreground', 'h-9');
    });

    it('applies custom className', () => {
      renderButton({ className: 'custom-class' });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('renders default variant correctly', () => {
      renderButton({ variant: 'default' });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary', 'text-primary-foreground');
    });

    it('renders destructive variant correctly', () => {
      renderButton({ variant: 'destructive' });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-destructive', 'text-destructive-foreground');
    });

    it('renders outline variant correctly', () => {
      renderButton({ variant: 'outline' });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border', 'border-input', 'bg-background');
    });

    it('renders secondary variant correctly', () => {
      renderButton({ variant: 'secondary' });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground');
    });

    it('renders ghost variant correctly', () => {
      renderButton({ variant: 'ghost' });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('hover:bg-accent', 'hover:text-accent-foreground');
    });

    it('renders link variant correctly', () => {
      renderButton({ variant: 'link' });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('text-primary', 'underline-offset-4');
    });
  });

  describe('Sizes', () => {
    it('renders small size correctly', () => {
      renderButton({ size: 'sm' });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-8', 'px-3', 'text-xs');
    });

    it('renders medium size correctly', () => {
      renderButton({ size: 'md' });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9', 'px-4', 'text-sm');
    });

    it('renders large size correctly', () => {
      renderButton({ size: 'lg' });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-10', 'px-6', 'text-base');
    });

    it('renders icon size correctly', () => {
      renderButton({ size: 'icon' });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9', 'w-9');
    });
  });

  describe('Icons', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;

    it('renders start icon correctly', () => {
      renderButton({ startIcon: <TestIcon /> });
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders end icon correctly', () => {
      renderButton({ endIcon: <TestIcon /> });
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders both start and end icons', () => {
      renderButton({
        startIcon: <span data-testid="start-icon">Start</span>,
        endIcon: <span data-testid="end-icon">End</span>,
      });
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('shows spinner when loading', () => {
      renderButton({ loading: true });
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toBeDisabled();
    });

    it('hides icons when loading', () => {
      renderButton({
        loading: true,
        startIcon: <span data-testid="start-icon">Start</span>,
        endIcon: <span data-testid="end-icon">End</span>,
      });
      expect(screen.queryByTestId('start-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('end-icon')).not.toBeInTheDocument();
    });

    it('disables button when loading', () => {
      renderButton({ loading: true });
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Disabled State', () => {
    it('disables button when disabled prop is true', () => {
      renderButton({ disabled: true });
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('applies disabled styles', () => {
      renderButton({ disabled: true });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50');
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn();
      renderButton({ onClick: handleClick });
      
      const button = screen.getByRole('button');
      await userEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      renderButton({ onClick: handleClick, disabled: true });
      
      const button = screen.getByRole('button');
      await userEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const handleClick = vi.fn();
      renderButton({ onClick: handleClick, loading: true });
      
      const button = screen.getByRole('button');
      await userEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles keyboard navigation', async () => {
      const handleClick = vi.fn();
      renderButton({ onClick: handleClick });
      
      const button = screen.getByRole('button');
      button.focus();
      
      // Test Enter key navigation
      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      // Test that the button is properly focusable
      expect(button).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('has proper focus management', () => {
      renderButton();
      const button = screen.getByRole('button');
      
      button.focus();
      expect(button).toHaveFocus();
    });

    it('has proper aria-disabled when loading', () => {
      renderButton({ loading: true });
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('has proper aria-disabled when disabled', () => {
      renderButton({ disabled: true });
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('hides icons from screen readers', () => {
      renderButton({
        startIcon: <span data-testid="start-icon">Start</span>,
        endIcon: <span data-testid="end-icon">End</span>,
      });
      
      const startIconContainer = screen.getByTestId('start-icon').parentElement;
      const endIconContainer = screen.getByTestId('end-icon').parentElement;
      
      expect(startIconContainer).toHaveAttribute('aria-hidden', 'true');
      expect(endIconContainer).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Test</Button>);
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toBe(screen.getByRole('button'));
    });
  });

  describe('AsChild Prop', () => {
    it('renders as span when asChild is true', () => {
      const { container } = renderButton({ asChild: true });
      expect(container.querySelector('span')).toBeInTheDocument();
      expect(container.querySelector('button')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      renderButton({ children: '' });
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('handles complex children', () => {
      renderButton({
        children: (
          <div>
            <span>Complex</span>
            <span>Children</span>
          </div>
        ),
      });
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('Children')).toBeInTheDocument();
    });

    it('handles both loading and disabled states', () => {
      renderButton({ loading: true, disabled: true });
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });
});