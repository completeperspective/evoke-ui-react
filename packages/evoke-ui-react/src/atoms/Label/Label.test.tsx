import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label, labelVariants, indicatorVariants, contentVariants, suffixVariants, type LabelProps } from './Label';

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
      const labelElement = screen.getByText('Test Label').closest('label');
      expect(labelElement?.tagName.toLowerCase()).toBe('label');
    });

    it('applies custom className', () => {
      renderLabel({ className: 'custom-class' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('custom-class');
    });

    it('supports htmlFor attribute', () => {
      renderLabel({ htmlFor: 'email-input' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveAttribute('for', 'email-input');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      renderLabel({ variant: 'default' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('text-foreground');
    });

    it('renders muted variant', () => {
      renderLabel({ variant: 'muted' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('text-muted-foreground');
    });

    it('renders error variant', () => {
      renderLabel({ variant: 'error' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('text-destructive');
    });

    it('renders success variant', () => {
      renderLabel({ variant: 'success' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('text-success');
    });

    it('renders warning variant', () => {
      renderLabel({ variant: 'warning' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('text-warning');
    });
    
    it('renders info variant', () => {
      renderLabel({ variant: 'info' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('text-info');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      renderLabel({ size: 'sm' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('text-xs');
    });

    it('renders medium size (default)', () => {
      renderLabel({ size: 'md' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('text-sm');
    });

    it('renders large size', () => {
      renderLabel({ size: 'lg' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('text-base');
    });
  });

  describe('Font Weight', () => {
    it('renders normal weight', () => {
      renderLabel({ weight: 'normal' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('font-normal');
    });

    it('renders medium weight (default)', () => {
      renderLabel({ weight: 'medium' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('font-medium');
    });

    it('renders semibold weight', () => {
      renderLabel({ weight: 'semibold' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('font-semibold');
    });
    
    it('renders bold weight', () => {
      renderLabel({ weight: 'bold' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('font-bold');
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
      expect(indicator).toHaveClass('text-destructive', 'ml-1');
    });
    
    it('shows info indicator when indicator prop is info', () => {
      renderLabel({ indicator: 'info' });
      const indicator = screen.getByLabelText('information');
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveTextContent('ⓘ');
    });
    
    it('overrides required with explicit indicator prop', () => {
      renderLabel({ required: true, indicator: 'info' });
      expect(screen.queryByLabelText('required')).not.toBeInTheDocument();
      expect(screen.getByLabelText('information')).toBeInTheDocument();
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
      expect(indicator).toHaveClass('text-muted-foreground', 'ml-2');
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

  describe('New CVA Variants', () => {
    describe('State Variants', () => {
      it('renders disabled state', () => {
        renderLabel({ state: 'disabled' });
        const label = screen.getByText('Test Label').closest('label');
        expect(label).toHaveClass('opacity-70', 'cursor-not-allowed');
      });
      
      it('renders focused state', () => {
        renderLabel({ state: 'focused' });
        const label = screen.getByText('Test Label').closest('label');
        expect(label).toHaveClass('text-primary', 'ring-2');
      });
      
      it('renders error state', () => {
        renderLabel({ state: 'error' });
        const label = screen.getByText('Test Label').closest('label');
        expect(label).toHaveClass('text-destructive');
      });
    });
    
    describe('Position Variants', () => {
      it('renders inline position', () => {
        renderLabel({ position: 'inline' });
        const label = screen.getByText('Test Label').closest('label');
        expect(label).toHaveClass('justify-start');
      });
      
      it('renders floating position', () => {
        renderLabel({ position: 'floating' });
        const label = screen.getByText('Test Label').closest('label');
        expect(label).toHaveClass('absolute', '-top-2', 'left-2');
      });
    });
    
    describe('Style Variants', () => {
      it('renders subtle style', () => {
        renderLabel({ styleVariant: 'subtle' });
        const label = screen.getByText('Test Label').closest('label');
        expect(label).toHaveClass('opacity-80');
      });
      
      it('renders underlined style', () => {
        renderLabel({ styleVariant: 'underlined' });
        const label = screen.getByText('Test Label').closest('label');
        expect(label).toHaveClass('underline');
      });
    });
    
    describe('Content and Suffix Customization', () => {
      it('applies custom content alignment', () => {
        renderLabel({ contentAlignment: 'center' });
        const labelElement = screen.getByText('Test Label').closest('label');
        const contentElement = labelElement?.querySelector('span');
        expect(contentElement).toHaveClass('items-center');
      });
      
      it('applies custom suffix spacing', () => {
        const suffix = <span data-testid="suffix">?</span>;
        renderLabel({ suffix, suffixSpacing: 'lg' });
        const suffixElement = screen.getByTestId('suffix').parentElement;
        expect(suffixElement).toHaveClass('ml-4');
      });
    });
  });
  
  describe('Combined Props', () => {
    it('handles multiple props correctly', () => {
      const suffix = <span data-testid="help">?</span>;
      
      renderLabel({
        variant: 'error',
        size: 'lg',
        weight: 'semibold',
        state: 'error',
        styleVariant: 'bold',
        required: true,
        suffix,
        className: 'custom-class',
      });
      
      const label = screen.getByText('Test Label').closest('label');
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
        suffixSpacing: 'sm',
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
        contentGap: 'lg',
        children: 'Bio',
      });
      
      expect(screen.getByText('Bio')).toBeInTheDocument();
      expect(screen.getByLabelText('optional')).toBeInTheDocument();
      expect(screen.getByTestId('info')).toBeInTheDocument();
    });
    
    it('handles complex combination with floating position', () => {
      renderLabel({
        position: 'floating',
        size: 'sm',
        variant: 'info',
        indicator: 'info',
        styleVariant: 'subtle',
      });
      
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('absolute', 'text-info', 'opacity-80');
      expect(screen.getByLabelText('information')).toBeInTheDocument();
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
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveAttribute('id', 'email-label');
    });

    it('maintains label semantics', () => {
      renderLabel({ htmlFor: 'input-id' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label?.tagName.toLowerCase()).toBe('label');
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
      expect(ref.current).toBe(screen.getByText('Test').closest('label'));
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
      expect(screen.getByText('User')).toBeInTheDocument();
      expect(screen.getByText('information')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      const { container } = renderLabel({ children: '' });
      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
      expect(label?.textContent).toBe('');
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
    
    it('handles indicator none explicitly', () => {
      renderLabel({ indicator: 'none', required: true, optional: true });
      expect(screen.queryByLabelText('required')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('optional')).not.toBeInTheDocument();
    });
    
    it('handles undefined content alignment gracefully', () => {
      renderLabel({ contentAlignment: undefined });
      const labelElement = screen.getByText('Test Label').closest('label');
      const contentElement = labelElement?.querySelector('span');
      expect(contentElement).toHaveClass('items-baseline'); // default
    });
    
    it('handles multiple state compound variants', () => {
      renderLabel({ state: 'disabled', variant: 'error' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('opacity-70', 'cursor-not-allowed');
    });
  });

  describe('CVA Integration', () => {
    it('applies base CVA classes', () => {
      renderLabel();
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass(
        'inline-flex',
        'items-center', 
        'cursor-pointer',
        'user-select-none',
        'transition-colors',
        'duration-200',
        'font-medium'
      );
    });
    
    it('applies compound variants correctly', () => {
      renderLabel({ state: 'disabled', variant: 'error' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('hover:text-current');
    });
    
    it('handles size-responsive floating position', () => {
      renderLabel({ position: 'floating', size: 'lg' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('text-sm', 'px-2', '-top-3');
    });
    
    it('applies style compound variants', () => {
      renderLabel({ styleVariant: 'bold', weight: 'normal' });
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('font-semibold');
    });
  });
  
  describe('Accessibility Enhancements', () => {
    it('maintains proper ARIA attributes for indicators', () => {
      renderLabel({ indicator: 'info' });
      const indicator = screen.getByLabelText('information');
      expect(indicator).toHaveAttribute('aria-label', 'information');
    });
    
    it('hides suffix content from screen readers', () => {
      const suffix = <span data-testid="decorative">🎉</span>;
      renderLabel({ suffix });
      const suffixContainer = screen.getByTestId('decorative').parentElement;
      expect(suffixContainer).toHaveAttribute('aria-hidden', 'true');
    });
    
    it('supports all original accessibility features', () => {
      renderLabel({ 
        id: 'test-label',
        htmlFor: 'test-input',
        'aria-label': 'Custom accessible label'
      });
      
      const label = screen.getByLabelText('Custom accessible label');
      expect(label).toHaveAttribute('id', 'test-label');
      expect(label).toHaveAttribute('for', 'test-input');
    });
  });
});

// Additional test for exported variants
describe('Exported CVA Variants', () => {
  it('exports all CVA variant functions', () => {
    expect(typeof labelVariants).toBe('function');
    expect(typeof indicatorVariants).toBe('function');
    expect(typeof contentVariants).toBe('function');
    expect(typeof suffixVariants).toBe('function');
  });
  
  it('labelVariants generates correct classes', () => {
    const defaultClasses = labelVariants();
    expect(defaultClasses).toContain('text-foreground');
    expect(defaultClasses).toContain('text-sm');
    expect(defaultClasses).toContain('font-medium');
    
    const customClasses = labelVariants({ 
      variant: 'error', 
      size: 'lg', 
      state: 'disabled' 
    });
    expect(customClasses).toContain('text-destructive');
    expect(customClasses).toContain('text-base');
    expect(customClasses).toContain('opacity-70');
  });
});