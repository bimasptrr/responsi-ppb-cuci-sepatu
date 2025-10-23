// lib/supabase.js
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Ambil URL dan KEY dari .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Buat koneksi ke Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
