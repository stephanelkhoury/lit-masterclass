import { LitElement, html, css } from 'lit';

/**
 * A customizable button component with slots for content and icons
 * 
 * @slot - Default slot for button text content
 * @slot prefix - Slot for an icon or element before the text
 * @slot suffix - Slot for an icon or element after the text
 * 
 * @cssprop --button-background - Button background color
 * @cssprop --button-color - Button text color
 * @cssprop --button-border-radius - Button border radius
 * @cssprop --button-padding - Button padding
 */
export class LitButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
    
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: var(--button-background, var(--primary-color, #7e57c2));
      color: var(--button-color, white);
      border: none;
      border-radius: var(--button-border-radius, 4px);
      padding: var(--button-padding, 0.5rem 1rem);
      cursor: pointer;
      font-family: inherit;
      font-size: 1rem;
      transition: background-color 0.3s, transform 0.1s;
      gap: 0.5rem;
    }
    
    :host([variant="outlined"]) .button {
      background-color: transparent;
      color: var(--primary-color, #7e57c2);
      border: 1px solid var(--primary-color, #7e57c2);
    }
    
    :host([variant="text"]) .button {
      background-color: transparent;
      color: var(--primary-color, #7e57c2);
      padding: var(--button-padding, 0.3rem 0.8rem);
    }
    
    :host([disabled]) .button {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .button:hover:not([disabled]) {
      opacity: 0.9;
    }
    
    .button:active:not([disabled]) {
      transform: scale(0.98);
    }
    
    ::slotted(svg) {
      width: 1em;
      height: 1em;
      fill: currentColor;
    }
  `;

  static properties = {
    variant: { type: String, reflect: true }, // 'filled', 'outlined', 'text'
    disabled: { type: Boolean, reflect: true },
    type: { type: String } // 'button', 'submit', 'reset'
  };

  constructor() {
    super();
    this.variant = 'filled';
    this.disabled = false;
    this.type = 'button';
  }

  _handleClick(e) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    
    // Dispatch a click event that bubbles up
    this.dispatchEvent(new CustomEvent('button-click', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <button 
        class="button" 
        ?disabled="${this.disabled}"
        type="${this.type}"
        @click="${this._handleClick}">
        
        <slot name="prefix"></slot>
        <slot></slot>
        <slot name="suffix"></slot>
      </button>
    `;
  }
}

customElements.define('lit-button', LitButton);
