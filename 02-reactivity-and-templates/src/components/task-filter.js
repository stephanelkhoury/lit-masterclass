import { LitElement, html, css } from 'lit';

/**
 * A component for filtering todos by status
 * Demonstrates:
 * - Property binding
 * - Handling user input
 * - Conditional attribute binding
 */
export class TaskFilter extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    
    .filter-container {
      display: flex;
      gap: 0.5rem;
    }
    
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      background-color: #e0e0e0;
      transition: background-color 0.3s;
    }
    
    button.active {
      background-color: var(--primary-color);
      color: white;
    }
  `;

  static properties = {
    currentFilter: { type: String }, // The currently active filter
  };

  constructor() {
    super();
    this.currentFilter = 'all';
  }

  // Apply a new filter and dispatch an event to the parent
  applyFilter(filter) {
    this.dispatchEvent(new CustomEvent('filter-change', {
      bubbles: true,
      composed: true,
      detail: { filter }
    }));
  }

  // Event handlers for the filter buttons
  handleAllFilter() {
    this.applyFilter('all');
  }

  handleActiveFilter() {
    this.applyFilter('active');
  }

  handleCompletedFilter() {
    this.applyFilter('completed');
  }

  render() {
    // Using the current filter to conditionally add 'active' class
    return html`
      <div class="filter-container">
        <button 
          class="${this.currentFilter === 'all' ? 'active' : ''}" 
          @click="${this.handleAllFilter}">
          All
        </button>
        <button 
          class="${this.currentFilter === 'active' ? 'active' : ''}" 
          @click="${this.handleActiveFilter}">
          Active
        </button>
        <button 
          class="${this.currentFilter === 'completed' ? 'active' : ''}" 
          @click="${this.handleCompletedFilter}">
          Completed
        </button>
      </div>
    `;
  }
}

customElements.define('task-filter', TaskFilter);
