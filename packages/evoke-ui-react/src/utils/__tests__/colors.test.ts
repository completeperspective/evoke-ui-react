import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  parseOklch,
  toCSS,
  toSpaceSeparated,
  adjustLightness,
  adjustChroma,
  rotateHue,
  lighten,
  darken,
  saturate,
  desaturate,
  generateColorScale,
  supportsOklch,
  createColorToken,
  getAccessibleForeground,
  generateThemeColors,
  validateOklch,
} from '../colors';

describe('OKLCH Color Utilities', () => {
  beforeEach(() => {
    // Mock document.createElement for supportsOklch tests
    Object.defineProperty(global, 'document', {
      value: {
        ...document,
        createElement: vi.fn().mockReturnValue({
          style: {},
        }),
      },
      writable: true,
    });
  });

  describe('parseOklch', () => {
    it('should parse OKLCH strings correctly', () => {
      const result = parseOklch('0.65 0.2 255');
      expect(result).toEqual({ l: 0.65, c: 0.2, h: 255 });
    });

    it('should parse CSS oklch() function format', () => {
      const result = parseOklch('oklch(0.65 0.2 255)');
      expect(result).toEqual({ l: 0.65, c: 0.2, h: 255 });
    });

    it('should handle extra whitespace', () => {
      const result = parseOklch('  0.65   0.2   255  ');
      expect(result).toEqual({ l: 0.65, c: 0.2, h: 255 });
    });

    it('should throw error for invalid format', () => {
      expect(() => parseOklch('invalid')).toThrow('Invalid OKLCH string');
      expect(() => parseOklch('0.65 0.2')).toThrow('Invalid OKLCH string');
      expect(() => parseOklch('0.65 abc 255')).toThrow('Invalid OKLCH string');
    });

    it('should validate lightness range', () => {
      expect(() => parseOklch('-0.1 0.2 255')).toThrow('Lightness must be between 0 and 1');
      expect(() => parseOklch('1.5 0.2 255')).toThrow('Lightness must be between 0 and 1');
    });

    it('should validate chroma range', () => {
      expect(() => parseOklch('0.5 -0.1 255')).toThrow('Chroma must be positive');
    });

    it('should warn for unusual hue values', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      parseOklch('0.5 0.2 400');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Hue typically ranges 0-360 degrees')
      );
      consoleSpy.mockRestore();
    });
  });

  describe('toCSS', () => {
    it('should convert OKLCH object to CSS function', () => {
      const result = toCSS({ l: 0.65, c: 0.2, h: 255 });
      expect(result).toBe('oklch(0.65 0.2 255)');
    });

    it('should handle string input that is already CSS format', () => {
      const result = toCSS('oklch(0.65 0.2 255)');
      expect(result).toBe('oklch(0.65 0.2 255)');
    });

    it('should convert space-separated string to CSS format', () => {
      const result = toCSS('0.65 0.2 255');
      expect(result).toBe('oklch(0.65 0.2 255)');
    });
  });

  describe('toSpaceSeparated', () => {
    it('should convert OKLCH object to space-separated string', () => {
      const result = toSpaceSeparated({ l: 0.65, c: 0.2, h: 255 });
      expect(result).toBe('0.65 0.2 255');
    });
  });

  describe('adjustLightness', () => {
    it('should adjust lightness within bounds', () => {
      const result = adjustLightness('0.5 0.2 255', 0.2);
      expect(result).toBe('0.7 0.2 255');
    });

    it('should clamp to upper bound', () => {
      const result = adjustLightness('0.9 0.2 255', 0.2);
      expect(result).toBe('1 0.2 255');
    });

    it('should clamp to lower bound', () => {
      const result = adjustLightness('0.1 0.2 255', -0.2);
      expect(result).toBe('0 0.2 255');
    });

    it('should handle negative adjustments', () => {
      const result = adjustLightness('0.7 0.2 255', -0.2);
      const parsed = parseOklch(result);
      expect(parsed.l).toBeCloseTo(0.5, 10);
      expect(parsed.c).toBe(0.2);
      expect(parsed.h).toBe(255);
    });
  });

  describe('adjustChroma', () => {
    it('should adjust chroma correctly', () => {
      const result = adjustChroma('0.65 0.2 255', 0.1);
      const parsed = parseOklch(result);
      expect(parsed.l).toBe(0.65);
      expect(parsed.c).toBeCloseTo(0.3, 10);
      expect(parsed.h).toBe(255);
    });

    it('should handle negative adjustments', () => {
      const result = adjustChroma('0.65 0.3 255', -0.1);
      const parsed = parseOklch(result);
      expect(parsed.l).toBe(0.65);
      expect(parsed.c).toBeCloseTo(0.2, 10);
      expect(parsed.h).toBe(255);
    });

    it('should clamp to zero for excessive negative adjustment', () => {
      const result = adjustChroma('0.65 0.1 255', -0.2);
      expect(result).toBe('0.65 0 255');
    });
  });

  describe('rotateHue', () => {
    it('should rotate hue correctly', () => {
      const result = rotateHue('0.65 0.2 180', 90);
      expect(result).toBe('0.65 0.2 270');
    });

    it('should handle negative rotation', () => {
      const result = rotateHue('0.65 0.2 180', -90);
      expect(result).toBe('0.65 0.2 90');
    });

    it('should wrap around at 360 degrees', () => {
      const result = rotateHue('0.65 0.2 300', 90);
      expect(result).toBe('0.65 0.2 30');
    });

    it('should wrap around at 0 degrees', () => {
      const result = rotateHue('0.65 0.2 30', -90);
      expect(result).toBe('0.65 0.2 300');
    });
  });

  describe('lighten and darken', () => {
    it('should lighten color with default factor', () => {
      const result = lighten('0.5 0.2 255');
      expect(result).toBe('0.6 0.2 255');
    });

    it('should lighten color with custom factor', () => {
      const result = lighten('0.5 0.2 255', 0.2);
      expect(result).toBe('0.7 0.2 255');
    });

    it('should darken color with default factor', () => {
      const result = darken('0.5 0.2 255');
      expect(result).toBe('0.4 0.2 255');
    });

    it('should darken color with custom factor', () => {
      const result = darken('0.5 0.2 255', 0.2);
      expect(result).toBe('0.3 0.2 255');
    });
  });

  describe('saturate and desaturate', () => {
    it('should saturate color with default factor', () => {
      const result = saturate('0.65 0.2 255');
      expect(result).toBe('0.65 0.25 255');
    });

    it('should saturate color with custom factor', () => {
      const result = saturate('0.65 0.2 255', 0.1);
      const parsed = parseOklch(result);
      expect(parsed.l).toBe(0.65);
      expect(parsed.c).toBeCloseTo(0.3, 10);
      expect(parsed.h).toBe(255);
    });

    it('should desaturate color with default factor', () => {
      const result = desaturate('0.65 0.2 255');
      const parsed = parseOklch(result);
      expect(parsed.l).toBe(0.65);
      expect(parsed.c).toBeCloseTo(0.15, 10);
      expect(parsed.h).toBe(255);
    });

    it('should desaturate color with custom factor', () => {
      const result = desaturate('0.65 0.2 255', 0.1);
      expect(result).toBe('0.65 0.1 255');
    });
  });

  describe('generateColorScale', () => {
    it('should generate complete color scale', () => {
      const scale = generateColorScale('0.65 0.2 255');
      
      expect(scale).toHaveProperty('50');
      expect(scale).toHaveProperty('100');
      expect(scale).toHaveProperty('500'); // Base color
      expect(scale).toHaveProperty('900');
      expect(scale).toHaveProperty('950');
      
      // Base color should be unchanged
      expect(scale['500']).toBe('0.65 0.2 255');
      
      // Lighter variants should have higher lightness
      const lightVariant = parseOklch(scale['100']);
      expect(lightVariant.l).toBeGreaterThan(0.65);
      
      // Darker variants should have lower lightness
      const darkVariant = parseOklch(scale['900']);
      expect(darkVariant.l).toBeLessThan(0.65);
    });
  });

  describe('supportsOklch', () => {
    it('should return true when OKLCH is supported', () => {
      // CSS is already mocked in test setup to return true
      expect(supportsOklch()).toBe(true);
    });

    it('should return false when OKLCH is not supported', () => {
      const mockSupports = vi.fn().mockReturnValue(false);
      Object.defineProperty(window, 'CSS', {
        value: { supports: mockSupports },
        writable: true,
      });
      
      expect(supportsOklch()).toBe(false);
    });

    it('should return false when CSS.supports is not available', () => {
      Object.defineProperty(window, 'CSS', {
        value: undefined,
        writable: true,
      });
      expect(supportsOklch()).toBe(false);
    });

    it('should return false in server-side environment', () => {
      const originalWindow = global.window;
      delete (global as { window?: Window }).window;
      
      expect(supportsOklch()).toBe(false);
      
      global.window = originalWindow;
    });
  });

  describe('createColorToken', () => {
    it('should create color token with OKLCH and RGB fallback', () => {
      const token = createColorToken('0.65 0.2 255');
      
      expect(token).toEqual({
        value: '0.65 0.2 255',
        oklch: 'oklch(0.65 0.2 255)',
        rgb: expect.stringMatching(/rgb\(\d+, \d+, \d+\)/),
      });
    });
  });

  describe('getAccessibleForeground', () => {
    it('should return light foreground for dark background', () => {
      const result = getAccessibleForeground('0.2 0.1 255');
      expect(result).toBe('0.98 0.005 247.86');
    });

    it('should return dark foreground for light background', () => {
      const result = getAccessibleForeground('0.8 0.1 255');
      expect(result).toBe('0.13 0.013 247.86');
    });

    it('should use custom foreground colors', () => {
      const result = getAccessibleForeground(
        '0.2 0.1 255',
        'custom-light',
        'custom-dark'
      );
      expect(result).toBe('custom-light');
    });
  });

  describe('generateThemeColors', () => {
    it('should generate light theme colors', () => {
      const colors = generateThemeColors('0.65 0.2 255', false);
      
      expect(colors).toHaveProperty('primary');
      expect(colors).toHaveProperty('primaryForeground');
      expect(colors.primary).toBe('0.65 0.2 255');
    });

    it('should generate dark theme colors', () => {
      const colors = generateThemeColors('0.65 0.2 255', true);
      
      expect(colors).toHaveProperty('primary');
      expect(colors).toHaveProperty('primaryForeground');
      
      // Dark theme should lighten the primary color
      const primaryLightness = parseOklch(colors.primary).l;
      expect(primaryLightness).toBeGreaterThanOrEqual(0.65);
    });
  });

  describe('validateOklch', () => {
    it('should return valid OKLCH string unchanged', () => {
      const result = validateOklch('0.65 0.2 255');
      expect(result).toBe('0.65 0.2 255');
    });

    it('should clamp invalid lightness values', () => {
      const result1 = validateOklch('-0.1 0.2 255');
      expect(parseOklch(result1).l).toBe(0);
      
      const result2 = validateOklch('1.5 0.2 255');
      expect(parseOklch(result2).l).toBe(1);
    });

    it('should clamp negative chroma values', () => {
      const result = validateOklch('0.5 -0.1 255');
      expect(parseOklch(result).c).toBe(0);
    });

    it('should normalize hue values', () => {
      const result1 = validateOklch('0.5 0.2 400');
      expect(parseOklch(result1).h).toBe(40);
      
      const result2 = validateOklch('0.5 0.2 -30');
      expect(parseOklch(result2).h).toBe(330);
    });

    it('should return default color for completely invalid input', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const result = validateOklch('completely invalid');
      
      expect(result).toBe('0.5 0.1 250');
      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid OKLCH color: completely invalid, using default'
      );
      
      consoleSpy.mockRestore();
    });
  });
});