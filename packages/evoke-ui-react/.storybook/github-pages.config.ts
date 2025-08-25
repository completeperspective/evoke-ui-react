/**
 * GitHub Pages Deployment Configuration
 * 
 * Specialized configuration for optimal GitHub Pages deployment
 * with proper asset handling, caching, and performance optimization.
 */

import { resolve } from 'path';

export interface GitHubPagesConfig {
  basePath: string;
  assetPath: string;
  optimizations: {
    enableCompression: boolean;
    enableCaching: boolean;
    minifyAssets: boolean;
    inlineSmallAssets: boolean;
    generateServiceWorker: boolean;
  };
  seo: {
    enableSitemap: boolean;
    enableRobots: boolean;
    enableMetaTags: boolean;
  };
  analytics: {
    enableGoogleAnalytics: boolean;
    trackingId?: string;
  };
}

/**
 * Get GitHub Pages configuration based on environment
 */
export const getGitHubPagesConfig = (): GitHubPagesConfig => {
  const basePath = process.env.STORYBOOK_BASE_PATH || '/';
  const isPRPreview = Boolean(process.env.STORYBOOK_PR_NUMBER);
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    basePath,
    assetPath: `${basePath}assets/`,
    
    optimizations: {
      enableCompression: true,
      enableCaching: !isPRPreview, // Don't cache PR previews
      minifyAssets: isProduction,
      inlineSmallAssets: true, // Inline assets < 8KB
      generateServiceWorker: !isPRPreview && isProduction,
    },
    
    seo: {
      enableSitemap: !isPRPreview,
      enableRobots: !isPRPreview,
      enableMetaTags: true,
    },
    
    analytics: {
      enableGoogleAnalytics: !isPRPreview && isProduction,
      trackingId: process.env.STORYBOOK_GA_TRACKING_ID,
    },
  };
};

/**
 * Generate HTML meta tags for GitHub Pages
 */
export const generateMetaTags = (config: GitHubPagesConfig) => {
  const isPRPreview = Boolean(process.env.STORYBOOK_PR_NUMBER);
  const prNumber = process.env.STORYBOOK_PR_NUMBER;
  const version = require('../package.json').version;

  const baseTags = `
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Evoke UI React Component Library - Production-ready, themable components built on shadcn/ui with OKLCH color space and runtime theming" />
    <meta name="keywords" content="react, component-library, design-system, tailwindcss, storybook, evoke-ui, oklch, theming, shadcn" />
    <meta name="author" content="Evoke UI Team" />
    <meta name="version" content="${version}" />
    <meta name="build-time" content="${new Date().toISOString()}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${isPRPreview ? `PR #${prNumber} Preview - ` : ''}Evoke UI - React Component Library" />
    <meta property="og:description" content="Production-ready, themable React components with OKLCH color space and runtime theming" />
    <meta property="og:site_name" content="Evoke UI" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${isPRPreview ? `PR #${prNumber} Preview - ` : ''}Evoke UI" />
    <meta name="twitter:description" content="Production-ready React component library with OKLCH theming" />
    
    <!-- Performance hints -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    <link rel="dns-prefetch" href="//fonts.gstatic.com" />
    
    <!-- Favicon and icons -->
    <link rel="icon" type="image/svg+xml" href="${config.basePath}favicon.svg" />
    <link rel="icon" type="image/png" href="${config.basePath}favicon.png" />
    
    <!-- Theme color -->
    <meta name="theme-color" content="#d946ef" />
    <meta name="msapplication-TileColor" content="#d946ef" />
  `;

  const prTags = isPRPreview ? `
    <meta name="robots" content="noindex, nofollow" />
    <meta name="storybook-pr-number" content="${prNumber}" />
    <meta name="storybook-pr-branch" content="${process.env.STORYBOOK_PR_BRANCH}" />
  ` : `
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://evoke-ui.github.io/" />
  `;

  const analyticsTags = config.analytics.enableGoogleAnalytics && config.analytics.trackingId ? `
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${config.analytics.trackingId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${config.analytics.trackingId}');
    </script>
  ` : '';

  return baseTags + prTags + analyticsTags;
};

/**
 * Generate robots.txt content
 */
export const generateRobotsTxt = (config: GitHubPagesConfig): string => {
  const isPRPreview = Boolean(process.env.STORYBOOK_PR_NUMBER);
  
  if (isPRPreview) {
    return `User-agent: *\nDisallow: /`;
  }
  
  return `
User-agent: *
Allow: /

Sitemap: ${config.basePath}sitemap.xml

# Crawl-delay for better performance
Crawl-delay: 1

# Disallow development and build artifacts
Disallow: /node_modules/
Disallow: /.git/
Disallow: /dist/
Disallow: /coverage/
  `.trim();
};

/**
 * Generate sitemap.xml content
 */
export const generateSitemap = (config: GitHubPagesConfig): string => {
  const baseUrl = 'https://evoke-ui.github.io';
  const fullBaseUrl = `${baseUrl}${config.basePath}`;
  const now = new Date().toISOString();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- Main pages -->
  <url>
    <loc>${fullBaseUrl}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Component documentation -->
  <url>
    <loc>${fullBaseUrl}?path=/docs/atoms-button--docs</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${fullBaseUrl}?path=/docs/molecules-card--docs</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Design system -->
  <url>
    <loc>${fullBaseUrl}?path=/docs/design-system-color-tokens--docs</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
</urlset>`.trim();
};

/**
 * Asset optimization utilities for GitHub Pages
 */
export const assetOptimization = {
  /**
   * Check if asset should be inlined
   */
  shouldInlineAsset: (size: number, type: string): boolean => {
    const inlineThreshold = 8192; // 8KB
    const inlineableTypes = ['image/svg+xml', 'text/css', 'application/javascript'];
    
    return size <= inlineThreshold && inlineableTypes.some(t => type.includes(t));
  },

  /**
   * Generate cache control headers
   */
  getCacheHeaders: (filename: string): Record<string, string> => {
    // Versioned assets (contain hash) can be cached for a year
    if (/\-[a-f0-9]{8,}\./.test(filename)) {
      return {
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      };
    }
    
    // HTML files should revalidate more frequently
    if (filename.endsWith('.html')) {
      return {
        'Cache-Control': 'public, max-age=3600, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
      };
    }
    
    // Other assets cache for a day
    return {
      'Cache-Control': 'public, max-age=86400, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
    };
  },

  /**
   * Optimize image loading with lazy loading and responsive images
   */
  optimizeImage: (src: string, alt: string, sizes?: string): string => {
    const config = getGitHubPagesConfig();
    
    return `<img 
      src="${config.assetPath}${src}" 
      alt="${alt}"
      loading="lazy"
      decoding="async"
      ${sizes ? `sizes="${sizes}"` : ''}
      style="max-width: 100%; height: auto;"
    />`;
  },

  /**
   * Generate WebP variants for images
   */
  generateWebPVariants: (originalPath: string): string[] => {
    const variants = [375, 768, 1024, 1440, 1920];
    const baseName = originalPath.replace(/\.[^.]+$/, '');
    
    return variants.map(width => `${baseName}-${width}w.webp`);
  },
};