import { LitElement, html, css } from 'lit';

/**
 * A versatile card component with slots for different content areas
 * 
 * @slot - Default slot for the main content
 * @slot media - Slot for media content (images, videos)
 * @slot header - Slot for custom header content (overrides the title property)
 * @slot actions - Slot for action buttons or links
 * @slot footer - Slot for footer content
 * 
 * @cssprop --card-padding - Padding inside the card (default: 1rem)
 * @cssprop --card-border-radius - Border radius of the card (default: 8px)
 * @cssprop --card-background - Background color of the card (default: white)
 */
export class LitCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    
    .card {
      background-color: var(--card-background, white);
      border-radius: var(--card-border-radius, 8px);
      box-shadow: var(--card-shadow, 0 2px 8px rgba(0, 0, 0, 0.1));
      overflow: hidden;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .card:hover {
      transform: translateY(-4px);
      box-shadow: var(--card-hover-shadow, 0 6px 12px rgba(0, 0, 0, 0.15));
    }
    
    .card-header {
      padding: var(--card-padding, 1rem);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .card-header h3 {
      margin: 0;
      color: var(--primary-color, #7e57c2);
      font-size: 1.25rem;
    }
    
    .card-media {
      display: block;
      width: 100%;
    }
    
    .card-media::slotted(*) {
      width: 100%;
      display: block;
      object-fit: cover;
    }
    
    .card-content {
      padding: var(--card-padding, 1rem);
    }
    
    .card-actions {
      padding: var(--card-padding, 1rem);
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }
    
    .card-footer {
      padding: calc(var(--card-padding, 1rem) * 0.75);
      background-color: rgba(0, 0, 0, 0.03);
      font-size: 0.9rem;
      color: #666;
    }
    
    /* Style for when slot is empty */
    .card-actions:empty,
    .card-footer:empty,
    .card-media:empty {
      display: none;
    }
  `;

  static properties = {
    title: { type: String },
    elevation: { type: Number },
    variant: { type: String }, // 'outlined', 'elevated', 'filled'
  };

  constructor() {
    super();
    this.title = 'Card Title';
    this.elevation = 1;
    this.variant = 'elevated';
  }

  // Check if specific slots have content
  firstUpdated() {
    this._checkSlots();
  }

  _checkSlots() {
    // You can use this to update the component based on which slots have content
    const hasHeaderSlot = this.querySelector('[slot="header"]') !== null;
    const hasMediaSlot = this.querySelector('[slot="media"]') !== null;
    const hasActionsSlot = this.querySelector('[slot="actions"]') !== null;
    const hasFooterSlot = this.querySelector('[slot="footer"]') !== null;
    
    // You could set attributes based on slot presence if needed
    this.hasMedia = hasMediaSlot;
  }

  // Compute styles based on properties
  _getCardStyle() {
    let style = '';
    
    if (this.variant === 'outlined') {
      style = 'box-shadow: none; border: 1px solid rgba(0,0,0,0.12);';
    } else if (this.variant === 'filled') {
      style = 'box-shadow: none; background-color: #f5f5f5;';
    } else {
      // Default is elevated
      style = `box-shadow: 0 ${this.elevation * 2}px ${this.elevation * 3}px rgba(0,0,0,${0.1 + this.elevation * 0.05});`;
    }
    
    return style;
  }

  render() {
    return html`
      <div class="card" style="${this._getCardStyle()}">
        <!-- Header slot with fallback to the title property -->
        <div class="card-header">
          <slot name="header">
            <h3>${this.title}</h3>
          </slot>
        </div>
        
        <!-- Media slot -->
        <div class="card-media">
          <slot name="media"></slot>
        </div>
        
        <!-- Main content slot -->
        <div class="card-content">
          <slot></slot>
        </div>
        
        <!-- Actions slot -->
        <div class="card-actions">
          <slot name="actions"></slot>
        </div>
        
        <!-- Footer slot -->
        <div class="card-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('lit-card', LitCard);
