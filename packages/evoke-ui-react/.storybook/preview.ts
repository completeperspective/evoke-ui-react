import type { Preview } from '@storybook/react-vite';

// Extend Window type for performance monitoring
declare global {
  interface Window {
    __STORYBOOK_PERFORMANCE__?: {
      startTime: number;
      errorCount: number;
      logRender: (componentName: string, renderTime: number) => void;
      trackMetric: (metricName: string, value: number) => void;
    };
  }
}

// Import styles with optimized loading order
import '../src/styles/tailwind.css';
import '../src/styles/index.scss';

// Development utilities (only load in development)
const isDevelopment = typeof process !== 'undefined' ? process.env.NODE_ENV !== 'production' : true;

// Performance monitoring
if (isDevelopment && typeof window !== 'undefined') {
  // Add development performance monitoring
  window.__STORYBOOK_PERFORMANCE__ = {
    startTime: Date.now(),
    errorCount: 0,
    logRender: (componentName: string, renderTime: number) => {
      console.log(`📊 ${componentName} rendered in ${renderTime}ms`);
    },
    trackMetric: (metricName: string, value: number) => {
      console.log(`📈 ${metricName}: ${value}ms`);
    },
  };
}

const preview: Preview = {
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: 'requiredFirst',
    },
    docs: {
      canvas: {
        sourceState: 'shown',
        // Performance optimization for docs
        withToolbar: true,
      },
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        ignoreSelector: '#storybook-root',
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#0f172a',
        },
        {
          name: 'evoke-primary',
          value: 'oklch(var(--ui-color-primary) / 0.05)',
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: '📱 Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
          type: 'mobile',
        },
        tablet: {
          name: '📱 Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
          type: 'tablet',
        },
        desktop: {
          name: '💻 Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
          type: 'desktop',
        },
        wide: {
          name: '🖥️ Wide Screen',
          styles: {
            width: '1440px',
            height: '900px',
          },
          type: 'desktop',
        },
        ultrawide: {
          name: '🖥️ Ultra Wide',
          styles: {
            width: '1920px',
            height: '1080px',
          },
          type: 'desktop',
        },
      },
      defaultViewport: 'desktop',
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Welcome',
          'Design System',
          [
            'Tokens',
            [
              'Color Tokens',
              'Typography Tokens',
              'Spacing Tokens',
              'Animation Tokens',
              'Shadow Tokens',
            ],
          ],
          'Atoms',
          ['Button', 'Input', 'Text', 'Heading', 'Badge', 'Label', 'Skeleton', 'Separator'],
          'Molecules',
          ['FormField', 'Card', 'SearchBar'],
          'Organisms',
          'Templates',
          'Utilities',
          ['CN Utility', 'Colors Utility'],
          '*', // Everything else
        ],
        locales: 'en-US',
        includeNames: true,
      },
      // Theme configuration
      theme: undefined, // Use custom theming from manager.ts
    },
    // Performance optimization parameters
    previewTabs: {
      canvas: {
        hidden: false,
        title: 'Canvas',
      },
      'storybook/docs/panel': {
        hidden: false,
        title: 'Docs',
      },
    },
    // A11y addon configuration
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'focus-order',
            enabled: true,
          },
          {
            id: 'keyboard',
            enabled: true,
          },
        ],
      },
      options: {
        checks: { 'color-contrast': { options: { noScroll: true } } },
        restoreScroll: true,
      },
    },
  },
  // Global decorators for consistent component testing
  decorators: [
    (Story, context) => {
      const startTime = performance.now();

      // Render the story
      const result = Story();

      // Performance monitoring (development only)
      if (isDevelopment && typeof window !== 'undefined' && window.__STORYBOOK_PERFORMANCE__) {
        const endTime = performance.now();
        const renderTime = endTime - startTime;

        // Log performance for debugging
        if (renderTime > 16) {
          // Only log if render time is > 1 frame (16ms)
          console.log(`⚡ Story "${context.name}" rendered in ${renderTime.toFixed(2)}ms`);
        }
      }

      return result;
    },
  ],
};

export default preview;
