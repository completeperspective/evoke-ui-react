import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';
import { GridItem } from '../GridItem/GridItem';
import { Card, CardHeader, CardContent } from '../../molecules/Card';
import { Badge } from '../Badge';
import { Text } from '../Text';
import { Heading } from '../Heading';

const meta: Meta<typeof Grid> = {
  title: 'Atoms/Grid',
  component: Grid,
  parameters: {
    docs: {
      description: {
        component:
          '🎯 Powerful responsive CSS Grid system engineered for modern dashboards. With intelligent 12-column support, flexible gap controls, and semantic responsive breakpoints, Grid creates sophisticated layouts that adapt beautifully across all screen sizes. Perfect for dashboard compositions, KPI cards, and complex data visualizations.',
      },
    },
  },
  argTypes: {
    columns: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 6, 8, 12, 'auto', 'auto-fill'],
      description: 'Number of grid columns or auto-sizing behavior',
    },
    gap: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Gap between grid items',
    },
    gapX: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Horizontal gap override',
    },
    gapY: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Vertical gap override',
    },
    flow: {
      control: { type: 'select' },
      options: ['row', 'col', 'row-dense', 'col-dense'],
      description: 'Grid auto-flow direction',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-gradient-to-br from-background to-muted/10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Grid>;

// Demo grid items with modern visual polish
const DemoItem = ({ children, className = '', variant = 'default', ...props }: any) => {
  const variants = {
    default: 'bg-gradient-to-br from-card/80 to-card/40 border border-border shadow-sm hover:shadow-md',
    primary: 'bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 backdrop-blur-sm hover:shadow-md hover:border-primary/30',
    success: 'bg-gradient-to-br from-success/10 to-success/5 border border-success/20 backdrop-blur-sm hover:shadow-md hover:border-success/30',
    info: 'bg-gradient-to-br from-info/10 to-info/5 border border-info/20 backdrop-blur-sm hover:shadow-md hover:border-info/30',
    warning: 'bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20 backdrop-blur-sm hover:shadow-md hover:border-warning/30',
    accent: 'bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 backdrop-blur-sm hover:shadow-md hover:border-accent/30',
  };
  
  return (
    <div 
      className={`${variants[variant as keyof typeof variants]} rounded-lg p-4 text-center text-sm font-medium transition-all duration-200 hover:scale-[1.02] group cursor-pointer ${className}`}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-foreground/30 group-hover:bg-foreground/60 rounded-full transition-colors"></div>
        <span className="text-foreground group-hover:text-foreground/80 transition-colors">{children}</span>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change }: { title: string; value: string; change?: string }) => (
  <Card variant="elevated" className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group backdrop-blur-sm">
    <CardContent size="sm" spacing="normal">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">{title}</p>
          <div className="w-2 h-2 bg-success rounded-full group-hover:scale-125 transition-transform"></div>
        </div>
        <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{value}</p>
        {change && (
          <div className="flex items-center gap-2">
            <Badge variant="success" size="sm" className="group-hover:shadow-sm transition-shadow">{change}</Badge>
            <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
              <div className="w-1 h-1 bg-success rounded-full"></div>
              <div className="w-1 h-1 bg-success/60 rounded-full"></div>
              <div className="w-1 h-1 bg-success/30 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

/**
 * Default Grid story showing basic 12-column layout
 */
export const Default: Story = {
  args: {
    columns: 12,
    gap: 'md',
  },
  render: (args) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          <Text weight="semibold">12-Column Grid Layout</Text>
        </div>
        <Text variant="small" className="text-muted-foreground">
          Responsive grid system with equal column distribution and medium spacing
        </Text>
      </div>
      <Grid {...args}>
        <GridItem colSpan={4}>
          <DemoItem variant="primary">Column 1-4</DemoItem>
        </GridItem>
        <GridItem colSpan={4}>
          <DemoItem variant="info">Column 5-8</DemoItem>
        </GridItem>
        <GridItem colSpan={4}>
          <DemoItem variant="success">Column 9-12</DemoItem>
        </GridItem>
      </Grid>
    </div>
  ),
};

/**
 * Column Variants showing different column configurations
 */
export const ColumnVariants: Story = {
  render: () => (
    <div className="space-y-10">
      <div className="space-y-3">
        <Heading level="h3" className="flex items-center gap-2">
          <div className="w-1 h-6 bg-info rounded-full"></div>
          Column Configuration Showcase
        </Heading>
        <Text className="text-muted-foreground">
          Flexible column layouts adapting to different content distributions
        </Text>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-info rounded-full"></div>
            <Text weight="semibold">2-Column Layout</Text>
            <Badge variant="outline" size="sm">50% + 50%</Badge>
          </div>
          <Grid columns={2} gap="md">
            <GridItem><DemoItem variant="info">Primary Content</DemoItem></GridItem>
            <GridItem><DemoItem variant="info">Secondary Content</DemoItem></GridItem>
          </Grid>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <Text weight="semibold">3-Column Layout</Text>
            <Badge variant="outline" size="sm">33.3% each</Badge>
          </div>
          <Grid columns={3} gap="md">
            <GridItem><DemoItem variant="success">Feature A</DemoItem></GridItem>
            <GridItem><DemoItem variant="success">Feature B</DemoItem></GridItem>
            <GridItem><DemoItem variant="success">Feature C</DemoItem></GridItem>
          </Grid>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-warning rounded-full"></div>
            <Text weight="semibold">4-Column Layout</Text>
            <Badge variant="outline" size="sm">Quarter grid</Badge>
          </div>
          <Grid columns={4} gap="md">
            <GridItem><DemoItem variant="warning">KPI 1</DemoItem></GridItem>
            <GridItem><DemoItem variant="warning">KPI 2</DemoItem></GridItem>
            <GridItem><DemoItem variant="warning">KPI 3</DemoItem></GridItem>
            <GridItem><DemoItem variant="warning">KPI 4</DemoItem></GridItem>
          </Grid>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <Text weight="semibold">6-Column Layout</Text>
            <Badge variant="outline" size="sm">Micro widgets</Badge>
          </div>
          <Grid columns={6} gap="md">
            {Array.from({ length: 6 }, (_, i) => (
              <GridItem key={i}><DemoItem variant="accent">Widget {i + 1}</DemoItem></GridItem>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  ),
};

/**
 * Gap Variants showing different spacing options
 */
export const GapVariants: Story = {
  render: () => (
    <div className="space-y-10">
      <div className="space-y-3">
        <Heading level="h3" className="flex items-center gap-2">
          <div className="w-1 h-6 bg-warning rounded-full"></div>
          Spacing Control System
        </Heading>
        <Text className="text-muted-foreground">
          Precise gap controls for optimal visual hierarchy and breathing room
        </Text>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-error rounded-full"></div>
            <Text weight="semibold">No Gap</Text>
            <Badge variant="secondary" size="sm">0px</Badge>
            <Text variant="small" className="text-muted-foreground">• Flush layout</Text>
          </div>
          <div className="bg-muted/20 border border-border/50 p-4 rounded-xl backdrop-blur-sm">
            <Grid columns={3} gap="none">
              <GridItem><DemoItem variant="primary">Seamless 1</DemoItem></GridItem>
              <GridItem><DemoItem variant="primary">Seamless 2</DemoItem></GridItem>
              <GridItem><DemoItem variant="primary">Seamless 3</DemoItem></GridItem>
            </Grid>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-info rounded-full"></div>
            <Text weight="semibold">Small Gap</Text>
            <Badge variant="secondary" size="sm">8px</Badge>
            <Text variant="small" className="text-muted-foreground">• Compact spacing</Text>
          </div>
          <div className="bg-muted/20 border border-border/50 p-4 rounded-xl backdrop-blur-sm">
            <Grid columns={3} gap="sm">
              <GridItem><DemoItem variant="info">Compact 1</DemoItem></GridItem>
              <GridItem><DemoItem variant="info">Compact 2</DemoItem></GridItem>
              <GridItem><DemoItem variant="info">Compact 3</DemoItem></GridItem>
            </Grid>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <Text weight="semibold">Large Gap</Text>
            <Badge variant="secondary" size="sm">24px</Badge>
            <Text variant="small" className="text-muted-foreground">• Generous spacing</Text>
          </div>
          <div className="bg-muted/20 border border-border/50 p-4 rounded-xl backdrop-blur-sm">
            <Grid columns={3} gap="lg">
              <GridItem><DemoItem variant="success">Spacious 1</DemoItem></GridItem>
              <GridItem><DemoItem variant="success">Spacious 2</DemoItem></GridItem>
              <GridItem><DemoItem variant="success">Spacious 3</DemoItem></GridItem>
            </Grid>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <Text weight="semibold">Custom Gap X/Y</Text>
            <Badge variant="secondary" size="sm">32px × 8px</Badge>
            <Text variant="small" className="text-muted-foreground">• Directional control</Text>
          </div>
          <div className="bg-muted/20 border border-border/50 p-6 rounded-xl backdrop-blur-sm">
            <Grid columns={3} gapX="xl" gapY="sm">
              <GridItem><DemoItem variant="accent">Wide X gap</DemoItem></GridItem>
              <GridItem><DemoItem variant="accent">Small Y gap</DemoItem></GridItem>
              <GridItem><DemoItem variant="accent">Custom control</DemoItem></GridItem>
              <GridItem><DemoItem variant="accent">Horizontal 32px</DemoItem></GridItem>
              <GridItem><DemoItem variant="accent">Vertical 8px</DemoItem></GridItem>
              <GridItem><DemoItem variant="accent">Precise spacing</DemoItem></GridItem>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Responsive Grid showing mobile-first responsive behavior
 */
export const ResponsiveGrid: Story = {
  render: () => (
    <div className="space-y-10">
      <div className="space-y-3">
        <Heading level="h3" className="flex items-center gap-2">
          <div className="w-1 h-6 bg-success rounded-full"></div>
          Mobile-First Responsive System
        </Heading>
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 backdrop-blur-sm">
          <Text className="text-muted-foreground">
            💡 <strong>Resize your browser</strong> to see intelligent grid adaptations: 1 col → 2 cols → 4 cols
          </Text>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <Text weight="semibold">Responsive KPI Dashboard</Text>
            <Badge variant="outline" size="sm">Mobile → 2 cols → 4 cols</Badge>
          </div>
          <Text variant="small" className="text-muted-foreground mb-4">
            Professional dashboard metrics that gracefully adapt to any screen size
          </Text>
          <Grid
            columns={1}
            responsive={{
              sm: 2,
              lg: 4
            }}
            gap="md"
          >
            <GridItem>
              <StatCard title="Revenue" value="$45,231" change="+20.1%" />
            </GridItem>
            <GridItem>
              <StatCard title="Users" value="2,542" change="+180.1%" />
            </GridItem>
            <GridItem>
              <StatCard title="Orders" value="543" change="+19%" />
            </GridItem>
            <GridItem>
              <StatCard title="Growth" value="12.5%" change="+5.2%" />
            </GridItem>
          </Grid>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <Text weight="semibold">Responsive Gap Control</Text>
            <Badge variant="outline" size="sm">sm → lg → xl gaps</Badge>
          </div>
          <Text variant="small" className="text-muted-foreground mb-4">
            Intelligent spacing that increases with screen size for optimal visual hierarchy
          </Text>
          <div className="bg-muted/20 border border-border/50 p-4 rounded-xl backdrop-blur-sm">
            <Grid
              columns={1}
              responsive={{ sm: 2, lg: 3 }}
              gap="sm"
              responsiveGap={{ md: 'lg', xl: 'xl' }}
            >
              <GridItem><DemoItem variant="accent">Adaptive spacing</DemoItem></GridItem>
              <GridItem><DemoItem variant="accent">Screen-aware gaps</DemoItem></GridItem>
              <GridItem><DemoItem variant="accent">Progressive enhancement</DemoItem></GridItem>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Dashboard Layout showing real-world dashboard example
 */
export const DashboardLayout: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <Heading level="h3" className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-r from-primary to-accent rounded-full"></div>
          Complete Dashboard Composition
        </Heading>
        <Text className="text-muted-foreground">
          Production-ready dashboard layout showcasing complex responsive grid patterns
        </Text>
      </div>
      
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 border border-border/50 rounded-2xl overflow-hidden backdrop-blur-sm">
        <Grid columns={12} gap="lg" className="p-6">
          {/* Enhanced Header */}
          <GridItem colSpan="full">
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader 
                title={(
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-primary rounded"></div>
                    </div>
                    Analytics Dashboard
                  </div>
                )} 
                description="Real-time metrics and insights with intelligent grid composition" 
              />
            </Card>
          </GridItem>
          
          {/* Enhanced KPI Cards */}
          <GridItem 
            colSpan={12}
            responsive={{ sm: { colSpan: 6 }, lg: { colSpan: 3 } }}
          >
            <StatCard title="Total Revenue" value="$45,231" change="+20.1%" />
          </GridItem>
          <GridItem 
            colSpan={12}
            responsive={{ sm: { colSpan: 6 }, lg: { colSpan: 3 } }}
          >
            <StatCard title="Active Users" value="2,542" change="+180.1%" />
          </GridItem>
          <GridItem 
            colSpan={12}
            responsive={{ sm: { colSpan: 6 }, lg: { colSpan: 3 } }}
          >
            <StatCard title="New Orders" value="543" change="+19%" />
          </GridItem>
          <GridItem 
            colSpan={12}
            responsive={{ sm: { colSpan: 6 }, lg: { colSpan: 3 } }}
          >
            <StatCard title="Growth Rate" value="12.5%" change="+5.2%" />
          </GridItem>
          
          {/* Enhanced Main Chart */}
          <GridItem 
            colSpan={12}
            responsive={{ lg: { colSpan: 8 } }}
          >
            <Card variant="elevated" className="h-64 hover:shadow-lg transition-all duration-300 group">
              <CardHeader title="Revenue Analytics" />
              <CardContent>
                <div className="h-48 bg-gradient-to-br from-primary/5 via-accent/5 to-success/5 border border-border/50 rounded-lg flex items-center justify-center text-muted-foreground backdrop-blur-sm">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <div className="w-6 h-6 bg-primary rounded"></div>
                    </div>
                    <Text>📈 Interactive Chart Component</Text>
                  </div>
                </div>
              </CardContent>
            </Card>
          </GridItem>
          
          {/* Enhanced Activity Feed */}
          <GridItem 
            colSpan={12}
            responsive={{ lg: { colSpan: 4 } }}
            className="lg:row-span-2"
          >
            <Card variant="elevated" className="h-64 hover:shadow-lg transition-shadow duration-200">
              <CardHeader 
                title={(
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-info rounded-full animate-pulse"></div>
                    Recent Activity
                  </div>
                )} 
              />
              <CardContent>
                <div className="space-y-3">
                  {[
                    { text: 'Order #1234 completed', color: 'success' },
                    { text: 'New user registered', color: 'info' },
                    { text: 'Payment received', color: 'primary' },
                    { text: 'Support ticket resolved', color: 'accent' }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-card/50 hover:bg-card border border-border/50 rounded-lg text-sm transition-colors group">
                      <div className={`w-2 h-2 bg-${activity.color} rounded-full group-hover:scale-125 transition-transform`}></div>
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">{activity.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </GridItem>
          
          {/* Enhanced Quick Actions */}
          <GridItem 
            colSpan={12}
            responsive={{ sm: { colSpan: 6 }, lg: { colSpan: 4 } }}
          >
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardHeader title="Quick Actions" />
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { text: 'Add User', icon: 'primary' },
                    { text: 'New Order', icon: 'success' },
                    { text: 'Generate Report', icon: 'info' },
                    { text: 'Settings', icon: 'accent' }
                  ].map((action, i) => (
                    <button key={i} className={`flex items-center gap-2 p-3 bg-gradient-to-br from-${action.icon}/10 to-${action.icon}/5 border border-${action.icon}/20 rounded-lg text-sm hover:shadow-sm hover:scale-105 transition-all duration-200 group backdrop-blur-sm`}>
                      <div className={`w-2 h-2 bg-${action.icon} rounded-full group-hover:scale-125 transition-transform`}></div>
                      {action.text}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </GridItem>
          
          {/* Enhanced Recent Items */}
          <GridItem 
            colSpan={12}
            responsive={{ sm: { colSpan: 6 }, lg: { colSpan: 4 } }}
          >
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardHeader title="Recent Items" />
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Product A', status: 'In Stock', color: 'success' },
                    { name: 'Product B', status: 'Low Stock', color: 'warning' },
                    { name: 'Product C', status: 'In Stock', color: 'success' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-card/50 hover:bg-card border border-border/50 rounded-lg text-sm transition-colors group">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 bg-${item.color} rounded-full group-hover:scale-125 transition-transform`}></div>
                        <span className="text-foreground">{item.name}</span>
                      </div>
                      <Badge variant={item.color === 'success' ? 'success' : 'warning'} size="sm" className="group-hover:shadow-sm transition-shadow">{item.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </GridItem>
        </Grid>
      </div>
    </div>
  ),
};

/**
 * Auto-fit Cards showing responsive card layout
 */
export const AutoFitCards: Story = {
  render: () => (
    <div className="space-y-10">
      <div className="space-y-3">
        <Heading level="h3" className="flex items-center gap-2">
          <div className="w-1 h-6 bg-info rounded-full"></div>
          Auto-Sizing Grid Systems
        </Heading>
        <Text className="text-muted-foreground">
          Intelligent grid layouts that automatically adapt to available space and content
        </Text>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <Text weight="semibold">Auto-Fit Cards</Text>
            <Badge variant="outline" size="sm">min-width: 250px</Badge>
          </div>
          <Text variant="small" className="text-muted-foreground mb-4">
            Cards automatically adjust to available space with intelligent minimum width constraints
          </Text>
          <div className="bg-muted/20 border border-border/50 p-4 rounded-xl backdrop-blur-sm">
            <Grid columns="auto" gap="lg">
              {Array.from({ length: 8 }, (_, i) => (
                <GridItem key={i}>
                  <Card variant="outlined" className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group">
                    <CardHeader 
                      title={(
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full group-hover:scale-125 transition-transform ${
                            i % 4 === 0 ? 'bg-primary' : 
                            i % 4 === 1 ? 'bg-success' : 
                            i % 4 === 2 ? 'bg-info' : 'bg-accent'
                          }`}></div>
                          Product {i + 1}
                        </div>
                      )} 
                    />
                    <CardContent>
                      <div className="space-y-2">
                        <Text variant="small" className="text-muted-foreground group-hover:text-foreground transition-colors">
                          Auto-sizing card with intelligent space distribution
                        </Text>
                        <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                          <div className="w-1 h-1 bg-current rounded-full"></div>
                          <div className="w-1 h-1 bg-current rounded-full"></div>
                          <div className="w-1 h-1 bg-current rounded-full"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <Text weight="semibold">Auto-Fill Cards</Text>
            <Badge variant="outline" size="sm">Fills remaining space</Badge>
          </div>
          <Text variant="small" className="text-muted-foreground mb-4">
            Creates empty columns to fill all available horizontal space for perfect alignment
          </Text>
          <div className="bg-muted/20 border border-border/50 p-4 rounded-xl backdrop-blur-sm">
            <Grid columns="auto-fill" gap="lg">
              {Array.from({ length: 5 }, (_, i) => (
                <GridItem key={i}>
                  <Card variant="elevated" className="hover:shadow-xl hover:scale-[1.02] transition-all duration-200 group">
                    <CardHeader 
                      title={(
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full group-hover:scale-125 transition-transform ${
                            i % 3 === 0 ? 'bg-accent' : 
                            i % 3 === 1 ? 'bg-warning' : 'bg-info'
                          }`}></div>
                          Feature {i + 1}
                        </div>
                      )} 
                    />
                    <CardContent>
                      <div className="space-y-3">
                        <Text variant="small" className="text-muted-foreground group-hover:text-foreground transition-colors">
                          Auto-fill ensures perfect space utilization across all screen sizes
                        </Text>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                            <div className="w-1 h-1 bg-accent rounded-full"></div>
                            <div className="w-1 h-1 bg-accent/60 rounded-full"></div>
                            <div className="w-1 h-1 bg-accent/30 rounded-full"></div>
                          </div>
                          <Badge variant="secondary" size="sm" className="group-hover:shadow-sm transition-shadow">Auto</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Complex Layout showing mixed column spans and positioning
 */
export const ComplexLayout: Story = {
  render: () => (
    <div className="space-y-10">
      <div className="space-y-3">
        <Heading level="h3" className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-r from-warning to-accent rounded-full"></div>
          Advanced Grid Compositions
        </Heading>
        <Text className="text-muted-foreground">
          Sophisticated layouts with mixed spans, explicit positioning, and multi-dimensional control
        </Text>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <Text weight="semibold">Mixed Column Spans</Text>
            <Badge variant="outline" size="sm">12-column system</Badge>
          </div>
          <div className="bg-muted/20 border border-border/50 p-4 rounded-xl backdrop-blur-sm">
            <Grid columns={12} gap="md">
              <GridItem colSpan={12}>
                <DemoItem variant="primary">Full Width Header (12 columns)</DemoItem>
              </GridItem>
              <GridItem colSpan={8}>
                <DemoItem variant="success">Main Content (8 columns)</DemoItem>
              </GridItem>
              <GridItem colSpan={4}>
                <DemoItem variant="warning">Sidebar (4 columns)</DemoItem>
              </GridItem>
              <GridItem colSpan={6}>
                <DemoItem variant="info">Left Panel (6 columns)</DemoItem>
              </GridItem>
              <GridItem colSpan={6}>
                <DemoItem variant="accent">Right Panel (6 columns)</DemoItem>
              </GridItem>
              <GridItem colSpan={4}>
                <DemoItem variant="primary">Widget 1 (4 columns)</DemoItem>
              </GridItem>
              <GridItem colSpan={4}>
                <DemoItem variant="success">Widget 2 (4 columns)</DemoItem>
              </GridItem>
              <GridItem colSpan={4}>
                <DemoItem variant="warning">Widget 3 (4 columns)</DemoItem>
              </GridItem>
            </Grid>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-info rounded-full"></div>
            <Text weight="semibold">Explicit Positioning</Text>
            <Badge variant="outline" size="sm">Precise placement</Badge>
          </div>
          <div className="bg-muted/20 border border-border/50 p-4 rounded-xl backdrop-blur-sm">
            <Grid columns={12} gap="md" className="min-h-48">
              <GridItem colSpan={4} colStart={1}>
                <DemoItem variant="primary">Start at column 1</DemoItem>
              </GridItem>
              <GridItem colSpan={4} colStart={5}>
                <DemoItem variant="info">Start at column 5</DemoItem>
              </GridItem>
              <GridItem colSpan={4} colStart={9}>
                <DemoItem variant="success">Start at column 9</DemoItem>
              </GridItem>
              <GridItem colSpan={6} colStart={4}>
                <DemoItem variant="accent">Centered (start at 4, span 6)</DemoItem>
              </GridItem>
            </Grid>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <Text weight="semibold">Multi-Dimensional Spanning</Text>
            <Badge variant="outline" size="sm">Row + Column control</Badge>
          </div>
          <div className="bg-muted/20 border border-border/50 p-4 rounded-xl backdrop-blur-sm">
            <Grid columns={4} gap="md" className="min-h-64">
              <GridItem colSpan={2} rowSpan={2}>
                <DemoItem variant="primary" className="h-full flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-4 h-4 bg-current rounded-full mx-auto opacity-60"></div>
                    <div>Large Feature</div>
                    <div className="text-xs opacity-70">(2×2 span)</div>
                  </div>
                </DemoItem>
              </GridItem>
              <GridItem>
                <DemoItem variant="info">Micro Widget 1</DemoItem>
              </GridItem>
              <GridItem>
                <DemoItem variant="success">Micro Widget 2</DemoItem>
              </GridItem>
              <GridItem>
                <DemoItem variant="warning">Micro Widget 3</DemoItem>
              </GridItem>
              <GridItem>
                <DemoItem variant="accent">Micro Widget 4</DemoItem>
              </GridItem>
              <GridItem colSpan={4}>
                <DemoItem variant="default">Full Width Footer</DemoItem>
              </GridItem>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Interactive Example with controls
 */
export const Interactive: Story = {
  args: {
    columns: 4,
    gap: 'md',
    flow: 'row',
  },
  render: (args) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-r from-primary via-accent to-success rounded-full"></div>
          <Text weight="semibold">Interactive Grid Playground</Text>
        </div>
        <Text variant="small" className="text-muted-foreground">
          Use the controls below to experiment with different grid configurations and see live updates
        </Text>
      </div>
      <div className="bg-gradient-to-br from-muted/20 to-muted/10 border border-border/50 p-6 rounded-xl backdrop-blur-sm">
        <Grid {...args}>
          {Array.from({ length: 8 }, (_, i) => (
            <GridItem key={i}>
              <DemoItem variant={i % 4 === 0 ? 'primary' : i % 4 === 1 ? 'success' : i % 4 === 2 ? 'info' : 'accent'}>
                <div className="space-y-1">
                  <div>Item {i + 1}</div>
                  <div className="text-xs opacity-60">Position {i + 1}</div>
                </div>
              </DemoItem>
            </GridItem>
          ))}
        </Grid>
      </div>
      <div className="bg-info/10 border border-info/20 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-info rounded-full"></div>
          <Text variant="small" className="text-muted-foreground">
            <strong>Pro tip:</strong> Adjust columns, gap, and flow settings using the controls panel to see how the grid system adapts
          </Text>
        </div>
      </div>
    </div>
  ),
};
