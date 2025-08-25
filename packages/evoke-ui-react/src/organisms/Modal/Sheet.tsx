import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  type DrawerProps,
  type DrawerContentProps,
  type DrawerHeaderProps,
  type DrawerFooterProps
} from './Drawer';
import { sheetClasses } from '../../styles/classNames';

/**
 * Sheet variants
 * Side panel styling with specialized layouts
 */
const sheetVariants = cva(
  'border-0 shadow-2xl',
  {
    variants: {
      variant: {
        default: 'bg-background',
        ghost: 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        outline: 'border border-border bg-background',
        secondary: 'bg-secondary text-secondary-foreground',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        xl: '',
      },
    },
    compoundVariants: [
      {
        variant: 'ghost',
        className: 'shadow-xl',
      },
      {
        variant: 'outline',
        className: 'shadow-lg',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Sheet content variants
 * Content area styling for different sheet layouts
 */
const sheetContentVariants = cva(
  'flex-1 overflow-y-auto',
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
      spacing: {
        tight: 'space-y-2',
        normal: 'space-y-4',
        relaxed: 'space-y-6',
      },
    },
    defaultVariants: {
      padding: 'md',
      spacing: 'normal',
    },
  }
);

export interface SheetProps
  extends Omit<DrawerProps, 'side' | 'size'>,
    VariantProps<typeof sheetVariants> {
  /** Sheet position side */
  side?: DrawerProps['side'];
  /** Sheet size */
  sheetSize?: DrawerProps['size'];
  /** Content padding */
  padding?: VariantProps<typeof sheetContentVariants>['padding'];
  /** Content spacing */
  spacing?: VariantProps<typeof sheetContentVariants>['spacing'];
}

export interface SheetContentProps
  extends Omit<DrawerContentProps, 'size'>,
    VariantProps<typeof sheetContentVariants>,
    VariantProps<typeof sheetVariants> {
  /** Sheet size */
  sheetSize?: DrawerContentProps['size'];
}

export interface SheetHeaderProps extends DrawerHeaderProps {
  /** Whether to show a divider under the header */
  divider?: boolean;
}

export interface SheetFooterProps extends DrawerFooterProps {
  /** Whether to show a divider above the footer */
  divider?: boolean;
  /** Whether to make footer actions sticky */
  sticky?: boolean;
}

/**
 * Sheet - Side panel component with enhanced styling
 * Built on Drawer with specialized variants for side panels
 * 
 * @example
 * ```tsx
 * // Default sheet
 * <Sheet open={isOpen} onOpenChange={setIsOpen}>
 *   <SheetContent>
 *     <SheetHeader title="User Profile" divider />
 *     <div>Profile form content</div>
 *     <SheetFooter divider sticky>
 *       <Button variant="ghost">Cancel</Button>
 *       <Button>Save</Button>
 *     </SheetFooter>
 *   </SheetContent>
 * </Sheet>
 * 
 * // Left navigation sheet
 * <Sheet 
 *   side="left" 
 *   variant="ghost" 
 *   sheetSize="sm"
 *   open={navOpen} 
 *   onOpenChange={setNavOpen}
 * >
 *   <SheetContent padding="none">
 *     <SheetHeader title="Navigation" padding="md" />
 *     <nav className="flex-1 px-4">
 *       <NavigationMenu />
 *     </nav>
 *   </SheetContent>
 * </Sheet>
 * 
 * // Settings sheet with outline
 * <Sheet variant="outline" side="right" sheetSize="lg">
 *   <SheetContent spacing="relaxed">
 *     <SheetHeader 
 *       title="Settings" 
 *       description="Configure your application preferences"
 *       divider 
 *     />
 *     <div>Settings form</div>
 *     <SheetFooter align="between" sticky>
 *       <Button variant="ghost">Reset to Defaults</Button>
 *       <div className="space-x-2">
 *         <Button variant="ghost">Cancel</Button>
 *         <Button>Apply</Button>
 *       </div>
 *     </SheetFooter>
 *   </SheetContent>
 * </Sheet>
 * ```
 */
const Sheet = React.forwardRef<
  React.ElementRef<typeof Drawer>,
  SheetProps
>(({ 
  side = 'right',
  variant,
  size,
  sheetSize,
  padding,
  spacing,
  children,
  ...props 
}, ref) => (
  <Drawer 
    ref={ref} 
    side={side} 
    size={sheetSize || size}
    {...props}
  >
    {React.Children.map(children, child => {
      if (React.isValidElement(child) && child.type === SheetContent) {
        return React.cloneElement(child, {
          variant,
          size,
          sheetSize: sheetSize || size,
          padding,
          spacing,
          ...child.props
        });
      }
      return child;
    })}
  </Drawer>
));

/**
 * SheetTrigger - Trigger button to open sheet
 */
const SheetTrigger = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>
>((props, ref) => <DialogPrimitive.Trigger ref={ref} {...props} />);

/**
 * SheetContent - Sheet content container with enhanced styling
 * 
 * @example
 * ```tsx
 * <SheetContent variant="ghost" padding="lg" spacing="relaxed">
 *   <SheetHeader title="Enhanced Sheet" />
 *   <div>Content with enhanced styling</div>
 * </SheetContent>
 * ```
 */
const SheetContent = React.forwardRef<
  React.ElementRef<typeof DrawerContent>,
  SheetContentProps
>(({ 
  className,
  variant,
  size,
  sheetSize,
  padding,
  spacing,
  children,
  ...props 
}, ref) => (
  <DrawerContent
    ref={ref}
    size={sheetSize}
    className={cn(
      sheetVariants({ variant, size }),
      sheetClasses.content,
      className
    )}
    {...props}
  >
    <div className={cn(
      sheetContentVariants({ padding, spacing }),
      sheetClasses.inner
    )}>
      {children}
    </div>
  </DrawerContent>
));

/**
 * SheetHeader - Enhanced sheet header with divider option
 * 
 * @example
 * ```tsx
 * <SheetHeader 
 *   title="Sheet Title" 
 *   description="Sheet description"
 *   divider
 * />
 * ```
 */
const SheetHeader = React.forwardRef<
  HTMLDivElement,
  SheetHeaderProps
>(({ 
  className,
  divider = false,
  border,
  ...props 
}, ref) => (
  <DrawerHeader
    ref={ref}
    border={divider || border}
    className={cn(
      sheetClasses.header,
      className
    )}
    {...props}
  />
));

/**
 * SheetFooter - Enhanced sheet footer with sticky option
 * 
 * @example
 * ```tsx
 * <SheetFooter divider sticky>
 *   <Button variant="ghost">Cancel</Button>
 *   <Button>Save</Button>
 * </SheetFooter>
 * ```
 */
const SheetFooter = React.forwardRef<
  HTMLDivElement,
  SheetFooterProps
>(({ 
  className,
  divider = false,
  sticky = false,
  border,
  ...props 
}, ref) => (
  <DrawerFooter
    ref={ref}
    border={divider || border}
    className={cn(
      sheetClasses.footer,
      sticky && 'sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
      className
    )}
    {...props}
  />
));

/**
 * SheetTitle - Accessible sheet title
 */
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DrawerTitle>,
  React.ComponentPropsWithoutRef<typeof DrawerTitle>
>(({ className, ...props }, ref) => (
  <DrawerTitle
    ref={ref}
    className={cn(
      sheetClasses.title,
      className
    )}
    {...props}
  />
));

/**
 * SheetDescription - Accessible sheet description
 */
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DrawerDescription>,
  React.ComponentPropsWithoutRef<typeof DrawerDescription>
>(({ className, ...props }, ref) => (
  <DrawerDescription
    ref={ref}
    className={cn(
      sheetClasses.description,
      className
    )}
    {...props}
  />
));

/**
 * SheetClose - Close button for sheet
 */
const SheetClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>((props, ref) => <DialogPrimitive.Close ref={ref} {...props} />);

// Display names
Sheet.displayName = 'Sheet';
SheetContent.displayName = 'SheetContent';
SheetHeader.displayName = 'SheetHeader';
SheetFooter.displayName = 'SheetFooter';
SheetTitle.displayName = 'SheetTitle';
SheetDescription.displayName = 'SheetDescription';

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
  sheetVariants,
  sheetContentVariants,
};