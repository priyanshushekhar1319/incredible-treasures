/**
 * Curated Test Logos with pre-calibrated intrinsic resolutions for testing
 * Day 11 (Image Manipulation) and Day 12 (Real-Time DPI Warning Meter calibrated to 600+ DPI)
 */

export interface SampleTestLogo {
  id: string;
  name: string;
  naturalWidth: number;
  naturalHeight: number;
  expectedDpiAtDefaultScale: number;
  status: "ultra-crisp" | "crisp" | "acceptable" | "warning";
  badgeLabel: string;
  badgeClass: string;
  dataUrl: string;
}

// 1. High-Res Vector-Quality Brand Crest (1600 x 1600 px -> ~1800+ DPI at 25% card width)
const HIGH_RES_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1600" viewBox="0 0 1600 1600">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE89E"/>
      <stop offset="40%" stop-color="#D4AF37"/>
      <stop offset="70%" stop-color="#AA771C"/>
      <stop offset="100%" stop-color="#F5DEB3"/>
    </linearGradient>
  </defs>
  <circle cx="800" cy="800" r="740" fill="#0F172A" stroke="url(#goldGrad)" stroke-width="40"/>
  <circle cx="800" cy="800" r="660" fill="none" stroke="url(#goldGrad)" stroke-width="12" stroke-dasharray="24,16"/>
  <path d="M 800 280 L 920 620 L 1280 640 L 980 860 L 1090 1200 L 800 990 L 510 1200 L 620 860 L 320 640 L 680 620 Z" fill="url(#goldGrad)"/>
  <text x="800" y="1360" font-family="'Cinzel', serif" font-size="76" font-weight="900" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="16">INCREDIBLE TREASURES</text>
  <text x="800" y="1440" font-family="'Montserrat', sans-serif" font-size="44" font-weight="600" fill="#E2E8F0" text-anchor="middle" letter-spacing="24">600+ DPI ULTRA-HD READY</text>
</svg>`;

// 2. Medium-Res Web Logo (220 x 220 px -> ~250 DPI at 25% card width)
const MEDIUM_RES_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
  <rect width="220" height="220" rx="36" fill="#1E3A8A"/>
  <circle cx="110" cy="110" r="80" fill="none" stroke="#60A5FA" stroke-width="10"/>
  <path d="M 110 50 L 140 100 L 180 110 L 145 140 L 160 180 L 110 155 L 60 180 L 75 140 L 40 110 L 80 100 Z" fill="#93C5FD"/>
  <text x="110" y="205" font-family="sans-serif" font-size="12" font-weight="bold" fill="#DBEAFE" text-anchor="middle">WEB LOGO (220 DPI)</text>
</svg>`;

// 3. Low-Res WhatsApp Web Screenshot (72 x 72 px -> ~82 DPI at 25% card width)
const LOW_RES_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72">
  <rect width="72" height="72" fill="#334155"/>
  <rect x="8" y="8" width="56" height="56" fill="#475569" stroke="#94A3B8" stroke-width="2"/>
  <text x="36" y="34" font-family="sans-serif" font-size="9" font-weight="bold" fill="#F87171" text-anchor="middle">72 DPI</text>
  <text x="36" y="48" font-family="sans-serif" font-size="7" fill="#FECACA" text-anchor="middle">BLURRY</text>
</svg>`;

function toSvgDataUrl(svgString: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
}

export const SAMPLE_TEST_LOGOS: SampleTestLogo[] = [
  {
    id: "logo-crisp-300",
    name: "Royal Gold Crest (Ultra-HD)",
    naturalWidth: 1600,
    naturalHeight: 1600,
    expectedDpiAtDefaultScale: 1828,
    status: "ultra-crisp",
    badgeLabel: "💎 1800+ DPI (600+ Ultra-HD)",
    badgeClass: "bg-emerald-50 text-emerald-900 border-emerald-300 font-black",
    dataUrl: toSvgDataUrl(HIGH_RES_SVG),
  },
  {
    id: "logo-acceptable-220",
    name: "Corporate Badge (Medium-Res)",
    naturalWidth: 220,
    naturalHeight: 220,
    expectedDpiAtDefaultScale: 251,
    status: "acceptable",
    badgeLabel: "🟡 220 DPI (Medium Quality)",
    badgeClass: "bg-amber-50 text-amber-800 border-amber-200",
    dataUrl: toSvgDataUrl(MEDIUM_RES_SVG),
  },
  {
    id: "logo-blurry-72",
    name: "WhatsApp Screenshot (Low-Res)",
    naturalWidth: 72,
    naturalHeight: 72,
    expectedDpiAtDefaultScale: 82,
    status: "warning",
    badgeLabel: "🔴 72 DPI (Blurry Warning)",
    badgeClass: "bg-rose-50 text-rose-800 border-rose-200",
    dataUrl: toSvgDataUrl(LOW_RES_SVG),
  },
];
