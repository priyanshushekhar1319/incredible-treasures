async function testFlows() {
  console.log("=== 1. TESTING UNIFIED ADMIN LOGIN VIA /api/auth/customer ===");
  const loginRes = await fetch("http://localhost:3000/api/auth/customer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "login",
      email: "admin@incredibletreasures.com",
      password: "IncredibleAdmin@2026",
    }),
  });
  const loginData = await loginRes.json();
  console.log("Status:", loginRes.status);
  console.log("Result:", JSON.stringify(loginData, null, 2));

  console.log("\n=== 2. TESTING ORDERS API FOR ZERO FAKE DATA ===");
  const ordersRes = await fetch("http://localhost:3000/api/orders?limit=100");
  const ordersData = await ordersRes.json();
  console.log("Orders count in DB:", ordersData.orders?.length);
  console.log("Orders sample:", ordersData.orders);

  console.log("\n=== 3. TESTING MARKETING BANNERS DEDUPLICATION ===");
  const bannersRes = await fetch("http://localhost:3000/api/marketing/banners");
  const bannersData = await bannersRes.json();
  console.log("Banners count:", bannersData.banners?.length);
  if (bannersData.banners) {
    bannersData.banners.forEach((b, i) => {
      console.log(`Slide ${i + 1}: ID=${b.id}, Category=${b.category}, Title="${b.title}", CrackersFX=${b.enableCrackersEffect}`);
    });
  }
}

testFlows();

