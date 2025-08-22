/**
 * Motion Design Tokens
 * Animation duration, easing, and timing for consistent motion language
 */

/**
 * Animation Duration Scale
 * Based on human perception and interaction patterns
 */
export const duration = {
  /** 75ms - Instant feedback for micro-interactions */
  instant: '75ms',

  /** 150ms - Fast transitions for hover states and toggles */
  fast: '150ms',

  /** 250ms - Standard UI transitions (default) */
  normal: '250ms',

  /** 350ms - Moderate transitions for content changes */
  moderate: '350ms',

  /** 500ms - Slow transitions for major layout changes */
  slow: '500ms',

  /** 750ms - Extra slow for complex animations */
  slower: '750ms',

  /** 1000ms - Very slow for dramatic effects */
  slowest: '1000ms',
} as const;

/**
 * Easing Functions
 * Bezier curves for natural motion feel
 */
export const easing = {
  /** Linear - No acceleration (rarely used) */
  linear: 'linear',

  /** Default - Subtle ease for most UI interactions */
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',

  /** Ease In - Acceleration from rest */
  in: 'cubic-bezier(0.4, 0, 1, 1)',

  /** Ease Out - Deceleration to rest */
  out: 'cubic-bezier(0, 0, 0.2, 1)',

  /** Ease In Out - Acceleration then deceleration */
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

  /** Bounce - Playful overshoot effect */
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  /** Sharp - Quick, decisive motion */
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',

  /** Smooth - Gentle, flowing motion */
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',

  /** Elastic - Spring-like motion */
  elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

/**
 * Semantic Animation Presets
 * Common motion patterns for specific interactions
 */
export const presets = {
  /** Button hover and focus states */
  button: {
    duration: duration.fast,
    easing: easing.out,
  },

  /** Modal/dialog enter/exit */
  modal: {
    duration: duration.normal,
    easing: easing.default,
  },

  /** Dropdown/menu reveal */
  dropdown: {
    duration: duration.fast,
    easing: easing.out,
  },

  /** Page transitions */
  page: {
    duration: duration.moderate,
    easing: easing.smooth,
  },

  /** Tooltip appearance */
  tooltip: {
    duration: duration.fast,
    easing: easing.sharp,
  },

  /** Loading spinner */
  spinner: {
    duration: duration.slowest,
    easing: easing.linear,
  },

  /** Accordion expand/collapse */
  accordion: {
    duration: duration.normal,
    easing: easing.smooth,
  },

  /** Tab switching */
  tabs: {
    duration: duration.fast,
    easing: easing.default,
  },

  /** Form validation feedback */
  validation: {
    duration: duration.moderate,
    easing: easing.bounce,
  },

  /** Notification slide in */
  notification: {
    duration: duration.normal,
    easing: easing.elastic,
  },
} as const;

/**
 * CSS Custom Properties for Motion
 * Ready-to-use CSS variables for animations
 */
export const css = {
  duration: {
    '--motion-duration-instant': duration.instant,
    '--motion-duration-fast': duration.fast,
    '--motion-duration-normal': duration.normal,
    '--motion-duration-moderate': duration.moderate,
    '--motion-duration-slow': duration.slow,
    '--motion-duration-slower': duration.slower,
    '--motion-duration-slowest': duration.slowest,
  },

  easing: {
    '--motion-easing-linear': easing.linear,
    '--motion-easing-default': easing.default,
    '--motion-easing-in': easing.in,
    '--motion-easing-out': easing.out,
    '--motion-easing-in-out': easing.inOut,
    '--motion-easing-bounce': easing.bounce,
    '--motion-easing-sharp': easing.sharp,
    '--motion-easing-smooth': easing.smooth,
    '--motion-easing-elastic': easing.elastic,
  },
} as const;

/**
 * Animation Keyframes
 * Common animation patterns
 */
export const keyframes = {
  /** Fade in/out */
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },

  fadeOut: {
    '0%': { opacity: '1' },
    '100%': { opacity: '0' },
  },

  /** Slide animations */
  slideInUp: {
    '0%': { transform: 'translateY(100%)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },

  slideInDown: {
    '0%': { transform: 'translateY(-100%)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },

  slideInLeft: {
    '0%': { transform: 'translateX(-100%)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },

  slideInRight: {
    '0%': { transform: 'translateX(100%)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },

  /** Scale animations */
  scaleIn: {
    '0%': { transform: 'scale(0.8)', opacity: '0' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },

  scaleOut: {
    '0%': { transform: 'scale(1)', opacity: '1' },
    '100%': { transform: 'scale(0.8)', opacity: '0' },
  },

  /** Rotate animations */
  spin: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },

  /** Pulse animation */
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' },
  },

  /** Bounce animation */
  bounce: {
    '0%, 100%': {
      transform: 'translateY(-25%)',
      animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
    },
    '50%': {
      transform: 'translateY(0)',
      animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
} as const;

/**
 * Reduced Motion Preferences
 * Respect user accessibility preferences
 */
export const reducedMotion = {
  /** Safe animations for users who prefer reduced motion */
  safe: {
    duration: duration.instant,
    easing: easing.linear,
    transform: 'none',
  },

  /** Query for detecting reduced motion preference */
  mediaQuery: '(prefers-reduced-motion: reduce)',
} as const;

/**
 * Complete motion system export
 */
export const motion = {
  duration,
  easing,
  presets,
  css,
  keyframes,
  reducedMotion,
} as const;

export default motion;
