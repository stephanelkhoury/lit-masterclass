import { LitElement, html, css } from 'lit';

/**
 * Application header component with search and menu toggle
 * 
 * @element tm-header
 * @fires toggle-sidebar - Fired when the sidebar toggle button is clicked
 */
export class TmHeader extends LitElement {
  static properties = {
    searchTerm: { type: String },
    notificationCount: { type: Number }
  };

  static styles = css`
    :host {
      display: block;
      background-color: var(--surface-color, white);
      border-bottom: 1px solid var(--border-default, #e5e7eb);
      padding: var(--spacing-md, 16px) var(--spacing-lg, 24px);
      box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.1));
    }

    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .header-left {
      display: flex;
      align-items: center;
    }

    .menu-toggle {
      display: none;
      background: none;
      border: none;
      color: var(--text-primary, #111827);
      cursor: pointer;
      padding: 0;
      margin-right: var(--spacing-md, 16px);
    }

    .menu-toggle svg {
      width: 24px;
      height: 24px;
    }

    .search-container {
      position: relative;
      width: 300px;
    }

    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-secondary, #6b7280);
      width: 20px;
      height: 20px;
    }

    .search-input {
      width: 100%;
      padding: 8px 12px 8px 40px;
      border: 1px solid var(--border-default, #e5e7eb);
      border-radius: var(--border-radius-md, 8px);
      background-color: var(--bg-surface, white);
      font-size: var(--font-size-sm, 0.875rem);
      color: var(--text-primary, #111827);
    }

    .search-input:focus {
      outline: none;
      border-color: var(--border-focus, #818cf8);
      box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
    }

    .search-input::placeholder {
      color: var(--text-disabled, #9ca3af);
    }

    .header-right {
      display: flex;
      align-items: center;
    }

    .action-button {
      background: none;
      border: none;
      color: var(--text-secondary, #6b7280);
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: var(--border-radius-full, 9999px);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: var(--spacing-sm, 8px);
      position: relative;
    }

    .action-button:hover {
      background-color: var(--bg-surface-hover, #f9fafb);
      color: var(--text-primary, #111827);
    }

    .action-button svg {
      width: 20px;
      height: 20px;
    }

    .notification-badge {
      position: absolute;
      top: 4px;
      right: 4px;
      background-color: var(--color-danger, #ef4444);
      color: white;
      font-size: 0.6rem;
      font-weight: var(--font-weight-bold, 600);
      width: 16px;
      height: 16px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media (max-width: 768px) {
      .menu-toggle {
        display: block;
      }

      .search-container {
        width: auto;
        flex-grow: 1;
        margin: 0 var(--spacing-md, 16px);
      }
    }
  `;

  constructor() {
    super();
    this.searchTerm = '';
    this.notificationCount = 3;
  }

  _handleSearchInput(e) {
    this.searchTerm = e.target.value;
  }

  _handleMenuToggle() {
    this.dispatchEvent(new CustomEvent('toggle-sidebar', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="header-container">
        <div class="header-left">
          <button class="menu-toggle" @click=${this._handleMenuToggle} aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div class="search-container">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              class="search-input" 
              type="text" 
              placeholder="Search..." 
              .value=${this.searchTerm}
              @input=${this._handleSearchInput}
            >
          </div>
        </div>
        
        <div class="header-right">
          <button class="action-button" aria-label="View notifications">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            ${this.notificationCount > 0 ? html`
              <span class="notification-badge">${this.notificationCount}</span>
            ` : ''}
          </button>
          
          <button class="action-button" aria-label="Help">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('tm-header', TmHeader);
