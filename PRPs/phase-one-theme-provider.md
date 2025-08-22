# Phase One - Theme Provider Implementation PRP

## Purpose

Implement a React context-based theme provider system with runtime CSS variable injection, OKLCH color manipulation utilities, localStorage persistence, and system preference detection for dynamic theming.

## Core Principles

1. **Context is King**: Include ALL necessary documentation, examples, and caveats
2. **Validation Loops**: Provide executable tests/lints the AI can run and fix
3. **Information Dense**: Use keywords and patterns from React theming best practices
4. **Progressive Success**: Start simple, validate, then enhance
5. **Global rules**: Be sure to follow all rules in CLAUDE.md
6. **Sub Agents**: ALWAYS use the best available agent for each task

---

## Goal

Create a comprehensive theming solution that enables runtime theme switching, persistent theme state, and dynamic OKLCH color manipulation while providing excellent developer experience through TypeScript definitions and React hooks.

## Why

- **Runtime Theming**: Enables dynamic theme switching without page reloads or rebuilds
- **User Preference**: Respects system dark/light mode preferences and persists user choices
- **Color Flexibility**: OKLCH utilities allow programmatic color adjustments for accessibility and branding
- **Developer Experience**: Strongly typed theme configuration with IntelliSense support
- **Performance**: CSS variable updates are more performant than re-rendering styled components

## What

Implement a complete theming system including:

- ThemeProvider React context component
- useTheme hook for theme consumption
- Runtime CSS variable injection and updates
- OKLCH color manipulation utilities
- localStorage persistence for theme preferences
- System preference detection (dark/light mode)
- TypeScript definitions for theme configuration
- Theme switching utilities and helpers

### Success Criteria

- [ ] ThemeProvider component manages theme state correctly
- [ ] useTheme hook provides theme values and switching functions
- [ ] CSS variables update dynamically in the DOM
- [ ] OKLCH color utilities manipulate colors correctly
- [ ] Theme preferences persist across browser sessions
- [ ] System preference detection works on mount
- [ ] TypeScript definitions provide full IntelliSense
- [ ] Theme switching is smooth without visual flickers
- [ ] Multiple themes can be registered and switched between

## All Needed Context

### Documentation & References

```yaml
# MUST READ - Include these in your context window
- url: https://www.joshwcomeau.com/css/css-variables-for-react-devs/
  why: CSS variables with React patterns, performance considerations, and best practices

- url: https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
  why: System preference detection using prefers-color-scheme media query

- url: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch
  why: OKLCH color space manipulation and browser support requirements

- url: https://css-tricks.com/almanac/functions/o/oklch/
  why: OKLCH function syntax and color component manipulation

- url: https://github.com/mimshins/react-design-tokens
  why: React design token patterns and CSS variable generation utilities

- url: https://ui.docs.amplify.aws/react/theming
  why: Theme provider patterns and structured theme object design

- url: https://stackoverflow.com/questions/78490702/make-a-given-oklch-color-50-lighter-via-css-oklchfrom-and-calc-function
  why: CSS relative color syntax for OKLCH manipulation

- url: https://evilmartians.com/chronicles/better-dynamic-themes-in-tailwind-with-oklch-color-magic
  why: OKLCH color manipulation patterns and CSS variable integration

- file: /home/adam/code/evoke-ui/PLANNING.md
  why: Theme provider architecture requirements and color space specifications

- file: /home/adam/code/evoke-ui/TASK.md
  why: Specific theme provider implementation requirements and code examples
```

### Current Codebase Tree (after previous phases)

```bash
packages/evoke-ui-react/src/
├── tokens/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── index.ts
├── styles/
│   ├── abstracts/
│   ├── tokens.scss
│   ├── tailwind.scss
│   └── index.scss
├── utils/
│   └── cn.ts
└── index.ts
```

### Desired Codebase Tree

```bash
packages/evoke-ui-react/src/
├── providers/
│   ├── ThemeProvider.tsx
│   ├── ThemeContext.ts
│   └── index.ts
├── hooks/
│   ├── useTheme.ts
│   ├── useSystemPreference.ts
│   └── index.ts
├── utils/
│   ├── colors.ts
│   ├── theme.ts
│   ├── storage.ts
│   └── cn.ts
├── types/
│   ├── theme.ts
│   └── index.ts
├── tokens/
├── styles/
└── index.ts
```

### Known Gotchas & Library Quirks

```typescript
// CRITICAL: CSS variable updates must use camelCase to kebab-case conversion
// React uses camelCase, CSS uses kebab-case for custom properties
// document.documentElement.style.setProperty('--ui-color-primary', value)

// CRITICAL: OKLCH browser support requires feature detection
// Use @supports (color: oklch(0 0 0)) for progressive enhancement
// Provide RGB fallbacks for older browsers

// CRITICAL: System preference changes need event listener cleanup
// window.matchMedia() requires removeEventListener in useEffect cleanup
// Handle edge cases where matchMedia is not supported

// CRITICAL: localStorage can throw in private/incognito modes
// Wrap localStorage operations in try-catch blocks
// Gracefully degrade when storage is not available

// CRITICAL: CSS variable injection timing matters
// Must inject variables before component rendering to avoid FOUC
// Use useLayoutEffect for synchronous DOM updates

// CRITICAL: OKLCH values need validation for valid ranges
// Lightness: 0-1, Chroma: 0+, Hue: 0-360 degrees
// Invalid values can cause CSS parsing errors
```

## Implementation Blueprint

### Data Models and Structure

```typescript
// Core theme interfaces for TypeScript definitions
interface ThemeConfig {
  name: string;
  colors?: Partial<ColorTokens>;
  typography?: Partial<TypographyTokens>;
  spacing?: Partial<SpacingTokens>;
  components?: Partial<ComponentTokens>;
}

interface ThemeContextValue {
  theme: ThemeConfig;
  themes: Record<string, ThemeConfig>;
  setTheme: (name: string) => void;
  toggleTheme: () => void;
  systemPreference: 'light' | 'dark' | null;
  resolvedTheme: string;
}

interface OklchColor {
  l: number; // Lightness 0-1
  c: number; // Chroma 0+
  h: number; // Hue 0-360
}
```

### List of Tasks (in completion order)

```yaml
Task 1 - Create Core Theme Types:
  CREATE src/types/theme.ts:
    - ThemeConfig interface definition
    - Color token interfaces with OKLCH values
    - Component override interfaces
    - Theme provider prop types

  CREATE src/types/index.ts:
    - Re-export all type definitions
    - Provide unified type interface

Task 2 - Implement OKLCH Color Utilities:
  CREATE src/utils/colors.ts:
    - parseOklch function to parse OKLCH strings
    - adjustLightness for programmatic lightness changes
    - adjustChroma for saturation modifications
    - rotateHue for color wheel rotation
    - toCSS function for CSS oklch() generation
    - Browser feature detection for OKLCH support

Task 3 - Create Storage Utilities:
  CREATE src/utils/storage.ts:
    - getStoredTheme with error handling
    - setStoredTheme with try-catch wrapper
    - clearStoredTheme for reset functionality
    - Storage availability detection

  CREATE src/utils/theme.ts:
    - injectThemeVariables for CSS variable injection
    - generateThemeCSS for CSS string generation
    - mergeThemeConfig for theme composition
    - validateThemeConfig for runtime validation

Task 4 - Implement System Preference Hook:
  CREATE src/hooks/useSystemPreference.ts:
    - matchMedia-based dark/light detection
    - Change event listener with cleanup
    - Fallback for environments without matchMedia
    - TypeScript definitions for return values

Task 5 - Create Theme Context:
  CREATE src/providers/ThemeContext.ts:
    - React context definition with TypeScript
    - Default context values
    - Context provider and consumer types

  CREATE src/providers/ThemeProvider.tsx:
    - Theme state management with useState
    - CSS variable injection logic
    - Storage persistence integration
    - System preference integration
    - Theme switching functionality

Task 6 - Implement Theme Hook:
  CREATE src/hooks/useTheme.ts:
    - Context consumption with error handling
    - Theme switching utilities
    - Current theme resolution logic
    - TypeScript return type definitions

Task 7 - Create Hook Exports:
  CREATE src/hooks/index.ts:
    - Export useTheme hook
    - Export useSystemPreference hook
    - Future hook exports placeholder

Task 8 - Update Main Exports:
  UPDATE src/index.ts:
    - Export ThemeProvider component
    - Export useTheme hook
    - Export theme utility functions
    - Export TypeScript types
```

### Per Task Pseudocode

```typescript
// Task 2 - OKLCH color utilities
export interface OklchColor {
  l: number; // 0-1
  c: number; // 0+
  h: number; // 0-360
}

export function parseOklch(oklchString: string): OklchColor {
  // Parse "0.65 0.2 255" format to { l, c, h } object
  const values = oklchString.split(' ').map(Number);
  return { l: values[0], c: values[1], h: values[2] };
}

export function adjustLightness(oklchString: string, amount: number): string {
  const { l, c, h } = parseOklch(oklchString);
  const newL = Math.max(0, Math.min(1, l + amount));
  return `${newL} ${c} ${h}`;
}

// Task 4 - System preference detection
export function useSystemPreference() {
  const [preference, setPreference] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    if (!window.matchMedia) return;

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updatePreference = () => {
      setPreference(darkQuery.matches ? 'dark' : 'light');
    };

    updatePreference();
    darkQuery.addEventListener('change', updatePreference);

    return () => darkQuery.removeEventListener('change', updatePreference);
  }, []);

  return preference;
}

// Task 5 - ThemeProvider implementation
export function ThemeProvider({
  children,
  themes = { light: {}, dark: {} },
  defaultTheme = 'light'
}: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return getStoredTheme() || defaultTheme;
  });
  const systemPreference = useSystemPreference();

  // CSS variable injection logic
  useLayoutEffect(() => {
    const themeConfig = themes[currentTheme];
    if (themeConfig) {
      injectThemeVariables(themeConfig);
      setStoredTheme(currentTheme);
    }
  }, [currentTheme, themes]);

  const contextValue: ThemeContextValue = {
    theme: themes[currentTheme] || {},
    themes,
    setTheme: setCurrentTheme,
    toggleTheme: () => {
      const themeNames = Object.keys(themes);
      const currentIndex = themeNames.indexOf(currentTheme);
      const nextIndex = (currentIndex + 1) % themeNames.length;
      setCurrentTheme(themeNames[nextIndex]);
    },
    systemPreference,
    resolvedTheme: currentTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Task 3 - Theme utilities
function injectThemeVariables(theme: ThemeConfig): void {
  const root = document.documentElement;

  // Inject color variables
  if (theme.colors) {
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        root.style.setProperty(`--ui-color-${kebabCase(key)}`, value);
      }
    });
  }

  // Inject spacing, typography, etc.
}
```

### Integration Points

```yaml
REACT_CONTEXT:
  - provider: 'ThemeProvider wraps application root'
  - consumption: 'useTheme hook accesses theme context'
  - updates: 'Context updates trigger re-renders for theme consumers'

CSS_VARIABLES:
  - injection: 'useLayoutEffect injects variables before paint'
  - naming: 'Consistent --ui-* prefix for all custom properties'
  - updates: 'Dynamic updates via document.documentElement.style.setProperty'

STORAGE_INTEGRATION:
  - persistence: 'localStorage stores user theme preferences'
  - hydration: 'Initial theme state from storage on mount'
  - fallback: 'Graceful degradation when storage unavailable'

SYSTEM_INTEGRATION:
  - detection: 'matchMedia API for system preference detection'
  - updates: 'Event listeners for preference changes'
  - respect: 'Auto-switch to system preference when enabled'
```

## Validation Loop

### Level 1: Syntax & Style

```bash
# Run these FIRST - fix any errors before proceeding
pnpm lint                           # ESLint checking
pnpm prettier --check "src/**/*.{ts,tsx}"  # Format checking
pnpm --filter evoke-ui-react type-check    # TypeScript compilation

# Expected: No TypeScript errors in providers, hooks, or utilities
```

### Level 2: Unit Tests

```typescript
// CREATE src/providers/__tests__/ThemeProvider.test.tsx
import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeProvider';

const TestComponent = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{resolvedTheme}</span>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  it('should provide theme context to children', () => {
    render(
      <ThemeProvider themes={{ light: {}, dark: {} }}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('should switch themes correctly', () => {
    render(
      <ThemeProvider themes={{ light: {}, dark: {} }}>
        <TestComponent />
      </ThemeProvider>
    );

    act(() => {
      screen.getByText('Set Dark').click();
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('should inject CSS variables on theme change', () => {
    const themes = {
      light: { colors: { primary: '0.65 0.2 255' } },
      dark: { colors: { primary: '0.45 0.15 255' } }
    };

    render(
      <ThemeProvider themes={themes}>
        <TestComponent />
      </ThemeProvider>
    );

    // Check that CSS variables are injected
    const root = document.documentElement;
    expect(root.style.getPropertyValue('--ui-color-primary')).toBeTruthy();
  });
});

// CREATE src/utils/__tests__/colors.test.ts
import { parseOklch, adjustLightness, adjustChroma, rotateHue } from '../colors';

describe('OKLCH Color Utilities', () => {
  it('should parse OKLCH strings correctly', () => {
    const result = parseOklch('0.65 0.2 255');
    expect(result).toEqual({ l: 0.65, c: 0.2, h: 255 });
  });

  it('should adjust lightness within bounds', () => {
    const result = adjustLightness('0.5 0.2 255', 0.2);
    expect(result).toBe('0.7 0.2 255');

    // Test upper bound
    const bounded = adjustLightness('0.9 0.2 255', 0.2);
    expect(bounded).toBe('1 0.2 255');
  });

  it('should rotate hue correctly', () => {
    const result = rotateHue('0.65 0.2 180', 90);
    expect(result).toBe('0.65 0.2 270');

    // Test wrap-around
    const wrapped = rotateHue('0.65 0.2 300', 90);
    expect(wrapped).toBe('0.65 0.2 30');
  });
});
```

```bash
# Run theme tests
pnpm test ThemeProvider.test.tsx
pnpm test colors.test.ts

# Expected: All theme functionality tests pass
```

### Level 3: Integration Test

```bash
# Test theme provider in development
pnpm --filter evoke-ui-react dev

# Manual integration test:
# 1. Open browser dev tools
# 2. Check that CSS variables are injected in :root
# 3. Test theme switching updates variables in real-time
# 4. Verify localStorage persistence across page reloads
# 5. Test system preference detection works

# Expected: Theme switching works smoothly without visual flickers
```

## Final Validation Checklist

- [ ] All TypeScript files compile: `pnpm type-check`
- [ ] Theme provider tests pass: `pnpm test ThemeProvider.test.tsx`
- [ ] OKLCH utility tests pass: `pnpm test colors.test.ts`
- [ ] CSS variables inject properly on theme changes
- [ ] Theme persistence works with localStorage
- [ ] System preference detection functions correctly
- [ ] Theme switching is smooth without FOUC
- [ ] useTheme hook provides correct theme context
- [ ] OKLCH color manipulation utilities work accurately
- [ ] Error handling works for storage and matchMedia edge cases

---

## Anti-Patterns to Avoid

- ❌ Don't use inline styles for theming - CSS variables are more performant
- ❌ Don't skip error handling for localStorage - it can throw in private mode
- ❌ Don't forget event listener cleanup - causes memory leaks
- ❌ Don't use useEffect for CSS variable injection - use useLayoutEffect
- ❌ Don't hardcode theme names - make system flexible for any theme
- ❌ Don't skip OKLCH validation - invalid values break CSS parsing
- ❌ Don't ignore system preference changes - users expect responsive behavior
- ❌ Don't block initial render waiting for theme - provide sensible defaults

**Confidence Score: 8/10** - Comprehensive theming system with modern React patterns, OKLCH color manipulation, and robust state management. Integration testing may reveal minor edge cases requiring iteration.
