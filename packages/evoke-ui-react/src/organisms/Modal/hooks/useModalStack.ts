import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * Modal instance interface for stack management
 */
export interface ModalInstance {
  /** Unique identifier for the modal */
  id: string;
  /** Z-index for the modal */
  zIndex: number;
  /** Whether the modal is open */
  isOpen: boolean;
  /** Optional modal title for debugging */
  title?: string;
  /** Callback when modal is closed */
  onClose?: () => void;
}

export interface UseModalStackOptions {
  /** Base z-index for modal stack (default: 50) */
  baseZIndex?: number;
  /** Maximum number of modals in stack (default: 10) */
  maxStack?: number;
  /** Whether to allow modal stacking (default: true) */
  allowStacking?: boolean;
  /** Debug mode for logging stack operations */
  debug?: boolean;
}

export interface UseModalStackReturn {
  /** Current modal stack */
  stack: ModalInstance[];
  /** Register a new modal */
  registerModal: (id: string, options?: Partial<ModalInstance>) => number;
  /** Unregister a modal */
  unregisterModal: (id: string) => void;
  /** Update modal state */
  updateModal: (id: string, updates: Partial<ModalInstance>) => void;
  /** Get z-index for a modal */
  getZIndex: (id: string) => number;
  /** Get the top-most modal */
  getTopModal: () => ModalInstance | null;
  /** Check if modal is on top */
  isTopModal: (id: string) => boolean;
  /** Close all modals in stack */
  closeAll: () => void;
  /** Close top modal */
  closeTop: () => void;
}

/**
 * Global modal stack state
 */
const modalStackState = {
  stack: [] as ModalInstance[],
  listeners: new Set<() => void>(),
};

/**
 * Subscribe to modal stack changes
 */
function subscribeToStack(callback: () => void): () => void {
  modalStackState.listeners.add(callback);
  return () => {
    modalStackState.listeners.delete(callback);
  };
}

/**
 * Notify all listeners of stack changes
 */
function notifyStackChange() {
  modalStackState.listeners.forEach(callback => callback());
}

/**
 * useModalStack - Hook for managing modal stacking with z-index
 * Provides centralized modal stack management for overlapping modals
 * 
 * @example
 * ```tsx
 * function MyModal({ id, title }: { id: string; title: string }) {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const { registerModal, unregisterModal, getZIndex, isTopModal } = useModalStack();
 *   
 *   useEffect(() => {
 *     if (isOpen) {
 *       const zIndex = registerModal(id, { title, onClose: () => setIsOpen(false) });
 *       return () => unregisterModal(id);
 *     }
 *   }, [isOpen, id, title]);
 *   
 *   const zIndex = getZIndex(id);
 *   const isTop = isTopModal(id);
 *   
 *   return (
 *     <Modal open={isOpen} onOpenChange={setIsOpen}>
 *       <ModalContent style={{ zIndex }}>
 *         <ModalHeader>{title} {isTop && '(Top)'}</ModalHeader>
 *         <p>Modal content</p>
 *       </ModalContent>
 *     </Modal>
 *   );
 * }
 * ```
 */
export function useModalStack(options: UseModalStackOptions = {}): UseModalStackReturn {
  const {
    baseZIndex = 50,
    maxStack = 10,
    allowStacking = true,
    debug = false,
  } = options;

  const [, forceUpdate] = useState({});
  const optionsRef = useRef(options);
  optionsRef.current = options;

  // Subscribe to stack changes
  useEffect(() => {
    const unsubscribe = subscribeToStack(() => forceUpdate({}));
    return unsubscribe;
  }, []);

  const logDebug = useCallback((message: string, data?: any) => {
    if (debug) {
      console.log(`[useModalStack] ${message}`, data);
    }
  }, [debug]);

  const registerModal = useCallback((id: string, modalOptions: Partial<ModalInstance> = {}) => {
    const existingIndex = modalStackState.stack.findIndex(modal => modal.id === id);
    
    if (existingIndex !== -1) {
      // Modal already exists, update it
      const existing = modalStackState.stack[existingIndex];
      modalStackState.stack[existingIndex] = {
        ...existing,
        ...modalOptions,
        id,
        isOpen: true,
      };
      logDebug(`Updated existing modal`, { id, zIndex: existing.zIndex });
      notifyStackChange();
      return existing.zIndex;
    }

    // Check stack limit
    if (!allowStacking && modalStackState.stack.length > 0) {
      logDebug(`Stacking disabled, closing existing modals`);
      modalStackState.stack.forEach(modal => modal.onClose?.());
      modalStackState.stack = [];
    }

    if (modalStackState.stack.length >= maxStack) {
      logDebug(`Stack limit reached (${maxStack}), removing oldest modal`);
      const oldest = modalStackState.stack.shift();
      oldest?.onClose?.();
    }

    const zIndex = baseZIndex + modalStackState.stack.length;
    const newModal: ModalInstance = {
      id,
      zIndex,
      isOpen: true,
      ...modalOptions,
    };

    modalStackState.stack.push(newModal);
    logDebug(`Registered modal`, newModal);
    notifyStackChange();
    return zIndex;
  }, [baseZIndex, maxStack, allowStacking, logDebug]);

  const unregisterModal = useCallback((id: string) => {
    const initialLength = modalStackState.stack.length;
    modalStackState.stack = modalStackState.stack.filter(modal => modal.id !== id);
    
    if (modalStackState.stack.length !== initialLength) {
      logDebug(`Unregistered modal`, { id });
      notifyStackChange();
    }
  }, [logDebug]);

  const updateModal = useCallback((id: string, updates: Partial<ModalInstance>) => {
    const index = modalStackState.stack.findIndex(modal => modal.id === id);
    if (index !== -1) {
      modalStackState.stack[index] = {
        ...modalStackState.stack[index],
        ...updates,
      };
      logDebug(`Updated modal`, { id, updates });
      notifyStackChange();
    }
  }, [logDebug]);

  const getZIndex = useCallback((id: string) => {
    const modal = modalStackState.stack.find(modal => modal.id === id);
    return modal?.zIndex ?? baseZIndex;
  }, [baseZIndex]);

  const getTopModal = useCallback(() => {
    return modalStackState.stack[modalStackState.stack.length - 1] || null;
  }, []);

  const isTopModal = useCallback((id: string) => {
    const topModal = getTopModal();
    return topModal?.id === id;
  }, [getTopModal]);

  const closeAll = useCallback(() => {
    logDebug(`Closing all modals`, { count: modalStackState.stack.length });
    modalStackState.stack.forEach(modal => modal.onClose?.());
    modalStackState.stack = [];
    notifyStackChange();
  }, [logDebug]);

  const closeTop = useCallback(() => {
    const topModal = getTopModal();
    if (topModal) {
      logDebug(`Closing top modal`, { id: topModal.id });
      topModal.onClose?.();
      unregisterModal(topModal.id);
    }
  }, [getTopModal, unregisterModal, logDebug]);

  return {
    stack: modalStackState.stack,
    registerModal,
    unregisterModal,
    updateModal,
    getZIndex,
    getTopModal,
    isTopModal,
    closeAll,
    closeTop,
  };
}