# Evoke UI - Development Commands

## Project Setup

```bash
# Install dependencies
pnpm install

# Clean install
pnpm clean && pnpm install
```

## Development Workflow

```bash
# Start development server (Vite)
pnpm dev

# Build library
pnpm build

# Build with watch mode
pnpm build:watch

# Clean build artifacts
pnpm clean
```

## Code Quality

```bash
# Type checking
pnpm type-check
# Or specifically for React package
pnpm --filter @evoke-ui/react type-check

# Linting
pnpm lint
pnpm lint:fix

# Formatting
pnpm format
pnpm format:check
```

## Testing

```bash
# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Test coverage
pnpm test:coverage
```

## Package-Specific Commands

```bash
# Run commands in React package specifically
pnpm --filter @evoke-ui/react <command>

# Examples:
pnpm --filter @evoke-ui/react build
pnpm --filter @evoke-ui/react dev
pnpm --filter @evoke-ui/react test
```

## Build Pipeline Details

- **Library build**: tsup handles TypeScript compilation and bundling
- **Style build**: Sass compilation + Tailwind CSS processing
- **Combined output**: dist/ folder with JS, CSS, and type definitions
- **Formats**: ESM (.mjs), CJS (.js), and TypeScript declarations

## System Requirements

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Git (for version control)
