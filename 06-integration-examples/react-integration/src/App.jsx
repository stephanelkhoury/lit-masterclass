// Main React application
import React, { useState } from 'react';

// Import our React-wrapped Lit component
import ProductShowcaseReact from './components/ProductShowcaseReact';

// Sample product data
const sampleProduct = {
  id: 'eco-friendly-water-bottle',
  name: 'Eco-Friendly Water Bottle (React)',
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
  imageUrl: 'https://via.placeholder.com/500x500.png?text=React+Water+Bottle'
};

// App component
function App() {
  // State to track cart items
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  // State to track the last action for display
  const [lastAction, setLastAction] = useState(null);

  // Handle add to cart event from Lit component
  const handleAddToCart = (detail) => {
    const newCartItem = {
      productId: detail.product.id,
      name: detail.product.name,
      price: detail.product.price,
      color: detail.selectedColor,
      size: detail.selectedSize,
      quantity: detail.quantity
    };
    
    setCartItems([...cartItems, newCartItem]);
    setLastAction({
      type: 'ADD_TO_CART',
      item: newCartItem
    });
    
    console.log('Added to cart:', detail);
  };

  // Handle wishlist change event from Lit component
  const handleWishlistChange = (detail) => {
    if (detail.inWishlist) {
      // Add to wishlist
      setWishlistItems([...wishlistItems, detail.product.id]);
    } else {
      // Remove from wishlist
      setWishlistItems(wishlistItems.filter(id => id !== detail.product.id));
    }
    
    setLastAction({
      type: 'WISHLIST_CHANGE',
      inWishlist: detail.inWishlist,
      productId: detail.product.id
    });
    
    console.log('Wishlist changed:', detail);
  };

  // Handle configuration change event from Lit component
  const handleConfigChange = (detail) => {
    console.log('Configuration changed:', detail);
    setLastAction({
      type: 'CONFIG_CHANGE',
      color: detail.selectedColor,
      size: detail.selectedSize,
      quantity: detail.quantity
    });
  };

  return (
    <div className="react-app">
      <div className="intro">
        <h2>React + Lit Integration</h2>
        <p>
          This example shows how to use Lit Web Components in a React application.
          The product showcase below is a Lit component, but it's wrapped in a React component
          to handle props and events in a React-friendly way.
        </p>
      </div>
      
      <div className="react-example">
        <ProductShowcaseReact 
          product={sampleProduct}
          onAddToCart={handleAddToCart}
          onWishlistChange={handleWishlistChange}
          onConfigChange={handleConfigChange}
        />
      </div>
      
      <div className="react-actions">
        <h3>React Application State:</h3>
        
        <div className="state-section">
          <h4>Cart Items ({cartItems.length})</h4>
          {cartItems.length > 0 ? (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.quantity}x {item.name} ({item.size}) - ${(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in cart</p>
          )}
        </div>
        
        <div className="state-section">
          <h4>Wishlist Items ({wishlistItems.length})</h4>
          {wishlistItems.length > 0 ? (
            <ul>
              {wishlistItems.map((id, index) => (
                <li key={index}>Product ID: {id}</li>
              ))}
            </ul>
          ) : (
            <p>No items in wishlist</p>
          )}
        </div>
        
        {lastAction && (
          <div className="last-action">
            <h4>Last Action:</h4>
            <pre>{JSON.stringify(lastAction, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
