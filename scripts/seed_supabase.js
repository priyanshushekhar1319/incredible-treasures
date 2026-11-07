const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envPath = path.join(__dirname, '..', '.env');
const content = fs.readFileSync(envPath, 'utf-8');
const env = {};
content.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const idx = trimmed.indexOf('=');
  if (idx !== -1) {
    const key = trimmed.slice(0, idx).trim();
    let val = trimmed.slice(idx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    env[key] = val;
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const categories = [
  {
    name: "PVC Visiting Cards",
    slug: "visiting-cards",
    description: "Ultra-luxury water-resistant 400 micron PVC visiting cards with gold foil, spot UV, and translucent frosted finishes.",
    icon: "CreditCard",
    image: "/images/pvc/card_pvc-regular-glossy.png",
    display_order: 1
  },
  {
    name: "Executive Letterheads",
    slug: "letterheads",
    description: "Premium corporate letterheads on Alabaster and Sunshine Bond papers with precision laser alignment.",
    icon: "FileText",
    image: "/images/custom-letterheads-banner.jpg",
    display_order: 2
  },
  {
    name: "Sublimation Ceramic Mugs",
    slug: "mugs",
    description: "High-gloss AAA grade corporate mugs with photo-vibrant 360-degree wraparound printing.",
    icon: "Coffee",
    image: "/images/white-ceramic-mug.jpg",
    display_order: 3
  },
  {
    name: "Corporate Apparel & T-Shirts",
    slug: "tshirts",
    description: "100% bio-washed combed cotton polo and round-neck shirts with custom corporate embroidery.",
    icon: "Shirt",
    image: "/images/custom-cotton-tshirt.jpg",
    display_order: 4
  }
];

async function seed() {
  console.log('--- Seeding Categories to Supabase Cloud ---');
  for (const cat of categories) {
    const { data: existing } = await supabase.from('categories').select('id').eq('slug', cat.slug).single();
    if (!existing) {
      const { error } = await supabase.from('categories').insert(cat);
      if (error) console.error(`Error inserting category ${cat.name}:`, error.message);
      else console.log(`Inserted category: ${cat.name}`);
    } else {
      console.log(`Category already exists: ${cat.name}`);
    }
  }

  // Count total categories & products
  const { data: catList } = await supabase.from('categories').select('*');
  console.log(`\n🎉 Supabase Cloud Database is Fully Seeded! Total categories in cloud: ${catList?.length || 0}`);
}

seed();
