import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Semantic text component with multiple typography variants, alignment options, and text transformations. Supports polymorphic rendering.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['body', 'lead', 'large', 'small', 'muted', 'caption', 'code'],
      description: 'The semantic variant of the text',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    weight: {
      control: { type: 'select' },
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
    },
    transform: {
      control: { type: 'select' },
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
      description: 'Text transform',
    },
    truncate: {
      control: { type: 'select' },
      options: ['none', 'truncate', 'line-clamp-2', 'line-clamp-3', 'line-clamp-4'],
      description: 'Text truncation behavior',
    },
    as: {
      control: { type: 'select' },
      options: ['p', 'span', 'div', 'label', 'legend', 'time', 'figcaption'],
      description: 'The HTML element to render',
    },
    children: {
      control: { type: 'text' },
      description: 'The text content',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Body: Story = {
  args: {
    variant: 'body',
    children: 'This is body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};

export const Lead: Story = {
  args: {
    variant: 'lead',
    children: 'This is lead text. It\'s typically used for introductory paragraphs or important statements.',
  },
};

export const Large: Story = {
  args: {
    variant: 'large',
    children: 'This is large text. Used for emphasis or section introductions.',
  },
};

export const Small: Story = {
  args: {
    variant: 'small',
    children: 'This is small text. Often used for secondary information or captions.',
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    children: 'This is muted text. Used for less important information or placeholders.',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'This is caption text. The smallest text variant for labels and fine print.',
  },
};

export const Code: Story = {
  args: {
    variant: 'code',
    children: 'const greeting = "Hello, World!";',
  },
};

// Alignment variants
export const LeftAligned: Story = {
  args: {
    align: 'left',
    children: 'This text is left-aligned. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
};

export const CenterAligned: Story = {
  args: {
    align: 'center',
    children: 'This text is center-aligned. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
};

export const RightAligned: Story = {
  args: {
    align: 'right',
    children: 'This text is right-aligned. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
};

export const JustifyAligned: Story = {
  args: {
    align: 'justify',
    children: 'This text is justified. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
};

// Weight variants
export const LightWeight: Story = {
  args: {
    weight: 'light',
    children: 'This text has light font weight.',
  },
};

export const NormalWeight: Story = {
  args: {
    weight: 'normal',
    children: 'This text has normal font weight.',
  },
};

export const MediumWeight: Story = {
  args: {
    weight: 'medium',
    children: 'This text has medium font weight.',
  },
};

export const SemiboldWeight: Story = {
  args: {
    weight: 'semibold',
    children: 'This text has semibold font weight.',
  },
};

export const BoldWeight: Story = {
  args: {
    weight: 'bold',
    children: 'This text has bold font weight.',
  },
};

// Transform variants
export const NoTransform: Story = {
  args: {
    transform: 'none',
    children: 'This Text Has Mixed Case Without Transform',
  },
};

export const Uppercase: Story = {
  args: {
    transform: 'uppercase',
    children: 'This text will be uppercase',
  },
};

export const Lowercase: Story = {
  args: {
    transform: 'lowercase',
    children: 'This Text Will Be Lowercase',
  },
};

export const Capitalize: Story = {
  args: {
    transform: 'capitalize',
    children: 'this text will be capitalized',
  },
};

// Truncation variants
export const NoTruncation: Story = {
  args: {
    truncate: 'none',
    children: 'This is a very long text that will not be truncated and will wrap naturally to multiple lines as needed. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    className: 'w-64',
  },
};

export const SingleLineTruncate: Story = {
  args: {
    truncate: 'truncate',
    children: 'This is a very long text that will be truncated with an ellipsis on a single line.',
    className: 'w-64',
  },
};

export const TwoLineClamp: Story = {
  args: {
    truncate: 'line-clamp-2',
    children: 'This is a longer text that will be clamped to exactly two lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    className: 'w-64',
  },
};

export const ThreeLineClamp: Story = {
  args: {
    truncate: 'line-clamp-3',
    children: 'This is an even longer text that will be clamped to exactly three lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    className: 'w-64',
  },
};

// Polymorphic examples
export const AsParagraph: Story = {
  args: {
    as: 'p',
    children: 'This text is rendered as a paragraph element.',
  },
};

export const AsSpan: Story = {
  args: {
    as: 'span',
    children: 'This text is rendered as a span element.',
  },
};

export const AsLabel: Story = {
  args: {
    as: 'label',
    children: 'This text is rendered as a label element.',
  },
};

export const AsTime: Story = {
  args: {
    as: 'time',
    children: '2024-01-22',
  },
};

export const AsFigcaption: Story = {
  args: {
    as: 'figcaption',
    variant: 'caption',
    children: 'Image caption text',
  },
};

// Complex combinations
export const CombinedStyles: Story = {
  args: {
    variant: 'large',
    weight: 'semibold',
    align: 'center',
    transform: 'uppercase',
    children: 'Combined Styles Example',
  },
};

export const CodeBlock: Story = {
  args: {
    as: 'div',
    variant: 'code',
    children: `function calculateSum(a: number, b: number): number {
  return a + b;
}`,
    className: 'block whitespace-pre font-mono',
  },
};

// Typography showcase
const TypographyShowcaseTemplate = () => (
  <div className="space-y-8 max-w-2xl">
    <div className="space-y-4">
      <Text variant="large" weight="semibold">Typography Variants</Text>
      
      <div className="space-y-3">
        <Text variant="lead">
          Lead text is perfect for introductions and important statements that need to stand out.
        </Text>
        
        <Text variant="body">
          Body text is the default variant for most content. It provides excellent readability for paragraphs and general text content.
        </Text>
        
        <Text variant="large" weight="semibold">
          Large text with semibold weight for section headers or emphasis.
        </Text>
        
        <Text variant="small">
          Small text for secondary information, captions, or less important details.
        </Text>
        
        <Text variant="muted">
          Muted text is subtle and perfect for placeholders or supplementary information.
        </Text>
        
        <Text variant="caption">
          Caption text is the smallest variant, ideal for labels and fine print.
        </Text>
        
        <Text variant="code">
          const codeText = "Used for inline code snippets";
        </Text>
      </div>
    </div>
    
    <div className="space-y-4">
      <Text variant="large" weight="semibold">Font Weights</Text>
      <div className="space-y-2">
        <Text weight="light">Light font weight</Text>
        <Text weight="normal">Normal font weight</Text>
        <Text weight="medium">Medium font weight</Text>
        <Text weight="semibold">Semibold font weight</Text>
        <Text weight="bold">Bold font weight</Text>
      </div>
    </div>
    
    <div className="space-y-4">
      <Text variant="large" weight="semibold">Text Alignment</Text>
      <div className="space-y-3 border border-border rounded p-4">
        <Text align="left">Left-aligned text (default)</Text>
        <Text align="center">Center-aligned text</Text>
        <Text align="right">Right-aligned text</Text>
        <Text align="justify">
          Justified text distributes content evenly across the line, creating straight edges on both sides.
        </Text>
      </div>
    </div>
    
    <div className="space-y-4">
      <Text variant="large" weight="semibold">Text Transforms</Text>
      <div className="space-y-2">
        <Text transform="none">No Transform Applied</Text>
        <Text transform="uppercase">uppercase text transform</Text>
        <Text transform="lowercase">LOWERCASE TEXT TRANSFORM</Text>
        <Text transform="capitalize">capitalize each word</Text>
      </div>
    </div>
    
    <div className="space-y-4">
      <Text variant="large" weight="semibold">Truncation Examples</Text>
      <div className="space-y-3 w-64">
        <div>
          <Text variant="caption" weight="medium">Single line truncation:</Text>
          <Text truncate="truncate">
            This is a very long text that will be truncated with an ellipsis
          </Text>
        </div>
        
        <div>
          <Text variant="caption" weight="medium">Two line clamp:</Text>
          <Text truncate="line-clamp-2">
            This is a longer text that will be clamped to exactly two lines with an ellipsis at the end
          </Text>
        </div>
        
        <div>
          <Text variant="caption" weight="medium">Three line clamp:</Text>
          <Text truncate="line-clamp-3">
            This is an even longer text that will be clamped to exactly three lines, providing more content while still maintaining a clean layout
          </Text>
        </div>
      </div>
    </div>
  </div>
);

export const TypographyShowcase: Story = {
  render: TypographyShowcaseTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of all typography variants, weights, alignments, and text treatments.',
      },
    },
  },
};

// Semantic usage examples
const SemanticUsageTemplate = () => (
  <article className="prose prose-sm max-w-2xl space-y-6">
    <header>
      <div className="text-2xl mb-2 font-bold">
        Article Title
      </div>
      <Text variant="muted" className="mb-4">
        Published on January 1, 2024
      </Text>
      <Text variant="lead">
        This is the article introduction using lead text to draw attention and provide context for the content that follows.
      </Text>
    </header>
    
    <section>
      <Text as="p" variant="body" className="mb-4">
        This is the main body content of the article. It uses the default body variant which provides excellent readability for longer form content.
      </Text>
      
      <Text as="p" variant="body" className="mb-4">
        You can also include <span className="font-semibold">important information</span> and <span className="italic">emphasized content</span> inline within paragraphs.
      </Text>
      
      <Text as="p" variant="body" className="mb-4">
        For code references, you can use <Text variant="code">inline code</Text> within text, or display code blocks:
      </Text>
      
      <Text as="div" variant="code" className="block whitespace-pre bg-muted p-4 rounded font-mono">
{`function example() {
  return "Hello, World!";
}`}
      </Text>
    </section>
    
    <footer>
      <Text variant="small" className="text-muted-foreground">
        This is a footer with small text for additional information or credits.
      </Text>
    </footer>
  </article>
);

export const SemanticUsage: Story = {
  render: SemanticUsageTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Example showing semantic usage of the Text component in an article layout with proper HTML elements and hierarchy.',
      },
    },
  },
};

// All variants showcase
const AllVariantsTemplate = () => (
  <div className="grid grid-cols-1 gap-8 w-full max-w-4xl">
    <div className="space-y-3">
      <Text variant="large" weight="semibold">All Variants</Text>
      <div className="space-y-2 border-l-2 border-primary pl-4">
        <Text variant="body">Body - Default text for content</Text>
        <Text variant="lead">Lead - Introductory text with emphasis</Text>
        <Text variant="large">Large - Emphasized text for headers</Text>
        <Text variant="small">Small - Secondary information</Text>
        <Text variant="muted">Muted - Subtle, less important text</Text>
        <Text variant="caption">Caption - Smallest text for labels</Text>
        <Text variant="code">Code - Monospace for code snippets</Text>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-3">
        <Text variant="large" weight="semibold">Weights</Text>
        <div className="space-y-1">
          <Text weight="light">Light</Text>
          <Text weight="normal">Normal</Text>
          <Text weight="medium">Medium</Text>
          <Text weight="semibold">Semibold</Text>
          <Text weight="bold">Bold</Text>
        </div>
      </div>
      
      <div className="space-y-3">
        <Text variant="large" weight="semibold">Transforms</Text>
        <div className="space-y-1">
          <Text transform="none">No Transform</Text>
          <Text transform="uppercase">uppercase</Text>
          <Text transform="lowercase">LOWERCASE</Text>
          <Text transform="capitalize">capitalize words</Text>
        </div>
      </div>
    </div>
    
    <div className="space-y-3">
      <Text variant="large" weight="semibold">Alignments</Text>
      <div className="space-y-2 border border-border rounded p-4">
        <Text align="left">Left aligned</Text>
        <Text align="center">Center aligned</Text>
        <Text align="right">Right aligned</Text>
        <Text align="justify">Justified text that spreads evenly across the available space</Text>
      </div>
    </div>
  </div>
);

export const AllVariants: Story = {
  render: AllVariantsTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Complete overview of all text variants, weights, transforms, and alignment options.',
      },
    },
  },
};