import { renderHook, act } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { useKeyboardNavigation } from '../useKeyboardNavigation';
import { describe, it, expect, vi } from 'vitest';

describe('useKeyboardNavigation', () => {
  const createKeyboardEvent = (key: string) => {
    const event = new KeyboardEvent('keydown', { key });
    Object.defineProperty(event, 'preventDefault', {
      value: vi.fn(),
    });
    return event;
  };

  it('should initialize with default values', () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        itemCount: 5,
      })
    );

    expect(result.current.selectedIndex).toBe(-1);
  });

  it('should handle arrow down navigation', () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        itemCount: 3,
      })
    );

    const event = createKeyboardEvent('ArrowDown');
    
    act(() => {
      result.current.handleKeyDown(event as any);
    });

    expect(result.current.selectedIndex).toBe(0);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should handle arrow up navigation', () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        itemCount: 3,
        initialIndex: 1,
      })
    );

    const event = createKeyboardEvent('ArrowUp');
    
    act(() => {
      result.current.handleKeyDown(event as any);
    });

    expect(result.current.selectedIndex).toBe(0);
  });

  it('should loop to beginning when reaching end (ArrowDown)', () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        itemCount: 3,
        initialIndex: 2,
        loop: true,
      })
    );

    const event = createKeyboardEvent('ArrowDown');
    
    act(() => {
      result.current.handleKeyDown(event as any);
    });

    expect(result.current.selectedIndex).toBe(0);
  });

  it('should loop to end when reaching beginning (ArrowUp)', () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        itemCount: 3,
        initialIndex: 0,
        loop: true,
      })
    );

    const event = createKeyboardEvent('ArrowUp');
    
    act(() => {
      result.current.handleKeyDown(event as any);
    });

    expect(result.current.selectedIndex).toBe(2);
  });

  it('should not loop when loop is disabled', () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        itemCount: 3,
        initialIndex: 2,
        loop: false,
      })
    );

    const event = createKeyboardEvent('ArrowDown');
    
    act(() => {
      result.current.handleKeyDown(event as any);
    });

    expect(result.current.selectedIndex).toBe(2);
  });

  it('should call onEnter when Enter is pressed', () => {
    const onEnter = vi.fn();
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        itemCount: 3,
        initialIndex: 1,
        onEnter,
      })
    );

    const event = createKeyboardEvent('Enter');
    
    act(() => {
      result.current.handleKeyDown(event as any);
    });

    expect(onEnter).toHaveBeenCalledWith(1);
  });

  it('should call onSelect when Enter is pressed', () => {
    const onSelect = vi.fn();
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        itemCount: 3,
        initialIndex: 1,
        onSelect,
      })
    );

    const event = createKeyboardEvent('Enter');
    
    act(() => {
      result.current.handleKeyDown(event as any);
    });

    expect(onSelect).toHaveBeenCalledWith(1);
  });

  it('should call onEscape when Escape is pressed', () => {
    const onEscape = vi.fn();
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        itemCount: 3,
        initialIndex: 1,
        onEscape,
      })
    );

    const event = createKeyboardEvent('Escape');
    
    act(() => {
      result.current.handleKeyDown(event as any);
    });

    expect(onEscape).toHaveBeenCalled();
  });

  it('should reset to initial index on Escape', () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        itemCount: 3,
        initialIndex: 0,
      })
    );

    // Navigate to different index
    act(() => {
      result.current.setSelectedIndex(2);
    });
    expect(result.current.selectedIndex).toBe(2);

    // Press Escape
    const event = createKeyboardEvent('Escape');
    act(() => {
      result.current.handleKeyDown(event as any);
    });

    expect(result.current.selectedIndex).toBe(-1);
  });

  it('should handle Home key', () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        itemCount: 5,
        initialIndex: 3,
      })
    );

    const event = createKeyboardEvent('Home');
    
    act(() => {
      result.current.handleKeyDown(event as any);
    });

    expect(result.current.selectedIndex).toBe(0);
  });

  it('should handle End key', () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        itemCount: 5,
        initialIndex: 1,
      })
    );

    const event = createKeyboardEvent('End');
    
    act(() => {
      result.current.handleKeyDown(event as any);
    });

    expect(result.current.selectedIndex).toBe(4);
  });

  it('should not handle keys when itemCount is 0', () => {
    const onSelect = vi.fn();
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        itemCount: 0,
        onSelect,
      })
    );

    const event = createKeyboardEvent('ArrowDown');
    
    act(() => {
      result.current.handleKeyDown(event as any);
    });

    expect(result.current.selectedIndex).toBe(-1);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('should reset selection to initial index', () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        itemCount: 5,
        initialIndex: 2,
      })
    );

    // Change selection
    act(() => {
      result.current.setSelectedIndex(4);
    });
    expect(result.current.selectedIndex).toBe(4);

    // Reset
    act(() => {
      result.current.resetSelection();
    });

    expect(result.current.selectedIndex).toBe(2);
  });

  it('should handle manual index setting', () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        itemCount: 5,
      })
    );

    act(() => {
      result.current.setSelectedIndex(3);
    });

    expect(result.current.selectedIndex).toBe(3);
  });

  it('should ignore unknown keys', () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        itemCount: 3,
        initialIndex: 1,
      })
    );

    const event = createKeyboardEvent('Tab');
    
    act(() => {
      result.current.handleKeyDown(event as any);
    });

    expect(result.current.selectedIndex).toBe(1);
  });

  it('should not call onEnter/onSelect for invalid index', () => {
    const onEnter = vi.fn();
    const onSelect = vi.fn();
    const { result } = renderHook(() =>
      useKeyboardNavigation({
        itemCount: 3,
        initialIndex: -1,
        onEnter,
        onSelect,
      })
    );

    const event = createKeyboardEvent('Enter');
    
    act(() => {
      result.current.handleKeyDown(event as any);
    });

    expect(onEnter).not.toHaveBeenCalled();
    expect(onSelect).not.toHaveBeenCalled();
  });
});