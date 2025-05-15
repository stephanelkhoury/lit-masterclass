import { LitElement, html, css } from 'lit';

/**
 * A themable button component with support for different variants
 *
 * @element themed-button
 * @csspart button - The button element
 * @slot - Button content
 */
export class ThemedButton extends LitElement {
  static properties = {
    variant: { type: String }, // primary, secondary, danger, or default
    disabled: { type: Boolean }
  };

  static styles = css`
    :host {
      display: inline-block;
    }
    
    button {
      font-family: var(--font-family, 'Inter, sans-serif');
      font-size: var(--button-font-size, 14px);
      font-weight: var(--button-font-weight, 500);
      padding: var(--button-padding, 0.5rem 1rem);
      border-radius: var(--button-border-radius, 4px);
      border: var(--button-border, 1px solid transparent);
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: var(--button-min-width, 80px);
    }
    
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    /* Default variant */
    button {
      background-color: var(--button-bg-color, #f1f5f9);
      color: var(--button-text-color, #334155);
      border-color: var(--button-border-color, #cbd5e1);
    }
    
    button:hover:not(:disabled) {
      background-color: var(--button-hover-bg-color, #e2e8f0);
      border-color: var(--button-hover-border-color, #94a3b8);
    }
    
    /* Primary variant */
    :host([variant="primary"]) button {
      background-color: var(--button-primary-bg-color, #4f46e5);
      color: var(--button-primary-text-color, white);
      border-color: var(--button-primary-border-color, #4f46e5);
    }
    
    :host([variant="primary"]) button:hover:not(:disabled) {
      background-color: var(--button-primary-hover-bg-color, #4338ca);
      border-color: var(--button-primary-hover-border-color, #4338ca);
    }
    
    /* Secondary variant */
    :host([variant="secondary"]) button {
      background-color: var(--button-secondary-bg-color, #10b981);
      color: var(--button-secondary-text-color, white);
      border-color: var(--button-secondary-border-color, #10b981);
    }
    
    :host([variant="secondary"]) button:hover:not(:disabled) {
      background-color: var(--button-secondary-hover-bg-color, #059669);
      border-color: var(--button-secondary-hover-border-color, #059669);
    }
    
    /* Danger variant */
    :host([variant="danger"]) button {
      background-color: var(--button-danger-bg-color, #ef4444);
      color: var(--button-danger-text-color, white);
      border-color: var(--button-danger-border-color, #ef4444);
    }
    
    :host([variant="danger"]) button:hover:not(:disabled) {
      background-color: var(--button-danger-hover-bg-color, #dc2626);
      border-color: var(--button-danger-hover-border-color, #dc2626);
    }
  `;

  constructor() {
    super();
    this.variant = '';
    this.disabled = false;
  }

  render() {
    return html`
      <button
        part="button"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
  }

  _handleClick(e) {
    this.dispatchEvent(new CustomEvent('button-click', {
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('themed-button', ThemedButton);
