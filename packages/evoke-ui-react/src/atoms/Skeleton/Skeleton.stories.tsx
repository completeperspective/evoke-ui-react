import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { useState, useEffect } from 'react';

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Loading placeholder component with shimmer animation, multiple variants, and multi-line support. Includes reduced motion and accessibility support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'card', 'text', 'circle', 'button', 'avatar'],
      description: 'The visual variant of the skeleton',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The size variant (height) of the skeleton',
    },
    width: {
      control: { type: 'text' },
      description: 'Custom width (CSS value)',
    },
    height: {
      control: { type: 'text' },
      description: 'Custom height (CSS value)',
    },
    static: {
      control: { type: 'boolean' },
      description: 'Disable the shimmer animation',
    },
    lines: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of lines for text skeleton',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    width: '200px',
  },
};

export const Card: Story = {
  args: {
    shape: 'card',
    width: '300px',
    height: '200px',
  },
};

export const Text: Story = {
  args: {
    shape: 'text',
    width: '250px',
  },
};

export const Circle: Story = {
  args: {
    shape: 'circle',
    width: '48px',
    height: '48px',
  },
};

export const Button: Story = {
  args: {
    shape: 'button',
    width: '120px',
    height: '40px',
  },
};

export const Avatar: Story = {
  args: {
    shape: 'avatar',
    width: '64px',
    height: '64px',
  },
};

// Size shapes
export const Small: Story = {
  args: {
    size: 'sm',
    width: '150px',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    width: '200px',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    width: '250px',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    width: '300px',
  },
};

// Multi-line text skeletons
export const TextLines: Story = {
  args: {
    shape: 'text',
    lines: 3,
    width: '100%',
  },
};

export const ParagraphSkeleton: Story = {
  args: {
    shape: 'text',
    lines: 5,
    width: '100%',
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

// Static (no animation)
export const StaticSkeleton: Story = {
  args: {
    static: true,
    width: '200px',
  },
};

// Card layout examples
const UserCardSkeletonTemplate = () => (
  <div className="max-w-2xl rounded-lg border border-border p-6 space-y-4">
    <div className="flex items-center space-x-4">
      <Skeleton shape="avatar" width="60px" height="60px" />
      <div className="space-y-2 flex-1">
        <Skeleton shape="text" width="120px" height="20px" />
        <Skeleton shape="text" width="80px" height="16px" />
      </div>
    </div>

    <div className="space-y-2">
      <Skeleton shape="text" width="100%" height="16px" />
      <Skeleton shape="text" width="80%" height="16px" />
      <Skeleton shape="text" width="60%" height="16px" />
    </div>

    <div className="flex space-x-2">
      <Skeleton shape="button" width="80px" height="36px" />
      <Skeleton shape="button" width="100px" height="36px" />
    </div>
  </div>
);

export const UserCardSkeleton: Story = {
  render: UserCardSkeletonTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Example user card skeleton showing avatar, text content, and action buttons.',
      },
    },
  },
};

const ArticleCardSkeletonTemplate = () => (
  <div className="max-w-2xl rounded-lg border border-border overflow-hidden">
    <Skeleton shape="card" width="100%" height="200px" />
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <Skeleton shape="text" width="100%" height="24px" />
        <Skeleton shape="text" width="80%" height="20px" />
      </div>

      <div className="space-y-2">
        <Skeleton shape="text" lines={3} width="100%" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Skeleton shape="circle" width="32px" height="32px" />
          <Skeleton shape="text" width="80px" height="16px" />
        </div>
        <Skeleton shape="text" width="60px" height="16px" />
      </div>
    </div>
  </div>
);

export const ArticleCardSkeleton: Story = {
  render: ArticleCardSkeletonTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Example article card skeleton with image, title, content, and metadata areas.',
      },
    },
  },
};

const DashboardSkeletonTemplate = () => (
  <div className="space-y-6 max-w-4xl">
    <div className="flex items-center justify-between">
      <Skeleton shape="text" width="200px" height="32px" />
      <Skeleton shape="button" width="100px" height="40px" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="rounded-lg border border-border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton shape="text" width="80px" height="16px" />
          <Skeleton shape="circle" width="24px" height="24px" />
        </div>
        <Skeleton shape="text" width="60px" height="32px" />
        <Skeleton shape="text" width="120px" height="14px" />
      </div>

      <div className="rounded-lg border border-border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton shape="text" width="100px" height="16px" />
          <Skeleton shape="circle" width="24px" height="24px" />
        </div>
        <Skeleton shape="text" width="80px" height="32px" />
        <Skeleton shape="text" width="140px" height="14px" />
      </div>

      <div className="rounded-lg border border-border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton shape="text" width="70px" height="16px" />
          <Skeleton shape="circle" width="24px" height="24px" />
        </div>
        <Skeleton shape="text" width="50px" height="32px" />
        <Skeleton shape="text" width="110px" height="14px" />
      </div>
    </div>

    <div className="rounded-lg border border-border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton shape="text" width="150px" height="24px" />
        <Skeleton shape="button" width="120px" height="36px" />
      </div>

      <div className="space-y-3">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 border border-border rounded">
            <Skeleton shape="circle" width="40px" height="40px" />
            <div className="flex-1 space-y-2">
              <Skeleton shape="text" width={`${Math.random() * 40 + 60}%`} height="16px" />
              <Skeleton shape="text" width={`${Math.random() * 30 + 40}%`} height="14px" />
            </div>
            <Skeleton shape="button" width="80px" height="32px" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const DashboardSkeleton: Story = {
  render: DashboardSkeletonTemplate,
  parameters: {
    docs: {
      description: {
        story:
          'Complex dashboard skeleton showing stats cards, data table, and various content areas.',
      },
    },
  },
};

// Loading simulation
const LoadingSimulationTemplate = () => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setContent(
        'Content has finished loading! This demonstrates the transition from skeleton to actual content.',
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const resetLoading = () => {
    setLoading(true);
    setContent('');
    setTimeout(() => {
      setLoading(false);
      setContent(
        'Content has finished loading! This demonstrates the transition from skeleton to actual content.',
      );
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Loading Simulation</h3>
        <button
          onClick={resetLoading}
          className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
        >
          Reload
        </button>
      </div>

      <div className="rounded-lg border border-border p-6">
        {loading ? (
          <div className="space-y-4">
            <Skeleton variant="text" width="80%" height="24px" />
            <Skeleton variant="text" lines={4} width="100%" />
            <div className="flex space-x-2">
              <Skeleton variant="button" width="80px" height="32px" />
              <Skeleton variant="button" width="100px" height="32px" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">Loaded Content</h4>
            <p className="text-muted-foreground">{content}</p>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                Action 1
              </button>
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition-colors">
                Action 2
              </button>
            </div>
          </div>
        )}
      </div>

      {loading && (
        <p className="text-sm text-muted-foreground text-center">
          Loading will complete in 3 seconds...
        </p>
      )}
    </div>
  );
};

export const LoadingSimulation: Story = {
  render: LoadingSimulationTemplate,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example showing the transition from skeleton loading state to actual content.',
      },
    },
  },
};

// All variants showcase
const AllVariantsTemplate = () => (
  <div className="space-y-8 w-full max-w-4xl">
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Skeleton Variants</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <p className="text-sm font-medium">Default</p>
          <Skeleton width="150px" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Text</p>
          <Skeleton variant="text" width="200px" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Circle</p>
          <Skeleton variant="circle" width="48px" height="48px" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Button</p>
          <Skeleton variant="button" width="100px" height="36px" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Avatar</p>
          <Skeleton variant="avatar" width="56px" height="56px" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Card</p>
          <Skeleton variant="card" width="120px" height="80px" />
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sizes</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-4">
          <span className="text-sm w-12">SM</span>
          <Skeleton size="sm" width="200px" />
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm w-12">MD</span>
          <Skeleton size="md" width="200px" />
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm w-12">LG</span>
          <Skeleton size="lg" width="200px" />
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm w-12">XL</span>
          <Skeleton size="xl" width="200px" />
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Multi-line Text</h3>
      <div className="max-w-md space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">3 Lines</p>
          <Skeleton variant="text" lines={3} width="100%" />
        </div>

        <div>
          <p className="text-sm font-medium mb-2">5 Lines</p>
          <Skeleton variant="text" lines={5} width="100%" />
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Animation States</h3>
      <div className="grid grid-cols-2 gap-6 max-w-md">
        <div className="space-y-2">
          <p className="text-sm font-medium">Animated (Default)</p>
          <Skeleton width="150px" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Static</p>
          <Skeleton static width="150px" />
        </div>
      </div>
    </div>
  </div>
);

export const AllVariants: Story = {
  render: AllVariantsTemplate,
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive showcase of all skeleton variants, sizes, multi-line text, and animation states.',
      },
    },
  },
};
