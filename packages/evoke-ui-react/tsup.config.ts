import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    tsconfig: './tsconfig.build.json'
  }, // Use explicit build config for declarations
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react', 
    'react-dom', 
    'react/jsx-runtime',
    // Externalize all CSS - handled by separate build step
    /\.(css|scss|sass)$/
  ],
  minify: true,
  treeshake: true,
  target: 'es2020',
  outDir: 'dist',
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
  // CSS compilation handled by separate build:styles script
});
