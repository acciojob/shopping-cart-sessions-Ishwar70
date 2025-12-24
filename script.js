// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// ✅ ALWAYS return an array
function getCart() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Save cart
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render products
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price} `;

    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";

    btn.addEventListener("click", () => {
      addToCart(product.id);
    });

    li.appendChild(btn);
    productList.appendChild(li);
  });
}

// Render cart
function renderCart() {
  cartList.innerHTML = "";

  const cart = getCart();
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add to cart (🔥 SAFE)
function addToCart(productId) {
  const cart = getCart(); // ALWAYS array
  const product = products.find((p) => p.id === productId);

  cart.push(product);
  saveCart(cart);
  renderCart();
}

// Clear cart (DO NOT remove key)
function clearCart() {
  saveCart([]);
  renderCart();
}

// Events
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
