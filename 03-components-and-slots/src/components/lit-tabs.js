import { LitElement, html, css } from 'lit';

/**
 * A tabs component that works with lit-panel
 * 
 * @fires tab-change - Fired when a tab is selected with detail: { index, id }
 * 
 * @cssprop --tab-background - Background color of tabs
 * @cssprop --tab-active-color - Text color of the active tab
 * @cssprop --tab-indicator-color - Color of the active tab indicator
 */
export class LitTabs extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    
    .tabs-container {
      display: flex;
      overflow-x: auto;
      background-color: var(--tab-background, #f5f5f5);
      border-radius: var(--border-radius, 8px) var(--border-radius, 8px) 0 0;
    }
    
    .tab {
      padding: 1rem 1.5rem;
      cursor: pointer;
      user-select: none;
      transition: color 0.3s;
      white-space: nowrap;
      color: #555;
      position: relative;
    }
    
    .tab:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
    
    .tab.active {
      color: var(--tab-active-color, var(--primary-color, #7e57c2));
      font-weight: 500;
    }
    
    .tab.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background-color: var(--tab-indicator-color, var(--primary-color, #7e57c2));
    }
    
    /* Style for disabled tabs */
    .tab.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  static properties = {
    tabs: { type: Array }, // Array of tab objects
    activeTabIndex: { type: Number }, // Currently active tab index
  };

  constructor() {
    super();
    this.tabs = [
      { id: 'tab1', label: 'Tab 1' },
      { id: 'tab2', label: 'Tab 2' },
      { id: 'tab3', label: 'Tab 3' }
    ];
    this.activeTabIndex = 0;
  }

  // Handle tab selection
  _handleTabClick(index, tab) {
    if (tab.disabled) return;
    
    this.activeTabIndex = index;
    
    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('tab-change', {
      detail: { 
        index, 
        id: tab.id 
      },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="tabs-container">
        ${this.tabs.map((tab, index) => html`
          <div 
            class="tab ${index === this.activeTabIndex ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}"
            @click="${() => this._handleTabClick(index, tab)}">
            ${tab.label}
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('lit-tabs', LitTabs);
