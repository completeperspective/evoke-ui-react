import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

// Mock icons for demonstration
const InfoIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const HelpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

const meta = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Form label component with required/optional indicators, multiple variants, and suffix content support for tooltips or help icons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'muted', 'error', 'success', 'warning'],
      description: 'The color variant of the label',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size variant of the label',
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'semibold'],
      description: 'The font weight of the label',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the label indicates a required field',
    },
    optional: {
      control: { type: 'boolean' },
      description: 'Whether the label indicates an optional field',
    },
    children: {
      control: { type: 'text' },
      description: 'The label text content',
    },
    htmlFor: {
      control: { type: 'text' },
      description: 'The ID of the form element this label is associated with',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    children: 'Default Label',
    htmlFor: 'default-input',
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    children: 'Muted Label',
    htmlFor: 'muted-input',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error Label',
    htmlFor: 'error-input',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Label',
    htmlFor: 'success-input',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning Label',
    htmlFor: 'warning-input',
  },
};

// Size variants
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Label',
    htmlFor: 'small-input',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Label',
    htmlFor: 'medium-input',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Label',
    htmlFor: 'large-input',
  },
};

// Weight variants
export const NormalWeight: Story = {
  args: {
    weight: 'normal',
    children: 'Normal Weight Label',
    htmlFor: 'normal-input',
  },
};

export const MediumWeight: Story = {
  args: {
    weight: 'medium',
    children: 'Medium Weight Label',
    htmlFor: 'medium-weight-input',
  },
};

export const SemiboldWeight: Story = {
  args: {
    weight: 'semibold',
    children: 'Semibold Weight Label',
    htmlFor: 'semibold-input',
  },
};

// Required and optional indicators
export const Required: Story = {
  args: {
    required: true,
    children: 'Required Field',
    htmlFor: 'required-input',
  },
};

export const Optional: Story = {
  args: {
    optional: true,
    children: 'Optional Field',
    htmlFor: 'optional-input',
  },
};

// With suffix content
export const WithHelpIcon: Story = {
  args: {
    children: 'Email Address',
    htmlFor: 'email-input',
    suffix: (
      <button
        type="button"
        className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
        title="Click for help"
      >
        <HelpIcon />
      </button>
    ),
  },
};

export const WithInfoIcon: Story = {
  args: {
    children: 'Password',
    htmlFor: 'password-input',
    required: true,
    suffix: (
      <button
        type="button"
        className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
        title="Password requirements"
      >
        <InfoIcon />
      </button>
    ),
  },
};

export const WithTooltip: Story = {
  args: {
    children: 'Username',
    htmlFor: 'username-input',
    required: true,
    suffix: (
      <span className="ml-2 text-xs text-muted-foreground">
        (3-20 characters)
      </span>
    ),
  },
};

// Form integration examples
const FormExampleTemplate = () => (
  <form className="space-y-6 max-w-md">
    <div className="space-y-2">
      <Label htmlFor="name" required>
        Full Name
      </Label>
      <input
        id="name"
        type="text"
        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        placeholder="Enter your full name"
      />
    </div>
    
    <div className="space-y-2">
      <Label htmlFor="email" required variant="error">
        Email Address
      </Label>
      <input
        id="email"
        type="email"
        className="w-full px-3 py-2 border border-destructive rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive focus:border-transparent"
        placeholder="Enter your email"
      />
      <p className="text-xs text-destructive">Please enter a valid email address</p>
    </div>
    
    <div className="space-y-2">
      <Label htmlFor="phone" optional>
        Phone Number
      </Label>
      <input
        id="phone"
        type="tel"
        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        placeholder="Enter your phone number"
      />
    </div>
    
    <div className="space-y-2">
      <Label 
        htmlFor="password" 
        required 
        suffix={
          <button
            type="button"
            className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
            title="Password must be at least 8 characters"
          >
            <InfoIcon />
          </button>
        }
      >
        Password
      </Label>
      <input
        id="password"
        type="password"
        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        placeholder="Enter your password"
      />
    </div>
    
    <div className="space-y-2">
      <Label htmlFor="bio" optional size="sm" weight="normal">
        Biography
      </Label>
      <textarea
        id="bio"
        rows={3}
        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
        placeholder="Tell us about yourself"
      />
      <p className="text-xs text-muted-foreground">Optional field - you can skip this</p>
    </div>
  </form>
);

export const FormExample: Story = {
  render: FormExampleTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Example form showing labels with various states, indicators, and form field associations.',
      },
    },
  },
};

// Accessibility showcase
const AccessibilityTemplate = () => (
  <div className="space-y-8 max-w-2xl">
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Accessibility Features</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="text-base font-medium">Proper Associations</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Labels use htmlFor to associate with inputs</p>
            <p>• Screen readers announce field requirements</p>
            <p>• Clicking labels focuses the input</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-base font-medium">Visual Indicators</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Required fields show asterisk (*)</p>
            <p>• Optional fields show "(optional)"</p>
            <p>• Color coding for validation states</p>
          </div>
        </div>
      </div>
    </div>
    
    <div className="border border-border rounded-lg p-6 space-y-4">
      <h4 className="text-base font-medium">Example Implementation</h4>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="accessible-email" required>
            Email Address
          </Label>
          <input
            id="accessible-email"
            type="email"
            aria-describedby="email-help"
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            placeholder="user@example.com"
          />
          <p id="email-help" className="text-xs text-muted-foreground">
            We'll use this to send you important updates
          </p>
        </div>
        
        <div className="space-y-2">
          <Label 
            htmlFor="accessible-password" 
            required 
            suffix={
              <button
                type="button"
                className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Password requirements"
                title="Must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number"
              >
                <InfoIcon />
              </button>
            }
          >
            Password
          </Label>
          <input
            id="accessible-password"
            type="password"
            aria-describedby="password-requirements"
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            placeholder="Enter secure password"
          />
          <p id="password-requirements" className="text-xs text-muted-foreground">
            Must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const AccessibilityShowcase: Story = {
  render: AccessibilityTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of accessibility features including proper associations, ARIA attributes, and screen reader support.',
      },
    },
  },
};

// All variants showcase
const AllVariantsTemplate = () => (
  <div className="space-y-8 w-full max-w-3xl">
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Color Variants</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label variant="default">Default Label</Label>
        </div>
        <div className="space-y-2">
          <Label variant="muted">Muted Label</Label>
        </div>
        <div className="space-y-2">
          <Label variant="error">Error Label</Label>
        </div>
        <div className="space-y-2">
          <Label variant="success">Success Label</Label>
        </div>
        <div className="space-y-2">
          <Label variant="warning">Warning Label</Label>
        </div>
      </div>
    </div>
    
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sizes & Weights</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <h4 className="text-base font-medium">Sizes</h4>
          <div className="space-y-2">
            <Label size="sm">Small (xs)</Label>
            <Label size="md">Medium (sm)</Label>
            <Label size="lg">Large (base)</Label>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-base font-medium">Weights</h4>
          <div className="space-y-2">
            <Label weight="normal">Normal Weight</Label>
            <Label weight="medium">Medium Weight</Label>
            <Label weight="semibold">Semibold Weight</Label>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-base font-medium">Indicators</h4>
          <div className="space-y-2">
            <Label required>Required Field</Label>
            <Label optional>Optional Field</Label>
            <Label>Regular Field</Label>
          </div>
        </div>
      </div>
    </div>
    
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">With Suffix Content</h3>
      <div className="space-y-3">
        <Label 
          required
          suffix={
            <button className="ml-1 text-muted-foreground hover:text-foreground transition-colors">
              <HelpIcon />
            </button>
          }
        >
          Field with Help Icon
        </Label>
        
        <Label 
          optional
          suffix={<span className="ml-2 text-xs text-muted-foreground">(max 100 chars)</span>}
        >
          Field with Text Hint
        </Label>
        
        <Label 
          variant="error"
          required
          suffix={
            <span className="ml-2 flex items-center gap-1 text-xs text-destructive">
              <InfoIcon />
              Invalid
            </span>
          }
        >
          Field with Error State
        </Label>
      </div>
    </div>
    
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Combined Examples</h3>
      <div className="space-y-3 border border-border rounded p-4">
        <Label size="lg" weight="semibold" variant="default" required>
          Large Semibold Required Label
        </Label>
        
        <Label size="sm" weight="normal" variant="muted" optional>
          Small Normal Optional Muted Label
        </Label>
        
        <Label 
          size="md" 
          weight="medium" 
          variant="success" 
          suffix={
            <span className="ml-2 text-xs text-green-600">✓ Valid</span>
          }
        >
          Medium Success Label with Status
        </Label>
      </div>
    </div>
  </div>
);

export const AllVariants: Story = {
  render: AllVariantsTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of all label variants, sizes, weights, indicators, and suffix content options.',
      },
    },
  },
};