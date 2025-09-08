const PRODUCTS_URL = 'http://localhost:5000/api/products';
const CART_URL = 'http://localhost:5000/api/cart';

async function loadProducts(){
  const res = await fetch(PRODUCTS_URL);
  const products = await res.json();
  document.getElementById('products').innerHTML = products.map(
    p => `<div>${p.name} - ₹${p.price}
          <button onclick="addToCart(${p.id})">Add</button></div>`
  ).join('');
}

async function addToCart(productId){
  await fetch(CART_URL, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ productId, quantity: 1 })
  });
  loadCart();
}

async function loadCart(){
  const res = await fetch(CART_URL);
  const cart = await res.json();
  document.getElementById('cart').innerText = JSON.stringify(cart, null, 2);
}

loadProducts();
loadCart();
