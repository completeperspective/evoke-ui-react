import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
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
  async viteFinal(config, { configType }) {
    // Dynamically import Tailwind plugin to avoid ESM issues
    const tailwindcss = await import('@tailwindcss/vite').then(m => m.default || m);
    
    return mergeConfig(config, {
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