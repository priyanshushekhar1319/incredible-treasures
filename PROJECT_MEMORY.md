# INCREDIBLE TREASURES - MASTER PROJECT MEMORY & CONTINUATION RECORD
**Workspace:** `C:\Users\priya\.antigravity\incredible-treasures`  
**Dev Server URL:** `http://localhost:3000`

---

## 🔒 1. PERMANENT CLIENT RULES & NON-NEGOTIABLES

### A. Strict Prohibition: NO Bottles, Sippers, or Flasks
- **Rule:** Incredible Treasures **DOES NOT SELL BOTTLES OR FLASKS**.
- Under no circumstances will bottles, flasks, sippers, or tumblers appear anywhere in catalog products, search placeholders, mega menus, banners, testimonials, or copy.
- The Mugs category is **100% pure Ceramic Coffee Mugs only** (350ml Grade-A ceramic: Classic White, Two-Tone, Executive Matte Black, Custom Photo Mug).

### B. Visiting Cards: Exact Same Size & Name
- **Uniform Dimensions:** Every visiting card in the catalog grid and design studio has the exact same standard 3.5" × 2" aspect ratio (`aspect-[1.75/1]`), matching padding, identical corner radius, and realistic studio elevation drop shadows.
- **Uniform Name:** Every card displays the exact same name: **"Mahi Kapoor"** (Managing Director).
- **Substrate Variety Preserved:** While size and name are identical, each card accurately showcases its material finish:
  1. Regular Glossy PVC (high-gloss white + red/slate branding + specular gloss reflection)
  2. Regular Matt PVC (deep royal velvet silk purple/navy)
  3. Brushed Silver Metallic (horizontal brushed aluminum grain + RFID badge)
  4. Rainbow Holographic (prismatic iridescent pastel rainbow gradient)
  5. Transparent Clear Frosted (semi-translucent frosted glass acrylic)
  6. Gold / Silver Glitter (champagne gold metallic glitter grain)
  7. 3D Embossed PVC (tactile raised 3D lettering + smart chip)
  8. Matt + Stamped Hot Foiling (obsidian black with gleaming 3D metallic gold foil)
  9. Matt + Raised Spot UV (satin black/gold with clear varnish reflections)
  10. Paper Cards (3D Raised Gold Foil, Royal Velvet Soft-Touch, Silk Matte)

### C. Hero Banner: Pure Cinematic Editorial One-Page Style
- **Full-Bleed Widescreen:** Banner spans 100% edge-to-edge full width directly below the navigation bar (`h-[calc(100vh-120px)] min-h-[540px] max-h-[860px]`).
- **No Clutter:** 
  - Zero German/foreign words (NO `kaufen`, NO `kollektion`).
  - Zero "gucci" text or split-mode toggles (single cinematic presentation only).
  - Zero top pill tags (`EXECUTIVE STATIONERY`, `100 GSM Royal Bond` removed).
  - Zero numerical slide counters (`01 / 05` removed).
- **Luxury Elements:** Large serif headlines, clean subtitle, single luxury **`[ SHOP NOW ]`** CTA button, circular glassmorphism `<` and `>` arrows, and floating bottom category switcher pills (`Visiting Cards`, `Letterheads`, `Ceramic Mugs`, `Packaging & Labels`, `Apparel & Polos`).
- **Rotation:** Smooth 6-second auto-rotation across all 5 core products with hover pause.

### D. Header & Navigation Architecture
- **Top Utility Bar:** Permanently removed (`Upload Ready Design | Track Order | Sign In`).
- **Promo Ribbon:** Permanently removed (`Buy More, Save More...`).
- **Header Actions:** Clean layout with Official Brand Logo (`/images/logo-transparent.png`), centered omnibar search with instant live typeahead, and right-side action buttons:
  - **`[ Sign In ]`** with user icon placed **directly beside `[ Cart ]`**.
  - **`[ Cart (count) ]`** badge button.

---

## 🛠️ 2. REPOSITORY & RUNTIME CONFIGURATION
- **Framework:** Next.js 16 (App Router) with Turbopack.
- **Styling:** Tailwind CSS with rich custom gradients, glassmorphism, and responsive breakpoints.
- **Port:** Local `http://localhost:3000` (Network `http://192.168.29.137:3000`).
- **Shell Rule:** Always execute npm commands via `cmd /c npm <command>` to avoid PowerShell `PSSecurityException`.
- **Key File Locations:**
  - Storefront Page: `src/app/page.tsx`
  - Products Catalog Data: `src/data/products.ts`
  - Client Curated Products: `src/data/client_curated_products.json`
  - Public Assets: `public/images/` (contains all banners, logos, and product assets).

---

## ✨ 3. DUAL-SIDED PERSONALIZATION PLACEMENT ENGINE (COMPLETED)
- **Granular Front / Back / Both Placement:** Every single personal and corporate detail field (Company Name, Full Name, Designation, Phone, Email, Website, Address) has interactive 1-click segmented toggle controls (`[ Front ] [ Back ] [ Both ]`).
- **Live Sync on Both Faces:**
  - Selecting **`Back`** removes the field from Side A (Front) and dynamically renders it on Side B (Back).
  - Selecting **`Both`** displays the field on both Side A and Side B.
  - Selecting **`Front`** restores it to Side A.
- **Applied Universally:** Supported on all 9 PVC finishes, ceramic mugs, corporate apparel, letterheads, packaging labels, and luxury paper visiting cards.
- **Cart & Invoice Sync:** Cart specs automatically record customer name placement (e.g. `Name on Back: Mahi Kapoor`).

---

## 🔄 4. CARD ORIENTATION ENGINE: HORIZONTAL VS VERTICAL (COMPLETED)
- **Minimalist Professional Controls:** Eliminated bulky text boxes or conversational copy. Directly integrated clean segmented pill controls in the studio bar:
  - `[ Horizontal | Vertical ]` selector placed seamlessly next to `[ Corners: Square/Rounded ]`.
- **Dynamic Dual-Side Adaptation:**
  - **Horizontal:** Standard 3.5" × 2.0" landscape visiting card proportion (`aspect-[1.65/1]`).
  - **Vertical:** Modern 2.0" × 3.5" portrait executive badge proportion (`aspect-[1/1.65]`).
  - Both Side A (Front) and Side B (Back) smoothly transform without UI clutter.
- **Cart & Invoice Persistence:** Selection persists to cart specs (e.g. `VERTICAL Layout • Orientation: Vertical (Portrait)`).

---

## 🔍 5. GOOGLE LENS & INDIAMART VISUAL SEARCH ENGINE (COMPLETED)
- **Direct Search Bar Integration:**
  - **Desktop Omnibar:** Embedded high-contrast Camera Lens button with tooltip and `Lens` badge right inside the search bar.
  - **Mobile Header:** Dedicated Camera button placed directly beside the mobile search icon for 1-tap mobile camera and file access.
- **Image & PDF Document Support:**
  - Drag-and-drop zone + native file browser supporting PNG, JPG, WebP, and print-ready PDF vector documents up to 15MB.
  - Curated 1-click test chips: `[ Visiting Card ] [ Ceramic Mug ] [ Corporate Polo ] [ Packaging Label ] [ Artwork PDF ]`.
- **Dynamic Laser Scanning Animation:**
  - Real-time vertical laser scanning beam (`@keyframes visualLaserScan`) sweeping across the uploaded artwork/document preview.
  - Status indicator: "Scanning visual patterns, dimensions & substrate finishes...".
- **Instant Catalog Matching & Studio Handoff:**
  - Matches user's upload against catalog products with confidence percentage badges (e.g. `98% Visual Match: 400 Micron Glossy PVC Visiting Card`).
  - **`[ Customise in Studio → ]`**: Instantly opens the 3D studio with the matched product loaded AND applies the user's uploaded artwork directly onto Side A (Front) of the live preview.
  - **`[ Quick Specs ]`**: Opens product specifications overlay.

---

## 🎙️ 6. GOOGLE & INDIAMART VOICE SEARCH ENGINE (COMPLETED)
- **Omnibar & Mobile Header Microphone:**
  - **Desktop Omnibar:** Embedded emerald `[ 🎤 Voice ]` trigger button next to `[ 📷 Lens ]` right inside the search bar.
  - **Mobile Header:** Dedicated `[ 🎤 Mic ]` button directly beside `[ 📷 Camera ]` and `[ 🔍 Search ]`.
- **Real-Time Web Speech API Recognition:**
  - Continuous listening with pulsing emerald microphone circle and 5-bar animated equalizer audio wave (`@keyframes voiceWave`).
  - Graceful fallback with 1-click test prompts: `[ "Visiting Cards" ] [ "Custom Mugs" ] [ "Executive Letterheads" ] [ "Corporate T-Shirts" ] [ "Packaging Labels" ] [ "Regular Glossy PVC" ]`.
- **Smart Voice Intent Recognition & Routing:**
  - *"I want to see the visiting card"* / *"visiting cards"* -> Automatically activates Visiting Cards category, scrolls directly to catalog grid, displays toast confirmation: `Voice recognized: "I want to see the visiting card" → Opening Visiting Cards`.
  - *"Show me the mugs"* / *"the mugs"* / *"coffee mugs"* -> Opens Custom Ceramic Mugs category and scrolls to catalog.
  - *"Letterheads"* -> Opens Executive Letterheads category.
  - *"T-shirts"* / *"polo"* -> Opens Corporate T-Shirts category.
  - *"Packaging labels"* -> Opens Labels & Packaging category.
  - Specific product names (e.g. *"Regular Glossy PVC Visiting Card"*) -> Opens product details/studio directly.

---

## 🎨 7. BRAND LOGO COLOR UNIFICATION (GOLD THEME - COMPLETED)
- **Dominant Logo Color Extraction:**
  - Analyzed `public/images/logo-transparent.png` with Pillow to identify the exact corporate gold: `#a9782b` (`rgb(169, 120, 43)`).
  - Derived harmonious luxury corporate palette:
    - Primary CTA / Accent: `#a9782b`
    - Deep Gold (Hover / Text): `#8e621e`
    - Dark Bronze (Badge Text): `#734d15`
    - Champagne Sand (Badge & Pill Backgrounds): `#faf6ee`
    - Soft Gold Border: `#ead5b3`
    - Luminous Gold Accent: `#cba768`
- **Tailwind v4 Theme Variable Scale Mapping:**
  - Configured `@theme` in `globals.css` to redefine the entire `--color-emerald-*` spectrum to the logo gold scale.
  - Automatically converted all 540+ emerald references (e.g. `bg-emerald-600`, `text-emerald-700`, `border-emerald-200`) to brand gold.
- **Component & Hex Cleansing:**
  - All `Select →` catalog buttons now render in exact `#a9782b` logo gold.
  - Search Omnibar `Voice` & `Lens` buttons, Voice Modal equalizer waves, and Lens scan lines match logo gold.
  - Studio customization quantity tiers, proof badges, and WhatsApp quotation buttons match logo gold.
  - Text selection in `layout.tsx` updated to `selection:bg-[#a9782b]`.
  - B2B Bulk banner updated from forest green to deep obsidian bronze gradient (`from-slate-950 via-[#261b0d] to-slate-950`).
  - Zero unwanted green hexes remaining across the entire codebase.

---

## 📐 8. ZERO-SCROLL STUDIO ERGONOMICS & REFERENCE CARDS SHOWCASE (COMPLETED)
- **Zero-Scroll Studio Layout (Eye-Level Dual Pane):**
  - **Left Pane (`xl:col-span-7 xl:sticky xl:top-24`):**
    - High-performance live canvas rendering Front (Side A) & Back (Side B) side-by-side.
    - Quick artwork upload buttons (`Upload Front`, `Upload Back`, `Upload Brand Logo`).
    - Trust badges (`100% Quality`, `Express Dispatch`, `Both Sides Proof`) docked directly underneath.
    - Sticky positioning ensures card previews remain continuously visible while editing.
  - **Right Pane (`xl:col-span-5`):**
    - `Live Personalization & Contact Details` moved to the top of the right column at direct eye level.
    - 2-column ergonomic form (Company, Full Name, Designation, Phone, Email, Website, Office Address).
    - `[Front] [Back] [Both]` placement switches immediately update the sticky canvas on the left.
    - Instant live preview sync with zero vertical scrolling up and down.
    - Directly below the form: Live Price banner (`₹12.50 / card`, `Batch Total`), Quantity Tier Selector (`200 pcs`, `500 pcs`, `1000 pcs`), Instant WhatsApp Quote, and Add to Cart button.
- **Reference Cards & Material Showcase (Replaced Reviews Section):**
  - Removed customer reviews section from the product detail page per user requirement.
  - Implemented **"Explore Different Types of Visiting Cards & Finishes"** reference showcase.
  - 12 Corporate Card Substrates:
    - `pvc-regular-glossy` (400 Micron White PVC High Gloss)
    - `pvc-regular-matt` (400 Micron White PVC Silk Matt)
    - `pvc-brushed-silver` (400 Micron Brushed Silver Metallic)
    - `pvc-rainbow` (400 Micron Rainbow Iridescent Holographic)
    - `pvc-transparent` (400 Micron Crystal Clear Frosted Polypropylene)
    - `pvc-glitter` (400 Micron Gold/Silver Glitter Luxury Resin)
    - `pvc-embossed` (400 Micron Raised 3D Relief Characters)
    - `pvc-matt-foiling` (400 Micron Matt PVC with Mirror Gold Hot Foil)
    - `pvc-matt-spot-uv` (400 Micron Matt PVC with Raised Clear Spot UV)
    - `gold-foil-cards` (400 GSM Velvet Cardstock Raised Gold Foil)
    - `visiting-cards` (350 GSM European Art Card Matt Lamination)
    - `royal-matte-cards` (400 GSM Royal Velvet Soft Touch)
  - Interactive Filter Tabs: `[ All Card Types (12) ] [ Gloss & Matt PVC ] [ Metallic & Rainbow ] [ Foil Stamp & Spot UV ] [ Clear & Frosted ] [ Embossed & Smart ]`.
  - 1-Click Studio Handoff: `[ Customise → ]` loads that card into the Live Studio and scrolls smoothly to the editor.
  - **Physical Substrate Comparison Guide Table:**
    - Technical matrix comparing Thickness, Surface Finish, Durability, Best Corporate Use Case, and Rate per unit.
    - 1-click `[ Order Physical Sample Kit ]` WhatsApp CTA button.

---

## 🧭 9. CLEAN NAVIGATION MEGA-MENUS: PRODUCTS ONLY (COMPLETED)
- **Zero Price Clutter in Navbar:**
  - Removed all price pills (e.g., `₹9.75`, `₹12.50`, `₹15.00`, `₹20.50`), tax badges (`INCL. GST`, `+18% GST`), and promotional pricing notes (`✓ All 9 PVC rates include...`, `FROM ₹...`) from all mega-dropdown menus.
  - Applied across all 5 navigation categories: **Visiting Cards**, **Letterheads**, **Ceramic Mugs**, **Labels & Packaging**, and **Corporate T-Shirts**.
- **Pure Product Presentation:**
  - Mega-menus now function as high-end corporate directories displaying only product names, material types, and technical specifications.
  - Prices are reserved exclusively for the Product Detail Page and Catalog Cards where quantity tiers and bulk discounts belong.
- **Interactive Navigation Improvements:**
  - Clicking any product title in the mega-menu automatically selects the product and closes the dropdown menu (`setActiveDropdown(null)`).

---

---

## 📱 10. DAY 10: SHAPE LIBRARY & LIVE DYNAMIC QR CODE GENERATOR (COMPLETED)
- **Dynamic QR Code Generator Engine:**
  - Integrated `qrcode` SVG vector generation with level M error correction for maximum smartphone scan fidelity.
  - Multi-purpose QR modes:
    1. **UPI Payment QR:** Real-time `upi://pay` generation with payee name and instant bank suffixes (`@okhdfcbank`, `@okicici`, `@paytm`, `@ybl`).
    2. **WhatsApp Direct Chat:** Generates `wa.me/91...` link with pre-filled greeting message.
    3. **Digital vCard Contact Card:** Encodes Full Name, Company, Designation, Phone, Email, and Website into standard vCard 3.0 format for 1-tap phone address book imports.
    4. **Website / Portfolio URL:** Custom website link generation.
    5. **Google Review Link:** Direct 5-star Google Maps review link generator.
  - Placement & Styling:
    - Master ON/OFF toggle switch.
    - Side placement selector: `[ Front ]`, `[ Back ]`, `[ Both ]`.
    - Corner positioning: Bottom-Right, Bottom-Left, Center, Top-Right.
    - Color swatch controls (Brand Gold `#A9782B`, Slate `#0F172A`, Navy `#1E3A8A`, White `#FFFFFF`).
    - Real-Time Phone Scanner Verification Preview banner showing decoded payload and 100% scan readiness badge.
- **Vector Shape & Divider Library:**
  - 1-Click geometric shape presets:
    - `Horizontal Gold Divider Line` (hairline / adjustable thickness divider)
    - `Vertical Column Separator`
    - `Executive Role Pill Badge` (rounded tag with custom text)
    - `Luxury Border Frame` (perimeter inset frame)
    - `Edge Accent Stripe` (margin brand bar)
    - `Corporate Seal Ring` (circular badge)
  - Active layer management: Select shape layer, adjust thickness, style (Solid, Dashed, Dotted), opacity, color, and side placement.
- **Card Preview & Cart Synchronization:**
  - `CardQrAndShapesOverlay` rendered across both Front (Side A) and Back (Side B) canvas views.
  - Added to cart specification line items (e.g. `• Live UPI QR (back) • 1 Vector Shape(s)`).

---

---

## 🎨 11. CANVA-STYLE VISITING CARD STUDIO TRANSFORMATION (COMPLETED)
- **Zero Rigid Form Fields:** Eliminated rigid inputs and static slots; replaced with 100% freeform direct manipulation on the card canvas.
- **Canva Left Tool Strip:**
  - `[ 📄 Templates ]`: 1-Click starter layouts (Executive Royal Gold, Modern Tech Founder, Doctor Specialist, Blank Canvas).
  - `[ 🔤 Text ]`: `+ Add a Heading`, `+ Add a Subheading`, `+ Add Little Bit of Body Text`, plus quick tags (Doctor Reg No, GSTIN, Timings, Tagline).
  - `[ ⬡ Elements ]`: Gold dividers, vertical separators, role pill badges, and luxury frames.
  - `[ 📱 QR Codes ]`: UPI Payment QR (`upi://pay`), WhatsApp Direct QR, Digital vCard, Website link.
  - `[ 📤 Uploads ]`: Drop logo or artwork directly onto the card canvas.
  - `[ 💎 Material ]`: 10 Physical card substrates (Glossy PVC, Silk Matt PVC, Brushed Silver, Rainbow Holographic, Gold Foil, Spot UV, Velvet Cardstock).
- **Canva Context-Aware Top Toolbar:**
  - Dynamically adapts based on the active selection: Google fonts picker, font size stepper, color palette, Bold/Italic/Underline/Uppercase, alignment, letter spacing, duplicate, and delete.
  - Global card controls when nothing is selected (Orientation: Landscape/Portrait, Corners: Square/Rounded, Card Base color, Print Safe Lines toggle).
- **Interactive Drag-and-Drop Canvas with Print Guidelines:**
  - Direct pointer-based dragging anywhere on the card.
  - Bounding box with selection ring and floating action pill (`[ Duplicate ] [ Delete ]`).
  - Magnetic center snapping guides (`|` and `―`).
  - Print Safety Boundaries: Outer Bleed line (2mm), mechanical Cut Trim line, and inner Safe Zone box with real-time blade warning if elements are dragged too close to the cut edge.
  - Page Switcher (Side A • Front Face / Side B • Back Face).

---

---

## 🌟 12. PRO STUDIO TRANSFORMATION & ADVANCED FEATURES (COMPLETED)
- **Milky White & Warm Ivory Luxury Workspace:**
  - Workspace re-themed to `#FAF8F5` / `#F8F6F0` milky ivory with soft `#F2EFE9` desk backdrop, crisp white card canvas, and official brand gold `#A9782B` accents.
- **✨ Selective Foil & Spot UV Finishes:**
  - Element-wise special effects selector for text, vector shapes, and icons:
    - `🟡 24K Gold Foil` (metallic gold gradient with specular gleam)
    - `⚪ Silver Chrome Foil` (liquid platinum chrome sheen)
    - `🌸 Rose Gold Foil` (luxury blush copper foil sheen)
    - `💎 Raised Spot UV` (clear 3D high-gloss lacquer emboss with drop shadow)
    - `Standard Ink` (crisp flat print)
- **🔄 3D Flip Card Turnaround:**
  - Interactive `[ 3D Flip Card 🔄 ]` action with realistic 3D perspective turnaround (`rotateY(180deg)`), card edge rim emulation (400-micron depth), and seamless front/back switching.
- **🎨 100+ Pro Vector Icon & Badge Library:**
  - Dedicated `[ Icons ]` sidebar tab featuring SVG vector symbols:
    - Contact: Phone, WhatsApp, Email, Website, Map Pin, LinkedIn, Instagram, Twitter/X.
    - Luxury & Trust: Royal Crown, Luxury Diamond, Certified Award, 5-Star Rating, Guarantee Shield, Gold Hallmark.
    - Business & Corporate: Executive Suite, Headquarters, Finance/Growth, Payment Accepted, GST Tag, Partner.
    - Medical & Healthcare: Doctor Stethoscope, Cardio Pulse, Clinic Red Cross, Diagnostics.
- **🗂️ Canva Pro Layers Panel:**
  - Dedicated `[ Layers ]` sidebar tab with visual layer stack hierarchy:
    - Element locking (`Lock 🔒` / `Unlock 🔓`) to freeze positioning and prevent accidental movement/deletion.
    - Visibility toggle (`Eye 👁️` / `EyeOff 👁️‍🗨️`).
    - Layer reordering: Bring Forward (`↑`) and Send Backward (`↓`).
    - Direct layer selection and delete actions.
- **⌨️ Keyboard Controls & Full Undo/Redo Engine:**
  - `Ctrl + Z` / `Cmd + Z`: Full snapshot undo.
  - `Ctrl + Y` / `Cmd + Y` / `Ctrl + Shift + Z`: Redo.
  - `Arrow Keys` (↑ ↓ ← →): 0.5% micro-positioning nudging (2% with Shift).
  - `Ctrl + D`: Duplicate selected element.
  - `Delete` / `Backspace`: Remove selected element.
  - `Escape`: Deselect.
- **🤖 AI Smart Autofill Assistant:**
  - `[ ✨ AI Smart Autofill PRO ]` modal generator.
  - Takes brand name, executive name, designation, contact info, and industry presets (Executive Gold, Doctor/Healthcare, Luxury Jewellers).
  - Synthesizes a balanced two-sided business card with matching typographic scale, divider rules, 24K gold foil accents, and scannable vCard QR code in 1 click.

---

---

## 💎 13. PRODUCTION-READY AESTHETIC POLISH & ARCHITECTURAL DESK (COMPLETED)
- **Architectural Dot-Grid Designer Desk:**
  - Textured drafting mat backdrop using dual-layer micro dot-grid (`radial-gradient(#D3CCC0 1.2px, transparent 1.2px)`) giving an authentic CAD/Figma studio workspace appearance.
- **Blueprint Industrial Scale Rulers:**
  - Calibrated print scale markings above the card canvas: `0.0" | . . . . | 1.0" | . . . . | 2.0" | . . . . | 3.0" | . . . . | 3.5" (Standard Cut Trim)`.
- **Gilded 24K Gold Edge (Card Border Luxury Option):**
  - Toggleable `[ 👑 Gilded Edge ]` simulating real high-end 24K gold foil beveled card rims with ambient light emission.
- **1-Click Curated Color Harmonies:**
  - Quick palette preset switcher:
    - 🖤 *Royal Obsidian & 24K Gold* (`#0B0E14` card + `#D4AF37` gold foil)
    - 🥛 *Champagne Silk & Ivory* (`#FAF8F5` card + `#A9782B` warm gold)
    - 🌌 *Midnight Navy & Platinum* (`#0B1528` card + `#CBD5E1` silver chrome)
    - 🌲 *Imperial Emerald & Rose Gold* (`#062319` card + `#FDA4AF` blush rose gold)
    - 🍷 *Burgundy Velvet & Antique Gold* (`#2A0B16` card + `#E5C158` vintage gold)
- **Tactile Paper & Substrate Textures:**
  - Live texture overlays: *Smooth Satin Finish*, *Fine Linen Weave*, *Handmade Cotton Felt*, *Hairline Brushed Metal*, *Frosted Acrylic Glass*.
- **Realistic Miniature Card Thumbnails in Sidebar:**
  - Starter layouts display miniature business card replicas with gilded inset borders, foil headers, and layout lines.

## 🎨 14. PERSONALIZED FULL CARD BACKGROUND ARTWORK ENGINE (COMPLETED)
- **Separation of Background Artwork vs Floating Logo:**
  - Distinct Section 1: **Custom Card Background (Full Artwork / Wallpaper)**.
  - Distinct Section 2: **Floating Logo / Graphic Element** (movable & resizable on top).
- **Z-Index Layer Architecture:**
  - Custom background sits at `z-3` right above the substrate base color, underneath tactile paper textures (`z-5`), draggable elements/logos (`z-20`), and 3D specular sheen reflections (`z-35`).
- **Granular Per-Side Independence:**
  - Front (Side A) and Back (Side B) can have completely separate backgrounds, opacities, and scaling modes.
  - **`[x] Apply to both Front & Back faces`** checkbox allows 1-click synchronization across both card sides.
- **Opacity Slider & Fit Controls:**
  - Real-time opacity slider from 10% to 100% allowing background transparency so typography remains crisp.
  - Sizing fit modes: `COVER`, `CONTAIN`, and `REPEAT`.
- **4 Instant Curated Luxury Wallpapers:**
  - *Obsidian Gold* (Dark carbon geometric with gold orbital rings)
  - *Royal Navy Line* (Deep blue architectural grid)
  - *Imperial Emerald* (Malachite luxury rings)
  - *Milky Guilloche* (Ivory curved banknote security waves)
- **High-Res Proof Modal Sync:**
  - Proof export tracks and displays custom background status for prepress production.

---

## 🖼️ 15. DAY 11: LOGO & IMAGE UPLOADER WITH INTERACTIVE CANVAS CONTROLS (COMPLETED)
- **Interactive 4-Corner Resize Handles:**
  - Full pointer-capture dragging across NW, NE, SW, and SE corner handles.
  - Dynamically updates element width in real-time while preserving intrinsic aspect ratio.
- **Rotation & Flip Tools:**
  - 1-Click Horizontal Flip (`Flip H`) mirror reflection.
  - 1-Click Vertical Flip (`Flip V`).
  - 90° Incremental and free degree rotation (0° - 360°).
- **Magnetic Snapping & Center Guides:**
  - Dynamic 1-click `Center X` and `Center Y` alignment.
  - Interactive magnetic center snapping lines (`|` and `―`) during drag.
- **Selective Foil & Spot UV on Logos:**
  - Element-level special effects: `24K Gold Foil Logo`, `Silver Chrome Foil`, `Rose Gold Foil`, `Raised Spot UV 3D Lacquer`, or `Standard Logo Print`.
- **Intrinsic Resolution Measurement:**
  - Upload file reader extracts intrinsic `naturalWidth` and `naturalHeight` in real-time using in-memory `Image()` instance.

---

## 🔍 16. DAY 12: 600+ DPI ULTRA-HD PRINT QUALITY METER & SMART IMAGE ENHANCER (COMPLETED)
- **Calibrated 600+ DPI Ultra-HD Offset Print Standard (`dpiUtils.ts`):**
  - Calibrated against 3.5" × 2.0" physical visiting card:
    $$\text{DPI} = \frac{\text{naturalWidth}}{\text{Physical Width on Card (in)}}$$
  - 4-Tier Industrial Print Quality Meter:
    - 💎 **600+ DPI (Ultra-HD Press Ready):** Micro-sharp offset print standard for luxury foils & fine typography.
    - 🟢 **300–599 DPI (Commercial Print Grade):** High-definition offset standard.
    - 🟡 **150–299 DPI (Acceptable Quality):** Digital quick-print grade.
    - 🔴 **< 150 DPI (Critical Warning / Blur Risk):** Visible pixelation risk with required customer waiver.
- **✨ 1-Click Smart Image Enhancer & 600+ DPI Upscaler (`imageEnhancer.ts`):**
  - Built-in client-side super-resolution engine using offscreen high-precision canvas.
  - Multi-pass bicubic upsampling + unsharp masking convolution kernel (`[-0.5, 3, -0.5]`) + contrast micro-clarity.
  - 1-Click **`[ ✨ Upscale to 600+ DPI ]`** button available directly in the toolbar and Pre-Flight Inspector.
  - Automatically doubles/quadruples resolution, turning low/medium DPI logos into 600+ DPI press-ready assets.
- **📐 Vector vs Raster Educational Guide:**
  - Dedicated interactive tab in Pre-Flight modal explaining mathematical vector equations (infinity sharpness for text, Google Fonts, lines, dividers, shapes, QR codes) vs. pixel-grid bitmaps.

---

## 🗂️ 17. DAY 13: PRO LAYER MANAGEMENT & UNDO/REDO ENGINE (COMPLETED)
- **Canva Pro Layers Panel Hierarchy:**
  - Dedicated `[ Layers ]` tab displaying the visual stack of all canvas elements on the active side.
  - **Bring to Very Front (`ChevronsUp`):** Jumps element directly to top index.
  - **Bring Forward 1 Step (`ArrowUp`):** Incremental reordering.
  - **Send Backward 1 Step (`ArrowDown`):** Incremental reordering.
  - **Send to Very Back (`ChevronsDown`):** Drops element directly to background layer index 0.
  - **Position Freeze (`Lock 🔒 / Unlock 🔓`):** Prevents accidental drag or deletion.
  - **Visibility Toggle (`Eye 👁️ / EyeOff 👁️‍🗨️`):** Hides/shows elements without deleting them.
  - Direct layer selection, duplicate (`Copy`), and delete (`Trash2`).
- **Complete History Stack & Keyboard Engine:**
  - Full immutable snapshot history recording Front/Back elements, backgrounds, and layer orders.
  - `Ctrl + Z` / `Cmd + Z` for Undo, `Ctrl + Y` / `Ctrl + Shift + Z` for Redo.
  - `Ctrl + D` for 1-click duplication, `Delete`/`Backspace`, and arrow key micro-nudging (0.5% standard, 2% with Shift).

---

## 🕶️ 18. DAY 14: 3D REAL-LIFE SHOWROOM & FINISH INSPECTOR (TRANSFORMED & COMPLETED)
- **Zero Friction — All 5 Tedious Checkboxes Removed:**
  - Permanently removed bureaucratic pre-press checkboxes ("bs tick krne ka" friction eliminated).
  - Direct 1-click **`[ 🛒 Add to Cart Now • ₹... ]`** button with instant checkout handoff.
- **4 Authentic Commercial Showcase Environments:**
  1. 🪵 **Executive Dark Walnut Desk:** Rich wood grain with warm ambient desk lighting and soft contact drop shadow.
  2. 🏛️ **Carrara White Marble:** Clean, bright Italian luxury showroom table with subtle grey veins.
  3. 🤲 **In-Hand Physical Scale:** Handheld perspective view demonstrating genuine 3.5" × 2.0" pocket wallet proportions.
  4. 💼 **Brass Stand & 200 Card Stack:** Card propped up at a 15° pitch on an executive desk brass stand with a realistic 3D batch stack.
- **Interactive Studio Lighting & Specular Foil Shimmer:**
  - Real-time `[ ☀️ Studio Lighting Angle: -60° to +60° ]` slider.
  - Dynamically sweeps specular glare across metallic finishes: 24K Gold Foil gleams, Silver Chrome reflects, and Raised Spot UV glistens.
- **Continuous 360° Auto-Spin Turntable:**
  - 1-Click `[ 💫 360° Auto-Spin ]` button smoothly rotates the card along the Y and X axes via `requestAnimationFrame`.
  - 1-Click `[ 🔄 Flip to Back/Front ]` turnaround with 400-micron card thickness edge and 24K gilded edge support.
- **Direct Actions:**
  - Instant Add to Cart.
  - Instant 1-Click handoff to 300 DPI Pre-Press Export Hub.

---

## 🖨️ 19. DAY 15: 300/600 DPI HIGH-RESOLUTION VECTOR PDF & PNG EXPORT ENGINE (COMPLETED)
- **Production Pre-Press Rendering Engine (`printExportEngine.ts`):**
  - **Calibrated Print Scale:**
    - Standard Finished Trim: 3.5" × 2.0" (1050 × 600 px @ 300 DPI)
    - Full Bleed Allowance (+0.125" / 3.175mm per edge): 3.75" × 2.25" (1125 × 675 px @ 300 DPI, 2250 × 1350 px @ 600 DPI)
    - Dynamic Portrait transposition (2.25" × 3.75" @ 300 DPI)
  - **Offscreen Headless Canvas Pipeline:**
    - Renders all active typography, custom backgrounds (`cover`, `contain`, `repeat`), 24K gilded edge borders, SVG shapes, and images.
    - Specialized Foil & Spot UV shader emulation: 24K Gold Foil linear specular gradients, Silver Chrome, Rose Gold, and Raised Spot UV lacquer emboss.
    - True 300 DPI vector QR code generation using `qrcode` DataURL engine.
    - Pro vector icon rasterization via inline SVG paths (contact, luxury crowns, business, and medical symbols).
  - **Industrial Printer's Marks & Color Calibration Strips:**
    - Mechanical corner trim ticks offset by 0.04" for automated factory blade alignment.
    - CMYK + 100% K color registration control strip.
    - Job Slug metadata slug line: `INCREDIBLE TREASURES • FACTORY JOB #[ID] • SIDE A/B • TRIM: 3.5"x2.0" • 300 DPI OFFSET PRODUCTION`.
- **2-Page Vector PDF Generator (`jsPDF`):**
  - Synthesizes print-ready 2-page PDF (Page 1 = Side A Front, Page 2 = Side B Back) directly in browser memory with zero server lag.
  - PDF/X-1a compliance metadata embedded with title, author, and keywords.
  - Automatic download filename: `IncredibleTreasures-PrintProof-300DPI-[Job#].pdf`.
- **Direct High-Res PNG Exporters:**
  - `downloadCardFacePng` for standalone Front (Side A) and Back (Side B) 300 DPI PNG downloads.
  - 1-Click `Full Package` bundling PDF + Front PNG + Back PNG.
- **Pre-Press Backend API Route (`/api/print-export/route.ts`):**
  - Validates print dimensions, bleed margins, safe zone violations, and image DPI.
  - Returns certified JSON production manifest (`status: "APPROVED_FOR_PRESS"`, `pdfFormat: "PDF/X-1a:2001"`).
- **Studio UI Integration:**
  - CanvaToolbar enhanced with golden `[ 📥 300 DPI Export ]` action button.
  - Dedicated **300 DPI Pre-Press Export Hub** modal with interactive bleed toggle, printer's marks toggle, resolution selector (300 DPI Offset vs 600 DPI Ultra-HD), and animated export progress indicator.

---

## 💾 20. DAY 16: DESIGN STATE PERSISTENCE & CUSTOMER ACCOUNT PORTAL (COMPLETED)
- **Prisma Cloud Storage Model (`SavedDesign`):**
  - Integrated `SavedDesign` entity linked to `User` via cascade relation with guest `sessionId` fallback.
  - Complete canvas state serialization:
    - `frontElements` & `backElements`: Full JSON string containing all typography, font weights, colors, finishes, and vector coordinates.
    - Substrate ID (`pvc-regular-glossy`, `pvc-matt-foiling`, etc.), Orientation (`horizontal` / `vertical`), and Corner style (`square` / `rounded`).
    - Base background color, gilded edge status, and tactile paper texture.
    - Custom background artwork URLs, opacities (10%-100%), and sizing fit modes (`cover`, `contain`, `repeat`).
    - Compact preview thumbnail Data URLs (`previewFront`, `previewBack`) generated on the fly.
  - Successfully synced database schema with `npx prisma db push` and regenerated `@prisma/client`.
- **Backend API Endpoints:**
  - `GET /api/designs`: Retrieves saved projects filtered by `userId` or `sessionId` with parsed element trees.
  - `POST /api/designs`: Atomic creation or update of saved card drafts with cloud persistence.
  - `DELETE /api/designs`: Deletes draft with instant state cleanup.
  - `GET / POST /api/auth/customer`: Profile authentication, corporate GSTIN management, and session linkage.
- **Interactive Save Design Modal (`SaveDesignModal.tsx`):**
  - Accessible via gold `[ 💾 Save Design ]` button in Canva toolbar and header.
  - Dual-face real-time thumbnail preview cards (Side A Front / Side B Back).
  - Custom project naming with pre-filled intelligent defaults.
  - "Save as New Copy" vs "Update Existing Draft" toggle for multi-version management.
  - Animated cloud synchronization indicators.
- **"My Saved Designs" Cloud Library Gallery (`SavedDesignsModal.tsx`):**
  - Accessible from Studio header, toolbar, and main Storefront navigation.
  - Visual card showcase with 1-tap `[ Front / Back ]` face toggle.
  - Substrate badge, orientation tags, and last-saved timestamp.
  - **1-Click Studio Restore:** Instantly restores all elements, backgrounds, textures, substrates, and orientation into the active editor.
  - **1-Click Direct Re-Order:** Adds saved project directly to print cart with volume discount tiers.
  - **600+ DPI PDF Download:** Exports press-ready vector PDF directly from the saved card card preview.
- **Customer Account & Corporate GSTIN Portal (`CustomerAuthModal.tsx`):**
  - Instant authentication with business email & phone.
  - 1-Click Executive Preset for *"Mahi Kapoor, Managing Director"*.
  - Official 15-digit GSTIN profile storage for automated MCA/GST tax-compliant invoices.
  - Seamless header avatar badge in both Storefront and Studio.
- **Build & Quality Verification:**
  - Full production build (`npm run build`) passed with exit code 0 across all static and dynamic endpoints.

---

## 🚀 21. ROADMAP FOR UPCOMING WEEK 3 MILESTONES
1. **Day 17:** Slide-over Cart Drawer & Upsells (Stainless steel card holders, luxury envelopes, coupon engine).
2. **Day 18:** Indian Checkout & Pincode Auto-Detection (City/State auto-lookup).
3. **Day 19:** B2B GST Calculation & Invoicing Module (Karnataka CGST/SGST vs Inter-state IGST).
4. **Day 20:** Razorpay Payment Gateway Integration (UPI, Cards, NetBanking).






