import * as React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ThemeProvider } from '../ThemeProvider';
import { useTheme } from '../../hooks/useTheme';
import type { RuntimeThemeConfig } from '../../types';

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

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Test component that uses the theme context
const TestComponent = () => {
  const { theme, setTheme, resolvedTheme, isDark } = useTheme();
  
  return (
    <div>
      <span data-testid="current-theme">{resolvedTheme}</span>
      <span data-testid="is-dark">{isDark.toString()}</span>
      <span data-testid="theme-name">{theme.name}</span>
      <button 
        data-testid="set-dark" 
        onClick={() => setTheme('dark')}
      >
        Set Dark
      </button>
      <button 
        data-testid="set-light" 
        onClick={() => setTheme('light')}
      >
        Set Light
      </button>
      <button 
        data-testid="set-invalid" 
        onClick={() => setTheme('nonexistent')}
      >
        Set Invalid
      </button>
    </div>
  );
};

const testThemes: Record<string, RuntimeThemeConfig> = {
  light: {
    name: 'light',
    label: 'Light',
    isDark: false,
    colors: {
      primary: { value: '0.65 0.2 255' },
      background: { value: '1 0 0' },
      foreground: { value: '0.13 0.013 247.86' },
    },
  },
  dark: {
    name: 'dark',
    label: 'Dark',
    isDark: true,
    colors: {
      primary: { value: '0.65 0.2 255' },
      background: { value: '0.13 0.013 247.86' },
      foreground: { value: '1 0 0' },
    },
  },
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    
    // Reset document element classes and attributes
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
    
    // Clear document element styles
    const root = document.documentElement;
    const styles = root.style;
    const propertiesToRemove: string[] = [];
    
    for (let i = 0; i < styles.length; i++) {
      const property = styles.item(i);
      if (property.startsWith('--ui-')) {
        propertiesToRemove.push(property);
      }
    }
    
    propertiesToRemove.forEach((property) => {
      root.style.removeProperty(property);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should provide theme context to children', () => {
    render(
      <ThemeProvider themes={testThemes}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(screen.getByTestId('theme-name')).toHaveTextContent('light');
    expect(screen.getByTestId('is-dark')).toHaveTextContent('false');
  });

  it('should use custom default theme', () => {
    render(
      <ThemeProvider themes={testThemes} defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('is-dark')).toHaveTextContent('true');
  });

  it('should switch themes correctly', () => {
    render(
      <ThemeProvider themes={testThemes}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

    act(() => {
      screen.getByTestId('set-dark').click();
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('is-dark')).toHaveTextContent('true');

    act(() => {
      screen.getByTestId('set-light').click();
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(screen.getByTestId('is-dark')).toHaveTextContent('false');
  });

  it('should inject CSS variables on theme change', () => {
    render(
      <ThemeProvider themes={testThemes}>
        <TestComponent />
      </ThemeProvider>
    );

    // Check that CSS variables are injected for light theme
    const root = document.documentElement;
    expect(root.style.getPropertyValue('--ui-color-primary')).toBeTruthy();
    expect(root.style.getPropertyValue('--ui-color-background')).toBeTruthy();
    expect(root.classList.contains('light')).toBe(true);
    expect(root.getAttribute('data-theme')).toBe('light');

    act(() => {
      screen.getByTestId('set-dark').click();
    });

    // Check that CSS variables are updated for dark theme
    expect(root.classList.contains('dark')).toBe(true);
    expect(root.getAttribute('data-theme')).toBe('dark');
  });

  it('should persist theme to localStorage', () => {
    render(
      <ThemeProvider themes={testThemes} storageKey="test-theme">
        <TestComponent />
      </ThemeProvider>
    );

    act(() => {
      screen.getByTestId('set-dark').click();
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'test-theme',
      expect.stringContaining('"theme":"dark"')
    );
  });

  it('should restore theme from localStorage', () => {
    // Pre-populate localStorage
    localStorageMock.setItem(
      'test-theme', 
      JSON.stringify({ 
        theme: 'dark', 
        timestamp: Date.now() 
      })
    );

    render(
      <ThemeProvider themes={testThemes} storageKey="test-theme">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('should handle invalid theme names gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    render(
      <ThemeProvider themes={testThemes}>
        <TestComponent />
      </ThemeProvider>
    );

    // Click the invalid theme button
    const invalidButton = screen.getByTestId('set-invalid');
    act(() => {
      invalidButton.click();
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Theme 'nonexistent' does not exist")
    );

    consoleSpy.mockRestore();
  });

  it('should handle missing theme configuration gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    render(
      <ThemeProvider themes={testThemes} defaultTheme="missing">
        <TestComponent />
      </ThemeProvider>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Theme 'missing' not found")
    );

    // Should fall back to light theme
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

    consoleSpy.mockRestore();
  });

  it('should work with empty themes object', () => {
    render(
      <ThemeProvider themes={{}}>
        <TestComponent />
      </ThemeProvider>
    );

    // Should use default themes as fallback
    expect(screen.getByTestId('current-theme')).toBeTruthy();
  });

  it('should disable transitions when requested', () => {
    render(
      <ThemeProvider themes={testThemes} disableTransitions>
        <TestComponent />
      </ThemeProvider>
    );

    // Should not add transition class
    const root = document.documentElement;
    expect(root.classList.contains('theme-transitioning')).toBe(false);
  });
});