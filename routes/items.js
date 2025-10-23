// routes/items.js
const express = require('express');
const router = express.Router();
const supabase = require('../lib/supabase');

// 🧼 GET semua pesanan (dengan filter optional)
router.get('/', async (req, res) => {
  const { status } = req.query;
  let query = supabase.from('items').select('*');
  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 🧴 GET pesanan berdasarkan ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
});

// 🧺 POST buat pesanan baru (cuci sepatu)
router.post('/', async (req, res) => {
  const { name, status = 'Diterima', price, note } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Nama pelanggan wajib diisi' });
  }

  const { data, error } = await supabase
    .from('items')
    .insert([{ name, status, price, note }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({
    message: 'Pesanan berhasil dibuat ✅',
    data,
  });
});

// 🧼 PUT update status pesanan
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = {
    ...req.body,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('items')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({
    message: 'Pesanan berhasil diperbarui ✏️',
    data,
  });
});

// 🧽 DELETE hapus pesanan
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Validasi format UUID (biar tidak error "invalid input syntax for type uuid")
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return res.status(400).json({ error: 'ID pesanan tidak valid (harus UUID)' });
  }

  const { data, error } = await supabase
    .from('items')
    .delete()
    .eq('id', id)
    .select(); // ⚠️ jangan pakai .single()

  if (error) return res.status(500).json({ error: error.message });
  if (!data || data.length === 0)
    return res.status(404).json({ error: 'Pesanan tidak ditemukan' });

  res.json({
    message: 'Pesanan berhasil dihapus 🗑️',
    deleted: true,
    item: data[0],
  });
});

module.exports = router;
