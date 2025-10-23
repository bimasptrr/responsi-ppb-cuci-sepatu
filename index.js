// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const itemsRouter = require('./routes/items');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Route utama (agar https://responsippb.vercel.app/ tidak error)
app.get('/', (req, res) => {
  res.send('API Cuci Sepatu - Responsi PPB 💦');
});

// ✅ Router untuk /items
app.use('/items', itemsRouter);

// ✅ Jalankan server secara lokal
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
  });
}

// ✅ Export app untuk kompatibilitas Vercel
module.exports = app;
