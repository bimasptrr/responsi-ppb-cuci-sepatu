// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const itemsRouter = require('./routes/items');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Router utama
app.use('/items', itemsRouter);

// ✅ Tambahkan baris ini agar kompatibel dengan Vercel
module.exports = app;
