const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function purgeAllTestOrders() {
  try {
    const itemsDeleted = await prisma.orderItem.deleteMany({
      where: {
        OR: [
          { order: { orderNumber: { in: ["IT-TEST-999999", "IT-PRINT-017378", "IT-PRINT-017379"] } } },
          { order: { customerName: { in: ["Ratan Tata", "Mahi Kapoor", "Anand Singhania", "Narayana Murthy"] } } },
          { order: { customerEmail: { in: ["ratan.tata@tatagroup.com", "narayana.murthy@infosys.com"] } } },
        ],
      },
    });
    console.log("Deleted test order items:", itemsDeleted.count);

    const ordersDeleted = await prisma.order.deleteMany({
      where: {
        OR: [
          { orderNumber: { in: ["IT-TEST-999999", "IT-PRINT-017378", "IT-PRINT-017379"] } },
          { customerName: { in: ["Ratan Tata", "Mahi Kapoor", "Anand Singhania", "Narayana Murthy"] } },
          { customerEmail: { in: ["ratan.tata@tatagroup.com", "narayana.murthy@infosys.com"] } },
        ],
      },
    });
    console.log("Deleted test orders:", ordersDeleted.count);

    // Also delete any dummy users
    const usersDeleted = await prisma.user.deleteMany({
      where: {
        email: { in: ["ratan.tata@tatagroup.com", "narayana.murthy@infosys.com", "mahi.kapoor@incredibletreasures.com", "anand.singhania@singhaniafincorp.in"] },
      },
    });
    console.log("Deleted test users:", usersDeleted.count);

    // Verify remaining orders
    const remaining = await prisma.order.findMany();
    console.log("Remaining orders in DB:", remaining.length);
  } catch (err) {
    console.error("Purge error:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

purgeAllTestOrders();

