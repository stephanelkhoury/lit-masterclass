import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

/**
 * Component demonstrating the repeat directive
 */
export class RepeatExample extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    
    .list-container {
      border: 1px solid #eee;
      border-radius: var(--border-radius);
      padding: 1rem;
      margin: 1rem 0;
      max-height: 300px;
      overflow-y: auto;
    }
    
    .list-item {
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      background-color: #f9f9f9;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .controls {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .info {
      background-color: #e3f2fd;
      padding: 1rem;
      border-radius: var(--border-radius);
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }
    
    .highlight {
      background-color: #f0f4c3;
    }
  `;

  static properties = {
    items: { type: Array },
    sortDirection: { type: String }
  };

  constructor() {
    super();
    this.items = [
      { id: 1, name: 'Apple', category: 'Fruit' },
      { id: 2, name: 'Carrot', category: 'Vegetable' },
      { id: 3, name: 'Banana', category: 'Fruit' },
      { id: 4, name: 'Broccoli', category: 'Vegetable' },
      { id: 5, name: 'Orange', category: 'Fruit' }
    ];
    this.sortDirection = 'asc';
  }

  // Shuffle the array randomly
  shuffleItems() {
    // Create a copy of the array and shuffle it
    const shuffled = [...this.items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    this.items = shuffled;
  }

  // Sort the array by name
  sortItems() {
    const sorted = [...this.items];
    sorted.sort((a, b) => {
      const factor = this.sortDirection === 'asc' ? 1 : -1;
      return factor * a.name.localeCompare(b.name);
    });
    
    this.items = sorted;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

  // Add a new item
  addItem() {
    const fruits = ['Mango', 'Strawberry', 'Cherry', 'Grape', 'Kiwi', 'Pineapple'];
    const vegetables = ['Cucumber', 'Spinach', 'Pepper', 'Onion', 'Tomato', 'Potato'];
    
    const isVegetable = Math.random() > 0.5;
    const options = isVegetable ? vegetables : fruits;
    const name = options[Math.floor(Math.random() * options.length)];
    const category = isVegetable ? 'Vegetable' : 'Fruit';
    
    this.items = [...this.items, {
      id: Date.now(),
      name,
      category
    }];
  }

  // Remove an item
  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
  }

  render() {
    return html`
      <div class="info">
        The <code>repeat</code> directive is more efficient than <code>map</code> for 
        rendering arrays when items may be added, removed, or reordered.
        It creates and updates DOM efficiently using the provided key function.
      </div>
      
      <div class="controls">
        <button @click=${this.addItem}>Add Random Item</button>
        <button @click=${this.sortItems}>
          Sort ${this.sortDirection === 'asc' ? '↑' : '↓'}
        </button>
        <button @click=${this.shuffleItems}>Shuffle</button>
      </div>
      
      <div class="list-container">
        ${repeat(
          this.items,
          (item) => item.id, // Key function for identity
          (item, index) => html`
            <div class="list-item ${index % 2 === 0 ? 'highlight' : ''}">
              <div>
                <strong>${index + 1}. ${item.name}</strong>
                <span>(${item.category})</span>
              </div>
              <button class="accent" @click=${() => this.removeItem(item.id)}>Remove</button>
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define('repeat-example', RepeatExample);
