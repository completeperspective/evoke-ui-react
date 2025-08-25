import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { 
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalTitle,
  ModalDescription,
  ModalClose,
  type ModalProps,
  type ModalOverlayProps
} from './Modal';
import { drawerClasses } from '../../styles/classNames';

/**
 * Drawer content variants
 * Slide-out drawer styling with position and size options
 */
const drawerContentVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right: 'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        xl: '',
        full: '',
      },
    },
    compoundVariants: [
      // Top/Bottom drawer sizes
      {
        side: ['top', 'bottom'],
        size: 'sm',
        className: 'h-1/3',
      },
      {
        side: ['top', 'bottom'],
        size: 'md',
        className: 'h-1/2',
      },
      {
        side: ['top', 'bottom'],
        size: 'lg',
        className: 'h-2/3',
      },
      {
        side: ['top', 'bottom'],
        size: 'xl',
        className: 'h-3/4',
      },
      {
        side: ['top', 'bottom'],
        size: 'full',
        className: 'h-full',
      },
      // Left/Right drawer sizes
      {
        side: ['left', 'right'],
        size: 'sm',
        className: 'w-1/4 sm:max-w-xs',
      },
      {
        side: ['left', 'right'],
        size: 'md',
        className: 'w-3/4 sm:max-w-sm',
      },
      {
        side: ['left', 'right'],
        size: 'lg',
        className: 'w-4/5 sm:max-w-md',
      },
      {
        side: ['left', 'right'],
        size: 'xl',
        className: 'w-5/6 sm:max-w-lg',
      },
      {
        side: ['left', 'right'],
        size: 'full',
        className: 'w-full',
      },
    ],
    defaultVariants: {
      side: 'right',
      size: 'md',
    },
  }
);

/**
 * Drawer header variants
 * Header section styling for drawers
 */
const drawerHeaderVariants = cva(
  'flex flex-col space-y-2 text-left',
  {
    variants: {
      size: {
        sm: 'pb-2',
        md: 'pb-4',
        lg: 'pb-6',
      },
      border: {
        true: 'border-b border-border pb-4',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      border: true,
    },
  }
);

/**
 * Drawer footer variants
 * Footer section styling for drawers
 */
const drawerFooterVariants = cva(
  'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
  {
    variants: {
      size: {
        sm: 'pt-2',
        md: 'pt-4',
        lg: 'pt-6',
      },
      border: {
        true: 'border-t border-border pt-4',
        false: '',
      },
      align: {
        left: 'sm:justify-start',
        center: 'sm:justify-center',
        right: 'sm:justify-end',
        between: 'sm:justify-between',
      },
    },
    defaultVariants: {
      size: 'md',
      border: true,
      align: 'right',
    },
  }
);

export interface DrawerProps
  extends ModalProps,
    VariantProps<typeof drawerContentVariants> {
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Custom overlay props */
  overlayProps?: Partial<ModalOverlayProps>;
}

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof drawerContentVariants> {
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Custom close button icon */
  closeIcon?: React.ReactNode;
}

export interface DrawerHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof drawerHeaderVariants> {
  /** Drawer title */
  title?: React.ReactNode;
  /** Drawer description */
  description?: React.ReactNode;
}

export interface DrawerFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof drawerFooterVariants> {}

export interface DrawerTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}

export interface DrawerDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}

/**
 * Drawer - Mobile-responsive slide-out drawer
 * Built on Modal with slide animations from different sides
 * 
 * @example
 * ```tsx
 * // Right drawer (default)
 * <Drawer open={isOpen} onOpenChange={setIsOpen}>
 *   <DrawerContent>
 *     <DrawerHeader title="Settings" />
 *     <div className="flex-1">
 *       <p>Drawer content goes here</p>
 *     </div>
 *   </DrawerContent>
 * </Drawer>
 * 
 * // Left navigation drawer
 * <Drawer 
 *   side="left" 
 *   size="sm"
 *   open={navOpen} 
 *   onOpenChange={setNavOpen}
 * >
 *   <DrawerContent showCloseButton={false}>
 *     <DrawerHeader title="Navigation" border={false} />
 *     <nav>
 *       <ul>
 *         <li><a href="/home">Home</a></li>
 *         <li><a href="/about">About</a></li>
 *         <li><a href="/contact">Contact</a></li>
 *       </ul>
 *     </nav>
 *   </DrawerContent>
 * </Drawer>
 * 
 * // Bottom drawer
 * <Drawer side="bottom" size="lg" open={isOpen} onOpenChange={setIsOpen}>
 *   <DrawerContent>
 *     <DrawerHeader title="Filters" />
 *     <div>Filter options go here</div>
 *     <DrawerFooter>
 *       <Button variant="ghost">Clear</Button>
 *       <Button>Apply</Button>
 *     </DrawerFooter>
 *   </DrawerContent>
 * </Drawer>
 * ```
 */
const Drawer = React.forwardRef<
  React.ElementRef<typeof Modal>,
  DrawerProps
>(({ 
  side,
  size,
  showCloseButton = true,
  overlayProps,
  children,
  ...props 
}, ref) => (
  <Modal ref={ref} {...props}>
    {React.Children.map(children, child => {
      if (React.isValidElement(child) && child.type === DrawerContent) {
        return React.cloneElement(child, {
          side,
          size,
          showCloseButton,
          ...child.props
        });
      }
      return child;
    })}
  </Modal>
));

/**
 * DrawerTrigger - Trigger button to open drawer
 */
const DrawerTrigger = DialogPrimitive.Trigger;

/**
 * DrawerPortal - Portal container for drawer content
 */
const DrawerPortal = DialogPrimitive.Portal;

/**
 * DrawerContent - Drawer content container
 * 
 * @example
 * ```tsx
 * <DrawerContent side="left" size="sm">
 *   <DrawerHeader title="Menu" />
 *   <nav>Navigation items</nav>
 * </DrawerContent>
 * ```
 */
const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(({ 
  className, 
  side = 'right',
  size = 'md',
  showCloseButton = true,
  closeIcon,
  children,
  ...props 
}, ref) => (
  <ModalPortal>
    <ModalOverlay 
      blur="sm" 
      opacity="medium"
    />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        drawerContentVariants({ side, size }),
        drawerClasses.content,
        className
      )}
      {...props}
    >
      <div className="flex h-full flex-col">
        {children}
      </div>
      {showCloseButton && (
        <ModalClose 
          className={cn(
            'absolute right-4 top-4',
            side === 'top' && 'top-4',
            side === 'bottom' && 'bottom-4',
          )}
          icon={closeIcon}
        >
          <span className="sr-only">Close</span>
        </ModalClose>
      )}
    </DialogPrimitive.Content>
  </ModalPortal>
));

/**
 * DrawerHeader - Drawer header with title and description
 * 
 * @example
 * ```tsx
 * <DrawerHeader 
 *   title="Settings" 
 *   description="Configure your preferences"
 *   border
 * />
 * ```
 */
const DrawerHeader = React.forwardRef<
  HTMLDivElement,
  DrawerHeaderProps
>(({ 
  className, 
  title,
  description,
  size = 'md',
  border = true,
  children, 
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn(
      drawerHeaderVariants({ size, border }),
      drawerClasses.header,
      className
    )}
    {...props}
  >
    {title && (
      <DrawerTitle>
        {title}
      </DrawerTitle>
    )}
    {description && (
      <DrawerDescription>
        {description}
      </DrawerDescription>
    )}
    {children}
  </div>
));

/**
 * DrawerFooter - Drawer footer with action buttons
 * 
 * @example
 * ```tsx
 * <DrawerFooter align="between" border>
 *   <Button variant="ghost">Cancel</Button>
 *   <Button>Apply</Button>
 * </DrawerFooter>
 * ```
 */
const DrawerFooter = React.forwardRef<
  HTMLDivElement,
  DrawerFooterProps
>(({ 
  className, 
  size = 'md',
  border = true,
  align = 'right',
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn(
      drawerFooterVariants({ size, border, align }),
      drawerClasses.footer,
      className
    )}
    {...props}
  />
));

/**
 * DrawerTitle - Accessible drawer title
 */
const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof ModalTitle>,
  DrawerTitleProps
>(({ className, ...props }, ref) => (
  <ModalTitle
    ref={ref}
    className={cn(
      drawerClasses.title,
      className
    )}
    {...props}
  />
));

/**
 * DrawerDescription - Accessible drawer description
 */
const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof ModalDescription>,
  DrawerDescriptionProps
>(({ className, ...props }, ref) => (
  <ModalDescription
    ref={ref}
    className={cn(
      drawerClasses.description,
      className
    )}
    {...props}
  />
));

/**
 * DrawerClose - Close button for drawer
 */
const DrawerClose = ModalClose;

// Display names
Drawer.displayName = 'Drawer';
DrawerContent.displayName = 'DrawerContent';
DrawerHeader.displayName = 'DrawerHeader';
DrawerFooter.displayName = 'DrawerFooter';
DrawerTitle.displayName = 'DrawerTitle';
DrawerDescription.displayName = 'DrawerDescription';

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  drawerContentVariants,
  drawerHeaderVariants,
  drawerFooterVariants,
};