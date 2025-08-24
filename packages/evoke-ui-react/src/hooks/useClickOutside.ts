import { useEffect, useRef, RefObject } from 'react';

/**
 * Custom hook that detects clicks outside of a specified element
 * @param handler - Function to call when a click outside is detected
 * @param mouseEvent - Mouse event to listen for (default: 'mousedown')
 * @returns A ref to attach to the element
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const ref = useClickOutside(() => {
 *     setIsOpen(false);
 *   });
 * 
 *   return <div ref={ref}>Content</div>;
 * };
 * ```
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      
      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler();
    };

    document.addEventListener(mouseEvent, listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener(mouseEvent, listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler, mouseEvent]);

  return ref;
}