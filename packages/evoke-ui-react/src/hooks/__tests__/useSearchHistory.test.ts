import { renderHook, act } from '@testing-library/react';
import { useSearchHistory } from '../useSearchHistory';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useSearchHistory', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('should initialize with empty history', () => {
    const { result } = renderHook(() => useSearchHistory());

    expect(result.current.history).toEqual([]);
  });

  it('should load history from localStorage on mount', () => {
    const mockHistory = [
      { term: 'search1', timestamp: Date.now() },
      { term: 'search2', timestamp: Date.now() - 1000 },
    ];
    localStorageMock.setItem('search-history', JSON.stringify(mockHistory));

    const { result } = renderHook(() => useSearchHistory());

    expect(result.current.history).toEqual(['search1', 'search2']);
  });

  it('should handle invalid localStorage data gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation();
    localStorageMock.setItem('search-history', 'invalid-json');

    const { result } = renderHook(() => useSearchHistory());

    expect(result.current.history).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith('Failed to load search history:', expect.any(Error));
    
    consoleSpy.mockRestore();
  });

  it('should add new search terms to history', () => {
    const { result } = renderHook(() => useSearchHistory());

    act(() => {
      result.current.addToHistory('test search');
    });

    expect(result.current.history).toEqual(['test search']);
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('should add multiple search terms', () => {
    const { result } = renderHook(() => useSearchHistory());

    act(() => {
      result.current.addToHistory('search1');
    });

    act(() => {
      result.current.addToHistory('search2');
    });

    expect(result.current.history).toEqual(['search2', 'search1']);
  });

  it('should deduplicate search terms by default', () => {
    const { result } = renderHook(() => useSearchHistory({ deduplicate: true }));

    act(() => {
      result.current.addToHistory('search1');
    });

    act(() => {
      result.current.addToHistory('search2');
    });

    act(() => {
      result.current.addToHistory('search1'); // duplicate
    });

    expect(result.current.history).toEqual(['search1', 'search2']);
  });

  it('should not deduplicate when disabled', () => {
    const { result } = renderHook(() => useSearchHistory({ deduplicate: false }));

    act(() => {
      result.current.addToHistory('search1');
    });

    act(() => {
      result.current.addToHistory('search1'); // duplicate allowed
    });

    expect(result.current.history).toEqual(['search1', 'search1']);
  });

  it('should respect maxItems limit', () => {
    const { result } = renderHook(() => useSearchHistory({ maxItems: 2 }));

    act(() => {
      result.current.addToHistory('search1');
    });

    act(() => {
      result.current.addToHistory('search2');
    });

    act(() => {
      result.current.addToHistory('search3'); // should push out search1
    });

    expect(result.current.history).toEqual(['search3', 'search2']);
    expect(result.current.history.length).toBe(2);
  });

  it('should ignore empty search terms', () => {
    const { result } = renderHook(() => useSearchHistory());

    act(() => {
      result.current.addToHistory('');
    });

    act(() => {
      result.current.addToHistory('   '); // whitespace only
    });

    act(() => {
      result.current.addToHistory('valid search');
    });

    expect(result.current.history).toEqual(['valid search']);
  });

  it('should remove specific terms from history', () => {
    const { result } = renderHook(() => useSearchHistory());

    act(() => {
      result.current.addToHistory('search1');
    });

    act(() => {
      result.current.addToHistory('search2');
    });

    act(() => {
      result.current.addToHistory('search3');
    });

    act(() => {
      result.current.removeFromHistory('search2');
    });

    expect(result.current.history).toEqual(['search3', 'search1']);
  });

  it('should clear all history', () => {
    const { result } = renderHook(() => useSearchHistory());

    act(() => {
      result.current.addToHistory('search1');
    });

    act(() => {
      result.current.addToHistory('search2');
    });

    expect(result.current.history.length).toBe(2);

    act(() => {
      result.current.clearHistory();
    });

    expect(result.current.history).toEqual([]);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('search-history');
  });

  it('should get recent searches with limit', () => {
    const { result } = renderHook(() => useSearchHistory());

    act(() => {
      result.current.addToHistory('search1');
    });

    act(() => {
      result.current.addToHistory('search2');
    });

    act(() => {
      result.current.addToHistory('search3');
    });

    const recent = result.current.getRecentSearches(2);
    expect(recent).toEqual(['search3', 'search2']);
  });

  it('should get all searches when no limit provided', () => {
    const { result } = renderHook(() => useSearchHistory());

    act(() => {
      result.current.addToHistory('search1');
    });

    act(() => {
      result.current.addToHistory('search2');
    });

    const recent = result.current.getRecentSearches();
    expect(recent).toEqual(['search2', 'search1']);
  });

  it('should use custom storage key', () => {
    const { result } = renderHook(() => useSearchHistory({ key: 'custom-key' }));

    act(() => {
      result.current.addToHistory('test');
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'custom-key',
      expect.stringContaining('"term":"test"')
    );
  });

  it('should handle localStorage save errors gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation();
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error('Storage full');
    });

    const { result } = renderHook(() => useSearchHistory());

    act(() => {
      result.current.addToHistory('test');
    });

    expect(consoleSpy).toHaveBeenCalledWith('Failed to save search history:', expect.any(Error));
    
    consoleSpy.mockRestore();
    localStorageMock.setItem.mockRestore();
  });

  it('should handle localStorage clear errors gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation();
    localStorageMock.removeItem.mockImplementation(() => {
      throw new Error('Cannot remove');
    });

    const { result } = renderHook(() => useSearchHistory());

    act(() => {
      result.current.clearHistory();
    });

    expect(consoleSpy).toHaveBeenCalledWith('Failed to clear search history:', expect.any(Error));
    
    consoleSpy.mockRestore();
    localStorageMock.removeItem.mockRestore();
  });

  it('should sort history by timestamp correctly', () => {
    const now = Date.now();
    const mockHistory = [
      { term: 'old', timestamp: now - 2000 },
      { term: 'newest', timestamp: now },
      { term: 'middle', timestamp: now - 1000 },
    ];
    localStorageMock.setItem('search-history', JSON.stringify(mockHistory));

    const { result } = renderHook(() => useSearchHistory());

    expect(result.current.history).toEqual(['newest', 'middle', 'old']);
  });
});