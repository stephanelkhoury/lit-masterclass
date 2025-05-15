<script>
// Import the Lit component
import '../../src/components/product-showcase.js';

export default {
  name: 'ProductShowcaseVue',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedColor: null,
      selectedSize: null,
      quantity: 1,
      inWishlist: false
    };
  },
  mounted() {
    // Get the Lit web component
    const productComponent = this.$refs.productComponent;
    
    if (productComponent) {
      // Store initial values once the component is connected
      this.selectedColor = productComponent.selectedColor;
      this.selectedSize = productComponent.selectedSize;
      this.quantity = productComponent.quantity;
      this.inWishlist = productComponent.inWishlist;
      
      // Set the product data
      productComponent.product = this.product;
      
      // Add event listeners
      productComponent.addEventListener('add-to-cart', this.handleAddToCart);
      productComponent.addEventListener('wishlist-change', this.handleWishlistChange);
      productComponent.addEventListener('product-config-change', this.handleConfigChange);
    }
  },
  beforeUnmount() {
    // Clean up event listeners
    const productComponent = this.$refs.productComponent;
    if (productComponent) {
      productComponent.removeEventListener('add-to-cart', this.handleAddToCart);
      productComponent.removeEventListener('wishlist-change', this.handleWishlistChange);
      productComponent.removeEventListener('product-config-change', this.handleConfigChange);
    }
  },
  watch: {
    product: {
      handler(newProduct) {
        const productComponent = this.$refs.productComponent;
        if (productComponent && newProduct) {
          productComponent.product = newProduct;
        }
      },
      deep: true
    }
  },
  methods: {
    handleAddToCart(e) {
      this.$emit('add-to-cart', e.detail);
    },
    handleWishlistChange(e) {
      this.inWishlist = e.detail.inWishlist;
      this.$emit('wishlist-change', e.detail);
    },
    handleConfigChange(e) {
      this.selectedColor = e.detail.selectedColor;
      this.selectedSize = e.detail.selectedSize;
      this.quantity = e.detail.quantity;
      this.$emit('config-change', e.detail);
    }
  }
};
</script>

<template>
  <div class="vue-wrapper">
    <!-- Vue event bindings don't work with custom elements, 
         so we handle events via addEventListener in mounted() -->
    <product-showcase ref="productComponent"></product-showcase>
    
    <!-- Display the current state from Vue's perspective -->
    <div class="vue-state-display">
      <h3>Vue Component State:</h3>
      <p><strong>Selected Color:</strong> {{ selectedColor }}</p>
      <p><strong>Selected Size:</strong> {{ selectedSize }}</p>
      <p><strong>Quantity:</strong> {{ quantity }}</p>
      <p><strong>In Wishlist:</strong> {{ inWishlist ? 'Yes' : 'No' }}</p>
    </div>
  </div>
</template>

<style scoped>
.vue-wrapper {
  margin-bottom: 20px;
}

.vue-state-display {
  background-color: #f3f3f3;
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
  border-left: 4px solid #42b883; /* Vue color */
}
</style>
