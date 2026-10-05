# 30-Day Daily Execution Plan (Day 1 to Day 30)
## Complete Day-by-Day Breakdown for Production-Ready Web-to-Print Platform

---

### 📅 Week 1: Core Architecture, Database, Storefront & Pricing Engine
**Goal:** Build a blazing fast, modern storefront and dynamic price calculator that looks 10x cleaner than Vistaprint.

#### **Day 1: Project Setup & Relational Data Architecture**
- **What is built:**
  - Next.js 14+ App Router project initialized with TypeScript and Tailwind CSS.
  - Supabase / PostgreSQL database connected with Prisma ORM.
  - Complete DB models: `User`, `Category`, `Product`, `ProductVariant`, `VolumeTier`, `Template`, `Order`, `OrderItem`.
- **Client Deliverable:** Working local dev server with seeded sample database.

#### **Day 2: Vistaprint-Style Global Navigation & Mega Menu**
- **What is built:**
  - Modern Header with nested Mega Menu (Business Cards, Stationery, Marketing, Apparel).
  - Category thumbnail visual previews on hover.
  - Global product search bar with instant typeahead suggestions.
  - Responsive Mobile Navigation drawer with smooth micro-animations.
- **Client Deliverable:** Live interactive navigation bar and mobile drawer.

#### **Day 3: High-Converting Homepage**
- **What is built:**
  - Promotional Hero Banner with dynamic CTAs.
  - "Top Categories" visual grid with modern cards and subtle hover lifts.
  - "Trending Products" carousel (Visiting cards, Stamps, Lanyards, Mugs).
  - Trust section: "100% Print Quality Guaranteed", "Free Shipping Pan-India", "Bangalore Express Delivery".
- **Client Deliverable:** Complete Homepage matching modern Indian D2C design aesthetics.

#### **Day 4: Product Detail Page (PDP) Layout**
- **What is built:**
  - Multi-image gallery with zoom-on-hover and 3D angle previews.
  - Detailed product specification tabs (Paper thickness, Finish, Dimensions).
  - Customer review and rating component with star ratings.
  - "Two Ways to Order" action selector:
    1. *Upload Your Own Print-Ready File*
    2. *Design Online in Custom Studio*
- **Client Deliverable:** Production-grade PDP for Visiting Cards.

#### **Day 5: Dynamic Volume Pricing Engine**
- **What is built:**
  - Real-time client-side & server-side price calculator.
  - Selectors for:
    - Paper Stock (300 GSM Standard, 350 GSM Premium, 400 GSM Velvet).
    - Finish (Matte, Gloss, Spot UV).
    - Corners (Square vs Rounded).
    - Quantity Tier (100, 250, 500, 1000, 2500, 5000 pcs) with live savings badge (e.g. *"Save 35%"*).
- **Client Deliverable:** Live price calculation updating instantly on option select.

#### **Day 6: Design Template Browser**
- **What is built:**
  - Industry filter bar (IT & Tech, Doctors/Medical, Lawyers, Real Estate, Food & Hospitality).
  - Template card grid showing front & back preview on hover.
  - One-click "Customize this Template" button that routes into the studio.
- **Client Deliverable:** Interactive template gallery with 15+ starter designs.

#### **Day 7: Direct File Upload Workflow**
- **What is built:**
  - Drag-and-drop file uploader for customers who already have designs in PDF, AI, PSD, or PNG.
  - Client-side file validation (size limit 50MB, dimensions check).
  - Artwork review checklist popup before adding to cart.
- **Client Deliverable:** Fully working direct upload funnel.

---

### 🎨 Week 2: The Heart — Online Web-to-Print Design Studio
**Goal:** Build the interactive canvas editor where customers customize their products directly in the browser.

#### **Day 8: Dual-Sided Canvas Engine (Fabric.js)**
- **What is built:**
  - Fabric.js HTML5 canvas initialized with real physical print ratios (e.g., 3.5" x 2.0" for visiting cards).
  - **Print Safety Guides**:
    - Bleed Line (Outer cut border).
    - Trim Line (Actual cut border).
    - Safe Zone (Keep text inside this border).
  - Tab switcher for **Front Side** and **Back Side**.
- **Client Deliverable:** Responsive canvas workspace with print guidelines.

#### **Day 9: Typography & Text Editing Engine**
- **What is built:**
  - Add Heading, Subheading, and Body text buttons.
  - Font Picker loading Google Fonts (Montserrat, Poppins, Roboto, Inter, Playfair Display).
  - Rich text controls: Font Size slider, Color picker (Hex/RGB palette), Bold, Italic, Alignment, Letter Spacing, Line Height.
- **Client Deliverable:** Full text customization tools on the canvas.

#### **Day 10: Shape Library & Live QR Code Generator**
- **What is built:**
  - Vector shapes tool (Lines, Rectangles, Circles, Badges, Dividers).
  - Dynamic QR Code generator: Customer types their UPI ID, WhatsApp number, or Website URL, and it instantly generates a crisp vector QR code on the card.
- **Client Deliverable:** Working QR code and shape tools.

#### **Day 11: Logo & Image Uploader with Controls**
- **What is built:**
  - Customer image upload tool.
  - Interactive canvas manipulation: Drag, Scale, Rotate, Crop, Flip horizontally/vertically.
  - Center alignment helpers (Snap to canvas center horizontally/vertically).
- **Client Deliverable:** Smooth image upload and placement inside canvas.

#### **Day 12: Real-Time DPI Print-Quality Warning Meter**
- **What is built:**
  - Image resolution algorithm: Calculates uploaded image DPI based on its physical size on the canvas.
  - Live visual indicator badge:
    - 🟢 *300+ DPI: Crisp & Print-Ready*
    - 🟡 *150–299 DPI: Acceptable*
    - 🔴 *<150 DPI: Warning! This image will print blurry!*
- **Client Deliverable:** Proactive quality indicator that eliminates customer complaints.

#### **Day 13: Layer Management & Undo/Redo Engine**
- **What is built:**
  - Layers panel: Bring Forward, Send Backward, Bring to Front, Send to Back.
  - Delete element, Duplicate element.
  - State stack for **Undo (Ctrl+Z)** and **Redo (Ctrl+Y)**.
- **Client Deliverable:** Full layer and history control.

#### **Day 14: Interactive 3D Mockup Preview**
- **What is built:**
  - One-click "Preview 3D" modal.
  - Interactive 3D card tilt & flip animation displaying realistic matte texture or glossy sheen reflections.
  - "I approve this design" confirmation checkbox.
- **Client Deliverable:** Photorealistic preview that impresses the client.

---

### 💳 Week 3: High-Res Print Export, Cart, GST & Razorpay Gateway
**Goal:** Convert custom designs into 300 DPI print-ready production files and handle checkout with Razorpay.

#### **Day 15: 300 DPI High-Resolution Export Engine**
- **What is built:**
  - Headless canvas rendering at 300 DPI (print scale).
  - High-res vector PDF and PNG generation without loss of clarity.
  - Secure upload of production files to AWS S3 / Cloudinary.
- **Client Deliverable:** Downloadable 300 DPI vector PDF generated from browser canvas.

#### **Day 16: Design State Persistence & Customer Accounts**
- **What is built:**
  - Canvas serialized to lightweight JSON state and stored in PostgreSQL.
  - User "My Saved Designs" library: Customers can return, edit, and re-order in 1-click.
  - Authentication (Email + Password / Google Login / Phone OTP).
- **Client Deliverable:** Saved designs dashboard for logged-in users.

#### **Day 17: Slide-over Cart & Add-on Upsells**
- **What is built:**
  - Persistent Slide-over Cart drawer showing live thumbnail previews of custom front & back designs.
  - Selected specifications summary (Paper GSM, Finish, Quantity).
  - One-click cross-sell add-ons (e.g. Stainless steel card holder for ₹149, Envelopes for ₹299).
  - Coupon code discount engine.
- **Client Deliverable:** Fully functional interactive cart drawer.

#### **Day 18: Indian Checkout & Pincode Auto-Detection**
- **What is built:**
  - Multi-step friction-free checkout page.
  - Shipping address form with Indian Pincode auto-lookup (auto-fills City, State, and District).
  - Pincode serviceability check.
- **Client Deliverable:** Clean, validated Indian address input flow.

#### **Day 19: B2B GST Calculation & Invoicing Module**
- **What is built:**
  - Optional "Add Company GSTIN for Input Tax Credit" toggle.
  - Live GSTIN format verification (Regex + state code validation).
  - Automated GST calculation:
    - Intra-state (Karnataka to Karnataka): 9% CGST + 9% SGST.
    - Inter-state (Karnataka to Other states): 18% IGST.
- **Client Deliverable:** Accurate GST breakdown in checkout summary.

#### **Day 20: Razorpay Payment Gateway Integration**
- **What is built:**
  - Backend API endpoint creating a verified Razorpay Order.
  - Razorpay Standard Checkout SDK popup on frontend.
  - Support for UPI (GPay, PhonePe, Paytm, BHIM), Credit/Debit Cards, NetBanking, and Wallets.
- **Client Deliverable:** Successful test mode payment completing via UPI/Card.

#### **Day 21: Razorpay Webhook & Order State Machine**
- **What is built:**
  - Server-side cryptographic webhook handler with `crypto.createHmac("sha256")`.
  - Idempotency check to avoid double-processing.
  - Order state transition: `PENDING` -> `PAID` -> `PROCESSING`.
  - Order confirmation success screen with order ID and summary.
- **Client Deliverable:** Automated database order creation verified via webhook.

---

### 🏭 Week 4: Admin Portal, Logistics, Security & Go-Live
**Goal:** Vendor operations, automated shipping labels, security hardening, and public launch.

#### **Day 22: Admin Order Management Portal**
- **What is built:**
  - Role-protected `/admin/orders` dashboard.
  - Order pipeline view: `New Orders`, `Artwork Verification`, `In Printing`, `Ready for Dispatch`, `Delivered`.
  - Filter by date, customer, payment status, and order value.
- **Client Deliverable:** Complete admin view for factory/print shop manager.

#### **Day 23: 1-Click Print Production Hub**
- **What is built:**
  - Admin button: **"Download Print Package (ZIP)"**.
  - Includes:
    1. Front Side 300 DPI PDF.
    2. Back Side 300 DPI PDF.
    3. Production Job Sheet (Quantity, Paper Stock, Corner Finish, Customer Notes).
- **Client Deliverable:** Ready-to-print asset package downloaded in 1-click.

#### **Day 24: Automated GST Tax Invoice PDF Generator**
- **What is built:**
  - Automated server-side PDF invoice generation using React-PDF / Puppeteer.
  - Fully compliant Indian GST Invoice format: Client's registered GSTIN, invoice serial number, HSN codes for printing, CGST/SGST/IGST breakdown, authorized signatory stamp.
  - Downloadable by customer and admin.
- **Client Deliverable:** Professional PDF tax invoice generated for orders.

#### **Day 25: Logistics Integration (Shiprocket API)**
- **What is built:**
  - Shiprocket API integration for automated order push.
  - Automated AWB generation upon admin clicking "Fulfill Order".
  - Shipping label PDF generation with barcode for courier pickup.
- **Client Deliverable:** 1-Click courier label generation from admin portal.

#### **Day 26: WhatsApp & Email Notifications**
- **What is built:**
  - Automated transactional email via Resend (Order Confirmation + Invoice PDF attached).
  - WhatsApp Business notification via Interakt/Wati (Order Placed, Shipped with live tracking URL).
- **Client Deliverable:** Live email and WhatsApp message received on test order.

#### **Day 27: Bank-Grade Security Hardening & Rate Limiting**
- **What is built:**
  - Upstash Redis rate limiting on login, OTP, and checkout endpoints.
  - Strict Content Security Policy (CSP) and CORS headers.
  - File upload magic-byte verification (rejecting disguised malware).
  - Zod runtime schema validation on all API endpoints.
- **Client Deliverable:** Security audit report showing zero open vulnerabilities.

#### **Day 28: Mobile Polish & Performance Optimization**
- **What is built:**
  - Comprehensive mobile QA for touchscreen canvas interaction.
  - Image optimization via Next.js `next/image` (WebP conversion).
  - Google Lighthouse audit ensuring 90+ score across Performance, Accessibility, and SEO.
- **Client Deliverable:** Mobile-perfect responsiveness and blazing sub-second load times.

#### **Day 29: Gateway Live Mode Switch & Sanity Transactions**
- **What is built:**
  - Switch Razorpay environment from Test Keys to Live Production Keys.
  - Execute real ₹1 live UPI and Card test transactions.
  - Verify bank account settlement webhook.
- **Client Deliverable:** Live payment tested and confirmed in client's bank account.

#### **Day 30: Production Deployment, Domain Mapping & Go-Live 🚀**
- **What is built:**
  - Production deployment on Vercel / Cloudflare edge network.
  - Custom domain DNS mapping (A, CNAME records) and SSL certificate issuance.
  - Handover of Super Admin credentials and Operations Guide to the Bangalore client.
- **Client Deliverable:** Website 100% live, operational, and ready for public orders!
