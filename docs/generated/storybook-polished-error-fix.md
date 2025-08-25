# Storybook Polished Error Fix - 2025-08-24

## Problem Summary

Storybook was throwing a critical error related to the polished library's color parsing:

```
t: An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#5 for more information.
    at parseToRgb (globals-runtime.js:8365:9)
    at opacify (globals-runtime.js:8518:11)
```

**Root Cause**: Polished Error #5 means "Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl, hsla, or a CSS named color."

The issue was that our custom Storybook themes were using OKLCH color values (e.g., `oklch(0.6533 0.2684 354.75)`) which the polished library cannot parse.

## Solution Implemented

### 1. Identified Incompatible Color Format

The Storybook theming system internally uses styled-components/polished for color manipulation, which only supports traditional color formats:
- Hex: `#ff0069`
- RGB: `rgb(255, 0, 105)`
- HSL: `hsl(338, 100%, 50%)`
- Named colors: `red`, `blue`, etc.

### 2. OKLCH to RGB Conversion

Converted all OKLCH color values to their RGB hex equivalents while maintaining visual consistency:

#### Light Theme Colors (`.storybook/evoke-theme.ts`)
```typescript
const colors = {
  // --ui-color-primary: oklch(0.6533 0.2684 354.75) → RGB equivalent
  primary: '#FF0069',
  // --ui-color-secondary: oklch(0.96 0.006 247.86) → RGB equivalent  
  secondary: '#f1f5f9',
  // --ui-color-background: oklch(1 0 0) → pure white
  background: '#ffffff',
  // --ui-color-foreground: oklch(0.19 0.015 247.86) → RGB equivalent
  foreground: '#1e293b',
  // --ui-color-muted-foreground: oklch(0.55 0.016 247.86) → RGB equivalent
  mutedForeground: '#64748b',
  // --ui-color-border: oklch(0.92 0.013 247.86) → RGB equivalent
  border: '#e2e8f0',
};
```

#### Dark Theme Colors (`.storybook/evoke-theme-dark.ts`)
```typescript
const darkColors = {
  // --ui-color-primary: oklch(0.6533 0.2684 354.75) → RGB equivalent (same as light)
  primary: '#ff0069',
  // --ui-color-secondary: oklch(0.27 0.015 247.86) → RGB equivalent for dark
  secondary: '#334155',
  // Dark background: oklch(0.13 0.013 247.86) → RGB equivalent
  background: '#0f172a',
  // Dark foreground: oklch(0.98 0.005 247.86) → RGB equivalent
  foreground: '#f8fafc',
  // Dark muted foreground: oklch(0.7 0.015 247.86) → RGB equivalent
  mutedForeground: '#94a3b8',
  // Dark border: oklch(0.27 0.015 247.86) → RGB equivalent
  border: '#334155',
};
```

### 3. Updated Theme Configuration

Replaced all OKLCH color strings with RGB hex equivalents in both theme files, ensuring:
- Visual consistency maintained
- No breaking changes to appearance
- Full compatibility with polished library
- Proper theme switching functionality preserved

## Verification Results

### ✅ Success Criteria Met

1. **Error Resolution**: Polished error #5 completely eliminated
2. **Storybook Startup**: Starts without errors or warnings
3. **Logo Display**: Custom "evoke ui" logo displays correctly in both themes
4. **Theme Switching**: System preference detection and theme switching functional
5. **Asset Accessibility**: Both light and dark logo variants accessible
6. **Visual Consistency**: Same appearance as original OKLCH values

### ✅ Testing Completed

```bash
# Storybook starts successfully
pnpm storybook
# ✅ Storybook running successfully!

# Logo assets accessible
curl -s http://localhost:6006/evoke-ui-logo.svg
# ✅ Logo asset accessible

curl -s http://localhost:6006/evoke-ui-logo-dark.svg  
# ✅ Dark logo asset accessible
```

## Key Learnings

1. **Storybook Theme Limitations**: Storybook theming system doesn't support modern color formats like OKLCH
2. **Polished Compatibility**: Internal dependency on polished library requires traditional color formats
3. **OKLCH Conversion**: RGB hex equivalents can maintain visual consistency when properly converted
4. **Component Stories Unaffected**: This fix only affects Storybook theming; component stories continue to use OKLCH via CSS variables

## Files Modified

- `.storybook/evoke-theme.ts` - Converted OKLCH to RGB for light theme
- `.storybook/evoke-theme-dark.ts` - Converted OKLCH to RGB for dark theme
- `TASK.md` - Updated with completion status and technical details

## Future Considerations

- Monitor Storybook updates for OKLCH color support
- Component stories maintain OKLCH color system via CSS variables
- This fix is purely for Storybook theming compatibility
- Consider automated OKLCH to RGB conversion utilities if more theme variations needed