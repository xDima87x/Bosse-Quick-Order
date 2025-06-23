import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// --------------------------------------------------
// Basis‑Server (Express) für Bosse‑Bestell‑Demo
// --------------------------------------------------
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());

// Statische Dateien aus /dist (Build) bzw. /public bereitstellen
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

// ------------------------------------------------------------------
// GET /products  →  liefert JSON aus public/data/products.json
// ------------------------------------------------------------------
app.get('/products', (req, res) => {
  try {
    const productsPath = path.join(__dirname, 'public', 'data', 'products.json');
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    res.json(products);
  } catch (err) {
    console.error('Fehler beim Lesen products.json:', err);
    res.status(500).json({ error: 'Products not available' });
  }
});

// ------------------------------------------------------------------
// POST /order  →  Demo‑Endpoint (hier später SAP anrufen)
// ------------------------------------------------------------------
app.post('/order', (req, res) => {
  console.log('Neue Bestellung:', req.body);
  res.json({ status: 'ok' });
});

// --------------------------------------------------
// Server starten
// --------------------------------------------------
const PORT = 3000;
app.listen(PORT, () => console.log(`API läuft auf Port ${PORT}`));