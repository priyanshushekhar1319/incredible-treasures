const fs = require("fs");
const path = require("path");
const filePath = path.join(process.cwd(), "public", "uploads", "custom_banners.json");
console.log("Exists:", fs.existsSync(filePath));
if (fs.existsSync(filePath)) {
  const content = fs.readFileSync(filePath, "utf-8");
  console.log("Content:", content);
}

