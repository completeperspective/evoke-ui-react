import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label, type LabelProps } from './Label';

// Helper function to render Label with default props
const renderLabel = (props: Partial<LabelProps> = {}) => {
  const defaultProps: LabelProps = {
    children: 'Test Label',
    ...props,
  };
  return render(<Label {...defaultProps} />);
};

describe('Label Component', () => {
  describe('Rendering', () => {
    it('renders label content', () => {
      renderLabel({ children: 'Email Address' });
      expect(screen.getByText('Email Address')).toBeInTheDocument();
    });

    it('renders as label element', () => {
      renderLabel();
      expect(screen.getByText('Test Label').tagName.toLowerCase()).toBe('label');
    });

    it('applies custom className', () => {
      renderLabel({ className: 'custom-class' });
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass('custom-class');
    });

    it('supports htmlFor attribute', () => {
      renderLabel({ htmlFor: 'email-input' });
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('for', 'email-input');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      renderLabel({ variant: 'default' });
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass('text-foreground');
    });

    it('renders muted variant', () => {
      renderLabel({ variant: 'muted' });
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass('text-muted-foreground');
    });

    it('renders error variant', () => {
      renderLabel({ variant: 'error' });
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass('text-destructive');
    });

    it('renders success variant', () => {
      renderLabel({ variant: 'success' });
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass('text-green-600');
    });

    it('renders warning variant', () => {
      renderLabel({ variant: 'warning' });
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass('text-yellow-600');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      renderLabel({ size: 'sm' });
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass('text-xs');
    });

    it('renders medium size (default)', () => {
      renderLabel({ size: 'md' });
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass('text-sm');
    });

    it('renders large size', () => {
      renderLabel({ size: 'lg' });
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass('text-base');
    });
  });

  describe('Font Weight', () => {
    it('renders normal weight', () => {
      renderLabel({ weight: 'normal' });
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass('font-normal');
    });

    it('renders medium weight (default)', () => {
      renderLabel({ weight: 'medium' });
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass('font-medium');
    });

    it('renders semibold weight', () => {
      renderLabel({ weight: 'semibold' });
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass('font-semibold');
    });
  });

  describe('Required Indicator', () => {
    it('shows required indicator when required is true', () => {
      renderLabel({ required: true });
      const indicator = screen.getByLabelText('required');
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveTextContent('*');
    });

    it('does not show required indicator by default', () => {
      renderLabel();
      expect(screen.queryByLabelText('required')).not.toBeInTheDocument();
    });

    it('applies required styling to indicator', () => {
      renderLabel({ required: true });
      const indicator = screen.getByLabelText('required');
      expect(indicator).toHaveClass('required');
    });
  });

  describe('Optional Indicator', () => {
    it('shows optional indicator when optional is true', () => {
      renderLabel({ optional: true });
      const indicator = screen.getByLabelText('optional');
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveTextContent('(optional)');
    });

    it('does not show optional indicator by default', () => {
      renderLabel();
      expect(screen.queryByLabelText('optional')).not.toBeInTheDocument();
    });

    it('does not show optional when required is true', () => {
      renderLabel({ required: true, optional: true });
      expect(screen.queryByLabelText('optional')).not.toBeInTheDocument();
      expect(screen.getByLabelText('required')).toBeInTheDocument();
    });

    it('applies optional styling to indicator', () => {
      renderLabel({ optional: true });
      const indicator = screen.getByLabelText('optional');
      expect(indicator).toHaveClass('optional');
    });
  });

  describe('Suffix', () => {
    it('renders suffix content', () => {
      const suffix = <span data-testid="suffix">?</span>;
      renderLabel({ suffix });
      expect(screen.getByTestId('suffix')).toBeInTheDocument();
    });

    it('hides suffix from screen readers', () => {
      const suffix = <span data-testid="suffix">Help</span>;
      renderLabel({ suffix });
      const suffixContainer = screen.getByTestId('suffix').parentElement;
      expect(suffixContainer).toHaveAttribute('aria-hidden', 'true');
    });

    it('positions suffix after label content', () => {
      const suffix = <span data-testid="suffix">Help</span>;
      renderLabel({ children: 'Username', suffix });
      
      const label = screen.getByText('Username');
      const suffixElement = screen.getByTestId('suffix');
      
      expect(label.compareDocumentPosition(suffixElement)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING
      );
    });
  });

  describe('Combined Props', () => {
    it('handles multiple props correctly', () => {
      const suffix = <span data-testid="help">?</span>;
      
      renderLabel({
        variant: 'error',
        size: 'lg',
        weight: 'semibold',
        required: true,
        suffix,
        className: 'custom-class',
      });
      
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass(
        'text-destructive',
        'text-base',
        'font-semibold',
        'custom-class'
      );
      expect(screen.getByLabelText('required')).toBeInTheDocument();
      expect(screen.getByTestId('help')).toBeInTheDocument();
    });

    it('handles required with suffix', () => {
      const suffix = <span data-testid="tooltip">i</span>;
      
      renderLabel({
        required: true,
        suffix,
        children: 'Password',
      });
      
      expect(screen.getByText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('required')).toBeInTheDocument();
      expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    });

    it('handles optional with suffix', () => {
      const suffix = <span data-testid="info">Info</span>;
      
      renderLabel({
        optional: true,
        suffix,
        children: 'Bio',
      });
      
      expect(screen.getByText('Bio')).toBeInTheDocument();
      expect(screen.getByLabelText('optional')).toBeInTheDocument();
      expect(screen.getByTestId('info')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('supports aria attributes', () => {
      renderLabel({ 'aria-label': 'Custom label' });
      const label = screen.getByLabelText('Custom label');
      expect(label).toBeInTheDocument();
    });

    it('supports id attribute', () => {
      renderLabel({ id: 'email-label' });
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('id', 'email-label');
    });

    it('maintains label semantics', () => {
      renderLabel({ htmlFor: 'input-id' });
      const label = screen.getByText('Test Label');
      expect(label.tagName.toLowerCase()).toBe('label');
      expect(label).toHaveAttribute('for', 'input-id');
    });

    it('provides accessible required indication', () => {
      renderLabel({ required: true });
      const indicator = screen.getByLabelText('required');
      expect(indicator).toHaveAttribute('aria-label', 'required');
    });

    it('provides accessible optional indication', () => {
      renderLabel({ optional: true });
      const indicator = screen.getByLabelText('optional');
      expect(indicator).toHaveAttribute('aria-label', 'optional');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to label element', () => {
      const ref = React.createRef<HTMLLabelElement>();
      render(<Label ref={ref}>Test</Label>);
      
      expect(ref.current).toBeInstanceOf(HTMLLabelElement);
      expect(ref.current).toBe(screen.getByText('Test'));
    });
  });

  describe('Complex Content', () => {
    it('handles JSX children', () => {
      renderLabel({
        children: (
          <>
            Email <strong>Address</strong>
          </>
        ),
      });
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Address')).toBeInTheDocument();
    });

    it('handles nested elements', () => {
      renderLabel({
        children: (
          <span>
            User <em>information</em>
          </span>
        ),
      });
      expect(screen.getByText(/User.*information/)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      renderLabel({ children: '' });
      const label = screen.getByText('');
      expect(label).toBeInTheDocument();
    });

    it('handles null suffix', () => {
      renderLabel({ suffix: null });
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('handles both required and optional false', () => {
      renderLabel({ required: false, optional: false });
      expect(screen.queryByLabelText('required')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('optional')).not.toBeInTheDocument();
    });
  });
});