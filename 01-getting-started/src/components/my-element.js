import { LitElement, html, css } from 'lit';

/**
 * A simple counter component built with Lit
 *
 * @customElement my-element
 * @property {string} name - The name to display in the greeting
 * @property {number} count - The current counter value
 */
export class MyElement extends LitElement {
  static properties = {
    name: { type: String },
    count: { type: Number }
  };

  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--dark-color);
    }
    .card {
      padding: 20px;
      border-radius: 8px;
      background-color: var(--light-color);
      border-left: 4px solid var(--primary-color);
    }
    .greeting {
      font-size: 1.5rem;
      color: var(--primary-color);
      margin-bottom: 15px;
    }
    .counter {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 20px;
    }
    button {
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    button:hover {
      background-color: #2980b9;
    }
    .count {
      font-weight: bold;
      font-size: 1.2rem;
    }
  `;

  constructor() {
    super();
    this.name = 'World';
    this.count = 0;
  }

  _incrementCount() {
    this.count++;
  }

  render() {
    return html`
      <div class="card">
        <div class="greeting">
          Hello, ${this.name}!
        </div>
        <div>
          <p>Welcome to your first Lit component.</p>
          <p>This component demonstrates the basic features of Lit, including:</p>
          <ul>
            <li>Reactive properties</li>
            <li>Event handling</li>
            <li>Templating</li>
            <li>Scoped styles with Shadow DOM</li>
          </ul>
        </div>
        <div class="counter">
          <button @click=${this._incrementCount}>Click me</button>
          <span class="count">Count: ${this.count}</span>
        </div>
      </div>
    `;
  }
}

customElements.define('my-element', MyElement);
