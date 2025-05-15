// Import React
import React, { useRef, useEffect, useState } from 'react';

// Import our Lit component
import '../../src/components/product-showcase.js';

/**
 * React wrapper for the ProductShowcase Lit component.
 * 
 * This demonstrates how to:
 * 1. Pass props to a Lit web component from React
 * 2. Listen to custom events from Lit components
 * 3. Access Lit component's properties and methods
 */
const ProductShowcaseReact = ({
  product = null,
  onAddToCart,
  onWishlistChange,
  onConfigChange
}) => {
  // Create a reference to the web component
  const productComponentRef = useRef(null);
  
  // State to track changes
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);

  // Set up event listeners when the component mounts
  useEffect(() => {
    const productComponent = productComponentRef.current;
    
    if (productComponent) {
      // Store initial values once the component is connected
      setSelectedColor(productComponent.selectedColor);
      setSelectedSize(productComponent.selectedSize);
      setQuantity(productComponent.quantity);
      setInWishlist(productComponent.inWishlist);
      
      // Add to cart event listener
      const handleAddToCart = (e) => {
        if (onAddToCart) {
          onAddToCart(e.detail);
        }
      };
      
      // Wishlist change event listener
      const handleWishlistChange = (e) => {
        setInWishlist(e.detail.inWishlist);
        
        if (onWishlistChange) {
          onWishlistChange(e.detail);
        }
      };
      
      // Product configuration change event listener
      const handleConfigChange = (e) => {
        setSelectedColor(e.detail.selectedColor);
        setSelectedSize(e.detail.selectedSize);
        setQuantity(e.detail.quantity);
        
        if (onConfigChange) {
          onConfigChange(e.detail);
        }
      };
      
      // Add event listeners
      productComponent.addEventListener('add-to-cart', handleAddToCart);
      productComponent.addEventListener('wishlist-change', handleWishlistChange);
      productComponent.addEventListener('product-config-change', handleConfigChange);
      
      // Clean up event listeners on unmount
      return () => {
        productComponent.removeEventListener('add-to-cart', handleAddToCart);
        productComponent.removeEventListener('wishlist-change', handleWishlistChange);
        productComponent.removeEventListener('product-config-change', handleConfigChange);
      };
    }
  }, [onAddToCart, onWishlistChange, onConfigChange]);

  // Update the web component if the product prop changes
  useEffect(() => {
    const productComponent = productComponentRef.current;
    
    if (productComponent && product) {
      productComponent.product = product;
    }
  }, [product]);

  return (
    <div className="react-wrapper">
      {/* React event listeners don't work with custom elements, 
          so we handle events via addEventListener in useEffect */}
      <product-showcase ref={productComponentRef}></product-showcase>
      
      {/* Display the current state from React's perspective */}
      <div className="react-state-display">
        <h3>React Component State:</h3>
        <p><strong>Selected Color:</strong> {selectedColor}</p>
        <p><strong>Selected Size:</strong> {selectedSize}</p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>In Wishlist:</strong> {inWishlist ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default ProductShowcaseReact;
