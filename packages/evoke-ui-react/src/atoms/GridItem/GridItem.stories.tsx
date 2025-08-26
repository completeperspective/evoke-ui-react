import type { Meta, StoryObj } from '@storybook/react';
import { GridItem } from './GridItem';
import { Grid } from '../Grid';
import { Card, CardHeader, CardContent } from '../../molecules/Card';
import { Badge } from '../Badge';
import { Text } from '../Text';
import { Heading } from '../Heading';

const meta: Meta<typeof GridItem> = {
  title: 'Atoms/GridItem',
  component: GridItem,
  parameters: {
    docs: {
      description: {
        component:
          '🎨 Precise grid positioning component with intelligent spanning, alignment, and responsive controls. GridItem enables pixel-perfect dashboard compositions with semantic responsive breakpoints, multi-dimensional spanning, and sophisticated layout control within Grid systems.',
      },
    },
  },
  argTypes: {
    colSpan: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'full', 'auto'],
      description: 'Number of columns to span',
    },
    rowSpan: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 'full', 'auto'],
      description: 'Number of rows to span',
    },
    colStart: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 'auto'],
      description: 'Starting column position',
    },
    colEnd: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 'auto'],
      description: 'Ending column position',
    },
    align: {
      control: { type: 'select' },
      options: ['auto', 'start', 'end', 'center', 'stretch'],
      description: 'Alignment within grid cell',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  decorators: [
    (Story, context) => {
      // Enhanced grid visualization with modern styling
      return (
        <div className="p-6 bg-gradient-to-br from-background to-muted/10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-muted-foreground/40 rounded-full"></div>
              <Text variant="small" className="text-muted-foreground">
                12-column grid visualization • GridItem positioning overlay
              </Text>
            </div>
            <Grid
              columns={12}
              gap="md"
              className="border border-dashed border-border/50 rounded-xl p-2 bg-card/30 backdrop-blur-sm"
            >
              {/* Enhanced grid background for visualization */}
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="h-16 bg-gradient-to-br from-muted/10 to-muted/5 border border-dashed border-border/30 rounded-lg flex items-center justify-center text-xs text-muted-foreground/60 hover:text-muted-foreground hover:bg-muted/20 transition-colors group"
                >
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-current rounded-full opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all"></div>
                    <span className="group-hover:font-semibold transition-all">{i + 1}</span>
                  </div>
                </div>
              ))}
              {/* Overlay the story component with enhanced z-index */}
              <div className="col-span-full row-start-1 col-start-1 z-20">
                <Grid columns={12} gap="md">
                  <Story {...context} />
                </Grid>
              </div>
            </Grid>
          </div>
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof GridItem>;

// Demo content component with visual polish
const DemoContent = ({ children, className = '', variant = 'primary', ...props }: any) => {
  const variants = {
    primary:
      'bg-gradient-to-br from-primary/15 to-primary/5 text-primary border border-primary/20 backdrop-blur-sm',
    success:
      'bg-gradient-to-br from-success/15 to-success/5 text-success border border-success/20 backdrop-blur-sm',
    info: 'bg-gradient-to-br from-info/15 to-info/5 text-info border border-info/20 backdrop-blur-sm',
    warning:
      'bg-gradient-to-br from-warning/15 to-warning/5 text-warning border border-warning/20 backdrop-blur-sm',
    accent:
      'bg-gradient-to-br from-accent/15 to-accent/5 text-accent border border-accent/20 backdrop-blur-sm',
    error:
      'bg-gradient-to-br from-error/15 to-error/5 text-error border border-error/20 backdrop-blur-sm',
  };

  return (
    <div
      className={`${variants[variant as keyof typeof variants]} p-4 rounded-lg font-medium text-center hover:shadow-md hover:scale-[1.02] transition-all duration-200 group ${className}`}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        <div
          className={`w-2 h-2 bg-current rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all`}
        ></div>
        <span className="group-hover:font-semibold transition-all">{children}</span>
      </div>
    </div>
  );
};

/**
 * Default GridItem story
 */
export const Default: Story = {
  args: {
    colSpan: 4,
  },
  render: (args) => (
    <GridItem {...args}>
      <DemoContent variant="primary">
        <div className="space-y-1">
          <div>Default GridItem</div>
          <div className="text-xs opacity-70">(4 columns)</div>
        </div>
      </DemoContent>
    </GridItem>
  ),
};

/**
 * Column Spans showing different spanning configurations
 */
export const ColumnSpans: Story = {
  render: () => (
    <>
      <GridItem colSpan={12}>
        <DemoContent variant="primary">
          <div className="space-y-1">
            <div>Full Width Header</div>
            <div className="text-xs opacity-70">(12 columns)</div>
          </div>
        </DemoContent>
      </GridItem>
      <GridItem colSpan={6}>
        <DemoContent variant="success">
          <div className="space-y-1">
            <div>Half Width</div>
            <div className="text-xs opacity-70">(6 columns)</div>
          </div>
        </DemoContent>
      </GridItem>
      <GridItem colSpan={6}>
        <DemoContent variant="success">
          <div className="space-y-1">
            <div>Half Width</div>
            <div className="text-xs opacity-70">(6 columns)</div>
          </div>
        </DemoContent>
      </GridItem>
      <GridItem colSpan={4}>
        <DemoContent variant="info">
          <div className="space-y-1">
            <div>Third Width</div>
            <div className="text-xs opacity-70">(4 columns)</div>
          </div>
        </DemoContent>
      </GridItem>
      <GridItem colSpan={4}>
        <DemoContent variant="info">
          <div className="space-y-1">
            <div>Third Width</div>
            <div className="text-xs opacity-70">(4 columns)</div>
          </div>
        </DemoContent>
      </GridItem>
      <GridItem colSpan={4}>
        <DemoContent variant="info">
          <div className="space-y-1">
            <div>Third Width</div>
            <div className="text-xs opacity-70">(4 columns)</div>
          </div>
        </DemoContent>
      </GridItem>
      <GridItem colSpan={3}>
        <DemoContent variant="warning">
          <div className="space-y-1">
            <div>Quarter</div>
            <div className="text-xs opacity-70">(3 columns)</div>
          </div>
        </DemoContent>
      </GridItem>
      <GridItem colSpan={3}>
        <DemoContent variant="warning">
          <div className="space-y-1">
            <div>Quarter</div>
            <div className="text-xs opacity-70">(3 columns)</div>
          </div>
        </DemoContent>
      </GridItem>
      <GridItem colSpan={3}>
        <DemoContent variant="warning">
          <div className="space-y-1">
            <div>Quarter</div>
            <div className="text-xs opacity-70">(3 columns)</div>
          </div>
        </DemoContent>
      </GridItem>
      <GridItem colSpan={3}>
        <DemoContent variant="warning">
          <div className="space-y-1">
            <div>Quarter</div>
            <div className="text-xs opacity-70">(3 columns)</div>
          </div>
        </DemoContent>
      </GridItem>
    </>
  ),
};

/**
 * Explicit Positioning showing colStart and colEnd usage
 */
export const ExplicitPositioning: Story = {
  render: () => (
    <>
      <GridItem colSpan={4} colStart={1}>
        <DemoContent variant="error">
          <div className="space-y-1">
            <div>Start at 1</div>
            <div className="text-xs opacity-70">Span 4 columns</div>
          </div>
        </DemoContent>
      </GridItem>
      <GridItem colSpan={4} colStart={5}>
        <DemoContent variant="warning">
          <div className="space-y-1">
            <div>Start at 5</div>
            <div className="text-xs opacity-70">Span 4 columns</div>
          </div>
        </DemoContent>
      </GridItem>
      <GridItem colSpan={4} colStart={9}>
        <DemoContent variant="success">
          <div className="space-y-1">
            <div>Start at 9</div>
            <div className="text-xs opacity-70">Span 4 columns</div>
          </div>
        </DemoContent>
      </GridItem>

      {/* Second row with different positioning */}
      <GridItem colStart={2} colEnd={6}>
        <DemoContent variant="info">
          <div className="space-y-1">
            <div>Columns 2-5</div>
            <div className="text-xs opacity-70">Using colEnd</div>
          </div>
        </DemoContent>
      </GridItem>
      <GridItem colStart={7} colEnd={11}>
        <DemoContent variant="primary">
          <div className="space-y-1">
            <div>Columns 7-10</div>
            <div className="text-xs opacity-70">Using colEnd</div>
          </div>
        </DemoContent>
      </GridItem>

      {/* Third row - centered item */}
      <GridItem colSpan={6} colStart={4}>
        <DemoContent variant="accent">
          <div className="space-y-1">
            <div>Perfectly Centered</div>
            <div className="text-xs opacity-70">Start 4, span 6</div>
          </div>
        </DemoContent>
      </GridItem>
    </>
  ),
};

/**
 * Row Spanning showing vertical spanning behavior
 */
export const RowSpanning: Story = {
  render: () => (
    <>
      {/* Large feature spanning 2 rows */}
      <GridItem colSpan={6} rowSpan={2}>
        <DemoContent variant="primary" className="h-full flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-6 h-6 bg-current rounded-lg mx-auto opacity-60"></div>
            <div>Large Feature</div>
            <div className="text-xs opacity-70">(6 cols × 2 rows)</div>
          </div>
        </DemoContent>
      </GridItem>

      {/* Right column items */}
      <GridItem colSpan={3}>
        <DemoContent variant="accent">
          <div className="space-y-1">
            <div>Micro Widget 1</div>
            <div className="text-xs opacity-70">(3 cols)</div>
          </div>
        </DemoContent>
      </GridItem>
      <GridItem colSpan={3}>
        <DemoContent variant="success">
          <div className="space-y-1">
            <div>Micro Widget 2</div>
            <div className="text-xs opacity-70">(3 cols)</div>
          </div>
        </DemoContent>
      </GridItem>
      <GridItem colSpan={3}>
        <DemoContent variant="info">
          <div className="space-y-1">
            <div>Micro Widget 3</div>
            <div className="text-xs opacity-70">(3 cols)</div>
          </div>
        </DemoContent>
      </GridItem>
      <GridItem colSpan={3}>
        <DemoContent variant="warning">
          <div className="space-y-1">
            <div>Micro Widget 4</div>
            <div className="text-xs opacity-70">(3 cols)</div>
          </div>
        </DemoContent>
      </GridItem>

      {/* Full width footer */}
      <GridItem colSpan={12}>
        <DemoContent variant="primary">
          <div className="space-y-1">
            <div>Full Width Footer</div>
            <div className="text-xs opacity-70">(12 columns)</div>
          </div>
        </DemoContent>
      </GridItem>
    </>
  ),
};

/**
 * Alignment options showing different alignment behaviors
 */
export const AlignmentOptions: Story = {
  render: () => (
    <div className="col-span-full">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-accent rounded-full"></div>
          <Text weight="semibold">GridItem Alignment Control</Text>
        </div>
        <Text variant="small" className="text-muted-foreground">
          Precise alignment controls for positioning content within grid cells
        </Text>
      </div>

      <div className="bg-gradient-to-br from-muted/20 to-muted/10 border border-border/50 rounded-xl p-6 backdrop-blur-sm">
        <Grid columns={1} gap="md" className="min-h-32">
          <GridItem align="auto">
            <DemoContent variant="primary" className="h-16">
              <div className="space-y-1">
                <div>Auto</div>
                <div className="text-xs opacity-70">Default</div>
              </div>
            </DemoContent>
          </GridItem>
          <GridItem align="start">
            <DemoContent variant="error" className="h-16">
              <div className="space-y-1">
                <div>Start</div>
                <div className="text-xs opacity-70">Top align</div>
              </div>
            </DemoContent>
          </GridItem>
          <GridItem align="center">
            <DemoContent variant="info" className="h-16">
              <div className="space-y-1">
                <div>Center</div>
                <div className="text-xs opacity-70">Middle</div>
              </div>
            </DemoContent>
          </GridItem>
          <GridItem align="end">
            <DemoContent variant="success" className="h-16">
              <div className="space-y-1">
                <div>End</div>
                <div className="text-xs opacity-70">Bottom</div>
              </div>
            </DemoContent>
          </GridItem>
          <GridItem align="stretch">
            <DemoContent variant="accent" className="h-full flex items-center">
              <div className="space-y-1">
                <div>Stretch</div>
                <div className="text-xs opacity-70">Full height</div>
              </div>
            </DemoContent>
          </GridItem>
        </Grid>
      </div>
    </div>
  ),
};

/**
 * Responsive Items showing responsive behavior
 */
export const ResponsiveItems: Story = {
  render: () => (
    <>
      <GridItem
        colSpan={12}
        responsive={{
          sm: { colSpan: 6 },
          lg: { colSpan: 4 },
        }}
      >
        <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group">
          <CardHeader
            title={
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full group-hover:scale-125 transition-transform"></div>
                Responsive Card
              </div>
            }
          />
          <CardContent>
            <div className="space-y-2">
              <Text
                variant="small"
                className="text-muted-foreground group-hover:text-foreground transition-colors"
              >
                12 cols → 6 cols (sm) → 4 cols (lg)
              </Text>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  size="sm"
                  className="group-hover:shadow-sm transition-shadow"
                >
                  Responsive
                </Badge>
                <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <div className="w-1 h-1 bg-primary/60 rounded-full"></div>
                  <div className="w-1 h-1 bg-primary/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </GridItem>

      <GridItem
        colSpan={12}
        responsive={{
          sm: { colSpan: 6 },
          lg: { colSpan: 4 },
        }}
      >
        <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group">
          <CardHeader
            title={
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-info rounded-full group-hover:scale-125 transition-transform"></div>
                Adaptive Layout
              </div>
            }
          />
          <CardContent>
            <div className="space-y-2">
              <Text
                variant="small"
                className="text-muted-foreground group-hover:text-foreground transition-colors"
              >
                Intelligent screen size adaptation
              </Text>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  size="sm"
                  className="group-hover:shadow-sm transition-shadow"
                >
                  Mobile First
                </Badge>
                <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="w-1 h-1 bg-info rounded-full"></div>
                  <div className="w-1 h-1 bg-info/60 rounded-full"></div>
                  <div className="w-1 h-1 bg-info/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </GridItem>

      <GridItem
        colSpan={12}
        responsive={{
          sm: { colSpan: 12 },
          lg: { colSpan: 4 },
        }}
      >
        <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group">
          <CardHeader
            title={
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded-full group-hover:scale-125 transition-transform"></div>
                Breakpoint Control
              </div>
            }
          />
          <CardContent>
            <div className="space-y-2">
              <Text
                variant="small"
                className="text-muted-foreground group-hover:text-foreground transition-colors"
              >
                Full width until large breakpoint
              </Text>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  size="sm"
                  className="group-hover:shadow-sm transition-shadow"
                >
                  Breakpoints
                </Badge>
                <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="w-1 h-1 bg-success rounded-full"></div>
                  <div className="w-1 h-1 bg-success/60 rounded-full"></div>
                  <div className="w-1 h-1 bg-success/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </GridItem>

      {/* Complex responsive positioning */}
      <GridItem
        colSpan={12}
        responsive={{
          md: {
            colSpan: 6,
            colStart: 4,
            align: 'center',
          },
          lg: {
            colSpan: 8,
            colStart: 3,
            align: 'stretch',
          },
        }}
      >
        <Card
          variant="elevated"
          className="hover:shadow-xl hover:scale-[1.02] transition-all duration-200 group"
        >
          <CardHeader
            title={
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full group-hover:scale-125 transition-transform"></div>
                Complex Responsive
              </div>
            }
          />
          <CardContent>
            <div className="space-y-3">
              <Text
                variant="small"
                className="text-muted-foreground group-hover:text-foreground transition-colors"
              >
                Full width → centered 6 cols → 8 cols stretched with intelligent positioning
              </Text>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    size="sm"
                    className="group-hover:shadow-sm transition-shadow"
                  >
                    Positioning
                  </Badge>
                  <Badge
                    variant="outline"
                    size="sm"
                    className="group-hover:shadow-sm transition-shadow"
                  >
                    Alignment
                  </Badge>
                </div>
                <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <div className="w-1 h-1 bg-accent/60 rounded-full"></div>
                  <div className="w-1 h-1 bg-accent/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </GridItem>
    </>
  ),
};

/**
 * Dashboard Components showing real-world usage
 */
export const DashboardComponents: Story = {
  render: () => (
    <>
      {/* Enhanced Header */}
      <GridItem colSpan="full">
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader
            title={
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary rounded"></div>
                </div>
                Dashboard Header
              </div>
            }
            description="Full-width header with semantic GridItem positioning"
          />
        </Card>
      </GridItem>

      {/* Enhanced Main content area */}
      <GridItem colSpan={8}>
        <Card
          variant="elevated"
          className="min-h-48 hover:shadow-lg transition-all duration-300 group"
        >
          <CardHeader
            title={
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-info rounded-full group-hover:scale-125 transition-transform"></div>
                Main Content Area
              </div>
            }
          />
          <CardContent>
            <div className="h-32 bg-gradient-to-br from-info/5 via-primary/5 to-accent/5 border border-border/50 rounded-lg flex items-center justify-center text-muted-foreground backdrop-blur-sm">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-info/10 border border-info/20 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <div className="w-6 h-6 bg-info rounded"></div>
                </div>
                <Text>📈 Interactive content visualization</Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </GridItem>

      {/* Enhanced Sidebar */}
      <GridItem colSpan={4} className="row-span-2">
        <Card variant="outlined" className="h-full hover:shadow-md transition-shadow duration-200">
          <CardHeader
            title={
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                Navigation Sidebar
              </div>
            }
          />
          <CardContent>
            <div className="space-y-3">
              {[
                { text: 'Dashboard Overview', color: 'primary' },
                { text: 'Analytics Reports', color: 'info' },
                { text: 'User Management', color: 'success' },
                { text: 'System Settings', color: 'accent' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-card/50 hover:bg-card border border-border/50 rounded-lg text-sm transition-all duration-200 group cursor-pointer"
                >
                  <div
                    className={`w-2 h-2 bg-${item.color} rounded-full group-hover:scale-125 transition-transform`}
                  ></div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </GridItem>

      {/* Enhanced Quick stats */}
      <GridItem colSpan={4}>
        <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group">
          <CardContent size="sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Text
                  variant="small"
                  className="text-muted-foreground group-hover:text-muted-foreground/80 transition-colors"
                >
                  Total Revenue
                </Text>
                <div className="w-2 h-2 bg-success rounded-full group-hover:scale-125 transition-transform"></div>
              </div>
              <Text
                variant="lead"
                weight="bold"
                className="text-foreground group-hover:text-primary transition-colors"
              >
                $45,231
              </Text>
              <div className="flex items-center gap-2">
                <Badge
                  variant="success"
                  size="sm"
                  className="group-hover:shadow-sm transition-shadow"
                >
                  +20.1%
                </Badge>
                <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="w-1 h-1 bg-success rounded-full"></div>
                  <div className="w-1 h-1 bg-success/60 rounded-full"></div>
                  <div className="w-1 h-1 bg-success/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </GridItem>

      <GridItem colSpan={4}>
        <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group">
          <CardContent size="sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Text
                  variant="small"
                  className="text-muted-foreground group-hover:text-muted-foreground/80 transition-colors"
                >
                  Active Users
                </Text>
                <div className="w-2 h-2 bg-info rounded-full group-hover:scale-125 transition-transform"></div>
              </div>
              <Text
                variant="lead"
                weight="bold"
                className="text-foreground group-hover:text-primary transition-colors"
              >
                2,542
              </Text>
              <div className="flex items-center gap-2">
                <Badge
                  variant="success"
                  size="sm"
                  className="group-hover:shadow-sm transition-shadow"
                >
                  +5.2%
                </Badge>
                <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="w-1 h-1 bg-info rounded-full"></div>
                  <div className="w-1 h-1 bg-info/60 rounded-full"></div>
                  <div className="w-1 h-1 bg-info/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </GridItem>

      {/* Enhanced Footer actions */}
      <GridItem colSpan="full">
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <Text variant="small" className="text-muted-foreground">
                  Dashboard Actions
                </Text>
              </div>
              <div className="flex gap-3">
                {[
                  { text: 'Export Data', color: 'primary' },
                  { text: 'Settings', color: 'accent' },
                ].map((action, i) => (
                  <button
                    key={i}
                    className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-${action.color}/10 to-${action.color}/5 border border-${action.color}/20 text-${action.color} rounded-lg text-sm hover:shadow-sm hover:scale-105 transition-all duration-200 group backdrop-blur-sm`}
                  >
                    <div
                      className={`w-2 h-2 bg-${action.color} rounded-full group-hover:scale-125 transition-transform`}
                    ></div>
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </GridItem>
    </>
  ),
};

/**
 * Interactive Example with controls
 */
export const Interactive: Story = {
  args: {
    colSpan: 6,
    rowSpan: 'auto',
    align: 'auto',
  },
  render: (args) => (
    <GridItem {...args}>
      <DemoContent variant="primary">
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-current rounded-full opacity-60"></div>
            <div>Interactive GridItem</div>
          </div>
          <div className="text-xs opacity-70">Use controls to adjust properties</div>
          <div className="flex gap-1 justify-center opacity-40">
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <div className="w-1 h-1 bg-current rounded-full"></div>
          </div>
        </div>
      </DemoContent>
    </GridItem>
  ),
};
