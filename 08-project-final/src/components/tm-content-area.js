import { LitElement, html, css } from 'lit';
import './views/tm-dashboard-view.js';

/**
 * Content area component that displays different views based on the current route
 * 
 * @element tm-content-area
 */
export class TmContentArea extends LitElement {
  static properties = {
    currentView: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      padding: var(--spacing-lg, 24px);
      height: 100%;
    }

    .view-container {
      max-width: 1200px;
      margin: 0 auto;
      height: 100%;
    }
    
    .view-title {
      margin-top: 0;
      margin-bottom: var(--spacing-lg, 24px);
      font-size: var(--font-size-3xl, 1.875rem);
      font-weight: var(--font-weight-bold, 600);
      color: var(--text-primary, #111827);
    }
    
    .placeholder-view {
      background-color: var(--bg-surface, white);
      border-radius: var(--border-radius-lg, 12px);
      padding: var(--spacing-lg, 24px);
      height: calc(100% - 60px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      box-shadow: var(--shadow-md);
    }
    
    .placeholder-icon {
      width: 80px;
      height: 80px;
      margin-bottom: var(--spacing-md, 16px);
      color: var(--color-primary-light, #818cf8);
    }
    
    .placeholder-text {
      font-size: var(--font-size-lg, 1.125rem);
      color: var(--text-secondary, #6b7280);
      margin-bottom: var(--spacing-lg, 24px);
    }
    
    .dashboard-container {
      height: 100%;
    }
  `;

  constructor() {
    super();
    this.currentView = 'dashboard';
  }

  _renderCurrentView() {
    switch (this.currentView) {
      case 'dashboard':
        return html`
          <div class="dashboard-container">
            <h1 class="view-title">Dashboard</h1>
            <tm-dashboard-view></tm-dashboard-view>
          </div>
        `;
      case 'tasks':
        return html`
          <div>
            <h1 class="view-title">Tasks</h1>
            <div class="placeholder-view">
              <svg class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p class="placeholder-text">This view is under construction. Check back soon!</p>
            </div>
          </div>
        `;
      case 'calendar':
        return html`
          <div>
            <h1 class="view-title">Calendar</h1>
            <div class="placeholder-view">
              <svg class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="placeholder-text">The calendar feature is coming soon.</p>
            </div>
          </div>
        `;
      case 'projects':
        return html`
          <div>
            <h1 class="view-title">Projects</h1>
            <div class="placeholder-view">
              <svg class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <p class="placeholder-text">Project management will be available in the next release.</p>
            </div>
          </div>
        `;
      case 'team':
        return html`
          <div>
            <h1 class="view-title">Team</h1>
            <div class="placeholder-view">
              <svg class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p class="placeholder-text">Team management is under development.</p>
            </div>
          </div>
        `;
      case 'reports':
        return html`
          <div>
            <h1 class="view-title">Reports</h1>
            <div class="placeholder-view">
              <svg class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p class="placeholder-text">Advanced reporting features are on the way.</p>
            </div>
          </div>
        `;
      case 'profile':
        return html`
          <div>
            <h1 class="view-title">Profile</h1>
            <div class="placeholder-view">
              <svg class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p class="placeholder-text">User profile management coming soon.</p>
            </div>
          </div>
        `;
      case 'settings':
        return html`
          <div>
            <h1 class="view-title">Settings</h1>
            <div class="placeholder-view">
              <svg class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p class="placeholder-text">Application settings are in development.</p>
            </div>
          </div>
        `;
      default:
        return html`
          <div>
            <h1 class="view-title">Not Found</h1>
            <div class="placeholder-view">
              <svg class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="placeholder-text">The requested view does not exist.</p>
            </div>
          </div>
        `;
    }
  }

  render() {
    return html`
      <div class="view-container">
        ${this._renderCurrentView()}
      </div>
    `;
  }
}

customElements.define('tm-content-area', TmContentArea);
