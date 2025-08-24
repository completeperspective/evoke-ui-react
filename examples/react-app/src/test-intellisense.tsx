// TypeScript intellisense test for @evoke-ui/react
// This file tests that TypeScript properly recognizes component props and variants

import React from 'react'
import { 
  Button, 
  Input, 
  Text, 
  Badge, 
  Heading, 
  Label, 
  Skeleton, 
  Separator 
} from '@evoke-ui/react'

// This file should have no TypeScript errors and provide full intellisense
export function TypeScriptIntelliSenseTest() {
  return (
    <div>
      {/* Button component with all valid variants */}
      <Button variant="default">Default Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="destructive">Destructive Button</Button>
      <Button variant="link">Link Button</Button>
      <Button loading={true}>Loading Button</Button>
      <Button size="sm">Small Button</Button>
      <Button size="md">Medium Button</Button>
      <Button size="lg">Large Button</Button>
      
      {/* Input component */}
      <Input placeholder="Test input" />
      <Input disabled={true} />
      
      {/* Text component with variants */}
      <Text variant="body">Body text</Text>
      <Text variant="caption">Caption text</Text>
      <Text variant="code">Code text</Text>
      <Text variant="small">Small text</Text>
      <Text variant="lead">Lead text</Text>
      <Text variant="large">Large text</Text>
      <Text variant="muted">Muted text</Text>
      <Text variant="quote">Quote text</Text>
      <Text variant="highlight">Highlight text</Text>
      
      {/* Badge component */}
      <Badge variant="default">Default Badge</Badge>
      <Badge variant="secondary">Secondary Badge</Badge>
      <Badge variant="outline">Outline Badge</Badge>
      <Badge variant="destructive">Destructive Badge</Badge>
      <Badge size="sm">Small Badge</Badge>
      <Badge size="md">Medium Badge</Badge>
      <Badge size="lg">Large Badge</Badge>
      
      {/* Heading component */}
      <Heading level="h1">H1 Heading</Heading>
      <Heading level="h2">H2 Heading</Heading>
      <Heading level="h3">H3 Heading</Heading>
      <Heading level="h4">H4 Heading</Heading>
      <Heading level="h5">H5 Heading</Heading>
      <Heading level="h6">H6 Heading</Heading>
      <Heading variant="primary">Primary Heading</Heading>
      <Heading variant="muted">Muted Heading</Heading>
      
      {/* Label component */}
      <Label>Default Label</Label>
      <Label required>Required Label</Label>
      <Label optional>Optional Label</Label>
      <Label size="sm">Small Label</Label>
      <Label size="md">Medium Label</Label>
      <Label size="lg">Large Label</Label>
      
      {/* Skeleton component */}
      <Skeleton className="h-4 w-32" />
      
      {/* Separator component */}
      <Separator />
      <Separator orientation="vertical" className="h-8" />
    </div>
  )
}

// Test that component props are properly typed
type ButtonProps = React.ComponentProps<typeof Button>
type InputProps = React.ComponentProps<typeof Input>
type TextProps = React.ComponentProps<typeof Text>
type BadgeProps = React.ComponentProps<typeof Badge>
type HeadingProps = React.ComponentProps<typeof Heading>
type LabelProps = React.ComponentProps<typeof Label>
type SkeletonProps = React.ComponentProps<typeof Skeleton>
type SeparatorProps = React.ComponentProps<typeof Separator>

// Verify that variant types are properly inferred
const buttonVariants: ButtonProps['variant'][] = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link']
const textVariants: TextProps['variant'][] = ['body', 'caption', 'code', 'small', 'lead', 'large', 'muted', 'quote', 'highlight']
const badgeVariants: BadgeProps['variant'][] = ['default', 'secondary', 'outline', 'destructive']

// Use the variants to avoid TypeScript unused variable warning
console.log('Available variants:', { buttonVariants, textVariants, badgeVariants })

// Export for type testing
export type {
  ButtonProps,
  InputProps,
  TextProps,
  BadgeProps,
  HeadingProps,
  LabelProps,
  SkeletonProps,
  SeparatorProps
}