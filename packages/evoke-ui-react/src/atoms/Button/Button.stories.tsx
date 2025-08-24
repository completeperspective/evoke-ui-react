import type { Meta, StoryObj } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { Button } from './Button';
import { useState } from 'react';

// Mock icons for demonstration
const ChevronRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

const HeartIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Primary UI component for user interaction with multiple variants, sizes, states, and icon support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'The size variant of the button',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in a loading state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
    },
    children: {
      control: { type: 'text' },
      description: 'The content of the button',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback fired when button is clicked',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};

// Size variants
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    children: <HeartIcon />,
    'aria-label': 'Like',
  },
};

// States
export const Loading: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-2 items-center">
        <Button size="sm" loading>
          Small Loading
        </Button>
        <Button size="md" loading>
          Medium Loading
        </Button>
        <Button size="lg" loading>
          Large Loading
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading state with spinner shown alongside button text in all sizes and variants.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const LoadingDisabled: Story = {
  args: {
    loading: true,
    disabled: true,
    children: 'Loading Disabled',
  },
};

// With icons
export const WithStartIcon: Story = {
  args: {
    startIcon: <PlusIcon />,
    children: 'Add Item',
  },
};

export const WithEndIcon: Story = {
  args: {
    endIcon: <ChevronRightIcon />,
    children: 'Continue',
  },
};

export const WithBothIcons: Story = {
  args: {
    startIcon: <DownloadIcon />,
    endIcon: <ChevronRightIcon />,
    children: 'Download',
  },
};

export const IconOnly: Story = {
  args: {
    size: 'icon',
    children: <DownloadIcon />,
    'aria-label': 'Download',
  },
};

// Interactive example
const InteractiveTemplate = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setCount((prev) => prev + 1);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <Button loading={loading} onClick={handleClick}>
        Click me ({count})
      </Button>
      <p className="text-sm text-muted-foreground">Clicked {count} times</p>
    </div>
  );
};

export const Interactive: Story = {
  render: InteractiveTemplate,
  parameters: {
    docs: {
      description: {
        story: 'An interactive example showing loading state and click handling.',
      },
    },
  },
};

// All variants showcase
const AllVariantsTemplate = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">Variants</h4>
      <div className="space-y-component-xs space-x-component-xs">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>

    <div className="flex flex-col">
      <h4 className="text-sm font-semibold">Sizes</h4>
      <div className="space-y-component-xs space-x-component-xs">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Heart">
          <HeartIcon />
        </Button>
      </div>
    </div>

    <div className="flex flex-col">
      <h4 className="text-sm font-semibold">States</h4>
      <div className="space-y-component-xs space-x-component-xs">
        <Button>Normal</Button>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button startIcon={<PlusIcon />}>With Icon</Button>
      </div>
    </div>
  </div>
);

export const AllVariants: Story = {
  render: AllVariantsTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all button variants, sizes, and states.',
      },
    },
  },
};
