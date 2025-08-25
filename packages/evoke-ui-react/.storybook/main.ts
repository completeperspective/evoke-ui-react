import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { resolve } from 'path';

// Determine base path for GitHub Pages deployment
const isGitHubPages = process.env.NODE_ENV === 'production' && process.env.STORYBOOK_BASE_PATH;
const basePath = isGitHubPages ? process.env.STORYBOOK_BASE_PATH || '/' : '/';
const isProduction = process.env.NODE_ENV === 'production';

// PR-specific branding configuration
const isPRPreview = process.env.STORYBOOK_PR_NUMBER;
const prBranding = isPRPreview ? {
  prNumber: process.env.STORYBOOK_PR_NUMBER,
  prTitle: process.env.STORYBOOK_PR_TITLE,
  prBranch: process.env.STORYBOOK_PR_BRANCH,
  prAuthor: process.env.STORYBOOK_PR_AUTHOR,
} : null;

// Performance monitoring configuration
const performanceConfig = {
  buildStart: Date.now(),
  logPerformance: process.env.STORYBOOK_PERFORMANCE_LOG === 'true',
};

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
    // Performance monitoring addon for production builds
    ...(isProduction ? [] : ['@storybook/addon-measure']),
  ],
  
  // Enhanced metadata and SEO for GitHub Pages
  ...(isGitHubPages && {
    managerHead: (head) => `
      ${head}
      <base href="${basePath}">
      <script>
        window.__STORYBOOK_BASE_PATH__ = '${basePath}';
      </script>
      <meta name="storybook-deployment" content="github-pages">
      <meta name="storybook-version" content="${require('../package.json').version}">
      <meta name="storybook-build-time" content="${new Date().toISOString()}">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="Evoke UI React Component Library - Production-ready, themable components built on shadcn/ui">
      <meta name="keywords" content="react, component-library, design-system, tailwindcss, storybook, evoke-ui">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      ${isPRPreview ? `
        <meta name="storybook-pr-number" content="${prBranding.prNumber}">
        <meta name="storybook-pr-branch" content="${prBranding.prBranch}">
        <meta name="robots" content="noindex, nofollow">
        <title>🔍 PR #${prBranding.prNumber} Preview - Evoke UI</title>
      ` : `
        <meta name="robots" content="index, follow">
        <title>📖 Evoke UI - React Component Library</title>
      `}
    `,
  }),
  
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: undefined,
      },
    },
  },
  
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
  
  core: {
    disableTelemetry: true,
    enableCrashReports: false,
  },
  
  async viteFinal(config, { configType }) {
    // Performance logging
    if (performanceConfig.logPerformance) {
      console.log(`⚡ Storybook build optimization started for ${configType} mode`);
    }
    
    // Dynamically import Tailwind plugin to avoid ESM issues
    const tailwindcss = await import('@tailwindcss/vite').then(m => m.default || m);
    
    // GitHub Pages base path configuration
    const publicPath = isGitHubPages ? basePath : '/';
    const isProd = configType === 'PRODUCTION';
    
    return mergeConfig(config, {
      // Configure base path for assets and routing
      base: publicPath,
      publicDir: false, // Storybook handles static files
      
      // Resolve configuration for better module resolution
      resolve: {
        alias: {
          '@': resolve(__dirname, '../src'),
          '~': resolve(__dirname, '../'),
        },
        dedupe: ['react', 'react-dom'],
      },
      
      plugins: [
        tailwindcss(),
      ],
      
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@use "../src/styles/abstracts" as *;`,
          },
        },
        devSourcemap: !isProd,
      },
      
      define: {
        global: 'globalThis',
        // Expose PR branding to stories
        __STORYBOOK_PR_BRANDING__: JSON.stringify(prBranding),
        __STORYBOOK_DEPLOYMENT_ENV__: JSON.stringify({
          isProduction: isProd,
          isGitHubPages,
          isPRPreview,
          basePath,
          buildTime: new Date().toISOString(),
        }),
        // Performance monitoring
        __STORYBOOK_PERFORMANCE__: JSON.stringify(performanceConfig),
      },
      
      // Optimized build configuration
      build: {
        sourcemap: isProd ? false : true,
        minify: isProd ? 'terser' : false,
        target: 'es2020',
        cssTarget: 'chrome80',
        
        ...(isProd && {
          // Terser optimization for production
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log', 'console.debug'],
            },
            mangle: {
              safari10: true,
            },
            format: {
              comments: false,
            },
          },
          
          rollupOptions: {
            output: {
              // Enhanced manual chunking strategy for optimal loading
              manualChunks: (id) => {
                // Node modules chunking
                if (id.includes('node_modules')) {
                  // Core React libraries
                  if (id.includes('react') || id.includes('react-dom')) {
                    return 'vendor-react';
                  }
                  
                  // Storybook core
                  if (id.includes('@storybook')) {
                    return 'storybook-core';
                  }
                  
                  // UI and styling libraries
                  if (id.includes('tailwind') || id.includes('clsx') || id.includes('class-variance-authority')) {
                    return 'vendor-ui';
                  }
                  
                  // Testing and docs utilities
                  if (id.includes('@testing-library') || id.includes('axe-core')) {
                    return 'vendor-testing';
                  }
                  
                  // All other vendor dependencies
                  return 'vendor-misc';
                }
                
                // Component stories chunking
                if (id.includes('.stories.')) {
                  if (id.includes('/atoms/')) return 'stories-atoms';
                  if (id.includes('/molecules/')) return 'stories-molecules';
                  if (id.includes('/organisms/')) return 'stories-organisms';
                  if (id.includes('/design-system/')) return 'stories-design-system';
                  return 'stories-misc';
                }
                
                // Component source chunking
                if (id.includes('/atoms/')) return 'components-atoms';
                if (id.includes('/molecules/')) return 'components-molecules';
                if (id.includes('/organisms/')) return 'components-organisms';
                
                // Utils and shared code
                if (id.includes('/utils/') || id.includes('/hooks/')) return 'shared-utils';
              },
              
              // Asset naming for better caching
              chunkFileNames: (chunkInfo) => {
                const facadeModuleId = chunkInfo.facadeModuleId
                  ? chunkInfo.facadeModuleId.split('/').pop().replace(/\.[^/.]+$/, '')
                  : 'chunk';
                return `assets/${chunkInfo.name || facadeModuleId}-[hash].js`;
              },
              
              assetFileNames: (assetInfo) => {
                const info = assetInfo.name.split('.');
                const ext = info[info.length - 1];
                
                if (/\.(css)$/.test(assetInfo.name)) {
                  return `assets/styles/[name]-[hash][extname]`;
                }
                if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/.test(assetInfo.name)) {
                  return `assets/images/[name]-[hash][extname]`;
                }
                if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name)) {
                  return `assets/fonts/[name]-[hash][extname]`;
                }
                
                return `assets/[name]-[hash][extname]`;
              },
            },
            
            // External dependencies that should not be bundled
            external: (id) => {
              // Keep peer dependencies external for better tree shaking
              return false; // Storybook needs everything bundled
            },
          },
          
          // Chunk size limits and warnings
          chunkSizeWarningLimit: 1000,
          reportCompressedSize: true,
        }),
      },
      
      // Development optimizations
      ...(!isProd && {
        server: {
          fs: {
            strict: false,
          },
        },
        optimizeDeps: {
          include: [
            'react',
            'react-dom',
            '@storybook/react',
            'clsx',
            'tailwind-merge',
            'class-variance-authority',
          ],
          exclude: ['@storybook/addon-measure'],
        },
      }),
    });
  },
};

export default config;