import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS v3 Configuration for Backwards Compatibility
 * This config provides fallback support for tools/plugins that require v3 format
 * while maintaining compatibility with our v4 CSS-first approach
 */
const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx,mdx}',
    './.storybook/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        // Semantic Colors
        background: 'oklch(var(--ui-color-background))',
        foreground: 'oklch(var(--ui-color-foreground))',

        primary: {
          DEFAULT: 'oklch(var(--ui-color-primary))',
          foreground: 'oklch(var(--ui-color-primary-foreground))',
        },

        secondary: {
          DEFAULT: 'oklch(var(--ui-color-secondary))',
          foreground: 'oklch(var(--ui-color-secondary-foreground))',
        },

        muted: {
          DEFAULT: 'oklch(var(--ui-color-muted))',
          foreground: 'oklch(var(--ui-color-muted-foreground))',
        },

        accent: {
          DEFAULT: 'oklch(var(--ui-color-accent))',
          foreground: 'oklch(var(--ui-color-accent-foreground))',
        },

        destructive: {
          DEFAULT: 'oklch(var(--ui-color-destructive))',
          foreground: 'oklch(var(--ui-color-destructive-foreground))',
        },

        border: 'oklch(var(--ui-color-border))',
        input: 'oklch(var(--ui-color-input))',
        ring: 'oklch(var(--ui-color-ring))',

        card: {
          DEFAULT: 'oklch(var(--ui-color-card))',
          foreground: 'oklch(var(--ui-color-card-foreground))',
        },

        popover: {
          DEFAULT: 'oklch(var(--ui-color-popover))',
          foreground: 'oklch(var(--ui-color-popover-foreground))',
        },

        // Gray Scale
        gray: {
          50: 'oklch(var(--ui-color-gray-50))',
          100: 'oklch(var(--ui-color-gray-100))',
          200: 'oklch(var(--ui-color-gray-200))',
          300: 'oklch(var(--ui-color-gray-300))',
          400: 'oklch(var(--ui-color-gray-400))',
          500: 'oklch(var(--ui-color-gray-500))',
          600: 'oklch(var(--ui-color-gray-600))',
          700: 'oklch(var(--ui-color-gray-700))',
          800: 'oklch(var(--ui-color-gray-800))',
          900: 'oklch(var(--ui-color-gray-900))',
          950: 'oklch(var(--ui-color-gray-950))',
        },

        // Status Colors
        success: 'var(--ui-color-success)',
        warning: 'oklch(var(--ui-color-warning))',
        error: 'oklch(var(--ui-color-error))',
        info: 'oklch(var(--ui-color-info))',
      },

      fontFamily: {
        sans: ['var(--ui-font-family-sans)'],
        mono: ['var(--ui-font-family-mono)'],
        serif: ['var(--ui-font-family-serif)'],
      },

      fontSize: {
        xs: [
          'var(--ui-font-size-xs)',
          { lineHeight: 'var(--ui-line-height-xs)', letterSpacing: 'var(--ui-letter-spacing-xs)' },
        ],
        sm: [
          'var(--ui-font-size-sm)',
          { lineHeight: 'var(--ui-line-height-sm)', letterSpacing: 'var(--ui-letter-spacing-sm)' },
        ],
        base: [
          'var(--ui-font-size-base)',
          {
            lineHeight: 'var(--ui-line-height-base)',
            letterSpacing: 'var(--ui-letter-spacing-base)',
          },
        ],
        lg: [
          'var(--ui-font-size-lg)',
          { lineHeight: 'var(--ui-line-height-lg)', letterSpacing: 'var(--ui-letter-spacing-lg)' },
        ],
        xl: [
          'var(--ui-font-size-xl)',
          { lineHeight: 'var(--ui-line-height-xl)', letterSpacing: 'var(--ui-letter-spacing-xl)' },
        ],
        '2xl': [
          'var(--ui-font-size-2xl)',
          {
            lineHeight: 'var(--ui-line-height-2xl)',
            letterSpacing: 'var(--ui-letter-spacing-2xl)',
          },
        ],
        '3xl': [
          'var(--ui-font-size-3xl)',
          {
            lineHeight: 'var(--ui-line-height-3xl)',
            letterSpacing: 'var(--ui-letter-spacing-3xl)',
          },
        ],
        '4xl': [
          'var(--ui-font-size-4xl)',
          {
            lineHeight: 'var(--ui-line-height-4xl)',
            letterSpacing: 'var(--ui-letter-spacing-4xl)',
          },
        ],
        '5xl': [
          'var(--ui-font-size-5xl)',
          {
            lineHeight: 'var(--ui-line-height-5xl)',
            letterSpacing: 'var(--ui-letter-spacing-5xl)',
          },
        ],
        '6xl': [
          'var(--ui-font-size-6xl)',
          {
            lineHeight: 'var(--ui-line-height-6xl)',
            letterSpacing: 'var(--ui-letter-spacing-6xl)',
          },
        ],
        '7xl': [
          'var(--ui-font-size-7xl)',
          {
            lineHeight: 'var(--ui-line-height-7xl)',
            letterSpacing: 'var(--ui-letter-spacing-7xl)',
          },
        ],
        '8xl': [
          'var(--ui-font-size-8xl)',
          {
            lineHeight: 'var(--ui-line-height-8xl)',
            letterSpacing: 'var(--ui-letter-spacing-8xl)',
          },
        ],
        '9xl': [
          'var(--ui-font-size-9xl)',
          {
            lineHeight: 'var(--ui-line-height-9xl)',
            letterSpacing: 'var(--ui-letter-spacing-9xl)',
          },
        ],
      },

      spacing: {
        '0.5': 'var(--ui-space-0_5)',
        '1.5': 'var(--ui-space-1_5)',
        '2.5': 'var(--ui-space-2_5)',
        '3.5': 'var(--ui-space-3_5)',
      },

      borderRadius: {
        lg: 'var(--ui-radius-lg)',
        md: 'var(--ui-radius-md)',
        sm: 'var(--ui-radius-sm)',
        none: 'var(--ui-radius-none)',
        xl: 'var(--ui-radius-xl)',
        '2xl': 'var(--ui-radius-2xl)',
        full: 'var(--ui-radius-full)',
      },

      boxShadow: {
        xs: 'var(--ui-shadow-xs)',
        sm: 'var(--ui-shadow-sm)',
        md: 'var(--ui-shadow-md)',
        lg: 'var(--ui-shadow-lg)',
        xl: 'var(--ui-shadow-xl)',
        '2xl': 'var(--ui-shadow-2xl)',
        inner: 'var(--ui-shadow-inner)',
        none: 'var(--ui-shadow-none)',
      },

      transitionDuration: {
        instant: 'var(--ui-duration-instant)',
        fast: 'var(--ui-duration-fast)',
        normal: 'var(--ui-duration-normal)',
        moderate: 'var(--ui-duration-moderate)',
        slow: 'var(--ui-duration-slow)',
        slower: 'var(--ui-duration-slower)',
        slowest: 'var(--ui-duration-slowest)',
      },

      transitionTimingFunction: {
        'ui-linear': 'var(--ui-easing-linear)',
        'ui-default': 'var(--ui-easing-default)',
        'ui-in': 'var(--ui-easing-in)',
        'ui-out': 'var(--ui-easing-out)',
        'ui-in-out': 'var(--ui-easing-in-out)',
        'ui-bounce': 'var(--ui-easing-bounce)',
        'ui-sharp': 'var(--ui-easing-sharp)',
        'ui-smooth': 'var(--ui-easing-smooth)',
        'ui-elastic': 'var(--ui-easing-elastic)',
      },

      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(1rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },

      animation: {
        'fade-in': 'fade-in var(--ui-duration-normal) var(--ui-easing-out)',
        'slide-up': 'slide-up var(--ui-duration-normal) var(--ui-easing-out)',
        'scale-in': 'scale-in var(--ui-duration-fast) var(--ui-easing-bounce)',
      },
    },
  },
  plugins: [
    // Add any v3-compatible plugins here if needed
  ],
  // Ensure CSS variables are preserved during purging
  // safelist: [
  //   {
  //     pattern: /^(bg-|text-|border-|shadow-|ring-|opacity-|scale-|rotate-|translate-)/,
  //   },
  // ],
};

export default config;
