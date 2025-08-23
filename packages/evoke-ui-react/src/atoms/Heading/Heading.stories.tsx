import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';

const meta = {
  title: 'Atoms/Heading',
  component: Heading,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Semantic heading component supporting all HTML heading levels (h1-h6) with visual appearance override, responsive sizing, and focus management for interactive headings.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'The semantic heading level (h1-h6)',
    },
    visualLevel: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Override the visual appearance while maintaining semantic meaning',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'muted', 'accent', 'destructive'],
      description: 'The color variant of the heading',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    spacing: {
      control: { type: 'select' },
      options: ['none', 'tight', 'normal', 'loose'],
      description: 'Bottom margin spacing',
    },
    children: {
      control: { type: 'text' },
      description: 'The heading content',
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

// Heading levels
export const H1: Story = {
  args: {
    level: 'h1',
    children: 'Heading Level 1',
  },
};

export const H2: Story = {
  args: {
    level: 'h2',
    children: 'Heading Level 2',
  },
};

export const H3: Story = {
  args: {
    level: 'h3',
    children: 'Heading Level 3',
  },
};

export const H4: Story = {
  args: {
    level: 'h4',
    children: 'Heading Level 4',
  },
};

export const H5: Story = {
  args: {
    level: 'h5',
    children: 'Heading Level 5',
  },
};

export const H6: Story = {
  args: {
    level: 'h6',
    children: 'Heading Level 6',
  },
};

// Visual level override examples
export const H3AsH1: Story = {
  args: {
    level: 'h3',
    visualLevel: 'h1',
    children: 'H3 element styled as H1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Semantic h3 element with h1 visual appearance for proper document structure.',
      },
    },
  },
};

export const H1AsH3: Story = {
  args: {
    level: 'h1',
    visualLevel: 'h3',
    children: 'H1 element styled as H3',
  },
  parameters: {
    docs: {
      description: {
        story: 'Semantic h1 element with h3 visual appearance when you need smaller styling.',
      },
    },
  },
};

// Color variants
export const Default: Story = {
  args: {
    level: 'h2',
    variant: 'default',
    children: 'Default heading color',
  },
};

export const Muted: Story = {
  args: {
    level: 'h2',
    variant: 'muted',
    children: 'Muted heading color',
  },
};

export const Accent: Story = {
  args: {
    level: 'h2',
    variant: 'accent',
    children: 'Accent heading color',
  },
};

export const Destructive: Story = {
  args: {
    level: 'h2',
    variant: 'destructive',
    children: 'Destructive heading color',
  },
};

// Alignment variants
export const LeftAligned: Story = {
  args: {
    level: 'h2',
    align: 'left',
    children: 'Left-aligned heading',
  },
};

export const CenterAligned: Story = {
  args: {
    level: 'h2',
    align: 'center',
    children: 'Center-aligned heading',
  },
};

export const RightAligned: Story = {
  args: {
    level: 'h2',
    align: 'right',
    children: 'Right-aligned heading',
  },
};

// Spacing variants
export const NoSpacing: Story = {
  args: {
    level: 'h2',
    spacing: 'none',
    children: 'Heading with no spacing',
  },
};

export const TightSpacing: Story = {
  args: {
    level: 'h2',
    spacing: 'tight',
    children: 'Heading with tight spacing',
  },
};

export const NormalSpacing: Story = {
  args: {
    level: 'h2',
    spacing: 'normal',
    children: 'Heading with normal spacing',
  },
};

export const LooseSpacing: Story = {
  args: {
    level: 'h2',
    spacing: 'loose',
    children: 'Heading with loose spacing',
  },
};

// Interactive heading
export const Interactive: Story = {
  args: {
    level: 'h2',
    children: 'Interactive heading',
    tabIndex: 0,
    onClick: () => alert('Heading clicked!'),
    className: 'cursor-pointer hover:text-primary transition-colors',
  },
  parameters: {
    docs: {
      description: {
        story: 'Clickable heading with focus management and hover effects.',
      },
    },
  },
};

// Heading hierarchy example
const HeadingHierarchyTemplate = () => (
  <div className="space-y-4 max-w-2xl">
    <Heading level="h1" spacing="normal">
      Document Title (H1)
    </Heading>
    
    <div className="pl-4 space-y-3">
      <Heading level="h2" spacing="tight">
        Section Title (H2)
      </Heading>
      
      <div className="pl-4 space-y-2">
        <Heading level="h3" spacing="tight">
          Subsection Title (H3)
        </Heading>
        
        <div className="pl-4 space-y-2">
          <Heading level="h4" spacing="tight">
            Sub-subsection Title (H4)
          </Heading>
          
          <div className="pl-4 space-y-1">
            <Heading level="h5" spacing="tight">
              Minor Section (H5)
            </Heading>
            
            <div className="pl-4">
              <Heading level="h6" spacing="none">
                Minor Subsection (H6)
              </Heading>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="mt-8 p-4 bg-muted rounded-lg">
      <Heading level="h3" variant="muted" spacing="tight">
        Accessibility Note
      </Heading>
      <p className="text-sm text-muted-foreground">
        This hierarchy maintains proper semantic structure for screen readers while allowing visual customization through the visualLevel prop.
      </p>
    </div>
  </div>
);

export const HeadingHierarchy: Story = {
  render: HeadingHierarchyTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Example showing proper semantic heading hierarchy with indentation to visualize the structure.',
      },
    },
  },
};

// Visual vs semantic example
const VisualSemanticTemplate = () => (
  <div className="space-y-8 max-w-3xl">
    <div className="space-y-4">
      <Heading level="h1" spacing="normal">
        Visual vs Semantic Levels
      </Heading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Heading level="h3" variant="muted" spacing="tight">
            Semantic Structure
          </Heading>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div>H1: Main page title</div>
            <div>H2: Section headers</div>
            <div>H3: Subsections</div>
            <div>H4-H6: Minor headings</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Heading level="h3" variant="muted" spacing="tight">
            Visual Appearance
          </Heading>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div>Can be overridden with visualLevel</div>
            <div>Maintains accessibility</div>
            <div>Provides design flexibility</div>
            <div>Keeps semantic meaning</div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="border border-border rounded-lg p-6 space-y-4">
      <Heading level="h2" variant="accent" spacing="normal">
        Example: Card Component
      </Heading>
      
      <div className="space-y-3">
        <Heading level="h3" visualLevel="h1" spacing="tight">
          Card Title (H3 as H1)
        </Heading>
        
        <p className="text-sm text-muted-foreground">
          This card title is semantically an h3 (proper hierarchy) but visually appears as an h1 (design requirement).
        </p>
        
        <Heading level="h4" visualLevel="h2" spacing="tight">
          Card Subtitle (H4 as H2)
        </Heading>
        
        <p className="text-sm text-muted-foreground">
          The subtitle maintains proper semantic order while achieving the desired visual impact.
        </p>
      </div>
    </div>
  </div>
);

export const VisualVsSemantic: Story = {
  render: VisualSemanticTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of how to maintain semantic heading structure while achieving desired visual appearance.',
      },
    },
  },
};

// Responsive heading example
const ResponsiveHeadingTemplate = () => (
  <div className="space-y-6 max-w-4xl">
    <Heading level="h1" spacing="normal" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
      Responsive Heading
    </Heading>
    
    <div className="text-sm text-muted-foreground space-y-2">
      <p>This heading scales with screen size:</p>
      <ul className="list-disc list-inside space-y-1 pl-4">
        <li>Mobile: 2xl (1.5rem)</li>
        <li>Small: 3xl (1.875rem)</li>
        <li>Medium: 4xl (2.25rem)</li>
        <li>Large+: 5xl (3rem)</li>
      </ul>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div className="space-y-3">
        <Heading level="h2" spacing="tight" className="text-lg sm:text-xl md:text-2xl">
          Section Title
        </Heading>
        <p className="text-sm text-muted-foreground">
          Section headings also scale appropriately across different screen sizes.
        </p>
      </div>
      
      <div className="space-y-3">
        <Heading level="h3" spacing="tight" className="text-base sm:text-lg md:text-xl">
          Subsection Title
        </Heading>
        <p className="text-sm text-muted-foreground">
          Subsection headings maintain hierarchy while being readable on all devices.
        </p>
      </div>
    </div>
  </div>
);

export const ResponsiveHeading: Story = {
  render: ResponsiveHeadingTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Example of responsive headings that scale appropriately across different screen sizes.',
      },
    },
  },
};

// All variants showcase
const AllVariantsTemplate = () => (
  <div className="space-y-10 w-full max-w-4xl">
    <div className="space-y-4">
      <Heading level="h1" spacing="normal">
        All Heading Levels
      </Heading>
      
      <div className="space-y-3 pl-4 border-l-2 border-primary">
        <Heading level="h1" spacing="tight">Heading 1 - Main Title</Heading>
        <Heading level="h2" spacing="tight">Heading 2 - Section</Heading>
        <Heading level="h3" spacing="tight">Heading 3 - Subsection</Heading>
        <Heading level="h4" spacing="tight">Heading 4 - Sub-subsection</Heading>
        <Heading level="h5" spacing="tight">Heading 5 - Minor Section</Heading>
        <Heading level="h6" spacing="none">Heading 6 - Minor Subsection</Heading>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <Heading level="h2" spacing="tight">
          Color Variants
        </Heading>
        <div className="space-y-3 pl-4">
          <Heading level="h3" variant="default" spacing="tight">Default Color</Heading>
          <Heading level="h3" variant="muted" spacing="tight">Muted Color</Heading>
          <Heading level="h3" variant="accent" spacing="tight">Accent Color</Heading>
          <Heading level="h3" variant="destructive" spacing="tight">Destructive Color</Heading>
        </div>
      </div>
      
      <div className="space-y-4">
        <Heading level="h2" spacing="tight">
          Alignments
        </Heading>
        <div className="space-y-3 border border-border rounded p-4">
          <Heading level="h4" align="left" spacing="tight">Left Aligned</Heading>
          <Heading level="h4" align="center" spacing="tight">Center Aligned</Heading>
          <Heading level="h4" align="right" spacing="tight">Right Aligned</Heading>
        </div>
      </div>
    </div>
    
    <div className="space-y-4">
      <Heading level="h2" spacing="tight">
        Spacing Options
      </Heading>
      <div className="border border-border rounded p-4">
        <Heading level="h3" spacing="none">No Spacing</Heading>
        <p className="text-sm text-muted-foreground mb-4">Immediately followed by content</p>
        
        <Heading level="h3" spacing="tight">Tight Spacing</Heading>
        <p className="text-sm text-muted-foreground mb-4">Small gap before content</p>
        
        <Heading level="h3" spacing="normal">Normal Spacing</Heading>
        <p className="text-sm text-muted-foreground mb-4">Standard gap before content</p>
        
        <Heading level="h3" spacing="loose">Loose Spacing</Heading>
        <p className="text-sm text-muted-foreground">Large gap before content</p>
      </div>
    </div>
    
    <div className="space-y-4">
      <Heading level="h2" spacing="tight">
        Visual Level Override
      </Heading>
      <div className="space-y-3 pl-4 bg-muted/50 rounded p-4">
        <Heading level="h3" visualLevel="h1" spacing="tight">
          H3 styled as H1
        </Heading>
        <p className="text-sm text-muted-foreground mb-3">
          Maintains semantic h3 for accessibility while appearing as h1 visually.
        </p>
        
        <Heading level="h1" visualLevel="h4" spacing="tight">
          H1 styled as H4
        </Heading>
        <p className="text-sm text-muted-foreground">
          Semantic h1 with smaller h4 appearance for design flexibility.
        </p>
      </div>
    </div>
  </div>
);

export const AllVariants: Story = {
  render: AllVariantsTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of all heading levels, variants, alignments, spacing, and visual override options.',
      },
    },
  },
};