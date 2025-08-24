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

  describe('Shape Variants', () => {
    it('renders default shape', () => {
      renderSkeleton({ shape: 'default' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('bg-muted', 'rounded-md');
    });

    it('renders card shape', () => {
      renderSkeleton({ shape: 'card' });
      const skeleton = screen.getByRole('status');
      // Card shape includes enhanced styling from compound variants
      expect(skeleton).toHaveClass('bg-muted', 'rounded-lg', 'min-h-[8rem]', 'shadow-sm');
      expect(skeleton).toHaveClass('relative', 'overflow-hidden', 'border');
    });

    it('renders text shape', () => {
      renderSkeleton({ shape: 'text' });
      const skeleton = screen.getByRole('status');
      // Text shape includes size-specific height from compound variants
      expect(skeleton).toHaveClass('bg-muted', 'rounded-sm', 'min-h-[1rem]');
      expect(skeleton).toHaveClass('h-5'); // From text + md size compound variant
    });

    it('renders circle shape', () => {
      renderSkeleton({ shape: 'circle' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('bg-muted', 'rounded-full', 'aspect-square');
    });

    it('renders button shape', () => {
      renderSkeleton({ shape: 'button' });
      const skeleton = screen.getByRole('status');
      // Button shape includes explicit dimensions from compound variants
      expect(skeleton).toHaveClass('bg-muted', 'rounded-md', 'min-w-[5rem]', 'min-h-[2.5rem]');
    });

    it('renders avatar shape', () => {
      renderSkeleton({ shape: 'avatar' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('bg-muted', 'rounded-full', 'aspect-square', 'border-2');
    });
    
    // Legacy variant prop support
    it('supports legacy variant prop', () => {
      renderSkeleton({ variant: 'circle' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('rounded-full', 'aspect-square');
    });
  });

  describe('Sizes', () => {
    it('renders extra small size', () => {
      renderSkeleton({ size: 'xs' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('min-w-[1.5rem]', 'min-h-[0.75rem]');
    });

    it('renders small size', () => {
      renderSkeleton({ size: 'sm' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('min-w-[2rem]', 'min-h-[1rem]');
    });

    it('renders medium size (default)', () => {
      renderSkeleton({ size: 'md' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('min-w-[3rem]', 'min-h-[1.25rem]');
    });

    it('renders large size', () => {
      renderSkeleton({ size: 'lg' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('min-w-[4rem]', 'min-h-[1.5rem]');
    });

    it('renders extra large size', () => {
      renderSkeleton({ size: 'xl' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('min-w-[6rem]', 'min-h-[2rem]');
    });
    
    // Test size compounds with shapes
    it('applies size correctly to text shape', () => {
      renderSkeleton({ shape: 'text', size: 'lg' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('h-6');
    });
    
    it('applies size correctly to circle shape', () => {
      renderSkeleton({ shape: 'circle', size: 'lg' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('min-w-[3rem]', 'min-h-[3rem]', 'w-[3rem]', 'h-[3rem]');
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
    it('has pulse animation by default', () => {
      renderSkeleton();
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('animate-pulse');
    });

    it('applies static animation', () => {
      renderSkeleton({ animation: 'static' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('animate-none');
      expect(skeleton.className).toMatch(/.*static.*/);
    });
    
    it('applies shimmer animation', () => {
      renderSkeleton({ animation: 'shimmer' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('animate-none'); // CVA removes pulse
      expect(skeleton.className).toMatch(/.*shimmer.*/);
    });

    it('supports legacy static prop', () => {
      renderSkeleton({ static: true });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('animate-none');
      expect(skeleton.className).toMatch(/.*static.*/);
    });
  });

  describe('Multi-line Text', () => {
    it('renders single line by default', () => {
      renderSkeleton({ shape: 'text' });
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getAllByRole('status')).toHaveLength(1);
    });

    it('renders multiple lines with string format', () => {
      renderSkeleton({ shape: 'text', lines: 'lines3' });
      const skeletons = screen.getAllByRole('status');
      expect(skeletons).toHaveLength(3);
    });
    
    it('renders multiple lines with numeric format', () => {
      renderSkeleton({ shape: 'text', lines: 4 });
      const skeletons = screen.getAllByRole('status');
      expect(skeletons).toHaveLength(4);
    });

    it('applies textLines class for multi-line', () => {
      renderSkeleton({ shape: 'text', lines: 'lines2', className: 'custom-class' });
      const container = screen.getAllByRole('status')[0].parentElement;
      expect(container?.className).toMatch(/.*textLines.*/);
      expect(container).toHaveClass('custom-class');
    });

    it('makes last line shorter in multi-line text', () => {
      renderSkeleton({ shape: 'text', lines: 3 });
      const lines = screen.getAllByRole('status');
      const lastLine = lines[lines.length - 1];
      expect(lastLine).toHaveClass('w-[60%]', 'max-w-[75%]');
    });

    it('ignores lines prop for non-text shapes', () => {
      renderSkeleton({ shape: 'circle', lines: 3 });
      expect(screen.getAllByRole('status')).toHaveLength(1);
    });
    
    it('applies staggered animation delays', () => {
      renderSkeleton({ shape: 'text', lines: 'lines3' });
      const lines = screen.getAllByRole('status');
      expect(lines[1]).toHaveClass('[animation-delay:0.1s]');
      expect(lines[2]).toHaveClass('[animation-delay:0.2s]');
    });
    
    // Legacy lines as number
    it('handles legacy numeric lines prop', () => {
      renderSkeleton({ variant: 'text', lines: 2 });
      expect(screen.getAllByRole('status')).toHaveLength(2);
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

  describe('Aspect Ratios', () => {
    it('applies square aspect ratio', () => {
      renderSkeleton({ shape: 'card', aspectRatio: 'square' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('aspect-square');
    });

    it('applies wide aspect ratio', () => {
      renderSkeleton({ shape: 'card', aspectRatio: 'wide' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('aspect-[3/2]');
    });

    it('applies tall aspect ratio', () => {
      renderSkeleton({ aspectRatio: 'tall' });
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('aspect-[2/3]');
    });
  });

  describe('Combined Props', () => {
    it('handles multiple props correctly', () => {
      renderSkeleton({
        shape: 'card',
        size: 'lg',
        width: 300,
        height: 200,
        animation: 'static',
        aspectRatio: 'wide',
        className: 'custom-skeleton',
      });
      
      const skeleton = screen.getByRole('status');
      // Check for key CVA classes without testing all base classes
      expect(skeleton).toHaveClass('bg-muted'); 
      expect(skeleton).toHaveClass('rounded-lg');
      expect(skeleton).toHaveClass('min-h-[8rem]');
      expect(skeleton).toHaveClass('shadow-sm');
      expect(skeleton).toHaveClass('aspect-[3/2]');
      expect(skeleton).toHaveClass('animate-none');
      expect(skeleton).toHaveClass('custom-skeleton');
      expect(skeleton.className).toMatch(/.*static.*/);
      expect(skeleton).toHaveStyle({
        width: '300px',
        height: '200px',
      });
    });

    it('handles text shape with multiple lines and custom props', () => {
      renderSkeleton({
        shape: 'text',
        size: 'sm',
        lines: 'lines4',
        animation: 'shimmer',
        width: '100%',
      });
      
      const lines = screen.getAllByRole('status');
      expect(lines).toHaveLength(4);
      
      lines.forEach((line, index) => {
        expect(line).toHaveClass('bg-muted', 'rounded-sm', 'h-4', 'animate-none');
        expect(line.className).toMatch(/.*shimmer.*/);
        if (index === lines.length - 1) {
          expect(line).toHaveClass('w-[60%]', 'max-w-[75%]');
        } else {
          expect(line).toHaveClass('w-full');
        }
      });
    });
    
    it('handles legacy props with new props', () => {
      renderSkeleton({
        variant: 'circle', // Legacy
        shape: 'button', // New prop should override
        size: 'lg',
        static: true, // Legacy
        animation: 'shimmer', // Animation should be static due to legacy prop
      });
      
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('rounded-md'); // Button shape wins
      expect(skeleton).toHaveClass('animate-none'); // Static wins over shimmer
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
      render(<Skeleton ref={ref} shape="text" lines="lines2" />);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.className).toMatch(/.*textLines.*/);
    });
  });

  describe('Edge Cases', () => {
    it('handles zero lines gracefully', () => {
      renderSkeleton({ shape: 'text', lines: 0 });
      const skeletons = screen.queryAllByRole('status');
      expect(skeletons).toHaveLength(1); // Should render single skeleton when lines <= 1
    });

    it('handles negative lines gracefully', () => {
      renderSkeleton({ shape: 'text', lines: -1 });
      const skeletons = screen.queryAllByRole('status');
      expect(skeletons).toHaveLength(1); // Should render single skeleton when lines <= 1
    });

    it('handles very large lines number', () => {
      renderSkeleton({ shape: 'text', lines: 100 });
      const lines = screen.getAllByRole('status');
      expect(lines).toHaveLength(5); // Should cap at lines5 (5 lines max)
    });
    
    it('handles lines beyond maximum', () => {
      renderSkeleton({ shape: 'text', lines: 10 });
      const lines = screen.getAllByRole('status');
      expect(lines).toHaveLength(5); // Capped at 5 lines
    });

    it('handles invalid width/height values', () => {
      renderSkeleton({ width: '', height: '' });
      const skeleton = screen.getByRole('status');
      // Empty strings should not set any width or height styles
      expect(skeleton.style.width).toBe('');
      expect(skeleton.style.height).toBe('');
    });
    
    it('handles mixed prop types', () => {
      renderSkeleton({ 
        variant: 'text', // Legacy
        shape: undefined, // Should use variant
        lines: 'lines3', // String format
      });
      const lines = screen.getAllByRole('status');
      expect(lines).toHaveLength(3);
      expect(lines[0]).toHaveClass('rounded-sm'); // Text shape
    });
  });
});