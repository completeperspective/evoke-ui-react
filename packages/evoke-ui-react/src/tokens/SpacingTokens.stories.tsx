import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Heading } from '../atoms/Heading/Heading';
import { Text } from '../atoms/Text/Text';
import { Badge } from '../atoms/Badge/Badge';

const meta = {
  title: 'Design System/Spacing',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Spacing tokens provide consistent padding, margin, and gap values throughout the design system. Built on a 4px grid system for consistent rhythm and alignment.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Spacing Tokens Template
const SpacingTokensTemplate = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(key);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const SpacingToken = ({
    name,
    cssVar,
    tailwindClass,
    value,
    pixels,
    description,
    useCase,
  }: {
    name: string;
    cssVar: string;
    tailwindClass: string;
    value: string;
    pixels: string;
    description: string;
    useCase: string;
  }) => {
    const tokenKey = `spacing-${name}`;

    return (
      <div className="group border border-border/50 rounded-xl p-6 hover:shadow-lg hover:border-border transition-all duration-300 bg-gradient-to-br from-card to-card/50">
        <div className="space-y-6">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border/20">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Text weight="semibold" className="text-lg">
                  {name}
                </Text>
                <Badge variant="outline" size="sm" className="font-mono text-xs">
                  {pixels}
                </Badge>
              </div>
            </div>
          </div>

          {/* Enhanced Visual Demonstrations */}
          <div className="space-y-5">
            {/* Padding visualization */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <Text variant="small" weight="medium" className="text-primary">
                  Padding
                </Text>
              </div>
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <div
                  className={`bg-primary/10 border-2 border-dashed border-primary/30 rounded-md flex items-center justify-center min-h-[3rem] text-primary font-mono text-sm ${tailwindClass.replace('m-', 'p-')}`}
                >
                  {value}
                </div>
              </div>
            </div>

            {/* Margin visualization */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <Text
                  variant="small"
                  weight="medium"
                  className="text-success"
                >
                  Margin
                </Text>
              </div>
              <div className="bg-success/5 rounded-lg p-6 border border-success/20">
                <div
                  className={`bg-success/10 border-2 border-dashed border-success/30 rounded-md flex items-center justify-center min-h-[2.5rem] text-success font-mono text-sm ${tailwindClass.replace('p-', 'm-')}`}
                >
                  {value}
                </div>
              </div>
            </div>

            {/* Gap visualization for larger values */}
            {parseInt(pixels) >= 0 && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <Text
                    variant="small"
                    weight="medium"
                    className="text-warning"
                  >
                    Gap (Flex)
                  </Text>
                </div>
                <div className="bg-warning/5 rounded-lg p-4 border border-warning/20">
                  <div className={`flex justify-center ${tailwindClass.replace('p-', 'gap-')}`}>
                    <div className="w-10 h-10 bg-warning/20 border border-warning/30 rounded-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                    </div>
                    <div className="w-10 h-10 bg-warning/20 border border-warning/30 rounded-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                    </div>
                    <div className="w-10 h-10 bg-warning/20 border border-warning/30 rounded-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Copy Buttons */}
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => copyToClipboard(cssVar, `${tokenKey}-css`)}
              className="text-left w-full hover:bg-muted/50 rounded-lg px-3 py-2 transition-all duration-200 border border-transparent hover:border-border/50 group/copy"
            >
              <div className="flex items-center justify-between">
                <Text
                  variant="code"
                  className={`text-xs transition-colors ${
                    copiedItem === `${tokenKey}-css`
                      ? 'text-primary'
                      : 'text-muted-foreground group-hover/copy:text-foreground'
                  }`}
                >
                  {cssVar}
                </Text>
                {copiedItem === `${tokenKey}-css` && (
                  <span className="text-primary text-xs">✓ Copied</span>
                )}
              </div>
            </button>

            <button
              onClick={() => copyToClipboard(tailwindClass, `${tokenKey}-tw`)}
              className="text-left w-full hover:bg-muted/50 rounded-lg px-3 py-2 transition-all duration-200 border border-transparent hover:border-border/50 group/copy"
            >
              <div className="flex items-center justify-between">
                <Text
                  variant="code"
                  className={`text-xs transition-colors ${
                    copiedItem === `${tokenKey}-tw`
                      ? 'text-primary'
                      : 'text-muted-foreground group-hover/copy:text-foreground'
                  }`}
                >
                  {tailwindClass}
                </Text>
                {copiedItem === `${tokenKey}-tw` && (
                  <span className="text-primary text-xs">✓ Copied</span>
                )}
              </div>
            </button>
          </div>

          {/* Enhanced Description */}
          <div className="bg-gradient-to-r from-muted/10 to-muted/20 rounded-lg p-4 border border-border/30">
            <div className="space-y-2">
              <Text variant="small" weight="medium" className="text-foreground">
                {useCase}
              </Text>
              <Text variant="small" className="text-muted-foreground leading-relaxed">
                {description}
              </Text>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const spacingTokens = {
    'Micro Spacing (0-4px)': [
      {
        name: '0',
        cssVar: '--ui-space-0',
        tailwindClass: 'p-0 / m-0 / gap-0',
        value: '0rem',
        pixels: '0px',
        description: 'Zero spacing - removes all space between elements',
        useCase: 'Resetting spacing, tight layouts, overlapping elements',
      },
      {
        name: 'px',
        cssVar: '--ui-space-px',
        tailwindClass: 'p-px / m-px',
        value: '0.0625rem',
        pixels: '1px',
        description: 'Single pixel spacing - minimal separation',
        useCase: 'Hairline borders, subtle separations, precise adjustments',
      },
      {
        name: '0.5',
        cssVar: '--ui-space-0_5',
        tailwindClass: 'p-0.5 / m-0.5 / gap-0.5',
        value: '0.125rem',
        pixels: '2px',
        description: 'Extra small spacing - very tight layouts',
        useCase: 'Dense UI components, compact forms, icon spacing',
      },
      {
        name: '1',
        cssVar: '--ui-space-1',
        tailwindClass: 'p-1 / m-1 / gap-1',
        value: '0.25rem',
        pixels: '4px',
        description: 'Small spacing - base unit of 4px grid',
        useCase: 'Small padding inside buttons, tight element spacing',
      },
    ],
    'Small Spacing (6-12px)': [
      {
        name: '1.5',
        cssVar: '--ui-space-1_5',
        tailwindClass: 'p-1.5 / m-1.5 / gap-1.5',
        value: '0.375rem',
        pixels: '6px',
        description: 'Small+ spacing - slightly more breathing room',
        useCase: 'Small component padding, close element relationships',
      },
      {
        name: '2',
        cssVar: '--ui-space-2',
        tailwindClass: 'p-2 / m-2 / gap-2',
        value: '0.5rem',
        pixels: '8px',
        description: 'Small spacing - comfortable for small elements',
        useCase: 'Badge padding, small button spacing, form field gaps',
      },
      {
        name: '2.5',
        cssVar: '--ui-space-2_5',
        tailwindClass: 'p-2.5 / m-2.5 / gap-2.5',
        value: '0.625rem',
        pixels: '10px',
        description: 'Small+ spacing - between small and medium',
        useCase: 'Input field padding, card content spacing',
      },
      {
        name: '3',
        cssVar: '--ui-space-3',
        tailwindClass: 'p-3 / m-3 / gap-3',
        value: '0.75rem',
        pixels: '12px',
        description: 'Medium-small spacing - common for component interiors',
        useCase: 'Button padding, small card padding, list item spacing',
      },
    ],
    'Medium Spacing (14-24px)': [
      {
        name: '3.5',
        cssVar: '--ui-space-3_5',
        tailwindClass: 'p-3.5 / m-3.5 / gap-3.5',
        value: '0.875rem',
        pixels: '14px',
        description: 'Medium- spacing - slightly larger component spacing',
        useCase: 'Form field padding, medium button spacing',
      },
      {
        name: '4',
        cssVar: '--ui-space-4',
        tailwindClass: 'p-4 / m-4 / gap-4',
        value: '1rem',
        pixels: '16px',
        description: 'Medium spacing - standard component padding',
        useCase: 'Card padding, section spacing, standard margins',
      },
      {
        name: '5',
        cssVar: '--ui-space-5',
        tailwindClass: 'p-5 / m-5 / gap-5',
        value: '1.25rem',
        pixels: '20px',
        description: 'Medium+ spacing - comfortable component breathing room',
        useCase: 'Large card padding, section separations, content areas',
      },
      {
        name: '6',
        cssVar: '--ui-space-6',
        tailwindClass: 'p-6 / m-6 / gap-6',
        value: '1.5rem',
        pixels: '24px',
        description: 'Large-medium spacing - generous component padding',
        useCase: 'Modal padding, main content areas, form sections',
      },
    ],
    'Large Spacing (28-48px)': [
      {
        name: '7',
        cssVar: '--ui-space-7',
        tailwindClass: 'p-7 / m-7 / gap-7',
        value: '1.75rem',
        pixels: '28px',
        description: 'Large- spacing - substantial separation',
        useCase: 'Large section padding, modal content spacing',
      },
      {
        name: '8',
        cssVar: '--ui-space-8',
        tailwindClass: 'p-8 / m-8 / gap-8',
        value: '2rem',
        pixels: '32px',
        description: 'Large spacing - major component separation',
        useCase: 'Page section padding, large card margins, hero sections',
      },
      {
        name: '10',
        cssVar: '--ui-space-10',
        tailwindClass: 'p-10 / m-10 / gap-10',
        value: '2.5rem',
        pixels: '40px',
        description: 'Extra large spacing - significant visual breaks',
        useCase: 'Page margins, section separations, layout spacing',
      },
      {
        name: '12',
        cssVar: '--ui-space-12',
        tailwindClass: 'p-12 / m-12 / gap-12',
        value: '3rem',
        pixels: '48px',
        description: 'Very large spacing - major layout separations',
        useCase: 'Page-level spacing, hero section padding, major separations',
      },
    ],
    'Extra Large Spacing (64px+)': [
      {
        name: '16',
        cssVar: '--ui-space-16',
        tailwindClass: 'p-16 / m-16 / gap-16',
        value: '4rem',
        pixels: '64px',
        description: 'Extra large spacing - major visual hierarchy',
        useCase: 'Page header margins, section breaks, landing page spacing',
      },
      {
        name: '20',
        cssVar: '--ui-space-20',
        tailwindClass: 'p-20 / m-20 / gap-20',
        value: '5rem',
        pixels: '80px',
        description: 'Huge spacing - dramatic visual separation',
        useCase: 'Landing page sections, hero area margins',
      },
      {
        name: '24',
        cssVar: '--ui-space-24',
        tailwindClass: 'p-24 / m-24 / gap-24',
        value: '6rem',
        pixels: '96px',
        description: 'Massive spacing - major page-level separations',
        useCase: 'Page-level margins, major section breaks',
      },
      {
        name: '32',
        cssVar: '--ui-space-32',
        tailwindClass: 'p-32 / m-32 / gap-32',
        value: '8rem',
        pixels: '128px',
        description: 'Maximum spacing - extreme visual separation',
        useCase: 'Landing page hero sections, major layout blocks',
      },
    ],
  };

  const radiusTokens = [
    {
      name: 'None',
      cssVar: '--ui-radius-none',
      tailwindClass: 'rounded-none',
      value: '0',
      description: 'No border radius - sharp corners',
    },
    {
      name: 'Small',
      cssVar: '--ui-radius-sm',
      tailwindClass: 'rounded-sm',
      value: '0.125rem',
      description: 'Small radius - subtle rounding',
    },
    {
      name: 'Medium',
      cssVar: '--ui-radius-md',
      tailwindClass: 'rounded-md',
      value: '0.375rem',
      description: 'Medium radius - standard component rounding',
    },
    {
      name: 'Large',
      cssVar: '--ui-radius-lg',
      tailwindClass: 'rounded-lg',
      value: '0.5rem',
      description: 'Large radius - prominent rounding',
    },
    {
      name: 'Extra Large',
      cssVar: '--ui-radius-xl',
      tailwindClass: 'rounded-xl',
      value: '0.75rem',
      description: 'Extra large radius - very rounded',
    },
    {
      name: '2X Large',
      cssVar: '--ui-radius-2xl',
      tailwindClass: 'rounded-2xl',
      value: '1rem',
      description: 'Very large radius - highly rounded',
    },
    {
      name: 'Full',
      cssVar: '--ui-radius-full',
      tailwindClass: 'rounded-full',
      value: '9999px',
      description: 'Full radius - perfect circle/pill shape',
    },
  ];

  return (
    <div className="space-y-12 max-w-7xl">
      {/* Header */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Heading level="h1">Spacing Tokens</Heading>
          <Text variant="lead">
            Consistent spacing values built on a 4px grid system for perfect alignment and visual
            rhythm. Use these tokens for padding, margins, and gaps throughout your components.
          </Text>
        </div>

        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 space-y-2">
          <Text variant="small" className="text-muted-foreground">
            <strong>4px Grid System:</strong> All spacing values are multiples of 4px for consistent
            visual rhythm.
          </Text>
          <Text variant="small" className="text-muted-foreground">
            <strong>Tip:</strong> Click on any CSS variable or Tailwind class to copy it to your
            clipboard.
          </Text>
        </div>
      </div>

      {/* Spacing Token Groups */}
      {Object.entries(spacingTokens).map(([groupName, tokens]) => (
        <div key={groupName} className="space-y-6">
          <div className="flex items-center space-x-3">
            <Heading level="h2" spacing="tight">
              {groupName}
            </Heading>
            <Badge variant="outline" size="sm">
              {tokens.length} tokens
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {tokens.map((token) => (
              <SpacingToken key={`${groupName}-${token.name}`} {...token} />
            ))}
          </div>
        </div>
      ))}

      {/* Enhanced Border Radius Section */}
      <div className="space-y-8">
        <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-accent rounded-full"></div>
              <Heading level="h2" spacing="tight" className="text-2xl">
                Border Radius
              </Heading>
            </div>
            <Badge variant="outline" size="sm" className="font-mono">
              {radiusTokens.length} tokens
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {radiusTokens.map((radius) => {
              const tokenKey = `radius-${radius.name.toLowerCase().replace(/\s+/g, '-')}`;
              return (
                <div
                  key={radius.name}
                  className="group border border-border/50 rounded-xl p-4 hover:shadow-lg hover:border-border transition-all duration-300 bg-gradient-to-br from-card to-card/50"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Text weight="semibold" className="text-lg">
                        {radius.name}
                      </Text>
                      <Badge variant="outline" size="sm" className="font-mono text-xs">
                        {radius.value}
                      </Badge>
                    </div>

                    {/* Enhanced Visual demo */}
                    <div className="flex items-center justify-center h-20 bg-accent/5 rounded-lg border border-accent/20">
                      <div
                        className={`w-16 h-12 bg-accent flex items-center justify-center text-accent-foreground text-xs font-semibold ${radius.tailwindClass}`}
                      >
                        Demo
                      </div>
                    </div>

                    {/* Copy buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={() => copyToClipboard(radius.cssVar, `${tokenKey}-css`)}
                        className="text-left w-full group/copy"
                      >
                        <Text
                          variant="small"
                          className={`font-mono transition-colors ${
                            copiedItem === `${tokenKey}-css`
                              ? 'text-primary'
                              : 'text-muted-foreground group-hover/copy:text-foreground'
                          }`}
                        >
                          {radius.cssVar} {copiedItem === `${tokenKey}-css` && '✓'}
                        </Text>
                      </button>

                      <button
                        onClick={() => copyToClipboard(radius.tailwindClass, `${tokenKey}-tw`)}
                        className="text-left w-full group/copy"
                      >
                        <Text
                          variant="small"
                          className={`font-mono transition-colors ${
                            copiedItem === `${tokenKey}-tw`
                              ? 'text-primary'
                              : 'text-muted-foreground group-hover/copy:text-foreground'
                          }`}
                        >
                          {radius.tailwindClass} {copiedItem === `${tokenKey}-tw` && '✓'}
                        </Text>
                      </button>
                    </div>

                    <Text variant="small" className="text-muted-foreground leading-relaxed">
                      {radius.description}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 rounded-xl p-8 space-y-6">
        <Heading level="h3" spacing="tight">
          Spacing Guidelines
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <div className="w-2 h-6 bg-primary rounded-full"></div>
            </div>
            <Text weight="semibold">4px Grid System</Text>
            <Text variant="small" className="text-muted-foreground leading-relaxed">
              All spacing follows 4px increments for consistent visual rhythm and perfect pixel
              alignment across all screen densities.
            </Text>
          </div>

          <div className="space-y-3">
            <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-success rounded border-2 border-success/30"></div>
            </div>
            <Text weight="semibold">Component Hierarchy</Text>
            <Text variant="small" className="text-muted-foreground leading-relaxed">
              Use smaller spacing (1-3) for component interiors, medium (4-8) for sections, and
              large (12+) for page-level separation.
            </Text>
          </div>

          <div className="space-y-3">
            <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center">
              <div className="flex space-x-1">
                <div className="w-1.5 h-4 bg-warning rounded-full"></div>
                <div className="w-1.5 h-4 bg-warning rounded-full"></div>
                <div className="w-1.5 h-4 bg-warning rounded-full"></div>
              </div>
            </div>
            <Text weight="semibold">Consistent Application</Text>
            <Text variant="small" className="text-muted-foreground leading-relaxed">
              Apply spacing consistently across similar components and contexts to create
              predictable, harmonious layouts.
            </Text>
          </div>
        </div>

        <div className="bg-background/50 rounded-lg p-4 mt-6 space-y-3">
          <Text weight="semibold" className="text-foreground">
            Common Patterns
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <Text variant="code" className="text-xs text-foreground">
                Component Interior:
              </Text>
              <Text variant="small" className="text-muted-foreground">
                p-3, p-4 (12px, 16px)
              </Text>
            </div>
            <div>
              <Text variant="code" className="text-xs text-foreground">
                Between Sections:
              </Text>
              <Text variant="small" className="text-muted-foreground">
                mb-8, mb-12 (32px, 48px)
              </Text>
            </div>
            <div>
              <Text variant="code" className="text-xs text-foreground">
                List Item Spacing:
              </Text>
              <Text variant="small" className="text-muted-foreground">
                gap-2, gap-3 (8px, 12px)
              </Text>
            </div>
            <div>
              <Text variant="code" className="text-xs text-foreground">
                Page Margins:
              </Text>
              <Text variant="small" className="text-muted-foreground">
                mx-4, mx-8 (16px, 32px)
              </Text>
            </div>
          </div>
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
          'Complete reference of spacing and border radius tokens used throughout the design system.',
      },
    },
  },
};
