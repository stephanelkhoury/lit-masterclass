import { LitElement, html, css } from 'lit';

/**
 * A component that allows switching between different themes
 *
 * @element theme-selector
 * @fires theme-change - Fired when the theme changes with detail { theme: string }
 */
export class ThemeSelector extends LitElement {
  static properties = {
    themes: { type: Array },
    currentTheme: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      margin-bottom: 2rem;
      background: var(--theme-selector-bg, #fff);
      border-radius: var(--border-radius-md, 8px);
      padding: var(--spacing-md, 16px);
      box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1));
    }

    .theme-selector {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .theme-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
    }

    .color-preview {
      width: 60px;
      height: 60px;
      border-radius: var(--border-radius-md, 8px);
      margin-bottom: 8px;
      position: relative;
      overflow: hidden;
      border: 2px solid transparent;
      transition: border-color 0.2s;
    }

    .color-preview.active {
      border-color: var(--theme-selected-border, #4f46e5);
    }

    .theme-name {
      font-size: 14px;
      font-weight: 500;
    }

    /* Theme previews */
    .color-preview.default {
      background: linear-gradient(135deg, #4f46e5 0%, #4f46e5 50%, #10b981 50%, #10b981 100%);
    }

    .color-preview.dark {
      background: linear-gradient(135deg, #1e293b 0%, #1e293b 50%, #3b82f6 50%, #3b82f6 100%);
    }

    .color-preview.light {
      background: linear-gradient(135deg, #f8fafc 0%, #f8fafc 50%, #6366f1 50%, #6366f1 100%);
    }

    .color-preview.nature {
      background: linear-gradient(135deg, #166534 0%, #166534 50%, #65a30d 50%, #65a30d 100%);
    }

    .color-preview.sunset {
      background: linear-gradient(135deg, #7c2d12 0%, #7c2d12 50%, #ea580c 50%, #ea580c 100%);
    }
  `;

  constructor() {
    super();
    this.themes = [
      { id: 'default', name: 'Default' },
      { id: 'dark', name: 'Dark' },
      { id: 'light', name: 'Light' },
      { id: 'nature', name: 'Nature' },
      { id: 'sunset', name: 'Sunset' }
    ];
    this.currentTheme = 'default';
  }

  firstUpdated() {
    // Apply the default theme
    this._applyTheme(this.currentTheme);
  }

  render() {
    return html`
      <div>
        <h3>Select a Theme</h3>
        <div class="theme-selector">
          ${this.themes.map(theme => html`
            <div class="theme-option" @click=${() => this._selectTheme(theme.id)}>
              <div class="color-preview ${theme.id} ${theme.id === this.currentTheme ? 'active' : ''}"></div>
              <span class="theme-name">${theme.name}</span>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  _selectTheme(themeId) {
    if (this.currentTheme !== themeId) {
      this.currentTheme = themeId;
      this._applyTheme(themeId);
      
      this.dispatchEvent(new CustomEvent('theme-change', {
        detail: { theme: themeId },
        bubbles: true,
        composed: true
      }));
    }
  }

  _applyTheme(themeId) {
    // Remove any existing theme classes
    document.documentElement.classList.remove('theme-default', 'theme-dark', 'theme-light', 'theme-nature', 'theme-sunset');
    // Add the new theme class
    document.documentElement.classList.add(`theme-${themeId}`);
  }
}

customElements.define('theme-selector', ThemeSelector);
