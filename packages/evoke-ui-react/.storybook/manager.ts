import { addons } from '@storybook/manager-api';
import evokeTheme from './evoke-theme';
import evokeThemeDark from './evoke-theme-dark';

// Detect system theme preference
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

addons.setConfig({
  theme: isDark ? evokeThemeDark : evokeTheme,

  // Additional Storybook UI configuration
  sidebar: {
    showRoots: false,
    collapsedRoots: ['example'],
  },

  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },

  // Panel configuration
  panel: {
    collapsedPanels: [],
  },
});

// Dynamic theme switching based on system preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  addons.setConfig({
    theme: e.matches ? evokeThemeDark : evokeTheme,
  });
});