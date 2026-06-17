# Y2K Color Palette & Glow Effects Reference

## Primary Neon Colors

### Cyan - `#7df9ff`

**Usage**: Primary actions, main glow, highlights

```html
<span class="text-y2k-cyan">Cyan Text</span>
<div class="bg-y2k-cyan/10">Cyan Background</div>
<button class="border-y2k-cyan shadow-glow-cyan">Cyan Button</button>
```

**CSS Variable**: `var(--cyan)`
**Tailwind**: `text-y2k-cyan`, `bg-y2k-cyan`, `border-y2k-cyan`
**Shadows**: `shadow-glow-cyan`, `shadow-glow-cyan-lg`

---

### Pink - `#ff59d1`

**Usage**: Secondary actions, accents, alternative highlights

```html
<span class="text-y2k-pink">Pink Text</span>
<div class="bg-y2k-pink/10">Pink Background</div>
<button class="border-y2k-pink shadow-glow-pink">Pink Button</button>
```

**CSS Variable**: `var(--pink)`
**Tailwind**: `text-y2k-pink`, `bg-y2k-pink`, `border-y2k-pink`
**Shadows**: `shadow-glow-pink`, `shadow-glow-pink-lg`

---

### Lime - `#d6ff60`

**Usage**: Success states, positive feedback, achievements

```html
<span class="text-y2k-lime">Lime Text</span>
<div class="bg-y2k-lime/10">Lime Background</div>
<button class="border-y2k-lime shadow-glow-lime">Lime Button</button>
```

**CSS Variable**: `var(--lime)`
**Tailwind**: `text-y2k-lime`, `bg-y2k-lime`, `border-y2k-lime`
**Shadow**: `shadow-glow-lime`

---

### Purple - `#8d6dff`

**Usage**: Tertiary emphasis, decorative elements, alternative accents

```html
<span class="text-y2k-purple">Purple Text</span>
<div class="bg-y2k-purple/10">Purple Background</div>
<button class="border-y2k-purple shadow-glow-purple">Purple Button</button>
```

**CSS Variable**: `var(--purple)`
**Tailwind**: `text-y2k-purple`, `bg-y2k-purple`, `border-y2k-purple`
**Shadow**: `shadow-glow-purple`

---

## Supporting Colors

### Sky Blue - `#6ba9ff`

**Usage**: Frutiger Aero sky, backgrounds, subtle highlights

```html
<span class="text-y2k-sky-blue">Sky Blue</span>
<div class="bg-y2k-sky-blue/10">Sky Background</div>
```

**Tailwind**: `text-y2k-sky-blue`, `bg-y2k-sky-blue`

---

### Blue (Windows) - `#1084d7`

**Usage**: Windows XP themes, chrome elements, classic UI

```html
<span class="text-y2k-blue">Blue Text</span>
<div class="bg-y2k-blue">Blue Background</div>
```

**Tailwind**: `text-y2k-blue`, `bg-y2k-blue`

---

### Blue Dark - `#000080`

**Usage**: Windows XP title bars, deep accents, retro UI

```html
<div class="bg-y2k-blue-dark">Dark Blue Background</div>
```

**Tailwind**: `bg-y2k-blue-dark`, `text-y2k-blue-dark`

---

### Cyan Variants

#### Cyan Bright - `#00ffff`

Full saturation version for maximum impact

```html
<span class="text-y2k-cyan-bright animate-pulse">BRIGHT CYAN</span>
```

#### Cyan Dark - `#00d9ff`

Darker variant for hover states or secondary elements

```html
<button class="text-y2k-cyan-dark hover:text-y2k-cyan">Darker Cyan</button>
```

#### Aqua - `#00f0ff`

Alternative cyan for variety

```html
<div class="border-y2k-aqua">Aqua Border</div>
```

---

### Pink Bright - `#ff3399`

Full saturation version of pink

```html
<span class="text-y2k-pink-bright animate-pulse">BRIGHT PINK</span>
```

---

### Lime Bright - `#00ff00`

Full neon lime/green

```html
<span class="text-y2k-lime-bright glow-lime">NEON LIME</span>
```

---

## Neutral/Chrome Colors

### Silver - `#e8e8e8`

**Usage**: Chrome effects, glass highlights, light surfaces

```html
<div class="bg-y2k-silver text-black">Silver Background</div>
<button class="border-y2k-silver">Silver Border</button>
```

---

### Chrome - `#d0d0d0`

**Usage**: Darker chrome effects, button shading

```html
<div class="bg-y2k-chrome">Chrome Background</div>
```

---

### White - `#f7f9ff`

**Usage**: Primary text color, backgrounds, highlights

```html
<span class="text-y2k-white">White Text</span>
<div class="bg-y2k-white/5">White Background</div>
```

---

## Opacity Modifiers

All colors support Tailwind opacity modifiers:

```html
<!-- 50% opacity -->
<div class="text-y2k-cyan/50">50% Opacity</div>
<div class="bg-y2k-cyan/50">50% Background</div>
<div class="border-y2k-cyan/50">50% Border</div>

<!-- Other common opacities -->
<div class="text-y2k-cyan/10">10% - Very subtle</div>
<div class="text-y2k-cyan/20">20% - Subtle</div>
<div class="text-y2k-cyan/30">30% - Light</div>
<div class="text-y2k-cyan/40">40% - Medium-light</div>
<div class="text-y2k-cyan/60">60% - Medium-dark</div>
<div class="text-y2k-cyan/80">80% - Dark</div>
<div class="text-y2k-cyan/100">100% - Full opacity</div>
```

---

## Glow Effects (Shadow Utilities)

### Cyan Glow

```html
<!-- Small glow -->
<button class="shadow-glow-cyan">Small Glow</button>

<!-- Large glow -->
<button class="shadow-glow-cyan-lg">Large Glow</button>
```

### Pink Glow

```html
<button class="shadow-glow-pink">Small Pink Glow</button>
<button class="shadow-glow-pink-lg">Large Pink Glow</button>
```

### Lime Glow

```html
<button class="shadow-glow-lime">Lime Glow</button>
```

### Purple Glow

```html
<button class="shadow-glow-purple">Purple Glow</button>
```

### Chrome Shadow

```html
<div class="shadow-chrome">Chrome Effect</div>
```

### Glass Shadow

```html
<div class="shadow-glass">Glass Effect</div>
<div class="shadow-glass-lg">Large Glass Effect</div>
```

---

## Color Combination Recommendations

### Neon Pairs (High Contrast)

- **Cyan + Pink**: Primary + Secondary (most common)
- **Cyan + Lime**: Cool + Vibrant
- **Pink + Purple**: Warm + Cool
- **Lime + Purple**: Complementary colors

### Retro Pairs (Windows XP Feel)

- **Blue + Silver**: Classic Windows
- **Blue Dark + Silver**: Title bar + Content
- **Chrome + White**: Metal + Light

### Glassmorphism (Subtle)

- **White/10 + Cyan/5**: Very subtle glass
- **White/20 + Cyan/10**: Light glass
- **White/30 + Cyan/15**: Medium glass

---

## Text Over Background Examples

```html
<!-- Good: High contrast -->
<div class="bg-y2k-blue-dark text-y2k-white">
  ✓ Dark background + White text
</div>
<div class="bg-y2k-white text-y2k-blue-dark">
  ✓ Light background + Dark text
</div>

<!-- Good: Neon over dark -->
<div class="bg-y2k-blue-dark text-y2k-cyan">
  ✓ Dark + Cyan (high visibility)
</div>
<div class="bg-y2k-blue-dark text-y2k-pink">
  ✓ Dark + Pink (high visibility)
</div>

<!-- Acceptable: Muted neon over dark -->
<div class="bg-y2k-blue-dark text-y2k-cyan/70">✓ Dark + Cyan/70 (readable)</div>

<!-- Avoid: Low contrast -->
<div class="bg-y2k-white text-y2k-cyan">✗ Light + Cyan (hard to read)</div>
<div class="bg-y2k-cyan text-y2k-pink">✗ Cyan + Pink (vibration)</div>
```

---

## Color Usage by Element Type

### Buttons

```html
<!-- Primary button -->
<button
  class="bg-y2k-cyan/10 border-y2k-cyan/50 text-y2k-white hover:shadow-glow-cyan"
>
  Primary
</button>

<!-- Neon button -->
<button
  class="border-2 border-y2k-cyan text-y2k-cyan hover:shadow-glow-cyan-lg"
>
  Neon
</button>

<!-- Chrome button -->
<button class="bg-y2k-silver text-black border-y2k-chrome shadow-chrome">
  Chrome
</button>
```

### Cards/Panels

```html
<!-- Glass card -->
<div class="bg-y2k-white/5 border-y2k-cyan/25 shadow-glass">Glass Card</div>

<!-- Neon card -->
<div class="bg-y2k-cyan/10 border-y2k-cyan/50 shadow-glow-cyan">Neon Card</div>

<!-- Chrome card -->
<div class="bg-y2k-silver border-y2k-chrome shadow-chrome">Chrome Card</div>
```

### Text Highlights

```html
<!-- Glowing text -->
<span class="text-y2k-cyan glow-cyan">Glowing</span>

<!-- Gradient text -->
<span class="chroma-text">Gradient Rainbow</span>

<!-- Neon text -->
<span class="text-y2k-cyan-bright animate-pulse">NEON</span>
```

---

## Animation + Color Combinations

```html
<!-- Pulsing glow button -->
<button class="shadow-glow-cyan animate-pulse">Pulse</button>

<!-- Holographic effect -->
<button class="animate-holographic">Holographic</button>

<!-- Glass glow animation -->
<div class="shadow-glass animate-glass-glow">Glass Glow</div>

<!-- Cyber pulse -->
<div class="animate-cyber-pulse shadow-glow-cyan">Cyber Pulse</div>

<!-- Shimmer effect -->
<div class="animate-shimmer">Shimmer</div>
```

---

## Gradients (CSS Custom Properties)

### Sky Gradient

```html
<div class="gradient-sky">Sky Gradient (Cyan to Purple)</div>
```

### Sunset Gradient

```html
<div class="gradient-sunset">Sunset Gradient (Pink to Orange)</div>
```

### Chrome Gradient

```html
<div class="gradient-chrome">Chrome Gradient</div>
```

### Neon Gradient

```html
<div class="gradient-neon">Neon Gradient (Cyan to Magenta)</div>
```

---

## Accessibility Notes

### Color Contrast

- Always test color combinations for WCAG AA compliance
- Use `text-y2k-white` for primary text on dark backgrounds
- Avoid pure color-only differentiation
- Use icons/labels alongside colors

### For Colorblind Users

- Don't rely on Cyan vs Pink alone to differentiate
- Add text labels or icons for important states
- Use `text-y2k-lime` for success (different from red/cyan pairs)

### Reduced Motion

- Respect `prefers-reduced-motion` media query
- Some animations should be disabled for accessibility

---

## Production Tips

1. **Test Early**: Check color combinations on actual devices
2. **Contrast Check**: Use tools like WebAIM Contrast Checker
3. **Performance**: Glow effects can be CPU intensive - optimize for mobile
4. **Theme Consistency**: Use the same color for same interaction types
5. **Feedback**: Use color changes to provide visual feedback on interactions

---

## Color Breakdown by Tailwind Class

### Text Colors

```
text-y2k-cyan          text-y2k-cyan-bright    text-y2k-cyan-dark
text-y2k-aqua          text-y2k-sky-blue       text-y2k-blue
text-y2k-blue-dark     text-y2k-purple         text-y2k-pink
text-y2k-pink-bright   text-y2k-lime           text-y2k-lime-bright
text-y2k-silver        text-y2k-chrome         text-y2k-white
```

### Background Colors

```
bg-y2k-cyan            bg-y2k-pink             bg-y2k-lime
bg-y2k-purple          bg-y2k-blue             bg-y2k-silver
bg-y2k-white           [+ opacity modifiers: /5, /10, /20, /30, /40, /50, /60, /70, /80]
```

### Border Colors

```
border-y2k-cyan        border-y2k-pink         border-y2k-lime
border-y2k-purple      border-y2k-blue         border-y2k-silver
border-y2k-white       [+ opacity modifiers]
```

### Shadow/Glow

```
shadow-glow-cyan       shadow-glow-cyan-lg     shadow-glow-pink
shadow-glow-pink-lg    shadow-glow-lime        shadow-glow-purple
shadow-glass           shadow-glass-lg         shadow-chrome
```
