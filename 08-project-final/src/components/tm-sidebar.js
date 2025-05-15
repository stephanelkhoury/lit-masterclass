import { LitElement, html, css } from 'lit';

/**
 * Application sidebar navigation component
 * 
 * @element tm-sidebar
 * @fires route-change - Fired when navigation route changes with detail { route: string }
 */
export class TmSidebar extends LitElement {
  static properties = {
    activeRoute: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      width: 260px;
      height: 100%;
      background-color: var(--surface-color, white);
      border-right: 1px solid var(--border-default, #e5e7eb);
      padding: var(--spacing-md, 16px) 0;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
    }

    .brand {
      display: flex;
      align-items: center;
      padding: 0 var(--spacing-lg, 24px);
      margin-bottom: var(--spacing-lg, 24px);
    }

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background-color: var(--color-primary, #4f46e5);
      border-radius: 8px;
      margin-right: var(--spacing-sm, 8px);
    }

    .logo svg {
      width: 24px;
      height: 24px;
      fill: white;
    }

    .brand-name {
      font-size: var(--font-size-xl, 1.25rem);
      font-weight: var(--font-weight-bold, 600);
      color: var(--text-primary, #111827);
    }

    nav {
      flex: 1;
      padding: var(--spacing-md, 16px) 0;
      overflow-y: auto;
    }

    .nav-section {
      margin-bottom: var(--spacing-lg, 24px);
    }

    .section-title {
      padding: 0 var(--spacing-lg, 24px);
      margin-bottom: var(--spacing-xs, 4px);
      font-size: var(--font-size-xs, 0.75rem);
      font-weight: var(--font-weight-medium, 500);
      text-transform: uppercase;
      color: var(--text-secondary, #6b7280);
      letter-spacing: 0.05em;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: var(--spacing-sm, 8px) var(--spacing-lg, 24px);
      font-size: var(--font-size-sm, 0.875rem);
      color: var(--text-secondary, #6b7280);
      border-left: 3px solid transparent;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
    }

    .nav-item:hover {
      background-color: var(--bg-surface-hover, #f9fafb);
      color: var(--text-primary, #111827);
    }

    .nav-item.active {
      color: var(--color-primary, #4f46e5);
      background-color: var(--bg-surface-active, #f3f4f6);
      border-left: 3px solid var(--color-primary, #4f46e5);
      font-weight: var(--font-weight-medium, 500);
    }

    .nav-icon {
      width: 20px;
      height: 20px;
      margin-right: var(--spacing-sm, 8px);
    }

    .user-section {
      padding: var(--spacing-md, 16px) var(--spacing-lg, 24px);
      border-top: 1px solid var(--border-default, #e5e7eb);
      display: flex;
      align-items: center;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(--color-primary-light, #818cf8);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: var(--font-weight-bold, 600);
      margin-right: var(--spacing-sm, 8px);
    }

    .user-info {
      flex: 1;
      min-width: 0;
    }

    .user-name {
      font-weight: var(--font-weight-medium, 500);
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-email {
      font-size: var(--font-size-xs, 0.75rem);
      color: var(--text-secondary, #6b7280);
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;

  constructor() {
    super();
    this.activeRoute = 'dashboard';
  }

  _handleNavClick(route) {
    if (this.activeRoute !== route) {
      this.activeRoute = route;
      this.dispatchEvent(new CustomEvent('route-change', {
        detail: { route },
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    return html`
      <div class="brand">
        <div class="logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-7 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v2z"/>
          </svg>
        </div>
        <div class="brand-name">TaskMaster</div>
      </div>
      
      <nav>
        <div class="nav-section">
          <div class="section-title">Main</div>
          <div 
            class="nav-item ${this.activeRoute === 'dashboard' ? 'active' : ''}"
            @click=${() => this._handleNavClick('dashboard')}
          >
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </div>
          <div 
            class="nav-item ${this.activeRoute === 'tasks' ? 'active' : ''}"
            @click=${() => this._handleNavClick('tasks')}
          >
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Tasks
          </div>
          <div 
            class="nav-item ${this.activeRoute === 'calendar' ? 'active' : ''}"
            @click=${() => this._handleNavClick('calendar')}
          >
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Calendar
          </div>
        </div>
        
        <div class="nav-section">
          <div class="section-title">Manage</div>
          <div 
            class="nav-item ${this.activeRoute === 'projects' ? 'active' : ''}"
            @click=${() => this._handleNavClick('projects')}
          >
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            Projects
          </div>
          <div 
            class="nav-item ${this.activeRoute === 'team' ? 'active' : ''}"
            @click=${() => this._handleNavClick('team')}
          >
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Team
          </div>
          <div 
            class="nav-item ${this.activeRoute === 'reports' ? 'active' : ''}"
            @click=${() => this._handleNavClick('reports')}
          >
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Reports
          </div>
        </div>
        
        <div class="nav-section">
          <div class="section-title">Settings</div>
          <div 
            class="nav-item ${this.activeRoute === 'profile' ? 'active' : ''}"
            @click=${() => this._handleNavClick('profile')}
          >
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </div>
          <div 
            class="nav-item ${this.activeRoute === 'settings' ? 'active' : ''}"
            @click=${() => this._handleNavClick('settings')}
          >
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </div>
        </div>
      </nav>
      
      <div class="user-section">
        <div class="avatar">SE</div>
        <div class="user-info">
          <p class="user-name">Stephan El Khoury</p>
          <p class="user-email">stephan@example.com</p>
        </div>
      </div>
    `;
  }
}

customElements.define('tm-sidebar', TmSidebar);
