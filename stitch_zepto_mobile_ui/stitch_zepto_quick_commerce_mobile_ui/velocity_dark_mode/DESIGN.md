---
name: Velocity Dark Mode
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#ccc3d3'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#968e9d'
  outline-variant: '#4a4451'
  surface-tint: '#d6baff'
  primary: '#d6baff'
  on-primary: '#410d80'
  primary-container: '#3b007a'
  on-primary-container: '#a77cea'
  inverse-primary: '#7247b1'
  secondary: '#ffb3b1'
  on-secondary: '#680011'
  secondary-container: '#a90022'
  on-secondary-container: '#ffb3b0'
  tertiary: '#00dce5'
  on-tertiary: '#003739'
  tertiary-container: '#003032'
  on-tertiary-container: '#00a1a8'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ecdcff'
  primary-fixed-dim: '#d6baff'
  on-primary-fixed: '#280056'
  on-primary-fixed-variant: '#592d98'
  secondary-fixed: '#ffdad8'
  secondary-fixed-dim: '#ffb3b1'
  on-secondary-fixed: '#410007'
  on-secondary-fixed-variant: '#92001c'
  tertiary-fixed: '#63f7ff'
  tertiary-fixed-dim: '#00dce5'
  on-tertiary-fixed: '#002021'
  on-tertiary-fixed-variant: '#004f53'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 12px
  margin-mobile: 16px
  margin-desktop: 24px
  stack-xs: 4px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

This design system is engineered for ultra-fast commerce, prioritizing speed, precision, and a premium "after-hours" aesthetic. The brand personality is energetic and reliable, designed to feel like a high-performance engine running in the background of the user's life.

The visual style is **High-Contrast / Modern Dark**, utilizing deep charcoal backgrounds to allow vibrant neon accents and product imagery to pop with intensity. It borrows elements from Glassmorphism for depth—specifically for floating action bars and time-critical badges—while maintaining a strict, dense grid for efficiency. The emotional response is one of instant gratification, modern convenience, and technological sophistication.

## Colors

The palette is optimized for OLED displays and high-energy interaction.

- **Primary (Zepto Purple):** Used for primary actions, branding elements, and progress indicators.
- **Secondary (Neon Magenta/Pink):** Reserved for urgency, "10-minute" timing badges, and flash sales.
- **Accent (Electric Cyan):** A tertiary highlight for success states and price-drop notifications.
- **Backgrounds:** The foundation is a pure `#121212` charcoal. Card surfaces use a slightly lighter `#1E1E1E` to create distinct layering without losing the deep-space feel.
- **Gradients:** Use linear gradients from Purple to Magenta (45-degree angle) for high-impact promotional banners and CTA buttons.

## Typography

The typography system uses **Plus Jakarta Sans** for its modern, geometric construction and high legibility at small sizes. 

- **Weight Strategy:** Use Bold (700) and ExtraBold (800) for headlines to convey confidence and speed. 
- **Functional Labels:** Product prices and delivery times utilize the Label-LG and Label-SM roles with tight tracking to maximize horizontal space in dense lists.
- **Contextual Scaling:** On mobile devices, headlines scale down to prevent excessive line-breaking in product descriptions while maintaining a strong visual anchor.

## Layout & Spacing

The layout is a **fluid grid** system designed for high density. On mobile, it utilizes a 4-column structure; on desktop, a 12-column structure.

- **Density:** To emphasize speed, the layout minimizes whitespace in favor of information density. Products are often displayed in a 2 or 3-column grid on mobile.
- **Safe Margins:** A 16px margin is maintained on mobile edges to ensure content doesn't bleed into hardware bezels.
- **Rhythm:** All spacing is based on a 4px base unit. Component internal padding should default to 12px (3 units) or 16px (4 units) to balance density with tap-target accessibility.

## Elevation & Depth

In this dark-mode system, depth is communicated through **Tonal Layers** and **Glassmorphism** rather than traditional heavy shadows.

- **Z-Index 1 (Base):** The #121212 background.
- **Z-Index 2 (Cards):** #1E1E1E surfaces with a subtle 1px stroke (10% white) to define boundaries.
- **Z-Index 3 (Overlays):** 10-minute delivery badges use a semi-transparent Magenta (#E23744 with 80% opacity) with a 12px backdrop-blur.
- **Shadows:** Use a faint, localized Purple glow (#3B007A at 20% opacity) for primary active buttons to simulate light emission from the UI itself.

## Shapes

The shape language is defined by **Rounded (0.5rem / 8px - 12px)** corners, balancing a friendly consumer feel with the precision of a modern tech platform.

- **Base Corner Radius:** 12px for product cards and main containers.
- **Component Radius:** 8px for smaller items like input fields and quantity selectors.
- **Interactive Radius:** Buttons and timing badges can utilize "pill-shaped" (Full Round) styling to distinguish them from structural content containers.

## Components

### Buttons
- **Primary:** High-impact gradient (Purple to Magenta). Text is white, Bold.
- **Secondary:** Ghost style with a 1.5px Purple border or a subtle gray fill.
- **Add to Cart:** A dedicated "stepper" component. Starts as a pill-shaped button; on click, expands into a - [Qty] + controller.

### 10-Minute Delivery Badges
The signature component of the system.
- **Style:** Neon Magenta background, white Bold text.
- **Visuals:** Usually placed in the top-left or bottom-right of product images. Uses a clock icon for immediate recognition.

### Product Cards
- **Structure:** 12px rounded corners. Image at the top (70% height), info at bottom.
- **Density:** High-density text (Brand, Name, Weight, Price). Price is always Bold and high-contrast.

### Chips & Filters
- **Active State:** Purple background with white text.
- **Inactive State:** Dark gray (#2A2A2A) with light gray text. 

### Input Fields
- **Search Bar:** Large, pill-shaped, #1E1E1E background. Incorporates "Search for 'Milk'" as a persistent placeholder.