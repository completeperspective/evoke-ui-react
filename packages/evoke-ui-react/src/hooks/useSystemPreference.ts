import { useState, useEffect } from 'react';

/**
 * System Color Scheme Preference Hook
 * Detects and responds to system color scheme preferences (light/dark mode)
 * Handles media query changes and provides fallback for unsupported environments
 */

export type SystemPreference = 'light' | 'dark' | null;

/**
 * Hook to detect and track system color scheme preference
 * @returns Current system preference ('light', 'dark', or null if unknown)
 */
export function useSystemPreference(): SystemPreference {
  const [preference, setPreference] = useState<SystemPreference>(() => {
    // Initialize with current system preference if available
    if (typeof window === 'undefined' || !window.matchMedia) {
      return null;
    }

    try {
      const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
      return darkQuery.matches ? 'dark' : 'light';
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // Skip if matchMedia is not supported
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    let darkQuery: MediaQueryList;
    let lightQuery: MediaQueryList;

    try {
      // Create media queries for both dark and light preferences
      darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
      lightQuery = window.matchMedia('(prefers-color-scheme: light)');
    } catch {
      // matchMedia failed, set preference to null
      setPreference(null);
      return;
    }

    /**
     * Update preference based on media query matches
     */
    const updatePreference = () => {
      try {
        if (darkQuery.matches) {
          setPreference('dark');
        } else if (lightQuery.matches) {
          setPreference('light');
        } else {
          // No preference or 'no-preference' is set
          setPreference(null);
        }
      } catch {
        setPreference(null);
      }
    };

    // Set initial preference
    updatePreference();

    // Listen for changes
    const handleDarkChange = () => updatePreference();
    const handleLightChange = () => updatePreference();

    try {
      // Use the newer addEventListener if available, fallback to addListener
      if (darkQuery.addEventListener) {
        darkQuery.addEventListener('change', handleDarkChange);
        lightQuery.addEventListener('change', handleLightChange);
      } else if (darkQuery.addListener) {
        // Legacy support for older browsers
        darkQuery.addListener(handleDarkChange);
        lightQuery.addListener(handleLightChange);
      }
    } catch (error) {
      console.warn('Failed to add media query listeners:', error);
    }

    // Cleanup function
    return () => {
      try {
        if (darkQuery?.removeEventListener) {
          darkQuery.removeEventListener('change', handleDarkChange);
          lightQuery.removeEventListener('change', handleLightChange);
        } else if (darkQuery?.removeListener) {
          // Legacy support
          darkQuery.removeListener(handleDarkChange);
          lightQuery.removeListener(handleLightChange);
        }
      } catch (error) {
        console.warn('Failed to remove media query listeners:', error);
      }
    };
  }, []);

  return preference;
}

/**
 * Hook to get system preference with custom fallback
 * @param fallback - Fallback preference when system preference is unavailable
 * @returns System preference or fallback
 */
export function useSystemPreferenceWithFallback(
  fallback: 'light' | 'dark' = 'light'
): 'light' | 'dark' {
  const systemPreference = useSystemPreference();
  return systemPreference || fallback;
}

/**
 * Hook to detect if user prefers reduced motion
 * @returns True if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false;
    }

    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    let mediaQuery: MediaQueryList;

    try {
      mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    } catch {
      return;
    }

    const handleChange = () => {
      try {
        setPrefersReducedMotion(mediaQuery.matches);
      } catch {
        setPrefersReducedMotion(false);
      }
    };

    // Set initial value
    handleChange();

    try {
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleChange);
      }
    } catch (error) {
      console.warn('Failed to add reduced motion listener:', error);
    }

    return () => {
      try {
        if (mediaQuery?.removeEventListener) {
          mediaQuery.removeEventListener('change', handleChange);
        } else if (mediaQuery?.removeListener) {
          mediaQuery.removeListener(handleChange);
        }
      } catch (error) {
        console.warn('Failed to remove reduced motion listener:', error);
      }
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook to detect if user prefers high contrast
 * @returns True if user prefers high contrast
 */
export function useHighContrast(): boolean {
  const [prefersHighContrast, setPrefersHighContrast] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false;
    }

    try {
      return window.matchMedia('(prefers-contrast: high)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    let mediaQuery: MediaQueryList;

    try {
      mediaQuery = window.matchMedia('(prefers-contrast: high)');
    } catch {
      return;
    }

    const handleChange = () => {
      try {
        setPrefersHighContrast(mediaQuery.matches);
      } catch {
        setPrefersHighContrast(false);
      }
    };

    // Set initial value
    handleChange();

    try {
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleChange);
      }
    } catch (error) {
      console.warn('Failed to add high contrast listener:', error);
    }

    return () => {
      try {
        if (mediaQuery?.removeEventListener) {
          mediaQuery.removeEventListener('change', handleChange);
        } else if (mediaQuery?.removeListener) {
          mediaQuery.removeListener(handleChange);
        }
      } catch (error) {
        console.warn('Failed to remove high contrast listener:', error);
      }
    };
  }, []);

  return prefersHighContrast;
}

/**
 * Get system preferences synchronously (for SSR or initial setup)
 * @returns Object with all detectable system preferences
 */
export function getSystemPreferences(): {
  colorScheme: SystemPreference;
  reducedMotion: boolean;
  highContrast: boolean;
} {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return {
      colorScheme: null,
      reducedMotion: false,
      highContrast: false,
    };
  }

  try {
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const lightQuery = window.matchMedia('(prefers-color-scheme: light)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');

    let colorScheme: SystemPreference = null;
    if (darkQuery.matches) {
      colorScheme = 'dark';
    } else if (lightQuery.matches) {
      colorScheme = 'light';
    }

    return {
      colorScheme,
      reducedMotion: reducedMotionQuery.matches,
      highContrast: highContrastQuery.matches,
    };
  } catch {
    return {
      colorScheme: null,
      reducedMotion: false,
      highContrast: false,
    };
  }
}