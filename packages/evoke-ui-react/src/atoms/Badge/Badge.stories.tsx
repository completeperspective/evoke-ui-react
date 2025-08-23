import type { Meta, StoryObj } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { Badge } from './Badge';
import { useState } from 'react';

// Mock icons for demonstration
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const AlertIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const InfoIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const UserIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badge component for displaying status indicators, labels, and removable tags with various styles and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'success', 'warning', 'info', 'outline'],
      description: 'The visual style variant of the badge',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size variant of the badge',
    },
    removable: {
      control: { type: 'boolean' },
      description: 'Whether the badge can be removed',
    },
    children: {
      control: { type: 'text' },
      description: 'The content of the badge',
    },
    onRemove: {
      action: 'removed',
      description: 'Callback fired when badge is removed',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    children: 'Default',
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
    children: 'Error',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
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

// With icons
export const WithStartIcon: Story = {
  args: {
    variant: 'success',
    startIcon: <CheckIcon />,
    children: 'Completed',
  },
};

export const WithEndIcon: Story = {
  args: {
    variant: 'info',
    endIcon: <InfoIcon />,
    children: 'Information',
  },
};

export const WithBothIcons: Story = {
  args: {
    variant: 'warning',
    startIcon: <AlertIcon />,
    endIcon: <XIcon />,
    children: 'Alert',
  },
};

// Removable badges
export const Removable: Story = {
  args: {
    removable: true,
    children: 'Removable',
  },
};

export const RemovableWithIcon: Story = {
  args: {
    variant: 'secondary',
    removable: true,
    startIcon: <UserIcon />,
    children: 'John Doe',
  },
};

// Status indicators
export const StatusOnline: Story = {
  args: {
    variant: 'success',
    size: 'sm',
    children: 'Online',
  },
};

export const StatusOffline: Story = {
  args: {
    variant: 'destructive',
    size: 'sm',
    children: 'Offline',
  },
};

export const StatusPending: Story = {
  args: {
    variant: 'warning',
    size: 'sm',
    children: 'Pending',
  },
};

// Interactive example with removable badges
const TagListTemplate = () => {
  const [tags, setTags] = useState([
    { id: 1, label: 'React', variant: 'default' as const },
    { id: 2, label: 'TypeScript', variant: 'info' as const },
    { id: 3, label: 'Storybook', variant: 'success' as const },
    { id: 4, label: 'CSS', variant: 'secondary' as const },
    { id: 5, label: 'Design System', variant: 'warning' as const },
  ]);

  const removeTag = (id: number) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  const addTag = () => {
    const newId = Math.max(...tags.map(t => t.id), 0) + 1;
    const variants = ['default', 'secondary', 'info', 'success', 'warning'] as const;
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    setTags([...tags, {
      id: newId,
      label: `Tag ${newId}`,
      variant: randomVariant
    }]);
  };

  const resetTags = () => {
    setTags([
      { id: 1, label: 'React', variant: 'default' as const },
      { id: 2, label: 'TypeScript', variant: 'info' as const },
      { id: 3, label: 'Storybook', variant: 'success' as const },
      { id: 4, label: 'CSS', variant: 'secondary' as const },
      { id: 5, label: 'Design System', variant: 'warning' as const },
    ]);
  };

  return (
    <div className="space-y-4 w-96">
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge
            key={tag.id}
            variant={tag.variant}
            removable
            onRemove={() => removeTag(tag.id)}
          >
            {tag.label}
          </Badge>
        ))}
        {tags.length === 0 && (
          <p className="text-sm text-muted-foreground">No tags remaining</p>
        )}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={addTag}
          className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Add Tag
        </button>
        <button
          type="button"
          onClick={resetTags}
          className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded hover:bg-secondary/90"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export const InteractiveTagList: Story = {
  render: TagListTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Interactive example showing removable badges that can be added and removed dynamically.',
      },
    },
  },
};

// Status dashboard example
const StatusDashboardTemplate = () => (
  <div className="space-y-6">
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">System Status</h4>
      <div className="flex flex-wrap gap-2">
        <Badge variant="success" startIcon={<CheckIcon />}>API Online</Badge>
        <Badge variant="success" startIcon={<CheckIcon />}>Database Connected</Badge>
        <Badge variant="warning" startIcon={<AlertIcon />}>High Memory Usage</Badge>
        <Badge variant="info" startIcon={<InfoIcon />}>Maintenance Mode</Badge>
      </div>
    </div>
    
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">User Roles</h4>
      <div className="flex flex-wrap gap-2">
        <Badge variant="default" startIcon={<UserIcon />} size="sm">Admin</Badge>
        <Badge variant="secondary" startIcon={<UserIcon />} size="sm">Editor</Badge>
        <Badge variant="outline" startIcon={<UserIcon />} size="sm">Viewer</Badge>
        <Badge variant="info" startIcon={<StarIcon />} size="sm">Premium</Badge>
      </div>
    </div>
    
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">Project Tags</h4>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" removable>Frontend</Badge>
        <Badge variant="info" removable>Backend</Badge>
        <Badge variant="success" removable>Completed</Badge>
        <Badge variant="warning" removable>In Progress</Badge>
        <Badge variant="destructive" removable>Blocked</Badge>
      </div>
    </div>
  </div>
);

export const StatusDashboard: Story = {
  render: StatusDashboardTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Example dashboard showing various badge use cases for status indicators and categorization.',
      },
    },
  },
};

// All variants showcase
const AllVariantsTemplate = () => (
  <div className="grid grid-cols-1 gap-6 w-full max-w-2xl">
    <div className="space-y-3">
      <h4 className="text-sm font-semibold">Variants</h4>
      <div className="flex flex-wrap gap-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    </div>
    
    <div className="space-y-3">
      <h4 className="text-sm font-semibold">Sizes</h4>
      <div className="flex flex-wrap items-center gap-2">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>
    </div>
    
    <div className="space-y-3">
      <h4 className="text-sm font-semibold">With Icons</h4>
      <div className="flex flex-wrap gap-2">
        <Badge variant="success" startIcon={<CheckIcon />}>Success</Badge>
        <Badge variant="warning" startIcon={<AlertIcon />}>Warning</Badge>
        <Badge variant="info" endIcon={<InfoIcon />}>Info</Badge>
        <Badge variant="destructive" startIcon={<AlertIcon />} endIcon={<XIcon />}>Error</Badge>
      </div>
    </div>
    
    <div className="space-y-3">
      <h4 className="text-sm font-semibold">Removable</h4>
      <div className="flex flex-wrap gap-2">
        <Badge removable>Tag 1</Badge>
        <Badge variant="secondary" removable startIcon={<UserIcon />}>User Tag</Badge>
        <Badge variant="info" removable>Removable Info</Badge>
      </div>
    </div>
  </div>
);

export const AllVariants: Story = {
  render: AllVariantsTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all badge variants, sizes, states, and configurations.',
      },
    },
  },
};