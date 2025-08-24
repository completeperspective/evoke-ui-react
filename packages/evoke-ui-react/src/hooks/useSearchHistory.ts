import { useState, useCallback, useEffect } from 'react';

export interface SearchHistoryItem {
  term: string;
  timestamp: number;
}

export interface UseSearchHistoryOptions {
  key?: string;
  maxItems?: number;
  deduplicate?: boolean;
}

export interface UseSearchHistoryReturn {
  history: string[];
  addToHistory: (term: string) => void;
  removeFromHistory: (term: string) => void;
  clearHistory: () => void;
  getRecentSearches: (limit?: number) => string[];
}

/**
 * Custom hook for managing search history with localStorage persistence
 * @param options - Configuration options for search history
 * @returns Search history state and management functions
 * @example
 * ```tsx
 * const { history, addToHistory, clearHistory } = useSearchHistory({
 *   key: 'app-search-history',
 *   maxItems: 10,
 *   deduplicate: true
 * });
 * ```
 */
export function useSearchHistory({
  key = 'search-history',
  maxItems = 10,
  deduplicate = true,
}: UseSearchHistoryOptions = {}): UseSearchHistoryReturn {
  const [history, setHistory] = useState<string[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed: SearchHistoryItem[] = JSON.parse(stored);
        // Sort by timestamp and extract terms
        const terms = parsed
          .sort((a, b) => b.timestamp - a.timestamp)
          .map(item => item.term)
          .slice(0, maxItems);
        setHistory(terms);
      }
    } catch (error) {
      console.warn('Failed to load search history:', error);
    }
  }, [key, maxItems]);

  // Save history to localStorage whenever it changes
  const saveHistory = useCallback((items: string[]) => {
    try {
      const historyItems: SearchHistoryItem[] = items.map((term, index) => ({
        term,
        timestamp: Date.now() - index, // Ensure proper ordering
      }));
      localStorage.setItem(key, JSON.stringify(historyItems));
    } catch (error) {
      console.warn('Failed to save search history:', error);
    }
  }, [key]);

  const addToHistory = useCallback((term: string) => {
    if (!term.trim()) return;

    setHistory((prevHistory) => {
      let newHistory = [...prevHistory];
      
      if (deduplicate) {
        // Remove existing occurrence if deduplication is enabled
        newHistory = newHistory.filter(item => item !== term);
      }
      
      // Add new term at the beginning
      newHistory.unshift(term);
      
      // Limit to maxItems
      newHistory = newHistory.slice(0, maxItems);
      
      // Save to localStorage
      saveHistory(newHistory);
      
      return newHistory;
    });
  }, [deduplicate, maxItems, saveHistory]);

  const removeFromHistory = useCallback((term: string) => {
    setHistory((prevHistory) => {
      const newHistory = prevHistory.filter(item => item !== term);
      saveHistory(newHistory);
      return newHistory;
    });
  }, [saveHistory]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to clear search history:', error);
    }
  }, [key]);

  const getRecentSearches = useCallback((limit?: number) => {
    if (limit === undefined) return history;
    return history.slice(0, limit);
  }, [history]);

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getRecentSearches,
  };
}