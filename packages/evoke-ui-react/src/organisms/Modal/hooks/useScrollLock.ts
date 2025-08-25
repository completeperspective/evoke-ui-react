import { useEffect, useCallback, useRef } from 'react';

export interface UseScrollLockOptions {
  /** Whether to lock scroll when enabled (default: true) */
  enabled?: boolean;
  /** Target element to lock scroll on (default: document.body) */
  target?: HTMLElement | null;
  /** Whether to preserve scroll position (default: true) */
  preserveScrollPosition?: boolean;
  /** Whether to add padding to prevent layout shift (default: true) */
  preventLayoutShift?: boolean;
  /** Debug mode for logging operations */
  debug?: boolean;
}

/**
 * Global scroll lock state
 */
const scrollLockState = {
  lockCount: 0,
  originalStyles: new Map<HTMLElement, {
    overflow?: string;
    paddingRight?: string;
    scrollbarWidth?: string;
  }>(),
  scrollPosition: { x: 0, y: 0 },
};

/**
 * Get scrollbar width for padding compensation
 */
function getScrollbarWidth(): number {
  if (typeof window === 'undefined') return 0;
  
  // Create temporary element to measure scrollbar
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  (outer.style as any).msOverflowStyle = 'scrollbar';
  document.body.appendChild(outer);
  
  const inner = document.createElement('div');
  outer.appendChild(inner);
  
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode?.removeChild(outer);
  
  return scrollbarWidth;
}

/**
 * Lock scroll on target element
 */
function lockScroll(
  target: HTMLElement, 
  options: Required<UseScrollLockOptions>
) {
  const { preserveScrollPosition, preventLayoutShift, debug } = options;
  
  // Store current styles
  const originalStyles = {
    overflow: target.style.overflow || '',
    paddingRight: target.style.paddingRight || '',
    scrollbarWidth: target.style.getPropertyValue('scrollbar-width') || '',
  };
  scrollLockState.originalStyles.set(target, originalStyles);
  
  // Store scroll position
  if (preserveScrollPosition && target === document.body) {
    scrollLockState.scrollPosition = {
      x: window.scrollX || window.pageXOffset,
      y: window.scrollY || window.pageYOffset,
    };
  }
  
  // Apply scroll lock styles
  target.style.overflow = 'hidden';
  
  // Prevent layout shift by adding padding
  if (preventLayoutShift && target === document.body) {
    const scrollbarWidth = getScrollbarWidth();
    if (scrollbarWidth > 0) {
      const currentPadding = parseFloat(getComputedStyle(target).paddingRight) || 0;
      target.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    }
  }
  
  // Modern browsers: hide scrollbar without affecting layout
  if ('scrollbarWidth' in target.style) {
    (target.style as any).scrollbarWidth = 'none';
  }
  
  scrollLockState.lockCount++;
  
  if (debug) {
    console.log('[useScrollLock] Locked scroll', {
      target: target.tagName,
      lockCount: scrollLockState.lockCount,
      scrollPosition: scrollLockState.scrollPosition,
    });
  }
}

/**
 * Unlock scroll on target element
 */
function unlockScroll(
  target: HTMLElement,
  options: Required<UseScrollLockOptions>
) {
  const { preserveScrollPosition, debug } = options;
  
  scrollLockState.lockCount = Math.max(0, scrollLockState.lockCount - 1);
  
  // Only unlock if no other components are using scroll lock
  if (scrollLockState.lockCount === 0) {
    const originalStyles = scrollLockState.originalStyles.get(target);
    
    if (originalStyles) {
      // Restore original styles
      target.style.overflow = originalStyles.overflow || '';
      target.style.paddingRight = originalStyles.paddingRight || '';
      if ('scrollbarWidth' in target.style) {
        (target.style as any).scrollbarWidth = originalStyles.scrollbarWidth || '';
      }
      
      scrollLockState.originalStyles.delete(target);
    }
    
    // Restore scroll position
    if (preserveScrollPosition && target === document.body) {
      window.scrollTo(
        scrollLockState.scrollPosition.x,
        scrollLockState.scrollPosition.y
      );
    }
    
    if (debug) {
      console.log('[useScrollLock] Unlocked scroll', {
        target: target.tagName,
        lockCount: scrollLockState.lockCount,
        restoredPosition: scrollLockState.scrollPosition,
      });
    }
  } else if (debug) {
    console.log('[useScrollLock] Scroll still locked by other components', {
      lockCount: scrollLockState.lockCount,
    });
  }
}

/**
 * useScrollLock - Hook for preventing body scroll during modal display
 * Manages scroll locking with multiple modal support and layout shift prevention
 * 
 * @example
 * ```tsx
 * function Modal({ open, children }: { open: boolean; children: React.ReactNode }) {
 *   const { lock, unlock } = useScrollLock({ enabled: open });
 *   
 *   useEffect(() => {
 *     if (open) {
 *       lock();
 *       return unlock;
 *     }
 *   }, [open, lock, unlock]);
 *   
 *   if (!open) return null;
 *   
 *   return (
 *     <div className="modal-overlay">
 *       {children}
 *     </div>
 *   );
 * }
 * ```
 */
export function useScrollLock(options: UseScrollLockOptions = {}) {
  const {
    enabled = true,
    target = typeof document !== 'undefined' ? document.body : null,
    preserveScrollPosition = true,
    preventLayoutShift = true,
    debug = false,
  } = options;
  
  const isLockedRef = useRef(false);
  
  const resolvedOptions: Required<UseScrollLockOptions> = {
    enabled,
    target,
    preserveScrollPosition,
    preventLayoutShift,
    debug,
  };
  
  const lock = useCallback(() => {
    if (!target || isLockedRef.current) return;
    
    lockScroll(target, resolvedOptions);
    isLockedRef.current = true;
  }, [target, resolvedOptions]);
  
  const unlock = useCallback(() => {
    if (!target || !isLockedRef.current) return;
    
    unlockScroll(target, resolvedOptions);
    isLockedRef.current = false;
  }, [target, resolvedOptions]);
  
  // Auto-lock when enabled
  useEffect(() => {
    if (enabled) {
      lock();
      return unlock;
    }
    return undefined;
  }, [enabled, lock, unlock]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isLockedRef.current) {
        unlock();
      }
    };
  }, [unlock]);
  
  return {
    lock,
    unlock,
    isLocked: isLockedRef.current,
    lockCount: scrollLockState.lockCount,
  };
}