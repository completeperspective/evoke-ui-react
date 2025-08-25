# Sass Deprecation Warnings Fix - 2025-08-24

## Issue Summary

Fixed all Sass mixed declaration deprecation warnings in the Evoke UI React component library. These warnings occurred when CSS declarations appeared after nested rules (like `@media` queries or mixins), violating CSS specification.

## Root Cause

The warnings were triggered by the `@include enhanced-focus-ring` and `@include enhanced-interactive` mixins which contained nested `@include reduced-motion` rules, followed by CSS declarations in component files.

### Example Warning
```
DEPRECATION WARNING [mixed-decls]: Sass's behavior for declarations that appear after nested rules will be changing to match the behavior specified by CSS in an upcoming version.

More info: https://sass-lang.com/d/mixed-decls

    ┌──> src/atoms/Label/Label.module.scss
13  │     -webkit-font-smoothing: antialiased;
    │     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ declaration
    ╵
    ┌──> src/styles/abstracts/_mixins.scss
226 │ ┌   @media (prefers-reduced-motion: reduce) {
227 │ │     @content;
228 │ │   }
    │ └─── nested rule
```

## Solution Approach

### 1. Fixed Mixin Structure

**Before:**
```scss
@mixin enhanced-focus-ring($color: var(--ui-color-ring), $offset: 2px) {
  &:focus-visible {
    outline: 2px solid oklch($color);
    outline-offset: $offset;
    box-shadow: 0 0 0 4px oklch($color / 0.1), 0 0 0 2px oklch($color);
    
    @include reduced-motion {
      box-shadow: 0 0 0 2px oklch($color);
    }
  }
}
```

**After:**
```scss
@mixin enhanced-focus-ring($color: var(--ui-color-ring), $offset: 2px) {
  &:focus-visible {
    outline: 2px solid oklch($color);
    outline-offset: $offset;
    box-shadow: 0 0 0 4px oklch($color / 0.1), 0 0 0 2px oklch($color);
  }
  
  @include reduced-motion {
    &:focus-visible {
      box-shadow: 0 0 0 2px oklch($color);
    }
  }
}
```

### 2. Fixed Component Declaration Order

**Before:**
```scss
.label {
  @include enhanced-focus-ring;  // Contains nested rules
  
  // CSS declarations after nested rules - CAUSES WARNING
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}
```

**After:**
```scss
.label {
  // CSS declarations FIRST
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  
  // Mixins with nested rules AFTER
  @include enhanced-focus-ring;
}
```

## Files Modified

### Core Mixins
- `/src/styles/abstracts/_mixins.scss`
  - Fixed `enhanced-focus-ring` mixin
  - Fixed `enhanced-interactive` mixin
  - Consolidated reduced-motion overrides

### Component SCSS Files
All 8 atomic components were updated:

1. **Label.module.scss** - Moved CSS declarations before mixin includes
2. **Input.module.scss** - Reorganized file input and placeholder animations
3. **Button.module.scss** - Moved user-select before enhanced-focus-ring
4. **Skeleton.module.scss** - Moved user-select before enhanced-focus-ring
5. **Separator.module.scss** - Moved user-select before enhanced-focus-ring
6. **Heading.module.scss** - Fixed focusable class declaration order
7. **Text.module.scss** - Already compliant, no changes needed
8. **Badge.module.scss** - Already compliant, no changes needed

## Testing & Validation

### Before Fix
```bash
$ npx sass src/atoms/Label/Label.module.scss test.css
DEPRECATION WARNING [mixed-decls]: ... (multiple warnings)
```

### After Fix
```bash
$ npx sass src/atoms/Label/Label.module.scss test.css
# Clean compilation - no warnings
```

### Comprehensive Testing
All SCSS files now compile cleanly:
- ✅ Badge.module.scss
- ✅ Button.module.scss  
- ✅ Heading.module.scss
- ✅ Input.module.scss
- ✅ Label.module.scss
- ✅ Separator.module.scss
- ✅ Skeleton.module.scss
- ✅ Text.module.scss
- ✅ _mixins.scss
- ✅ Main style index

## Key Principles Applied

1. **CSS Declarations First**: Always place CSS property declarations before any nested rules
2. **Mixins After Properties**: Include mixins that contain nested rules after all CSS declarations
3. **Consolidated Media Queries**: Move media query logic outside of individual nested selectors when possible
4. **Maintained Functionality**: All existing styles and behaviors preserved

## Build Impact

- ✅ Clean Sass compilation with zero warnings
- ✅ All component functionality preserved
- ✅ Build pipeline working correctly
- ✅ No breaking changes to component APIs
- ✅ CSS output remains functionally identical

## Future Prevention

To prevent mixed declaration warnings in the future:

1. Always place CSS properties before nested rules or mixins
2. When creating new mixins, avoid nested @include statements within selectors
3. Use `& {}` wrapper for declarations that logically should come after nested rules
4. Test new SCSS with `sass --verbose` during development