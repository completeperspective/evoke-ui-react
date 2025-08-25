# GitHub Pages Storybook Deployment Strategy

## Overview
Evoke UI will use GitHub Pages to host both the main Storybook documentation site and temporary preview deployments for pull requests. This strategy provides visual review capabilities and automated documentation deployment.

## Architecture

### Main Branch Deployment
- **Target**: `main` branch represents latest published version
- **URL Pattern**: `https://{username}.github.io/{repo-name}/`
- **Trigger**: Push to main branch
- **Build**: Full Storybook static build with all components and documentation

### PR Preview Deployments
- **Target**: Pull request branches
- **URL Pattern**: `https://{username}.github.io/{repo-name}/pr-{number}/`
- **Trigger**: PR opened/updated
- **Cleanup**: Automatic removal when PR closed/merged
- **Build**: Full Storybook build with PR-specific branding

## Technical Implementation

### GitHub Actions Workflows
1. **Main Deployment** (.github/workflows/deploy-storybook.yml)
2. **PR Preview** (.github/workflows/pr-preview.yml)
3. **PR Cleanup** (.github/workflows/pr-cleanup.yml)

### GitHub Pages Configuration
- Source: GitHub Actions
- Branch: gh-pages (auto-managed)
- Directory structure: 
  - `/` - Main documentation
  - `/pr-{number}/` - PR previews

### Build Requirements
- Node.js 18+ for Storybook build
- pnpm for package management  
- Sass compilation for styles
- Static file generation for GitHub Pages

## Benefits
- Visual review of component changes
- Automated documentation updates
- No external service dependencies
- Free hosting via GitHub Pages
- Clean PR-based workflow