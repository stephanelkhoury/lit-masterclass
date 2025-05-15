import { Component } from '@angular/core';

// Sample product data
const sampleProduct = {
  id: 'eco-friendly-water-bottle-angular',
  name: 'Eco-Friendly Water Bottle (Angular)',
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
  imageUrl: 'https://via.placeholder.com/500x500.png?text=Angular+Water+Bottle'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  product = sampleProduct;
  cartItems: any[] = [];
  wishlistItems: string[] = [];
  lastAction: any = null;

  handleAddToCart(detail: any) {
    const newCartItem = {
      productId: detail.product.id,
      name: detail.product.name,
      price: detail.product.price,
      color: detail.selectedColor,
      size: detail.selectedSize,
      quantity: detail.quantity
    };
    
    this.cartItems.push(newCartItem);
    this.lastAction = {
      type: 'ADD_TO_CART',
      item: newCartItem
    };
    
    console.log('Added to cart:', detail);
  }

  handleWishlistChange(detail: any) {
    if (detail.inWishlist) {
      // Add to wishlist if not already present
      if (!this.wishlistItems.includes(detail.product.id)) {
        this.wishlistItems.push(detail.product.id);
      }
    } else {
      // Remove from wishlist
      this.wishlistItems = this.wishlistItems.filter(id => id !== detail.product.id);
    }
    
    this.lastAction = {
      type: 'WISHLIST_CHANGE',
      inWishlist: detail.inWishlist,
      productId: detail.product.id
    };
    
    console.log('Wishlist changed:', detail);
  }

  handleConfigChange(detail: any) {
    console.log('Configuration changed:', detail);
    this.lastAction = {
      type: 'CONFIG_CHANGE',
      color: detail.selectedColor,
      size: detail.selectedSize,
      quantity: detail.quantity
    };
  }
}
