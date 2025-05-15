import { LitElement, html, css } from 'lit';

/**
 * Stats card component for displaying key metrics
 * 
 * @element tm-stats-card
 * @csspart card - The card container
 * @csspart title - The card title
 * @csspart value - The main value
 * @csspart trend - The trend indicator
 */
export class TmStatsCard extends LitElement {
  static properties = {
    title: { type: String },
    value: { type: Number },
    change: { type: Number },
    trending: { type: String }, // 'up' or 'down'
    color: { type: String }, // 'primary', 'success', 'info', 'danger'
    icon: { type: String }
  };

  static styles = css`
    :host {
      display: block;
    }

    .stats-card {
      background-color: var(--surface-color, white);
      border-radius: var(--border-radius-lg, 12px);
      padding: var(--spacing-lg, 24px);
      box-shadow: var(--shadow-sm);
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .card-header {
      display: flex;
      align-items: center;
      margin-bottom: var(--spacing-sm, 8px);
    }

    .card-title {
      font-size: var(--font-size-sm, 0.875rem);
      font-weight: var(--font-weight-medium, 500);
      color: var(--text-secondary, #6b7280);
      margin: 0;
    }

    .icon-container {
      width: 32px;
      height: 32px;
      border-radius: var(--border-radius-md, 8px);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: var(--spacing-sm, 8px);
    }

    .primary-bg {
      background-color: rgba(79, 70, 229, 0.1);
      color: var(--color-primary, #4f46e5);
    }

    .success-bg {
      background-color: rgba(16, 185, 129, 0.1);
      color: var(--color-success, #10b981);
    }

    .info-bg {
      background-color: rgba(59, 130, 246, 0.1);
      color: var(--color-info, #3b82f6);
    }

    .danger-bg {
      background-color: rgba(239, 68, 68, 0.1);
      color: var(--color-danger, #ef4444);
    }

    .icon {
      width: 20px;
      height: 20px;
    }

    .card-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .value {
      font-size: var(--font-size-3xl, 1.875rem);
      font-weight: var(--font-weight-bold, 600);
      color: var(--text-primary, #111827);
      margin: var(--spacing-xs, 4px) 0;
    }

    .trend {
      display: flex;
      align-items: center;
      font-size: var(--font-size-xs, 0.75rem);
      font-weight: var(--font-weight-medium, 500);
    }

    .trend-icon {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }

    .trend-up {
      color: var(--color-success, #10b981);
    }

    .trend-down {
      color: var(--color-danger, #ef4444);
    }
  `;

  _renderIcon() {
    switch(this.icon) {
      case 'task':
        return html`
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        `;
      case 'progress':
        return html`
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
          </svg>
        `;
      case 'check':
        return html`
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        `;
      case 'time':
        return html`
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
          </svg>
        `;
      default:
        return html`
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        `;
    }
  }

  render() {
    const trendingIcon = this.trending === 'up'
      ? html`
          <svg class="trend-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
          </svg>
        `
      : html`
          <svg class="trend-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clip-rule="evenodd" />
          </svg>
        `;

    return html`
      <div class="stats-card" part="card">
        <div class="card-header">
          <div class="icon-container ${this.color}-bg">
            ${this._renderIcon()}
          </div>
          <h3 class="card-title" part="title">${this.title}</h3>
        </div>
        <div class="card-content">
          <div class="value" part="value">${this.value}</div>
          <div class="trend ${this.trending === 'up' ? 'trend-up' : 'trend-down'}" part="trend">
            ${trendingIcon}
            <span>${Math.abs(this.change)}% ${this.trending === 'up' ? 'increase' : 'decrease'}</span>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('tm-stats-card', TmStatsCard);
