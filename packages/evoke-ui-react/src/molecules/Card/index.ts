/**
 * Card Molecular Component
 * 
 * Flexible container component with optional header, content, and footer sections.
 * Built using CVA-first architecture with comprehensive variant support.
 * 
 * @example
 * ```tsx
 * import { Card, CardHeader, CardContent, CardFooter } from '@evoke-ui/react';
 * 
 * <Card variant="elevated">
 *   <CardHeader title="Card Title" description="Description" />
 *   <CardContent>
 *     <p>Card content goes here</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */

export * from './Card';
export type { CardProps, CardHeaderProps, CardContentProps, CardFooterProps } from './Card';
