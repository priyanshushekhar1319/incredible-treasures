async function testBanners() {
  const res = await fetch("http://localhost:3000/api/marketing/banners");
  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Response text:", text);
}
testBanners();

