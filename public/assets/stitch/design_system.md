# Design System: Obsidian Flux
**ID**: asset-stub-assets_2c1567a70dfa4eeab8623633ef9c387d

## Brand & Style

This design system is built on a "Cinematic Futurist" narrative. It targets high-end technology, web3, and creative professional platforms that require an atmosphere of precision, depth, and premium performance. The visual language balances the void-like depth of deep obsidian backgrounds with the vibrant energy of neon light.

The style is a refined evolution of Glassmorphism. Instead of chaotic transparency, it utilizes "Controlled Diffusion"—highly polished glass surfaces with micro-borders and subtle backdrop blurs that suggest physical layers of light and data. The emotional response is one of calm authority, cutting-edge innovation, and immersive focus. High-depth shadows and glowing edges create a sense of three-dimensional space, drawing inspiration from the technical rigor of Linear and the aesthetic polish of Stripe.

## Colors

The palette is centered around a "True Dark" foundation. 

- **Primary (Electric Blue):** Used for primary actions, focused states, and high-priority indicators.
- **Secondary (Phlox Purple):** Used for accents, specialized highlights, and data visualization depth.
- **Tertiary (Cyber Cyan):** Used for success states, active connectivity indicators, and subtle highlights.
- **Neutrals:** The background is a strict `#050505` to ensure maximum contrast with glowing elements. Surfaces use `#0D0D0D` with varying levels of opacity to create the glass effect.

Gradients should be used sparingly, primarily as "light leaks" from the top-left or as subtle linear strokes on the edges of cards.

### Theme Colors
- **background**: `#131313`
- **error**: `#ffb4ab`
- **error_container**: `#93000a`
- **inverse_on_surface**: `#313030`
- **inverse_primary**: `#0058cb`
- **inverse_surface**: `#e5e2e1`
- **on_background**: `#e5e2e1`
- **on_error**: `#690005`
- **on_error_container**: `#ffdad6`
- **on_primary**: `#002d6f`
- **on_primary_container**: `#002661`
- **on_primary_fixed**: `#001945`
- **on_primary_fixed_variant**: `#00429c`
- **on_secondary**: `#520071`
- **on_secondary_container**: `#480063`
- **on_secondary_fixed**: `#320047`
- **on_secondary_fixed_variant**: `#74009f`
- **on_surface**: `#e5e2e1`
- **on_surface_variant**: `#c2c6d8`
- **on_tertiary**: `#00363a`
- **on_tertiary_container**: `#002f33`
- **on_tertiary_fixed**: `#002022`
- **on_tertiary_fixed_variant**: `#004f54`
- **outline**: `#8c90a1`
- **outline_variant**: `#424655`
- **primary**: `#b0c6ff`
- **primary_container**: `#568dff`
- **primary_fixed**: `#d9e2ff`
- **primary_fixed_dim**: `#b0c6ff`
- **secondary**: `#ecb2ff`
- **secondary_container**: `#cf5cff`
- **secondary_fixed**: `#f8d8ff`
- **secondary_fixed_dim**: `#ecb2ff`
- **surface**: `#131313`
- **surface_bright**: `#3a3939`
- **surface_container**: `#201f1f`
- **surface_container_high**: `#2a2a2a`
- **surface_container_highest**: `#353534`
- **surface_container_low**: `#1c1b1b`
- **surface_container_lowest**: `#0e0e0e`
- **surface_dim**: `#131313`
- **surface_tint**: `#b0c6ff`
- **surface_variant**: `#353534`
- **tertiary**: `#00dbe9`
- **tertiary_container**: `#00a0aa`
- **tertiary_fixed**: `#7df4ff`
- **tertiary_fixed_dim**: `#00dbe9`

## Typography

The typographic hierarchy prioritizes technical clarity and high-contrast impact. 

- **Headlines:** Use Geist for its technical, precision-engineered feel. Headlines should have tighter letter-spacing to feel "locked-in" and cinematic.
- **Body:** Inter provides maximum legibility for long-form content and data. It remains neutral to allow the headlines and accents to shine.
- **Data/Labels:** JetBrains Mono is used for small labels, metadata, and technical readouts. The monospace nature reinforces the futuristic, developer-adjacent aesthetic. Always use increased letter-spacing for uppercase labels to ensure readability on dark backgrounds.

### Typography Specifications
- **display-lg**: FontFamily: Geist, FontSize: 64px, FontWeight: 700, LineHeight: 1.1, LetterSpacing: -0.04em
- **headline-lg**: FontFamily: Geist, FontSize: 40px, FontWeight: 600, LineHeight: 1.2, LetterSpacing: -0.02em
- **headline-lg-mobile**: FontFamily: Geist, FontSize: 32px, FontWeight: 600, LineHeight: 1.2, LetterSpacing: -0.02em
- **headline-md**: FontFamily: Geist, FontSize: 24px, FontWeight: 600, LineHeight: 1.3, LetterSpacing: -0.01em
- **body-lg**: FontFamily: Inter, FontSize: 18px, FontWeight: 400, LineHeight: 1.6, LetterSpacing: 0em
- **body-md**: FontFamily: Inter, FontSize: 16px, FontWeight: 400, LineHeight: 1.5, LetterSpacing: 0em
- **label-md**: FontFamily: JetBrains Mono, FontSize: 14px, FontWeight: 500, LineHeight: 1.4, LetterSpacing: 0.05em
- **label-sm**: FontFamily: JetBrains Mono, FontSize: 12px, FontWeight: 500, LineHeight: 1.4, LetterSpacing: 0.05em

## Layout & Spacing

This design system utilizes a **Fluid Grid** model with high-breathability. 

- **Desktop:** 12-column grid with 24px gutters. Large 64px outer margins to create a "letterboxed" cinematic feel.
- **Tablet:** 8-column grid with 24px gutters and 40px margins.
- **Mobile:** 4-column grid with 16px gutters and 20px margins.

Spacing follows a linear 4px/8px base. For vertical rhythm between sections, use `2xl` and `3xl` values to maintain a sense of luxury and whitespace. Content should be grouped in glass containers to maintain structural integrity against the deep background.

### Spacing Specifications
- **unit**: 4px
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 40px
- **2xl**: 64px
- **3xl**: 104px
- **gutter**: 24px
- **margin-mobile**: 20px
- **margin-desktop**: 64px

## Elevation & Depth

Depth is the primary communicator of hierarchy. It is achieved through three specific layers:

1.  **The Void (Level 0):** The `#050505` background. Everything emerges from here.
2.  **Glass Plates (Level 1):** Surfaces using `#ffffff05` fill with a `20px` backdrop blur. These require a `1px` solid border at `#ffffff15` to define their edges.
3.  **Floating Elements (Level 2):** High-priority modals or popovers. These use a darker fill (`#0D0D0D`) with a `0px 20px 40px rgba(0,0,0,0.8)` shadow and a subtle top-down "inner glow" border.

**Edge Lighting:** For active elements, apply a 1px linear gradient border transitioning from the primary color to transparent. This "glowing edge" signifies focus without the need for heavy fills.

## Shapes

The shape language is "Modern Geometric." 

- **Base Radius (0.5rem):** Used for standard buttons, inputs, and small cards.
- **Large Radius (1rem):** Used for main content containers and sections.
- **Extra Large Radius (1.5rem):** Reserved for large hero sections or immersive "glass plates."

Avoid full pill shapes (circles) except for avatars or specialized status badges. The geometry should feel structural and intentional, mirroring high-end hardware design.

## Components

### Buttons
- **Primary:** Gradient fill (Primary to Secondary) with white text. High-depth shadow that inherits the primary color (glow effect).
- **Secondary:** Glass background (`#ffffff10`) with a white 1px border.
- **Ghost:** No background, primary color text, 0.02em letter spacing.

### Inputs
Fields should have a dark, semi-transparent fill (`#ffffff05`) and a subtle bottom border. On focus, the border animates to the primary color and a faint glow appears behind the input.

### Chips/Badges
Small, monospaced text (Label-sm) inside a low-opacity glass container. For status (Success/Error), use a 4px glowing dot next to the text rather than a full color background.

### Cards
Cards are the "Glass Plates" described in the Elevation section. They should not have flat background colors; instead, they rely on backdrop blur and micro-borders. Use "Spotlight" hover effects where a subtle radial gradient follows the cursor behind the glass.

### Lists
List items should be separated by thin, 10% opacity white lines. Active items should use a vertical 2px "light bar" on the left edge in the primary color.
