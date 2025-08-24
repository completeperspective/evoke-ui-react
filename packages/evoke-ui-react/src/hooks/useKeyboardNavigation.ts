import { useState, useCallback, KeyboardEvent } from 'react';

export interface UseKeyboardNavigationOptions {
  itemCount: number;
  onSelect?: (index: number) => void;
  onEscape?: () => void;
  onEnter?: (index: number) => void;
  loop?: boolean;
  initialIndex?: number;
}

export interface UseKeyboardNavigationReturn {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  handleKeyDown: (event: KeyboardEvent) => void;
  resetSelection: () => void;
}

/**
 * Custom hook for keyboard navigation in lists
 * @param options - Configuration options for keyboard navigation
 * @returns Navigation state and handlers
 * @example
 * ```tsx
 * const { selectedIndex, handleKeyDown } = useKeyboardNavigation({
 *   itemCount: suggestions.length,
 *   onSelect: (index) => selectSuggestion(suggestions[index]),
 *   onEscape: () => setIsOpen(false),
 *   loop: true
 * });
 * ```
 */
export function useKeyboardNavigation({
  itemCount,
  onSelect,
  onEscape,
  onEnter,
  loop = true,
  initialIndex = -1,
}: UseKeyboardNavigationOptions): UseKeyboardNavigationReturn {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (itemCount === 0) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            if (nextIndex >= itemCount) {
              return loop ? 0 : prevIndex;
            }
            return nextIndex;
          });
          break;

        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex((prevIndex) => {
            const nextIndex = prevIndex - 1;
            if (nextIndex < 0) {
              return loop ? itemCount - 1 : 0;
            }
            return nextIndex;
          });
          break;

        case 'Enter':
          event.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < itemCount) {
            onEnter?.(selectedIndex);
            onSelect?.(selectedIndex);
          }
          break;

        case 'Escape':
          event.preventDefault();
          onEscape?.();
          setSelectedIndex(-1);
          break;

        case 'Home':
          event.preventDefault();
          setSelectedIndex(0);
          break;

        case 'End':
          event.preventDefault();
          setSelectedIndex(itemCount - 1);
          break;

        default:
          break;
      }
    },
    [itemCount, selectedIndex, onSelect, onEscape, onEnter, loop]
  );

  const resetSelection = useCallback(() => {
    setSelectedIndex(initialIndex);
  }, [initialIndex]);

  return {
    selectedIndex,
    setSelectedIndex,
    handleKeyDown,
    resetSelection,
  };
}