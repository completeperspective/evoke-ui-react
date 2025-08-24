import type { Meta, StoryObj } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { Input } from './Input';
import { useState } from 'react';

// Mock icons for demonstration
const SearchIcon = () => (
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
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const UserIcon = () => (
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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const EyeIcon = () => (
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
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-3-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
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
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

const CheckIcon = () => (
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
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const XIcon = () => (
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
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Input component for collecting user input with validation states, icons, and helper text support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size variant of the input',
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'The validation state of the input',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for the input',
    },
    error: {
      control: { type: 'text' },
      description: 'Error message to display',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text to display below the input',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when input value changes',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Sample input text',
    placeholder: 'Enter text...',
  },
};

// Size variants
export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small input',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    placeholder: 'Medium input',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large input',
  },
};

// Validation states
export const Error: Story = {
  args: {
    state: 'error',
    value: 'Invalid input',
    error: 'This field is required',
  },
};

export const Success: Story = {
  args: {
    state: 'success',
    value: 'Valid input',
    helperText: 'Looks good!',
  },
};

export const Warning: Story = {
  args: {
    state: 'warning',
    value: 'Warning input',
    helperText: 'This might need attention',
  },
};

// With icons
export const WithStartIcon: Story = {
  args: {
    startIcon: <SearchIcon />,
    placeholder: 'Search...',
  },
};

export const WithEndIcon: Story = {
  args: {
    endIcon: <CheckIcon />,
    value: 'Validated input',
    state: 'success',
  },
};

export const WithBothIcons: Story = {
  args: {
    startIcon: <UserIcon />,
    endIcon: <XIcon />,
    placeholder: 'Username',
  },
};

// States
export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled input',
    placeholder: 'This is disabled',
  },
};

export const WithHelperText: Story = {
  args: {
    placeholder: 'Enter your email',
    helperText: "We'll never share your email with anyone else.",
  },
};

export const WithErrorAndIcon: Story = {
  args: {
    state: 'error',
    startIcon: <UserIcon />,
    endIcon: <XIcon />,
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

// Input types
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
    startIcon: <EyeIcon />,
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email',
    startIcon: <UserIcon />,
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter a number',
    min: 0,
    max: 100,
  },
};

// Interactive password example
const PasswordToggleTemplate = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  return (
    <div className="w-80">
      <Input
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        startIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
        endIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-1 hover:bg-muted rounded"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        }
        helperText="Click the eye icon to toggle password visibility"
      />
    </div>
  );
};

export const PasswordToggle: Story = {
  render: PasswordToggleTemplate,
  parameters: {
    docs: {
      description: {
        story: 'An interactive password input with show/hide functionality.',
      },
    },
  },
};

// Form validation example
const FormValidationTemplate = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [state, setState] = useState<'default' | 'error' | 'success'>('default');

  const validateEmail = (value: string) => {
    if (!value) {
      setError('');
      setState('default');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Please enter a valid email address');
      setState('error');
    } else {
      setError('');
      setState('success');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  return (
    <div className="w-80">
      <Input
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Enter your email"
        state={state}
        startIcon={<UserIcon />}
        endIcon={state === 'success' ? <CheckIcon /> : state === 'error' ? <XIcon /> : undefined}
        error={error}
        helperText={state === 'success' ? 'Email looks good!' : 'Enter a valid email address'}
      />
    </div>
  );
};

export const FormValidation: Story = {
  render: FormValidationTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Real-time form validation with visual feedback.',
      },
    },
  },
};

// All variants showcase
const AllVariantsTemplate = () => (
  <div className="grid grid-cols-1 gap-6 w-full max-w-2xl">
    <div className="space-y-4">
      <h4 className="text-sm font-semibold">Sizes</h4>
      <div className="space-y-3">
        <Input size="sm" placeholder="Small input" />
        <Input size="md" placeholder="Medium input" />
        <Input size="lg" placeholder="Large input" />
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="text-sm font-semibold">States</h4>
      <div className="space-y-3">
        <Input placeholder="Default state" />
        <Input state="error" value="Error state" error="Something went wrong" />
        <Input state="success" value="Success state" helperText="Looks great!" />
        <Input state="warning" value="Warning state" helperText="Double-check this" />
        <Input disabled value="Disabled state" />
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="text-sm font-semibold">With Icons</h4>
      <div className="space-y-3">
        <Input startIcon={<SearchIcon />} placeholder="Search with start icon" />
        <Input endIcon={<CheckIcon />} placeholder="Input with end icon" />
        <Input startIcon={<UserIcon />} endIcon={<CheckIcon />} placeholder="Both icons" />
      </div>
    </div>
  </div>
);

export const AllVariants: Story = {
  render: AllVariantsTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all input variants, sizes, states, and icon combinations.',
      },
    },
  },
};
