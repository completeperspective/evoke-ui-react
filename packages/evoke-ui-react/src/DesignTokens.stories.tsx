import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Heading } from './atoms/Heading/Heading';
import { Text } from './atoms/Text/Text';
import { Badge } from './atoms/Badge/Badge';
import { Button } from './atoms/Button/Button';
import { useTheme } from './hooks/useTheme';
import { colors } from './tokens/colors';
import { typography } from './tokens/typography';
import { spacingSystem } from './tokens/spacing';
import { elevation } from './tokens/elevation';
import { motion } from './tokens/motion';

const meta = {
  title: 'Design System/Tokens',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Design tokens are the foundation of the Evoke UI design system, providing consistent values for colors, typography, spacing, and more.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Enhanced Color Tokens with Interactive Theme Switching
const ColorTokensTemplate = () => {
  const { isDark, toggleTheme } = useTheme();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(key);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const ColorSwatch = ({
    name,
    description,
    cssVar,
    tailwindClass,
  }: {
    name: string;
    description: string;
    cssVar: string;
    tailwindClass: string;
  }) => {
    const swatchKey = `${name}-${cssVar}`;
    const isCopied = copiedItem === swatchKey;

    return (
      <div className="group border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-card">
        <div className="flex items-center space-x-3 mb-3">
          <div className="relative">
            <div
              className={`w-16 h-16 rounded-xl border-2 border-border/50 flex-shrink-0 shadow-sm transition-transform group-hover:scale-105 cursor-pointer ${tailwindClass}`}
              onClick={() => copyToClipboard(tailwindClass, swatchKey)}
              title={`Click to copy Tailwind class: ${tailwindClass}`}
            >
            </div>
            {isCopied && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap animate-pulse z-50">
                Copied!
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between mb-1">
              <Text weight="semibold" className="truncate">
                {name}
              </Text>
              <Badge variant="secondary" size="sm">
                Tailwind
              </Badge>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => copyToClipboard(cssVar, `${swatchKey}-css`)}
                className="text-left w-full"
              >
                <Text
                  variant="code"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors truncate block"
                >
                  {cssVar}
                </Text>
              </button>
              <button
                onClick={() => copyToClipboard(tailwindClass, `${swatchKey}-tailwind`)}
                className="text-left w-full"
              >
                <Text
                  variant="code"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors truncate block"
                >
                  {tailwindClass}
                </Text>
              </button>
            </div>
          </div>
        </div>
        <Text variant="small" className="text-muted-foreground leading-relaxed">
          {description}
        </Text>
      </div>
    );
  };

  const colorGroups = {
    'Gray Scale': Object.entries(colors.gray).map(([shade, color]) => ({
      name: `Gray ${shade}`,
      description: `Gray scale ${shade} - for backgrounds, text, and neutral elements`,
      cssVar: `--ui-color-gray-${shade}`,
      tailwindClass: `bg-gray-${shade}`,
    })),
    'Brand Colors': [
      {
        name: 'Primary',
        description: 'Primary brand color for main actions and emphasis',
        cssVar: '--ui-color-primary',
        tailwindClass: 'bg-primary',
      },
      {
        name: 'Secondary',
        description: 'Secondary brand color for supporting elements',
        cssVar: '--ui-color-secondary',
        tailwindClass: 'bg-secondary',
      },
      {
        name: 'Accent',
        description: 'Accent color for highlights and special emphasis',
        cssVar: '--ui-color-accent',
        tailwindClass: 'bg-accent',
      },
    ],
    'Status Colors': [
      {
        name: 'Success',
        description: 'Success state - confirmations and positive feedback',
        cssVar: '--ui-color-success',
        tailwindClass: 'bg-success',
      },
      {
        name: 'Warning',
        description: 'Warning state - cautions and important notices',
        cssVar: '--ui-color-warning',
        tailwindClass: 'bg-warning',
      },
      {
        name: 'Error',
        description: 'Error state - failures and destructive actions',
        cssVar: '--ui-color-error',
        tailwindClass: 'bg-error',
      },
      {
        name: 'Info',
        description: 'Information state - helpful tips and neutral notices',
        cssVar: '--ui-color-info',
        tailwindClass: 'bg-info',
      },
    ],
    'Semantic Colors (Current Theme)': [
      {
        name: 'Background',
        description: 'Main background color',
        cssVar: '--ui-color-background',
        tailwindClass: 'bg-background',
      },
      {
        name: 'Foreground',
        description: 'Primary text color',
        cssVar: '--ui-color-foreground',
        tailwindClass: 'bg-foreground',
      },
      {
        name: 'Muted',
        description: 'Subtle background color',
        cssVar: '--ui-color-muted',
        tailwindClass: 'bg-muted',
      },
      {
        name: 'Border',
        description: 'Default border color',
        cssVar: '--ui-color-border',
        tailwindClass: 'bg-border',
      },
      {
        name: 'Card',
        description: 'Card background color',
        cssVar: '--ui-color-card',
        tailwindClass: 'bg-card',
      },
      {
        name: 'Ring',
        description: 'Focus ring color',
        cssVar: '--ui-color-ring',
        tailwindClass: 'bg-ring',
      },
    ],
  };

  return (
    <div className="space-y-12 max-w-7xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Heading level="h1">Color Tokens</Heading>
            <Text variant="lead">
              Our color system uses OKLCH color space for perceptually uniform color manipulation
              and better accessibility.
            </Text>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant={isDark ? 'default' : 'secondary'} size="lg">
              {isDark ? 'Dark' : 'Light'} Theme
            </Badge>
            <Button variant="outline" size="sm" onClick={toggleTheme}>
              Switch to {isDark ? 'Light' : 'Dark'}
            </Button>
          </div>
        </div>

        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 space-y-2">
          <Text variant="small" className="text-muted-foreground">
            <strong>Tip:</strong> Click on color swatches or values to copy them to your clipboard.
            Toggle between light and dark themes to see how colors adapt.
          </Text>
          <Text variant="small" className="text-muted-foreground">
            🎨 Color swatches use Tailwind classes that automatically use CSS variables. Click
            swatches or values to copy them.
          </Text>
        </div>
      </div>

      {Object.entries(colorGroups).map(([groupName, groupColors]) => (
        <div key={groupName} className="space-y-6">
          <div className="flex items-center space-x-3">
            <Heading level="h2" spacing="tight">
              {groupName}
            </Heading>
            <Badge variant="outline" size="sm">
              {groupColors.length} colors
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {groupColors.map(({ name, description, cssVar, tailwindClass }) => (
              <ColorSwatch
                key={`${groupName}-${name}`}
                name={name}
                description={description}
                cssVar={cssVar}
                tailwindClass={tailwindClass}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 rounded-xl p-8 space-y-6">
        <Heading level="h3" spacing="tight">
          OKLCH Color Space Benefits
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
            </div>
            <Text weight="semibold">Perceptual Uniformity</Text>
            <Text variant="small" className="text-muted-foreground leading-relaxed">
              Lightness adjustments appear consistent to human perception, making color manipulation
              predictable.
            </Text>
          </div>
          <div className="space-y-3">
            <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-success rounded-full"></div>
            </div>
            <Text weight="semibold">Better Accessibility</Text>
            <Text variant="small" className="text-muted-foreground leading-relaxed">
              More accurate contrast ratio calculations ensure WCAG compliance and better
              readability.
            </Text>
          </div>
          <div className="space-y-3">
            <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-warning rounded-full"></div>
            </div>
            <Text weight="semibold">Wide Gamut Support</Text>
            <Text variant="small" className="text-muted-foreground leading-relaxed">
              Full P3 display support for vibrant colors on modern devices and high-quality
              monitors.
            </Text>
          </div>
          <div className="space-y-3">
            <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-accent rounded-full"></div>
            </div>
            <Text weight="semibold">Predictable Mixing</Text>
            <Text variant="small" className="text-muted-foreground leading-relaxed">
              Color interpolation produces visually expected results for gradients and animations.
            </Text>
          </div>
        </div>

        <div className="bg-background/50 rounded-lg p-4 mt-6">
          <Text variant="code" className="text-sm text-foreground block mb-2">
            OKLCH Format: oklch(lightness chroma hue)
          </Text>
          <Text variant="small" className="text-muted-foreground">
            • Lightness: 0-1 (0 = black, 1 = white) • Chroma: 0-0.37+ (0 = gray, higher = more
            saturated) • Hue: 0-360° (color wheel position)
          </Text>
        </div>
      </div>
    </div>
  );
};

export const ColorTokens: Story = {
  render: ColorTokensTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Complete reference of color tokens used throughout the design system.',
      },
    },
  },
};

// Enhanced Typography Tokens
const TypographyTokensTemplate = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(key);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const CopyButton = ({
    text,
    itemKey,
    children,
  }: {
    text: string;
    itemKey: string;
    children: React.ReactNode;
  }) => {
    const isCopied = copiedItem === itemKey;
    return (
      <button
        onClick={() => copyToClipboard(text, itemKey)}
        className="relative hover:bg-muted/50 rounded px-1 transition-colors"
        title="Click to copy"
      >
        {children}
        {isCopied && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap animate-pulse z-10">
            Copied!
          </div>
        )}
      </button>
    );
  };

  const fontSizeData = Object.entries(typography.fontSize).map(([name, config]) => ({
    name,
    fontSize: config.fontSize,
    lineHeight: config.lineHeight,
    letterSpacing: config.letterSpacing || '0em',
    pixels: `${parseFloat(config.fontSize) * 16}px`,
  }));

  const fontWeightData = Object.entries(typography.fontWeight).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: value.toString(),
    weight: value,
  }));

  const headingData = Object.entries(typography.headings).map(([tag, config]) => ({
    tag,
    ...config,
    pixels: `${parseFloat(config.fontSize) * 16}px`,
  }));

  const bodyData = Object.entries(typography.body).map(([variant, config]) => ({
    variant,
    ...config,
    pixels: `${parseFloat(config.fontSize) * 16}px`,
  }));

  return (
    <div className="space-y-12 max-w-7xl">
      <div className="space-y-4">
        <Heading level="h1">Typography Tokens</Heading>
        <Text variant="lead">
          Consistent typography scale for readable and harmonious text hierarchy using modular scale
          ratios.
        </Text>
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4">
          <Text variant="small" className="text-muted-foreground">
            <strong>Tip:</strong> Click on any typography values to copy them to your clipboard.
          </Text>
        </div>
      </div>

      {/* Heading Hierarchy */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Heading level="h2" spacing="tight">
            Heading Hierarchy
          </Heading>
          <Badge variant="outline" size="sm">
            Semantic usage
          </Badge>
        </div>
        <div className="space-y-6">
          {headingData.map(({ tag, fontSize, lineHeight, letterSpacing, fontWeight, pixels }) => (
            <div key={tag} className="border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary">{tag.toUpperCase()}</Badge>
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <CopyButton text={fontSize} itemKey={`${tag}-size`}>
                      <Text variant="code" className="text-xs">
                        {fontSize} ({pixels})
                      </Text>
                    </CopyButton>
                    <CopyButton text={fontWeight.toString()} itemKey={`${tag}-weight`}>
                      <Text variant="code" className="text-xs">
                        Weight: {fontWeight}
                      </Text>
                    </CopyButton>
                    <CopyButton text={lineHeight} itemKey={`${tag}-height`}>
                      <Text variant="code" className="text-xs">
                        Line: {lineHeight}
                      </Text>
                    </CopyButton>
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize,
                  lineHeight,
                  letterSpacing: letterSpacing || '0em',
                  fontWeight,
                }}
                className="text-foreground"
              >
                This is {tag} heading style
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Font Size Scale */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Heading level="h2" spacing="tight">
            Font Size Scale
          </Heading>
          <Badge variant="outline" size="sm">
            Modular scale (1.25 ratio)
          </Badge>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {fontSizeData.map(({ name, fontSize, lineHeight, letterSpacing, pixels }) => (
            <div
              key={name}
              className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <CopyButton text={name} itemKey={`size-${name}`}>
                    <Text variant="code" className="text-xs font-medium">
                      {name}
                    </Text>
                  </CopyButton>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <CopyButton text={fontSize} itemKey={`size-${name}-rem`}>
                      <span>{fontSize}</span>
                    </CopyButton>
                    <span>•</span>
                    <CopyButton text={pixels} itemKey={`size-${name}-px`}>
                      <span>{pixels}</span>
                    </CopyButton>
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize,
                  lineHeight,
                  letterSpacing,
                }}
                className="text-foreground"
              >
                The quick brown fox jumps over the lazy dog
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Font Weights */}
      <div className="space-y-6">
        <Heading level="h2" spacing="tight">
          Font Weights
        </Heading>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {fontWeightData.map(({ name, value, weight }) => (
            <div
              key={name}
              className="border border-border rounded-lg p-4 text-center hover:shadow-sm transition-shadow"
            >
              <div className="mb-3">
                <Text variant="small" weight="medium">
                  {name}
                </Text>
                <CopyButton text={value} itemKey={`weight-${name}`}>
                  <Text variant="code" className="text-xs text-muted-foreground block">
                    {value}
                  </Text>
                </CopyButton>
              </div>
              <div style={{ fontWeight: weight }} className="text-lg">
                Sample Text
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Body Text Variants */}
      <div className="space-y-6">
        <Heading level="h2" spacing="tight">
          Body Text Variants
        </Heading>
        <div className="space-y-4">
          {bodyData.map(({ variant, fontSize, lineHeight, letterSpacing, fontWeight, pixels }) => (
            <div key={variant} className="border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">{variant}</Badge>
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <CopyButton text={fontSize} itemKey={`body-${variant}-size`}>
                      <Text variant="code" className="text-xs">
                        {fontSize} ({pixels})
                      </Text>
                    </CopyButton>
                    <CopyButton text={lineHeight} itemKey={`body-${variant}-height`}>
                      <Text variant="code" className="text-xs">
                        Line: {lineHeight}
                      </Text>
                    </CopyButton>
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize,
                  lineHeight,
                  letterSpacing: letterSpacing || '0em',
                  fontWeight,
                }}
                className="text-foreground"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur.
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Font Families */}
      <div className="space-y-6">
        <Heading level="h2" spacing="tight">
          Font Families
        </Heading>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Text weight="semibold">Sans Serif</Text>
              <Badge variant="default" size="sm">
                Default
              </Badge>
            </div>
            <CopyButton text={typography.fontFamily.sans} itemKey="font-sans">
              <Text variant="code" className="text-xs text-muted-foreground leading-relaxed block">
                {typography.fontFamily.sans.split(', ').slice(0, 4).join(', ')}...
              </Text>
            </CopyButton>
            <div style={{ fontFamily: typography.fontFamily.sans }} className="text-xl">
              The quick brown fox jumps over the lazy dog
            </div>
            <div
              style={{ fontFamily: typography.fontFamily.sans }}
              className="text-sm text-muted-foreground"
            >
              ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Text weight="semibold">Monospace</Text>
              <Badge variant="secondary" size="sm">
                Code
              </Badge>
            </div>
            <CopyButton text={typography.fontFamily.mono} itemKey="font-mono">
              <Text variant="code" className="text-xs text-muted-foreground leading-relaxed block">
                {typography.fontFamily.mono.split(', ').slice(0, 4).join(', ')}...
              </Text>
            </CopyButton>
            <div style={{ fontFamily: typography.fontFamily.mono }} className="text-lg">
              const message = 'Hello, World!';
            </div>
            <div
              style={{ fontFamily: typography.fontFamily.mono }}
              className="text-sm text-muted-foreground"
            >
              function calculateSum(a, b) &#123;
              <br />
              &nbsp;&nbsp;return a + b;
              <br />
              &#125;
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Text weight="semibold">Serif</Text>
              <Badge variant="outline" size="sm">
                Editorial
              </Badge>
            </div>
            <CopyButton text={typography.fontFamily.serif} itemKey="font-serif">
              <Text variant="code" className="text-xs text-muted-foreground leading-relaxed block">
                {typography.fontFamily.serif}
              </Text>
            </CopyButton>
            <div style={{ fontFamily: typography.fontFamily.serif }} className="text-xl">
              The quick brown fox jumps over the lazy dog
            </div>
            <div
              style={{ fontFamily: typography.fontFamily.serif }}
              className="text-sm text-muted-foreground italic"
            >
              Perfect for long-form content and editorial layouts
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TypographyTokens: Story = {
  render: TypographyTokensTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Typography scale including font sizes, weights, line heights, and font families.',
      },
    },
  },
};

// Enhanced Spacing Tokens
const SpacingTokensTemplate = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [selectedSpacing, setSelectedSpacing] = useState<string>('4');

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(key);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const CopyButton = ({
    text,
    itemKey,
    children,
  }: {
    text: string;
    itemKey: string;
    children: React.ReactNode;
  }) => {
    const isCopied = copiedItem === itemKey;
    return (
      <button
        onClick={() => copyToClipboard(text, itemKey)}
        className="relative hover:bg-muted/50 rounded px-1 transition-colors"
        title="Click to copy"
      >
        {children}
        {isCopied && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap animate-pulse z-10">
            Copied!
          </div>
        )}
      </button>
    );
  };

  const spacingData = Object.entries(spacingSystem.spacing).map(([key, value]) => {
    const pixels = `${parseFloat(value) * 16}px`;
    return {
      name: key,
      value,
      pixels: value === '0rem' ? '0px' : pixels,
      description: getSpacingDescription(key),
    };
  });

  function getSpacingDescription(key: string): string {
    const descriptions: Record<string, string> = {
      '0': 'No space - for flush layouts',
      px: 'Hairline - for fine borders and details',
      '0.5': 'Micro spacing - for tight layouts',
      '1': 'Base grid unit - minimal spacing',
      '1.5': 'Small gaps - between related elements',
      '2': 'Standard small spacing - form elements',
      '2.5': 'Small-medium spacing - component padding',
      '3': 'Standard medium spacing - buttons, cards',
      '3.5': 'Medium spacing - form sections',
      '4': 'Base spacing unit - standard component spacing',
      '5': 'Medium-large spacing - section gaps',
      '6': 'Large spacing - component separation',
      '7': 'Extra large spacing - major sections',
      '8': '2x base unit - page sections',
      '9': 'Large section spacing',
      '10': 'Extra large spacing - layout margins',
      '11': 'Component spacing - large elements',
      '12': '3x base unit - major layout divisions',
      '14': 'Large component spacing',
      '16': '4x base unit - page level spacing',
      '18': 'Extra large sections',
      '20': '5x base unit - hero sections',
      '24': '6x base unit - major page sections',
      '28': 'Large section breaks',
      '32': '8x base unit - massive spacing',
      '36': 'Extra large breaks',
      '40': '10x base unit - hero spacing',
      '44': 'Huge spacing',
      '48': '12x base unit - massive sections',
      '56': 'Extra huge spacing',
      '64': '16x base unit - maximum spacing',
      '80': 'Massive spacing',
      '96': 'Huge sections',
    };
    return descriptions[key] || 'Custom spacing value';
  }

  const borderRadiusData = [
    { name: 'none', value: '0px', description: 'No radius - sharp corners' },
    { name: 'sm', value: '2px', description: 'Small radius - subtle rounding' },
    { name: 'default', value: '4px', description: 'Default radius - standard components' },
    { name: 'md', value: '6px', description: 'Medium radius - cards and buttons' },
    { name: 'lg', value: '8px', description: 'Large radius - prominent elements' },
    { name: 'xl', value: '12px', description: 'Extra large radius - containers' },
    { name: '2xl', value: '16px', description: 'Very large radius - hero elements' },
    { name: 'full', value: '9999px', description: 'Full radius - circular elements' },
  ];

  const componentSpacingData = [
    {
      component: 'Button',
      variants: Object.entries(spacingSystem.componentSpacing.button).map(([size, spacing]) => ({
        size,
        x: spacing.x,
        y: spacing.y,
      })),
    },
    {
      component: 'Input',
      variants: Object.entries(spacingSystem.componentSpacing.input).map(([size, spacing]) => ({
        size,
        x: spacing.x,
        y: spacing.y,
      })),
    },
    {
      component: 'Card',
      variants: Object.entries(spacingSystem.componentSpacing.card).map(([size, spacing]) => ({
        size,
        padding: spacing,
      })),
    },
  ];

  return (
    <div className="space-y-12 max-w-7xl">
      <div className="space-y-4">
        <Heading level="h1">Spacing Tokens</Heading>
        <Text variant="lead">
          Consistent spacing scale based on a 4px grid system for harmonious layouts and visual
          rhythm.
        </Text>
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4">
          <Text variant="small" className="text-muted-foreground">
            <strong>Tip:</strong> Click on spacing values to copy them. Select different spacing
            values to see visual comparisons.
          </Text>
        </div>
      </div>

      {/* Interactive Spacing Scale */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Heading level="h2" spacing="tight">
              Spacing Scale
            </Heading>
            <Badge variant="outline" size="sm">
              4px grid system
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Text variant="small" className="text-muted-foreground">
              Compare with:
            </Text>
            <select
              value={selectedSpacing}
              onChange={(e) => setSelectedSpacing(e.target.value)}
              className="border border-border rounded px-2 py-1 text-sm bg-background"
            >
              {spacingData.slice(3, 15).map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          {spacingData.map(({ name, value, pixels, description }) => {
            const isSelected = name === selectedSpacing;
            return (
              <div
                key={name}
                className={`flex items-center space-x-6 p-4 rounded-lg transition-all ${
                  isSelected ? 'bg-primary/5 border border-primary/20' : 'hover:bg-muted/30'
                }`}
              >
                <div className="w-12">
                  <CopyButton text={name} itemKey={`spacing-${name}`}>
                    <Text variant="code" className="text-xs font-medium">
                      {name}
                    </Text>
                  </CopyButton>
                </div>
                <div className="w-24">
                  <CopyButton text={value} itemKey={`spacing-${name}-rem`}>
                    <Text variant="small" className="text-muted-foreground">
                      {value}
                    </Text>
                  </CopyButton>
                </div>
                <div className="w-20">
                  <CopyButton text={pixels} itemKey={`spacing-${name}-px`}>
                    <Text variant="small" className="text-muted-foreground">
                      ({pixels})
                    </Text>
                  </CopyButton>
                </div>
                <div className="flex-1">
                  <Text variant="small" className="text-muted-foreground">
                    {description}
                  </Text>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className="bg-primary h-6 rounded border"
                    style={{ width: value === '0rem' ? '2px' : value }}
                  />
                  {isSelected && (
                    <div
                      className="bg-secondary/60 h-6 rounded border border-secondary"
                      style={{ width: value === '0rem' ? '2px' : `calc(${value} * 1.5)` }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Border Radius */}
      <div className="space-y-6">
        <Heading level="h2" spacing="tight">
          Border Radius
        </Heading>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {borderRadiusData.map(({ name, value, description }) => (
            <div
              key={name}
              className="border border-border rounded-lg p-6 text-center hover:shadow-sm transition-shadow"
            >
              <div className="mb-4">
                <Text variant="small" weight="semibold" className="mb-1">
                  {name}
                </Text>
                <CopyButton text={value} itemKey={`radius-${name}`}>
                  <Text variant="code" className="text-xs text-muted-foreground">
                    {value}
                  </Text>
                </CopyButton>
              </div>
              <div
                className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/50 mx-auto mb-3 transition-transform hover:scale-105"
                style={{ borderRadius: value }}
              />
              <Text variant="small" className="text-muted-foreground leading-tight">
                {description}
              </Text>
            </div>
          ))}
        </div>
      </div>

      {/* Component Spacing */}
      <div className="space-y-6">
        <Heading level="h2" spacing="tight">
          Component Spacing
        </Heading>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {componentSpacingData.map(({ component, variants }) => (
            <div key={component} className="border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Text weight="semibold">{component}</Text>
                <Badge variant="outline" size="sm">
                  {variants.length} sizes
                </Badge>
              </div>
              <div className="space-y-3">
                {variants.map((variant: any) => (
                  <div key={variant.size} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Text variant="small" weight="medium">
                        {variant.size}
                      </Text>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        {variant.x && (
                          <CopyButton text={variant.x} itemKey={`${component}-${variant.size}-x`}>
                            <span>x: {variant.x}</span>
                          </CopyButton>
                        )}
                        {variant.y && (
                          <CopyButton text={variant.y} itemKey={`${component}-${variant.size}-y`}>
                            <span>y: {variant.y}</span>
                          </CopyButton>
                        )}
                        {variant.padding && (
                          <CopyButton
                            text={variant.padding}
                            itemKey={`${component}-${variant.size}-padding`}
                          >
                            <span>{variant.padding}</span>
                          </CopyButton>
                        )}
                      </div>
                    </div>
                    <div
                      className="bg-muted/50 border border-border/50 rounded flex items-center justify-center text-xs text-muted-foreground"
                      style={{
                        padding: variant.padding || `${variant.y} ${variant.x}`,
                        minHeight: '2rem',
                      }}
                    >
                      {component} {variant.size}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layout Examples */}
      <div className="space-y-6">
        <Heading level="h2" spacing="tight">
          Layout Examples
        </Heading>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border border-border rounded-lg p-6">
            <Text weight="semibold" className="mb-4">
              Container Spacing
            </Text>
            <div className="space-y-4">
              {Object.entries(spacingSystem.layout.container).map(([size, spacing]) => (
                <div
                  key={size}
                  className="border border-border/50 rounded"
                  style={{ padding: spacing }}
                >
                  <div className="bg-muted/50 rounded p-2 text-center">
                    <Text variant="small" className="text-muted-foreground">
                      {size}: {spacing}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border rounded-lg p-6">
            <Text weight="semibold" className="mb-4">
              Section Spacing
            </Text>
            <div className="space-y-2">
              {Object.entries(spacingSystem.layout.section)
                .slice(0, 4)
                .map(([size, spacing]) => (
                  <div key={size} className="flex items-center space-x-4">
                    <div className="w-12">
                      <Text variant="small" weight="medium">
                        {size}
                      </Text>
                    </div>
                    <div
                      className="bg-primary/20 h-3 rounded flex-1 max-w-32"
                      style={{ width: `calc(${spacing} / 4)` }}
                    />
                    <CopyButton text={spacing} itemKey={`section-${size}`}>
                      <Text variant="code" className="text-xs text-muted-foreground">
                        {spacing}
                      </Text>
                    </CopyButton>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Spacing */}
      <div className="bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 rounded-xl p-8 space-y-6">
        <Heading level="h3" spacing="tight">
          Responsive Spacing Guidelines
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(spacingSystem.responsive).map(([breakpoint, config]) => (
            <div key={breakpoint} className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <Text weight="semibold" className="capitalize">
                  {breakpoint}
                </Text>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <Text variant="small" className="text-muted-foreground">
                    Multiplier:
                  </Text>
                  <Text variant="code" className="text-xs">
                    {config.multiplier}x
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text variant="small" className="text-muted-foreground">
                    Max spacing:
                  </Text>
                  <Text variant="code" className="text-xs">
                    {config.maxSpacing}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-background/50 rounded-lg p-4">
          <Text variant="small" className="text-muted-foreground leading-relaxed">
            <strong>Best Practice:</strong> Use smaller spacing values on mobile devices to maximize
            content visibility. Large spacing values are automatically capped based on screen size.
          </Text>
        </div>
      </div>
    </div>
  );
};

export const SpacingTokens: Story = {
  render: SpacingTokensTemplate,
  parameters: {
    docs: {
      description: {
        story:
          'Spacing scale and border radius tokens for consistent layout and component styling.',
      },
    },
  },
};

// Enhanced Shadow and Elevation Tokens
const ShadowTokensTemplate = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [selectedElevation, setSelectedElevation] = useState<string>('md');
  const { isDark } = useTheme();

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(key);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const CopyButton = ({
    text,
    itemKey,
    children,
  }: {
    text: string;
    itemKey: string;
    children: React.ReactNode;
  }) => {
    const isCopied = copiedItem === itemKey;
    return (
      <button
        onClick={() => copyToClipboard(text, itemKey)}
        className="relative hover:bg-muted/50 rounded px-1 transition-colors"
        title="Click to copy"
      >
        {children}
        {isCopied && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap animate-pulse z-10">
            Copied!
          </div>
        )}
      </button>
    );
  };

  const shadowData = Object.entries(elevation.shadow).map(([name, value]) => ({
    name,
    value: value as string,
    description: getShadowDescription(name),
    zIndex: getZIndexForShadow(name),
  }));


  const zIndexData = Object.entries(elevation.zIndex).map(([name, value]) => ({
    name,
    value,
    description: getZIndexDescription(name),
  }));

  function getShadowDescription(name: string): string {
    const descriptions: Record<string, string> = {
      none: 'No elevation - flat on surface',
      xs: 'Subtle elevation - just lifted off surface',
      sm: 'Small elevation - buttons, small cards',
      md: 'Default elevation - cards, most UI elements',
      lg: 'Medium-high elevation - dropdowns, popovers',
      xl: 'High elevation - modals, large containers',
      '2xl': 'Very high elevation - tooltips, overlays',
      inner: 'Inset shadow - pressed states, form inputs',
    };
    return descriptions[name] || 'Custom shadow value';
  }

  function getZIndexDescription(name: string): string {
    const descriptions: Record<string, string> = {
      behind: 'Behind normal content',
      base: 'Normal document flow',
      docked: 'Slightly above normal content',
      dropdown: 'Dropdowns and popovers',
      sticky: 'Sticky headers and navigation',
      floating: 'Floating action buttons',
      fixed: 'Fixed position elements',
      overlay: 'Modal backdrops and overlays',
      modal: 'Modals and dialogs',
      notification: 'High priority notifications',
      tooltip: 'Tooltips and help text',
      maximum: 'Highest priority elements',
    };
    return descriptions[name] || 'Custom z-index value';
  }

  function getZIndexForShadow(shadowName: string): number {
    const mapping: Record<string, string> = {
      none: 'base',
      xs: 'base',
      sm: 'docked',
      md: 'docked',
      lg: 'dropdown',
      xl: 'modal',
      '2xl': 'tooltip',
      inner: 'base',
    };
    const zIndexName = mapping[shadowName] || 'base';
    return elevation.zIndex[zIndexName as keyof typeof elevation.zIndex] || 0;
  }

  const componentElevationData = Object.entries(elevation.componentElevation).map(
    ([component, config]) => ({
      component,
      config,
    }),
  );

  const coloredShadowData = Object.entries(elevation.coloredShadow).map(([color, variants]) => ({
    color,
    variants: Object.entries(variants).map(([size, shadow]) => ({ size, shadow })),
  }));

  return (
    <div className="space-y-12 max-w-7xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Heading level="h1">Shadow & Elevation Tokens</Heading>
            <Text variant="lead">
              Elevation system for creating depth and visual hierarchy with shadows and z-index
              layers.
            </Text>
          </div>
          <Badge variant={isDark ? 'default' : 'secondary'} size="lg">
            {isDark ? 'Dark' : 'Light'} Shadows
          </Badge>
        </div>
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 space-y-2">
          <Text variant="small" className="text-muted-foreground">
            <strong>Tip:</strong> Click on shadow values to copy them. Shadows automatically adapt
            for dark mode.
          </Text>
          <Text variant="small" className="text-muted-foreground">
            🌑 Dark mode uses enhanced shadows with higher opacity for better visibility.
          </Text>
        </div>
      </div>

      {/* Interactive Shadow Scale */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Heading level="h2" spacing="tight">
              Box Shadows
            </Heading>
            <Badge variant="outline" size="sm">
              Multi-layer depth
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Text variant="small" className="text-muted-foreground">
              Preview:
            </Text>
            <select
              value={selectedElevation}
              onChange={(e) => setSelectedElevation(e.target.value)}
              className="border border-border rounded px-2 py-1 text-sm bg-background"
            >
              {shadowData
                .filter((s) => s.name !== 'none' && s.name !== 'inner')
                .map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {shadowData.map(({ name, value, description, zIndex }) => {
            const isSelected = name === selectedElevation;
            const shadowValue =
              isDark && elevation.darkShadow[name as keyof typeof elevation.darkShadow]
                ? (elevation.darkShadow[name as keyof typeof elevation.darkShadow] as string)
                : value;

            // Special handling for different shadow types
            const displayShadow = name === 'none' ? 'none' : shadowValue;
            const cardLabel = name === 'none' ? 'Flat' : name === 'inner' ? 'Inset' : 'Card';

            // Ensure shadow value is valid CSS
            const safeShadowValue = displayShadow;

            return (
              <div key={name} className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Text weight="semibold">{name}</Text>
                    {isSelected && (
                      <Badge variant="default" size="sm">
                        Preview
                      </Badge>
                    )}
                  </div>
                  <CopyButton text={`shadow-${name}`} itemKey={`shadow-class-${name}`}>
                    <Text variant="code" className="text-xs text-muted-foreground">
                      shadow-{name}
                    </Text>
                  </CopyButton>
                  <Text variant="small" className="text-muted-foreground">
                    {description}
                  </Text>
                  {zIndex > 0 && (
                    <Badge variant="outline" size="sm">
                      z-index: {zIndex}
                    </Badge>
                  )}
                </div>
                <div className="flex justify-center">
                  <div
                    className={`w-24 h-16 bg-card border border-border/50 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      isSelected ? 'scale-110' : 'hover:scale-105'
                    }`}
                    style={{ boxShadow: safeShadowValue }}
                  >
                    <Text variant="small" className="text-muted-foreground">
                      {cardLabel}
                    </Text>
                  </div>
                </div>
                <CopyButton text={shadowValue || 'none'} itemKey={`shadow-value-${name}`}>
                  <div className="text-xs text-muted-foreground break-all p-2 bg-muted/50 rounded text-center block hover:bg-muted transition-colors cursor-pointer">
                    <Text variant="code" className="text-xs">
                      {(shadowValue || 'none').length > 60
                        ? `${(shadowValue || 'none').substring(0, 60)}...`
                        : shadowValue || 'none'}
                    </Text>
                  </div>
                </CopyButton>
              </div>
            );
          })}
        </div>
      </div>

      {/* Z-Index Scale */}
      <div className="space-y-6">
        <Heading level="h2" spacing="tight">
          Z-Index Layers
        </Heading>
        <div className="space-y-2">
          {zIndexData.map(({ name, value, description }) => (
            <div
              key={name}
              className="flex items-center space-x-6 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div className="w-20">
                <CopyButton text={name} itemKey={`z-${name}`}>
                  <Text variant="code" className="text-xs font-medium">
                    {name}
                  </Text>
                </CopyButton>
              </div>
              <div className="w-20">
                <CopyButton text={value.toString()} itemKey={`z-value-${name}`}>
                  <Badge
                    variant={value < 0 ? 'destructive' : value === 0 ? 'secondary' : 'default'}
                    size="sm"
                  >
                    {value}
                  </Badge>
                </CopyButton>
              </div>
              <div className="flex-1">
                <Text variant="small" className="text-muted-foreground">
                  {description}
                </Text>
              </div>
              <div
                className="w-16 h-8 bg-gradient-to-r from-primary/30 to-secondary/30 rounded border border-border"
                style={{
                  opacity: Math.max(0.1, Math.min(1, (value + 100) / 2000)),
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Component Elevation Mapping */}
      <div className="space-y-6">
        <Heading level="h2" spacing="tight">
          Component Elevation
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {componentElevationData.map(({ component, config }) => (
            <div key={component} className="border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Text weight="semibold" className="capitalize">
                  {component}
                </Text>
                <Badge variant="outline" size="sm">
                  {Object.keys(config).length} states
                </Badge>
              </div>
              <div className="space-y-3">
                {Object.entries(config).map(([state, value]) => {
                  if (typeof value === 'object' && 'shadow' in value) {
                    return (
                      <div key={state} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Text variant="small" weight="medium">
                            {state}
                          </Text>
                          <div className="flex items-center space-x-2">
                            <CopyButton
                              text={value.shadow}
                              itemKey={`comp-${component}-${state}-shadow`}
                            >
                              <Badge variant="secondary" size="sm">
                                Shadow
                              </Badge>
                            </CopyButton>
                            <CopyButton
                              text={value.zIndex.toString()}
                              itemKey={`comp-${component}-${state}-z`}
                            >
                              <Badge variant="outline" size="sm">
                                z: {value.zIndex}
                              </Badge>
                            </CopyButton>
                          </div>
                        </div>
                        <div
                          className="h-8 bg-muted/50 rounded border flex items-center justify-center"
                          style={{ boxShadow: value.shadow }}
                        >
                          <Text variant="small" className="text-muted-foreground">
                            {state}
                          </Text>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={state} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Text variant="small" weight="medium">
                            {state}
                          </Text>
                          <CopyButton text={value as string} itemKey={`comp-${component}-${state}`}>
                            <Text variant="code" className="text-xs text-muted-foreground">
                              {(value as string).split(' ')[0]}...
                            </Text>
                          </CopyButton>
                        </div>
                        <div
                          className="h-8 bg-muted/50 rounded border flex items-center justify-center"
                          style={{ boxShadow: value as string }}
                        >
                          <Text variant="small" className="text-muted-foreground">
                            {state}
                          </Text>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Colored Shadows */}
      <div className="space-y-6">
        <Heading level="h2" spacing="tight">
          Colored Shadows
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coloredShadowData.map(({ color, variants }) => (
            <div key={color} className="space-y-4">
              <div className="text-center">
                <Text weight="semibold" className="capitalize">
                  {color}
                </Text>
                <Text variant="small" className="text-muted-foreground">
                  Brand shadows
                </Text>
              </div>
              <div className="space-y-3">
                {variants.map(({ size, shadow }) => (
                  <div key={size} className="space-y-2">
                    <Text variant="small" weight="medium" className="text-center">
                      {size}
                    </Text>
                    <div
                      className="h-12 bg-card rounded border border-border/50 flex items-center justify-center"
                      style={{ boxShadow: shadow }}
                    >
                      <CopyButton text={shadow} itemKey={`colored-${color}-${size}`}>
                        <Text
                          variant="small"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Click to copy
                        </Text>
                      </CopyButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guidelines */}
      <div className="bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 rounded-xl p-8 space-y-6">
        <Heading level="h3" spacing="tight">
          Elevation Guidelines
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Text weight="semibold">Elevation Hierarchy</Text>
            <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <div>• Use consistent elevation levels throughout your interface</div>
              <div>• Higher elevations should be reserved for more important elements</div>
              <div>• Maintain logical stacking relationships</div>
            </div>
          </div>
          <div className="space-y-3">
            <Text weight="semibold">Dark Mode Considerations</Text>
            <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <div>• Shadows are automatically adjusted for dark backgrounds</div>
              <div>• Higher opacity shadows provide better contrast</div>
              <div>• Test elevation visibility on dark surfaces</div>
            </div>
          </div>
          <div className="space-y-3">
            <Text weight="semibold">Performance Tips</Text>
            <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <div>• Avoid excessive shadow layers on mobile</div>
              <div>• Use colored shadows sparingly for emphasis</div>
              <div>• Consider animation performance with complex shadows</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ShadowTokens: Story = {
  render: ShadowTokensTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Shadow and elevation tokens for creating depth and visual hierarchy.',
      },
    },
  },
};

// Enhanced Motion and Animation Tokens
const MotionTokensTemplate = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<Record<string, boolean>>({});

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(key);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const CopyButton = ({
    text,
    itemKey,
    children,
  }: {
    text: string;
    itemKey: string;
    children: React.ReactNode;
  }) => {
    const isCopied = copiedItem === itemKey;
    return (
      <button
        onClick={() => copyToClipboard(text, itemKey)}
        className="relative hover:bg-muted/50 rounded px-1 transition-colors"
        title="Click to copy"
      >
        {children}
        {isCopied && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap animate-pulse z-10">
            Copied!
          </div>
        )}
      </button>
    );
  };

  const triggerAnimation = (key: string) => {
    setIsAnimating((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setIsAnimating((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const durationData = Object.entries(motion.duration).map(([name, value]) => ({
    name,
    value,
    description: getDurationDescription(name),
    pixels: parseFloat(value) * 0.1, // For visual representation
  }));

  const easingData = Object.entries(motion.easing).map(([name, value]) => ({
    name,
    value,
    description: getEasingDescription(name),
  }));

  const presetData = Object.entries(motion.presets).map(([name, preset]) => ({
    name,
    ...preset,
    description: getPresetDescription(name),
  }));

  function getDurationDescription(name: string): string {
    const descriptions: Record<string, string> = {
      instant: 'Instant feedback for micro-interactions',
      fast: 'Fast transitions for hover states and toggles',
      normal: 'Standard UI transitions (recommended default)',
      moderate: 'Moderate transitions for content changes',
      slow: 'Slow transitions for major layout changes',
      slower: 'Extra slow for complex animations',
      slowest: 'Very slow for dramatic effects and loading',
    };
    return descriptions[name] || 'Custom duration value';
  }

  function getEasingDescription(name: string): string {
    const descriptions: Record<string, string> = {
      linear: 'Constant speed throughout animation',
      default: 'Subtle ease for most UI interactions',
      in: 'Acceleration from rest (slow start)',
      out: 'Deceleration to rest (slow end)',
      inOut: 'Acceleration then deceleration',
      bounce: 'Playful overshoot effect',
      sharp: 'Quick, decisive motion',
      smooth: 'Gentle, flowing motion',
      elastic: 'Spring-like motion with overshoot',
    };
    return descriptions[name] || 'Custom easing function';
  }

  function getPresetDescription(name: string): string {
    const descriptions: Record<string, string> = {
      button: 'Optimized for button hover and focus states',
      modal: 'Smooth modal and dialog enter/exit',
      dropdown: 'Quick dropdown and menu reveals',
      page: 'Page transitions and route changes',
      tooltip: 'Fast tooltip appearance and disappearance',
      spinner: 'Continuous loading spinner rotation',
      accordion: 'Smooth accordion expand/collapse',
      tabs: 'Tab switching and content changes',
      validation: 'Form validation feedback with bounce',
      notification: 'Notification slide-in with spring',
    };
    return descriptions[name] || 'Custom animation preset';
  }

  return (
    <div className="space-y-12 max-w-7xl">
      <div className="space-y-4">
        <Heading level="h1">Motion & Animation Tokens</Heading>
        <Text variant="lead">
          Consistent timing and easing for smooth, purposeful animations that enhance user
          experience.
        </Text>
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4">
          <Text variant="small" className="text-muted-foreground">
            <strong>Tip:</strong> Click on timing values to copy them. Click "Preview" buttons to
            see animations in action.
          </Text>
        </div>
      </div>

      {/* Animation Durations */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Heading level="h2" spacing="tight">
            Animation Durations
          </Heading>
          <Badge variant="outline" size="sm">
            Human perception optimized
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {durationData.map(({ name, value, description }) => {
            const animKey = `duration-${name}`;
            const isActive = isAnimating[animKey];
            return (
              <div key={name} className="border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Text weight="semibold" className="capitalize">
                      {name}
                    </Text>
                    <CopyButton text={value} itemKey={`duration-${name}`}>
                      <Badge variant="secondary" size="sm">
                        {value}
                      </Badge>
                    </CopyButton>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => triggerAnimation(animKey)}
                    disabled={isActive}
                  >
                    {isActive ? 'Playing...' : 'Preview'}
                  </Button>
                </div>
                <Text variant="small" className="text-muted-foreground leading-relaxed">
                  {description}
                </Text>
                <div className="bg-muted/50 rounded-lg p-4 overflow-hidden">
                  <div
                    className={`h-3 bg-gradient-to-r from-primary to-secondary rounded-full transition-all ${
                      isActive ? 'w-full' : 'w-[20%]'
                    }`}
                    style={{
                      transitionDuration: isActive ? value : '150ms',
                      transitionTimingFunction: 'ease-out',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Easing Functions */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Heading level="h2" spacing="tight">
            Easing Functions
          </Heading>
          <Badge variant="outline" size="sm">
            Bezier curves
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {easingData.map(({ name, value, description }) => {
            const animKey = `easing-${name}`;
            const isActive = isAnimating[animKey];
            return (
              <div key={name} className="border border-border rounded-lg p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Text weight="semibold" className="capitalize">
                      {name}
                    </Text>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => triggerAnimation(animKey)}
                      disabled={isActive}
                    >
                      {isActive ? 'Playing...' : 'Preview'}
                    </Button>
                  </div>
                  <CopyButton text={value} itemKey={`easing-${name}`}>
                    <Text
                      variant="code"
                      className="text-xs text-muted-foreground block bg-muted/50 p-2 rounded hover:bg-muted transition-colors"
                    >
                      {value.length > 30 ? `${value.substring(0, 30)}...` : value}
                    </Text>
                  </CopyButton>
                  <Text variant="small" className="text-muted-foreground leading-relaxed">
                    {description}
                  </Text>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 h-16 relative overflow-hidden">
                  <div
                    className={`absolute w-4 h-4 bg-primary rounded-full transition-all duration-1000 ${
                      isActive ? 'translate-x-[200px]' : 'translate-x-0'
                    }`}
                    style={{
                      transitionTimingFunction: value,
                      top: '50%',
                      transform: `translateY(-50%) translateX(${isActive ? '200px' : '0px'})`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-px bg-border"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animation Presets */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Heading level="h2" spacing="tight">
            Animation Presets
          </Heading>
          <Badge variant="outline" size="sm">
            Component optimized
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {presetData.map(({ name, duration, easing, description }) => {
            const animKey = `preset-${name}`;
            const isActive = isAnimating[animKey];
            return (
              <div key={name} className="border border-border rounded-lg p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Text weight="semibold" className="capitalize">
                      {name}
                    </Text>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => triggerAnimation(animKey)}
                      disabled={isActive}
                    >
                      {isActive ? 'Playing...' : 'Preview'}
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CopyButton text={duration} itemKey={`preset-${name}-duration`}>
                      <Badge variant="secondary" size="sm">
                        {duration}
                      </Badge>
                    </CopyButton>
                    <CopyButton text={easing} itemKey={`preset-${name}-easing`}>
                      <Badge variant="outline" size="sm">
                        {easing.length > 15 ? `${easing.substring(0, 15)}...` : easing}
                      </Badge>
                    </CopyButton>
                  </div>
                  <Text variant="small" className="text-muted-foreground leading-relaxed">
                    {description}
                  </Text>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 min-h-[4rem] flex items-center justify-center">
                  <div
                    className={`px-4 py-2 bg-primary text-primary-foreground rounded transition-all ${
                      isActive ? 'scale-110 shadow-lg' : 'scale-100'
                    }`}
                    style={{
                      transitionDuration: duration,
                      transitionTimingFunction: easing,
                    }}
                  >
                    <Text variant="small" weight="medium">
                      {name}
                    </Text>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Keyframe Animations */}
      <div className="space-y-6">
        <Heading level="h2" spacing="tight">
          Keyframe Animations
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(motion.keyframes)
            .slice(0, 6)
            .map(([name, keyframe]) => {
              const animKey = `keyframe-${name}`;
              const isActive = isAnimating[animKey];
              return (
                <div key={name} className="border border-border rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Text weight="semibold" className="capitalize">
                      {name.replace(/([A-Z])/g, ' $1').trim()}
                    </Text>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => triggerAnimation(animKey)}
                      disabled={isActive}
                    >
                      {isActive ? 'Playing...' : 'Preview'}
                    </Button>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 h-16 flex items-center justify-center overflow-hidden">
                    <div
                      className={`w-8 h-8 bg-primary rounded ${
                        isActive ? getAnimationClass(name) : ''
                      }`}
                      style={{
                        animationDuration: isActive ? '1s' : '0s',
                        animationFillMode: 'forwards',
                      }}
                    />
                  </div>
                  <CopyButton text={JSON.stringify(keyframe, null, 2)} itemKey={`keyframe-${name}`}>
                    <Text
                      variant="code"
                      className="text-xs text-muted-foreground bg-muted/50 p-2 rounded block hover:bg-muted transition-colors"
                    >
                      @keyframes {name}
                    </Text>
                  </CopyButton>
                </div>
              );
            })}
        </div>
      </div>

      {/* Accessibility & Performance */}
      <div className="bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 rounded-xl p-8 space-y-6">
        <Heading level="h3" spacing="tight">
          Accessibility & Performance
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <Text weight="semibold">Reduced Motion Support</Text>
            </div>
            <Text variant="small" className="text-muted-foreground leading-relaxed">
              All animations automatically respect the user's motion preferences via{' '}
              <code>prefers-reduced-motion</code>. When reduced motion is preferred, animations are
              either disabled or significantly reduced.
            </Text>
            <div className="bg-background/50 rounded-lg p-4">
              <CopyButton text={motion.reducedMotion.mediaQuery} itemKey="reduced-motion-query">
                <Text variant="code" className="text-sm">
                  {motion.reducedMotion.mediaQuery}
                </Text>
              </CopyButton>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <Text weight="semibold">Performance Guidelines</Text>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <div>
                • Use <code>transform</code> and <code>opacity</code> for the smoothest animations
              </div>
              <div>
                • Avoid animating layout properties like <code>width</code>, <code>height</code>,{' '}
                <code>padding</code>
              </div>
              <div>• Keep animation durations under 500ms for UI interactions</div>
              <div>
                • Use <code>will-change</code> sparingly and remove after animation
              </div>
              <div>• Test performance on lower-end devices</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes slideIn {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes scaleIn {
          0% {
            transform: scale(0.8);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(-25%);
          }
          50% {
            transform: translateY(0);
          }
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        .animate-slide-in {
          animation: slideIn 1s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 1s ease-out;
        }
        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .animate-pulse {
          animation: pulse 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );

  function getAnimationClass(name: string): string {
    const classMap: Record<string, string> = {
      fadeIn: 'animate-fade-in',
      slideInLeft: 'animate-slide-in',
      scaleIn: 'animate-scale-in',
      bounce: 'animate-bounce',
      spin: 'animate-spin',
      pulse: 'animate-pulse',
    };
    return classMap[name] || 'animate-pulse';
  }
};

export const MotionTokens: Story = {
  render: MotionTokensTemplate,
  parameters: {
    docs: {
      description: {
        story: 'Animation duration and easing tokens for consistent motion design.',
      },
    },
  },
};
