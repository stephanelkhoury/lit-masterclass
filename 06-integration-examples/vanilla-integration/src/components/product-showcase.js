import { LitElement, html, css } from 'lit';

/**
 * A reusable product showcase component that can be integrated
 * with various frameworks.
 */
export class ProductShowcase extends LitElement {
  static styles = css`
    :host {
      display: block;
      --product-primary-color: var(--primary-color, #2e7d32);
      --product-secondary-color: var(--secondary-color, #0288d1);
      --product-accent-color: var(--accent-color, #f57c00);
    }
    
    .product-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
    
    .product-image {
      max-width: 100%;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .product-details {
      display: flex;
      flex-direction: column;
    }
    
    .product-name {
      margin-top: 0;
      color: var(--product-primary-color);
      font-size: 1.8rem;
    }
    
    .product-price {
      font-size: 1.4rem;
      font-weight: bold;
      margin: 0.5rem 0 1rem;
    }
    
    .product-description {
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
    
    .ratings {
      display: flex;
      align-items: center;
      margin: 1rem 0;
    }
    
    .stars {
      color: gold;
      letter-spacing: 0.25rem;
    }
    
    .rating-count {
      color: #666;
      font-size: 0.9rem;
      margin-left: 0.5rem;
    }
    
    .product-options {
      margin: 1rem 0;
    }
    
    .option-title {
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .color-options {
      display: flex;
      gap: 0.5rem;
    }
    
    .color-option {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid transparent;
      transition: transform 0.2s, border-color 0.2s;
    }
    
    .color-option.selected {
      border-color: var(--product-secondary-color);
      transform: scale(1.1);
    }
    
    .size-options {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    
    .size-option {
      min-width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .size-option.selected {
      background-color: var(--product-secondary-color);
      color: white;
      border-color: var(--product-secondary-color);
    }
    
    .quantity-selector {
      display: flex;
      align-items: center;
      margin: 1.5rem 0;
    }
    
    .quantity-btn {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
      border: none;
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: bold;
    }
    
    .quantity-input {
      width: 50px;
      height: 36px;
      text-align: center;
      border: 1px solid #ddd;
      margin: 0 0.5rem;
      font-size: 1rem;
    }
    
    .action-buttons {
      display: flex;
      gap: 1rem;
      margin-top: auto;
    }
    
    .add-to-cart-btn {
      background-color: var(--product-primary-color);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      flex: 2;
      font-size: 1rem;
      transition: background-color 0.3s;
    }
    
    .add-to-cart-btn:hover {
      opacity: 0.9;
    }
    
    .wishlist-btn {
      background-color: white;
      color: var(--product-primary-color);
      border: 1px solid var(--product-primary-color);
      padding: 0.75rem;
      border-radius: 4px;
      cursor: pointer;
      flex: 1;
      font-size: 1rem;
      transition: background-color 0.3s;
    }
    
    .wishlist-btn:hover {
      background-color: #f5f5f5;
    }
    
    @media (max-width: 768px) {
      .product-container {
        grid-template-columns: 1fr;
      }
    }
  `;

  static properties = {
    product: { type: Object },
    selectedColor: { type: String },
    selectedSize: { type: String },
    quantity: { type: Number },
    inWishlist: { type: Boolean }
  };

  constructor() {
    super();
    
    // Default product data
    this.product = {
      id: 'eco-friendly-water-bottle',
      name: 'Eco-Friendly Water Bottle',
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
      imageUrl: 'https://via.placeholder.com/500x500.png?text=Eco+Water+Bottle'
    };
    
    this.selectedColor = this.product.colors[0].value;
    this.selectedSize = this.product.sizes[1]; // Default to Medium
    this.quantity = 1;
    this.inWishlist = false;
  }

  // Change selected color
  _selectColor(color) {
    this.selectedColor = color;
    this._dispatchChangeEvent();
  }

  // Change selected size
  _selectSize(size) {
    this.selectedSize = size;
    this._dispatchChangeEvent();
  }

  // Increase quantity
  _increaseQuantity() {
    this.quantity++;
    this._dispatchChangeEvent();
  }

  // Decrease quantity
  _decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this._dispatchChangeEvent();
    }
  }

  // Update quantity from input
  _updateQuantity(e) {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      this.quantity = value;
      this._dispatchChangeEvent();
    } else {
      e.target.value = this.quantity;
    }
  }

  // Toggle wishlist status
  _toggleWishlist() {
    this.inWishlist = !this.inWishlist;
    
    this.dispatchEvent(new CustomEvent('wishlist-change', {
      bubbles: true,
      composed: true,
      detail: {
        product: this.product,
        inWishlist: this.inWishlist
      }
    }));
  }

  // Add to cart
  _addToCart() {
    this.dispatchEvent(new CustomEvent('add-to-cart', {
      bubbles: true,
      composed: true,
      detail: {
        product: this.product,
        selectedColor: this.selectedColor,
        selectedSize: this.selectedSize,
        quantity: this.quantity
      }
    }));
  }

  // Dispatch change event when selections change
  _dispatchChangeEvent() {
    this.dispatchEvent(new CustomEvent('product-config-change', {
      bubbles: true,
      composed: true,
      detail: {
        product: this.product,
        selectedColor: this.selectedColor,
        selectedSize: this.selectedSize,
        quantity: this.quantity
      }
    }));
  }

  // Generate star rating display
  _renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '½';
    stars += '☆'.repeat(5 - Math.ceil(rating));
    
    return stars;
  }

  render() {
    const { product, selectedColor, selectedSize, quantity, inWishlist } = this;
    
    return html`
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.imageUrl}" alt="${product.name}">
        </div>
        
        <div class="product-details">
          <h2 class="product-name">${product.name}</h2>
          
          <div class="ratings">
            <span class="stars">${this._renderStars(product.rating)}</span>
            <span class="rating-count">(${product.ratingCount} reviews)</span>
          </div>
          
          <div class="product-price">$${product.price.toFixed(2)}</div>
          
          <p class="product-description">${product.description}</p>
          
          <div class="product-options">
            <div class="option-title">Color:</div>
            <div class="color-options">
              ${product.colors.map(color => html`
                <div 
                  class="color-option ${color.value === selectedColor ? 'selected' : ''}" 
                  style="background-color: ${color.value}" 
                  title="${color.name}"
                  @click=${() => this._selectColor(color.value)}>
                </div>
              `)}
            </div>
            
            <div class="option-title" style="margin-top: 1rem;">Size:</div>
            <div class="size-options">
              ${product.sizes.map(size => html`
                <div 
                  class="size-option ${size === selectedSize ? 'selected' : ''}" 
                  @click=${() => this._selectSize(size)}>
                  ${size}
                </div>
              `)}
            </div>
          </div>
          
          <div class="quantity-selector">
            <button class="quantity-btn" @click=${this._decreaseQuantity}>-</button>
            <input 
              type="number" 
              class="quantity-input" 
              min="1" 
              .value=${quantity}
              @change=${this._updateQuantity}>
            <button class="quantity-btn" @click=${this._increaseQuantity}>+</button>
          </div>
          
          <div class="action-buttons">
            <button class="add-to-cart-btn" @click=${this._addToCart}>Add to Cart</button>
            <button class="wishlist-btn" @click=${this._toggleWishlist}>
              ${inWishlist ? '❤️ In Wishlist' : '🤍 Wishlist'}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('product-showcase', ProductShowcase);
