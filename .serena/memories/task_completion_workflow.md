# Task Completion Workflow

## Before Starting Any Task

1. **Read PLANNING.md** to understand architecture and constraints
2. **Check TASK.md** to see if task is listed, add if missing
3. **Read relevant docs/** folder for design patterns
4. **Understand project structure** and existing patterns

## During Development

1. **Follow atomic design principles** (atoms → molecules → organisms)
2. **Create tests alongside components** (expected use, edge case, failure case)
3. **Use consistent naming and file structure**
4. **Keep files under 500 lines**, refactor if approaching limit

## Code Quality Checks (REQUIRED before completion)

```bash
# Always run these after making changes:
pnpm type-check           # TypeScript type checking
pnpm lint                # ESLint checks
pnpm format:check        # Prettier formatting
pnpm test                # Unit tests
```

## After Completing a Task

1. **Mark task complete in TASK.md** immediately
2. **Add any discovered sub-tasks** to "Discovered During Work" section
3. **Run full build** to ensure everything works:
   ```bash
   pnpm build
   ```
4. **Update documentation** if features/APIs changed
5. **NEVER commit code** without explicit user approval

## Quality Gates

- **TypeScript**: No type errors allowed
- **Linting**: All ESLint rules must pass
- **Testing**: New code must have corresponding tests
- **Formatting**: Code must pass Prettier checks
- **Build**: Full build must succeed without errors

## Component Development Checklist

- [ ] Component implementation with proper TypeScript types
- [ ] Sass module styles following project patterns
- [ ] Storybook stories showing all variants
- [ ] Unit tests covering expected use, edge cases, failures
- [ ] Proper exports in index.ts files
- [ ] Documentation comments for public APIs

## Integration with Existing Code

- **Study existing patterns** before implementing new features
- **Use existing utilities** (cn, cva, etc.)
- **Follow established Sass architecture**
- **Maintain consistency** with shadcn/ui patterns
