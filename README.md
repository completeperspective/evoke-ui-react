# Evoke UI React Component Library 🎨

A production-ready, themable React component library built on shadcn/ui with CVA-first architecture, atomic design principles, and comprehensive CI/CD infrastructure.

[![Build Status](https://github.com/completeperspective/evoke-ui-react/workflows/Continuous%20Integration/badge.svg)](https://github.com/completeperspective/evoke-ui-react/actions/workflows/ci.yml)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

## 🚀 Quick Start

### Installation

```bash
# Install with pnpm (recommended)
pnpm add @evoke-ui/react

# Or with npm
npm install @evoke-ui/react
```

### Basic Usage

```tsx
import { Button, Card, SearchBar } from '@evoke-ui/react';
import '@evoke-ui/react/styles.css';

function App() {
  return (
    <Card>
      <SearchBar 
        placeholder="Search components..." 
        onSearch={(query) => console.log(query)} 
      />
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </Card>
  );
}
```

## 📚 Documentation

### 🌐 Live Documentation
- **Production Documentation**: [https://completeperspective.github.io/evoke-ui-react/](https://completeperspective.github.io/evoke-ui-react/)
- **Component Playground**: Interactive Storybook with live examples
- **Design System Guide**: Complete token reference and theming documentation

### 🔍 PR Preview System
Pull requests automatically generate preview deployments for visual review:
- Preview artifacts available as downloadable builds
- Comprehensive review checklists included
- Automatic cleanup when PRs are closed/merged

## 🏗️ Architecture

### Component Hierarchy (Atomic Design)

```
┌─────────────────────────────────────┐
│             Templates               │  
│        (Layout Patterns)            │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│            Organisms                │
│       (Complex Patterns)            │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│            Molecules                │  ✅ 3/3 Complete
│      (Composite Components)         │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│             Atoms                   │  ✅ 8/8 Complete  
│      (Foundation Elements)          │
└─────────────────────────────────────┘
```

### ✅ Completed Components

#### Atomic Components (8/8)
- **Button** - 69% SCSS reduction, CVA-first variants
- **Input** - 57% SCSS reduction, enhanced accessibility
- **Label** - 42% SCSS reduction, semantic integration
- **Badge** - 82% SCSS reduction, flexible theming
- **Text** - 30% SCSS reduction, typography scale
- **Heading** - 33% SCSS reduction, semantic levels
- **Skeleton** - 63% SCSS reduction, loading states
- **Separator** - 61% SCSS reduction, layout utility

#### Molecular Components (3/3)
- **FormField** - Complete form composition with validation
- **Card** - Flexible container with interactive variants
- **SearchBar** - Advanced search with history and suggestions

### CVA-First Architecture
- **56.4% average SCSS reduction** (1,074+ lines eliminated)
- **Type-safe variants** with VariantProps integration
- **Consistent API** across all components
- **Enhanced performance** with better tree-shaking

## 🎨 Theming System

### OKLCH Color Space
Utilizing perceptually uniform OKLCH color space for:
- **Wide gamut support** for P3 displays
- **Better accessibility** contrast calculations
- **Predictable color mixing** and interpolation

### Runtime Theming
```scss
:root {
  /* Semantic Tokens (OKLCH format) */
  --ui-color-primary: 0.65 0.2 255;
  --ui-color-secondary: 0.75 0.18 310;
  --ui-color-success: 0.75 0.18 145;
  
  /* Component Tokens */
  --ui-button-height: 2.5rem;
  --ui-button-padding-x: 1rem;
  
  /* Typography Scale */
  --ui-font-size-base: 1rem;
  --ui-font-family-sans: system-ui, -apple-system, sans-serif;
}
```

### Tailwind CSS v4 Integration
```scss
@import 'tailwindcss';

@theme {
  --color-primary: oklch(var(--ui-color-primary));
  --color-secondary: oklch(var(--ui-color-secondary));
}
```

## 🛠️ Development

### Prerequisites
- **Node.js 22+** (required for Storybook 8)
- **pnpm 8+** (recommended package manager)

### Setup
```bash
# Clone the repository
git clone https://github.com/completeperspective/evoke-ui-react.git
cd evoke-ui-react

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts
```bash
# Development
pnpm dev              # Start Storybook dev server
pnpm build            # Build component library
pnpm test             # Run test suite (662 tests)
pnpm test:watch       # Run tests in watch mode

# Quality Assurance
pnpm lint             # ESLint code quality check
pnpm format           # Prettier code formatting
pnpm type-check       # TypeScript compilation check

# Documentation
pnpm build-storybook  # Build static Storybook
pnpm storybook        # Start Storybook dev server
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

#### 1. Continuous Integration (`ci.yml`)
- **Triggers**: Every push and PR
- **Actions**: Test suite (662 tests), build verification, type checking, linting
- **Quality Gates**: All checks must pass before merge

#### 2. Production Deployment (`deploy-storybook.yml`)
- **Triggers**: Push to main branch
- **Target**: `https://completeperspective.github.io/evoke-ui-react/`
- **Features**: Full Storybook build with component documentation

#### 3. PR Preview System (`pr-preview.yml`)
- **Triggers**: PR creation, updates, reopening
- **Output**: Downloadable artifact with complete Storybook build
- **Features**: Auto-generated PR comments with download links and review checklist

#### 4. Cleanup Automation (`pr-cleanup.yml`)
- **Triggers**: PR close/merge
- **Actions**: Automatic artifact cleanup and status reporting

### Performance Metrics
- **✅ Build Time**: 21.82s (82% faster than target)
- **✅ Test Success Rate**: 662/662 tests passing (100%)
- **✅ Bundle Optimization**: Manual chunking strategy
- **✅ Deployment Reliability**: Secure artifact-based system

## 📦 Distribution

### Package Structure
```
@evoke-ui/react/
├── dist/
│   ├── index.js          # CommonJS bundle
│   ├── index.mjs         # ES module bundle  
│   ├── index.d.ts        # TypeScript declarations
│   ├── styles.css        # Complete compiled styles
│   └── tailwind.css      # Tailwind utilities only
├── src/                  # Source code for advanced customization
└── package.json          # Package metadata and exports
```

### Import Options
```typescript
// Tree-shakeable imports (recommended)
import { Button } from '@evoke-ui/react';

// Style imports
import '@evoke-ui/react/styles.css';       // Complete styles
import '@evoke-ui/react/tailwind.css';     // Tailwind utilities only

// Advanced: Sass source imports
import '@evoke-ui/react/src/styles/index.scss';
```

## 🧪 Testing

### Test Suite Coverage
- **662 total tests** across all components and hooks
- **100% pass rate** with comprehensive coverage
- **Component Tests**: React Testing Library with user interaction testing
- **Hook Tests**: Custom hooks with edge case coverage
- **Integration Tests**: Component composition and prop forwarding

### Testing Strategy
- **Unit Tests**: Individual component logic
- **Integration Tests**: Component interactions
- **Accessibility Tests**: ARIA compliance and keyboard navigation
- **Visual Regression**: Storybook with Chromatic (planned)

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-component`)
3. **Develop** following our component architecture patterns
4. **Test** your changes (`pnpm test`)
5. **Document** with Storybook stories
6. **Submit** a pull request

### Component Development Guidelines
- Follow **CVA-first architecture** patterns
- Write **comprehensive tests** (unit + integration)
- Include **Storybook stories** with all variants
- Maintain **TypeScript type safety**
- Document **props and usage examples**

## 📋 Project Status

### ✅ Completed Phases
- **Phase 1**: Atomic components (8/8) + Build system + Molecular components (3/3)
- **Phase 2**: Advanced testing + Package distribution + CVA migration
- **Phase 3**: Complete CI/CD pipeline + GitHub Pages deployment + Performance optimization

### 🚧 Current Focus (Phase 4)
- **Organism Components**: DataTable, NavigationMenu, Modal systems
- **Next.js Example Application**
- **Advanced Theme Marketplace**
- **Performance Benchmarking Suite**

## 🏆 Key Achievements

### Performance & Quality
- **56.4% SCSS reduction** through CVA-first architecture
- **21.82s build time** (82% improvement over targets)
- **100% test success rate** (662/662 tests)
- **Zero TypeScript errors** across entire codebase

### Infrastructure & Deployment  
- **4 automated workflows** for CI/CD pipeline
- **Secure artifact-based** PR preview system
- **Node.js 22 compatibility** for modern tooling
- **Comprehensive error resolution** (8+ GitHub Actions fixes)

### Developer Experience
- **Complete type safety** with VariantProps
- **Interactive documentation** with Storybook
- **One-click PR previews** with review checklists
- **Consistent component API** across all layers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using React 18, TypeScript 5, Tailwind CSS v4, and modern tooling.