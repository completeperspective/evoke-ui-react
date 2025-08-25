import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

// GitHub Pages base path configuration
const isGitHubPages = process.env.NODE_ENV === 'production' && process.env.STORYBOOK_BASE_PATH;
const basePath = isGitHubPages ? process.env.STORYBOOK_BASE_PATH || '/' : '/';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  staticDirs: ['./assets'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  // Enhanced metadata and SEO for GitHub Pages
  ...(isGitHubPages && {
    managerHead: (head) => `
      ${head}
      <base href="${basePath}">
      <script>
        // Global polyfills for Node.js environment in browser
        window.process = window.process || { 
          env: { NODE_ENV: 'production' },
          browser: true,
          version: 'v18.0.0',
          versions: { node: '18.0.0' }
        };
        window.global = window.global || window;
        window.__STORYBOOK_BASE_PATH__ = '${basePath}';
      </script>
    `,
  }),
  
  async viteFinal(config, { configType }) {
    // Dynamically import Tailwind plugin to avoid ESM issues
    const tailwindcss = await import('@tailwindcss/vite').then(m => m.default || m);
    
    // GitHub Pages base path configuration
    const publicPath = isGitHubPages ? basePath : '/';
    
    return mergeConfig(config, {
      // Configure base path for assets and routing
      base: publicPath,
      
      plugins: [
        tailwindcss(),
      ],
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@use "../src/styles/abstracts" as *;`,
          },
        },
      },
      define: {
        global: 'globalThis',
      },
    });
  },
};

export default config;