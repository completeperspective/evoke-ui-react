import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
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
  DrawerFooter,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  useModalStack,
  useScrollLock,
} from './index';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { Label } from '../../atoms/Label';
import { FormField } from '../../molecules/FormField';

const meta = {
  title: 'Organisms/Modal System',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Modal/Dialog System

A comprehensive modal system built on Radix UI Dialog primitives with CVA-first architecture. 
Includes Modal, Dialog, AlertDialog, Drawer, and Sheet components with advanced features:

- **Modal stacking** with z-index management
- **Focus trapping** for accessibility
- **Scroll locking** to prevent body scroll
- **Responsive breakpoints** for mobile/desktop behavior
- **Animation system** with reduced motion support
- **CVA variants** for comprehensive styling control

## Components

- **Modal**: Base modal container with overlay and content
- **Dialog**: Standard dialog with header, body, footer
- **AlertDialog**: Confirmation and alert dialogs
- **Drawer**: Mobile-responsive slide-out drawer
- **Sheet**: Side panel variant with enhanced styling

## Advanced Features

All components include:
- Full keyboard navigation support
- Screen reader compatibility
- Customizable animations
- Mobile-responsive behavior
- Theme-aware styling
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper for stories
function ModalDemo({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="space-y-4">
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onOpenChange={setOpen} {...props}>
        {children}
      </Modal>
    </div>
  );
}

/**
 * Basic Modal
 * Simple modal with header, content, and footer
 */
export const BasicModal: Story = {
  render: () => (
    <ModalDemo>
      <ModalContent>
        <ModalHeader title="Basic Modal" description="This is a simple modal example." />
        <div className="py-4">
          <p>Modal content goes here. You can put any content inside this modal.</p>
        </div>
        <ModalFooter>
          <Button variant="ghost">Cancel</Button>
          <Button>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </ModalDemo>
  ),
};

/**
 * Modal Sizes
 * Different modal sizes from small to fullscreen
 */
export const ModalSizes: Story = {
  render: () => {
    const sizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 'fullscreen'] as const;
    
    return (
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
        {sizes.map(size => (
          <ModalDemo key={size}>
            <ModalContent size={size}>
              <ModalHeader title={`${size.toUpperCase()} Modal`} />
              <div className="py-4">
                <p>This is a {size} sized modal. The content adapts to the modal size.</p>
                {size === 'fullscreen' && (
                  <div className="mt-4">
                    <p>Fullscreen modals take up the entire viewport.</p>
                    <p>Perfect for complex forms or detailed content.</p>
                  </div>
                )}
              </div>
              <ModalFooter>
                <Button variant="ghost">Close</Button>
              </ModalFooter>
            </ModalContent>
          </ModalDemo>
        ))}
      </div>
    );
  },
};

/**
 * Modal Positions
 * Different modal positions: center, top, bottom
 */
export const ModalPositions: Story = {
  render: () => {
    const positions = ['center', 'top', 'bottom'] as const;
    
    return (
      <div className="flex gap-4">
        {positions.map(position => (
          <ModalDemo key={position}>
            <ModalContent position={position}>
              <ModalHeader title={`${position} Position`} />
              <div className="py-4">
                <p>This modal is positioned at the {position} of the screen.</p>
              </div>
              <ModalFooter>
                <Button variant="ghost">Close</Button>
              </ModalFooter>
            </ModalContent>
          </ModalDemo>
        ))}
      </div>
    );
  },
};

/**
 * Scrollable Modal
 * Modal with scrollable content for long content
 */
export const ScrollableModal: Story = {
  render: () => (
    <ModalDemo>
      <ModalContent scrollable maxHeight="md">
        <ModalHeader title="Scrollable Content" description="This modal has scrollable content." />
        <div className="space-y-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="p-4 border rounded">
              <h3 className="font-semibold">Section {i + 1}</h3>
              <p>This is some content that makes the modal scrollable. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </div>
        <ModalFooter>
          <Button variant="ghost">Cancel</Button>
          <Button>Save</Button>
        </ModalFooter>
      </ModalContent>
    </ModalDemo>
  ),
};

/**
 * Dialog Component
 * High-level dialog with predefined layouts
 */
export const DialogComponent: Story = {
  render: () => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button onClick={() => setConfirmOpen(true)}>Confirmation Dialog</Button>
          <Button onClick={() => setFormOpen(true)}>Form Dialog</Button>
          <Button onClick={() => setInfoOpen(true)}>Info Dialog</Button>
        </div>
        
        <Dialog
          type="confirmation"
          title="Delete Item"
          description="Are you sure you want to delete this item? This action cannot be undone."
          primaryAction={<Button variant="destructive">Delete</Button>}
          secondaryAction={<Button variant="ghost">Cancel</Button>}
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
        />
        
        <Dialog
          type="form"
          title="Create User"
          primaryAction={<Button>Create</Button>}
          secondaryAction={<Button variant="ghost">Cancel</Button>}
          open={formOpen}
          onOpenChange={setFormOpen}
        >
          <div className="space-y-4">
            <FormField label="Name">
              <Input placeholder="Enter name" />
            </FormField>
            <FormField label="Email">
              <Input type="email" placeholder="Enter email" />
            </FormField>
          </div>
        </Dialog>
        
        <Dialog
          type="informational"
          intent="success"
          title="Success"
          description="Your changes have been saved successfully."
          primaryAction={<Button>Continue</Button>}
          open={infoOpen}
          onOpenChange={setInfoOpen}
        />
      </div>
    );
  },
};

/**
 * Alert Dialog
 * Specialized confirmation dialogs
 */
export const AlertDialogComponent: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <AlertDialog
          intent="danger"
          title="Delete Account"
          description="This will permanently delete your account and all associated data. This action cannot be undone."
          actionText="Delete Account"
          actionProps={{ variant: 'destructive' }}
          cancelText="Cancel"
          trigger={<Button variant="destructive">Delete Account</Button>}
          onAction={() => console.log('Account deleted')}
        />
        
        <AlertDialog
          intent="warning"
          title="Unsaved Changes"
          description="You have unsaved changes. Are you sure you want to leave without saving?"
          actionText="Leave Without Saving"
          actionProps={{ variant: 'destructive' }}
          cancelText="Stay"
          trigger={<Button variant="ghost">Leave Page</Button>}
          onAction={() => console.log('Left without saving')}
        />
        
        <AlertDialog
          intent="info"
          title="Update Available"
          description="A new version of the application is available. Would you like to update now?"
          actionText="Update Now"
          cancelText="Later"
          trigger={<Button>Check for Updates</Button>}
          onAction={() => console.log('Updating...')}
        />
      </div>
    </div>
  ),
};

/**
 * Drawer Component
 * Mobile-responsive slide-out drawers
 */
export const DrawerComponent: Story = {
  render: () => {
    const [rightOpen, setRightOpen] = useState(false);
    const [leftOpen, setLeftOpen] = useState(false);
    const [bottomOpen, setBottomOpen] = useState(false);
    
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button onClick={() => setRightOpen(true)}>Right Drawer</Button>
          <Button onClick={() => setLeftOpen(true)}>Left Drawer</Button>
          <Button onClick={() => setBottomOpen(true)}>Bottom Drawer</Button>
        </div>
        
        <Drawer side="right" open={rightOpen} onOpenChange={setRightOpen}>
          <DrawerContent>
            <DrawerHeader title="Settings" />
            <div className="flex-1 py-4">
              <p>Settings content goes here.</p>
            </div>
            <DrawerFooter>
              <Button variant="ghost">Cancel</Button>
              <Button>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        
        <Drawer side="left" size="sm" open={leftOpen} onOpenChange={setLeftOpen}>
          <DrawerContent showCloseButton={false}>
            <DrawerHeader title="Navigation" border={false} />
            <nav className="flex-1">
              <ul className="space-y-2">
                <li><a href="#" className="block p-2 hover:bg-accent rounded">Home</a></li>
                <li><a href="#" className="block p-2 hover:bg-accent rounded">About</a></li>
                <li><a href="#" className="block p-2 hover:bg-accent rounded">Contact</a></li>
              </ul>
            </nav>
          </DrawerContent>
        </Drawer>
        
        <Drawer side="bottom" size="lg" open={bottomOpen} onOpenChange={setBottomOpen}>
          <DrawerContent>
            <DrawerHeader title="Filters" />
            <div className="py-4">
              <p>Filter options go here.</p>
            </div>
            <DrawerFooter>
              <Button variant="ghost">Clear</Button>
              <Button>Apply</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    );
  },
};

/**
 * Sheet Component
 * Enhanced side panels with styling variants
 */
export const SheetComponent: Story = {
  render: () => {
    const [defaultOpen, setDefaultOpen] = useState(false);
    const [ghostOpen, setGhostOpen] = useState(false);
    const [outlineOpen, setOutlineOpen] = useState(false);
    
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button onClick={() => setDefaultOpen(true)}>Default Sheet</Button>
          <Button onClick={() => setGhostOpen(true)}>Ghost Sheet</Button>
          <Button onClick={() => setOutlineOpen(true)}>Outline Sheet</Button>
        </div>
        
        <Sheet open={defaultOpen} onOpenChange={setDefaultOpen}>
          <SheetContent>
            <SheetHeader title="User Profile" divider />
            <div className="space-y-4">
              <FormField label="Name">
                <Input defaultValue="John Doe" />
              </FormField>
              <FormField label="Email">
                <Input type="email" defaultValue="john@example.com" />
              </FormField>
            </div>
            <SheetFooter divider sticky>
              <Button variant="ghost">Cancel</Button>
              <Button>Save</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        
        <Sheet variant="ghost" side="left" sheetSize="sm" open={ghostOpen} onOpenChange={setGhostOpen}>
          <SheetContent padding="none">
            <SheetHeader title="Navigation" />
            <nav className="flex-1 px-4">
              <ul className="space-y-2">
                <li><a href="#" className="block p-2 hover:bg-accent rounded">Dashboard</a></li>
                <li><a href="#" className="block p-2 hover:bg-accent rounded">Analytics</a></li>
                <li><a href="#" className="block p-2 hover:bg-accent rounded">Settings</a></li>
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
        
        <Sheet variant="outline" side="right" sheetSize="lg" open={outlineOpen} onOpenChange={setOutlineOpen}>
          <SheetContent spacing="relaxed">
            <SheetHeader 
              title="Advanced Settings" 
              description="Configure advanced application preferences"
              divider 
            />
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Appearance</h3>
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Light</Button>
                    <Button size="sm" variant="outline">Dark</Button>
                    <Button size="sm" variant="outline">Auto</Button>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Notifications</h3>
                <div className="space-y-2">
                  <Label>
                    <input type="checkbox" className="mr-2" />
                    Email notifications
                  </Label>
                  <Label>
                    <input type="checkbox" className="mr-2" />
                    Push notifications
                  </Label>
                </div>
              </div>
            </div>
            <SheetFooter align="between" sticky>
              <Button variant="ghost">Reset to Defaults</Button>
              <div className="space-x-2">
                <Button variant="ghost">Cancel</Button>
                <Button>Apply</Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    );
  },
};

/**
 * Modal Stacking
 * Demonstration of modal stacking with z-index management
 */
export const ModalStacking: Story = {
  render: () => {
    function StackingDemo() {
      const [modals, setModals] = useState<{ [key: string]: boolean }>({});
      const { registerModal, unregisterModal, getZIndex, stack } = useModalStack({
        debug: true,
      });
      
      const openModal = (id: string) => {
        setModals(prev => ({ ...prev, [id]: true }));
      };
      
      const closeModal = (id: string) => {
        setModals(prev => ({ ...prev, [id]: false }));
        unregisterModal(id);
      };
      
      React.useEffect(() => {
        Object.entries(modals).forEach(([id, isOpen]) => {
          if (isOpen) {
            registerModal(id, {
              title: `Modal ${id}`,
              onClose: () => closeModal(id),
            });
          }
        });
      }, [modals]);
      
      return (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={() => openModal('1')}>Open Modal 1</Button>
            <Button onClick={() => openModal('2')}>Open Modal 2</Button>
            <Button onClick={() => openModal('3')}>Open Modal 3</Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Stack count: {stack.length}
          </div>
          
          {['1', '2', '3'].map(id => (
            <Modal key={id} open={modals[id]} onOpenChange={(open) => !open && closeModal(id)}>
              <ModalContent 
                size="sm"
                style={{ zIndex: getZIndex(id) }}
              >
                <ModalHeader title={`Modal ${id}`} />
                <div className="py-4">
                  <p>This is modal {id}. Z-index: {getZIndex(id)}</p>
                  <p>You can open multiple modals and they will stack properly.</p>
                  <div className="mt-4">
                    <Button 
                      size="sm" 
                      onClick={() => openModal(String(parseInt(id) + 1))}
                    >
                      Open Modal {parseInt(id) + 1}
                    </Button>
                  </div>
                </div>
                <ModalFooter>
                  <Button variant="ghost" onClick={() => closeModal(id)}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          ))}
        </div>
      );
    }
    
    return <StackingDemo />;
  },
};

/**
 * Accessibility Features
 * Demonstration of accessibility features
 */
export const AccessibilityFeatures: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    useScrollLock({ enabled: open });
    
    return (
      <div className="space-y-4">
        <div>
          <Button onClick={() => setOpen(true)}>Open Accessible Modal</Button>
          <p className="text-sm text-muted-foreground mt-2">
            This modal demonstrates accessibility features:
          </p>
          <ul className="text-sm text-muted-foreground list-disc list-inside mt-1">
            <li>Focus trapping with Tab/Shift+Tab</li>
            <li>Escape key to close</li>
            <li>Click outside to close</li>
            <li>Screen reader support</li>
            <li>Scroll locking</li>
          </ul>
        </div>
        
        <Modal open={open} onOpenChange={setOpen}>
          <ModalContent>
            <ModalHeader 
              title="Accessibility Demo" 
              description="Try using Tab, Shift+Tab, and Escape keys"
            />
            <div className="space-y-4">
              <FormField label="First Input">
                <Input placeholder="Focus starts here" />
              </FormField>
              <FormField label="Second Input">
                <Input placeholder="Tab to navigate" />
              </FormField>
              <FormField label="Third Input">
                <Input placeholder="Shift+Tab to go back" />
              </FormField>
            </div>
            <ModalFooter>
              <Button variant="ghost">Cancel (Esc also works)</Button>
              <Button>Confirm</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        
        <div className="h-screen bg-muted/20 rounded p-4">
          <p>Background content (scroll should be locked when modal is open)</p>
          {Array.from({ length: 50 }, (_, i) => (
            <p key={i}>Scrollable content line {i + 1}</p>
          ))}
        </div>
      </div>
    );
  },
};