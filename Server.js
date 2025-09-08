const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const products = require('./products.json');
let cart = [];

app.get('/api/products', (req, res) => res.json(products));
app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push({ productId, quantity, name: product.name, price: product.price });
  }
  res.json(cart);
});
app.get('/api/cart', (req, res) => res.json(cart));

app.listen(port, () => console.log(`Backend running on port ${port}`));
