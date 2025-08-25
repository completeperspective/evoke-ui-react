import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  Dialog,
  AlertDialog,
  Drawer,
  DrawerContent,
  DrawerHeader,
  Sheet,
  SheetContent,
  SheetHeader,
  useModalStack,
  useScrollLock,
  useFocusTrap,
} from './index';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';

// Mock window methods
const mockScrollTo = vi.fn();
const mockGetComputedStyle = vi.fn(() => ({
  paddingRight: '0px',
  overflow: 'auto',
  getPropertyValue: vi.fn(() => ''),
}));

Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
});

Object.defineProperty(window, 'getComputedStyle', {
  value: mockGetComputedStyle,
  writable: true,
});

Object.defineProperty(window, 'scrollX', { value: 0, writable: true });
Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
Object.defineProperty(window, 'pageXOffset', { value: 0, writable: true });
Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true });

// Test wrapper for controlled components
function TestModal({ 
  open = false, 
  children, 
  ...props 
}: { 
  open?: boolean; 
  children: React.ReactNode;
  [key: string]: any;
}) {
  const [isOpen, setIsOpen] = useState(open);
  
  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);
  
  return (
    <Modal open={isOpen} onOpenChange={setIsOpen} {...props}>
      {children}
    </Modal>
  );
}

describe('Modal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up any open modals
    const overlays = document.querySelectorAll('[data-state="open"]');
    overlays.forEach(overlay => overlay.remove());
  });

  describe('Basic Functionality', () => {
    it('renders modal when open', async () => {
      render(
        <TestModal open>
          <ModalContent>
            <ModalHeader title="Test Modal" />
            <div>Modal content</div>
          </ModalContent>
        </TestModal>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Modal')).toBeInTheDocument();
        expect(screen.getByText('Modal content')).toBeInTheDocument();
      });
    });

    it('does not render modal when closed', () => {
      render(
        <TestModal open={false}>
          <ModalContent>
            <ModalHeader title="Test Modal" />
            <div>Modal content</div>
          </ModalContent>
        </TestModal>
      );

      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
      expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
    });

    it('renders with proper accessibility attributes', async () => {
      render(
        <TestModal open>
          <ModalContent>
            <ModalTitle>Test Modal</ModalTitle>
            <ModalDescription>Test description</ModalDescription>
            <div>Modal content</div>
          </ModalContent>
        </TestModal>
      );

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveAttribute('aria-labelledby');
        expect(dialog).toHaveAttribute('aria-describedby');
      });
    });

    it('closes modal when close button is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <TestModal open>
          <ModalContent>
            <ModalHeader title="Test Modal" />
            <div>Modal content</div>
          </ModalContent>
        </TestModal>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Modal')).toBeInTheDocument();
      });

      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
      });
    });

    it('closes modal when escape key is pressed', async () => {
      const user = userEvent.setup();
      
      render(
        <TestModal open>
          <ModalContent>
            <ModalHeader title="Test Modal" />
            <div>Modal content</div>
          </ModalContent>
        </TestModal>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Modal')).toBeInTheDocument();
      });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
      });
    });

    it('applies custom className', async () => {
      render(
        <TestModal open>
          <ModalContent className="custom-modal">
            <ModalHeader title="Test Modal" />
          </ModalContent>
        </TestModal>
      );

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveClass('custom-modal');
      });
    });

    it('hides close button when showCloseButton is false', async () => {
      render(
        <TestModal open>
          <ModalContent showCloseButton={false}>
            <ModalHeader title="Test Modal" />
          </ModalContent>
        </TestModal>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Modal')).toBeInTheDocument();
      });

      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });
  });

  describe('Modal Variants', () => {
    it('applies size variants correctly', async () => {
      const sizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 'fullscreen'] as const;
      
      for (const size of sizes) {
        render(
          <TestModal open>
            <ModalContent size={size} data-testid={`modal-${size}`}>
              <ModalHeader title={`${size} Modal`} />
            </ModalContent>
          </TestModal>
        );

        await waitFor(() => {
          const modal = screen.getByTestId(`modal-${size}`);
          expect(modal).toBeInTheDocument();
          // Size classes are applied by CVA
          if (size === 'sm') expect(modal).toHaveClass('max-w-sm');
          if (size === 'fullscreen') expect(modal).toHaveClass('w-[100vw]');
        });

        // Clean up for next iteration
        const overlays = document.querySelectorAll('[data-state="open"]');
        overlays.forEach(overlay => overlay.remove());
      }
    });

    it('applies position variants correctly', async () => {
      const positions = ['center', 'top', 'bottom'] as const;
      
      for (const position of positions) {
        render(
          <TestModal open>
            <ModalContent position={position} data-testid={`modal-${position}`}>
              <ModalHeader title={`${position} Modal`} />
            </ModalContent>
          </TestModal>
        );

        await waitFor(() => {
          const modal = screen.getByTestId(`modal-${position}`);
          expect(modal).toBeInTheDocument();
        });

        // Clean up for next iteration
        const overlays = document.querySelectorAll('[data-state="open"]');
        overlays.forEach(overlay => overlay.remove());
      }
    });

    it('applies scrollable variant correctly', async () => {
      render(
        <TestModal open>
          <ModalContent scrollable data-testid="scrollable-modal">
            <ModalHeader title="Scrollable Modal" />
            <div>Long content...</div>
          </ModalContent>
        </TestModal>
      );

      await waitFor(() => {
        const modal = screen.getByTestId('scrollable-modal');
        expect(modal).toHaveClass('overflow-y-auto');
      });
    });
  });

  describe('Modal Header', () => {
    it('renders title and description', async () => {
      render(
        <TestModal open>
          <ModalContent>
            <ModalHeader 
              title="Test Title" 
              description="Test description"
            />
          </ModalContent>
        </TestModal>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test description')).toBeInTheDocument();
      });
    });

    it('applies border variant', async () => {
      render(
        <TestModal open>
          <ModalContent>
            <ModalHeader 
              title="Test Title"
              border
              data-testid="modal-header"
            />
          </ModalContent>
        </TestModal>
      );

      await waitFor(() => {
        const header = screen.getByTestId('modal-header');
        expect(header).toHaveClass('border-b');
      });
    });

    it('applies alignment variants', async () => {
      const alignments = ['left', 'center', 'right'] as const;
      
      for (const align of alignments) {
        render(
          <TestModal open>
            <ModalContent>
              <ModalHeader 
                title="Test Title"
                align={align}
                data-testid={`header-${align}`}
              />
            </ModalContent>
          </TestModal>
        );

        await waitFor(() => {
          const header = screen.getByTestId(`header-${align}`);
          expect(header).toHaveClass(`text-${align}`);
        });

        // Clean up for next iteration
        const overlays = document.querySelectorAll('[data-state="open"]');
        overlays.forEach(overlay => overlay.remove());
      }
    });
  });

  describe('Modal Footer', () => {
    it('renders footer content', async () => {
      render(
        <TestModal open>
          <ModalContent>
            <ModalHeader title="Test Modal" />
            <ModalFooter>
              <Button>Cancel</Button>
              <Button>Confirm</Button>
            </ModalFooter>
          </ModalContent>
        </TestModal>
      );

      await waitFor(() => {
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Confirm')).toBeInTheDocument();
      });
    });

    it('applies alignment variants', async () => {
      const alignments = ['left', 'center', 'right', 'between'] as const;
      
      for (const align of alignments) {
        render(
          <TestModal open>
            <ModalContent>
              <ModalHeader title="Test Modal" />
              <ModalFooter align={align} data-testid={`footer-${align}`}>
                <Button>Action</Button>
              </ModalFooter>
            </ModalContent>
          </TestModal>
        );

        await waitFor(() => {
          const footer = screen.getByTestId(`footer-${align}`);
          expect(footer).toBeInTheDocument();
          if (align === 'left') expect(footer).toHaveClass('sm:justify-start');
          if (align === 'center') expect(footer).toHaveClass('sm:justify-center');
          if (align === 'right') expect(footer).toHaveClass('sm:justify-end');
          if (align === 'between') expect(footer).toHaveClass('sm:justify-between');
        });

        // Clean up for next iteration
        const overlays = document.querySelectorAll('[data-state="open"]');
        overlays.forEach(overlay => overlay.remove());
      }
    });
  });
});

describe('Dialog', () => {
  it('renders dialog with all props', async () => {
    const [open, setOpen] = [true, vi.fn()];
    
    render(
      <Dialog
        open={open}
        onOpenChange={setOpen}
        type="confirmation"
        title="Test Dialog"
        description="Test description"
        primaryAction={<Button>Confirm</Button>}
        secondaryAction={<Button variant="ghost">Cancel</Button>}
      >
        <p>Dialog content</p>
      </Dialog>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
      expect(screen.getByText('Dialog content')).toBeInTheDocument();
      expect(screen.getByText('Confirm')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
  });

  it('hides header when showHeader is false', async () => {
    const [open, setOpen] = [true, vi.fn()];
    
    render(
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Hidden Title"
        showHeader={false}
      >
        <p>Content only</p>
      </Dialog>
    );

    await waitFor(() => {
      expect(screen.queryByText('Hidden Title')).not.toBeInTheDocument();
      expect(screen.getByText('Content only')).toBeInTheDocument();
    });
  });

  it('hides footer when showFooter is false', async () => {
    const [open, setOpen] = [true, vi.fn()];
    
    render(
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Test Dialog"
        primaryAction={<Button>Action</Button>}
        showFooter={false}
      >
        <p>Content</p>
      </Dialog>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
      expect(screen.queryByText('Action')).not.toBeInTheDocument();
    });
  });
});

describe('AlertDialog', () => {
  it('renders alert dialog with trigger', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    
    render(
      <AlertDialog
        title="Delete Item"
        description="Are you sure?"
        actionText="Delete"
        trigger={<Button>Delete Item</Button>}
        onAction={onAction}
      />
    );

    const trigger = screen.getByText('Delete Item');
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Are you sure?')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    const actionButton = screen.getByText('Delete');
    await user.click(actionButton);

    expect(onAction).toHaveBeenCalled();
  });

  it('applies intent variants', async () => {
    const intents = ['default', 'info', 'warning', 'danger', 'success'] as const;
    
    for (const intent of intents) {
      const [open, setOpen] = [true, vi.fn()];
      
      render(
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          intent={intent}
          title={`${intent} Alert`}
          actionText="OK"
        />
      );

      await waitFor(() => {
        expect(screen.getByText(`${intent} Alert`)).toBeInTheDocument();
      });

      // Clean up for next iteration
      const overlays = document.querySelectorAll('[data-state="open"]');
      overlays.forEach(overlay => overlay.remove());
    }
  });

  it('hides cancel button when showCancel is false', async () => {
    const [open, setOpen] = [true, vi.fn()];
    
    render(
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Info Alert"
        actionText="OK"
        showCancel={false}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Info Alert')).toBeInTheDocument();
      expect(screen.getByText('OK')).toBeInTheDocument();
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    });
  });
});

describe('Drawer', () => {
  it('renders drawer with different sides', async () => {
    const sides = ['left', 'right', 'top', 'bottom'] as const;
    
    for (const side of sides) {
      const [open, setOpen] = [true, vi.fn()];
      
      render(
        <Drawer side={side} open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader title={`${side} Drawer`} />
            <div>Drawer content</div>
          </DrawerContent>
        </Drawer>
      );

      await waitFor(() => {
        expect(screen.getByText(`${side} Drawer`)).toBeInTheDocument();
        expect(screen.getByText('Drawer content')).toBeInTheDocument();
      });

      // Clean up for next iteration
      const overlays = document.querySelectorAll('[data-state="open"]');
      overlays.forEach(overlay => overlay.remove());
    }
  });

  it('applies size variants', async () => {
    const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;
    
    for (const size of sizes) {
      const [open, setOpen] = [true, vi.fn()];
      
      render(
        <Drawer side="right" size={size} open={open} onOpenChange={setOpen}>
          <DrawerContent data-testid={`drawer-${size}`}>
            <DrawerHeader title={`${size} Drawer`} />
          </DrawerContent>
        </Drawer>
      );

      await waitFor(() => {
        const drawer = screen.getByTestId(`drawer-${size}`);
        expect(drawer).toBeInTheDocument();
      });

      // Clean up for next iteration
      const overlays = document.querySelectorAll('[data-state="open"]');
      overlays.forEach(overlay => overlay.remove());
    }
  });
});

describe('Sheet', () => {
  it('renders sheet with variants', async () => {
    const variants = ['default', 'ghost', 'outline', 'secondary'] as const;
    
    for (const variant of variants) {
      const [open, setOpen] = [true, vi.fn()];
      
      render(
        <Sheet variant={variant} open={open} onOpenChange={setOpen}>
          <SheetContent data-testid={`sheet-${variant}`}>
            <SheetHeader title={`${variant} Sheet`} />
          </SheetContent>
        </Sheet>
      );

      await waitFor(() => {
        const sheet = screen.getByTestId(`sheet-${variant}`);
        expect(sheet).toBeInTheDocument();
        expect(screen.getByText(`${variant} Sheet`)).toBeInTheDocument();
      });

      // Clean up for next iteration
      const overlays = document.querySelectorAll('[data-state="open"]');
      overlays.forEach(overlay => overlay.remove());
    }
  });

  it('renders with dividers and sticky footer', async () => {
    const [open, setOpen] = [true, vi.fn()];
    
    render(
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader title="Sheet" divider data-testid="sheet-header" />
          <div>Content</div>
          <SheetFooter divider sticky data-testid="sheet-footer">
            <Button>Action</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    await waitFor(() => {
      const header = screen.getByTestId('sheet-header');
      const footer = screen.getByTestId('sheet-footer');
      
      expect(header).toHaveClass('border-b');
      expect(footer).toHaveClass('border-t', 'sticky');
    });
  });
});

describe('useModalStack', () => {
  it('manages modal stack correctly', () => {
    let stackHook: any;
    
    function TestComponent() {
      stackHook = useModalStack();
      return null;
    }
    
    render(<TestComponent />);
    
    // Register modals
    const zIndex1 = stackHook.registerModal('modal1', { title: 'Modal 1' });
    const zIndex2 = stackHook.registerModal('modal2', { title: 'Modal 2' });
    
    expect(stackHook.stack).toHaveLength(2);
    expect(zIndex2).toBeGreaterThan(zIndex1);
    expect(stackHook.isTopModal('modal2')).toBe(true);
    expect(stackHook.isTopModal('modal1')).toBe(false);
    
    // Unregister modal
    stackHook.unregisterModal('modal2');
    expect(stackHook.stack).toHaveLength(1);
    expect(stackHook.isTopModal('modal1')).toBe(true);
    
    // Close all
    stackHook.closeAll();
    expect(stackHook.stack).toHaveLength(0);
  });

  it('respects stack limits', () => {
    let stackHook: any;
    
    function TestComponent() {
      stackHook = useModalStack({ maxStack: 2 });
      return null;
    }
    
    render(<TestComponent />);
    
    stackHook.registerModal('modal1');
    stackHook.registerModal('modal2');
    stackHook.registerModal('modal3'); // Should remove modal1
    
    expect(stackHook.stack).toHaveLength(2);
    expect(stackHook.getZIndex('modal1')).toBe(50); // Default base z-index
    expect(stackHook.stack.find((m: any) => m.id === 'modal1')).toBeUndefined();
  });

  it('disables stacking when allowStacking is false', () => {
    let stackHook: any;
    
    function TestComponent() {
      stackHook = useModalStack({ allowStacking: false });
      return null;
    }
    
    render(<TestComponent />);
    
    const onClose = vi.fn();
    stackHook.registerModal('modal1', { onClose });
    stackHook.registerModal('modal2'); // Should close modal1
    
    expect(stackHook.stack).toHaveLength(1);
    expect(onClose).toHaveBeenCalled();
  });
});

describe('useScrollLock', () => {
  it('locks and unlocks scroll', () => {
    let scrollLockHook: any;
    
    function TestComponent({ enabled }: { enabled: boolean }) {
      scrollLockHook = useScrollLock({ enabled });
      return null;
    }
    
    const { rerender } = render(<TestComponent enabled={false} />);
    
    expect(document.body.style.overflow).toBe('');
    
    rerender(<TestComponent enabled={true} />);
    expect(document.body.style.overflow).toBe('hidden');
    
    rerender(<TestComponent enabled={false} />);
    expect(document.body.style.overflow).toBe('');
  });

  it('manages lock count correctly', () => {
    let scrollLock1: any;
    let scrollLock2: any;
    
    function TestComponent() {
      scrollLock1 = useScrollLock({ enabled: true });
      scrollLock2 = useScrollLock({ enabled: true });
      return null;
    }
    
    const { unmount } = render(<TestComponent />);
    
    expect(scrollLock1.lockCount).toBe(2);
    expect(document.body.style.overflow).toBe('hidden');
    
    // Unlock one
    act(() => {
      scrollLock1.unlock();
    });
    
    expect(document.body.style.overflow).toBe('hidden'); // Still locked
    
    // Unlock second
    act(() => {
      scrollLock2.unlock();
    });
    
    expect(document.body.style.overflow).toBe(''); // Now unlocked
    
    unmount();
  });
});

describe('useFocusTrap', () => {
  it('traps focus within container', async () => {
    const user = userEvent.setup();
    
    function TestComponent() {
      const containerRef = React.useRef<HTMLDivElement>(null);
      useFocusTrap(containerRef, { enabled: true });
      
      return (
        <div>
          <button>Outside</button>
          <div ref={containerRef}>
            <input data-testid="first-input" />
            <input data-testid="second-input" />
            <button data-testid="focus-button">Focus me</button>
          </div>
        </div>
      );
    }
    
    render(<TestComponent />);
    
    const firstInput = screen.getByTestId('first-input');
    const secondInput = screen.getByTestId('second-input');
    const focusButton = screen.getByTestId('focus-button');
    
    // Focus should start on first element
    await waitFor(() => {
      expect(firstInput).toHaveFocus();
    });
    
    // Tab should move to second input
    await user.tab();
    expect(secondInput).toHaveFocus();
    
    // Tab should move to button
    await user.tab();
    expect(focusButton).toHaveFocus();
    
    // Tab should wrap to first input
    await user.tab();
    expect(firstInput).toHaveFocus();
    
    // Shift+Tab should wrap to last element
    await user.tab({ shift: true });
    expect(focusButton).toHaveFocus();
  });

  it('restores focus when deactivated', async () => {
    function TestComponent({ enabled }: { enabled: boolean }) {
      const containerRef = React.useRef<HTMLDivElement>(null);
      useFocusTrap(containerRef, { enabled });
      
      return (
        <div>
          <button data-testid="outside-button">Outside</button>
          <div ref={containerRef}>
            <input data-testid="inside-input" />
          </div>
        </div>
      );
    }
    
    const { rerender } = render(<TestComponent enabled={false} />);
    
    const outsideButton = screen.getByTestId('outside-button');
    const insideInput = screen.getByTestId('inside-input');
    
    // Focus outside element
    outsideButton.focus();
    expect(outsideButton).toHaveFocus();
    
    // Enable focus trap
    rerender(<TestComponent enabled={true} />);
    
    await waitFor(() => {
      expect(insideInput).toHaveFocus();
    });
    
    // Disable focus trap
    rerender(<TestComponent enabled={false} />);
    
    await waitFor(() => {
      expect(outsideButton).toHaveFocus();
    });
  });
});