# Phase One - Project Setup & Configuration PRP - ✅ **COMPLETED**

## Purpose

Establish the foundational project structure, build pipeline, and development environment for the Evoke UI React component library using modern tooling and best practices.

## Core Principles

1. **Context is King**: Include ALL necessary documentation, examples, and caveats
2. **Validation Loops**: Provide executable tests/lints the AI can run and fix
3. **Information Dense**: Use keywords and patterns from industry best practices
4. **Progressive Success**: Start simple, validate, then enhance
5. **Global rules**: Be sure to follow all rules in CLAUDE.md

---

## Goal

Initialize a production-ready React component library monorepo with pnpm workspaces, TypeScript, Vite, and Tailwind CSS v4 integration. Establish build pipeline with tsup for library bundling and comprehensive development tooling.

## Why

- **Foundation for Component Library**: Creates the base infrastructure needed to build, test, and distribute the Evoke UI component library
- **Modern Development Experience**: Provides fast builds, hot module replacement, and excellent TypeScript support
- **Scalable Architecture**: Monorepo structure allows for multiple packages (core, themes, icons) in the future
- **Production Ready**: Optimized build pipeline for NPM package distribution

## What

Set up a complete TypeScript React library development environment with:

- pnpm workspace monorepo structure
- Vite for development with Tailwind CSS v4 plugin
- tsup for library bundling with style compilation
- ESLint, Prettier, and TypeScript configuration
- Package.json exports for proper library consumption

### Success Criteria - **STATUS: ✅ 100% COMPLETE**

- [x] pnpm workspace properly configured and functional ✅
- [x] TypeScript compilation works without errors ✅
- [x] Vite development server starts with HMR ✅
- [x] Tailwind CSS v4 CSS-first configuration working ✅
- [x] Build pipeline produces distributable library files ✅
- [x] Package exports are correctly configured ✅
- [x] Linting and formatting tools are functional ✅
- [x] Development and build commands execute successfully ✅

**IMPLEMENTATION COMPLETED**: All infrastructure is in place and working. Ready for Phase 2 component development.

## All Needed Context

### Documentation & References

```yaml
# MUST READ - Include these in your context window
- url: https://tailwindcss.com/blog/tailwindcss-v4-alpha
  why: Understanding new CSS-first configuration approach and @theme directive

- url: https://tailwindcss.com/docs/functions-and-directives
  why: @theme directive usage and CSS variable integration patterns

- url: https://vite.dev/guide/
  why: Vite configuration for library mode and plugin setup

- url: https://medium.com/@mevlutcantuna/building-a-modern-react-component-library-a-guide-with-vite-typescript-and-tailwind-css-862558516b8d
  why: Complete guide for React component library setup with Vite and TypeScript

- url: https://pnpm.io/workspaces
  why: pnpm workspace configuration and package management patterns

- url: https://github.com/egoist/tsup
  why: tsup configuration for library builds and style bundling

- file: /home/adam/code/evoke-ui/PLANNING.md
  why: Architecture decisions and technical stack requirements

- file: /home/adam/code/evoke-ui/TASK.md
  why: Specific Phase 1 implementation requirements and code examples

- file: /home/adam/code/evoke-ui/CLAUDE.md
  why: Project behavior rules and conventions to follow
```

### Current Codebase Tree

```bash
evoke-ui/
├── .claude/
├── .gitignore
├── CLAUDE.md
├── INITIAL.md
├── PLANNING.md
├── PRPs/
├── TASK.md
├── docs/
└── examples/
```

### Desired Codebase Tree

```bash
evoke-ui/
├── .claude/
├── .github/
│   └── workflows/
│       └── ci.yml
├── packages/
│   └── evoke-ui-react/
│       ├── src/
│       │   ├── index.ts
│       │   ├── styles/
│       │   │   ├── index.scss
│       │   │   └── tailwind.scss
│       │   └── utils/
│       │       └── cn.ts
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       └── tsup.config.ts
├── .eslintrc.js
├── .prettierrc
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
├── PLANNING.md
├── TASK.md
└── examples/
```

### Known Gotchas & Library Quirks

```typescript
// CRITICAL: Tailwind CSS v4 requires different configuration approach
// v4 uses CSS-first @theme directive instead of JavaScript config object
// Must use @tailwindcss/vite plugin, not the old postcss plugin

// CRITICAL: pnpm workspaces require specific package.json structure
// Root package.json must include workspaces array
// Each workspace needs its own package.json with proper name scoping

// CRITICAL: tsup for library builds needs external dependencies excluded
// React and React DOM must be marked as external/peer dependencies
// Style files need separate build process or bundling configuration

// CRITICAL: Package exports must match actual build output structure
// Modern Node.js requires explicit exports field for proper resolution
// Both CommonJS and ESM formats needed for compatibility

// CRITICAL: Vite library mode has specific requirements
// Must configure proper entry points and external dependencies
// CSS needs to be handled separately from JavaScript bundling
```

## Implementation Blueprint

### Data Models and Structure

No complex data models needed for this setup phase. Focus on proper TypeScript configuration and build tool setup.

### List of Tasks (in completion order)

```yaml
Task 1 - Initialize Root Package and Workspace:
  CREATE package.json (root):
    - Setup pnpm workspace configuration
    - Add development scripts for monorepo management
    - Include shared devDependencies for tooling

  CREATE pnpm-workspace.yaml:
    - Define workspace packages pattern
    - Include packages/* for monorepo structure

Task 2 - Setup Development Tooling:
  CREATE .eslintrc.js:
    - React and TypeScript preset configuration
    - Consistent code quality rules

  CREATE .prettierrc:
    - Code formatting standards
    - Integration with ESLint

  CREATE tsconfig.json (root):
    - Shared TypeScript configuration
    - Path aliases for clean imports

Task 3 - Initialize Library Package:
  CREATE packages/evoke-ui-react/package.json:
    - Proper package name (@evoke-ui/react)
    - Correct exports configuration for library
    - Peer dependencies setup (React, React DOM)

  CREATE packages/evoke-ui-react/tsconfig.json:
    - Extends root tsconfig
    - Library-specific compiler options

Task 4 - Setup Build Pipeline:
  CREATE packages/evoke-ui-react/vite.config.ts:
    - Vite library mode configuration
    - Tailwind CSS v4 plugin integration
    - Sass preprocessing setup

  CREATE packages/evoke-ui-react/tsup.config.ts:
    - TypeScript library bundling
    - External dependencies configuration
    - Style handling strategy

Task 5 - Create Initial Source Structure:
  CREATE packages/evoke-ui-react/src/index.ts:
    - Main library entry point
    - Export future component structure

  CREATE packages/evoke-ui-react/src/utils/cn.ts:
    - Tailwind class merging utility
    - Foundation for component variants

Task 6 - Setup Tailwind CSS v4 Foundation:
  CREATE packages/evoke-ui-react/src/styles/tailwind.scss:
    - Tailwind v4 CSS-first configuration
    - @theme directive setup for future tokens

  CREATE packages/evoke-ui-react/src/styles/index.scss:
    - Main style entry point
    - Import structure for future additions

Task 7 - Install Dependencies:
  EXECUTE dependency installation:
    - Core dependencies (React, TypeScript, Vite, etc.)
    - Development tools (ESLint, Prettier, etc.)
    - Build tools (tsup, Sass, Tailwind v4)
```

### Per Task Pseudocode

```typescript
// Task 1 - Root package.json structure
{
  "name": "evoke-ui-workspace",
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "build": "pnpm --filter evoke-ui-react build",
    "dev": "pnpm --filter evoke-ui-react dev",
    "lint": "eslint packages/*/src --ext .ts,.tsx"
  },
  "devDependencies": {
    // Shared tooling dependencies
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "typescript": "^5.0.0"
  }
}

// Task 3 - Library package.json with proper exports
{
  "name": "@evoke-ui/react",
  "version": "0.1.0",
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles.css",
    "./styles.css": "./dist/styles.css"
  },
  "files": ["dist"],
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}

// Task 4 - Vite config with Tailwind v4
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // New v4 plugin
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/styles/abstracts" as *;`
      }
    }
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  }
});

// Task 6 - Tailwind v4 CSS-first setup
/* src/styles/tailwind.scss */
@import "tailwindcss";

@theme {
  /* Future design tokens will be defined here */
  --color-primary: #3b82f6;
  --spacing-xs: 0.25rem;
  --font-family-sans: system-ui, sans-serif;
}
```

### Integration Points

```yaml
PACKAGE_MANAGER:
  - setup: 'pnpm install in root installs all workspace dependencies'
  - commands: 'pnpm --filter <package> <command> for workspace operations'

BUILD_SYSTEM:
  - vite: 'Development server with HMR and Tailwind v4 processing'
  - tsup: 'Production builds with TypeScript and bundling'
  - scripts: 'npm scripts for common development tasks'

STYLE_SYSTEM:
  - tailwind: 'v4 CSS-first configuration with @theme directive'
  - sass: 'SCSS preprocessing for advanced styling features'
  - bundling: 'CSS compilation and minification in build pipeline'
```

## Validation Loop

### Level 1: Syntax & Style

```bash
# Run these FIRST - fix any errors before proceeding
pnpm lint                           # ESLint checking across workspace
pnpm prettier --check "**/*.{ts,tsx,json,md}"  # Format checking
pnpm --filter evoke-ui-react type-check        # TypeScript compilation

# Expected: No errors. If errors exist, READ the error output and fix issues.
```

### Level 2: Build Validation

```bash
# Test development server starts properly
cd packages/evoke-ui-react
pnpm dev                           # Should start without errors

# Test library builds successfully
pnpm build                         # Should produce dist/ folder with files

# Verify package structure
ls -la dist/                       # Should show index.js, index.mjs, index.d.ts, styles.css

# Expected: All builds complete successfully with proper outputs
```

### Level 3: Integration Test

```bash
# Test workspace operations
pnpm install                       # Should install all dependencies
pnpm --filter evoke-ui-react build # Should build the library package
pnpm build                         # Should work from root

# Test Tailwind v4 processing
echo "Test CSS compilation works with @theme directive"
# Verify styles.css contains processed Tailwind classes

# Expected: All commands execute successfully
```

## Final Validation Checklist

- [ ] All workspace dependencies install: `pnpm install`
- [ ] No linting errors: `pnpm lint`
- [ ] No type errors: `pnpm --filter evoke-ui-react type-check`
- [ ] Build succeeds: `pnpm --filter evoke-ui-react build`
- [ ] Development server starts: `pnpm --filter evoke-ui-react dev`
- [ ] Package exports are correct (dist files match package.json exports)
- [ ] Tailwind v4 CSS processes without errors
- [ ] Workspace commands work from root directory
- [ ] TypeScript paths and imports resolve correctly

---

## Anti-Patterns to Avoid

- ❌ Don't use Tailwind v3 configuration patterns - v4 is CSS-first
- ❌ Don't skip peerDependencies - React must be external for library
- ❌ Don't hardcode absolute paths - use workspace-relative imports
- ❌ Don't mix package managers - stick with pnpm throughout
- ❌ Don't ignore build warnings - fix them for production readiness
- ❌ Don't create circular dependencies between workspace packages
- ❌ Don't forget to mark React as external in build configuration
- ❌ Don't use incompatible Vite plugins - ensure v4 compatibility

**Confidence Score: 8/10** - Well-researched foundation with clear implementation path and validation steps. Modern tooling may have minor configuration nuances requiring iteration.
