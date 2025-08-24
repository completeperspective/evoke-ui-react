import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { cn } from './cn';

const meta = {
  title: 'Design System/Utilities/cn',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The `cn` utility merges Tailwind CSS classes with proper precedence using clsx and tailwind-merge.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const CnDemo = () => {
  const examples = [
    {
      title: 'Basic Merging',
      input: ['px-2 py-1', 'px-4'],
      output: cn('px-2 py-1', 'px-4'),
      description: 'Later classes override earlier ones',
    },
    {
      title: 'Conditional Classes',
      input: ['text-red-500', true && 'text-blue-500'],
      output: cn('text-red-500', true && 'text-blue-500'),
      description: 'Conditional class application',
    },
    {
      title: 'False Values',
      input: ['text-red-500', false && 'text-blue-500'],
      output: cn('text-red-500', false && 'text-blue-500'),
      description: 'False values are ignored',
    },
    {
      title: 'Array Syntax',
      input: [['flex', 'items-center'], 'justify-between'],
      output: cn(['flex', 'items-center'], 'justify-between'),
      description: 'Arrays are flattened',
    },
    {
      title: 'Object Syntax',
      input: [{ 'bg-blue-500': true, 'bg-red-500': false }, 'text-white'],
      output: cn({ 'bg-blue-500': true, 'bg-red-500': false }, 'text-white'),
      description: 'Object keys with truthy values are included',
    },
    {
      title: 'Complex Merging',
      input: ['rounded-md hover:bg-gray-100', 'rounded-lg hover:bg-blue-100'],
      output: cn('rounded-md hover:bg-gray-100', 'rounded-lg hover:bg-blue-100'),
      description: 'Handles variants and modifiers correctly',
    },
    {
      title: 'Spacing Conflicts',
      input: ['p-4 px-8', 'py-2'],
      output: cn('p-4 px-8', 'py-2'),
      description: 'Intelligent handling of padding/margin conflicts',
    },
    {
      title: 'Color Opacity',
      input: ['bg-red-500/50', 'bg-blue-500/75'],
      output: cn('bg-red-500/50', 'bg-blue-500/75'),
      description: 'Handles Tailwind opacity modifiers',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">cn() Utility Function</h2>
        <p className="text-muted-foreground">
          The <code className="px-2 py-1 bg-muted rounded">cn()</code> function combines the power
          of <code className="px-2 py-1 bg-muted rounded">clsx</code> for conditional classes and{' '}
          <code className="px-2 py-1 bg-muted rounded">tailwind-merge</code> for intelligent
          Tailwind class merging.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Usage Examples</h3>
        <div className="rounded-lg bg-muted p-4">
          <pre className="text-sm">
            <code>{`import { cn } from '@evoke-ui/react/utils';

// Basic usage
const className = cn('px-2 py-1', 'px-4');
// Result: 'py-1 px-4'

// With conditionals
const isActive = true;
const className = cn(
  'text-gray-500',
  isActive && 'text-blue-500'
);
// Result: 'text-blue-500'

// With arrays and objects
const className = cn(
  ['flex', 'items-center'],
  {
    'bg-blue-500': isPrimary,
    'bg-gray-500': !isPrimary,
  },
  'rounded-md'
);`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Examples</h3>
        <div className="space-y-4">
          {examples.map((example, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2">
              <h4 className="font-semibold">{example.title}</h4>
              <p className="text-sm text-muted-foreground">{example.description}</p>
              <div className="grid gap-2">
                <div className="p-2 bg-muted rounded text-sm">
                  <span className="text-muted-foreground">Input:</span>{' '}
                  <code>{JSON.stringify(example.input)}</code>
                </div>
                <div className="p-2 bg-accent rounded text-sm">
                  <span className="text-muted-foreground">Output:</span>{' '}
                  <code className="font-semibold">{example.output}</code>
                </div>
              </div>
              <div className="mt-2">
                <div className={example.output}>
                  <div className="inline-block px-4 py-2 border-2 border-dashed border-current">
                    Sample Element
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Why Use cn()?</h3>
        <ul className="space-y-2 list-disc list-inside text-muted-foreground">
          <li>
            <strong>Intelligent Merging:</strong> Automatically resolves Tailwind class conflicts
          </li>
          <li>
            <strong>Conditional Classes:</strong> Clean syntax for conditional class application
          </li>
          <li>
            <strong>Type Safety:</strong> Full TypeScript support with ClassValue types
          </li>
          <li>
            <strong>Performance:</strong> Optimized for production use
          </li>
          <li>
            <strong>Developer Experience:</strong> Cleaner, more maintainable component code
          </li>
        </ul>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => <CnDemo />,
};
