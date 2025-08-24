import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';
import { useState } from 'react';

// Mock icons for testing
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
  </svg>
);

const ClearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
  </svg>
);

const meta: Meta<typeof FormField> = {
  title: 'Molecules/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A molecular component that combines Label, Input, and validation feedback into a cohesive form field. Built with CVA-first architecture and comprehensive form integration support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Label text or content for the field',
      control: { type: 'text' },
    },
    description: {
      description: 'Helper text or description for the field',
      control: { type: 'text' },
    },
    descriptionPosition: {
      description: 'Position of the description text',
      control: { type: 'radio' },
      options: ['above', 'below'],
    },
    error: {
      description: 'Error message to display',
      control: { type: 'text' },
    },
    required: {
      description: 'Whether the field is required',
      control: { type: 'boolean' },
    },
    optional: {
      description: 'Whether the field is optional',
      control: { type: 'boolean' },
    },
    size: {
      description: 'Size variant affecting spacing and typography',
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    layout: {
      description: 'Layout arrangement of label and input',
      control: { type: 'radio' },
      options: ['vertical', 'horizontal', 'inline'],
    },
    state: {
      description: 'Visual state of the field',
      control: { type: 'radio' },
      options: ['default', 'error', 'success', 'warning', 'disabled'],
    },
    placeholder: {
      description: 'Placeholder text for the input',
      control: { type: 'text' },
    },
    type: {
      description: 'Input type',
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    disabled: {
      description: 'Whether the input is disabled',
      control: { type: 'boolean' },
    },
    readOnly: {
      description: 'Whether the input is readonly',
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

export const Required: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    required: true,
  },
};

export const Optional: Story = {
  args: {
    label: 'Nickname',
    placeholder: 'Enter a nickname (optional)',
    optional: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Username',
    description: 'Choose a unique username for your account. It must be 3-20 characters long.',
    placeholder: 'Enter username',
  },
};

export const DescriptionAbove: Story = {
  args: {
    label: 'API Key',
    description: 'Your API key will be used to authenticate requests. Keep it secure.',
    descriptionPosition: 'above',
    placeholder: 'Enter your API key',
    type: 'password',
  },
};

// Size Variants
export const SmallSize: Story = {
  args: {
    label: 'Compact Field',
    placeholder: 'Small input field',
    size: 'sm',
    description: 'This is a small form field',
  },
};

export const MediumSize: Story = {
  args: {
    label: 'Standard Field',
    placeholder: 'Medium input field',
    size: 'md',
    description: 'This is a medium form field (default)',
  },
};

export const LargeSize: Story = {
  args: {
    label: 'Large Field',
    placeholder: 'Large input field',
    size: 'lg',
    description: 'This is a large form field',
  },
};

// Layout Variants
export const VerticalLayout: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    layout: 'vertical',
    description: 'Vertical layout (default)',
  },
};

export const HorizontalLayout: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: {
    label: 'Company',
    placeholder: 'Enter company name',
    layout: 'horizontal',
    description: 'Horizontal layout with label on the left',
    className: 'max-w-2xl mx-auto p-8',
  },
};

export const InlineLayout: Story = {
  args: {
    label: 'Newsletter',
    placeholder: 'your@email.com',
    layout: 'inline',
    type: 'email',
  },
};

// State Variants
export const ErrorState: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    state: 'error',
    error: 'Please enter a valid email address',
    required: true,
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    state: 'success',
    value: 'johndoe123',
    description: 'Username is available!',
  },
};

export const WarningState: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
    state: 'warning',
    description: 'Password strength: Weak. Consider adding numbers and symbols.',
  },
};

export const DisabledState: Story = {
  args: {
    label: 'Account Type',
    value: 'Premium Member',
    disabled: true,
    description: 'Your account type cannot be changed.',
  },
};

// Icon Examples
export const WithStartIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for anything...',
    startIcon: <SearchIcon />,
    type: 'search',
  },
};

export const WithEndIcon: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    endIcon: <EyeIcon />,
    required: true,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    startIcon: <UserIcon />,
    endIcon: <ClearIcon />,
    description: 'Username with clear functionality',
  },
};

// Input Type Examples
export const EmailInput: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
    required: true,
    description: "We'll never share your email with anyone else.",
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Create Password',
    placeholder: 'Enter a secure password',
    type: 'password',
    required: true,
    description: 'Must be at least 8 characters with numbers and symbols.',
  },
};

export const NumberInput: Story = {
  args: {
    label: 'Age',
    placeholder: 'Enter your age',
    type: 'number',
    description: 'Must be 18 or older.',
  },
};

export const TelInput: Story = {
  args: {
    label: 'Phone Number',
    placeholder: '+1 (555) 123-4567',
    type: 'tel',
    description: 'Include country code for international numbers.',
  },
};

export const UrlInput: Story = {
  args: {
    label: 'Website',
    placeholder: 'https://example.com',
    type: 'url',
    description: 'Enter your website or portfolio URL.',
  },
};

// Advanced Examples
export const MultipleFields: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="mx-auto p-8 space-y-6">
      <FormField label="First Name" placeholder="John" required />
      <FormField label="Last Name" placeholder="Doe" required />
      <FormField
        label="Email"
        placeholder="john@example.com"
        type="email"
        required
        description="We'll send confirmation to this email."
      />
      <FormField label="Phone" placeholder="+1 (555) 123-4567" type="tel" optional />
    </div>
  ),
};

// React Hook Form Integration Example
export const ReactHookFormExample: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Example showing how FormField integrates with react-hook-form. This demonstrates controlled components with validation.',
      },
    },
  },
  render: () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
      return password.length >= 8;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (!validatePassword(formData.password)) {
        newErrors.password = 'Password must be at least 8 characters';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!');
      }
    };

    return (
      <div className="mx-auto p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>

          <FormField
            label="Email Address"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            error={errors.email}
            state={errors.email ? 'error' : formData.email ? 'success' : 'default'}
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            required
            placeholder="Enter a secure password"
            value={formData.password}
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            error={errors.password}
            state={
              errors.password
                ? 'error'
                : formData.password && validatePassword(formData.password)
                  ? 'success'
                  : 'default'
            }
            description="Must be at least 8 characters long"
          />

          <FormField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            required
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            error={errors.confirmPassword}
            state={
              errors.confirmPassword
                ? 'error'
                : formData.confirmPassword && formData.password === formData.confirmPassword
                  ? 'success'
                  : 'default'
            }
          />

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium transition-colors"
          >
            Create Account
          </button>
        </form>
      </div>
    );
  },
};

// Complex Layout Examples
export const ResponsiveLayouts: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <h2 className="text-2xl font-bold mb-6">Responsive Form Layouts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Vertical Layout</h3>
          <FormField label="Full Name" placeholder="John Doe" layout="vertical" required />
          <FormField
            label="Email"
            placeholder="john@example.com"
            type="email"
            layout="vertical"
            required
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Horizontal Layout</h3>
          <FormField label="Company" placeholder="Acme Corp" layout="horizontal" />
          <FormField label="Role" placeholder="Software Engineer" layout="horizontal" />
        </div>
      </div>
    </div>
  ),
};

export const AccessibilityShowcase: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Demonstrates accessibility features including proper ARIA attributes, focus management, and screen reader support.',
      },
    },
  },
  render: () => (
    <div className="max-w-2xl mx-auto p-8 space-y-6">
      <h2 className="text-xl font-bold mb-4">Accessibility Features</h2>

      <FormField
        label="Accessible Email Field"
        description="This field has proper ARIA attributes and focus management"
        placeholder="email@example.com"
        type="email"
        required
        id="accessible-email"
        autoComplete="email"
      />

      <FormField
        label="Error State Example"
        description="Shows how errors are properly announced to screen readers"
        placeholder="Enter valid data"
        state="error"
        error="This field contains invalid data and will be announced to screen readers"
        required
      />

      <FormField
        label="Field with Complex Description"
        description="Long descriptions are properly associated with inputs using aria-describedby. This ensures screen readers can access all relevant information about the field requirements and current state."
        placeholder="Enter complex data"
        required
      />
    </div>
  ),
};
