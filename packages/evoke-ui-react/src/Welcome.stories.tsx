import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './atoms/Button/Button';
import { Input } from './atoms/Input/Input';
import { Badge } from './atoms/Badge/Badge';
import { Text } from './atoms/Text/Text';
import { Heading } from './atoms/Heading/Heading';
import { Label } from './atoms/Label/Label';
import { Skeleton } from './atoms/Skeleton/Skeleton';
import { Separator } from './atoms/Separator/Separator';

// Mock icons for demonstration
const StarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const meta = {
  title: 'Welcome',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Welcome to Evoke UI - A themable React component library built on shadcn/ui with OKLCH color space and runtime theming.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Welcome story
const WelcomeTemplate = () => (
  <div className="min-h-screen bg-background">
    {/* Header */}
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
              <StarIcon />
            </div>
            <Heading level="h1" visualLevel="h3" spacing="none" className="font-bold">
              Evoke UI
            </Heading>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="info" size="sm">
              v0.1.0
            </Badge>
            <Badge variant="success" size="sm" startIcon={<CheckIcon />}>
              React 18
            </Badge>
          </div>
        </div>
      </div>
    </header>

    <main className="container mx-auto px-6 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="space-y-4">
          <Heading
            level="h1"
            className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            Beautiful, Accessible
            <br />
            Component Library
          </Heading>
          <Text variant="lead" className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built on shadcn/ui with OKLCH color space, runtime theming, and atomic design
            principles. Craft exceptional user interfaces with confidence.
          </Text>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" endIcon={<ArrowRightIcon />}>
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            View Components
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <Heading level="h2" className="text-3xl font-bold">
            Why Choose Evoke UI?
          </Heading>
          <Text variant="muted" className="text-lg">
            Designed for developers who demand quality, flexibility, and accessibility
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <div className="w-6 h-6 rounded bg-primary/20"></div>
            </div>
            <Heading level="h3" spacing="tight" className="text-xl font-semibold">
              Runtime Theming
            </Heading>
            <Text variant="muted">
              Dynamic theme switching with OKLCH color space for perceptually uniform color
              manipulation and better accessibility.
            </Text>
          </div>

          {/* Feature 2 */}
          <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4 group-hover:bg-success/20 transition-colors">
              <CheckIcon />
            </div>
            <Heading level="h3" spacing="tight" className="text-xl font-semibold">
              Accessibility First
            </Heading>
            <Text variant="muted">
              Built with WCAG 2.1 AA compliance, proper ARIA attributes, keyboard navigation, and
              screen reader support.
            </Text>
          </div>

          {/* Feature 3 */}
          <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mb-4 group-hover:bg-warning/20 transition-colors">
              <div className="w-6 h-6 rounded bg-warning/20 grid grid-cols-2 gap-0.5 p-1">
                <div className="bg-warning/40 rounded-sm"></div>
                <div className="bg-warning/40 rounded-sm"></div>
                <div className="bg-warning/40 rounded-sm"></div>
                <div className="bg-warning/40 rounded-sm"></div>
              </div>
            </div>
            <Heading level="h3" spacing="tight" className="text-xl font-semibold">
              Atomic Design
            </Heading>
            <Text variant="muted">
              Systematic component hierarchy from atoms to organisms, ensuring consistency and
              reusability across your application.
            </Text>
          </div>

          {/* Feature 4 */}
          <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center mb-4 group-hover:bg-info/20 transition-colors">
              <div className="text-info font-bold text-lg">TS</div>
            </div>
            <Heading level="h3" spacing="tight" className="text-xl font-semibold">
              TypeScript Native
            </Heading>
            <Text variant="muted">
              Fully typed with comprehensive interfaces, excellent IntelliSense, and compile-time
              safety for better developer experience.
            </Text>
          </div>

          {/* Feature 5 */}
          <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
              <div className="w-6 h-6 bg-gradient-to-br from-secondary to-secondary/60 rounded"></div>
            </div>
            <Heading level="h3" spacing="tight" className="text-xl font-semibold">
              Modern Styling
            </Heading>
            <Text variant="muted">
              Tailwind CSS v4 with CSS-first configuration, Sass support, and
              class-variance-authority for flexible styling.
            </Text>
          </div>

          {/* Feature 6 */}
          <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <ArrowRightIcon />
            </div>
            <Heading level="h3" spacing="tight" className="text-xl font-semibold">
              Performance Optimized
            </Heading>
            <Text variant="muted">
              Tree-shakeable exports, optimized bundle sizes, and reduced motion support for fast,
              efficient applications.
            </Text>
          </div>
        </div>
      </section>

      {/* Component Preview */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <Heading level="h2" className="text-3xl font-bold">
            Component Showcase
          </Heading>
          <Text variant="muted" className="text-lg">
            Explore our comprehensive collection of atomic components
          </Text>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 space-y-8">
          {/* Form Example */}
          <div className="max-w-md mx-auto space-y-4">
            <div className="space-y-2">
              <Label htmlFor="demo-email" required>
                Email Address
              </Label>
              <Input
                id="demo-email"
                type="email"
                placeholder="Enter your email"
                value="user@example.com"
                state="success"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo-name">Full Name</Label>
              <Input id="demo-name" placeholder="Enter your name" value="John Doe" />
            </div>

            <div className="flex space-x-2">
              <Button className="flex-1">Submit</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>

          <Separator label="More Components" />

          {/* Component Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
            <div className="text-center space-y-2">
              <Badge variant="default">Default</Badge>
              <Text variant="small">Badges</Text>
            </div>

            <div className="text-center space-y-2">
              <Skeleton width="80px" height="20px" />
              <Text variant="small">Skeletons</Text>
            </div>

            <div className="text-center space-y-2">
              <Text weight="semibold">Typography</Text>
              <Text variant="small">Text Variants</Text>
            </div>

            <div className="text-center space-y-2">
              <Button size="icon">
                <CheckIcon />
              </Button>
              <Text variant="small">Buttons</Text>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <Heading level="h2" className="text-3xl font-bold">
            Ready to Build?
          </Heading>
          <Text variant="muted" className="text-lg">
            Get started with Evoke UI in your next project
          </Text>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-muted rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Installation</Label>
                <Badge variant="outline" size="sm">
                  npm
                </Badge>
              </div>
              <div className="bg-background rounded p-3 font-mono text-sm">
                <Text variant="code">npm install @evoke-ui/react</Text>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" endIcon={<ArrowRightIcon />}>
            Explore Components
          </Button>
        </div>
      </section>
    </main>

    {/* Footer */}
    <footer className="border-t border-border bg-muted/50 mt-16">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/60 rounded flex items-center justify-center">
              <StarIcon className="w-4 h-4" />
            </div>
            <Text variant="muted">Evoke UI - Built with ❤️ and TypeScript</Text>
          </div>
          <div className="flex items-center space-x-6">
            <Text variant="small" className="text-muted-foreground">
              Storybook v{process.env.STORYBOOK_VERSION || '9.1.3'}
            </Text>
            <Badge variant="outline" size="sm">
              Design System
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export const Welcome: Story = {
  render: WelcomeTemplate,
  parameters: {
    docs: {
      description: {
        story:
          'Welcome to Evoke UI - A comprehensive overview of the design system, features, and components.',
      },
    },
  },
};
