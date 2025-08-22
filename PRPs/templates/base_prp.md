# Base PRP Template v2 - Context-Rich with Validation Loops (TypeScript)

## Purpose

Template optimized for AI agents to implement features with sufficient context and self-validation capabilities to achieve working code through iterative refinement in TypeScript projects.

## Core Principles

1. **Context is King**: Include ALL necessary documentation, examples, and caveats
2. **Validation Loops**: Provide executable tests/lints the AI can run and fix
3. **Information Dense**: Use keywords and patterns from the codebase
4. **Progressive Success**: Start simple, validate, then enhance
5. **Global rules**: Be sure to follow all rules in CLAUDE.md

---

## Goal

[What needs to be built - be specific about the end state and desires]

## Why

- [Business value and user impact]
- [Integration with existing features]
- [Problems this solves and for whom]

## What

[User-visible behavior and technical requirements]

### Success Criteria

- [ ] [Specific measurable outcomes]

## All Needed Context

### Documentation & References (list all context needed to implement the feature)

```yaml
# MUST READ - Include these in your context window
- url: [Official API docs URL]
  why: [Specific sections/methods you'll need]

- file: [path/to/example.ts]
  why: [Pattern to follow, gotchas to avoid]

- doc: [Library documentation URL]
  section: [Specific section about common pitfalls]
  critical: [Key insight that prevents common errors]

- docfile: [PRPs/ai_docs/file.md]
  why: [docs that the user has pasted in to the project]
```

### Current Codebase tree (run `tree` in the root of the project) to get an overview of the codebase

```bash

```

### Desired Codebase tree with files to be added and responsibility of file

```bash

```

### Known Gotchas of our codebase & Library Quirks

```typescript
// CRITICAL: [Library name] requires [specific setup]
// Example: Express middleware order matters - auth must come before routes
// Example: Prisma requires `npx prisma generate` after schema changes
// Example: We use strict TypeScript with no implicit any
// Example: All async functions must have proper error handling
```

## Implementation Blueprint

### Data models and structure

Create the core data models, we ensure type safety and consistency.

```typescript
Examples:
 - TypeScript interfaces/types
 - Prisma/TypeORM models
 - Zod schemas for validation
 - Class validators with decorators
 - GraphQL type definitions

```

### list of tasks to be completed to fullfill the PRP in the order they should be completed

```yaml
Task 1:
MODIFY src/existing-module.ts:
  - FIND pattern: "class OldImplementation"
  - INJECT after line containing "constructor"
  - PRESERVE existing method signatures
  - UPDATE type definitions

CREATE src/features/new-feature.ts:
  - MIRROR pattern from: src/features/similar-feature.ts
  - MODIFY class name and core logic
  - KEEP error handling pattern identical
  - ENSURE proper TypeScript types

...(...)

Task N:
...

```

### Per task pseudocode as needed added to each task

```typescript
// Task 1
// Pseudocode with CRITICAL details dont write entire code
async function newFeature(param: string): Promise<Result> {
  // PATTERN: Always validate input first (see src/validators/index.ts)
  const validated = validateInput(param); // throws ValidationError

  // GOTCHA: This library requires connection pooling
  const connection = await getConnection(); // see src/db/pool.ts
  try {
    // PATTERN: Use existing retry decorator/function
    const result = await retry(
      async () => {
        // CRITICAL: API returns 429 if >10 req/sec
        await rateLimiter.acquire();
        return await externalApi.call(validated);
      },
      { attempts: 3, backoff: 'exponential' },
    );

    // PATTERN: Standardized response format
    return formatResponse(result); // see src/utils/responses.ts
  } finally {
    await connection.release();
  }
}
```

### Integration Points

```yaml
DATABASE:
  - migration: 'npm run migration:create add-feature-column'
  - schema: 'Update prisma/schema.prisma with new model'
  - generate: 'npx prisma generate after schema changes'

CONFIG:
  - add to: src/config/index.ts
  - pattern: "FEATURE_TIMEOUT: process.env.FEATURE_TIMEOUT || '30'"
  - env file: '.env.example needs FEATURE_TIMEOUT=30'

ROUTES:
  - add to: src/routes/index.ts
  - pattern: "router.use('/feature', featureRouter)"
  - middleware: 'Apply auth middleware if needed'
```

## Validation Loop

### Level 1: Syntax & Style

```bash
# Run these FIRST - fix any errors before proceeding
npm run lint                          # ESLint checking
npm run lint:fix                      # Auto-fix what's possible
npm run type-check                    # TypeScript compiler check

# Or if using other tools:
npx prettier --write src/new-feature.ts  # Format code
npx tsc --noEmit                         # Type checking only

# Expected: No errors. If errors, READ the error and fix.
```

### Level 2: Unit Tests each new feature/file/function use existing test patterns

```typescript
// CREATE new-feature.test.ts with these test cases:
import { describe, it, expect, vi } from 'vitest';
// OR: import { jest } from '@jest/globals'; for Jest

describe('newFeature', () => {
  it('should handle happy path', async () => {
    // Basic functionality works
    const result = await newFeature('valid_input');
    expect(result.status).toBe('success');
  });

  it('should throw ValidationError for invalid input', async () => {
    // Invalid input raises ValidationError
    await expect(newFeature('')).rejects.toThrow(ValidationError);
  });

  it('should handle external API timeout gracefully', async () => {
    // Handles timeouts gracefully
    vi.spyOn(externalApi, 'call').mockRejectedValue(new Error('Timeout'));
    const result = await newFeature('valid');
    expect(result.status).toBe('error');
    expect(result.message).toContain('timeout');
  });
});
```

```bash
# Run and iterate until passing:
npm test new-feature.test.ts
# OR: npm run test:watch for continuous testing

# If failing: Read error, understand root cause, fix code, re-run (never mock to pass)
```

### Level 3: Integration Test

```bash
# Start the service
npm run dev
# OR: npm start for production mode

# Test the endpoint
curl -X POST http://localhost:3000/api/feature \
  -H "Content-Type: application/json" \
  -d '{"param": "test_value"}'

# Expected: {"status": "success", "data": {...}}
# If error: Check logs or use npm run dev for detailed output
```

## Final Validation Checklist

- [ ] All tests pass: `npm test`
- [ ] No linting errors: `npm run lint`
- [ ] No type errors: `npm run type-check`
- [ ] Build succeeds: `npm run build`
- [ ] Manual test successful: [specific curl/command]
- [ ] Error cases handled gracefully
- [ ] Logs are informative but not verbose
- [ ] Documentation updated if needed
- [ ] Package.json dependencies are up to date

---

## Anti-Patterns to Avoid

- ❌ Don't use `any` type - be specific with TypeScript types
- ❌ Don't skip `await` on async functions
- ❌ Don't create new patterns when existing ones work
- ❌ Don't skip validation because "it should work"
- ❌ Don't ignore failing tests - fix them
- ❌ Don't mix CommonJS and ES modules inconsistently
- ❌ Don't hardcode values that should be in config/env
- ❌ Don't catch all exceptions - be specific with error types
- ❌ Don't forget to handle Promise rejections
