const express = require('express');
const router = express.Router();

// In-memory data store
let products = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
  { id: 2, name: 'Headphones', price: 49.99, category: 'Electronics' },
  { id: 3, name: 'Coffee Mug', price: 12.99, category: 'Kitchen' },
];
let nextId = 4;

// GET all products
router.get('/', (req, res) => {
  res.json(products);
});

// GET product by ID
router.get('/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// POST create product
router.post('/', (req, res) => {
  const { name, price, category } = req.body;
  if (!name || price == null) {
    return res.status(400).json({ error: 'name and price are required' });
  }
  const product = { id: nextId++, name, price, category: category || 'General' };
  products.push(product);
  res.status(201).json(product);
});

// PUT update product
router.put('/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const { name, price, category } = req.body;
  if (name) product.name = name;
  if (price != null) product.price = price;
  if (category) product.category = category;
  res.json(product);
});

// DELETE product
router.delete('/:id', (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
});

module.exports = router;
