# CI/CD Troubleshooting Guide

Complete troubleshooting guide for GitHub Actions workflows, common issues, and resolution procedures.

## 🚨 Common Issues & Solutions

### 1. Node.js Version Compatibility

**Issue**: Storybook 8 build failures with Node.js 18
```
Error: The engine "node" is incompatible with this module. Expected version ">=20.0.0"
```

**Root Cause**: Storybook 8+ requires Node.js 20+

**Solution**:
```yaml
# Update all workflows to use Node.js 22
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '22'  # Changed from '18'
    cache: 'pnpm'
```

**Files Updated**:
- `.github/workflows/ci.yml`
- `.github/workflows/deploy-storybook.yml`
- `.github/workflows/pr-preview.yml`
- `package.json` engines field

### 2. PNPM Configuration Issues

**Issue**: PNPM not found in GitHub Actions
```
Unable to locate executable file: pnpm
```

**Root Cause**: Incorrect workflow step ordering or cache configuration

**Solution**:
```yaml
# Correct order: pnpm setup BEFORE Node.js setup
- name: Setup pnpm
  uses: pnpm/action-setup@v4
  with:
    run_install: false  # Use packageManager from package.json

- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '22'
    cache: 'pnpm'  # Changed from 'npm'
```

**Critical Points**:
- pnpm setup must come before Node.js setup
- Use `cache: 'pnpm'` not `cache: 'npm'`
- Remove version specifications to use `packageManager` field

### 3. Package Lockfile Synchronization

**Issue**: Outdated lockfile causing dependency resolution failures
```
ERR_PNPM_OUTDATED_LOCKFILE  Run `pnpm install` to update the lockfile
```

**Root Cause**: pnpm-lock.yaml out of sync with package.json changes

**Immediate Fix**:
```bash
# Local resolution
pnpm install
git add pnpm-lock.yaml
git commit -m "fix: update pnpm lockfile"
```

**Prevention in CI**:
```yaml
- name: Install dependencies
  run: pnpm install --frozen-lockfile
  # Fails fast if lockfile is outdated
```

### 4. Workspace Dependency Errors

**Issue**: Tarball file not found in monorepo
```
ENOENT: no such file or directory, open 'evoke-ui-react-0.2.2.tgz'
```

**Root Cause**: Incorrect workspace dependency references

**Solution**:
```json
// examples/react-app/package.json
{
  "dependencies": {
    // ❌ Wrong: tarball reference
    "@evoke-ui/react": "file:../../evoke-ui-react-0.2.2.tgz",
    
    // ✅ Correct: workspace protocol
    "@evoke-ui/react": "workspace:*"
  }
}
```

### 5. Test Command Argument Passing

**Issue**: Test arguments not reaching vitest
```
pnpm test --run --coverage
# Arguments passed to pnpm, not vitest
```

**Root Cause**: Incorrect command syntax for pnpm script forwarding

**Solution**:
```yaml
# ❌ Wrong: args go to pnpm
- run: pnpm test --run --coverage

# ✅ Correct: args forwarded to vitest
- run: pnpm run test -- --run
```

### 6. React Testing Library Import Issues

**Issue**: Test import resolution failures
```
Failed to resolve import "@testing-library/dom"
```

**Root Cause**: Incorrect import source for React-specific utilities

**Solution**:
```typescript
// ❌ Wrong import
import { fireEvent } from '@testing-library/dom';

// ✅ Correct import  
import { fireEvent } from '@testing-library/react';
```

### 7. React 18 act() Warnings

**Issue**: Excessive act() warnings in test output
```
Warning: The current testing environment is not configured to support act(...)
```

**Root Cause**: React 18 testing environment configuration

**Complete Solution**:
```typescript
// src/test-setup.ts
global.IS_REACT_ACT_ENVIRONMENT = true;

const originalError = console.error;
console.error = (...args: any[]) => {
  if (typeof args[0] === 'string' && args[0].includes('act(')) {
    return; // Suppress act warnings
  }
  originalError.call(console, ...args);
};
```

```typescript
// src/types/global.d.ts
declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined;
}
export {};
```

```typescript
// vite.config.ts
test: {
  setupFiles: ['./src/test-setup.ts'],
  environment: 'happy-dom',
  globals: true
}
```

### 8. GitHub Pages Permission Denied

**Issue**: Deployment permission errors
```
Permission to repository denied to github-actions[bot]
```

**Root Cause**: Insufficient permissions for git-based deployment

**Solution**: Switched to artifact-based deployment
```yaml
# ❌ Old approach: git push (requires permissions)
- uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}

# ✅ New approach: artifact upload (secure)
- uses: actions/upload-artifact@v4
  with:
    name: pr-preview-${{ github.event.number }}
    path: ./pr-preview-${{ github.event.number }}
```

## 🛠️ Debugging Procedures

### GitHub Actions Debugging

**Enable Debug Logging**:
```yaml
- name: Debug workflow
  run: |
    echo "Node version: $(node --version)"
    echo "PNPM version: $(pnpm --version)"
    echo "Working directory: $(pwd)"
    echo "Environment variables:"
    env | grep -E "(NODE_|PNPM_|GITHUB_)" | sort
```

**Check Dependencies**:
```yaml
- name: Debug dependencies
  run: |
    echo "Package.json engines:"
    cat package.json | grep -A 3 '"engines"'
    echo "Lockfile status:"
    pnpm install --dry-run
```

**Verify Build Process**:
```yaml
- name: Debug build
  run: |
    echo "Build output:"
    pnpm build 2>&1 | tee build.log
    echo "Storybook build:"
    pnpm build-storybook --debug
```

### Local Debugging Commands

**Replicate CI Environment**:
```bash
# Use Node.js 22 (match CI)
nvm use 22

# Clear caches
pnpm store prune
rm -rf node_modules

# Fresh install (match CI)
pnpm install --frozen-lockfile

# Test build locally
pnpm build
pnpm build-storybook

# Run full test suite
pnpm test -- --run
```

**Check Workspace Configuration**:
```bash
# Verify workspace dependencies
pnpm list --depth=1

# Check for tarball references
grep -r "\.tgz" examples/*/package.json

# Validate lockfile
pnpm install --dry-run
```

## 📋 Workflow Validation Checklist

### Pre-Push Validation
- [ ] Node.js version updated to 22 in all workflows
- [ ] PNPM setup before Node.js setup in workflow order
- [ ] Cache configuration uses `cache: 'pnpm'`
- [ ] Lockfile is current (`pnpm install` if needed)
- [ ] Workspace dependencies use `workspace:*` protocol
- [ ] Test commands use `pnpm run test -- --run` syntax
- [ ] All tests pass locally (662/662)
- [ ] TypeScript compiles without errors
- [ ] Build succeeds locally

### Post-Deployment Validation
- [ ] CI workflow completes successfully
- [ ] All quality gates pass (tests, build, lint, type-check)
- [ ] Production deployment succeeds (main branch)
- [ ] PR preview artifacts generate correctly
- [ ] PR comments appear with download links
- [ ] Cleanup workflow removes artifacts after PR close

## 🚨 Emergency Procedures

### Complete Pipeline Failure

1. **Immediate Assessment**:
```bash
# Check latest workflow run
gh run list --workflow=ci.yml --limit=1

# Get detailed logs
gh run view --log
```

2. **Rollback Strategy**:
```bash
# Identify last known good commit
git log --oneline -10

# Create hotfix branch from stable commit
git checkout -b hotfix/pipeline-fix [last-good-commit]

# Cherry-pick critical fixes only
git cherry-pick [fix-commit-hash]
```

3. **Fast Recovery**:
```bash
# Skip failing tests temporarily (emergency only)
pnpm test -- --run --passWithNoTests

# Minimal build for deployment
pnpm build --skip-type-check
```

### Stuck Workflows

**Cancel and Restart**:
```bash
# Cancel running workflows
gh run cancel [run-id]

# Re-trigger manually
gh workflow run ci.yml
gh workflow run deploy-storybook.yml
```

**Clear GitHub Actions Cache**:
```bash
# List and delete caches
gh cache list
gh cache delete [cache-key]
```

## 📊 Monitoring & Alerts

### Key Metrics to Monitor

1. **Build Success Rate**: Should be >99%
2. **Build Duration**: Target <30s, alert if >60s
3. **Test Pass Rate**: Must be 100% (662/662)
4. **Deployment Frequency**: Track merge-to-deploy time
5. **Artifact Size**: Monitor growth trends

### Health Check Commands

```bash
# Quick health check
pnpm run health-check || echo "Issues detected"

# Performance baseline
time pnpm build-storybook
# Should complete in <30s

# Dependency audit
pnpm audit --audit-level moderate
```

### Automated Monitoring Setup

```yaml
# Add to workflows for monitoring
- name: Performance check
  run: |
    START_TIME=$(date +%s)
    pnpm build-storybook
    END_TIME=$(date +%s)
    BUILD_TIME=$((END_TIME - START_TIME))
    echo "Build time: ${BUILD_TIME}s"
    if [ $BUILD_TIME -gt 60 ]; then
      echo "⚠️ Build time exceeded threshold"
    fi
```

## 🔄 Recovery Patterns

### Pattern 1: Dependency Issues
1. Clear all caches
2. Delete node_modules
3. Fresh `pnpm install`
4. Verify lockfile changes
5. Test locally before push

### Pattern 2: Configuration Drift
1. Compare working commit with current
2. Check for workflow file changes
3. Validate environment variable changes
4. Restore known-good configuration
5. Incremental testing

### Pattern 3: Version Compatibility
1. Check package.json engines
2. Verify Node.js version in workflows
3. Test with exact CI environment
4. Update dependencies gradually
5. Document breaking changes

---

This troubleshooting guide covers all known issues and provides systematic resolution procedures for maintaining reliable CI/CD operations.