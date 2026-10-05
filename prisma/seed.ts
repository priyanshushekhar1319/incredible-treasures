import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Incredible Treasures catalog data...");

  // Clear existing records
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.volumeTier.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.template.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // 1. Categories
  const catCards = await prisma.category.create({
    data: {
      name: "Visiting Cards",
      slug: "visiting-cards",
      description: "Bespoke corporate visiting cards in premium silk matte, velvet touch, and metallic raised gold foil.",
      icon: "CreditCard",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
      displayOrder: 1,
    },
  });

  const catStationery = await prisma.category.create({
    data: {
      name: "Corporate Stationery",
      slug: "corporate-stationery",
      description: "Executive letterheads, watermarked bond envelopes, and self-inking official company stamps.",
      icon: "FileText",
      image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80",
      displayOrder: 2,
    },
  });

  const catGifting = await prisma.category.create({
    data: {
      name: "Luxury Corporate Gifts",
      slug: "corporate-gifting",
      description: "Curated gift hampers, laser-engraved metal pens, and custom debossed presentation boxes.",
      icon: "Gift",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
      displayOrder: 3,
    },
  });

  // 2. Products
  // Product 1: Royal Matte Executive Card
  const prodRoyalMatte = await prisma.product.create({
    data: {
      name: "Royal Matte Executive Visiting Card",
      slug: "royal-matte-executive-card",
      tagline: "Bangalore's #1 Preferred Business Card for Executives & Founders",
      description: "Crafted on ultra-heavy 350 GSM European imported cardstock. Finished with a non-reflective, anti-fingerprint silk matte lamination that feels soft and luxurious to the touch. Perfect for corporate leaders, consultants, and tech founders.",
      basePrice: 3.99, // ₹3.99 per unit at base volume
      categoryId: catCards.id,
      minQuantity: 100,
      estimatedDays: "2-3 Days Bangalore Express",
      featured: true,
      rating: 4.9,
      reviewCount: 247,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80",
      ]),
      variants: {
        create: [
          {
            name: "Standard 350 GSM Silk Matte",
            paperType: "Silk Matte",
            thicknessGsm: 350,
            finish: "Silk Matte Lamination",
            cornerStyle: "Square",
            priceModifier: 0.0,
            isDefault: true,
          },
          {
            name: "Premium 350 GSM with Rounded Corners",
            paperType: "Silk Matte",
            thicknessGsm: 350,
            finish: "Silk Matte Lamination",
            cornerStyle: "Rounded (6mm Radius)",
            priceModifier: 0.5,
            isDefault: false,
          },
          {
            name: "Ultra 400 GSM Velvet Soft-Touch",
            paperType: "Velvet Soft-Touch",
            thicknessGsm: 400,
            finish: "Velvet Touch Lamination",
            cornerStyle: "Square",
            priceModifier: 1.2,
            isDefault: false,
          },
        ],
      },
      volumeTiers: {
        create: [
          { quantity: 100, unitPrice: 3.99, discountPercent: 0, isPopular: false },
          { quantity: 250, unitPrice: 3.40, discountPercent: 15, isPopular: false },
          { quantity: 500, unitPrice: 2.60, discountPercent: 35, isPopular: true },
          { quantity: 1000, unitPrice: 1.99, discountPercent: 50, isPopular: false },
          { quantity: 2500, unitPrice: 1.49, discountPercent: 62, isPopular: false },
        ],
      },
    },
  });

  // Product 2: Imperial Raised Gold Foil Card
  const prodGoldFoil = await prisma.product.create({
    data: {
      name: "Imperial Raised Gold Foil Visiting Card",
      slug: "imperial-gold-foil-card",
      tagline: "True Metallic 3D Raised Foil That Demands Attention",
      description: "Our signature luxury masterpiece. Double-thick 400 GSM velvet black cardstock paired with gleaming 3D raised metallic gold foil stamping. Gives tactile texture and brilliant metallic reflection under ambient light.",
      basePrice: 7.99,
      categoryId: catCards.id,
      minQuantity: 100,
      estimatedDays: "3-4 Days Bangalore Express",
      featured: true,
      rating: 5.0,
      reviewCount: 189,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
      ]),
      variants: {
        create: [
          {
            name: "400 GSM Obsidian Black + Gold Foil",
            paperType: "Obsidian Black Velvet",
            thicknessGsm: 400,
            finish: "Metallic Gold Raised Foil (Single Sided)",
            cornerStyle: "Square",
            priceModifier: 0.0,
            isDefault: true,
          },
          {
            name: "400 GSM Dual-Side Raised Gold Foil",
            paperType: "Obsidian Black Velvet",
            thicknessGsm: 400,
            finish: "Metallic Gold Raised Foil (Double Sided)",
            cornerStyle: "Square",
            priceModifier: 3.5,
            isDefault: false,
          },
        ],
      },
      volumeTiers: {
        create: [
          { quantity: 100, unitPrice: 7.99, discountPercent: 0, isPopular: false },
          { quantity: 250, unitPrice: 6.99, discountPercent: 12, isPopular: false },
          { quantity: 500, unitPrice: 5.49, discountPercent: 31, isPopular: true },
          { quantity: 1000, unitPrice: 4.29, discountPercent: 46, isPopular: false },
        ],
      },
    },
  });

  // Product 3: Executive Bond Letterheads
  await prisma.product.create({
    data: {
      name: "Executive Watermarked Bond Letterhead",
      slug: "executive-bond-letterhead",
      tagline: "Official Corporate Letterheads with High Opacity & Laser Printer Compatibility",
      description: "Printed on crisp 120 GSM natural white executive bond paper. Smooth runnability on all office desktop inkjet and laser printers without smearing or jamming. Matches official MCA and GST audit filing standards.",
      basePrice: 5.20,
      categoryId: catStationery.id,
      minQuantity: 250,
      estimatedDays: "2-3 Days Delivery",
      featured: false,
      rating: 4.8,
      reviewCount: 94,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80",
      ]),
      variants: {
        create: [
          {
            name: "120 GSM Royal Executive Bond",
            paperType: "Alabaster Bond",
            thicknessGsm: 120,
            finish: "Natural Smooth Uncoated",
            cornerStyle: "Square",
            priceModifier: 0.0,
            isDefault: true,
          },
        ],
      },
      volumeTiers: {
        create: [
          { quantity: 250, unitPrice: 5.20, discountPercent: 0, isPopular: false },
          { quantity: 500, unitPrice: 4.10, discountPercent: 21, isPopular: true },
          { quantity: 1000, unitPrice: 3.20, discountPercent: 38, isPopular: false },
        ],
      },
    },
  });

  // Product 4: Laser-Engraved Executive Pen
  await prisma.product.create({
    data: {
      name: "Laser-Engraved Obsidian Metal Pen",
      slug: "laser-engraved-metal-pen",
      tagline: "Heavyweight Brass Ballpoint with Custom Laser-Etched Monogram",
      description: "A timeless corporate token. Solid brass core finished in matte obsidian black with PVD-coated gold clips and trim. Laser engraved with your recipient's name or corporate logo, exposing the bright underlying golden brass layer.",
      basePrice: 45.0,
      categoryId: catGifting.id,
      minQuantity: 25,
      estimatedDays: "3-5 Days Delivery",
      featured: true,
      rating: 4.95,
      reviewCount: 312,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80",
      ]),
      variants: {
        create: [
          {
            name: "Matte Black with Gold Trim",
            paperType: "Metal Brass",
            thicknessGsm: 0,
            finish: "Fiber Laser Engraved",
            cornerStyle: "N/A",
            priceModifier: 0.0,
            isDefault: true,
          },
        ],
      },
      volumeTiers: {
        create: [
          { quantity: 25, unitPrice: 45.0, discountPercent: 0, isPopular: false },
          { quantity: 50, unitPrice: 39.0, discountPercent: 13, isPopular: false },
          { quantity: 100, unitPrice: 32.0, discountPercent: 28, isPopular: true },
          { quantity: 250, unitPrice: 25.0, discountPercent: 44, isPopular: false },
        ],
      },
    },
  });

  // Product 5: Signature Luxury Gift Box
  await prisma.product.create({
    data: {
      name: "Incredible Treasures Signature Luxury Box",
      slug: "signature-luxury-gift-box",
      tagline: "Custom Debossed Magnetic Rigid Box for Elite Client Onboarding",
      description: "Handcrafted 1200 GSM rigid Kappa board encased in Italian buckram bookcloth with magnetic snap closure. Inside features custom-cut high density EVA foam lined with golden velvet, tailored to fit merchandise suites.",
      basePrice: 249.0,
      categoryId: catGifting.id,
      minQuantity: 10,
      estimatedDays: "5-7 Days Delivery",
      featured: true,
      rating: 5.0,
      reviewCount: 82,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
      ]),
      variants: {
        create: [
          {
            name: "Executive Magnetic Rigid Box",
            paperType: "1200 GSM Kappa Board",
            thicknessGsm: 1200,
            finish: "Gold Foil Debossed Logo",
            cornerStyle: "Square",
            priceModifier: 0.0,
            isDefault: true,
          },
        ],
      },
      volumeTiers: {
        create: [
          { quantity: 10, unitPrice: 249.0, discountPercent: 0, isPopular: false },
          { quantity: 25, unitPrice: 219.0, discountPercent: 12, isPopular: false },
          { quantity: 50, unitPrice: 185.0, discountPercent: 25, isPopular: true },
          { quantity: 100, unitPrice: 155.0, discountPercent: 37, isPopular: false },
        ],
      },
    },
  });

  console.log("Database seeded successfully with 3 categories and 5 luxury products!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
