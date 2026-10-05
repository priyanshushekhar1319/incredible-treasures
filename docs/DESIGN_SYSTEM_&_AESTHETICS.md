# Design System & Aesthetic Architecture
## Inspired by Taste Skill, ThreeUI, GSAP & 21st.dev

This document establishes the design principles and component standards for **Incredible Treasures**, ensuring a luxury aesthetic that surpasses legacy platforms like Vistaprint.

---

## 🎨 1. Brand Visual Identity

| Token | Value | Description |
| :--- | :--- | :--- |
| **Primary Gold** | `#D4AF37` / `#C59B27` | Pure metallic gold for key accents, CTAs, and foil borders |
| **Gold Highlight** | `#F3E5AB` / `#FFF8DC` | Soft champagne gold for subtle glows and hover borders |
| **Obsidian Black** | `#0A0A0A` / `#0E100F` | Deep luxury charcoal-black base (avoids generic blue/grey) |
| **Surface Dark** | `#141414` / `#1F1F1F` | Elevated card and container background |
| **Pearl White** | `#FBFBFA` / `#FFFFFF` | Crisp contrast for editorial typography and light elements |

---

## 🏛️ 2. Core Framework References & Implementation

### A. [Taste Skill](https://www.tasteskill.dev/) — *Anti-AI-Slop Frontend Standard*
- **Editorial Typography:** High-contrast luxury pairings (`Clash Display` / `Cinzel` / `Outfit` + `Inter Display`).
- **Layered Surfaces:** Subtle borders (`border-white/10` and `border-gold/20`) with noise textures instead of flat gray borders.
- **Zero Placeholder Discipline:** Production-grade content, accurate Bangalore context, no generic filler.

### B. [ThreeUI](https://threeui.com/browse?sort=recent) — *WebGL 3D Interactive Showcases*
- **3D Card Tilt on Hover:** Physical card perspective with real GSM paper thickness.
- **Realistic Lighting Shaders:** Specular glare calculation showing the difference between **Matte** (soft/diffused) and **Glossy** (reflective shine).
- **Interactive 3D Mockup Preview:** Allows customers to rotate double-sided business cards in 3D before checkout.

### C. [GSAP (GreenSock)](https://gsap.com/) — *60 FPS Micro-Interactions*
- **Magnetic Buttons:** Cursor attraction effect on primary "Customize" and "Order Now" buttons.
- **Dynamic Price Flip Counter:** Smooth number ticker transition when switching from 100 to 500 cards.
- **ScrollTrigger:** Cinematic card fan-out and unboxing animations on scroll.

### D. [21st.dev](https://21st.dev/) — *Crafted React & Tailwind Components*
- **Bento Grid Showcase:** Modern product feature layout (Visiting Cards, Metal NFC Cards, Luxury Gift Boxes).
- **Floating Studio Dock:** macOS-style bottom action bar for canvas controls (Text, Logo, Shapes, Layers).
- **Tactile Volume Selector:** Interactive pill-cards with live savings badges (*"Save 35%"*).
