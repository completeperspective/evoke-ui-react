import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Card, CardHeader, CardContent, CardFooter } from './Card';

describe('Card', () => {
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<Card>Content</Card>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies default classes correctly', () => {
      const { container } = render(<Card>Content</Card>);
      const cardElement = container.firstChild as HTMLElement;
      
      expect(cardElement).toHaveClass('rounded-lg');
      expect(cardElement).toHaveClass('border');
      expect(cardElement).toHaveClass('bg-card');
      expect(cardElement).toHaveClass('text-card-foreground');
      expect(cardElement).toHaveClass('evoke-card');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref}>Content</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('spreads additional props', () => {
      render(<Card data-testid="card" aria-label="Test card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('aria-label', 'Test card');
    });
  });

  describe('Variants', () => {
    it('applies default variant classes', () => {
      const { container } = render(<Card variant="default">Content</Card>);
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('shadow-sm');
    });

    it('applies outlined variant classes', () => {
      const { container } = render(<Card variant="outlined">Content</Card>);
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('border-2');
      expect(cardElement).toHaveClass('shadow-none');
    });

    it('applies elevated variant classes', () => {
      const { container } = render(<Card variant="elevated">Content</Card>);
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('border-0');
      expect(cardElement).toHaveClass('shadow-lg');
    });

    it('applies interactive variant classes', () => {
      const { container } = render(<Card variant="interactive">Content</Card>);
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('hover:shadow-md');
      expect(cardElement).toHaveClass('cursor-pointer');
    });
  });

  describe('Sizes', () => {
    it('applies small size classes', () => {
      const { container } = render(<Card size="sm">Content</Card>);
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('text-sm');
    });

    it('applies medium size classes (default)', () => {
      const { container } = render(<Card size="md">Content</Card>);
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('text-base');
    });

    it('applies large size classes', () => {
      const { container } = render(<Card size="lg">Content</Card>);
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('text-lg');
    });
  });

  describe('Padding', () => {
    it('applies no padding by default', () => {
      const { container } = render(<Card padding="none">Content</Card>);
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('p-0');
    });

    it('applies small padding', () => {
      const { container } = render(<Card padding="sm">Content</Card>);
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('p-3');
    });

    it('applies medium padding', () => {
      const { container } = render(<Card padding="md">Content</Card>);
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('p-4');
    });

    it('applies large padding', () => {
      const { container } = render(<Card padding="lg">Content</Card>);
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('p-6');
    });
  });

  describe('Interactive Behavior', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(
        <Card onClick={handleClick}>Content</Card>
      );
      
      const card = screen.getByText('Content').closest('div');
      await user.click(card!);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('automatically sets interactive variant when onClick is provided', () => {
      const { container } = render(
        <Card onClick={() => {}}>Content</Card>
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('cursor-pointer');
    });

    it('sets proper accessibility attributes for interactive cards', () => {
      render(
        <Card onClick={() => {}}>Content</Card>
      );
      
      const card = screen.getByText('Content').closest('div');
      expect(card).toHaveAttribute('role', 'button');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('handles keyboard events (Enter)', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(
        <Card onClick={handleClick}>Content</Card>
      );
      
      const card = screen.getByText('Content').closest('div')!;
      card.focus();
      await user.keyboard('{Enter}');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events (Space)', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(
        <Card onClick={handleClick}>Content</Card>
      );
      
      const card = screen.getByText('Content').closest('div')!;
      card.focus();
      await user.keyboard(' ');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('prevents default behavior on space key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(
        <Card onClick={handleClick}>Content</Card>
      );
      
      const card = screen.getByText('Content').closest('div')!;
      card.focus();
      
      const keydownEvent = new KeyboardEvent('keydown', {
        key: ' ',
        bubbles: true,
        cancelable: true,
      });
      const preventDefaultSpy = vi.spyOn(keydownEvent, 'preventDefault');
      
      fireEvent(card, keydownEvent);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Disabled State', () => {
    it('applies disabled styling', () => {
      const { container } = render(
        <Card disabled onClick={() => {}}>Content</Card>
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('opacity-50');
      expect(cardElement).toHaveClass('pointer-events-none');
    });

    it('prevents click events when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(
        <Card disabled onClick={handleClick}>Content</Card>
      );
      
      const card = screen.getByText('Content').closest('div')!;
      await user.click(card);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('prevents keyboard events when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(
        <Card disabled onClick={handleClick}>Content</Card>
      );
      
      const card = screen.getByText('Content').closest('div')!;
      card.focus();
      await user.keyboard('{Enter}');
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('removes accessibility attributes when disabled', () => {
      render(
        <Card disabled onClick={() => {}}>Content</Card>
      );
      
      const card = screen.getByText('Content').closest('div');
      expect(card).not.toHaveAttribute('role');
      expect(card).not.toHaveAttribute('tabIndex');
    });
  });

  describe('Custom Classes', () => {
    it('merges custom className', () => {
      const { container } = render(
        <Card className="custom-class">Content</Card>
      );
      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('custom-class');
      expect(cardElement).toHaveClass('evoke-card');
    });
  });
});

describe('CardHeader', () => {
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<CardHeader>Header content</CardHeader>);
      expect(screen.getByText('Header content')).toBeInTheDocument();
    });

    it('renders title and description', () => {
      render(
        <CardHeader title="Test Title" description="Test Description" />
      );
      
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('applies default classes correctly', () => {
      const { container } = render(<CardHeader>Content</CardHeader>);
      const headerElement = container.firstChild as HTMLElement;
      
      expect(headerElement).toHaveClass('flex');
      expect(headerElement).toHaveClass('flex-col');
      expect(headerElement).toHaveClass('space-y-1.5');
      expect(headerElement).toHaveClass('evoke-card-header');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardHeader ref={ref}>Content</CardHeader>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Title and Description Styling', () => {
    it('applies correct title styles for different sizes', () => {
      const { rerender } = render(
        <CardHeader title="Title" size="sm" />
      );
      let title = screen.getByText('Title');
      expect(title).toHaveClass('text-base');

      rerender(<CardHeader title="Title" size="md" />);
      title = screen.getByText('Title');
      expect(title).toHaveClass('text-lg');

      rerender(<CardHeader title="Title" size="lg" />);
      title = screen.getByText('Title');
      expect(title).toHaveClass('text-xl');
    });

    it('applies correct description styles for different sizes', () => {
      const { rerender } = render(
        <CardHeader description="Description" size="sm" />
      );
      let description = screen.getByText('Description');
      expect(description).toHaveClass('text-xs');

      rerender(<CardHeader description="Description" size="md" />);
      description = screen.getByText('Description');
      expect(description).toHaveClass('text-sm');

      rerender(<CardHeader description="Description" size="lg" />);
      description = screen.getByText('Description');
      expect(description).toHaveClass('text-base');
    });
  });

  describe('Alignments', () => {
    it('applies start alignment (default)', () => {
      const { container } = render(<CardHeader align="start">Content</CardHeader>);
      const headerElement = container.firstChild as HTMLElement;
      expect(headerElement).toHaveClass('text-left');
    });

    it('applies center alignment', () => {
      const { container } = render(<CardHeader align="center">Content</CardHeader>);
      const headerElement = container.firstChild as HTMLElement;
      expect(headerElement).toHaveClass('text-center');
      expect(headerElement).toHaveClass('items-center');
    });

    it('applies end alignment', () => {
      const { container } = render(<CardHeader align="end">Content</CardHeader>);
      const headerElement = container.firstChild as HTMLElement;
      expect(headerElement).toHaveClass('text-right');
      expect(headerElement).toHaveClass('items-end');
    });
  });

  describe('Border', () => {
    it('applies border when enabled', () => {
      const { container } = render(<CardHeader border>Content</CardHeader>);
      const headerElement = container.firstChild as HTMLElement;
      expect(headerElement).toHaveClass('border-b');
    });

    it('does not apply border by default', () => {
      const { container } = render(<CardHeader>Content</CardHeader>);
      const headerElement = container.firstChild as HTMLElement;
      expect(headerElement).not.toHaveClass('border-b');
    });
  });

  describe('Size Variants', () => {
    it('applies correct padding for small size', () => {
      const { container } = render(<CardHeader size="sm">Content</CardHeader>);
      const headerElement = container.firstChild as HTMLElement;
      expect(headerElement).toHaveClass('px-3');
      expect(headerElement).toHaveClass('py-2');
    });

    it('applies correct padding for medium size', () => {
      const { container } = render(<CardHeader size="md">Content</CardHeader>);
      const headerElement = container.firstChild as HTMLElement;
      expect(headerElement).toHaveClass('px-4');
      expect(headerElement).toHaveClass('py-3');
    });

    it('applies correct padding for large size', () => {
      const { container } = render(<CardHeader size="lg">Content</CardHeader>);
      const headerElement = container.firstChild as HTMLElement;
      expect(headerElement).toHaveClass('px-6');
      expect(headerElement).toHaveClass('py-4');
    });
  });
});

describe('CardContent', () => {
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<CardContent>Content</CardContent>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies default classes correctly', () => {
      const { container } = render(<CardContent>Content</CardContent>);
      const contentElement = container.firstChild as HTMLElement;
      expect(contentElement).toHaveClass('text-card-foreground');
      expect(contentElement).toHaveClass('evoke-card-content');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardContent ref={ref}>Content</CardContent>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Size Variants', () => {
    it('applies correct padding for small size', () => {
      const { container } = render(<CardContent size="sm">Content</CardContent>);
      const contentElement = container.firstChild as HTMLElement;
      expect(contentElement).toHaveClass('px-3');
      expect(contentElement).toHaveClass('py-2');
    });

    it('applies correct padding for medium size (default)', () => {
      const { container } = render(<CardContent size="md">Content</CardContent>);
      const contentElement = container.firstChild as HTMLElement;
      expect(contentElement).toHaveClass('px-4');
      expect(contentElement).toHaveClass('py-3');
    });

    it('applies correct padding for large size', () => {
      const { container } = render(<CardContent size="lg">Content</CardContent>);
      const contentElement = container.firstChild as HTMLElement;
      expect(contentElement).toHaveClass('px-6');
      expect(contentElement).toHaveClass('py-4');
    });
  });

  describe('Spacing Variants', () => {
    it('applies no padding when spacing is none', () => {
      const { container } = render(<CardContent spacing="none">Content</CardContent>);
      const contentElement = container.firstChild as HTMLElement;
      expect(contentElement).toHaveClass('p-0');
    });

    it('applies tight spacing with small size', () => {
      const { container } = render(
        <CardContent size="sm" spacing="tight">Content</CardContent>
      );
      const contentElement = container.firstChild as HTMLElement;
      expect(contentElement).toHaveClass('px-3');
      expect(contentElement).toHaveClass('py-1.5');
    });

    it('applies relaxed spacing with large size', () => {
      const { container } = render(
        <CardContent size="lg" spacing="relaxed">Content</CardContent>
      );
      const contentElement = container.firstChild as HTMLElement;
      expect(contentElement).toHaveClass('px-6');
      expect(contentElement).toHaveClass('py-6');
    });
  });
});

describe('CardFooter', () => {
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<CardFooter>Footer content</CardFooter>);
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    it('applies default classes correctly', () => {
      const { container } = render(<CardFooter>Content</CardFooter>);
      const footerElement = container.firstChild as HTMLElement;
      expect(footerElement).toHaveClass('flex');
      expect(footerElement).toHaveClass('items-center');
      expect(footerElement).toHaveClass('evoke-card-footer');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardFooter ref={ref}>Content</CardFooter>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Alignment Variants', () => {
    it('applies start alignment (default)', () => {
      const { container } = render(<CardFooter align="start">Content</CardFooter>);
      const footerElement = container.firstChild as HTMLElement;
      expect(footerElement).toHaveClass('justify-start');
    });

    it('applies center alignment', () => {
      const { container } = render(<CardFooter align="center">Content</CardFooter>);
      const footerElement = container.firstChild as HTMLElement;
      expect(footerElement).toHaveClass('justify-center');
    });

    it('applies end alignment', () => {
      const { container } = render(<CardFooter align="end">Content</CardFooter>);
      const footerElement = container.firstChild as HTMLElement;
      expect(footerElement).toHaveClass('justify-end');
    });

    it('applies space between alignment', () => {
      const { container } = render(<CardFooter align="between">Content</CardFooter>);
      const footerElement = container.firstChild as HTMLElement;
      expect(footerElement).toHaveClass('justify-between');
    });

    it('applies space around alignment', () => {
      const { container } = render(<CardFooter align="around">Content</CardFooter>);
      const footerElement = container.firstChild as HTMLElement;
      expect(footerElement).toHaveClass('justify-around');
    });
  });

  describe('Border', () => {
    it('applies border when enabled', () => {
      const { container } = render(<CardFooter border>Content</CardFooter>);
      const footerElement = container.firstChild as HTMLElement;
      expect(footerElement).toHaveClass('border-t');
    });

    it('does not apply border by default', () => {
      const { container } = render(<CardFooter>Content</CardFooter>);
      const footerElement = container.firstChild as HTMLElement;
      expect(footerElement).not.toHaveClass('border-t');
    });
  });

  describe('Size Variants', () => {
    it('applies correct padding for small size', () => {
      const { container } = render(<CardFooter size="sm">Content</CardFooter>);
      const footerElement = container.firstChild as HTMLElement;
      expect(footerElement).toHaveClass('px-3');
      expect(footerElement).toHaveClass('py-2');
      expect(footerElement).toHaveClass('gap-2');
    });

    it('applies correct padding for medium size (default)', () => {
      const { container } = render(<CardFooter size="md">Content</CardFooter>);
      const footerElement = container.firstChild as HTMLElement;
      expect(footerElement).toHaveClass('px-4');
      expect(footerElement).toHaveClass('py-3');
      expect(footerElement).toHaveClass('gap-2');
    });

    it('applies correct padding for large size', () => {
      const { container } = render(<CardFooter size="lg">Content</CardFooter>);
      const footerElement = container.firstChild as HTMLElement;
      expect(footerElement).toHaveClass('px-6');
      expect(footerElement).toHaveClass('py-4');
      expect(footerElement).toHaveClass('gap-3');
    });
  });
});

describe('Card Integration', () => {
  it('renders complete card with all subcomponents', () => {
    render(
      <Card>
        <CardHeader title="Test Title" description="Test Description" />
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Footer')).toBeInTheDocument();
  });

  it('maintains proper semantic structure', () => {
    render(
      <Card>
        <CardHeader title="Test Title" />
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>
    );
    
    const title = screen.getByText('Test Title');
    expect(title.tagName).toBe('H3');
  });

  it('supports consistent sizing across subcomponents', () => {
    const { container } = render(
      <Card size="lg">
        <CardHeader title="Title" size="lg" />
        <CardContent size="lg">Content</CardContent>
        <CardFooter size="lg">Footer</CardFooter>
      </Card>
    );
    
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('text-lg');
    
    const header = screen.getByText('Title').closest('div');
    expect(header).toHaveClass('px-6');
    
    const content = screen.getByText('Content');
    expect(content).toHaveClass('px-6');
    
    const footer = screen.getByText('Footer');
    expect(footer).toHaveClass('px-6');
  });
});
