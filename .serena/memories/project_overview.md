# Evoke UI React Library - Project Overview

## Project Purpose

Evoke UI is A weapon grade, themable React component library built on top of shadcn/ui that follows atomic design principles. The library prioritizes runtime theming through CSS variables using OKLCH color space, enabling consuming applications to dynamically customize brand colors, typography, spacing, and other design tokens without rebuilding.

## Architecture & Core Principles

- **Foundation Layer**: shadcn/ui components (leveraging Radix UI primitives)
- **Token Layer**: CSS variables and design tokens for theming
- **Composition Layer**: Atomic design patterns (atoms → molecules → organisms)
- **Export Layer**: Tree-shakeable NPM package with TypeScript support

## Project Structure

```
evoke-ui-workspace/
├── packages/
│   └── evoke-ui-react/          # Main React component library
│       ├── src/
│       │   ├── atoms/           # Basic components (Button, Input, etc.)
│       │   ├── molecules/       # Composite components
│       │   ├── organisms/       # Complex patterns
│       │   ├── templates/       # Layout patterns
│       │   ├── styles/          # Sass/CSS architecture
│       │   ├── tokens/          # Design tokens
│       │   ├── hooks/           # React hooks
│       │   └── utils/           # Utility functions
│       ├── dist/               # Build output
│       └── examples/           # Usage examples
├── docs/                       # Documentation
├── PRPs/                       # Project Requirements & Planning
└── examples/                   # Example applications
```

## Key Goals

- Runtime theming with OKLCH color space
- Full TypeScript support
- Tree-shakeable exports
- SSR compatibility (Next.js, Remix)
- < 50KB gzipped bundle size
- 100% accessibility compliance
- shadcn/ui compatibility layer
