#!/usr/bin/env node

/**
 * Build Performance Analysis Script
 * 
 * Analyzes Storybook build performance, bundle sizes, and optimization metrics
 * for GitHub Pages deployment optimization.
 */

import { readFileSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const storybookOutputDir = join(projectRoot, '../../storybook-static');

/**
 * ANSI color codes for better console output
 */
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bold: '\x1b[1m',
};

/**
 * Performance thresholds based on GitHub Pages optimization targets
 */
const PERFORMANCE_THRESHOLDS = {
  buildTime: 120000, // 2 minutes
  totalBundleSize: 5 * 1024 * 1024, // 5MB
  mainBundleSize: 1 * 1024 * 1024, // 1MB
  loadTime: 3000, // 3 seconds
  chunkCount: 50, // Maximum reasonable chunk count
};

/**
 * Utility functions
 */
const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatTime = (ms) => {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
};

const logSection = (title) => {
  console.log(`\\n${colors.bold}${colors.cyan}=== ${title} ===${colors.reset}`);
};

const logSuccess = (message) => {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
};

const logWarning = (message) => {
  console.log(`${colors.yellow}⚠${colors.reset} ${message}`);
};

const logError = (message) => {
  console.log(`${colors.red}✗${colors.reset} ${message}`);
};

const logInfo = (message) => {
  console.log(`${colors.blue}ℹ${colors.reset} ${message}`);
};

/**
 * Analyze directory size and file count
 */
function analyzeBuildOutput() {
  if (!existsSync(storybookOutputDir)) {
    logError(`Storybook build directory not found: ${storybookOutputDir}`);
    return null;
  }

  logSection('Build Output Analysis');

  let totalSize = 0;
  let fileCount = 0;
  const fileSizes = [];
  const largeFiles = [];

  function analyzeDirectory(dirPath) {
    try {
      const { readdirSync, statSync } = await import('fs');
      const items = readdirSync(dirPath);

      items.forEach(item => {
        const itemPath = join(dirPath, item);
        const stats = statSync(itemPath);

        if (stats.isDirectory()) {
          analyzeDirectory(itemPath);
        } else {
          const size = stats.size;
          totalSize += size;
          fileCount++;
          fileSizes.push({ path: itemPath.replace(storybookOutputDir, ''), size });

          // Track large files (>100KB)
          if (size > 100 * 1024) {
            largeFiles.push({ path: itemPath.replace(storybookOutputDir, ''), size });
          }
        }
      });
    } catch (error) {
      logWarning(`Error analyzing directory ${dirPath}: ${error.message}`);
    }
  }

  try {
    // Sync version for initial analysis
    const fs = require('fs');
    const items = fs.readdirSync(storybookOutputDir);

    const analyzeDirectorySync = (dirPath) => {
      const items = fs.readdirSync(dirPath);
      
      items.forEach(item => {
        const itemPath = join(dirPath, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
          analyzeDirectorySync(itemPath);
        } else {
          const size = stats.size;
          totalSize += size;
          fileCount++;
          fileSizes.push({ path: itemPath.replace(storybookOutputDir, ''), size });

          if (size > 100 * 1024) {
            largeFiles.push({ path: itemPath.replace(storybookOutputDir, ''), size });
          }
        }
      });
    };

    analyzeDirectorySync(storybookOutputDir);

    // Sort files by size (largest first)
    fileSizes.sort((a, b) => b.size - a.size);
    largeFiles.sort((a, b) => b.size - a.size);

    logInfo(`Total files: ${fileCount}`);
    logInfo(`Total size: ${formatBytes(totalSize)}`);

    // Check against thresholds
    if (totalSize > PERFORMANCE_THRESHOLDS.totalBundleSize) {
      logWarning(`Total bundle size (${formatBytes(totalSize)}) exceeds threshold (${formatBytes(PERFORMANCE_THRESHOLDS.totalBundleSize)})`);
    } else {
      logSuccess(`Total bundle size within threshold: ${formatBytes(totalSize)}`);
    }

    // Show largest files
    console.log(`\\n${colors.bold}Top 10 Largest Files:${colors.reset}`);
    fileSizes.slice(0, 10).forEach((file, index) => {
      const color = file.size > 500 * 1024 ? colors.red : 
                   file.size > 200 * 1024 ? colors.yellow : colors.green;
      console.log(`${index + 1}. ${color}${file.path}${colors.reset} - ${formatBytes(file.size)}`);
    });

    // Check for optimization opportunities
    console.log(`\\n${colors.bold}Optimization Opportunities:${colors.reset}`);
    
    const jsFiles = fileSizes.filter(f => f.path.endsWith('.js'));
    const cssFiles = fileSizes.filter(f => f.path.endsWith('.css'));
    const assetFiles = fileSizes.filter(f => /\\.(png|jpg|jpeg|svg|woff|woff2)$/.test(f.path));

    logInfo(`JavaScript files: ${jsFiles.length} (${formatBytes(jsFiles.reduce((sum, f) => sum + f.size, 0))})`);
    logInfo(`CSS files: ${cssFiles.length} (${formatBytes(cssFiles.reduce((sum, f) => sum + f.size, 0))})`);
    logInfo(`Asset files: ${assetFiles.length} (${formatBytes(assetFiles.reduce((sum, f) => sum + f.size, 0))})`);

    return {
      totalSize,
      fileCount,
      largeFiles,
      jsFiles: jsFiles.length,
      cssFiles: cssFiles.length,
      assetFiles: assetFiles.length,
    };
  } catch (error) {
    logError(`Error analyzing build output: ${error.message}`);
    return null;
  }
}

/**
 * Analyze bundle composition and chunks
 */
function analyzeBundleComposition(buildResults) {
  logSection('Bundle Composition Analysis');

  try {
    const assetManifest = join(storybookOutputDir, 'asset-manifest.json');
    const packageJson = join(projectRoot, 'package.json');

    // Read package.json for dependency analysis
    if (existsSync(packageJson)) {
      const pkg = JSON.parse(readFileSync(packageJson, 'utf8'));
      const deps = Object.keys(pkg.dependencies || {});
      const devDeps = Object.keys(pkg.devDependencies || {});

      logInfo(`Dependencies: ${deps.length}`);
      logInfo(`Dev Dependencies: ${devDeps.length}`);

      // Identify heavy dependencies
      const heavyDeps = [
        'react', 'react-dom', '@storybook/react', 
        'tailwindcss', '@radix-ui/themes'
      ].filter(dep => deps.includes(dep) || devDeps.includes(dep));

      if (heavyDeps.length > 0) {
        logInfo(`Heavy dependencies detected: ${heavyDeps.join(', ')}`);
        logInfo('Consider code splitting or dynamic imports for better performance');
      }
    }

    // Analyze HTML files for optimization
    const htmlFiles = ['index.html', 'iframe.html'].map(file => join(storybookOutputDir, file)).filter(existsSync);
    
    htmlFiles.forEach(htmlFile => {
      const htmlContent = readFileSync(htmlFile, 'utf8');
      const scripts = (htmlContent.match(/<script[^>]*>/g) || []).length;
      const stylesheets = (htmlContent.match(/<link[^>]*rel="stylesheet"[^>]*>/g) || []).length;
      const inlineStyles = (htmlContent.match(/<style[^>]*>/g) || []).length;

      const fileName = htmlFile.split('/').pop();
      logInfo(`${fileName}: ${scripts} scripts, ${stylesheets} stylesheets, ${inlineStyles} inline styles`);
    });

    return {
      htmlOptimized: true,
    };
  } catch (error) {
    logWarning(`Bundle composition analysis failed: ${error.message}`);
    return {};
  }
}

/**
 * Generate performance recommendations
 */
function generateRecommendations(buildResults, bundleResults) {
  logSection('Performance Recommendations');

  const recommendations = [];

  // Bundle size recommendations
  if (buildResults && buildResults.totalSize > PERFORMANCE_THRESHOLDS.totalBundleSize) {
    recommendations.push({
      type: 'critical',
      category: 'Bundle Size',
      message: `Reduce total bundle size from ${formatBytes(buildResults.totalSize)} to under ${formatBytes(PERFORMANCE_THRESHOLDS.totalBundleSize)}`,
      actions: [
        'Enable code splitting in Storybook configuration',
        'Use dynamic imports for large dependencies',
        'Implement tree shaking for unused code',
        'Consider lazy loading for non-critical stories',
      ],
    });
  }

  // Large file recommendations
  if (buildResults && buildResults.largeFiles.length > 0) {
    const veryLargeFiles = buildResults.largeFiles.filter(f => f.size > 500 * 1024);
    if (veryLargeFiles.length > 0) {
      recommendations.push({
        type: 'warning',
        category: 'Large Files',
        message: `${veryLargeFiles.length} files larger than 500KB detected`,
        actions: [
          'Compress large JavaScript files with better minification',
          'Optimize images and convert to WebP format',
          'Split large chunks into smaller, more focused bundles',
          'Use compression middleware for serving assets',
        ],
      });
    }
  }

  // Asset optimization recommendations
  if (buildResults) {
    recommendations.push({
      type: 'info',
      category: 'Asset Optimization',
      message: 'Implement advanced asset optimization strategies',
      actions: [
        'Enable Brotli compression for better compression than gzip',
        'Add service worker for caching static assets',
        'Implement lazy loading for images and non-critical resources',
        'Use responsive images with srcset for different screen sizes',
      ],
    });
  }

  // GitHub Pages specific recommendations
  recommendations.push({
    type: 'info',
    category: 'GitHub Pages Optimization',
    message: 'Optimize for GitHub Pages deployment',
    actions: [
      'Configure proper Cache-Control headers',
      'Implement preconnect hints for external resources',
      'Add structured data for better SEO',
      'Enable performance monitoring with Web Vitals',
    ],
  });

  // Display recommendations
  recommendations.forEach(rec => {
    const icon = rec.type === 'critical' ? '🚨' : rec.type === 'warning' ? '⚠️' : 'ℹ️';
    const color = rec.type === 'critical' ? colors.red : rec.type === 'warning' ? colors.yellow : colors.blue;
    
    console.log(`\\n${icon} ${color}${colors.bold}${rec.category}${colors.reset}`);
    console.log(`   ${rec.message}`);
    
    rec.actions.forEach(action => {
      console.log(`   ${colors.cyan}•${colors.reset} ${action}`);
    });
  });

  return recommendations;
}

/**
 * Generate performance report
 */
function generateReport(buildResults, bundleResults, recommendations) {
  logSection('Performance Report Summary');

  const report = {
    timestamp: new Date().toISOString(),
    buildResults,
    bundleResults,
    recommendations: recommendations.length,
    criticalIssues: recommendations.filter(r => r.type === 'critical').length,
    warnings: recommendations.filter(r => r.type === 'warning').length,
    suggestions: recommendations.filter(r => r.type === 'info').length,
  };

  // Overall score calculation (0-100)
  let score = 100;
  score -= report.criticalIssues * 30;
  score -= report.warnings * 15;
  score = Math.max(0, score);

  const scoreColor = score >= 80 ? colors.green : score >= 60 ? colors.yellow : colors.red;
  
  console.log(`\\n${colors.bold}Overall Performance Score: ${scoreColor}${score}/100${colors.reset}`);
  
  if (score >= 90) {
    logSuccess('Excellent! Your Storybook build is highly optimized for GitHub Pages');
  } else if (score >= 80) {
    logSuccess('Good! Minor optimizations could improve performance');
  } else if (score >= 60) {
    logWarning('Fair. Several optimizations recommended');
  } else {
    logError('Poor. Significant optimization work needed');
  }

  console.log(`\\n${colors.bold}Summary:${colors.reset}`);
  console.log(`• ${colors.red}Critical Issues:${colors.reset} ${report.criticalIssues}`);
  console.log(`• ${colors.yellow}Warnings:${colors.reset} ${report.warnings}`);
  console.log(`• ${colors.blue}Suggestions:${colors.reset} ${report.suggestions}`);

  if (buildResults) {
    console.log(`• ${colors.cyan}Total Size:${colors.reset} ${formatBytes(buildResults.totalSize)}`);
    console.log(`• ${colors.cyan}File Count:${colors.reset} ${buildResults.fileCount}`);
  }

  return report;
}

/**
 * Main execution function
 */
async function main() {
  console.log(`${colors.bold}${colors.magenta}📊 Storybook Build Performance Analysis${colors.reset}\\n`);
  
  const startTime = Date.now();
  
  try {
    // Analyze build output
    const buildResults = analyzeBuildOutput();
    
    // Analyze bundle composition
    const bundleResults = analyzeBundleComposition(buildResults);
    
    // Generate recommendations
    const recommendations = generateRecommendations(buildResults, bundleResults);
    
    // Generate final report
    const report = generateReport(buildResults, bundleResults, recommendations);
    
    const endTime = Date.now();
    const analysisTime = endTime - startTime;
    
    console.log(`\\n${colors.bold}Analysis completed in ${formatTime(analysisTime)}${colors.reset}`);
    
    // Exit with appropriate code
    const hasErrors = report.criticalIssues > 0;
    process.exit(hasErrors ? 1 : 0);
    
  } catch (error) {
    logError(`Analysis failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// Run the analysis
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  analyzeBuildOutput,
  analyzeBundleComposition,
  generateRecommendations,
  generateReport,
  PERFORMANCE_THRESHOLDS,
  formatBytes,
  formatTime,
};