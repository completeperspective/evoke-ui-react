# Evoke UI - Technology Stack

## Core Dependencies

- **React 18+** - Component framework
- **TypeScript 5+** - Type safety and developer experience
- **Tailwind CSS v4** - CSS-first configuration with native theme variables
- **Sass** - Advanced styling features (mixins, functions, nesting)
- **shadcn/ui** - Base component library
- **Radix UI** - Accessible primitives
- **class-variance-authority (CVA)** - Component variants
- **tailwind-merge** - Intelligent class merging

## Build & Development Tools

- **Vite** - Fast build tool with HMR and Tailwind v4 plugin
- **tsup** - TypeScript bundler for library builds
- **Sass compiler** - For style preprocessing and bundling
- **pnpm** - Package manager (workspace support)
- **Vitest** - Unit testing framework
- **ESLint + Prettier** - Code quality and formatting

## Package Structure

- **Monorepo**: pnpm workspace with shared configurations
- **Scoped package**: `@evoke-ui/react` for framework clarity
- **Multiple exports**: Components, styles (CSS/Sass), utilities
- **Tree-shakeable**: Individual component imports supported

## Key Technical Decisions

1. **Tailwind CSS v4**: Using `@theme` directive instead of JavaScript config for better performance
2. **OKLCH Color Space**: Perceptually uniform color adjustments and better accessibility
3. **Sass Architecture**: Component-specific `.module.scss` files with shared abstracts
4. **Runtime Theming**: CSS variables for dynamic theme switching without rebuilds
