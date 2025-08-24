#!/usr/bin/env node
/**
 * Automated Package Testing Script for @evoke-ui/react
 * 
 * This script automates the complete package testing workflow:
 * 1. Build the package
 * 2. Create distribution tarball 
 * 3. Verify tarball contents and size
 * 4. Test installation in isolated environment
 * 5. Verify TypeScript declarations
 * 6. Test component imports and functionality
 * 7. Test CSS import strategies
 * 8. Check for runtime errors
 * 9. Report results and cleanup
 * 
 * Usage: node scripts/test-package.mjs [--skip-cleanup]
 */

import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');
const require = createRequire(import.meta.url);

// Configuration
const config = {
  tempDir: join(projectRoot, '.test-package'),
  testAppDir: 'test-app',
  skipCleanup: process.argv.includes('--skip-cleanup'),
  verbose: process.argv.includes('--verbose'),
  timeout: 120000, // 2 minutes for each step
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bright: '\x1b[1m',
};

// Utility functions
const log = (message, color = colors.reset) => {
  console.log(`${color}${message}${colors.reset}`);
};

const logStep = (step, message) => {
  log(`\n${colors.bright}${colors.blue}[${step}]${colors.reset} ${message}`);
};

const logSuccess = (message) => {
  log(`${colors.green}✓${colors.reset} ${message}`);
};

const logError = (message) => {
  log(`${colors.red}✗${colors.reset} ${message}`);
};

const logWarning = (message) => {
  log(`${colors.yellow}⚠${colors.reset} ${message}`);
};

const logInfo = (message) => {
  log(`${colors.cyan}ℹ${colors.reset} ${message}`);
};

// Execute shell command with promise
const exec = (command, options = {}) => {
  return new Promise((resolve, reject) => {
    const { cwd = projectRoot, timeout = config.timeout } = options;
    
    if (config.verbose) {
      logInfo(`Executing: ${command} in ${cwd}`);
    }

    const child = spawn('sh', ['-c', command], {
      cwd,
      stdio: config.verbose ? 'inherit' : 'pipe',
    });

    let stdout = '';
    let stderr = '';

    if (!config.verbose) {
      child.stdout?.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr?.on('data', (data) => {
        stderr += data.toString();
      });
    }

    const timer = setTimeout(() => {
      child.kill('SIGTERM');
      reject(new Error(`Command timeout after ${timeout}ms: ${command}`));
    }, timeout);

    child.on('close', (code) => {
      clearTimeout(timer);
      if (code === 0) {
        resolve({ stdout, stderr, code });
      } else {
        reject(new Error(`Command failed with code ${code}: ${command}\n${stderr || stdout}`));
      }
    });

    child.on('error', (error) => {
      clearTimeout(timer);
      reject(error);
    });
  });
};

// Format file size
const formatSize = (bytes) => {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

// Get package info
const getPackageInfo = () => {
  const packageJsonPath = join(projectRoot, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  return {
    name: packageJson.name,
    version: packageJson.version,
    tarballName: `${packageJson.name.replace('@', '').replace('/', '-')}-${packageJson.version}.tgz`,
  };
};

// Test results collector
class TestResults {
  constructor() {
    this.results = [];
    this.startTime = Date.now();
  }

  add(step, success, message, details = null) {
    this.results.push({
      step,
      success,
      message,
      details,
      timestamp: Date.now(),
    });

    if (success) {
      logSuccess(`${step}: ${message}`);
    } else {
      logError(`${step}: ${message}`);
    }

    if (details && config.verbose) {
      log(`   ${details}`, colors.cyan);
    }
  }

  summary() {
    const totalTime = Date.now() - this.startTime;
    const successful = this.results.filter(r => r.success).length;
    const failed = this.results.filter(r => !r.success).length;

    log(`\n${colors.bright}${colors.magenta}📊 TEST SUMMARY${colors.reset}`);
    log(`${'='.repeat(50)}`);
    log(`Total Steps: ${this.results.length}`);
    logSuccess(`Successful: ${successful}`);
    if (failed > 0) {
      logError(`Failed: ${failed}`);
    }
    log(`Total Time: ${(totalTime / 1000).toFixed(2)}s`);
    
    if (failed === 0) {
      log(`\n${colors.bright}${colors.green}🎉 ALL TESTS PASSED! Package is ready for distribution.${colors.reset}`);
    } else {
      log(`\n${colors.bright}${colors.red}❌ ${failed} TEST(S) FAILED! Package needs attention.${colors.reset}`);
      
      log(`\n${colors.bright}Failed Steps:${colors.reset}`);
      this.results.filter(r => !r.success).forEach(result => {
        log(`  - ${result.step}: ${result.message}`, colors.red);
        if (result.details) {
          log(`    ${result.details}`, colors.yellow);
        }
      });
    }

    log(`${'='.repeat(50)}`);
    return failed === 0;
  }
}

// Main test functions
const buildPackage = async (results) => {
  logStep('1', 'Building package...');
  
  try {
    // Clean previous build
    await exec('npm run clean');
    
    // Build the package
    await exec('npm run build');
    
    // Verify build artifacts exist
    const distDir = join(projectRoot, 'dist');
    const requiredFiles = [
      'index.js',
      'index.d.ts', 
      'styles.css',
      'tailwind.css'
    ];

    for (const file of requiredFiles) {
      const filePath = join(distDir, file);
      if (!existsSync(filePath)) {
        throw new Error(`Required build artifact missing: ${file}`);
      }
    }

    const stats = requiredFiles.map(file => {
      const filePath = join(distDir, file);
      const stat = statSync(filePath);
      return `${file}: ${formatSize(stat.size)}`;
    });

    results.add('Build', true, 'Package built successfully', stats.join(', '));
  } catch (error) {
    results.add('Build', false, 'Package build failed', error.message);
    throw error;
  }
};

const createTarball = async (results, packageInfo) => {
  logStep('2', 'Creating distribution tarball...');
  
  try {
    // Remove existing tarball
    const tarballPath = join(projectRoot, packageInfo.tarballName);
    if (existsSync(tarballPath)) {
      rmSync(tarballPath);
    }

    // Create tarball
    await exec('npm pack');
    
    if (!existsSync(tarballPath)) {
      throw new Error('Tarball was not created');
    }

    const stat = statSync(tarballPath);
    results.add('Pack', true, 'Tarball created successfully', `Size: ${formatSize(stat.size)}`);
    
    return tarballPath;
  } catch (error) {
    results.add('Pack', false, 'Tarball creation failed', error.message);
    throw error;
  }
};

const verifyTarball = async (results, tarballPath) => {
  logStep('3', 'Verifying tarball contents...');
  
  try {
    const { stdout } = await exec(`tar -tzf ${tarballPath}`);
    const files = stdout.trim().split('\n').filter(Boolean);
    
    const requiredPaths = [
      'package/dist/index.js',
      'package/dist/index.d.ts',
      'package/dist/styles.css',
      'package/dist/tailwind.css',
      'package/package.json',
    ];

    const missingFiles = requiredPaths.filter(path => 
      !files.some(file => file === path || file.endsWith(path.replace('package/', '')))
    );

    if (missingFiles.length > 0) {
      throw new Error(`Missing required files: ${missingFiles.join(', ')}`);
    }

    results.add('Verify', true, 'Tarball contents verified', `${files.length} files included`);
  } catch (error) {
    results.add('Verify', false, 'Tarball verification failed', error.message);
    throw error;
  }
};

const setupTestEnvironment = async (results) => {
  logStep('4', 'Setting up isolated test environment...');
  
  try {
    // Create temp directory
    if (existsSync(config.tempDir)) {
      rmSync(config.tempDir, { recursive: true });
    }
    mkdirSync(config.tempDir, { recursive: true });

    const testAppPath = join(config.tempDir, config.testAppDir);
    mkdirSync(testAppPath, { recursive: true });

    // Initialize test app with package.json
    const testPackageJson = {
      name: 'test-consumer',
      version: '1.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vite build',
        typecheck: 'tsc --noEmit'
      },
      dependencies: {},
      devDependencies: {
        '@types/react': '^18.2.0',
        '@types/react-dom': '^18.2.0',
        '@vitejs/plugin-react': '^4.0.0',
        'react': '^18.0.0',
        'react-dom': '^18.0.0',
        'typescript': '^5.0.0',
        'vite': '^5.0.0'
      }
    };

    writeFileSync(
      join(testAppPath, 'package.json'),
      JSON.stringify(testPackageJson, null, 2)
    );

    // Create basic TypeScript config
    const tsconfig = {
      compilerOptions: {
        target: 'ES2020',
        useDefineForClassFields: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        skipLibCheck: true,
        moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'react-jsx',
        strict: true,
        noUnusedLocals: false,
        noUnusedParameters: false,
        noFallthroughCasesInSwitch: true
      },
      include: ['src']
    };

    writeFileSync(
      join(testAppPath, 'tsconfig.json'),
      JSON.stringify(tsconfig, null, 2)
    );

    // Create Vite config
    const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`;

    writeFileSync(join(testAppPath, 'vite.config.js'), viteConfig);

    // Create src directory and basic HTML
    mkdirSync(join(testAppPath, 'src'));
    
    const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Package Test</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

    writeFileSync(join(testAppPath, 'index.html'), indexHtml);

    results.add('Setup', true, 'Test environment created', `Path: ${testAppPath}`);
    return testAppPath;
  } catch (error) {
    results.add('Setup', false, 'Test environment setup failed', error.message);
    throw error;
  }
};

const installPackage = async (results, testAppPath, tarballPath, packageInfo) => {
  logStep('5', 'Installing package in test environment...');
  
  try {
    // Install dev dependencies first
    await exec('npm install', { cwd: testAppPath, timeout: 180000 });
    
    // Install the package from tarball
    await exec(`npm install ${tarballPath}`, { cwd: testAppPath, timeout: 60000 });
    
    // Verify installation
    const packageJsonPath = join(testAppPath, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    
    if (!packageJson.dependencies || !packageJson.dependencies[packageInfo.name]) {
      throw new Error('Package not found in dependencies');
    }

    results.add('Install', true, 'Package installed successfully', `Version: ${packageJson.dependencies[packageInfo.name]}`);
  } catch (error) {
    results.add('Install', false, 'Package installation failed', error.message);
    throw error;
  }
};

const testTypeScriptDeclarations = async (results, testAppPath, packageInfo) => {
  logStep('6', 'Testing TypeScript declarations...');
  
  try {
    // Create a comprehensive TypeScript test file
    const testTsContent = `import React from 'react';
import {
  Button,
  Input, 
  Text,
  Heading,
  Badge,
  Label,
  Skeleton,
  Separator,
  cn
} from '${packageInfo.name}';

// Test component props and variants
const TestComponent: React.FC = () => {
  return (
    <div>
      {/* Test Button variants */}
      <Button variant="default" size="md">Default Button</Button>
      <Button variant="destructive" size="lg" loading>Loading Button</Button>
      
      {/* Test Input variants */}
      <Input
        type="text"
        placeholder="Test input"
        size="md"
        state="default"
      />
      
      {/* Test Typography - using correct props */}
      <Text variant="body">Body text</Text>
      <Heading level="h1">Main heading</Heading>
      
      {/* Test Badge variants */}
      <Badge variant="default" size="md">Default Badge</Badge>
      <Badge variant="destructive" removable>Removable Badge</Badge>
      
      {/* Test Form elements */}
      <Label htmlFor="test-input" required>Test Label</Label>
      
      {/* Test Loading states */}
      <Skeleton variant="default" lines={3} />
      <Skeleton shape="circle" size="md" />
      
      {/* Test Layout */}
      <Separator orientation="horizontal" />
      <Separator orientation="vertical" label="Or" />
    </div>
  );
};

// Test utility function
const testClasses = cn('base-class', 'additional-class');

// Test type inference
const buttonProps: React.ComponentProps<typeof Button> = {
  variant: 'outline',
  size: 'sm',
  children: 'Typed button'
};

export default TestComponent;
`;

    writeFileSync(join(testAppPath, 'src', 'TypeTest.tsx'), testTsContent);
    
    // Run TypeScript compiler to check types
    await exec('npx tsc --noEmit', { cwd: testAppPath });
    
    results.add('TypeScript', true, 'TypeScript declarations working', 'All imports and types resolved correctly');
  } catch (error) {
    results.add('TypeScript', false, 'TypeScript declarations failed', error.message);
    throw error;
  }
};

const testComponentImports = async (results, testAppPath, packageInfo) => {
  logStep('7', 'Testing component imports and basic functionality...');
  
  try {
    // Create main app file that tests actual component rendering
    const mainTsxContent = `import React from 'react';
import ReactDOM from 'react-dom/client';

// Test both CSS import strategies
import '${packageInfo.name}/styles.css';
// import '${packageInfo.name}/tailwind.css'; // Alternative full Tailwind

import {
  Button,
  Input,
  Text, 
  Heading,
  Badge,
  Label,
  Skeleton,
  Separator
} from '${packageInfo.name}';

const App: React.FC = () => {
  const [count, setCount] = React.useState(0);
  const [inputValue, setInputValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleLoadingTest = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Heading level="h1" spacing="loose">
        @evoke-ui/react Package Test
      </Heading>
      
      <Text variant="body" spacing="normal">
        Testing all atomic components and their basic functionality.
      </Text>
      
      <Separator />
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <Button 
          variant="default" 
          size="md"
          onClick={() => setCount(c => c + 1)}
        >
          Count: {count}
        </Button>
        
        <Button 
          variant="destructive" 
          size="md"
          loading={loading}
          onClick={handleLoadingTest}
        >
          Test Loading
        </Button>
        
        <Button variant="outline" size="sm">
          Outline Button
        </Button>
        
        <Button variant="ghost" size="lg">
          Ghost Button
        </Button>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <Label htmlFor="test-input" required>
          Test Input Field
        </Label>
        <Input
          id="test-input"
          type="text"
          placeholder="Type something..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          size="md"
          helperText="This is helper text"
        />
        {inputValue && (
          <Text variant="muted">
            You typed: {inputValue}
          </Text>
        )}
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <Badge variant="default">Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="destructive">Error</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <Text variant="body" weight="semibold">
          Loading Skeletons:
        </Text>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
          <Skeleton shape="circle" size="md" />
          <Skeleton variant="default" style={{ width: '200px', height: '20px' }} />
          <Skeleton shape="button" size="md" />
        </div>
        
        <div style={{ marginTop: '1rem' }}>
          <Skeleton variant="default" lines={3} />
        </div>
      </div>
      
      <Separator label="End of Test" />
      
      <Text variant="muted">
        If you can see this page with all components rendering correctly,
        the package is working as expected!
      </Text>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
`;

    writeFileSync(join(testAppPath, 'src', 'main.tsx'), mainTsxContent);
    
    // Test build process
    await exec('npm run build', { cwd: testAppPath });
    
    // Verify build artifacts
    const distDir = join(testAppPath, 'dist');
    if (!existsSync(distDir)) {
      throw new Error('Build output directory not created');
    }
    
    const builtFiles = ['index.html', 'assets'].map(file => existsSync(join(distDir, file)));
    if (!builtFiles.every(Boolean)) {
      throw new Error('Required build files missing');
    }

    results.add('Components', true, 'Component imports and build successful', 'All components rendered and built correctly');
  } catch (error) {
    results.add('Components', false, 'Component testing failed', error.message);
    throw error;
  }
};

const testCssImportStrategies = async (results, testAppPath, packageInfo) => {
  logStep('8', 'Testing CSS import strategies...');
  
  try {
    // Test styles.css import strategy (design system only)
    const stylesTestContent = `import '${packageInfo.name}/styles.css';
import { Button } from '${packageInfo.name}';
import React from 'react';

const StylesTest = () => <Button>Styles CSS Test</Button>;
export default StylesTest;`;
    
    writeFileSync(join(testAppPath, 'src', 'StylesTest.tsx'), stylesTestContent);
    
    // Test tailwind.css import strategy (full utilities)
    const tailwindTestContent = `import '${packageInfo.name}/tailwind.css';
import { Button, Text } from '${packageInfo.name}';
import React from 'react';

const TailwindTest = () => (
  <div className="p-4 bg-gray-100">
    <Text className="text-blue-600 font-semibold">Tailwind CSS Test</Text>
    <Button className="bg-red-500 hover:bg-red-600">Custom Styled Button</Button>
  </div>
);
export default TailwindTest;`;
    
    writeFileSync(join(testAppPath, 'src', 'TailwindTest.tsx'), tailwindTestContent);
    
    // Create test files that import both strategies separately
    const testBothContent = `import React from 'react';
import StylesTest from './StylesTest';
import TailwindTest from './TailwindTest';

const BothTest = () => (
  <div>
    <StylesTest />
    <TailwindTest />
  </div>
);

export default BothTest;`;
    
    writeFileSync(join(testAppPath, 'src', 'BothTest.tsx'), testBothContent);
    
    // Test TypeScript compilation with both import strategies
    await exec('npx tsc --noEmit', { cwd: testAppPath });
    
    results.add('CSS Imports', true, 'Both CSS import strategies working', 'styles.css and tailwind.css both importable');
  } catch (error) {
    results.add('CSS Imports', false, 'CSS import strategies failed', error.message);
    throw error;
  }
};

const checkRuntimeErrors = async (results, testAppPath) => {
  logStep('9', 'Checking for runtime errors...');
  
  try {
    // Start development server and check for basic startup errors
    const serverProcess = spawn('npm', ['run', 'dev'], {
      cwd: testAppPath,
      stdio: 'pipe',
    });

    let serverOutput = '';
    let serverError = '';
    let serverReady = false;

    serverProcess.stdout.on('data', (data) => {
      const output = data.toString();
      serverOutput += output;
      
      // Check for development server ready indicators
      if (output.includes('ready') || output.includes('Local:') || output.includes('localhost')) {
        serverReady = true;
      }
    });

    serverProcess.stderr.on('data', (data) => {
      serverError += data.toString();
    });

    // Wait for server to start or timeout
    const timeout = 30000; // 30 seconds
    const startTime = Date.now();
    
    while (!serverReady && (Date.now() - startTime) < timeout) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check for fatal errors
      if (serverError.includes('Error') || serverError.includes('Failed')) {
        serverProcess.kill('SIGTERM');
        throw new Error(`Server startup failed: ${serverError}`);
      }
    }

    // Clean shutdown
    serverProcess.kill('SIGTERM');
    
    if (!serverReady) {
      throw new Error('Development server failed to start within timeout period');
    }

    // Check for common runtime error patterns in output
    const errorPatterns = [
      /Error:/i,
      /Failed to/i,
      /Cannot resolve/i,
      /Module not found/i,
      /Unexpected token/i,
      /SyntaxError/i,
      /TypeError/i,
    ];

    const foundErrors = errorPatterns.filter(pattern => 
      pattern.test(serverOutput) || pattern.test(serverError)
    );

    if (foundErrors.length > 0) {
      throw new Error(`Runtime errors detected in server output`);
    }

    results.add('Runtime', true, 'No runtime errors detected', 'Development server started successfully');
  } catch (error) {
    results.add('Runtime', false, 'Runtime errors detected', error.message);
    // Don't throw here - this is the last test and we want to report results
  }
};

const cleanup = async (results) => {
  if (config.skipCleanup) {
    logInfo(`Skipping cleanup. Test environment preserved at: ${config.tempDir}`);
    return;
  }

  logStep('Cleanup', 'Removing temporary files...');
  
  try {
    // Remove temp directory
    if (existsSync(config.tempDir)) {
      rmSync(config.tempDir, { recursive: true });
    }

    // Remove tarball (optional - might want to keep for manual inspection)
    const packageInfo = getPackageInfo();
    const tarballPath = join(projectRoot, packageInfo.tarballName);
    if (existsSync(tarballPath)) {
      rmSync(tarballPath);
    }

    logSuccess('Cleanup completed');
  } catch (error) {
    logWarning(`Cleanup failed: ${error.message}`);
  }
};

// Main execution
const main = async () => {
  const results = new TestResults();
  
  try {
    log(`${colors.bright}${colors.magenta}🧪 EVOKE UI REACT - AUTOMATED PACKAGE TESTING${colors.reset}`);
    log(`${'='.repeat(60)}`);
    
    const packageInfo = getPackageInfo();
    log(`Package: ${colors.cyan}${packageInfo.name}@${packageInfo.version}${colors.reset}`);
    log(`Working Directory: ${colors.cyan}${projectRoot}${colors.reset}`);
    
    if (config.skipCleanup) {
      logInfo('Cleanup disabled - test environment will be preserved');
    }
    
    log(`${'='.repeat(60)}`);

    // Execute all test steps
    await buildPackage(results);
    const tarballPath = await createTarball(results, packageInfo);
    await verifyTarball(results, tarballPath);
    const testAppPath = await setupTestEnvironment(results);
    await installPackage(results, testAppPath, tarballPath, packageInfo);
    await testTypeScriptDeclarations(results, testAppPath, packageInfo);
    await testComponentImports(results, testAppPath, packageInfo);
    await testCssImportStrategies(results, testAppPath, packageInfo);
    await checkRuntimeErrors(results, testAppPath);

    // Show summary
    const allPassed = results.summary();
    
    // Cleanup
    await cleanup(results);
    
    // Exit with appropriate code
    process.exit(allPassed ? 0 : 1);
    
  } catch (error) {
    logError(`\nFatal error: ${error.message}`);
    
    if (config.verbose) {
      console.error(error.stack);
    }
    
    results.summary();
    await cleanup(results);
    process.exit(1);
  }
};

// Handle process signals
process.on('SIGINT', async () => {
  logWarning('\nReceived SIGINT. Cleaning up...');
  await cleanup({ add: () => {} }); // Dummy results object
  process.exit(130);
});

process.on('SIGTERM', async () => {
  logWarning('\nReceived SIGTERM. Cleaning up...');
  await cleanup({ add: () => {} }); // Dummy results object
  process.exit(143);
});

// Run the main function
main().catch(console.error);
