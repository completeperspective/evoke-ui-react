import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Input, type InputProps } from '../../atoms/Input';
import { searchBarClasses } from '../../styles/classNames';

/**
 * SearchBar container variants
 * Controls overall layout and spacing of the search bar
 */
const searchBarVariants = cva('relative flex items-center w-full transition-all duration-200 [&_*:focus]:outline-none [&_*:focus-visible]:outline-none', {
  variants: {
    variant: {
      default: 'bg-background border border-input rounded-md shadow-sm',
      compact: 'bg-muted/50 border border-muted rounded-md',
      prominent: 'bg-background border-2 border-primary/20 rounded-lg shadow-md',
    },
    size: {
      sm: 'h-8',
      md: 'h-9',
      lg: 'h-10',
    },
    state: {
      default:
        'hover:border-primary/30 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
      loading: 'opacity-75 cursor-wait',
      disabled: 'opacity-50 cursor-not-allowed bg-muted/50',
      error:
        'border-destructive focus-within:border-destructive focus-within:ring-2 focus-within:ring-destructive focus-within:ring-offset-2',
      success:
        'border-success focus-within:border-success focus-within:ring-2 focus-within:ring-success focus-within:ring-offset-2',
    },
    hasSuggestions: {
      true: 'rounded-b-none',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'prominent',
      state: 'default',
      className:
        'hover:border-primary/40 focus-within:border-primary focus-within:ring-primary/20 focus-within:ring-2',
    },
    {
      variant: 'compact',
      size: 'sm',
      className: 'rounded-sm',
    },
    {
      hasSuggestions: true,
      className: 'z-10',
    },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'md',
    state: 'default',
    hasSuggestions: false,
  },
});

/**
 * Search input wrapper variants
 */
const inputWrapperVariants = cva('flex-1 min-w-0', {
  variants: {},
  defaultVariants: {},
});

/**
 * Search icon variants
 */
const searchIconVariants = cva(
  'absolute left-3 flex items-center justify-center pointer-events-none text-muted-foreground transition-all duration-200 z-20',
  {
    variants: {
      size: {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-4 h-4',
      },
      state: {
        default: 'text-muted-foreground',
        loading: 'text-primary animate-pulse',
        disabled: 'text-muted-foreground/50',
        focused: 'text-primary',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  },
);

/**
 * Action button variants
 */
const actionButtonVariants = cva(
  'flex items-center justify-center transition-all duration-200 outline-none focus:outline-none focus-visible:outline-none',
  {
    variants: {
      size: {
        sm: 'h-6 rounded-sm',
        md: 'h-7 rounded-md',
        lg: 'h-8 rounded-md',
      },
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      },
      hasText: {
        true: 'px-3',
        false: 'w-7',
      },
    },
    compoundVariants: [
      {
        hasText: true,
        size: 'sm',
        className: 'h-6 px-2 text-xs',
      },
      {
        hasText: true,
        size: 'md',
        className: 'h-7 px-3 text-sm',
      },
      {
        hasText: true,
        size: 'lg',
        className: 'h-8 px-4 text-sm',
      },
      {
        hasText: false,
        size: 'sm',
        className: 'w-6',
      },
      {
        hasText: false,
        size: 'lg',
        className: 'w-8',
      },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'default',
      hasText: false,
    },
  },
);

/**
 * Clear button variants
 */
const clearButtonVariants = cva(
  'flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer outline-none focus:outline-none focus-visible:outline-none',
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

/**
 * Suggestions dropdown variants
 */
const suggestionsVariants = cva(
  'absolute top-full left-0 right-0 bg-popover border border-t-0 border-border rounded-b-md shadow-lg max-h-60 overflow-y-auto z-50 animate-in slide-in-from-top-1 duration-200',
  {
    variants: {
      variant: {
        default: 'bg-popover',
        compact: 'bg-background',
        prominent: 'bg-popover shadow-xl',
      },
      empty: {
        true: 'py-8',
        false: 'py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      empty: false,
    },
  },
);

/**
 * Suggestion item variants
 */
const suggestionItemVariants = cva(
  'flex items-center px-3 py-2 cursor-pointer transition-colors duration-150 text-sm',
  {
    variants: {
      highlighted: {
        true: 'bg-accent text-accent-foreground',
        false: 'hover:bg-accent/50',
      },
      type: {
        suggestion: 'text-foreground',
        recent: 'text-muted-foreground',
        loading: 'text-muted-foreground animate-pulse',
      },
    },
    defaultVariants: {
      highlighted: false,
      type: 'suggestion',
    },
  },
);

interface SearchSuggestion {
  id: string;
  text: string;
  type?: 'suggestion' | 'recent';
  metadata?: any;
}

export interface SearchBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'>,
    VariantProps<typeof searchBarVariants> {
  /** Input placeholder text */
  placeholder?: string;
  /** Current search value */
  value?: string;
  /** Default search value for uncontrolled usage */
  defaultValue?: string;
  /** Search change handler */
  onChange?: (value: string) => void;
  /** Search submit handler (Enter key or action button click) */
  onSearch?: (value: string) => void;
  /** Clear handler (when clear button is clicked or Escape is pressed) */
  onClear?: () => void;
  /** Focus handler */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Blur handler */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Whether the search bar is disabled */
  disabled?: boolean;
  /** Whether the search bar is in loading state */
  loading?: boolean;
  /** Error state and message */
  error?: string;
  /** Success state */
  success?: boolean;
  /** Search bar size */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'default' | 'compact' | 'prominent';

  // Action button props
  /** Whether to show an action button (search button) */
  showActionButton?: boolean;
  /** Action button text (if not provided, shows search icon) */
  actionButtonText?: string;
  /** Action button variant */
  actionButtonVariant?: 'default' | 'ghost' | 'outline';
  /** Action button click handler */
  onActionClick?: (value: string) => void;

  // Clear functionality
  /** Whether to show clear button when there's text */
  showClearButton?: boolean;

  // Suggestions functionality
  /** Array of search suggestions to display */
  suggestions?: SearchSuggestion[];
  /** Whether suggestions are loading */
  suggestionsLoading?: boolean;
  /** No suggestions message */
  noSuggestionsText?: string;
  /** Suggestion selection handler */
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  /** Maximum number of suggestions to show */
  maxSuggestions?: number;

  // Recent searches
  /** Array of recent search terms */
  recentSearches?: string[];
  /** Recent searches label */
  recentSearchesLabel?: string;
  /** Recent search selection handler */
  onRecentSearchSelect?: (search: string) => void;

  // Debouncing
  /** Debounce delay in milliseconds for onChange (default: 300) */
  debounceMs?: number;

  // Input props passthrough
  /** Additional props to pass to the input */
  inputProps?: Omit<
    InputProps,
    'value' | 'onChange' | 'onFocus' | 'onBlur' | 'placeholder' | 'disabled' | 'size'
  >;
}

/**
 * SearchBar molecular component that combines Input + Search Icon + optional Action Button
 * Built using CVA-first architecture with comprehensive search functionality
 *
 * @example
 * ```tsx
 * // Basic search bar
 * <SearchBar
 *   placeholder="Search products..."
 *   onSearch={(value) => console.log('Search:', value)}
 * />
 *
 * // With action button and suggestions
 * <SearchBar
 *   placeholder="Search..."
 *   showActionButton
 *   actionButtonText="Search"
 *   suggestions={suggestions}
 *   onSuggestionSelect={(suggestion) => handleSelect(suggestion)}
 *   onSearch={(value) => handleSearch(value)}
 * />
 *
 * // Compact variant with clear functionality
 * <SearchBar
 *   variant="compact"
 *   size="sm"
 *   showClearButton
 *   placeholder="Quick search..."
 *   onClear={() => setQuery('')}
 * />
 *
 * // Prominent variant with recent searches
 * <SearchBar
 *   variant="prominent"
 *   size="lg"
 *   placeholder="What are you looking for?"
 *   recentSearches={recentSearches}
 *   onRecentSearchSelect={(search) => handleRecentSearch(search)}
 *   loading={isLoading}
 * />
 * ```
 */
const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      placeholder = 'Search...',
      value,
      defaultValue,
      onChange,
      onSearch,
      onClear,
      onFocus,
      onBlur,
      disabled = false,
      loading = false,
      error,
      success = false,
      size = 'md',
      variant = 'default',
      showActionButton = false,
      actionButtonText,
      actionButtonVariant = 'default',
      onActionClick,
      showClearButton = true,
      suggestions = [],
      suggestionsLoading = false,
      noSuggestionsText = 'No suggestions found',
      onSuggestionSelect,
      maxSuggestions = 8,
      recentSearches = [],
      recentSearchesLabel = 'Recent searches',
      onRecentSearchSelect,
      debounceMs = 300,
      inputProps = {},
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    const [isFocused, setIsFocused] = React.useState(false);
    const [showSuggestions, setShowSuggestions] = React.useState(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const [debounceTimeout, setDebounceTimeout] = React.useState<NodeJS.Timeout | null>(null);

    const searchBarRef = React.useRef<HTMLDivElement>(null);
    const [inputElement, setInputElement] = React.useState<HTMLInputElement | null>(null);

    // Merge refs helper function
    const mergeRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        // Set internal ref
        setInputElement(node);

        // Handle forwarded ref
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [ref],
    );

    // Use controlled value if provided, otherwise use internal state
    const currentValue = value !== undefined ? value : internalValue;
    const hasValue = Boolean(currentValue && currentValue.length > 0);

    // Determine search bar state
    const searchBarState = disabled
      ? 'disabled'
      : loading
        ? 'loading'
        : error
          ? 'error'
          : success
            ? 'success'
            : 'default';

    // Determine icon state
    const iconState = loading
      ? 'loading'
      : disabled
        ? 'disabled'
        : isFocused
          ? 'focused'
          : 'default';

    // Combine suggestions and recent searches
    const displaySuggestions = React.useMemo(() => {
      const filtered = suggestions.slice(0, maxSuggestions);
      const recent = currentValue
        ? recentSearches
            .filter(
              (search) =>
                search.toLowerCase().includes(currentValue.toLowerCase()) &&
                search !== currentValue,
            )
            .slice(0, 3)
            .map((search) => ({ id: `recent-${search}`, text: search, type: 'recent' as const }))
        : [];

      return [...filtered, ...recent];
    }, [suggestions, recentSearches, currentValue, maxSuggestions]);

    const hasSuggestions = showSuggestions && (displaySuggestions.length > 0 || suggestionsLoading);

    // Debounced change handler
    const handleChange = React.useCallback(
      (newValue: string) => {
        if (value === undefined) {
          setInternalValue(newValue);
        }

        if (debounceTimeout) {
          clearTimeout(debounceTimeout);
        }

        const timeout = setTimeout(() => {
          onChange?.(newValue);
        }, debounceMs);

        setDebounceTimeout(timeout);
      },
      [value, onChange, debounceMs],
    );

    // Clear debounce timeout on unmount
    React.useEffect(() => {
      return () => {
        if (debounceTimeout) {
          clearTimeout(debounceTimeout);
        }
      };
    }, [debounceTimeout]);

    // Handle input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      handleChange(newValue);
      setShowSuggestions(true);
      setHighlightedIndex(-1);
    };

    // Handle input focus
    const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      setShowSuggestions(true);
      onFocus?.(event);
    };

    // Handle input blur
    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      // Delay hiding suggestions to allow for clicks
      setTimeout(() => {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }, 150);
      onBlur?.(event);
    };

    // Handle search submission
    const handleSearch = () => {
      if (!disabled && currentValue.trim()) {
        onSearch?.(currentValue.trim());
        setShowSuggestions(false);
        inputElement?.blur();
      }
    };

    // Handle clear
    const handleClear = () => {
      if (value === undefined) {
        setInternalValue('');
      }
      onChange?.('');
      onClear?.();
      setShowSuggestions(false);
      inputElement?.focus();
    };

    // Handle action button click
    const handleActionClick = () => {
      onActionClick?.(currentValue);
      handleSearch();
    };

    // Handle suggestion selection
    const handleSuggestionClick = (suggestion: SearchSuggestion) => {
      const newValue = suggestion.text;

      if (value === undefined) {
        setInternalValue(newValue);
      }

      onChange?.(newValue);

      if (suggestion.type === 'recent') {
        onRecentSearchSelect?.(suggestion.text);
      } else {
        onSuggestionSelect?.(suggestion);
      }

      setShowSuggestions(false);
      inputElement?.focus();
    };

    // Handle keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!showSuggestions || displaySuggestions.length === 0) {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSearch();
        } else if (event.key === 'Escape' && hasValue) {
          event.preventDefault();
          handleClear();
        }
        return;
      }

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex((prev) => (prev < displaySuggestions.length - 1 ? prev + 1 : 0));
          break;

        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : displaySuggestions.length - 1));
          break;

        case 'Enter':
          event.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < displaySuggestions.length) {
            handleSuggestionClick(displaySuggestions[highlightedIndex]);
          } else {
            handleSearch();
          }
          break;

        case 'Escape':
          event.preventDefault();
          if (hasValue) {
            handleClear();
          } else {
            setShowSuggestions(false);
            inputElement?.blur();
          }
          break;
      }
    };

    // Click outside handler
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
          setShowSuggestions(false);
          setHighlightedIndex(-1);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const hasActionButton = showActionButton || Boolean(actionButtonText);
    const shouldShowClear = showClearButton && hasValue && !loading && !disabled;

    return (
      <div
        ref={searchBarRef}
        className={cn(
          searchBarVariants({
            variant,
            size,
            state: searchBarState,
            hasSuggestions,
          }),
          searchBarClasses.searchBar,
          className,
        )}
        {...props}
      >
        {/* Search Icon */}
        <div className={cn(searchIconVariants({ size, state: iconState }))}>
          {loading ? (
            <div className="animate-spin rounded-full border-2 border-current border-t-transparent w-3 h-3" />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          )}
        </div>

        {/* Input Wrapper */}
        <div className={cn(inputWrapperVariants())}>
          <Input
            ref={mergeRefs}
            className={cn(
              // Remove border and background since parent handles it
              'border-0 bg-transparent shadow-none pl-10 pr-3',
              // Remove all native focus styles
              'outline-none focus:outline-none focus-visible:outline-none',
              'focus-visible:ring-0 focus-visible:ring-offset-0',
            )}
            placeholder={placeholder}
            value={currentValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            state={
              searchBarState === 'error'
                ? 'error'
                : searchBarState === 'success'
                  ? 'success'
                  : 'default'
            }
            size={size}
            {...inputProps}
          />
        </div>

        {/* Buttons Container */}
        <div className="flex items-center gap-1 pr-1">
          {/* Clear Button */}
          {shouldShowClear && (
            <button
              type="button"
              className={cn(clearButtonVariants({ size }))}
              onClick={handleClear}
              aria-label="Clear search"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Action Button */}
          {hasActionButton && (
            <button
              type="button"
              className={cn(
                actionButtonVariants({
                  size,
                  variant: actionButtonVariant,
                  hasText: Boolean(actionButtonText),
                }),
              )}
              onClick={handleActionClick}
              disabled={disabled || loading}
              aria-label={actionButtonText || 'Search'}
            >
              {actionButtonText || (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {hasSuggestions && (
          <div
            className={cn(
              suggestionsVariants({
                variant,
                empty: displaySuggestions.length === 0 && !suggestionsLoading,
              }),
            )}
          >
            {suggestionsLoading ? (
              <div className="flex items-center justify-center py-4 text-sm text-muted-foreground">
                <div className="animate-spin rounded-full border-2 border-current border-t-transparent w-4 h-4 mr-2" />
                Loading suggestions...
              </div>
            ) : displaySuggestions.length > 0 ? (
              <>
                {/* Recent Searches Section */}
                {recentSearches.length > 0 &&
                  displaySuggestions.some((s) => s.type === 'recent') && (
                    <>
                      <div className="px-3 py-1 text-xs font-medium text-muted-foreground border-b">
                        {recentSearchesLabel}
                      </div>
                      {displaySuggestions
                        .filter((suggestion) => suggestion.type === 'recent')
                        .map((suggestion) => {
                          const actualIndex = displaySuggestions.indexOf(suggestion);
                          return (
                            <div
                              key={suggestion.id}
                              className={cn(
                                suggestionItemVariants({
                                  highlighted: highlightedIndex === actualIndex,
                                  type: 'recent',
                                }),
                              )}
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              <svg
                                className="w-3 h-3 mr-2 text-muted-foreground"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
                              </svg>
                              {suggestion.text}
                            </div>
                          );
                        })}
                    </>
                  )}

                {/* Regular Suggestions */}
                {displaySuggestions.some((s) => s.type !== 'recent') &&
                  displaySuggestions
                    .filter((suggestion) => suggestion.type !== 'recent')
                    .map((suggestion) => {
                      const actualIndex = displaySuggestions.indexOf(suggestion);
                      return (
                        <div
                          key={suggestion.id}
                          className={cn(
                            suggestionItemVariants({
                              highlighted: highlightedIndex === actualIndex,
                              type: 'suggestion',
                            }),
                          )}
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <svg
                            className="w-3 h-3 mr-2 text-muted-foreground"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                          </svg>
                          {suggestion.text}
                        </div>
                      );
                    })}
              </>
            ) : (
              <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
                {noSuggestionsText}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

SearchBar.displayName = 'SearchBar';

export {
  SearchBar,
  searchBarVariants,
  inputWrapperVariants,
  searchIconVariants,
  actionButtonVariants,
  clearButtonVariants,
  suggestionsVariants,
  suggestionItemVariants,
  type SearchSuggestion,
};
