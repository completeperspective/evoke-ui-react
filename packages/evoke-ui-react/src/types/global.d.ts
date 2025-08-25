/**
 * Global type definitions for CSS modules and other assets
 */

// CSS Modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

// CSS Files
declare module '*.css';
declare module '*.scss';
declare module '*.sass';

// Image assets
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

// Font assets
declare module '*.woff';
declare module '*.woff2';
declare module '*.eot';
declare module '*.ttf';
declare module '*.otf';

// Global test environment variables
declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

// Extend Node.js global for test environment
declare namespace NodeJS {
  interface Global {
    IS_REACT_ACT_ENVIRONMENT: boolean;
  }
}

// Also declare for globalThis
declare var IS_REACT_ACT_ENVIRONMENT: boolean;