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

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function testPhoneOtp() {
  console.log('Testing Supabase signInWithOtp for phone number +918797020160...');
  const { data, error } = await supabase.auth.signInWithOtp({
    phone: '+918797020160'
  });
  console.log('Phone Result:', { data, error });
}

testPhoneOtp();
