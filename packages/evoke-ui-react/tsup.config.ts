import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // Temporarily disabled due to TypeScript project configuration issues
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react', 
    'react-dom', 
    'react/jsx-runtime',
    // Externalize CSS modules - they'll be handled by the consuming app
    /\.module\.(css|scss|sass)$/,
    /\.(css|scss|sass)$/
  ],
  minify: true,
  treeshake: true,
  target: 'es2020',
  outDir: 'dist',
  esbuildOptions(options) {
    options.jsx = 'automatic';
    // Mark CSS imports as external
    options.external = [
      ...(options.external || []),
      '*.css',
      '*.scss',
      '*.sass',
      '*.module.css',
      '*.module.scss', 
      '*.module.sass'
    ];
  },
  onSuccess: 'npm run build:styles',
});
