import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './Separator';

const meta = {
  title: 'Atoms/Separator',
  component: Separator,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Separator component for creating visual divisions between content with horizontal and vertical orientations, labels, and semantic roles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'muted', 'accent', 'primary'],
      description: 'The color variant of the separator',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The thickness of the separator',
    },
    label: {
      control: { type: 'text' },
      description: 'Optional label to display with the separator',
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'Position of the label (for horizontal separators)',
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic orientations
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  decorators: [
    (Story) => (
      <div className="h-32 flex items-center">
        <Story />
      </div>
    ),
  ],
};

// Variants
export const Default: Story = {
  args: {
    variant: 'default',
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
};

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const Medium: Story = {
  args: {
    size: 'md',
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const Large: Story = {
  args: {
    size: 'lg',
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
};

// With labels
export const WithLabel: Story = {
  args: {
    orientation: 'horizontal',
    label: 'OR',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const LabelLeft: Story = {
  args: {
    orientation: 'horizontal',
    label: 'Section A',
    labelPosition: 'left',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const LabelCenter: Story = {
  args: {
    orientation: 'horizontal',
    label: 'OR',
    labelPosition: 'center',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const LabelRight: Story = {
  args: {
    orientation: 'horizontal',
    label: 'End',
    labelPosition: 'right',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
};

// Layout examples
const ContentDividerTemplate = () => (
  <div className="max-w-2xl space-y-6">
    <div>
      <h2 className="text-xl font-semibold mb-4">Introduction</h2>
      <p className="text-muted-foreground mb-4">
        This is the introduction section with some content that explains the topic.
      </p>
    </div>
    
    <Separator />
    
    <div>
      <h2 className="text-xl font-semibold mb-4">Main Content</h2>
      <p className="text-muted-foreground mb-4">
        Here's the main content section with detailed information about the subject.
      </p>
    </div>
    
    <Separator variant="muted" />
    
    <div>
      <h2 className="text-xl font-semibold mb-4">Conclusion</h2>
      <p className="text-muted-foreground">
        This concludes our discussion with final thoughts and recommendations.
      </p>
    </div>
  </div>
);

export const ContentDivider: Story = {
  render: ContentDividerTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Example showing separators used to divide content sections in an article layout.',
      },
    },
  },
};

const FormSectionTemplate = () => (
  <form className="max-w-md space-y-6">
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Personal Information</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
            placeholder="Doe"
          />
        </div>
      </div>
    </div>
    
    <Separator label="Contact Details" labelPosition="left" />
    
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-input rounded-md bg-background"
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          type="tel"
          className="w-full px-3 py-2 border border-input rounded-md bg-background"
          placeholder="(555) 123-4567"
        />
      </div>
    </div>
    
    <Separator label="Preferences" labelPosition="left" />
    
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <input type="checkbox" id="newsletter" className="rounded" />
        <label htmlFor="newsletter" className="text-sm">Subscribe to newsletter</label>
      </div>
      <div className="flex items-center space-x-2">
        <input type="checkbox" id="updates" className="rounded" />
        <label htmlFor="updates" className="text-sm">Receive product updates</label>
      </div>
    </div>
  </form>
);

export const FormSections: Story = {
  render: FormSectionTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Form example showing labeled separators to organize different sections of input fields.',
      },
    },
  },
};

const SidebarLayoutTemplate = () => (
  <div className="flex h-64 max-w-4xl border border-border rounded-lg overflow-hidden">
    <div className="w-64 bg-muted p-4 space-y-3">
      <h3 className="font-semibold">Navigation</h3>
      <nav className="space-y-2">
        <a href="#" className="block text-sm hover:text-primary">Dashboard</a>
        <a href="#" className="block text-sm hover:text-primary">Projects</a>
        <a href="#" className="block text-sm hover:text-primary">Settings</a>
      </nav>
      
      <Separator />
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Recent</h4>
        <a href="#" className="block text-sm text-muted-foreground hover:text-primary">Project A</a>
        <a href="#" className="block text-sm text-muted-foreground hover:text-primary">Project B</a>
      </div>
    </div>
    
    <Separator orientation="vertical" />
    
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">Main Content Area</h1>
      <p className="text-muted-foreground">
        This is the main content area of the application, separated from the sidebar with a vertical separator.
      </p>
    </div>
  </div>
);

export const SidebarLayout: Story = {
  render: SidebarLayoutTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Layout example showing both horizontal and vertical separators in a sidebar navigation interface.',
      },
    },
  },
};

const AuthenticationTemplate = () => (
  <div className="max-w-sm mx-auto space-y-6 p-6 border border-border rounded-lg">
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2">Sign In</h2>
      <p className="text-sm text-muted-foreground">Enter your credentials to continue</p>
    </div>
    
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-input rounded-md bg-background"
          placeholder="Enter your email"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-input rounded-md bg-background"
          placeholder="Enter your password"
        />
      </div>
      
      <button
        type="submit"
        className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Sign In
      </button>
    </form>
    
    <Separator label="OR" />
    
    <div className="space-y-3">
      <button className="w-full py-2 border border-input rounded-md hover:bg-accent transition-colors">
        Continue with Google
      </button>
      <button className="w-full py-2 border border-input rounded-md hover:bg-accent transition-colors">
        Continue with GitHub
      </button>
    </div>
    
    <div className="text-center">
      <a href="#" className="text-sm text-muted-foreground hover:text-primary">
        Don't have an account? Sign up
      </a>
    </div>
  </div>
);

export const Authentication: Story = {
  render: AuthenticationTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Authentication form example showing separator with "OR" label between different sign-in options.',
      },
    },
  },
};

const StatsSectionTemplate = () => (
  <div className="max-w-4xl space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">Company Statistics</h2>
      <p className="text-muted-foreground">Our growth and achievements</p>
    </div>
    
    <Separator />
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="text-center">
        <div className="text-3xl font-bold text-primary mb-2">1M+</div>
        <div className="text-sm text-muted-foreground">Users</div>
      </div>
      
      <div className="hidden md:block">
        <Separator orientation="vertical" variant="muted" className="mx-auto h-16" />
      </div>
      <div className="block md:hidden">
        <Separator variant="muted" />
      </div>
      
      <div className="text-center">
        <div className="text-3xl font-bold text-primary mb-2">50K+</div>
        <div className="text-sm text-muted-foreground">Projects</div>
      </div>
      
      <div className="hidden md:block">
        <Separator orientation="vertical" variant="muted" className="mx-auto h-16" />
      </div>
      <div className="block md:hidden">
        <Separator variant="muted" />
      </div>
      
      <div className="text-center">
        <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
        <div className="text-sm text-muted-foreground">Uptime</div>
      </div>
    </div>
    
    <Separator variant="primary" size="lg" />
    
    <div className="text-center">
      <p className="text-lg font-semibold mb-2">Ready to join us?</p>
      <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
        Get Started
      </button>
    </div>
  </div>
);

export const StatsSection: Story = {
  render: StatsSectionTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Statistics section showing responsive separators that adapt between horizontal and vertical based on screen size.',
      },
    },
  },
};

// All variants showcase
const AllVariantsTemplate = () => (
  <div className="space-y-12 w-full max-w-4xl">
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Horizontal Separators</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium">Variants</p>
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Default</span>
              <Separator variant="default" />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Muted</span>
              <Separator variant="muted" />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Accent</span>
              <Separator variant="accent" />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Primary</span>
              <Separator variant="primary" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Sizes</p>
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Small</span>
              <Separator size="sm" />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Medium</span>
              <Separator size="md" />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Large</span>
              <Separator size="lg" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">With Labels</p>
          <div className="space-y-4">
            <Separator label="Left Label" labelPosition="left" />
            <Separator label="Center Label" labelPosition="center" />
            <Separator label="Right Label" labelPosition="right" />
          </div>
        </div>
      </div>
    </div>
    
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Vertical Separators</h3>
      
      <div className="flex items-center space-x-6 h-24">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">Default</p>
          <Separator orientation="vertical" variant="default" />
        </div>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">Muted</p>
          <Separator orientation="vertical" variant="muted" />
        </div>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">Accent</p>
          <Separator orientation="vertical" variant="accent" />
        </div>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">Primary</p>
          <Separator orientation="vertical" variant="primary" />
        </div>
      </div>
      
      <div className="flex items-center space-x-6 h-24">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">Small</p>
          <Separator orientation="vertical" size="sm" />
        </div>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">Medium</p>
          <Separator orientation="vertical" size="md" />
        </div>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">Large</p>
          <Separator orientation="vertical" size="lg" />
        </div>
      </div>
    </div>
    
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Usage Examples</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-border rounded p-4 space-y-3">
          <p className="font-medium">Content Sections</p>
          <p className="text-sm text-muted-foreground">Section 1 content</p>
          <Separator />
          <p className="text-sm text-muted-foreground">Section 2 content</p>
        </div>
        
        <div className="border border-border rounded p-4 flex items-center space-x-4">
          <div className="text-center">
            <p className="font-medium">Item 1</p>
            <p className="text-xs text-muted-foreground">Description</p>
          </div>
          <Separator orientation="vertical" className="h-12" />
          <div className="text-center">
            <p className="font-medium">Item 2</p>
            <p className="text-xs text-muted-foreground">Description</p>
          </div>
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
        story: 'Comprehensive showcase of all separator orientations, variants, sizes, labels, and common usage patterns.',
      },
    },
  },
};