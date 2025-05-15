import { LitElement, html, css } from 'lit';

/**
 * A panel component that works with lit-tabs for tab content
 * 
 * @slot tab1 - Content for the first tab
 * @slot tab2 - Content for the second tab
 * @slot tab3 - Content for the third tab
 * 
 * @cssprop --panel-background - Background color of the panel (default: white)
 * @cssprop --panel-padding - Padding inside the panel (default: 1rem)
 */
export class LitPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    
    .panel {
      background-color: var(--panel-background, white);
      padding: var(--panel-padding, 1rem);
      border-radius: 0 0 var(--border-radius, 8px) var(--border-radius, 8px);
      box-shadow: var(--card-shadow, 0 2px 8px rgba(0, 0, 0, 0.1));
    }
    
    /* Hide inactive tabs */
    .tab-content {
      display: none;
    }
    
    .tab-content.active {
      display: block;
      animation: fadeIn 0.3s ease-in-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;

  static properties = {
    activeTab: { type: String }, // ID of the active tab
  };

  constructor() {
    super();
    this.activeTab = 'tab1';
  }

  // Listen for tab-change events from lit-tabs
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('tab-change', this._handleTabChange);
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('tab-change', this._handleTabChange);
  }

  _handleTabChange(e) {
    this.activeTab = e.detail.id;
  }

  render() {
    return html`
      <div class="panel">
        <div class="tab-content ${this.activeTab === 'tab1' ? 'active' : ''}">
          <slot name="tab1">
            <p>Content for Tab 1</p>
          </slot>
        </div>
        
        <div class="tab-content ${this.activeTab === 'tab2' ? 'active' : ''}">
          <slot name="tab2">
            <p>Content for Tab 2</p>
          </slot>
        </div>
        
        <div class="tab-content ${this.activeTab === 'tab3' ? 'active' : ''}">
          <slot name="tab3">
            <p>Content for Tab 3</p>
          </slot>
        </div>
      </div>
    `;
  }
}

customElements.define('lit-panel', LitPanel);
