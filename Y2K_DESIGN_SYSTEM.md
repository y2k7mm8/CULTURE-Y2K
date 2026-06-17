# Y2K / Frutiger Aero Design System

## Overview

This document outlines the complete Y2K / Frutiger Aero / Retro Gaming design system implemented for the CULTURE-Y2K website. The system combines early 2000s internet aesthetics with modern UX principles, featuring glassmorphism, neon glow effects, chrome finishes, and anime-inspired visuals.

## Color Palette

### Neon Colors (Tailwind `y2k-*` namespace)

- **Cyan**: `#7df9ff` (primary, most used)
- **Cyan Bright**: `#00ffff` (highlights, full saturation)
- **Cyan Dark**: `#00d9ff` (secondary cyan)
- **Aqua**: `#00f0ff` (alternative cyan)
- **Sky Blue**: `#6ba9ff` (Frutiger sky)
- **Blue**: `#1084d7` (classic Windows blue)
- **Blue Dark**: `#000080` (Windows XP blue)
- **Purple**: `#8d6dff` (neon purple)
- **Pink**: `#ff59d1` (hot pink, secondary)
- **Pink Bright**: `#ff3399` (full saturation pink)
- **Lime**: `#d6ff60` (neon lime green)
- **Lime Bright**: `#00ff00` (full saturation lime)
- **Silver**: `#e8e8e8` (chrome/glass)
- **Chrome**: `#d0d0d0` (darker chrome)
- **White**: `#f7f9ff` (text, slightly warm)

### CSS Variables (in `:root`)

All colors are available as CSS variables in the format `--color-name`:

```css
--cyan, --cyan-bright, --cyan-dark, --aqua, --sky-blue, --blue, --purple, --pink, --lime, --silver, --chrome, --text, --text-bright, --text-dim
```

## Components

### 1. Y2K Buttons

**Files**: `src/components/ui/Y2KButton.tsx`

#### Variants

- `primary` (default): Glassmorphism style with cyan glow
- `neon`: Full neon border with holographic feel
- `chrome`: Windows XP chrome button
- `glass`: Transparent glass panel with glow
- `holographic`: Animated holographic gradient

#### Usage

```tsx
import { Y2KButton, Y2KNeonButton, Y2KChromeButton, Y2KGlassButton, Y2KHolographicButton } from '@/components/ui/Y2KButton';

// Primary
<Y2KButton onClick={handler}>Click me</Y2KButton>

// Neon variant
<Y2KNeonButton>ACTIVATE</Y2KNeonButton>

// Chrome
<Y2KChromeButton>OK</Y2KChromeButton>

// With size and glow
<Y2KButton size="lg" glowEffect={true}>Large Button</Y2KButton>
```

#### Props

- `variant`: Button style (primary|neon|chrome|glass|holographic)
- `size`: sm|md|lg
- `glowEffect`: boolean (default: true)
- `fullWidth`: boolean
- `className`: Additional Tailwind classes

### 2. Y2K Cards

**Files**: `src/components/ui/Y2KCard.tsx`

#### Variants

- `Y2KCard`: Standard floating card with glassmorphism
- `Y2KFloatingCard`: Auto-animated floating effect
- `Y2KCompactCard`: Smaller variant for lists

#### Usage

```tsx
import { Y2KCard, Y2KFloatingCard } from '@/components/ui/Y2KCard';

<Y2KCard
  title="Sector Name"
  subtitle="1999-2009"
  description="Description text"
  image={imageUrl}
  tags={["tag1", "tag2"]}
  glowColor="cyan"
  interactive
/>

<Y2KFloatingCard
  title="Float Card"
  floatDelay={0.2}
/>
```

#### Props

- `title`: Card title (required)
- `subtitle`: Optional subtitle
- `description`: Optional description text
- `image`: Optional image URL
- `icon`: Optional emoji/icon
- `tags`: Array of tag strings
- `glowColor`: cyan|pink|lime|purple
- `interactive`: boolean (enables hover effects)
- `glowEffect`: boolean
- `floatDelay`: number (seconds, for floating variant)

### 3. Retro Gaming Elements

**Files**: `src/components/ui/RetroGamingElements.tsx`

#### Sub-components

- **RetroGamingBadge**: Achievement/status badges
- **PixelArt**: Decorative pixel art elements
- **RetroGameStats**: Stats display in retro style
- **MascotFrame**: Cute anime mascot frame

#### Usage

```tsx
import {
  RetroGamingBadge,
  PixelArt,
  RetroGameStats,
  MascotFrame
} from '@/components/ui/RetroGamingElements';

// Badge
<RetroGamingBadge
  label="ACHIEVEMENT"
  type="achievement"
  color="cyan"
/>

// Pixel Art
<PixelArt type="heart" size="lg" animated />

// Stats
<RetroGameStats
  title="STATS"
  stats={[
    { label: "Score", value: "9999" },
    { label: "Level", value: "99" }
  ]}
/>

// Mascot
<MascotFrame
  emoji="🎮"
  name="Y2K"
  description="Guide text"
  glowColor="cyan"
/>
```

### 4. Window Component

**Files**: `src/components/ui/Window.tsx`

Enhanced draggable window with multiple style variants.

#### Variants

- `xp` (default): Windows XP style
- `glass`: Modern glassmorphism
- `neon`: Neon/Y2K cyber style

#### Usage

```tsx
import { Window } from "@/components/ui/Window";

<Window
  id="unique-window-id"
  title="Window Title"
  icon="📁"
  variant="glass"
  isDraggable
>
  Window content here
</Window>;
```

## CSS Classes & Utilities

### Glassmorphism

```css
/* Base glass panels */
.glass-panel-base         /* Light glass effect */
.glass-panel-strong       /* Stronger cyan glow */
.glass-panel-neon         /* Neon gradient glass */
```

### Glow Effects

```css
/* Shadow/glow utilities */
.shadow-glow-cyan         /* Cyan glow shadow */
.shadow-glow-cyan-lg      /* Large cyan glow */
.shadow-glow-pink         /* Pink glow shadow */
.shadow-glow-pink-lg      /* Large pink glow */
.shadow-glow-lime         /* Lime glow shadow */
.shadow-glow-purple       /* Purple glow shadow */
.shadow-glass             /* Glass panel shadow */
.shadow-glass-lg          /* Large glass shadow */
.shadow-chrome            /* Chrome effect shadow */
```

### Chrome Effect

```css
.chrome-effect            /* Chrome gradient background */
.chrome-button            /* Chrome button style */
.chrome-button:hover      /* Chrome button hover */
```

### Text Effects

```css
.glow-cyan               /* Cyan text glow */
.glow-pink               /* Pink text glow */
.glow-lime               /* Lime text glow */
.chroma-text             /* Animated color gradient text */
```

### Retro Gaming

```css
.pixel-border            /* 8-bit style border */
.scanlines               /* CRT scanline effect */
.retro-shadow            /* Retro drop shadow */
```

## Animations

### Available Animations

```css
/* Y2K Specific */
.animate-holographic     /* Holographic color shift */
.animate-glass-glow      /* Pulsing glass glow */
.animate-bubble-float    /* Bubble floating motion */
.animate-cyber-pulse     /* Cyber pulse effect */
.animate-shimmer         /* Shimmer/shine effect */
.animate-glow-pulse      /* Pulsing glow */
.animate-metallic-shine  /* Metallic shine effect */

/* Classic */
.animate-float           /* Gentle floating */
.animate-pulse           /* Opacity pulse */
.animate-bounce          /* Bouncing motion */
.animate-spin            /* Rotation */

/* Transitions */
.animate-fade-in         /* Fade in */
.animate-fade-in-down    /* Fade in from top */
.animate-fade-in-up      /* Fade in from bottom */
.animate-fade-in-left    /* Fade in from left */
.animate-fade-in-right   /* Fade in from right */
.animate-slide-up        /* Slide up animation */
```

### Animation Timing

- Short: 0.3s (button interactions)
- Medium: 2-3s (glow effects)
- Long: 4-6s (floating animations)

## Typography

### Font Families

```css
font-terminator     /* Bold display font, for headers */
font-planet         /* Clean system font */
```

### Text Utilities

```css
.window-title       /* Large title styling */
.micro-label        /* Small caps, tracking, muted color */
.chroma-text        /* Animated gradient text */
```

## Layout Classes

### Y2K Shell

Main container with strong glassmorphism and glow:

```html
<div class="y2k-shell rounded-[32px] p-6 border border-y2k-cyan/30">
  Content here
</div>
```

### Chrome Panel

Glass panel with chrome-like shine:

```html
<div class="chrome-panel rounded-[24px] p-5 border border-y2k-cyan/25">
  Content here
</div>
```

### Floating Card

Auto-floating effect:

```html
<div class="floating-card">Content floats gently</div>
```

## Color Usage Guidelines

### Primary Action

- Cyan (`#7df9ff`) - Main interactive elements, glow effects
- Use on buttons, borders, highlights

### Secondary Action

- Pink (`#ff59d1`) - Secondary emphasis, accents
- Use for alternative CTAs, decorative elements

### Success/Positive

- Lime (`#d6ff60`) - Achievement, completed states
- Use for badges, confirmations

### Supporting

- Purple (`#8d6dff`) - Tertiary emphasis
- Use for decorative elements, backgrounds

### Neutrals

- Silver/Chrome - Windows XP nostalgia
- Dark backgrounds - Deep space aesthetic

## Best Practices

### 1. Hierarchy

- Use bold neon colors for primary actions
- Use glow effects sparingly for emphasis
- Maintain contrast for readability

### 2. Performance

- Use `will-change: auto` on static glow effects
- Avoid animating too many elements at once
- Use CSS animations, not JavaScript for motion

### 3. Accessibility

- Ensure text has sufficient contrast against backgrounds
- Don't rely solely on color to convey information
- Test with reduced motion preferences

### 4. Consistency

- Use consistent border-radius values (20px, 24px, 28px, 32px)
- Maintain consistent spacing (6px scale)
- Use defined shadow/glow utilities

### 5. Mobile Responsiveness

- Scale glow effects down on smaller screens
- Adjust font sizes with Tailwind responsive prefixes
- Test touch interactions

## Common Patterns

### Hero Section

```tsx
<section className="y2k-shell rounded-[36px] p-8 relative overflow-hidden">
  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-y2k-cyan/20 blur-3xl pointer-events-none"></div>
  {/* Content */}
</section>
```

### Card Grid

```tsx
<div className="grid gap-5 md:grid-cols-2">
  {items.map((item) => (
    <Y2KCard key={item.id} {...item} glowColor="cyan" />
  ))}
</div>
```

### Interactive Button Group

```tsx
<div className="flex flex-wrap gap-3">
  {options.map((opt) => (
    <Y2KButton key={opt.id} className={isActive ? "shadow-glow-cyan" : ""}>
      {opt.label}
    </Y2KButton>
  ))}
</div>
```

### Stats Display

```tsx
<div className="grid gap-4 md:grid-cols-3">
  {stats.map((stat) => (
    <div key={stat.id} className="chrome-panel rounded-[24px] p-5">
      <div className="window-title text-3xl text-y2k-cyan">{stat.value}</div>
      <p className="micro-label mt-2">{stat.label}</p>
    </div>
  ))}
</div>
```

## Migration Guide

### From Old Classes

- `cyan-300/50` → `y2k-cyan/50` (with proper CSS variable fallback)
- `text-white` → `text-y2k-white` (for consistency)
- Generic `shadow-lg` → `shadow-glow-cyan` or `shadow-glass`
- `rounded-full` → `rounded-[24px]` (pixel perfect)

## Future Enhancements

Potential additions to the design system:

1. SVG-based decorative elements
2. 3D transforms for card elements
3. Advanced particle effects
4. Sound effects for interactions
5. Theme switching (light/dark modes)
6. Accessibility improvements
7. WebGL background animations

## Support

For questions or improvements to the design system:

1. Check existing components in `src/components/ui/`
2. Review animations in `src/styles/animations.css`
3. Check Tailwind config in `tailwind.config.ts`
4. Refer to `src/index.css` for CSS utilities
