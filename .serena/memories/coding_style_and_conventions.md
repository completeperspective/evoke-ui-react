# Evoke UI - Coding Style & Conventions

## TypeScript Guidelines

- **Primary Language**: TypeScript for all source code
- **Strict Mode**: Full TypeScript strict mode enabled
- **Type Coverage**: Aim for 100% TypeScript coverage
- **Interface Naming**: Use descriptive names, suffix with Props for component props

## React Component Patterns

```typescript
// Component structure example
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', ...props }, ref) => {
    return <button ref={ref} className={cn(buttonVariants({ variant, size }))} {...props} />;
  }
);
```

## File Organization

- **Atomic Design**: Components organized as atoms → molecules → organisms → templates
- **Co-location**: Component, styles, stories, and tests in same folder
- **File Naming**: PascalCase for components, camelCase for utilities
- **Max File Length**: Never exceed 500 lines of code per file

## Component File Structure

```
Button/
├── Button.tsx           # Component implementation
├── Button.module.scss   # Component-specific styles
├── Button.stories.tsx   # Storybook stories
├── Button.test.tsx      # Unit tests
└── index.ts            # Public exports
```

## Import/Export Conventions

- **Relative Imports**: Prefer relative imports within packages
- **Barrel Exports**: Use index.ts files for clean public APIs
- **External Dependencies**: Keep peer dependencies minimal

## Styling Conventions

- **Sass Architecture**: Use abstracts for mixins, variables, functions
- **BEM-like Naming**: Component-scoped class names
- **CSS Variables**: All theme-related values use CSS custom properties
- **Tailwind Classes**: Primary styling method, enhanced with Sass for complex logic

## Testing Requirements

- **Framework**: React Testing Library + Vitest
- **Coverage**: Minimum 80% test coverage
- **Test Types**: Expected use, edge case, failure case for each component
- **Co-location**: Tests next to components using `.test.tsx` suffix

## Documentation Standards

- **Component Props**: Document all props with TSDoc comments
- **Complex Logic**: Add inline comments explaining "why", not "what"
- **README Updates**: Update when features/dependencies change
- **Storybook**: Every component needs corresponding stories
