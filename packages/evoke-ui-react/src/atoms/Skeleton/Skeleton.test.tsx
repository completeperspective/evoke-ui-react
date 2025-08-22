import React from 'react';
import { render, screen } from '@testing-library/react';
import { Skeleton, type SkeletonProps } from './Skeleton';

// Helper function to render Skeleton with default props
const renderSkeleton = (props: Partial<SkeletonProps> = {}) => {
  return render(<Skeleton {...props} />);
};

describe('Skeleton Component', () => {
  describe('Rendering', () => {
    it('renders skeleton element', () => {
      renderSkeleton();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has loading aria-label', () => {
      renderSkeleton();
      expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      renderSkeleton({ className: 'custom-class' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      renderSkeleton({ variant: 'default' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('bg-muted');
    });

    it('renders card variant', () => {
      renderSkeleton({ variant: 'card' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('bg-muted', 'rounded-lg');
    });

    it('renders text variant', () => {
      renderSkeleton({ variant: 'text' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('bg-muted', 'rounded');
    });

    it('renders circle variant', () => {
      renderSkeleton({ variant: 'circle' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('bg-muted', 'rounded-full');
    });

    it('renders button variant', () => {
      renderSkeleton({ variant: 'button' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('bg-muted', 'rounded-md');
    });

    it('renders avatar variant', () => {
      renderSkeleton({ variant: 'avatar' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('bg-muted', 'rounded-full');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      renderSkeleton({ size: 'sm' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('h-4');
    });

    it('renders medium size (default)', () => {
      renderSkeleton({ size: 'md' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('h-6');
    });

    it('renders large size', () => {
      renderSkeleton({ size: 'lg' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('h-8');
    });

    it('renders extra large size', () => {
      renderSkeleton({ size: 'xl' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('h-12');
    });
  });

  describe('Dimensions', () => {
    it('applies custom width as string', () => {
      renderSkeleton({ width: '200px' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveStyle({ width: '200px' });
    });

    it('applies custom width as number', () => {
      renderSkeleton({ width: 150 });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveStyle({ width: '150px' });
    });

    it('applies custom height as string', () => {
      renderSkeleton({ height: '100px' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveStyle({ height: '100px' });
    });

    it('applies custom height as number', () => {
      renderSkeleton({ height: 80 });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveStyle({ height: '80px' });
    });

    it('applies both width and height', () => {
      renderSkeleton({ width: 200, height: 100 });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveStyle({ width: '200px', height: '100px' });
    });
  });

  describe('Animation', () => {
    it('has animation by default', () => {
      renderSkeleton();
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('animate-pulse');
      expect(skeleton).not.toHaveClass('static');
    });

    it('disables animation when static is true', () => {
      renderSkeleton({ static: true });
      const skeleton = screen.getByRole('status');
      expect(skeleton.className).toMatch(/.*static.*/);
    });
  });

  describe('Multi-line Text', () => {
    it('renders single line by default', () => {
      renderSkeleton({ variant: 'text' });
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getAllByRole('status')).toHaveLength(1);
    });

    it('renders multiple lines when lines prop is provided', () => {
      renderSkeleton({ variant: 'text', lines: 3 });
      const skeletons = screen.getAllByRole('status');
      const container = skeletons[0].parentElement;
      expect(container?.children).toHaveLength(3);
    });

    it('applies textLines class for multi-line', () => {
      renderSkeleton({ variant: 'text', lines: 2, className: 'custom-class' });
      const container = screen.getAllByRole('status')[0].parentElement;
      expect(container?.className).toMatch(/.*textLines.*/);
      expect(container).toHaveClass('custom-class');
    });

    it('makes last line shorter in multi-line text', () => {
      renderSkeleton({ variant: 'text', lines: 3 });
      const lines = screen.getAllByRole('status');
      const lastLine = lines[lines.length - 1];
      expect(lastLine.className).toMatch(/.*lastLine.*/);
      expect(lastLine).toHaveStyle({ width: '60%' });
    });

    it('ignores lines prop for non-text variants', () => {
      renderSkeleton({ variant: 'circle', lines: 3 });
      expect(screen.getAllByRole('status')).toHaveLength(1);
    });
  });

  describe('Custom Styles', () => {
    it('applies custom style object', () => {
      const customStyle = { backgroundColor: 'red', margin: '10px' };
      renderSkeleton({ style: customStyle });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveStyle('background-color: rgb(255, 0, 0)');
      expect(skeleton).toHaveStyle('margin: 10px');
    });

    it('merges custom style with dimension styles', () => {
      const customStyle = { backgroundColor: 'blue' };
      renderSkeleton({ style: customStyle, width: 100, height: 50 });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveStyle('background-color: rgb(0, 0, 255)');
      expect(skeleton).toHaveStyle('width: 100px');
      expect(skeleton).toHaveStyle('height: 50px');
    });
  });

  describe('Accessibility', () => {
    it('has proper role attribute', () => {
      renderSkeleton();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has descriptive aria-label', () => {
      renderSkeleton();
      expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
    });

    it('supports custom aria-label', () => {
      renderSkeleton({ 'aria-label': 'Loading content' });
      expect(screen.getByLabelText('Loading content')).toBeInTheDocument();
    });

    it('maintains accessibility for multi-line text', () => {
      renderSkeleton({ variant: 'text', lines: 3 });
      const statusElements = screen.getAllByRole('status');
      expect(statusElements).toHaveLength(3);
      statusElements.forEach(element => {
        expect(element).toHaveAttribute('aria-label', 'Loading...');
      });
    });
  });

  describe('Combined Props', () => {
    it('handles multiple props correctly', () => {
      renderSkeleton({
        variant: 'card',
        size: 'lg',
        width: 300,
        height: 200,
        static: true,
        className: 'custom-skeleton',
      });
      
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('bg-muted', 'rounded-lg', 'h-8', 'custom-skeleton');
      expect(skeleton.className).toMatch(/.*static.*/);
      expect(skeleton).toHaveStyle({
        width: '300px',
        height: '200px',
      });
    });

    it('handles text variant with multiple lines and custom props', () => {
      renderSkeleton({
        variant: 'text',
        size: 'sm',
        lines: 4,
        static: true,
        width: '100%',
      });
      
      const lines = screen.getAllByRole('status');
      expect(lines).toHaveLength(4);
      
      lines.forEach((line, index) => {
        expect(line).toHaveClass('bg-muted', 'rounded', 'h-4');
        expect(line.className).toMatch(/.*static.*/);
        if (index === lines.length - 1) {
          expect(line.className).toMatch(/.*lastLine.*/);
          expect(line).toHaveStyle({ width: '60%' });
        } else {
          expect(line).toHaveStyle({ width: '100%' });
        }
      });
    });
  });

  describe('Forward Ref', () => {
    it('forwards ref to skeleton element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Skeleton ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toBe(screen.getByRole('status'));
    });

    it('forwards ref to container for multi-line text', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Skeleton ref={ref} variant="text" lines={2} />);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.className).toMatch(/.*textLines.*/);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero lines gracefully', () => {
      renderSkeleton({ variant: 'text', lines: 0 });
      const skeletons = screen.queryAllByRole('status');
      expect(skeletons).toHaveLength(1); // Should render single skeleton when lines <= 1
    });

    it('handles negative lines gracefully', () => {
      renderSkeleton({ variant: 'text', lines: -1 });
      const skeletons = screen.queryAllByRole('status');
      expect(skeletons).toHaveLength(1); // Should render single skeleton when lines <= 1
    });

    it('handles very large lines number', () => {
      renderSkeleton({ variant: 'text', lines: 100 });
      const lines = screen.getAllByRole('status');
      expect(lines).toHaveLength(100);
    });

    it('handles invalid width/height values', () => {
      renderSkeleton({ width: '', height: '' });
      const skeleton = screen.getByRole('status');
      // Empty strings should not set any width or height styles
      const computedStyle = window.getComputedStyle(skeleton);
      expect(skeleton.style.width).toBe('');
      expect(skeleton.style.height).toBe('');
    });
  });
});