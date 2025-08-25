/**
 * Modal/Dialog System Exports
 * Organism-level components built on Radix UI Dialog primitives
 * with CVA-first architecture and comprehensive variants
 */

// Base Modal components
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
  type ModalProps,
  type ModalOverlayProps,
  type ModalContentProps,
  type ModalHeaderProps,
  type ModalFooterProps,
  type ModalTitleProps,
  type ModalDescriptionProps,
  type ModalCloseProps,
} from './Modal';

// Dialog components
export {
  Dialog,
  dialogVariants,
  dialogActionVariants,
  type DialogProps,
} from './Dialog';

// AlertDialog components
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
  type AlertDialogProps,
} from './AlertDialog';

// Drawer components
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
  type DrawerProps,
  type DrawerContentProps,
  type DrawerHeaderProps,
  type DrawerFooterProps,
  type DrawerTitleProps,
  type DrawerDescriptionProps,
} from './Drawer';

// Sheet components
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
  type SheetProps,
  type SheetContentProps,
  type SheetHeaderProps,
  type SheetFooterProps,
} from './Sheet';

// Hooks (to be implemented)
export {
  useModalStack,
  useScrollLock,
  useFocusTrap,
  type UseModalStackOptions,
  type UseModalStackReturn,
  type UseScrollLockOptions,
  type UseFocusTrapOptions,
} from './hooks';