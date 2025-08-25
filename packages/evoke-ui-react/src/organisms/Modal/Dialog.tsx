import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { 
  Modal,
  ModalContent, 
  ModalHeader, 
  ModalFooter,
  type ModalContentProps,
  type ModalHeaderProps,
  type ModalFooterProps
} from './Modal';
import { dialogClasses } from '../../styles/classNames';

/**
 * Dialog variants
 * Standard dialog styling with predefined layouts
 */
const dialogVariants = cva(
  'w-full',
  {
    variants: {
      type: {
        default: '',
        confirmation: 'max-w-md',
        destructive: 'max-w-md border-destructive/50',
        informational: 'max-w-lg',
        form: 'max-w-xl',
      },
      intent: {
        neutral: '',
        success: 'border-success/50',
        warning: 'border-warning/50',
        danger: 'border-destructive/50',
        info: 'border-info/50',
      },
    },
    defaultVariants: {
      type: 'default',
      intent: 'neutral',
    },
  }
);

/**
 * Dialog action variants
 * Action button styling for different contexts
 */
const dialogActionVariants = cva(
  'flex gap-2',
  {
    variants: {
      layout: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
        stacked: 'flex-col sm:flex-row',
      },
      align: {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
        between: 'justify-between',
      },
    },
    defaultVariants: {
      layout: 'stacked',
      align: 'right',
    },
  }
);

export interface DialogProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Modal>, 'children' | 'className'>,
    VariantProps<typeof dialogVariants> {
  /** Custom className */
  className?: string;
  /** Dialog title */
  title?: React.ReactNode;
  /** Dialog description */
  description?: React.ReactNode;
  /** Dialog content */
  children?: React.ReactNode;
  /** Primary action button */
  primaryAction?: React.ReactNode;
  /** Secondary action button */
  secondaryAction?: React.ReactNode;
  /** Additional action buttons */
  actions?: React.ReactNode;
  /** Whether to show the header */
  showHeader?: boolean;
  /** Whether to show the footer */
  showFooter?: boolean;
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Custom header props */
  headerProps?: Partial<ModalHeaderProps>;
  /** Custom footer props */
  footerProps?: Partial<ModalFooterProps>;
  /** Custom content props */
  contentProps?: Partial<ModalContentProps>;
  /** Action layout configuration */
  actionLayout?: VariantProps<typeof dialogActionVariants>['layout'];
  /** Action alignment configuration */
  actionAlign?: VariantProps<typeof dialogActionVariants>['align'];
}

/**
 * Dialog - Standard dialog component with header, body, and footer
 * Built on top of Modal with common dialog patterns
 * 
 * @example
 * ```tsx
 * // Confirmation dialog
 * <Dialog
 *   type="confirmation"
 *   title="Delete Item"
 *   description="Are you sure you want to delete this item? This action cannot be undone."
 *   primaryAction={<Button variant="destructive">Delete</Button>}
 *   secondaryAction={<Button variant="ghost">Cancel</Button>}
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 * />
 * 
 * // Form dialog
 * <Dialog
 *   type="form"
 *   title="Create User"
 *   primaryAction={<Button type="submit">Create</Button>}
 *   secondaryAction={<Button variant="ghost">Cancel</Button>}
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 * >
 *   <form>
 *     <FormField label="Name">
 *       <Input placeholder="Enter name" />
 *     </FormField>
 *     <FormField label="Email">
 *       <Input type="email" placeholder="Enter email" />
 *     </FormField>
 *   </form>
 * </Dialog>
 * 
 * // Informational dialog
 * <Dialog
 *   type="informational"
 *   intent="success"
 *   title="Success"
 *   description="Your changes have been saved successfully."
 *   primaryAction={<Button>Continue</Button>}
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 * />
 * ```
 */
const Dialog = React.forwardRef<
  React.ElementRef<typeof Modal>,
  DialogProps
>(({
  className,
  type,
  intent,
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
  actions,
  showHeader = true,
  showFooter = true,
  showCloseButton = true,
  headerProps = {},
  footerProps = {},
  contentProps = {},
  actionLayout = 'stacked',
  actionAlign = 'right',
  ...props
}, ref) => {
  const hasActions = !!(primaryAction || secondaryAction || actions);
  const shouldShowFooter = showFooter && hasActions;
  
  return (
    <Modal ref={ref} {...props}>
      <ModalContent 
        className={cn(
          dialogVariants({ type, intent }),
          dialogClasses.dialog,
          className
        )}
        showCloseButton={showCloseButton}
        {...contentProps}
      >
        {showHeader && (title || description) && (
          <ModalHeader
            title={title}
            description={description}
            {...headerProps}
          />
        )}
        
        {children && (
          <div className={cn(
            'flex-1',
            dialogClasses.content
          )}>
            {children}
          </div>
        )}
        
        {shouldShowFooter && (
          <ModalFooter {...footerProps}>
            <div className={cn(
              dialogActionVariants({ layout: actionLayout, align: actionAlign }),
              dialogClasses.actions
            )}>
              {secondaryAction}
              {primaryAction}
              {actions}
            </div>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
});

Dialog.displayName = 'Dialog';

export { Dialog, dialogVariants, dialogActionVariants };