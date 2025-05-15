// Import the Lit component
import '../../src/components/product-showcase.js';

// Sample product data
const sampleProduct = {
  id: 'eco-friendly-water-bottle-vanilla',
  name: 'Eco-Friendly Water Bottle (Vanilla JS)',
  price: 24.99,
  rating: 4.5,
  ratingCount: 128,
  description: 'This reusable water bottle is made from sustainable materials and keeps your drinks cold for up to 24 hours or hot for up to 12 hours. Perfect for outdoor activities or daily use.',
  features: [
    'Made from recycled stainless steel',
    'Double-wall vacuum insulation',
    'BPA-free and eco-friendly',
    'Leak-proof design',
    '750ml capacity'
  ],
  colors: [
    { name: 'Ocean Blue', value: '#0277bd' },
    { name: 'Forest Green', value: '#388e3c' },
    { name: 'Sunset Orange', value: '#e64a19' },
    { name: 'Charcoal Black', value: '#212121' }
  ],
  sizes: ['S', 'M', 'L'],
  imageUrl: 'https://via.placeholder.com/500x500.png?text=Vanilla+JS+Water+Bottle'
};

// Application state
const state = {
  cartItems: [],
  wishlistItems: [],
  selectedColor: null,
  selectedSize: null,
  quantity: 1,
  inWishlist: false,
  lastAction: null
};

// DOM elements
const elements = {
  productContainer: document.getElementById('product-container'),
  cartCount: document.getElementById('cart-count'),
  cartItems: document.getElementById('cart-items'),
  wishlistCount: document.getElementById('wishlist-count'),
  wishlistItems: document.getElementById('wishlist-items'),
  selectedColor: document.getElementById('selected-color'),
  selectedSize: document.getElementById('selected-size'),
  quantity: document.getElementById('quantity'),
  inWishlist: document.getElementById('in-wishlist'),
  lastActionContainer: document.getElementById('last-action-container'),
  lastAction: document.getElementById('last-action')
};

// Create and initialize the product showcase element
function initializeProductShowcase() {
  // Create the Lit component
  const productShowcase = document.createElement('product-showcase');
  
  // Set the product data
  productShowcase.product = sampleProduct;
  
  // Add event listeners
  productShowcase.addEventListener('add-to-cart', handleAddToCart);
  productShowcase.addEventListener('wishlist-change', handleWishlistChange);
  productShowcase.addEventListener('product-config-change', handleConfigChange);
  
  // Append to container
  elements.productContainer.appendChild(productShowcase);
  
  // Get initial state from component
  setTimeout(() => {
    state.selectedColor = productShowcase.selectedColor;
    state.selectedSize = productShowcase.selectedSize;
    state.quantity = productShowcase.quantity;
    state.inWishlist = productShowcase.inWishlist;
    
    updateUI();
  }, 0);
  
  return productShowcase;
}

// Handle add to cart event
function handleAddToCart(e) {
  const detail = e.detail;
  const newCartItem = {
    productId: detail.product.id,
    name: detail.product.name,
    price: detail.product.price,
    color: detail.selectedColor,
    size: detail.selectedSize,
    quantity: detail.quantity
  };
  
  state.cartItems.push(newCartItem);
  state.lastAction = {
    type: 'ADD_TO_CART',
    item: newCartItem
  };
  
  console.log('Added to cart:', detail);
  updateUI();
}

// Handle wishlist change event
function handleWishlistChange(e) {
  const detail = e.detail;
  state.inWishlist = detail.inWishlist;
  
  if (detail.inWishlist) {
    // Add to wishlist if not already present
    if (!state.wishlistItems.includes(detail.product.id)) {
      state.wishlistItems.push(detail.product.id);
    }
  } else {
    // Remove from wishlist
    state.wishlistItems = state.wishlistItems.filter(id => id !== detail.product.id);
  }
  
  state.lastAction = {
    type: 'WISHLIST_CHANGE',
    inWishlist: detail.inWishlist,
    productId: detail.product.id
  };
  
  console.log('Wishlist changed:', detail);
  updateUI();
}

// Handle configuration change event
function handleConfigChange(e) {
  const detail = e.detail;
  state.selectedColor = detail.selectedColor;
  state.selectedSize = detail.selectedSize;
  state.quantity = detail.quantity;
  
  state.lastAction = {
    type: 'CONFIG_CHANGE',
    color: detail.selectedColor,
    size: detail.selectedSize,
    quantity: detail.quantity
  };
  
  console.log('Configuration changed:', detail);
  updateUI();
}

// Update UI based on current state
function updateUI() {
  // Update cart
  elements.cartCount.textContent = state.cartItems.length;
  if (state.cartItems.length > 0) {
    elements.cartItems.innerHTML = '<ul>' + 
      state.cartItems.map(item => 
        `<li>${item.quantity}x ${item.name} (${item.size}) - $${(item.price * item.quantity).toFixed(2)}</li>`
      ).join('') + '</ul>';
  } else {
    elements.cartItems.innerHTML = '<p>No items in cart</p>';
  }
  
  // Update wishlist
  elements.wishlistCount.textContent = state.wishlistItems.length;
  if (state.wishlistItems.length > 0) {
    elements.wishlistItems.innerHTML = '<ul>' + 
      state.wishlistItems.map(id => `<li>Product ID: ${id}</li>`).join('') + '</ul>';
  } else {
    elements.wishlistItems.innerHTML = '<p>No items in wishlist</p>';
  }
  
  // Update component state display
  elements.selectedColor.textContent = state.selectedColor || 'None';
  elements.selectedSize.textContent = state.selectedSize || 'None';
  elements.quantity.textContent = state.quantity;
  elements.inWishlist.textContent = state.inWishlist ? 'Yes' : 'No';
  
  // Update last action
  if (state.lastAction) {
    elements.lastActionContainer.style.display = 'block';
    elements.lastAction.textContent = JSON.stringify(state.lastAction, null, 2);
  }
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeProductShowcase();
});
