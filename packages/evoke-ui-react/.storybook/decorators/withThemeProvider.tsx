import React, { useEffect } from 'react';
import type { Decorator } from '@storybook/react';
import { ThemeProvider } from '../../src/providers/ThemeProvider';
import { defaultThemes } from '../../src/types';

/**
 * Storybook decorator that wraps stories with ThemeProvider
 * Provides theme switching capability in Storybook toolbar
 */
export const withThemeProvider: Decorator = (Story, context) => {
  const theme = context.globals.theme || 'light';

  useEffect(() => {
    // Apply theme class to Storybook's body for proper background colors
    const body = document.body;
    
    // Remove any existing theme classes
    body.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      // Let system preference determine theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      body.classList.add(prefersDark ? 'dark' : 'light');
    } else {
      body.classList.add(theme);
    }
  }, [theme]);

  return (
    <ThemeProvider
      themes={defaultThemes}
      defaultTheme={theme === 'system' ? 'light' : theme}
      enableSystem={theme === 'system'}
      disableTransitions={false}
    >
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: 'oklch(var(--ui-color-background))',
          color: 'oklch(var(--ui-color-foreground))',
          fontFamily: 'var(--ui-font-family-sans)',
          fontSize: 'var(--ui-font-size-base)',
          lineHeight: 'var(--ui-line-height-base)',
        }}
      >
        <div style={{ padding: '1rem' }}>
          <Story />
        </div>
      </div>
    </ThemeProvider>
  );
};