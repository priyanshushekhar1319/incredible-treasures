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

async function testOrder() {
  const orderNumber = 'IT-CLOUD-' + Math.floor(100000 + Math.random() * 900000);
  const { data, error } = await supabase.from('orders').insert({
    order_number: orderNumber,
    customer_name: 'Priya Sharma (Cloud Verification)',
    customer_email: 'priya@incredible-treasures.com',
    customer_phone: '+91 99450 39266',
    shipping_address: 'B405, Century Saras, Off Ananthapura Road, Yelahanka',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560064',
    is_b2b: true,
    company_name: 'Incredible Treasures Corporate',
    gstin: '29AAKFI2392F1Z5',
    subtotal: 2500,
    tax_amount: 450,
    cgst_amount: 225,
    sgst_amount: 225,
    shipping_fee: 0,
    total_amount: 2950,
    status: 'ORDER_CONFIRMED',
    status_label: 'Order Confirmed & Pre-Flight Queued',
    payment_status: 'PAID_ADVANCE',
    payment_method: 'card',
    courier_partner: 'BlueDart Apex Air',
    awb_number: 'BD-88921102'
  }).select();

  if (error) {
    console.error('Order insert error:', error.message);
  } else {
    console.log(`✅ Real-Time Cloud Order Created Successfully: ${data[0].order_number} (ID: ${data[0].id})`);
  }
}

testOrder();
