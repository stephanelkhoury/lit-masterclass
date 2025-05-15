import { LitElement, html, css } from 'lit';

/**
 * A counter component for demonstration purposes
 *
 * @slot - Default slot for additional content
 * @fires count-changed - Fired when the count changes with detail { value: number }
 * @csspart button - The button element
 * @csspart count - The count display element
 */
export class CounterElement extends LitElement {
  static properties = {
    count: { type: Number },
    label: { type: String },
    max: { type: Number }
  };

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
    }

    .counter {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    button {
      background-color: #3f51b5;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      cursor: pointer;
      font-size: 14px;
    }

    button:hover {
      background-color: #303f9f;
    }

    button:disabled {
      background-color: #c5cae9;
      cursor: not-allowed;
    }

    .count {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .max-reached {
      color: #f44336;
    }
  `;

  constructor() {
    super();
    this.count = 0;
    this.label = 'Count';
    this.max = Infinity;
  }

  increment() {
    if (this.count < this.max) {
      this.count++;
      this.dispatchEvent(new CustomEvent('count-changed', { 
        detail: { value: this.count },
        bubbles: true,
        composed: true
      }));
    }
  }

  reset() {
    this.count = 0;
    this.dispatchEvent(new CustomEvent('count-changed', { 
      detail: { value: this.count },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const maxReached = this.count >= this.max;
    
    return html`
      <div>
        <h3>${this.label}</h3>
        <div class="counter">
          <button 
            part="button"
            @click=${this.increment}
            ?disabled=${maxReached}
          >
            Increment
          </button>
          <button 
            part="button"
            @click=${this.reset}
          >
            Reset
          </button>
          <span 
            part="count" 
            class="count ${maxReached ? 'max-reached' : ''}"
          >
            ${this.count}
          </span>
        </div>
        <div>
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('counter-element', CounterElement);
