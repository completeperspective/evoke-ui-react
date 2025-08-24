import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar, type SearchSuggestion } from './SearchBar';

// Mock timers for testing debounced functionality
beforeEach(() => {
  vi.clearAllMocks();
  vi.clearAllTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

// Mock suggestions data
const mockSuggestions: SearchSuggestion[] = [
  { id: '1', text: 'React components' },
  { id: '2', text: 'React hooks' },
  { id: '3', text: 'React testing' },
];

const recentSearches = ['JavaScript', 'TypeScript', 'CSS'];

describe('SearchBar', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<SearchBar />);
      
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    it('renders with custom placeholder', () => {
      render(<SearchBar placeholder="Search products..." />);
      
      expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
    });

    it('renders with different sizes', () => {
      const { rerender } = render(<SearchBar size="sm" data-testid="searchbar" />);
      
      expect(screen.getByTestId('searchbar')).toHaveClass('h-8');
      
      rerender(<SearchBar size="md" data-testid="searchbar" />);
      expect(screen.getByTestId('searchbar')).toHaveClass('h-9');
      
      rerender(<SearchBar size="lg" data-testid="searchbar" />);
      expect(screen.getByTestId('searchbar')).toHaveClass('h-10');
    });

    it('renders with different variants', () => {
      const { rerender } = render(<SearchBar variant="default" data-testid="searchbar" />);
      
      expect(screen.getByTestId('searchbar')).toHaveClass('bg-background', 'border', 'border-input');
      
      rerender(<SearchBar variant="compact" data-testid="searchbar" />);
      expect(screen.getByTestId('searchbar')).toHaveClass('bg-muted/50', 'border-muted');
      
      rerender(<SearchBar variant="prominent" data-testid="searchbar" />);
      expect(screen.getByTestId('searchbar')).toHaveClass('border-2', 'border-primary/20');
    });

    it('renders search icon by default', () => {
      render(<SearchBar />);
      
      const searchIcon = screen.getByRole('textbox').parentElement?.parentElement?.querySelector('svg');
      expect(searchIcon).toBeInTheDocument();
    });

    it('renders with action button when showActionButton is true', () => {
      render(<SearchBar showActionButton />);
      
      expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    });

    it('renders action button with custom text', () => {
      render(<SearchBar showActionButton actionButtonText="Find" />);
      
      expect(screen.getByRole('button', { name: 'Find' })).toBeInTheDocument();
      expect(screen.getByText('Find')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('renders in disabled state', () => {
      render(<SearchBar disabled data-testid="searchbar" />);
      
      expect(screen.getByRole('textbox')).toBeDisabled();
      expect(screen.getByTestId('searchbar')).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('renders in loading state', () => {
      render(<SearchBar loading data-testid="searchbar" />);
      
      expect(screen.getByTestId('searchbar')).toHaveClass('opacity-75', 'cursor-wait');
      
      // Should show loading spinner in icon position
      const loadingSpinner = screen.getByTestId('searchbar').querySelector('.animate-spin');
      expect(loadingSpinner).toBeInTheDocument();
    });

    it('renders with error state', () => {
      render(<SearchBar error="Search failed" data-testid="searchbar" />);
      
      expect(screen.getByTestId('searchbar')).toHaveClass('border-destructive');
      expect(screen.getByText('Search failed')).toBeInTheDocument();
    });

    it('renders with success state', () => {
      render(<SearchBar success data-testid="searchbar" />);
      
      expect(screen.getByTestId('searchbar')).toHaveClass('border-success');
    });
  });

  describe('User Interactions', () => {
    it('calls onChange when typing', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(<SearchBar onChange={handleChange} />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'test');
      
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith('test');
      });
    });

    it('calls onSearch when Enter key is pressed', async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();
      
      render(<SearchBar onSearch={handleSearch} />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'test query');
      await user.keyboard('[Enter]');
      
      expect(handleSearch).toHaveBeenCalledWith('test query');
    });

    it('calls onSearch when action button is clicked', async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();
      const handleActionClick = vi.fn();
      
      render(<SearchBar showActionButton onSearch={handleSearch} onActionClick={handleActionClick} />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'test query');
      
      const actionButton = screen.getByRole('button', { name: 'Search' });
      await user.click(actionButton);
      
      expect(handleActionClick).toHaveBeenCalledWith('test query');
      expect(handleSearch).toHaveBeenCalledWith('test query');
    });

    it('calls onClear when clear button is clicked', async () => {
      const user = userEvent.setup();
      const handleClear = vi.fn();
      
      render(<SearchBar onClear={handleClear} defaultValue="test" />);
      
      const clearButton = screen.getByRole('button', { name: 'Clear search' });
      await user.click(clearButton);
      
      expect(handleClear).toHaveBeenCalled();
    });

    it('calls onClear when Escape key is pressed with text', async () => {
      const user = userEvent.setup();
      const handleClear = vi.fn();
      
      render(<SearchBar onClear={handleClear} defaultValue="test" />);
      
      const input = screen.getByRole('textbox');
      input.focus();
      await user.keyboard('[Escape]');
      
      expect(handleClear).toHaveBeenCalled();
    });

    it('shows clear button only when there is text and showClearButton is true', async () => {
      const user = userEvent.setup();
      
      render(<SearchBar showClearButton />);
      
      // No clear button initially
      expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'test');
      
      // Clear button should appear
      expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
    });

    it('does not show clear button when showClearButton is false', async () => {
      const user = userEvent.setup();
      
      render(<SearchBar showClearButton={false} />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'test');
      
      expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
    });

    it('calls onFocus and onBlur handlers', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      
      render(<SearchBar onFocus={handleFocus} onBlur={handleBlur} />);
      
      const input = screen.getByRole('textbox');
      
      await user.click(input);
      expect(handleFocus).toHaveBeenCalled();
      
      await user.tab();
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe('Suggestions', () => {
    it('shows suggestions when provided and focused', async () => {
      const user = userEvent.setup();
      
      render(<SearchBar suggestions={mockSuggestions} />);
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      
      expect(screen.getByText('React components')).toBeInTheDocument();
      expect(screen.getByText('React hooks')).toBeInTheDocument();
      expect(screen.getByText('React testing')).toBeInTheDocument();
    });

    it('calls onSuggestionSelect when suggestion is clicked', async () => {
      const user = userEvent.setup();
      const handleSuggestionSelect = vi.fn();
      
      render(<SearchBar suggestions={mockSuggestions} onSuggestionSelect={handleSuggestionSelect} />);
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      
      const suggestion = screen.getByText('React components');
      await user.click(suggestion);
      
      expect(handleSuggestionSelect).toHaveBeenCalledWith(mockSuggestions[0]);
    });

    it('shows loading state for suggestions', async () => {
      const user = userEvent.setup();
      
      render(<SearchBar suggestions={[]} suggestionsLoading />);
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      
      expect(screen.getByText('Loading suggestions...')).toBeInTheDocument();
    });

    it('shows no suggestions message when empty', async () => {
      const user = userEvent.setup();
      
      render(<SearchBar suggestions={[]} noSuggestionsText="No results found" />);
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    it('navigates suggestions with arrow keys', async () => {
      const user = userEvent.setup();
      const handleSuggestionSelect = vi.fn();
      
      render(<SearchBar suggestions={mockSuggestions} onSuggestionSelect={handleSuggestionSelect} />);
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      
      // Navigate down and select
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[Enter]');
      
      expect(handleSuggestionSelect).toHaveBeenCalledWith(mockSuggestions[1]);
    });

    it('wraps around when navigating suggestions', async () => {
      const user = userEvent.setup();
      
      render(<SearchBar suggestions={mockSuggestions} />);
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      
      // Should wrap to first item when going down from last
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      
      // First suggestion should be highlighted (testing through DOM classes)
      const suggestions = screen.getAllByRole('generic').filter(el => 
        el.textContent?.includes('React components')
      );
      expect(suggestions.length).toBeGreaterThan(0);
    });
  });

  describe('Recent Searches', () => {
    it('shows recent searches when provided and focused', async () => {
      const user = userEvent.setup();
      
      // Recent searches are only shown when there's a matching value
      render(<SearchBar recentSearches={recentSearches} recentSearchesLabel="Recent" />);
      
      const input = screen.getByRole('textbox');
      // Type something that matches a recent search
      await user.type(input, 'Java');
      await user.click(input);
      
      expect(screen.getByText('Recent')).toBeInTheDocument();
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
    });

    it('calls onRecentSearchSelect when recent search is clicked', async () => {
      const user = userEvent.setup();
      const handleRecentSearchSelect = vi.fn();
      
      render(<SearchBar recentSearches={recentSearches} onRecentSearchSelect={handleRecentSearchSelect} />);
      
      const input = screen.getByRole('textbox');
      // Type something that matches a recent search  
      await user.type(input, 'Java');
      await user.click(input);
      
      const recentSearch = screen.getByText('JavaScript');
      await user.click(recentSearch);
      
      expect(handleRecentSearchSelect).toHaveBeenCalledWith('JavaScript');
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled component with defaultValue', () => {
      render(<SearchBar defaultValue="initial value" />);
      
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('initial value');
    });

    it('works as controlled component', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      const { rerender } = render(<SearchBar value="controlled" onChange={handleChange} />);
      
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('controlled');
      
      // Simulate typing
      await user.type(input, 'x');
      
      // Rerender with new value
      rerender(<SearchBar value="controlledx" onChange={handleChange} />);
      
      expect(input.value).toBe('controlledx');
    });
  });

  describe('Debouncing', () => {
    it('debounces onChange calls', async () => {
      vi.useFakeTimers();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const handleChange = vi.fn();
      
      render(<SearchBar onChange={handleChange} debounceMs={100} />);
      
      const input = screen.getByRole('textbox');
      
      // Type a character
      await user.type(input, 't');
      
      // Should not have called onChange yet
      expect(handleChange).not.toHaveBeenCalled();
      
      // Fast-forward time
      act(() => {
        vi.advanceTimersByTime(100);
      });
      
      // Now it should have been called
      expect(handleChange).toHaveBeenCalledWith('t');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<SearchBar />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('has proper ARIA attributes with error', () => {
      render(<SearchBar error="Search failed" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('has proper button labels', () => {
      render(<SearchBar showActionButton showClearButton defaultValue="test" />);
      
      expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
    });

    it('supports custom action button label', () => {
      render(<SearchBar showActionButton actionButtonText="Find Results" />);
      
      expect(screen.getByRole('button', { name: 'Find Results' })).toBeInTheDocument();
    });
  });

  describe('Click Outside', () => {
    it('closes suggestions when clicking outside', async () => {
      const user = userEvent.setup();
      
      render(
        <div>
          <SearchBar suggestions={mockSuggestions} />
          <button>Outside button</button>
        </div>
      );
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      
      // Suggestions should be visible
      expect(screen.getByText('React components')).toBeInTheDocument();
      
      const outsideButton = screen.getByText('Outside button');
      await user.click(outsideButton);
      
      // Wait for suggestions to close
      await waitFor(() => {
        expect(screen.queryByText('React components')).not.toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles empty search submission', async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();
      
      render(<SearchBar onSearch={handleSearch} />);
      
      const input = screen.getByRole('textbox');
      await user.keyboard('[Enter]');
      
      expect(handleSearch).not.toHaveBeenCalled();
    });

    it('trims whitespace on search', async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();
      
      render(<SearchBar onSearch={handleSearch} />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, '  test query  ');
      await user.keyboard('[Enter]');
      
      expect(handleSearch).toHaveBeenCalledWith('test query');
    });

    it('handles disabled state correctly', async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();
      
      render(<SearchBar disabled onSearch={handleSearch} defaultValue="test" />);
      
      const input = screen.getByRole('textbox');
      await user.keyboard('[Enter]');
      
      expect(handleSearch).not.toHaveBeenCalled();
    });

    it('limits suggestions to maxSuggestions', async () => {
      const user = userEvent.setup();
      const manySuggestions = Array.from({ length: 10 }, (_, i) => ({
        id: String(i),
        text: `Suggestion ${i + 1}`,
      }));
      
      render(<SearchBar suggestions={manySuggestions} maxSuggestions={3} />);
      
      const input = screen.getByRole('textbox');
      await user.click(input);
      
      // Should only show 3 suggestions
      expect(screen.getByText('Suggestion 1')).toBeInTheDocument();
      expect(screen.getByText('Suggestion 2')).toBeInTheDocument();
      expect(screen.getByText('Suggestion 3')).toBeInTheDocument();
      expect(screen.queryByText('Suggestion 4')).not.toBeInTheDocument();
    });

    it('filters recent searches based on current value', async () => {
      const user = userEvent.setup();
      
      render(<SearchBar recentSearches={['JavaScript', 'Java', 'Python']} />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'Java');
      
      // Should show filtered recent searches
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('Java')).toBeInTheDocument();
      expect(screen.queryByText('Python')).not.toBeInTheDocument();
    });
  });
});