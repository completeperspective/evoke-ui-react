import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from './Card';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';
import { Text } from '../../atoms/Text';
import { Separator } from '../../atoms/Separator';

const meta = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Card component provides a flexible container with optional header, content, and footer sections. Built using CVA-first architecture with comprehensive variant support.

## Features
- **Variants**: default, outlined, elevated, interactive
- **Sizes**: sm, md, lg with responsive spacing
- **Interactive**: Clickable cards with keyboard support
- **Composable**: Flexible subcomponent system
- **Accessible**: Full ARIA support and keyboard navigation
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated', 'interactive'],
      description: 'Visual style variant of the card',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size affects typography and spacing',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Internal padding of the card container',
    },
    interactive: {
      control: 'boolean',
      description: 'Makes the card clickable with hover effects',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interactions and reduces opacity',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for interactive cards',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    padding: 'none',
  },
  render: (args) => (
    <Card {...args} className="w-80">
      <CardContent>
        <p>This is a basic card with default styling and simple content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithHeader: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader
        title="Card Title"
        description="A brief description of the card content"
      />
      <CardContent>
        <p>Main content area with detailed information about the topic.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  render: (args) => (
    <Card {...args} className="w-80">
      <CardContent>
        <p>Card content with action buttons in the footer.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

export const Complete: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  render: (args) => (
    <Card {...args} className="w-96">
      <CardHeader
        title="Complete Card Example"
        description="This card demonstrates all sections working together"
        border
      />
      <CardContent spacing="normal">
        <p className="mb-3">
          This is a complete card with header, content, and footer sections.
          Each section can be customized independently.
        </p>
        <div className="flex gap-2">
          <Badge variant="outline">Feature</Badge>
          <Badge variant="secondary">New</Badge>
        </div>
      </CardContent>
      <CardFooter align="between" border>
        <Text variant="small" className="text-muted-foreground">
          Last updated 2 hours ago
        </Text>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            Edit
          </Button>
          <Button size="sm">View</Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

// Variant Examples
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    size: 'md',
  },
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader title="Outlined Card" description="With border emphasis" />
      <CardContent>
        <p>This card uses the outlined variant with a thicker border and no shadow.</p>
      </CardContent>
    </Card>
  ),
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    size: 'md',
  },
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader title="Elevated Card" description="With enhanced shadow" />
      <CardContent>
        <p>This card appears to float above the surface with a prominent shadow.</p>
      </CardContent>
    </Card>
  ),
};

export const Interactive: Story = {
  args: {
    variant: 'interactive',
    size: 'md',
    onClick: (e) => console.log('Card clicked!', e),
  },
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader 
        title="Interactive Card" 
        description="Click or press Enter/Space" 
      />
      <CardContent>
        <p>This card responds to clicks and keyboard navigation.</p>
      </CardContent>
    </Card>
  ),
};

// Size Variations
export const SizeComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Card variant="default" size="sm" className="w-72">
        <CardHeader 
          title="Small Card" 
          description="Compact spacing and typography"
          size="sm"
        />
        <CardContent size="sm">
          <p>Content with small size styling.</p>
        </CardContent>
        <CardFooter size="sm">
          <Button size="sm" variant="outline">
            Small Action
          </Button>
        </CardFooter>
      </Card>
      
      <Card variant="default" size="md" className="w-80">
        <CardHeader 
          title="Medium Card" 
          description="Standard spacing and typography"
          size="md"
        />
        <CardContent size="md">
          <p>Content with medium size styling (default).</p>
        </CardContent>
        <CardFooter size="md">
          <Button size="md" variant="outline">
            Medium Action
          </Button>
        </CardFooter>
      </Card>
      
      <Card variant="default" size="lg" className="w-96">
        <CardHeader 
          title="Large Card" 
          description="Spacious layout with larger typography"
          size="lg"
        />
        <CardContent size="lg">
          <p>Content with large size styling for emphasis.</p>
        </CardContent>
        <CardFooter size="lg">
          <Button size="lg" variant="outline">
            Large Action
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

// Layout Examples
export const HeaderAlignments: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card className="w-80">
        <CardHeader
          title="Left Aligned"
          description="Default alignment"
          align="start"
        />
        <CardContent>
          <p>Header content is aligned to the start (left).</p>
        </CardContent>
      </Card>
      
      <Card className="w-80">
        <CardHeader
          title="Center Aligned"
          description="Centered content"
          align="center"
        />
        <CardContent>
          <p>Header content is centered.</p>
        </CardContent>
      </Card>
      
      <Card className="w-80">
        <CardHeader
          title="Right Aligned"
          description="End alignment"
          align="end"
        />
        <CardContent>
          <p>Header content is aligned to the end (right).</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const FooterAlignments: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card className="w-80">
        <CardContent>
          <p>Footer with start alignment (default).</p>
        </CardContent>
        <CardFooter align="start">
          <Button variant="outline" size="sm">Action</Button>
        </CardFooter>
      </Card>
      
      <Card className="w-80">
        <CardContent>
          <p>Footer with center alignment.</p>
        </CardContent>
        <CardFooter align="center">
          <Button variant="outline" size="sm">Action</Button>
        </CardFooter>
      </Card>
      
      <Card className="w-80">
        <CardContent>
          <p>Footer with end alignment.</p>
        </CardContent>
        <CardFooter align="end">
          <Button variant="outline" size="sm">Action</Button>
        </CardFooter>
      </Card>
      
      <Card className="w-80">
        <CardContent>
          <p>Footer with space between elements.</p>
        </CardContent>
        <CardFooter align="between">
          <Button variant="ghost" size="sm">Cancel</Button>
          <Button size="sm">Confirm</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

// Content Spacing
export const ContentSpacing: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card className="w-80">
        <CardHeader title="Tight Spacing" />
        <CardContent spacing="tight">
          <p>Content with reduced padding for compact layouts.</p>
        </CardContent>
      </Card>
      
      <Card className="w-80">
        <CardHeader title="Normal Spacing" />
        <CardContent spacing="normal">
          <p>Content with standard padding (default).</p>
        </CardContent>
      </Card>
      
      <Card className="w-80">
        <CardHeader title="Relaxed Spacing" />
        <CardContent spacing="relaxed">
          <p>Content with generous padding for comfortable reading.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

// Advanced Use Cases
export const ProductCard: Story = {
  render: () => (
    <Card variant="elevated" className="w-72">
      <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <Text variant="muted">Product Image</Text>
      </div>
      <CardHeader 
        title="Premium Headphones"
        description="High-quality audio experience"
      />
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Text variant="large" className="font-bold">$199.99</Text>
            <Badge variant="success">In Stock</Badge>
          </div>
          <Text variant="small" className="text-muted-foreground">
            Free shipping on orders over $100
          </Text>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  ),
};

export const NotificationCard: Story = {
  render: () => (
    <Card variant="outlined" className="w-96">
      <CardContent>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
          <div className="flex-1">
            <Text variant="small" className="font-medium">
              New message from John Doe
            </Text>
            <Text variant="small" className="text-muted-foreground mt-1">
              Hey! I wanted to follow up on our conversation about the project timeline...
            </Text>
            <Text variant="small" className="text-muted-foreground mt-2">
              2 minutes ago
            </Text>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const StatCard: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card variant="default">
        <CardContent className="text-center">
          <Text variant="large" className="font-bold text-2xl">1,234</Text>
          <Text variant="small" className="text-muted-foreground">Total Users</Text>
        </CardContent>
      </Card>
      
      <Card variant="default">
        <CardContent className="text-center">
          <Text variant="large" className="font-bold text-2xl text-green-600">+12%</Text>
          <Text variant="small" className="text-muted-foreground">Growth</Text>
        </CardContent>
      </Card>
      
      <Card variant="default">
        <CardContent className="text-center">
          <Text variant="large" className="font-bold text-2xl">$45,678</Text>
          <Text variant="small" className="text-muted-foreground">Revenue</Text>
        </CardContent>
      </Card>
      
      <Card variant="default">
        <CardContent className="text-center">
          <Text variant="large" className="font-bold text-2xl">98.5%</Text>
          <Text variant="small" className="text-muted-foreground">Uptime</Text>
        </CardContent>
      </Card>
    </div>
  ),
};

// States
export const DisabledCard: Story = {
  args: {
    variant: 'interactive',
    disabled: true,
    onClick: () => console.log('This should not fire'),
  },
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader 
        title="Disabled Card" 
        description="This card is disabled and cannot be interacted with"
      />
      <CardContent>
        <p>All interactions are disabled and the card has reduced opacity.</p>
      </CardContent>
      <CardFooter>
        <Button disabled>Disabled Action</Button>
      </CardFooter>
    </Card>
  ),
};

// Complex Layout
export const DashboardCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      {/* Activity Card */}
      <Card variant="elevated" className="lg:col-span-2">
        <CardHeader 
          title="Recent Activity" 
          description="Latest updates from your dashboard"
          border
        />
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {item}
                </div>
                <div className="flex-1">
                  <Text variant="small" className="font-medium">
                    Activity item {item}
                  </Text>
                  <Text variant="small" className="text-muted-foreground">
                    Description of the activity
                  </Text>
                </div>
                <Text variant="small" className="text-muted-foreground">
                  {item * 2}h ago
                </Text>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter border>
          <Button variant="outline" size="sm">View All</Button>
        </CardFooter>
      </Card>
      
      {/* Quick Actions */}
      <Card variant="outlined">
        <CardHeader title="Quick Actions" />
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="h-auto py-3 flex-col">
              <span className="text-lg mb-1">+</span>
              Create
            </Button>
            <Button variant="outline" size="sm" className="h-auto py-3 flex-col">
              <span className="text-lg mb-1">📊</span>
              Reports
            </Button>
            <Button variant="outline" size="sm" className="h-auto py-3 flex-col">
              <span className="text-lg mb-1">⚙️</span>
              Settings
            </Button>
            <Button variant="outline" size="sm" className="h-auto py-3 flex-col">
              <span className="text-lg mb-1">?</span>
              Help
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};
