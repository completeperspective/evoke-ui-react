import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Heading, type HeadingProps } from './Heading';

// Helper function to render Heading with default props
const renderHeading = (props: Partial<HeadingProps> = {}) => {
  const defaultProps: HeadingProps = {
    children: 'Test Heading',
    ...props,
  };
  return render(<Heading {...defaultProps} />);
};

describe('Heading Component', () => {
  describe('Rendering', () => {
    it('renders heading content', () => {
      renderHeading({ children: 'Hello World' });
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders as h2 by default', () => {
      renderHeading();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('applies custom className', () => {
      renderHeading({ className: 'custom-class' });
      const element = screen.getByRole('heading');
      expect(element).toHaveClass('custom-class');
    });
  });

  describe('Heading Levels', () => {
    it('renders h1 correctly', () => {
      renderHeading({ level: 'h1' });
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('text-4xl', 'font-extrabold');
    });

    it('renders h2 correctly', () => {
      renderHeading({ level: 'h2' });
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('text-3xl', 'font-semibold');
    });

    it('renders h3 correctly', () => {
      renderHeading({ level: 'h3' });
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('text-2xl', 'font-semibold');
    });

    it('renders h4 correctly', () => {
      renderHeading({ level: 'h4' });
      const heading = screen.getByRole('heading', { level: 4 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('text-xl', 'font-semibold');
    });

    it('renders h5 correctly', () => {
      renderHeading({ level: 'h5' });
      const heading = screen.getByRole('heading', { level: 5 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('text-lg', 'font-semibold');
    });

    it('renders h6 correctly', () => {
      renderHeading({ level: 'h6' });
      const heading = screen.getByRole('heading', { level: 6 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('text-base', 'font-semibold');
    });
  });

  describe('Visual Level Override', () => {
    it('maintains semantic level while changing visual appearance', () => {
      renderHeading({ level: 'h3', visualLevel: 'h1' });
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName.toLowerCase()).toBe('h3');
      expect(heading).toHaveClass('text-4xl', 'font-extrabold'); // h1 visual styling
    });

    it('uses level for styling when visualLevel is not provided', () => {
      renderHeading({ level: 'h4' });
      const heading = screen.getByRole('heading', { level: 4 });
      expect(heading).toHaveClass('text-xl', 'font-semibold'); // h4 styling
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      renderHeading({ variant: 'default' });
      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('text-foreground');
    });

    it('renders muted variant', () => {
      renderHeading({ variant: 'muted' });
      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('text-muted-foreground');
    });

    it('renders accent variant', () => {
      renderHeading({ variant: 'accent' });
      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('text-accent-foreground');
    });

    it('renders destructive variant', () => {
      renderHeading({ variant: 'destructive' });
      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('text-destructive');
    });
  });

  describe('Alignment', () => {
    it('renders left alignment (default)', () => {
      renderHeading({ align: 'left' });
      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('text-left');
    });

    it('renders center alignment', () => {
      renderHeading({ align: 'center' });
      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('text-center');
    });

    it('renders right alignment', () => {
      renderHeading({ align: 'right' });
      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('text-right');
    });
  });

  describe('Spacing', () => {
    it('renders no spacing', () => {
      renderHeading({ spacing: 'none' });
      const heading = screen.getByRole('heading');
      expect(heading).not.toHaveClass('mb-2', 'mb-4', 'mb-6');
    });

    it('renders tight spacing', () => {
      renderHeading({ spacing: 'tight' });
      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('mb-2');
    });

    it('renders normal spacing (default)', () => {
      renderHeading({ spacing: 'normal' });
      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('mb-4');
    });

    it('renders loose spacing', () => {
      renderHeading({ spacing: 'loose' });
      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('mb-6');
    });
  });

  describe('Focusable', () => {
    it('is not focusable by default', () => {
      renderHeading();
      const heading = screen.getByRole('heading');
      expect(heading).not.toHaveAttribute('tabIndex');
      expect(heading).not.toHaveClass('focusable');
    });

    it('can be made focusable', () => {
      renderHeading({ focusable: true });
      const heading = screen.getByRole('heading');
      expect(heading).toHaveAttribute('tabIndex', '0');
      expect(heading).toHaveClass('focusable');
    });

    it('handles focus events when focusable', async () => {
      const handleFocus = jest.fn();
      renderHeading({ focusable: true, onFocus: handleFocus });
      
      const heading = screen.getByRole('heading');
      await userEvent.click(heading);
      
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });
  });

  describe('Combined Props', () => {
    it('applies multiple props correctly', () => {
      renderHeading({
        level: 'h1',
        variant: 'muted',
        align: 'center',
        spacing: 'tight',
        focusable: true,
      });
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass(
        'text-4xl',
        'font-extrabold',
        'text-muted-foreground',
        'text-center',
        'mb-2',
        'focusable'
      );
      expect(heading).toHaveAttribute('tabIndex', '0');
    });

    it('handles visual level override with other props', () => {
      renderHeading({
        level: 'h4',
        visualLevel: 'h2',
        variant: 'accent',
        align: 'right',
      });
      
      const heading = screen.getByRole('heading', { level: 4 });
      expect(heading.tagName.toLowerCase()).toBe('h4');
      expect(heading).toHaveClass(
        'text-3xl', // h2 visual styling
        'font-semibold',
        'text-accent-foreground',
        'text-right'
      );
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic meaning with correct heading level', () => {
      renderHeading({ level: 'h3' });
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
    });

    it('supports aria attributes', () => {
      renderHeading({ 'aria-label': 'Custom heading label' });
      const heading = screen.getByLabelText('Custom heading label');
      expect(heading).toBeInTheDocument();
    });

    it('supports id attribute for linking', () => {
      renderHeading({ id: 'section-heading' });
      const heading = screen.getByRole('heading');
      expect(heading).toHaveAttribute('id', 'section-heading');
    });

    it('maintains heading role regardless of visual level', () => {
      renderHeading({ level: 'h5', visualLevel: 'h1' });
      const heading = screen.getByRole('heading', { level: 5 });
      expect(heading).toBeInTheDocument();
    });
  });

  describe('Content Handling', () => {
    it('handles JSX children', () => {
      renderHeading({
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
      renderHeading({
        children: (
          <span>
            Section <em>title</em> here
          </span>
        ),
      });
      expect(screen.getByText(/Section.*title.*here/)).toBeInTheDocument();
    });

    it('handles links within headings', () => {
      renderHeading({
        children: (
          <a href="#section">Linked Heading</a>
        ),
      });
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '#section');
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to heading element', () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(<Heading ref={ref} level="h1">Test</Heading>);
      
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
      expect(ref.current?.tagName.toLowerCase()).toBe('h1');
    });

    it('forwards ref to different heading levels', () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(<Heading ref={ref} level="h3">Test</Heading>);
      
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
      expect(ref.current?.tagName.toLowerCase()).toBe('h3');
    });
  });

  describe('Responsive Classes', () => {
    it('includes responsive classes for h1', () => {
      renderHeading({ level: 'h1' });
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('lg:text-5xl');
    });

    it('includes scroll margin for anchor links', () => {
      renderHeading({ level: 'h2' });
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('scroll-m-20');
    });

    it('includes tracking class for letter spacing', () => {
      renderHeading({ level: 'h3' });
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveClass('tracking-tight');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      renderHeading({ children: '' });
      const heading = screen.getByRole('heading');
      expect(heading).toBeInTheDocument();
    });

    it('handles number children', () => {
      renderHeading({ children: 404 });
      expect(screen.getByText('404')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderHeading({ children: null });
      const heading = screen.getByRole('heading');
      expect(heading).toBeInTheDocument();
    });
  });
});