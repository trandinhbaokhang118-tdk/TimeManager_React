# 🚀 Quick Reference Guide

## CSS Variables Cheat Sheet

### 🎨 Colors

#### Backgrounds:
```css
var(--bg)         /* Main background */
var(--surface-1)  /* Cards (glass) */
var(--surface-2)  /* Modals (elevated) */
var(--surface-3)  /* Popovers (highest) */
```

#### Text:
```css
var(--text)    /* Primary text (darkest/brightest) */
var(--text-2)  /* Secondary text (72% opacity) */
var(--text-3)  /* Muted text (52% opacity) */
```

#### Primary:
```css
var(--primary)          /* #12C2FF (cyan) */
var(--primary-gradient) /* Aqua → Blue → Purple */
var(--focus)            /* Cyan with opacity */
```

#### Semantic:
```css
var(--success)  /* Green */
var(--warning)  /* Yellow/Orange */
var(--danger)   /* Red */
var(--info)     /* Blue */
```

#### Effects:
```css
var(--border)        /* Subtle border */
var(--shadow-md)     /* Medium shadow */
var(--shadow-lg)     /* Large shadow */
var(--primary-glow)  /* Neon glow (dark mode) */
```

---

## 🎯 Common Patterns

### Glass Card:
```tsx
<div className="bg-[var(--surface-1)] border border-[var(--border)] 
     shadow-[var(--shadow-md)] rounded-xl backdrop-blur-xl">
  Content
</div>
```

### Glass Card with Hover:
```tsx
<div className="bg-[var(--surface-1)] border border-[var(--border)] 
     shadow-[var(--shadow-md)] rounded-xl backdrop-blur-xl
     hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 
     transition-all">
  Content
</div>
```

### Text Hierarchy:
```tsx
<h1 className="text-[var(--text)]">Heading</h1>
<p className="text-[var(--text-2)]">Body text</p>
<span className="text-[var(--text-3)]">Muted text</span>
```

### Gradient Button:
```tsx
<button className="bg-gradient-to-r from-[#12C2FF] via-[#3B82F6] 
     to-[#8B5CF6] text-white px-4 py-2 rounded-lg
     hover:brightness-110 transition-all">
  Action
</button>
```

### Input with Focus:
```tsx
<input className="bg-[var(--surface-1)] border border-[var(--border)] 
     text-[var(--text)] px-3 py-2 rounded-lg
     focus:border-[var(--primary)] focus:ring-2 
     focus:ring-[var(--focus)] outline-none" />
```

---

## 🎨 Utility Classes

### Backgrounds:
```css
.bg-surface-1  /* Glass card background */
.bg-surface-2  /* Modal background */
.bg-surface-3  /* Popover background */
```

### Text:
```css
.text-primary-var    /* Primary text */
.text-secondary-var  /* Secondary text */
.text-muted-var      /* Muted text */
```

### Borders & Shadows:
```css
.border-var     /* Border color */
.shadow-var     /* Shadow */
.shadow-md-var  /* Medium shadow */
.shadow-lg-var  /* Large shadow */
```

### Special:
```css
.btn-gradient  /* Gradient button */
.card-var      /* Glass card */
.input-var     /* Glass input */
.glow-cta      /* Neon glow (dark mode) */
```

---

## 🎯 Component Examples

### Button:
```tsx
import { Button } from '@/components/ui';

<Button>Primary Action</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
```

### Input:
```tsx
import { Input } from '@/components/ui';

<Input 
  label="Email"
  placeholder="Enter email"
  error={errors.email?.message}
/>
```

### Card:
```tsx
<div className="bg-[var(--surface-1)] border border-[var(--border)] 
     shadow-[var(--shadow-md)] rounded-xl backdrop-blur-xl p-6">
  <h3 className="text-[var(--text)] font-semibold mb-2">Title</h3>
  <p className="text-[var(--text-2)]">Description</p>
</div>
```

---

## 🌙 Dark Mode

### Check Dark Mode:
```tsx
import { useDarkMode } from '@/hooks/useDarkMode';

const { darkMode, toggleDarkMode } = useDarkMode();
```

### Conditional Styling:
```tsx
<div className={cn(
  'p-4',
  darkMode ? 'glow-cta' : ''
)}>
  Content
</div>
```

---

## 🎨 Color Palette

### Light Mode (Galaxy Aqua):
```
Background: #F6FBFF (gradient)
Surface:    rgba(255,255,255,.78)
Text:       #0B1220
Primary:    #12C2FF
Gradient:   #12C2FF → #3B82F6 → #8B5CF6
```

### Dark Mode (Deep Glossy Black):
```
Background: #070A0F (gradient)
Surface:    rgba(15,23,42,.55)
Text:       rgba(248,250,252,.92)
Primary:    #12C2FF
Gradient:   #12C2FF → #3B82F6 → #8B5CF6
Glow:       0 0 20px rgba(18,194,255,.30)
```

---

## 🚀 Quick Tips

### 1. Always Use CSS Variables:
```tsx
✅ className="text-[var(--text)]"
❌ className="text-gray-900 dark:text-white"
```

### 2. Glass Effect = Surface + Blur:
```tsx
✅ className="bg-[var(--surface-1)] backdrop-blur-xl"
❌ className="bg-white dark:bg-gray-900"
```

### 3. Hover = Lift + Shadow:
```tsx
✅ className="hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
❌ className="hover:bg-gray-100"
```

### 4. Focus = Border + Ring:
```tsx
✅ className="focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--focus)]"
❌ className="focus:outline-blue-500"
```

### 5. Gradient = Aqua → Blue → Purple:
```tsx
✅ className="bg-gradient-to-r from-[#12C2FF] via-[#3B82F6] to-[#8B5CF6]"
❌ className="bg-blue-500"
```

---

## 📝 Common Mistakes

### ❌ Don't:
```tsx
// Hardcoded colors
<p className="text-gray-900 dark:text-white">

// Solid backgrounds
<div className="bg-white dark:bg-gray-900">

// Standard borders
<div className="border-gray-200 dark:border-gray-800">

// Basic hover
<div className="hover:bg-gray-100">
```

### ✅ Do:
```tsx
// CSS variables
<p className="text-[var(--text)]">

// Glass effect
<div className="bg-[var(--surface-1)] backdrop-blur-xl">

// CSS variable borders
<div className="border-[var(--border)]">

// Animated hover
<div className="hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] transition-all">
```

---

## 🎯 Performance Tips

### 1. Use Transform for Animations:
```tsx
✅ transform: translateY(-2px)
❌ margin-top: -2px
```

### 2. Use Opacity for Fades:
```tsx
✅ opacity: 0
❌ display: none
```

### 3. Use CSS Variables for Theme:
```tsx
✅ color: var(--text)
❌ color: darkMode ? '#fff' : '#000'
```

### 4. Use Backdrop Blur Wisely:
```tsx
✅ backdrop-blur-xl (on cards)
❌ backdrop-blur-xl (on everything)
```

---

## 📚 Documentation

- **Full Guide**: `UIUX_IMPLEMENTATION.md`
- **Theme Guide**: `GALAXY_THEME_GUIDE.md`
- **Standards**: `tieuchuanuiux.md`
- **Phase 1**: `PHASE1_COMPLETED.md`
- **Phase 2**: `PHASE2_COMPLETED.md`
- **Status**: `IMPLEMENTATION_STATUS.md`
- **Comparison**: `BEFORE_AFTER_COMPARISON.md`

---

## 🔗 Quick Links

- **Live App**: http://localhost:5175/
- **CSS File**: `frontend/src/index.css`
- **Button**: `frontend/src/components/ui/button.tsx`
- **Input**: `frontend/src/components/ui/input.tsx`
- **Sidebar**: `frontend/src/components/layout/Sidebar.tsx`

---

**Last Updated**: January 19, 2026
**Version**: 2.0.0
**Status**: ✅ Production Ready
