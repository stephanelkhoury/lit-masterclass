import { LitElement, html, css } from 'lit';

/**
 * A themable card component with slots and CSS parts
 *
 * @element themed-card
 * @csspart card - The card container
 * @csspart header - The card header section
 * @csspart content - The main content area
 * @csspart footer - The card footer section
 * @slot header - Content for the card header
 * @slot - Default slot for the main content
 * @slot footer - Content for the card footer
 */
export class ThemedCard extends LitElement {
  static properties = {
    elevation: { type: Number },
    outlined: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      margin: 1rem 0;
    }

    .card {
      background-color: var(--card-bg-color, white);
      border-radius: var(--card-border-radius, 8px);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: var(--card-shadow, none);
      border: var(--card-border, none);
      transition: all 0.2s ease;
    }

    :host([outlined]) .card {
      border: var(--card-outlined-border, 1px solid #e2e8f0);
      box-shadow: none;
    }

    :host([elevation="0"]) .card {
      box-shadow: none;
    }

    :host([elevation="1"]) .card {
      box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1));
    }

    :host([elevation="2"]) .card {
      box-shadow: var(--shadow-md, 0 4px 6px -1px rgba(0,0,0,0.1));
    }

    :host([elevation="3"]) .card {
      box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0,0,0,0.1));
    }

    .header {
      padding: var(--card-header-padding, 16px);
      border-bottom: var(--card-divider, 1px solid #e2e8f0);
      background-color: var(--card-header-bg-color, transparent);
    }

    .content {
      padding: var(--card-content-padding, 16px);
      flex-grow: 1;
    }

    .footer {
      padding: var(--card-footer-padding, 16px);
      border-top: var(--card-divider, 1px solid #e2e8f0);
      background-color: var(--card-footer-bg-color, transparent);
    }

    /* Hide empty slots */
    ::slotted(:empty) {
      display: none;
    }
  `;

  constructor() {
    super();
    this.elevation = 1;
    this.outlined = false;
  }

  render() {
    return html`
      <div class="card" part="card">
        <div class="header" part="header">
          <slot name="header"></slot>
        </div>
        
        <div class="content" part="content">
          <slot></slot>
        </div>
        
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('themed-card', ThemedCard);
