import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Heading, Badge, Button, Text } from '../atoms';

const meta = {
  title: 'Design System/Animation',
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

// Animation Tokens Template
const AnimationTokensTemplate = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<{ [key: string]: boolean }>({});

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(key);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const triggerAnimation = (animationKey: string) => {
    setIsAnimating((prev) => ({ ...prev, [animationKey]: true }));
    setTimeout(() => {
      setIsAnimating((prev) => ({ ...prev, [animationKey]: false }));
    }, 1000); // Reset after 1 second
  };

  const durationTokens = [
    {
      name: 'Instant',
      cssVar: '--ui-duration-instant',
      tailwindClass: 'duration-[75ms]',
      value: '75ms',
      description: 'Instant feedback - for micro-interactions like button press states',
    },
    {
      name: 'Fast',
      cssVar: '--ui-duration-fast',
      tailwindClass: 'duration-150',
      value: '150ms',
      description: 'Fast transitions - for hover effects and quick state changes',
    },
    {
      name: 'Normal',
      cssVar: '--ui-duration-normal',
      tailwindClass: 'duration-[250ms]',
      value: '250ms',
      description: 'Default duration - for most transitions and animations',
    },
    {
      name: 'Moderate',
      cssVar: '--ui-duration-moderate',
      tailwindClass: 'duration-[350ms]',
      value: '350ms',
      description: 'Moderate pace - for complex state changes',
    },
    {
      name: 'Slow',
      cssVar: '--ui-duration-slow',
      tailwindClass: 'duration-500',
      value: '500ms',
      description: 'Slow transitions - for major layout changes',
    },
    {
      name: 'Slower',
      cssVar: '--ui-duration-slower',
      tailwindClass: 'duration-[750ms]',
      value: '750ms',
      description: 'Very slow - for dramatic effects and page transitions',
    },
    {
      name: 'Slowest',
      cssVar: '--ui-duration-slowest',
      tailwindClass: 'duration-1000',
      value: '1000ms',
      description: 'Slowest timing - for loading animations and complex sequences',
    },
  ];

  const easingTokens = [
    {
      name: 'Linear',
      cssVar: '--ui-easing-linear',
      tailwindClass: 'ease-linear',
      value: 'linear',
      description: 'Constant speed throughout - for continuous animations like loading spinners',
    },
    {
      name: 'Default',
      cssVar: '--ui-easing-default',
      tailwindClass: 'ease-[cubic-bezier(0.4,0,0.2,1)]',
      value: 'cubic-bezier(0.4, 0, 0.2, 1)',
      description: 'Default easing - natural feel for most transitions',
    },
    {
      name: 'In',
      cssVar: '--ui-easing-in',
      tailwindClass: 'ease-in',
      value: 'cubic-bezier(0.4, 0, 1, 1)',
      description: 'Ease in - starts slow, accelerates (good for exit animations)',
    },
    {
      name: 'Out',
      cssVar: '--ui-easing-out',
      tailwindClass: 'ease-out',
      value: 'cubic-bezier(0, 0, 0.2, 1)',
      description: 'Ease out - starts fast, decelerates (good for entrance animations)',
    },
    {
      name: 'In-Out',
      cssVar: '--ui-easing-in-out',
      tailwindClass: 'ease-in-out',
      value: 'cubic-bezier(0.4, 0, 0.2, 1)',
      description: 'Ease in-out - slow start and end, fast middle',
    },
    {
      name: 'Bounce',
      cssVar: '--ui-easing-bounce',
      tailwindClass: 'ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]',
      value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      description: 'Bouncy effect - overshoots and settles (use sparingly for delight)',
    },
    {
      name: 'Sharp',
      cssVar: '--ui-easing-sharp',
      tailwindClass: 'ease-[cubic-bezier(0.4,0,0.6,1)]',
      value: 'cubic-bezier(0.4, 0, 0.6, 1)',
      description: 'Sharp timing - quick and decisive',
    },
    {
      name: 'Smooth',
      cssVar: '--ui-easing-smooth',
      tailwindClass: 'ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
      value: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      description: 'Very smooth - gentle and fluid motion',
    },
    {
      name: 'Elastic',
      cssVar: '--ui-easing-elastic',
      tailwindClass: 'ease-[cubic-bezier(0.175,0.885,0.32,1.275)]',
      value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      description: 'Elastic effect - slight overshoot for playful interactions',
    },
  ];

  const presetAnimations = [
    {
      name: 'Fade In',
      description: 'Element appears with opacity transition',
      demoClass: 'opacity-0 transition-opacity duration-300 ease-out',
      activeClass: 'opacity-100',
      cssExample: 'transition: opacity 250ms cubic-bezier(0, 0, 0.2, 1);',
    },
    {
      name: 'Scale In',
      description: 'Element scales from 0 to full size',
      demoClass: 'scale-0 transition-transform duration-300 ease-bounce',
      activeClass: 'scale-100',
      cssExample: 'transition: transform 250ms cubic-bezier(0.68, -0.55, 0.265, 1.55);',
    },
    {
      name: 'Slide Up',
      description: 'Element slides up from below',
      demoClass: 'translate-y-4 opacity-0 transition-all duration-300 ease-out',
      activeClass: 'translate-y-0 opacity-100',
      cssExample: 'transition: transform, opacity 250ms cubic-bezier(0, 0, 0.2, 1);',
    },
    {
      name: 'Slide Down',
      description: 'Element slides down from above',
      demoClass: '-translate-y-4 opacity-0 transition-all duration-300 ease-out',
      activeClass: 'translate-y-0 opacity-100',
      cssExample: 'transition: transform, opacity 250ms cubic-bezier(0, 0, 0.2, 1);',
    },
    {
      name: 'Slide Right',
      description: 'Element slides in from the left',
      demoClass: '-translate-x-4 opacity-0 transition-all duration-300 ease-out',
      activeClass: 'translate-x-0 opacity-100',
      cssExample: 'transition: transform, opacity 250ms cubic-bezier(0, 0, 0.2, 1);',
    },
    {
      name: 'Pulse',
      description: 'Gentle pulsing effect for loading states',
      demoClass: 'animate-pulse',
      activeClass: '',
      cssExample: 'animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;',
    },
  ];

  return (
    <div className="space-y-12 max-w-7xl">
      {/* Duration Tokens */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Heading level="h2">Duration Tokens</Heading>
          <Text variant="lead">
            Timing values for consistent animation durations across the design system.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {durationTokens.map((token) => {
            const tokenKey = `duration-${token.name.toLowerCase()}`;
            return (
              <div
                key={token.name}
                className="border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-card"
              >
                <div className="flex items-center justify-between mb-3">
                  <Text weight="semibold">{token.name}</Text>
                  <Badge variant="secondary" size="sm">
                    {token.value}
                  </Badge>
                </div>

                <div className="space-y-3">
                  {/* Visual demonstration */}
                  <div className="relative h-12 bg-muted/50 rounded-md overflow-hidden">
                    <button
                      onClick={() => triggerAnimation(tokenKey)}
                      className="absolute inset-0 w-full h-full flex items-center justify-center text-sm font-medium bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      Click to demo
                    </button>
                    <div
                      className={`absolute inset-0 bg-primary transition-transform ${
                        isAnimating[tokenKey] ? 'translate-x-0' : '-translate-x-full'
                      }`}
                      style={{
                        transitionDuration: token.value,
                        transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
                      }}
                    />
                  </div>

                  {/* Copy buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => copyToClipboard(token.cssVar, `${tokenKey}-css`)}
                      className="text-left w-full"
                    >
                      <Text
                        variant="small"
                        className={`font-mono transition-colors ${
                          copiedItem === `${tokenKey}-css`
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {token.cssVar} {copiedItem === `${tokenKey}-css` && '✓'}
                      </Text>
                    </button>

                    <button
                      onClick={() => copyToClipboard(token.tailwindClass, `${tokenKey}-tw`)}
                      className="text-left w-full"
                    >
                      <Text
                        variant="small"
                        className={`font-mono transition-colors ${
                          copiedItem === `${tokenKey}-tw`
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {token.tailwindClass} {copiedItem === `${tokenKey}-tw` && '✓'}
                      </Text>
                    </button>
                  </div>

                  <Text variant="small" className="text-muted-foreground leading-relaxed">
                    {token.description}
                  </Text>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Easing Tokens */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Heading level="h2">Easing Functions</Heading>
          <Text variant="lead">
            Timing functions that control the acceleration and deceleration of animations.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {easingTokens.map((token) => {
            const tokenKey = `easing-${token.name.toLowerCase()}`;
            return (
              <div
                key={token.name}
                className="border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-card"
              >
                <div className="flex items-center justify-between mb-3">
                  <Text weight="semibold">{token.name}</Text>
                  <Badge variant="secondary" size="sm">
                    Easing
                  </Badge>
                </div>

                <div className="space-y-3">
                  {/* Visual demonstration */}
                  <div className="relative h-12 bg-muted/50 rounded-md overflow-hidden">
                    <button
                      onClick={() => triggerAnimation(tokenKey)}
                      className="absolute inset-0 w-full h-full flex items-center justify-center text-sm font-medium bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      Click to demo
                    </button>
                    <div
                      className={`absolute inset-0 bg-secondary transition-transform duration-500 ${
                        isAnimating[tokenKey] ? 'translate-x-0' : '-translate-x-full'
                      }`}
                      style={{
                        transitionTimingFunction: token.value,
                      }}
                    />
                  </div>

                  {/* Copy buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => copyToClipboard(token.cssVar, `${tokenKey}-css`)}
                      className="text-left w-full"
                    >
                      <Text
                        variant="small"
                        className={`font-mono transition-colors ${
                          copiedItem === `${tokenKey}-css`
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {token.cssVar} {copiedItem === `${tokenKey}-css` && '✓'}
                      </Text>
                    </button>

                    <button
                      onClick={() => copyToClipboard(token.tailwindClass, `${tokenKey}-tw`)}
                      className="text-left w-full"
                    >
                      <Text
                        variant="small"
                        className={`font-mono transition-colors ${
                          copiedItem === `${tokenKey}-tw`
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {token.tailwindClass} {copiedItem === `${tokenKey}-tw` && '✓'}
                      </Text>
                    </button>
                  </div>

                  <Text variant="small" className="text-muted-foreground leading-relaxed">
                    {token.description}
                  </Text>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animation Presets */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Heading level="h2">Animation Presets</Heading>
          <Text variant="lead">
            Common animation patterns using our duration and easing tokens.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {presetAnimations.map((animation) => {
            const animKey = `preset-${animation.name.toLowerCase().replace(/\s+/g, '-')}`;
            return (
              <div key={animation.name} className="border border-border rounded-lg p-6 bg-card">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Text weight="semibold">{animation.name}</Text>
                    <Button variant="outline" size="sm" onClick={() => triggerAnimation(animKey)}>
                      Trigger
                    </Button>
                  </div>

                  {/* Demo area */}
                  <div className="relative h-24 bg-muted/30 rounded-md overflow-hidden flex items-center justify-center">
                    <div
                      className={`
                        w-12 h-12 bg-primary rounded-md flex items-center justify-center text-primary-foreground text-sm font-semibold
                        ${animation.demoClass}
                        ${isAnimating[animKey] ? animation.activeClass : ''}
                      `}
                    >
                      {animation.name === 'Pulse' ? '●' : '✨'}
                    </div>
                  </div>

                  {/* Description */}
                  <Text variant="small" className="text-muted-foreground">
                    {animation.description}
                  </Text>

                  {/* CSS Example */}
                  <div className="bg-muted/50 rounded-md p-3">
                    <button
                      onClick={() => copyToClipboard(animation.cssExample, `${animKey}-css`)}
                      className="text-left w-full"
                    >
                      <Text
                        variant="small"
                        className={`font-mono transition-colors ${
                          copiedItem === `${animKey}-css`
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {animation.cssExample} {copiedItem === `${animKey}-css` && ' ✓'}
                      </Text>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="bg-muted/30 border border-border/50 rounded-xl p-6 space-y-4">
        <Heading level="h3">Animation Guidelines</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Text weight="semibold" className="text-foreground">
              ✅ Best Practices
            </Text>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                • Use <code className="text-foreground">fast</code> (150ms) for hover effects
              </li>
              <li>
                • Use <code className="text-foreground">normal</code> (250ms) for most transitions
              </li>
              <li>
                • Use <code className="text-foreground">ease-out</code> for entrance animations
              </li>
              <li>
                • Use <code className="text-foreground">ease-in</code> for exit animations
              </li>
              <li>
                • Respect <code className="text-foreground">prefers-reduced-motion</code>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <Text weight="semibold" className="text-foreground">
              ⚠️ Use Sparingly
            </Text>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Bounce and elastic effects (can be distracting)</li>
              <li>• Durations longer than 500ms (feels slow)</li>
              <li>• Multiple simultaneous complex animations</li>
              <li>• Animations on low-power devices</li>
              <li>• Decorative animations in productivity apps</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AnimationTokens: Story = {
  render: () => <AnimationTokensTemplate />,
};
