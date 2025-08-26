import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Text } from '../Text';
import { Heading } from '../Heading';

const meta: Meta<typeof Box> = {
  title: 'Atoms/Box',
  component: Box,
  parameters: {
    docs: {
      description: {
        component:
          '✨ The foundation of modern layouts. Box is a powerful, theme-aware layout primitive that adapts beautifully to both light and dark modes. With comprehensive spacing, sizing, and responsive controls, it enables sophisticated dashboard compositions, semantic structure, and pixel-perfect layouts with effortless flexibility.',
      },
    },
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['div', 'section', 'article', 'aside', 'nav', 'main', 'header', 'footer', 'span'],
      description: 'HTML element to render (semantic flexibility)',
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Padding on all sides',
    },
    margin: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'auto'],
      description: 'Margin on all sides',
    },
    paddingX: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Horizontal padding override',
    },
    paddingY: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Vertical padding override',
    },
    marginX: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'auto'],
      description: 'Horizontal margin override',
    },
    marginY: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'auto'],
      description: 'Vertical margin override',
    },
    display: {
      control: { type: 'select' },
      options: ['block', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid', 'hidden'],
      description: 'CSS display property',
    },
    width: {
      control: { type: 'select' },
      options: ['auto', 'full', 'screen', 'fit', 'min', 'max', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Width sizing',
    },
    height: {
      control: { type: 'select' },
      options: ['auto', 'full', 'screen', 'fit', 'min', 'max', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Height sizing',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    className: 'bg-card border border-border rounded-lg',
    children: (
      <div className="space-y-2">
        <Text weight="semibold" className="text-foreground">
          Default Box Component
        </Text>
        <Text variant="small" className="text-muted-foreground">
          A flexible layout primitive that adapts beautifully to both light and dark themes
        </Text>
      </div>
    ),
  },
};

export const WithPadding: Story = {
  args: {
    padding: 'md',
    className:
      'bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200',
    children: (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <Text weight="semibold">Padded Container</Text>
        </div>
        <Text variant="small" className="text-muted-foreground">
          This Box has medium padding on all sides, providing comfortable spacing for content
        </Text>
      </div>
    ),
  },
};

export const WithMargin: Story = {
  args: {
    margin: 'lg',
    padding: 'md',
    className:
      'bg-gradient-to-br from-success/10 to-success/5 border border-success/20 rounded-lg backdrop-blur-sm',
    children: (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <Text weight="semibold" className="text-success-foreground">
            Spaced Layout
          </Text>
        </div>
        <Text variant="small" className="text-muted-foreground">
          Features large margin and medium padding for prominent positioning
        </Text>
      </div>
    ),
  },
};

// Spacing Variations
export const SpacingShowcase: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <Heading level="h3" className="flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          Padding Variations
        </Heading>
        <Text className="text-muted-foreground">
          Demonstrating different padding scales with visual consistency
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['xs', 'md', 'xl'] as const).map((size, index) => (
          <Box
            key={size}
            padding={size}
            className="bg-card border border-border rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-info' : index === 1 ? 'bg-warning' : 'bg-success'
                  }`}
                ></div>
                <Text weight="semibold">Padding: {size}</Text>
              </div>
              <Text
                variant="small"
                className="text-muted-foreground group-hover:text-foreground transition-colors"
              >
                {size === 'xs' ? '4px spacing' : size === 'md' ? '16px spacing' : '32px spacing'}
              </Text>
            </div>
          </Box>
        ))}
      </div>

      <div className="space-y-3">
        <Heading level="h3" className="flex items-center gap-2">
          <div className="w-1 h-6 bg-accent rounded-full"></div>
          Margin Variations
        </Heading>
        <Text className="text-muted-foreground">
          Margin controls for precise layout positioning and centering
        </Text>
      </div>

      <div className="bg-muted/30 border border-border/50 p-6 rounded-xl backdrop-blur-sm">
        <div className="space-y-4">
          <Box
            margin="none"
            padding="sm"
            className="bg-gradient-to-r from-error/10 to-error/5 border border-error/20 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-error rounded-full"></div>
              <Text>No margin • Flush positioning</Text>
            </div>
          </Box>
          <Box
            margin="md"
            padding="sm"
            className="bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/20 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <Text>Medium margin • Comfortable spacing</Text>
            </div>
          </Box>
          <Box
            marginX="auto"
            padding="sm"
            width="md"
            className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-lg text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <Text>Auto margin • Perfect centering</Text>
            </div>
          </Box>
        </div>
      </div>
    </div>
  ),
};

// Display Variations
export const DisplayShowcase: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <Heading level="h3" className="flex items-center gap-2">
          <div className="w-1 h-6 bg-secondary rounded-full"></div>
          Display Variations
        </Heading>
        <Text className="text-muted-foreground">
          CSS display modes showcasing layout flexibility
        </Text>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <Text weight="semibold">Block Display (default)</Text>
          </div>
          <Box
            display="block"
            padding="md"
            className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg backdrop-blur-sm"
          >
            <Text>Block element spans full width • Perfect for containers</Text>
          </Box>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <Text weight="semibold">Inline-block Display</Text>
          </div>
          <div className="space-x-3">
            <Box
              display="inline-block"
              padding="md"
              className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-lg backdrop-blur-sm"
            >
              <Text>Inline-block 1</Text>
            </Box>
            <Box
              display="inline-block"
              padding="md"
              className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-lg backdrop-blur-sm"
            >
              <Text>Inline-block 2</Text>
            </Box>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-info rounded-full"></div>
            <Text weight="semibold">Flex Display</Text>
          </div>
          <Box
            display="flex"
            padding="md"
            className="bg-gradient-to-r from-info/10 to-info/5 border border-info/20 rounded-lg gap-4 backdrop-blur-sm"
          >
            <div className="flex-1 text-center bg-card/50 rounded px-3 py-2">
              <Text variant="small">Flex child 1</Text>
            </div>
            <div className="flex-1 text-center bg-card/50 rounded px-3 py-2">
              <Text variant="small">Flex child 2</Text>
            </div>
            <div className="flex-1 text-center bg-card/50 rounded px-3 py-2">
              <Text variant="small">Flex child 3</Text>
            </div>
          </Box>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <Text weight="semibold">Grid Display</Text>
          </div>
          <Box
            display="grid"
            padding="md"
            className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-lg grid-cols-3 gap-3 backdrop-blur-sm"
          >
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="bg-card/80 border border-border/50 p-3 rounded-lg text-center hover:bg-card transition-colors"
              >
                <Text variant="small">Grid {num}</Text>
              </div>
            ))}
          </Box>
        </div>
      </div>
    </div>
  ),
};

// Sizing Variations
export const SizingShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-3">
        <Heading level="h3" className="flex items-center gap-2">
          <div className="w-1 h-6 bg-warning rounded-full"></div>
          Width Variations
        </Heading>
        <Text className="text-muted-foreground">
          Responsive width controls from auto-sizing to full width
        </Text>
      </div>

      <div className="space-y-3">
        {(['auto', 'xs', 'md', 'lg', 'full'] as const).map((size, index) => (
          <Box
            key={size}
            width={size}
            padding="md"
            className="bg-gradient-to-r from-info/10 to-info/5 border border-info/20 rounded-lg backdrop-blur-sm transition-all duration-200 hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  index === 0
                    ? 'bg-gray-400'
                    : index === 1
                      ? 'bg-info'
                      : index === 2
                        ? 'bg-warning'
                        : index === 3
                          ? 'bg-success'
                          : 'bg-primary'
                }`}
              ></div>
              <Text>Width: {size}</Text>
              <Text variant="small" className="text-muted-foreground">
                {size === 'auto'
                  ? 'Content-based'
                  : size === 'xs'
                    ? '80px'
                    : size === 'md'
                      ? '128px'
                      : size === 'lg'
                        ? '192px'
                        : 'Full container'}
              </Text>
            </div>
          </Box>
        ))}
      </div>

      <div className="space-y-3">
        <Heading level="h3" className="flex items-center gap-2">
          <div className="w-1 h-6 bg-error rounded-full"></div>
          Height Variations
        </Heading>
        <Text className="text-muted-foreground">Vertical sizing for precise layout control</Text>
      </div>

      <div className="flex gap-6 items-end">
        {(['xs', 'md', 'lg'] as const).map((size, index) => (
          <Box
            key={size}
            height={size}
            width="xs"
            padding="sm"
            display="flex"
            className="bg-gradient-to-t from-accent/15 to-accent/5 border border-accent/20 rounded-lg items-center justify-center transition-all duration-200 hover:scale-105 group backdrop-blur-sm shadow-sm"
          >
            <div className="text-center space-y-1">
              <div
                className={`w-2 h-2 mx-auto rounded-full ${
                  index === 0 ? 'bg-accent' : index === 1 ? 'bg-warning' : 'bg-success'
                }`}
              ></div>
              <Text
                variant="small"
                weight="semibold"
                className="group-hover:text-accent transition-colors"
              >
                H: {size}
              </Text>
              <Text variant="small" className="text-muted-foreground">
                {size === 'xs' ? '80px' : size === 'md' ? '128px' : '192px'}
              </Text>
            </div>
          </Box>
        ))}
      </div>
    </div>
  ),
};

// Semantic Elements
export const SemanticElements: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <Heading level="h3" className="flex items-center gap-2">
          <div className="w-1 h-6 bg-success rounded-full"></div>
          Semantic HTML Elements
        </Heading>
        <Text className="text-muted-foreground">
          Accessible markup with proper semantic structure
        </Text>
      </div>

      <div className="space-y-4">
        <Box as="header" padding="md" className="bg-card border border-border rounded-lg shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-4 h-4 bg-primary rounded"></div>
            </div>
            <div className="space-y-1 flex-1">
              <Text weight="semibold" className="flex items-center gap-2">
                Header Element
                <Badge variant="outline" size="sm">
                  header
                </Badge>
              </Text>
              <Text variant="small" className="text-muted-foreground">
                Perfect for page headers, section headers, and navigation containers
              </Text>
            </div>
          </div>
        </Box>

        <Box as="main" padding="lg" className="bg-card border border-border rounded-lg shadow-sm">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-success/10 border border-success/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="w-4 h-4 bg-success rounded"></div>
              </div>
              <div className="space-y-1 flex-1">
                <Text weight="semibold" className="flex items-center gap-2">
                  Main Content Area
                  <Badge variant="outline" size="sm">
                    main
                  </Badge>
                </Text>
                <Text variant="small" className="text-muted-foreground">
                  The primary content container - there should be only one per page
                </Text>
              </div>
            </div>

            <Box
              as="section"
              padding="md"
              marginY="md"
              className="bg-muted/30 border border-border/50 rounded-lg backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-info/10 border border-info/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-3 h-3 bg-info rounded"></div>
                </div>
                <div className="space-y-1 flex-1">
                  <Text weight="semibold" className="flex items-center gap-2">
                    Section within Main
                    <Badge variant="secondary" size="sm">
                      section
                    </Badge>
                  </Text>
                  <Text variant="small" className="text-muted-foreground">
                    Groups related content with thematic meaning
                  </Text>
                </div>
              </div>
            </Box>

            <Box
              as="aside"
              padding="md"
              className="bg-accent/5 border border-accent/20 rounded-lg backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent/10 border border-accent/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-3 h-3 bg-accent rounded"></div>
                </div>
                <div className="space-y-1 flex-1">
                  <Text weight="semibold" className="flex items-center gap-2">
                    Aside Element
                    <Badge variant="secondary" size="sm">
                      aside
                    </Badge>
                  </Text>
                  <Text variant="small" className="text-muted-foreground">
                    Supplementary content like sidebars, callouts, or related information
                  </Text>
                </div>
              </div>
            </Box>
          </div>
        </Box>

        <Box as="footer" padding="md" className="bg-card border border-border rounded-lg shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-muted border border-border rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-4 h-4 bg-muted-foreground rounded"></div>
            </div>
            <div className="space-y-1 flex-1">
              <Text weight="semibold" className="flex items-center gap-2">
                Footer Element
                <Badge variant="outline" size="sm">
                  footer
                </Badge>
              </Text>
              <Text variant="small" className="text-muted-foreground">
                Footer information, copyright notices, or related links
              </Text>
            </div>
          </div>
        </Box>
      </div>
    </div>
  ),
};

// Dashboard Layout Examples
export const DashboardExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-3">
        <Heading level="h3" className="flex items-center gap-2">
          <div className="w-1 h-6 bg-accent rounded-full"></div>
          Dashboard Layout Compositions
        </Heading>
        <Text className="text-muted-foreground">
          Real-world dashboard patterns using Box components
        </Text>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <Text weight="semibold">KPI Cards Layout</Text>
          </div>
          <Box display="grid" className="grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <Box
                key={num}
                padding="lg"
                className="bg-card border border-border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group backdrop-blur-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Text variant="small" className="text-muted-foreground">
                      Revenue Q{num}
                    </Text>
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        num === 1 ? 'bg-success/10' : num === 2 ? 'bg-warning/10' : 'bg-info/10'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded ${
                          num === 1 ? 'bg-success' : num === 2 ? 'bg-warning' : 'bg-info'
                        }`}
                      ></div>
                    </div>
                  </div>
                  <Text
                    variant="lead"
                    weight="bold"
                    className="text-foreground group-hover:text-primary transition-colors"
                  >
                    $12.{num}K
                  </Text>
                  <Badge
                    variant="outline"
                    size="sm"
                    className="bg-success/10 border-success/20 text-success"
                  >
                    +5.{num}%
                  </Badge>
                </div>
              </Box>
            ))}
          </Box>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-info rounded-full"></div>
            <Text weight="semibold">Dashboard Section with Header</Text>
          </div>
          <Box
            as="section"
            className="bg-card border border-border rounded-xl overflow-hidden shadow-sm"
          >
            <Box
              as="header"
              paddingX="lg"
              paddingY="md"
              className="bg-muted/30 border-b border-border backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                  </div>
                  <Text weight="semibold">Analytics Overview</Text>
                </div>
                <Badge variant="secondary" size="sm">
                  Live
                </Badge>
              </div>
            </Box>
            <Box padding="lg">
              <div className="space-y-4">
                <Text className="text-muted-foreground">
                  Professional dashboard section with header, content, and visual placeholders
                </Text>
                <Box
                  marginY="md"
                  height="md"
                  className="bg-gradient-to-br from-primary/5 via-accent/5 to-success/5 border border-border/50 rounded-lg flex items-center justify-center backdrop-blur-sm"
                >
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mx-auto">
                      <div className="w-6 h-6 bg-primary rounded"></div>
                    </div>
                    <Text className="text-muted-foreground">📊 Chart Visualization</Text>
                  </div>
                </Box>
              </div>
            </Box>
          </Box>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <Text weight="semibold">Sidebar and Main Content Layout</Text>
          </div>
          <Box
            display="flex"
            className="bg-muted/20 border border-border/50 rounded-xl overflow-hidden min-h-[320px] backdrop-blur-sm"
          >
            <Box as="aside" width="xs" padding="md" className="bg-card border-r border-border">
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                  <div className="w-6 h-6 bg-secondary/10 border border-secondary/20 rounded flex items-center justify-center">
                    <div className="w-3 h-3 bg-secondary rounded"></div>
                  </div>
                  <Text weight="semibold">Navigation</Text>
                </div>
                <div className="space-y-1">
                  {['Dashboard', 'Analytics', 'Settings'].map((item, index) => (
                    <Box
                      key={item}
                      padding="sm"
                      className="hover:bg-muted/50 rounded-lg cursor-pointer transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            index === 0 ? 'bg-primary' : index === 1 ? 'bg-info' : 'bg-accent'
                          }`}
                        ></div>
                        <Text
                          variant="small"
                          className="group-hover:text-foreground transition-colors"
                        >
                          {item}
                        </Text>
                      </div>
                    </Box>
                  ))}
                </div>
              </div>
            </Box>
            <Box as="main" padding="lg" className="flex-1 bg-card">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
                    <div className="w-5 h-5 bg-primary rounded"></div>
                  </div>
                  <div>
                    <Heading level="h4">Dashboard Content</Heading>
                    <Text variant="small" className="text-muted-foreground">
                      Main application workspace
                    </Text>
                  </div>
                </div>
                <Text className="text-muted-foreground">
                  Professional dashboard layout combining sidebar navigation with main content area
                </Text>
                <Box
                  marginY="md"
                  padding="md"
                  className="bg-gradient-to-br from-accent/5 to-success/5 border border-border/50 rounded-lg backdrop-blur-sm"
                >
                  <Text variant="small" className="text-muted-foreground">
                    Content widgets and components would be positioned here using Box components for
                    consistent spacing and responsive layouts
                  </Text>
                </Box>
              </div>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  ),
};

// Responsive Behavior
export const ResponsiveShowcase: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <Heading level="h3" className="flex items-center gap-2">
          <div className="w-1 h-6 bg-warning rounded-full"></div>
          Responsive Behavior
        </Heading>
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <Text className="text-muted-foreground">
            💡 <strong>Resize your browser</strong> to see responsive layout changes in action
          </Text>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-accent rounded-full"></div>
          <Text weight="semibold">Adaptive Layout System</Text>
        </div>
        <Box
          padding="sm"
          responsivePadding={{
            md: 'lg',
            lg: 'xl',
          }}
          display="block"
          responsive={{
            md: { display: 'flex' },
            lg: { display: 'grid' },
          }}
          className="bg-gradient-to-br from-accent/5 via-primary/5 to-secondary/5 border border-border/50 rounded-xl gap-4 grid-cols-3 backdrop-blur-sm"
        >
          {[1, 2, 3].map((num) => (
            <div key={num} className="bg-card border border-border/50 p-4 rounded-lg shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      num === 1 ? 'bg-primary' : num === 2 ? 'bg-accent' : 'bg-secondary'
                    }`}
                  ></div>
                  <Text weight="semibold">Item {num}</Text>
                </div>
                <Text variant="small" className="text-muted-foreground">
                  Layout changes: block → flex → grid
                </Text>
              </div>
            </div>
          ))}
        </Box>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <Text weight="semibold">Responsive Width Control</Text>
        </div>
        <Box
          width="full"
          responsive={{
            sm: { width: 'sm' },
            md: { width: 'md' },
            lg: { width: 'lg' },
          }}
          marginX="auto"
          padding="md"
          className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-xl text-center backdrop-blur-sm"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <Text weight="semibold">Responsive Container</Text>
            </div>
            <Text variant="small" className="text-muted-foreground">
              Width progression: full → sm (96px) → md (128px) → lg (192px)
            </Text>
          </div>
        </Box>
      </div>

      <div className="bg-muted/30 border border-border/50 rounded-xl p-6 backdrop-blur-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-info rounded-full"></div>
            <Text weight="semibold">Breakpoint Reference</Text>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {[
              { name: 'sm', min: '640px' },
              { name: 'md', min: '768px' },
              { name: 'lg', min: '1024px' },
              { name: 'xl', min: '1280px' },
            ].map(({ name, min }, index) => (
              <div key={name} className="bg-card border border-border/50 p-3 rounded-lg">
                <div
                  className={`w-2 h-2 mx-auto rounded-full mb-2 ${
                    index === 0
                      ? 'bg-info'
                      : index === 1
                        ? 'bg-warning'
                        : index === 2
                          ? 'bg-success'
                          : 'bg-primary'
                  }`}
                ></div>
                <Text variant="small" weight="semibold">
                  {name}
                </Text>
                <Text variant="small" className="text-muted-foreground">
                  {min}+
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

// Complex Combinations
export const ComplexCombinations: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <Heading level="h3" className="flex items-center gap-2">
          <div className="w-1 h-6 bg-error rounded-full"></div>
          Complex Layout Combinations
        </Heading>
        <Text className="text-muted-foreground">
          Advanced composition patterns with semantic structure
        </Text>
      </div>

      <Box
        as="article"
        padding="xl"
        margin="md"
        width="full"
        display="flex"
        className="bg-card border border-border rounded-xl shadow-lg flex-col gap-6 backdrop-blur-sm"
      >
        <Box as="header" paddingY="md" className="border-b border-border/50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <div className="w-6 h-6 bg-primary rounded"></div>
            </div>
            <div className="space-y-2 flex-1">
              <Heading level="h4" className="flex items-center gap-3">
                Article Header
                <Badge variant="secondary" size="sm">
                  article
                </Badge>
              </Heading>
              <Text className="text-muted-foreground">
                Professional article layout showcasing complex nesting with semantic elements
              </Text>
            </div>
          </div>
        </Box>

        <Box display="grid" className="grid-cols-1 lg:grid-cols-2 gap-8">
          <Box
            padding="lg"
            className="bg-gradient-to-br from-info/10 to-info/5 border border-info/20 rounded-xl backdrop-blur-sm"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-info rounded-full"></div>
                <Text weight="semibold">Content Section 1</Text>
              </div>
              <Text className="text-muted-foreground">
                Demonstrating sophisticated layout composition with grid systems, semantic markup,
                and consistent spacing controls
              </Text>

              <Box
                marginY="md"
                paddingX="md"
                paddingY="sm"
                className="bg-card/60 border border-border/50 rounded-lg backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-info/50 rounded-full"></div>
                  <Text variant="small" className="text-muted-foreground">
                    Nested content with precise spacing control
                  </Text>
                </div>
              </Box>
            </div>
          </Box>

          <Box
            padding="lg"
            className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-xl backdrop-blur-sm"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <Text weight="semibold">Content Section 2</Text>
              </div>
              <Text className="text-muted-foreground">
                Box components enable sophisticated layouts while maintaining consistent spacing and
                semantic structure for accessibility
              </Text>

              <Box marginY="md" display="flex" className="gap-3">
                <Button size="sm" className="flex-1">
                  Primary Action
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Secondary
                </Button>
              </Box>
            </div>
          </Box>
        </Box>

        <Box as="footer" paddingY="md" className="border-t border-border/50 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
              <Text variant="small" className="text-muted-foreground">
                Article footer • Semantic structure maintained
              </Text>
            </div>
            <Badge variant="outline" size="sm">
              footer
            </Badge>
          </div>
        </Box>
      </Box>

      <div className="bg-gradient-to-br from-muted/20 to-muted/10 border border-border/50 rounded-xl p-6 backdrop-blur-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <Text weight="semibold">Layout Benefits</Text>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: 'bg-success',
                title: 'Semantic Structure',
                desc: 'Proper HTML5 elements for accessibility',
              },
              {
                icon: 'bg-info',
                title: 'Flexible Composition',
                desc: 'Mix and match spacing, sizing, display modes',
              },
              {
                icon: 'bg-accent',
                title: 'Responsive Design',
                desc: 'Adaptive layouts across all screen sizes',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 ${icon}/10 border border-${icon.split('-')[1]}/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5`}
                >
                  <div className={`w-3 h-3 ${icon} rounded`}></div>
                </div>
                <div className="space-y-1">
                  <Text variant="small" weight="semibold">
                    {title}
                  </Text>
                  <Text variant="small" className="text-muted-foreground">
                    {desc}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive Examples
export const InteractiveBox: Story = {
  args: {
    as: 'div',
    padding: 'lg',
    margin: 'md',
    display: 'flex',
    width: 'lg',
    height: 'md',
    className:
      'bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 border border-primary/20 rounded-xl shadow-sm items-center justify-center cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 backdrop-blur-sm group focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
    role: 'button',
    tabIndex: 0,
    children: (
      <div className="text-center space-y-3">
        <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
          <div className="w-6 h-6 bg-primary rounded group-hover:bg-accent transition-colors"></div>
        </div>
        <div className="space-y-1">
          <Text weight="semibold" className="group-hover:text-primary transition-colors">
            Interactive Box
          </Text>
          <Text
            variant="small"
            className="text-muted-foreground group-hover:text-foreground transition-colors"
          >
            Click, tap, or press Enter/Space
          </Text>
        </div>
        <div className="flex items-center justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
        </div>
      </div>
    ),
    onClick: () => alert('🎉 Box clicked! Interactive elements work perfectly.'),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        alert('⌨️ Keyboard accessibility working! Box activated with ' + e.key);
      }
    },
  },
};

// Testing All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-10">
      <div className="space-y-3">
        <Heading level="h3" className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-r from-primary to-accent rounded-full"></div>
          Complete Variant Showcase
        </Heading>
        <Text className="text-muted-foreground">
          Comprehensive overview of all Box component variants and configurations
        </Text>
      </div>

      <div className="space-y-8">
        {/* Padding variants */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-info rounded-full"></div>
            <Text weight="semibold">Padding Scale</Text>
            <Badge variant="outline" size="sm">
              7 variants
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
            {(['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size, index) => (
              <Box
                key={`padding-${size}`}
                padding={size}
                className="bg-gradient-to-br from-info/10 to-info/5 border border-info/20 rounded-lg text-center transition-all hover:shadow-sm hover:scale-105 backdrop-blur-sm group"
              >
                <div className="space-y-1 py-2">
                  <div
                    className={`w-2 h-2 mx-auto bg-info rounded-full group-hover:scale-150 transition-transform`}
                  ></div>
                  <Text variant="small" weight="semibold">
                    P: {size}
                  </Text>
                  <Text variant="small" className="text-muted-foreground">
                    {size === 'none'
                      ? '0px'
                      : size === 'xs'
                        ? '4px'
                        : size === 'sm'
                          ? '8px'
                          : size === 'md'
                            ? '16px'
                            : size === 'lg'
                              ? '24px'
                              : size === 'xl'
                                ? '32px'
                                : '48px'}
                  </Text>
                </div>
              </Box>
            ))}
          </div>
        </div>

        {/* Display variants */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <Text weight="semibold">Display Modes</Text>
            <Badge variant="outline" size="sm">
              7 variants
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
            {(
              [
                'block',
                'inline-block',
                'flex',
                'inline-flex',
                'grid',
                'inline-grid',
                'hidden',
              ] as const
            ).map((display, index) => (
              <Box
                key={`display-${display}`}
                display={display === 'hidden' ? 'block' : display}
                padding="md"
                className="bg-gradient-to-br from-success/10 to-success/5 border border-success/20 rounded-lg text-center transition-all hover:shadow-sm hover:scale-105 backdrop-blur-sm group"
              >
                <div className="space-y-1">
                  <div
                    className={`w-2 h-2 mx-auto bg-success rounded-full group-hover:scale-150 transition-transform`}
                  ></div>
                  <Text variant="small" weight="semibold">
                    {display === 'inline-block'
                      ? 'i-block'
                      : display === 'inline-flex'
                        ? 'i-flex'
                        : display === 'inline-grid'
                          ? 'i-grid'
                          : display}
                  </Text>
                </div>
              </Box>
            ))}
          </div>
        </div>

        {/* Width variants */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-warning rounded-full"></div>
            <Text weight="semibold">Width Scale</Text>
            <Badge variant="outline" size="sm">
              12 variants
            </Badge>
          </div>
          <div className="space-y-2">
            {(
              [
                'auto',
                'fit',
                'min',
                'max',
                'xs',
                'sm',
                'md',
                'lg',
                'xl',
                '2xl',
                'full',
                'screen',
              ] as const
            ).map((width, index) => (
              <Box
                key={`width-${width}`}
                width={width === 'screen' ? 'full' : width}
                padding="md"
                className="bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/20 rounded-lg transition-all hover:shadow-sm backdrop-blur-sm group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 bg-warning rounded-full group-hover:scale-150 transition-transform flex-shrink-0`}
                  ></div>
                  <Text variant="small" weight="semibold">
                    Width: {width}
                  </Text>
                  <Text variant="small" className="text-muted-foreground">
                    {width === 'auto'
                      ? 'Content-based'
                      : width === 'fit'
                        ? 'Fit-content'
                        : width === 'min'
                          ? 'Min-content'
                          : width === 'max'
                            ? 'Max-content'
                            : width === 'xs'
                              ? '80px'
                              : width === 'sm'
                                ? '96px'
                                : width === 'md'
                                  ? '128px'
                                  : width === 'lg'
                                    ? '192px'
                                    : width === 'xl'
                                      ? '256px'
                                      : width === '2xl'
                                        ? '320px'
                                        : width === 'full'
                                          ? 'Full width'
                                          : 'Viewport width'}
                  </Text>
                </div>
              </Box>
            ))}
          </div>
        </div>

        {/* Semantic elements */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <Text weight="semibold">Semantic Elements</Text>
            <Badge variant="outline" size="sm">
              9 elements
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {(
              [
                'div',
                'section',
                'article',
                'aside',
                'nav',
                'main',
                'header',
                'footer',
                'span',
              ] as const
            ).map((element) => (
              <Box
                key={`element-${element}`}
                as={element}
                padding="md"
                className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-lg text-center transition-all hover:shadow-sm hover:scale-105 backdrop-blur-sm group"
              >
                <div className="space-y-1">
                  <div
                    className={`w-2 h-2 mx-auto bg-accent rounded-full group-hover:scale-150 transition-transform`}
                  ></div>
                  <Text variant="small" weight="semibold">
                    &lt;{element}&gt;
                  </Text>
                </div>
              </Box>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 rounded-xl p-6 backdrop-blur-sm">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <Text weight="semibold">Box Component Summary</Text>
            <div className="w-3 h-3 bg-primary rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <Text variant="lead" weight="bold" className="text-primary">
                35+
              </Text>
              <Text variant="small" className="text-muted-foreground">
                Total Variants
              </Text>
            </div>
            <div className="space-y-1">
              <Text variant="lead" weight="bold" className="text-success">
                9
              </Text>
              <Text variant="small" className="text-muted-foreground">
                HTML Elements
              </Text>
            </div>
            <div className="space-y-1">
              <Text variant="lead" weight="bold" className="text-warning">
                ∞
              </Text>
              <Text variant="small" className="text-muted-foreground">
                Combinations
              </Text>
            </div>
            <div className="space-y-1">
              <Text variant="lead" weight="bold" className="text-accent">
                100%
              </Text>
              <Text variant="small" className="text-muted-foreground">
                Responsive
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
