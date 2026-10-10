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

## 🚀 10. ROADMAP FOR NEXT TASKS
1. **Interactive PDP Enhancements:** Advanced 3D angle views, paper thickness selector tabs (350 GSM vs 400 GSM vs 400 Micron PVC), and Two Ways to Order workflow.
2. **Canvas Design Studio (Fabric.js):** Live dual-sided canvas editor with real-time text manipulation, logo drag-and-drop, QR code generator, and 300 DPI pre-flight check meter.
3. **Cart & Checkout Polish:** B2B GST tax invoice breakdown (18% ITC) and seamless WhatsApp instant quote integration.
