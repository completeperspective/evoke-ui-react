import { renderHook, act, fireEvent } from '@testing-library/react';
import { useClickOutside } from '../useClickOutside';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('useClickOutside', () => {
  let container: HTMLDivElement;
  let outsideElement: HTMLDivElement;

  beforeEach(() => {
    // Create test elements
    container = document.createElement('div');
    outsideElement = document.createElement('div');
    
    document.body.appendChild(container);
    document.body.appendChild(outsideElement);
  });

  afterEach(() => {
    document.body.removeChild(container);
    document.body.removeChild(outsideElement);
  });

  it('should call handler when clicking outside', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickOutside(handler));

    // Properly assign ref to container
    act(() => {
      Object.defineProperty(result.current, 'current', {
        value: container,
        writable: true,
        configurable: true,
      });
    });

    // Click outside
    act(() => {
      fireEvent.mouseDown(outsideElement);
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should not call handler when clicking inside', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickOutside(handler));

    // Properly assign ref to container
    act(() => {
      Object.defineProperty(result.current, 'current', {
        value: container,
        writable: true,
        configurable: true,
      });
    });

    // Click inside
    act(() => {
      fireEvent.mouseDown(container);
    });

    expect(handler).not.toHaveBeenCalled();
  });

  it('should not call handler when clicking on child elements', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickOutside(handler));
    
    const childElement = document.createElement('span');
    container.appendChild(childElement);

    // Properly assign ref to container
    act(() => {
      Object.defineProperty(result.current, 'current', {
        value: container,
        writable: true,
        configurable: true,
      });
    });

    // Click on child
    act(() => {
      fireEvent.mouseDown(childElement);
    });

    expect(handler).not.toHaveBeenCalled();
  });

  it('should handle touch events', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickOutside(handler));

    // Properly assign ref to container
    act(() => {
      Object.defineProperty(result.current, 'current', {
        value: container,
        writable: true,
        configurable: true,
      });
    });

    // Touch outside
    act(() => {
      fireEvent.touchStart(outsideElement);
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should use custom mouse event', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickOutside(handler, 'mouseup'));

    // Properly assign ref to container
    act(() => {
      Object.defineProperty(result.current, 'current', {
        value: container,
        writable: true,
        configurable: true,
      });
    });

    // mousedown should not trigger (we specified mouseup)
    act(() => {
      fireEvent.mouseDown(outsideElement);
    });
    expect(handler).not.toHaveBeenCalled();

    // mouseup should trigger
    act(() => {
      fireEvent.mouseUp(outsideElement);
    });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should not call handler when ref is null', () => {
    const handler = vi.fn();
    renderHook(() => useClickOutside(handler));

    // Click outside without setting ref
    act(() => {
      fireEvent.mouseDown(outsideElement);
    });

    expect(handler).not.toHaveBeenCalled();
  });

  it('should cleanup event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    const handler = vi.fn();
    
    const { unmount } = renderHook(() => useClickOutside(handler));
    
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
    
    removeEventListenerSpy.mockRestore();
  });

  it('should update handler when it changes', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    
    const { result, rerender } = renderHook(
      ({ handler }) => useClickOutside(handler),
      { initialProps: { handler: handler1 } }
    );

    // Properly assign ref
    act(() => {
      Object.defineProperty(result.current, 'current', {
        value: container,
        writable: true,
        configurable: true,
      });
    });

    // Update handler
    rerender({ handler: handler2 });

    // Click outside
    act(() => {
      fireEvent.mouseDown(outsideElement);
    });

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenCalledTimes(1);
  });
});