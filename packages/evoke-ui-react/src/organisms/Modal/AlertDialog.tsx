import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { 
  modalOverlayVariants, 
  modalContentVariants,
  modalHeaderVariants,
  modalFooterVariants,
  type ModalOverlayProps,
  type ModalContentProps 
} from './Modal';
import { alertDialogClasses } from '../../styles/classNames';
import { Button } from '../../atoms/Button';

/**
 * Alert Dialog variants
 * Specialized variants for alert/confirmation dialogs
 */
const alertDialogVariants = cva(
  'max-w-md',
  {
    variants: {
      intent: {
        default: 'border-border',
        info: 'border-info/50',
        warning: 'border-warning/50 bg-warning/5',
        danger: 'border-destructive/50 bg-destructive/5',
        success: 'border-success/50 bg-success/5',
      },
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'md',
    },
  }
);

/**
 * Alert Dialog action variants
 * Predefined action button configurations
 */
const alertDialogActionVariants = cva(
  'flex gap-2 justify-end',
  {
    variants: {
      layout: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
        stacked: 'flex-col-reverse sm:flex-row',
      },
    },
    defaultVariants: {
      layout: 'stacked',
    },
  }
);

export interface AlertDialogProps
  extends Omit<React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root>, 'children' | 'className'>,
    VariantProps<typeof alertDialogVariants> {
  /** Custom className */
  className?: string;
  /** Alert dialog title */
  title?: React.ReactNode;
  /** Alert dialog description */
  description?: React.ReactNode;
  /** Alert dialog content */
  children?: React.ReactNode;
  /** Cancel button text or element */
  cancelText?: React.ReactNode;
  /** Action button text or element */
  actionText?: React.ReactNode;
  /** Cancel button props */
  cancelProps?: React.ComponentProps<typeof Button>;
  /** Action button props */
  actionProps?: React.ComponentProps<typeof Button>;
  /** Custom trigger element */
  trigger?: React.ReactNode;
  /** Callback when action is confirmed */
  onAction?: () => void;
  /** Callback when action is cancelled */
  onCancel?: () => void;
  /** Whether to show cancel button */
  showCancel?: boolean;
  /** Action layout configuration */
  actionLayout?: VariantProps<typeof alertDialogActionVariants>['layout'];
  /** Custom overlay props */
  overlayProps?: Partial<ModalOverlayProps>;
  /** Custom content props */
  contentProps?: Partial<ModalContentProps>;
}

/**
 * AlertDialog - Confirmation and alert dialogs
 * Built on Radix UI AlertDialog for critical user decisions
 * 
 * @example
 * ```tsx
 * // Destructive confirmation
 * <AlertDialog
 *   intent="danger"
 *   title="Delete Account"
 *   description="This will permanently delete your account and all associated data. This action cannot be undone."
 *   actionText="Delete Account"
 *   actionProps={{ variant: 'destructive' }}
 *   cancelText="Cancel"
 *   trigger={<Button variant="destructive">Delete Account</Button>}
 *   onAction={() => deleteAccount()}
 * />
 * 
 * // Simple confirmation
 * <AlertDialog
 *   intent="default"
 *   title="Save Changes"
 *   description="Do you want to save your changes before leaving?"
 *   actionText="Save"
 *   cancelText="Don't Save"
 *   trigger={<Button>Leave Page</Button>}
 *   onAction={() => saveChanges()}
 * />
 * 
 * // Warning dialog
 * <AlertDialog
 *   intent="warning"
 *   title="Unsaved Changes"
 *   description="You have unsaved changes. Are you sure you want to leave without saving?"
 *   actionText="Leave Without Saving"
 *   actionProps={{ variant: 'destructive' }}
 *   cancelText="Stay"
 *   trigger={<Button variant="ghost">Back</Button>}
 *   onAction={() => navigate(-1)}
 * />
 * ```
 */
const AlertDialog = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Root>,
  AlertDialogProps
>(({
  className,
  intent,
  size,
  title,
  description,
  children,
  cancelText = 'Cancel',
  actionText = 'Continue',
  cancelProps,
  actionProps,
  trigger,
  onAction,
  onCancel,
  showCancel = true,
  actionLayout = 'stacked',
  overlayProps,
  contentProps,
  ...props
}, _ref) => {
  return (
    <AlertDialogPrimitive.Root {...props}>
      {trigger && (
        <AlertDialogTrigger asChild>
          {trigger}
        </AlertDialogTrigger>
      )}
      
      <AlertDialogPortal>
        <AlertDialogOverlay {...overlayProps} />
        <AlertDialogContent
          className={cn(
            alertDialogVariants({ intent, size }),
            alertDialogClasses.alertDialog,
            className
          )}
          {...contentProps}
        >
          {(title || description) && (
            <AlertDialogHeader>
              {title && (
                <AlertDialogTitle>
                  {title}
                </AlertDialogTitle>
              )}
              {description && (
                <AlertDialogDescription>
                  {description}
                </AlertDialogDescription>
              )}
            </AlertDialogHeader>
          )}
          
          {children && (
            <div className={cn(alertDialogClasses.content)}>
              {children}
            </div>
          )}
          
          <AlertDialogFooter>
            <div className={cn(
              alertDialogActionVariants({ layout: actionLayout }),
              alertDialogClasses.actions
            )}>
              {showCancel && (
                <AlertDialogCancel
                  onClick={onCancel}
                  {...cancelProps}
                >
                  {cancelText}
                </AlertDialogCancel>
              )}
              <AlertDialogAction
                onClick={onAction}
                {...actionProps}
              >
                {actionText}
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialogPrimitive.Root>
  );
});

/**
 * AlertDialogTrigger - Trigger button to open alert dialog
 */
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

/**
 * AlertDialogPortal - Portal container for alert dialog content
 */
const AlertDialogPortal = AlertDialogPrimitive.Portal;

/**
 * AlertDialogOverlay - Alert dialog backdrop overlay
 */
const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  ModalOverlayProps
>(({ className, blur = 'sm', opacity = 'heavy', ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn(
      modalOverlayVariants({ blur, opacity }),
      alertDialogClasses.overlay,
      className
    )}
    {...props}
  />
));

/**
 * AlertDialogContent - Alert dialog content container
 */
const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> &
    VariantProps<typeof modalContentVariants>
>(({ className, size = 'md', position = 'center', ...props }, ref) => (
  <AlertDialogPrimitive.Content
    ref={ref}
    className={cn(
      modalContentVariants({ size, position }),
      alertDialogClasses.content,
      className
    )}
    {...props}
  />
));

/**
 * AlertDialogHeader - Alert dialog header section
 */
const AlertDialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof modalHeaderVariants>
>(({ className, size = 'md', align = 'center', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      modalHeaderVariants({ size, align }),
      alertDialogClasses.header,
      className
    )}
    {...props}
  />
));

/**
 * AlertDialogFooter - Alert dialog footer section
 */
const AlertDialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof modalFooterVariants>
>(({ className, size = 'md', align = 'right', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      modalFooterVariants({ size, align }),
      alertDialogClasses.footer,
      className
    )}
    {...props}
  />
));

/**
 * AlertDialogTitle - Accessible alert dialog title
 */
const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold text-foreground',
      alertDialogClasses.title,
      className
    )}
    {...props}
  />
));

/**
 * AlertDialogDescription - Accessible alert dialog description
 */
const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn(
      'text-sm text-muted-foreground',
      alertDialogClasses.description,
      className
    )}
    {...props}
  />
));

/**
 * AlertDialogAction - Action button (confirm/proceed)
 */
const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> &
    React.ComponentProps<typeof Button>
>(({ className, variant = 'default', ...props }, ref) => (
  <AlertDialogPrimitive.Action asChild>
    <Button
      ref={ref}
      variant={variant}
      className={cn(alertDialogClasses.action, className)}
      {...props}
    />
  </AlertDialogPrimitive.Action>
));

/**
 * AlertDialogCancel - Cancel button
 */
const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> &
    React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', ...props }, ref) => (
  <AlertDialogPrimitive.Cancel asChild>
    <Button
      ref={ref}
      variant={variant}
      className={cn(alertDialogClasses.cancel, className)}
      {...props}
    />
  </AlertDialogPrimitive.Cancel>
));

// Display names
AlertDialog.displayName = 'AlertDialog';
AlertDialogOverlay.displayName = 'AlertDialogOverlay';
AlertDialogContent.displayName = 'AlertDialogContent';
AlertDialogHeader.displayName = 'AlertDialogHeader';
AlertDialogFooter.displayName = 'AlertDialogFooter';
AlertDialogTitle.displayName = 'AlertDialogTitle';
AlertDialogDescription.displayName = 'AlertDialogDescription';
AlertDialogAction.displayName = 'AlertDialogAction';
AlertDialogCancel.displayName = 'AlertDialogCancel';

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  alertDialogVariants,
  alertDialogActionVariants,
};