export interface CatalogProduct {
  id: string;
  category: "visiting-cards" | "stationery" | "awards" | "drinkware" | "pens" | "gifting" | "apparel" | "tech";
  categoryName: string;
  title: string;
  startingPrice: string;
  minQty: string;
  specs: string;
  image: string;
  badge?: string;
  sourceCatalog?: string;
}

export const ALL_PRODUCTS: CatalogProduct[] = [
  // ================= 1. VISITING CARDS & STATIONERY =================
  {
    id: "gold-foil-cards",
    category: "visiting-cards",
    categoryName: "Visiting Cards & Stationery",
    title: "3D Raised Gold Foil Visiting Cards",
    startingPrice: "₹590",
    minQty: "100 pcs",
    specs: "400 GSM Velvet Cardstock • Stamped Metallic Gold Foil • Soft-Touch Feel",
    image: "/images/gold-foil-card.jpg",
    badge: "Signature Bestseller",
    sourceCatalog: "Incredible Treasures Luxury Suite"
  },
  {
    id: "visiting-cards",
    category: "visiting-cards",
    categoryName: "Visiting Cards & Stationery",
    title: "Executive Silk Matte Visiting Cards",
    startingPrice: "₹190",
    minQty: "100 pcs",
    specs: "350 GSM European Art Card • Zero-Glare Silk Matte Lamination",
    image: "/images/hero-visiting-cards.jpg",
    badge: "Popular",
    sourceCatalog: "Incredible Treasures Studio"
  },
  {
    id: "custom-envelopes",
    category: "visiting-cards",
    categoryName: "Visiting Cards & Stationery",
    title: "Custom Printed Office Envelopes (DL / C5)",
    startingPrice: "₹240",
    minQty: "50 pcs",
    specs: "Self-Seal DL / C5 • 100 GSM Bond Paper • Peel & Seal Flap",
    image: "/images/custom-envelopes.jpg",
    badge: "Office Essential",
    sourceCatalog: "Incredible Treasures Studio"
  },
  {
    id: "self-inking-stamps",
    category: "visiting-cards",
    categoryName: "Visiting Cards & Stationery",
    title: "Pre-Inked & Self-Inking Corporate Rubber Stamps",
    startingPrice: "₹180",
    minQty: "1 pc",
    specs: "Round & Rectangular • 10,000 Crisp Impressions • Black/Blue/Red Ink",
    image: "/images/rubber-stamps.jpg",
    badge: "Express 24h Delivery",
    sourceCatalog: "Incredible Treasures Studio"
  },

  // ================= 2. TROPHIES & CRYSTAL AWARDS =================
  {
    id: "crystal-round-bevel",
    category: "awards",
    categoryName: "Trophies & Awards",
    title: "Classic Round Bevel Cut Crystal Trophy",
    startingPrice: "₹1,250",
    minQty: "5 pcs",
    specs: "Optic Crystal • 18mm Thickness • Custom 3D Laser Engraved",
    image: "/images/catalog/awards/crystal-round-bevel.jpg",
    badge: "Bestseller",
    sourceCatalog: "Crystal Trophies.pdf"
  },
  {
    id: "crystal-octagon-star",
    category: "awards",
    categoryName: "Trophies & Awards",
    title: "Octagonal Star Crystal Corporate Award",
    startingPrice: "₹1,650",
    minQty: "5 pcs",
    specs: "Beveled Edge K9 Crystal • Deep Etched Logo • Wooden Base",
    image: "/images/catalog/awards/crystal-octagon-star.jpg",
    badge: "Executive Choice",
    sourceCatalog: "Crystal Trophies.pdf"
  },
  {
    id: "crystal-flame-pillar",
    category: "awards",
    categoryName: "Trophies & Awards",
    title: "Flame Pillar Achievement Crystal Memento",
    startingPrice: "₹1,850",
    minQty: "2 pcs",
    specs: "Faceted Flame Top • High-Gloss Mirror Polish • Velvet Gift Box",
    image: "/images/catalog/awards/crystal-flame-pillar.jpg",
    badge: "Premium",
    sourceCatalog: "Crystal Trophies.pdf"
  },
  {
    id: "crystal-diamond-peak",
    category: "awards",
    categoryName: "Trophies & Awards",
    title: "Diamond Peak Leadership Crystal Award",
    startingPrice: "₹2,100",
    minQty: "2 pcs",
    specs: "Diamond Cut Edges • Heavyweight Crystal Base • Sandblast Text",
    image: "/images/catalog/awards/crystal-diamond-peak.jpg",
    badge: "Luxury",
    sourceCatalog: "Crystal Trophies.pdf"
  },
  {
    id: "crystal-oval-plaque",
    category: "awards",
    categoryName: "Trophies & Awards",
    title: "Heritage Oval Recognition Plaque",
    startingPrice: "₹1,450",
    minQty: "5 pcs",
    specs: "Curved Beveled Crystal • Gold Foil Accent Infill • Solid Glass Stand",
    image: "/images/catalog/awards/crystal-oval-plaque.jpg",
    badge: "Corporate Favorite",
    sourceCatalog: "Crystal Trophies.pdf"
  },
  {
    id: "crystal-tower-prism",
    category: "awards",
    categoryName: "Trophies & Awards",
    title: "Prism Tower Excellence Column Award",
    startingPrice: "₹2,400",
    minQty: "1 pc",
    specs: "Multi-faceted Prism Column • Light Refraction Edge • Custom 3D Subsurface",
    image: "/images/catalog/awards/crystal-tower-prism.jpg",
    badge: "VIP Trophy",
    sourceCatalog: "Crystal Trophies.pdf"
  },

  // ================= 3. CUSTOM DRINKWARE & BOTTLES =================
  {
    id: "aquabot-alu-sipper-750",
    category: "drinkware",
    categoryName: "Custom Drinkware",
    title: "iScape 03 Aluminum Sport Sipper (750ml)",
    startingPrice: "₹185",
    minQty: "50 pcs",
    specs: "Food-Grade Aluminum • Carabiner Clip Flap • 4 Glossy Metallic Hues",
    image: "/images/catalog/drinkware/aquabot-alu-sipper-750.jpg",
    badge: "Bestseller",
    sourceCatalog: "Aquabot Bottle and Drinkware 2025.pdf"
  },
  {
    id: "aquabot-matte-steel-750",
    category: "drinkware",
    categoryName: "Custom Drinkware",
    title: "AquaBot 03 Matte Finish Steel Flask (750ml)",
    startingPrice: "₹245",
    minQty: "50 pcs",
    specs: "Ultra-Matte Powder Coat • Ergonomic Grip • Leakproof Silicon Ring",
    image: "/images/catalog/drinkware/aquabot-matte-steel-750.jpg",
    badge: "Popular",
    sourceCatalog: "Aquabot Bottle and Drinkware 2025.pdf"
  },
  {
    id: "aquabot-jumbo-1000",
    category: "drinkware",
    categoryName: "Custom Drinkware",
    title: "AquaBot 1000ml Heavy-Duty Hydra Flask",
    startingPrice: "₹320",
    minQty: "25 pcs",
    specs: "Double-Walled 304 Stainless Steel • Laser Engraved Logo • Rugged Cap",
    image: "/images/catalog/drinkware/aquabot-jumbo-1000.jpg",
    badge: "New 2026",
    sourceCatalog: "Aquabot Bottle and Drinkware 2025.pdf"
  },
  {
    id: "aquabot-flip-cap-850",
    category: "drinkware",
    categoryName: "Custom Drinkware",
    title: "AquaBot 08 Flip-Cap Sport Bottle (850ml)",
    startingPrice: "₹275",
    minQty: "50 pcs",
    specs: "One-Touch Flip Spout • Soft Silicon Carry Loop • Scratch-Resistant",
    image: "/images/catalog/drinkware/aquabot-flip-cap-850.jpg",
    badge: "Trending",
    sourceCatalog: "Aquabot Bottle and Drinkware 2025.pdf"
  },
  {
    id: "aquabot-hot-cold-500",
    category: "drinkware",
    categoryName: "Custom Drinkware",
    title: "AquaBot 48 Vacuum Insulated Hot & Cold (500ml)",
    startingPrice: "₹399",
    minQty: "25 pcs",
    specs: "24hr Cold / 12hr Hot • Food Grade 18/8 Stainless Steel • Temperature Retention",
    image: "/images/catalog/drinkware/aquabot-hot-cold-500.jpg",
    badge: "Executive",
    sourceCatalog: "Aquabot Bottle and Drinkware 2025.pdf"
  },
  {
    id: "aquabot-ceramic-coffee-mug",
    category: "drinkware",
    categoryName: "Custom Drinkware",
    title: "AquaBot Two-Tone Ceramic Corporate Mug (350ml)",
    startingPrice: "₹165",
    minQty: "50 pcs",
    specs: "Grade-A Ceramic • Gloss Enamel Coating • Sublimation Full Color Print",
    image: "/images/catalog/drinkware/aquabot-ceramic-coffee-mug.jpg",
    badge: "Daily Essential",
    sourceCatalog: "AquaBot Mug Catalogue - December 2025.pdf"
  },

  // ================= 4. EXECUTIVE & METAL PENS =================
  {
    id: "korby-matt-gold-pen",
    category: "pens",
    categoryName: "Executive Metal Pens",
    title: "Korby Matt Executive Pen [24K Gold Trims]",
    startingPrice: "₹195",
    minQty: "25 pcs",
    specs: "Deep Velvet Touch Finish • 24K Electroplated Gold Clip & Ring • Twist Mech",
    image: "/images/catalog/pens/korby-matt-gold-pen.jpg",
    badge: "24K Gold Trims",
    sourceCatalog: "Metal Pen - 2026"
  },
  {
    id: "sca-155-metalica-roller",
    category: "pens",
    categoryName: "Executive Metal Pens",
    title: "SCA 155 Metalica Premium Roller Pen",
    startingPrice: "₹120",
    minQty: "50 pcs",
    specs: "Aircraft Grade Aluminum Body • Gloss Lacquer • Chrome Trims",
    image: "/images/catalog/pens/sca-155-metalica-roller.jpg",
    badge: "Corporate Choice",
    sourceCatalog: "Metal Pen - 2026"
  },
  {
    id: "sca-180-titan-multitool",
    category: "pens",
    categoryName: "Executive Metal Pens",
    title: "SCA 180 Titan 6-in-1 Multitool Pen",
    startingPrice: "₹175",
    minQty: "50 pcs",
    specs: "Ballpoint + Stylus + Ruler + Screwdriver + Level Gauge All-in-One",
    image: "/images/catalog/pens/sca-180-titan-multitool.jpg",
    badge: "Tech Favorite",
    sourceCatalog: "Metal Pen - 2026"
  },
  {
    id: "york-copper-executive",
    category: "pens",
    categoryName: "Executive Metal Pens",
    title: "York Pure Copper & Matte Finish Roller Pen",
    startingPrice: "₹240",
    minQty: "25 pcs",
    specs: "Solid Metal Weight • Precision 0.7mm Swiss Rollerball • Laser Engraved Name",
    image: "/images/catalog/pens/york-copper-executive.jpg",
    badge: "VIP Signature",
    sourceCatalog: "Metal Pen - 2026"
  },
  {
    id: "sca-222-color-ballpen",
    category: "pens",
    categoryName: "Executive Metal Pens",
    title: "SCA 222 Colorful Matte Ball Pen Set",
    startingPrice: "₹48",
    minQty: "100 pcs",
    specs: "German Ink Refill • Smooth Twist Mechanism • 6 Vibrant Matte Hues",
    image: "/images/catalog/pens/sca-222-color-ballpen.jpg",
    badge: "High Volume",
    sourceCatalog: "Metal Pen - 2026"
  },
  {
    id: "sca-108-wooden-pen-giftset",
    category: "pens",
    categoryName: "Executive Metal Pens",
    title: "SCA 108 Natural Maple Wood Pen & Box Gift Set",
    startingPrice: "₹340",
    minQty: "25 sets",
    specs: "Handcrafted Solid Maple Wood • Laser Engraved Box & Pen • German Rollerball",
    image: "/images/catalog/pens/sca-108-wooden-pen-giftset.jpg",
    badge: "Eco-Friendly",
    sourceCatalog: "ECO-FRIENDLY PEN - 2026"
  },

  // ================= 5. NOTEBOOKS & EXECUTIVE DIARIES =================
  {
    id: "iscape-sage-hardcover-diary",
    category: "stationery",
    categoryName: "Notebooks & Office Suites",
    title: "iScape Sage & Olive Premium Hardcover Diary",
    startingPrice: "₹260",
    minQty: "30 pcs",
    specs: "Thermal PU Leatherite • Magnetic Clasp • 192 Ruled Pages 80 GSM Paper",
    image: "/images/catalog/stationery/iscape-sage-hardcover-diary.jpg",
    badge: "2026 Collection",
    sourceCatalog: "iScape 'IA Series' Note Book Catalogue"
  },
  {
    id: "iscape-navy-cognac-journal",
    category: "stationery",
    categoryName: "Notebooks & Office Suites",
    title: "iScape Navy & Cognac Dual-Tone Notebook",
    startingPrice: "₹285",
    minQty: "30 pcs",
    specs: "Debossed Corporate Logo • Pen Loop • Satin Bookmark Ribbon",
    image: "/images/catalog/stationery/iscape-navy-cognac-journal.jpg",
    badge: "Executive Choice",
    sourceCatalog: "iScape 'IA Series' Note Book Catalogue"
  },
  {
    id: "iscape-classic-folio-binder",
    category: "stationery",
    categoryName: "Notebooks & Office Suites",
    title: "iScape Executive Conference Folio Binder",
    startingPrice: "₹420",
    minQty: "20 pcs",
    specs: "A4 Document Compartment • Card Slots • Refillable Ruled Notepad",
    image: "/images/catalog/stationery/iscape-classic-folio-binder.jpg",
    badge: "B2B Special",
    sourceCatalog: "iScape 'IA Series' Note Book Catalogue"
  },
  {
    id: "deluxe-zipper-conference-folder",
    category: "stationery",
    categoryName: "Notebooks & Office Suites",
    title: "Executive Zippered Conference Portfolio Folder",
    startingPrice: "₹550",
    minQty: "20 pcs",
    specs: "Textured Leatherette • Zipper Enclosure • Tablet & File Compartment",
    image: "/images/catalog/stationery/deluxe-zipper-conference-folder.jpg",
    badge: "Conference Favorite",
    sourceCatalog: "Conference Folder.pdf"
  },

  // ================= 6. LUXURY CORPORATE GIFT HAMPERS =================
  {
    id: "brillare-minty-luxury-box",
    category: "gifting",
    categoryName: "Corporate Gift Boxes",
    title: "Brillare 'Minty Fresh' Luxury Corporate Gift Hamper",
    startingPrice: "₹899",
    minQty: "10 boxes",
    specs: "Sage Gift Box + Satin Ribbon + Hand Cream + Body Lotion Spa Suite",
    image: "/images/catalog/gifting/brillare-minty-luxury-box.jpg",
    badge: "Luxury Gift",
    sourceCatalog: "Brillare Gift Boxes.pdf"
  },
  {
    id: "brillare-glow-skincare-box",
    category: "gifting",
    categoryName: "Corporate Gift Boxes",
    title: "Brillare Royal Glow Executive Wellness Kit",
    startingPrice: "₹1,150",
    minQty: "10 boxes",
    specs: "Gold Foil Embellished Rigid Box • Custom Corporate Greeting Card",
    image: "/images/catalog/gifting/brillare-glow-skincare-box.jpg",
    badge: "Festive Special",
    sourceCatalog: "Brillare Gift Boxes.pdf"
  },
  {
    id: "brillare-signature-pamper-hamper",
    category: "gifting",
    categoryName: "Corporate Gift Boxes",
    title: "Incredible Treasures Signature Wellness Suite",
    startingPrice: "₹1,490",
    minQty: "5 boxes",
    specs: "Handcrafted Wooden Box • Organic Spa Products • Bespoke Metal Monogram",
    image: "/images/catalog/gifting/brillare-signature-pamper-hamper.jpg",
    badge: "VIP Hamper",
    sourceCatalog: "Brillare Gift Boxes.pdf"
  },
  {
    id: "diwali-royal-festive-hamper",
    category: "gifting",
    categoryName: "Corporate Gift Boxes",
    title: "Incredible Treasures 'Shubh' Festive Corporate Hamper",
    startingPrice: "₹1,250",
    minQty: "15 boxes",
    specs: "Rigid Gold Embossed Box • Premium Dry Fruits Jars • Scented Brass Diya",
    image: "/images/catalog/gifting/diwali-royal-festive-hamper.jpg",
    badge: "Festive 2026",
    sourceCatalog: "AOP DIWALI GIFTING"
  },

  // ================= 7. APPAREL, TECH KITS & BAGS =================
  {
    id: "steven-leatherite-tech-kit",
    category: "apparel",
    categoryName: "Corporate Apparel & Kits",
    title: "The Backbencher 'Steven' Leatherite Tech Kit",
    startingPrice: "₹799",
    minQty: "15 pcs",
    specs: "Padded Cord Organizer • Powerbank Compartment • Craft Box Packed",
    image: "/images/catalog/apparel/steven-leatherite-tech-kit.jpg",
    badge: "High Utility",
    sourceCatalog: "BACKBENCHER 2025-26.pdf"
  },
  {
    id: "highline-corporate-polo-suite",
    category: "apparel",
    categoryName: "Corporate Apparel & Kits",
    title: "Highline Premium 240 GSM Bio-Washed Corporate Polo",
    startingPrice: "₹385",
    minQty: "25 pcs",
    specs: "100% Cotton Matty • Colorfast Reactive Dyed • 12+ Corporate Color Shades",
    image: "/images/catalog/apparel/highline-corporate-polo-suite.jpg",
    badge: "Company Uniforms",
    sourceCatalog: "Highline All Shades.pdf"
  },

  // ================= 8. EXECUTIVE TECH & LIFESTYLE GADGETS =================
  {
    id: "brandcharger-horizon-speaker",
    category: "tech",
    categoryName: "Executive Tech Gadgets",
    title: "BrandCharger Horizon Luxury Bluetooth Speaker",
    startingPrice: "₹1,850",
    minQty: "10 pcs",
    specs: "Bluetooth 5.3 • 20W Rich Bass • Laser Etched Logo • 12hr Battery",
    image: "/images/catalog/tech/brandcharger-horizon-speaker.jpg",
    badge: "Exclusive Brand",
    sourceCatalog: "BrandCharger.pdf"
  },
  {
    id: "brandcharger-smart-tumbler",
    category: "tech",
    categoryName: "Executive Tech Gadgets",
    title: "BrandCharger Nomad Temperature Smart Tumbler",
    startingPrice: "₹699",
    minQty: "25 pcs",
    specs: "Food Grade 316 Surgical Steel • Ceramic Lining • Touch LED Temp Display",
    image: "/images/catalog/tech/brandcharger-smart-tumbler.jpg",
    badge: "Smart Tech",
    sourceCatalog: "BrandCharger.pdf"
  }
];
