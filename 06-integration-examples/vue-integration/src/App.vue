<script>
import ProductShowcaseVue from './components/ProductShowcaseVue.vue';

// Sample product data
const sampleProduct = {
  id: 'eco-friendly-water-bottle-vue',
  name: 'Eco-Friendly Water Bottle (Vue)',
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
  imageUrl: 'https://via.placeholder.com/500x500.png?text=Vue+Water+Bottle'
};

export default {
  name: 'App',
  components: {
    ProductShowcaseVue
  },
  data() {
    return {
      product: sampleProduct,
      cartItems: [],
      wishlistItems: [],
      lastAction: null
    };
  },
  methods: {
    handleAddToCart(detail) {
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
    },
    
    handleWishlistChange(detail) {
      if (detail.inWishlist) {
        // Add to wishlist
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
    },
    
    handleConfigChange(detail) {
      console.log('Configuration changed:', detail);
      this.lastAction = {
        type: 'CONFIG_CHANGE',
        color: detail.selectedColor,
        size: detail.selectedSize,
        quantity: detail.quantity
      };
    }
  }
};
</script>

<template>
  <div class="vue-app">
    <div class="intro">
      <h2>Vue + Lit Integration</h2>
      <p>
        This example shows how to use Lit Web Components in a Vue application.
        The product showcase below is a Lit component, but it's wrapped in a Vue component
        to handle props and events in a Vue-friendly way.
      </p>
    </div>
    
    <div class="vue-example">
      <ProductShowcaseVue 
        :product="product"
        @add-to-cart="handleAddToCart"
        @wishlist-change="handleWishlistChange"
        @config-change="handleConfigChange"
      />
    </div>
    
    <div class="vue-actions">
      <h3>Vue Application State:</h3>
      
      <div class="state-section">
        <h4>Cart Items ({{ cartItems.length }})</h4>
        <ul v-if="cartItems.length > 0">
          <li v-for="(item, index) in cartItems" :key="index">
            {{ item.quantity }}x {{ item.name }} ({{ item.size }}) - ${{ (item.price * item.quantity).toFixed(2) }}
          </li>
        </ul>
        <p v-else>No items in cart</p>
      </div>
      
      <div class="state-section">
        <h4>Wishlist Items ({{ wishlistItems.length }})</h4>
        <ul v-if="wishlistItems.length > 0">
          <li v-for="(id, index) in wishlistItems" :key="index">
            Product ID: {{ id }}
          </li>
        </ul>
        <p v-else>No items in wishlist</p>
      </div>
      
      <div v-if="lastAction" class="last-action">
        <h4>Last Action:</h4>
        <pre>{{ JSON.stringify(lastAction, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<style>
.vue-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
}

.intro {
  margin-bottom: 30px;
}

.vue-example {
  margin-bottom: 30px;
}

.vue-actions {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 4px;
  border-left: 4px solid #42b883;
}

.state-section {
  margin-bottom: 20px;
}

.state-section h4 {
  margin-bottom: 10px;
}

.state-section ul {
  padding-left: 20px;
}

.last-action {
  background-color: #f0f8ff;
  padding: 10px;
  border-radius: 4px;
}

.last-action pre {
  white-space: pre-wrap;
  overflow: auto;
  background-color: #eee;
  padding: 10px;
  border-radius: 4px;
}
</style>
