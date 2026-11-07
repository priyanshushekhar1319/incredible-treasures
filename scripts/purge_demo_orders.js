const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function purgeDemos() {
  try {
    console.log("Searching for demo orders...");
    const itemsDeleted = await prisma.orderItem.deleteMany({
      where: {
        OR: [
          { order: { orderNumber: { in: ["IT-PRINT-017378", "IT-PRINT-017379"] } } },
          { order: { customerName: { in: ["Mahi Kapoor", "Anand Singhania"] } } },
        ],
      },
    });
    console.log("Deleted order items:", itemsDeleted.count);

    const ordersDeleted = await prisma.order.deleteMany({
      where: {
        OR: [
          { orderNumber: { in: ["IT-PRINT-017378", "IT-PRINT-017379"] } },
          { customerName: { in: ["Mahi Kapoor", "Anand Singhania"] } },
        ],
      },
    });
    console.log("Deleted orders:", ordersDeleted.count);

    // Also remove demo users if needed
    const usersDeleted = await prisma.user.deleteMany({
      where: {
        email: { in: ["mahi.kapoor@incredibletreasures.com", "anand.singhania@singhaniafincorp.in"] },
      },
    });
    console.log("Deleted demo users:", usersDeleted.count);
  } catch (err) {
    console.error("Purge error:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

purgeDemos();

