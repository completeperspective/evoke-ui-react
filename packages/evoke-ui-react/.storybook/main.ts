import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

// Determine base path for GitHub Pages deployment
const isGitHubPages = process.env.NODE_ENV === 'production' && process.env.STORYBOOK_BASE_PATH;
const basePath = isGitHubPages ? process.env.STORYBOOK_BASE_PATH || '/' : '/';

// PR-specific branding configuration
const isPRPreview = process.env.STORYBOOK_PR_NUMBER;
const prBranding = isPRPreview ? {
  prNumber: process.env.STORYBOOK_PR_NUMBER,
  prTitle: process.env.STORYBOOK_PR_TITLE,
  prBranch: process.env.STORYBOOK_PR_BRANCH,
  prAuthor: process.env.STORYBOOK_PR_AUTHOR,
} : null;

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  staticDirs: ['./assets'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-controls',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
  ],
  
  // Configure base path for GitHub Pages subdirectory deployment
  ...(isGitHubPages && {
    managerHead: (head) => `
      ${head}
      <base href="${basePath}">
      <meta name="storybook-deployment" content="github-pages">
      <meta name="storybook-version" content="${require('../package.json').version}">
      ${isPRPreview ? `
        <meta name="storybook-pr-number" content="${prBranding.prNumber}">
        <meta name="storybook-pr-branch" content="${prBranding.prBranch}">
        <title>🔍 PR #${prBranding.prNumber} Preview - Evoke UI</title>
      ` : '<title>📖 Evoke UI - React Component Library</title>'}
    `,
  }),
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
  async viteFinal(config, { configType }) {
    // Dynamically import Tailwind plugin to avoid ESM issues
    const tailwindcss = await import('@tailwindcss/vite').then(m => m.default || m);
    
    // GitHub Pages base path configuration
    const publicPath = isGitHubPages ? basePath : '/';
    
    return mergeConfig(config, {
      // Configure base path for assets and routing
      base: publicPath,
      publicDir: false, // Storybook handles static files
      
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
        // Expose PR branding to stories
        __STORYBOOK_PR_BRANDING__: JSON.stringify(prBranding),
        __STORYBOOK_DEPLOYMENT_ENV__: JSON.stringify({
          isProduction: configType === 'PRODUCTION',
          isGitHubPages,
          isPRPreview,
          basePath,
          buildTime: new Date().toISOString(),
        }),
      },
      
      // Optimize build for GitHub Pages
      build: {
        ...(configType === 'PRODUCTION' && {
          rollupOptions: {
            output: {
              manualChunks: {
                vendor: ['react', 'react-dom'],
                storybook: ['@storybook/react'],
              },
            },
          },
          chunkSizeWarningLimit: 1000,
        }),
      },
    });
  },
};

export default config;