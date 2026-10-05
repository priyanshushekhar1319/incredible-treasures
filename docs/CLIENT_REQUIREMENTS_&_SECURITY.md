# Client Requirements & Production Security Blueprint

This document outlines everything needed from the client, the bank-grade security architecture, and the UI/UX enhancement strategy to surpass Vistaprint.

---

## 📋 1. Checklist For Client: "Sir, Aapke End Se Ye Requirements Chahiye"

Directly share this checklist with your Bangalore client during project kick-off:

### A. Legal & Business Credentials (Mandatory for Payment Gateway)
- [ ] **Registered Business Name & Entity Type** (Proprietorship / LLP / Pvt Ltd).
- [ ] **GSTIN Number** (Essential for B2B invoicing and Razorpay business account activation).
- [ ] **Registered Office Address & Contact Info** (Must match bank documents).
- [ ] **Bank Account Details** (For receiving automated daily payouts from Razorpay/Cashfree).

### B. Third-Party Accounts & API Credentials
- [ ] **Payment Gateway**: Razorpay or Cashfree KYC-approved Merchant Account (`Key_Id` & `Key_Secret`).
- [ ] **Logistics / Courier**: Shiprocket or Delhivery B2B API Token (`Email`, `Password`, Pickup Warehouse Pincode).
- [ ] **Cloud Storage**: AWS S3 Bucket or Cloudinary Premium Account (For 300 DPI high-res customer vector/image uploads).
- [ ] **Transactional Email**: Resend or SendGrid API Key (Domain verification required via DNS).
- [ ] **WhatsApp Business API**: Interakt, Wati, or Gupshup API Key (For automated order dispatch & tracking updates).
- [ ] **Domain & DNS**: Access to GoDaddy / Namecheap / Cloudflare (To point DNS records and configure SSL).

### C. Product Catalog & Pricing Matrix (Excel / Google Sheet)
- [ ] **Product Categories List**: (e.g., Visiting Cards, Letterheads, Envelopes, T-Shirts, Badges, Lanyards, Bill Books, Stamps).
- [ ] **Specification Matrix**:
  - Paper Types: Standard 300 GSM, Premium 350 GSM, Recycled Kraft, Velvet Touch.
  - Finishes: Matte, Gloss, Spot UV, Gold/Silver Foil.
  - Corners: Standard Square, Rounded.
- [ ] **Volume Pricing Slab**:
  - Exact pricing tiers: 100 pcs, 250 pcs, 500 pcs, 1000 pcs, 2500 pcs, 5000 pcs (along with client profit margins).
- [ ] **High-Resolution Mockups / Brand Templates**: Existing raw templates (PSD / Illustrator / Canva links).

### D. Compliance & Mandatory Legal Pages (Required for RBI & Payment Gateway Approval)
- [ ] **Terms and Conditions**
- [ ] **Privacy Policy**
- [ ] **Shipping & Delivery Policy** (Typical delivery SLA: 3–5 days Bangalore, 5–7 days Pan-India)
- [ ] **Cancellation, Return & Refund Policy** (Print-on-demand customized products policy)
- [ ] **Contact Us Page** (Grievance Officer Name, Email, Bangalore physical address, Phone number)

---

## 🛡️ 2. Bank-Grade Security Architecture (100% Production-Ready)

| Security Domain | Vulnerability / Threat | Antigravity Production Implementation |
| :--- | :--- | :--- |
| **Payment Security** | Webhook spoofing, double charging, MITM attacks | **HMAC-SHA256 Signature Verification** on all Razorpay callbacks; **Idempotent database transactions** (an order cannot be processed twice even if webhook fires twice); Zero raw card data saved (PCI-DSS Level 1 compliant). |
| **Authentication** | Session hijacking, credential stuffing | **NextAuth / Supabase Auth** with `HttpOnly`, `SameSite=Lax`, and `Secure` SSL cookies. Rotated JWT tokens with short expiry (15 mins) and sliding refresh tokens. |
| **File Upload Safety** | Malware injection via customer logo upload | Pre-signed AWS S3 / Cloudinary upload URLs (no files touch our server memory directly). **Strict magic-byte file signature validation** (rejecting `.exe`, `.sh` masked as `.png`). Max upload cap (50MB). |
| **Database & API** | SQL Injection, XSS, Mass Assignment | **Prisma ORM** with parameterized queries. Strict runtime schema validation using **Zod** on all API payloads. HTML sanitization using DOMPurify. |
| **Brute Force & DDoS** | Bot attacks, OTP spamming, inventory locking | **Upstash Redis Rate Limiting** (`@upstash/ratelimit`): Max 3 OTP requests / 5 min; Max 10 checkout attempts / min per IP. Cloudflare WAF protection enabled. |
| **Role-Based Access** | Customers viewing other orders or print files | **Row-Level Security (RLS)** in PostgreSQL. Admin routes protected with cryptographically verified JWT middleware (`ROLE = SUPER_ADMIN \| VENDOR_STAFF`). |
| **Data Integrity** | Price manipulation in client-side cart | **Zero client-side price trust**: The frontend only sends `productId`, `variantId`, and `quantity`. Price is always recalculated fresh from database on the server before Razorpay order generation. |

---

## 🎨 3. Better UI/UX Than Vistaprint (The Competitive Edge)

| Feature | Vistaprint India (Current Pain Points) | Our Platform's 10x Modern Solution |
| :--- | :--- | :--- |
| **Design Studio (Mobile)** | Clunky desktop editor shrunk onto mobile; difficult to pinch, rotate, or edit text. | **Mobile-Native Studio**: Bottom-sheet controls, gesture-based pinch-to-zoom, preset templates with one-tap text replacement. |
| **Product Preview** | Static 2D flat preview images. | **Interactive 3D / Realistic Mockup**: Interactive card rotation showing matte finish vs glossy shine with realistic lighting. |
| **Load Speed & Clutter** | Loaded with legacy scripts, slow page transitions (3–5s load time). | **Sub-second Next.js SSR**: Clean, glassmorphic UI, zero layout shifts, Instant Page Navigation (<800ms). |
| **Login & Checkout** | Lengthy registration forms before checkout. | **Frictionless Indian Checkout**: 1-Click WhatsApp / Phone OTP login, Pincode auto-detection (City/State), UPI QR instant scan. |
| **Print Quality Alert** | Lets users upload blurry images without warning until print fails. | **Real-Time DPI Quality Bar**: Live indicator warns customer if uploaded logo is low-res (<300 DPI) before they place the order. |

---

## 📂 4. Recommended Codebase Architecture

```
print-platform/
├── src/
│   ├── app/
│   │   ├── (storefront)/        # Customer browsing & PDP
│   │   │   ├── products/[slug]/page.tsx
│   │   │   ├── customize/[id]/page.tsx   # Fabric.js Canvas Studio
│   │   │   ├── cart/page.tsx
│   │   │   ├── checkout/page.tsx
│   │   │   └── page.tsx
│   │   ├── (auth)/              # Secure phone OTP / email login
│   │   ├── (admin)/             # Protected vendor & print press portal
│   │   │   ├── orders/
│   │   │   ├── print-hub/       # 1-Click 300 DPI batch downloader
│   │   │   └── inventory/
│   │   └── api/
│   │       ├── checkout/route.ts       # Price verification & Razorpay order
│   │       ├── webhooks/razorpay/route.ts # Cryptographic webhook handler
│   │       └── print-export/route.ts   # 300 DPI Vector/PDF generator
│   ├── components/
│   │   ├── studio/              # Canvas, Tools, Font Picker, Layers
│   │   ├── storefront/          # Mega menu, 3D card preview, Price calculator
│   │   └── ui/                  # Accessible, sleek design system tokens
│   ├── lib/
│   │   ├── db.ts                # Prisma database client
│   │   ├── razorpay.ts          # Payment gateway helper
│   │   ├── shiprocket.ts        # Courier automation client
│   │   ├── security.ts          # Rate limiters & Zod validation schemas
│   │   └── print-engine.ts      # Canvas to 300 DPI PDF conversion logic
│   └── prisma/
│       └── schema.prisma        # Complete Relational DB Schema
```
