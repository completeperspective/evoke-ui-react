import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FormField } from './FormField';

// Mock icons for testing
const MockIcon = () => <div data-testid="mock-icon">Icon</div>;

describe('FormField', () => {
  describe('Basic Rendering', () => {
    it('renders with label and input', () => {
      render(
        <FormField
          label="Test Label"
          placeholder="Test placeholder"
        />
      );
      
      expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
    });

    it('renders without label when not provided', () => {
      render(
        <FormField
          placeholder="Test placeholder"
        />
      );
      
      expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <FormField
          label="Test"
          className="custom-class"
        />
      );
      
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('forwards ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(
        <FormField
          ref={ref}
          label="Test"
        />
      );
      
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('Required and Optional States', () => {
    it('shows required indicator when required=true', () => {
      render(
        <FormField
          label="Required Field"
          required
        />
      );
      
      expect(screen.getByText('*')).toBeInTheDocument();
      expect(screen.getByLabelText('required')).toBeInTheDocument();
    });

    it('shows optional indicator when optional=true', () => {
      render(
        <FormField
          label="Optional Field"
          optional
        />
      );
      
      expect(screen.getByText('(optional)')).toBeInTheDocument();
    });

    it('required takes precedence over optional', () => {
      render(
        <FormField
          label="Field"
          required
          optional
        />
      );
      
      expect(screen.getByText('*')).toBeInTheDocument();
      expect(screen.queryByText('(optional)')).not.toBeInTheDocument();
    });
  });

  describe('Description', () => {
    it('renders description below input by default', () => {
      render(
        <FormField
          label="Test Field"
          description="This is a description"
        />
      );
      
      const description = screen.getByText('This is a description');
      expect(description).toBeInTheDocument();
      
      // Description should be associated with input
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', expect.stringContaining(description.id));
    });

    it('renders description above input when position="above"', () => {
      const { container } = render(
        <FormField
          label="Test Field"
          description="Description above"
          descriptionPosition="above"
        />
      );
      
      const description = screen.getByText('Description above');
      const input = screen.getByRole('textbox');
      
      // Description should come before input in DOM order
      expect(description.compareDocumentPosition(input) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it('associates description with input via aria-describedby', () => {
      render(
        <FormField
          label="Test Field"
          description="Helper text"
          id="test-field"
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'test-field-description');
      
      const description = screen.getByText('Helper text');
      expect(description).toHaveAttribute('id', 'test-field-description');
    });
  });

  describe('Error Handling', () => {
    it('displays error message', () => {
      render(
        <FormField
          label="Test Field"
          error="This field has an error"
        />
      );
      
      const errorMessage = screen.getByText('This field has an error');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });

    it('sets error state when error is provided', () => {
      render(
        <FormField
          label="Test Field"
          error="Error message"
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates error with input via aria-describedby', () => {
      render(
        <FormField
          label="Test Field"
          error="Error message"
          id="error-field"
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'error-field-error');
      
      const error = screen.getByText('Error message');
      expect(error).toHaveAttribute('id', 'error-field-error');
    });

    it('combines description and error in aria-describedby', () => {
      render(
        <FormField
          label="Test Field"
          description="Helper text"
          error="Error message"
          id="combined-field"
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute(
        'aria-describedby',
        'combined-field-description combined-field-error'
      );
    });
  });

  describe('Size Variants', () => {
    it('applies small size classes', () => {
      const { container } = render(
        <FormField
          label="Small Field"
          size="sm"
        />
      );
      
      expect(container.querySelector('.gap-1')).toBeInTheDocument();
    });

    it('applies medium size classes (default)', () => {
      const { container } = render(
        <FormField
          label="Medium Field"
          size="md"
        />
      );
      
      expect(container.querySelector('.gap-1\\.5')).toBeInTheDocument();
    });

    it('applies large size classes', () => {
      const { container } = render(
        <FormField
          label="Large Field"
          size="lg"
        />
      );
      
      expect(container.querySelector('.gap-2')).toBeInTheDocument();
    });
  });

  describe('Layout Variants', () => {
    it('applies vertical layout classes (default)', () => {
      const { container } = render(
        <FormField
          label="Vertical Field"
          layout="vertical"
        />
      );
      
      expect(container.querySelector('.flex-col')).toBeInTheDocument();
      expect(container.querySelector('.space-y-1\\.5')).toBeInTheDocument();
    });

    it('applies horizontal layout classes', () => {
      const { container } = render(
        <FormField
          label="Horizontal Field"
          layout="horizontal"
        />
      );
      
      expect(container.querySelector('.flex-row')).toBeInTheDocument();
      expect(container.querySelector('.space-x-3')).toBeInTheDocument();
    });

    it('applies inline layout classes', () => {
      const { container } = render(
        <FormField
          label="Inline Field"
          layout="inline"
        />
      );
      
      expect(container.querySelector('.flex-row')).toBeInTheDocument();
      expect(container.querySelector('.items-center')).toBeInTheDocument();
    });
  });

  describe('State Variants', () => {
    it('applies default state', () => {
      render(
        <FormField
          label="Default State"
          state="default"
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).not.toHaveAttribute('aria-invalid', 'true');
    });

    it('applies error state', () => {
      render(
        <FormField
          label="Error State"
          state="error"
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('applies success state', () => {
      const { container } = render(
        <FormField
          label="Success State"
          state="success"
        />
      );
      
      // Success state should be applied (specific styling would depend on CVA classes)
      expect(container.firstChild).toBeInTheDocument();
    });

    it('applies disabled state', () => {
      render(
        <FormField
          label="Disabled Field"
          disabled
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });
  });

  describe('Icons', () => {
    it('renders start icon', () => {
      render(
        <FormField
          label="With Start Icon"
          startIcon={<MockIcon />}
        />
      );
      
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('renders end icon', () => {
      render(
        <FormField
          label="With End Icon"
          endIcon={<MockIcon />}
        />
      );
      
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('renders both start and end icons', () => {
      render(
        <FormField
          label="With Both Icons"
          startIcon={<div data-testid="start-icon">Start</div>}
          endIcon={<div data-testid="end-icon">End</div>}
        />
      );
      
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    });
  });

  describe('Input Props Forwarding', () => {
    it('forwards basic input props', () => {
      render(
        <FormField
          label="Test Field"
          type="email"
          placeholder="Enter email"
          name="email"
          autoComplete="email"
          autoFocus
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('placeholder', 'Enter email');
      expect(input).toHaveAttribute('name', 'email');
      expect(input).toHaveAttribute('autocomplete', 'email');
      expect(input).toHaveFocus();
    });

    it('handles controlled input', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <FormField
          label="Controlled Input"
          value="initial value"
          onChange={handleChange}
        />
      );
      
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('initial value');
      
      await user.type(input, 'new text');
      expect(handleChange).toHaveBeenCalled();
    });

    it('handles uncontrolled input', () => {
      render(
        <FormField
          label="Uncontrolled Input"
          defaultValue="default value"
        />
      );
      
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('default value');
    });

    it('handles readonly state', () => {
      render(
        <FormField
          label="Readonly Field"
          readOnly
          value="readonly value"
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('readonly');
    });
  });

  describe('Event Handling', () => {
    it('handles focus events', async () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      
      render(
        <FormField
          label="Event Test"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      );
      
      const input = screen.getByRole('textbox');
      
      await user.click(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
      
      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('handles change events', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      
      render(
        <FormField
          label="Change Test"
          onChange={handleChange}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'test');
      
      expect(handleChange).toHaveBeenCalledTimes(4); // Once for each character
    });
  });

  describe('ID Generation', () => {
    it('uses provided ID', () => {
      render(
        <FormField
          label="Custom ID"
          id="custom-field"
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id', 'custom-field');
    });

    it('generates unique ID when not provided', () => {
      render(
        <>
          <FormField label="Field 1" data-testid="field-1" />
          <FormField label="Field 2" data-testid="field-2" />
        </>
      );
      
      const input1 = screen.getByTestId('field-1').querySelector('input')!;
      const input2 = screen.getByTestId('field-2').querySelector('input')!;
      
      expect(input1.id).toBeTruthy();
      expect(input2.id).toBeTruthy();
      expect(input1.id).not.toBe(input2.id);
    });
  });

  describe('Label Props Forwarding', () => {
    it('forwards label props correctly', () => {
      render(
        <FormField
          label="Test Label"
          labelProps={{
            variant: 'muted',
            weight: 'bold',
            className: 'custom-label-class'
          }}
        />
      );
      
      const label = screen.getByText('Test Label');
      expect(label.closest('label')).toHaveClass('custom-label-class');
    });
  });

  describe('Input Props Forwarding', () => {
    it('forwards input props correctly', () => {
      render(
        <FormField
          label="Test Input"
          inputProps={{
            className: 'custom-input-class',
            'data-testid': 'custom-input'
          }}
        />
      );
      
      const input = screen.getByTestId('custom-input');
      expect(input).toHaveClass('custom-input-class');
    });
  });

  describe('Accessibility', () => {
    it('has proper label association', () => {
      render(
        <FormField
          label="Accessible Field"
          id="accessible-field"
        />
      );
      
      const label = screen.getByText('Accessible Field').closest('label');
      const input = screen.getByRole('textbox');
      
      expect(label).toHaveAttribute('for', 'accessible-field');
      expect(input).toHaveAttribute('id', 'accessible-field');
    });

    it('supports screen readers with proper ARIA attributes', () => {
      render(
        <FormField
          label="Screen Reader Test"
          description="This helps screen readers"
          error="This is an error"
          required
          id="sr-test"
        />
      );
      
      const input = screen.getByRole('textbox');
      
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', 'sr-test-description sr-test-error');
      expect(input).toHaveAttribute('id', 'sr-test');
      
      const requiredIndicator = screen.getByLabelText('required');
      expect(requiredIndicator).toBeInTheDocument();
    });

    it('announces errors to screen readers', () => {
      render(
        <FormField
          label="Error Announcement"
          error="This error will be announced"
        />
      );
      
      const errorElement = screen.getByRole('alert');
      expect(errorElement).toHaveTextContent('This error will be announced');
    });
  });

  describe('Complex Scenarios', () => {
    it('handles all props together', () => {
      render(
        <FormField
          label="Complex Field"
          description="This field has everything"
          error="But also has an error"
          required
          size="lg"
          layout="horizontal"
          state="error"
          type="email"
          startIcon={<div data-testid="start">Start</div>}
          endIcon={<div data-testid="end">End</div>}
          placeholder="complex@example.com"
          className="complex-field"
        />
      );
      
      expect(screen.getByLabelText(/Complex Field/)).toBeInTheDocument();
      expect(screen.getByText('This field has everything')).toBeInTheDocument();
      expect(screen.getByText('But also has an error')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
      expect(screen.getByTestId('start')).toBeInTheDocument();
      expect(screen.getByTestId('end')).toBeInTheDocument();
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('placeholder', 'complex@example.com');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('prioritizes error state over provided state', () => {
      render(
        <FormField
          label="Priority Test"
          state="success"
          error="This should override success state"
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('prioritizes disabled over error state', () => {
      render(
        <FormField
          label="Disabled Priority"
          error="Error message"
          disabled
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
      // Error should still be shown but input should be disabled
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });
});