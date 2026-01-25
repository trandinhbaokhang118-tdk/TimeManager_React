# 🚀 Phase 2, 3, 4 Implementation Plan

## Phase 2: Component Migration (IN PROGRESS)

### ✅ Completed:
1. **Input Component** - Uses CSS variables
   - Border: `var(--border)`
   - Text: `var(--text)`
   - Placeholder: `var(--text-3)`
   - Focus: `var(--primary)` + `var(--focus)`
   - Error: `var(--danger)`

2. **Sidebar Component** - Partially updated
   - Background: `var(--surface-1)`
   - Border: `var(--border)`
   - Backdrop blur: Added

### 🔄 To Complete:

#### 1. Sidebar - Full Update
```tsx
// Logo icon - Use gradient
<div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#12C2FF] via-[#3B82F6] to-[#8B5CF6]">

// Text colors
<span className="text-[var(--text)]">

// Navigation items
className={isActive 
  ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
  : 'text-[var(--text-2)] hover:bg-gray-100 dark:hover:bg-gray-800'
}
```

#### 2. Header Component
```tsx
// Search button
className="bg-[var(--surface-1)] border-[var(--border)] text-[var(--text-2)]"

// Notification badge
className="bg-[var(--danger)] text-white"

// User menu
className="bg-[var(--surface-2)] border-[var(--border)]"
```

#### 3. Card Components (All Pages)
```tsx
// Replace
className="card"

// With
className="bg-[var(--surface-1)] border-[var(--border)] shadow-[var(--shadow-md)] rounded-xl backdrop-blur-xl"

// Or use utility class
className="card-var"
```

#### 4. Modal/Dialog
```tsx
// Already updated in previous phase
// Verify it uses:
className="bg-[var(--surface-3)] border-[var(--border)] text-[var(--text)]"
```

#### 5. Select Dropdown
```tsx
// Trigger
className="bg-[var(--surface-1)] border-[var(--border)] text-[var(--text)]"

// Content
className="bg-[var(--surface-2)] border-[var(--border)]"

// Items
className="text-[var(--text)] hover:bg-gray-100 dark:hover:bg-gray-800"
```

---

## Phase 3: Mobile Optimization

### 1. Bottom Navigation (NEW)
**File**: `frontend/src/components/layout/BottomNav.tsx`

```tsx
export function BottomNav() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Home' },
    { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/focus', icon: Timer, label: 'Focus' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface-2)] border-t border-[var(--border)] backdrop-blur-xl">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors',
                isActive
                  ? 'text-[var(--primary)]'
                  : 'text-[var(--text-2)]'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
```

### 2. Mobile Drawer (NEW)
**File**: `frontend/src/components/layout/MobileDrawer.tsx`

```tsx
export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-64 p-0 bg-[var(--surface-2)] border-[var(--border)]">
        <Sidebar mobile onClose={onClose} />
      </SheetContent>
    </Sheet>
  );
}
```

### 3. Touch Optimization
```css
/* Add to index.css */
@media (max-width: 640px) {
  /* Increase touch targets */
  button, a, input, select {
    min-height: 44px;
  }
  
  /* Larger tap areas */
  .btn-sm {
    height: 40px;
    padding: 0 16px;
  }
  
  /* Better spacing */
  .card {
    padding: 16px;
  }
}
```

### 4. Responsive Updates
```tsx
// Hide sidebar on mobile
<Sidebar className="max-md:hidden" />

// Show bottom nav on mobile
<BottomNav className="md:hidden" />

// Adjust padding for bottom nav
<main className="pb-20 md:pb-0">
```

---

## Phase 4: Keyboard Shortcuts & Accessibility

### 1. Command Palette Enhancement
**File**: `frontend/src/components/layout/CommandPalette.tsx`

```tsx
// Add keyboard shortcuts
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Cmd/Ctrl + K - Open command palette
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setOpen(true);
    }
    
    // Cmd/Ctrl + N - New task
    if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
      e.preventDefault();
      navigate('/tasks?new=true');
    }
    
    // Cmd/Ctrl + F - Focus mode
    if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
      e.preventDefault();
      navigate('/focus');
    }
    
    // Cmd/Ctrl + / - Show shortcuts
    if ((e.metaKey || e.ctrlKey) && e.key === '/') {
      e.preventDefault();
      setShowShortcuts(true);
    }
  };
  
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### 2. Keyboard Shortcuts Modal (NEW)
**File**: `frontend/src/components/layout/KeyboardShortcuts.tsx`

```tsx
export function KeyboardShortcuts({ open, onClose }: { open: boolean; onClose: () => void }) {
  const shortcuts = [
    { key: '⌘K', description: 'Open command palette' },
    { key: '⌘N', description: 'New task' },
    { key: '⌘F', description: 'Focus mode' },
    { key: 'ESC', description: 'Close modal' },
    { key: 'Tab', description: 'Navigate forward' },
    { key: 'Shift+Tab', description: 'Navigate backward' },
    { key: 'Enter', description: 'Submit form' },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {shortcuts.map((shortcut) => (
            <div key={shortcut.key} className="flex items-center justify-between py-2">
              <span className="text-[var(--text-2)]">{shortcut.description}</span>
              <kbd className="px-2 py-1 bg-[var(--surface-1)] border border-[var(--border)] rounded text-xs">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

### 3. Focus Management
```tsx
// Trap focus in modals
import { useFocusTrap } from '@/hooks/useFocusTrap';

export function Modal({ open, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, open);
  
  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {children}
    </div>
  );
}
```

### 4. ARIA Labels
```tsx
// Add to all icon buttons
<button aria-label="Close menu">
  <X className="w-4 h-4" />
</button>

<button aria-label="Open notifications">
  <Bell className="w-4 h-4" />
</button>

<button aria-label="Toggle dark mode">
  <Moon className="w-4 h-4" />
</button>
```

### 5. Screen Reader Support
```tsx
// Add live regions for dynamic content
<div role="status" aria-live="polite" aria-atomic="true">
  {notification.message}
</div>

// Add descriptions
<input
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
<p id="email-error" role="alert">
  {error}
</p>
```

---

## Quick Implementation Script

### Global Find & Replace:

1. **Cards**:
   - Find: `className="card`
   - Replace: `className="bg-[var(--surface-1)] border-[var(--border)] shadow-[var(--shadow-md)] rounded-xl backdrop-blur-xl`

2. **Text Primary**:
   - Find: `text-gray-900 dark:text-white`
   - Replace: `text-[var(--text)]`

3. **Text Secondary**:
   - Find: `text-gray-500 dark:text-gray-400`
   - Replace: `text-[var(--text-2)]`

4. **Text Muted**:
   - Find: `text-gray-400 dark:text-gray-500`
   - Replace: `text-[var(--text-3)]`

5. **Borders**:
   - Find: `border-gray-200 dark:border-gray-800`
   - Replace: `border-[var(--border)]`

6. **Primary Color**:
   - Find: `bg-primary-600`
   - Replace: `bg-gradient-to-r from-[#12C2FF] via-[#3B82F6] to-[#8B5CF6]`

---

## Testing Checklist

### Visual Testing:
- [ ] Light mode: All colors correct
- [ ] Dark mode: Neon glow subtle
- [ ] Gradients smooth
- [ ] Glass effect visible
- [ ] Text readable everywhere

### Interaction Testing:
- [ ] All buttons clickable
- [ ] Hover states work
- [ ] Focus rings visible
- [ ] Modals close with ESC
- [ ] Forms submit with Enter

### Mobile Testing:
- [ ] Bottom nav visible
- [ ] Touch targets ≥ 44px
- [ ] Drawer opens/closes
- [ ] Content not hidden
- [ ] Scrolling smooth

### Keyboard Testing:
- [ ] Tab navigation works
- [ ] Cmd+K opens palette
- [ ] Cmd+N creates task
- [ ] ESC closes modals
- [ ] Enter submits forms

### Accessibility Testing:
- [ ] Screen reader announces changes
- [ ] ARIA labels present
- [ ] Focus trap in modals
- [ ] Contrast ratios pass
- [ ] Keyboard only navigation works

---

## Priority Order:

### High Priority (Do Now):
1. ✅ Input component - DONE
2. 🔄 Sidebar component - IN PROGRESS
3. ⏳ Header component
4. ⏳ All page cards (Dashboard, Tasks, etc.)

### Medium Priority (This Week):
5. ⏳ Bottom navigation
6. ⏳ Mobile drawer
7. ⏳ Touch optimization
8. ⏳ Keyboard shortcuts

### Low Priority (Next Week):
9. ⏳ Focus management
10. ⏳ ARIA labels
11. ⏳ Screen reader support
12. ⏳ Advanced features

---

## Estimated Time:

- **Phase 2 (Components)**: 2-3 hours
- **Phase 3 (Mobile)**: 3-4 hours
- **Phase 4 (Accessibility)**: 2-3 hours
- **Total**: 7-10 hours

---

## Files to Create:

### New Components:
1. `frontend/src/components/layout/BottomNav.tsx`
2. `frontend/src/components/layout/MobileDrawer.tsx`
3. `frontend/src/components/layout/KeyboardShortcuts.tsx`
4. `frontend/src/hooks/useFocusTrap.ts`
5. `frontend/src/hooks/useKeyboardShortcuts.ts`

### New Utilities:
6. `frontend/src/lib/keyboard.ts` - Keyboard utilities
7. `frontend/src/lib/accessibility.ts` - A11y helpers

---

**Status**: 📋 **PLANNED**
**Current**: Phase 2 (40% complete)
**Next**: Complete Sidebar, Header, then all pages
**Date**: January 18, 2026
