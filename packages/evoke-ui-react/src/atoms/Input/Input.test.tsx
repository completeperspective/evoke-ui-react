import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input, type InputProps } from './Input';

// Helper function to render Input with default props
const renderInput = (props: Partial<InputProps> = {}) => {
  const defaultProps: InputProps = {
    placeholder: 'Test input',
    ...props,
  };
  return render(<Input {...defaultProps} />);
};

describe('Input Component', () => {
  describe('Rendering', () => {
    it('renders input with placeholder', () => {
      renderInput({ placeholder: 'Enter text' });
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders input with default type text', () => {
      renderInput();
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('renders input with custom type', () => {
      renderInput({ type: 'email' });
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('applies custom className', () => {
      renderInput({ className: 'custom-class' });
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
    });
  });

  describe('Sizes', () => {
    it('renders small size correctly', () => {
      renderInput({ size: 'sm' });
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('h-8', 'px-2', 'text-xs');
    });

    it('renders medium size correctly (default)', () => {
      renderInput({ size: 'md' });
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('h-9', 'px-3', 'text-sm');
    });

    it('renders large size correctly', () => {
      renderInput({ size: 'lg' });
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('h-10', 'px-4', 'text-base');
    });
  });

  describe('States', () => {
    it('renders default state correctly', () => {
      renderInput({ state: 'default' });
      const input = screen.getByRole('textbox');
      expect(input).not.toHaveClass('border-destructive');
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });

    it('renders error state correctly', () => {
      renderInput({ state: 'error' });
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-destructive', 'focus-visible:ring-destructive');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders success state correctly', () => {
      renderInput({ state: 'success' });
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-green-500', 'focus-visible:ring-green-500');
    });

    it('renders warning state correctly', () => {
      renderInput({ state: 'warning' });
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-yellow-500', 'focus-visible:ring-yellow-500');
    });
  });

  describe('Icons', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;

    it('renders start icon correctly', () => {
      renderInput({ startIcon: <TestIcon /> });
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders end icon correctly', () => {
      renderInput({ endIcon: <TestIcon /> });
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders both start and end icons', () => {
      renderInput({
        startIcon: <span data-testid="start-icon">Start</span>,
        endIcon: <span data-testid="end-icon">End</span>,
      });
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    });

    it('hides icons from screen readers', () => {
      renderInput({ startIcon: <TestIcon /> });
      const iconContainer = screen.getByTestId('test-icon').parentElement;
      expect(iconContainer).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Error Handling', () => {
    it('displays error message', () => {
      renderInput({ error: 'This field is required' });
      expect(screen.getByText('This field is required')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('sets error state when error prop is provided', () => {
      renderInput({ error: 'Error message', state: 'success' });
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-destructive');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates error message with input via aria-describedby', () => {
      renderInput({ id: 'test-input', error: 'Error message' });
      const input = screen.getByRole('textbox');
      const errorMessage = screen.getByRole('alert');
      
      expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
      expect(errorMessage).toHaveAttribute('id', 'test-input-error');
    });
  });

  describe('Helper Text', () => {
    it('displays helper text', () => {
      renderInput({ helperText: 'This is helpful information' });
      expect(screen.getByText('This is helpful information')).toBeInTheDocument();
    });

    it('associates helper text with input via aria-describedby', () => {
      renderInput({ id: 'test-input', helperText: 'Helper text' });
      const input = screen.getByRole('textbox');
      const helperText = screen.getByText('Helper text');
      
      expect(input).toHaveAttribute('aria-describedby', 'test-input-helper');
      expect(helperText).toHaveAttribute('id', 'test-input-helper');
    });

    it('prioritizes error over helper text', () => {
      renderInput({ 
        error: 'Error message', 
        helperText: 'Helper text' 
      });
      
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('disables input when disabled prop is true', () => {
      renderInput({ disabled: true });
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('applies disabled styles', () => {
      renderInput({ disabled: true });
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
    });
  });

  describe('Interactions', () => {
    it('handles onChange events', async () => {
      const handleChange = jest.fn();
      renderInput({ onChange: handleChange });
      
      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'test value');
      
      expect(handleChange).toHaveBeenCalled();
      expect(input).toHaveValue('test value');
    });

    it('handles onFocus events', async () => {
      const handleFocus = jest.fn();
      renderInput({ onFocus: handleFocus });
      
      const input = screen.getByRole('textbox');
      await userEvent.click(input);
      
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('handles onBlur events', async () => {
      const handleBlur = jest.fn();
      renderInput({ onBlur: handleBlur });
      
      const input = screen.getByRole('textbox');
      await userEvent.click(input);
      await userEvent.tab();
      
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard navigation', async () => {
      renderInput();
      const input = screen.getByRole('textbox');
      
      await userEvent.click(input);
      expect(input).toHaveFocus();
      
      await userEvent.tab();
      expect(input).not.toHaveFocus();
    });
  });

  describe('Special Input Types', () => {
    it('renders password input correctly', () => {
      renderInput({ type: 'password', value: 'secret' });
      const input = screen.getByDisplayValue('secret');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('renders number input correctly', () => {
      renderInput({ type: 'number', min: 0, max: 100 });
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('type', 'number');
      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('max', '100');
    });

    it('renders email input correctly', () => {
      renderInput({ type: 'email' });
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('renders search input correctly', () => {
      renderInput({ type: 'search' });
      const input = screen.getByRole('searchbox');
      expect(input).toHaveAttribute('type', 'search');
    });
  });

  describe('Accessibility', () => {
    it('has proper focus management', () => {
      renderInput();
      const input = screen.getByRole('textbox');
      
      input.focus();
      expect(input).toHaveFocus();
    });

    it('supports required attribute', () => {
      renderInput({ required: true });
      const input = screen.getByRole('textbox');
      expect(input).toBeRequired();
    });

    it('supports aria-label', () => {
      renderInput({ 'aria-label': 'Custom label' });
      const input = screen.getByLabelText('Custom label');
      expect(input).toBeInTheDocument();
    });

    it('sets proper aria-invalid for error state', () => {
      renderInput({ error: 'Error message' });
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toBe(screen.getByRole('textbox'));
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined id gracefully', () => {
      renderInput({ error: 'Error message' });
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'input-error');
    });

    it('handles both error and helper text with same id', () => {
      const { rerender } = renderInput({ 
        id: 'test-input', 
        helperText: 'Helper text' 
      });
      
      rerender(
        <Input 
          id="test-input" 
          error="Error message" 
          helperText="Helper text" 
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
    });

    it('handles empty string values', () => {
      renderInput({ value: '', error: '', helperText: '' });
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
    });
  });
});