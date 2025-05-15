import { LitElement, html, css } from 'lit';
import './tm-sidebar.js';
import './tm-header.js';
import './tm-content-area.js';

/**
 * Main application shell component
 * 
 * @element tm-app-shell
 */
export class TmAppShell extends LitElement {
  static properties = {
    currentView: { type: String },
    sidebarOpen: { type: Boolean }
  };

  static styles = css`
    :host {
      display: grid;
      height: 100%;
      grid-template-areas:
        "sidebar header"
        "sidebar main";
      grid-template-rows: auto 1fr;
      grid-template-columns: auto 1fr;
      background-color: var(--bg-body);
    }

    .sidebar {
      grid-area: sidebar;
      height: 100%;
    }

    .header {
      grid-area: header;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .main-content {
      grid-area: main;
      overflow: auto;
    }

    /* Mobile layout */
    @media (max-width: 768px) {
      :host {
        grid-template-areas:
          "header"
          "main";
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
      }

      .sidebar {
        position: fixed;
        height: 100%;
        z-index: 100;
        transform: translateX(calc(var(--sidebar-open, 0) * 100%));
        transition: transform 0.3s ease;
      }

      :host([sidebarOpen]) .sidebar {
        --sidebar-open: 1;
      }
    }
  `;

  constructor() {
    super();
    this.currentView = 'dashboard';
    this.sidebarOpen = false;
  }

  _toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  _handleRouteChange(e) {
    this.currentView = e.detail.route;
    // On mobile, close the sidebar when navigating
    if (window.innerWidth <= 768) {
      this.sidebarOpen = false;
    }
  }

  render() {
    return html`
      <div class="sidebar">
        <tm-sidebar
          .activeRoute=${this.currentView}
          @route-change=${this._handleRouteChange}
        ></tm-sidebar>
      </div>
      
      <div class="header">
        <tm-header
          @toggle-sidebar=${this._toggleSidebar}
        ></tm-header>
      </div>
      
      <div class="main-content">
        <tm-content-area
          .currentView=${this.currentView}
        ></tm-content-area>
      </div>
    `;
  }
}

customElements.define('tm-app-shell', TmAppShell);
