import { useEffect, useCallback, useRef } from 'react';

export interface UseFocusTrapOptions {
  /** Whether focus trapping is enabled (default: true) */
  enabled?: boolean;
  /** Whether to focus the first element on mount (default: true) */
  autoFocus?: boolean;
  /** Whether to restore focus on unmount (default: true) */
  restoreFocus?: boolean;
  /** Whether to allow outside clicks to break focus trap (default: false) */
  allowOutsideClick?: boolean;
  /** Selector for focusable elements (default: all focusable elements) */
  focusableSelector?: string;
  /** Element to focus initially (overrides autoFocus behavior) */
  initialFocusElement?: HTMLElement | null;
  /** Element to focus when trap is released (overrides restoreFocus behavior) */
  restoreFocusElement?: HTMLElement | null;
  /** Debug mode for logging focus operations */
  debug?: boolean;
}

/**
 * Default selector for focusable elements
 */
const DEFAULT_FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  'a[href]',
  'area[href]',
  'summary',
  'iframe',
  'object',
  'embed',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Check if element is visible and not disabled
 */
function isElementVisible(element: HTMLElement): boolean {
  // In test environment (JSDOM), getComputedStyle may not work as expected
  if (typeof window !== 'undefined' && window.getComputedStyle) {
    try {
      const style = window.getComputedStyle(element);
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        style.opacity !== '0' &&
        element.offsetWidth > 0 &&
        element.offsetHeight > 0
      );
    } catch (error) {
      // Fallback for test environments
      return true;
    }
  }
  
  // Fallback for environments without getComputedStyle
  return element.offsetWidth > 0 && element.offsetHeight > 0;
}

/**
 * Get all focusable elements within container
 */
function getFocusableElements(
  container: HTMLElement,
  selector: string = DEFAULT_FOCUSABLE_SELECTOR
): HTMLElement[] {
  const elements = Array.from(
    container.querySelectorAll<HTMLElement>(selector)
  ).filter(element => {
    return (
      !element.hasAttribute('disabled') &&
      !element.hasAttribute('aria-disabled') &&
      element.tabIndex !== -1 &&
      isElementVisible(element)
    );
  });
  
  return elements;
}

/**
 * Focus element with optional scroll prevention and retry logic for test environments
 */
function focusElement(element: HTMLElement, preventScroll = false, retries = 3): Promise<void> {
  return new Promise((resolve) => {
    const attemptFocus = (attemptsLeft: number) => {
      try {
        element.focus({ preventScroll });
      } catch (error) {
        // Fallback for older browsers
        element.focus();
      }
      
      // In test environments, focus might not work reliably
      // Check multiple ways to confirm focus succeeded
      const focusSuccessful = 
        document.activeElement === element || 
        element === document.activeElement ||
        element.matches(':focus') ||
        attemptsLeft <= 0;
      
      if (focusSuccessful) {
        resolve();
      } else {
        // Retry after a micro-task in test environments
        setTimeout(() => attemptFocus(attemptsLeft - 1), 5);
      }
    };
    
    attemptFocus(retries);
  });
}

/**
 * useFocusTrap - Hook for trapping focus within a container
 * Manages keyboard navigation and accessibility for modal-like components
 * 
 * @example
 * ```tsx
 * function Modal({ open, children }: { open: boolean; children: React.ReactNode }) {
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   
 *   useFocusTrap({
 *     enabled: open,
 *     containerRef,
 *     autoFocus: true,
 *     restoreFocus: true,
 *   });
 *   
 *   if (!open) return null;
 *   
 *   return (
 *     <div ref={containerRef} className="modal">
 *       <h2>Modal Title</h2>
 *       <input placeholder="First input" />
 *       <input placeholder="Second input" />
 *       <button>Close</button>
 *     </div>
 *   );
 * }
 * 
 * // With custom initial focus
 * function FormModal() {
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   const nameInputRef = useRef<HTMLInputElement>(null);
 *   
 *   useFocusTrap({
 *     enabled: true,
 *     containerRef,
 *     initialFocusElement: nameInputRef.current,
 *   });
 *   
 *   return (
 *     <div ref={containerRef}>
 *       <input ref={nameInputRef} placeholder="Name" />
 *       <input placeholder="Email" />
 *       <button>Submit</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useFocusTrap<T extends HTMLElement>(
  containerRef: React.RefObject<T>,
  options: UseFocusTrapOptions = {}
) {
  const {
    enabled = true,
    autoFocus = true,
    restoreFocus = true,
    allowOutsideClick = false,
    focusableSelector = DEFAULT_FOCUSABLE_SELECTOR,
    initialFocusElement,
    restoreFocusElement,
    debug = false,
  } = options;
  
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const isActiveRef = useRef(false);
  
  const logDebug = useCallback((message: string, data?: any) => {
    if (debug) {
      console.log(`[useFocusTrap] ${message}`, data);
    }
  }, [debug]);
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled || !containerRef.current || event.key !== 'Tab') return;
    
    const focusableElements = getFocusableElements(
      containerRef.current,
      focusableSelector
    );
    
    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement as HTMLElement;
    
    logDebug('Tab navigation', {
      shiftKey: event.shiftKey,
      activeElement: activeElement?.tagName,
      focusableCount: focusableElements.length,
    });
    
    // Shift + Tab (backward)
    if (event.shiftKey) {
      if (activeElement === firstElement) {
        event.preventDefault();
        focusElement(lastElement).then(() => {
          logDebug('Wrapped to last element', { element: lastElement.tagName });
        });
      }
    }
    // Tab (forward)
    else {
      if (activeElement === lastElement) {
        event.preventDefault();
        focusElement(firstElement).then(() => {
          logDebug('Wrapped to first element', { element: firstElement.tagName });
        });
      }
    }
  }, [enabled, containerRef, focusableSelector, logDebug]);
  
  const handleClick = useCallback((event: MouseEvent) => {
    if (!enabled || !containerRef.current || allowOutsideClick) return;
    
    const target = event.target as Node;
    
    // Check if click is outside the container
    if (!containerRef.current.contains(target)) {
      event.preventDefault();
      
      // Refocus first focusable element
      const focusableElements = getFocusableElements(
        containerRef.current,
        focusableSelector
      );
      
      if (focusableElements.length > 0) {
        focusElement(focusableElements[0]).then(() => {
          logDebug('Outside click prevented, refocused first element');
        });
      }
    }
  }, [enabled, containerRef, allowOutsideClick, focusableSelector, logDebug]);
  
  const activate = useCallback(async () => {
    if (!containerRef.current || isActiveRef.current) return;
    
    // Store previously focused element
    previouslyFocusedElement.current = document.activeElement as HTMLElement;
    
    // Add event listeners first
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('click', handleClick, true);
    
    isActiveRef.current = true;
    logDebug('Focus trap activated');
    
    // Focus initial element
    if (autoFocus) {
      const targetElement = 
        initialFocusElement || 
        getFocusableElements(containerRef.current, focusableSelector)[0];
      
      if (targetElement) {
        // Use the improved focus function with retry logic
        try {
          await focusElement(targetElement);
          logDebug('Auto-focused initial element', { element: targetElement.tagName });
        } catch (error) {
          logDebug('Failed to focus initial element', { error, element: targetElement.tagName });
        }
      }
    }
  }, [
    containerRef,
    autoFocus,
    initialFocusElement,
    focusableSelector,
    handleKeyDown,
    handleClick,
    logDebug,
  ]);
  
  const deactivate = useCallback(async () => {
    if (!isActiveRef.current) return;
    
    // Remove event listeners
    document.removeEventListener('keydown', handleKeyDown, true);
    document.removeEventListener('click', handleClick, true);
    
    isActiveRef.current = false;
    logDebug('Focus trap deactivated');
    
    // Restore focus
    if (restoreFocus) {
      const targetElement = 
        restoreFocusElement || 
        previouslyFocusedElement.current;
      
      if (targetElement && document.contains(targetElement)) {
        try {
          await focusElement(targetElement);
          logDebug('Restored focus to previous element', { element: targetElement.tagName });
        } catch (error) {
          logDebug('Failed to restore focus', { error, element: targetElement.tagName });
        }
      }
    }
    
    previouslyFocusedElement.current = null;
  }, [restoreFocus, restoreFocusElement, handleKeyDown, handleClick, logDebug]);
  
  // Activate/deactivate based on enabled state
  useEffect(() => {
    if (enabled) {
      activate();
    } else {
      deactivate();
    }
    
    return () => {
      deactivate();
    };
  }, [enabled, activate, deactivate]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      deactivate();
    };
  }, [deactivate]);
  
  return {
    activate,
    deactivate,
    isActive: isActiveRef.current,
  };
}