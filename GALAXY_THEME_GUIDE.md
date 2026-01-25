# 🌌 Galaxy Design System - Color Palette & Usage Guide

## Overview
Hệ thống thiết kế Galaxy với 2 chế độ: **Galaxy Aqua** (Light Mode) và **Deep Glossy Black** (Dark Mode).

---

## 🌊 LIGHT MODE: Galaxy Aqua

### Background Gradients
```css
/* Primary gradient - Main background */
background: linear-gradient(135deg, #e0f7fa 0%, #b3e5fc 25%, #e1bee7 75%, #f3e5f5 100%);

/* Alternative gradients */
background: radial-gradient(ellipse at top, #80deea 0%, #b3e5fc 50%, #e1bee7 100%);
background: linear-gradient(180deg, #e0f7fa 0%, #b3e5fc 40%, #ce93d8 80%, #f3e5f5 100%);
```

### Color Tokens

#### Base Colors
| Token | HEX | Usage |
|-------|-----|-------|
| `bg-base` | `#e8f4f8` | Base background color |
| `surface-1` | `rgba(255, 255, 255, 0.75)` | Cards, panels (glass effect) |
| `surface-2` | `rgba(255, 255, 255, 0.9)` | Modals, popovers (elevated) |
| `border` | `rgba(0, 188, 212, 0.15)` | Default borders |
| `border-strong` | `rgba(0, 188, 212, 0.3)` | Emphasized borders |

#### Text Hierarchy
| Token | HEX | Usage |
|-------|-----|-------|
| `text-heading` | `#051923` | H1, H2 headings |
| `text-primary` | `#0d1b2a` | Body text, primary content |
| `text-secondary` | `#415a77` | Secondary text, captions |
| `text-muted` | `#778da9` | Disabled, placeholder text |
| `text-link` | `#00acc1` | Links, interactive text |

#### Primary Button (Aqua Gradient)
```css
/* Normal state */
background: linear-gradient(135deg, #00bcd4 0%, #00acc1 50%, #0097a7 100%);
color: #ffffff;

/* Hover state */
background: linear-gradient(135deg, #00acc1 0%, #0097a7 50%, #00838f 100%);
```

#### Accent & Focus
| Token | HEX | Usage |
|-------|-----|-------|
| `accent` | `#00e5ff` | Neon cyan accent |
| `focus-ring` | `#00e5ff` | Focus indicator |
| `focus-glow` | `0 0 0 3px rgba(0, 229, 255, 0.2)` | Focus shadow |

#### Semantic Colors
| Type | Background | Border | Text |
|------|-----------|--------|------|
| Success | `rgba(0, 230, 118, 0.1)` | `rgba(0, 230, 118, 0.3)` | `#00897b` |
| Warning | `rgba(255, 214, 0, 0.1)` | `rgba(255, 214, 0, 0.3)` | `#f57f17` |
| Error | `rgba(255, 23, 68, 0.1)` | `rgba(255, 23, 68, 0.3)` | `#c62828` |
| Info | `rgba(0, 176, 255, 0.1)` | `rgba(0, 176, 255, 0.3)` | `#0277bd` |

### Usage Guidelines - Light Mode

#### Cards
```css
.card {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(0, 188, 212, 0.15);
  box-shadow: 0 4px 12px rgba(0, 188, 212, 0.12);
  border-radius: 12px;
}
```

#### Inputs
```css
.input {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 188, 212, 0.2);
  color: #0d1b2a;
}

.input:focus {
  border-color: #00e5ff;
  box-shadow: 0 0 0 3px rgba(0, 229, 255, 0.2), 0 0 12px rgba(0, 229, 255, 0.15);
}
```

#### Badges/Chips
```css
.badge {
  background: rgba(0, 176, 255, 0.1);
  border: 1px solid rgba(0, 176, 255, 0.3);
  color: #0277bd;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
}
```

---

## 🌑 DARK MODE: Deep Glossy Black

### Background Gradients
```css
/* Primary gradient - Main background */
background: linear-gradient(180deg, #0a0e14 0%, #0d1117 50%, #0a0d12 100%);

/* Alternative gradients */
background: radial-gradient(ellipse at center, #0d1117 0%, #0a0e14 50%, #080b10 100%);
background: linear-gradient(135deg, #0a0e14 0%, #0d1117 40%, #0f1419 80%, #0a0d12 100%);
```

### Color Tokens

#### Base Colors
| Token | HEX | Usage |
|-------|-----|-------|
| `bg-base` | `#0a0e14` | Base background (near-black) |
| `surface-1` | `#151b23` | Cards, panels (blue-tinted charcoal) |
| `surface-2` | `#1e2530` | Modals, popovers (elevated) |
| `border` | `rgba(100, 200, 255, 0.1)` | Default borders |
| `border-strong` | `rgba(100, 200, 255, 0.2)` | Emphasized borders |

#### Text Hierarchy
| Token | HEX | Usage |
|-------|-----|-------|
| `text-heading` | `#f5f8fc` | H1, H2 headings (brightest) |
| `text-primary` | `#e8eef5` | Body text, primary content |
| `text-secondary` | `rgba(232, 238, 245, 0.75)` | Secondary text (75% opacity) |
| `text-muted` | `rgba(232, 238, 245, 0.55)` | Disabled, placeholder (55% opacity) |
| `text-link` | `#00e5ff` | Links, interactive text (neon cyan) |

#### Primary Button (Neon Cyan Gradient)
```css
/* Normal state */
background: linear-gradient(135deg, #00e5ff 0%, #00b8d4 50%, #0097a7 100%);
color: #0a0e14;
box-shadow: 0 0 20px rgba(0, 229, 255, 0.3), 0 4px 12px rgba(0, 229, 255, 0.2);

/* Hover state */
background: linear-gradient(135deg, #1de9ff 0%, #00d4f0 50%, #00acc1 100%);
box-shadow: 0 0 30px rgba(0, 229, 255, 0.4), 0 6px 16px rgba(0, 229, 255, 0.3);
```

#### Accent & Focus
| Token | HEX | Usage |
|-------|-----|-------|
| `accent` | `#b388ff` | Neon purple accent |
| `focus-ring` | `#00e5ff` | Focus indicator (neon cyan) |
| `focus-glow` | `0 0 0 3px rgba(0, 229, 255, 0.3)` | Focus shadow with glow |

#### Semantic Colors
| Type | Background | Border | Text |
|------|-----------|--------|------|
| Success | `rgba(0, 230, 118, 0.12)` | `rgba(0, 230, 118, 0.25)` | `#00e676` |
| Warning | `rgba(255, 214, 0, 0.12)` | `rgba(255, 214, 0, 0.25)` | `#ffd600` |
| Error | `rgba(255, 23, 68, 0.12)` | `rgba(255, 23, 68, 0.25)` | `#ff1744` |
| Info | `rgba(0, 176, 255, 0.12)` | `rgba(0, 176, 255, 0.25)` | `#00b0ff` |

### Usage Guidelines - Dark Mode

#### Cards
```css
.dark .card {
  background: rgba(21, 27, 35, 0.8);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(100, 200, 255, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
}

.dark .card:hover {
  border-color: rgba(100, 200, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 229, 255, 0.1);
}
```

#### Inputs
```css
.dark .input {
  background: rgba(21, 27, 35, 0.8);
  border: 1px solid rgba(100, 200, 255, 0.15);
  color: #e8eef5;
}

.dark .input:focus {
  border-color: #00e5ff;
  box-shadow: 0 0 0 3px rgba(0, 229, 255, 0.3), 0 0 16px rgba(0, 229, 255, 0.2);
}

.dark .input::placeholder {
  color: rgba(232, 238, 245, 0.4);
}
```

#### Badges/Chips
```css
.dark .badge {
  background: rgba(0, 176, 255, 0.12);
  border: 1px solid rgba(0, 176, 255, 0.25);
  color: #00b0ff;
}
```

#### Sidebar/Navigation
```css
.dark nav,
.dark aside {
  background: rgba(10, 14, 20, 0.95);
  backdrop-filter: blur(32px);
  border-color: rgba(100, 200, 255, 0.1);
}
```

---

## 🎨 Design Principles

### Visual Hierarchy
1. **Headings** → Darkest/Brightest, highest weight
2. **Body text** → Primary color, medium weight
3. **Secondary text** → 75% opacity, lighter weight
4. **Muted text** → 55% opacity, smallest size

### Glassmorphism Effect
- **Light Mode**: White glass with aqua tint
- **Dark Mode**: Dark glass with blue-tinted charcoal
- Always use `backdrop-filter: blur()` for depth

### Neon Glow Rules (Dark Mode Only)
- **Primary CTA buttons**: Moderate glow (0-20px)
- **Focus states**: Stronger glow (0-16px)
- **Hover states**: Increased glow (+10px)
- **Never** use glow on body text or secondary elements

### Contrast Requirements
- **Light Mode**: Text must be ≥ 4.5:1 contrast ratio
- **Dark Mode**: Off-white text (#e8eef5) on near-black (#0a0e14)
- **Interactive elements**: Must be clearly distinguishable

### Shadows
- **Light Mode**: Soft aqua-tinted shadows
- **Dark Mode**: Deep black shadows with subtle glow on hover

---

## 📦 Component Examples

### Button Variants

#### Primary Button
```tsx
// Light Mode
<button className="px-4 py-2 rounded-lg text-white font-medium
  bg-gradient-to-r from-cyan-500 to-cyan-600
  hover:from-cyan-600 hover:to-cyan-700
  shadow-md hover:shadow-lg transition-all">
  Primary Action
</button>

// Dark Mode
<button className="px-4 py-2 rounded-lg text-gray-900 font-medium
  bg-gradient-to-r from-cyan-400 to-cyan-500
  hover:from-cyan-300 hover:to-cyan-400
  shadow-[0_0_20px_rgba(0,229,255,0.3)]
  hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]
  transition-all">
  Primary Action
</button>
```

#### Secondary Button
```tsx
// Light Mode
<button className="px-4 py-2 rounded-lg font-medium
  bg-white/75 backdrop-blur-md
  border border-cyan-500/20
  text-gray-900 hover:border-cyan-500/40
  transition-all">
  Secondary Action
</button>

// Dark Mode
<button className="px-4 py-2 rounded-lg font-medium
  bg-gray-800/50 backdrop-blur-md
  border border-cyan-400/20
  text-cyan-400 hover:border-cyan-400/40
  hover:shadow-[0_0_12px_rgba(0,229,255,0.2)]
  transition-all">
  Secondary Action
</button>
```

### Modal/Dialog
```tsx
<div className="
  /* Light Mode */
  bg-white/90 backdrop-blur-2xl
  border border-cyan-500/15
  shadow-[0_8px_32px_rgba(0,188,212,0.15)]
  
  /* Dark Mode */
  dark:bg-gray-900/90 dark:backdrop-blur-2xl
  dark:border-cyan-400/10
  dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)]
  
  rounded-xl p-6">
  {/* Modal content */}
</div>
```

---

## ✅ Checklist for New Components

### Light Mode (Galaxy Aqua)
- [ ] Background uses glass effect with aqua tint
- [ ] Text hierarchy is clear (heading > body > secondary > muted)
- [ ] Borders use aqua color with low opacity
- [ ] Shadows have aqua tint
- [ ] Interactive elements have clear hover states
- [ ] Focus rings use neon cyan with glow

### Dark Mode (Deep Glossy Black)
- [ ] Background is near-black with subtle gradient
- [ ] Text is off-white (#e8eef5) for readability
- [ ] Surfaces use blue-tinted charcoal
- [ ] Borders use cyan with low opacity
- [ ] Primary buttons have neon glow
- [ ] Focus states have strong cyan glow
- [ ] Hover states increase glow intensity
- [ ] No excessive glow on non-interactive elements

---

## 🚀 Implementation Status

✅ **Completed**
- Color token system
- Background gradients (Light & Dark)
- Typography hierarchy
- Card/Surface styles
- Input/Form styles
- Badge/Chip styles
- Focus ring styles
- Scrollbar styles
- Animation system

🔄 **In Progress**
- Button component updates
- Modal/Dialog updates
- Dropdown/Select updates

---

## 📝 Notes

- **TailwindCSS v4** is used with `@theme` directive
- All colors support smooth transitions between light/dark modes
- Glassmorphism requires `backdrop-filter` support
- Neon glow effects are GPU-accelerated
- Design system is WCAG 2.1 AA compliant for contrast

---

**Last Updated**: January 18, 2026
**Version**: 1.0.0
