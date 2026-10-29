const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedOrders() {
  console.log("Seeding initial production orders into database...");

  // 1. Ensure Demo Users
  const user1 = await prisma.user.upsert({
    where: { email: "mahi.kapoor@incredibletreasures.com" },
    update: {},
    create: {
      email: "mahi.kapoor@incredibletreasures.com",
      name: "Mahi Kapoor",
      phone: "+91 99450 39266",
      companyName: "Incredible Treasures Luxury Studio",
      gstin: "29AAKFI2392F1Z5",
      role: "CUSTOMER",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "anand.singhania@singhaniafincorp.in" },
    update: {},
    create: {
      email: "anand.singhania@singhaniafincorp.in",
      name: "Anand Singhania",
      phone: "+91 98201 44820",
      companyName: "Singhania FinCorp HQ",
      gstin: "27AAACS1482E1Z8",
      role: "CUSTOMER",
    },
  });

  // 2. Order 1: IT-PRINT-017378 (Karnataka Intra-State)
  await prisma.order.upsert({
    where: { orderNumber: "IT-PRINT-017378" },
    update: {},
    create: {
      orderNumber: "IT-PRINT-017378",
      userId: user1.id,
      source: "studio",
      customerName: "Mahi Kapoor",
      customerEmail: "mahi.kapoor@incredibletreasures.com",
      customerPhone: "+91 99450 39266",
      shippingAddress: "42, Commercial Street, Tasker Town",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560001",
      isB2B: true,
      companyName: "Incredible Treasures Luxury Studio",
      gstin: "29AAKFI2392F1Z5",
      subtotal: 2118.64,
      taxAmount: 381.36,
      cgstAmount: 190.68,
      sgstAmount: 190.68,
      igstAmount: 0.0,
      shippingFee: 0.0,
      shippingTier: "standard",
      totalAmount: 2500.0,
      status: "DISPATCHED",
      statusLabel: "Dispatched via BlueDart Apex Air",
      paymentStatus: "PAID_ADVANCE",
      paymentMethod: "card",
      awbNumber: "BD-017378560",
      courierPartner: "BlueDart Apex Air",
      destinationCity: "Bengaluru",
      guaranteedDeliveryFormatted: "Tomorrow by 01:30 PM",
      items: {
        create: [
          {
            productName: "400-Micron Luxury Glossy PVC Visiting Cards (500 pcs)",
            categoryName: "Visiting Cards",
            variantName: "24K Gold Stamped • Rounded Corners",
            quantity: 500,
            unitPrice: 5.0,
            totalPrice: 2500.0,
            specsJson: "Dual-Face Custom Layout • Mahi Kapoor (Managing Director)",
            customDesignFront: "/images/hero-banner-1.png",
            isGstIncluded: true,
          },
        ],
      },
    },
  });

  // 3. Order 2: IT-PRINT-018241 (Mumbai Inter-State with Coupon)
  await prisma.order.upsert({
    where: { orderNumber: "IT-PRINT-018241" },
    update: {},
    create: {
      orderNumber: "IT-PRINT-018241",
      userId: user2.id,
      source: "ready_made_storefront",
      customerName: "Anand Singhania",
      customerEmail: "anand.singhania@singhaniafincorp.in",
      customerPhone: "+91 98201 44820",
      shippingAddress: "Level 8, Platina Tower, G-Block, Bandra Kurla Complex",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400051",
      isB2B: true,
      companyName: "Singhania FinCorp HQ",
      gstin: "27AAACS1482E1Z8",
      subtotal: 28000.0,
      taxAmount: 5040.0,
      cgstAmount: 0.0,
      sgstAmount: 0.0,
      igstAmount: 5040.0,
      shippingFee: 0.0,
      shippingTier: "priority_vip",
      couponCode: "SPECIAL",
      discountAmount: 2800.0,
      totalAmount: 33040.0,
      status: "IN_PRODUCTION",
      statusLabel: "In Production • Offset Press & Foil Stamping",
      paymentStatus: "PAID_ADVANCE",
      paymentMethod: "upi",
      awbNumber: "BD-018241400",
      courierPartner: "BlueDart Apex Air",
      destinationCity: "Mumbai",
      guaranteedDeliveryFormatted: "In 2 Business Days",
      items: {
        create: [
          {
            productName: "Executive Ceramic Matte Black Mugs (100 pcs)",
            categoryName: "Corporate Gifting",
            variantName: "Corporate Logo Imprint",
            quantity: 100,
            unitPrice: 280.0,
            totalPrice: 28000.0,
            specsJson: "350ml Ceramic Mug • Laser Precision Print",
            customDesignFront: "/images/custom-ceramic-mugs-banner.jpg",
            isGstIncluded: false,
          },
        ],
      },
    },
  });

  console.log("Successfully seeded orders into database!");
}

seedOrders()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
