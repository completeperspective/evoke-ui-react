import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind CSS v4 plugin
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    typecheck: {
      tsconfig: './tsconfig.json',
    },
    // Suppress React 18 act() warnings in test environment
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    // Configure test timeout for CI environment
    testTimeout: 10000,
    hookTimeout: 10000,
    // Suppress console errors for act warnings
    silent: false,
    logLevel: 'info',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/styles/abstracts" as *;`,
      },
    },
  },
  build: {
    lib: {
      entry: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/index.ts'),
      name: 'EvokeUI',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
    sourcemap: true,
    minify: 'terser',
  },
  resolve: {
    alias: {
      '@': resolve(fileURLToPath(new URL('.', import.meta.url)), './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
