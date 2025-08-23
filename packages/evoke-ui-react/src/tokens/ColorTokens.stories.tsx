import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Heading } from '../atoms/Heading/Heading';
import { Text } from '../atoms/Text/Text';
import { Badge } from '../atoms/Badge/Badge';

const meta = {
  title: 'Design System/Color',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Design tokens are the foundation of the Evoke UI design system, providing consistent values for colors, typography, spacing, and more. All tokens are defined as CSS variables in the styles folder.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Simplified Color Tokens
const ColorTokensTemplate = () => {
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
            ></div>
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
                OKLCH
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
    'Gray Scale': [
      {
        name: `Gray 50`,
        description: `Gray scale 50 - for backgrounds, text, and neutral elements`,
        cssVar: `--ui-color-gray-50`,
        tailwindClass: `bg-gray-50`,
      },
      {
        name: `Gray 100`,
        description: `Gray scale 100 - for backgrounds, text, and neutral elements`,
        cssVar: `--ui-color-gray-100`,
        tailwindClass: `bg-gray-100`,
      },
      {
        name: `Gray 200`,
        description: `Gray scale 200 - for backgrounds, text, and neutral elements`,
        cssVar: `--ui-color-gray-200`,
        tailwindClass: `bg-gray-200`,
      },
      {
        name: `Gray 300`,
        description: `Gray scale 300 - for backgrounds, text, and neutral elements`,
        cssVar: `--ui-color-gray-300`,
        tailwindClass: `bg-gray-300`,
      },
      {
        name: `Gray 400`,
        description: `Gray scale 400 - for backgrounds, text, and neutral elements`,
        cssVar: `--ui-color-gray-400`,
        tailwindClass: `bg-gray-400`,
      },
      {
        name: `Gray 500`,
        description: `Gray scale 500 - for backgrounds, text, and neutral elements`,
        cssVar: `--ui-color-gray-500`,
        tailwindClass: `bg-gray-500`,
      },
      {
        name: `Gray 600`,
        description: `Gray scale 600 - for backgrounds, text, and neutral elements`,
        cssVar: `--ui-color-gray-600`,
        tailwindClass: `bg-gray-600`,
      },
      {
        name: `Gray 700`,
        description: `Gray scale 700 - for backgrounds, text, and neutral elements`,
        cssVar: `--ui-color-gray-700`,
        tailwindClass: `bg-gray-700`,
      },
      {
        name: `Gray 800`,
        description: `Gray scale 800 - for backgrounds, text, and neutral elements`,
        cssVar: `--ui-color-gray-800`,
        tailwindClass: `bg-gray-800`,
      },
      {
        name: `Gray 900`,
        description: `Gray scale 900 - for backgrounds, text, and neutral elements`,
        cssVar: `--ui-color-gray-900`,
        tailwindClass: `bg-gray-900`,
      },
      {
        name: `Gray 950`,
        description: `Gray scale 950 - for backgrounds, text, and neutral elements`,
        cssVar: `--ui-color-gray-950`,
        tailwindClass: `bg-gray-950`,
      },
    ],
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
        <div className="space-y-2">
          <Heading level="h1">Color Tokens</Heading>
          <Text variant="lead">
            Our color system uses OKLCH color space for perceptually uniform color manipulation and
            better accessibility. All colors are defined as CSS variables in the styles folder.
          </Text>
        </div>

        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 space-y-2">
          <Text variant="small" className="text-muted-foreground">
            <strong>Tip:</strong> Click on color swatches or values to copy them to your clipboard.
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
