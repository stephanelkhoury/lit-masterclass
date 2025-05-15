import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';

// Import the Lit component
// We'll need to use CUSTOM_ELEMENTS_SCHEMA in the module
import '../../../src/components/product-showcase.js';

@Component({
  selector: 'app-product-showcase-angular',
  templateUrl: './product-showcase-angular.component.html',
  styleUrls: ['./product-showcase-angular.component.css']
})
export class ProductShowcaseAngularComponent implements OnInit {
  @Input() product: any = null;
  @Output() addToCart = new EventEmitter<any>();
  @Output() wishlistChange = new EventEmitter<any>();
  @Output() configChange = new EventEmitter<any>();

  @ViewChild('productComponent') productComponentRef!: ElementRef;

  // Component state
  selectedColor: string | null = null;
  selectedSize: string | null = null;
  quantity: number = 1;
  inWishlist: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    // Get the Lit web component
    const productComponent = this.productComponentRef.nativeElement;
    
    if (productComponent) {
      // Set the product data
      productComponent.product = this.product;

      // Store initial values once the component is connected
      this.selectedColor = productComponent.selectedColor;
      this.selectedSize = productComponent.selectedSize;
      this.quantity = productComponent.quantity;
      this.inWishlist = productComponent.inWishlist;
      
      // Add event listeners
      productComponent.addEventListener('add-to-cart', this.handleAddToCart.bind(this));
      productComponent.addEventListener('wishlist-change', this.handleWishlistChange.bind(this));
      productComponent.addEventListener('product-config-change', this.handleConfigChange.bind(this));
    }
  }

  ngOnChanges() {
    // Update the web component if the product input changes
    const productComponent = this.productComponentRef?.nativeElement;
    
    if (productComponent && this.product) {
      productComponent.product = this.product;
    }
  }

  ngOnDestroy() {
    // Clean up event listeners
    const productComponent = this.productComponentRef?.nativeElement;
    
    if (productComponent) {
      productComponent.removeEventListener('add-to-cart', this.handleAddToCart.bind(this));
      productComponent.removeEventListener('wishlist-change', this.handleWishlistChange.bind(this));
      productComponent.removeEventListener('product-config-change', this.handleConfigChange.bind(this));
    }
  }

  handleAddToCart(e: any) {
    this.addToCart.emit(e.detail);
  }

  handleWishlistChange(e: any) {
    this.inWishlist = e.detail.inWishlist;
    this.wishlistChange.emit(e.detail);
  }

  handleConfigChange(e: any) {
    this.selectedColor = e.detail.selectedColor;
    this.selectedSize = e.detail.selectedSize;
    this.quantity = e.detail.quantity;
    this.configChange.emit(e.detail);
  }
}
