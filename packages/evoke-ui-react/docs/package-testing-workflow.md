# Package Testing Workflow

This document describes the automated package testing script and workflow for @evoke-ui/react.

## Overview

The automated package testing script (`scripts/test-package.mjs`) provides comprehensive quality assurance and distribution verification for the evoke-ui-react package. It simulates the complete process that consumers would experience when installing and using the package.

## Testing Process

The script performs the following automated tests:

### 1. Package Build ✅
- Executes `npm run build` to build the library
- Verifies all required build artifacts are created:
  - `dist/index.js` - ESM bundle
  - `dist/index.d.ts` - TypeScript declarations
  - `dist/styles.css` - Design system CSS (22KB)
  - `dist/tailwind.css` - Full Tailwind utilities (88KB)

### 2. Distribution Tarball ✅
- Creates distribution tarball using `npm pack`
- Verifies tarball contains all required files
- Reports tarball size and contents

### 3. Tarball Content Verification ✅
- Extracts and inspects tarball contents
- Ensures all necessary files are included:
  - Package.json with correct exports
  - Built JavaScript and CSS files
  - TypeScript declaration files
  - Source styles for Sass users

### 4. Isolated Test Environment ✅
- Creates temporary test directory
- Sets up minimal React + TypeScript + Vite project
- Configures proper build tools and dependencies

### 5. Package Installation ✅
- Installs package from tarball in isolated environment
- Verifies installation succeeds without errors
- Confirms package appears in dependencies

### 6. TypeScript Declaration Testing ✅
- Creates comprehensive TypeScript test file
- Tests all component imports and prop interfaces
- Verifies type safety and IntelliSense support
- Tests utility functions (cn) and type inference

### 7. Component Functionality Testing ✅
- Creates React application using all atomic components
- Tests component rendering and basic interactions
- Verifies build process works with imported components
- Creates production build to ensure no runtime issues

### 8. CSS Import Strategy Testing ✅
- Tests both CSS import methods:
  - `@evoke-ui/react/styles.css` - Design system only (22KB)
  - `@evoke-ui/react/tailwind.css` - Full Tailwind utilities (88KB)
- Verifies both strategies work correctly
- Ensures no conflicts between import methods

### 9. Runtime Error Detection ✅
- Starts development server with test application
- Monitors for startup errors and runtime issues
- Checks for common error patterns
- Verifies clean server startup

## Usage

### Basic Testing
```bash
npm run test:package
```

### Verbose Output
```bash
npm run test:package:verbose
```
Shows detailed command execution and debugging information.

### Keep Test Environment
```bash
npm run test:package:keep
```
Preserves the test environment for manual inspection and debugging.

## Output Example

```
🧪 EVOKE UI REACT - AUTOMATED PACKAGE TESTING
============================================================
Package: @evoke-ui/react@0.2.0
Working Directory: /home/adam/code/evoke-ui/packages/evoke-ui-react
============================================================

[1] Building package...
✓ Build: Package built successfully

[2] Creating distribution tarball...
✓ Pack: Tarball created successfully

[3] Verifying tarball contents...
✓ Verify: Tarball contents verified

[4] Setting up isolated test environment...
✓ Setup: Test environment created

[5] Installing package in test environment...
✓ Install: Package installed successfully

[6] Testing TypeScript declarations...
✓ TypeScript: TypeScript declarations working

[7] Testing component imports and basic functionality...
✓ Components: Component imports and build successful

[8] Testing CSS import strategies...
✓ CSS Imports: Both CSS import strategies working

[9] Checking for runtime errors...
✓ Runtime: No runtime errors detected

📊 TEST SUMMARY
==================================================
Total Steps: 9
✓ Successful: 9
Total Time: 18.68s

🎉 ALL TESTS PASSED! Package is ready for distribution.
==================================================
```

## Test Coverage

The automated testing script covers:

### Component Testing
- ✅ All 8 atomic components (Button, Input, Text, Heading, Badge, Label, Skeleton, Separator)
- ✅ Component variants and props validation
- ✅ TypeScript type safety and inference
- ✅ Component rendering and basic functionality
- ✅ Build compatibility and tree-shaking

### Distribution Testing
- ✅ NPM package exports configuration
- ✅ ESM/CJS dual builds
- ✅ TypeScript declaration files
- ✅ CSS distribution strategies
- ✅ Tarball integrity and size

### Integration Testing
- ✅ React 18+ compatibility
- ✅ TypeScript 5+ compatibility
- ✅ Vite build system integration
- ✅ CSS preprocessing and compilation
- ✅ Development and production builds

### Performance Testing
- ✅ Bundle size verification
- ✅ Build time monitoring
- ✅ CSS optimization validation
- ✅ Tree-shaking effectiveness

## Troubleshooting

### Common Issues

**TypeScript Declaration Errors**
- Verify component prop interfaces match actual implementation
- Check for breaking changes in component APIs
- Ensure all exports are properly typed

**CSS Import Failures**
- Verify CSS files are properly built and included in distribution
- Check Sass compilation for syntax errors
- Ensure Tailwind configuration is valid

**Runtime Errors**
- Check for missing peer dependencies
- Verify React version compatibility
- Look for breaking changes in component implementations

### Debugging

1. Use `--verbose` flag to see detailed command output
2. Use `--skip-cleanup` to preserve test environment for manual inspection
3. Check the temporary test directory at `.test-package/test-app`
4. Review build logs and error messages

## Continuous Integration

This testing script should be integrated into CI/CD workflows:

```yaml
# Example GitHub Actions workflow
- name: Test Package Distribution
  run: npm run test:package
  working-directory: packages/evoke-ui-react
```

## Quality Gates

All tests must pass before:
- Publishing to NPM registry
- Creating release tags
- Merging to main branch
- Deploying documentation

The script provides a comprehensive quality gate ensuring the package works correctly for end users across different environments and use cases.
