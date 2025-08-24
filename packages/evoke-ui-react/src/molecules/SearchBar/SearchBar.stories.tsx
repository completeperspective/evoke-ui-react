import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchBar, type SearchSuggestion } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The **SearchBar** is a molecular component that combines an Input field with a search icon and optional action button to create a comprehensive search interface.

## Features

- **CVA-first architecture** with comprehensive variant system
- **Multiple variants**: default, compact, prominent 
- **Size variants**: sm, md, lg
- **Search suggestions** with keyboard navigation
- **Recent searches** support  
- **Loading states** with spinner
- **Clear functionality** with Escape key support
- **Action button** with customizable text/icon
- **Debounced search** for better performance
- **Full accessibility** with ARIA support
- **Keyboard navigation**: Enter to search, Escape to clear, Arrow keys for suggestions

## Use Cases

- Product search in e-commerce applications
- Content search in blogs or documentation sites
- User search in admin panels
- Global search in web applications
- Filter search in data tables

## Accessibility

- Proper ARIA attributes for screen readers
- Keyboard navigation support (Enter, Escape, Arrow keys)
- Focus management for suggestion navigation
- High contrast mode support
- Reduced motion support for animations
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'prominent'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select', 
      options: ['sm', 'md', 'lg'],
      description: 'Size of the search bar',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the search bar is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the search bar is in loading state',
    },
    showActionButton: {
      control: 'boolean',
      description: 'Whether to show the action button',
    },
    actionButtonText: {
      control: 'text',
      description: 'Text for the action button (shows icon if empty)',
    },
    actionButtonVariant: {
      control: 'select',
      options: ['default', 'ghost', 'outline'],
      description: 'Action button variant',
    },
    showClearButton: {
      control: 'boolean',
      description: 'Whether to show clear button when there is text',
    },
    debounceMs: {
      control: 'number',
      description: 'Debounce delay in milliseconds',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

// Mock suggestions data
const mockSuggestions: SearchSuggestion[] = [
  { id: '1', text: 'React components' },
  { id: '2', text: 'React hooks' },
  { id: '3', text: 'React testing' },
  { id: '4', text: 'React performance' },
  { id: '5', text: 'React patterns' },
  { id: '6', text: 'React best practices' },
  { id: '7', text: 'React TypeScript' },
  { id: '8', text: 'React state management' },
];

const recentSearches = [
  'JavaScript tutorials',
  'CSS grid layout', 
  'TypeScript interfaces',
  'Web accessibility',
];

/**
 * Basic SearchBar with default configuration
 */
export const Default: Story = {
  args: {
    placeholder: 'Search...',
    onSearch: (value: string) => console.log('Search:', value),
    onChange: (value: string) => console.log('Change:', value),
    onClear: () => console.log('Clear'),
  },
};

/**
 * SearchBar with different size variants
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div>
        <h4 className="text-sm font-medium mb-2">Small</h4>
        <SearchBar 
          size="sm" 
          placeholder="Small search..." 
          onSearch={(value: string) => console.log('Search (sm):', value)}
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Medium (Default)</h4>
        <SearchBar 
          size="md" 
          placeholder="Medium search..." 
          onSearch={(value: string) => console.log('Search (md):', value)}
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Large</h4>
        <SearchBar 
          size="lg" 
          placeholder="Large search..." 
          onSearch={(value: string) => console.log('Search (lg):', value)}
        />
      </div>
    </div>
  ),
};

/**
 * SearchBar with different visual variants
 */
export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div>
        <h4 className="text-sm font-medium mb-2">Default</h4>
        <SearchBar 
          variant="default" 
          placeholder="Default variant..." 
          onSearch={(value: string) => console.log('Search (default):', value)}
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Compact</h4>
        <SearchBar 
          variant="compact" 
          placeholder="Compact variant..." 
          onSearch={(value: string) => console.log('Search (compact):', value)}
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Prominent</h4>
        <SearchBar 
          variant="prominent" 
          placeholder="Prominent variant..." 
          onSearch={(value: string) => console.log('Search (prominent):', value)}
        />
      </div>
    </div>
  ),
};

/**
 * SearchBar with action button configurations
 */
export const WithActionButton: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div>
        <h4 className="text-sm font-medium mb-2">Icon Action Button</h4>
        <SearchBar 
          placeholder="Search products..." 
          showActionButton
          onSearch={(value: string) => console.log('Search (icon):', value)}
          onActionClick={() => console.log('Action click (icon)')}
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Text Action Button</h4>
        <SearchBar 
          placeholder="Search products..." 
          showActionButton
          actionButtonText="Search"
          onSearch={(value: string) => console.log('Search (text):', value)}
          onActionClick={() => console.log('Action click (text)')}
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Ghost Action Button</h4>
        <SearchBar 
          placeholder="Search products..." 
          showActionButton
          actionButtonText="Go"
          actionButtonVariant="ghost"
          onSearch={(value: string) => console.log('Search (ghost):', value)}
          onActionClick={() => console.log('Action click (ghost)')}
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Outline Action Button</h4>
        <SearchBar 
          placeholder="Search products..." 
          showActionButton
          actionButtonText="Find"
          actionButtonVariant="outline"
          onSearch={(value: string) => console.log('Search (outline):', value)}
          onActionClick={() => console.log('Action click (outline)')}
        />
      </div>
    </div>
  ),
};

/**
 * SearchBar in different states
 */
export const States: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div>
        <h4 className="text-sm font-medium mb-2">Default State</h4>
        <SearchBar 
          placeholder="Search..." 
          onSearch={(value: string) => console.log('Search (default state):', value)}
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Loading State</h4>
        <SearchBar 
          placeholder="Search..." 
          loading
          onSearch={(value: string) => console.log('Search (loading):', value)}
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Disabled State</h4>
        <SearchBar 
          placeholder="Search..." 
          disabled
          onSearch={(value: string) => console.log('Search (disabled):', value)}
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Error State</h4>
        <SearchBar 
          placeholder="Search..." 
          error="Search failed. Please try again."
          onSearch={(value: string) => console.log('Search (error):', value)}
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Success State</h4>
        <SearchBar 
          placeholder="Search..." 
          success
          defaultValue="Search completed successfully"
          onSearch={(value: string) => console.log('Search (success):', value)}
        />
      </div>
    </div>
  ),
};

/**
 * SearchBar with suggestions functionality
 */
export const WithSuggestions: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (newValue: string) => {
      setValue(newValue);
      
      if (newValue.trim()) {
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
          const filtered = mockSuggestions.filter(suggestion =>
            suggestion.text.toLowerCase().includes(newValue.toLowerCase())
          );
          setFilteredSuggestions(filtered);
          setLoading(false);
        }, 300);
      } else {
        setFilteredSuggestions([]);
        setLoading(false);
      }
    };

    const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
      setValue(suggestion.text);
      setFilteredSuggestions([]);
      console.log('Suggestion selected:', suggestion);
    };

    return (
      <div className="w-96">
        <h4 className="text-sm font-medium mb-2">Type to see suggestions</h4>
        <SearchBar
          placeholder="Search React topics..."
          value={value}
          onChange={handleChange}
          suggestions={filteredSuggestions}
          suggestionsLoading={loading}
          onSuggestionSelect={handleSuggestionSelect}
          onSearch={(value: string) => console.log('Search:', value)}
          showActionButton
          actionButtonText="Search"
        />
      </div>
    );
  },
};

/**
 * SearchBar with recent searches functionality
 */
export const WithRecentSearches: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const handleRecentSearchSelect = (search: string) => {
      setValue(search);
      console.log('Recent search selected:', search);
    };

    return (
      <div className="w-96">
        <h4 className="text-sm font-medium mb-2">Focus to see recent searches</h4>
        <SearchBar
          placeholder="Search anything..."
          value={value}
          onChange={setValue}
          recentSearches={recentSearches}
          recentSearchesLabel="Recent searches"
          onRecentSearchSelect={handleRecentSearchSelect}
          onSearch={(value: string) => console.log('Search:', value)}
        />
      </div>
    );
  },
};

/**
 * SearchBar with both suggestions and recent searches
 */
export const WithSuggestionsAndRecent: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (newValue: string) => {
      setValue(newValue);
      
      if (newValue.trim()) {
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
          const filtered = mockSuggestions.filter(suggestion =>
            suggestion.text.toLowerCase().includes(newValue.toLowerCase())
          );
          setFilteredSuggestions(filtered);
          setLoading(false);
        }, 300);
      } else {
        setFilteredSuggestions([]);
        setLoading(false);
      }
    };

    const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
      setValue(suggestion.text);
      setFilteredSuggestions([]);
      console.log('Suggestion selected:', suggestion);
    };

    const handleRecentSearchSelect = (search: string) => {
      setValue(search);
      setFilteredSuggestions([]);
      console.log('Recent search selected:', search);
    };

    return (
      <div className="w-96">
        <h4 className="text-sm font-medium mb-2">Combined suggestions and recent searches</h4>
        <SearchBar
          variant="prominent"
          size="lg"
          placeholder="What are you looking for?"
          value={value}
          onChange={handleChange}
          suggestions={filteredSuggestions}
          suggestionsLoading={loading}
          recentSearches={recentSearches}
          recentSearchesLabel="Recent"
          onSuggestionSelect={handleSuggestionSelect}
          onRecentSearchSelect={handleRecentSearchSelect}
          onSearch={(value: string) => console.log('Search:', value)}
          showActionButton
          actionButtonText="Search"
          maxSuggestions={5}
        />
      </div>
    );
  },
};

/**
 * SearchBar with controlled value
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('Initial search query');

    return (
      <div className="space-y-4 w-96">
        <div>
          <h4 className="text-sm font-medium mb-2">Controlled SearchBar</h4>
          <SearchBar
            placeholder="Controlled search..."
            value={value}
            onChange={setValue}
            onSearch={(value: string) => console.log('Search:', value)}
            onClear={() => setValue('')}
            showActionButton
            actionButtonText="Go"
          />
        </div>
        <div className="p-3 bg-muted rounded-md">
          <p className="text-sm"><strong>Current value:</strong> "{value}"</p>
          <button 
            className="mt-2 px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm"
            onClick={() => setValue('Programmatically set value')}
          >
            Set Value Programmatically
          </button>
        </div>
      </div>
    );
  },
};

/**
 * SearchBar without clear button
 */
export const WithoutClearButton: Story = {
  args: {
    placeholder: 'Search without clear button...',
    showClearButton: false,
    defaultValue: 'This text cannot be cleared with X button',
    onSearch: (value: string) => console.log('Search:', value),
    onChange: (value: string) => console.log('Change:', value),
  },
};

/**
 * SearchBar with debounced input
 */
export const WithDebouncing: Story = {
  render: () => {
    const [lastTriggered, setLastTriggered] = useState<string>('');

    const handleChange = (value: string) => {
      setLastTriggered(`onChange triggered at ${new Date().toLocaleTimeString()} with: "${value}"`);
      console.log('Debounced onChange:', value);
    };

    return (
      <div className="space-y-4 w-96">
        <div>
          <h4 className="text-sm font-medium mb-2">Debounced Input (500ms delay)</h4>
          <SearchBar
            placeholder="Type to see debounced onChange..."
            onChange={handleChange}
            onSearch={(value: string) => console.log('Search:', value)}
            debounceMs={500}
          />
        </div>
        <div className="p-3 bg-muted rounded-md">
          <p className="text-xs text-muted-foreground">{lastTriggered || 'Start typing to see debounced onChange...'}</p>
        </div>
      </div>
    );
  },
};

/**
 * SearchBar with keyboard navigation demo
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="w-96">
      <h4 className="text-sm font-medium mb-2">Keyboard Navigation Demo</h4>
      <p className="text-sm text-muted-foreground mb-4">
        Try these keyboard shortcuts:
        <br />• <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Enter</kbd> - Search
        <br />• <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Escape</kbd> - Clear (when has text) or close suggestions
        <br />• <kbd className="px-1 py-0.5 bg-muted rounded text-xs">↑/↓</kbd> - Navigate suggestions
        <br />• <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Enter</kbd> - Select highlighted suggestion
      </p>
      <SearchBar
        placeholder="Try keyboard navigation..."
        suggestions={mockSuggestions}
        recentSearches={recentSearches}
        onSuggestionSelect={(suggestion) => console.log('Suggestion selected:', suggestion)}
        onRecentSearchSelect={(search) => console.log('Recent search selected:', search)}
        onSearch={(value: string) => console.log('Search:', value)}
        onClear={() => console.log('Clear')}
      />
    </div>
  ),
};

/**
 * SearchBar playground for testing all features
 */
export const Playground: Story = {
  args: {
    placeholder: 'Search anything...',
    variant: 'default',
    size: 'md',
    showActionButton: false,
    actionButtonText: '',
    actionButtonVariant: 'default',
    showClearButton: true,
    loading: false,
    disabled: false,
    debounceMs: 300,
    onSearch: (value: string) => console.log('Search:', value),
    onChange: (value: string) => console.log('Change:', value),
    onClear: () => console.log('Clear'),
    onActionClick: () => console.log('Action click'),
  },
  render: (args) => (
    <div className="w-96">
      <SearchBar {...args} />
    </div>
  ),
};

/**
 * Real-world e-commerce search example
 */
export const EcommerceExample: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
    const [loading, setLoading] = useState(false);

    const productSuggestions = [
      { id: '1', text: 'iPhone 15 Pro', metadata: { category: 'Electronics' } },
      { id: '2', text: 'MacBook Air M2', metadata: { category: 'Computers' } },
      { id: '3', text: 'AirPods Pro', metadata: { category: 'Audio' } },
      { id: '4', text: 'iPad Pro 12.9', metadata: { category: 'Tablets' } },
      { id: '5', text: 'Apple Watch Series 9', metadata: { category: 'Wearables' } },
    ];

    const recentProducts = [
      'Nike Air Max',
      'Samsung Galaxy S24',
      'Sony WH-1000XM5',
    ];

    const handleChange = (newValue: string) => {
      setValue(newValue);
      
      if (newValue.trim()) {
        setLoading(true);
        setTimeout(() => {
          const filtered = productSuggestions.filter(suggestion =>
            suggestion.text.toLowerCase().includes(newValue.toLowerCase())
          );
          setSuggestions(filtered);
          setLoading(false);
        }, 200);
      } else {
        setSuggestions([]);
        setLoading(false);
      }
    };

    return (
      <div className="w-96">
        <h4 className="text-sm font-medium mb-2">E-commerce Product Search</h4>
        <SearchBar
          variant="prominent"
          size="lg"
          placeholder="Search for products..."
          value={value}
          onChange={handleChange}
          suggestions={suggestions}
          suggestionsLoading={loading}
          recentSearches={recentProducts}
          recentSearchesLabel="Recent searches"
          onSuggestionSelect={(suggestion) => {
            setValue(suggestion.text);
            setSuggestions([]);
            console.log('Product selected:', suggestion);
          }}
          onRecentSearchSelect={(search) => {
            setValue(search);
            console.log('Recent search selected:', search);
          }}
          onSearch={(value: string) => console.log('Search products:', value)}
          showActionButton
          actionButtonText="Search"
          showClearButton
        />
      </div>
    );
  },
};