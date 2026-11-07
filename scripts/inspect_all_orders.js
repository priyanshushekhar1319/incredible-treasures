const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function inspect() {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true, user: true },
    });
    console.log("=== TOTAL ORDERS IN DB ===", orders.length);
    orders.forEach((o) => {
      console.log(`- ID: ${o.id}, OrderNo: ${o.orderNumber}, Customer: ${o.customerName}, Status: ${o.status}, Total: ${o.totalAmount}, Email: ${o.customerEmail}`);
    });

    const users = await prisma.user.findMany();
    console.log("=== TOTAL USERS IN DB ===", users.length);
    users.forEach((u) => {
      console.log(`- User: ${u.email} (${u.name}), Role: ${u.role}`);
    });
  } catch (err) {
    console.error("Inspect error:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

inspect();

