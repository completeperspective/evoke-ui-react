import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { modalClasses } from '../../styles/classNames';

/**
 * Modal overlay variants
 * Backdrop styling with blur and opacity options
 */
const modalOverlayVariants = cva(
  'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  {
    variants: {
      blur: {
        none: 'backdrop-blur-0',
        sm: 'backdrop-blur-sm',
        md: 'backdrop-blur-md',
        lg: 'backdrop-blur-lg',
      },
      opacity: {
        light: 'bg-black/40',
        medium: 'bg-black/60',
        heavy: 'bg-black/80',
        dark: 'bg-black/90',
      },
    },
    defaultVariants: {
      blur: 'sm',
      opacity: 'heavy',
    },
  }
);

/**
 * Modal content variants
 * Main modal container styling with responsive breakpoints
 */
const modalContentVariants = cva(
  'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        full: 'max-w-[95vw]',
        fullscreen: 'max-w-none w-[100vw] h-[100vh] max-h-none rounded-none',
      },
      maxHeight: {
        none: 'max-h-none',
        xs: 'max-h-[20rem]',
        sm: 'max-h-[24rem]',
        md: 'max-h-[28rem]',
        lg: 'max-h-[32rem]',
        xl: 'max-h-[36rem]',
        '2xl': 'max-h-[42rem]',
        screen: 'max-h-[90vh]',
      },
      position: {
        center: 'left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]',
        top: 'left-[50%] top-[10%] translate-x-[-50%] translate-y-0',
        bottom: 'left-[50%] bottom-[10%] translate-x-[-50%] translate-y-0',
      },
      scrollable: {
        true: 'overflow-y-auto',
        false: 'overflow-hidden',
      },
    },
    compoundVariants: [
      {
        size: 'fullscreen',
        position: 'center',
        className: 'left-0 top-0 translate-x-0 translate-y-0',
      },
      {
        scrollable: true,
        className: 'max-h-[90vh]',
      },
    ],
    defaultVariants: {
      size: 'md',
      maxHeight: 'screen',
      position: 'center',
      scrollable: false,
    },
  }
);

/**
 * Modal header variants
 * Header section styling with title layout
 */
const modalHeaderVariants = cva(
  'flex flex-col space-y-1.5 text-center sm:text-left',
  {
    variants: {
      size: {
        sm: 'pb-2',
        md: 'pb-3',
        lg: 'pb-4',
      },
      border: {
        true: 'border-b border-border pb-4',
        false: '',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      size: 'md',
      border: false,
      align: 'left',
    },
  }
);

/**
 * Modal footer variants
 * Footer section styling with action button layouts
 */
const modalFooterVariants = cva(
  'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
  {
    variants: {
      size: {
        sm: 'pt-2',
        md: 'pt-4',
        lg: 'pt-6',
      },
      align: {
        left: 'sm:justify-start',
        center: 'sm:justify-center',
        right: 'sm:justify-end',
        between: 'sm:justify-between',
      },
      border: {
        true: 'border-t border-border pt-4',
        false: '',
      },
      spacing: {
        tight: 'gap-2',
        normal: 'gap-3',
        relaxed: 'gap-4',
      },
    },
    defaultVariants: {
      size: 'md',
      align: 'right',
      border: false,
      spacing: 'normal',
    },
  }
);

/**
 * Close button variants
 * Close button styling for accessibility and interaction
 */
const modalCloseVariants = cva(
  'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// Base Modal component interfaces
export interface ModalProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>, 'modal'> {
  /** Whether the modal is open */
  open?: boolean;
  /** Callback when modal open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether the modal should be rendered as modal (default: true) */
  modal?: boolean;
}

export interface ModalOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
    VariantProps<typeof modalOverlayVariants> {}

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalContentVariants> {
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Custom close button icon */
  closeIcon?: React.ReactNode;
}

export interface ModalHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof modalHeaderVariants> {
  /** Modal title */
  title?: React.ReactNode;
  /** Modal description */
  description?: React.ReactNode;
}

export interface ModalFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalFooterVariants> {}

export interface ModalTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}

export interface ModalDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}

export interface ModalCloseProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>,
    VariantProps<typeof modalCloseVariants> {
  /** Custom close icon */
  icon?: React.ReactNode;
}

/**
 * Modal - Main modal container
 * Built on Radix UI Dialog with CVA-first styling
 * 
 * @example
 * ```tsx
 * <Modal open={isOpen} onOpenChange={setIsOpen}>
 *   <ModalOverlay />
 *   <ModalContent>
 *     <ModalHeader title="Confirm Action" />
 *     <p>Are you sure you want to proceed?</p>
 *     <ModalFooter>
 *       <Button variant="ghost">Cancel</Button>
 *       <Button>Confirm</Button>
 *     </ModalFooter>
 *   </ModalContent>
 * </Modal>
 * ```
 */
const Modal = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Root>,
  ModalProps
>(({ modal = true, ...props }, _ref) => (
  <DialogPrimitive.Root modal={modal} {...props} />
));

/**
 * ModalTrigger - Trigger button to open modal
 */
const ModalTrigger = DialogPrimitive.Trigger;

/**
 * ModalPortal - Portal container for modal content
 */
const ModalPortal = DialogPrimitive.Portal;

/**
 * ModalOverlay - Modal backdrop overlay
 * 
 * @example
 * ```tsx
 * <ModalOverlay blur="md" opacity="heavy" />
 * ```
 */
const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  ModalOverlayProps
>(({ className, blur, opacity, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      modalOverlayVariants({ blur, opacity }),
      modalClasses.overlay,
      className
    )}
    {...props}
  />
));

/**
 * ModalContent - Main modal content container
 * 
 * @example
 * ```tsx
 * <ModalContent size="lg" scrollable>
 *   <ModalHeader title="Large Modal" />
 *   <div>Modal content goes here</div>
 * </ModalContent>
 * ```
 */
const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ 
  className, 
  size,
  maxHeight,
  position,
  scrollable,
  showCloseButton = true,
  closeIcon,
  children, 
  ...props 
}, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        modalContentVariants({ size, maxHeight, position, scrollable }),
        modalClasses.content,
        className
      )}
      aria-describedby={props['aria-describedby'] || undefined}
      {...props}
    >
      {children}
      {showCloseButton && (
        <ModalClose icon={closeIcon}>
          <span className="sr-only">Close</span>
        </ModalClose>
      )}
    </DialogPrimitive.Content>
  </ModalPortal>
));

/**
 * ModalHeader - Modal header with title and description
 * 
 * @example
 * ```tsx
 * <ModalHeader 
 *   title="Confirm Action" 
 *   description="This action cannot be undone"
 *   border
 * />
 * ```
 */
const ModalHeader = React.forwardRef<
  HTMLDivElement,
  ModalHeaderProps
>(({ 
  className, 
  title,
  description,
  size,
  border,
  align,
  children, 
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn(
      modalHeaderVariants({ size, border, align }),
      modalClasses.header,
      className
    )}
    {...props}
  >
    {title && (
      <ModalTitle>
        {title}
      </ModalTitle>
    )}
    {description && (
      <ModalDescription>
        {description}
      </ModalDescription>
    )}
    {children}
  </div>
));

/**
 * ModalFooter - Modal footer with action buttons
 * 
 * @example
 * ```tsx
 * <ModalFooter align="between" border>
 *   <Button variant="ghost">Cancel</Button>
 *   <Button>Confirm</Button>
 * </ModalFooter>
 * ```
 */
const ModalFooter = React.forwardRef<
  HTMLDivElement,
  ModalFooterProps
>(({ 
  className, 
  size,
  align,
  border,
  spacing,
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn(
      modalFooterVariants({ size, align, border, spacing }),
      modalClasses.footer,
      className
    )}
    {...props}
  />
));

/**
 * ModalTitle - Accessible modal title
 */
const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  ModalTitleProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      modalClasses.title,
      className
    )}
    {...props}
  />
));

/**
 * ModalDescription - Accessible modal description
 */
const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  ModalDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      'text-sm text-muted-foreground',
      modalClasses.description,
      className
    )}
    {...props}
  />
));

/**
 * ModalClose - Close button component
 */
const ModalClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  ModalCloseProps
>(({ className, size, icon, children, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    className={cn(
      modalCloseVariants({ size }),
      modalClasses.close,
      className
    )}
    {...props}
  >
    {icon || (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
      >
        <path
          d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
          fill="currentColor"
        />
      </svg>
    )}
    {children}
  </DialogPrimitive.Close>
));

// Display names
Modal.displayName = 'Modal';
ModalOverlay.displayName = 'ModalOverlay';
ModalContent.displayName = 'ModalContent';
ModalHeader.displayName = 'ModalHeader';
ModalFooter.displayName = 'ModalFooter';
ModalTitle.displayName = 'ModalTitle';
ModalDescription.displayName = 'ModalDescription';
ModalClose.displayName = 'ModalClose';

export {
  Modal,
  ModalTrigger,
  ModalPortal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
  modalOverlayVariants,
  modalContentVariants,
  modalHeaderVariants,
  modalFooterVariants,
  modalCloseVariants,
};