/**
 * Storybook Performance Configuration
 * 
 * Advanced performance optimizations for GitHub Pages deployment
 * and development experience improvements.
 */

export interface PerformanceMetrics {
  buildStart: number;
  buildEnd?: number;
  bundleSize?: number;
  chunkCount?: number;
  loadTime?: number;
}

export interface PerformanceConfig {
  // Build optimization settings
  optimization: {
    splitChunks: boolean;
    minifyAssets: boolean;
    compressImages: boolean;
    inlineCSS: boolean;
    treeshake: boolean;
  };
  
  // Runtime performance monitoring
  monitoring: {
    logRenderTimes: boolean;
    trackBundleSize: boolean;
    enableWebVitals: boolean;
    reportThreshold: number; // ms
  };
  
  // GitHub Pages specific optimizations
  deployment: {
    enableCaching: boolean;
    optimizeImages: boolean;
    minifyHTML: boolean;
    gzipCompression: boolean;
  };
}

// Default configuration based on environment
export const getPerformanceConfig = (): PerformanceConfig => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = !isProduction;
  const isGitHubPages = process.env.STORYBOOK_BASE_PATH !== undefined;

  return {
    optimization: {
      splitChunks: true,
      minifyAssets: isProduction,
      compressImages: isProduction,
      inlineCSS: isGitHubPages, // Inline CSS for GitHub Pages
      treeshake: isProduction,
    },
    
    monitoring: {
      logRenderTimes: isDevelopment,
      trackBundleSize: true,
      enableWebVitals: isProduction,
      reportThreshold: isDevelopment ? 16 : 100, // 1 frame in dev, 100ms in prod
    },
    
    deployment: {
      enableCaching: isGitHubPages,
      optimizeImages: isProduction,
      minifyHTML: isProduction,
      gzipCompression: isGitHubPages,
    },
  };
};

// Performance monitoring utilities
export const performanceUtils = {
  /**
   * Measure component render time
   */
  measureRender: <T extends (...args: any[]) => any>(
    name: string,
    fn: T,
    threshold = 16
  ): T => {
    return ((...args: any[]) => {
      const start = performance.now();
      const result = fn(...args);
      const end = performance.now();
      const duration = end - start;

      if (duration > threshold) {
        console.warn(`⚡ ${name} render took ${duration.toFixed(2)}ms (threshold: ${threshold}ms)`);
      }

      return result;
    }) as T;
  },

  /**
   * Track bundle size metrics
   */
  trackBundleMetrics: (metrics: Partial<PerformanceMetrics>) => {
    if (typeof window !== 'undefined' && window.performance) {
      // Store metrics for analysis
      (window as any).__STORYBOOK_METRICS__ = {
        ...((window as any).__STORYBOOK_METRICS__ || {}),
        ...metrics,
        timestamp: Date.now(),
      };
    }
  },

  /**
   * Get current performance metrics
   */
  getMetrics: (): PerformanceMetrics | null => {
    if (typeof window !== 'undefined') {
      return (window as any).__STORYBOOK_METRICS__ || null;
    }
    return null;
  },

  /**
   * Log performance summary
   */
  logSummary: () => {
    const metrics = performanceUtils.getMetrics();
    if (metrics) {
      console.group('📊 Storybook Performance Summary');
      console.log('Build Time:', metrics.buildEnd ? `${metrics.buildEnd - metrics.buildStart}ms` : 'In progress');
      console.log('Bundle Size:', metrics.bundleSize ? `${(metrics.bundleSize / 1024).toFixed(2)}KB` : 'Unknown');
      console.log('Chunk Count:', metrics.chunkCount || 'Unknown');
      console.log('Load Time:', metrics.loadTime ? `${metrics.loadTime}ms` : 'Unknown');
      console.groupEnd();
    }
  },
};

// Web Vitals monitoring for production
export const initWebVitals = () => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
    return;
  }

  // Measure and report Core Web Vitals
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  }).catch(() => {
    // web-vitals not available, skip monitoring
  });
};

// Asset optimization utilities
export const assetUtils = {
  /**
   * Check if image should be optimized
   */
  shouldOptimizeImage: (filename: string): boolean => {
    const optimizableExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    return optimizableExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  },

  /**
   * Generate optimized image sizes
   */
  getOptimizedImageSizes: () => [375, 768, 1024, 1440, 1920],

  /**
   * Get cache headers for static assets
   */
  getCacheHeaders: (filename: string): Record<string, string> => {
    const isVersioned = filename.includes('-') && /[a-f0-9]{8}/.test(filename);
    
    if (isVersioned) {
      // Versioned assets can be cached for a long time
      return {
        'Cache-Control': 'public, max-age=31536000, immutable',
      };
    } else {
      // Non-versioned assets need revalidation
      return {
        'Cache-Control': 'public, max-age=3600, must-revalidate',
      };
    }
  },
};